'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { FAQS } from './faqs';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

function computeTax(taxableIncome: number, regime: 'old' | 'new'): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  if (regime === 'new') {
    const slabs = [
      { limit: 400000, rate: 0 }, { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 }, { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 }, { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.30 },
    ];
    let prev = 0;
    for (const slab of slabs) {
      if (taxableIncome <= prev) break;
      tax += (Math.min(taxableIncome, slab.limit) - prev) * slab.rate;
      prev = slab.limit;
    }
    if (taxableIncome <= 1200000) tax = Math.max(0, tax - Math.min(tax, 60000));
  } else {
    const slabs = [
      { limit: 250000, rate: 0 }, { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 }, { limit: Infinity, rate: 0.30 },
    ];
    let prev = 0;
    for (const slab of slabs) {
      if (taxableIncome <= prev) break;
      tax += (Math.min(taxableIncome, slab.limit) - prev) * slab.rate;
      prev = slab.limit;
    }
    if (taxableIncome <= 500000) tax = Math.max(0, tax - Math.min(tax, 12500));
  }
  const surcharge =
    taxableIncome > 50000000 ? tax * (regime === 'new' ? 0.25 : 0.37) :
    taxableIncome > 10000000 ? tax * (regime === 'new' ? 0.25 : 0.15) :
    taxableIncome > 5000000 ? tax * 0.10 : 0;
  return Math.round((tax + surcharge) * 1.04);
}

function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact, suffix }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

function Form16Snapshot() {
  const rows = [
    { label: 'Issue deadline', value: 'June 15 each year' },
    { label: 'Issuing authority', value: 'Employer / TRACES' },
    { label: 'Covers income', value: 'Salary only (Sec 192)' },
    { label: 'Validity', value: 'Lifetime (no expiry)' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Form 16 Snapshot</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/blogs/itr-filing-last-date', label: 'ITR Filing Deadlines AY 2026-27' },
    { href: '/blogs/world-gdp-ranking-2026', label: 'World GDP Ranking 2026' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/tax-refund-calculator', label: 'Tax Refund Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/hra-calculator', label: 'HRA Exemption Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
];
const MORE = [
  { href: '/calculators/section-80d-calculator', label: 'Section 80D Calculator' },
  { href: '/calculators/nps-tax-benefit-calculator', label: 'NPS Tax Benefit Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
  { href: '/calculators/ctc-calculator', label: 'CTC Calculator' },
  { href: '/calculators/professional-tax-calculator', label: 'Professional Tax Calculator' },
];

function FAQAccordion() {
  return <FAQBox items={FAQS} />;
}


const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'right' };

export default function Form16TaxCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));

  const [grossSalary, setGrossSalary] = useState(1000000);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [profTax, setProfTax] = useState(2400);
  const [dedn80C, setDedn80C] = useState(150000);
  const [dedn80D, setDedn80D] = useState(25000);
  const [hraExemption, setHraExemption] = useState(0);
  const [npsDedn, setNpsDedn] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDedn, setOtherDedn] = useState(0);
  const [tdsFromForm16, setTdsFromForm16] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fermor-form16-tax-v1');
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.grossSalary === 'number') setGrossSalary(d.grossSalary);
        if (d.regime === 'old' || d.regime === 'new') setRegime(d.regime);
        if (typeof d.profTax === 'number') setProfTax(d.profTax);
        if (typeof d.dedn80C === 'number') setDedn80C(d.dedn80C);
        if (typeof d.dedn80D === 'number') setDedn80D(d.dedn80D);
        if (typeof d.hraExemption === 'number') setHraExemption(d.hraExemption);
        if (typeof d.npsDedn === 'number') setNpsDedn(d.npsDedn);
        if (typeof d.homeLoanInterest === 'number') setHomeLoanInterest(d.homeLoanInterest);
        if (typeof d.otherDedn === 'number') setOtherDedn(d.otherDedn);
        if (typeof d.tdsFromForm16 === 'number') setTdsFromForm16(d.tdsFromForm16);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('fermor-form16-tax-v1', JSON.stringify({ grossSalary, regime, profTax, dedn80C, dedn80D, hraExemption, npsDedn, homeLoanInterest, otherDedn, tdsFromForm16 }));
    } catch { /* ignore */ }
  }, [grossSalary, regime, profTax, dedn80C, dedn80D, hraExemption, npsDedn, homeLoanInterest, otherDedn, tdsFromForm16, hydrated]);

  const result = useMemo(() => {
    const stdDedn = regime === 'new' ? 75000 : 50000;
    const profTaxDedn = regime === 'old' ? Math.min(profTax, 2500) : 0;
    const totalDedn = regime === 'new'
      ? stdDedn
      : stdDedn + profTaxDedn + Math.min(dedn80C, 150000) + Math.min(dedn80D, 100000) + hraExemption + Math.min(homeLoanInterest, 200000) + Math.min(npsDedn, 50000) + otherDedn;
    const taxableIncome = Math.max(0, grossSalary - totalDedn);
    const taxLiability = computeTax(taxableIncome, regime);
    const refundOrDue = tdsFromForm16 - taxLiability;
    return { stdDedn, profTaxDedn, totalDedn, taxableIncome, taxLiability, refundOrDue };
  }, [grossSalary, regime, profTax, dedn80C, dedn80D, hraExemption, npsDedn, homeLoanInterest, otherDedn, tdsFromForm16]);

  const isRefund = result.refundOrDue >= 0;
  const takeHome = grossSalary - result.taxLiability;
  const taxPct = grossSalary > 0 ? Math.round((result.taxLiability / grossSalary) * 100) : 0;
  const takePct = 100 - taxPct;
  const donutR = 54;
  const circ = 2 * Math.PI * donutR;
  const taxDash = (taxPct / 100) * circ;
  const takeDash = circ - taxDash;

  return (
    <>
      <PageNav />
      <div style={{ background: C.bg, minHeight: '100vh', fontFamily: INTER }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '24px 16px' : '32px 28px 80px' }}>
          <header style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
              Form 16 Tax Calculator
            </h1>
            <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
              Compute income tax from your Form 16 Part B salary and Part A TDS for FY 2025-26. See your refund or balance tax due.
            </p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
            <div>
              {/* Calculator Card */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 32 }}>
                {/* Regime Tabs */}
                <div role="tablist" aria-label="Tax regime" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                  {(['new', 'old'] as const).map(r => (
                    <button key={r} id={`f16tab-${r}`} role="tab" aria-selected={regime === r} aria-controls={`f16panel-${r}`}
                      onClick={() => setRegime(r)}
                      style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: regime === r ? 700 : 400, color: regime === r ? C.dark : C.ink3, borderBottom: regime === r ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                      {r === 'new' ? 'New Regime' : 'Old Regime (Form 16 deductions)'}
                    </button>
                  ))}
                </div>

                <div id={`f16panel-${regime}`} role="tabpanel" aria-labelledby={`f16tab-${regime}`}>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 0 }}>
                    {/* Input Panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>From Form 16</p>
                        <CurrencySelector theme="light" />
                      </div>

                      {!showAdvanced ? (
                        <>
                          <Slider label="Gross Salary (Form 16 Part B)" value={grossSalary} min={100000} max={10000000} step={50000}
                            display={fmtC(grossSalary)} onChange={setGrossSalary} />

                          <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 28 }}>
                            <span style={{ fontSize: 12.5, color: C.ink2 }}>Standard deduction (auto): </span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{regime === 'new' ? 'Rs 75,000' : 'Rs 50,000'}</span>
                          </div>

                          <Slider label="TDS from Form 16 Part A" value={tdsFromForm16} min={0} max={2000000} step={5000}
                            display={fmtC(tdsFromForm16)} onChange={setTdsFromForm16} />

                          {regime === 'old' && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <button onClick={() => setShowAdvanced(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: INTER }}>
                                Deductions from Part B
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <Slider label="Professional Tax (Form 16 Part B)" value={profTax} min={0} max={2500} step={100}
                            display={fmtC(profTax)} onChange={setProfTax} compact />
                          <Slider label="Section 80C (EPF, ELSS, LIC)" value={dedn80C} min={0} max={150000} step={5000}
                            display={fmtC(dedn80C)} onChange={setDedn80C} compact />
                          <Slider label="Section 80D (Health Insurance)" value={dedn80D} min={0} max={100000} step={1000}
                            display={fmtC(dedn80D)} onChange={setDedn80D} compact />
                          <Slider label="HRA Exemption" value={hraExemption} min={0} max={600000} step={5000}
                            display={fmtC(hraExemption)} onChange={setHraExemption} compact />
                          <Slider label="Home Loan Interest (Sec 24b)" value={homeLoanInterest} min={0} max={200000} step={5000}
                            display={fmtC(homeLoanInterest)} onChange={setHomeLoanInterest} compact />
                          <Slider label="NPS 80CCD(1B)" value={npsDedn} min={0} max={50000} step={1000}
                            display={fmtC(npsDedn)} onChange={setNpsDedn} compact />
                          <Slider label="Other Deductions" value={otherDedn} min={0} max={300000} step={5000}
                            display={fmtC(otherDedn)} onChange={setOtherDedn} compact />
                          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <button onClick={() => setShowAdvanced(false)}
                              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: INTER }}>
                              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
                              Back
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Output Panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Dark result box */}
                        <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 20px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>{isRefund ? 'Estimated Refund' : 'Balance Tax Due'}</div>
                            <div style={{ fontSize: 12, color: '#7A8087' }}>Tax liability</div>
                          </div>
                          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                            <div aria-live="polite" aria-label={`${isRefund ? 'Estimated refund' : 'Balance tax due'}: ${fmtIN(Math.abs(result.refundOrDue))}`}
                              style={{ fontSize: 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                              {fmtC(Math.abs(result.refundOrDue))}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmtC(result.taxLiability)}</div>
                          </div>
                        </div>

                        {/* Stat rows */}
                        {[
                          { label: 'Gross Salary (Part B)', value: fmtC(grossSalary) },
                          { label: 'Total Deductions', value: fmtC(result.totalDedn) },
                          { label: 'Taxable Income', value: fmtC(result.taxableIncome) },
                          { label: 'TDS (Form 16 Part A)', value: fmtC(tdsFromForm16) },
                        ].map(row => (
                          <div key={row.label} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '8px 4px', borderBottom: `1px solid ${C.border}` }}>
                            <span style={{ fontSize: 13, color: C.ink3 }}>{row.label}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{row.value}</span>
                          </div>
                        ))}

                        {/* Donut */}
                        <div style={{ order: mobile ? 1 : -1, marginBottom: 12, marginTop: 4 }}>
                          <svg role="img" aria-label={`Tax split: ${taxPct}% tax, ${takePct}% take-home`}
                            width="128" height="128" viewBox="0 0 128 128">
                            <circle cx="64" cy="64" r={donutR} fill="none" stroke={C.border} strokeWidth="16" />
                            <circle cx="64" cy="64" r={donutR} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
                              strokeDasharray={`${takeDash} ${taxDash}`} strokeDashoffset={circ * 0.25} strokeLinecap="butt" />
                            <circle cx="64" cy="64" r={donutR} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16"
                              strokeDasharray={`${taxDash} ${takeDash}`} strokeDashoffset={circ * 0.25 - takeDash} strokeLinecap="butt" />
                            <text x="64" y="60" textAnchor="middle" fontSize="14" fontWeight="800" fill={C.ink}>{takePct}%</text>
                            <text x="64" y="76" textAnchor="middle" fontSize="10" fill={C.ink3}>Take-home</text>
                          </svg>
                        </div>
                        <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: 8 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} />
                            <span style={{ fontSize: 12, color: C.ink2 }}>Take-home</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} />
                            <span style={{ fontSize: 12, color: C.ink2 }}>Tax</span>
                          </div>
                        </div>

                        {result.taxableIncome <= (regime === 'new' ? 1200000 : 500000) && result.taxableIncome > 0 && (
                          <div style={{ background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, padding: '8px 14px', width: '100%', marginTop: 8 }}>
                            <span style={{ fontSize: 12.5, color: '#A15C00', fontWeight: 600 }}>
                              Section 87A rebate applies: tax liability is nil after rebate.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

              <article itemScope itemType="https://schema.org/Article">
                <h2 id="what-is-form16" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>What Is Form 16?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Form 16 is a TDS certificate issued by employers under Section 203 of the Income Tax Act, 1961. It is the primary document that tells a salaried employee how much income was earned and how much tax was deducted and deposited with the government during the financial year.
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Every employer who deducts TDS on salary under Section 192 is required to issue Form 16 to each employee on or before June 15 after the end of the financial year. For FY 2025-26, the deadline is June 15, 2026. Form 16 is mandatory for filing ITR-1 or ITR-2 as a salaried employee. Banks also accept it as income proof for home loan and personal loan applications.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  Form 16 is not the same as a salary slip. A salary slip shows monthly earnings. Form 16 shows the entire year's earnings, deductions, and tax as certified by TRACES (for Part A) and computed by the employer (for Part B).
                </p>

                <h2 id="form16-parts" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Form 16 Part A and Part B Explained</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Form 16 has two distinct parts with different sources and purposes. Confusing them is one of the most common ITR filing errors.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Form 16 Part A vs Part B: key differences for salaried employees.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Feature</th>
                        <th style={thS} scope="col">Part A</th>
                        <th style={thS} scope="col">Part B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { f: 'Source', a: 'TRACES portal (government)', b: 'Employer payroll system' },
                        { f: 'Content', a: 'Quarterly TDS deposited, employer TAN, employee PAN', b: 'Salary breakup, perquisites, deductions, tax computation' },
                        { f: 'Authenticity mark', a: 'TRACES digital signature / watermark', b: 'Employer signature only' },
                        { f: 'Can be prepared manually?', a: 'No - TRACES generated only', b: 'Yes, prepared by employer' },
                        { f: 'Used for in ITR', a: 'TDS credit verification (Form 26AS)', b: 'Deduction and income details' },
                        { f: 'Covers period', a: 'Full year quarterly breakup', b: 'Annual computation' },
                      ].map(r => (
                        <tr key={r.f}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r.f}</td>
                          <td style={tdL}>{r.a}</td>
                          <td style={tdL}>{r.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="form16-calculation" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>How to Calculate Income Tax from Form 16</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Computing tax from Form 16 follows the same slab-based method as any income tax calculation, with the inputs sourced directly from the certificate:
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 20px', fontFamily: 'monospace', fontSize: 13, color: C.ink, marginBottom: 16, overflowX: 'auto' }}>
                  Step 1: Gross Salary (from Part B) minus Standard Deduction<br />
                  Step 2: minus Professional Tax (from Part B)<br />
                  Step 3: minus Deductions (80C, 80D, HRA, home loan) from Part B schedule<br />
                  Step 4: = Taxable Income<br />
                  Step 5: Apply slab rates + 4% cess minus Section 87A rebate = Tax Liability<br />
                  <strong>Step 6: Tax Liability minus TDS (from Part A) = Refund (positive) or Balance Due (negative)</strong>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  The <Link href="/calculators/tax-refund-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Tax Refund Calculator</Link> performs this computation from scratch. This Form 16 calculator mirrors the same computation but is structured around the Form 16 input fields so you can match your certificate line by line.
                </p>

                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Income Tax Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See a full breakdown of income tax for any salary level, both old and new regime.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>

                <h2 id="form16-itr" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Form 16 for ITR Filing: Which Schedule to Use</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  For ITR-1 (Sahaj) filers with only salary income, Form 16 Part B fills the "Salary Schedule" directly: gross salary, house rent allowance, professional tax, and Section 80C onwards. Form 16 Part A fills the "TDS Schedule" (Schedule TDS1 in ITR-2 or ITR-1).
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  The most common mismatch is between the TDS claimed from Form 16 Part A and the TDS amount shown in Form 26AS. Always download Form 26AS from the income tax portal and verify TDS credits match Part A before filing. A mismatch will cause a processing defect notice under Section 139(9).
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  If you have income from multiple employers in the same year (due to a job change), you will receive Form 16 from each employer. File your ITR combining both Part B salary figures and both Part A TDS credits. Ensure both appear in your Form 26AS.
                </p>

                <h2 id="form16-home-loan" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Form 16 for Home Loan: What Banks Need to See</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Banks accept Form 16 as income proof for home loan applications because it is an employer-certified document that cannot be fabricated, unlike salary slips. For home loan eligibility assessment, banks look at the gross salary in Form 16 Part B as the stable income figure, ignoring variable pay or performance bonuses unless they appear in Part B as regular components.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Most lenders ask for Form 16 for the last two to three financial years. If your income has grown significantly over those years, some banks will average the three-year income or use the most recent year's figure, depending on their credit policy. Use the <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link> to estimate how much loan you qualify for based on your Form 16 salary.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Typical documents banks ask for home loans alongside Form 16.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Document</th>
                        <th style={thS} scope="col">Purpose</th>
                        <th style={thS} scope="col">Period Required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { doc: 'Form 16', purpose: 'Annual income and TDS proof', period: 'Last 2-3 years' },
                        { doc: 'Salary slips', purpose: 'Monthly income verification', period: 'Last 3-6 months' },
                        { doc: 'Bank statements', purpose: 'Salary credit and EMI debit proof', period: 'Last 6-12 months' },
                        { doc: 'PAN card', purpose: 'Identity and tax linking', period: 'Current' },
                        { doc: 'Aadhaar', purpose: 'Address and identity proof', period: 'Current' },
                        { doc: 'ITR acknowledgement', purpose: 'Confirms ITR was filed', period: 'Last 2-3 years' },
                      ].map(r => (
                        <tr key={r.doc}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r.doc}</td>
                          <td style={tdL}>{r.purpose}</td>
                          <td style={tdL}>{r.period}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="form16-traces" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>How to Verify Form 16 on TRACES</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  TRACES (TDS Reconciliation Analysis and Correction Enabling System) is the Income Tax Department's platform at tdscpc.gov.in for verifying TDS certificates. Form 16 Part A carries a TRACES watermark and a unique certificate number that taxpayers can verify online.
                </p>
                <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Go to TRACES:</strong> Visit tdscpc.gov.in and click "Taxpayers" in the top navigation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select "Verify TDS Certificate":</strong> Under the Taxpayer Services section, click "Verify TDS Certificate (Form 16/16A/27D)."
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter certificate details:</strong> Provide the TAN (employer's), your PAN, the assessment year, and the certificate number printed on Form 16 Part A.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Confirm TDS amounts:</strong> TRACES shows whether the certificate is valid and whether the TDS amount matches deposited records. A mismatch here means your employer may have TDS errors that need correction.
                  </li>
                </ol>

                <h2 id="form16-format" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Form 16 Format and Required Fields</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  The format of Form 16 was last revised by the CBDT (Central Board of Direct Taxes) in 2019, requiring Part B to include a detailed breakup of salary and all deductions. Key fields required in a valid Form 16 are:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Mandatory fields in Form 16 per CBDT notification. Absence of any Part A field makes the certificate invalid.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Part</th>
                        <th style={thS} scope="col">Required Field</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { part: 'Part A', field: 'Employer TAN and name' },
                        { part: 'Part A', field: 'Employee PAN and name' },
                        { part: 'Part A', field: 'Assessment year' },
                        { part: 'Part A', field: 'Period of employment (from and to dates)' },
                        { part: 'Part A', field: 'Quarterly TDS deposited amounts and challan details' },
                        { part: 'Part A', field: 'TRACES digital signature or watermark' },
                        { part: 'Part B', field: 'Gross salary breakup (basic, HRA, special allowances)' },
                        { part: 'Part B', field: 'Value of perquisites under Section 17(2)' },
                        { part: 'Part B', field: 'Standard deduction of Rs 75,000 (new regime) or Rs 50,000' },
                        { part: 'Part B', field: 'Professional tax deducted' },
                        { part: 'Part B', field: 'Deductions under Chapter VI-A (80C, 80D, NPS, etc.)' },
                        { part: 'Part B', field: 'Taxable income and tax computed (regime selected)' },
                        { part: 'Part B', field: 'Employer signature and designation' },
                      ].map(r => (
                        <tr key={r.part + r.field}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r.part}</td>
                          <td style={tdL}>{r.field}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="form16-vs" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Form 16 vs Form 16A vs Form 16B: Key Differences</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  These three certificates cover different income types. Getting them mixed up is the most common Form 16 question, particularly among people who have both salary income and fixed deposit interest or rental income.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Form 16 vs Form 16A vs Form 16B comparison.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Certificate</th>
                        <th style={thS} scope="col">Issued by</th>
                        <th style={thS} scope="col">For income type</th>
                        <th style={thS} scope="col">IT Act section</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { cert: 'Form 16', by: 'Employer', income: 'Salary only', sec: 'Section 192' },
                        { cert: 'Form 16A', by: 'Banks, clients, others', income: 'Non-salary (FD interest, commission, rent, professional fees)', sec: 'Sections other than 192' },
                        { cert: 'Form 16B', by: 'Property buyer', income: 'Property sale proceeds', sec: 'Section 194IA' },
                      ].map(r => (
                        <tr key={r.cert}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{r.cert}</td>
                          <td style={tdL}>{r.by}</td>
                          <td style={tdL}>{r.income}</td>
                          <td style={tdL}>{r.sec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="form16-regime" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Old vs New Tax Regime from Form 16</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Since FY 2023-24, employers are required to note in Form 16 Part B which tax regime was used for TDS computation. If the employee opted for the old regime and submitted investment declarations, Part B will show deductions under Chapter VI-A. If the new regime applies, only the Rs 75,000 standard deduction appears and no other deductions are listed.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  The regime used by the employer for TDS is not final. When you file your ITR, you can change the regime if doing so reduces your tax liability, subject to the conditions that opt-out of the new regime is allowed only in one ITR return per year for business income taxpayers. For salaried individuals with only salary income, the switch can be made freely at ITR filing time regardless of what the employer used for TDS.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  If you switch to the old regime at ITR time (because your deductions are large), the TDS already deducted under the new regime will appear as excess TDS and generate a refund after filing. The <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> shows the exact tax under both regimes for your income level.
                </p>

                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Old vs New Tax Regime Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compare exactly which regime saves more tax for your Form 16 salary and deductions.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>

                <h2 id="how-to-use" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>How to Use This Form 16 Tax Calculator</h2>
                <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter gross salary from Form 16 Part B:</strong> Find the "Gross Salary" or "Total Salary" figure in Form 16 Part B. This is the starting point before any deductions.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select the regime used in Form 16:</strong> Check Form 16 Part B to see which regime your employer applied. The new regime shows only standard deduction; the old regime shows Chapter VI-A deductions.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter TDS from Form 16 Part A:</strong> The TDS total appears at the bottom of Part A as "Total amount of TDS deposited." Enter this figure in the TDS field.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add deductions (old regime only):</strong> Click "Deductions from Part B" and enter professional tax, 80C, 80D, HRA, home loan interest, and NPS as shown in Form 16 Part B. These must match what your employer declared.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Read your refund or balance:</strong> The result panel shows tax liability, TDS paid, and the net refund or balance due before filing your ITR.
                  </li>
                </ol>


                <h2 id="faq" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em' }}>Frequently Asked Questions</h2>
                <FAQAccordion />

                <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                  <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                    <strong>Disclaimer:</strong> This calculator is for FY 2025-26 (AY 2026-27) and produces indicative results only. Form 16 data accuracy depends on what your employer has filed with TRACES. Always verify TDS credits on Form 26AS and the Annual Information Statement on the income tax portal at <a href="https://incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark }}>incometax.gov.in</a> before filing your ITR. This tool does not constitute professional tax advice. Consult a qualified Chartered Accountant for your actual ITR preparation and filing.
                  </p>
                </div>
              </article>
            </div>

            <style>{`.f16-sidebar::-webkit-scrollbar{width:5px}.f16-sidebar::-webkit-scrollbar-track{background:transparent}.f16-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.f16-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
            <aside className="f16-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ flexShrink: 0 }}><Form16Snapshot /></div>
                <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
                  <SidebarList title="Popular Calculators" items={POPULAR} />
                  <SidebarList title="More Calculators" items={MORE} />
                </nav>
                <div style={{ flexShrink: 0 }}><RelatedReads /></div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </>
  );
}

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
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 },
      { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.30 },
    ];
    let prev = 0;
    for (const slab of slabs) {
      if (taxableIncome <= prev) break;
      const chunk = Math.min(taxableIncome, slab.limit) - prev;
      tax += chunk * slab.rate;
      prev = slab.limit;
    }
    if (taxableIncome <= 1200000) {
      const rebate = Math.min(tax, 60000);
      tax = Math.max(0, tax - rebate);
    }
  } else {
    const slabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ];
    let prev = 0;
    for (const slab of slabs) {
      if (taxableIncome <= prev) break;
      const chunk = Math.min(taxableIncome, slab.limit) - prev;
      tax += chunk * slab.rate;
      prev = slab.limit;
    }
    if (taxableIncome <= 500000) {
      const rebate = Math.min(tax, 12500);
      tax = Math.max(0, tax - rebate);
    }
  }
  const surcharge =
    taxableIncome > 50000000 ? tax * (regime === 'new' ? 0.25 : 0.37) :
    taxableIncome > 10000000 ? tax * (regime === 'new' ? 0.25 : 0.15) :
    taxableIncome > 5000000 ? tax * 0.10 : 0;
  const cess = (tax + surcharge) * 0.04;
  return Math.round(tax + surcharge + cess);
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

function TaxSnapshot() {
  const rows = [
    { label: 'Standard deduction (new)', value: 'Rs 75,000' },
    { label: 'Standard deduction (old)', value: 'Rs 50,000' },
    { label: 'Section 87A limit (new)', value: 'Rs 12,00,000' },
    { label: 'Health & education cess', value: '4%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>FY 2025-26 Snapshot</span>
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
    { href: '/blogs/itr-filing-last-date', label: 'ITR Filing Due Dates AY 2026-27' },
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
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/new-tax-regime-calculator', label: 'New Tax Regime Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/form16-tax-calculator', label: 'Form 16 Tax Calculator' },
  { href: '/calculators/hra-calculator', label: 'HRA Exemption Calculator' },
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
];
const MORE = [
  { href: '/calculators/section-80d-calculator', label: 'Section 80D Calculator' },
  { href: '/calculators/nps-tax-benefit-calculator', label: 'NPS Tax Benefit Calculator' },
  { href: '/calculators/tax-saving-calculator', label: 'Tax Saving Calculator' },
  { href: '/calculators/ctc-calculator', label: 'CTC to In-Hand Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
];

function FAQAccordion() {
  return <FAQBox items={FAQS} />;
}


const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'right' };

export default function TaxRefundCalculatorClient() {
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

  const [grossSalary, setGrossSalary] = useState(1200000);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [dedn80C, setDedn80C] = useState(150000);
  const [dedn80D, setDedn80D] = useState(25000);
  const [hraExemption, setHraExemption] = useState(0);
  const [npsDedn, setNpsDedn] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [otherDedn, setOtherDedn] = useState(0);
  const [tdsDeducted, setTdsDeducted] = useState(0);
  const [advanceTax, setAdvanceTax] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('fermor-tax-refund-v1');
      if (raw) {
        const d = JSON.parse(raw);
        if (typeof d.grossSalary === 'number') setGrossSalary(d.grossSalary);
        if (d.regime === 'old' || d.regime === 'new') setRegime(d.regime);
        if (typeof d.dedn80C === 'number') setDedn80C(d.dedn80C);
        if (typeof d.dedn80D === 'number') setDedn80D(d.dedn80D);
        if (typeof d.hraExemption === 'number') setHraExemption(d.hraExemption);
        if (typeof d.npsDedn === 'number') setNpsDedn(d.npsDedn);
        if (typeof d.homeLoanInterest === 'number') setHomeLoanInterest(d.homeLoanInterest);
        if (typeof d.otherDedn === 'number') setOtherDedn(d.otherDedn);
        if (typeof d.tdsDeducted === 'number') setTdsDeducted(d.tdsDeducted);
        if (typeof d.advanceTax === 'number') setAdvanceTax(d.advanceTax);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('fermor-tax-refund-v1', JSON.stringify({ grossSalary, regime, dedn80C, dedn80D, hraExemption, npsDedn, homeLoanInterest, otherDedn, tdsDeducted, advanceTax }));
    } catch { /* ignore */ }
  }, [grossSalary, regime, dedn80C, dedn80D, hraExemption, npsDedn, homeLoanInterest, otherDedn, tdsDeducted, advanceTax, hydrated]);

  const result = useMemo(() => {
    const stdDedn = regime === 'new' ? 75000 : 50000;
    const totalDedn = regime === 'new' ? stdDedn : stdDedn + Math.min(dedn80C, 150000) + Math.min(dedn80D, 100000) + hraExemption + Math.min(homeLoanInterest, 200000) + Math.min(npsDedn, 50000) + otherDedn;
    const taxableIncome = Math.max(0, grossSalary - totalDedn);
    const taxLiability = computeTax(taxableIncome, regime);
    const totalTaxPaid = tdsDeducted + advanceTax;
    const refundOrDue = totalTaxPaid - taxLiability;
    return { stdDedn, totalDedn, taxableIncome, taxLiability, totalTaxPaid, refundOrDue };
  }, [grossSalary, regime, dedn80C, dedn80D, hraExemption, npsDedn, homeLoanInterest, otherDedn, tdsDeducted, advanceTax]);

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
              Tax Refund Calculator
            </h1>
            <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
              Estimate your income tax refund or balance tax due for FY 2025-26. Compare old and new regime side by side.
            </p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
            <div>
              {/* Calculator Card */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 32 }}>
                {/* Regime Tabs */}
                <div role="tablist" aria-label="Tax regime" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                  {(['new', 'old'] as const).map(r => (
                    <button key={r} id={`tab-${r}`} role="tab" aria-selected={regime === r} aria-controls={`panel-${r}`}
                      onClick={() => setRegime(r)}
                      style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: regime === r ? 700 : 400, color: regime === r ? C.dark : C.ink3, borderBottom: regime === r ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                      {r === 'new' ? 'New Regime (FY 2025-26)' : 'Old Regime (with deductions)'}
                    </button>
                  ))}
                </div>

                <div id={`panel-${regime}`} role="tabpanel" aria-labelledby={`tab-${regime}`}>
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 0 }}>
                    {/* Input Panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>
                        <CurrencySelector theme="light" />
                      </div>

                      {!showAdvanced ? (
                        <>
                          <Slider label="Gross Annual Salary" value={grossSalary} min={100000} max={10000000} step={50000}
                            display={fmtC(grossSalary)} onChange={setGrossSalary} />

                          <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 28 }}>
                            <span style={{ fontSize: 12.5, color: C.ink2 }}>Standard deduction: </span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{regime === 'new' ? 'Rs 75,000' : 'Rs 50,000'} (auto-applied)</span>
                          </div>

                          <Slider label="TDS Deducted by Employer" value={tdsDeducted} min={0} max={1000000} step={5000}
                            display={fmtC(tdsDeducted)} onChange={setTdsDeducted} />

                          <Slider label="Advance Tax Paid" value={advanceTax} min={0} max={500000} step={5000}
                            display={fmtC(advanceTax)} onChange={setAdvanceTax} />

                          {regime === 'old' && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <button onClick={() => setShowAdvanced(true)}
                                style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: INTER }}>
                                Add deductions
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <Slider label="Section 80C (EPF, ELSS, PPF)" value={dedn80C} min={0} max={150000} step={5000}
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
                      {/* Donut chart */}
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
                          { label: 'Gross Income', value: fmtC(grossSalary) },
                          { label: 'Total Deductions', value: fmtC(result.totalDedn) },
                          { label: 'Taxable Income', value: fmtC(result.taxableIncome) },
                          { label: 'TDS + Advance Tax', value: fmtC(result.totalTaxPaid) },
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
                              Section 87A rebate applies: your tax liability is nil after rebate.
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
                <h2 id="what-is-refund" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>What Is an Income Tax Refund in India?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An income tax refund is a repayment from the Income Tax Department when the tax already paid (through TDS and advance tax) exceeds your actual tax liability for the financial year. It is not a discount or benefit: it is your own money returned to you.
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Per the Income Tax Act, 1961, Section 237 entitles every taxpayer to a refund if their total tax payment exceeds the assessed tax for that year. The refund is processed by the Centralised Processing Centre (CPC) in Bengaluru after your ITR is filed and verified.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  The most common reason for a refund is excess TDS: employers deduct TDS based on projected annual income, and if your actual deductions (80C, 80D, HRA) turn out to be higher than declared at the start of the year, the final liability is lower than the TDS deducted, resulting in a refund.
                </p>

                <h2 id="refund-formula" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Tax Refund Calculation Formula</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  The refund calculation has three components: your tax liability (computed from taxable income after deductions), the TDS deducted by your employer, and any advance tax you paid.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 20px', fontFamily: 'monospace', fontSize: 13, color: C.ink, marginBottom: 16, overflowX: 'auto' }}>
                  Taxable Income = Gross Salary - Standard Deduction - Eligible Deductions<br />
                  Tax Liability = Slab Tax (on Taxable Income) - Section 87A Rebate + 4% Cess<br />
                  <strong>Refund = (TDS Deducted + Advance Tax Paid) - Tax Liability</strong>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  A positive result means a refund is due. A negative result means you owe additional tax (balance self-assessment tax) before filing your ITR.
                </p>

                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Income Tax Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See your complete tax breakdown across both regimes for any income level.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>

                <h2 id="regime-comparison" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>New Regime vs Old Regime: Which Gives a Better Refund?</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  The new tax regime gives a better refund when your deductions are limited, because the slabs are lower and the Section 87A rebate covers income up to Rs 12 lakh. The old regime wins when your deductions are large enough to pull your taxable income into a significantly lower slab.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Regime comparison at Rs 12L gross salary with typical deductions. Tax includes 4% cess.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Scenario</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">New Regime</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Old Regime</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { scenario: 'No deductions', newTax: 0, oldTax: 104000 },
                        { scenario: '80C: Rs 1.5L only', newTax: 0, oldTax: 78000 },
                        { scenario: '80C + 80D + NPS', newTax: 0, oldTax: 52000 },
                        { scenario: '80C + HRA Rs 2L', newTax: 0, oldTax: 26000 },
                        { scenario: 'All deductions Rs 4.5L+', newTax: 0, oldTax: 0 },
                      ].map(r => (
                        <tr key={r.scenario}>
                          <td style={tdL}>{r.scenario}</td>
                          <td style={{ ...tdR, color: '#166534' }}>Rs {r.newTax.toLocaleString('en-IN')}</td>
                          <td style={tdR}>Rs {r.oldTax.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, color: r.newTax < r.oldTax ? '#166534' : C.ink }}>{r.newTax <= r.oldTax ? `New saves Rs ${(r.oldTax - r.newTax).toLocaleString('en-IN')}` : `Old saves Rs ${(r.newTax - r.oldTax).toLocaleString('en-IN')}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="tax-slabs" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Income Tax Slabs for FY 2025-26</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  For FY 2025-26 (AY 2026-27), the Income Tax Department maintains two parallel slab structures. The new regime is the default for individuals who do not opt otherwise. Per the Finance Act 2025, the Section 87A rebate under the new regime was increased to Rs 60,000 for taxable income up to Rs 12 lakh.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Tax slabs for individual below 60 years. Cess of 4% applies on tax + surcharge.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Income Range</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">New Regime Rate</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Old Regime Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { range: 'Up to Rs 2,50,000', newR: 'Nil', oldR: 'Nil' },
                        { range: 'Rs 2,50,001 to Rs 4,00,000', newR: 'Nil', oldR: '5%' },
                        { range: 'Rs 4,00,001 to Rs 5,00,000', newR: '5%', oldR: '5%' },
                        { range: 'Rs 5,00,001 to Rs 8,00,000', newR: '5%', oldR: '20%' },
                        { range: 'Rs 8,00,001 to Rs 10,00,000', newR: '10%', oldR: '20%' },
                        { range: 'Rs 10,00,001 to Rs 12,00,000', newR: '10%', oldR: '30%' },
                        { range: 'Rs 12,00,001 to Rs 16,00,000', newR: '15%', oldR: '30%' },
                        { range: 'Rs 16,00,001 to Rs 20,00,000', newR: '20%', oldR: '30%' },
                        { range: 'Rs 20,00,001 to Rs 24,00,000', newR: '25%', oldR: '30%' },
                        { range: 'Above Rs 24,00,000', newR: '30%', oldR: '30%' },
                      ].map(r => (
                        <tr key={r.range}>
                          <td style={tdL}>{r.range}</td>
                          <td style={{ ...tdR }}>{r.newR}</td>
                          <td style={{ ...tdR }}>{r.oldR}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="deductions" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Section 80C, 80D, and Other Deductions That Maximize Your Refund</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Under the old tax regime, deductions directly reduce taxable income. Every rupee of deduction at the 30% slab saves 31.2 paise in tax (including 4% cess). These are the major deductions available:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Key deductions under old tax regime for FY 2025-26.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Section</th>
                        <th style={thS} scope="col">What Qualifies</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Maximum Limit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { section: 'Sec 80C', what: 'EPF, ELSS, PPF, NSC, LIC, home loan principal', limit: 'Rs 1,50,000' },
                        { section: 'Sec 80D', what: 'Health insurance premium (self and parents)', limit: 'Rs 25,000-1,00,000' },
                        { section: 'Sec 24(b)', what: 'Home loan interest on self-occupied property', limit: 'Rs 2,00,000' },
                        { section: 'Sec 80CCD(1B)', what: 'NPS contribution (over and above 80C)', limit: 'Rs 50,000' },
                        { section: 'HRA Exemption', what: 'House rent allowance for rent paid', limit: 'As per calculation' },
                        { section: 'Sec 80E', what: 'Interest on education loan', limit: 'Full interest, 8 years' },
                        { section: 'Sec 80G', what: 'Donations to approved charities', limit: '50%-100% of donation' },
                        { section: 'Sec 80TTA', what: 'Interest from savings accounts', limit: 'Rs 10,000' },
                      ].map(r => (
                        <tr key={r.section}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r.section}</td>
                          <td style={tdL}>{r.what}</td>
                          <td style={tdR}>{r.limit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  Use the <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80C Calculator</Link> to see exactly how much tax each investment type saves. For health insurance deductions, the <Link href="/calculators/section-80d-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80D Calculator</Link> breaks down the limit for self, family, and parents separately.
                </p>

                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Old vs New Tax Regime Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Find which regime minimizes your tax liability for your exact income and deductions.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>

                <h2 id="tds-salary" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>TDS on Salary: How Form 16 Determines Your Refund</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  TDS on salary is governed by Section 192 of the Income Tax Act. Your employer estimates your annual tax at the beginning of each financial year based on your projected salary and declared investments. This estimated tax is divided by 12 and deducted monthly from your salary.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Form 16 Part A contains the quarterly TDS deposit receipts as certified by TRACES (TDS Reconciliation Analysis and Correction Enabling System). Part B contains the salary breakdown and deductions as computed by your employer. Check Form 16 breakdowns in our <Link href="/calculators/form16-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Form 16 Tax Calculator</Link>, test overall income in our <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>, or evaluate rent exemptions in our <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</Link>.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  If your employer under-declared your investments (because you did not submit proof of investment on time), the TDS deducted will be higher than necessary. You claim all eligible deductions in your ITR, and the difference becomes your refund.
                </p>

                <h2 id="refund-timeline" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>When Is Income Tax Refund Credited? Timeline and Process</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  The Income Tax Department processes about 93% of electronically verified ITRs within 30 to 60 days, per CPC Bengaluru data. Refunds are credited directly to the pre-validated bank account linked to your PAN on the e-filing portal at incometax.gov.in.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>Typical income tax refund processing timeline.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Stage</th>
                        <th style={thS} scope="col">Typical Timeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { stage: 'ITR filed and e-verified', time: 'Immediate (online)' },
                        { stage: 'ITR under processing at CPC', time: '7-30 days after verification' },
                        { stage: 'Refund determined and intimation issued', time: '30-60 days after filing' },
                        { stage: 'Refund credited to bank account', time: '5-7 working days after issue' },
                        { stage: 'Large refunds (over Rs 1 lakh) or scrutiny cases', time: '60-180 days or more' },
                      ].map(r => (
                        <tr key={r.stage}>
                          <td style={tdL}>{r.stage}</td>
                          <td style={tdL}>{r.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 id="refund-status" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>How to Check Income Tax Refund Status</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Refund status is available directly on the Income Tax e-filing portal at incometax.gov.in without any third-party site. Log in with your PAN and password, navigate to "e-file," then "Income Tax Returns," and select "View Filed Returns" to see the current processing status for each assessment year.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 24px' }}>
                  The NSDL refund status tracker at tin.tin.nsdl.com also shows refund status for returns processed at the CPC. You need your PAN and the assessment year. If the status shows "Refund Failure," it typically means your bank account details are incorrect or the account is not pre-validated. Log in to the e-filing portal, go to "My Profile," and update or pre-validate your bank account immediately.
                </p>

                <h2 id="refund-delay" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Common Reasons Your Tax Refund Is Delayed or Rejected</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px' }}>
                  Most refund delays are caused by one of four avoidable issues:
                </p>
                <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Bank account not pre-validated:</strong> The Income Tax Department can only credit refunds to a bank account that is pre-validated on the e-filing portal with your PAN and account number. A savings account that exists but is not pre-validated will cause a refund failure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Outstanding demand from a prior year:</strong> If you have an unpaid tax demand from any previous assessment year, the Income Tax Department will set it off against your current refund before releasing the balance. Check "Outstanding Demand" on the e-filing portal.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Mismatch between Form 26AS and ITR:</strong> If the TDS you claimed in your ITR does not match the TDS credits shown in Form 26AS (the tax credit statement), the CPC will flag a mismatch and delay processing. Always verify Form 26AS before filing.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Defect notice or incomplete ITR:</strong> If your ITR is filed with incomplete information or in the wrong form, the CPC sends a defect notice under Section 139(9). You have 15 days to correct the defect. Ignoring the notice causes the return to be treated as invalid, and the refund is withheld.
                  </li>
                </ol>

                <h2 id="how-to-use" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>How to Use This Tax Refund Calculator</h2>
                <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your gross annual salary:</strong> Use the slider or click the value to type your CTC or gross salary before any deductions.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select new or old regime:</strong> The tabs at the top of the calculator switch between regimes. Standard deduction is auto-applied based on your selection.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add deductions (old regime):</strong> Click "Add deductions" to enter Section 80C, 80D, HRA exemption, home loan interest, NPS, and other deductions. These are not available under the new regime.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter TDS and advance tax paid:</strong> Enter the TDS figure from Form 16 Part A and any advance tax you paid during the year. The calculator shows your refund or balance due instantly.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compare regimes:</strong> Switch between the new and old regime tabs to see which gives a better outcome for your specific income and deductions.
                  </li>
                </ol>


                <h2 id="faq" style={{ fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em' }}>Frequently Asked Questions</h2>
                <FAQAccordion />

                <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                  <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                    <strong>Disclaimer:</strong> All calculations on this page are indicative only for FY 2025-26 and are based on publicly available tax slab data. This calculator does not constitute professional tax advice. Tax liability depends on individual circumstances including the nature of income, applicable surcharges, and deductions that may not be covered here. Consult a qualified Chartered Accountant or tax advisor before filing your ITR. Per <a href="https://incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark }}>incometax.gov.in</a>, all taxpayers are encouraged to verify their liability on the official portal.
                  </p>
                </div>
              </article>
            </div>

            <style>{`
              .tr-sidebar::-webkit-scrollbar { width: 5px; }
              .tr-sidebar::-webkit-scrollbar-track { background: transparent; }
              .tr-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .tr-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            {/* Sidebar */}
            <aside className="tr-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ flexShrink: 0 }}><TaxSnapshot /></div>
                <nav aria-label="Related Calculators" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
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

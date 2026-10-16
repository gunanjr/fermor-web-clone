'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
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
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

interface TDSSection {
  code: string;
  name: string;
  desc: string;
  rateIndiv: number;   // rate for Individual/HUF
  rateCorp: number;    // rate for Company/Firm
  threshold: number;   // annual threshold limit
}

const TDS_SECTIONS: TDSSection[] = [
  { code: '194J-prof', name: 'Professional Fees (194J)', desc: 'Fees for professional services, royalties, non-compete fees', rateIndiv: 0.10, rateCorp: 0.10, threshold: 30000 },
  { code: '194J-tech', name: 'Technical Services (194J)', desc: 'Fees for technical services, call center operations', rateIndiv: 0.02, rateCorp: 0.02, threshold: 30000 },
  { code: '194C',      name: 'Contractor Payments (194C)', desc: 'Payments to contractors, sub-contractors, advertising, catering', rateIndiv: 0.01, rateCorp: 0.02, threshold: 30000 }, // or 1,00,000 aggregate
  { code: '194I-prop', name: 'Rent on Property (194I)', desc: 'Rent paid for land, building, furniture, or fittings', rateIndiv: 0.10, rateCorp: 0.10, threshold: 240000 },
  { code: '194I-mach', name: 'Rent on Machinery (194I)', desc: 'Rent paid for plant, machinery, or equipment', rateIndiv: 0.02, rateCorp: 0.02, threshold: 240000 },
  { code: '194H',      name: 'Commission & Brokerage (194H)', desc: 'Commission or brokerage fees (except insurance)', rateIndiv: 0.05, rateCorp: 0.05, threshold: 15000 },
  { code: '194A',      name: 'Interest on Bank Deposits (194A)', desc: 'Interest paid by banks or co-operatives on deposits', rateIndiv: 0.10, rateCorp: 0.10, threshold: 40000 }, // 50,000 for senior citizens
  { code: '194-IA',    name: 'Sale of Property (194-IA)', desc: 'Purchase of immovable property (other than agricultural land)', rateIndiv: 0.01, rateCorp: 0.01, threshold: 5000000 },
];

/* ─── Slider Component ────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Donut Chart Component ──────────────────────────────────── */
function DonutChart({ tdsAmount, netPayout }: { tdsAmount: number; netPayout: number }) {
  const total = tdsAmount + netPayout;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const tdsPct = (tdsAmount / total) * 100;
  const payPct = (netPayout / total) * 100;
  const tdsArc = (tdsAmount / total) * circ;
  const payArc = circ - tdsArc;

  return (
    <svg role="img" aria-label={`Payout split: ${tdsPct.toFixed(1)}% TDS, ${payPct.toFixed(1)}% Net Payout`} width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#fafafa" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${payArc} ${circ}`} strokeDashoffset={0} transform="rotate(-90 106 106)" />
      {tdsAmount > 0 && (
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw}
          strokeDasharray={`${tdsArc} ${circ}`} strokeDashoffset={-payArc} transform="rotate(-90 106 106)" />
      )}
      <text x={cx} y={cy + 6} textAnchor="middle" style={{ fontSize: 19, fontWeight: 800, fill: C.ink, fontFamily: INTER }}>
        {tdsPct.toFixed(1)}%
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" style={{ fontSize: 10, color: C.ink3, fill: C.ink3, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: INTER }}>
        TDS Rate
      </text>
    </svg>
  );
}

const defaultSettings = {
  sectionCode: '194J-prof',
  paymentAmount: 500000,
  hasPan: true,
  payeeType: 'individual',
  isNri: false,
};

const POPULAR = [
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/surcharge-calculator', label: 'Income Tax Surcharge' },
  { href: '/calculators/hra-calculator', label: 'HRA Calculator' },
  { href: '/calculators/effective-tax-rate-calculator', label: 'Effective Tax Rate Calculator' },
  { href: '/calculators/capital-gains-calculator', label: 'Capital Gains Tax Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
];

const MORE = [
  { href: '/calculators/dividend-tax-calculator', label: 'Dividend Tax Calculator' },
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
  { href: '/calculators/section-80d-calculator', label: 'Section 80D Calculator' },
  { href: '/calculators/professional-tax-calculator', label: 'Professional Tax Calculator' },
  { href: '/calculators/form16-tax-calculator', label: 'Form 16 Tax Calculator' },
];

export default function TDSCalculatorClient() {
  const { settings, updateSettings, isLoaded } = useCalculatorSettings('tds-calculator', defaultSettings);
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { sectionCode, paymentAmount, hasPan, payeeType, isNri } = settings;

  const setSectionCode = (v: string) => updateSettings({ sectionCode: v });
  const setPaymentAmount = (v: number) => updateSettings({ paymentAmount: v });
  const setHasPan = (v: boolean) => updateSettings({ hasPan: v });
  const setPayeeType = (v: string) => updateSettings({ payeeType: v });
  const setIsNri = (v: boolean) => updateSettings({ isNri: v });

  // Finding currently selected section details
  const currentSection = useMemo(() => {
    return TDS_SECTIONS.find(s => s.code === sectionCode) || TDS_SECTIONS[0];
  }, [sectionCode]);

  // TDS Calculations
  const results = useMemo(() => {
    let baseRate = payeeType === 'individual' ? currentSection.rateIndiv : currentSection.rateCorp;
    
    // Penal rate if PAN is not available
    let appliedRate = baseRate;
    if (!hasPan) {
      appliedRate = 0.20; // flat 20% under Section 206AA
    }

    // Threshold check
    const isExceeded = paymentAmount >= currentSection.threshold;
    let rawTds = 0;
    if (isExceeded) {
      rawTds = paymentAmount * appliedRate;
    }

    let surchargeRate = 0;
    let cessRate = 0;

    // Surcharge and Cess apply only for NRI payees (and salaries, but we exclude salaries here for fixed section TDS)
    if (isNri && isExceeded) {
      cessRate = 0.04;
      if (paymentAmount > 50000000) {
        surchargeRate = 0.15; // capped at 15% for dividends and capital gains, standard regular can be up to 25% or 37%
      } else if (paymentAmount > 20000000) {
        surchargeRate = 0.15;
      } else if (paymentAmount > 10000000) {
        surchargeRate = 0.15;
      } else if (paymentAmount > 5000000) {
        surchargeRate = 0.10;
      }
    }

    const surchargeAmount = rawTds * surchargeRate;
    const cessAmount = (rawTds + surchargeAmount) * cessRate;
    const totalTds = Math.round(rawTds + surchargeAmount + cessAmount);
    const netPayout = Math.max(0, paymentAmount - totalTds);

    return {
      baseRate,
      appliedRate,
      isExceeded,
      tdsDeducted: totalTds,
      surchargeAmount,
      cessAmount,
      netPayout,
      actualTdsRate: paymentAmount > 0 ? (totalTds / paymentAmount) * 100 : 0,
    };
  }, [paymentAmount, currentSection, payeeType, hasPan, isNri]);

  // Formatting helpers
  const currencyCode = selectedCurrency?.code || 'INR';
  const fmtC = (val: number) => formatCurrency(val);
  const fmtIN = (val: number) => {
    if (currencyCode !== 'INR') return fmtC(val);
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const h2s = { fontSize: mobile ? 18 : 22, fontWeight: 700, color: C.ink, margin: '32px 0 16px', fontFamily: POPPINS, scrollMarginTop: 80 };
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.7, margin: '0 0 16px' };
  const tableS = { width: '100%', borderCollapse: 'collapse' as const, fontSize: 13, marginBottom: 24, fontFamily: INTER };
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const } as React.CSSProperties;

  if (!isLoaded) return null;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>TDS Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate Tax Deducted at Source (TDS) rates, thresholds, and net payouts under different sections of the Income Tax Act.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Payment Parameters</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Section Select */}
                  <div style={{ marginBottom: 24 }}>
                    <label htmlFor="section-select" style={{ display: 'block', fontSize: 13.5, color: C.ink2, fontWeight: 500, marginBottom: 8 }}>Nature of Payment / Section</label>
                    <select id="section-select" value={sectionCode} onChange={e => setSectionCode(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, color: C.ink, outline: 'none', background: C.white, fontFamily: INTER, fontWeight: 500 }}>
                      {TDS_SECTIONS.map(s => (
                        <option key={s.code} value={s.code}>{s.name}</option>
                      ))}
                    </select>
                    <p style={{ fontSize: 11.5, color: C.ink3, marginTop: 5, lineHeight: 1.4 }}>{currentSection.desc}</p>
                  </div>

                  <Slider id="payment" label="Gross Payment Amount" value={paymentAmount} min={1000} max={50000000} step={1000}
                    fmt={fmtIN} onChange={setPaymentAmount} compact />

                  {/* PAN status Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, border: `1px solid ${C.border}`, padding: '10px 14px', borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 400, color: C.ink2 }}>PAN Card Available?</span>
                    <button onClick={() => setHasPan(!hasPan)} aria-pressed={hasPan}
                      style={{ width: 40, height: 22, borderRadius: 11, background: hasPan ? C.ink : C.border, border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 9, background: C.white, position: 'absolute', top: 2, left: hasPan ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </button>
                  </div>

                  {/* Payee Category Toggle */}
                  <div style={{ marginBottom: 20 }}>
                    <label id="payee-label" style={{ display: 'block', fontSize: 13.5, color: C.ink2, fontWeight: 500, marginBottom: 8 }}>Payee Category</label>
                    <div role="group" aria-labelledby="payee-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(['individual', 'corporate'] as const).map(t => (
                        <button key={t} onClick={() => setPayeeType(t)} aria-pressed={payeeType === t}
                          style={{ flex: 1, padding: '9px 10px', border: 'none', background: payeeType === t ? C.white : 'transparent',
                            color: payeeType === t ? C.ink : C.ink3, fontWeight: payeeType === t ? 600 : 400,
                            cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                          {t === 'individual' ? 'Individual / HUF' : 'Company / Firm'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Residency status Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, border: `1px solid ${C.border}`, padding: '10px 14px', borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 400, color: C.ink2 }}>Is Payee Non-Resident (NRI)?</span>
                    <button onClick={() => setIsNri(!isNri)} aria-pressed={isNri}
                      style={{ width: 40, height: 22, borderRadius: 11, background: isNri ? C.ink : C.border, border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 9, background: C.white, position: 'absolute', top: 2, left: isNri ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                    </button>
                  </div>
                </div>

                {/* Results Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ order: mobile ? 1 : -1, marginBottom: 24 }}>
                    <DonutChart tdsAmount={results.tdsDeducted} netPayout={results.netPayout} />
                  </div>
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Net Payout</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>TDS Deducted</span>
                    </div>
                  </div>

                  {/* Primary result: TDS Deducted */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: '#50565C' }}>TDS Deducted</span>
                      {!hasPan && <span style={{ fontSize: 10.5, color: '#101214' }}>Penalty Rate (No PAN)</span>}
                    </div>
                    <span aria-live="polite" aria-label={`TDS: ${fmtC(results.tdsDeducted)}`} style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtC(results.tdsDeducted)}
                    </span>
                  </div>

                  {/* Payout details */}
                  {[
                    { label: 'Gross Payment', value: fmtC(paymentAmount) },
                    { label: 'Exemption Threshold', value: fmtC(currentSection.threshold) },
                    { label: 'Threshold Exceeded?', value: results.isExceeded ? 'Yes' : 'No (No TDS)' },
                    { label: 'Base TDS Rate', value: `${(results.baseRate * 100).toFixed(1)}%` },
                    { label: 'Applied TDS Rate', value: `${(results.appliedRate * 100).toFixed(1)}%` },
                    { label: 'NRI Surcharge', value: fmtC(results.surchargeAmount), hide: !isNri },
                    { label: 'NRI Cess (4%)', value: fmtC(results.cessAmount), hide: !isNri },
                    { label: 'Net Payable Payout', value: fmtC(results.netPayout) },
                    { label: 'Effective TDS Rate', value: `${results.actualTdsRate.toFixed(2)}%` },
                  ].filter(r => !r.hide).map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waitlist and CTA Area */}
            <SaveResultsCard mobile={mobile} />


            {/* ── ARTICLE PROSE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              
              <h2 id="what-is-tds" style={h2s}>What Is Tax Deducted at Source (TDS)?</h2>
              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  Tax Deducted at Source (TDS) is a system of direct tax collection in India where the tax is deducted at the origin of a transaction. The payer deducts the applicable tax amount before releasing the net payout to the payee, and deposits this tax with the Income Tax Department.
                </p>
              </div>
              <p style={p}>
                This system helps the government collect taxes on a continuous basis, reducing tax evasion and creating a transparent trail of high-value transactions. Every deductor must file quarterly TDS returns detailing the amount deducted and deposited against the payee's Permanent Account Number (PAN).
              </p>
              <p style={p}>
                Payees can view their accumulated TDS credits by checking their Form 26AS or Annual Information Statement (AIS) on the income tax e-filing portal. These credits are fully adjustable against the taxpayer's final tax liability computed at the end of the financial year.
              </p>

              <h2 id="tds-sections" style={h2s}>Common TDS Sections and Rates Chart for FY 2026-27</h2>
              <p style={p}>
                The Income Tax Act prescribes different rates and deduction thresholds based on the nature of payment. Let us review the most frequently used sections in commercial transactions:
              </p>
              <table style={tableS}>
                <caption>TDS Sections, Rates, and Exemption Threshold Limits</caption>
                <thead>
                  <tr>
                    <th style={thS} scope="col">Section</th>
                    <th style={thS} scope="col">Nature of Payment</th>
                    <th style={thS} scope="col">Exemption Threshold (Annual)</th>
                    <th style={thS} scope="col">Resident Rate (Indiv/HUF)</th>
                    <th style={thS} scope="col">Resident Rate (Corp/Firm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdL}>Section 194J</td>
                    <td style={tdL}>Professional Fees / Technical Services</td>
                    <td style={tdL}>Rs 30,000</td>
                    <td style={tdR}>10% (or 2% for tech)</td>
                    <td style={tdR}>10% (or 2% for tech)</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Section 194C</td>
                    <td style={tdL}>Contractor & Sub-contractor Payments</td>
                    <td style={tdL}>Rs 30,000 (Rs 1 Lakh aggregate)</td>
                    <td style={tdR}>1%</td>
                    <td style={tdR}>2%</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Section 194I</td>
                    <td style={tdL}>Rent on Land, Building, or Property</td>
                    <td style={tdL}>Rs 50,000/month</td>
                    <td style={tdR}>10%</td>
                    <td style={tdR}>10%</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Section 194H</td>
                    <td style={tdL}>Commission & Brokerage</td>
                    <td style={tdL}>Rs 15,000</td>
                    <td style={tdR}>5%</td>
                    <td style={tdR}>5%</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Section 194A</td>
                    <td style={tdL}>Interest on Bank FD / Deposits</td>
                    <td style={tdL}>Rs 40,000 (Rs 50,000 for Seniors)</td>
                    <td style={tdR}>10%</td>
                    <td style={tdR}>10%</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Section 194-IA</td>
                    <td style={tdL}>Sale of Immovable Property</td>
                    <td style={tdL}>Rs 50,00000</td>
                    <td style={tdR}>1%</td>
                    <td style={tdR}>1%</td>
                  </tr>
                </tbody>
              </table>

              <h2 id="missing-pan" style={h2s}>Impact of Missing PAN: Section 206AA</h2>
              <p style={p}>
                If a payee fails to provide their PAN card details to the payer, Section 206AA of the Income Tax Act dictates that tax must be deducted at higher penalty rates.
              </p>
              <p style={p}>
                The applied rate is the higher of: (1) the rate specified in the relevant section of the Act, (2) the rate in force, or (3) a flat 20%. For example, a contractor payment that typically attracts a 1% TDS will be taxed at 20% if the contractor does not share a valid PAN card.
              </p>

              <h2 id="payout-math" style={h2s}>TDS Payout Calculation Formula and Worked Example</h2>
              <p style={p}>
                The basic formula to compute the net payout is:
              </p>
              <div style={{ background: '#fafafa', padding: '16px 20px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'Courier, monospace', fontSize: 13.5, color: C.ink, marginBottom: 16 }}>
                Net Payout = Gross Bill Amount - TDS Deducted<br />
                TDS Deducted = Gross Bill Amount * Applicable TDS Rate
              </div>
              <p style={p}>
                Let us calculate a professional payment under Section 194J:
              </p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Gross Bill:</strong> Rs 1,00,000
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>TDS Rate (Section 194J Professional):</strong> 10%
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>TDS Amount:</strong> Rs 1,00,000 * 10% = Rs 10,000
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Net Payout:</strong> Rs 1,00,000 - Rs 10,000 = Rs 90,000
                </li>
              </ul>

              <h2 id="salary-tds" style={h2s}>How TDS Is Calculated on Salary (Section 192)</h2>
              <p style={p}>
                TDS on salary is calculated on an estimated average basis rather than a flat rate. The employer estimates the employee's gross annual salary, subtracts standard deduction, exemptions (like HRA under Section 10(13A)), and deductions under Section 80C or 80D.
              </p>
              <p style={p}>
                The resulting annual tax liability is computed using the active tax slabs under either the old or new regime. This annual tax is then divided by 12 and deducted from the employee's monthly pay check. Salaried employees can check their exact slab details using our <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer">Income Tax Calculator</Link>.
              </p>

              <h2 id="quarterly-returns" style={h2s}>TDS Return Due Dates and Calendar</h2>
              <p style={p}>
                Every deductor is legally required to file TDS returns quarterly. Late filing attracts a fee of Rs 200 per day under Section 234E of the Income Tax Act.
              </p>
              <table style={tableS}>
                <caption>Quarterly TDS Return Filing Deadlines</caption>
                <thead>
                  <tr>
                    <th style={thS} scope="col">Quarter</th>
                    <th style={thS} scope="col">Period Covered</th>
                    <th style={thS} scope="col">Filing Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdL}>Q1</td>
                    <td style={tdL}>April 1 to June 30</td>
                    <td style={tdR}>July 31</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Q2</td>
                    <td style={tdL}>July 1 to September 30</td>
                    <td style={tdR}>October 31</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Q3</td>
                    <td style={tdL}>October 1 to December 31</td>
                    <td style={tdR}>January 31</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Q4</td>
                    <td style={tdL}>January 1 to March 31</td>
                    <td style={tdR}>May 31</td>
                  </tr>
                </tbody>
              </table>

              <h2 id="how-to-use" style={h2s}>How to Use This TDS Calculator</h2>
              <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Select Payment:</strong> choose the correct section or payment type from the dropdown list.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Enter Amount:</strong> use the slider or click the button to type your gross bill amount.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Options & Status:</strong> toggle PAN card availability, payee type, and NRI status to adjust calculation rates.
                </li>
              </ol>

              

              <h2 id="faq" style={h2s}>Frequently Asked Questions</h2>
              <FAQBox items={[
                  { q: 'Is TDS applicable if the bill is below the threshold?', a: 'No, TDS is not deducted if the total payments made to a payee in a financial year remain below the threshold defined in the specific section.' },
                  { q: 'Is surcharge added to TDS rates on resident payments?', a: 'No, surcharge and education cess are not added to TDS on payments made to resident individuals, except for salary payments.' },
                  { q: 'Can TDS be deducted without a PAN card?', a: 'Yes, but it will be deducted at a higher penalty rate of 20% under Section 206AA.' },
                  { q: 'What is the limit for TDS deduction on interest from savings accounts?', a: 'Interest on savings accounts (under Section 194A) is generally exempt from TDS, but FD interest attracts TDS if it exceeds Rs 40,000 (Rs 50,000 for senior citizens) in a year.' },
                  { q: 'What is Form 16 and how is it related to TDS?', a: 'Form 16 is a certificate issued by an employer showing the total salary paid and the TDS deducted for the financial year. It is used to file your ITR.' },
                  { q: 'What is the difference between TDS and TCS?', a: 'TDS (Tax Deducted at Source) is deducted on payments or expenses, whereas TCS (Tax Collected at Source) is collected by a seller from the buyer at the time of sale of specific goods (like scrap, timber, or luxury cars).' },
                  { q: 'How long does it take for TDS details to show in Form 26AS?', a: 'TDS details typically reflect in Form 26AS within 7 to 10 days after the deductor files their quarterly TDS returns.' },
                  { q: 'Is TDS deducted on GST component?', a: 'No. As per CBDT circulars, TDS is deducted on the basic value of the invoice, excluding the GST component, provided the GST component is shown separately on the invoice.' },
                  { q: 'What is Section 197 low TDS certificate?', a: 'If a payee\'s total tax liability is estimated to be nil or low, they can apply to the Assessing Officer under Section 197 for a certificate authorizing the payer to deduct TDS at lower or nil rates.' },
                  { q: 'What is the penalty for not deducting TDS?', a: 'If a payer fails to deduct TDS, they are liable to pay interest at 1% per month from the date the tax was deductible to the date it is deducted, and 1.5% per month from the date of deduction to the date of deposit.' }
              ]} />

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. TDS rates and threshold limits are subject to change by financial laws and annual budgets. Payout splits are estimates based on standard interpretation of the Income Tax Act. Verify rates with a qualified Chartered Accountant before making payouts.
                </p>
              </div>

            </article>
          </div>

          {/* Sidebar */}
          <aside className="tds-sidebar" style={{
            position: 'sticky',
            top: 88,
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            scrollbarWidth: 'thin',
            scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <style>{`
              .tds-sidebar::-webkit-scrollbar { width: 5px; }
              .tds-sidebar::-webkit-scrollbar-track { background: transparent; }
              .tds-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .tds-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
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
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

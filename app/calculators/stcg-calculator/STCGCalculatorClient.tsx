'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
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

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
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

/* ─── ToggleGroup Component ─────────────────────────────────── */
function ToggleGroup({ label, options, value, onChange }: {
  label: string; options: { value: string; label: string }[]; value: string; onChange: (v: any) => void;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 12px' }}>{label}</p>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {options.map(opt => (
          <button key={opt.value}
            role="radio" aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1, padding: '10px 6px', fontFamily: INTER, fontSize: 13, cursor: 'pointer',
              border: 'none', background: value === opt.value ? C.white : 'transparent',
              color: value === opt.value ? C.ink : C.ink3,
              fontWeight: value === opt.value ? 600 : 400,
              transition: 'all 0.12s',
            }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({ netPct }: { netPct: number }) {
  const taxPct = 100 - netPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const nArc = (netPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Net Gains ${netPct.toFixed(0)}%, STCG Tax paid ${taxPct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${nArc} ${circ - nArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Net Gains</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{netPct.toFixed(0)}%</text>
    </svg>
  );
}

/* ─── Sidebar list ────────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ borderBottom: i === items.length - 1 ? 'none' : `1px solid ${C.border}` }}>
            <Link href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '12px 20px', fontSize: 14, color: C.ink2, textDecoration: 'none', transition: 'all 0.12s' }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/capital-gains-calculator',   label: 'Capital Gains Calculator' },
  { href: '/calculators/income-tax-calculator',    label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/lumpsum-calculator',       label: 'Lumpsum Calculator' },
];
const MORE = [
  { href: '/calculators/dividend-tax-calculator',  label: 'Dividend Tax Calculator' },
  { href: '/calculators/salary-breakdown-calculator', label: 'Salary Breakdown Calculator' },
  { href: '/calculators/gratuity-calculator',      label: 'Gratuity Calculator' },
  { href: '/calculators/elss-calculator',          label: 'ELSS Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What are Short-Term Capital Gains (STCG)?', a: 'Short-Term Capital Gains (STCG) are profits earned from the sale of an asset (such as equity shares, mutual funds, gold, or real estate) held for a relatively short duration. The holding period that defines an asset as short-term varies between 12 and 36 months depending on the asset class.' },
  { q: 'What is the STCG tax rate on equity shares under the Finance Act 2024?', a: 'Under the Finance Act 2024 changes (effective July 23, 2024), the STCG tax rate on listed equity shares and equity-oriented mutual funds (covered under Section 111A) has been increased from 15% to 20%.' },
  { q: 'How are short-term gains on debt mutual funds taxed?', a: 'For debt mutual funds purchased on or after April 1, 2023, short-term capital gains are added directly to your total income and taxed according to your individual income tax slab rates, regardless of the holding period.' },
  { q: 'What is the holding period for real estate to qualify as STCG?', a: 'For immovable property (land or building), gains are classified as short-term if the asset is held for 24 months or less. If held for more than 24 months, it is treated as Long-Term Capital Gains (LTCG).' },
  { q: 'Is there any basic exemption limit for STCG in India?', a: 'There is no special basic exemption for STCG. If your total income (including STCG) is below the basic tax exemption limit (Rs 7 lakh under the new tax regime, or Rs 2.5/3 lakh under the old regime), you may not have to pay tax. Otherwise, STCG is taxed fully at the statutory rate (20% for equity) or slab rates.' },
  { q: 'Can I deduct transfer expenses when calculating STCG?', a: 'Yes. Brokerage, registry fees, stamp duty, commission, and other direct expenses incurred solely in connection with the transfer or sale of the asset can be deducted from the sale price to compute net capital gains.' },
  { q: 'How is STCG on gold and jewelry taxed?', a: 'Short-term capital gains on physical gold, jewelry, or digital gold (held for 36 months or less) are added to your gross total income and taxed at your regular slab rates.' },
  { q: 'Can short-term capital losses be offset against other gains?', a: 'Yes. Short-term capital losses (STCL) can be offset or set off against both short-term capital gains (STCG) and long-term capital gains (LTCG) in the same financial year. Unabsorbed losses can be carried forward for up to 8 assessment years.' },
  { q: 'Can I claim Section 80C deductions against equity STCG?', a: 'No. Chapter VI-A deductions (such as Section 80C, 80D, etc.) are strictly not allowed as deductions against special-rate capital gains like equity STCG under Section 111A.' },
  { q: 'What is the holding period for equity shares to qualify as STCG?', a: 'For listed equity shares and equity-oriented mutual funds, the holding period is 12 months or less to qualify as short-term. If held for more than 12 months, the gains are treated as LTCG.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client Component ───────────────────────────────────── */

export default function STCGCalculatorClient() {
  const defaultSettings = {
    purchasePrice: 200000,
    salePrice: 280000,
    transferExpenses: 2000,
    holdingPeriod: 8,
    assetClass: 'equity' as 'equity' | 'debt' | 'property' | 'gold',
    taxSlab: 30,
  };
  const { settings, updateSettings } = useCalculatorSettings('stcg-calculator', defaultSettings);
  const { purchasePrice, salePrice, transferExpenses, holdingPeriod, assetClass, taxSlab } = settings;

  const setPurchasePrice = (v: any) => updateSettings({ purchasePrice: typeof v === 'function' ? v(settings.purchasePrice) : v });
  const setSalePrice = (v: any) => updateSettings({ salePrice: typeof v === 'function' ? v(settings.salePrice) : v });
  const setTransferExpenses = (v: any) => updateSettings({ transferExpenses: typeof v === 'function' ? v(settings.transferExpenses) : v });
  const setHoldingPeriod = (v: any) => updateSettings({ holdingPeriod: typeof v === 'function' ? v(settings.holdingPeriod) : v });
  const setAssetClass = (v: any) => updateSettings({ assetClass: typeof v === 'function' ? v(settings.assetClass) : v });
  const setTaxSlab = (v: any) => updateSettings({ taxSlab: typeof v === 'function' ? v(settings.taxSlab) : v });

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-stcg-calculator-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.purchasePrice === 'number') setPurchasePrice(d.purchasePrice);
      if (typeof d.salePrice === 'number') setSalePrice(d.salePrice);
      if (typeof d.transferExpenses === 'number') setTransferExpenses(d.transferExpenses);
      if (typeof d.holdingPeriod === 'number') setHoldingPeriod(d.holdingPeriod);
      if (d.assetClass === 'equity' || d.assetClass === 'debt' || d.assetClass === 'property' || d.assetClass === 'gold') setAssetClass(d.assetClass);
      if (typeof d.taxSlab === 'number') setTaxSlab(d.taxSlab);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-stcg-calculator-v1', JSON.stringify({ purchasePrice, salePrice, transferExpenses, holdingPeriod, assetClass, taxSlab }));
    } catch { /* ignore */ }
  }, [purchasePrice, salePrice, transferExpenses, holdingPeriod, assetClass, taxSlab]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    const grossGains = Math.max(0, salePrice - purchasePrice);
    const netGains = Math.max(0, grossGains - transferExpenses);
    
    let taxRate = 20; // 20% under Finance Act 2024 for equity STCG (Section 111A)
    let taxRateText = '20% (Sec 111A)';
    let isSlabTax = false;
    let limitMonths = 12;

    if (assetClass === 'equity') {
      taxRate = 20;
      taxRateText = '20% (Finance Act 2024)';
      limitMonths = 12;
    } else if (assetClass === 'debt') {
      taxRate = taxSlab;
      taxRateText = `Slab Rate (${taxSlab}%)`;
      isSlabTax = true;
      limitMonths = 36; // Debt mutual funds always taxed at slab under recent rules, but historically 36M was threshold
    } else if (assetClass === 'property') {
      taxRate = taxSlab;
      taxRateText = `Slab Rate (${taxSlab}%)`;
      isSlabTax = true;
      limitMonths = 24;
    } else if (assetClass === 'gold') {
      taxRate = taxSlab;
      taxRateText = `Slab Rate (${taxSlab}%)`;
      isSlabTax = true;
      limitMonths = 36;
    }

    const isShortTerm = holdingPeriod <= limitMonths;
    const stcgTax = isShortTerm ? Math.round(netGains * (taxRate / 100) * 1.04) : 0; // plus 4% health and education cess
    const postTaxGains = Math.max(0, netGains - stcgTax);
    const netPct = netGains > 0 ? (postTaxGains / netGains) * 100 : 0;

    return {
      grossGains,
      netGains,
      stcgTax,
      postTaxGains,
      taxRate,
      taxRateText,
      isSlabTax,
      isShortTerm,
      limitMonths,
      netPct,
    };
  }, [purchasePrice, salePrice, transferExpenses, holdingPeriod, assetClass, taxSlab]);

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            STCG Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your Short-Term Capital Gains tax on shares, mutual funds, real estate, and gold under the latest Finance Act 2024 rates
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="STCG Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <ToggleGroup label="Asset Class"
                    options={[
                      { value: 'equity', label: 'Equity / Equity MF' },
                      { value: 'debt', label: 'Debt Mutual Fund' },
                      { value: 'property', label: 'Real Estate' },
                      { value: 'gold', label: 'Gold / Jewelry' },
                    ]}
                    value={assetClass} onChange={setAssetClass} />

                  <Slider label="Cost of Acquisition (Purchase Price)" id="stcg-purchase" value={purchasePrice} min={1000} max={10000000} step={10000} fmt={fmtC} onChange={setPurchasePrice} compact={mobile} />
                  <Slider label="Full Value of Consideration (Sale Price)" id="stcg-sale" value={salePrice} min={purchasePrice} max={15000000} step={10000} fmt={fmtC} onChange={setSalePrice} compact={mobile} />
                  <Slider label="Transfer Expenses (Brokerage/Stamp Duty)" id="stcg-expenses" value={transferExpenses} min={0} max={500000} step={1000} fmt={fmtC} onChange={setTransferExpenses} compact={mobile} />
                  <Slider label="Holding Period (Months)" id="stcg-holding" value={holdingPeriod} min={1} max={36} step={1} fmt={v => `${v} Months`} onChange={setHoldingPeriod} compact={mobile} />
                  
                  {result.isSlabTax && (
                    <ToggleGroup label="Your Income Tax Slab"
                      options={[
                        { value: '5', label: '5%' },
                        { value: '10', label: '10%' },
                        { value: '15', label: '15%' },
                        { value: '20', label: '20%' },
                        { value: '30', label: '30%' },
                      ]}
                      value={String(taxSlab)} onChange={v => setTaxSlab(Number(v))} />
                  )}
                </div>

                {/* Outputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>STCG Tax Payable</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '2px 0 0', letterSpacing: '-0.02em' }}
                        aria-live="polite" aria-label={`STCG tax payable is ${fmtIN(result.stcgTax)}`}>
                        {fmtIN(result.stcgTax)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Net Post-Tax Profit</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '2px 0 0', opacity: 0.9 }}>
                        {fmtIN(result.postTaxGains)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: 'Gross capital gains', value: fmtIN(result.grossGains) },
                    { label: 'Net capital gains', value: fmtIN(result.netGains) },
                    { label: 'Holding classification', value: result.isShortTerm ? 'Short-Term Capital Gain (STCG)' : 'Long-Term Capital Gain (LTCG)' },
                    { label: 'Asset short-term limit', value: `${result.limitMonths} Months` },
                    { label: 'Base STCG tax rate', value: result.taxRateText },
                    { label: 'Cess rate applied', value: result.isShortTerm ? '4% Health & Education Cess' : '0%' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {!result.isShortTerm && (
                    <div style={{ width: '100%', padding: '12px 14px', borderLeft: `3px solid ${C.ink3}`, background: C.bg, borderRadius: 6, margin: '16px 0 0', fontSize: 13, color: C.ink2, lineHeight: 1.5 }}>
                      <strong>Classification Notice:</strong> The holding period of {holdingPeriod} months exceeds the short-term threshold ({result.limitMonths} months) for this asset class. These gains are classified as Long-Term Capital Gains (LTCG). Under standard rules, different tax rates (such as 12.5% for equity) and indexation policies apply.
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart netPct={result.netPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Profit {result.netPct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>STCG Tax {(100 - result.netPct).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Save Results Card */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-stcg">What Is a Short-Term Capital Gains (STCG) Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An STCG calculator is a dedicated digital tool designed to compute taxes on profits earned from the sale of capital assets held for a short period. This tool implements the latest taxation rules and limits defined under the Income Tax Act, 1961.
                  </p>
                </div>
                <p style={p}>
                  Capital gains are classified into short-term and long-term depending on your holding period. Because different assets (equity shares, debt mutual funds, gold, and real estate) carry completely different statutory holding thresholds and tax rates, a dedicated calculator is essential. By entering your purchase and sale prices along with transaction expenses, you can estimate your net gains and tax liabilities immediately.
                </p>
                <p style={p}>
                  To calculate long-term gains, you can use our <a href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Capital Gains Calculator</a> or compute your overall taxable income using our <a href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="stcg-vs-ltcg">Difference Between STCG and LTCG Tax Rates</h2>
                <p style={p}>
                  The primary difference between short-term and long-term capital gains lies in the tax rate and holding period. Short-Term Capital Gains (STCG) generally attract higher tax rates compared to Long-Term Capital Gains (LTCG) to discourage speculative, short-term trading.
                </p>
                <p style={p}>
                  Under the latest Union Budget 2024 revisions, equity LTCG is taxed at 12.5% (with a Rs 1.25 Lakh exemption limit), while equity STCG is taxed at 20%. For non-equity assets like gold, debt funds, and real estate, STCG is taxed at your regular slab rates (which can go up to 30% plus surcharges), while LTCG is taxed at a flat 12.5% without indexation benefits.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="holding-period">Holding Period Criteria for STCG Across Asset Classes</h2>
                <p style={p}>
                  To determine whether your gains are short-term, the Income Tax Department evaluates the holding period (the time between purchase and sale):
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Listed Equity and Equity Mutual Funds:</strong> Classified as short-term if held for 12 months or less.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Real Estate (Immovable Property):</strong> Classified as short-term if held for 24 months or less.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Gold, Silver, and Physical Assets:</strong> Classified as short-term if held for 36 months or less.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Debt Mutual Funds:</strong> All capital gains on debt funds purchased after April 1, 2023, are treated as short-term and taxed at slab rates, regardless of the holding period.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="equity-stcg">STCG Tax Rates on Equity Shares and Mutual Funds (Section 111A)</h2>
                <p style={p}>
                  Short-Term Capital Gains on listed equity shares, equity-oriented mutual funds, and units of business trusts sold on recognized stock exchanges are governed by Section 111A of the Income Tax Act.
                </p>
                <p style={p}>
                  To qualify under Section 111A, the transaction must be subject to Securities Transaction Tax (STT). If STT is not paid (such as off-market share transfers or unlisted equity shares), the gains do not qualify for the special tax rate and are added to your regular slab income.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="budget-changes">Finance Act 2024: The 20% Equity STCG Rate Explained</h2>
                <p style={p}>
                  The Finance Act 2024 introduced a major change in capital gains tax rates in India. Effective for transactions executed on or after July 23, 2024, the tax rate for short-term capital gains under Section 111A was increased from 15% to 20%.
                </p>
                <p style={p}>
                  This change means any equity investments sold within a 12-month holding period will face a flat 20% tax plus a 4% health and education cess, resulting in an effective tax rate of 20.8%. Investors must plan their holding periods carefully to avoid the higher tax rates.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="debt-taxation">Tax Treatment of STCG on Debt Mutual Funds</h2>
                <p style={p}>
                  The taxation of debt mutual funds was altered under the Finance Act 2023. For debt funds (mutual funds with less than 35% equity exposure) acquired on or after April 1, 2023, the concept of long-term capital gains and indexation benefits has been completely eliminated.
                </p>
                <p style={p}>
                  All gains from these debt funds are classified as short-term capital gains, regardless of whether you hold them for 1 month or 5 years. They are added directly to your gross taxable income and taxed at your marginal slab rates.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="gold-taxation">STCG Rules and Tax slabs for Gold and Jewelry Investments</h2>
                <p style={p}>
                  Gold is considered a traditional safe-haven investment in India, but it attracts regular taxation. Short-term capital gains on physical gold, gold jewelry, or digital gold apply when the holding period is 36 months (3 years) or less.
                </p>
                <p style={p}>
                  STCG on gold is taxed at your progressive income tax slab rates. If you are in the 30% tax bracket, your short-term gold profits will be taxed at 30% plus cess. Long-Term Capital Gains (LTCG) on gold apply after 36 months and are taxed at 12.5% without indexation.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="property-taxation">Short-Term Capital Gains on Real Estate Sales</h2>
                <p style={p}>
                  For residential or commercial properties, the holding period threshold for short-term classification is 24 months (2 years).
                </p>
                <p style={p}>
                  Short-term capital gains on property are calculated by subtracting the cost of acquisition and any home improvement expenses from the final sale value. These gains are added to your personal slab income. No indexation benefits or tax exemptions under Section 54 or 54EC are allowed for short-term real estate gains.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="rates-table">In-Context Detailed Table of STCG Holding Periods and Tax Rates</h2>
                <p style={p}>
                  The following table outlines the holding periods and tax rates applicable to short-term capital gains under current rules:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Short-Term Capital Gains classification and tax rates in India</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS} scope="col">Asset Class</th>
                        <th style={thS} scope="col">STCG Holding Period Limit</th>
                        <th style={thS} scope="col">STCG Tax Rate (Finance Act 2024)</th>
                        <th style={thS} scope="col">Cess and Surcharge</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Listed Equity Shares & MFs</td>
                        <td style={tdR}>12 Months or Less</td>
                        <td style={tdL}>20% (Section 111A)</td>
                        <td style={tdL}>4% Cess + applicable Surcharge</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Debt Mutual Funds</td>
                        <td style={tdR}>Always Short-Term (post Apr 2023)</td>
                        <td style={tdL}>Income Tax Slab Rate (Up to 30%)</td>
                        <td style={tdL}>4% Cess + applicable Surcharge</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Real Estate (Property)</td>
                        <td style={tdR}>24 Months or Less</td>
                        <td style={tdL}>Income Tax Slab Rate (Up to 30%)</td>
                        <td style={tdL}>4% Cess + applicable Surcharge</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Gold & Physical Assets</td>
                        <td style={tdR}>36 Months or Less</td>
                        <td style={tdL}>Income Tax Slab Rate (Up to 30%)</td>
                        <td style={tdL}>4% Cess + applicable Surcharge</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="deductions">Eligible Deductions and Expenses Allowed to Lower STCG</h2>
                <p style={p}>
                  To reduce your short-term capital gains liability, you can claim deductions for certain expenses incurred in connection with the transaction.
                </p>
                <p style={p}>
                  Allowable deductions include:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Brokerage charges:</strong> Paid to stockbrokers or real estate agents during buy or sell transactions.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Transfer costs:</strong> Stamp duty, registration fees, and legal expenses incurred during property transfers.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Improvement costs:</strong> Capital expenses incurred to construct, expand, or renovate a physical property.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="optimization">Tax-Saving Strategies to Optimize STCG Liabilities</h2>
                <p style={p}>
                  Because STCG rates are relatively high, tax optimization strategies can save substantial money. One effective technique is tax harvesting. If you have unrealized short-term losses, you can book those losses before the end of the financial year to offset your taxable short-term capital gains.
                </p>
                <p style={p}>
                  Additionally, whenever possible, defer the sale of listed shares beyond the 12-month period to shift the gains from STCG (taxed at 20%) to LTCG (taxed at 12.5% with a Rs 1.25 Lakh exemption threshold).
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="loss-rules">Set-Off and Carry Forward of Short-Term Capital Losses (STCL)</h2>
                <p style={p}>
                  If you incur a loss on the sale of short-term assets, the Income Tax Act provides provisions to offset these losses against gains:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Set-off:</strong> Short-Term Capital Losses (STCL) can be offset against both short-term capital gains (STCG) and long-term capital gains (LTCG). (Note that Long-Term Capital Losses can only be offset against LTCG).</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Carry-forward:</strong> Any unabsorbed short-term loss can be carried forward for up to 8 subsequent assessment years to be offset against future capital gains. You must file your ITR within the due date to carry forward losses.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This STCG Calculator Online</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Asset Class:</strong> Choose from Equity, Debt Fund, Real Estate, or Gold.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Purchase Price:</strong> Enter the original cost of acquisition of the asset.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Sale Price:</strong> Enter the final sale value received from the buyer.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust Holding Period and Expenses:</strong> Input the transfer expenses and the holding period (in months) to determine eligibility and tax rates.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are for illustrative purposes only. Actual capital gains tax liabilities depend on individual transaction dates, holding periods, registration records, indexation applicability, and specific ITR filings. The calculations incorporate the tax rate revisions introduced in the Finance Act 2024. Consult a qualified Chartered Accountant for professional tax advice. 
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="stcg-sidebar" aria-label="Related calculators" style={{
            display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16,
            overflowY: 'auto', position: 'sticky', top: 24,
            maxHeight: 'calc(100vh - 100px)',
          } as React.CSSProperties}>
            <style>{`
              .stcg-sidebar::-webkit-scrollbar { width: 5px; }
              .stcg-sidebar::-webkit-scrollbar-track { background: transparent; }
              .stcg-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .stcg-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <div className="stcg-sidebar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0,
            }}>
              <SidebarList title="Capital Gains Tools" items={POPULAR} />
              <SidebarList title="Tax & Income Tools" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

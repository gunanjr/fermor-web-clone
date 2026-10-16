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
      aria-label={`Net Dividend Received ${netPct.toFixed(0)}%, tax component ${taxPct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${nArc} ${circ - nArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Net Post-Tax</text>
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
  { href: '/calculators/dividend-yield-calculator',        label: 'Dividend Yield Calculator' },
  { href: '/calculators/dividend-reinvestment-calculator', label: 'Dividend Reinvestment' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
];
const MORE = [
  { href: '/calculators/stcg-calculator',                  label: 'STCG Calculator' },
  { href: '/calculators/capital-gains-calculator',         label: 'Capital Gains Calculator' },
  { href: '/calculators/salary-breakdown-calculator',      label: 'Salary Breakdown Calculator' },
  { href: '/calculators/gratuity-calculator',              label: 'Gratuity Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'How is dividend income taxed in India?', a: 'Dividend income is fully taxable in the hands of the shareholder under the head &quot;Income from Other Sources&quot; at your applicable progressive income tax slab rates. The Dividend Distribution Tax (DDT) previously paid by companies has been abolished since April 1, 2020.' },
  { q: 'What is the TDS rate on dividend income for resident individuals?', a: 'For resident individuals, companies deduct Tax Deducted at Source (TDS) at a rate of 10% under Section 194 if the total dividend paid by a company exceeds Rs 5,000 in a financial year.' },
  { q: 'Is there any way to prevent TDS on dividends for residents?', a: 'Yes. If your total annual taxable income is below the basic exemption limit, you can submit Form 15G (for individuals below 60) or Form 15H (for senior citizens above 60) to the company to prevent TDS deductions.' },
  { q: 'How are dividends taxed for Non-Resident Indians (NRIs)?', a: 'For Non-Resident Indians (NRIs), companies deduct TDS at a flat rate of 20% (plus applicable cess and surcharges) under Section 195. NRIs can optionally claim benefits under the Double Taxation Avoidance Agreement (DTAA) if the tax rate in their country of residence is lower.' },
  { q: 'What expenses can be deducted to reduce tax on dividend income?', a: 'Under Section 57(i) of the Income Tax Act, the only deduction allowed is the interest expense incurred on capital borrowed to buy the shares. This deduction is strictly capped at a maximum of 20% of the dividend income. Brokerage or transaction fees cannot be claimed.' },
  { q: 'Does double taxation apply to NRI dividend income?', a: 'Yes, dividend income may be subject to tax in both India and the NRI&apos;s country of residence. However, NRIs can claim Double Taxation Avoidance Agreement (DTAA) relief to reduce the tax rate or claim tax credits in their home country.' },
  { q: 'Do I have to pay advance tax on dividend income?', a: 'Yes. Since companies do not declare dividends on a predictable schedule, advance tax interest (under Section 234C) is not charged on dividend income if you pay the remaining tax in the subsequent advance tax instalments after the dividend is declared.' },
  { q: 'Is dividend tax different under the new tax regime?', a: 'The tax rate on dividend income remains the same under both regimes (taxed at slab rates). However, because the tax slabs are different between the Old and New Tax Regimes, your final dividend tax liability will depend on which regime you select.' },
  { q: 'What ITR form is used to report dividend income?', a: 'Dividend income must be reported under the head &quot;Income from Other Sources&quot; in ITR-1, ITR-2, or ITR-3. You must provide a quarterly breakdown of the dividend received to correctly compute advance tax liabilities.' },
  { q: 'Can I offset stock trading losses against dividend income?', a: 'No. Stock trading losses are classified under the head &quot;Capital Gains&quot; and cannot be offset against dividend income, which is categorized under &quot;Income from Other Sources&quot;.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client Component ───────────────────────────────────── */

export default function DividendTaxCalculatorClient() {
  const defaultSettings = {
    dividendIncome: 80000,
    interestExpense: 5000,
    residencyStatus: 'resident' as 'resident' | 'nri',
    taxSlab: 30,
  };
  const { settings, updateSettings } = useCalculatorSettings('dividend-tax', defaultSettings);
  const { dividendIncome, interestExpense, residencyStatus, taxSlab } = settings;

  const setDividendIncome = (v: any) => updateSettings({ dividendIncome: typeof v === 'function' ? v(settings.dividendIncome) : v });
  const setInterestExpense = (v: any) => updateSettings({ interestExpense: typeof v === 'function' ? v(settings.interestExpense) : v });
  const setResidencyStatus = (v: any) => updateSettings({ residencyStatus: typeof v === 'function' ? v(settings.residencyStatus) : v });
  const setTaxSlab = (v: any) => updateSettings({ taxSlab: typeof v === 'function' ? v(settings.taxSlab) : v });

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-dividend-tax-calculator-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.dividendIncome === 'number') setDividendIncome(d.dividendIncome);
      if (typeof d.interestExpense === 'number') setInterestExpense(d.interestExpense);
      if (d.residencyStatus === 'resident' || d.residencyStatus === 'nri') setResidencyStatus(d.residencyStatus);
      if (typeof d.taxSlab === 'number') setTaxSlab(d.taxSlab);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-dividend-tax-calculator-v1', JSON.stringify({ dividendIncome, interestExpense, residencyStatus, taxSlab }));
    } catch { /* ignore */ }
  }, [dividendIncome, interestExpense, residencyStatus, taxSlab]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    // Interest expense deduction is capped at 20% of dividend income under Section 57(i)
    const deductionCap = dividendIncome * 0.20;
    const allowableDeduction = Math.min(interestExpense, deductionCap);
    const taxableDividendIncome = Math.max(0, dividendIncome - allowableDeduction);
    
    // Taxes
    const baseTax = Math.round(taxableDividendIncome * (taxSlab / 100));
    const cess = Math.round(baseTax * 0.04); // 4% Health and Education Cess
    const totalTax = baseTax + cess;

    // TDS: Section 194 (Residents: 10% if > 5000) vs Section 195 (NRIs: 20.8% flat)
    let tds = 0;
    let tdsRateText = '0%';
    if (residencyStatus === 'resident') {
      if (dividendIncome > 5000) {
        tds = Math.round(dividendIncome * 0.10);
        tdsRateText = '10% (Sec 194)';
      }
    } else {
      tds = Math.round(dividendIncome * 0.208); // 20% + 4% cess
      tdsRateText = '20.8% (Sec 195)';
    }

    // Net cash payout (bank credit)
    const netPayout = Math.max(0, dividendIncome - tds);
    
    // Remaining tax payable or refund receivable
    const netAdditionalTaxPayable = totalTax - tds;
    const postTaxDividend = Math.max(0, dividendIncome - totalTax);
    
    const netPct = dividendIncome > 0 ? (postTaxDividend / dividendIncome) * 100 : 0;

    return {
      allowableDeduction,
      taxableDividendIncome,
      totalTax,
      tds,
      tdsRateText,
      netPayout,
      netAdditionalTaxPayable,
      postTaxDividend,
      deductionCap,
      netPct,
    };
  }, [dividendIncome, interestExpense, residencyStatus, taxSlab]);

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
            Dividend Tax Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate income tax liabilities, TDS deductions, and net post-tax payouts on your dividend income in India
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Dividend Tax Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <ToggleGroup label="Residency Status"
                    options={[
                      { value: 'resident', label: 'Resident Individual' },
                      { value: 'nri', label: 'Non-Resident (NRI)' },
                    ]}
                    value={residencyStatus} onChange={setResidencyStatus} />

                  <Slider label="Annual Dividend Income" id="div-income" value={dividendIncome} min={1000} max={2500000} step={5000} fmt={fmtC} onChange={setDividendIncome} compact={mobile} />
                  <Slider label="Interest Expense on Borrowed Capital" id="div-interest" value={interestExpense} min={0} max={500000} step={2000} fmt={fmtC} onChange={setInterestExpense} compact={mobile} />
                  
                  <ToggleGroup label="Your Income Tax Slab"
                    options={[
                      { value: '5', label: '5%' },
                      { value: '10', label: '10%' },
                      { value: '15', label: '15%' },
                      { value: '20', label: '20%' },
                      { value: '30', label: '30%' },
                    ]}
                    value={String(taxSlab)} onChange={v => setTaxSlab(Number(v))} />
                </div>

                {/* Outputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Total Dividend Tax</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '2px 0 0', letterSpacing: '-0.02em' }}
                        aria-live="polite" aria-label={`Total dividend tax is ${fmtIN(result.totalTax)}`}>
                        {fmtIN(result.totalTax)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Post-Tax Dividend</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '2px 0 0', opacity: 0.9 }}>
                        {fmtIN(result.postTaxDividend)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: 'Allowable interest deduction', value: fmtIN(result.allowableDeduction) },
                    { label: 'Deduction limit (20% of income)', value: fmtIN(result.deductionCap) },
                    { label: 'Taxable dividend amount', value: fmtIN(result.taxableDividendIncome) },
                    { label: 'TDS deducted by company', value: fmtIN(result.tds) },
                    { label: 'TDS rate applied', value: result.tdsRateText },
                    { label: result.netAdditionalTaxPayable >= 0 ? 'Remaining tax payable' : 'Refund receivable estimate', value: fmtIN(Math.abs(result.netAdditionalTaxPayable)) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart netPct={result.netPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Net Post-Tax {result.netPct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Total Tax Paid {(100 - result.netPct).toFixed(0)}%</span>
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
                <h2 style={h2} id="what-is-dividend-tax">What Is a Dividend Tax Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A dividend tax calculator is an interactive tool that estimates the income tax and Tax Deducted at Source (TDS) liabilities on dividends received from shares or mutual funds. This tool is built to comply with modern Indian tax laws.
                  </p>
                </div>
                <p style={p}>
                  Dividends were historically taxed at the corporate level via Dividend Distribution Tax (DDT). However, under current regulations, DDT is abolished and dividends are taxable directly in the hands of the individual investor. Our online calculator helps you compute the net cash received after TDS and the final tax payable based on your marginal income tax slab.
                </p>
                <p style={p}>
                  To see how this affects your overall stock or mutual fund returns, you can evaluate yields using our <a href="/calculators/dividend-yield-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Dividend Yield Calculator</a> or check compounding growth using our <a href="/calculators/dividend-reinvestment-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Dividend Reinvestment Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ddt-abolition">Abolition of Dividend Distribution Tax (DDT)</h2>
                <p style={p}>
                  Prior to April 1, 2020, Indian companies paid a Dividend Distribution Tax (DDT) of approximately 15% (effective rate around 20.5% with cess and surcharge) before distributing dividends. Because the company paid the tax, the dividend income was completely tax-free for resident individual shareholders up to a limit of Rs 10 Lakh per year.
                </p>
                <p style={p}>
                  Under the Finance Act 2020, the Government of India abolished DDT. This change shifted the tax burden entirely from the corporate distributor to the individual recipient. Dividends are now distributed as gross income without any corporate tax deductions, and individual shareholders are responsible for reporting and paying tax.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="taxation-shareholder">Taxation of Dividends in the Hands of Shareholders</h2>
                <p style={p}>
                  Dividend income is categorized under the head &quot;Income from Other Sources&quot; under Section 56(2)(i) of the Income Tax Act. It is added to your other gross incomes (like salary, house property, or business income) and taxed at your progressive marginal slab rates.
                </p>
                <p style={p}>
                  If you are in the 30% tax bracket, your dividends will face a 30% tax plus a 4% health and education cess. If your total income is below the basic exemption threshold, you may have no tax liability on your dividends.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tds-rules">Tax Deducted at Source (TDS) Rules on Dividend Income</h2>
                <p style={p}>
                  To ensure tax collection, the EPFO and Income Tax Department require companies to deduct Tax Deducted at Source (TDS) under Section 194 before distributing dividends to resident individuals.
                </p>
                <p style={p}>
                  The standard TDS rate for resident individuals is 10%. The company will deduct this 10% and deposit it with the government under your PAN. You can view these deductions in your Form 26AS or Annual Information Statement (AIS) and claim credit for it when filing your ITR.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tds-thresholds">TDS Threshold Limits and Form 15G / Form 15H Submissions</h2>
                <p style={p}>
                  Companies only deduct TDS if the total dividend paid to a resident individual shareholder by that specific company exceeds Rs 5,000 in a financial year. If your annual dividend from a company is Rs 4,500, no TDS will be deducted.
                </p>
                <p style={p}>
                  If your total annual income is below the taxable threshold, you can submit Form 15G (for individuals under 60) or Form 15H (for senior citizens) to the company registrar. This declaration certifies that your tax liability is nil, preventing the company from deducting TDS on your dividend payouts.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-57">Section 57(i): Eligible Interest Expense Deductions Against Dividends</h2>
                <p style={p}>
                  A critical tax planning detail is the allowance of deductions against dividend income. Under Section 57(i) of the Income Tax Act, the only expense you can deduct from your dividend income is interest on capital borrowed to buy the shares.
                </p>
                <p style={p}>
                  No other transaction expenses (such as brokerage, advisory fees, or bank charges) are allowed as deductions. Additionally, the interest expense deduction is strictly capped at a maximum of 20% of the dividend income. For example, if you receive Rs 1,00,000 in dividends and paid Rs 25,000 in interest on a loan used to buy the shares, your deduction is capped at Rs 20,000 (20% of Rs 1,00,000). The remaining Rs 5,000 interest expense cannot be claimed.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="nri-taxation">Tax Rates on Dividend Income for Non-Resident Indians (NRIs)</h2>
                <p style={p}>
                  Dividends paid to Non-Resident Indian (NRI) shareholders are subject to different rules under Section 195. The company will deduct TDS at a flat rate of 20% plus applicable cess and surcharges.
                </p>
                <p style={p}>
                  This results in a standard flat tax rate of 20.8% on gross dividends for NRIs. Unlike residents, there is no Rs 5,000 threshold limit for NRIs; TDS is deducted on the very first rupee of dividend paid.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dtaa-benefits">Double Taxation Avoidance Agreement (DTAA) Benefits for NRIs</h2>
                <p style={p}>
                  Because dividends are taxed in India, NRIs may face double taxation if their resident country also taxes foreign dividends. To mitigate this, NRIs can claim benefits under the Double Taxation Avoidance Agreement (DTAA) signed between India and their country of residence.
                </p>
                <p style={p}>
                  Many DTAAs cap the tax rate on dividends between 10% and 15%. To claim the lower rate, the NRI must submit a Tax Residency Certificate (TRC), Form 10F, and a self-declaration to the Indian company before the dividend distribution date.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regimes">Dividend Taxation under Old vs New Tax Regimes</h2>
                <p style={p}>
                  The choice between tax regimes does not change the dividend taxation category, but it alters your tax bracket. The New Tax Regime features lower slabs and a rebate making incomes up to Rs 7 lakh tax-free (or up to Rs 12 lakh under standard rules in recent budgets). The Old Tax Regime allows deductions for investments under Section 80C.
                </p>
                <p style={p}>
                  To analyze which regime minimizes your overall tax on salary plus dividend income, use our <a href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="summary-table">Detailed Summary Table of Indian Dividend Tax Regulations</h2>
                <p style={p}>
                  The following table summaries the key rules governing dividend taxation in India:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Comparison of dividend taxation parameters for resident and NRI investors</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS} scope="col">Tax Parameter</th>
                        <th style={thS} scope="col">Resident Individuals</th>
                        <th style={thS} scope="col">Non-Resident Indians (NRIs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Tax Category</td>
                        <td style={tdR}>Income from Other Sources</td>
                        <td style={tdL}>Income from Other Sources</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Tax Rate</td>
                        <td style={tdR}>Progressive Slab Rates (Up to 30%)</td>
                        <td style={tdL}>Flat 20% (subject to DTAA rates)</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>TDS Rate</td>
                        <td style={tdR}>10% (Section 194)</td>
                        <td style={tdL}>20.8% (Section 195)</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>TDS Threshold</td>
                        <td style={tdR}>Rs 5,000 per company in a financial year</td>
                        <td style={tdL}>No threshold (deducted on all payouts)</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Deductions Allowed</td>
                        <td style={tdR}>Interest expense capped at 20% of income</td>
                        <td style={tdL}>Interest expense capped at 20% of income</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="itr-filing">Reporting Dividend Income in ITR-1, ITR-2, and ITR-3 Filing</h2>
                <p style={p}>
                  When filing your Income Tax Return (ITR), you must declare dividend income. EPFO and Income Tax rules require you to provide a quarterly breakdown of dividends received in the Schedule OS (Income from Other Sources).
                </p>
                <p style={p}>
                  This breakdown is mandatory to verify if you have paid correct advance tax on dividends. The quarters are aligned with advance tax due dates: April 1 to June 15, June 16 to September 15, September 16 to December 15, December 16 to March 15, and March 16 to March 31.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="advance-tax">Advance Tax Liabilities on Dividend Income Payouts</h2>
                <p style={p}>
                  If your total tax liability (after TDS) exceeds Rs 10,000 in a financial year, you are required to pay advance tax. However, since companies declare dividends unpredictably, you cannot estimate them in advance.
                </p>
                <p style={p}>
                  The Income Tax Department provides relief under Section 234C: if you pay the tax due on the dividend in the subsequent advance tax instalments after the dividend is credited, no interest penalty is charged.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Dividend Tax Calculator Online</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Status:</strong> Choose Resident Individual or NRI.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Dividend Income:</strong> Use the slider to set your gross annual dividend income.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Provide Interest Expense:</strong> Input any interest paid on capital borrowed to buy the shares.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Tax Slab:</strong> Toggle your progressive income tax slab to view your final tax, TDS, and net post-tax dividend immediately.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are for illustrative purposes. Actual tax liabilities and TDS credits depend on individual transactions, PAN records, Form 15G/H submissions, and final ITR filings. Consult a qualified Chartered Accountant for personalised tax planning advice. 
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="divtax-sidebar" aria-label="Related calculators" style={{
            display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16,
            overflowY: 'auto', position: 'sticky', top: 24,
            maxHeight: 'calc(100vh - 100px)',
          } as React.CSSProperties}>
            <style>{`
              .divtax-sidebar::-webkit-scrollbar { width: 5px; }
              .divtax-sidebar::-webkit-scrollbar-track { background: transparent; }
              .divtax-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .divtax-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <div className="divtax-sidebar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0,
            }}>
              <SidebarList title="Dividend Tools" items={POPULAR} />
              <SidebarList title="Income & Capital Gains" items={MORE} />
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

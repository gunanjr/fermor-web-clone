'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import type { TaxPageData } from './types';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

type Mode = 'new' | 'old' | 'inhand';

function fmt(n: number): string {
  if (n === 0) return 'Rs 0';
  const sign = n < 0 ? '- Rs ' : 'Rs ';
  const s = Math.abs(Math.round(n)).toString();
  if (s.length <= 3) return sign + s;
  let result = s.slice(-3);
  let rest = s.slice(0, -3);
  while (rest.length > 2) { result = rest.slice(-2) + ',' + result; rest = rest.slice(0, -2); }
  return sign + rest + ',' + result;
}

function WaitlistCard({ mobile, source }: { mobile: boolean; source: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try { if (!localStorage.getItem('fermor-waitlist-joined')) setHidden(false); } catch { setHidden(false); }
  }, []);
  if (hidden) return null;
  if (status === 'done') return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f7a58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: 0 }}>Done. Check your email to complete sign up.</p>
    </div>
  );
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source }) });
      if (res.ok) { setStatus('done'); try { localStorage.setItem('fermor-waitlist-joined', '1'); } catch { /**/ } }
      else setStatus('error');
    } catch { setStatus('error'); }
  };
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40 }}>
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>Save your results</p>
      <p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6 }}>Sign up to save this calculation and access your results any time.</p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required aria-label="Email address"
          style={{ flex: 1, minWidth: 200, padding: '9px 13px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.ink, fontSize: 13.5, fontFamily: INTER, outline: 'none' }} />
        <button className="fx-btn" type="submit" disabled={status === 'loading'}
          style={{ padding: '9px 20px', background: '#E9ECEE', color: '#101214', fontWeight: 600, fontSize: 13.5, borderRadius: 8, border: '1px solid #D3D7DA', cursor: status === 'loading' ? 'wait' : 'pointer', fontFamily: INTER, whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.65 : 1 }}>
          {status === 'loading' ? 'Saving...' : 'Sign up free'}
        </button>
      </form>
      {status === 'error' && <p style={{ color: '#C0392B', fontSize: 12.5, margin: '10px 0 0' }}>Something went wrong. Try again in a moment.</p>}
    </div>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      <div style={{ padding: '8px 0' }}>
        {items.map(({ href, label }) => (
          <Link key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', padding: '9px 20px', fontSize: 13.5, color: C.ink2, textDecoration: 'none', lineHeight: 1.4 }}>
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Regime Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/hra-calculator', label: 'HRA Exemption Calculator' },
  { href: '/calculators/nps-calculator', label: 'NPS Calculator' },
  { href: '/calculators/capital-gains-calculator', label: 'Capital Gains Tax Calculator' },
];
const MORE = [
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { href: '/calculators/epf-calculator', label: 'EPF Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
];

const sec = { marginBottom: 44 };
const h2 = (mobile: boolean) => ({ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 14px', lineHeight: 1.35, fontFamily: INTER });
const h3Style = { fontSize: 15, fontWeight: 700, color: C.ink, margin: '20px 0 10px', fontFamily: INTER };
const p = { fontSize: 15, color: C.ink2, lineHeight: 1.75, margin: '0 0 14px', fontFamily: INTER };
const thS = { padding: '10px 16px', background: '#f6f7f8', fontWeight: 700 as const, color: C.ink, fontSize: 13, textAlign: 'left' as const, borderBottom: `1px solid #e3e6e8` };
const tdL = { padding: '9px 16px', fontSize: 13, color: C.ink2, borderBottom: `1px solid ${C.border}`, fontFamily: INTER };
const tdR = { padding: '9px 16px', fontSize: 13, color: C.ink2, fontFamily: INTER, borderBottom: `1px solid ${C.border}` };
const mono = { fontFamily: 'monospace', fontSize: 12, background: '#f4f5f6', padding: '1px 4px', borderRadius: 3, color: C.dark };

export default function IncomeTaxPageTemplate({ data, region = 'in' }: { data: TaxPageData; region?: string }) {
  const [mobile, setMobile] = useState(false);
  const [mode, setMode] = useState<Mode>('new');
  const [tableOpen, setTableOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set([0]));
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`fermor-income-tax-${data.grossLakh}-lakh-v1`);
      if (saved === 'new' || saved === 'old' || saved === 'inhand') setMode(saved);
    } catch { /**/ }
  }, [data.grossLakh]);

  const setModePersist = (m: Mode) => {
    setMode(m);
    try { localStorage.setItem(`fermor-income-tax-${data.grossLakh}-lakh-v1`, m); } catch { /**/ }
  };

  const { gross, taxable, grossLakh,
    newBaseTax, new87ARebate, newNetTax, newMonthlyTds, newCess,
    oldBaseTax, old87ARebate, oldNetTax, oldMonthlyTds, oldCess,
    monthlyGross, monthlyBasic, monthlyHRA, monthlySpecial, monthlyPF,
    newInHand, oldInHand, deductionScenarios } = data;

  const isNewZero = newNetTax === 0;
  const isOldZero = oldNetTax === 0;
  const new87AApplies = new87ARebate > 0;

  const tabStyle = (active: boolean) => ({
    padding: mobile ? '8px 12px' : '10px 20px',
    fontSize: mobile ? 13 : 14,
    fontWeight: 600,
    color: active ? C.ink : C.ink3,
    background: 'transparent',
    border: 'none',
    borderBottom: active ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
    cursor: 'pointer',
    fontFamily: INTER,
    whiteSpace: 'nowrap' as const,
  });

  const xlph = `${grossLakh}`;
  const grossFmt = fmt(gross);
  const taxableFmt = fmt(taxable);

  // Build new regime slab rows
  const newSlabRows: [string, string, string, boolean][] = [];
  const newSlabDefs: [number, number, string][] = [
    [0, 400000, '0%'], [400000, 800000, '5%'], [800000, 1200000, '10%'],
    [1200000, 1600000, '15%'], [1600000, 2000000, '20%'],
    [2000000, 2400000, '25%'], [2400000, Infinity, '30%'],
  ];
  let runTax = 0;
  for (const [from, to, rate] of newSlabDefs) {
    if (taxable <= from) break;
    const band = Math.min(taxable, to === Infinity ? taxable : to) - from;
    const tax = Math.round(band * parseFloat(rate) / 100);
    runTax += tax;
    const toLabel = to === Infinity ? fmt(taxable) : fmt(Math.min(taxable, to));
    newSlabRows.push([`${fmt(from === 0 ? 0 : from + 1)} to ${toLabel}`, rate, tax === 0 ? 'Rs 0' : fmt(tax), false]);
  }
  newSlabRows.push(['Total tax before rebate', '', fmt(newBaseTax), true]);
  newSlabRows.push(['Less: Section 87A rebate', '', new87AApplies ? `- ${fmt(new87ARebate)}` : 'Nil', false]);
  newSlabRows.push(['Net tax payable', '', fmt(newNetTax > 0 ? newBaseTax - new87ARebate : 0), true]);
  newSlabRows.push(['Health and education cess (4%)', '', fmt(newCess), false]);

  // Build old regime slab rows
  const oldSlabRows: [string, string, string, boolean][] = [];
  const oldSlabDefs: [number, number, string][] = [
    [0, 250000, '0%'], [250000, 500000, '5%'], [500000, 1000000, '20%'], [1000000, Infinity, '30%'],
  ];
  for (const [from, to, rate] of oldSlabDefs) {
    if (taxable <= from) break;
    const band = Math.min(taxable, to === Infinity ? taxable : to) - from;
    const tax = Math.round(band * parseFloat(rate) / 100);
    const toLabel = to === Infinity ? fmt(taxable) : fmt(Math.min(taxable, to));
    oldSlabRows.push([`${fmt(from === 0 ? 0 : from + 1)} to ${toLabel}`, rate, tax === 0 ? 'Rs 0' : fmt(tax), false]);
  }
  oldSlabRows.push(['Total tax before cess', '', fmt(oldBaseTax - old87ARebate), true]);
  oldSlabRows.push(['Health and education cess (4%)', '', fmt(oldCess), false]);
  oldSlabRows.push(['Total tax payable', '', fmt(oldNetTax), true]);

  const faqItems: [string, string][] = [
    [`How much income tax do I pay on a ${xlph} lakh salary in FY 2025-26?`,
      `Under the new tax regime in FY 2025-26, income tax on a Rs ${xlph} lakh salary is ${isNewZero ? 'zero' : fmt(newNetTax)}. After the standard deduction of Rs 75,000, taxable income is ${taxableFmt}. ${new87AApplies ? `Section 87A provides a full rebate since taxable income is below Rs 12,00,000.` : `Tax at new regime slab rates is ${fmt(newBaseTax)}.`} Under the old regime with no deductions, the tax is ${isOldZero ? 'zero' : fmt(oldNetTax)} including 4% cess.`],
    [`What is the in-hand salary for ${xlph} LPA in India?`,
      `The monthly in-hand salary for ${xlph} LPA under the new tax regime is approximately ${fmt(newInHand)}, assuming 50% basic salary. This accounts for employee PF of ${fmt(monthlyPF)} per month (12% of ${fmt(monthlyBasic)} basic) and professional tax of Rs 200 per month. ${isNewZero ? 'Income tax TDS is zero under the new regime.' : `Income tax TDS is ${fmt(newMonthlyTds)} per month.`}`],
    [`Should I choose old or new regime for ${xlph} LPA salary?`,
      isNewZero
        ? `The new regime is better for ${xlph} LPA in FY 2025-26 because ${new87AApplies ? 'Section 87A delivers zero tax' : 'the new regime slabs result in lower tax'}. Under the old regime with no deductions, the tax is ${fmt(oldNetTax)}. The new regime saves ${fmt(oldNetTax)} per year at this income level.`
        : `The new regime is better for ${xlph} LPA in FY 2025-26 because it results in lower tax (${fmt(newNetTax)}) compared to the old regime (${fmt(oldNetTax)} with no deductions). The annual saving under the new regime is ${fmt(oldNetTax - newNetTax)}.`],
    [`What is the in-hand salary for ${xlph} LPA in Bangalore or Delhi?`,
      `Monthly in-hand for ${xlph} LPA in Bangalore is approximately ${fmt(newInHand)} (professional tax Rs 200/month). In Delhi, there is no professional tax, so in-hand is approximately ${fmt(newInHand + 200)}. Income tax TDS is ${isNewZero ? 'zero under the new regime' : fmt(newMonthlyTds) + ' per month under the new regime'} in all cities.`],
    [`What is the TDS per month for a ${xlph} LPA salary?`,
      `TDS on a ${xlph} LPA salary under the new regime is ${isNewZero ? 'zero per month since annual tax liability is nil' : `${fmt(newMonthlyTds)} per month`}. Under the old regime with no deductions, TDS is ${isOldZero ? 'also zero' : `approximately ${fmt(oldMonthlyTds)} per month`}. Employers compute TDS based on the regime you declare at the start of the financial year.`],
    [`Does ${xlph} LPA salary attract surcharge?`,
      taxable > 5000000
        ? `Yes. Surcharge at 10% applies when total income exceeds Rs 50 lakh. For ${xlph} LPA, taxable income is ${taxableFmt}, so surcharge applies. The new regime net tax including surcharge and 4% cess is ${fmt(newNetTax)}.`
        : `No. Surcharge applies only when total income exceeds Rs 50 lakh. A Rs ${xlph} lakh salary is well below this threshold, so no surcharge applies under either regime. Only the 4% health and education cess applies.`],
    [`How much PF is deducted for a ${xlph} lakh salary?`,
      `For a ${xlph} LPA salary with basic pay of ${fmt(monthlyBasic)} per month, the employee PF deduction is ${fmt(monthlyPF)} per month (12% of basic) and ${fmt(monthlyPF * 12)} per year. The employer contributes an equal ${fmt(monthlyPF)} per month, which is part of CTC but not deducted from take-home pay.`],
    [`What is the income tax for ${xlph} lakh salary under the old regime?`,
      isOldZero
        ? `Under the old regime, income tax on Rs ${xlph} lakh salary is zero. Taxable income is ${taxableFmt}, which falls within the Section 87A rebate ceiling of Rs 5,00,000 for the old regime. The base tax of ${fmt(oldBaseTax)} is fully offset by the Rs ${fmt(old87ARebate)} rebate.`
        : `Under the old regime with no Chapter VI-A deductions beyond the standard deduction, the tax on Rs ${xlph} lakh salary is ${fmt(oldNetTax)} including 4% cess. Taxable income is ${taxableFmt}.`],
    [`How to calculate income tax on ${xlph} lakh salary in Excel?`,
      `In Excel, place taxable income (${taxableFmt} after standard deduction) in cell A1. New regime formula: =MAX(0,(MIN(A1,800000)-400000)*0.05)+MAX(0,(MIN(A1,1200000)-800000)*0.1)${taxable > 1200000 ? '+MAX(0,(MIN(A1,1600000)-1200000)*0.15)+MAX(0,(MIN(A1,2000000)-1600000)*0.2)+MAX(0,(MIN(A1,2400000)-2000000)*0.25)+MAX(0,(A1-2400000)*0.3)' : ''}. ${new87AApplies ? 'Add =IF(A1<=1200000,0,[formula]*1.04) to apply Section 87A and get ' + (isNewZero ? 'zero final tax' : fmt(newNetTax)) + '.' : 'Multiply by 1.04 for cess to get ' + fmt(newNetTax) + '.'}`],
    [`What is Fermor?`,
      `Fermor is a financial platform built for India. The calculators and tax guides are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.`],
  ];

  return (
    <div className="tax-page" style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 0' : '28px 28px 0' }}>
        {/* Header */}
        <header style={{ marginBottom: mobile ? 20 : 28 }}>
          <h1 style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.ink, margin: '0 0 8px', lineHeight: 1.2, fontFamily: INTER, letterSpacing: '-0.02em' }}>
            Income Tax on {xlph} Lakh Salary (FY 2025-26)
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <p style={{ fontSize: mobile ? 14 : 15, color: C.ink2, margin: 0, lineHeight: 1.6, maxWidth: mobile ? '100%' : 800 }}>
              {isNewZero ? `Zero tax in the new regime after Section 87A rebate. Old regime: ${fmt(oldNetTax)}. Monthly in-hand ${fmt(newInHand)}.` : `New regime tax ${fmt(newNetTax)}. Old regime: ${fmt(oldNetTax)}. Monthly in-hand ${fmt(newInHand)}.`}
            </p>
            <CurrencySelector theme="light" />
          </div>
        </header>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: mobile ? 24 : 32, alignItems: 'start' }}>
          <div>
            {/* Calculator card */}
            <section aria-label="Income tax calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, marginBottom: 24, overflow: 'hidden' }}>
              {/* Tab strip */}
              <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa', padding: '0 8px', overflowX: 'auto' }}>
                {([['new', 'New Regime'], ['old', 'Old Regime'], ['inhand', 'In-Hand Salary']] as [Mode, string][]).map(([m, label]) => (
                  <button key={m} onClick={() => setModePersist(m)} style={tabStyle(mode === m)} aria-selected={mode === m} role="tab">
                    {label}
                  </button>
                ))}
              </div>

              {/* Tab panels */}
              <div style={{ padding: mobile ? '20px 16px' : '24px 28px' }}>
                {mode === 'new' && (
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                    {/* Left: slab breakdown */}
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 14px' }}>New Regime Slabs</p>
                      {newSlabDefs.filter(([from]) => taxable > from).map(([from, to, rate]) => {
                        const band = Math.min(taxable, to === Infinity ? taxable : to) - from;
                        const tax = Math.round(band * parseFloat(rate) / 100);
                        const toLabel = to === Infinity ? fmt(taxable) : fmt(Math.min(taxable, to));
                        return (
                          <div key={from} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                            <span style={{ color: C.ink2 }}>{fmt(from === 0 ? 0 : from + 1)} to {toLabel}</span>
                            <span style={{ color: C.ink, fontWeight: 600 }}>{rate}: {tax === 0 ? 'Nil' : fmt(tax)}</span>
                          </div>
                        );
                      })}
                      {new87AApplies && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                          <span style={{ color: '#1f7a58', fontWeight: 600 }}>Section 87A rebate</span>
                          <span style={{ color: '#1f7a58', fontWeight: 700 }}>- {fmt(new87ARebate)}</span>
                        </div>
                      )}
                    </div>
                    {/* Right: result */}
                    <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div aria-live="polite">
                        <p style={{ fontSize: 12, color: '#7A8087', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Annual Tax</p>
                        <p style={{ fontSize: mobile ? 28 : 34, fontWeight: 800, color: '#1F7A58', margin: 0, letterSpacing: '-0.02em' }}>{formatCurrency(newNetTax)}</p>
                        {isNewZero && <p style={{ fontSize: 12, color: 'rgba(166,219,196,0.7)', margin: '4px 0 0' }}>Zero after Section 87A rebate</p>}
                      </div>
                      {[['Monthly TDS', fmt(newMonthlyTds)], ['Monthly in-hand', fmt(newInHand)], ['Effective tax rate', `${gross > 0 ? ((newNetTax / gross) * 100).toFixed(1) : 0}%`]].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E3E6E8', paddingTop: 12 }}>
                          <span style={{ fontSize: 13, color: '#7A8087' }}>{k}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#101214' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'old' && (
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 14px' }}>Old Regime Slabs</p>
                      {oldSlabDefs.filter(([from]) => taxable > from).map(([from, to, rate]) => {
                        const band = Math.min(taxable, to === Infinity ? taxable : to) - from;
                        const tax = Math.round(band * parseFloat(rate) / 100);
                        const toLabel = to === Infinity ? fmt(taxable) : fmt(Math.min(taxable, to));
                        return (
                          <div key={from} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                            <span style={{ color: C.ink2 }}>{fmt(from === 0 ? 0 : from + 1)} to {toLabel}</span>
                            <span style={{ color: C.ink, fontWeight: 600 }}>{rate}: {tax === 0 ? 'Nil' : fmt(tax)}</span>
                          </div>
                        );
                      })}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 13 }}>
                        <span style={{ color: C.ink3 }}>4% cess</span>
                        <span style={{ color: C.ink2 }}>{fmt(oldCess)}</span>
                      </div>
                    </div>
                    <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div aria-live="polite">
                        <p style={{ fontSize: 12, color: '#7A8087', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Annual Tax (Old Regime)</p>
                        <p style={{ fontSize: mobile ? 28 : 34, fontWeight: 800, color: isOldZero ? C.lime : '#FF8A80', margin: 0, letterSpacing: '-0.02em' }}>{formatCurrency(oldNetTax)}</p>
                      </div>
                      {[['Monthly TDS', fmt(oldMonthlyTds)], ['Monthly in-hand', fmt(oldInHand)], ['New regime saves', fmt(Math.max(0, oldNetTax - newNetTax))]].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E3E6E8', paddingTop: 12 }}>
                          <span style={{ fontSize: 13, color: '#7A8087' }}>{k}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#101214' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'inhand' && (
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 14px' }}>Monthly Breakup (50% basic)</p>
                      {[
                        [`Basic (50%)`, fmt(monthlyBasic)],
                        [`HRA (20%)`, fmt(monthlyHRA)],
                        [`Special allowance`, fmt(monthlySpecial)],
                        [`Gross per month`, fmt(monthlyGross)],
                        [`Less: Employee PF`, `- ${fmt(monthlyPF)}`],
                        [`Less: Professional tax`, '- Rs 200'],
                        [`Less: TDS`, isNewZero ? 'Nil' : `- ${fmt(newMonthlyTds)}`],
                      ].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13 }}>
                          <span style={{ color: C.ink2 }}>{k}</span>
                          <span style={{ color: C.ink, fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div aria-live="polite">
                        <p style={{ fontSize: 12, color: '#7A8087', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Monthly In-Hand</p>
                        <p style={{ fontSize: mobile ? 28 : 34, fontWeight: 800, color: '#1F7A58', margin: 0, letterSpacing: '-0.02em' }}>{formatCurrency(newInHand)}</p>
                        <p style={{ fontSize: 12, color: 'rgba(166,219,196,0.7)', margin: '4px 0 0' }}>New regime, 50% basic</p>
                      </div>
                      {[['Old regime in-hand', fmt(oldInHand)], ['Difference', fmt(newInHand - oldInHand)]].map(([k, v]) => (
                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E3E6E8', paddingTop: 12 }}>
                          <span style={{ fontSize: 13, color: '#7A8087' }}>{k}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#101214' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible deduction comparison table */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setTableOpen(o => !o)}
                  style={{ width: '100%', padding: '12px 20px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: INTER }}
                  aria-expanded={tableOpen} aria-controls="deduction-table">
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Tax by Deduction Level: Old vs New Regime</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: tableOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                {tableOpen && (
                  <div id="deduction-table" style={{ overflowX: 'auto', padding: '0 0 4px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Deductions claimed</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Old regime tax</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">New regime tax</th>
                          <th style={{ ...thS, textAlign: 'right' }} scope="col">Verdict</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deductionScenarios.map(({ label, oldTax, newTax }, i) => {
                          const save = fmt(oldTax - newTax);
                          return (
                            <tr key={label} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderBottom: `1px solid ${C.border}` }}>
                              <td style={tdL}>{label}</td>
                              <td style={{ ...tdR, color: '#C0392B', fontWeight: 600, textAlign: 'right' }}>{fmt(oldTax)}</td>
                              <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700, textAlign: 'right' }}>{fmt(newTax)}</td>
                              <td style={{ padding: '11px 16px', color: '#1f7a58', fontWeight: 700, textAlign: 'right' as const }}>{oldTax > newTax ? `New saves ${save}` : 'Equal'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            <WaitlistCard mobile={mobile} source={`income-tax-${grossLakh}-lakh`} />

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2(mobile)} id="what-is-income-tax">What Is Income Tax on a {xlph} Lakh Salary?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Income tax on a Rs {xlph} lakh annual salary in FY 2025-26 is {isNewZero ? 'zero' : fmt(newNetTax)} under the new tax regime and {isOldZero ? 'zero' : fmt(oldNetTax)} under the old regime without deductions.
                  </p>
                </div>
                <p style={p}>{data.introProse}</p>
                <p style={p}>
                  The Finance Act 2025 expanded the new tax regime to deliver{' '}
                  {new87AApplies
                    ? `zero tax for individuals with taxable income up to Rs 12,00,000 through the Section 87A rebate. For a Rs ${xlph} lakh gross salary, the standard deduction of Rs 75,000 brings taxable income to ${taxableFmt}, well within the rebate threshold.`
                    : `lower rates across all slabs. For a Rs ${xlph} lakh gross salary, the standard deduction of Rs 75,000 brings taxable income to ${taxableFmt}, taxed at new regime slab rates to give ${fmt(newNetTax)} in annual tax.`}
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="tax-formula">Income Tax Formula: How to Calculate Tax on {xlph} LPA</h2>
                <p style={p}>Income tax on salary is computed in four steps: gross salary minus standard deduction gives net salary, apply the applicable slab rates, check for Section 87A rebate eligibility, then add the 4% cess on any remaining tax liability.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    Tax = (Slab rates on taxable income) - 87A rebate, then add 4% cess
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Applied to Rs {xlph} lakh salary, FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Variable</th><th style={thS} scope="col">Value for {xlph} LPA</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Gross salary', grossFmt, 'Total annual CTC'],
                        ['Standard deduction', 'Rs 75,000', 'Flat deduction under both regimes'],
                        ['Taxable income', taxableFmt, 'Gross minus standard deduction'],
                        ['Tax (new regime slabs)', fmt(newBaseTax), 'Before Section 87A rebate'],
                        ['Section 87A rebate', new87AApplies ? fmt(new87ARebate) : 'Nil', new87AApplies ? 'Taxable income below Rs 12L ceiling' : 'Taxable income above Rs 12L ceiling'],
                        ['Net tax (new regime)', fmt(newNetTax), 'After rebate; cess ' + (newNetTax === 0 ? 'also zero' : 'included')],
                        ['Net tax (old regime)', fmt(oldNetTax), 'No deductions; includes 4% cess'],
                      ].map(([v, val, note], i) => (
                        <tr key={v} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td>
                          <td style={tdR}>{val}</td>
                          <td style={tdL}>{note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="excel-calculation">Income Tax on {xlph} Lakh Salary in Excel: Three Methods</h2>
                <p style={p}>
                  You can compute income tax on a Rs {xlph} lakh salary in Excel using a slab-by-slab formula. Place the taxable income ({taxableFmt}) in cell A1.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      New regime Excel formulas for Rs {xlph} lakh salary (A1 = {taxableFmt} taxable income)
                    </caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">Formula</th><th style={thS} scope="col">Result</th></tr></thead>
                    <tbody>
                      {[
                        ['Slab-by-slab', '=MAX(0,(MIN(A1,800000)-400000)*0.05)+(MAX(0,MIN(A1,1200000)-800000)*0.1)' + (taxable > 1200000 ? '+(MAX(0,MIN(A1,1600000)-1200000)*0.15)+(MAX(0,MIN(A1,2000000)-1600000)*0.2)+(MAX(0,MIN(A1,2400000)-2000000)*0.25)+(MAX(0,A1-2400000)*0.3)' : ''), fmt(newBaseTax)],
                        ['With 87A rebate', '=IF(A1<=1200000,0,[above formula]*1.04)', new87AApplies ? 'Rs 0 (tax-free)' : fmt(newNetTax)],
                        ['Old regime', '=MAX(0,(MIN(A1,500000)-250000)*0.05)+(MAX(0,MIN(A1,1000000)-500000)*0.2)+(MAX(0,A1-1000000)*0.3)', fmt(oldBaseTax)],
                        ['Old regime + cess', '=[old regime formula]*1.04', fmt(oldNetTax)],
                      ].map(([m, f, r]) => (
                        <tr key={m as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' }}>{m}</td>
                          <td style={tdR}><code style={mono}>{f}</code></td>
                          <td style={{ ...tdL, color: '#1f7a58', fontWeight: 700 }}>{r}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="new-regime-breakdown">
                  {isNewZero ? `New Regime Tax Breakdown: Why ${xlph} LPA Pays Zero` : `New Regime Tax Breakdown for ${xlph} LPA`}
                </h2>
                <p style={p}>
                  {isNewZero
                    ? `Under the new tax regime in FY 2025-26, a Rs ${xlph} lakh salary produces taxable income of ${taxableFmt} after the standard deduction, which generates ${fmt(newBaseTax)} in tax before the Section 87A rebate eliminates it entirely.`
                    : `Under the new tax regime in FY 2025-26, a Rs ${xlph} lakh salary produces taxable income of ${taxableFmt} after the standard deduction, taxed at new regime slab rates to give ${fmt(newBaseTax)} before cess and ${fmt(newNetTax)} after the 4% cess.`}
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      New regime slab-by-slab computation, Rs {xlph} lakh salary FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Income slab</th><th style={thS} scope="col">Rate</th><th style={thS} scope="col">Tax amount</th></tr></thead>
                    <tbody>
                      {newSlabRows.map(([slab, rate, tax, bold]) => (
                        <tr key={slab as string} style={{ background: (slab === 'Net tax payable') ? C.paleLime : 'transparent', borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: bold ? 700 : 400 }}>{slab}</td>
                          <td style={tdR}>{rate}</td>
                          <td style={{ ...tdR, fontWeight: bold ? 700 : 400, color: (slab === 'Net tax payable') ? '#1f7a58' : C.ink2 }}>{tax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="old-regime-breakdown">Old Regime Tax Computation for {xlph} Lakh Salary</h2>
                <p style={p}>
                  Under the old tax regime with no Chapter VI-A deductions beyond the standard deduction, income tax on Rs {xlph} lakh salary is {isOldZero ? 'zero' : `${fmt(oldBaseTax - oldCess)} before cess and ${fmt(oldNetTax)} including the 4% health and education cess`}.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Old regime computation, no deductions, Rs {xlph} lakh salary FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Income slab</th><th style={thS} scope="col">Rate</th><th style={thS} scope="col">Tax amount</th></tr></thead>
                    <tbody>
                      {oldSlabRows.map(([slab, rate, tax, bold]) => (
                        <tr key={slab as string} style={{ background: (slab === 'Total tax payable') ? '#FFF3F3' : 'transparent', borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: bold ? 700 : 400 }}>{slab}</td>
                          <td style={tdR}>{rate}</td>
                          <td style={{ ...tdR, fontWeight: bold ? 700 : 400, color: (slab === 'Total tax payable') ? '#C0392B' : C.ink2 }}>{tax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="old-vs-new">Old vs New Regime: Which Is Better for {xlph} LPA?</h2>
                <p style={p}>
                  {isNewZero
                    ? `The new regime is better for ${xlph} LPA in every deduction scenario because ${new87AApplies ? `the Rs ${fmt(newBaseTax)} tax liability is wiped out by Section 87A` : 'the new regime slabs produce lower tax'}, while the old regime ${isOldZero ? 'also produces zero tax for this salary level' : `never reaches zero tax regardless of deductions at this income level`}.`
                    : `The new regime saves ${fmt(oldNetTax - newNetTax)} per year at ${xlph} LPA compared to the old regime with no deductions. Under the old regime, even with maximum 80C deductions of Rs 1,50,000, the tax reduces to ${fmt(deductionScenarios[1]?.oldTax ?? oldNetTax)}, still higher than the new regime.`}
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Side-by-side comparison, Rs {xlph} lakh salary FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Metric</th><th style={{ ...thS, textAlign: 'right' }} scope="col">New regime</th><th style={{ ...thS, textAlign: 'right' }} scope="col">Old regime</th></tr></thead>
                    <tbody>
                      {([
                        ['Gross salary', grossFmt, grossFmt],
                        ['Standard deduction', 'Rs 75,000', 'Rs 75,000'],
                        ['80C deductions', 'Not allowed', 'Up to Rs 1,50,000'],
                        ['80D deductions', 'Not allowed', 'Up to Rs 25,000'],
                        ['Taxable income', taxableFmt, taxableFmt],
                        ['Pre-rebate tax', fmt(newBaseTax), fmt(oldBaseTax)],
                        ['Section 87A rebate', new87AApplies ? fmt(new87ARebate) : 'Not applicable', old87ARebate > 0 ? fmt(old87ARebate) : 'Nil (threshold Rs 5L)'],
                        ['Net tax', fmt(newNetTax > 0 ? newBaseTax - new87ARebate : 0), fmt(oldNetTax > 0 ? oldBaseTax - old87ARebate : 0)],
                        ['4% cess', fmt(newCess), fmt(oldCess)],
                        ['Total annual tax', fmt(newNetTax), fmt(oldNetTax)],
                        ['Monthly TDS', fmt(newMonthlyTds), fmt(oldMonthlyTds)],
                        ['Monthly in-hand', fmt(newInHand), fmt(oldInHand)],
                      ] as [string, string, string][]).map(([metric, nv, ov], i) => {
                        const isKey = metric === 'Total annual tax' || metric === 'Monthly in-hand';
                        return (
                          <tr key={metric} style={{ background: isKey ? C.paleLime : i % 2 === 0 ? C.white : '#fafafa', borderBottom: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: isKey ? 700 : 400 }}>{metric}</td>
                            <td style={{ ...tdR, fontWeight: isKey ? 800 : 500, color: isKey ? '#1f7a58' : C.ink2, textAlign: 'right' }}>{nv}</td>
                            <td style={{ ...tdR, fontWeight: isKey ? 700 : 500, color: isKey ? '#C0392B' : C.ink2, textAlign: 'right' }}>{ov}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  {isNewZero
                    ? `The monthly in-hand difference of ${fmt(newInHand - oldInHand)} (${fmt(newInHand)} vs ${fmt(oldInHand)}) is a direct result of the zero TDS under the new regime. The old regime figure assumes no Chapter VI-A deductions. Claiming 80C and 80D reduces old regime TDS, narrowing the gap but never eliminating it.`
                    : `The new regime saves ${fmt(newInHand - oldInHand)} per month in-hand (${fmt(newInHand)} vs ${fmt(oldInHand)}). The old regime figure assumes no Chapter VI-A deductions. High deduction claimants should compare their specific scenario using the calculator above.`}
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="section-87a">
                  {new87AApplies
                    ? `Section 87A Rebate: The Relief That Makes ${xlph} LPA Tax-Free`
                    : `Section 87A Rebate: Why It Does Not Apply to ${xlph} LPA`}
                </h2>
                <p style={{ ...p, fontWeight: 600, color: C.ink }}>
                  Section 87A of the{' '}
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 700 }}>Income Tax Act 1961</a>{' '}
                  provides a tax rebate of up to Rs 60,000 for resident individuals whose net taxable income does not exceed Rs 12,00,000 under the new regime in FY 2025-26.
                  {new87AApplies
                    ? ` For Rs ${xlph} lakh salary, taxable income is ${taxableFmt}, which is below the ceiling, so the full ${fmt(new87ARebate)} tax is rebated.`
                    : ` For Rs ${xlph} lakh salary, taxable income is ${taxableFmt}, which exceeds the Rs 12,00,000 ceiling, so no rebate applies.`}
                </p>
                <h3 style={h3Style}>Key facts about the Section 87A rebate</h3>
                <div>
                  {([
                    ['Applies to', 'Resident individuals only. Non-resident Indians (NRIs) are not eligible.'],
                    ['Income ceiling', 'Net taxable income must not exceed Rs 12,00,000 under the new regime.'],
                    ['Maximum rebate', 'Rs 60,000, or the actual tax liability if lower.'],
                    ['Cess interaction', 'If tax after rebate is zero, cess is also zero. Cess applies only on a positive tax liability.'],
                    ['Not applicable to', 'Capital gains taxable at special rates (e.g., 20% STCG, 12.5% LTCG). These are taxed separately.'],
                  ] as [string, string][]).map(([title, text]) => (
                    <div key={title} style={{ display: 'flex', flexDirection: 'column', marginBottom: 12 }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 3 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="with-deductions">Income Tax on {xlph} Lakh Salary with Deductions</h2>
                <p style={p}>
                  {isNewZero
                    ? `Even with maximum Chapter VI-A deductions, the old regime tax on Rs ${xlph} lakh salary is ${fmt(deductionScenarios[deductionScenarios.length - 1]?.oldTax ?? oldNetTax)}, higher than the new regime's zero.`
                    : `With maximum deductions, old regime tax on Rs ${xlph} lakh salary is ${fmt(deductionScenarios[deductionScenarios.length - 1]?.oldTax ?? oldNetTax)}. The new regime remains at ${fmt(newNetTax)} regardless of deductions.`}
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Old regime tax at different deduction levels, Rs {xlph} lakh salary
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Deductions claimed</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Old regime tax</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">New regime tax</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Verdict</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deductionScenarios.map(({ label, oldTax, newTax }, i) => (
                        <tr key={label} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderBottom: `1px solid ${C.border}` }}>
                          <td style={tdL}>{label}</td>
                          <td style={{ ...tdR, color: '#C0392B', fontWeight: 600, textAlign: 'right' }}>{fmt(oldTax)}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700, textAlign: 'right' }}>{fmt(newTax)}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontSize: 12, textAlign: 'right' }}>{oldTax > newTax ? 'New wins' : 'Equal'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="in-hand-salary">In-Hand Salary for {xlph} LPA: The Monthly Breakup</h2>
                <p style={p}>
                  The monthly in-hand salary for Rs {xlph} lakh per annum is {fmt(newInHand)} under the new tax regime, calculated after deducting {fmt(monthlyPF)} in employee PF (12% of {fmt(monthlyBasic)} basic) and Rs 200 in professional tax{isNewZero ? ', with zero income tax TDS' : `, with ${fmt(newMonthlyTds)} in income tax TDS`}.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Monthly salary breakup for Rs {xlph} LPA, 50% basic, new regime
                    </caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={{ ...thS, textAlign: 'right' }} scope="col">Per month</th><th style={{ ...thS, textAlign: 'right' }} scope="col">Per year</th></tr></thead>
                    <tbody>
                      {([
                        [`Basic salary (50% of gross)`, fmt(monthlyBasic), fmt(monthlyBasic * 12)],
                        [`HRA (20% of gross)`, fmt(monthlyHRA), fmt(monthlyHRA * 12)],
                        [`Special allowance`, fmt(monthlySpecial), fmt(monthlySpecial * 12)],
                        [`Gross salary`, fmt(monthlyGross), fmt(gross)],
                        [`Less: Employee PF (12% of basic)`, `- ${fmt(monthlyPF)}`, `- ${fmt(monthlyPF * 12)}`],
                        [`Less: Professional tax`, '- Rs 200', '- Rs 2,400'],
                        [`Less: Income tax TDS`, isNewZero ? 'Nil' : `- ${fmt(newMonthlyTds)}`, isNewZero ? 'Nil' : `- ${fmt(newNetTax)}`],
                        [`Net in-hand salary`, fmt(newInHand), fmt(newInHand * 12)],
                      ] as [string, string, string][]).map(([c, m, y], i) => {
                        const isNet = c === 'Net in-hand salary';
                        return (
                          <tr key={c} style={{ background: isNet ? C.paleLime : i % 2 === 0 ? C.white : '#fafafa', borderBottom: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: isNet ? 700 : 400 }}>{c}</td>
                            <td style={{ ...tdR, fontWeight: isNet ? 800 : 500, color: isNet ? '#1f7a58' : C.ink2, textAlign: 'right' }}>{m}</td>
                            <td style={{ ...tdR, fontWeight: isNet ? 700 : 500, textAlign: 'right' }}>{y}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The 50% basic assumption is standard across most Indian companies. At 40% basic, PF drops to {fmt(Math.round(monthlyGross * 0.4 * 0.12))}/month and in-hand rises to {fmt(newInHand + monthlyPF - Math.round(monthlyGross * 0.4 * 0.12))}. At 60% basic, PF rises to {fmt(Math.round(monthlyGross * 0.6 * 0.12))}/month and in-hand falls to {fmt(newInHand + monthlyPF - Math.round(monthlyGross * 0.6 * 0.12))}.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use the{' '}
                  <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link>{' '}
                  to enter your exact CTC split, basic percentage, and actual deductions for a precise monthly take-home figure.
                </p>
              </div>

              {/* City cross-links: pass link equity down to 114 city pages */}
              {(() => {
                const salarySlug = grossLakh.toString().replace('.', '-');
                const cityInHand = (ptPerYear: number) =>
                  monthlyGross - monthlyPF - Math.round(ptPerYear / 12) - newMonthlyTds;
                const CITIES_CL = [
                  { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka', pt: 2500, ptLabel: 'Rs 2,500/yr' },
                  { name: 'Mumbai',    slug: 'mumbai',    state: 'Maharashtra', pt: 2500, ptLabel: 'Rs 2,500/yr' },
                  { name: 'Delhi',     slug: 'delhi',     state: 'Delhi NCR',   pt: 0,    ptLabel: 'Nil' },
                  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana',   pt: 2400, ptLabel: 'Rs 2,400/yr' },
                  { name: 'Pune',      slug: 'pune',      state: 'Maharashtra', pt: 2500, ptLabel: 'Rs 2,500/yr' },
                  { name: 'Chennai',   slug: 'chennai',   state: 'Tamil Nadu',  pt: 2500, ptLabel: 'Rs 2,500/yr' },
                ];
                return (
                  <div style={sec}>
                    <h2 style={h2(mobile)} id="city-comparison">Income Tax on Rs {xlph} Lakh Salary by City</h2>
                    <p style={p}>
                      Professional tax varies by state, which shifts monthly take-home even at identical gross pay. Delhi levies no professional tax; Karnataka, Maharashtra, and Tamil Nadu charge Rs 2,500 per year; Telangana charges Rs 2,400.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                      {CITIES_CL.map(city => (
                        <Link
                          key={city.slug}
                          href={`/tax/${city.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <div style={{
                            border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px',
                            background: C.white, transition: 'border-color 0.2s, box-shadow 0.2s',
                            display: 'flex', flexDirection: 'column', gap: 6,
                          }}
                            onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.lime2; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)'; }}
                            onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.border; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                          >
                            <div className="tax-city-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                              <span style={{ fontWeight: 700, fontSize: 14, color: C.ink, fontFamily: INTER }}>{city.name}</span>
                              <span style={{ fontSize: 11, fontWeight: 600, color: city.pt === 0 ? '#1f7a58' : C.ink3, background: city.pt === 0 ? C.paleLime : '#f6f7f8', borderRadius: 4, padding: '2px 6px', fontFamily: INTER }}>
                                PT {city.ptLabel}
                              </span>
                            </div>
                            <div style={{ fontSize: 12, color: C.ink3, fontFamily: INTER }}>{city.state}</div>
                            <div style={{ marginTop: 4 }}>
                              <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>In-hand: </span>
                              <span style={{ fontSize: 14, fontWeight: 700, color: C.dark, fontFamily: INTER }}>{fmt(cityInHand(city.pt))}/mo</span>
                            </div>
                            <div style={{ fontSize: 12, color: C.dark, fontWeight: 600, fontFamily: INTER, marginTop: 2 }}>
                              {city.name} tax guide →
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <p style={{ ...p, margin: 0 }}>
                      For a side-by-side PT comparison across all cities, see the{' '}
                      <Link href="/tax/by-city" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Tax Guides by City</Link>{' '}
                      hub, or browse all salary levels for a specific city like{' '}
                      <Link href="/tax/bangalore" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Bangalore</Link>{' '}or{' '}
                      <Link href="/tax/delhi" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Delhi</Link>.
                    </p>
                  </div>
                );
              })()}

              <div style={sec}>
                <h2 style={h2(mobile)} id="how-to-use">How to Use the Old vs New Tax Regime Calculator</h2>
                <p style={p}>
                  The{' '}
                  <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link>{' '}
                  computes your exact income tax under both regimes based on your actual salary structure and deductions.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    [`Enter gross salary`, `Type Rs ${grossFmt} or drag the salary slider to your annual CTC figure.`],
                    [`Enter your deductions`, `Add your 80C investments (PPF, ELSS, LIC), 80D health insurance premium, NPS contribution, and HRA exempt amount.`],
                    [`Compare regimes`, `The calculator shows old regime tax, new regime tax, and the exact savings difference for your specific inputs.`],
                    [`Check the breakeven`, `The calculator shows the minimum deduction level at which the old regime would match the new regime.`],
                  ].map(([title, text]) => (
                    <li key={title as string} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{title}:</strong> {text as string}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2(mobile)} id="limitations">When These Tax Numbers May Not Apply to You</h2>
                <p style={p}>
                  All calculations on this page assume a resident individual with salary as the only income source in FY 2025-26. Four common situations produce a different tax outcome.
                </p>
                {([
                  ['Capital gains income', 'Short-term equity gains (Section 111A) are taxed at 20% and long-term equity gains above Rs 1.25 lakh (Section 112A) at 12.5%. Virtual digital asset gains are taxed at a flat 30%. None of these are covered by the Section 87A rebate, even if salary taxable income stays below Rs 12 lakh.'],
                  ['NRI status', 'Section 87A is available only to resident individuals under the Income Tax Act 1961. Non-resident Indians pay tax on India-sourced salary at slab rates without access to this rebate, and employer TDS is calculated under different provisions.'],
                  ['Perquisites and ESOPs', 'Employer-provided perquisites valued under Rule 3 (car, accommodation, meal vouchers) and ESOPs taxed at vesting add to your gross salary. If these push taxable income above Rs 12 lakh, the Section 87A ceiling is breached and the rebate no longer covers the full liability.'],
                  ['Other income sources', 'Rental income, savings interest above Rs 10,000, freelance earnings, and business profits add to salary income before the tax calculation. Even a small additional income above the Rs 12 lakh rebate ceiling results in a non-zero tax liability.'],
                ] as [string, string][]).map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 16 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}:</strong>
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}> {text}</span>
                  </div>
                ))}
              </div>

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2(mobile)} id="faq">Frequently Asked Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                  {faqItems.map(([q, a], idx) => (
                    <div key={idx} style={{ borderBottom: idx < faqItems.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <button
                        onClick={() => setOpenFaq(prev => { const s = new Set(prev); s.has(idx) ? s.delete(idx) : s.add(idx); return s; })}
                        style={{ width: '100%', padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, textAlign: 'left', fontFamily: INTER }}
                        aria-expanded={openFaq.has(idx)} aria-controls={`faq-${idx}`}>
                        <span style={{ fontSize: 14.5, fontWeight: 600, color: C.ink, lineHeight: 1.4 }}>{q}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, transform: openFaq.has(idx) ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9" /></svg>
                      </button>
                      {openFaq.has(idx) && (
                        <div id={`faq-${idx}`} role="region" style={{ padding: '0 20px 16px', fontSize: 14, color: C.ink2, lineHeight: 1.75, fontFamily: INTER }}>
                          {a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only, based on standard salary structure assumptions for FY 2025-26. Actual tax liability depends on your exact salary components, declared deductions, and any income other than salary. Tax laws are subject to change. This page is for educational and planning purposes and does not constitute financial or tax advice. Consult a qualified CA or SEBI-registered financial adviser before making tax-related decisions.
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside aria-label="Related calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ minHeight: 250, background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
              <span style={{ fontSize: 11, color: C.ink3 }}>300 x 250</span>
            </div>
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/old-vs-new-tax-regime-calculator|Old vs New Regime', '/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/income-tax-calculator|Income Tax', '/calculators/hra-calculator|HRA Exemption', '/calculators/nps-calculator|NPS', '/calculators/ppf-calculator|PPF', '/calculators/sip-calculator|SIP'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },

      ])} />
    </div>
  );
}

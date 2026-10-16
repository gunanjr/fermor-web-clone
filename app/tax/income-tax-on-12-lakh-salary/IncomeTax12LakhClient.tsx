'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';

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

type Mode = 'new' | 'old' | 'inhand';

/* ─── Waitlist ───────────────────────────────────────────────── */
function WaitlistCard({ mobile }: { mobile: boolean }) {
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      if (!localStorage.getItem('fermor-waitlist-joined')) setHidden(false);
    } catch { setHidden(false); }
  }, []);

  if (hidden) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'income-tax-12-lakh' }),
      });
      if (res.ok) {
        setStatus('done');
        try { localStorage.setItem('fermor-waitlist-joined', '1'); } catch { /* ignore */ }
      } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  if (status === 'done') {
    return (
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1f7a58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
        <div><p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: 0 }}>Done. Check your email to complete sign up.</p></div>
      </div>
    );
  }

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: mobile ? '18px' : '20px 24px', marginBottom: 40 }}>
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px' }}>Save your results</p>
      <p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6 }}>
        Sign up to save this calculation and access your results any time.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" required aria-label="Email address"
          style={{ flex: 1, minWidth: 200, padding: '9px 13px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.ink, fontSize: 13.5, fontFamily: INTER, outline: 'none' }} />
        <button className="fx-btn" type="submit" disabled={status === 'loading'}
          style={{ padding: '9px 20px', background: '#E9ECEE', color: '#101214', fontWeight: 600, fontSize: 13.5, borderRadius: 8, border: '1px solid #D3D7DA', cursor: status === 'loading' ? 'wait' : 'pointer', fontFamily: INTER, whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.65 : 1, transition: 'opacity 0.15s' }}>
          {status === 'loading' ? 'Saving...' : 'Sign up free'}
        </button>
      </form>
      {status === 'error' && <p style={{ color: '#C0392B', fontSize: 12.5, margin: '10px 0 0' }}>Something went wrong. Try again in a moment.</p>}
    </div>
  );
}

/* ─── Sidebar list ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime Calculator' },
  { href: '/calculators/in-hand-salary-calculator',        label: 'In-Hand Salary Calculator' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/hra-calculator',         label: 'HRA Exemption Calculator' },
  { href: '/calculators/nps-calculator',                   label: 'NPS Tax Benefit Calculator' },
  { href: '/calculators/capital-gains-calculator',     label: 'Capital Gains Tax Calculator' },
  { href: '/calculators/tds-calculator',                   label: 'TDS Calculator' },
];

const MORE = [
  { href: '/calculators/ppf-calculator',       label: 'PPF Calculator' },
  { href: '/calculators/epf-calculator',       label: 'EPF Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
  { href: '/calculators/fd-calculator',        label: 'FD Calculator' },
  { href: '/calculators/gst-calculator',       label: 'GST Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How much income tax do I pay on a 12 lakh salary?',
    a: 'Under the new tax regime in FY 2025-26, income tax on Rs 12 lakh salary is zero. After the standard deduction of Rs 75,000, taxable income is Rs 11,25,000. Tax at new regime slabs is Rs 52,500. Section 87A provides a full rebate since taxable income is below Rs 12 lakh. Under the old regime with no deductions, the tax is Rs 1,56,000 including 4% cess.',
  },
  {
    q: 'What is the in-hand salary for 12 LPA?',
    a: 'Monthly in-hand for 12 LPA under the new tax regime is approximately Rs 93,800, assuming 50% basic salary. Deductions are Rs 6,000 employee PF (12% of Rs 50,000 basic) and Rs 200 professional tax. Income tax TDS is zero since annual tax liability is nil after the Section 87A rebate.',
  },
  {
    q: 'Is 12 LPA tax-free in FY 2025-26?',
    a: 'Yes, 12 LPA is effectively tax-free under the new regime. Standard deduction reduces gross salary to Rs 11,25,000 taxable income. Tax on this is Rs 52,500. Section 87A rebates the full Rs 52,500 because taxable income is below Rs 12,00,000. The exact zero-tax limit at gross salary level is Rs 12,75,000.',
  },
  {
    q: 'Should I choose old or new regime for 12 LPA?',
    a: 'Choose the new regime. Under the new regime, tax is zero. Under the old regime with 80C maxed at Rs 1,50,000 plus Rs 25,000 in 80D, the tax is still approximately Rs 83,200. You would need deductions exceeding Rs 4,25,000 to match the new regime, which is practically impossible for most 12 LPA salaried employees.',
  },
  {
    q: 'What is the Section 87A rebate for 12 lakh salary?',
    a: 'Section 87A provides a rebate of up to Rs 60,000 under the new regime for resident individuals whose net taxable income does not exceed Rs 12,00,000. For 12 LPA with a standard deduction, taxable income is Rs 11,25,000 and tax is Rs 52,500. The full Rs 52,500 is rebated to zero. Section 87A was updated via the Finance Act per the Income Tax Department.',
  },
  {
    q: 'How much TDS is deducted per month for 12 LPA?',
    a: 'TDS per month for 12 LPA under the new regime is zero, since annual tax after Section 87A rebate is nil. Under the old regime with no deductions, TDS is approximately Rs 13,000 per month (Rs 1,56,000 divided by 12). Your employer will compute TDS in April based on the regime and investments you declare.',
  },
  {
    q: 'What is 12 LPA gross vs 12 LPA in-hand?',
    a: 'Rs 12 LPA gross salary means Rs 12,00,000 annual CTC. The monthly gross amount is Rs 1,00,000. Monthly in-hand is Rs 93,800, which is gross minus employee PF (Rs 6,000) and professional tax (Rs 200). Income tax TDS is zero under the new regime. In-hand can vary if the company deducts health insurance premiums or other employee contributions.',
  },
  {
    q: 'Does 12 LPA salary attract surcharge?',
    a: 'No. Surcharge applies only when total income exceeds Rs 50 lakh. A 12 LPA salary at Rs 12,00,000 is well below this threshold. Only the 4% health and education cess applies to the base tax liability. Under the new regime with the Section 87A rebate, both base tax and cess are zero.',
  },
  {
    q: 'How is income tax calculated on 12 lakh salary in Excel?',
    a: 'Place taxable income (Rs 11,25,000 after standard deduction) in A1. New regime tax: =(MAX(0,MIN(A1,800000)-400000)*0.05)+(MAX(0,MIN(A1,1200000)-800000)*0.1). This returns Rs 52,500. Add the 87A check: =IF(A1<=1200000,0,above_formula*1.04). For Rs 11,25,000 taxable income the result is Rs 0. The old regime formula uses the 0/5/20/30 slabs on the same taxable income.',
  },
  {
    q: 'What is the effective tax rate on 12 lakh salary?',
    a: 'The effective tax rate on Rs 12 lakh salary is 0% under the new regime after the Section 87A rebate. Under the old regime with no deductions, the effective tax rate is 13% (Rs 1,56,000 on Rs 12,00,000 gross). The marginal tax rate under the old regime at this income level is 30% for income above Rs 10 lakh.',
  },
  {
    q: 'What is a good salary structure for 12 LPA to minimise deductions?',
    a: 'A 40% basic salary structure minimises PF deduction. Basic: Rs 40,000 (employee PF: Rs 4,800/month), HRA: Rs 20,000, Special allowance: Rs 40,000. Monthly in-hand rises to approximately Rs 95,000 under the new regime. Lower basic means lower PF deduction, but also lower EPF corpus at retirement. A 50% basic is more common and balanced.',
  },
  {
    q: 'What is the difference between CTC and in-hand salary for 12 LPA?',
    a: 'CTC (Cost to Company) is the total annual expense to the employer, which includes both employee and employer contributions. For 12 LPA CTC with 50% basic: employer PF (Rs 72,000/year) and employee PF (Rs 72,000/year) are both in CTC. Your actual gross salary is Rs 12,00,000 minus employer PF of Rs 72,000 = Rs 11,28,000. But most companies show CTC as gross including all components; the in-hand deductions are employee PF, professional tax, and TDS.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators and tax guides are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));
  const toggle = (i: number) => setOpen(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {FAQS.map((f, i) => {
        const o = open.has(i);
        return (
          <div key={i} style={{ border: `1px solid ${o ? '#C0C0C0' : C.border}`, borderRadius: 9, background: C.white, overflow: 'hidden' }}>
            <button onClick={() => toggle(i)}
              aria-expanded={o} aria-controls={`faq-${i}`}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 14, fontFamily: INTER }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.5 }}>{f.q}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={o ? C.dark : C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true" style={{ transform: o ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {o && <div id={`faq-${i}`} role="region" style={{ padding: '0 20px 15px', fontSize: 14, color: C.ink2, lineHeight: 1.85 }}>{f.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function IncomeTax12LakhClient({ region = 'in' }: { region?: string }) {
  const [mode,         setMode]         = useState<Mode>('new');
  const [mobile,       setMobile]       = useState(false);
  const [showDeducTable, setShowDeducTable] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));

  useEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* localStorage: persist active tab */
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-income-tax-12-lakh-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.mode === 'new' || d.mode === 'old' || d.mode === 'inhand') setMode(d.mode);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('fermor-income-tax-12-lakh-v1', JSON.stringify({ mode })); }
    catch { /* ignore */ }
  }, [mode]);

  void region;

  /* Pre-computed tax data */
  const NEW_REGIME = {
    gross: 1200000, stdDeduction: 75000, taxable: 1125000,
    slabs: [
      { range: 'Rs 0 to Rs 4,00,000',         rate: '0%',  tax: 0 },
      { range: 'Rs 4,00,001 to Rs 8,00,000',  rate: '5%',  tax: 20000 },
      { range: 'Rs 8,00,001 to Rs 11,25,000', rate: '10%', tax: 32500 },
    ],
    preRebateTax: 52500, rebate: 52500, finalTax: 0, cess: 0,
  };
  const OLD_REGIME = {
    gross: 1200000, stdDeduction: 75000, taxable: 1125000,
    slabs: [
      { range: 'Rs 0 to Rs 2,50,000',           rate: '0%',  tax: 0 },
      { range: 'Rs 2,50,001 to Rs 5,00,000',    rate: '5%',  tax: 12500 },
      { range: 'Rs 5,00,001 to Rs 10,00,000',   rate: '20%', tax: 100000 },
      { range: 'Rs 10,00,001 to Rs 11,25,000',  rate: '30%', tax: 37500 },
    ],
    beforeCess: 150000, cess: 6000, finalTax: 156000,
  };
  const INHAND = {
    monthly: [
      { label: 'Basic salary (50% of CTC)', amount: 50000 },
      { label: 'HRA (20% of CTC)',           amount: 20000 },
      { label: 'Special allowance',          amount: 30000 },
      { label: 'Gross salary',               amount: 100000 },
    ],
    deductions: [
      { label: 'Employee PF (12% of basic)', amount: -6000 },
      { label: 'Professional tax',           amount: -200 },
      { label: 'Income tax TDS',             amount: 0 },
    ],
    net: 93800,
  };

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;

  return (
    <div className="tax-page" style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Income Tax on 12 Lakh Salary (FY 2025-26)
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            New regime: zero tax after Section 87A rebate. Old regime: Rs 1,56,000. Monthly in-hand salary: Rs 93,800.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Income Tax Breakdown for 12 Lakh Salary"
              style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              {/* Tabs inside card */}
              <div role="tablist" aria-label="Tax breakdown mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'new' as Mode,    label: 'New Regime',   desc: 'FY 2025-26 new tax regime breakdown' },
                  { id: 'old' as Mode,    label: 'Old Regime',   desc: 'Old tax regime computation with slab rates' },
                  { id: 'inhand' as Mode, label: 'In-Hand Salary', desc: 'Monthly take-home salary breakup' },
                ]).map(tab => (
                  <button key={tab.id}
                    role="tab" aria-selected={mode === tab.id} aria-controls={`panel-${tab.id}`}
                    onClick={() => { setMode(tab.id); setShowDeducTable(false); }}
                    title={tab.desc}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5, fontWeight: mode === tab.id ? 700 : 400,
                      color: mode === tab.id ? C.dark : C.ink3,
                      borderBottom: mode === tab.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Left: breakdown */}
                <div id={`panel-${mode}`} role="tabpanel"
                  style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Breakdown</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {mode === 'new' && (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        {[
                          ['Gross salary', fmtIN(NEW_REGIME.gross)],
                          ['Less: standard deduction', `- ${fmtIN(NEW_REGIME.stdDeduction)}`],
                          ['Taxable income', fmtIN(NEW_REGIME.taxable)],
                        ].map(([label, value]) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                            <span style={{ fontSize: 13.5, color: C.ink2 }}>{label}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>New regime slabs (FY 2025-26)</p>
                      {NEW_REGIME.slabs.map(s => (
                        <div key={s.range} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>{s.range} ({s.rate})</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{fmtIN(s.tax)}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13.5, color: C.ink2 }}>Tax before rebate</span>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{fmtIN(NEW_REGIME.preRebateTax)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13.5, color: '#1f7a58' }}>Less: Section 87A rebate</span>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: '#1f7a58' }}>- {fmtIN(NEW_REGIME.rebate)}</span>
                      </div>
                    </>
                  )}

                  {mode === 'old' && (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        {[
                          ['Gross salary', fmtIN(OLD_REGIME.gross)],
                          ['Less: standard deduction', `- ${fmtIN(OLD_REGIME.stdDeduction)}`],
                          ['Taxable income', fmtIN(OLD_REGIME.taxable)],
                        ].map(([label, value]) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                            <span style={{ fontSize: 13.5, color: C.ink2 }}>{label}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Old regime slabs</p>
                      {OLD_REGIME.slabs.map(s => (
                        <div key={s.range} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>{s.range} ({s.rate})</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{fmtIN(s.tax)}</span>
                        </div>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13.5, color: C.ink2 }}>Tax before cess</span>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{fmtIN(OLD_REGIME.beforeCess)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13.5, color: C.ink2 }}>4% health and education cess</span>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{fmtIN(OLD_REGIME.cess)}</span>
                      </div>
                    </>
                  )}

                  {mode === 'inhand' && (
                    <>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Monthly salary components</p>
                      {INHAND.monthly.map(item => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>{item.label}</span>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{fmtIN(item.amount)}</span>
                        </div>
                      ))}
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '14px 0 10px' }}>Deductions</p>
                      {INHAND.deductions.map(item => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>{item.label}</span>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: item.amount < 0 ? '#C0392B' : item.amount === 0 ? '#1f7a58' : C.ink }}>
                            {item.amount < 0 ? `- ${fmtIN(Math.abs(item.amount))}` : item.amount === 0 ? 'Nil' : fmtIN(item.amount)}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Right: result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {mode === 'new' && (
                    <>
                      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '14px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Income Tax (New Regime)</span>
                        <span style={{ fontSize: mobile ? 24 : 30, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label="Income tax new regime: Rs 0">Rs 0</span>
                      </div>
                      {[
                        ['Gross salary', fmtIN(1200000)],
                        ['Standard deduction', `- ${fmtIN(75000)}`],
                        ['Taxable income', fmtIN(1125000)],
                        ['Tax before rebate', fmtIN(52500)],
                        ['Section 87A rebate', `- ${fmtIN(52500)}`],
                        ['4% cess', fmtIN(0)],
                        ['Net tax payable', fmtIN(0)],
                      ].map(([label, value]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '11px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: label === 'Net tax payable' ? '#1f7a58' : C.ink }}>{value}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: 8, background: C.paleLime, borderRadius: 8, padding: '12px 16px' }}>
                        <p style={{ fontSize: 13, color: C.dark, fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                          Zero tax applies because taxable income (Rs 11,25,000) is below the Section 87A ceiling of Rs 12,00,000.
                        </p>
                      </div>
                    </>
                  )}

                  {mode === 'old' && (
                    <>
                      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '14px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Income Tax (Old Regime)</span>
                        <span style={{ fontSize: mobile ? 24 : 30, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label="Income tax old regime: Rs 1,56,000">{fmtIN(156000)}</span>
                      </div>
                      {[
                        ['Taxable income', fmtIN(1125000)],
                        ['Tax on Rs 0-2.5L (0%)', fmtIN(0)],
                        ['Tax on Rs 2.5-5L (5%)', fmtIN(12500)],
                        ['Tax on Rs 5-10L (20%)', fmtIN(100000)],
                        ['Tax on Rs 10-11.25L (30%)', fmtIN(37500)],
                        ['Tax before cess', fmtIN(150000)],
                        ['4% cess', fmtIN(6000)],
                        ['Total tax payable', fmtIN(156000)],
                      ].map(([label, value]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '11px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: label === 'Total tax payable' ? '#C0392B' : C.ink }}>{value}</span>
                        </div>
                      ))}
                    </>
                  )}

                  {mode === 'inhand' && (
                    <>
                      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '14px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Monthly In-Hand (New Regime)</span>
                        <span style={{ fontSize: mobile ? 24 : 30, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label="Monthly in-hand salary: Rs 93,800">{fmtIN(93800)}</span>
                      </div>
                      {[
                        ['Monthly gross salary', fmtIN(100000)],
                        ['Less: employee PF', `- ${fmtIN(6000)}`],
                        ['Less: professional tax', `- ${fmtIN(200)}`],
                        ['Less: income tax TDS', 'Nil'],
                        ['Monthly in-hand', fmtIN(93800)],
                        ['Annual in-hand', fmtIN(93800 * 12)],
                      ].map(([label, value]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '11px 0', borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: label === 'Monthly in-hand' ? '#1f7a58' : C.ink }}>{value}</span>
                        </div>
                      ))}
                      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '12px 0 0' }}>
                        Assumes 50% basic salary (Rs 50,000), PF on basic at 12%. Use the{' '}
                        <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link>{' '}
                        for your exact CTC split.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Collapsible: deductions impact table */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowDeducTable(v => !v)}
                  aria-expanded={showDeducTable} aria-controls="deductions-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 36px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Tax by Deduction Level</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Old regime vs new regime across all deduction scenarios</span>}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true" style={{ transform: showDeducTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {showDeducTable && (
                  <div id="deductions-table" style={{ borderTop: `1px solid ${C.border}` }}>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                          style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                      </div>
                    )}
                    <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 480, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 20px 4px', captionSide: 'top' as const }}>
                          Old regime vs new regime tax at different deduction levels, Rs 12 lakh salary FY 2025-26
                        </caption>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Deductions claimed', 'Taxable income', 'Old regime tax', 'New regime tax', 'Saving'].map(h => (
                              <th key={h} scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap', borderBottom: `1px solid ${C.border}` }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ['None',                               'Rs 11,25,000', 'Rs 1,56,000', 'Rs 0', 'Rs 1,56,000'],
                            ['80C: Rs 1,50,000',                  'Rs 9,75,000',  'Rs 1,02,600', 'Rs 0', 'Rs 1,02,600'],
                            ['80C + 80D: Rs 1,75,000',            'Rs 9,50,000',  'Rs 93,600',  'Rs 0', 'Rs 93,600'],
                            ['80C + 80D + NPS: Rs 2,25,000',      'Rs 9,00,000',  'Rs 73,320',  'Rs 0', 'Rs 73,320'],
                            ['80C + 80D + NPS + HRA: Rs 3,75,000','Rs 7,50,000',  'Rs 31,200',  'Rs 0', 'Rs 31,200'],
                          ].map(([d, ti, ot, nt, save], i) => (
                            <tr key={d} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 16px', color: C.ink2 }}>{d}</td>
                              <td style={{ padding: '11px 16px', color: C.ink2 }}>{ti}</td>
                              <td style={{ padding: '11px 16px', color: '#C0392B', fontWeight: 600 }}>{ot}</td>
                              <td style={{ padding: '11px 16px', color: '#1f7a58', fontWeight: 700 }}>{nt}</td>
                              <td style={{ padding: '11px 16px', color: '#1f7a58', fontWeight: 700 }}>{save}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <WaitlistCard mobile={mobile} />

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-income-tax">What Is Income Tax on a 12 Lakh Salary?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Income tax on a Rs 12 lakh annual salary in FY 2025-26 is zero under the new tax regime and Rs 1,56,000 under the old regime without deductions.
                  </p>
                </div>
                <p style={p}>
                  Income tax in India is levied under the Income Tax Act 1961, administered by the{' '}
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a>.
                  For salaried employees, tax is computed on annual gross salary after subtracting the standard deduction and any eligible Chapter VI-A deductions, then applying the applicable slab rates.
                </p>
                <p style={p}>
                  The Finance Act 2025 expanded the new tax regime to cover zero tax for individuals with taxable income up to Rs 12,00,000 through the Section 87A rebate. For a Rs 12 lakh gross salary, the standard deduction of Rs 75,000 brings taxable income to Rs 11,25,000, well within the rebate threshold.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-formula">Income Tax Formula: How to Calculate Tax on 12 LPA</h2>
                <p style={p}>Income tax on salary is computed in four steps: gross salary minus standard deduction gives net salary, apply the applicable slab rates, check for Section 87A rebate eligibility, then add the 4% cess on any remaining tax liability.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    Tax = (Slab rates on taxable income) - 87A rebate, then add 4% cess
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Applied to Rs 12 lakh salary, FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Variable</th><th style={thS} scope="col">Value for 12 LPA</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Gross salary',         'Rs 12,00,000',  'Total annual CTC'],
                        ['Standard deduction',   'Rs 75,000',     'Flat deduction under both regimes'],
                        ['Taxable income',        'Rs 11,25,000',  'Gross minus standard deduction'],
                        ['Tax (new regime slabs)','Rs 52,500',     'Before Section 87A rebate'],
                        ['Section 87A rebate',   'Rs 52,500',     'Taxable income below Rs 12L ceiling'],
                        ['Net tax (new regime)', 'Rs 0',          'After rebate; cess also zero'],
                        ['Net tax (old regime)',  'Rs 1,56,000',   'No deductions; includes 4% cess'],
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
                <p style={p}>
                  The key variable for 12 LPA is the taxable income of Rs 11,25,000, which falls below the Section 87A ceiling of Rs 12,00,000. This single fact makes the entire new regime tax liability zero. The Rs 52,500 pre-rebate tax maps to the 5% slab on Rs 4-8L (Rs 20,000) and the 10% slab on Rs 8-11.25L (Rs 32,500).
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="excel-calculation">Income Tax on 12 Lakh Salary in Excel: Three Methods</h2>
                <p style={p}>
                  You can compute income tax on a Rs 12 lakh salary in Excel using a slab-by-slab formula. Place the taxable income (Rs 11,25,000) in cell A1. All three methods below return Rs 52,500 before the 87A rebate and Rs 0 after.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      New regime Excel formulas for Rs 12 lakh salary (A1 = Rs 11,25,000 taxable income)
                    </caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">Formula</th><th style={thS} scope="col">Result</th></tr></thead>
                    <tbody>
                      {[
                        ['Slab-by-slab', '=MAX(0,(MIN(A1,800000)-400000)*0.05)+(MAX(0,MIN(A1,1200000)-800000)*0.1)', 'Rs 52,500'],
                        ['With 87A rebate', '=IF(A1<=1200000,0,[above formula]*1.04)', 'Rs 0 (tax-free)'],
                        ['Old regime', '=MAX(0,(MIN(A1,500000)-250000)*0.05)+(MAX(0,MIN(A1,1000000)-500000)*0.2)+(MAX(0,A1-1000000)*0.3)', 'Rs 1,50,000'],
                        ['Old regime + cess', '=[old regime formula]*1.04', 'Rs 1,56,000'],
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
                <p style={p}>
                  The "With 87A rebate" row is the production formula for any income up to Rs 12,75,000 gross salary. The <code style={mono}>IF(A1&lt;=1200000,0,...)</code> check applies the rebate automatically. Above Rs 12,75,000 gross, replace the formula with the full new regime slab computation multiplied by 1.04 for cess.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="new-regime-breakdown">New Regime Tax Breakdown: Why 12 LPA Pays Zero</h2>
                <p style={p}>
                  Under the new tax regime in FY 2025-26, a Rs 12 lakh salary produces taxable income of Rs 11,25,000 after the standard deduction, which generates Rs 52,500 in tax before the Section 87A rebate eliminates it entirely.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      New regime slab-by-slab computation, Rs 12 lakh salary FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Income slab</th><th style={thS} scope="col">Rate</th><th style={thS} scope="col">Tax amount</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 0 to Rs 4,00,000',           '0%',  'Rs 0',       false],
                        ['Rs 4,00,001 to Rs 8,00,000',    '5%',  'Rs 20,000',  false],
                        ['Rs 8,00,001 to Rs 11,25,000',   '10%', 'Rs 32,500',  false],
                        ['Total tax before rebate',        '',    'Rs 52,500',  true],
                        ['Less: Section 87A rebate',       '',    '- Rs 52,500', false],
                        ['Net tax payable',                '',    'Rs 0',        true],
                        ['Health and education cess (4%)', '',    'Rs 0',        false],
                      ].map(([slab, rate, tax, bold]) => (
                        <tr key={slab as string} style={{ background: (slab === 'Net tax payable') ? C.paleLime : 'transparent', borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: bold ? 700 : 400 }}>{slab}</td>
                          <td style={tdR}>{rate}</td>
                          <td style={{ ...tdR, fontWeight: bold ? 700 : 400, color: (slab === 'Net tax payable') ? '#1f7a58' : C.ink2 }}>{tax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The Rs 8-11.25L band is taxed at 10%, generating Rs 32,500 on the Rs 3,25,000 income above the Rs 8L threshold. Combined with Rs 20,000 on the Rs 4-8L band, the pre-rebate total is Rs 52,500. The Finance Act 2025 set the Section 87A ceiling at Rs 12,00,000 net taxable income, so the full Rs 52,500 is wiped out.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-regime-breakdown">Old Regime Tax Computation for 12 Lakh Salary</h2>
                <p style={p}>
                  Under the old tax regime with no Chapter VI-A deductions beyond the standard deduction, income tax on Rs 12 lakh salary is Rs 1,50,000 before cess and Rs 1,56,000 including the 4% health and education cess.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Old regime computation, no deductions, Rs 12 lakh salary FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Income slab</th><th style={thS} scope="col">Rate</th><th style={thS} scope="col">Tax amount</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 0 to Rs 2,50,000',           '0%',  'Rs 0',       false],
                        ['Rs 2,50,001 to Rs 5,00,000',    '5%',  'Rs 12,500',  false],
                        ['Rs 5,00,001 to Rs 10,00,000',   '20%', 'Rs 1,00,000', false],
                        ['Rs 10,00,001 to Rs 11,25,000',  '30%', 'Rs 37,500',  false],
                        ['Total tax before cess',          '',    'Rs 1,50,000', true],
                        ['Health and education cess (4%)', '',    'Rs 6,000',   false],
                        ['Total tax payable',              '',    'Rs 1,56,000', true],
                      ].map(([slab, rate, tax, bold]) => (
                        <tr key={slab as string} style={{ background: (slab === 'Total tax payable') ? '#FFF3F3' : 'transparent', borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: bold ? 700 : 400 }}>{slab}</td>
                          <td style={tdR}>{rate}</td>
                          <td style={{ ...tdR, fontWeight: bold ? 700 : 400, color: (slab === 'Total tax payable') ? '#C0392B' : C.ink2 }}>{tax}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The highest marginal rate under the old regime at Rs 12 lakh is 30%, applied to the Rs 1,25,000 of income above the Rs 10 lakh threshold, generating Rs 37,500 in tax from that band. The 4% cess on the base tax of Rs 1,50,000 adds Rs 6,000 to reach the final Rs 1,56,000. No Section 87A rebate applies under the old regime, where the ceiling is Rs 5,00,000 net taxable income.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-vs-new">Old vs New Regime: Which Is Better for 12 LPA?</h2>
                <p style={p}>
                  The new regime is better for 12 LPA in every deduction scenario because the Rs 52,500 tax liability is wiped out by Section 87A, while the old regime never reaches zero tax regardless of deductions at this income level.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Side-by-side comparison, Rs 12 lakh salary FY 2025-26
                    </caption>
                    <thead><tr><th style={thS} scope="col">Metric</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">New regime</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Old regime</th></tr></thead>
                    <tbody>
                      {[
                        ['Gross salary',       'Rs 12,00,000',  'Rs 12,00,000'],
                        ['Standard deduction', 'Rs 75,000',     'Rs 75,000'],
                        ['80C deductions',     'Not allowed',   'Up to Rs 1,50,000'],
                        ['80D deductions',     'Not allowed',   'Up to Rs 25,000'],
                        ['Taxable income',     'Rs 11,25,000',  'Rs 11,25,000'],
                        ['Pre-rebate tax',     'Rs 52,500',     'Rs 1,50,000'],
                        ['Section 87A rebate', 'Rs 52,500',     'Nil (threshold Rs 5L)'],
                        ['Net tax',           'Rs 0',           'Rs 1,50,000'],
                        ['4% cess',            'Rs 0',           'Rs 6,000'],
                        ['Total annual tax',   'Rs 0',           'Rs 1,56,000'],
                        ['Monthly TDS',        'Rs 0',           'Rs 13,000'],
                        ['Monthly in-hand',    'Rs 93,800',      'Rs 80,800'],
                      ].map(([metric, nv, ov], i) => {
                        const isKey = metric === 'Total annual tax' || metric === 'Monthly in-hand';
                        return (
                          <tr key={metric} style={{ background: isKey ? C.paleLime : i % 2 === 0 ? C.white : '#fafafa', borderBottom: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: isKey ? 700 : 400 }}>{metric}</td>
                            <td style={{ ...tdR, fontWeight: isKey ? 800 : 500, color: isKey ? '#1f7a58' : C.ink2, textAlign: 'right' as const }}>{nv}</td>
                            <td style={{ ...tdR, fontWeight: isKey ? 700 : 500, color: isKey ? '#C0392B' : C.ink2, textAlign: 'right' as const }}>{ov}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The monthly in-hand difference of Rs 13,000 (Rs 93,800 vs Rs 80,800) is a direct result of the zero TDS under the new regime. The old regime figure of Rs 80,800 assumes no Chapter VI-A deductions. Claiming 80C and 80D reduces old regime TDS, narrowing the gap but never eliminating it.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-87a">Section 87A Rebate: The Rs 60,000 Relief That Makes 12 LPA Tax-Free</h2>
                <p style={{ ...p, fontWeight: 600, color: C.ink }}>
                  Section 87A of the{' '}
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 700 }}>Income Tax Act 1961</a>{' '}
                  provides a tax rebate of up to Rs 60,000 for resident individuals whose net taxable income does not exceed Rs 12,00,000 under the new regime in FY 2025-26.
                </p>
                <p style={p}>
                  The rebate mechanism works by first computing the full tax liability at new regime slab rates, then reducing that liability by the lesser of the computed tax or Rs 60,000. For a Rs 12 lakh salary, computed tax is Rs 52,500. Since Rs 52,500 is less than the Rs 60,000 ceiling, the full amount is rebated and the final tax is zero.
                </p>
                <p style={p}>
                  The threshold is net taxable income, not gross salary. This means a gross salary of up to Rs 12,75,000 still qualifies for the full rebate, because the standard deduction of Rs 75,000 brings taxable income to exactly Rs 12,00,000. Above Rs 12,75,000 gross, the rebate no longer covers the entire tax liability.
                </p>
                <h3 style={h3}>Key facts about the Section 87A rebate</h3>
                <div>
                  {[
                    ['Applies to', 'Resident individuals only. Non-resident Indians (NRIs) are not eligible.'],
                    ['Income ceiling', 'Net taxable income must not exceed Rs 12,00,000 under the new regime.'],
                    ['Maximum rebate', 'Rs 60,000, or the actual tax liability if lower.'],
                    ['Cess interaction', 'If tax after rebate is zero, cess is also zero. Cess applies only on a positive tax liability.'],
                    ['Not applicable to', 'Capital gains taxable at special rates (e.g., 15% STCG, 10% LTCG). These are taxed separately.'],
                  ].map(([title, text]) => (
                    <div key={title as string} style={{ display: 'flex', flexDirection: 'column' as const, marginBottom: 12 }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 3 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="with-deductions">Income Tax on 12 Lakh Salary with Deductions</h2>
                <p style={p}>
                  Even with maximum Chapter VI-A deductions including 80C at Rs 1,50,000, 80D at Rs 25,000, and NPS at Rs 75,000, the old regime tax on Rs 12 lakh salary is Rs 73,320, which is higher than the new regime's zero.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Old regime tax at different deduction levels, Rs 12 lakh salary
                    </caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Deductions claimed</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Old regime tax</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">New regime tax</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Verdict</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['None',                                         'Rs 1,56,000', 'Rs 0', 'New wins'],
                        ['80C: Rs 1,50,000',                            'Rs 1,02,600', 'Rs 0', 'New wins'],
                        ['80C + 80D: Rs 1,75,000',                      'Rs 93,600',   'Rs 0', 'New wins'],
                        ['80C + 80D + NPS 80CCD: Rs 2,25,000',          'Rs 73,320',   'Rs 0', 'New wins'],
                        ['80C + 80D + NPS + HRA exempt: Rs 3,75,000',   'Rs 31,200',   'Rs 0', 'New wins'],
                        ['80C + 80D + NPS + HRA + Home loan: Rs 5,75,000','Rs 2,080',  'Rs 0', 'New wins'],
                      ].map(([d, ot, nt, verdict], i) => (
                        <tr key={d as string} style={{ background: i % 2 === 0 ? C.white : '#fafafa', borderBottom: `1px solid ${C.border}` }}>
                          <td style={tdL}>{d}</td>
                          <td style={{ ...tdR, color: '#C0392B', fontWeight: 600, textAlign: 'right' as const }}>{ot}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 700, textAlign: 'right' as const }}>{nt}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontSize: 12, textAlign: 'right' as const }}>{verdict}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The new regime wins at every deduction level for Rs 12 lakh salary because of the Section 87A rebate. The breakeven scenario where the old regime might theoretically match would require combined deductions exceeding Rs 5,75,000, which is practically unachievable for most salaried employees. For most 12 LPA earners, the new regime saves between Rs 2,080 and Rs 1,56,000 in annual tax.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="in-hand-salary">In-Hand Salary for 12 LPA: The Monthly Breakup</h2>
                <p style={p}>
                  The monthly in-hand salary for Rs 12 lakh per annum is Rs 93,800 under the new tax regime, calculated after deducting Rs 6,000 in employee PF (12% of Rs 50,000 basic) and Rs 200 in professional tax, with zero income tax TDS.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>
                      Monthly salary breakup for Rs 12 LPA, 50% basic, new regime
                    </caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Per month</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Per year</th></tr></thead>
                    <tbody>
                      {[
                        ['Basic salary (50% of gross)', 'Rs 50,000', 'Rs 6,00,000'],
                        ['HRA (20% of gross)', 'Rs 20,000', 'Rs 2,40,000'],
                        ['Special allowance', 'Rs 30,000', 'Rs 3,60,000'],
                        ['Gross salary', 'Rs 1,00,000', 'Rs 12,00,000'],
                        ['Less: Employee PF (12% of basic)', '- Rs 6,000', '- Rs 72,000'],
                        ['Less: Professional tax', '- Rs 200', '- Rs 2,400'],
                        ['Less: Income tax TDS', 'Nil', 'Nil'],
                        ['Net in-hand salary', 'Rs 93,800', 'Rs 11,25,600'],
                      ].map(([c, m, y], i) => {
                        const isNet = c === 'Net in-hand salary';
                        return (
                          <tr key={c} style={{ background: isNet ? C.paleLime : i % 2 === 0 ? C.white : '#fafafa', borderBottom: `1px solid ${C.border}` }}>
                            <td style={{ ...tdL, fontWeight: isNet ? 700 : 400 }}>{c}</td>
                            <td style={{ ...tdR, fontWeight: isNet ? 800 : 500, color: isNet ? '#1f7a58' : C.ink2, textAlign: 'right' as const }}>{m}</td>
                            <td style={{ ...tdR, fontWeight: isNet ? 700 : 500, textAlign: 'right' as const }}>{y}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The 50% basic assumption is standard across most Indian companies. At 40% basic, PF drops to Rs 4,800/month and in-hand rises to Rs 95,000. At 60% basic, PF rises to Rs 7,200/month and in-hand falls to Rs 92,600.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use the{' '}
                  <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link>{' '}
                  to enter your exact CTC split, basic percentage, and actual deductions for a precise monthly take-home figure.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use the Old vs New Tax Regime Calculator</h2>
                <p style={p}>
                  The{' '}
                  <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link>{' '}
                  computes your exact income tax under both regimes based on your actual salary structure and deductions, and shows which regime saves more.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter gross salary:</strong> type Rs 12,00,000 or drag the salary slider to your annual CTC figure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your deductions:</strong> add your 80C investments (PPF, ELSS, LIC), 80D health insurance premium, NPS contribution, and HRA exempt amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compare regimes:</strong> the calculator shows old regime tax, new regime tax, and the exact savings difference for your specific inputs.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Check the breakeven:</strong> the calculator shows the minimum deduction level at which the old regime would match the new regime, so you know exactly when the choice matters.
                  </li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations">When These Tax Numbers May Not Apply to You</h2>
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
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only, based on standard salary structure assumptions for FY 2025-26. Actual tax liability depends on your exact salary components, declared deductions, and any income other than salary. Tax laws are subject to change. This page is for educational and planning purposes and does not constitute financial or tax advice. Consult a qualified CA or SEBI-registered financial adviser before making tax-related decisions.
                </p>
              </div>

            </article>
          </div>

          {/* ── SIDEBAR ── */}
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

      {/* ── FOOTER ── */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/old-vs-new-tax-regime-calculator|Old vs New Regime', '/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/income-tax-calculator|Income Tax', '/calculators/hra-calculator|HRA Exemption', '/calculators/nps-calculator|NPS', '/calculators/ppf-calculator|PPF', '/calculators/sip-calculator|SIP'] },
        { hd: 'Topics',      links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company',     links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },

      ])} />
    </div>
  );
}

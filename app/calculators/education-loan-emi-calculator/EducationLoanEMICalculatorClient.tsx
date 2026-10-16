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

/* ─── Palette ───────────────────────────────────────────────── */
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

/* ─── Math ──────────────────────────────────────────────────── */
function calcEMI(p: number, r: number, n: number) {
  if (n === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}
interface YRow { year: number; opening: number; prin: number; int: number; closing: number }
function buildAmort(p: number, r: number, n: number, emi: number): YRow[] {
  const rows: YRow[] = []; let bal = p;
  const m = r / 12 / 100, y0 = new Date().getFullYear();
  for (let y = 0; y < Math.ceil(n / 12); y++) {
    const open = bal; let yP = 0, yI = 0;
    const mo = Math.min(12, n - y * 12);
    for (let i = 0; i < mo; i++) {
      const iP = bal * m, pP = emi - iP;
      yI += iP; yP += pP; bal = Math.max(0, bal - pP);
    }
    rows.push({ year: y0 + y, opening: open, prin: yP, int: yI, closing: bal });
    if (bal <= 0) break;
  }
  return rows;
}

interface MRow { monthName: string; principal: number; interest: number; total: number }
interface YGroup { year: number; months: MRow[] }
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function buildMonthlyAmort(p: number, r: number, n: number, emi: number): YGroup[] {
  const m = r / 12 / 100;
  const now = new Date();
  const s0 = now.getMonth(), y0 = now.getFullYear();
  let bal = p;
  const groups: YGroup[] = [];
  let curYear = y0;
  let cur: YGroup = { year: curYear, months: [] };
  for (let i = 0; i < n; i++) {
    if (bal <= 0) break;
    const abs = s0 + i;
    const yr = y0 + Math.floor(abs / 12);
    const mo = abs % 12;
    if (yr !== curYear) { groups.push(cur); curYear = yr; cur = { year: yr, months: [] }; }
    const interest = bal * m;
    const principal = Math.min(emi - interest, bal);
    bal = Math.max(0, bal - principal);
    cur.months.push({ monthName: MONTH_NAMES[mo], principal, interest, total: principal + interest });
  }
  if (cur.months.length) groups.push(cur);
  return groups;
}

/* ─── Donut Chart ───────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (principal / total) * circ;
  const pPct  = Math.round((principal / total) * 100);
  return (
    <svg role="img" aria-label={`EMI split: ${pPct}% principal, ${100 - pPct}% interest`} width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ────────────────────────────────────────────────── */
function Slider({ label, id, value, min, max, step, display, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  const pct = ((value - min) / (max - min)) * 100;
  
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        {label
          ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
          : <span />
        }
        {editing ? (
          <input id={inputId} aria-label={`Enter ${label} value`} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button aria-label={`${label}: ${display}. Click to edit.`}
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#AAAAAA'}
            onMouseOut={e => e.currentTarget.style.borderColor = C.border}>
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
    </div>
  );
}

/* ─── Sidebar list ──────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Related Calculators" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan EMI' },
  { href: '/calculators/car-loan-calculator', label: 'Car Loan EMI' },
  { href: '/calculators/loan-calculator', label: 'Loan Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/education-corpus-calculator', label: 'Education Corpus' },
  { href: '/calculators/child-education-planner-calculator', label: 'Child Education Planner' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest' },
  { href: '/calculators/inflation-calculator', label: 'Inflation Calculator' },
  { href: '/calculators/rd-calculator', label: 'RD Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  { q: 'When does the EMI repayment start for an education loan?', a: 'In India, education loan repayment generally starts after a "moratorium period." This period typically covers the duration of your course plus an additional 6 to 12 months, giving you time to find a job before EMIs begin.' },
  { q: 'Is interest charged during the moratorium period?', a: 'Yes. Banks charge simple interest on the disbursed loan amount during the moratorium period. If you do not pay this interest during your studies, it is added to the principal amount when the repayment period begins, increasing your eventual EMI.' },
  { q: 'Can I pay interest during my studies to lower my future EMI?', a: 'Yes. Most banks encourage borrowers to pay the simple interest during the moratorium period. Doing so prevents the interest from being capitalized (added to the principal), significantly reducing your EMI and total interest burden once the repayment phase starts.' },
  { q: 'What is the Section 80E tax deduction?', a: 'Under Section 80E of the Income Tax Act, the entire interest portion of your education loan EMI is tax-deductible. There is no upper limit on the deduction amount. This benefit is available for up to 8 consecutive years starting from the year you begin repaying the loan.' },
  { q: 'Can parents claim the Section 80E tax benefit?', a: 'Yes. Section 80E benefits can be claimed by the individual who is repaying the loan out of their taxable income. If a parent is repaying the education loan for their child, the parent can claim the tax deduction.' },
  { q: 'What is the maximum tenure for an education loan?', a: 'Most Indian banks, including SBI, offer repayment tenures of up to 15 years after the moratorium period ends. A longer tenure reduces your monthly EMI but increases the total interest paid over the life of the loan.' },
  { q: 'Is collateral required for an education loan?', a: 'As per RBI and IBA guidelines, education loans up to Rs. 4 Lakh do not require any collateral or third-party guarantee. Loans between Rs. 4 Lakh and Rs. 7.5 Lakh require a third-party guarantee, and loans above Rs. 7.5 Lakh require tangible collateral security.' },
  { q: 'Are education loan interest rates floating or fixed?', a: 'Most education loans in India are offered at floating interest rates linked to the bank\'s External Benchmark Lending Rate (EBLR) or Repo-Linked Lending Rate (RLLR). This means your EMI or loan tenure may change if the RBI changes its repo rate.' },
  { q: 'What is the CSIS scheme for education loans?', a: 'The Central Scheme to Provide Interest Subsidy (CSIS) is a government scheme that provides full interest subsidy during the moratorium period for students belonging to Economically Weaker Sections (EWS) with an annual parental income of up to Rs. 4.5 Lakh.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are the distribution layer - free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.' },
];
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ════════════════════════════════════════════════════════════ */
export default function EducationLoanEMICalculatorClient() {
  const title = 'Education Loan EMI Calculator';
  
  const defaultSettings = { amount: 1000000, rate: 9.5, tenureYr: 7, tenureMode: 'yr', tenureMo: 84 };
  const { settings, updateSettings } = useCalculatorSettings('education-loan-emi-calculator', defaultSettings);
  const { amount, rate, tenureYr, tenureMode, tenureMo } = settings;
  const setAmount = (v: any) => updateSettings({ amount: typeof v === 'function' ? v(settings.amount) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setTenureYr = (v: any) => updateSettings({ tenureYr: typeof v === 'function' ? v(settings.tenureYr) : v });
  const setTenureMode = (v: any) => updateSettings({ tenureMode: typeof v === 'function' ? v(settings.tenureMode) : v });
  const setTenureMo = (v: any) => updateSettings({ tenureMo: typeof v === 'function' ? v(settings.tenureMo) : v });
          const [mobile,     setMobile]     = useState(false);
  const [showAmort,  setShowAmort]  = useState(false);
  const [openYears,  setOpenYears]  = useState<Set<number>>(new Set());

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-education-loan-emi-calculator-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.amount) setAmount(d.amount);
      if (d.rate) setRate(d.rate);
      if (d.tenureYr) setTenureYr(d.tenureYr);
      if (d.tenureMode) setTenureMode(d.tenureMode);
      if (d.tenureMo) setTenureMo(d.tenureMo);
    } catch { /* ignore */ }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem('fermor-education-loan-emi-calculator-v1', JSON.stringify({ amount, rate, tenureYr, tenureMode, tenureMo }));
    } catch { /* ignore */ }
  }, [amount, rate, tenureYr, tenureMode, tenureMo]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months   = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const emi      = useMemo(() => calcEMI(amount, rate, months), [amount, rate, months]);
  const totalPay = emi * months;
  const totalInt = totalPay - amount;
  const prinPct  = Math.round((amount / totalPay) * 100);
  const intPct   = 100 - prinPct;
  const amortRows    = useMemo(() => buildAmort(amount, rate, months, emi), [amount, rate, months, emi]);
  const monthlyGroups = useMemo(() => buildMonthlyAmort(amount, rate, months, emi), [amount, rate, months, emi]);

  const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 40px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const tdL = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' as const };
  const tdR = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' as const };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            {title}
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Plan your study loan repayment. Calculate your monthly EMI, total interest, and see your full amortization schedule after the moratorium period.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          
          <div style={{ minWidth: 0 }}>
            
            {/* Calculator Card */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>EMI Details</p> : <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Education Loan Amount" value={amount} min={100000} max={20000000} step={50000}
                    display={fmtC(amount)} onChange={setAmount} compact={mobile} />
                  <Slider label="Interest Rate (p.a.)" value={rate} min={5} max={18} step={0.1}
                    display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                      <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Repayment Tenure</label>
                      <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3 }}>
                        {(['yr', 'mo'] as const).map(m => (
                          <button key={m} onClick={() => setTenureMode(m)} style={{ padding: mobile ? '4px 10px' : '5px 14px', borderRadius: 6, border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: tenureMode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                            {m === 'yr' ? 'Years' : 'Months'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {tenureMode === 'yr'
                      ? <Slider label="" value={tenureYr} min={1} max={15} step={1} display={`${tenureYr} Yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                      : <Slider label="" value={tenureMo} min={12} max={180} step={1} display={`${tenureMo} Mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.max(1, Math.round(v / 12))); }} compact={mobile} />}
                  </div>
                </div>

                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  
                  {/* Results panel desktop order: donut -> legend -> dark box -> stat rows */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, order: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#101214' }}>Monthly EMI</span>
                    <span aria-live="polite" aria-label={`Monthly EMI: ${fmtIN(emi)}`} style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(emi)}</span>
                  </div>

                  <div style={{ order: 0, width: '100%' }}>
                    {[
                      { label: 'Principal amount',     value: fmtC(amount) },
                      { label: 'Total interest',       value: fmtC(totalInt) },
                      { label: 'Total amount payable', value: fmtC(totalPay) },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                        <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                        <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={amount} interest={totalInt} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Principal amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest amount</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20, order: mobile ? 3 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {prinPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {intPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Amortization Schedule */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="amortization-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Your Amortization Details</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly / Monthly)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {amortRows.length} yr · {months} mo
                    </span>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div id="amortization-panel" role="region" style={{ borderTop: `1px solid ${C.border}` }}>
                    {mobile ? (
                      <div>
                        {monthlyGroups.map(g => {
                          const isOpen = openYears.has(g.year);
                          return (
                            <div key={g.year} style={{ borderBottom: `1px solid ${C.border}` }}>
                              <button aria-expanded={isOpen} aria-controls={`month-table-${g.year}`}
                                onClick={() => setOpenYears(prev => {
                                  const next = new Set(prev);
                                  isOpen ? next.delete(g.year) : next.add(g.year);
                                  return next;
                                })}
                                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER }}
                              >
                                <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{g.year}</span>
                                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                                  <polyline points="6 9 12 15 18 9" />
                                </svg>
                              </button>
                              {isOpen && (
                                <div id={`month-table-${g.year}`} role="region" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                  <table style={{ minWidth: 380, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px', textAlign: 'center' }}>Monthly EMI breakdown for {g.year}</caption>
                                    <thead>
                                      <tr style={{ background: '#f4f5f6' }}>
                                        {['Month', 'Principal Paid', 'Interest Charged', 'Total Payment'].map(h => (
                                          <th scope="col" key={h} style={thS}>{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {g.months.map((row, i) => (
                                        <tr key={i} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                          <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{row.monthName}</td>
                                          <td style={{ padding: '11px 14px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.total)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px', textAlign: 'center' }}>Year-by-year EMI repayment schedule</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                                <th scope="col" key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {amortRows.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                                <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.prin)}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.int)}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.closing)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            

            {/* Article Content */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              
              <div style={sec} id="what-is-education-loan-emi">
                <h2 style={h2}>What is an Education Loan EMI?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    An Education Loan EMI (Equated Monthly Instalment) is the fixed monthly payment made to a lender to repay a study loan, consisting of both principal and interest components.
                  </p>
                </div>
                <p style={p}>
                  Unlike other retail loans (such as home or auto loans) where EMIs begin the month following the loan disbursement, education loans are unique. Because the borrower is a student who usually lacks an income source during their studies, the loan repayment is deferred.
                </p>
                <p style={p}>
                  Calculating your future EMI before you take the loan is critical because it gives you a realistic target for the salary you will need to earn upon graduation to service the debt comfortably without defaulting.
                </p>
              </div>

              <div style={sec} id="how-moratorium-period-works">
                <h2 style={h2}>How the Moratorium Period Works</h2>
                <p style={p}>
                  The moratorium period (also known as a repayment holiday) is the time during which you are not required to pay EMIs. In India, RBI guidelines mandate that banks offer a moratorium period that covers the entire duration of your course plus an additional 6 to 12 months.
                </p>
                <p style={p}>
                  During this period, the bank charges simple interest on the loan amount disbursed. If you choose not to pay this interest during your studies, the accumulated interest is added to the principal amount (capitalized) at the end of the moratorium period. Your EMI is then calculated based on this new, higher principal amount.
                </p>
              </div>

              <div style={sec} id="tax-benefits-section-80e">
                <h2 style={h2}>Tax Benefits Under Section 80E</h2>
                <p style={p}>
                  The Government of India provides a significant tax incentive for higher education through Section 80E of the Income Tax Act. The entire interest portion of your education loan EMI is allowed as a deduction from your taxable income.
                </p>
                <p style={p}>
                  Unlike Section 80C, which has a cap of Rs. 1.5 Lakh, there is no maximum limit on the deduction under Section 80E. This benefit is available for a maximum of 8 consecutive years starting from the year in which you start repaying the loan. It can be claimed by the individual who is repaying the loan (the student or their parent).
                </p>
              </div>

              <div style={sec} id="education-loan-emi-formula">
                <h2 style={h2}>The Formula Used for Education Loan EMI</h2>
                <p style={p}>
                  Once the repayment period begins, banks use the standard reducing balance formula to calculate the equated monthly instalment:
                </p>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                  EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px', textAlign: 'center' }}>Variables in the EMI calculation formula</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={{ ...thS, width: 80 }}>Variable</th>
                        <th scope="col" style={thS}>Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>P</td>
                        <td style={tdR}>Principal amount (Original loan amount + any unpaid interest from the moratorium)</td>
                      </tr>
                      <tr>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>R</td>
                        <td style={tdR}>Monthly interest rate (Annual interest rate divided by 12, divided by 100)</td>
                      </tr>
                      <tr>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>N</td>
                        <td style={tdR}>Repayment tenure in months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  If your final principal amount at the end of the moratorium is Rs. 10 Lakh, the interest rate is 9.5% per annum, and the repayment tenure is 7 years (84 months), the EMI will be Rs. 16,344. You will pay a total of Rs. 3,72,896 in interest over the 7 years.
                </p>
              </div>

              <div style={sec} id="sbi-and-other-banks">
                <h2 style={h2}>SBI Education Loan and Other Banks</h2>
                <p style={p}>
                  The State Bank of India (SBI) is the largest provider of education loans in India. Their interest rates are typically linked to the External Benchmark Lending Rate (EBLR). SBI offers a concession of 0.50% for female students and an additional concession for students purchasing the SBI Rinn Raksha life insurance policy.
                </p>
                <p style={p}>
                  When using this calculator to estimate an SBI Education Loan EMI, set the interest rate slider to the current effective rate quoted by the bank. Note that because these loans are floating-rate loans, the EMI or the loan tenure may change during the repayment period if the RBI changes the repo rate.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the Loan Amount:</strong> Input the total amount you are borrowing (or the estimated final principal amount after the moratorium period if interest is capitalized).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the Interest Rate:</strong> Enter the annual interest rate quoted by your bank.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select the Repayment Tenure:</strong> Choose the number of years over which you plan to repay the loan once the EMIs start (typically 5 to 15 years).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>View the Repayment Schedule:</strong> The calculator instantly displays the monthly EMI, total interest, and a detailed month-by-month amortization schedule.
                  </li>
                </ol>
              </div>

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. The EMI calculated assumes a fixed interest rate throughout the tenure and does not account for interest capitalized during the moratorium period unless explicitly added to the principal amount. Education loans in India are typically floating-rate loans, meaning the actual EMI may change with changes in the RBI repo rate. This calculator is for educational and planning purposes only and does not constitute financial advice.
                </p>
              </div>

            </article>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ minHeight: 250, background: C.white, border: `1.5px dashed ${C.border}`, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
              <span style={{ fontSize: 11, color: C.ink3 }}>300 × 250</span>
            </div>
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

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
  { href: '/calculators/rule-of-72-calculator', label: 'Rule of 72' },
  { href: '/calculators/swp-calculator', label: 'SWP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest' },
  { href: '/calculators/inflation-calculator', label: 'Inflation Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  { q: 'Is it good to convert credit card bills into EMI?', a: 'Converting a credit card bill into an EMI is beneficial if you cannot pay the full outstanding amount by the due date. Standard credit card interest rates (finance charges) in India run between 36% and 42% per annum. EMI conversions usually carry a lower rate of 14% to 18% per annum, saving you from a debt trap, provided you pay the EMIs on time.' },
  { q: 'Do banks charge a processing fee for credit card EMI?', a: 'Yes. Most banks in India charge a one-time processing fee for converting a purchase or outstanding balance into an EMI. This fee typically ranges from 1% to 2% of the transaction amount, or a flat fee (such as Rs. 99 to Rs. 299) plus applicable GST.' },
  { q: 'Is GST applicable on credit card EMIs?', a: 'Yes. In India, an 18% GST is levied on the interest component of your credit card EMI every month. GST is also charged on the upfront processing fee. The principal portion of the EMI does not attract GST.' },
  { q: 'How does No-Cost EMI work on credit cards?', a: 'In a No-Cost EMI, the interest charged by the bank is provided to you as an upfront discount by the merchant. The bank still charges interest, but because the purchase price was reduced by the exact interest amount, the total you repay equals the original product price. However, you still have to pay the 18% GST on the interest component.' },
  { q: 'Does converting to EMI restore my credit limit?', a: 'When you convert a purchase to an EMI, your available credit limit is reduced by the total outstanding principal. As you pay your monthly EMIs, the principal component of each payment is added back, gradually restoring your credit limit.' },
  { q: 'Can I foreclose or prepay a credit card EMI?', a: 'Yes, you can prepay or foreclose a credit card EMI before the tenure ends. However, most banks charge a foreclosure fee, which is usually around 2% to 3% of the outstanding principal, plus GST. You should calculate whether the interest saved outweighs the foreclosure penalty.' },
  { q: 'What happens if I miss a credit card EMI payment?', a: 'Missing an EMI payment attracts late payment fees, standard finance charges (up to 42% per annum) on the unpaid EMI amount, and GST. It will also be reported to credit bureaus like CIBIL, negatively impacting your credit score.' },
  { q: 'How is the interest calculated on credit card EMIs?', a: 'Banks use the reducing balance method to calculate interest on credit card EMIs. Interest is charged only on the outstanding principal balance each month, not on the original transaction amount. This is why the interest portion of your EMI decreases over time.' },
  { q: 'Is the EMI calculator exact?', a: 'The calculator provides a mathematically exact EMI based on the reducing balance method. However, your actual credit card statement might show slight variations due to the inclusion of GST on the interest portion, exact billing cycle dates, and processing fees.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are the distribution layer - free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.' },
];
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ════════════════════════════════════════════════════════════ */
export default function CreditCardEMICalculatorClient() {
  const title = 'Credit Card EMI Calculator';
  
  const defaultSettings = { amount: 50000, rate: 15.0, tenureYr: 1, tenureMode: 'mo', tenureMo: 12 };
  const { settings, updateSettings } = useCalculatorSettings('credit-card-emi-calculator', defaultSettings);
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
      const s = localStorage.getItem('fermor-credit-card-emi-calculator-v1');
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
      localStorage.setItem('fermor-credit-card-emi-calculator-v1', JSON.stringify({ amount, rate, tenureYr, tenureMode, tenureMo }));
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
  const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 40px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const tdL = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' as const };
  const tdR = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' as const };
  const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            {title}
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your monthly credit card EMI, total interest, and repayment schedule before converting your balance.
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

                  <Slider label="Outstanding Balance / Purchase Amount" value={amount} min={1000} max={1500000} step={1000}
                    display={fmtC(amount)} onChange={setAmount} compact={mobile} />
                  <Slider label="Interest Rate (p.a.)" value={rate} min={1} max={48} step={0.5}
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
                      ? <Slider label="" value={tenureYr} min={1} max={5} step={1} display={`${tenureYr} Yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                      : <Slider label="" value={tenureMo} min={3} max={60} step={1} display={`${tenureMo} Mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.max(1, Math.round(v / 12))); }} compact={mobile} />}
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
              
              <div style={sec} id="what-is-credit-card-emi">
                <h2 style={h2}>What is Credit Card EMI?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Credit Card EMI (Equated Monthly Instalment) is a facility that allows cardholders to repay large purchases or outstanding credit card bills in fixed monthly payments over a specific tenure.
                  </p>
                </div>
                <p style={p}>
                  When you use a credit card and cannot pay the total amount due by the due date, the bank charges a high finance charge (typically between 36% and 42% per annum) on the unpaid balance. Converting this balance or a specific high-value purchase into an EMI structure replaces those high finance charges with a fixed, lower interest rate, generally ranging from 14% to 18% per annum.
                </p>
                <p style={p}>
                  In India, the Reserve Bank of India (RBI) regulates credit card lending. Banks offer EMI conversions either at the point of sale (Merchant EMI) or post-purchase through internet banking (Post-purchase EMI). This facility helps individuals avoid the debt trap caused by compounding finance charges while maintaining their credit scores.
                </p>
              </div>

              <div style={sec} id="how-credit-card-emi-works">
                <h2 style={h2}>How Credit Card EMI Works in India</h2>
                <p style={p}>
                  Once you opt to convert a transaction into an EMI, the bank blocks an amount equal to the principal from your available credit limit. As you pay your monthly EMIs, the principal component of each payment is restored to your available credit limit.
                </p>
                <p style={p}>
                  Every EMI includes a principal repayment and an interest component. Banks use the reducing balance method to calculate interest, meaning you only pay interest on the outstanding principal balance, not on the original transaction amount. Consequently, the interest component is high in the initial months and decreases progressively, while the principal component increases.
                </p>
              </div>

              <div style={sec} id="credit-card-emi-formula">
                <h2 style={h2}>The Formula Used for Credit Card EMI</h2>
                <p style={p}>
                  The standard mathematical formula used by Indian banks to calculate the equated monthly instalment is:
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
                        <td style={tdR}>Principal amount (the purchase or outstanding bill converted)</td>
                      </tr>
                      <tr>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>R</td>
                        <td style={tdR}>Monthly interest rate (Annual interest rate divided by 12, divided by 100)</td>
                      </tr>
                      <tr>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>N</td>
                        <td style={tdR}>Loan tenure in months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For example, if you convert a purchase of Rs. 50,000 to an EMI at 15% per annum for 12 months, the monthly rate R is 0.0125. The calculator yields an EMI of Rs. 4,513. The total amount payable over the year will be Rs. 54,154, out of which Rs. 4,154 is the interest.
                </p>
              </div>

              <div style={sec} id="hidden-charges-processing-gst">
                <h2 style={h2}>Hidden Charges: Processing Fees and GST</h2>
                <p style={p}>
                  The mathematical EMI is not the only cost you incur. In India, there are two additional charges that cardholders must account for:
                </p>
                <h3 style={h3}>Processing Fees</h3>
                <p style={p}>
                  Most credit card issuers charge a one-time processing fee to convert a balance into an EMI. This is typically a flat fee (such as Rs. 99 to Rs. 299) or a percentage of the transaction amount (usually 1% to 2%). This fee is billed in the first month's statement along with the first EMI.
                </p>
                <h3 style={h3}>GST on Interest</h3>
                <p style={p}>
                  Under Indian tax laws, financial services such as credit card interest and processing fees attract an 18% Goods and Services Tax (GST). Therefore, if the interest component of your EMI in the first month is Rs. 500, the bank will add an 18% GST (Rs. 90) to your statement. The principal repayment portion of the EMI does not attract any GST.
                </p>
              </div>

              <div style={sec} id="no-cost-emi-truth">
                <h2 style={h2}>The Truth About No-Cost EMI</h2>
                <p style={p}>
                  Retailers frequently advertise "No-Cost EMI" or "Zero Cost EMI" on consumer electronics and appliances. The RBI prohibits banks from offering 0% interest loans. Instead, a No-Cost EMI is structured by offering an upfront discount on the product equal to the total interest that will be charged over the tenure.
                </p>
                <p style={p}>
                  While the sum of your EMIs will equal the original price of the product, you are still paying interest to the bank. Because interest is being charged, you are liable to pay the 18% GST on the interest component every month. This means a No-Cost EMI is never truly zero-cost; the GST overhead is borne by the consumer.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the Transaction Amount:</strong> Set the slider to the purchase amount or outstanding balance you wish to convert.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the Interest Rate:</strong> Enter the specific rate per annum offered by your bank for the EMI conversion.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select the Tenure:</strong> Choose the number of months you wish to stretch the repayment across.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>View the Results:</strong> The calculator instantly displays the monthly EMI, total interest, and a detailed month-by-month amortization schedule.
                  </li>
                </ol>
              </div>

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Credit card EMI calculations do not account for one-time processing fees and the 18% GST levied on the interest component every month by your issuing bank. Your actual statement billing will include these additional statutory and bank charges. This calculator is for educational and planning purposes only and does not constitute financial advice.
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

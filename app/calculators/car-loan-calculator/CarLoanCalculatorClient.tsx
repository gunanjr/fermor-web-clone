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
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',
  paleLime:  '#f4f5f6',
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

function calcEMI(p: number, annualRate: number, months: number): number {
  if (months === 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

interface YearRow {
  year: number;
  openingBal: number;
  principal: number;
  interest: number;
  closingBal: number;
}

function buildAmortization(p: number, annualRate: number, months: number, emi: number): YearRow[] {
  const rows: YearRow[] = [];
  let balance = p;
  const r = annualRate / 12 / 100;
  const startYear = new Date().getFullYear();
  for (let y = 0; y < Math.ceil(months / 12); y++) {
    const opening = balance;
    let yPrin = 0, yInt = 0;
    const mo = Math.min(12, months - y * 12);
    for (let m = 0; m < mo; m++) {
      const intPart = balance * r;
      const prinPart = emi - intPart;
      yInt += intPart;
      yPrin += prinPart;
      balance = Math.max(0, balance - prinPart);
    }
    rows.push({ year: startYear + y, openingBal: opening, principal: yPrin, interest: yInt, closingBal: balance });
    if (balance <= 0) break;
  }
  return rows;
}

function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (principal / total) * circ;
  const pPct  = Math.round((principal / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

function Slider({ label, value, min, max, step, fmt, onChange, compact }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
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
        <Link key={label} href={href} style={{ textDecoration: 'none', display: 'block' }}>
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

const POPULAR = [
  { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/swp-calculator',     label: 'SWP Calculator' },
  { href: '/calculators/fd-calculator',      label: 'FD Calculator' },
  { href: '/calculators/gratuity-calculator',label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/home-loan-calculator', label: 'Home Loan EMI Calculator' },
  { href: '/calculators/emi-calculator',       label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/mortgage-calculator',  label: 'Mortgage Calculator' },
];

const FAQS = [
  {
    q: 'How is car loan EMI calculated?',
    a: 'Car loan EMI is calculated using the reducing-balance method: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]. P is the loan amount (car price minus down payment), R is the monthly interest rate (annual rate ÷ 12 ÷ 100), and N is the number of monthly instalments. Your EMI stays fixed, but the loan balance reduces each month.',
  },
  {
    q: 'What is the minimum down payment for a car loan in India?',
    a: 'Most lenders require a minimum down payment of 20% of the car\'s on-road price. Some banks offer loans up to 100% of the ex-showroom price for select models or customers with excellent credit. However, putting at least 30–40% down can significantly reduce your total interest burden.',
  },
  {
    q: 'What is a good credit score for a car loan?',
    a: 'A CIBIL score of 750 or above is generally considered good for a car loan. Scores above 800 get the most favourable interest rates and quicker approval. If your score is below 700, you may still qualify but at a higher rate or with a larger down payment requirement.',
  },
  {
    q: 'Should I choose a shorter or longer car loan tenure?',
    a: 'A shorter tenure (3–4 years) means higher EMIs but you pay far less total interest. A longer tenure (6–8 years) reduces your monthly payment but costs more in interest over the life of the loan. Use the amortization schedule above to compare the total cost at different tenures.',
  },
  {
    q: 'Can I prepay my car loan without penalty?',
    a: 'RBI guidelines allow foreclosure of floating-rate car loans without prepayment penalty for individual borrowers. For fixed-rate loans, some lenders may charge 2–4% prepayment fees. Always confirm the prepayment terms before signing the loan agreement.',
  },
  {
    q: 'What is the maximum tenure for a car loan in India?',
    a: 'New car loans in India typically have a maximum tenure of 7 to 8 years. Used car loans are usually capped at 5 years. A longer tenure reduces your monthly EMI but increases the total interest paid, so choose the shortest tenure that fits your budget.',
  },
  {
    q: 'How does my down payment affect the total cost of the car?',
    a: 'A larger down payment reduces the loan principal, which lowers your EMI and the total interest payable over the loan term. For example, increasing your down payment from 20% to 40% on a ₹10 lakh car could save you over ₹1.2 lakh in interest over a 7-year loan at 9% p.a.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function CarLoanCalculatorClient() {
  const defaultSettings = { carPrice: 1000000, downPaymentPct: 20, rate: 9.0, tenureYr: 5 };
  const { settings, updateSettings } = useCalculatorSettings('car-loan-calculator', defaultSettings);
  const { carPrice, downPaymentPct, rate, tenureYr } = settings;
  const setCarPrice = (v: any) => updateSettings({ carPrice: typeof v === 'function' ? v(settings.carPrice) : v });
  const setDownPaymentPct = (v: any) => updateSettings({ downPaymentPct: typeof v === 'function' ? v(settings.downPaymentPct) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setTenureYr = (v: any) => updateSettings({ tenureYr: typeof v === 'function' ? v(settings.tenureYr) : v });
        const [mobile,         setMobile]         = useState(false);
  const [showAmort,      setShowAmort]      = useState(false);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();

  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const downPayment = carPrice * downPaymentPct / 100;
  const amount = carPrice - downPayment;
  const months = tenureYr * 12;
  const emi = useMemo(() => calcEMI(amount, rate, months), [amount, rate, months]);
  const totalPayable = emi * months;
  const totalInterest = totalPayable - amount;
  const principalPct = totalPayable > 0 ? Math.round((amount / totalPayable) * 100) : 0;
  const interestPct = 100 - principalPct;

  const amortRows = useMemo(() => buildAmortization(amount, rate, months, emi), [amount, rate, months, emi]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>Car Loan EMI Calculator</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Car & Loan Details</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Car Price" value={carPrice} min={100000} max={50000000} step={50000}
                    fmt={v => fmtC(v)} onChange={setCarPrice} compact={mobile} />

                  <Slider label="Down Payment" value={downPaymentPct} min={0} max={50} step={1}
                    fmt={v => `${v}% (${fmtC(downPayment)})`} onChange={setDownPaymentPct} compact={mobile} />

                  <div style={{ marginBottom: 28, padding: '14px 18px', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.dark, fontWeight: 700 }}>
                      <span>Loan Amount (P)</span>
                      <span>{fmtC(amount)}</span>
                    </div>
                  </div>

                  <Slider label="Rate of Interest (p.a.)" value={rate} min={1} max={20} step={0.05}
                    fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                  <Slider label="Loan Tenure" value={tenureYr} min={1} max={8} step={1}
                    fmt={v => `${v} Yr`} onChange={setTenureYr} compact={mobile} />

                </div>

                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Monthly EMI</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(emi)}</span>
                  </div>

                  {[
                    { label: 'Loan amount',          value: fmtC(amount) },
                    { label: 'Total interest',        value: fmtC(totalInterest) },
                    { label: 'Down payment',          value: fmtC(downPayment) },
                    { label: 'Total amount payable',  value: fmtC(totalPayable) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={amount} interest={totalInterest} />
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

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {principalPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Your Amortization Details</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly breakdown)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {amortRows.length} yr · {months} mo
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Opening Balance', 'Principal Paid', 'Interest Paid', 'Closing Balance'].map(h => (
                            <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {amortRows.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                            <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.principal)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.interest)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.closingBal)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                return (
                  <>
                    <div style={sec}>
                      <h2 style={h2}>What is a Car Loan?</h2>
                      <p style={p}>
                        A car loan is a secured loan where the vehicle you purchase serves as collateral. You borrow a lump sum from a bank or non-banking financial company (NBFC) to buy a new or used car, and repay it through EMIs over a fixed tenure, typically up to 8 years.
                      </p>
                      <p style={p}>
                        In India, the car loan market includes public sector banks (SBI, PNB), private lenders (HDFC, ICICI, Kotak), and NBFCs (Tata Capital, Mahindra Finance). Interest rates vary based on the borrower's credit profile, the car model, and the loan tenure. The EMI is calculated using the reducing-balance method, which means your outstanding principal decreases with each payment, and interest is charged only on the remaining amount.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>How this car loan calculator helps you</h2>
                      <p style={p}>
                        Planning to buy a car involves more than just the showroom price. This car loan calculator helps you in the following ways:
                      </p>
                      <div>
                        {[
                          'It calculates your monthly EMI instantly based on the car price, down payment, interest rate, and loan tenure. No manual math required.',
                          'Adjust the down payment slider to see how putting more money upfront reduces your loan amount, monthly EMI, and total interest over the loan term.',
                          'Compare different loan tenures side by side to find the sweet spot between an affordable monthly payment and the lowest total interest cost.',
                          'The year-wise amortization table shows how your loan balance reduces over time and how much of each year\'s payments go toward principal vs interest.',
                        ].map((t, i) => (
                          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Car Loan EMI formula</h2>
                      <p style={p}>Banks and NBFCs in India use the standard reducing-balance formula to calculate car loan EMIs. The same formula applies regardless of which lender you choose:</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                      </p>
                      <p style={p}>Where P is the Principal loan amount (car price minus down payment), R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the number of monthly instalments (tenure in months).</p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Factors affecting your car loan EMI</h2>
                      <p style={p}>Several factors influence the EMI you pay on a car loan:</p>
                      <h3 style={h3}>Car price</h3>
                      <p style={p}>A more expensive car means a larger loan amount, which directly increases your EMI. Consider trimming features or opting for a lower variant if the EMI strains your monthly budget.</p>
                      <h3 style={h3}>Down payment</h3>
                      <p style={p}>The more you put down upfront, the less you borrow. Saving for a 30–40% down payment instead of the minimum 20% can significantly reduce your monthly outgo and total interest cost.</p>
                      <h3 style={h3}>Interest rate</h3>
                      <p style={p}>Car loan interest rates typically range from 8% to 14% per annum. Even a 0.5% difference in rate can add thousands to your total interest over a 5-year loan. Compare offers from multiple lenders to get the best rate based on your credit score.</p>
                      <h3 style={h3}>Loan tenure</h3>
                      <p style={p}>Extending the tenure from 4 to 8 years lowers your monthly EMI but nearly doubles the total interest paid. Use the calculator to find the shortest tenure that keeps your EMI within a comfortable range.</p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Frequently asked questions</h2>
            <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          <style>{`.car-loan-sidebar::-webkit-scrollbar{width:5px}.car-loan-sidebar::-webkit-scrollbar-track{background:transparent}.car-loan-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.car-loan-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="car-loan-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ minHeight: 250, background: C.white, border: `1.5px dashed ${C.border}`, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                  <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
                  <span style={{ fontSize: 11, color: C.ink3 }}>300 × 250</span>
                </div>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More EMI Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter legalNote="Results are indicative. Not financial advice." columns={pipeColumns([
               { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
              { hd: 'Topics',      links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
              { hd: 'Company',     links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
            ])} />
    </div>
  );
}


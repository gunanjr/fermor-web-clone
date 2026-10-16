'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

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
    <div style={{ marginBottom: compact ? 18 : 20 }}>
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

function DonutChart({ presentValue, discountAmount }: { presentValue: number; discountAmount: number }) {
  const total = presentValue + discountAmount;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (presentValue / total) * circ;
  const pPct = Math.round((presentValue / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" role="img" aria-label={`Present value ${pPct}% of future amount, discount ${100 - pPct}%`} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Present Value</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

type PVRow = { year: number; presentValue: number; discount: number };

function buildPVSchedule(futureValue: number, rate: number, years: number): PVRow[] {
  if (years <= 0 || futureValue <= 0) return [];
  const startYear = new Date().getFullYear();
  return Array.from({ length: years }, (_, i) => {
    const t = i + 1;
    const pv = rate === 0 ? futureValue : futureValue / Math.pow(1 + rate / 100, t);
    return { year: startYear + t, presentValue: pv, discount: futureValue - pv };
  });
}

function BarChart({ rows }: { rows: PVRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxVal = Math.max(...rows.map(r => r.presentValue + r.discount));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Present value versus discount by year" viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.presentValue + row.discount;
        const totalH = maxVal > 0 ? (total / maxVal) * H : 0;
        const pvH = total > 0 ? (row.presentValue / total) * totalH : 0;
        const discH = totalH - pvH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={discH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - pvH} width={barW} height={pvH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>{row.year}</text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

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
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
  { href: '/calculators/future-value-calculator', label: 'Future Value Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
  { href: '/calculators/npv-calculator', label: 'NPV Calculator' },
  { href: '/calculators/annuity-income-calculator', label: 'Annuity Income Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
  { href: '/calculators/real-return-calculator', label: 'Real Return Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/percentage-calculator', label: 'Percentage Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { href: '/calculators/inflation-calculator', label: 'Inflation Calculator' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
];

const FAQS = [
  { q: 'What is present value?', a: 'Present value (PV) is the current worth of a future amount of money, discounted at a specific rate. It tells you how much you need to invest today to reach a future goal.' },
  { q: 'What is the present value formula?', a: 'PV = FV / (1 + r)^n, where FV is the future amount, r is the annual discount rate, and n is the number of years. A higher discount rate or longer period reduces the present value.' },
  { q: 'How is present value different from future value?', a: 'Future value compounds today\'s money forward. Present value discounts future money backward. They are mathematically inverse concepts using the same formula rearranged.' },
  { q: 'What discount rate should I use?', a: 'Use your expected investment return. For equity, roughly 10 to 12 percent is common. For inflation-adjusted calculations, 5 to 6 percent reflects long-run Indian inflation. The rate you choose changes the present value significantly. Higher rates give lower present values.' },
  { q: 'Why does a higher discount rate lower the present value?', a: 'A higher discount rate assumes your money could earn more elsewhere, so less needs to be set aside today to reach the same future amount. At a 12 percent discount rate, Rs. 1 crore in 15 years is worth about Rs. 18.3 lakh today. At 6 percent, the same Rs. 1 crore is worth about Rs. 41.7 lakh today, since a lower assumed return means more capital is needed now.' },
  { q: 'What is net present value (NPV) and how is it different from present value?', a: 'Present value discounts a single future amount to today. Net present value goes a step further: it sums the present value of multiple cash flows, both inflows and outflows, across different time periods, and is commonly used to evaluate whether an investment or project is worthwhile. The NPV Calculator handles multi-cash-flow scenarios that this calculator does not.' },
  { q: 'Can present value be used for retirement or education planning?', a: 'Yes, though usually in reverse. Most people work forward with a goal amount using a calculator like the Goal Planning Calculator or SIP Calculator to find the monthly investment needed. Present value is more useful for checking whether a lump sum offered today (such as a settlement, bonus, or insurance payout) is fairly priced against an equivalent future amount.' },
  { q: 'Does inflation affect present value calculations?', a: 'Inflation is one valid choice of discount rate, but not the only one. Using an inflation rate as the discount rate tells you what a future rupee is worth in today\'s purchasing power. Using an expected investment return instead tells you how much capital you would need to invest today to reach that future amount. These give different answers because inflation and investment returns are usually not the same number.' },
  { q: 'Is present value the same as a bond\'s price?', a: 'A bond\'s fair price is calculated using the same present value principle, applied to each future coupon payment and the final principal repayment, each discounted back to today at the bond\'s yield. This calculator handles a single future amount rather than a stream of coupon payments, so it approximates the concept rather than pricing a bond directly.' },
  { q: 'How does the government use present value to calculate a commuted pension?', a: 'Under the CCS (Commutation of Pension) Rules, 1981, a central government employee can commute up to 40 percent of their monthly pension for an immediate lump sum. That lump sum is the present value of the pension given up, calculated using an official age-based commutation factor table published by the Department of Pension and Pensioners\' Welfare, since a younger retiree is expected to draw the pension for more years.' },
  { q: 'Is present value used in motor accident compensation claims in India?', a: 'Yes. Indian courts convert a victim\'s future lost income into a present lump sum compensation using a "multiplier method," standardised by the Supreme Court in Sarla Verma v. Delhi Transport Corporation (2009). The multiplier, based on the victim\'s age, approximates the present value of the income they would have earned over their remaining working years.' },
  { q: 'Is a commuted pension lump sum taxable?', a: 'Under Section 10(10A) of the Income Tax Act, the commuted portion of a pension is fully tax-exempt for government employees. For non-government employees, it is exempt up to one-third of the commuted value if gratuity is also received, or one-half if it is not, with the balance taxed as regular income.' },
  { q: 'How does IRDAI use present value to set life insurance surrender values?', a: 'Under IRDAI\'s October 2024 Master Circular, a policy\'s Special Surrender Value must be at least the present value of the paid-up sum assured, future benefits, and bonuses. Insurers must discount those future amounts at a rate capped at the 10-year G-Sec yield plus 0.5 percentage points, reviewed annually, so the discount rate cap directly protects how much a policyholder receives on early exit.' },
  { q: 'Does present value apply to my NPS annuity purchase?', a: 'Yes. PFRDA requires a share of an NPS corpus, 40 percent for government employees and 20 percent for other subscribers under current rules, to be used to buy an annuity at retirement rather than withdrawn as a lump sum. The annuity provider prices that commitment using the present value of the future monthly pension payments it will owe you.' },
  { q: 'What is EPFO\'s Table D and how does it relate to present value?', a: 'Table D is the factor table EPFO uses to calculate the lump sum withdrawal benefit for an EPS member who exits before completing 10 years of service. The factor scales with completed years of service and pensionable salary, working like a simplified present-value multiplier rather than paying out the exact contributions made.' },
  { q: 'What is the difference between present value and discounted cash flow (DCF)?', a: 'Present value and discounted cash flow use the identical underlying math: discounting a future amount back to today using a chosen rate. "Present value" typically refers to discounting a single future sum, while "DCF" usually refers to discounting an entire series of future cash flows, such as a business\'s projected profits over several years, and summing them, which is closer to what net present value (NPV) does.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

function fmtIN(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}
function fmtC(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}

export default function PresentValueCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const defaultSettings = { futureValue: 1000000, rate: 10, years: 10 };
  const { settings, updateSettings } = useCalculatorSettings('present-value-calculator', defaultSettings);
  const { futureValue, rate, years } = settings;
  const setFutureValue = (v: any) => updateSettings({ futureValue: typeof v === 'function' ? v(settings.futureValue) : v });
  const setRate = (v: any) => updateSettings({ rate: typeof v === 'function' ? v(settings.rate) : v });
  const setYears = (v: any) => updateSettings({ years: typeof v === 'function' ? v(settings.years) : v });
    
  const presentValue = useMemo(() => {
    if (rate === 0) return futureValue;
    return futureValue / Math.pow(1 + rate / 100, years);
  }, [futureValue, rate, years]);

  const discountAmount = futureValue - presentValue;
  const [showTable, setShowTable] = useState(false);
  const pvSchedule = useMemo(() => buildPVSchedule(futureValue, rate, years), [futureValue, rate, years]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>Present Value Calculator</h1>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ marginBottom: 36 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Discount Details</p>
                  </div>
                  <Slider label="Future Amount" value={futureValue} min={1000} max={100000000} step={1000} fmt={v => fmtC(v)} onChange={setFutureValue} compact={mobile} />
                  <Slider label="Discount Rate (p.a.)" value={rate} min={1} max={30} step={0.25} fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />
                  <Slider label="Time Period" value={years} min={1} max={40} step={1} fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                </div>
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Present Value</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(presentValue)}</span>
                  </div>

                  {[
                    { label: 'Future amount', value: fmtC(futureValue) },
                    { label: 'Discount amount', value: fmtC(discountAmount) },
                    { label: 'Effective discount rate', value: `${rate.toFixed(2)}% p.a.` },
                    { label: 'Time horizon', value: `${years} Yr` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart presentValue={presentValue} discountAmount={discountAmount} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Present value</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Discount</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Present value {futureValue > 0 ? Math.round((presentValue / futureValue) * 100) : 0}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Discount {futureValue > 0 ? 100 - Math.round((presentValue / futureValue) * 100) : 0}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${futureValue > 0 ? Math.round((presentValue / futureValue) * 100) : 0}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {pvSchedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="pv-by-year-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Present Value by Year</span>
                      {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>How the discount grows the further out the future amount is</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {years} Yr &middot; {rate.toFixed(2)}%
                      </span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="pv-by-year-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 48px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Present value</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Discount</span>
                          </div>
                        </div>
                        <BarChart rows={pvSchedule} />
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 440, width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 16 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'If Future Date Were', 'Present Value', 'Discount'].map(h => (
                                <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {pvSchedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{i + 1} Yr away</td>
                                <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.presentValue)}</td>
                                <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.discount)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                const thS = { padding: '10px 16px', fontSize: 12, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
                const tdL = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                const tdR = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                return (
                  <>
                    <div style={sec}>
                      <h2 style={h2} id="what-is-present-value">What is present value?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Present value is the current worth of a future sum of money, discounted at a specific rate of return. It answers a simple question: how much must be set aside today to reach a desired future amount?
                        </p>
                      </div>
                      <p style={p}>
                        This is the mathematical foundation of the time value of money: the principle that a rupee today is worth more than a rupee tomorrow, because today's rupee can be invested and grow.
                      </p>
                      <p style={p}>
                        PV shows up across Indian personal finance: checking whether a lump sum settlement offered today is fairly priced against an equivalent future payout, pricing a bond's future coupon payments, or checking whether a retirement corpus target is realistic once discounted back to today's money.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-formula">The present value formula</h2>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                        <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                          PV = FV / (1 + r) ^ n
                        </code>
                      </div>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                          <thead><tr><th style={{ ...thS, width: 80 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                          <tbody>
                            {[
                              ['PV', 'Present value: what the future amount is worth today'],
                              ['FV', 'Future amount: the sum you will have or need at a future date'],
                              ['r', 'Annual discount rate, entered as a decimal'],
                              ['n', 'Number of years between today and the future date'],
                            ].map(([v, m]) => (
                              <tr key={v}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink, fontFamily: 'monospace' }}>{v}</td>
                                <td style={tdR}>{m}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        The discount amount shown alongside the present value is simply FV minus PV: the portion of the future figure that comes purely from time and the assumed rate, not from the money itself.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-worked-example">Worked example: why the discount rate matters so much</h2>
                      <p style={p}>
                        Take a future amount of Rs. 1 crore, 15 years away. The rate you assume changes the present value dramatically:
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                          <thead><tr><th style={thS} scope="col">Discount Rate</th><th style={thS} scope="col">Present Value of Rs. 1 Cr in 15 Years</th></tr></thead>
                          <tbody>
                            {[
                              ['6% p.a.', 'Rs. 41.7 lakh'],
                              ['8% p.a.', 'Rs. 31.5 lakh'],
                              ['10% p.a.', 'Rs. 23.9 lakh'],
                              ['12% p.a.', 'Rs. 18.3 lakh'],
                            ].map(([rate, val]) => (
                              <tr key={rate} style={{ borderBottom: `1px solid ${C.border}` }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{rate}</td>
                                <td style={tdR}>{val}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Doubling the discount rate from 6 percent to 12 percent more than halves the present value, from Rs. 41.7 lakh to Rs. 18.3 lakh. Whoever is offering you a future sum benefits from you assuming a high discount rate, since it makes that future amount look like a smaller concession today. Always sanity-check the assumed rate against what you could realistically earn on that money elsewhere.
                      </p>
                    </div>

                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Future Value Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Going the other direction? Project what today's money will grow to by a future date.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/future-value-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="choosing-discount-rate">Choosing the right discount rate</h2>
                      <p style={p}>
                        The discount rate should match what the money would realistically earn if invested instead. For equity-oriented goals, 10 to 12 percent is a common assumption. For inflation-adjusted calculations, meaning what a future rupee is worth in today's purchasing power, 5 to 6 percent reflects the long-run Indian average.
                      </p>
                      <p style={p}>
                        For a risk-free benchmark, the <a href="https://www.nsiindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>current PPF rate</a> of 7.1 percent per annum, unchanged since April 2020, is a reasonable reference point, since it is a government-backed, fixed rate. Using a rate that is too optimistic produces a deceptively low present value and risks underfunding the actual future goal.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-in-indian-law">Present value in Indian government schemes and law</h2>
                      <p style={p}>
                        Present value is not just a personal finance tool. It is written directly into Indian government rules and court procedure.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Pension commutation for government employees.</strong> Under the <a href="https://pensionersportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CCS (Commutation of Pension) Rules, 1981</a>, a central government employee can commute up to 40 percent of their monthly pension for an immediate lump sum. That lump sum is the present value of the pension given up, calculated using an official age-based commutation factor table, since a younger retiree is expected to draw the pension for more years.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Motor accident compensation.</strong> Indian courts use a "multiplier method" to convert a deceased or injured person's future lost income into a present lump sum compensation, standardised by the Supreme Court in <em>Sarla Verma v. Delhi Transport Corporation</em> (2009). The multiplier depends on the victim's age and is designed to approximate the present value of income the victim would have earned over their remaining working life.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Tax treatment of a commuted pension.</strong> Under Section 10(10A) of the Income Tax Act, the commuted (present value) portion of a pension is fully tax-exempt for government employees, and partially exempt for non-government employees, exempt up to one-third of the commuted value if gratuity is also received, or one-half if it is not.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Life insurance surrender values.</strong> Under IRDAI's October 2024 Master Circular, a policy's Special Surrender Value must be at least the present value of the paid-up sum assured, future benefits, and bonuses. Insurers must discount those future benefits at a rate capped at the 10-year G-Sec yield plus 0.5 percentage points, reviewed every year, so a lower discount rate directly means a higher payout for the policyholder.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>NPS annuity purchase.</strong> PFRDA requires a share of an NPS corpus to be used to buy an annuity at retirement (40 percent for government employees, 20 percent for other subscribers as of the current rules), rather than withdrawn as a lump sum. The annuity provider effectively values that portion using the present value of the future monthly pension payments it commits to paying.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>EPFO's Table D.</strong> An EPS member who exits before completing 10 years of service receives a lump sum withdrawal benefit calculated from EPFO's Table D, a present-value-style factor table that scales with completed years of service, rather than the exact contributions made.
                        </p>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-vs-fv">Present value versus future value</h2>
                      <p style={p}>
                        Present value and future value are the same formula solved in opposite directions. Future value compounds today's money forward; present value discounts tomorrow's money backward.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                          <thead><tr><th style={{ ...thS, width: '30%' }} scope="col"></th><th style={thS} scope="col">Present Value</th><th style={thS} scope="col">Future Value</th></tr></thead>
                          <tbody>
                            {[
                              ['Question answered', 'What is a future amount worth today?', 'What will today\'s amount grow to?'],
                              ['Direction', 'Discounts backward from a future date', 'Compounds forward from today'],
                              ['Typical use', 'Pricing a future payout or bond cash flow', 'Projecting an investment\'s growth'],
                            ].map((row, i) => (
                              <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                                <td style={tdL}>{row[1]}</td>
                                <td style={tdL}>{row[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Use the <Link href="/calculators/future-value-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Future Value Calculator</Link> to project forward, or the <Link href="/calculators/npv-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPV Calculator</Link> when there are multiple cash flows to discount rather than a single future amount.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-real-world-uses">Practical situations where present value matters</h2>
                      <p style={p}>
                        Present value stops being a textbook formula the moment someone offers you a choice between money now and more money later. These are the situations where it actually gets used.
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Lottery or prize winnings: lump sum versus instalments.</strong> When a prize is offered as either one lump sum today or a series of payments over several years, the two options are only comparable once the instalment stream is discounted back to its present value. The instalment total looks bigger on paper, but its present value can be lower than the immediate lump sum once a realistic discount rate is applied.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Builder payment plans for real estate.</strong> Developers often offer a discount for paying the full amount upfront versus a "pay in 3 years" construction-linked plan. Discounting the deferred price back to today at your own realistic investment rate shows whether the builder's discount for paying early is actually a good deal, or smaller than what you would earn by investing the money yourself in the meantime.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Comparing a signing bonus against deferred compensation.</strong> A job offer with a smaller cash bonus now against a larger bonus or ESOP vesting in two or three years is a present value comparison in disguise. Discounting the deferred amount back to today, at a rate that reflects how much you trust that future payout, makes the two offers genuinely comparable.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Evaluating a structured settlement.</strong> Legal settlements and insurance claims are sometimes offered as a stream of future payments instead of one lump sum. The present value of that stream, not its face-value total, is what should be compared against a one-time settlement offer.
                        </p>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="how-to-use">How to use this calculator</h2>
                      <p style={p}>The calculator requires three inputs:</p>
                      <div>
                        {[
                          { label: 'Future Amount', text: 'The sum of money you will have, need, or have been offered at a future date.' },
                          { label: 'Discount Rate', text: 'The annual rate used to discount that future amount back to today, matched to what the money would realistically earn elsewhere.' },
                          { label: 'Time Period', text: 'The number of years between today and the future date.' },
                        ].map((it, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span><strong>{it.label}:</strong> {it.text}</span>
                          </div>
                        ))}
                      </div>
                      <p style={{ ...p, margin: '12px 0 0' }}>
                        The present value, discount amount, and donut chart update instantly as any input changes.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-limitations">Limitations of this calculator</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>It handles one future cash flow, not a stream.</strong> A bond with multiple coupon payments, or a project with cash flows in several different years, needs each cash flow discounted separately and summed. Use the <Link href="/calculators/npv-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPV Calculator</Link> for that.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>The result is only as good as the assumed rate.</strong> Present value is highly sensitive to the discount rate, as the worked example above shows. There is no single correct rate, only one that fits the specific comparison being made.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>It assumes annual compounding.</strong> A discount rate compounded monthly or quarterly against the same nominal annual rate produces a slightly different present value than this calculator's annual convention.
                        </p>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-common-mistakes">Common mistakes when calculating present value</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Mixing up a nominal rate and a real rate.</strong> A nominal discount rate already reflects the market return you'd expect. A real rate strips inflation out of that return first. Using an inflation-adjusted rate on a future amount that was never adjusted for inflation in the first place double-counts the effect and understates the present value.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Discounting a pre-tax future amount as if it were post-tax.</strong> A future maturity value, bonus, or settlement is often quoted before tax. Discounting that gross figure and treating the result as spendable money overstates what the present value is actually worth to you once tax is deducted.
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Using the same discount rate for every comparison.</strong> The rate should reflect the risk and liquidity of the specific option being evaluated, not a single default number reused everywhere. A guaranteed government payout and a risky private settlement offer do not deserve the same discount rate, even if both are "future money."
                        </p>
                        <p style={p}>
                          <strong style={{ color: C.ink }}>Forgetting that present value is a comparison tool, not a prediction.</strong> The output tells you what a future amount is worth today under a specific assumed rate. It does not predict what will actually happen to your money, since real returns vary year to year in a way a single flat rate cannot capture.
                        </p>
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2} id="pv-real-vs-nominal">Real versus nominal discount rates</h2>
                      <p style={p}>
                        A nominal rate is the return you see quoted, such as a bank FD's advertised interest rate. A real rate is what that return is actually worth after subtracting inflation. The approximate relationship is: real rate is roughly equal to the nominal rate minus the inflation rate.
                      </p>
                      <p style={p}>
                        Which one to use depends on what the future amount represents. If it is already stated in today's purchasing power, use a real rate. If it is a nominal rupee figure, such as an actual maturity value, use a nominal rate.
                      </p>
                      <p style={{ ...p, margin: 0 }}>
                        Mixing the two, as covered above, is one of the most common present value mistakes. The <Link href="/calculators/real-return-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Real Return Calculator</Link> converts a nominal return into its real equivalent if that split needs working out first.
                      </p>
                    </div>


                    <div style={sec}>
                      <h2 style={h2} id="faq">Frequently asked questions</h2>
            <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>
          </div>
          <style>{`.present-val-sidebar::-webkit-scrollbar{width:5px}.present-val-sidebar::-webkit-scrollbar-track{background:transparent}.present-val-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.present-val-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="present-val-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>
        </div>
      </div>
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity', '/calculators/goal-planning-calculator|Goal Planning', '/calculators/future-value-calculator|Future Value', '/calculators/present-value-calculator|Present Value'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

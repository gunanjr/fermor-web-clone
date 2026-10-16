'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* Palette: matches the site-wide C object in CLAUDE.md */
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

type Mode = 'sip' | 'lumpsum';

/* ── Math ─────────────────────────────────────────────────────── */
function monthlyRate(annualRate: number): number {
  return annualRate === 0 ? 0 : Math.pow(1 + annualRate / 100, 1 / 12) - 1;
}

function calcSIP(monthly: number, annualRate: number, months: number): number {
  if (months === 0) return 0;
  const i = monthlyRate(annualRate);
  if (i === 0) return monthly * months;
  return monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
}

function calcLumpsum(principal: number, annualRate: number, years: number): number {
  return principal * Math.pow(1 + annualRate / 100, years);
}

function sipNeededForTarget(target: number, annualRate: number, months: number): number {
  if (months === 0) return 0;
  const i = monthlyRate(annualRate);
  if (i === 0) return target / months;
  return target / (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
}

function lumpsumNeededForTarget(target: number, annualRate: number, years: number): number {
  return target / Math.pow(1 + annualRate / 100, years);
}

interface GrowthRow {
  year: number;
  invested: number;
  wealthGained: number;
  totalValue: number;
}

function buildSIPGrowth(monthly: number, annualRate: number, totalMonths: number, existingCorpus: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const i = monthlyRate(annualRate);
  const startYear = new Date().getFullYear();
  let corpus = existingCorpus;
  let cumInvested = existingCorpus;
  const totalYears = Math.ceil(totalMonths / 12);
  for (let y = 0; y < totalYears; y++) {
    const monthsThisYear = Math.min(12, totalMonths - y * 12);
    for (let m = 0; m < monthsThisYear; m++) {
      corpus = i === 0 ? corpus + monthly : (corpus + monthly) * (1 + i);
      cumInvested += monthly;
    }
    rows.push({ year: startYear + y, invested: cumInvested, wealthGained: corpus - cumInvested, totalValue: corpus });
  }
  return rows;
}

function buildLumpsumGrowth(principal: number, annualRate: number, totalYears: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const startYear = new Date().getFullYear();
  for (let y = 1; y <= totalYears; y++) {
    const totalValue = calcLumpsum(principal, annualRate, y);
    rows.push({ year: startYear + y - 1, invested: principal, wealthGained: totalValue - principal, totalValue });
  }
  return rows;
}

/* ── Donut ────────────────────────────────────────────────────── */
function DonutChart({ invested, returns: ret }: { invested: number; returns: number }) {
  const total = invested + ret;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (invested / total) * circ;
  const pPct = Math.round((invested / total) * 100);
  return (
    <svg role="img" aria-label={`${pPct}% of the maturity value is total invested; the rest is estimated returns`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ── Bar chart: invested (dark) stacked under wealth gained (lime2) ── */
function GrowthBarChart({ rows }: { rows: GrowthRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxTotal = Math.max(...rows.map(r => r.totalValue));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;

  return (
    <svg role="img" aria-label="Year-by-year invested amount versus wealth gained bar chart"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const totalH = maxTotal > 0 ? (row.totalValue / maxTotal) * H : 0;
        const investedH = row.totalValue > 0 ? (row.invested / row.totalValue) * totalH : 0;
        const gainedH = totalH - investedH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={gainedH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - investedH} width={barW} height={investedH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
                {row.year.toString().slice(2)}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Slider: colorless input panel per CLAUDE.md rule 17 ────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
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
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}>
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}</span>
      </div>
    </div>
  );
}

/* ── Year presets: colorless pill pattern per CLAUDE.md rule 17 ─── */
function YearPresets({ current, onChange, options }: { current: number; onChange: (v: number) => void; options: number[] }) {
  return (
    <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
      {options.map(y => {
        const active = current === y;
        return (
          <button key={y} onClick={() => onChange(y)}
            aria-pressed={active}
            style={{
              padding: '4px 10px', fontSize: 12, fontWeight: active ? 700 : 500,
              background: active ? C.white : 'transparent', color: active ? C.ink : C.ink3,
              border: `${active ? 1.5 : 1}px solid ${active ? C.ink : C.border}`, borderRadius: 6,
              cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s',
            }}>
            {y}Y
          </button>
        );
      })}
    </div>
  );
}

/* ── Sidebar list ─────────────────────────────────────────────── */
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

const POPULAR = [
  { href: '/calculators/sip-calculator',           label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',       label: 'Lumpsum Calculator' },
  { href: '/calculators/step-up-sip-calculator',   label: 'Step-Up SIP Calculator' },
  { href: '/calculators/sip-vs-lumpsum-calculator', label: 'SIP vs Lumpsum Calculator' },
  { href: '/calculators/swp-calculator',           label: 'SWP Calculator' },
];
const MORE = [
  { href: '/calculators/xirr-calculator',          label: 'XIRR Calculator' },
  { href: '/calculators/cagr-calculator',          label: 'CAGR Calculator' },
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
  { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
  { href: '/calculators/fd-calculator',            label: 'FD Calculator' },
];

/* ── FAQ data: matches faqSchema in page.tsx ─────────────────────── */
const FAQS = [
  { q: 'How is SIP maturity amount calculated?', a: 'The formula is M = P x [((1 + i)^n - 1) / i] x (1 + i). P is your monthly SIP, n is the number of months, and i is the monthly rate. Most calculators get i by dividing the annual rate by 12, which is an approximation. This calculator uses i = (1 + r)^(1/12) - 1, the mathematically correct conversion. At 12% annually, the difference between the two methods is small each month, but it compounds meaningfully over 15-20 years.' },
  { q: 'What is the minimum SIP amount in India?', a: 'Most AMCs set the floor at Rs 500 per month. A few accept Rs 100. SEBI requires all open-ended mutual funds to offer a monthly SIP option. There is no upper limit; some investors run SIPs of Rs 5 lakh or more per month. The minimum for ELSS (tax-saving) funds is typically Rs 500 per month as well.' },
  { q: 'Is SIP better than a lumpsum investment?', a: 'It depends on timing. Put a lump sum in near a market bottom and it will likely beat a SIP over the same period, since the full amount starts compounding immediately. Most people cannot reliably time market bottoms, and that is where SIP removes the pressure. Switch to the Lumpsum tab above to compare both against your own numbers, or use the dedicated SIP vs Lumpsum Calculator for a side-by-side view.' },
  { q: 'What is a Step-up SIP?', a: 'A Step-up SIP increases your monthly amount by a fixed percentage each year. Start at Rs 10,000 and step up 10% annually: year two you invest Rs 11,000, year three Rs 12,100, and so on. A flat Rs 10,000 SIP at 12% for 20 years gives roughly Rs 91.99 lakh. The same SIP with a 10% annual step-up pushes the corpus well past Rs 1.6 crore. The Step-Up SIP Calculator models this exactly.' },
  { q: 'What is rupee cost averaging?', a: 'You invest a fixed rupee amount every month. When the fund NAV falls, that amount buys more units. When NAV rises, it buys fewer. Over time, your average purchase price tends to land lower than the average NAV for the same period, without you needing to predict when to buy.' },
  { q: 'Are SIP returns guaranteed?', a: 'No. The return rate you enter is your assumption, not a commitment from any fund house. Equity funds can and do lose money in the short term. Historical category averages for diversified equity funds have run roughly 12-15% p.a. over rolling 10-year periods, but past performance never guarantees future results. Check a fund\'s actual trailing returns before assuming a rate, and use a conservative figure if you are close to needing the money.' },
  { q: 'Can I stop or pause my SIP?', a: 'Yes. You can pause a SIP for 1-3 months through your AMC\'s website or the broker app you used to start it. You can stop permanently at any time by cancelling the NACH mandate. Stopping the SIP does not touch your units; they stay invested and keep compounding until you explicitly redeem them. There is no penalty for stopping a SIP.' },
  { q: 'How is SIP taxed in India?', a: 'Tax only applies when you sell (redeem) units, and each monthly instalment counts separately for tax purposes. For equity funds: hold units under 12 months and profit is taxed at 20% (STCG). Hold for 12 months or more and gains up to Rs 1.25 lakh per year are tax-free, with 12.5% LTCG beyond that. For debt funds bought after April 2023, all gains are taxed at your income slab rate regardless of holding period.' },
  { q: 'What is XIRR and why does it matter for SIP?', a: 'This calculator projects a maturity value from one assumed annual return, compounded monthly. Your real SIP has dozens of cash flows on different dates, so your actual mutual fund statement reports XIRR, not this projected figure. XIRR finds the single annualised rate that reconciles every instalment\'s date and amount against your current portfolio value. For long-running SIPs the two numbers can differ by 1-3%.' },
  { q: 'What is an ELSS SIP?', a: 'ELSS (Equity Linked Savings Scheme) is an equity mutual fund with a 3-year lock-in per instalment and a Section 80C deduction up to Rs 1.5 lakh per year. The key detail people miss: the lock-in is per instalment, not from the date you started the SIP. Five years into an ELSS SIP, only units bought more than 3 years ago are redeemable; units from the last 36 months stay locked.' },
  { q: 'How much monthly SIP do I need to build Rs 1 crore?', a: 'At an assumed 12% p.a. return, reaching Rs 1 crore needs roughly Rs 44,636 a month over 10 years, Rs 21,011 over 15 years, Rs 10,871 over 20 years, or Rs 3,246 over 30 years. A longer runway sharply cuts the monthly amount because compounding does more of the work. Enter your own target and rate above to see your exact figure.' },
  { q: 'Does SIP have a fixed interest rate like a Fixed Deposit?', a: 'No. A Fixed Deposit pays a guaranteed rate set by the bank upfront. A SIP invests in a mutual fund whose NAV moves with the market, so the rate you enter is a return assumption, not a guaranteed rate. There is no SIP product with FD-style fixed interest; a debt fund SIP is lower-volatility than equity but still has no guaranteed return.' },
  { q: 'Can I start a SIP with money I already have invested?', a: 'Yes. Open "More settings" in the SIP tab above and enter your existing corpus. The calculator grows that amount at the same rate over the same tenure and adds it to your fresh monthly contributions, so the maturity figure reflects your combined position.' },
  { q: 'What is a good SIP tenure: 10, 20, or 30 years?', a: 'Longer tenure compounds far more than it costs in patience. A Rs 10,000 monthly SIP at 12% grows to roughly Rs 22.4 lakh in 10 years but Rs 3.08 crore in 30 years, because the wealth-gained share of the corpus keeps rising each year. Match tenure to a real goal, such as retirement or a child\'s education, rather than a round number.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Waitlist / save-results card: exact copy per CLAUDE.md rule 12 ── */
function WaitlistCard({ mobile }: { mobile: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    try {
      if (localStorage.getItem('fermor-waitlist-joined')) setStatus('success');
    } catch { /* ignore */ }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'sip-calculator' }),
      });
      if (res.ok) {
        localStorage.setItem('fermor-waitlist-joined', '1');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: mobile ? '20px 16px' : '24px 28px', marginBottom: 36, boxShadow: '0 1px 12px rgba(16,18,20,0.04)' }}>
      <p style={{ color: C.ink, fontWeight: 600, fontSize: 14, margin: '0 0 4px', fontFamily: INTER }}>Save your results</p>
      <p style={{ color: C.ink3, fontSize: 13, margin: '0 0 14px', lineHeight: 1.6, fontFamily: INTER }}>
        Sign up to save this calculation and access your results any time.
      </p>
      {status === 'success' ? (
        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.dark, fontSize: 13, fontWeight: 600 }}>
          Your calculation was saved to your Fermor account.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexDirection: mobile ? 'column' : 'row' }}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
            aria-label="Enter your email to save calculation" required
            style={{ flex: 1, padding: '10px 14px', fontSize: 13.5, borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, color: C.ink, outline: 'none', fontFamily: INTER }} />
          <button className="fx-btn" type="submit" disabled={status === 'loading'}
            style={{ padding: '10px 20px', fontSize: 13.5, fontWeight: 700, borderRadius: 8, border: '1px solid #D3D7DA', background: '#E9ECEE', color: '#101214', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: INTER }}>
            {status === 'loading' ? 'Saving...' : 'Sign up free'}
          </button>
        </form>
      )}
    </div>
  );
}

/* ── CA CTA: exact standard component per CLAUDE.md ─────────────── */

/* ── In-content promo bar ─────────────────────────────────────── */
function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

interface Settings {
  mode: Mode;
  monthly: number;
  rate: number;
  years: number;
  existingCorpus: number;
  lumpsum: number;
  lumpsumRate: number;
  lumpsumYears: number;
}

export default function SIPCalculatorClient() {
  const defaultSettings: Settings = {
    mode: 'sip', monthly: 25000, rate: 12, years: 10, existingCorpus: 0,
    lumpsum: 500000, lumpsumRate: 12, lumpsumYears: 10,
  };
  const { settings, updateSettings } = useCalculatorSettings<Settings>('sip-calculator', defaultSettings);
  const { mode, monthly, rate, years, existingCorpus, lumpsum, lumpsumRate, lumpsumYears } = settings;

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months = years * 12;

  const { maturity, invested, returns: est } = useMemo(() => {
    if (mode === 'sip') {
      const sipFV = calcSIP(monthly, rate, months);
      const existingFV = existingCorpus > 0 ? calcLumpsum(existingCorpus, rate, years) : 0;
      const m = sipFV + existingFV;
      const inv = monthly * months + existingCorpus;
      return { maturity: m, invested: inv, returns: m - inv };
    }
    const m = calcLumpsum(lumpsum, lumpsumRate, lumpsumYears);
    return { maturity: m, invested: lumpsum, returns: m - lumpsum };
  }, [mode, monthly, rate, months, existingCorpus, years, lumpsum, lumpsumRate, lumpsumYears]);

  const invPct = maturity > 0 ? Math.round((invested / maturity) * 100) : 0;
  const returnsPct = 100 - invPct;
  const multiplier = invested > 0 ? maturity / invested : 0;

  const growthRows = useMemo(() => {
    return mode === 'sip'
      ? buildSIPGrowth(monthly, rate, months, existingCorpus)
      : buildLumpsumGrowth(lumpsum, lumpsumRate, lumpsumYears);
  }, [mode, monthly, rate, months, existingCorpus, lumpsum, lumpsumRate, lumpsumYears]);

  const crTarget = 10000000;
  const crNeeded = useMemo(() => {
    return mode === 'sip'
      ? sipNeededForTarget(crTarget, rate, months)
      : lumpsumNeededForTarget(crTarget, lumpsumRate, lumpsumYears);
  }, [mode, rate, months, lumpsumRate, lumpsumYears]);

  const activeYears = mode === 'sip' ? years : lumpsumYears;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            SIP Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Calculate SIP and lumpsum mutual fund returns using the exact monthly-compounding formula AMCs use
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tabs: SIP | Lumpsum, underline style INSIDE the card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'sip', label: 'SIP' },
                  { id: 'lumpsum', label: 'Lumpsum' },
                ] as { id: Mode; label: string }[]).map(tab => (
                  <button key={tab.id} role="tab" aria-selected={mode === tab.id}
                    onClick={() => updateSettings({ mode: tab.id })}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 13 : 14, fontWeight: mode === tab.id ? 700 : 400,
                      color: mode === tab.id ? C.dark : C.ink3,
                      borderBottom: mode === tab.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '44px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {mode === 'sip' && (!showAdvanced ? (
                    <>
                      <Slider id="sip-monthly" label="Monthly SIP Amount" value={monthly} min={500} max={500000} step={500}
                        display={fmtC(monthly)} onChange={v => updateSettings({ monthly: v })} compact={mobile} />
                      <Slider id="sip-rate" label="Expected Return Rate (p.a.)" value={rate} min={1} max={30} step={0.5}
                        display={`${rate.toFixed(1)}%`} onChange={v => updateSettings({ rate: v })} compact={mobile} />
                      <Slider id="sip-years" label="Investment Period" value={years} min={1} max={50} step={1}
                        display={`${years} Yr`} onChange={v => updateSettings({ years: v })} compact={mobile} />
                      <YearPresets current={years} onChange={v => updateSettings({ years: v })} options={[5, 10, 15, 20, 25, 30]} />
                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider id="sip-existing" label="Existing Corpus Already Invested" value={existingCorpus} min={0} max={10000000} step={10000}
                        display={fmtC(existingCorpus)} onChange={v => updateSettings({ existingCorpus: v })} compact={mobile} />
                      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: '4px 0 20px' }}>
                        Any lumpsum you already hold gets grown at the same rate and tenure and added to your fresh SIP contributions.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  ))}

                  {mode === 'lumpsum' && (
                    <>
                      <Slider id="ls-amount" label="Lumpsum Investment Amount" value={lumpsum} min={10000} max={50000000} step={10000}
                        display={fmtC(lumpsum)} onChange={v => updateSettings({ lumpsum: v })} compact={mobile} />
                      <Slider id="ls-rate" label="Expected Return Rate (p.a.)" value={lumpsumRate} min={1} max={30} step={0.5}
                        display={`${lumpsumRate.toFixed(1)}%`} onChange={v => updateSettings({ lumpsumRate: v })} compact={mobile} />
                      <Slider id="ls-years" label="Investment Period" value={lumpsumYears} min={1} max={50} step={1}
                        display={`${lumpsumYears} Yr`} onChange={v => updateSettings({ lumpsumYears: v })} compact={mobile} />
                      <YearPresets current={lumpsumYears} onChange={v => updateSettings({ lumpsumYears: v })} options={[5, 10, 15, 20, 25, 30]} />
                    </>
                  )}
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '44px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#101214' }}>Maturity Amount</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(maturity)}</span>
                  </div>

                  {[
                    { label: 'Total invested', value: fmtC(invested) },
                    { label: 'Est. returns', value: fmtC(est) },
                    { label: 'Total value', value: fmtC(maturity) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '14px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 20, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={invested} returns={est} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Total invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Est. returns</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {invPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${invPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Bonus derived stats: informational box, colorless per rule 17 */}
                  <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px' }}>
                      <p style={{ fontSize: 11, color: C.ink3, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Wealth multiplier</p>
                      <p style={{ fontSize: 17, fontWeight: 800, color: C.dark, margin: 0 }}>{multiplier.toFixed(2)}x</p>
                    </div>
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px' }}>
                      <p style={{ fontSize: 11, color: C.ink3, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {mode === 'sip' ? `To hit ₹1 Cr in ${activeYears}y` : `Needed for ₹1 Cr in ${activeYears}y`}
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 800, color: C.dark, margin: 0 }}>
                        {mode === 'sip' ? `${fmtC(crNeeded)}/mo` : fmtC(crNeeded)}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Growth schedule */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowSchedule(v => !v)} aria-expanded={showSchedule}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Growth Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly breakdown with chart)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: 'transparent', border: `1px solid ${C.border}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {activeYears} Yr
                    </span>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showSchedule && (
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 18px 4px' : '20px 44px 4px' }}>
                      <GrowthBarChart rows={growthRows} />
                      <div style={{ display: 'flex', gap: 18, marginTop: 8, marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Invested</span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} /><span style={{ fontSize: 12, color: C.ink2 }}>Wealth gained</span></div>
                      </div>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', 'Amount Invested', 'Wealth Gained', 'Total Value'].map(h => (
                              <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {growthRows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.invested)}</td>
                              <td style={{ padding: '13px 24px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(row.wealthGained)}</td>
                              <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.totalValue)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <WaitlistCard mobile={mobile} />

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2s: React.CSSProperties = { fontSize: mobile ? 19 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.015em' };
                const h3s: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 8px' };
                const ps: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
                const sec: React.CSSProperties = { margin: '0 0 48px' };
                const thL: React.CSSProperties = { padding: '10px 16px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 12, borderBottom: `1px solid ${C.border}` };
                const thR: React.CSSProperties = { ...thL, textAlign: 'right' };
                const tdL: React.CSSProperties = { padding: '10px 16px', color: C.ink2, borderBottom: `1px solid ${C.border}` };
                const tdR: React.CSSProperties = { ...tdL, textAlign: 'right' as const, fontWeight: 600, color: C.ink };

                return (
                  <>
                    {/* 1 */}
                    <section style={sec}>
                      <h2 id="what-is-sip" style={h2s}>What Is a SIP?</h2>
                      <p style={{ ...ps, fontWeight: 600, color: C.ink }} className="article-lead">
                        A SIP, or Systematic Investment Plan, is a method of investing a fixed amount into a mutual fund scheme at regular intervals, typically monthly, instead of investing the entire amount at once.
                      </p>
                      <p style={ps}>SIP is not a separate financial product. It is a payment instruction, a NACH mandate that debits a fixed amount from your bank account on a chosen date each month and buys units of a mutual fund scheme at that day&apos;s NAV.</p>
                      <p style={ps}>By investing the same rupee amount every month, you buy more units when the NAV (unit price) is low and fewer units when the NAV is high. This mechanism, called rupee cost averaging, is covered in detail further down this page.</p>
                    </section>

                    {/* 2 */}
                    <section style={sec}>
                      <h2 id="sip-formula" style={h2s}>How Is SIP Return Calculated?</h2>
                      <p style={ps}>SIP maturity value is calculated with the future value of an annuity due formula, since each instalment compounds for a different number of periods.</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        M = P × [((1 + i)^n − 1) / i] × (1 + i)
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                        {[
                          { sym: 'M', name: 'Maturity Amount', desc: 'Total corpus at the end of the tenure' },
                          { sym: 'P', name: 'Monthly SIP', desc: 'Instalment paid each month' },
                          { sym: 'i', name: 'Monthly Rate', desc: 'Derived as (1 + r)^(1/12) − 1' },
                          { sym: 'n', name: 'Total Months', desc: 'Tenure in years multiplied by 12' },
                        ].map(v => (
                          <div key={v.sym} style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 14px' }}>
                            <span style={{ fontSize: 18, fontWeight: 900, color: C.dark, fontFamily: INTER }}>{v.sym}</span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, marginLeft: 8 }}>{v.name}</span>
                            <p style={{ fontSize: 11, color: C.ink2, margin: '4px 0 0', lineHeight: 1.5 }}>{v.desc}</p>
                          </div>
                        ))}
                      </div>
                      <p style={ps}>
                        Dividing the annual rate by 12 to get a monthly rate is a common shortcut, but it is not how mutual fund NAVs actually compound. At a 12% annual return, dividing by 12 gives a flat 1% a month; the mathematically correct conversion gives approximately 0.9489% a month. The gap looks small, but it multiplies across hundreds of instalments, so this calculator always uses the compound conversion.
                      </p>
                      <p style={ps}>
                        If you are combining a SIP with money you already have invested, open &quot;More settings&quot; above to add your existing corpus, or use the <Link href="/calculators/wealth-growth-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Wealth Growth Calculator</Link> to see the year your returns overtake your contributions.
                      </p>
                    </section>

                    {/* 3 */}
                    <section style={sec}>
                      <h2 id="sip-vs-lumpsum" style={h2s}>SIP vs Lumpsum: Which Should You Choose?</h2>
                      <p style={ps}>Neither is universally better; it depends on when the money goes in and how much of it you have upfront. A lumpsum invests everything on day one, so more of it compounds for longer. A SIP spreads the same commitment across many entry points, which lowers your average cost when markets are choppy.</p>
                      <p style={ps}>On a real comparison: investing Rs 10,000 a month for 15 years at 12% builds a total invested amount of Rs 18 lakh and a maturity value of roughly Rs 47.6 lakh. Putting the same Rs 18 lakh in as a lumpsum on day one, at the same 12%, grows to roughly Rs 98.5 lakh over 15 years, because the entire amount has 15 years to compound instead of an average of about 7.5 years across the SIP instalments.</p>
                      <p style={ps}>That gap does not mean lumpsum wins in practice. Most investors do not have Rs 18 lakh sitting idle to deploy on a single day, and a lumpsum invested right before a market fall can sit underwater for years. SIP exists because it matches how income actually arrives: monthly.</p>
                      <PromoBar name="SIP vs Lumpsum Calculator" desc="Run both scenarios side by side with the same amount, rate, and tenure." href="/calculators/sip-vs-lumpsum-calculator" />
                    </section>

                    {/* 4 */}
                    <section style={sec}>
                      <h2 id="types-of-sip" style={h2s}>Types of SIP</h2>
                      <h3 style={h3s}>Regular SIP</h3>
                      <p style={ps}>Invests the exact same amount on a fixed date every month. The simplest and most common option, and the one modelled by the SIP tab above.</p>
                      <h3 style={h3s}>Step-up (or Top-up) SIP</h3>
                      <p style={ps}>Automatically increases your monthly contribution by a set percentage or amount every year, aligning your investment with salary growth. A flat Rs 10,000 SIP at 12% for 20 years reaches about Rs 91.99 lakh; the same SIP with a 10% annual step-up crosses Rs 1.6 crore over the same period.</p>
                      <h3 style={h3s}>Flexi SIP</h3>
                      <p style={ps}>Lets you adjust the monthly amount within a band depending on cash flow or market conditions, instead of a fixed figure every month.</p>
                      <h3 style={h3s}>Perpetual SIP</h3>
                      <p style={ps}>Has no fixed end date and continues until the investor explicitly cancels it, rather than stopping automatically after a chosen tenure.</p>
                      <PromoBar name="Step-Up SIP Calculator" desc="Model a rising SIP and see the exact corpus difference against a flat monthly amount." href="/calculators/step-up-sip-calculator" />
                    </section>

                    {/* 5 */}
                    <section style={sec}>
                      <h2 id="rupee-cost-averaging" style={h2s}>What Is Rupee Cost Averaging?</h2>
                      <p style={ps}>Rupee cost averaging is the automatic side effect of investing a fixed amount every month rather than a fixed number of units. When the NAV drops, your Rs 10,000 buys more units that month. When the NAV rises, the same Rs 10,000 buys fewer units.</p>
                      <p style={ps}>Over a full market cycle, this tends to bring your average cost per unit below the simple average NAV across the period, without you having to decide when to buy more or less. It does not protect against a fund that genuinely underperforms; it only smooths out entry timing within a given fund.</p>
                    </section>

                    {/* 6 */}
                    <section style={sec}>
                      <h2 id="average-sip-returns" style={h2s}>What Returns Can You Expect From a SIP?</h2>
                      <p style={ps}>A SIP has no fixed or guaranteed return. What it returns depends entirely on the underlying mutual fund category and the market period it runs through. Broad historical category averages, based on long-term rolling returns, look roughly like this:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead><tr><th style={thL}>Fund category</th><th style={thR}>Typical long-term range (p.a.)</th></tr></thead>
                          <tbody>
                            {[
                              ['Large-cap equity', '10-13%'],
                              ['Flexi-cap / Multi-cap equity', '11-14%'],
                              ['Mid-cap equity', '13-16%'],
                              ['Small-cap equity', '14-18%'],
                              ['Hybrid (equity + debt)', '9-12%'],
                              ['Debt funds', '6-8%'],
                            ].map(([cat, r], i) => (
                              <tr key={cat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={tdL}>{cat}</td>
                                <td style={tdR}>{r}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>These are broad, illustrative ranges, not a quote for any specific scheme, and they carry no guarantee of repeating. Before assuming a rate on this calculator, check a fund&apos;s actual trailing 5-year and 10-year returns on its AMC factsheet or on <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>AMFI</a>. Small-cap and mid-cap funds carry meaningfully higher volatility alongside the higher average return; a fund that has averaged 15% can still post a sharply negative year.</p>
                    </section>

                    {/* 7 */}
                    <section style={sec}>
                      <h2 id="sip-amount-table" style={h2s}>SIP Calculator Table: Rs 1,000 to Rs 25,000 per Month</h2>
                      <p style={ps}>Maturity values below assume a 12% p.a. return, compounded monthly using this calculator&apos;s formula. Recalculate with your own numbers above for an exact figure at your assumed rate.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr>
                              <th style={thL}>Monthly SIP</th>
                              <th style={thR}>10 years</th>
                              <th style={thR}>15 years</th>
                              <th style={thR}>20 years</th>
                              <th style={thR}>30 years</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Rs 1,000', 'Rs 2.24 lakh', 'Rs 4.76 lakh', 'Rs 9.20 lakh', 'Rs 30.81 lakh'],
                              ['Rs 2,000', 'Rs 4.48 lakh', 'Rs 9.52 lakh', 'Rs 18.40 lakh', 'Rs 61.62 lakh'],
                              ['Rs 5,000', 'Rs 11.20 lakh', 'Rs 23.80 lakh', 'Rs 45.99 lakh', 'Rs 1.54 crore'],
                              ['Rs 10,000', 'Rs 22.40 lakh', 'Rs 47.59 lakh', 'Rs 91.99 lakh', 'Rs 3.08 crore'],
                              ['Rs 15,000', 'Rs 33.61 lakh', 'Rs 71.39 lakh', 'Rs 1.38 crore', 'Rs 4.62 crore'],
                              ['Rs 20,000', 'Rs 44.81 lakh', 'Rs 95.19 lakh', 'Rs 1.84 crore', 'Rs 6.16 crore'],
                              ['Rs 25,000', 'Rs 56.01 lakh', 'Rs 1.19 crore', 'Rs 2.30 crore', 'Rs 7.70 crore'],
                            ].map(([amt, ...vals], i) => (
                              <tr key={amt} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{amt}</td>
                                {vals.map((v, j) => <td key={j} style={tdR}>{v}</td>)}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    {/* 8 */}
                    <section style={sec}>
                      <h2 id="sip-by-rate" style={h2s}>How the Return Rate Changes Your SIP Corpus</h2>
                      <p style={ps}>The return rate you assume has an outsized effect on the projected corpus, more than most people expect. On a Rs 10,000 monthly SIP over 10 years:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead><tr><th style={thL}>Assumed return</th><th style={thR}>Maturity value</th><th style={thR}>Est. returns</th></tr></thead>
                          <tbody>
                            {[
                              ['8% p.a.', 'Rs 18.13 lakh', 'Rs 6.13 lakh'],
                              ['10% p.a.', 'Rs 20.15 lakh', 'Rs 8.15 lakh'],
                              ['12% p.a.', 'Rs 22.40 lakh', 'Rs 10.40 lakh'],
                              ['14% p.a.', 'Rs 24.93 lakh', 'Rs 12.93 lakh'],
                              ['15% p.a.', 'Rs 26.30 lakh', 'Rs 14.30 lakh'],
                            ].map(([r, m, e], i) => (
                              <tr key={r} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={tdL}>{r}</td><td style={tdR}>{m}</td><td style={tdR}>{e}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Total invested stays fixed at Rs 12 lakh across every row; the entire difference comes from the assumed rate compounding on the same contributions. This is why picking a realistic rate for the specific fund category matters more than the exact monthly amount for long-term projections.</p>
                    </section>

                    {/* 9 */}
                    <section style={sec}>
                      <h2 id="sip-for-1-crore" style={h2s}>Monthly SIP Needed to Build Rs 1 Crore</h2>
                      <p style={ps}>Reaching a Rs 1 crore corpus takes a dramatically smaller monthly commitment the earlier you start, because compounding does more of the work over a longer runway. At an assumed 12% p.a.:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead><tr><th style={thL}>Tenure</th><th style={thR}>Monthly SIP needed</th></tr></thead>
                          <tbody>
                            {[
                              ['10 years', 'Rs 44,636'],
                              ['15 years', 'Rs 21,011'],
                              ['20 years', 'Rs 10,871'],
                              ['25 years', 'Rs 5,875'],
                              ['30 years', 'Rs 3,246'],
                            ].map(([y, v], i) => (
                              <tr key={y} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={tdL}>{y}</td><td style={tdR}>{v}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>The bonus stat box in the calculator above computes this exact figure for whatever rate and tenure you have entered, so you do not need to interpolate between these rows.</p>
                    </section>

                    {/* 10 */}
                    <section style={sec}>
                      <h2 id="minimum-sip" style={h2s}>Minimum SIP Amount and How to Start</h2>
                      <p style={ps}>Most AMCs in India set the SIP floor at Rs 500 per month, though a handful accept Rs 100. SEBI requires every open-ended mutual fund scheme to offer a monthly SIP option, so this is not something individual fund houses can opt out of.</p>
                      <p style={ps}>Starting a SIP takes four steps: complete KYC (PAN, address proof, and an in-person or video verification) once through any AMC, RTA, or broker app; pick a fund matching your goal and risk tolerance; set up a NACH e-mandate linking your bank account; and choose the monthly debit date. Most platforms complete this end to end in under 15 minutes for an already-KYC-verified investor.</p>
                    </section>

                    {/* 11 */}
                    <section style={sec}>
                      <h2 id="sip-taxation" style={h2s}>How Is SIP Taxed in India?</h2>
                      <p style={ps}>Each SIP instalment is treated as an independent purchase for capital gains tax, since it buys units on its own date at its own NAV. There is no separate "SIP tax"; ordinary mutual fund capital gains rules apply to each instalment individually.</p>
                      <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead><tr><th style={thL}>Fund type</th><th style={thL}>Holding period</th><th style={thR}>Tax rate</th></tr></thead>
                          <tbody>
                            {[
                              ['Equity fund', 'Under 12 months (STCG)', '20%'],
                              ['Equity fund', '12 months or more (LTCG)', '12.5% above Rs 1.25 lakh/year'],
                              ['Debt fund (bought after Apr 2023)', 'Any holding period', 'Income slab rate'],
                            ].map(([type, hold, tax], i) => (
                              <tr key={type + hold} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={tdL}>{type}</td><td style={tdL}>{hold}</td><td style={tdR}>{tax}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={ps}>Because each instalment has its own 12-month clock, a SIP that has run for 5 years typically has a mix of long-term and short-term lots at redemption. Most broker platforms show this lot-wise split automatically before you confirm a redemption.</p>
                    </section>

                    {/* 12 */}
                    <section style={sec}>
                      <h2 id="xirr-vs-cagr" style={h2s}>XIRR vs CAGR: Which Applies to Your SIP?</h2>
                      <p style={ps}>CAGR measures the annualised return of a single investment made on a single date, so it works for a lumpsum but not for a SIP. A SIP has a separate cash flow on a separate date for every instalment, and CAGR has no way to account for that.</p>
                      <p style={ps}>XIRR (Extended Internal Rate of Return) solves this by finding the one annualised rate that reconciles every instalment&apos;s date and amount against your portfolio&apos;s current value. Your broker&apos;s Consolidated Account Statement or app dashboard reports XIRR for a SIP, not CAGR, and for long-running SIPs the two figures can diverge by 1-3 percentage points from what a flat-rate calculator like this one would project.</p>
                    </section>

                    {/* 13 */}
                    <section style={sec}>
                      <h2 id="elss-sip" style={h2s}>ELSS SIP and the Section 80C Lock-In</h2>
                      <p style={ps}>ELSS (Equity Linked Savings Scheme) funds are diversified equity mutual funds with two extra features: a mandatory 3-year lock-in and eligibility for a Section 80C deduction up to Rs 1.5 lakh per financial year.</p>
                      <p style={ps}>The lock-in applies per instalment, not from the date the SIP started. An investor running an ELSS SIP for 5 years cannot redeem the full corpus after exactly 3 years; only units bought more than 36 months ago are unlocked, while the most recent three years of instalments remain locked on a rolling basis.</p>
                    </section>

                    {/* 14 */}
                    <section style={sec}>
                      <h2 id="sip-mistakes" style={h2s}>Common SIP Mistakes to Avoid</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Stopping during a market fall:</strong> a SIP&apos;s entire advantage comes from buying more units when prices drop. Pausing during a correction removes the one feature that makes rupee cost averaging work.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Assuming an unrealistic rate:</strong> entering 18-20% because a fund did that in one strong year, rather than checking its 10-year trailing average, produces a maturity figure that will not hold up.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Ignoring the tenure mismatch:</strong> running an equity SIP for a goal that is 2-3 years away exposes short-term money to market volatility it cannot afford to absorb.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Never increasing the amount:</strong> a flat SIP ignores rising income over time. A step-up SIP captures that growth automatically; see the Types of SIP section above.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Redeeming ELSS thinking the lock-in is a single date:</strong> as covered above, the 3-year lock-in applies per instalment, not from the SIP&apos;s start date.</li>
                      </ol>
                    </section>

                    {/* 15 */}
                    <section style={sec}>
                      <h2 id="how-to-use" style={h2s}>How to Use This SIP and Lumpsum Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>SIP tab:</strong> Enter your monthly amount, expected return rate, and tenure using the sliders or the year presets. Open &quot;More settings&quot; to add an existing corpus you already hold.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Lumpsum tab:</strong> Enter a one-time investment amount, expected return rate, and tenure to project growth without any further contributions.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Growth Schedule:</strong> Open this section to see the stacked bar chart and year-by-year table splitting your corpus into amount invested versus wealth gained.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Bonus stats:</strong> The wealth multiplier and the monthly SIP (or lumpsum) needed to reach Rs 1 crore update live with every input change.</li>
                      </ol>
                    </section>


                    {/* FAQ */}
                    <section style={sec}>
                      <h2 id="faqs" style={h2s}>Frequently Asked Questions</h2>
                      <FAQ />
                    </section>

                    {/* Disclaimer */}
                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only and based on the inputs provided. Maturity amounts, estimated returns, and wealth-multiplier figures are mathematical projections at an assumed rate and do not represent actual or guaranteed mutual fund performance. Fund category return ranges are broad historical averages and can change. Tax figures reflect the Income Tax Act provisions as understood at the time of writing and are for general awareness only. This tool is for educational and planning purposes and does not constitute investment or tax advice. Consult a SEBI-registered investment adviser or a qualified CA before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <style>{`.sip-sidebar::-webkit-scrollbar{width:5px}.sip-sidebar::-webkit-scrollbar-track{background:transparent}.sip-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.sip-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="sip-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </nav>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity', ]},
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

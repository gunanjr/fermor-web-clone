'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ── Palette ───────────────────────────────────────────── */
const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Bike Models ───────────────────────────────────────── */
const BIKE_MODELS = [
  { name: 'Hero Splendor Plus', price: 78000 },
  { name: 'Honda Activa 6G', price: 87000 },
  { name: 'Honda SP 125', price: 85000 },
  { name: 'TVS Raider 125', price: 108000 },
  { name: 'Bajaj Pulsar 150', price: 115000 },
  { name: 'Pulsar N160', price: 137000 },
  { name: 'RE Hunter 350', price: 150000 },
  { name: 'RE Bullet 350', price: 177000 },
  { name: 'RE Classic 350', price: 196000 },
  { name: 'Yamaha R15 V4', price: 198000 },
  { name: 'KTM Duke 200', price: 219000 },
  { name: 'KTM Duke 390', price: 315000 },
];

/* ── Bank Rates ────────────────────────────────────────── */
const BANK_RATES_DATA = [
  { name: 'SBI', type: 'Public Bank', rate: 9.00 },
  { name: 'Bank of Baroda', type: 'Public Bank', rate: 9.10 },
  { name: 'HDFC Bank', type: 'Private Bank', rate: 9.25 },
  { name: 'ICICI Bank', type: 'Private Bank', rate: 9.50 },
  { name: 'Axis Bank', type: 'Private Bank', rate: 9.75 },
  { name: 'Bajaj Finance', type: 'NBFC', rate: 8.99 },
  { name: 'Hero FinCorp', type: 'NBFC', rate: 10.50 },
];

/* ── Math ──────────────────────────────────────────────── */
function calcEMI(p: number, r: number, n: number): number {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

/* ── Slider ────────────────────────────────────────────── */
function Slider({
  label, id: idProp, value, min, max, step, display, onChange, compact, suffix, minLabel, maxLabel,
}: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
  minLabel?: string; maxLabel?: string;
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
        {label ? (
          <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        ) : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}>
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{minLabel ?? `${min}${suffix || ''}`}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{maxLabel ?? `${max}${suffix || ''}`}</span>
      </div>
    </div>
  );
}

/* ── SidebarList ───────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg role="img" aria-label={`Loan split: ${pPct}% principal, ${100 - pPct}% interest`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ── Amortization ──────────────────────────────────────── */
type YearRow = { year: number; principal: number; interest: number; balance: number };

function buildAmortization(loan: number, annualRate: number, months: number): YearRow[] {
  if (loan <= 0 || months <= 0) return [];
  const emi = calcEMI(loan, annualRate, months);
  const m = annualRate / 12 / 100;
  let balance = loan;
  const rows: YearRow[] = [];
  let year = 1, yPrincipal = 0, yInterest = 0;
  for (let month = 1; month <= months; month++) {
    const interest = balance * m;
    const principal = emi - interest;
    balance = Math.max(0, balance - principal);
    yPrincipal += principal;
    yInterest += interest;
    if (month % 12 === 0 || month === months) {
      rows.push({ year, principal: Math.round(yPrincipal), interest: Math.round(yInterest), balance: Math.round(balance) });
      year++; yPrincipal = 0; yInterest = 0;
    }
  }
  return rows;
}

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(60, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year principal and interest breakdown for your bike loan"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.principal + row.interest;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const prinH = total > 0 ? (row.principal / total) * totalH : 0;
        const intH = totalH - prinH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={intH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - prinH} width={barW} height={prinH} fill={CHART_PAIR.primary} rx={2} />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>
              Yr {row.year}
            </text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Article helpers ───────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdC: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* ── Sidebar data ──────────────────────────────────────── */
const POPULAR = [
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/car-loan-calculator', label: 'Car Loan EMI Calculator' },
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/mortgage-calculator', label: 'Home Loan EMI Calculator' },
  { href: '/calculators/loan-amortization-calculator', label: 'Amortization Schedule' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Loan Balance Transfer' },
];
const MORE = [
  { href: '/calculators/loan-prepayment-calculator', label: 'Loan Prepayment Calculator' },
  { href: '/calculators/credit-card-emi-calculator', label: 'Credit Card EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility' },
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
];

/* ── FAQ ───────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is the EMI for a Rs 1.5 lakh bike loan?', a: 'At 9% interest for 3 years with a Rs 1.5 lakh loan, the monthly EMI is approximately Rs 4,770. Use the calculator above to adjust the rate and tenure for your specific lender offer.' },
  { q: 'What is the Royal Enfield Classic 350 EMI?', a: 'The Royal Enfield Classic 350 costs approximately Rs 1.96 lakh ex-showroom Delhi. With a standard 20% down payment of Rs 39,200, the loan amount is Rs 1,56,800. At 9% interest for 3 years, the EMI is approximately Rs 4,987 per month.' },
  { q: 'What is the Royal Enfield Hunter 350 EMI?', a: 'The Royal Enfield Hunter 350 is priced at approximately Rs 1.50 lakh ex-showroom Delhi. With 20% down payment of Rs 30,000, the loan is Rs 1,20,000. At 9% for 3 years, the EMI is approximately Rs 3,817 per month.' },
  { q: 'What is the Bullet 350 EMI?', a: 'The Royal Enfield Bullet 350 costs approximately Rs 1.77 lakh ex-showroom Delhi. With 20% down payment of Rs 35,400, the loan is Rs 1,41,600. At 9% for 3 years, the EMI is approximately Rs 4,503 per month.' },
  { q: 'What is the Hero Splendor Plus EMI?', a: 'The Hero Splendor Plus costs approximately Rs 78,000 ex-showroom Delhi. With 20% down payment of Rs 15,600, the loan is Rs 62,400. At 9% interest for 3 years, the EMI is approximately Rs 1,985 per month.' },
  { q: 'What is the Honda Activa 6G EMI?', a: 'The Honda Activa 6G is priced at approximately Rs 87,000 ex-showroom Delhi. With 20% down payment of Rs 17,400, the loan is Rs 69,600. At 9% for 3 years, the EMI is approximately Rs 2,214 per month.' },
  { q: 'What is the bike loan interest rate at HDFC Bank?', a: 'HDFC Bank offers two-wheeler loans starting at 9.25% per annum for qualified borrowers. The rate you receive depends on your CIBIL score, income, employer category, and the specific bike model financed.' },
  { q: 'What is the bike loan interest rate at SBI?', a: 'SBI offers two-wheeler loans starting at approximately 9.00% per annum. Public sector banks like SBI and Bank of Baroda typically offer the lowest bike loan rates in India, particularly for government employees and existing account holders.' },
  { q: 'How much down payment is required for a bike loan?', a: 'Most banks and NBFCs require a minimum 10% down payment on bike loans, with 20% as the typical standard. A higher down payment reduces the principal, lowers the EMI, and can secure a better interest rate.' },
  { q: 'Can I get a bike loan with no down payment?', a: 'Some dealers and NBFCs offer 100% financing for borrowers with a CIBIL score above 750 and stable salaried income. The interest rate on such loans is typically 1-2% higher than standard loans.' },
  { q: 'What documents are needed for a bike loan?', a: 'Salaried applicants need PAN, Aadhaar, the last 3 months of salary slips, and 6 months of bank statements. Self-employed applicants need ITR for 2 years, 6 months of bank statements, and proof of business existence such as a GST registration.' },
  { q: 'What is the maximum tenure for a bike loan?', a: 'The maximum tenure for a two-wheeler loan in India is 5 years (60 months) at most banks and NBFCs. Some lenders cap at 4 years for used bikes or models over 3 years old.' },
  { q: 'How is bike loan EMI calculated?', a: 'Bike loan EMI is calculated using the standard amortization formula: EMI = P x r x (1+r)^n divided by ((1+r)^n - 1), where P is the loan principal, r is the monthly interest rate (annual rate divided by 1200), and n is the tenure in months. At 9% for 3 years on Rs 1 lakh, the EMI is approximately Rs 3,180.' },
  { q: 'How to reduce bike loan EMI?', a: 'Pay a larger down payment to reduce the principal, improve your CIBIL score above 750 to qualify for a lower rate, extend the tenure to 4 or 5 years, or choose a more affordable bike model. Making a one-time prepayment of even Rs 10,000-20,000 in the first year reduces both the outstanding balance and total interest.' },
  { q: 'What is the difference between ex-showroom and on-road price for a bike?', a: 'The ex-showroom price is what the manufacturer charges the dealer. The on-road price adds registration (typically 8-12% depending on the state), 5-year mandatory third-party insurance, and dealer handling charges. Banks sanction loans on the ex-showroom price only, so on-road extras come from your own funds.' },
  { q: 'Which bank offers the lowest bike loan EMI in India?', a: 'Bajaj Finance at 8.99% and SBI at 9.00% offer some of the lowest two-wheeler loan rates in India as of 2026. At 9% for 3 years, the EMI per lakh borrowed is approximately Rs 3,180. The bank comparison table in the calculator above shows the exact EMI per lakh at each lender for your chosen tenure.' },
  { q: 'Can I prepay a bike loan before the tenure ends?', a: 'Yes, most lenders allow bike loan prepayment after a lock-in period of 6 to 12 months. Some charge a prepayment penalty of 2-5% on the outstanding balance. Bajaj Finance and Hero FinCorp often allow zero foreclosure charges after 12 EMIs. Prepaying even one year early can save 15-25% of the total interest on a 3-year loan.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── CA CTA Component ──────────────────────────────────── */

/* ════════════════════════════════════════════════════════ */
export default function BikeLoanEMIClient() {
  const defaults = {
    bikePrice: 150000,
    downPct: 20,
    rate: 9.0,
    tenureYr: 3,
    processingFeePct: 0,
    showEmiFromDay1: false,
  };
  const { settings, updateSettings } = useCalculatorSettings('bike-loan-emi', defaults);
  const { bikePrice, downPct, rate, tenureYr, processingFeePct, showEmiFromDay1 } = settings;

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  /* ── Math ── */
  const downAmount = Math.round(bikePrice * downPct / 100);
  const loanAmount = bikePrice - downAmount;
  const processingFee = Math.round(loanAmount * processingFeePct / 100);
  const effectiveLoan = loanAmount + processingFee;
  const months = tenureYr * 12;
  const emi = calcEMI(effectiveLoan, rate, months);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - effectiveLoan;
  const principalPct = totalPayment > 0 ? Math.round((effectiveLoan / totalPayment) * 100) : 0;
  const interestPct = 100 - principalPct;

  const amortRows = useMemo(() => buildAmortization(effectiveLoan, rate, months), [effectiveLoan, rate, months]);

  const TENURE_PRESETS = [1, 2, 3, 4, 5];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* ── Header ── */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Bike Loan EMI Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate two-wheeler loan EMI for any bike in India. Set bike price, down payment, rate, and tenure. Compare SBI, HDFC, ICICI, and more.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── Quick Bike Selector (above card) ── */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, color: C.ink3, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 10px' }}>Quick Select a Bike</p>
              <div style={{ overflowX: 'auto', display: 'flex', gap: 7, paddingBottom: 6 }}>
                {BIKE_MODELS.map(model => {
                  const isSelected = bikePrice === model.price;
                  return (
                    <button key={model.name}
                      onClick={() => updateSettings({ bikePrice: model.price })}
                      aria-pressed={isSelected}
                      style={{
                        flexShrink: 0, fontSize: 12, padding: '6px 14px', whiteSpace: 'nowrap',
                        background: isSelected ? C.dark : C.white,
                        border: `${isSelected ? 1.5 : 1}px solid ${isSelected ? C.dark : C.border}`,
                        color: isSelected ? C.lime : C.ink2,
                        fontWeight: isSelected ? 700 : 500,
                        borderRadius: 20, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s',
                      }}>
                      {model.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* ── Inputs ── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Loan Details</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="bike-price" label="Bike Price (Ex-Showroom)"
                        value={bikePrice} min={50000} max={1000000} step={5000}
                        display={fmtIN(bikePrice)} onChange={v => updateSettings({ bikePrice: v })}
                        compact minLabel="Rs 50,000" maxLabel="Rs 10,00,000" />

                      <Slider id="down-payment" label="Down Payment"
                        value={downPct} min={0} max={50} step={1}
                        display={`${downPct}% (${fmtIN(downAmount)})`}
                        onChange={v => updateSettings({ downPct: v })}
                        compact suffix="%" />

                      {/* Derived loan amount box */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.ink2 }}>Loan Amount</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{fmtIN(loanAmount)}</span>
                      </div>

                      <Slider id="interest-rate" label="Interest Rate (% p.a.)"
                        value={rate} min={7} max={24} step={0.1}
                        display={`${rate.toFixed(2)}%`}
                        onChange={v => updateSettings({ rate: v })}
                        compact suffix="%" />

                      {/* Tenure presets */}
                      <div style={{ marginBottom: 18 }}>
                        <label id="tenure-label" style={{ display: 'block', fontSize: 14, color: C.ink2, fontWeight: 400, marginBottom: 8 }}>Tenure</label>
                        <div role="group" aria-labelledby="tenure-label" style={{ display: 'flex', gap: 8 }}>
                          {TENURE_PRESETS.map(yr => {
                            const isActive = tenureYr === yr;
                            return (
                              <button key={yr} onClick={() => updateSettings({ tenureYr: yr })}
                                aria-pressed={isActive}
                                style={{
                                  flex: 1, padding: '7px 6px', fontSize: 13, borderRadius: 8, cursor: 'pointer', fontFamily: INTER,
                                  background: isActive ? C.white : 'transparent',
                                  border: `${isActive ? 1.5 : 1}px solid ${isActive ? C.ink : C.border}`,
                                  color: isActive ? C.ink : C.ink3,
                                  fontWeight: isActive ? 700 : 500,
                                  transition: 'all 0.12s',
                                }}>
                                {yr}Y
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider id="processing-fee" label="Processing Fee (%)"
                        value={processingFeePct} min={0} max={3} step={0.1}
                        display={`${processingFeePct.toFixed(1)}% (${fmtIN(processingFee)})`}
                        onChange={v => updateSettings({ processingFeePct: v })}
                        compact suffix="%" />

                      {processingFee > 0 && (
                        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 13, color: C.ink2 }}>Effective Loan (incl. fee)</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{fmtIN(effectiveLoan)}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, border: `1px solid ${C.border}`, padding: '10px 14px', borderRadius: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 400, color: C.ink2 }}>Show EMI from Day 1</span>
                        <button onClick={() => updateSettings({ showEmiFromDay1: !showEmiFromDay1 })}
                          aria-pressed={showEmiFromDay1}
                          style={{ width: 40, height: 22, borderRadius: 11, background: showEmiFromDay1 ? C.ink : C.border, border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                          <div style={{ width: 18, height: 18, borderRadius: 9, background: C.white, position: 'absolute', top: 2, left: showEmiFromDay1 ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                        </button>
                      </div>
                      {showEmiFromDay1 && (
                        <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px' }}>
                          Some lenders charge the first EMI on the day of purchase. Your first EMI of {fmtIN(Math.round(emi))} is due immediately on disbursal.
                        </p>
                      )}
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 16px' }}>
                        Processing fee is added to the loan principal. At {processingFeePct.toFixed(1)}%, this adds {fmtIN(processingFee)} to your loan amount.
                      </p>

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* ── Results ── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>

                  {/* Donut + Legend: top on desktop */}
                  {!mobile && (
                    <>
                      <div style={{ marginBottom: 20 }}>
                        <DonutChart principal={effectiveLoan} interest={Math.max(0, totalInterest)} />
                      </div>
                      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Primary result: Monthly EMI */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>Monthly EMI</span>
                    <span aria-live="polite" style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                      {fmtIN(Math.round(emi))}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Bike Price', value: fmtIN(bikePrice) },
                    { label: 'Down Payment', value: fmtIN(downAmount) },
                    { label: 'Loan Amount', value: fmtIN(effectiveLoan) },
                    { label: 'Total Interest', value: fmtIN(Math.round(totalInterest)) },
                    { label: 'Total Payment', value: fmtIN(Math.round(totalPayment)) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 13.5, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {principalPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Donut + Legend: bottom on mobile */}
                  {mobile && (
                    <>
                      <div style={{ marginTop: 20, marginBottom: 12 }}>
                        <DonutChart principal={effectiveLoan} interest={Math.max(0, totalInterest)} />
                      </div>
                      <div style={{ display: 'flex', gap: 20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* ── Bank Comparison Table ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Bank-wise EMI Comparison</div>
                  <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Live: updates as you change your inputs above</div>
                </div>
                <span style={{ fontSize: 11, color: C.ink3, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 10px', fontWeight: 600 }}>
                  {tenureYr} yr tenure
                </span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 20px 12px' }}>
                    Monthly EMI per Rs 1 lakh at each bank&apos;s current rate, for your selected tenure of {tenureYr} year{tenureYr > 1 ? 's' : ''}.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Bank</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Type</th>
                      <th scope="col" style={{ ...thS, textAlign: 'center' }}>Rate</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>EMI per Lakh</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Your EMI ({fmtIN(effectiveLoan)})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BANK_RATES_DATA.map((b, i) => {
                      const emiPerLakh = Math.round(calcEMI(100000, b.rate, months));
                      const yourEmi = Math.round(calcEMI(effectiveLoan, b.rate, months));
                      const isLowest = b.rate === Math.min(...BANK_RATES_DATA.map(x => x.rate));
                      return (
                        <tr key={b.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{b.name}</td>
                          <td style={tdC}>{b.type}</td>
                          <td style={{ ...tdC, color: isLowest ? '#1f7a58' : C.ink2, fontWeight: isLowest ? 700 : 400 }}>{b.rate}%</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {emiPerLakh.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: isLowest ? '#1f7a58' : C.ink }}>{fmtIN(yourEmi)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Amortization Schedule ── */}
            {amortRows.length > 0 && (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
                <button onClick={() => setShowAmortization(v => !v)} aria-expanded={showAmortization} aria-controls="bike-amortization-panel"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Year-by-Year Amortization Schedule</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>How {fmtIN(effectiveLoan)} breaks into principal and interest over {tenureYr} year{tenureYr > 1 ? 's' : ''}</div>
                  </div>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: showAmortization ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showAmortization && (
                  <div id="bike-amortization-panel" style={{ padding: '4px 24px 24px' }}>
                    <div style={{ marginBottom: 18 }}><BarChart rows={amortRows} /></div>
                    <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Principal</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Interest</span>
                      </div>
                    </div>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: 11, color: C.ink3 }}>
                        <span>Swipe to see all years</span>
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    )}
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: mobile ? 480 : 'auto' }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                          Year-by-year principal, interest paid, and remaining balance for a {fmtIN(effectiveLoan)} loan at {rate.toFixed(2)}% over {tenureYr} year{tenureYr > 1 ? 's' : ''}.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>Year</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Principal Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Interest Paid</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' }}>Balance Remaining</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortRows.map((r, i) => (
                            <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={tdR}>{r.year}</td>
                              <td style={{ ...tdL, textAlign: 'right', color: '#166534' }}>{fmtIN(r.principal)}</td>
                              <td style={{ ...tdL, textAlign: 'right' }}>{fmtIN(r.interest)}</td>
                              <td style={{ ...tdL, textAlign: 'right' }}>{fmtIN(r.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── WaitlistCard ── */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-bike-loan-emi">
                <h2 style={h2S}>What Is a Bike Loan EMI Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A bike loan EMI calculator computes your fixed monthly payment on a two-wheeler loan based on the bike&apos;s price, down payment, interest rate, and repayment tenure.
                  </p>
                </div>
                <p style={pS}>Every two-wheeler loan in India follows a standard amortization schedule: your monthly EMI stays fixed for the entire tenure, but the portion going toward interest is highest in month one and falls each month as the outstanding balance shrinks. The calculator above runs this math instantly as you move the sliders.</p>
                <p style={pS}>Whether you are buying a Hero Splendor Plus at Rs 78,000 or a Royal Enfield Classic 350 at Rs 1.96 lakh, the same formula applies. Use the quick bike model selector to auto-fill the price and immediately see the EMI, total interest, and bank-by-bank comparison.</p>
                <p style={pS}>The <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>General EMI Calculator</Link> covers any loan type. This page is purpose-built for two-wheelers, with bike model shortcuts, down payment percentage handling, and a bank comparison table tailored to the lenders who actually do two-wheeler financing in India.</p>
              </div>

              <div style={secS} id="bike-loan-emi-formula">
                <h2 style={h2S}>Bike Loan EMI Formula</h2>
                <p style={pS}>The standard reducing-balance formula used by every bank and NBFC in India is:</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <code style={{ fontSize: 14, fontWeight: 700 }}>EMI = P x r x (1+r)^n / ((1+r)^n - 1)</code>
                  <p style={{ fontSize: 12, color: C.ink3, marginTop: 8, marginBottom: 0 }}>
                    P = principal (loan amount after down payment)<br />
                    r = monthly interest rate (annual rate divided by 12, divided by 100)<br />
                    n = tenure in months
                  </p>
                </div>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: RE Hunter 350 at default settings</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Bike price: <strong>Rs 1,50,000</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Down payment (20%): <strong>Rs 30,000</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Loan amount: <strong>Rs 1,20,000</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Rate: 9% p.a., so r = 0.0075 per month</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Tenure: 3 years = 36 months (n = 36)</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>EMI = 1,20,000 x 0.0075 x (1.0075)^36 / ((1.0075)^36 - 1) = <strong>Rs 3,817</strong></span></div>
                <p style={pS}>At 9% and 3 years, every Rs 1 lakh borrowed generates an EMI of approximately Rs 3,180. This rate-tenure combination is the most common for bike loans in India.</p>
              </div>

              <div style={secS} id="bike-loan-interest-rates">
                <h2 style={h2S}>Bike Loan Interest Rates in India 2026</h2>
                <p style={pS}>Two-wheeler loan interest rates range from 8.99% to 24% depending on the lender, your credit profile, income stability, and the bike model. NBFCs and manufacturer-backed finance arms tend to have faster processing but charge higher rates than public sector banks.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Indicative bike loan rates and EMI per Rs 1 lakh for 3-year tenure, as of July 2026.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Lender</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' }}>Type</th>
                        <th scope="col" style={{ ...thS, textAlign: 'center' }}>Rate (p.a.)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>EMI per Lakh (3 yr)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'SBI', type: 'Public Bank', rate: '9.00%', emi: 'Rs 3,180' },
                        { name: 'Bank of Baroda', type: 'Public Bank', rate: '9.10%', emi: 'Rs 3,191' },
                        { name: 'HDFC Bank', type: 'Private Bank', rate: '9.25%', emi: 'Rs 3,204' },
                        { name: 'ICICI Bank', type: 'Private Bank', rate: '9.50%', emi: 'Rs 3,227' },
                        { name: 'Axis Bank', type: 'Private Bank', rate: '9.75%', emi: 'Rs 3,250' },
                        { name: 'Bajaj Finance', type: 'NBFC', rate: '8.99%', emi: 'Rs 3,179' },
                        { name: 'Hero FinCorp', type: 'NBFC', rate: '10.50%', emi: 'Rs 3,320' },
                      ].map((row, i) => (
                        <tr key={row.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.name}</td>
                          <td style={tdC}>{row.type}</td>
                          <td style={tdC}>{row.rate}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.emi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>The live bank comparison table in the calculator above extends these figures to your specific loan amount and adjusts the EMI when you change the tenure. The 3-year column above is the static baseline for comparison.</p>
                <p style={pS}>Government employees and teachers typically qualify for the lower end of each bank&apos;s range. Self-employed applicants and those with a CIBIL score below 700 are usually quoted 2-4 percentage points higher than salaried borrowers with a score above 750.</p>
              </div>

              <div style={secS} id="bike-emi-by-model">
                <h2 style={h2S}>EMI for Popular Bikes in India</h2>
                <p style={pS}>The table below shows the monthly EMI for twelve popular bikes, assuming 20% down payment and a 9% interest rate for 3 years. All prices are approximate ex-showroom Delhi as of July 2026.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Approximate ex-showroom Delhi prices, 20% down payment, loan amount, and EMI at 9% for 3 years.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Bike Model</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Ex-Showroom</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Down (20%)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Loan</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>EMI (9%, 3 yr)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { model: 'Hero Splendor Plus', price: 78000, down: 15600, loan: 62400, emi: 1985 },
                        { model: 'Honda Activa 6G', price: 87000, down: 17400, loan: 69600, emi: 2214 },
                        { model: 'Honda SP 125', price: 85000, down: 17000, loan: 68000, emi: 2163 },
                        { model: 'TVS Raider 125', price: 108000, down: 21600, loan: 86400, emi: 2747 },
                        { model: 'Bajaj Pulsar 150', price: 115000, down: 23000, loan: 92000, emi: 2926 },
                        { model: 'Bajaj Pulsar N160', price: 137000, down: 27400, loan: 109600, emi: 3485 },
                        { model: 'RE Hunter 350', price: 150000, down: 30000, loan: 120000, emi: 3817 },
                        { model: 'RE Bullet 350', price: 177000, down: 35400, loan: 141600, emi: 4503 },
                        { model: 'RE Classic 350', price: 196000, down: 39200, loan: 156800, emi: 4987 },
                        { model: 'Yamaha R15 V4', price: 198000, down: 39600, loan: 158400, emi: 5038 },
                        { model: 'KTM Duke 200', price: 219000, down: 43800, loan: 175200, emi: 5571 },
                        { model: 'KTM Duke 390', price: 315000, down: 63000, loan: 252000, emi: 8013 },
                      ].map((row, i) => (
                        <tr key={row.model} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.model}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.price.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.down.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.loan.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#1f7a58' }}>Rs {row.emi.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Click any model in the quick selector at the top of the calculator to auto-fill the price and see your personalised EMI at the rate and tenure you choose. These table figures are for comparison only; actual rates and prices vary by city and dealer.</p>
              </div>

              <div style={secS} id="down-payment-guide">
                <h2 style={h2S}>How Much Down Payment Should You Make?</h2>
                <p style={pS}>A larger down payment is the single most effective way to reduce a bike loan EMI, because it directly cuts the principal on which interest accrues for the entire tenure.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Effect of down payment on loan, EMI, and total interest for the RE Classic 350 (Rs 1.96 lakh) at 9% for 3 years.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Down Payment</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Loan Amount</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly EMI</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { pct: '10%', down: 19600, loan: 176400, emi: 5610, interest: 25560 },
                        { pct: '20%', down: 39200, loan: 156800, emi: 4987, interest: 22532 },
                        { pct: '30%', down: 58800, loan: 137200, emi: 4363, interest: 19068 },
                        { pct: '40%', down: 78400, loan: 117600, emi: 3740, interest: 16640 },
                        { pct: '50%', down: 98000, loan: 98000, emi: 3116, interest: 12176 },
                      ].map((row, i) => (
                        <tr key={row.pct} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.pct} (Rs {row.down.toLocaleString('en-IN')})</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.loan.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>Rs {row.emi.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.interest.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Going from 10% to 30% down payment on a Rs 1.96 lakh Classic 350 cuts the EMI from Rs 5,610 to Rs 4,363 and saves Rs 6,492 in total interest over 3 years. If you have the liquidity, a higher down payment almost always costs less than the interest saved.</p>
                <p style={pS}>Most banks require a minimum 10% down payment. Zero-down financing exists at select NBFCs and manufacturer arms but comes with a rate premium of 1-2%, which can offset the upfront saving entirely over a 3-to-5-year tenure.</p>
              </div>

              <div style={secS} id="royal-enfield-emi">
                <h2 style={h2S}>Royal Enfield EMI Calculator</h2>
                <p style={pS}>Royal Enfield is the top-selling middleweight motorcycle brand in India, and the Classic 350, Hunter 350, and Bullet 350 are among the most financed bikes in the country.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Royal Enfield EMI breakdown at 9% interest, 3-year tenure, 20% down payment.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Model</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Ex-Showroom</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Loan (80%)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>EMI at 9%</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { model: 'Hunter 350', price: 150000, loan: 120000, emi: 3817, interest: 17412 },
                        { model: 'Bullet 350', price: 177000, loan: 141600, emi: 4503, interest: 20508 },
                        { model: 'Classic 350', price: 196000, loan: 156800, emi: 4987, interest: 22532 },
                      ].map((row, i) => (
                        <tr key={row.model} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.model}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.price.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.loan.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#1f7a58' }}>Rs {row.emi.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.interest.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Royal Enfield has its own finance arm, RE Finance (powered by ICICI Bank), which often runs promotional rates of 8.5-9.5% for existing Royal Enfield customers and at festive seasons. Always compare the dealer finance offer against SBI and Bajaj Finance before signing, since dealer quotes frequently include add-on insurance and accessories that inflate the effective rate.</p>
                <p style={pS}>The Classic 350 and Bullet 350 are also available in longer tenures of 4 and 5 years from most lenders. At a 5-year tenure, the Classic 350 EMI drops to approximately Rs 3,255 per month at 9%, but total interest rises to Rs 38,500, nearly Rs 16,000 more than the 3-year option.</p>
                <p style={pS}>Click &quot;RE Classic 350&quot; or &quot;RE Hunter 350&quot; in the model selector above to auto-fill the price and instantly compute your personalised EMI at your preferred rate and tenure.</p>
              </div>

              <div style={secS} id="hero-honda-emi">
                <h2 style={h2S}>Hero and Honda Bike EMI</h2>
                <p style={pS}>Hero MotoCorp and Honda are India&apos;s two largest two-wheeler manufacturers by volume. Their commuter models are the most financed bikes in tier-2 and tier-3 cities.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Hero and Honda popular models: ex-showroom Delhi price, 20% down, loan amount, and EMI at 9% for 3 years.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Model</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Ex-Showroom</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Loan (80%)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>EMI at 9%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { model: 'Hero Splendor Plus', price: 78000, loan: 62400, emi: 1985 },
                        { model: 'Honda Activa 6G', price: 87000, loan: 69600, emi: 2214 },
                        { model: 'Honda SP 125', price: 85000, loan: 68000, emi: 2163 },
                      ].map((row, i) => (
                        <tr key={row.model} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.model}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.price.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.loan.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: '#1f7a58' }}>Rs {row.emi.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Hero FinCorp, the captive finance arm of Hero MotoCorp, offers loans for Hero bikes starting at 10.50% but with faster processing, often same-day disbursal at a Hero dealership. Honda Access Financial Services runs similar in-dealer financing for Activa and SP 125. Both are convenient but typically cost 1-2% more than SBI or Bank of Baroda.</p>
                <p style={pS}>For commuter bikes under Rs 1 lakh, the absolute interest outgo is modest. On a Splendor Plus at Rs 78,000 with 20% down, the total interest at 9% over 3 years is approximately Rs 6,260 regardless of which bank you use. The rate difference between SBI at 9% and Hero FinCorp at 10.5% on this loan is roughly Rs 700 over the full tenure.</p>
              </div>

              <div style={secS} id="how-to-reduce-bike-emi">
                <h2 style={h2S}>How to Reduce Your Bike Loan EMI</h2>
                <p style={pS}>There are four levers that directly reduce a bike loan EMI, in descending order of impact.</p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Increase the down payment:</strong> paying 30% instead of 20% on a Rs 1.5 lakh bike cuts the EMI from Rs 3,817 to Rs 2,671. This is the largest single lever and costs nothing extra in the long run since it reduces total interest paid.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Improve your CIBIL score before applying:</strong> a score above 750 typically gets a rate 1-2% lower than a score of 650-700. On a Rs 1.2 lakh loan over 3 years, that 1% difference saves approximately Rs 1,900 in total interest.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Extend the tenure to 4 or 5 years:</strong> a 5-year tenure drops the RE Classic 350 EMI from Rs 4,987 to Rs 3,255 at the same rate. The tradeoff is higher total interest, so this works best when monthly cash flow is the binding constraint.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Compare lenders before accepting the dealer offer:</strong> dealers typically push their captive finance arm, which is rarely the cheapest. Getting a pre-approved offer from SBI or Bajaj Finance before visiting the showroom gives you negotiating leverage and often results in a 0.5-1% lower rate.
                  </li>
                </ol>
                <p style={pS}>One more option after disbursal: making a one-time prepayment of Rs 10,000-20,000 in the first 6-12 months reduces the outstanding principal before most of the interest has accrued, and saves substantially more than the same payment made in year 3. Use the <Link href="/calculators/loan-prepayment-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Loan Prepayment Calculator</Link> to model the exact saving.</p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <p style={pS}>Four steps get you an accurate bike EMI estimate in under a minute.</p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Select a bike model or set a custom price:</strong> click any model pill at the top to auto-fill the ex-showroom price, or move the bike price slider for a custom amount between Rs 50,000 and Rs 10,00,000.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Set the down payment percentage:</strong> move the down payment slider between 0% and 50%. The calculator shows both the percentage and the rupee amount, and instantly derives the net loan amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Enter the interest rate and select a tenure:</strong> adjust the rate between 7% and 24% to match your lender&apos;s offer, then click a year preset (1Y to 5Y) to set the tenure.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong>Review the EMI, bank table, and amortization schedule:</strong> the output panel shows monthly EMI, total interest, and total payment with a principal-interest donut chart. The bank comparison table shows how your EMI changes at different lenders. Expand the amortization schedule for a year-by-year breakdown.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are indicative estimates based on the inputs you provide and do not represent a loan offer from any bank or NBFC. Actual EMI, interest rate, and eligibility depend on each lender&apos;s underwriting policy, your complete credit history, income documentation, and the bike model financed. Ex-showroom prices are approximate and vary by city and dealer. This tool is for educational and planning purposes only and does not constitute financial advice. Consult your bank or a SEBI-registered financial adviser before making borrowing decisions.
                </p>
              </div>

            </article>
          </div>

          {/* ── SIDEBAR ── */}
          <style>{`.bike-emi-sidebar::-webkit-scrollbar{width:5px}.bike-emi-sidebar::-webkit-scrollbar-track{background:transparent}.bike-emi-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.bike-emi-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="bike-emi-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <SiteFooter columns={pipeColumns([
              { hd: 'Calculators', links: ['/calculators/personal-loan-calculator|Personal Loan', '/calculators/mortgage-calculator|Home Loan EMI', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/car-loan-calculator|Car Loan'] },
              { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
              { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
            ])} />
    </div>
  );
}

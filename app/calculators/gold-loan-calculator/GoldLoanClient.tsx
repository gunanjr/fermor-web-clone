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

/* ── Math ──────────────────────────────────────────────── */
function calcEMI(p: number, r: number, n: number) {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

/* Gold rate per gram by purity (approximate June 2026 rates) */
const PURITY_FACTOR: Record<string, number> = { '24K': 1.0, '22K': 0.9167, '18K': 0.75 };
const BASE_GOLD_RATE_24K = 14080; /* approx per gram, July 2026 */

const LENDER_RATES = [
  { name: 'SBI', rate: 8.00, maxLTV: 75, maxTenure: 36, processing: '0.50%', type: 'Bank' },
  { name: 'Central Bank of India', rate: 8.05, maxLTV: 75, maxTenure: 36, processing: '0.50%', type: 'Bank' },
  { name: 'Federal Bank', rate: 8.50, maxLTV: 75, maxTenure: 36, processing: '0.25%', type: 'Bank' },
  { name: 'PNB', rate: 8.50, maxLTV: 75, maxTenure: 12, processing: '0.30%', type: 'Bank' },
  { name: 'Bank of India', rate: 8.60, maxLTV: 75, maxTenure: 36, processing: '0.50%', type: 'Bank' },
  { name: 'Canara Bank', rate: 8.75, maxLTV: 75, maxTenure: 12, processing: '0.30%', type: 'Bank' },
  { name: 'HDFC Bank', rate: 9.10, maxLTV: 75, maxTenure: 36, processing: '1.00%', type: 'Bank' },
  { name: 'Union Bank of India', rate: 9.10, maxLTV: 75, maxTenure: 36, processing: '0.50%', type: 'Bank' },
  { name: 'BOB', rate: 9.15, maxLTV: 75, maxTenure: 24, processing: '0.50%', type: 'Bank' },
  { name: 'ICICI Bank', rate: 9.15, maxLTV: 75, maxTenure: 12, processing: '1.00%', type: 'Bank' },
  { name: 'Axis Bank', rate: 9.75, maxLTV: 75, maxTenure: 24, processing: '1.00%', type: 'Bank' },
  { name: 'Bajaj Finance', rate: 9.90, maxLTV: 75, maxTenure: 12, processing: '1.50%', type: 'NBFC' },
  { name: 'Karur Vysya Bank', rate: 9.90, maxLTV: 75, maxTenure: 12, processing: '1.00%', type: 'Bank' },
  { name: 'Manappuram', rate: 9.90, maxLTV: 75, maxTenure: 12, processing: '1.00%', type: 'NBFC' },
  { name: 'Kotak Mahindra Bank', rate: 10.56, maxLTV: 75, maxTenure: 24, processing: '1.00%', type: 'Bank' },
  { name: 'IIFL', rate: 11.00, maxLTV: 75, maxTenure: 24, processing: '1.50%', type: 'NBFC' },
  { name: 'Muthoot Finance', rate: 12.00, maxLTV: 75, maxTenure: 36, processing: '1.00%', type: 'NBFC' },
  { name: 'Shriram Finance', rate: 13.00, maxLTV: 75, maxTenure: 12, processing: '1.50%', type: 'NBFC' },
  { name: 'SBFC', rate: 14.00, maxLTV: 75, maxTenure: 12, processing: '1.50%', type: 'NBFC' },
];

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg role="img" aria-label={`Principal vs Interest: ${pPct}% principal, ${100 - pPct}% interest`}
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

/* ── Amortization (EMI mode only) ──────────────────────── */
type YearRow = { year: number; principal: number; interest: number; balance: number };

function buildAmortization(loan: number, annualRate: number, months: number): YearRow[] {
  if (loan <= 0 || months <= 0) return [];
  const emiVal = calcEMI(loan, annualRate, months);
  const m = annualRate / 12 / 100;
  let balance = loan;
  const rows: YearRow[] = [];
  let year = 1, yPrincipal = 0, yInterest = 0, monthInYear = 0;
  for (let month = 1; month <= months; month++) {
    const interest = balance * m;
    const principal = emiVal - interest;
    balance = Math.max(0, balance - principal);
    yPrincipal += principal; yInterest += interest; monthInYear++;
    if (monthInYear === 12 || month === months) {
      rows.push({ year, principal: Math.round(yPrincipal), interest: Math.round(yInterest), balance: Math.round(balance) });
      year++; yPrincipal = 0; yInterest = 0; monthInYear = 0;
    }
  }
  return rows;
}

function BarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.principal + r.interest));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year principal and interest breakdown for the eligible gold loan"
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
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>{row.year}</text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ── Slider ────────────────────────────────────────────── */
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
  const commit = () => { setEditing(false); const n = parseFloat(raw.replace(/[^0-9.]/g, '')); if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n))); };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}</span>
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

/* ── GoldLoanSnapshot (white facts box) ────────────────── */
function GoldLoanSnapshot() {
  const rows = [
    { label: 'LTV ceiling (loans up to Rs 2.5L)', value: '85%' },
    { label: 'LTV ceiling (Rs 2.5L - 5L)', value: '80%' },
    { label: 'LTV ceiling (above Rs 5L)', value: '75%' },
    { label: 'Min gold purity accepted', value: '18K' },
    { label: 'Fastest disbursal (NBFC)', value: '15-30 min' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Gold Loan Snapshot</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/loan-eligibility-calculator', label: 'Loan Eligibility Calculator' },
  { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator' },
  { href: '/calculators/emi-calculator', label: 'EMI Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/business-loan-eligibility-calculator', label: 'Business Loan Eligibility' },
];
const MORE = [
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/car-loan-calculator', label: 'Car Loan Calculator' },
  { href: '/calculators/credit-card-emi-calculator', label: 'Credit Card EMI Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
];

/* ── FAQ ───────────────────────────────────────────────── */
const FAQS = [
  { q: 'How much gold loan per gram for 22K gold?', a: 'For 22K gold at Rs 12,900/gram: small loans get 85% LTV (Rs 10,965/gram), mid-size loans get 80% LTV (Rs 10,320/gram), large loans get 75% LTV (Rs 9,675/gram). SBI at 8% p.a. gives the same per-gram amount as any other lender at any rate; the rate only changes your monthly EMI and total interest, not the loan amount.' },
  { q: 'Which lender gives the highest per-gram gold loan?', a: 'All lenders at the same LTV tier offer the same per-gram loan amount for the same gold purity. SBI, HDFC, Muthoot, KVB, and Manappuram all follow RBI\'s LTV ceilings. The difference is in interest rate (SBI 8% vs Muthoot 12%), processing time (SBI 1-2 hours vs Muthoot 20 minutes), and fees. Use the calculator to compare rates side by side.' },
  { q: 'What is the RBI rule on gold loan LTV in 2026?', a: 'RBI\'s tiered structure caps loans at 85% LTV (under Rs 2.5L), 80% LTV (Rs 2.5L-5L), and 75% LTV (above Rs 5L). This replaced the flat 75% rule. Your LTV tier is set by your total pledged gold value, not your lender or loan purpose.' },
  { q: 'How much gold do I need for Rs 1 lakh gold loan?', a: 'For Rs 1 lakh, you need gold worth Rs 1,17,647 (at 85% LTV), roughly 9.1 grams of 22K gold at Rs 12,900/gram. This falls in the small-loan tier, so you get the best LTV rate at 85%.' },
  { q: 'How much gold do I need for a Rs 5 lakh loan?', a: 'A Rs 5 lakh loan needs gold worth Rs 6.67 lakh, roughly 52 grams of 22K gold, since loans that size fall in the 75% LTV tier under current RBI limits.' },
  { q: 'How much gold do I need for a Rs 10 lakh loan?', a: 'A Rs 10 lakh gold loan needs gold worth approximately Rs 13.33 lakh at the 75% LTV tier, which is roughly 103 grams of 22-karat gold at Rs 12,900 per gram.' },
  { q: 'How much loan can I get for 1 gram of gold?', a: 'One gram of 22-karat gold, valued at approximately Rs 12,900, qualifies for the small-loan 85% LTV tier, giving an eligible loan of roughly Rs 10,971. This is well within the highest RBI LTV tier since the total value is far below Rs 2.5 lakh.' },
  { q: 'How much loan can I get for 10 grams of gold?', a: 'Ten grams of 22-karat gold, valued at approximately Rs 1,29,070, qualifies for the 85% LTV tier, giving an eligible loan of roughly Rs 1,09,710.' },
  { q: 'What is the difference between EMI and bullet repayment?', a: 'In EMI repayment, you pay both principal and interest in equal monthly instalments. In bullet repayment, you pay only interest during the tenure and repay the entire principal at maturity. Bullet has lower monthly outflow but requires a lump sum at the end. EMI suits salaried borrowers; bullet suits business owners with irregular cash flows.' },
  { q: 'What is a gold loan overdraft (OD)?', a: 'A Gold OD sanctions a credit limit against your gold rather than a fixed loan amount. Interest is charged daily only on the amount you actually withdraw, and you can deposit and redraw funds flexibly within the tenure, similar to a current account overdraft.' },
  { q: 'Which bank gives the highest gold loan per gram?', a: 'Among banks, SBI, Union Bank, and Canara Bank typically offer the lowest interest rates, which effectively means more of your eligible LTV reaches you as usable loan after fees. Among NBFCs, Muthoot Finance and Manappuram Finance often match bank-level LTV but at a higher interest rate for faster processing.' },
  { q: 'Is gold loan better than personal loan?', a: 'Gold loans have lower interest rates, roughly 8.5-18% versus 10.5-24% for personal loans, because gold serves as collateral. Gold loans also process faster (15 minutes to 2 hours versus 1-3 days) with no credit score requirement. The trade-off is the risk of losing your jewellery if you default.' },
  { q: 'What gold purity is accepted for gold loans?', a: 'Banks and NBFCs accept gold jewellery of 18-karat purity and above. 22-karat gold gets the highest valuation per gram. 24-karat coins and bars are accepted by some lenders but not all. Gold-plated, white gold, and platinum jewellery are not accepted, and stone or non-gold weight is deducted during valuation.' },
  { q: 'Can I prepay my gold loan without penalty?', a: 'Most banks allow gold loan prepayment without penalty. SBI, HDFC Bank, and Canara Bank charge zero foreclosure fees after the initial lock-in. Some NBFCs charge 1-2% for closure within the first 30-180 days. Micro and small enterprises repaying from their own funds are exempt from this charge under RBI norms.' },
  { q: 'What happens if I do not repay my gold loan?', a: 'If you default, the lender sends multiple notices over 30-90 days. After the notice period, the lender auctions your pledged gold to recover the outstanding amount. Any surplus after recovering principal, interest, and auction costs is returned to you.' },
  { q: 'How is gold valued for a gold loan?', a: 'Lenders assess gold in three steps: a purity test using an electronic karat meter, a net weight measurement after deducting stones and non-gold parts, and a valuation using the lender\'s internal rate, typically 5-10% below market spot price for 24K, adjusted for purity.' },
  { q: 'What is the maximum gold loan tenure?', a: 'Tenure varies by lender: SBI and Muthoot offer up to 36 months, HDFC Bank and Axis Bank up to 24 months, and Manappuram up to 12 months for most schemes. Some NBFCs offer renewal options where you pay interest and get a fresh valuation instead of closing the loan.' },
  { q: 'Is gold loan interest tax deductible?', a: 'Gold loan interest is not tax deductible if used for personal purposes. If used for business, the interest is a deductible business expense. If used for home construction or renovation, interest up to Rs 30,000 per year may be deductible under Section 24. Consult a CA for advice specific to your situation.' },
  { q: 'What is the SBI gold loan interest rate and per-gram loan?', a: 'SBI gold loan rates start at 8.00% p.a., the lowest among banks. For 50 grams of 22K gold at 75% LTV, SBI gives Rs 4.84 lakh at 8% versus Muthoot at Rs 4.84 lakh at 12%. The loan amount is the same; SBI\'s lower rate saves Rs 19,500 in total interest over 12 months. Processing fee: 0.50%.' },
  { q: 'What is the KVB (Karur Vysya Bank) gold loan rate?', a: 'Karur Vysya Bank quotes 9.90% p.a. on gold loans with a 1% processing fee and max tenure of 12 months. For the same 50-gram example, KVB gives Rs 4.84 lakh at 9.90%, costing Rs 24,500 in annual interest. Fastest approval among smaller banks.' },
  { q: 'What is the HDFC Bank gold loan interest rate?', a: 'HDFC Bank gold loan rates start at 9.10% p.a. up to 18% depending on scheme. For 50 grams at 75% LTV, HDFC gives Rs 4.84 lakh at 9.10%, with a 1-1.5% processing fee and tenure up to 36 months. Slowest among top lenders: 3-4 hours approval.' },
  { q: 'What is Canara Bank gold loan rate?', a: 'Canara Bank quotes 8.75% p.a. on gold loans, competitive with most government banks. Processing fee 0.30% and max tenure 12 months. For Rs 1 lakh, total interest over 12 months: Rs 8,875 at Canara versus Rs 8,000 at SBI versus Rs 12,000 at Muthoot.' },
  { q: 'What is Manappuram gold loan rate and calculator?', a: 'Manappuram Finance quotes 9.90-24% p.a. depending on scheme, with processing in 15-30 minutes. For Rs 1 lakh at 9.90%, monthly interest is Rs 825. At higher schemes (18-24%), it goes up to Rs 1,500-2,000/month. Use this calculator to compare Manappuram against SBI and Muthoot by selecting the rate in the sidebar.' },
  { q: 'Are Muthoot Finance and Muthoot Fincorp the same company?', a: 'No. Muthoot Finance Ltd (NSE: MUTHOOTFIN) is the larger, listed NBFC. Muthoot Fincorp Ltd is a separate private company from a different family branch. Both offer 12-26% rates but different schemes and branch networks. Confirm which entity you\'re visiting before applying.' },
  { q: 'Is a gold monetization scheme the same as a gold loan?', a: 'No. A Gold Monetization Scheme is a savings product where you deposit idle gold with a bank to earn interest, and the bank may lend or sell it. A gold loan is the opposite: you pledge gold as collateral to borrow cash. They serve different purposes and are not interchangeable.' },
  { q: 'How fast can I get a gold loan?', a: 'Gold loans are the fastest loan product in India. Muthoot and Manappuram process loans in 15-30 minutes. Banks like SBI and HDFC take 1-2 hours for existing customers and up to a day for new customers. Minimal documentation is needed: ID proof, address proof, and the gold jewellery itself.' },
  { q: 'What fees apply to a gold loan besides interest?', a: 'Expect a processing fee up to 1% of the loan amount plus GST, a valuation charge of roughly Rs 350-1,500 depending on loan size, and a premature closure charge of 1-2% if you close within 30-180 days. Most lenders waive foreclosure charges after 180 days, and public banks like SBI often charge zero.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Article helpers ───────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* ════════════════════════════════════════════════════════ */
export default function GoldLoanClient() {
  const defaultSettings = { goldWeight: 50, purity: '22K', goldRate: Math.round(BASE_GOLD_RATE_24K * PURITY_FACTOR['22K']), ltvPct: 75, rate: 10.5, tenureMo: 12, repayMode: 'emi' };
  const { settings, updateSettings } = useCalculatorSettings('gold-loan-calculator', defaultSettings);
  const { goldWeight, purity, goldRate, ltvPct, rate, tenureMo, repayMode } = settings;

  const setGoldWeight = (v: number) => updateSettings({ goldWeight: v });
  const [liveRate24K, setLiveRate24K] = useState<number | null>(null);
  const setPurity = (v: string) => {
    const base = liveRate24K ?? BASE_GOLD_RATE_24K;
    updateSettings({ purity: v, goldRate: Math.round(base * (PURITY_FACTOR[v] || 0.9167)) });
  };
  const setGoldRate = (v: number) => updateSettings({ goldRate: v });
  const setLtvPct = (v: number) => updateSettings({ ltvPct: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setTenureMo = (v: number) => updateSettings({ tenureMo: v });
  const setRepayMode = (v: string) => updateSettings({ repayMode: v });

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAmortization, setShowAmortization] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  useEffect(() => {
    fetch('/api/commodities/GOLD')
      .then(r => r.ok ? r.json() : null)
      .then((d: { price_per_gram_inr?: number } | null) => {
        if (!d?.price_per_gram_inr) return;
        const r24 = d.price_per_gram_inr;
        setLiveRate24K(r24);
        const defaultRate = Math.round(BASE_GOLD_RATE_24K * (PURITY_FACTOR[purity] || 0.9167));
        if (Math.abs(goldRate - defaultRate) < 1000) {
          updateSettings({ goldRate: Math.round(r24 * (PURITY_FACTOR[purity] || 0.9167)) });
        }
      })
      .catch(() => {});
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const goldValue = goldWeight * goldRate;
  const rbiMaxLtv = goldValue <= 250000 ? 85 : goldValue <= 500000 ? 80 : 75;
  // If weight/rate/purity changes push the gold value into a lower LTV tier, the previously
  // selected ltvPct can end up above the new legal ceiling. Clamp it down automatically so the
  // displayed loan amount can never exceed what RBI actually allows for this gold value.
  useEffect(() => {
    if (ltvPct > rbiMaxLtv) updateSettings({ ltvPct: rbiMaxLtv });
  }, [rbiMaxLtv]); // eslint-disable-line react-hooks/exhaustive-deps
  const loanAmount = Math.round(goldValue * ltvPct / 100);
  const emi = useMemo(() => calcEMI(loanAmount, rate, tenureMo), [loanAmount, rate, tenureMo]);
  const bulletInterestMonthly = loanAmount * rate / 12 / 100;
  const monthlyPayment = repayMode === 'emi' ? emi : bulletInterestMonthly;
  const totalInterest = repayMode === 'emi' ? (emi * tenureMo - loanAmount) : (bulletInterestMonthly * tenureMo);
  const totalPayable = loanAmount + totalInterest;
  const prinPct = totalPayable > 0 ? Math.round((loanAmount / totalPayable) * 100) : 0;
  const intPct = 100 - prinPct;
  const perGramLoan = goldWeight > 0 ? Math.round(loanAmount / goldWeight) : 0;

  const amortRows = useMemo(() => repayMode === 'emi' ? buildAmortization(loanAmount, rate, tenureMo) : [], [repayMode, loanAmount, rate, tenureMo]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Gold Loan Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Get your per-gram loan amount instantly. Compare SBI 8%, HDFC 9.1%, Muthoot 12%, and 16 more lenders. See exact EMI, total interest, and RBI LTV limits.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Gold Details</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="gold-weight" label="Gold Weight (grams)" value={goldWeight} min={1} max={500} step={1}
                        display={`${goldWeight} g`} onChange={setGoldWeight} compact={mobile} />

                      {/* Purity selector */}
                      <div style={{ marginBottom: mobile ? 18 : 28 }}>
                        <label id="purity-label" style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Gold Purity</label>
                        <div role="group" aria-labelledby="purity-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {['24K', '22K', '18K'].map(p => (
                            <button key={p} onClick={() => setPurity(p)} aria-pressed={purity === p}
                              style={{ flex: 1, padding: '10px 0', fontSize: 13, fontWeight: purity === p ? 700 : 400, background: purity === p ? C.white : 'transparent', color: purity === p ? C.ink : C.ink3, border: 'none', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider id="gold-rate" label={`Gold Rate (per gram, ${purity})`} value={goldRate} min={5000} max={20000} step={50}
                        display={fmtIN(goldRate)} onChange={setGoldRate} compact={mobile} />
                      {liveRate24K && (
                        <div style={{ marginTop: -28, marginBottom: 20, fontSize: 11, color: C.ink2, textAlign: 'right', fontFamily: INTER }}>
                          Live IBJA rate applied
                        </div>
                      )}

                      {/* Gold value display */}
                      <div style={{ marginBottom: mobile ? 18 : 28, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: C.ink }}>
                          <span>Total Gold Value ({goldWeight}g x {fmtIN(goldRate)})</span>
                          <span style={{ fontWeight: 700 }}>{fmtC(goldValue)}</span>
                        </div>
                      </div>

                      <Slider id="ltv-pct" label="LTV Ratio (%)" value={ltvPct} min={50} max={rbiMaxLtv} step={1}
                        display={`${ltvPct}% (${fmtC(loanAmount)})`} onChange={setLtvPct} compact={mobile} />
                      <div style={{ marginTop: -20, marginBottom: 20, fontSize: 11, color: C.ink3, textAlign: 'right', fontFamily: INTER }}>
                        {ltvPct === rbiMaxLtv ? `At the RBI maximum for this gold value (${rbiMaxLtv}%)` : `RBI allows up to ${rbiMaxLtv}% for this gold value`}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="interest-rate" label="Interest Rate (% p.a.)" value={rate} min={7} max={26} step={0.25}
                        display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                      <Slider id="tenure-mo" label="Loan Tenure (months)" value={tenureMo} min={1} max={36} step={1}
                        display={`${tenureMo} mo`} onChange={setTenureMo} compact={mobile} />

                      {/* Repayment mode */}
                      <div style={{ marginBottom: 24 }}>
                        <label id="repay-mode-label" style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Repayment Mode</label>
                        <div role="group" aria-labelledby="repay-mode-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {[{ id: 'emi', label: 'EMI (Principal + Interest)' }, { id: 'bullet', label: 'Bullet (Interest Only)' }].map(m => (
                            <button key={m.id} onClick={() => setRepayMode(m.id)} aria-pressed={repayMode === m.id}
                              style={{ flex: 1, padding: '10px 8px', fontSize: 12, fontWeight: repayMode === m.id ? 700 : 400, background: repayMode === m.id ? C.white : 'transparent', color: repayMode === m.id ? C.ink : C.ink3, border: 'none', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                              {m.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                    <DonutChart principal={loanAmount} interest={totalInterest} />
                  </div>
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" /><span style={{ fontSize: 13, color: C.ink2 }}>Principal</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" /><span style={{ fontSize: 13, color: C.ink2 }}>Interest</span></div>
                  </div>

                  {/* Monthly payment highlight */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 18px' : '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      {repayMode === 'emi' ? 'Monthly EMI' : 'Monthly Interest'}
                    </span>
                    <span aria-live="polite" style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(monthlyPayment)}</span>
                  </div>

                  {[
                    { label: 'Loan amount', value: fmtC(loanAmount) },
                    { label: 'Per gram loan', value: fmtIN(perGramLoan) + '/g' },
                    { label: 'Total interest', value: fmtC(totalInterest) },
                    { label: repayMode === 'bullet' ? 'Principal at maturity' : 'Total payable', value: fmtC(repayMode === 'bullet' ? loanAmount : totalPayable) },
                    { label: 'Total repayment', value: fmtC(totalPayable) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '14px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {prinPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {intPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amortization Schedule (EMI mode only) */}
            {repayMode === 'emi' && amortRows.length > 0 && (
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
                <button onClick={() => setShowAmortization(v => !v)} aria-expanded={showAmortization} aria-controls="gold-amortization-panel"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: INTER }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Amortization Schedule</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>How {fmtC(loanAmount)} breaks into principal and interest over {tenureMo} months</div>
                  </div>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transform: showAmortization ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                {showAmortization && (
                  <div id="gold-amortization-panel" style={{ padding: '4px 24px 24px' }}>
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
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}><polyline points="9 18 15 12 9 6" /></svg>
                        <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      </div>
                    )}
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: mobile ? 480 : 'auto' }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                          Year-by-year principal, interest, and remaining balance for a {fmtC(loanAmount)} gold loan at {rate.toFixed(2)}% over {tenureMo} months.
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
                              <td style={{ ...tdL, textAlign: 'right', color: '#166534' }}>{fmtC(r.principal)}</td>
                              <td style={{ ...tdL, textAlign: 'right', color: '#B45309' }}>{fmtC(r.interest)}</td>
                              <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(r.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Save + CA CTA */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-gold-loan">
                <h2 style={h2S}>Gold Loan Calculator: Get Your Per-Gram Rate Instantly</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Enter your gold weight and purity, and get the exact loan amount you qualify for at each RBI tier. Compare rates from SBI (8%), HDFC (9.1%), Muthoot (12%), and 16 other banks and NBFCs.
                  </p>
                </div>
                <p style={pS}>Gold loans disburse in 15 minutes to 2 hours without a credit score check. No income proof needed if you pledge gold. Banks like SBI offer rates as low as 8% p.a.; NBFCs like Muthoot process faster at 12-26% depending on scheme.</p>
                <p style={pS}>This calculator applies the tiered RBI LTV ceiling live. Small loans get 85% LTV; larger ones cap at 75%. It shows EMI, bullet repayment, total interest, per-gram loan amount, and a year-by-year amortization schedule.</p>
                <p style={pS}>Gold loan, jewel loan, and loan against gold mean the same thing in India. The calculator supports all three terms and all lender types across India.</p>
              </div>

              <div style={secS} id="bank-specific-rates">
                <h2 style={h2S}>Bank-by-Bank Gold Loan Rates and Per-Gram Calculations</h2>
                <p style={pS}>SBI gold loans start at 8.00% p.a., the lowest among government banks. KVB (Karur Vysya Bank) quotes 9.90% with faster approval. HDFC Bank and Union Bank offer 9.10% to 9.75% with tenure up to 36 months.</p>
                <p style={pS}>For every 50 grams of 22K gold at Rs 12,900/gram: SBI gives Rs 4,33,500 at 75% LTV (Rs 8,670/gram); HDFC gives the same amount at a slightly higher rate. Muthoot Finance processes the same loan in 20 minutes at 12-14% versus 3-4 hours for SBI.</p>
                <p style={pS}>Use the calculator above to enter your gold weight, select a purity, and choose your preferred lender from the sidebar to see your exact per-gram loan rate. The sidebar shows rates for all 19 lenders instantly.</p>
              </div>

              <div style={secS} id="gold-loan-formula">
                <h2 style={h2S}>Gold Loan Formula: How Is the Loan Amount Calculated?</h2>
                <p style={pS}>The gold loan amount is determined by three factors: gold weight, per-gram rate based on purity, and the LTV ratio.</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0', background: '#f8f9f9', borderRadius: 8, textAlign: 'center', border: `1px solid ${C.border}` }}>
                  Loan Amount = Gold Weight (g) x Rate Per Gram x LTV%
                </p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Gold Weight:</strong> Net weight of gold after deducting stones and non-gold parts</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Rate Per Gram:</strong> Lender internal rate based on purity. For 22K gold, approximately Rs 12,900/g (July 2026)</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>LTV Ratio:</strong> Tiered by loan size under current RBI rules, covered in detail below</span></div>
                <p style={{ ...pS, fontWeight: 600, color: C.ink }}>Worked example: 50 grams of 22K gold</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Gold value: 50g x Rs 12,900 = <strong>Rs 6,45,000</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>This is above the Rs 5 lakh tier, so the ceiling is 75% LTV: Rs 6,45,000 x 0.75 = <strong>Rs 4,83,750</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Per gram loan: Rs 4,83,750 / 50 = <strong>Rs 9,675/gram</strong></span></div>
              </div>

              <div style={secS} id="rbi-ltv-rules">
                <h2 style={h2S}>RBI Gold Loan LTV Rules: The Tiered Structure</h2>
                <p style={pS}>The Loan-to-Value ceiling for gold loans in India is not a single flat number. It is tiered by loan size under RBI&apos;s directions on lending against gold and silver collateral.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>RBI maximum LTV ceiling by gold loan value, current tiered structure.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Gold Value (Loan Size)</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max LTV Ceiling</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Example: Max Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { r: 'Up to Rs 2.5 lakh', ltv: '85%', ex: 'Rs 1.5 lakh gold value -> Rs 1,27,500 loan' },
                        { r: 'Rs 2.5 lakh to Rs 5 lakh', ltv: '80%', ex: 'Rs 4 lakh gold value -> Rs 3,20,000 loan' },
                        { r: 'Above Rs 5 lakh', ltv: '75%', ex: 'Rs 8 lakh gold value -> Rs 6,00,000 loan' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{row.r}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{row.ltv}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.ex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Smaller, more affordable loans get the highest LTV because they carry less absolute risk for the lender. This replaced the older flat 75% rule that most gold loan content online still quotes. Individual lenders can set their own ceiling below the RBI maximum, so always confirm the exact LTV your bank or NBFC offers before pledging.</p>
              </div>

              <div style={secS} id="gold-rate-per-gram">
                <h2 style={h2S}>Gold Loan Rate Per Gram: 18K, 22K, and 24K</h2>
                <p style={pS}>The per-gram loan amount varies by gold purity and by the LTV tier your total gold value falls into. Higher purity means a higher rate per gram; a larger total value means a lower LTV ceiling.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Approximate gold loan amount per gram at the RBI LTV ceiling, small-loan tier (85%), July 2026 rates.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Purity</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Market Rate/g</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>At 85% LTV</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>At 80% LTV</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>At 75% LTV</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { p: '24K (999)', mkt: 14080 },
                        { p: '22K (916)', mkt: 12907 },
                        { p: '18K (750)', mkt: 10560 },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.p}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.mkt.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>Rs {Math.round(row.mkt * 0.85).toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {Math.round(row.mkt * 0.80).toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {Math.round(row.mkt * 0.75).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="gold-loan-by-weight">
                <h2 style={h2S}>Gold Loan Amount by Weight: 1 Gram to 500 Grams</h2>
                <p style={pS}>Here is how much loan you can get across common gold weights, using 22K gold at Rs 12,907/g and the tiered RBI LTV ceiling that applies at each value.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Eligible gold loan amount by weight, 22K gold at Rs 12,907/g, tiered RBI LTV applied automatically.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Gold Weight</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Gold Value</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>LTV Tier</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Eligible Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { g: 1, value: 12907, ltv: 85, loan: 10971 },
                        { g: 2, value: 25814, ltv: 85, loan: 21942 },
                        { g: 5, value: 64535, ltv: 85, loan: 54855 },
                        { g: 8, value: 103256, ltv: 85, loan: 87768 },
                        { g: 10, value: 129070, ltv: 85, loan: 109710 },
                        { g: 15, value: 193605, ltv: 85, loan: 164564 },
                        { g: 20, value: 258140, ltv: 80, loan: 206512 },
                        { g: 25, value: 322675, ltv: 80, loan: 258140 },
                        { g: 38, value: 490466, ltv: 80, loan: 392373 },
                        { g: 50, value: 645350, ltv: 75, loan: 484013 },
                        { g: 75, value: 968025, ltv: 75, loan: 726019 },
                        { g: 100, value: 1290700, ltv: 75, loan: 968025 },
                        { g: 200, value: 2581400, ltv: 75, loan: 1936050 },
                        { g: 500, value: 6453500, ltv: 75, loan: 4840125 },
                      ].map((row, i) => (
                        <tr key={row.g} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.g} gram{row.g > 1 ? 's' : ''}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.value.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.ltv}%</td>
                          <td style={{ ...tdR, textAlign: 'right', color: C.ink }}>Rs {row.loan.toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>At today&apos;s gold price, the 80% LTV tier starts at just under 20 grams and the 75% tier starts at just under 39 grams. Once total gold value crosses Rs 2.5 lakh, the ceiling drops from 85% to 80%, so the marginal loan per gram falls. This is exactly why the calculator above computes the tier live rather than applying one fixed percentage, and why this table needs updating whenever gold prices move meaningfully.</p>
              </div>

              <div style={secS} id="reverse-calculator">
                <h2 style={h2S}>Reverse Gold Loan Calculator: How Much Gold Do You Need?</h2>
                <p style={pS}>If you know the loan amount you need and want to work out how much gold to carry in, use this table. It is the reverse of the main calculation above.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Gold weight required for a target loan amount, 22K gold at Rs 12,907/g, tiered RBI LTV applied.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Target Loan Amount</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>LTV Tier Used</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Gold Value Needed</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>22K Gold Needed</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { t: 50000, ltv: 85, value: 58824, g: '4.6g' },
                        { t: 100000, ltv: 85, value: 117647, g: '9.1g' },
                        { t: 200000, ltv: 85, value: 235294, g: '18.2g' },
                        { t: 300000, ltv: 80, value: 375000, g: '29.1g' },
                        { t: 500000, ltv: 75, value: 666667, g: '51.7g' },
                        { t: 1000000, ltv: 75, value: 1333333, g: '103.3g' },
                      ].map((row, i) => (
                        <tr key={row.t} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>Rs {row.t.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{row.ltv}%</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.value.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{row.g}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>For example, someone asking &quot;how much gold do I need for a Rs 5 lakh loan&quot; needs roughly 52 grams of 22K gold, since a loan that size falls in the 75% LTV tier and needs Rs 6.67 lakh of gold value to back it.</p>
              </div>

              <div style={secS} id="lender-comparison">
                <h2 style={h2S}>Gold Loan Interest Rates: 19 Lenders Compared (July 2026)</h2>
                <p style={pS}>Interest rates for gold loans in India vary between banks (roughly 8-10.75%) and NBFCs (roughly 9.9-26%). Banks generally offer lower rates but slower processing. NBFCs like Muthoot offer near-instant disbursement, usually at a higher rate.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Gold loan interest rates across 19 lenders. Rates are indicative minimums as of July 2026.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Lender</th>
                      <th scope="col" style={thS}>Type</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Rate (p.a.)</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Max Tenure</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Processing</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Interest on Rs 1L (12 mo)</th>
                    </tr></thead>
                    <tbody>
                      {LENDER_RATES.map((l, i) => (
                        <tr key={l.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{l.name}</td>
                          <td style={tdL}>{l.type}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{l.rate.toFixed(2)}%</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{l.maxTenure} mo</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{l.processing}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>Rs {Math.round(100000 * l.rate / 100).toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Loan Eligibility Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Comparing a gold loan against an unsecured option? Check what you qualify for across loan types.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={secS} id="net-weight-methodology">
                <h2 style={h2S}>How Lenders Calculate Net Weight and Valuation</h2>
                <p style={pS}>The weight printed on your jewellery bill is not the weight a lender lends against. Every lender runs the same three-step valuation before quoting a loan amount.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Net weight and valuation methodology, worked example for a 22K gold chain.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Step</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Example Value</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Gross weight of jewellery (as weighed)', '22.0 g'],
                        ['Deduction for stones, enamel, non-gold parts', '2.0 g'],
                        ['Net gold weight (gross minus deduction)', '20.0 g'],
                        ['Purity check result (karat meter or acid test)', '22K (916)'],
                        ['Lender internal rate applied (5-10% below market)', 'Rs 11,870/g'],
                        ['Total valuation (net weight x lender rate)', 'Rs 2,37,400'],
                        ['LTV tier applied (falls under Rs 2.5L)', '85%'],
                        ['Eligible loan amount', 'Rs 2,01,790'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{row[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' }}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Two things consistently surprise first-time borrowers. The lender&apos;s per-gram rate is deliberately below the day&apos;s market spot price, as a safety margin against gold price swings during the loan tenure. And stones, meenakari work, and any non-gold metal in the setting are weighed and subtracted before valuation, not included.</p>
              </div>

              <div style={secS} id="fees-and-charges">
                <h2 style={h2S}>Gold Loan Fees and Charges Beyond Interest</h2>
                <p style={pS}>The interest rate is only part of the cost. Most gold loan comparisons online skip the fee schedule entirely, which is where the real cost differences between lenders show up.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Typical gold loan fees and charges beyond interest, indicative ranges across banks and NBFCs.</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Charge</th>
                      <th scope="col" style={thS}>Typical Range</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Processing fee', 'Up to 1% of loan amount plus GST'],
                        ['Valuation and asset verification charge', 'Rs 350-1,500 per packet, depending on loan size'],
                        ['Premature closure charge', '1-2% plus GST if closed within 30-180 days; often nil after 180 days'],
                        ['Renewal charge', 'Rs 500-750 plus GST, for loans above Rs 5 lakh'],
                        ['Payment return charge', 'Rs 450 plus GST, for a bounced EMI or interest payment'],
                        ['CIBIL report charge', 'Approximately Rs 50 per report'],
                        ['Stamp duty and statutory charges', 'As per actual state rates'],
                        ['Auction charge (only on default)', 'Approximately Rs 1,500, newspaper advertisement cost'],
                        ['Overdue notice charge', 'Approximately Rs 200 per notice sent'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Micro and small enterprises pledging gold loans up to Rs 50 lakh, closed or partially repaid from their own funds, are exempt from foreclosure charges under RBI norms. Enterprises taking gold loans up to Rs 5 lakh are exempt from processing fees if they submit a valid Udyam Registration Certificate before disbursal.</p>
              </div>

              <div style={secS} id="sbi-gold-loan">
                <h2 style={h2S}>SBI Gold Loan: Rate, Calculator, and Key Features</h2>
                <p style={pS}>SBI offers among the lowest gold loan interest rates of any major bank, starting at 8.00% p.a. and going up to 9.95% depending on scheme and tenure. SBI gold loans are available up to Rs 50 lakh with tenure up to 36 months.</p>
                <p style={pS}>SBI&apos;s rate is linked to its MCLR, set 0.30 percentage points above the 1-year MCLR. This means the rate moves when SBI resets its MCLR, so treat the 8.00% floor as indicative rather than fixed for the life of the loan.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Interest rate:</strong> 8.00% to 9.95% p.a. depending on scheme and loan amount</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Max loan amount:</strong> Rs 50 lakh</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Tenure:</strong> Up to 36 months</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Repayment options:</strong> EMI, bullet, and an overdraft facility</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Prepayment:</strong> No penalty on full or partial prepayment</span></div>
                <p style={pS}>Central Bank of India has quoted starting rates as low as 8.05% p.a., competitive with SBI. Always check the bank&apos;s own current rate page before applying, since public sector gold loan rates move with each MCLR reset.</p>
              </div>

              <div style={secS} id="muthoot-gold-loan">
                <h2 style={h2S}>Muthoot Finance Gold Loan: Rate, Calculator, and Muthoot Fincorp</h2>
                <p style={pS}>Muthoot Finance is India&apos;s largest gold loan NBFC, with over 5,600 branches. It processes gold loans in 15-30 minutes, the fastest option for urgent fund requirements.</p>
                <p style={pS}>Rates run from 12% to 26% p.a. depending on the scheme, wider than most bank ranges. Manappuram Finance is similar: its base rate runs closer to 21-24% p.a., though effective rates can drop to around 9.90% for borrowers who repay promptly, and can run above 30% at the other end for longer, higher-risk schemes.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Interest rate:</strong> 12% to 26% p.a. depending on scheme</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Processing time:</strong> 15-30 minutes</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Tenure:</strong> Up to 36 months with a renewal option</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Schemes:</strong> Regular EMI, bullet, interest-only, and flexible repayment</span></div>
                <p style={pS}>NBFC gold loan rates, especially at Muthoot and Manappuram, vary far more by scheme and repayment behavior than bank rates do. Ask for the exact scheme rate and any prompt-repayment discount before comparing it against a bank&apos;s flat quoted rate.</p>
                <p style={pS}><strong>Muthoot Finance and Muthoot Fincorp are different companies.</strong> Muthoot Finance Ltd (NSE: MUTHOOTFIN) is the larger, listed entity most people mean by &quot;Muthoot gold loan.&quot; Muthoot Fincorp Ltd is a separate private company from a different branch of the same family group, also offering gold loans under its own rates and branch network. Check which entity&apos;s branch you are actually walking into before comparing quoted rates.</p>
              </div>

              <div style={secS} id="gold-od-overdraft">
                <h2 style={h2S}>Gold Loan Overdraft (OD): How It Differs from EMI and Bullet</h2>
                <p style={pS}>A Gold OD is a third repayment structure some banks offer alongside EMI and bullet. Instead of a fixed loan amount and schedule, the lender sanctions a credit limit against your gold.</p>
                <p style={pS}>Interest is charged only on the amount you actually draw, not the full sanctioned limit.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Interest calculation:</strong> Charged daily on the drawn balance only, similar to a current account overdraft</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Withdrawal:</strong> Flexible, up to the sanctioned limit, any number of times within tenure</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Repayment:</strong> Flexible, deposit any amount back to reduce the drawn balance and interest</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Best for:</strong> Business owners with recurring, unpredictable cash needs rather than a one-time expense</span></div>
                <p style={pS}>SBI and several other banks offer a Gold OD product alongside their standard EMI and bullet gold loan schemes. This calculator models EMI and bullet directly; for an OD, use the bullet mode with a shorter tenure as a rough proxy, since both charge interest without mandatory principal reduction.</p>
              </div>

              <div style={secS} id="emi-vs-bullet">
                <h2 style={h2S}>EMI vs Bullet Repayment: Which Is Better for Gold Loans?</h2>
                <p style={pS}>Gold loans offer two primary repayment modes. The right choice depends on your cash flow pattern and how you plan to repay the loan.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>EMI vs Bullet repayment comparison for Rs 3 lakh gold loan at 10.5% for 12 months</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Feature</th>
                      <th scope="col" style={thS}>EMI Repayment</th>
                      <th scope="col" style={thS}>Bullet Repayment</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { f: 'Monthly payment', e: `Rs ${Math.round(calcEMI(300000, 10.5, 12)).toLocaleString('en-IN')}`, b: `Rs ${Math.round(300000 * 10.5 / 12 / 100).toLocaleString('en-IN')}` },
                        { f: 'Payment includes', e: 'Principal + Interest', b: 'Interest only' },
                        { f: 'Principal repayment', e: 'Spread across tenure', b: 'Full amount at maturity' },
                        { f: 'Total interest paid', e: `Rs ${Math.round(calcEMI(300000, 10.5, 12) * 12 - 300000).toLocaleString('en-IN')}`, b: `Rs ${Math.round(300000 * 10.5 / 100).toLocaleString('en-IN')}` },
                        { f: 'Best for', e: 'Salaried with steady income', b: 'Business owners, short-term needs' },
                        { f: 'Risk', e: 'Lower (principal reduces monthly)', b: 'Higher (full principal due at end)' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.f}</td><td style={tdL}>{row.e}</td><td style={tdL}>{row.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="gold-loan-eligibility">
                <h2 style={h2S}>Gold Loan Eligibility Requirements</h2>
                <p style={pS}>Gold loan eligibility is based on the value of gold you pledge, not your income or credit score. This makes it one of the most accessible loan products in India.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Age:</strong> 18 to 70 years. No upper age limit at most NBFCs</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Credit score:</strong> Not required. Gold serves as collateral, so CIBIL score does not affect eligibility</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Income proof:</strong> Not required by most lenders. Some banks may ask for basic KYC</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Gold purity:</strong> Minimum 18 karat. 22K and 24K get higher per-gram valuation</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>LTV cap:</strong> 75% to 85% of gold value depending on loan size, per the tiered RBI structure above</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Documents:</strong> Aadhaar and PAN are sufficient. No salary slips, bank statements, or ITR required</span></div>
              </div>

              <div style={secS} id="common-mistakes">
                <h2 style={h2S}>Common Mistakes When Taking a Gold Loan</h2>
                <p style={pS}>Gold loans are simple, but borrowers still lose money to a few avoidable mistakes. None of these show up in a basic EMI calculator.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Comparing only the headline rate:</strong> a lender advertising 9.9% with a 1.5% processing fee and a strict foreclosure charge can cost more than one at 10.5% with zero fees, especially on a short tenure.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Not checking which Muthoot or which bank branch:</strong> confusing Muthoot Finance with Muthoot Fincorp, or a private bank branch with its NBFC subsidiary, means comparing rates that were never actually offered to you.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Choosing bullet repayment without a repayment plan:</strong> bullet mode feels cheaper month to month, but the full principal comes due at maturity. Borrowers who have not planned for that lump sum often end up renewing at a fresh valuation and rate instead of closing the loan.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Ignoring the auction notice period:</strong> lenders are required to send multiple notices before auctioning pledged gold, but by the time the first notice arrives, interest has often already compounded for weeks. Track your due dates rather than waiting for a call.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Assuming your gold weighs what the bill says:</strong> the net weight after deducting stones and non-gold parts is what actually gets valued, which is often meaningfully lower than the gross weight on an old purchase receipt.</span></div>
              </div>

              <div style={secS} id="gold-vs-personal-loan">
                <h2 style={h2S}>Gold Loan vs Personal Loan: Which Should You Choose?</h2>
                <p style={pS}>Both gold loans and personal loans provide quick funds, but they differ significantly in cost, speed, and risk. Here is a side-by-side comparison to help you decide:</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Gold loan vs personal loan comparison for Indian borrowers</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Feature</th>
                      <th scope="col" style={thS}>Gold Loan</th>
                      <th scope="col" style={thS}>Personal Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { f: 'Interest rate', g: '8.5-18% p.a.', p: '10.5-24% p.a.' },
                        { f: 'Collateral', g: 'Gold jewellery required', p: 'None (unsecured)' },
                        { f: 'Credit score needed', g: 'Not required', p: '700+ recommended' },
                        { f: 'Processing time', g: '15 min to 2 hours', p: '1-3 days' },
                        { f: 'Max tenure', g: '1-3 years', p: '5-7 years' },
                        { f: 'Income proof', g: 'Not required', p: 'Required (salary slips, ITR)' },
                        { f: 'Risk', g: 'Risk of losing gold on default', p: 'No asset risk, but affects credit score' },
                        { f: 'Best for', g: 'Short-term, urgent needs', p: 'Longer-term, larger amounts' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.f}</td><td style={tdL}>{row.g}</td><td style={tdL}>{row.p}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>
                  If you own gold and need funds for less than 12 months, a gold loan at 8.5-10% is meaningfully cheaper than a <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>personal loan at 10.5%+</Link>. For longer tenures or larger amounts without pledging assets, use the <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EMI Calculator</Link> to compare options.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Personal Loan Eligibility Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See what an unsecured personal loan would actually cost before deciding to pledge gold instead.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/personal-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Gold Loan Calculator</h2>
                <p style={pS}>Five inputs get you a complete gold loan analysis.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { t: 'Enter gold weight and purity:', d: 'Set the weight in grams and select the purity (24K, 22K, or 18K). The per-gram rate adjusts automatically.' },
                    { t: 'Adjust the gold rate:', d: 'The calculator uses an approximate market rate. Edit this to match your lender valuation, which is typically 5-10% below market.' },
                    { t: 'Set the LTV ratio:', d: 'The calculator shows the RBI ceiling for your gold value live. Small loans can go up to 85%; larger ones cap at 75%.' },
                    { t: 'Choose interest rate and tenure:', d: 'Open More Settings for the rate and tenure fields. Compare live rates across 19 lenders in the sidebar and the full table below.' },
                    { t: 'Select repayment mode and review the schedule:', d: 'Toggle between EMI and Bullet, then expand the year-by-year amortization table to see exactly how the loan pays down.' },
                  ].map((step, i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{step.t}</strong> {step.d}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>


              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations are indicative only. Gold loan amounts depend on the lender&apos;s internal valuation, which may differ from market rates. Interest rates and LTV tiers shown are indicative as of July 2026 and are subject to change. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult your lender for exact terms.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.gold-loan-sidebar::-webkit-scrollbar{width:5px}.gold-loan-sidebar::-webkit-scrollbar-track{background:transparent}.gold-loan-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.gold-loan-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside
            className="gold-loan-sidebar"
            style={{
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Lender comparison sidebar */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Compare Lender Rates</div>
                  <div style={{ fontSize: 11, color: C.ink3, marginTop: 3 }}>Loan on {goldWeight}g {purity} gold</div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead><tr>
                    <th scope="col" style={thS}>Lender</th>
                    <th scope="col" style={{ ...thS, textAlign: 'right' }}>Rate</th>
                    <th scope="col" style={{ ...thS, textAlign: 'right' }}>Loan Amt</th>
                  </tr></thead>
                  <tbody>
                    {LENDER_RATES.map((l, i) => {
                      const lenderLoan = Math.round(goldValue * Math.min(l.maxLTV, ltvPct) / 100);
                      return (
                        <tr key={l.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{l.name}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>{l.rate}%</td>
                          <td style={{ ...tdR, textAlign: 'right', color: C.ink }}>{fmtIN(lenderLoan)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ padding: '10px 14px', borderTop: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 10, color: C.ink3 }}>Indicative minimum rates. Actual rates depend on scheme and loan amount.</span>
                </div>
              </div>

              <GoldLoanSnapshot />

              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Tools" items={MORE} />
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/personal-loan-calculator|Personal Loan', '/calculators/home-loan-calculator|Home Loan', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

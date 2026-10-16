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

/* ── Math Functions ────────────────────────────────────── */
function calcEMI(p: number, r: number, n: number) {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

type YearComparison = {
  year: number;
  propertyValue: number;
  remainingLoan: number;
  buyNetWorth: number;
  rentPortfolio: number;
  rentPaidAnnual: number;
};

function buildRentVsBuySchedule(
  propertyPrice: number,
  monthlyRent: number,
  years: number,
  homeLoanRate: number,
  propertyGrowthRate: number,
  sipReturnRate: number,
  rentEscalationRate: number = 5.0,
  downPaymentPct: number = 20,
  stampDutyPct: number = 6.0
): YearComparison[] {
  const downPayment = (propertyPrice * downPaymentPct) / 100;
  const stampDuty = (propertyPrice * stampDutyPct) / 100;
  const upfrontCashSpentToBuy = downPayment + stampDuty;
  const loanAmount = propertyPrice - downPayment;
  const totalMonths = years * 12;
  const monthlyEmi = calcEMI(loanAmount, homeLoanRate, totalMonths);
  const monthlyLoanRate = homeLoanRate / 12 / 100;
  const monthlySipRate = sipReturnRate / 12 / 100;
  const monthlyPropRate = propertyGrowthRate / 12 / 100;

  let currentRent = monthlyRent;
  let remainingLoanBalance = loanAmount;
  let currentPropertyValue = propertyPrice;
  let rentInvestedCorpus = upfrontCashSpentToBuy; // Down payment + stamp duty invested in SIP day 1

  const schedule: YearComparison[] = [];

  for (let y = 1; y <= years; y++) {
    let yearRentPaid = 0;

    for (let m = 1; m <= 12; m++) {
      // Home loan interest & principal
      if (remainingLoanBalance > 0) {
        const interest = remainingLoanBalance * monthlyLoanRate;
        const principal = monthlyEmi - interest;
        remainingLoanBalance = Math.max(0, remainingLoanBalance - principal);
      }

      // Property value growth
      currentPropertyValue *= (1 + monthlyPropRate);

      // Rent paid & Monthly savings gap invested
      yearRentPaid += currentRent;
      const monthlyMaintenance = (currentPropertyValue * 0.005) / 12; // 0.5% per year
      const totalMonthlyBuyOutflow = monthlyEmi + monthlyMaintenance;
      const monthlySavingsToInvest = Math.max(0, totalMonthlyBuyOutflow - currentRent);

      // Grow tenant's investment corpus
      rentInvestedCorpus = (rentInvestedCorpus * (1 + monthlySipRate)) + monthlySavingsToInvest;
    }

    // Annual rent escalation
    currentRent *= (1 + (rentEscalationRate / 100));

    const buyNetWorth = Math.round(currentPropertyValue - remainingLoanBalance);

    schedule.push({
      year: y,
      propertyValue: Math.round(currentPropertyValue),
      remainingLoan: Math.round(remainingLoanBalance),
      buyNetWorth,
      rentPortfolio: Math.round(rentInvestedCorpus),
      rentPaidAnnual: Math.round(yearRentPaid),
    });
  }

  return schedule;
}

/* ── Slider Component ─────────────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact, suffix }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => { setEditing(false); const n = parseFloat(raw.replace(/[^0-9.]/g, '')); if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n))); };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
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
            style={{ fontSize: compact ? 13 : 14.5, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '5px 12px' : '7px 16px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 85 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── Sidebar Components ────────────────────────────────── */
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

function HousingSnapshot() {
  const rows = [
    { label: 'Avg Metro Rental Yield', value: '2.5% - 3.5%' },
    { label: 'Avg Property CAGR', value: '5.5% - 7.5%' },
    { label: 'Avg Equity SIP Return', value: '11.0% - 13.0%' },
    { label: 'Annual Rent Escalation', value: '5.0% - 8.0%' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Housing Economics Snapshot</span>
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

function RelatedReads() {
  const links = [
    { href: '/blogs/world-gdp-ranking-2026', label: 'World GDP Ranking 2026: Real Estate vs Equities in India' },
    { href: '/blogs/itr-filing-last-date-fy-2025-26', label: 'ITR Filing Due Dates AY 2026-27: Section 24b vs HRA Exemption' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/rental-yield-calculator',         label: 'Rental Yield Calculator' },
  { href: '/calculators/property-affordability-calculator',label: 'Property Affordability' },
  { href: '/calculators/mortgage-calculator',             label: 'Home Loan EMI Calculator' },
  { href: '/calculators/sip-calculator',                  label: 'SIP Calculator' },
  { href: '/calculators/cagr-calculator',                 label: 'CAGR Calculator' },
];
const MORE = [
  { href: '/calculators/home-down-payment-calculator',    label: 'Home Down Payment Calculator' },
  { href: '/calculators/investment-comparison-calculator',label: 'Investment Comparison' },
  { href: '/calculators/debt-to-income-ratio-calculator',  label: 'Debt-to-Income Ratio' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
];

/* ── FAQ Accordion Component ───────────────────────────── */
const FAQS = [
  { q: 'How does a rent vs buy calculator work?', a: 'A rent vs buy calculator compares the financial net worth achieved over N years by buying a property (down payment, EMI, property appreciation, maintenance) against renting (monthly rent, 5% annual escalation, investing the down payment and monthly EMI savings in mutual funds).' },
  { q: 'When is renting financially better than buying a house in India?', a: 'Renting is often financially superior when rental yields are low (2% to 3.5%) and expected equity SIP returns (11% to 13%) significantly outpace property appreciation (5% to 7%) over a 10 to 15 year horizon.' },
  { q: 'When is buying a house better than renting?', a: 'Buying wins when you plan to stay in the property long-term (15+ years), when property appreciation matches or exceeds loan rates, or when emotional stability and inflation-hedged housing security outweigh pure investment arbitrage.' },
  { q: 'What is the opportunity cost of down payment?', a: 'The opportunity cost is the compounding return you give up by locking cash into a home down payment instead of investing it in higher-yielding assets like equity mutual funds.' },
  { q: 'How does rent escalation impact the decision?', a: 'Rent in Indian tier-1 cities typically escalates by 5% to 10% annually or every 11 months, gradually reducing the monthly savings gap between renting and a fixed home loan EMI.' },
  { q: 'How do tax benefits under Section 24(b) and 80C affect buying?', a: 'Home loan interest deduction up to Rs 2 lakh under Section 24(b) (old regime) reduces effective borrowing cost, boosting the net financial return of buying for high-tax-bracket buyers.' },
  { q: 'Does HRA tax exemption favor renting?', a: 'Yes. Salaried employees under the old tax regime can claim HRA tax exemption on rent paid, lowering effective rental cost and making renting more attractive.' },
  { q: 'What annual property appreciation rate is realistic in Indian metro cities?', a: 'Historical real estate price CAGR in top Indian metros (Mumbai, Bengaluru, NCR, Pune) has averaged between 5% and 8% per annum over 10-year rolling periods.' },
  { q: 'What investment return rate should be used for rent savings?', a: 'A conservative estimate of 11% to 12% CAGR is standard for diversified Nifty 50 or broad-market equity mutual fund SIPs over a 10+ year investment horizon.' },
  { q: 'Is property maintenance included in the buy calculation?', a: 'Yes. Annual maintenance, society charges, property tax, and repairs are estimated at 0.5% to 1.0% of the property value per year.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Donut Chart ──────────────────────────────────────── */
function DonutChart({ buyNetWorth, rentPortfolio }: { buyNetWorth: number; rentPortfolio: number }) {
  const total = Math.max(1, buyNetWorth + rentPortfolio);
  const R = 80, sw = 22, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const buyArc = (buyNetWorth / total) * circ;
  const buyPct = Math.round((buyNetWorth / total) * 100);

  return (
    <svg role="img" aria-label={`Net wealth split: ${buyPct}% buying net worth, ${100 - buyPct}% renting investment portfolio`}
      width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${buyArc} ${circ - buyArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Buying Share</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{buyPct}%</text>
    </svg>
  );
}

/* ── Article Style Constants ──────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' };

/* ════════════════════════════════════════════════════════ */
export default function RentVsBuyClient() {
  const defaultSettings = {
    propertyPrice: 8000000,
    monthlyRent: 25000,
    horizonYears: 15,
    homeLoanRate: 8.5,
    propertyGrowthRate: 6.0,
    sipReturnRate: 12.0,
    rentEscalation: 5.0,
  };
  const { settings, updateSettings } = useCalculatorSettings('rent-vs-buy', defaultSettings);
  const { propertyPrice, monthlyRent, horizonYears, homeLoanRate, propertyGrowthRate, sipReturnRate, rentEscalation } = settings;

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const schedule = useMemo(() => {
    return buildRentVsBuySchedule(
      propertyPrice,
      monthlyRent,
      horizonYears,
      homeLoanRate,
      propertyGrowthRate,
      sipReturnRate,
      rentEscalation
    );
  }, [propertyPrice, monthlyRent, horizonYears, homeLoanRate, propertyGrowthRate, sipReturnRate, rentEscalation]);

  const finalYear = schedule[schedule.length - 1] || {
    buyNetWorth: 0,
    rentPortfolio: 0,
    propertyValue: 0,
    remainingLoan: 0,
    rentPaidAnnual: 0,
  };

  const buyWins = finalYear.buyNetWorth >= finalYear.rentPortfolio;
  const netDifference = Math.abs(finalYear.buyNetWorth - finalYear.rentPortfolio);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Rent vs Buy Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Compare total net wealth over time between buying a property versus renting and investing your down payment and monthly savings into equity SIPs.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Inputs Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Property & Rent Inputs</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="property-price" label="Target Property Price" value={propertyPrice} min={2000000} max={50000000} step={100000}
                        display={fmtIN(propertyPrice)} onChange={v => updateSettings({ propertyPrice: v })} compact />

                      <Slider id="monthly-rent" label="Current Monthly Rent" value={monthlyRent} min={5000} max={300000} step={1000}
                        display={fmtIN(monthlyRent)} onChange={v => updateSettings({ monthlyRent: v })} compact />

                      <Slider id="horizon" label="Time Horizon (Years)" value={horizonYears} min={3} max={30} step={1}
                        display={`${horizonYears} yrs`} onChange={v => updateSettings({ horizonYears: v })} compact />

                      <Slider id="loan-rate" label="Home Loan Rate (% p.a.)" value={homeLoanRate} min={7.0} max={14.0} step={0.1}
                        display={`${homeLoanRate.toFixed(1)}%`} onChange={v => updateSettings({ homeLoanRate: v })} compact />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider id="property-growth" label="Property Appreciation (% p.a.)" value={propertyGrowthRate} min={1.0} max={15.0} step={0.5}
                        display={`${propertyGrowthRate.toFixed(1)}%`} onChange={v => updateSettings({ propertyGrowthRate: v })} compact />

                      <Slider id="sip-return" label="SIP Return Rate (% p.a.)" value={sipReturnRate} min={5.0} max={20.0} step={0.5}
                        display={`${sipReturnRate.toFixed(1)}%`} onChange={v => updateSettings({ sipReturnRate: v })} compact />

                      <Slider id="rent-escalation" label="Annual Rent Escalation (%)" value={rentEscalation} min={0.0} max={12.0} step={0.5}
                        display={`${rentEscalation.toFixed(1)}%`} onChange={v => updateSettings({ rentEscalation: v })} compact />

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '36px 36px', background: '#fafafa', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Donut Chart - Desktop order -1 */}
                    <div style={{ order: mobile ? 1 : -1, marginBottom: 16 }}>
                      <DonutChart buyNetWorth={finalYear.buyNetWorth} rentPortfolio={finalYear.rentPortfolio} />
                    </div>

                    {/* Donut Legend - Desktop order -1 */}
                    <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Buy Net Worth</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Rent SIP Corpus</span>
                      </div>
                    </div>

                    {/* Dark Result Box */}
                    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: '20px 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>
                          {buyWins ? 'Buying Creates More Wealth' : 'Renting & SIP Creates More Wealth'}
                        </div>
                        <div style={{ fontSize: 12, color: '#7A8087' }}>Net Advantage over {horizonYears} Yrs</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                          <span aria-live="polite" aria-label={`Net difference: ${fmtIN(netDifference)}`}>{fmtIN(netDifference)}</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#101214', lineHeight: 1 }}>
                          {buyWins ? 'Buy Advantage' : 'Rent Advantage'}
                        </div>
                      </div>
                    </div>

                    {/* Breakdown Stat Rows */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Final Property Value (Yr {horizonYears})</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{fmtC(finalYear.propertyValue)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Buying Net Worth (Asset - Loan)</span>
                        <span style={{ fontWeight: 600, color: buyWins ? '#166534' : C.ink }}>{fmtC(finalYear.buyNetWorth)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                        <span style={{ color: C.ink2 }}>Renting Investment Corpus</span>
                        <span style={{ fontWeight: 600, color: !buyWins ? '#166534' : C.ink }}>{fmtC(finalYear.rentPortfolio)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: C.ink2 }}>Total Cumulative Rent Paid</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{fmtC(schedule.reduce((s, r) => s + r.rentPaidAnnual, 0))}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            {/* ── Year-by-Year Schedule Table ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', marginBottom: 32, boxShadow: '0 1px 12px rgba(16,18,20,0.05)' }}>
              <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Year-by-Year Net Worth Schedule</div>
                  <div style={{ fontSize: 12, color: C.ink3, marginTop: 3 }}>Buying net worth vs renting investment corpus over {horizonYears} years</div>
                </div>
              </div>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 20px 12px' }}>
                    Net financial assets achieved by buying vs renting & investing over {horizonYears} years.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Year</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Property Value</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Loan Balance</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Buying Net Worth</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Renting Portfolio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((r, i) => (
                      <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={tdR}>{r.year}</td>
                        <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(r.propertyValue)}</td>
                        <td style={{ ...tdL, textAlign: 'right' }}>{fmtC(r.remainingLoan)}</td>
                        <td style={{ ...tdR, textAlign: 'right', color: r.buyNetWorth >= r.rentPortfolio ? '#166534' : C.ink }}>{fmtC(r.buyNetWorth)}</td>
                        <td style={{ ...tdR, textAlign: 'right', color: r.rentPortfolio > r.buyNetWorth ? '#166534' : C.ink }}>{fmtC(r.rentPortfolio)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            

            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-rent-vs-buy">
                <h2 style={h2S}>What Is the Rent vs Buy Decision?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The Rent vs Buy decision evaluates whether purchasing a residential property creates higher long-term net wealth than renting a home and investing the cost difference into high-yielding equity SIPs.
                  </p>
                </div>
                <p style={pS}>In Indian metropolitan cities, rental yields are low (typically 2.5% to 3.5%), while home loan interest rates average 8.4% to 9.0%. This creates a significant monthly cash flow difference between renting and paying an EMI for an equivalent home.</p>
                <p style={pS}>This calculator models the exact compounding dynamics of both options: home price appreciation, loan principal paydown, annual rent escalation, and the opportunity cost of investing the down payment and monthly savings into mutual funds.</p>
                <p style={pS}>Evaluating property yield or loan options? Use the <Link href="/calculators/rental-yield-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Rental Yield Calculator</Link> or project SIP mutual fund growth with the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link>.</p>
              </div>

              <div style={secS} id="mathematical-model">
                <h2 style={h2S}>Rent vs Buy Mathematical Model</h2>
                <p style={pS}>The mathematical model tracks two parallel balance sheets across N years.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Scenario A: Buying a House</p>
                  <code style={{ fontSize: 13 }}>Buy Net Worth = Property Price × (1+g)^n - Outstanding Loan Balance</code>

                  <p style={{ fontSize: 14, fontWeight: 700, margin: '16px 0 8px' }}>Scenario B: Renting & Investing Savings</p>
                  <code style={{ fontSize: 13 }}>Initial Investment = Down Payment + Stamp Duty</code>
                  <br />
                  <code style={{ fontSize: 13 }}>Monthly SIP = (Monthly EMI + Maintenance) - Monthly Rent</code>
                  <br />
                  <code style={{ fontSize: 13 }}>Rent Portfolio = Future Value of Initial Investment + Future Value of Monthly SIPs</code>
                </div>
              </div>

              <div style={secS} id="worked-example">
                <h2 style={h2S}>Worked Example: Rs 80 Lakh Property vs Rs 25,000 Rent (15 Years)</h2>
                <p style={pS}>Assume a Rs 80 lakh property (Rs 16 lakh down payment + Rs 4.8 lakh stamp duty), 8.5% loan rate, 6% property CAGR vs Rs 25,000 rent (5% annual escalation) and 12% equity SIP return.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Upfront cash invested by tenant: Rs 20.8 lakh grows at 12% for 15 years → <strong>Rs 1.13 Crore</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Monthly savings invested in SIP: difference between EMI (Rs 62,300) and rent grows into an additional <strong>Rs 75+ Lakh corpus</strong></span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span>Buyer property value after 15 years: Rs 80 lakh at 6% CAGR → <strong>Rs 1.91 Crore (Net Worth ~Rs 1.62 Cr after loan balance)</strong></span></div>
              </div>

              <div style={secS} id="opportunity-cost">
                <h2 style={h2S}>Opportunity Cost of Down Payment</h2>
                <p style={pS}>Locking Rs 20 lakh into a property down payment deprives you of 12% compounding in equity markets. Over 15 years, Rs 20 lakh invested at 12% CAGR grows to over Rs 1.09 crore. This opportunity cost is the primary reason renting often outperforms buying in low rental-yield Indian markets.</p>
              </div>

              <div style={secS} id="year-by-year-table">
                <h2 style={h2S}>Year-by-Year Wealth Schedule</h2>
                <p style={pS}>The table above details how buying net worth starts lower due to stamp duty and loan interest upfront, but catches up over time as the home loan balance is paid off.</p>
              </div>

              <div style={secS} id="rental-yield-impact">
                <h2 style={h2S}>Rental Yield Impact on the Decision</h2>
                <p style={pS}>Rental yield (Annual Rent ÷ Property Value) dictates whether renting or buying wins.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Impact of rental yield on financial winner over 15 years.</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Rental Yield %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly Rent on Rs 80L Property</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Financial Winner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { y: '2.5%', r: 16667, w: 'Renting & SIP Wins Significantly' },
                        { y: '3.5%', r: 23333, w: 'Renting & SIP Wins Moderately' },
                        { y: '5.0%', r: 33333, w: 'Break-even / Buying Competitive' },
                        { y: '7.0%+', r: 46667, w: 'Buying Wins Clearly' },
                      ].map((row, i) => (
                        <tr key={row.y} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.y}</td>
                          <td style={{ ...tdL, textAlign: 'right' }}>Rs {row.r.toLocaleString('en-IN')}</td>
                          <td style={{ ...tdR, textAlign: 'right', color: row.w.includes('Renting') ? C.ink : '#166534' }}>{row.w}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="tax-impact">
                <h2 style={h2S}>Tax Impact: Section 24(b) vs HRA Exemption</h2>
                <p style={pS}>Tax benefits can tilt the math under the Old Tax Regime.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Buying Tax Deduction:</strong> Section 24(b) allows up to Rs 2 lakh deduction on home loan interest, saving up to Rs 62,400 annually for 30% slab taxpayers.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Renting HRA Exemption:</strong> HRA exemption under Section 10(13A) can save Rs 50,000 to Rs 1.5 lakh annually depending on basic salary and rent paid.</span></div>
              </div>

              <div style={secS} id="excel-formula">
                <h2 style={h2S}>Rent vs Buy Formula in Excel</h2>
                <p style={pS}>Model rent vs buy wealth comparison in Excel using FV and PMT functions.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <code style={{ fontSize: 13, display: 'block', marginBottom: 8 }}>A1: Down Payment | B1: Monthly EMI | C1: Monthly Rent | D1: SIP Rate | E1: Yrs</code>
                  <code style={{ fontSize: 13, color: '#166534' }}>=FV(D1/12, E1*12, -(B1-C1), -A1)</code>
                </div>
              </div>

              <div style={secS} id="common-mistakes">
                <h2 style={h2S}>Common Mistakes in Rent vs Buy Analysis</h2>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Assuming rent is thrown-away money:</strong> ignoring that home loan interest in the early years is also a unrecoverable cost paid to the bank.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Failing to actually invest the rent savings:</strong> renting only wins if you disciplinedly invest the monthly savings gap into equity SIPs.</span></div>
              </div>

              <div style={secS} id="how-to-decide">
                <h2 style={h2S}>How to Make Your Decision</h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Check tenure horizon:</strong> if living in the city under 7 years, renting almost always wins due to high transaction friction costs.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Evaluate local rental yield:</strong> if yield is under 3%, renting & SIP is mathematically stronger.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Factor emotional security:</strong> home ownership offers stability, landlord independence, and emotional peace that math cannot quantify.</li>
                </ol>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Enter property price and rent:</strong> input target property valuation and current rent for similar homes.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Set growth and return rates:</strong> set property CAGR % and mutual fund SIP return %.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Review net wealth difference:</strong> compare buying net worth against renting investment portfolio over your time horizon.</li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are indicative estimates based on user inputs and assumed growth rates. Real estate price growth and mutual fund returns are subject to market risks and cannot be guaranteed. This tool is for educational purposes only and does not constitute financial or real estate advice. Consult your financial adviser before making housing decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .rent-vs-buy-sidebar::-webkit-scrollbar { width: 5px; }
            .rent-vs-buy-sidebar::-webkit-scrollbar-track { background: transparent; }
            .rent-vs-buy-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .rent-vs-buy-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="rent-vs-buy-sidebar"
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
              <HousingSnapshot />
              <SidebarList title="Related Calculators" items={POPULAR} />
              <SidebarList title="More Tools" items={MORE} />
              <RelatedReads />
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

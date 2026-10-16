'use client';

import { CHART_PAIR, seriesColor } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
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

/* ── Table Styles ──────────────────────────────────────── */
const thS = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,
  background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const,
  verticalAlign: 'middle' as const,
};
const tdL = { padding: '10px 14px', fontSize: 13, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
const tdR = { padding: '10px 14px', fontSize: 13, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

/* ── Slider Component ───────────────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact, suffix }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
}) {
  const generatedId = idProp || `slider-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div style={{ marginBottom: compact ? 14 : 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label htmlFor={generatedId} style={{ fontSize: compact ? 12.5 : 13.5, color: C.ink2, fontWeight: 500, fontFamily: INTER }}>
          {label}
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <input
            type="text"
            value={value}
            onChange={e => {
              const v = parseFloat(e.target.value.replace(/,/g, ''));
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
            }}
            aria-label={`${label} input`}
            style={{
              fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right',
              background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8,
              padding: compact ? '5px 10px' : '7px 12px', width: 110, outline: 'none', color: C.dark, fontFamily: INTER,
            }}
          />
          {suffix && <span style={{ fontSize: 12.5, fontWeight: 600, color: C.ink2, fontFamily: INTER }}>{suffix}</span>}
        </div>
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 6px rgba(16,18,20,0.2)', pointerEvents: 'none', zIndex: 1 }} />
        <input
          id={generatedId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={display}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', margin: 0 }}
        />
      </div>
    </div>
  );
}

/* ── Donut Chart Component ──────────────────────────────── */
function DonutChart({ online, grocery, utility, offline, total }: { online: number; grocery: number; utility: number; offline: number; total: number }) {
  if (total <= 0) {
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" role="img" aria-label="Donut chart displaying zero cashback earnings">
        <circle cx="75" cy="75" r="54" fill="none" stroke={C.border} strokeWidth="18" />
        <text x="75" y="79" textAnchor="middle" fontSize="13" fontWeight="600" fill={C.ink3} fontFamily={INTER}>No spends</text>
      </svg>
    );
  }

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { value: online, color: CHART_PAIR.primary, label: 'Online' },
    { value: grocery, color: CHART_PAIR.secondary, label: 'Grocery/Dining' },
    { value: utility, color: seriesColor(2), label: 'Utility' },
    { value: offline, color: seriesColor(3), label: 'Offline' },
  ];

  let accumulated = 0;

  return (
    <svg width="160" height="160" viewBox="0 0 160 160" role="img" aria-label="Donut chart displaying monthly cashback breakdown by spend category">
      <circle cx="80" cy="80" r={radius} fill="none" stroke={C.bg} strokeWidth="18" />
      {segments.map((seg, idx) => {
        if (seg.value <= 0) return null;
        const pct = seg.value / total;
        const dashArray = `${pct * circumference} ${circumference}`;
        const dashOffset = -accumulated * circumference;
        accumulated += pct;
        return (
          <circle
            key={idx}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth="18"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 80 80)"
          />
        );
      })}
      <text x="80" y="74" textAnchor="middle" fontSize="11" color={C.ink3} fill={C.ink3} fontFamily={INTER}>Gross Monthly</text>
      <text x="80" y="93" textAnchor="middle" fontSize="16" fontWeight="800" fill={C.ink} fontFamily={INTER}>
        ₹{Math.round(total).toLocaleString('en-IN')}
      </text>
    </svg>
  );
}

/* ── FAQ Component ──────────────────────────────────────── */

const faqs = [
  { q: 'How is credit card cashback calculated in India?', a: 'Credit card cashback is calculated by multiplying category-specific spend amounts by the card designated cashback percentage (such as 5% on online shopping or 1% on offline purchases).' },
  { q: 'Which credit card offers the highest cashback in India?', a: 'Cards like SBI Cashback Credit Card (5% flat online), Amazon Pay ICICI Card (5% for Prime users), and Swiggy HDFC Card offer top cashback rates up to monthly capping limits.' },
  { q: 'Is cashback credited directly to bank account or statement?', a: 'Most cashback credit cards automatically credit accumulated cashback directly into your monthly statement balance, reducing your net payable bill.' },
  { q: 'What is monthly capping on cashback credit cards?', a: 'Monthly capping is the maximum upper limit of cashback an account can earn in a billing cycle, such as Rs 5,000 max monthly cashback on SBI Cashback Card.' },
  { q: 'How does annual fee waiver work on cashback credit cards?', a: 'Most premium cashback cards reverse or waive annual renewal fees if your total annual spend exceeds a specific milestone, typically Rs 1 Lakh to Rs 3.5 Lakh per year.' },
  { q: 'Are fuel and utility bill spends eligible for cashback?', a: 'Many cards exclude fuel, wallet loads, rent, and government transactions from standard cashback, though specialized cards offer 1% to 5% on utility bill payments.' },
  { q: 'Is cashback earned on credit cards taxable in India?', a: 'Cashback received as a discount or statement credit on personal credit card spending is generally considered a purchase discount and is not subject to income tax under Section 56(2)(x).' },
  { q: 'What is the difference between reward points and direct cashback?', a: 'Direct cashback is credited as real currency statement credit, whereas reward points must be manually redeemed for vouchers, catalog products, or air miles.' },
  { q: 'Can I earn cashback on UPI transactions with RuPay credit cards?', a: 'Yes, RuPay credit cards linked to UPI apps earn 0.5% to 3% cashback or reward points on UPI merchant scan-and-pay transactions.' },
  { q: 'How does this cashback calculator estimate total earnings?', a: 'This calculator splits your monthly expenses into online, grocery, dining, and utility categories, applies card reward rates, checks monthly capping and fee waiver milestones, and projects net annual earnings.' },
  { q: 'What happens if I carry a balance while earning cashback?', a: 'Carrying a revolving credit card balance incurs interest rates of 36% to 42% annually, which far exceeds any 5% cashback earned. Always pay monthly bills in full.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={faqs} />;
}

/* ── Main Component ─────────────────────────────────────── */
export default function CashbackEarningsClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'split' | 'total'>('split');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Inputs
  const [onlineSpend, setOnlineSpend] = useState<number>(15000);
  const [grocerySpend, setGrocerySpend] = useState<number>(8000);
  const [utilitySpend, setUtilitySpend] = useState<number>(5000);
  const [offlineSpend, setOfflineSpend] = useState<number>(7000);
  const [totalSpend, setTotalSpend] = useState<number>(35000);

  // Card Rates
  const [onlineRate, setOnlineRate] = useState<number>(5);
  const [groceryRate, setGroceryRate] = useState<number>(3);
  const [utilityRate, setUtilityRate] = useState<number>(2);
  const [offlineRate, setOfflineRate] = useState<number>(1);
  const [annualFee, setAnnualFee] = useState<number>(999);
  const [waiverMilestone, setWaiverMilestone] = useState<number>(200000);
  const [monthlyCap, setMonthlyCap] = useState<number>(5000);

  // LocalStorage Persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem('fermor-cashback-v1');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.onlineSpend !== undefined) setOnlineSpend(d.onlineSpend);
        if (d.grocerySpend !== undefined) setGrocerySpend(d.grocerySpend);
        if (d.utilitySpend !== undefined) setUtilitySpend(d.utilitySpend);
        if (d.offlineSpend !== undefined) setOfflineSpend(d.offlineSpend);
        if (d.totalSpend !== undefined) setTotalSpend(d.totalSpend);
        if (d.onlineRate !== undefined) setOnlineRate(d.onlineRate);
        if (d.annualFee !== undefined) setAnnualFee(d.annualFee);
        if (d.waiverMilestone !== undefined) setWaiverMilestone(d.waiverMilestone);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-cashback-v1', JSON.stringify({
        onlineSpend, grocerySpend, utilitySpend, offlineSpend, totalSpend,
        onlineRate, annualFee, waiverMilestone,
      }));
    } catch {}
  }, [onlineSpend, grocerySpend, utilitySpend, offlineSpend, totalSpend, onlineRate, annualFee, waiverMilestone]);

  // Calculations
  const calc = useMemo(() => {
    if (activeTab === 'split') {
      const mOnline = (onlineSpend * onlineRate) / 100;
      const mGrocery = (grocerySpend * groceryRate) / 100;
      const mUtility = (utilitySpend * utilityRate) / 100;
      const mOffline = (offlineSpend * offlineRate) / 100;
      let mGross = mOnline + mGrocery + mUtility + mOffline;
      if (monthlyCap > 0 && mGross > monthlyCap) mGross = monthlyCap;

      const mTotalSpend = onlineSpend + grocerySpend + utilitySpend + offlineSpend;
      const aTotalSpend = mTotalSpend * 12;
      const aGrossCashback = mGross * 12;

      const isWaived = waiverMilestone > 0 && aTotalSpend >= waiverMilestone;
      const effectiveFee = isWaived ? 0 : annualFee;
      const aNetCashback = aGrossCashback - effectiveFee;
      const returnRatePct = aTotalSpend > 0 ? (aNetCashback / aTotalSpend) * 100 : 0;

      return {
        mOnline, mGrocery, mUtility, mOffline, mGross,
        mTotalSpend, aTotalSpend, aGrossCashback, isWaived, effectiveFee,
        aNetCashback, returnRatePct,
      };
    } else {
      const mOnline = (totalSpend * onlineRate) / 100;
      let mGross = mOnline;
      if (monthlyCap > 0 && mGross > monthlyCap) mGross = monthlyCap;

      const aTotalSpend = totalSpend * 12;
      const aGrossCashback = mGross * 12;
      const isWaived = waiverMilestone > 0 && aTotalSpend >= waiverMilestone;
      const effectiveFee = isWaived ? 0 : annualFee;
      const aNetCashback = aGrossCashback - effectiveFee;
      const returnRatePct = aTotalSpend > 0 ? (aNetCashback / aTotalSpend) * 100 : 0;

      return {
        mOnline, mGrocery: 0, mUtility: 0, mOffline: 0, mGross,
        mTotalSpend: totalSpend, aTotalSpend, aGrossCashback, isWaived, effectiveFee,
        aNetCashback, returnRatePct,
      };
    }
  }, [activeTab, onlineSpend, grocerySpend, utilitySpend, offlineSpend, totalSpend, onlineRate, groceryRate, utilityRate, offlineRate, annualFee, waiverMilestone, monthlyCap]);

  const h2S = { fontSize: mobile ? 20 : 23, fontWeight: 800, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em', fontFamily: INTER };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14, fontFamily: INTER };
  const secS = { marginBottom: 40 };

  const POPULAR_TOOLS = [
    { href: '/calculators/credit-card-emi-calculator', label: 'Credit Card EMI Calculator' },
    { href: '/calculators/credit-utilization-calculator', label: 'Credit Utilization Calculator' },
    { href: '/calculators/credit-health-score-calculator', label: 'Credit Health Score Calculator' },
    { href: '/calculators/personal-loan-calculator', label: 'Personal Loan Calculator' },
  ];
  const MORE_TOOLS = [
    { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio Calculator' },
    { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
    { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
    { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  ];

  return (
    <div style={{ background: C.bg, minHeight: '100vh', fontFamily: INTER }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Cashback Earnings Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate monthly credit card cashback, annual fee waiver milestone eligibility, and net return rates across Indian credit cards.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          
          {/* MAIN COLUMN */}
          <div>
            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 32 }}>
              
              {/* Card Header & Currency Selector */}
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Reward Estimation Mode
                </span>
                <CurrencySelector />
              </div>

              {/* Tabs Inside Card */}
              <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button
                  onClick={() => setActiveTab('split')}
                  aria-pressed={activeTab === 'split'}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'split' ? 700 : 400,
                    color: activeTab === 'split' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'split' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    fontFamily: INTER, transition: 'all 0.15s',
                  }}
                >
                  Category Spend Split
                </button>
                <button
                  onClick={() => setActiveTab('total')}
                  aria-pressed={activeTab === 'total'}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'total' ? 700 : 400,
                    color: activeTab === 'total' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'total' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    fontFamily: INTER, transition: 'all 0.15s',
                  }}
                >
                  Simple Total Spend
                </button>
              </div>

              {/* Input & Result Split Grid (Rule 19: Equal 1fr 1fr columns) */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                
                {/* INPUT PANEL (Rule 17: Completely Colorless Inputs) */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  {activeTab === 'split' ? (
                    <>
                      <Slider label="Online Shopping (Amazon, Flipkart)" value={onlineSpend} min={0} max={100000} step={1000} display={formatCurrency(onlineSpend)} onChange={setOnlineSpend} compact={mobile} />
                      <Slider label="Grocery & Dining (Swiggy, Zomato)" value={grocerySpend} min={0} max={50000} step={1000} display={formatCurrency(grocerySpend)} onChange={setGrocerySpend} compact={mobile} />
                      <Slider label="Utility Bills & Subscriptions" value={utilitySpend} min={0} max={30000} step={500} display={formatCurrency(utilitySpend)} onChange={setUtilitySpend} compact={mobile} />
                      <Slider label="Offline & General Shopping" value={offlineSpend} min={0} max={50000} step={1000} display={formatCurrency(offlineSpend)} onChange={setOfflineSpend} compact={mobile} />
                    </>
                  ) : (
                    <>
                      <Slider label="Total Monthly Card Spend" value={totalSpend} min={5000} max={300000} step={5000} display={formatCurrency(totalSpend)} onChange={setTotalSpend} compact={mobile} />
                    </>
                  )}

                  {!showAdvanced ? (
                    <button
                      onClick={() => setShowAdvanced(true)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600, width: '100%', justifyContent: 'center', marginTop: 8 }}
                    >
                      + Adjust Card Rates & Annual Fee
                    </button>
                  ) : (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px dashed ${C.border}` }}>
                      <Slider label="Online Cashback Rate" value={onlineRate} min={1} max={10} step={0.5} display={`${onlineRate}%`} onChange={setOnlineRate} compact={mobile} suffix="%" />
                      {activeTab === 'split' && (
                        <>
                          <Slider label="Grocery/Dining Rate" value={groceryRate} min={0.5} max={10} step={0.5} display={`${groceryRate}%`} onChange={setGroceryRate} compact={mobile} suffix="%" />
                          <Slider label="Utility Bills Rate" value={utilityRate} min={0.5} max={5} step={0.5} display={`${utilityRate}%`} onChange={setUtilityRate} compact={mobile} suffix="%" />
                          <Slider label="Offline Rate" value={offlineRate} min={0.5} max={3} step={0.5} display={`${offlineRate}%`} onChange={setOfflineRate} compact={mobile} suffix="%" />
                        </>
                      )}
                      <Slider label="Annual Card Fee" value={annualFee} min={0} max={5000} step={100} display={formatCurrency(annualFee)} onChange={setAnnualFee} compact={mobile} />
                      <Slider label="Fee Waiver Spend Milestone" value={waiverMilestone} min={0} max={500000} step={25000} display={formatCurrency(waiverMilestone)} onChange={setWaiverMilestone} compact={mobile} />
                      <Slider label="Monthly Cashback Capping" value={monthlyCap} min={0} max={10000} step={500} display={monthlyCap === 0 ? 'No Cap' : formatCurrency(monthlyCap)} onChange={setMonthlyCap} compact={mobile} />
                      
                      <button
                        onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '5px 12px', cursor: 'pointer', fontFamily: INTER, fontWeight: 500, margin: '8px auto 0' }}
                      >
                        Hide Advanced Settings
                      </button>
                    </div>
                  )}
                </div>

                {/* RESULT PANEL */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  
                  {/* Primary Dark Box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: mobile ? 12.5 : 13, fontWeight: 600, color: '#50565C' }}>Net Annual Cashback</div>
                      <div style={{ fontSize: 11.5, color: '#7A8087' }}>After fee deductions</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }} aria-live="polite" aria-label={`Net Annual Cashback: ${formatCurrency(calc.aNetCashback)}`}>
                        {formatCurrency(calc.aNetCashback)}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#101214' }}>
                        {formatCurrency(calc.mGross)}/mo gross
                      </div>
                    </div>
                  </div>

                  {/* Donut Chart (Rule 20: order -1 on desktop) */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 14 : 18 }}>
                    <DonutChart online={calc.mOnline} grocery={calc.mGrocery} utility={calc.mUtility} offline={calc.mOffline} total={calc.mGross} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginBottom: mobile ? 12 : 18, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 11.5, color: C.ink2 }}>Online</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 11.5, color: C.ink2 }}>Grocery/Dining</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#3B82F6' }} aria-hidden="true" />
                      <span style={{ fontSize: 11.5, color: C.ink2 }}>Utility</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#9CA3AF' }} aria-hidden="true" />
                      <span style={{ fontSize: 11.5, color: C.ink2 }}>Offline</span>
                    </div>
                  </div>

                  {/* Stat Rows */}
                  {[
                    { label: 'Total Annual Card Spend', value: formatCurrency(calc.aTotalSpend) },
                    { label: 'Gross Annual Cashback', value: formatCurrency(calc.aGrossCashback) },
                    { label: 'Annual Fee Status', value: calc.isWaived ? 'Waived (Rs 0)' : `${formatCurrency(annualFee)} charged` },
                    { label: 'Net Annual Return Rate', value: `${calc.returnRatePct.toFixed(2)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Save Results Card (Rule 12: Fixed Position & Text) */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ARTICLE CONTENT */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-cashback-calculator">
                <h2 style={h2S}>What Is a Cashback Earnings Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A cashback earnings calculator evaluates the exact monthly monetary rewards, annual fee waivers, and net return percentage generated by your credit card spending patterns in India.
                  </p>
                </div>
                <p style={pS}>Cashback credit cards in India offer category-specific reward rates, such as 5% on online e-commerce platforms like Amazon and Flipkart, 10% on food delivery apps like Swiggy, and 1% on general offline spends.</p>
                <p style={pS}>This calculator factors in category spend splits, monthly capping limits, annual fee deductions, and spend milestones across cards like SBI Cashback, Amazon Pay ICICI, Flipkart Axis, and Swiggy HDFC. If you carry monthly balances or convert purchases to EMIs, check our <Link href="/calculators/credit-card-emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Card EMI Calculator</Link>, monitor card limits in our <Link href="/calculators/credit-utilization-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Utilization Calculator</Link>, or assess your overall credit profile with our <Link href="/calculators/credit-health-score-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Credit Health Score Calculator</Link>.</p>
              </div>

              <div style={secS} id="cashback-formula">
                <h2 style={h2S}>Credit Card Cashback Formula</h2>
                <p style={pS}>Net cashback earnings are calculated by summing tier-based category rewards and subtracting net annual card renewal fees.</p>
                
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Net Annual Cashback Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Net Cashback = (Gross Monthly Cashback × 12) - Effective Annual Card Fee</code>
                </div>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Comparison of popular Indian cashback credit card reward structures.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Credit Card</th>
                        <th scope="col" style={{ ...thS, textAlign: 'left' }}>Online Reward Rate</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly Cap</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Annual Fee Waiver</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>SBI Cashback Credit Card</td>
                        <td style={tdL}>5% Flat across Online Merchants</td>
                        <td style={tdR}>Rs 5,000 / mo</td>
                        <td style={tdR}>Rs 2 Lakh Spend</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Amazon Pay ICICI Card</td>
                        <td style={tdL}>5% Amazon Prime / 3% Non-Prime</td>
                        <td style={tdR}>No Upper Cap</td>
                        <td style={tdR}>Lifetime Free (Rs 0)</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Flipkart Axis Bank Card</td>
                        <td style={tdL}>5% Flipkart / 1.5% Unlimited</td>
                        <td style={tdR}>No Upper Cap</td>
                        <td style={tdR}>Rs 3.5 Lakh Spend</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Swiggy HDFC Bank Card</td>
                        <td style={tdL}>10% Swiggy / 5% Top Merchants</td>
                        <td style={tdR}>Rs 1,500 / mo</td>
                        <td style={tdR}>Rs 2 Lakh Spend</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* In-Content Promo Bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Credit Card EMI Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Planning a major card purchase? Calculate exact EMI interest charges and processing fees.</p>
                </div>
                <Link className="fx-btn" href="/calculators/credit-card-emi-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <div style={secS} id="how-to-maximize-cashback">
                <h2 style={h2S}>How to Maximize Credit Card Cashback in India</h2>
                <p style={pS}>Maximizing card rewards requires matching merchant category codes (MCC) to card multipliers and tracking monthly capping limits.</p>
                <p style={pS}>Per guidelines from the <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Reserve Bank of India</a>, statement credits reduce net bill obligations. Personal card cashback received as a purchase discount is not subject to income tax under Section 56(2)(x) of the Income Tax Act, as confirmed on <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>incometax.gov.in</a>.</p>
                <p style={pS}>Always pay your credit card bill in full before the due date. Carrying a revolving balance incurs 36% to 42% annual interest, which instantly wipes out any 5% cashback gain. Use our <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Personal Loan Calculator</Link> or <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Debt-to-Income Ratio Calculator</Link> if you are restructuring high-interest debt balances.</p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Calculator</h2>
                <p style={pS}>Select between Category Spend Split or Simple Total Spend mode depending on how detailed your expense tracking is.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Calculation Mode:</strong> Choose Category Spend Split or Simple Spend Mode.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Monthly Spends:</strong> Input monthly expenses across online shopping, dining, grocery, and offline purchases.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Annual Fee Details:</strong> Enter card annual fee and spend milestone required for fee reversal.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Net Earnings:</strong> See gross monthly cashback, annual fee waiver status, net annual earnings, and net return rate %.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              {/* Disclaimer (Rule 23: Secondary plain-text CA mention near disclaimer) */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Cashback estimates provided by this calculator are illustrative based on standard credit card terms in India. Individual bank card terms, merchant category codes (MCC), exclusion categories (such as fuel, wallet loads, rent), and monthly capping limits depend on issuer policies from SBI, ICICI, HDFC, or Axis Bank. Consult a qualified Chartered Accountant or financial planner before making major borrowing or credit optimization decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .cec-sidebar::-webkit-scrollbar { width: 5px; }
            .cec-sidebar::-webkit-scrollbar-track { background: transparent; }
            .cec-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .cec-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="cec-sidebar"
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
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ flexShrink: 0 }}><SidebarList title="Popular Credit Tools" items={POPULAR_TOOLS} /></div>
                <div style={{ flexShrink: 0 }}><SidebarList title="More Financial Calculators" items={MORE_TOOLS} /></div>
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/credit-card-emi-calculator|Credit Card EMI', '/calculators/credit-utilization-calculator|Credit Utilization', '/calculators/personal-loan-calculator|Personal Loan', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Credit Cards', '/#|Cashback Rewards', '/#|Personal Finance', '/#|Banking'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
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
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
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

/* ── Table Styles ──────────────────────────────────────── */
const thS = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,
  background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const,
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const,
  verticalAlign: 'middle' as const,
};
const tdL = { padding: '10px 14px', fontSize: 13, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
const tdR = { padding: '10px 14px', fontSize: 13, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

/* ── Slider ────────────────────────────────────────────── */
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
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14.5, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '5px 10px' : '7px 12px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 14.5, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '5px 12px' : '7px 16px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 80 : 100, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 22, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 6px rgba(16,18,20,0.2)', pointerEvents: 'none', zIndex: 1 }} />
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

/* ── Donut Chart ───────────────────────────────────────── */
function DonutChart({ totalInvested, wealthGain }: { totalInvested: number; wealthGain: number }) {
  const total = totalInvested + wealthGain;
  const investedPct = total > 0 ? (totalInvested / total) * 100 : 50;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (investedPct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Goal split: ${Math.round(investedPct)}% Invested Amount, ${Math.round(100 - investedPct)}% Estimated Returns`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>Future Goal</text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(total / 100000).toFixed(0)}L
      </text>
    </svg>
  );
}

/* ── Sidebar Component ─────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

function ChildInsuranceSnapshot() {
  const rows = [
    { label: 'Avg Education Inflation', value: '10% - 12% p.a.' },
    { label: 'College Cost Doubling Time', value: '6 to 7 Years' },
    { label: 'Recommended Insurance', value: 'Term Plan + WOP' },
    { label: 'Sec 10(10D) Exemption', value: 'Up to Rs 5L Premium' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Child Goal Benchmark</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/calculators/child-education-planner-calculator', label: 'Child Education Planner: Step-by-Step SIP Guide' },
    { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator: Parent Protection Cover' },
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

const POPULAR_TOOLS = [
  { href: '/calculators/child-education-planner-calculator', label: 'Child Education Planner' },
  { href: '/calculators/education-corpus-calculator', label: 'Education Corpus Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/life-insurance-calculator', label: 'Life Insurance Calculator' },
  { href: '/calculators/step-up-sip-calculator', label: 'Step-Up SIP Calculator' },
  { href: '/calculators/goal-planning-calculator', label: 'Goal Planning Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'How much cover is needed in a child insurance plan in India?', a: 'A child insurance plan should provide a sum assured equal to the inflation-adjusted future cost of higher education plus any outstanding parent liabilities, typically between Rs 50 lakh and Rs 1.5 crore for private higher education.' },
  { q: 'What is education inflation rate in India?', a: 'Education inflation in India averages 10% to 12% annually, which means college tuition fees double approximately every 6 to 7 years.' },
  { q: 'What is Waiver of Premium (WOP) benefit in child insurance plans?', a: 'Waiver of Premium is a critical feature where, upon the tragic demise of the parent during the policy term, all future premiums are waived by the insurer while the policy continues and pays the target corpus at maturity.' },
  { q: 'Is pure term insurance plus equity mutual funds better than traditional child plans?', a: 'Financially, combining a term insurance policy on the breadwinning parent with a dedicated equity SIP (like Nifty 50 or Flexi Cap funds) generally yields higher net returns and lower expense ratios than traditional child endowment plans.' },
  { q: 'How much will college education cost in India in 15 years?', a: 'An engineering or MBA course costing Rs 15 lakh today will cost approximately Rs 62.6 lakh in 15 years assuming a 10% annual education inflation rate.' },
  { q: 'What is the ideal age to start a child insurance or education fund?', a: 'Starting at birth or before the child turns 3 years old gives a 15 to 18 year compounding runway, dramatically lowering the required monthly investment compared to starting when the child is 10 years old.' },
  { q: 'Are child plan maturity proceeds tax-free under Section 10(10D)?', a: 'Maturity benefits from traditional child life insurance plans issued with annual premium up to Rs 5 lakh are tax-exempt under Section 10(10D), subject to prevailing tax rules.' },
  { q: 'Can I take a partial withdrawal from a child insurance plan for school fees?', a: 'Child ULIP plans permit partial withdrawals after a 5-year lock-in period for educational milestones like school admission or coaching fees.' },
  { q: 'Should the insurance policy be bought on the child or the parent?', a: 'The life insurance cover must always be taken on the earning parent, who is the financial provider. Insuring a minor child provides no financial risk protection to the family.' },
  { q: 'How does this child insurance calculator work?', a: 'This calculator inflates today\'s education cost to its future value at your selected inflation rate, computes the required life cover sum assured, and shows the exact monthly SIP needed to reach the goal.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function ChildInsuranceClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'education' | 'marriage'>('education');

  // Input states
  const [currentAge, setCurrentAge] = useState<number>(3);
  const [targetAge, setTargetAge] = useState<number>(18);
  const [todayCost, setTodayCost] = useState<number>(2000000); // 20 Lakhs today
  const [inflationRate, setInflationRate] = useState<number>(10.0); // 10%
  const [expectedReturn, setExpectedReturn] = useState<number>(12.0); // 12%
  const [parentLiabilities, setParentLiabilities] = useState<number>(3000000); // 30L existing loans
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-child-insurance-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.currentAge !== undefined) setCurrentAge(d.currentAge);
      if (d.targetAge !== undefined) setTargetAge(d.targetAge);
      if (d.todayCost !== undefined) setTodayCost(d.todayCost);
      if (d.inflationRate !== undefined) setInflationRate(d.inflationRate);
      if (d.expectedReturn !== undefined) setExpectedReturn(d.expectedReturn);
      if (d.parentLiabilities !== undefined) setParentLiabilities(d.parentLiabilities);
    } catch { /* ignore */ }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fermor-child-insurance-v1', JSON.stringify({
        currentAge, targetAge, todayCost, inflationRate, expectedReturn, parentLiabilities
      }));
    } catch { /* ignore */ }
  }, [currentAge, targetAge, todayCost, inflationRate, expectedReturn, parentLiabilities]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const defaultTargetAge = activeTab === 'education' ? 18 : 24;
    const effectiveTargetAge = Math.max(currentAge + 1, targetAge || defaultTargetAge);
    const tenure = Math.max(1, effectiveTargetAge - currentAge);

    // Future cost adjusted for education inflation: FV = PV * (1 + i)^n
    const futureGoalCorpus = Math.round(todayCost * Math.pow(1 + inflationRate / 100, tenure));

    // Required Term Life Cover Sum Assured on Parent = Future Goal Corpus + Outstanding Liabilities
    const requiredTermCover = futureGoalCorpus + parentLiabilities;

    // Monthly SIP needed to build futureGoalCorpus over tenure months at expectedReturn
    const monthlyRate = expectedReturn / 12 / 100;
    const totalMonths = tenure * 12;
    
    // SIP FV formula: FV = P * [((1 + r)^n - 1) / r] * (1 + r)
    // => P = FV / ([((1 + r)^n - 1) / r] * (1 + r))
    const sipFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    const monthlySipNeeded = Math.round(futureGoalCorpus / sipFactor);

    const totalInvestedAmount = Math.round(monthlySipNeeded * totalMonths);
    const estimatedWealthGain = Math.max(0, futureGoalCorpus - totalInvestedAmount);

    return {
      tenure,
      futureGoalCorpus,
      requiredTermCover,
      monthlySipNeeded,
      totalInvestedAmount,
      estimatedWealthGain,
    };
  }, [activeTab, currentAge, targetAge, todayCost, inflationRate, expectedReturn, parentLiabilities]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Child Insurance Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate future education corpus, required parent life cover, and monthly SIP investment needed for your child.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-education" role="tab" aria-selected={activeTab === 'education'} aria-controls="panel-education"
                  onClick={() => { setActiveTab('education'); setTargetAge(18); setTodayCost(2000000); }}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'education' ? 700 : 400,
                    color: activeTab === 'education' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'education' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Education Goal
                </button>
                <button id="tab-marriage" role="tab" aria-selected={activeTab === 'marriage'} aria-controls="panel-marriage"
                  onClick={() => { setActiveTab('marriage'); setTargetAge(25); setTodayCost(3500000); }}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'marriage' ? 700 : 400,
                    color: activeTab === 'marriage' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'marriage' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Marriage Goal
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Goal Details</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="child-age" label="Child Current Age" value={currentAge} min={0} max={15} step={1}
                        display={`${currentAge} Yrs`} onChange={setCurrentAge} compact suffix="Yrs" />

                      <Slider id="target-age" label="Goal Target Age" value={targetAge} min={currentAge + 1} max={30} step={1}
                        display={`${targetAge} Yrs`} onChange={setTargetAge} compact suffix="Yrs" />

                      <Slider id="today-cost" label="Goal Cost in Today's Money" value={todayCost} min={500000} max={10000000} step={100000}
                        display={fmtC(todayCost)} onChange={setTodayCost} compact />

                      <Slider id="inflation-rate" label="Education / Goal Inflation" value={inflationRate} min={5.0} max={15.0} step={0.5}
                        display={`${inflationRate.toFixed(1)}%`} onChange={setInflationRate} compact suffix="%" />

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="expected-return" label="Expected Investment Return" value={expectedReturn} min={6.0} max={16.0} step={0.5}
                        display={`${expectedReturn.toFixed(1)}%`} onChange={setExpectedReturn} compact suffix="%" />

                      <Slider id="parent-liabilities" label="Parent Existing Liabilities (Loans)" value={parentLiabilities} min={0} max={20000000} step={500000}
                        display={fmtC(parentLiabilities)} onChange={setParentLiabilities} compact />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 14 : 18 }}>
                    <DonutChart totalInvested={calculations.totalInvestedAmount} wealthGain={calculations.estimatedWealthGain} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>Invested Amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>Estimated Returns</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>Future Inflation Goal Corpus</div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>In {calculations.tenure} years (at {targetAge} yrs)</div>
                    </div>
                    <span aria-live="polite" aria-label={`Future Inflation Goal Corpus: ${fmtC(calculations.futureGoalCorpus)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtC(calculations.futureGoalCorpus)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Required Monthly SIP', value: `${fmtIN(calculations.monthlySipNeeded)}/mo` },
                    { label: 'Recommended Parent Term Cover', value: fmtC(calculations.requiredTermCover) },
                    { label: 'Investment Horizon', value: `${calculations.tenure} Years` },
                    { label: 'Total Investment Required', value: fmtC(calculations.totalInvestedAmount) },
                    { label: 'Estimated Wealth Gain', value: fmtC(calculations.estimatedWealthGain) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE CONTENT ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-child-insurance">
                <h2 style={h2S}>What Is a Child Insurance Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A child insurance calculator evaluates the future inflation-adjusted cost of your child&apos;s education or marriage goal and determines the necessary term life cover and monthly investment required.
                  </p>
                </div>
                <p style={pS}>Planning for a child&apos;s higher education requires solving two distinct financial challenges: building wealth to fund college fees 15 years from now, and protecting the goal against the unexpected loss of the earning parent.</p>
                <p style={pS}>This calculator computes the exact impact of 10% annual education inflation on today&apos;s college fees and outlines the optimal combination of term life insurance and equity mutual fund SIPs.</p>
              </div>

              <div style={secS} id="education-cost-formula">
                <h2 style={h2S}>Child Education Cost Inflation Formula</h2>
                <p style={pS}>Education costs in India grow significantly faster than general consumer price inflation. Financial planners standardise education inflation at 10% per annum.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Future Goal Value Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Future Cost = Today Cost × (1 + Inflation Rate)^Tenure</code>
                </div>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example: Rs 20 Lakh engineering/MBA degree today, child age 3, target college age 18 (15 years tenure):</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Inflation-Adjusted Future Corpus: Rs 20,000,000 × (1.10)^15 = <strong>Rs 83.54 Lakh</strong></div>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Monthly Equity SIP Needed (at 12% returns): <strong>Rs 16,700 per month</strong></div>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Recommended Parent Term Cover: Rs 83.54 Lakh + Existing Loan Liabilities</div>
                </div>
              </div>

              <div style={secS} id="term-plus-sip-strategy">
                <h2 style={h2S}>Term Plan + Equity Mutual Fund Strategy vs Traditional Child Plans</h2>
                <p style={pS}>Financial experts consistently recommend decoupling life insurance from investment when planning for a child&apos;s future.</p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Comparison of Pure Term + Equity SIP Strategy vs Traditional Child Insurance Plans.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Feature</th>
                        <th scope="col" style={{ ...thS, textAlign: 'left' }}>Term Plan + Equity SIP</th>
                        <th scope="col" style={{ ...thS, textAlign: 'left' }}>Traditional Child Plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Expected Annual Return</td>
                        <td style={tdL}>12% - 14% CAGR (Equity Index)</td>
                        <td style={tdL}>5% - 6% IRR (Endowment)</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Life Cover Amount</td>
                        <td style={tdL}>Rs 1 Crore+ for low premium</td>
                        <td style={tdL}>10x Annual Premium (Rs 10L - 20L)</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Flexibility &amp; Liquidity</td>
                        <td style={tdL}>High (pause SIP or redeem anytime)</td>
                        <td style={tdL}>Low (strict surrender penalties)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Child Insurance Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Goal Tab:</strong> Choose between Education Goal (Target Age 18) and Marriage Goal (Target Age 25).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Today Cost:</strong> Input the estimated fee or expense in current rupees.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust Inflation and Return:</strong> Keep default 10% education inflation and 12% equity return expectations.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Protection &amp; SIP:</strong> Check the inflation-adjusted future goal corpus, recommended parent term cover, and monthly SIP.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Figures provided by this calculator are estimates based on user-entered inflation rates and investment return assumptions. Mutual fund investments are subject to market risks, and past performance is no guarantee of future returns. Life insurance policies issued by LIC, HDFC Life, ICICI Prudential, or SBI Life are subject to underwriting terms and policy conditions. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .cic-sidebar::-webkit-scrollbar { width: 5px; }
            .cic-sidebar::-webkit-scrollbar-track { background: transparent; }
            .cic-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .cic-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="cic-sidebar"
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
              <ChildInsuranceSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Child Goal Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/child-education-planner-calculator|Child Education', '/calculators/term-insurance-calculator|Term Insurance', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Child Planning', '/#|Mutual Funds', '/#|Life Insurance', '/#|Education Goal'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

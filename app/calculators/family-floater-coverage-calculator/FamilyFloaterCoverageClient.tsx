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
const tdC = { padding: '10px 14px', fontSize: 13, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'center' as const } as React.CSSProperties;

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
function DonutChart({ baseCover, topUpCover }: { baseCover: number; topUpCover: number }) {
  const total = baseCover + topUpCover;
  const basePct = total > 0 ? (baseCover / total) * 100 : 50;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ - (basePct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" role="img" aria-label={`Coverage split: ${Math.round(basePct)}% Base Cover, ${Math.round(100 - basePct)}% Super Top-Up`}>
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.primary} strokeWidth="16"
        strokeDasharray={circ} strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.4s ease' }} />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="11" fontWeight="700" fontFamily={INTER}>Total Cover</text>
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

function FamilyFloaterSnapshot() {
  const rows = [
    { label: 'Recommended Base Cover', value: 'Rs 15L - Rs 25L' },
    { label: 'Recommended Super Top-Up', value: 'Rs 50L - Rs 1Cr' },
    { label: 'Medical Inflation Rate', value: '14% p.a.' },
    { label: 'Max Sec 80D Benefit', value: 'Rs 75,000 - Rs 1 Lakh' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Floater Insurance Benchmark</span>
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
    { href: '/calculators/section-80d-calculator', label: 'Section 80D Tax Calculator: Health Insurance Tax Savings' },
    { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator: Human Life Value Cover' },
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
  { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator' },
  { href: '/calculators/life-insurance-calculator', label: 'Life Insurance Calculator' },
  { href: '/calculators/section-80d-calculator', label: 'Section 80D Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
  { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
  { href: '/calculators/nps-calculator', label: 'NPS Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  { q: 'How much family floater cover is enough for a family of 4 in India?', a: 'For a family of four in a metro city, a base family floater cover of Rs 15 lakh to Rs 25 lakh paired with a super top-up policy of Rs 50 lakh to Rs 1 crore is recommended to protect against modern tertiary treatment costs and 14% annual medical inflation.' },
  { q: 'What is a family floater health insurance policy?', a: 'A family floater policy is a single health insurance policy where the overall sum insured is shared among all covered family members, allowing any member to draw up to the full limit for hospitalisation expenses.' },
  { q: 'How does city tier affect health insurance sum insured calculation?', a: 'Metro (Tier 1) cities like Mumbai, Delhi, and Bengaluru have ICU and surgical costs roughly 40% to 60% higher than Tier 2 or Tier 3 towns, requiring a higher base sum insured for families residing in or seeking treatment in metros.' },
  { q: 'Is corporate health insurance enough for a family?', a: 'Corporate health insurance is rarely sufficient because standard employer policies cap cover at Rs 3 lakh to Rs 5 lakh, end immediately upon job transition or retirement, and often carry co-pay or sub-limit clauses.' },
  { q: 'What is a super top-up policy and why is it recommended?', a: 'A super top-up health insurance policy provides high additional coverage at a low premium once total hospital bills in a policy year exceed a specified deductible threshold, such as Rs 10 lakh or Rs 15 lakh.' },
  { q: 'How does age of the oldest member impact family floater premium?', a: 'Health insurance premiums for family floater plans are computed primarily based on the age of the oldest family member, jumping significantly once the oldest member crosses 45, 55, or 60 years.' },
  { q: 'How much tax can I save under Section 80D for family health insurance?', a: 'Under Section 80D of the Income Tax Act, you can claim up to Rs 25,000 per financial year for health insurance premiums paid for self, spouse, and children, plus an additional Rs 25,000 (or Rs 50,000 if parents are senior citizens) for parents.' },
  { q: 'Should senior citizen parents be included in a family floater policy?', a: 'Senior citizen parents should generally have a separate health insurance policy because including a 65-year-old in a floater with young adults sharply increases the premium for the entire family and risks consuming the shared sum insured.' },
  { q: 'What is medical inflation rate in India?', a: 'Medical inflation in India averages 12% to 14% annually, which is more than double general CPI inflation, meaning healthcare costs double approximately every 5 to 6 years.' },
  { q: 'How does restore or recharge benefit work in family floater plans?', a: 'Restore benefit automatically reinstates 100% of your sum insured if it gets exhausted by a claim during the policy year, ensuring other family members remain covered for subsequent illness or hospitalization.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function FamilyFloaterCoverageClient() {
  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'estimator' | 'topup'>('estimator');

  // Input states
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(2);
  const [hasSeniorParents, setHasSeniorParents] = useState<boolean>(false);
  const [oldestAge, setOldestAge] = useState<number>(35);
  const [cityTier, setCityTier] = useState<'tier1' | 'tier2'>('tier1');
  const [corpCover, setCorpCover] = useState<number>(500000);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state from localStorage
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-family-floater-coverage-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.adults !== undefined) setAdults(d.adults);
      if (d.children !== undefined) setChildren(d.children);
      if (d.hasSeniorParents !== undefined) setHasSeniorParents(d.hasSeniorParents);
      if (d.oldestAge !== undefined) setOldestAge(d.oldestAge);
      if (d.cityTier !== undefined) setCityTier(d.cityTier);
      if (d.corpCover !== undefined) setCorpCover(d.corpCover);
    } catch { /* ignore */ }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fermor-family-floater-coverage-v1', JSON.stringify({
        adults, children, hasSeniorParents, oldestAge, cityTier, corpCover
      }));
    } catch { /* ignore */ }
  }, [adults, children, hasSeniorParents, oldestAge, cityTier, corpCover]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math logic
  const calculations = useMemo(() => {
    // Base cost calculation based on city tier & oldest age
    const cityMultiplier = cityTier === 'tier1' ? 1.5 : 1.0;
    const ageMultiplier = oldestAge > 55 ? 1.8 : oldestAge > 45 ? 1.4 : 1.0;
    
    // Per adult base cover requirement: Rs 7.5L in Tier 1, Rs 5L in Tier 2
    // Per child base cover: Rs 2.5L
    const rawBaseRequirement = ((adults * 750000) + (children * 250000)) * cityMultiplier * ageMultiplier;
    
    // Round up to nearest 5 Lakh slab (Min 10L, Max 50L)
    const recBaseCover = Math.min(5000000, Math.max(1000000, Math.ceil(rawBaseRequirement / 500000) * 500000));
    
    // Recommended Super Top-Up cover (e.g. 50L to 1 Crore)
    const recTopUpCover = recBaseCover >= 2500000 ? 10000000 : 5000000;
    const totalCover = recBaseCover + recTopUpCover;

    // Estimated Base Premium
    // Base premium rate roughly 0.8% - 1.5% of sum insured based on age
    const baseRate = (oldestAge > 60 ? 0.025 : oldestAge > 45 ? 0.015 : 0.009) * (adults + children * 0.5);
    const estBasePremium = Math.round(recBaseCover * baseRate);
    
    // Super top-up premium is very cheap, approx 15-20% of base policy cost
    const estTopUpPremium = Math.round(estBasePremium * 0.22);
    const estTotalPremium = estBasePremium + estTopUpPremium;

    // Section 80D Tax Benefit
    // Self + Spouse + Children: Rs 25,000 (or Rs 50,000 if senior citizen)
    // Parents: additional Rs 25,000 (or Rs 50,000 if senior citizen)
    const selfLimit = oldestAge >= 60 ? 50000 : 25000;
    const parentLimit = hasSeniorParents ? 50000 : 0;
    const maxSec80DLimit = selfLimit + parentLimit;
    const actual80DDeduction = Math.min(estTotalPremium, maxSec80DLimit);
    const estTaxSaved = Math.round(actual80DDeduction * 0.312); // assuming 30% slab + 4% cess

    const netOutofPocket = Math.max(0, recBaseCover - corpCover);

    return {
      recBaseCover,
      recTopUpCover,
      totalCover,
      estBasePremium,
      estTopUpPremium,
      estTotalPremium,
      maxSec80DLimit,
      actual80DDeduction,
      estTaxSaved,
      netOutofPocket
    };
  }, [adults, children, hasSeniorParents, oldestAge, cityTier, corpCover]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Family Floater Coverage Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate ideal health insurance sum insured, super top-up requirement, and Section 80D tax savings for your family.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 36 }}>
              
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button id="tab-estimator" role="tab" aria-selected={activeTab === 'estimator'} aria-controls="panel-estimator"
                  onClick={() => setActiveTab('estimator')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'estimator' ? 700 : 400,
                    color: activeTab === 'estimator' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'estimator' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Coverage Estimator
                </button>
                <button id="tab-topup" role="tab" aria-selected={activeTab === 'topup'} aria-controls="panel-topup"
                  onClick={() => setActiveTab('topup')}
                  style={{
                    flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === 'topup' ? 700 : 400,
                    color: activeTab === 'topup' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'topup' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s', fontFamily: INTER,
                  }}>
                  Super Top-Up Planner
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Family Profile</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider id="adults" label="Number of Adults" value={adults} min={1} max={4} step={1}
                        display={`${adults} Adult${adults > 1 ? 's' : ''}`} onChange={setAdults} compact />

                      <Slider id="children" label="Number of Children" value={children} min={0} max={4} step={1}
                        display={`${children} Child${children !== 1 ? 'ren' : ''}`} onChange={setChildren} compact />

                      <Slider id="oldest-age" label="Age of Oldest Member" value={oldestAge} min={18} max={75} step={1}
                        display={`${oldestAge} Yrs`} onChange={setOldestAge} compact suffix="Yrs" />

                      {/* City Tier Toggle */}
                      <div style={{ marginBottom: 20 }}>
                        <label style={{ display: 'block', fontSize: 13.5, color: C.ink2, marginBottom: 8 }}>City Tier / Location</label>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => setCityTier('tier1')}
                            style={{ flex: 1, padding: '7px 12px', border: 'none', background: cityTier === 'tier1' ? C.white : 'transparent', color: cityTier === 'tier1' ? C.ink : C.ink3, fontWeight: cityTier === 'tier1' ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                            Tier 1 Metro
                          </button>
                          <button onClick={() => setCityTier('tier2')}
                            style={{ flex: 1, padding: '7px 12px', border: 'none', background: cityTier === 'tier2' ? C.white : 'transparent', color: cityTier === 'tier2' ? C.ink : C.ink3, fontWeight: cityTier === 'tier2' ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                            Tier 2 / Tier 3
                          </button>
                        </div>
                      </div>

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
                      <Slider id="corp-cover" label="Existing Corporate Cover" value={corpCover} min={0} max={2500000} step={50000}
                        display={fmtC(corpCover)} onChange={setCorpCover} compact />

                      {/* Senior Parents Toggle */}
                      <div style={{ marginBottom: 24, border: `1px solid ${C.border}`, padding: '12px 14px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: C.ink2 }}>Include Senior Parents (Sec 80D)?</span>
                        <button onClick={() => setHasSeniorParents(!hasSeniorParents)}
                          aria-pressed={hasSeniorParents}
                          style={{ width: 40, height: 22, borderRadius: 11, background: hasSeniorParents ? C.ink : C.border, border: 'none', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                          <div style={{ width: 18, height: 18, borderRadius: 9, background: C.white, position: 'absolute', top: 2, left: hasSeniorParents ? 20 : 2, transition: 'left 0.2s' }} />
                        </button>
                      </div>

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
                    <DonutChart baseCover={calculations.recBaseCover} topUpCover={calculations.recTopUpCover} />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>Base Floater</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>Super Top-Up</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>Recommended Total Cover</div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>Base + Super Top-Up</div>
                    </div>
                    <span aria-live="polite" aria-label={`Recommended Total Cover: ${fmtC(calculations.totalCover)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtC(calculations.totalCover)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Recommended Base Floater', value: fmtC(calculations.recBaseCover) },
                    { label: 'Super Top-Up Cover', value: fmtC(calculations.recTopUpCover) },
                    { label: 'Estimated Annual Premium', value: `${fmtIN(calculations.estTotalPremium)}/yr` },
                    { label: 'Section 80D Tax Deduction', value: fmtIN(calculations.actual80DDeduction) },
                    { label: 'Estimated Tax Saved (30% slab)', value: fmtIN(calculations.estTaxSaved) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {corpCover > 0 && (
                    <div style={{ width: '100%', marginTop: 14, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px' }}>
                      <span style={{ fontSize: 12, color: C.ink2 }}>
                        Corporate cover of <strong>{fmtC(corpCover)}</strong> reduces personal base requirement gap to <strong>{fmtC(calculations.netOutofPocket)}</strong>.
                      </span>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE CONTENT ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-family-floater">
                <h2 style={h2S}>What Is Family Floater Health Insurance?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A family floater health insurance policy is a single policy that covers an entire family under one shared sum insured pool.
                  </p>
                </div>
                <p style={pS}>Unlike individual health policies where each member gets a fixed cover limit, a family floater allows any member of the policy to utilize up to the full sum insured in case of hospitalisation.</p>
                <p style={pS}>For example, in a Rs 15 lakh family floater policy covering two adults and two children, one family member can claim Rs 10 lakh for a major surgery, leaving Rs 5 lakh remaining for the rest of the family during that policy year.</p>
                <p style={pS}>Family floater policies are significantly more cost-effective than buying separate individual policies for each family member because the probability of all family members requiring hospitalization in the exact same year is low.</p>
              </div>

              <div style={secS} id="coverage-formula">
                <h2 style={h2S}>Family Floater Coverage Formula: How Much Do You Need?</h2>
                <p style={pS}>Insurance advisors calculate recommended family health cover using a baseline formula that factors in city hospitalisation costs, family size, and age of the oldest member.</p>
                <div style={{ background: '#f8f9f9', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>Recommended Base Sum Insured Formula</p>
                  <code style={{ fontSize: 13, color: C.dark }}>Base Cover = [(Adults × Rs 7.5L) + (Children × Rs 2.5L)] × City Tier Factor × Age Factor</code>
                </div>
                <p style={pS}>City Tier Factor: Tier 1 Metros = 1.5, Tier 2/3 Towns = 1.0.</p>
                <p style={pS}>Age Factor: Oldest member &lt;45 yrs = 1.0, 45-55 yrs = 1.4, &gt;55 yrs = 1.8.</p>
                <p style={{ ...pS, fontWeight: 600 }}>Worked example for a family of 4 (2 Adults, 2 Children) in Mumbai, oldest member age 38:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Raw requirement: [(2 × Rs 7.5L) + (2 × Rs 2.5L)] = Rs 20 Lakh</div>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Metro adjustment (1.5x multiplier): Rs 20 Lakh × 1.5 = <strong>Rs 30 Lakh</strong></div>
                  <div style={{ fontSize: 14, color: C.ink2 }}>&#8226; Strategy: Rs 15 Lakh Base Floater + Rs 50 Lakh Super Top-Up</div>
                </div>
              </div>

              <div style={secS} id="city-tier-impact">
                <h2 style={h2S}>City Tier Impact on Hospitalization Costs in India</h2>
                <p style={pS}>Hospital room rents, ICU charges, and surgical fees vary dramatically across Indian cities. A coronary angioplasty or oncology treatment that costs Rs 4 lakh in a Tier 2 town can cost Rs 8 lakh to Rs 12 lakh in a private metro hospital in Delhi or Bengaluru.</p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Estimated medical costs across city tiers in Indian private hospitals.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Procedure / Treatment</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Tier 1 Metro (Mumbai/Delhi)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Tier 2 City (Pune/Jaipur)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Tier 3 Town</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>ICU Bed Charge (per day)</td>
                        <td style={tdR}>Rs 15,000 - Rs 35,000</td>
                        <td style={tdR}>Rs 8,000 - Rs 18,000</td>
                        <td style={tdR}>Rs 4,000 - Rs 8,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Coronary Artery Bypass (CABG)</td>
                        <td style={tdR}>Rs 4.5L - Rs 8.0L</td>
                        <td style={tdR}>Rs 3.0L - Rs 5.0L</td>
                        <td style={tdR}>Rs 2.0L - Rs 3.5L</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Joint Replacement Surgery</td>
                        <td style={tdR}>Rs 4.0L - Rs 6.5L</td>
                        <td style={tdR}>Rs 2.5L - Rs 4.0L</td>
                        <td style={tdR}>Rs 1.8L - Rs 3.0L</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="super-top-up-strategy">
                <h2 style={h2S}>Super Top-Up Strategy: High Cover at Low Premium</h2>
                <p style={pS}>A super top-up policy is the most economical way to expand family health cover up to Rs 1 Crore without paying exorbitant base policy premiums.</p>
                <p style={pS}>Super top-up policies come with a deductible threshold (e.g. Rs 10 lakh). Once cumulative medical expenses in a year cross Rs 10 lakh, the super top-up policy pays all subsequent bills up to the sum insured limit.</p>
              </div>

              <div style={secS} id="section-80d-deduction">
                <h2 style={h2S}>Section 80D Tax Deduction Limits for Health Insurance</h2>
                <p style={pS}>Under Section 80D of the Income Tax Act, premiums paid for family health insurance qualify for tax deductions under the Old Tax Regime.</p>
                
                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Maximum Section 80D tax deduction limits per financial year.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Category</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Self, Spouse &amp; Kids</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Parents (&lt;60 yrs)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Senior Parents (&gt;60 yrs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Individual &lt;60 Years</td>
                        <td style={tdR}>Rs 25,000</td>
                        <td style={tdR}>Rs 25,000</td>
                        <td style={tdR}>Rs 50,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Senior Citizen (&gt;60 Years)</td>
                        <td style={tdR}>Rs 50,000</td>
                        <td style={tdR}>-</td>
                        <td style={tdR}>Rs 50,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="corporate-vs-personal">
                <h2 style={h2S}>Corporate Health Insurance vs Personal Family Floater</h2>
                <p style={pS}>Relying solely on employer corporate health insurance creates severe financial exposure upon job change, layoff, or retirement.</p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Family Floater Coverage Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Family Composition:</strong> Select the number of adults and children to be covered in the policy.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Age and Location:</strong> Move the oldest member slider and choose your city tier (Metro vs Non-Metro).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Input Corporate Cover:</strong> Enter existing employer health insurance if applicable to analyze gap.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Recommendation:</strong> View the recommended base cover, super top-up combination, and Section 80D tax savings.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All recommendations on this page are general estimates based on standard insurance norms in India and do not constitute formal insurance advice or a policy quote. Actual insurance premiums and sum insured eligibility depend on underwriter approval, medical history, and specific plan terms of insurers like Star Health, HDFC ERGO, Niva Bupa, and Care Health. Consult a licensed insurance advisor or SEBI-registered financial planner before purchasing a policy.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .ffc-sidebar::-webkit-scrollbar { width: 5px; }
            .ffc-sidebar::-webkit-scrollbar-track { background: transparent; }
            .ffc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .ffc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="ffc-sidebar"
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
              <FamilyFloaterSnapshot />
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Insurance Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <RelatedReads />
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/term-insurance-calculator|Term Insurance', '/calculators/life-insurance-calculator|Life Insurance', '/calculators/section-80d-calculator|Section 80D', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
        { hd: 'Topics', links: ['/#|Health Insurance', '/#|Tax Saving', '/#|Mutual Funds', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

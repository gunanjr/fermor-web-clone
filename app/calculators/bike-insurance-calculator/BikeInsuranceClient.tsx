'use client';

import { CHART_PAIR, seriesColor } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

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

/* ─── Math ───────────────────────────────────────────────────── */
// IRDAI third-party premium, fixed by engine cc, uniform across every insurer. Last officially
// confirmed 1-year rates, effective April 1, 2022 (a revision has been under review since 2025
// but was not confirmed at time of writing).
type CCBracket = 'upto75' | '75to150' | '150to350' | 'above350';
const TP_RATES: Record<CCBracket, number> = { upto75: 538, '75to150': 714, '150to350': 1366, above350: 2804 };
const CC_LABELS: Record<CCBracket, string> = { upto75: 'Up to 75cc', '75to150': '75cc - 150cc', '150to350': '150cc - 350cc', above350: 'Above 350cc' };

// IRDAI-mandated IDV depreciation schedule. Returns null beyond 5 years, where IDV is mutually
// agreed between insurer and owner rather than fixed by a schedule.
function getDepreciationPct(ageYears: number): number | null {
  if (ageYears <= 0) return 0;
  if (ageYears <= 0.5) return 5;
  if (ageYears <= 1) return 15;
  if (ageYears <= 2) return 20;
  if (ageYears <= 3) return 30;
  if (ageYears <= 4) return 40;
  if (ageYears <= 5) return 50;
  return null;
}

// No Claim Bonus slabs, applicable to own-damage premium only, never to third-party.
function getNCBPct(claimFreeYears: number): number {
  const table: Record<number, number> = { 0: 0, 1: 20, 2: 25, 3: 35, 4: 45 };
  if (claimFreeYears >= 5) return 50;
  return table[claimFreeYears] ?? 0;
}

const GST_RATE = 18;

interface PremiumResult {
  idv: number;
  depreciationPct: number | null;
  tpPremium: number;
  odPremium: number;
  ncbPct: number;
  odAfterNcb: number;
  subtotal: number;
  gst: number;
  total: number;
}

function calcPremium(exShowroom: number, ageYears: number, cc: CCBracket, claimFreeYears: number, odRate: number, isComprehensive: boolean): PremiumResult {
  const depreciationPct = getDepreciationPct(ageYears);
  const effectiveDep = depreciationPct ?? 50;
  const idv = exShowroom * (1 - effectiveDep / 100);
  const tpPremium = TP_RATES[cc];
  const odPremium = isComprehensive ? idv * odRate / 100 : 0;
  const ncbPct = getNCBPct(claimFreeYears);
  const odAfterNcb = odPremium * (1 - ncbPct / 100);
  const subtotal = tpPremium + odAfterNcb;
  const gst = subtotal * GST_RATE / 100;
  const total = subtotal + gst;
  return { idv, depreciationPct, tpPremium, odPremium, ncbPct, odAfterNcb, subtotal, gst, total };
}

/* ─── Donut Chart: TP vs OD vs GST composition ────────────────── */
function DonutChart3({ tp, od, gst }: { tp: number; od: number; gst: number }) {
  const total = tp + od + gst;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const segments = [
    { value: tp, color: CHART_PAIR.primary, label: 'Third-party' },
    { value: od, color: CHART_PAIR.secondary, label: 'Own damage' },
    { value: gst, color: seriesColor(2), label: 'GST' },
  ];
  let offset = 0;
  const tpPct = Math.round((tp / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Premium composition: ${tpPct}% third-party, ${Math.round((od / total) * 100)}% own damage, ${Math.round((gst / total) * 100)}% GST`}
      style={{ display: 'block' }}>
      {segments.map((seg, i) => {
        const arc = (seg.value / total) * circ;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={seg.color} strokeWidth={sw}
            strokeDasharray={`${arc} ${circ - arc}`} strokeDashoffset={circ / 4 - offset}
            style={{ transition: 'stroke-dasharray 0.4s ease' }} />
        );
        offset += arc;
        return el;
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Third-party</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{tpPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 12 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Sidebar list ───────────────────────────────────────────── */
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

const POPULAR = [
  { href: '/calculators/bike-loan-emi-calculator',             label: 'Bike Loan EMI Calculator' },
  { href: '/calculators/emi-calculator',                       label: 'EMI Calculator' },
  { href: '/calculators/car-loan-calculator',                  label: 'Car Loan Calculator' },
  { href: '/calculators/bank-interest-comparison-calculator',  label: 'Bank Interest Rate Comparison' },
  { href: '/calculators/income-tax-calculator',                label: 'Income Tax Calculator' },
  { href: '/calculators/emergency-fund-calculator',            label: 'Emergency Fund Calculator' },
  { href: '/calculators/fd-laddering-calculator',              label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',          label: 'SIP Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator', label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/loan-eligibility-calculator', label: 'Loan Eligibility Calculator' },
  { href: '/calculators/cagr-calculator',         label: 'CAGR Calculator' },
  { href: '/calculators/inflation-calculator',    label: 'Inflation Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Is bike insurance mandatory in India?',
    a: 'Yes. At minimum, third-party bike insurance is legally mandatory under Section 146 of the Motor Vehicles Act, 1988 for every two-wheeler on Indian roads. Riding without at least a valid third-party policy is a punishable offence, with fines that increase for repeat violations.',
  },
  {
    q: 'What is the third-party bike insurance premium for my cc?',
    a: 'IRDAI fixes the third-party premium by engine capacity, not by insurer, so it is identical everywhere. The last officially confirmed 1-year rates, effective since April 2022, are Rs 538 for up to 75cc, Rs 714 for 75-150cc, Rs 1,366 for 150-350cc, and Rs 2,804 above 350cc. A revision has reportedly been under review since 2025 but was not confirmed at the time of writing, so verify the current rate before buying.',
  },
  {
    q: 'What is IDV in bike insurance?',
    a: 'IDV (Insured Declared Value) is the maximum amount your insurer will pay if your bike is stolen or damaged beyond repair. It is calculated as the manufacturer\'s ex-showroom price minus depreciation based on the bike\'s age, and it is the figure your own-damage premium is calculated on.',
  },
  {
    q: 'How is IDV calculated based on the age of my bike?',
    a: 'IRDAI mandates a fixed depreciation schedule: 5% for a bike up to 6 months old, 15% for 6 months to 1 year, 20% for 1-2 years, 30% for 2-3 years, 40% for 3-4 years, and 50% for 4-5 years. Beyond 5 years, the IDV is mutually agreed between insurer and owner rather than fixed by a schedule.',
  },
  {
    q: 'What is No Claim Bonus (NCB) in bike insurance?',
    a: 'NCB is a discount on your own-damage premium for every consecutive claim-free year, starting at 20% after 1 year, rising to 25% after 2 years, 35% after 3 years, 45% after 4 years, and capping at 50% from 5 years onward. NCB belongs to you as the rider, not the vehicle, so it transfers if you sell your bike and insure a new one.',
  },
  {
    q: 'Does NCB reduce my third-party premium?',
    a: 'No. NCB only applies to the own-damage portion of a comprehensive policy. The third-party premium is a flat, IRDAI-fixed amount by engine cc and does not change with your claim history.',
  },
  {
    q: 'What is the difference between third-party and comprehensive bike insurance?',
    a: 'Third-party insurance covers only damage or injury you cause to another person or their property, and is the legal minimum. Comprehensive insurance adds own-damage cover for your own bike, protecting against accidents, theft, fire, and natural calamities, at a materially higher premium.',
  },
  {
    q: 'How much GST applies to bike insurance premium?',
    a: 'GST on motor insurance, including two-wheeler insurance, is 18%, applied on top of the total premium (third-party plus own-damage, after any NCB discount). This rate is unchanged even after the 2025-26 GST rate reforms that reduced GST on individual life and health insurance.',
  },
  {
    q: 'What is a good own-damage premium rate to expect?',
    a: 'Own-damage premium typically runs 2-3% of your bike\'s IDV per year, though the exact rate is set by each insurer individually and is not fixed by IRDAI the way third-party premium is. A higher IDV means a higher own-damage premium, since the insurer is on the hook for a larger payout in a total loss.',
  },
  {
    q: 'How can I reduce my bike insurance premium?',
    a: 'Build your No Claim Bonus by avoiding small claims you can pay out of pocket, choose a voluntary deductible if your insurer offers one, and set the IDV honestly rather than inflating it, since a higher IDV means a higher own-damage premium for a benefit you will rarely fully use. Comparing quotes across insurers before renewal also helps, since own-damage rates are not standardised.',
  },
  {
    q: 'What are common bike insurance add-ons?',
    a: 'Zero depreciation cover removes the deduction for wear-and-tear on plastic and rubber parts during a claim. Engine protection cover pays for water ingress or oil leakage damage not covered by a standard policy. Roadside assistance covers towing, fuel delivery, and minor on-spot repairs. Each add-on increases the premium and is optional on top of a comprehensive policy.',
  },
  {
    q: 'Which insurers sell two-wheeler insurance in India?',
    a: 'Two-wheeler insurance is sold by general insurers including ICICI Lombard, HDFC Ergo, Bajaj Allianz, Tata AIG, Reliance General, Digit, Acko, National Insurance, United India Insurance, New India Assurance, and SBI General, among others, all regulated by IRDAI. Aggregators like Policybazaar compare quotes across these insurers rather than being insurers themselves.',
  },
  {
    q: 'Can I renew bike insurance online?',
    a: 'Yes. Every major insurer and aggregator offers online renewal, where you enter your registration number and existing policy details, and the system pulls your NCB and prior claim history to generate a renewal quote. Renewing before your existing policy lapses preserves your accumulated NCB.',
  },
  {
    q: 'What happens if my bike insurance lapses?',
    a: 'If a comprehensive policy lapses, you lose the accumulated No Claim Bonus on renewal in most cases, and driving without at least third-party cover is a legal offence with fines. Insurers may also require a fresh vehicle inspection before issuing a new policy after a long lapse.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function BikeInsuranceClient() {
  const defaultSettings = {
    exShowroom: 85000,
    ageYears: 1,
    cc: '75to150' as CCBracket,
    claimFreeYears: 0,
    isComprehensive: true,
    odRate: 2.5,
  };
  const { settings, updateSettings } = useCalculatorSettings('bike-insurance', defaultSettings);
  const { exShowroom, ageYears, cc, claimFreeYears, isComprehensive, odRate } = settings;

  const setExShowroom      = (v: number) => updateSettings({ exShowroom: v });
  const setAgeYears        = (v: number) => updateSettings({ ageYears: v });
  const setCc              = (v: CCBracket) => updateSettings({ cc: v });
  const setClaimFreeYears  = (v: number) => updateSettings({ claimFreeYears: v });
  const setIsComprehensive = (v: boolean) => updateSettings({ isComprehensive: v });
  const setOdRate          = (v: number) => updateSettings({ odRate: v });

  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(
    () => calcPremium(exShowroom, ageYears, cc, claimFreeYears, odRate, isComprehensive),
    [exShowroom, ageYears, cc, claimFreeYears, odRate, isComprehensive]
  );

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

  const pillActive: React.CSSProperties = { padding: '5px 14px', fontSize: 12.5, background: C.white, color: C.ink, border: `1.5px solid ${C.ink}`, fontWeight: 700, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' };
  const pillInactive: React.CSSProperties = { padding: '5px 14px', fontSize: 12.5, background: 'transparent', color: C.ink3, border: `1px solid ${C.border}`, fontWeight: 500, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Bike Insurance Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate your two wheeler insurance premium using IRDAI&apos;s fixed third-party rates, your bike&apos;s IDV, No Claim Bonus, and 18% GST.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Bike Insurance Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '32px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Ex-Showroom Price" id="bike-price" value={exShowroom} min={30000} max={2000000} step={5000} fmt={fmtC} onChange={setExShowroom} compact={mobile} />

                      <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Engine Capacity</label>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {(Object.keys(CC_LABELS) as CCBracket[]).map(k => (
                            <button key={k} onClick={() => setCc(k)} style={cc === k ? pillActive : pillInactive}>
                              {CC_LABELS[k]}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Slider label="Vehicle Age (Years)" id="bike-age" value={ageYears} min={0} max={10} step={0.5} fmt={v => v > 5 ? '5+ yr' : `${v} yr`} onChange={setAgeYears} compact={mobile} />

                      <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Policy Type</label>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden', width: 'fit-content' }}>
                          {[{ v: false, l: 'Third-Party Only' }, { v: true, l: 'Comprehensive' }].map(({ v, l }) => (
                            <button key={l} onClick={() => setIsComprehensive(v)}
                              style={{ padding: '7px 16px', border: 'none', background: isComprehensive === v ? C.white : 'transparent', color: isComprehensive === v ? C.ink : C.ink3, fontWeight: isComprehensive === v ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                              {l}
                            </button>
                          ))}
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
                      <div style={{ marginBottom: 24 }}>
                        <label style={{ fontSize: 14.5, color: C.ink2, fontWeight: 400, fontFamily: INTER, display: 'block', marginBottom: 10 }}>Claim-Free Years (NCB)</label>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {[0, 1, 2, 3, 4, 5].map(y => (
                            <button key={y} onClick={() => setClaimFreeYears(y)} style={claimFreeYears === y ? pillActive : pillInactive}>
                              {y === 0 ? 'None' : `${y}${y === 5 ? '+' : ''} yr`}
                            </button>
                          ))}
                        </div>
                      </div>
                      <Slider label="Own-Damage Premium Rate" id="bike-odrate" value={odRate} min={1.5} max={4} step={0.1} fmt={v => `${v.toFixed(1)}%`} onChange={setOdRate} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Own-damage rate is set by each insurer, typically 2-3% of IDV. Adjust this to match a specific quote you have received.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Estimated Annual Premium
                    </span>
                    <span aria-live="polite" aria-label={`Estimated premium: ${fmtIN(result.total)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(result.total)}
                    </span>
                  </div>

                  {[
                    { label: 'Insured Declared Value (IDV)', value: fmtC(result.idv) },
                    { label: 'Third-Party Premium', value: fmtC(result.tpPremium) },
                    ...(isComprehensive ? [
                      { label: `Own-Damage Premium (before NCB)`, value: fmtC(result.odPremium) },
                      { label: `Own-Damage After NCB (${result.ncbPct}% off)`, value: fmtC(result.odAfterNcb) },
                    ] : []),
                    { label: 'GST (18%)', value: fmtC(result.gst) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {result.depreciationPct === null && (
                    <div style={{ width: '100%', marginTop: 12, padding: '10px 14px', background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8 }}>
                      <span style={{ fontSize: 12.5, color: '#A15C00', fontWeight: 600 }}>Vehicle is over 5 years old: IDV shown assumes 50% depreciation, but the real IDV is mutually agreed with your insurer.</span>
                    </div>
                  )}

                  {isComprehensive && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart3 tp={result.tpPremium} od={result.odAfterNcb} gst={result.gst} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1, flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Third-party</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Own damage</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: '#a6dbc4' }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>GST</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-bike-insurance">What Is Bike Insurance?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Bike insurance (two-wheeler insurance) is a policy that covers third-party liability, and optionally your own vehicle, against accident, theft, fire, and natural calamities. Third-party cover is a legal requirement for every registered two-wheeler in India.
                  </p>
                </div>
                <p style={p}>
                  Under Section 146 of the Motor Vehicles Act, 1988, riding without at least a valid third-party policy is an offence. A comprehensive policy adds own-damage cover on top of that legal minimum, protecting your own bike as well as third parties.
                </p>
                <p style={p}>
                  The Insurance Regulatory and Development Authority of India (<a href="https://irdai.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>IRDAI</a>) fixes the third-party premium by engine cc, uniform across every insurer, while the own-damage premium and add-ons vary by insurer.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="premium-formula">Bike Insurance Premium Formula</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Total Premium = (Third-Party + Own-Damage x (1 - NCB%)) x 1.18
                  </code>
                </div>
                <p style={p}>
                  IDV = Ex-showroom price x (1 - depreciation%). Own-damage premium = IDV x own-damage rate (typically 2-3%). NCB reduces only the own-damage portion. GST at 18% applies to the full total, after the NCB discount.
                </p>
                <p style={p}>
                  <strong>Worked example:</strong> A 75-150cc scooter with a Rs 85,000 ex-showroom price, 1 year old (15% depreciation), gives an IDV of Rs 72,250. At a 2.5% own-damage rate, that is Rs 1,806 own-damage premium. With 1 claim-free year (20% NCB), own-damage drops to Rs 1,445. Add the Rs 714 third-party premium for a Rs 2,159 subtotal, plus 18% GST (Rs 389), for a total premium of Rs 2,548.
                </p>
              </div>

              <div style={sec} id="tp-rates-by-cc">
                <h2 style={h2}>Third-Party Bike Insurance Rates by Engine CC</h2>
                <p style={p}>
                  These are the last officially confirmed IRDAI third-party rates, effective since April 1, 2022. A revision has reportedly been under review since 2025 but had not been notified at the time of writing, so confirm the current rate with any insurer before buying.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>IRDAI third-party 2-wheeler premium by engine cc, 1-year policy</caption>
                    <thead><tr><th style={thS} scope="col">Engine Capacity</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">1-Year Premium</th></tr></thead>
                    <tbody>
                      {(Object.keys(CC_LABELS) as CCBracket[]).map((k, i) => (
                        <tr key={k} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{CC_LABELS[k]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {TP_RATES[k].toLocaleString('en-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="idv-depreciation">
                <h2 style={h2}>IDV and Age-Based Depreciation</h2>
                <p style={p}>
                  IDV only affects your own-damage premium, not third-party, since third-party is a flat cc-based rate. IRDAI fixes the depreciation schedule so every insurer arrives at the same IDV for the same ex-showroom price and age.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>IRDAI IDV depreciation schedule by vehicle age</caption>
                    <thead><tr><th style={thS} scope="col">Vehicle Age</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Depreciation</th></tr></thead>
                    <tbody>
                      {[
                        ['Not exceeding 6 months', '5%'],
                        ['6 months to 1 year', '15%'],
                        ['1 to 2 years', '20%'],
                        ['2 to 3 years', '30%'],
                        ['3 to 4 years', '40%'],
                        ['4 to 5 years', '50%'],
                        ['Beyond 5 years', 'Mutually agreed'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="ncb-slabs">
                <h2 style={h2}>No Claim Bonus Slabs</h2>
                <p style={p}>
                  NCB rewards claim-free years with a growing discount on own-damage premium only. It belongs to you, not the vehicle, so selling your bike and buying a new one carries your NCB forward if you insure the new bike within the required window.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>NCB discount by consecutive claim-free years</caption>
                    <thead><tr><th style={thS} scope="col">Claim-Free Years</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">NCB Discount</th></tr></thead>
                    <tbody>
                      {[['1 year', '20%'], ['2 years', '25%'], ['3 years', '35%'], ['4 years', '45%'], ['5+ years', '50%']].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const, color: '#166534', fontWeight: 700 }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="tp-vs-comprehensive">
                <h2 style={h2}>Third-Party vs Comprehensive: What&apos;s the Difference?</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Third-party vs comprehensive coverage</caption>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">Third-Party</th><th style={thS} scope="col">Comprehensive</th></tr></thead>
                    <tbody>
                      {[
                        ['Legal requirement', 'Meets the minimum', 'Meets the minimum'],
                        ['Covers third-party injury/damage', 'Yes', 'Yes'],
                        ['Covers your own bike', 'No', 'Yes, against accident, theft, fire'],
                        ['Premium', 'Fixed by IRDAI (cc-based)', 'Third-party + own-damage (insurer-set)'],
                        ['NCB applies', 'No', 'Yes, on own-damage portion'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                          <td style={{ ...tdR, color: '#1f7a58', fontWeight: 600 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="premium-by-model">
                <h2 style={h2}>Premium Estimate by Popular Bike Models</h2>
                <p style={p}>
                  These are illustrative estimates using a 1-year-old vehicle, no NCB, a 2.5% own-damage rate, and comprehensive cover, not quotes from any specific insurer. Exact premiums vary by insurer, city, and add-ons chosen.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Illustrative comprehensive premium by model type, 1-year-old, no NCB</caption>
                    <thead><tr><th style={thS} scope="col">Model Type</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Ex-Showroom</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Est. Total Premium</th></tr></thead>
                    <tbody>
                      {[
                        ['Splendor-class 100cc', 75000],
                        ['Activa-class 110cc', 85000],
                        ['Pulsar-class 150cc', 115000],
                        ['Royal Enfield-class 350cc', 210000],
                      ].map(([name, price], i) => {
                        const r = calcPremium(price as number, 1, (price as number) <= 90000 ? '75to150' : (price as number) <= 150000 ? '75to150' : 'above350' as CCBracket, 0, 2.5, true);
                        return (
                          <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{name}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {(price as number).toLocaleString('en-IN')}</td>
                            <td style={{ ...tdR, textAlign: 'right' as const, fontWeight: 700, color: C.dark }}>Rs {Math.round(r.total).toLocaleString('en-IN')}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="gst-on-insurance">
                <h2 style={h2}>GST on Bike Insurance</h2>
                <p style={p}>
                  GST on motor insurance, including two-wheeler policies, is 18%, applied to the total premium after any NCB discount. This is unchanged even after the 2025-26 GST reform that reduced GST on individual life and health insurance premiums, since motor insurance was not part of that specific relief.
                </p>
              </div>

              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Bike Loan EMI Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Financing a new bike? Work out the EMI alongside your insurance premium.</p>
                </div>
                <Link className="fx-btn" href="/calculators/bike-loan-emi-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div style={sec} id="reduce-premium">
                <h2 style={h2}>How to Reduce Your Bike Insurance Premium</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Protect your NCB:</strong> pay small repair bills yourself rather than filing a claim, since one claim resets your bonus to zero.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose a voluntary deductible:</strong> agreeing to pay a fixed amount out of pocket per claim lowers your own-damage premium.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set an honest IDV:</strong> a higher IDV raises your premium for a payout you are unlikely to ever collect in full.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compare insurers at renewal:</strong> own-damage rates are not standardised, so quotes can differ meaningfully for the same bike.
                  </li>
                </ol>
              </div>

              <div style={sec} id="addons">
                <h2 style={h2}>Bike Insurance Add-ons</h2>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Common comprehensive policy add-ons</caption>
                    <thead><tr><th style={thS} scope="col">Add-on</th><th style={thS} scope="col">What It Covers</th></tr></thead>
                    <tbody>
                      {[
                        ['Zero Depreciation', 'Removes wear-and-tear deduction on plastic and rubber parts during a claim'],
                        ['Engine Protection', 'Water ingress and oil leakage damage not covered by a standard policy'],
                        ['Roadside Assistance', 'Towing, fuel delivery, and minor on-spot repair'],
                        ['NCB Protection', 'Preserves your accumulated NCB even after one claim in a policy year'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdR}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="where-to-buy">
                <h2 style={h2}>Where to Buy Bike Insurance</h2>
                <p style={p}>
                  Two-wheeler insurance in India is underwritten by IRDAI-regulated general insurers, including ICICI Lombard, HDFC Ergo, Bajaj Allianz, Tata AIG, Reliance General, Digit, Acko, National Insurance, United India Insurance, New India Assurance, and SBI General. Aggregators such as Policybazaar compare quotes across these insurers rather than underwriting policies themselves.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>
                  <strong>Third-party rates may have changed.</strong> The rates shown are the last officially confirmed IRDAI figures from April 2022. A revision has been discussed since 2025 but was not confirmed at the time of writing.
                </p>
                <p style={p}>
                  <strong>Own-damage rate is an assumption, not a quote.</strong> Each insurer prices own-damage independently based on your city, the specific bike model, and your profile, so the real premium from any one insurer can differ from this estimate.
                </p>
                <p style={p}>
                  <strong>Add-ons are not included.</strong> Zero depreciation, engine protection, and roadside assistance each add to the premium shown here.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Bike Insurance Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your bike&apos;s ex-showroom price:</strong> this is the base value your IDV is calculated from.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select engine cc and vehicle age:</strong> cc sets your fixed third-party premium; age sets IDV depreciation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select claim-free years and policy type:</strong> claim-free years set your NCB discount; choose third-party only or comprehensive.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Read the estimated premium:</strong> the breakdown shows third-party, own-damage after NCB, GST, and the total.
                  </li>
                </ol>
              </div>


              <div style={{ margin: '44px 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Third-party premium reflects the last officially confirmed IRDAI rate (effective April 2022); a revision has reportedly been under review since 2025 but was not confirmed at the time of writing. Own-damage premium rate, add-ons, and any insurer-specific discounts are not standardised and vary between insurers. This calculator is for educational and planning purposes only and does not constitute insurance advice or a quote. Confirm the exact premium with a licensed insurer before purchasing a policy.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .bike-ins-sidebar::-webkit-scrollbar { width: 5px; }
            .bike-ins-sidebar::-webkit-scrollbar-track { background: transparent; }
            .bike-ins-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .bike-ins-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="bike-ins-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20, alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter legalNote="Results are indicative. Not financial advice." columns={pipeColumns([
              { hd: 'Calculators', links: ['/calculators/bike-loan-emi-calculator|Bike Loan EMI', '/calculators/emi-calculator|EMI', '/calculators/car-loan-calculator|Car Loan', '/calculators/bank-interest-comparison-calculator|Bank Rates', '/calculators/fd-laddering-calculator|FD', '/calculators/sip-calculator|SIP'] },
              { hd: 'Topics',      links: ['/calculators/bike-loan-emi-calculator|Vehicle Loans', '/calculators/emergency-fund-calculator|Emergency Fund', '/calculators/income-tax-calculator|Tax Planning'] },
              { hd: 'Company',     links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
            ])} />
    </div>
  );
}

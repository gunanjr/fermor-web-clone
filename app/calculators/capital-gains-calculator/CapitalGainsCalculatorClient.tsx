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

/* ─── Palette ─────────────────────────────────────────────────── */
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

/* ─── Helpers ───────────────────────────────────────────────── */
const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(Math.abs(n)));
const fmtC = (n: number) => {
  if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
  return fmtIN(n);
};

/* ─── Math ──────────────────────────────────────────────────── */
const LTCG_EXEMPTION = 125000;
const LTCG_RATE = 0.125;
const STCG_RATE = 0.20;

type HoldingPeriod = 'long' | 'short';

interface GainResult {
  grossGain: number;
  exemption: number;
  taxableGain: number;
  taxRate: number;
  baseTax: number;
  cess: number;
  tax: number;
  netGain: number;
}

const CESS_RATE = 0.04;

function calcCapitalGains(saleValue: number, purchaseValue: number, expenses: number, holding: HoldingPeriod, usedExemption: number, includeCess: boolean): GainResult {
  const grossGain = saleValue - purchaseValue - expenses;
  const isLong = holding === 'long';
  const taxRate = isLong ? LTCG_RATE : STCG_RATE;
  const remainingExemption = Math.max(0, LTCG_EXEMPTION - usedExemption);
  const exemption = isLong ? Math.min(remainingExemption, Math.max(0, grossGain)) : 0;
  const taxableGain = Math.max(0, grossGain - exemption);
  const baseTax = Math.round(taxableGain * taxRate);
  const cess = includeCess ? Math.round(baseTax * CESS_RATE) : 0;
  const tax = baseTax + cess;
  const netGain = grossGain - tax;
  return { grossGain, exemption, taxableGain, taxRate, baseTax, cess, tax, netGain };
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ segments, centerLabel, centerValue }: {
  segments: { value: number; color: string }[]; centerLabel: string; centerValue: string;
}) {
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cum = 0;
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      {total > 0 && segments.map((seg, i) => {
        if (seg.value <= 0) return null;
        const len = (seg.value / total) * circ;
        const off = (((circ / 4 - cum) % circ) + circ) % circ;
        cum += len;
        return (
          <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={seg.color} strokeWidth={sw}
            strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={off}
            style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }} />
        );
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{centerLabel}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{centerValue}</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
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

/* ─── Holding period toggle ───────────────────────────────────── */
function HoldingToggle({ value, onChange, compact }: { value: HoldingPeriod; onChange: (v: HoldingPeriod) => void; compact?: boolean }) {
  return (
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: compact ? 10 : 16 }}>Holding Period</label>
      <div style={{ display: 'flex', gap: 8 }}>
        {([
          ['long',  'More than 1 year (LTCG)'],
          ['short', 'Up to 1 year (STCG)'],
        ] as [HoldingPeriod, string][]).map(([v, label]) => (
          <button key={v} onClick={() => onChange(v)}
            style={{
              flex: 1, fontSize: compact ? 12 : 13, fontWeight: value === v ? 700 : 500,
              color: value === v ? C.dark : C.ink2,
              background: value === v ? C.paleLime : C.white,
              border: `1.5px solid ${value === v ? C.lime2 : C.border}`,
              borderRadius: 8, padding: compact ? '9px 8px' : '11px 10px', cursor: 'pointer', fontFamily: INTER,
            }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── CA CTA ────────────────────────────────────────────────── */

/* ─── Sidebar list ──────────────────────────────────────────── */
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
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/sip-calculator',        label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',    label: 'Lumpsum Calculator' },
  { href: '/calculators/fd-calculator',         label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',        label: 'PPF Calculator' },
];
const MORE = [
  { href: '/calculators/swp-calculator',                label: 'SWP Calculator' },
  { href: '/calculators/nps-calculator',                label: 'NPS Calculator' },
  { href: '/calculators/compound-interest-calculator',  label: 'Compound Interest Calculator' },
  { href: '/calculators/ssy-calculator',                label: 'SSY Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the capital gains tax rate on shares and equity mutual funds in FY 2025-26?',
    a: 'For listed equity shares and equity-oriented mutual funds where securities transaction tax (STT) has been paid, short-term capital gains (holding period of 12 months or less) are taxed at 20%, and long-term capital gains (holding period of more than 12 months) are taxed at 12.5% on the amount exceeding ₹1.25 lakh in a financial year. These rates apply to transfers made on or after 23 July 2024.',
  },
  {
    q: 'How is the holding period calculated for shares and mutual funds?',
    a: 'The holding period runs from the day after the date of purchase, or allotment in the case of mutual fund units, to the date of sale, both included. For listed equity shares and equity mutual funds, a holding period of more than 12 months qualifies as long term. If you invested through a SIP, each instalment has its own purchase date and is treated as a separate investment for this purpose.',
  },
  {
    q: 'What is the Rs 1.25 lakh LTCG exemption, and does it apply every year?',
    a: 'Long-term capital gains from listed equity shares and equity mutual funds up to Rs 1.25 lakh in a financial year are exempt from tax. This exemption is available afresh every financial year and applies to your total long-term equity gains for the year, not per investment. Only the amount above Rs 1.25 lakh is taxed at 12.5%.',
  },
  {
    q: 'Can I set off a capital loss against capital gains?',
    a: 'Yes. Short-term capital losses can be set off against both short-term and long-term capital gains in the same year. Long-term capital losses can only be set off against long-term capital gains. Any loss that cannot be set off in the current year can be carried forward for up to 8 assessment years, provided you file your income tax return on time.',
  },
  {
    q: 'How are gains on debt mutual funds taxed?',
    a: 'For debt mutual funds purchased on or after 1 April 2023, all gains are treated as short-term capital gains regardless of how long you hold the units, and are taxed at your applicable income tax slab rate. The indexation benefit and the concept of long-term holding no longer apply to these funds.',
  },
  {
    q: 'What about shares or mutual funds I bought before 31 January 2018?',
    a: 'For listed equity shares and equity mutual funds acquired on or before 31 January 2018, the cost of acquisition for LTCG purposes is the higher of the actual cost and the lower of the fair market value on 31 January 2018 and the actual sale price. This grandfathering provision protects gains that had already accrued before LTCG tax was reintroduced in 2018.',
  },
  {
    q: 'Do I have to pay advance tax on capital gains?',
    a: 'Yes, if your total tax liability for the year, including tax on capital gains, exceeds Rs 10,000. Since capital gains are often unpredictable, the tax on them can be paid in the remaining advance tax instalments after the gain arises, without attracting interest for the instalments that fell due earlier.',
  },
  {
    q: 'Is this calculator applicable to property, gold, or unlisted shares?',
    a: 'This calculator is built for listed equity shares and equity-oriented mutual funds, taxed at 20% short term or 12.5% long term above the Rs 1.25 lakh exemption. Property, gold, debt funds, and unlisted shares follow different holding-period thresholds and tax rules, so the results shown here would not be accurate for those assets.',
  },
  {
    q: 'Do intraday trading gains count as capital gains?',
    a: 'No. Buying and selling the same share on the same day without taking delivery is treated as speculative business income, not a capital gain. It is taxed under "Income from Business or Profession" at your applicable slab rate, and this calculator does not apply to it.',
  },
  {
    q: 'Which ITR form do I use to report capital gains?',
    a: 'Capital gains are reported in Schedule CG of ITR-2 if you have no business or professional income, or ITR-3 if you do. ITR-1 (Sahaj) cannot be used in a year you have any capital gains to report, even if the tax payable is zero after the exemption.',
  },
  {
    q: 'Do I need to report capital gains in my ITR if no tax is due after the exemption?',
    a: 'Yes. The ₹1.25 lakh LTCG exemption reduces the tax payable to zero, but the gain itself still has to be disclosed in Schedule CG of your return. Not reporting it, even when no tax is owed, can trigger a mismatch notice since your broker or fund house also reports the transaction to the tax department.',
  },
  {
    q: 'What if I have both short-term and long-term capital gains in the same year?',
    a: 'Each gain is computed and taxed separately based on its own holding period. Short-term gains from equity are taxed at 20%, long-term gains above the ₹1.25 lakh exemption at 12.5%, and both figures are reported under their own heads in Schedule CG before being added to your total tax liability for the year.',
  },
  {
    q: 'Is cess or surcharge added on top of the capital gains tax rate?',
    a: 'Yes. A 4% Health and Education Cess is added on top of the capital gains tax computed at 12.5% or 20%. A surcharge may also apply if your total income crosses the relevant threshold, at rates that depend on your total income slab, not just the capital gain itself. This calculator shows the base tax before cess and surcharge.',
  },
  {
    q: 'How is the cost of acquisition calculated for bonus or rights shares?',
    a: 'Bonus shares allotted after 1 April 2001 have a cost of acquisition of zero, since you did not pay anything for them, so the entire sale proceeds count as gain. Rights shares are treated like a normal purchase, with the cost of acquisition being the price you actually paid to subscribe to them.',
  },
  {
    q: 'What is the cost basis for shares I received as a gift or inheritance?',
    a: 'For gifted or inherited shares, the cost of acquisition is the amount the previous owner originally paid, not the value on the date you received them. The holding period also carries over: it is calculated from the previous owner\'s original purchase date, not the date of the gift or inheritance.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function CapitalGainsCalculatorClient() {
  const title = null;
  const defaultSettings = { purchaseValue: 500000, saleValue: 800000, expenses: 5000, holding: 'long' as HoldingPeriod, usedExemption: 0, includeCess: false };
  const { settings, updateSettings } = useCalculatorSettings('capital-gains-calculator', defaultSettings);
  const { purchaseValue, saleValue, expenses, holding, usedExemption, includeCess } = settings;
  const setPurchaseValue = (v: any) => updateSettings({ purchaseValue: typeof v === 'function' ? v(settings.purchaseValue) : v });
  const setSaleValue = (v: any) => updateSettings({ saleValue: typeof v === 'function' ? v(settings.saleValue) : v });
  const setExpenses = (v: any) => updateSettings({ expenses: typeof v === 'function' ? v(settings.expenses) : v });
  const setHolding = (v: HoldingPeriod) => updateSettings({ holding: v });
  const setUsedExemption = (v: any) => updateSettings({ usedExemption: typeof v === 'function' ? v(settings.usedExemption) : v });
  const setIncludeCess = (v: boolean) => updateSettings({ includeCess: v });
        const [mobile,        setMobile]        = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => calcCapitalGains(saleValue, purchaseValue, expenses, holding, usedExemption, includeCess), [saleValue, purchaseValue, expenses, holding, usedExemption, includeCess]);
  const { grossGain, exemption, taxableGain, taxRate, baseTax, cess, tax, netGain } = result;
  const isLoss = grossGain <= 0;
  const netGainPositive = Math.max(0, netGain);
  const barTotal = tax + netGainPositive;
  const taxPct = barTotal > 0 ? Math.round((tax / barTotal) * 100) : 0;
  const gainPct = 100 - taxPct;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>{title || `Capital Gains Tax Calculator`}</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  {!showAdvanced ? (
                    <>
                      {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 36px' }}>Investment Details</p>}

                      <Slider label="Purchase Value" value={purchaseValue} min={10000} max={10000000} step={5000}
                        fmt={v => `₹${fmtC(v)}`} onChange={setPurchaseValue} compact={mobile} />
                      <Slider label="Sale Value" value={saleValue} min={10000} max={15000000} step={5000}
                        fmt={v => `₹${fmtC(v)}`} onChange={setSaleValue} compact={mobile} />
                      <Slider label="Transfer Expenses (Brokerage etc.)" value={expenses} min={0} max={100000} step={500}
                        fmt={v => `₹${fmtC(v)}`} onChange={setExpenses} compact={mobile} />
                      <HoldingToggle value={holding} onChange={setHolding} compact={mobile} />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.ink }}>
                        More settings
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 36px' }}>More Settings</p>}

                      <Slider label="LTCG Exemption Already Used This Year" value={usedExemption} min={0} max={125000} step={5000}
                        fmt={v => `₹${fmtC(v)}`} onChange={setUsedExemption} compact={mobile} />

                      <div style={{ marginBottom: mobile ? 18 : 40 }}>
                        <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: mobile ? 10 : 16 }}>Include 4% Cess in Tax Shown</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {([[false, 'No, base tax only'], [true, 'Yes, tax + cess']] as [boolean, string][]).map(([v, label]) => (
                            <button key={String(v)} onClick={() => setIncludeCess(v)}
                              style={{
                                flex: 1, fontSize: mobile ? 12 : 13, fontWeight: includeCess === v ? 700 : 500,
                                color: includeCess === v ? C.dark : C.ink2,
                                background: includeCess === v ? C.paleLime : C.white,
                                border: `1.5px solid ${includeCess === v ? C.lime2 : C.border}`,
                                borderRadius: 8, padding: mobile ? '9px 8px' : '11px 10px', cursor: 'pointer', fontFamily: INTER,
                              }}>
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.6, margin: '0 0 24px' }}>
                        Add your LTCG exemption already used elsewhere this financial year for a more accurate remaining headroom. Cess adds 4% on top of the base tax and is excluded by default.
                      </p>

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.ink }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Donut */}
                  <div style={{ marginBottom: mobile ? 16 : 22 }}>
                    <DonutChart
                      segments={[
                        { value: tax,              color: CHART_PAIR.primary },
                        { value: netGainPositive,  color: CHART_PAIR.secondary },
                      ]}
                      centerLabel={isLoss ? 'Capital Loss' : 'Net Gain (after tax)'}
                      centerValue={`${netGain < 0 ? '−' : ''}₹${fmtC(Math.abs(netGain))}`}
                    />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 16 : 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Tax paid</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Net gain after tax</span>
                    </div>
                  </div>

                  {/* Highlight box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 16 : 24 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#101214' }}>{isLoss ? 'Tax Payable' : includeCess ? 'Capital Gains Tax (incl. 4% cess)' : 'Capital Gains Tax'}</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>₹{fmtIN(tax)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: isLoss ? 'Capital loss (sale − cost − expenses)' : 'Capital gain (sale − cost − expenses)', value: `${isLoss ? '−' : ''}₹${fmtIN(grossGain)}` },
                    { label: 'Tax-free LTCG exemption used',  value: `₹${fmtIN(exemption)}` },
                    { label: 'Taxable capital gain',           value: `₹${fmtIN(taxableGain)}` },
                    { label: 'Applicable tax rate',            value: `${taxRate * 100}%` },
                    ...(includeCess ? [{ label: 'Health & Education Cess (4%)', value: `₹${fmtIN(cess)}` }] : []),
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%', gap: 12 }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{value}</span>
                    </div>
                  ))}

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Tax {taxPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Net Gain {gainPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${taxPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                  {/* Result summary */}
                  <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.7, margin: '20px 0 0' }}>
                    {isLoss
                      ? 'A capital loss attracts no tax. It can be set off against other capital gains and, if unused, carried forward for up to 8 assessment years.'
                      : tax > 0
                      ? `After paying ₹${fmtIN(tax)} in tax, you keep a net gain of ₹${fmtIN(netGain)}.`
                      : `No tax is payable on this gain, so the full ₹${fmtIN(grossGain)} is yours to keep.`}
                  </p>

                </div>
              </div>

              {/* Tax calculation breakdown toggle */}
              <div id="tax-breakdown" style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowBreakdown(v => !v)} aria-expanded={showBreakdown} aria-controls="tax-breakdown-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Tax Calculation Breakdown</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {isLoss ? 'Loss' : `Tax ₹${fmtIN(tax)}`}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showBreakdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showBreakdown && (
                  <div id="tax-breakdown-panel" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <tbody>
                        {[
                          ['Sale value',                       `₹${fmtIN(saleValue)}`],
                          ['Purchase value',                   `₹${fmtIN(purchaseValue)}`],
                          ['Transfer expenses',                `₹${fmtIN(expenses)}`],
                          [isLoss ? 'Capital loss' : 'Capital gain', `${isLoss ? '−' : ''}₹${fmtIN(grossGain)}`],
                          ['LTCG exemption applied',           `₹${fmtIN(exemption)}`],
                          ['Taxable capital gain',             `₹${fmtIN(taxableGain)}`],
                          [`Tax @ ${taxRate * 100}%`,          `₹${fmtIN(baseTax)}`],
                          ...(includeCess ? [['Health & Education Cess (4%)', `₹${fmtIN(cess)}`]] : []),
                          ...(includeCess ? [['Total tax payable',            `₹${fmtIN(tax)}`]] : []),
                        ].map(([label, value], i, arr) => (
                          <tr key={label} style={{ borderTop: i === 0 ? 'none' : `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa', fontWeight: i === arr.length - 1 ? 700 : 400 }}>
                            <td style={{ padding: mobile ? '11px 20px' : '13px 48px', color: i === arr.length - 1 ? C.ink : C.ink2 }}>{label}</td>
                            <td style={{ padding: mobile ? '11px 20px' : '13px 48px', textAlign: 'right', color: i === arr.length - 1 ? C.dark : C.ink, fontWeight: i === arr.length - 1 ? 800 : 600 }}>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* ARTICLE */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const tdL = { padding: '11px 16px', fontSize: 14, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                const tdR = { padding: '11px 16px', fontSize: 14, color: C.ink, fontWeight: 500, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' } as React.CSSProperties;
                const thS = { padding: '10px 16px', fontSize: 12, fontWeight: 600, color: C.ink3, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                return (
                  <>
                    {/* 1 */}
                    <div style={sec}>
                      <h2 style={h2}>What is capital gains tax?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          A capital gain is the profit you make when you sell a capital asset, such as listed shares, mutual fund units, property, or gold, for more than what you paid for it.
                        </p>
                      </div>
                      <p style={p}>
                        The Income Tax Act splits this profit into short-term and long-term capital gains depending on how long you held the asset, and taxes each category differently.
                      </p>
                      <p style={p}>
                        For listed equity shares and equity-oriented mutual funds on which securities transaction tax (STT) has been paid, a holding period of 12 months or less is short term, and more than 12 months is long term.
                      </p>
                      <p style={p}>
                        Per the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a>, the Union Budget 2024 revised both the rates and the long-term exemption limit for these assets, with effect from 23 July 2024. For your total tax liability across income heads, run the numbers on the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>income tax calculator</Link>.
                      </p>
                    </div>

                    {/* 2 */}
                    <div style={sec}>
                      <h2 style={h2}>Short term vs long term, by asset type</h2>
                      <p style={p}>
                        The holding period that separates short-term from long-term gains is not the same for every asset. The table below covers the most common categories.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                          <thead>
                            <tr>
                              <th style={thS}>Asset Type</th>
                              <th style={thS}>Short Term</th>
                              <th style={thS}>Long Term</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Listed equity shares / equity mutual funds (STT paid)', '12 months or less', 'More than 12 months'],
                              ['Debt mutual funds bought on or after 1 Apr 2023', 'Always short term', 'Not applicable'],
                              ['Property, unlisted shares, gold, other assets', '24 months or less', 'More than 24 months'],
                            ].map(([asset, st, lt]) => (
                              <tr key={asset}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{asset}</td>
                                <td style={tdR}>{st}</td>
                                <td style={tdR}>{lt}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 3 */}
                    <div style={sec}>
                      <h2 style={h2}>How the calculator works</h2>
                      <p style={p}>
                        This calculator covers listed equity shares and equity-oriented mutual funds. It first works out your capital gain, then applies the LTCG exemption if your holding period is long term, and finally taxes the remaining gain at the applicable rate.
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 4px', padding: '12px 0 0' }}>
                        Gain = Sale Value - Purchase Value - Expenses
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px' }}>
                        Tax = max(0, Gain - Exemption) x Rate
                      </p>
                      <p style={{ ...p, margin: '0 0 16px' }}>In the formula the terms represent the following:</p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                          <thead>
                            <tr>
                              <th style={{ ...thS, width: 120 }}>Term</th>
                              <th style={thS}>Meaning</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Sale Value', 'The price you sold the shares or mutual fund units for'],
                              ['Purchase Value', 'The price you originally paid to acquire them'],
                              ['Expenses', 'Brokerage, STT, and other costs of buying and selling'],
                              ['Exemption', '₹1,25,000 per year, only for long-term gains'],
                              ['Rate', '12.5% for long term, 20% for short term'],
                            ].map(([v, m]) => (
                              <tr key={v}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{v}</td>
                                <td style={tdR}>{m}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        If the sale value is lower than the purchase value plus expenses, the result is a capital loss. No tax applies, and the loss can be set off against other gains or carried forward.
                      </p>
                      <h3 style={h3}>Worked example</h3>
                      <p style={{ ...p, margin: 0 }}>
                        You bought equity mutual fund units for ₹5,00,000 and sold them two years later for ₹8,00,000, paying ₹5,000 in transfer expenses. The gain is ₹8,00,000 − ₹5,00,000 − ₹5,000 = ₹2,95,000. Since the holding period is long term, the ₹1,25,000 exemption applies, leaving ₹1,70,000 taxable at 12.5%, a tax of ₹21,250 and a net gain of ₹2,73,750.
                      </p>
                    </div>

                    {/* 4 */}
                    <div style={sec}>
                      <h2 style={h2}>Capital gains tax rates for FY 2025-26</h2>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}` }}>
                          <thead>
                            <tr>
                              <th style={thS}>Asset Type</th>
                              <th style={thS}>Short Term Rate</th>
                              <th style={thS}>Long Term Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Listed equity shares / equity mutual funds (STT paid)', '20%', '12.5% above ₹1.25 lakh exemption'],
                              ['Debt mutual funds bought on or after 1 Apr 2023', 'Slab rate', 'Not applicable'],
                              ['Property, gold, unlisted shares, other assets', 'Slab rate', '12.5% without indexation'],
                            ].map(([asset, st, lt]) => (
                              <tr key={asset}>
                                <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{asset}</td>
                                <td style={tdR}>{st}</td>
                                <td style={tdR}>{lt}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={{ ...p, margin: 0 }}>
                        For property acquired before 23 July 2024, individuals and HUFs can choose between 12.5% without indexation and 20% with indexation, whichever results in a lower tax. Debt mutual fund gains are added to your total income and taxed at your slab rate, with no long-term category available.
                      </p>
                    </div>

                    {/* 5 */}
                    <div style={sec}>
                      <h2 style={h2}>Setting off and carrying forward losses</h2>
                      <h3 style={h3}>Short-term capital loss</h3>
                      <p style={p}>
                        A short-term capital loss can be set off against both short-term and long-term capital gains in the same financial year, across any asset class.
                      </p>
                      <h3 style={h3}>Long-term capital loss</h3>
                      <p style={p}>
                        A long-term capital loss can only be set off against long-term capital gains. It cannot be used to reduce short-term gains or other heads of income.
                      </p>
                      <h3 style={h3}>Carry forward</h3>
                      <p style={{ ...p, margin: 0 }}>
                        Any loss that remains after set-off can be carried forward for up to 8 assessment years and adjusted against eligible gains in those years, provided the income tax return for the year of the loss is filed before the due date.
                      </p>
                    </div>

                    {/* 6 */}
                    <div style={sec}>
                      <h2 style={h2}>How SIP redemptions are taxed (FIFO rule)</h2>
                      <p style={p}>
                        Each SIP instalment buys units on its own date at its own NAV, so it is treated as a separate purchase for tax purposes, not one lump investment.
                      </p>
                      <p style={{ ...p, margin: 0 }}>
                        When you redeem units, mutual funds apply the FIFO (First In, First Out) method: the oldest units in your folio are considered sold first. This means the earliest instalments of a long-running SIP are usually the first to qualify as long term, while the most recent instalments may still count as short term even in the same redemption.
                      </p>
                    </div>

                    {/* 7 */}
                    <div style={sec}>
                      <h2 style={h2}>Capital gains vs dividend income</h2>
                      <p style={{ ...p, margin: 0 }}>
                        A capital gain arises only when you sell the shares or units for more than you paid. Dividends are a separate payout from the company or fund while you continue to hold the investment, taxed as "Income from Other Sources" at your income tax slab rate, not at the 12.5%/20% capital gains rates covered by this calculator.
                      </p>
                    </div>

                    {/* 8 */}
                    <div style={sec}>
                      <h2 style={h2}>Ways to legally reduce your capital gains tax</h2>
                      <h3 style={h3}>Cross the 12-month mark before selling</h3>
                      <p style={p}>
                        Selling one day before the 12-month mark means the gain is taxed as STCG at 20% instead of LTCG at 12.5%. Where the investment thesis allows it, waiting a few extra days to cross into long-term status can meaningfully cut the tax on a large gain.
                      </p>
                      <h3 style={h3}>Use the annual ₹1.25 lakh exemption every year</h3>
                      <p style={p}>
                        The LTCG exemption does not carry forward if unused. Booking long-term gains up to ₹1.25 lakh each financial year, even on units you plan to hold long term (by selling and immediately reinvesting), locks in that year's tax-free allowance instead of letting a larger gain build up and get taxed later.
                      </p>
                      <h3 style={h3}>Set off losses before the financial year ends</h3>
                      <p style={{ ...p, margin: 0 }}>
                        Reviewing your portfolio in February or March for positions sitting at a loss, and selling them to book the loss, lets you set it off against gains realised earlier in the same year, reducing the net taxable gain for that year.
                      </p>
                    </div>

                    {/* 9 */}
                    <div style={sec}>
                      <h2 style={h2}>Capital gains and your income tax return</h2>
                      <p style={p}>
                        Capital gains are reported in Schedule CG of your income tax return, not clubbed with your salary or other income heads.
                      </p>
                      <p style={p}>
                        Use ITR-2 if capital gains are your only income beyond salary and interest, or ITR-3 if you also have business or professional income. ITR-1 cannot be filed in a year you have any capital gains, even a small one.
                      </p>
                      <p style={{ ...p, margin: 0 }}>
                        Your broker and mutual fund registrar (RTA) both report your transactions to the tax department through their own annual filings, so gains left out of your return can trigger a mismatch notice even when the tax payable works out to zero after the exemption.
                      </p>
                    </div>

                    {/* 10 */}
                    <div style={sec}>
                      <h2 style={h2}>How to use this capital gains calculator</h2>
                      <p style={p}>The calculator needs four inputs:</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          ['Purchase Value:', 'enter the total price you paid to acquire the shares or mutual fund units.'],
                          ['Sale Value:', 'enter the total amount you received when you sold the investment.'],
                          ['Transfer Expenses:', 'add brokerage, STT, or other costs paid at the time of sale.'],
                          ['Holding Period:', 'pick long term (more than 1 year) or short term (up to 1 year).'],
                        ].map(([label, text]) => (
                          <li key={label} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <strong style={{ color: C.ink }}>{label}</strong> {text}
                          </li>
                        ))}
                      </ol>
                      <p style={{ ...p, margin: 0 }}>
                        The calculator applies the ₹1.25 lakh LTCG exemption automatically for long-term holdings, then shows your tax payable, net gain, and a full breakdown in the table above.
                      </p>
                    </div>

                    

                    {/* 11 */}
                    <div style={{ margin: '0 0 40px' }}>
                      <h2 style={h2}>Frequently asked questions</h2>
            <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <style>{`.cap-gains-sidebar::-webkit-scrollbar{width:5px}.cap-gains-sidebar::-webkit-scrollbar-track{background:transparent}.cap-gains-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.cap-gains-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="cap-gains-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/income-tax-calculator|Income Tax', '/calculators/capital-gains-calculator|Capital Gains', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/ssy-calculator|SSY', '/calculators/nps-calculator|NPS', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/nps-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice. Verify with a CA for tax filing." />
    </div>
  );
}

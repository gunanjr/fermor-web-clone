'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ─────────────────────────────────────────────────── */
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

/* ─── Official PFRDA APY Contribution Chart ─────────────────────
   Key: entry age. Value: monthly contribution for pension slabs
   [1000, 2000, 3000, 4000, 5000]. Fixed by PFRDA, not computed. ── */
const APY_CHART: Record<number, [number, number, number, number, number]> = {
  18: [42, 84, 126, 168, 210],
  19: [46, 92, 138, 183, 228],
  20: [50, 100, 150, 198, 248],
  21: [54, 108, 162, 215, 269],
  22: [59, 117, 177, 234, 292],
  23: [64, 127, 192, 254, 318],
  24: [70, 139, 208, 277, 346],
  25: [76, 151, 226, 301, 376],
  26: [82, 164, 246, 327, 409],
  27: [90, 178, 268, 356, 446],
  28: [97, 194, 292, 388, 485],
  29: [106, 212, 318, 423, 529],
  30: [116, 231, 347, 462, 577],
  31: [126, 252, 379, 504, 630],
  32: [138, 276, 414, 551, 689],
  33: [151, 301, 452, 602, 752],
  34: [165, 330, 495, 659, 824],
  35: [181, 362, 543, 722, 902],
  36: [198, 396, 594, 792, 990],
  37: [218, 436, 654, 870, 1087],
  38: [240, 480, 720, 957, 1196],
  39: [264, 528, 792, 1054, 1318],
  40: [291, 582, 873, 1164, 1454],
};

const PENSION_SLABS = [1000, 2000, 3000, 4000, 5000] as const;
type PensionSlab = typeof PENSION_SLABS[number];

/* Fixed corpus paid to spouse/nominee on death after 60, per slab. */
const DEATH_CORPUS: Record<PensionSlab, number> = {
  1000: 170000,
  2000: 340000,
  3000: 510000,
  4000: 680000,
  5000: 850000,
};

function slabIndex(slab: PensionSlab): number {
  return PENSION_SLABS.indexOf(slab);
}

function getMonthlyContribution(age: number, slab: PensionSlab): number {
  const row = APY_CHART[age];
  if (!row) return 0;
  return row[slabIndex(slab)];
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ contributed, pensionValue, contributedPct }: { contributed: number; pensionValue: number; contributedPct: number }) {
  const total = contributed + pensionValue;
  if (total === 0) return null;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const cArc = (contributed / total) * circ;
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}
      role="img" aria-label={`Value split: ${contributedPct}% total contribution paid in, ${100 - contributedPct}% illustrative lifetime pension value`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${cArc} ${circ - cArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>You pay in</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{contributedPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, id, value, min, max, step, display, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: '6px 10px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 100, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)}
          aria-label={label || 'Slider'}
          aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{max}</span>
      </div>
    </div>
  );
}

/* ─── Pension slab pill toggle ──────────────────────────────── */
function SlabToggle({ value, onChange, compact, currencySymbol }: { value: PensionSlab; onChange: (v: PensionSlab) => void; compact?: boolean; currencySymbol: string }) {
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: compact ? 10 : 14 }}>Desired Monthly Pension at 60</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {PENSION_SLABS.map(slab => {
          const active = value === slab;
          return (
            <button key={slab} onClick={() => onChange(slab)}
              aria-pressed={active}
              aria-label={`Set desired pension to ${currencySymbol}${slab} per month`}
              style={{
                padding: compact ? '7px 12px' : '8px 16px', fontSize: compact ? 12.5 : 13.5,
                background: C.white, color: active ? C.ink : C.ink3,
                border: `${active ? 1.5 : 1}px solid ${active ? C.ink : C.border}`,
                fontWeight: active ? 700 : 500, borderRadius: 8, cursor: 'pointer',
                fontFamily: INTER, transition: 'all 0.15s',
              }}>
              {currencySymbol}{slab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Sidebar list ──────────────────────────────────────────── */
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
  { href: '/calculators/nps-calculator', label: 'NPS Calculator' },
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/ssy-calculator', label: 'SSY Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/swp-calculator', label: 'SWP Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
];

const FAQS = [
  { q: 'How does the Atal Pension Yojana calculator work?', a: 'The calculator is a lookup table, not a formula. PFRDA fixes the exact monthly contribution for every combination of entry age (18 to 40) and desired monthly pension (Rs 1,000 to Rs 5,000) at age 60. Enter your age and target pension slab, and the calculator returns the fixed contribution amount from the official chart, along with years remaining and total amount you will pay until 60.' },
  { q: 'What is the APY monthly contribution chart?', a: 'The APY contribution chart is the official PFRDA table mapping entry age to the monthly contribution required for each pension slab. Joining at 18 for a Rs 1,000 monthly pension costs Rs 42 per month. The same Rs 1,000 pension joined at 40 costs Rs 291 per month. The earlier you join, the lower your monthly outlay for the same guaranteed pension.' },
  { q: 'Is the Atal Pension Yojana calculator the same for SBI, other banks, and post office?', a: 'Yes. APY is a Government of India scheme regulated by PFRDA, and the contribution chart is identical regardless of which bank or post office holds the account. SBI, HDFC Bank, ICICI Bank, all nationalised banks, and India Post use the same fixed contribution table. There is no SBI-specific or post-office-specific APY rate.' },
  { q: 'What is the maturity amount under Atal Pension Yojana?', a: 'APY does not produce a lumpsum maturity amount like PPF or NPS. It guarantees a fixed monthly pension for life starting at age 60, between Rs 1,000 and Rs 5,000 depending on the slab. If the subscriber dies after 60, the spouse continues to receive the same pension. On the spouse death, the nominee receives the accumulated corpus, a fixed amount between Rs 1.7 lakh and Rs 8.5 lakh depending on the slab.' },
  { q: 'Who is eligible for Atal Pension Yojana?', a: 'Any Indian citizen between 18 and 40 years of age with a savings bank account or post office savings account is eligible. The subscriber must not be an income taxpayer under PFRDA rules effective October 2022, and must not already be covered under another statutory social security scheme.' },
  { q: 'What happens if I miss an APY contribution?', a: 'A penalty of Rs 1 to Rs 10 per month applies depending on the contribution slab if a payment is missed. The account is frozen after 6 months of continuous default, deactivated after 12 months, and closed permanently if contributions remain unpaid beyond 24 months, with the accumulated corpus returned to the subscriber.' },
  { q: 'Can I exit Atal Pension Yojana before age 60?', a: 'Premature exit is allowed only in exceptional circumstances such as death or terminal illness of the subscriber. In these cases, the accumulated corpus (subscriber contribution plus accrued interest, plus government co-contribution where applicable) is paid out. Voluntary exit before 60 for any other reason is not permitted under PFRDA guidelines.' },
  { q: 'What is the tax benefit on Atal Pension Yojana contributions?', a: 'APY contributions qualify for deduction under Section 80CCD(1B) of the Income Tax Act, up to Rs 50,000 per year. This is separate from and in addition to the Rs 1.5 lakh limit under Section 80C. The pension received after 60 is taxed as regular income in the year it is received.' },
  { q: 'How is Atal Pension Yojana different from NPS?', a: 'APY guarantees a fixed monthly pension set in advance, with the contribution fixed by PFRDA based on entry age. NPS is market-linked: the corpus depends on fund performance and the pension is not guaranteed. APY targets low-income, unorganised-sector workers with a maximum pension of Rs 5,000 per month. NPS has no upper cap on pension and suits higher earners seeking market-linked growth.' },
  { q: 'How do I apply for Atal Pension Yojana online?', a: 'You can apply through your bank net banking portal (SBI, HDFC, ICICI, and most banks have an APY section under government schemes), through the eNPS portal using Aadhaar-based e-KYC, or by visiting a bank branch or post office in person with your savings account passbook and Aadhaar.' },
  { q: 'What is the maximum APY pension I can get at age 60?', a: 'The maximum guaranteed monthly pension under Atal Pension Yojana is Rs 5,000, available by choosing the highest contribution slab matched to your entry age. The five available slabs are Rs 1,000, Rs 2,000, Rs 3,000, Rs 4,000, and Rs 5,000 per month.' },
  { q: 'Can I change my pension slab after opening an APY account?', a: 'Yes, subscribers can upgrade or downgrade their pension slab once a year, typically during April. The monthly contribution adjusts based on your current age and the new slab, per the official PFRDA chart. Any difference in past contributions is collected or refunded with applicable interest or charges.' },
  { q: 'What is a PRAN and can I switch banks?', a: 'PRAN (Permanent Retirement Account Number) is your unique 12-digit identifier issued at APY account opening and linked to your Aadhaar. Yes, you can switch to a different bank by submitting a Transfer Request Form. The central recordkeeping agency transfers all your APY account records under your PRAN within 3 to 5 working days.' },
  { q: 'Can I pay APY contributions quarterly or half-yearly?', a: 'Yes, PFRDA allows contribution payment on monthly, quarterly, or half-yearly frequency. The total annual amount remains the same regardless of frequency. Monthly auto-debit is most common and recommended to avoid penalties for missed months.' },
  { q: 'What happens to APY pension during inflation?', a: 'APY pension amounts are fixed for life and do not adjust for inflation. A Rs 5,000 pension in 2045 will have the same nominal value in 2065, but its purchasing power will decrease significantly. This is why using APY as supplementary retirement income rather than the sole source is recommended.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free with no sign-up required. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function AtalPensionYojanaClient() {
  const [mobile, setMobile] = useState(false);
  const defaultSettings = {
    entryAge: 25,
    pensionSlab: 1000 as PensionSlab,
    yearsContributed: 0,
    monthlyIncome: 25000,
  };
  const { settings, updateSettings } = useCalculatorSettings('atal-pension-yojana', defaultSettings);
  const { entryAge, pensionSlab, yearsContributed, monthlyIncome } = settings;
  const setEntryAge = (v: any) => updateSettings({ entryAge: typeof v === 'function' ? v(settings.entryAge) : v });
  const setPensionSlab = (v: any) => updateSettings({ pensionSlab: typeof v === 'function' ? v(settings.pensionSlab) : v });
  const setYearsContributed = (v: any) => updateSettings({ yearsContributed: typeof v === 'function' ? v(settings.yearsContributed) : v });
  const setMonthlyIncome = (v: any) => updateSettings({ monthlyIncome: typeof v === 'function' ? v(settings.monthlyIncome) : v });

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = useCallback((n: number) => formatCurrency(convertCurrency(n)), [formatCurrency, convertCurrency]);
  const fmtC = useCallback((n: number) => formatCurrency(convertCurrency(n), true), [formatCurrency, convertCurrency]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const maxYearsContributed = Math.max(0, Math.min(entryAge + 21, 60) - entryAge - 1);
  const cappedYearsContributed = Math.min(yearsContributed, Math.max(0, maxYearsContributed));

  const monthlyContribution = useMemo(() => getMonthlyContribution(entryAge, pensionSlab), [entryAge, pensionSlab]);
  const totalYears = Math.max(0, 60 - entryAge);
  const remainingYears = Math.max(0, totalYears - cappedYearsContributed);
  const totalContribution = monthlyContribution * 12 * totalYears;
  const remainingContribution = monthlyContribution * 12 * remainingYears;
  const alreadyContributed = monthlyContribution * 12 * cappedYearsContributed;
  const deathCorpus = DEATH_CORPUS[pensionSlab];
  const incomePct = monthlyIncome > 0 ? Math.round((monthlyContribution / monthlyIncome) * 100) : 0;

  /* Illustrative lifetime pension value: pension x 12 x 20 years of post-60 life. */
  const lifetimePensionValue = pensionSlab * 12 * 20;
  const totalSplit = totalContribution + lifetimePensionValue;
  const contributedPct = totalSplit > 0 ? Math.round((totalContribution / totalSplit) * 100) : 0;

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Atal Pension Yojana (APY) Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Find your exact APY monthly contribution by entry age and pension slab, using the official PFRDA chart. Works for SBI, all banks, and post office accounts.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel: no fill colors */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                      APY Details
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider id="entry-age" label="Entry Age" value={entryAge} min={18} max={40} step={1}
                    display={`${entryAge} yr`} onChange={(v) => { setEntryAge(v); setYearsContributed(0); }} compact={mobile} />

                  <SlabToggle value={pensionSlab} onChange={setPensionSlab} compact={mobile} currencySymbol={selectedCurrency.symbol} />

                  <Slider id="years-contributed" label="Years Already Contributed" value={cappedYearsContributed} min={0} max={Math.max(0, maxYearsContributed)} step={1}
                    display={`${cappedYearsContributed} yr`} onChange={setYearsContributed} compact={mobile} />

                  <Slider id="monthly-income" label="Your Current Monthly Income" value={monthlyIncome} min={5000} max={200000} step={1000}
                    display={fmtC(monthlyIncome)} onChange={setMonthlyIncome} compact={mobile} />

                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, color: C.ink, fontWeight: 700 }}>
                      Years to retirement: {totalYears} yr <span style={{ color: C.ink2, fontWeight: 400 }}>(until age 60, fixed by PFRDA)</span>
                    </div>
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Monthly contribution required</div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>Guaranteed pension from age 60</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div aria-live="polite" aria-label={`Monthly contribution required: ${fmtIN(monthlyContribution)}`}
                        style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmtIN(monthlyContribution)}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmtIN(pensionSlab)}/mo</div>
                    </div>
                  </div>

                  {monthlyIncome > 0 && (
                    <div style={{ width: '100%', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: mobile ? '10px 14px' : '12px 16px', marginBottom: 12 }}>
                      <p style={{ fontSize: 12.5, color: C.ink2, margin: 0 }}>
                        This contribution is approximately <strong style={{ color: C.ink }}>{incomePct}%</strong> of your current monthly income.
                      </p>
                    </div>
                  )}

                  {[
                    { label: 'Years remaining to contribute', value: `${remainingYears} yr` },
                    { label: 'Already contributed (est.)', value: fmtC(alreadyContributed) },
                    { label: 'Remaining total contribution', value: fmtC(remainingContribution) },
                    { label: 'Total contribution over full tenure', value: fmtC(totalContribution) },
                    { label: 'Corpus to nominee on death after 60', value: fmtC(deathCorpus) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart contributed={totalContribution} pensionValue={lifetimePensionValue} contributedPct={contributedPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 12, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Total contribution paid in</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Illustrative 20-yr pension value</span>
                    </div>
                  </div>

                  <p style={{ fontSize: 11, color: C.ink3, margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
                    Pension value assumes 20 years of payouts after age 60. It is illustrative only, not a guaranteed return figure.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            <article itemScope itemType="https://schema.org/Article">

              <div style={sec}>
                <h2 id="what-is-apy" style={h2}>What Is Atal Pension Yojana?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Atal Pension Yojana (APY) is a government-backed pension scheme regulated by the Pension Fund Regulatory and Development Authority (PFRDA). It guarantees a fixed monthly pension of Rs 1,000 to Rs 5,000 from age 60, with the contribution amount fixed by PFRDA based on the subscriber entry age. Note: APY is the pension scheme, not the Annual Percentage Yield used for savings accounts.
                  </p>
                </div>
                <p style={p}>
                  Launched by the Government of India in May 2015 under Prime Minister Narendra Modi's administration, APY targets workers in the unorganised sector: domestic helps, auto-rickshaw drivers, construction workers, street vendors, agricultural workers, and small business owners who lack employer-sponsored retirement coverage. Unlike market-linked options evaluated in an <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link>, APY removes market risk entirely by fixing both the monthly contribution and the guaranteed monthly pension from day one.
                </p>
                <p style={p}>
                  The scheme operates under the Pension Fund Regulatory and Development Authority (PFRDA), established per the <a href="https://www.pfrda.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PFRDA Act, 2013</a>. All nationalised banks, private banks approved by PFRDA, India Post, and cooperative banks function as Points of Presence (PoPs). Central recordkeeping agencies maintain a single consolidated record for each subscriber using their Permanent Retirement Account Number (PRAN).
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-eligibility" style={h2}>Who Is Eligible for Atal Pension Yojana?</h2>
                <p style={p}>
                  Eligibility for Atal Pension Yojana requires Indian citizenship, an entry age between 18 and 40 years, and an active savings bank account or post office savings account. Because the scheme mandates a minimum contribution tenure of 20 years before payouts begin at age 60, enrolment strictly closes once an individual turns 40.
                </p>
                <p style={p}>
                  Effective October 1, 2022, PFRDA amended eligibility guidelines to bar any individual who is an income taxpayer from joining APY. If a subscriber joined before October 2022 and subsequently became an income taxpayer, their account remains active and continues under standard rules. You can use our <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to check your current taxable income status against current income tax slabs.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-contribution-chart" style={h2}>APY Contribution Chart: How Contribution Is Fixed by Age</h2>
                <p style={p}>
                  The APY contribution chart is an official PFRDA lookup table mapping entry age (18 to 40) to required monthly contributions across five fixed pension slabs (Rs 1,000, Rs 2,000, Rs 3,000, Rs 4,000, and Rs 5,000 per month). Unlike calculating variable growth in a <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link>, APY contributions are predefined and guaranteed by the Government of India.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>Selected APY monthly contribution by entry age and pension slab, per PFRDA</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Entry Age</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Rs 1,000 pension</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Rs 2,000 pension</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Rs 3,000 pension</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Rs 4,000 pension</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Rs 5,000 pension</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[18, 20, 25, 30, 35, 40].map((age, i) => {
                        const row = APY_CHART[age];
                        return (
                          <tr key={age} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{age}</td>
                            {row.map((amt, j) => <td key={j} style={{ ...tdL, textAlign: 'right' as const }}>Rs {amt}</td>)}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For example, an 18-year-old subscriber enrolling for a Rs 5,000 monthly pension pays just Rs 210 per month for 42 years (total personal investment of Rs 1.06 lakh). A 40-year-old subscriber enrolling for the same Rs 5,000 pension must pay Rs 1,454 per month for 20 years (total personal investment of Rs 3.49 lakh), demonstrating the powerful advantage of early enrolment.
                </p>
              </div>

              <div style={sec}>
                <h2 id="how-to-apply" style={h2}>How to Apply for Atal Pension Yojana</h2>
                <p style={p}>
                  You can open an APY account online through your bank net banking portal, through the eNPS portal using Aadhaar e-KYC, or physically at any bank branch or post office.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Net banking portal:</strong> log in to your SBI, HDFC, ICICI, Bank of Baroda, or PNB account, navigate to the Social Security / APY section, select your pension slab, and authorize auto-debit.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>eNPS website:</strong> visit the official <a href="https://enps.nsdl.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>eNPS platform</a>, complete Aadhaar-based e-KYC verification, and link your savings bank account for direct debits.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Bank branch or post office:</strong> submit a completed APY subscriber registration form along with a copy of your bank passbook and Aadhaar card.
                  </li>
                </ol>
                <p style={p}>
                  Contributions can be auto-debited on a monthly, quarterly, or half-yearly frequency. If an auto-debit fails due to insufficient funds, banks levy a minor penalty (Rs 1 per month for contributions up to Rs 100/mo, scaling up to Rs 10 per month for contributions above Rs 1,001/mo).
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-contribution-frequency" style={h2}>APY Contribution Frequency and Premium Payment Options</h2>
                <p style={p}>
                  APY offers flexibility in how often you pay your monthly contribution, provided the total annual outlay equals your fixed annual commitment.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>APY contribution frequency options for a subscriber aged 25 targeting Rs 2,000 monthly pension</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Payment Frequency</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Monthly Debit</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Quarterly Debit</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Half-Yearly Debit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: C.white }}>
                        <td style={tdL}>Fixed monthly contribution</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>Rs 151</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>Rs 453</td>
                        <td style={{ ...tdR, textAlign: 'right' as const }}>Rs 906</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Most subscribers opt for monthly auto-debit (ECS/NACH) for ease of budgeting. Quarterly and half-yearly contributions suit those with irregular income (seasonal workers, harvest-dependent farmers) or those facing variable cash flow. PFRDA strongly recommends monthly debit to avoid missed deadlines, as penalties accrue for every month a contribution is missed, regardless of whether you catch up later.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-account-freezing" style={h2}>APY Account Freezing, Deactivation, and Closure Rules</h2>
                <p style={p}>
                  Atal Pension Yojana imposes strict account status rules if contributions are missed. Missing even one month triggers penalties; sustained default leads to account suspension.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>APY account status progression for missed contributions</caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Default Period</th>
                        <th scope="col" style={thS}>Account Status</th>
                        <th scope="col" style={thS}>Recovery Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ background: C.white }}>
                        <td style={tdL}>First missed month</td>
                        <td style={tdL}>Active (with penalty)</td>
                        <td style={tdL}>Pay penalty (Rs 1-10) + next month contribution</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>After 6 months continuous default</td>
                        <td style={tdL}>FROZEN</td>
                        <td style={tdL}>Resume all pending contributions + penalties</td>
                      </tr>
                      <tr style={{ background: C.white }}>
                        <td style={tdL}>After 12 months continuous default</td>
                        <td style={tdL}>DEACTIVATED</td>
                        <td style={tdL}>Resume contributions to reactivate</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>After 24 months continuous default</td>
                        <td style={tdL}>PERMANENTLY CLOSED</td>
                        <td style={tdL}>No reactivation; corpus returned to subscriber</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For self-employed persons and contract workers who face irregular cash flow, setting up alerts on your bank app 5 days before the debit date prevents accidental defaults. A frozen or deactivated account does not earn interest on accumulated corpus during the suspension period, making timely payment critical.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-exit-rules" style={h2}>APY Premature Exit Rules</h2>
                <p style={p}>
                  Voluntary exit from Atal Pension Yojana before reaching age 60 is strictly restricted by PFRDA under statutory rules.
                </p>
                <p style={p}>
                  Premature withdrawal is permitted only upon the death of the subscriber or in cases of specified terminal illnesses certified by a medical board. In voluntary exit scenarios allowed under exceptional relief provisions, the subscriber receives only their personal contributions plus actual interest earned, after deducting government co-contributions and administrative maintenance fees.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-tax-benefit" style={h2}>APY Tax Benefit Under Section 80CCD(1B)</h2>
                <p style={p}>
                  APY contributions qualify for income tax deductions under Section 80CCD(1B) of the Income Tax Act, up to an exclusive limit of Rs 50,000 per financial year.
                </p>
                <p style={p}>
                  This deduction is available over and above the Rs 1.5 lakh umbrella limit under Section 80C. Subscribers in the 30% tax bracket can save up to Rs 15,600 annually in taxes by utilizing Section 80CCD(1B). Once pension payouts commence at age 60, the monthly pension is treated as taxable salary/income in the year received.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-death-corpus" style={h2}>APY Survivor and Nominee Benefits</h2>
                <p style={p}>
                  Atal Pension Yojana incorporates a three-tier survivor protection framework: spouse pension continuation, spouse death benefits, and nominee corpus payouts.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>Fixed corpus and pension continuation by survivor, per APY pension slab</caption>
                    <thead><tr><th scope="col" style={thS}>Pension Slab</th><th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Spouse Pension</th><th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Nominee Corpus</th></tr></thead>
                    <tbody>
                      {([[1000, 1000, 170000], [2000, 2000, 340000], [3000, 3000, 510000], [4000, 4000, 680000], [5000, 5000, 850000]] as [number, number, number][]).map(([slab, spousePension, corpus], i) => (
                        <tr key={slab} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>Rs {slab}/month</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {spousePension}/month</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>Rs {(corpus / 100000).toFixed(1)} lakh</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  If the subscriber dies before age 60, the spouse (or nominee if no spouse) has two options: (1) continue monthly contributions until age 60 on the deceased subscriber schedule, then receive pension starting at age 60, or (2) withdraw the accumulated corpus immediately, foregoing pension benefits. If the subscriber dies after age 60, the spouse receives the identical monthly pension (not a reduced amount) for life without contributing further. When both subscriber and spouse have died, the nominee receives the fixed lumpsum corpus based on the original pension slab chosen.
                </p>
                <p style={p}>
                  PFRDA requires a primary nominee at account opening and allows one alternate nominee. Nominees must be explicitly named via a signed nomination form or NPS portal update. Changing a nominee requires a fresh nomination form submitted to the bank or central recordkeeping agency; it takes effect once processed, typically within 2 weeks. Spouses changing civil status (separation, remarriage) should review and update nominee designations to avoid estate delays.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-vs-nps" style={h2}>APY vs NPS: What Is the Difference?</h2>
                <p style={p}>
                  APY offers a guaranteed, fixed pension amount, whereas the National Pension System (NPS) delivers market-linked returns based on equity and debt asset allocation. You can use our <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link> to project market-based retirement wealth.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>APY vs NPS at a glance</caption>
                    <thead><tr>{['Feature', 'APY', 'NPS'].map(h => <th key={h} scope="col" style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[
                        ['Pension', 'Fixed, Rs 1,000 to Rs 5,000/month', 'Market-linked, no fixed guarantee'],
                        ['Contribution', 'Fixed by PFRDA chart based on age', 'Flexible, subscriber chooses amount'],
                        ['Entry age', '18 to 40 years', '18 to 70 years'],
                        ['Tax benefit', 'Section 80CCD(1B), up to Rs 50,000', 'Sections 80CCD(1), (1B), and (2)'],
                        ['Best suited for', 'Unorganised sector, fixed pension need', 'Higher earners seeking market growth'],
                      ].map(([feature, apy, nps], i) => (
                        <tr key={feature} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdR, fontWeight: 600 }}>{feature}</td>
                          <td style={tdL}>{apy}</td>
                          <td style={tdL}>{nps}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For comprehensive retirement planning, combine fixed pension guarantees with wealth growth tools. Evaluate long-term equity growth with our <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link>, estimate your total retirement target with our <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Retirement Calculator</Link>, or evaluate safe tax-free compounding using our <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-formula" style={h2}>APY Monthly Contribution Formula: How PFRDA Calculates Rates</h2>
                <p style={p}>
                  PFRDA determines APY monthly contributions using annuity pricing based on entry age, compounding an implicit interest rate (around 8% p.a.) over the contribution window until age 60 to build the target death corpus.
                </p>
                <div style={{ background: '#f4f5f6', padding: '16px 20px', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16, fontFamily: 'monospace', fontSize: 14, overflowX: 'auto' }}>
                  Target Death Corpus = Monthly Pension &times; 170
                </div>
                <p style={p}>
                  For example, for a Rs 5,000 monthly pension slab, the target nominee corpus is Rs 8.5 lakh (5,000 &times; 170). The subscriber&apos;s monthly contribution is calculated so that monthly payments from entry age to age 60 accumulate to this required corpus under expected fund returns.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-excel-formula" style={h2}>APY Formula in Excel: Modeling Pension & Corpus</h2>
                <p style={p}>
                  You can model the accumulated APY corpus in Excel using the standard Future Value (FV) function for annuity contributions.
                </p>
                <div style={{ background: '#f4f5f6', padding: '16px 20px', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 16, fontFamily: 'monospace', fontSize: 14, overflowX: 'auto' }}>
                  =FV(8%/12, (60 - entry_age) * 12, -monthly_contribution)
                </div>
                <p style={p}>
                  For an 18-year-old contributing Rs 210 per month for 42 years (504 months) at an assumed 8% annual return, the Excel formula `=FV(8%/12, 504, -210)` yields approximately Rs 8.44 lakh at age 60, matching PFRDA&apos;s required nominee corpus of Rs 8.5 lakh.
                </p>
              </div>

              <div style={sec}>
                <h2 id="reverse-apy-calculator" style={h2}>Reverse APY Calculator: Target Pension to Required Entry Age</h2>
                <p style={p}>
                  A reverse APY calculation helps you determine the required monthly outlay based on your desired pension floor and current age.
                </p>
                <p style={p}>
                  If you are 30 years old and target a guaranteed pension of Rs 5,000 per month from age 60, the required monthly contribution is Rs 577 per month for 30 years (360 months), resulting in a total personal outlay of Rs 2.07 lakh. Joining earlier at age 20 for the same Rs 5,000 pension requires only Rs 248 per month for 40 years, totaling Rs 1.19 lakh in total outlay.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-pran-account" style={h2}>Understanding Your APY PRAN and Account Portability</h2>
                <p style={p}>
                  Every APY subscriber is issued a unique 12-digit PRAN (Permanent Retirement Account Number) at account opening. The PRAN is tied to your Aadhaar number and remains constant even if you switch banks or move between states.
                </p>
                <p style={p}>
                  Your PRAN consolidates all retirement account records across PFRDA-regulated schemes. If you hold both an APY account and an <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS account</Link>, both share the same PRAN. You can switch your APY account to a different bank without losing your account history: simply submit a Transfer Request Form at the new bank, and the CRA transfers all records under your PRAN within 3 to 5 working days. This portability is critical for those who migrate for work.
                </p>
              </div>

              <div style={sec}>
                <h2 id="apy-limitations" style={h2}>Limitations of Atal Pension Yojana</h2>
                <p style={p}>
                  While APY offers a safe, government-backed pension floor, subscribers should evaluate five key structural limitations before enrolling.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Maximum pension cap:</strong> The maximum pension is Rs 5,000 per month (Rs 60,000 per year). Assuming 3% annual inflation, this pension's purchasing power falls to approximately Rs 24,000 per year by 2050, which may not cover basic expenses in major metros.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Strict entry age limit:</strong> Enrolment strictly closes at age 40. A 41-year-old cannot join even if they have 19 years until retirement. Those who miss the deadline must rely on <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS</Link> or savings for retirement.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Income taxpayer bar:</strong> From October 2022 onward, any individual filing income tax returns cannot open a new APY account, even if their total income is just above the tax-filing threshold.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>No liquidity before 60:</strong> Voluntary exit before age 60 is forbidden except for terminal illness or death. Workers facing job loss, medical emergency, or unexpected expenses have no access to their own accumulated corpus.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>No inflation adjustment:</strong> The pension amount remains fixed for life. A Rs 5,000 pension in 2045 will not be worth Rs 5,000 in 2065. Unlike government pensions that often adjust annually, APY offers no cost-of-living bump.
                  </li>
                </ul>
              </div>

              <div style={sec}>
                <h2 id="how-to-use" style={h2}>How to Use This Atal Pension Yojana Calculator</h2>
                <p style={p}>The calculator shows your exact monthly contribution, years remaining, total outlay, and the corpus paid to your nominee, based directly on the official PFRDA chart.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set your entry age:</strong> move the slider to your current age between 18 and 40.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose your pension slab:</strong> select Rs 1,000 to Rs 5,000 as the guaranteed monthly pension you want from age 60.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust years already contributed:</strong> if you already hold an APY account, set how many years you have contributed to see your remaining tenure and remaining outlay.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review your results:</strong> see the fixed monthly contribution, years remaining, total contribution, and the corpus paid to your nominee on death after 60.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 id="faq" style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are based on the official PFRDA Atal Pension Yojana contribution chart and are indicative only. Contribution amounts, penalty charges, and corpus figures are subject to change by PFRDA. The illustrative lifetime pension value shown in the donut chart assumes 20 years of payouts after age 60 and is not a guaranteed return projection. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a PFRDA-registered intermediary or your bank before opening an APY account.
                </p>
              </div>

            </article>
          </div>

          <style>{`.apy-sidebar::-webkit-scrollbar{width:5px}.apy-sidebar::-webkit-scrollbar-track{background:transparent}.apy-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.apy-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="apy-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
              <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px', flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>APY Quick Facts</div>
                {[
                  { label: 'Entry age', value: '18 to 40 years' },
                  { label: 'Pension slabs', value: 'Rs 1,000 to Rs 5,000' },
                  { label: 'Pension starts', value: 'Age 60' },
                  { label: 'Tax benefit', value: '80CCD(1B), up to Rs 50,000' },
                  { label: 'Regulator', value: 'PFRDA' },
                  { label: 'Available at', value: 'All banks, post office' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <span style={{ color: C.ink3 }}>{label}</span>
                    <span style={{ color: C.dark, fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/atal-pension-yojana-calculator|APY', '/calculators/nps-calculator|NPS', '/calculators/ppf-calculator|PPF', '/calculators/sip-calculator|SIP', '/calculators/income-tax-calculator|Income Tax', '/calculators/retirement-calculator|Retirement', '/calculators/cagr-calculator|CAGR'] },
        { hd: 'More Tools', links: ['/calculators/ssy-calculator|SSY', '/calculators/gratuity-calculator|Gratuity', '/calculators/swp-calculator|SWP', '/calculators/lumpsum-calculator|Lumpsum'] },
        { hd: 'Company', links: ['/about|About', '/blogs|Blogs', '/privacy|Privacy Policy', '/terms|Terms', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

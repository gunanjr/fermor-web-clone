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

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8', red: '#B91C1C', green: '#166534',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const STORAGE_KEY = 'fermor-nps-v2';

interface YearRow {
  age: number;
  year: number;
  openingCorpus: number;
  contribution: number;
  returns: number;
  closingCorpus: number;
}

type Sector = 'government' | 'non_government' | 'vatsalya';
type Scheme = 'central_govt' | 'state_govt' | 'g_sec_100' | 'corporate_cg' | 'lc75' | 'lc50' | 'lc25' | 'active';

const SCHEME_RATES: Record<Scheme, number> = {
  central_govt: 8.5,
  state_govt: 8.5,
  g_sec_100: 8.0,
  corporate_cg: 8.5,
  lc75: 12.5,
  lc50: 10.5,
  lc25: 8.5,
  active: 12.0,
};

function calcNPS(
  monthly: number, employer: number, existingCorpus: number,
  currentAge: number, retireAge: number, defermentAge: number, annualIncrement: number, annualReturn: number
): { totalCorpus: number; totalContributed: number; yearRows: YearRow[] } {
  const years = Math.max(0, retireAge - currentAge);
  const deferYears = Math.max(0, defermentAge - retireAge);
  if (years + deferYears === 0) return { totalCorpus: Math.round(existingCorpus), totalContributed: Math.round(existingCorpus), yearRows: [] };
  
  const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
  let corpus = existingCorpus;
  let totalContributed = existingCorpus;
  const yearRows: YearRow[] = [];
  const now = new Date().getFullYear();
  
  for (let y = 0; y < years; y++) {
    const m = (monthly + employer) * Math.pow(1 + annualIncrement / 100, y);
    const yearContributed = m * 12;
    const openingCorpus = corpus;
    const corpusGrown = corpus * Math.pow(1 + monthlyReturn, 12);
    const sipFV = monthlyReturn > 0
      ? m * ((Math.pow(1 + monthlyReturn, 12) - 1) / monthlyReturn) * (1 + monthlyReturn)
      : m * 12;
    corpus = corpusGrown + sipFV;
    totalContributed += yearContributed;
    yearRows.push({
      age: currentAge + y + 1, year: now + y,
      openingCorpus, contribution: yearContributed,
      returns: corpus - openingCorpus - yearContributed, closingCorpus: corpus,
    });
  }

  for (let y = 0; y < deferYears; y++) {
    const openingCorpus = corpus;
    const corpusGrown = corpus * Math.pow(1 + monthlyReturn, 12);
    corpus = corpusGrown;
    yearRows.push({
      age: retireAge + y + 1, year: now + years + y,
      openingCorpus, contribution: 0,
      returns: corpus - openingCorpus, closingCorpus: corpus,
    });
  }

  return { totalCorpus: Math.round(corpus), totalContributed: Math.round(totalContributed), yearRows };
}

function DonutChart({ lumpSum, annuity, lumpSumPct }: { lumpSum: number; annuity: number; lumpSumPct: number }) {
  const total = lumpSum + annuity;
  if (total === 0) return null;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const lsArc = (lumpSum / total) * circ;
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" style={{ display: 'block' }}
      role="img" aria-label={`Corpus split: ${lumpSumPct}% lump sum, ${100 - lumpSumPct}% annuity`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${lsArc} ${circ - lsArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Lump Sum</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{lumpSumPct}%</text>
    </svg>
  );
}

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
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/retirement-calculator', label: 'Retirement Calculator' },
  { href: '/calculators/ssy-calculator', label: 'SSY Calculator' },
  { href: '/calculators/gratuity-calculator', label: 'Gratuity Calculator' },
  { href: '/calculators/cagr-calculator', label: 'CAGR Calculator' },
];
const MORE = [
  { href: '/calculators/fd-calculator', label: 'FD Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/swp-calculator', label: 'SWP Calculator' },
  { href: '/calculators/investment-comparison-calculator', label: 'Investment Comparison' },
];

const FAQS = [
  { q: 'How is NPS corpus calculated at retirement?', a: 'NPS corpus is calculated by compounding monthly contributions (employee + employer) at the expected annual return rate, month by month, until retirement. The formula is FV = M x [((1 + r)^n - 1) / r] x (1 + r), where M is total monthly contribution, r is the monthly return rate (annual rate / 12), and n is the number of months. At retirement, at least 40% must be used to purchase an annuity and up to 60% can be withdrawn as a tax-free lump sum.' },
  { q: 'What return rate should I use for the NPS calculator?', a: 'Return rate depends on your scheme. Life Cycle 75 (high equity) has delivered approximately 12.5% CAGR over the past 10 years. Life Cycle 50 (moderate) has returned 10.5%. Life Cycle 25 (conservative) and Central Government scheme have returned 8.5%. Use 10% as a reasonable base case for long-term planning. Always use a conservative estimate since NPS returns are market-linked and not guaranteed.' },
  { q: 'What happens to NPS corpus at age 60?', a: 'At age 60, you must use at least 40% of your NPS corpus to purchase an annuity from an IRDAI-registered life insurer. This annuity provides a monthly pension for life. The remaining 60% can be withdrawn as a lump sum, which is completely tax-free under the Finance Act 2019. You can also annuitise more than 40% if you prefer a higher pension over the lump sum.' },
  { q: 'What are the NPS tax benefits under 80CCD?', a: 'NPS offers three separate deductions: Section 80CCD(1) allows deduction up to 10% of salary (basic + DA) within the Rs 1.5 lakh 80C limit. Section 80CCD(1B) provides an exclusive additional deduction of Rs 50,000 per year for NPS, over and above the 80C limit. Section 80CCD(2) allows employer contributions up to 10% of salary (14% for central government) as a deduction without any upper monetary limit. Total possible NPS deductions can exceed Rs 2 lakh for a salaried person.' },
  { q: 'What is the minimum NPS contribution per year?', a: 'For NPS Tier I, the minimum contribution is Rs 500 per deposit and Rs 1,000 per financial year. There is no maximum contribution limit under the scheme. For NPS Tier II (voluntary savings account), the minimum initial contribution is Rs 250. NPS Tier II does not provide tax benefits but allows unrestricted withdrawals.' },
  { q: 'What is the difference between Auto Choice and Active Choice in NPS?', a: 'Auto Choice (Lifecycle Fund) automatically adjusts your equity-debt allocation based on age. Life Cycle 75 starts at 75% equity till age 35 and reduces to 15% by age 55. Life Cycle 50 starts at 50% equity and reduces to 10%. Life Cycle 25 starts at 25% equity and reduces to 5%. Active Choice lets you set your own allocation: up to 75% in Equity (E), up to 100% in Corporate Bonds (C), and up to 100% in Government Securities (G), totalling 100%.' },
  { q: 'Can I withdraw from NPS before age 60?', a: 'Partial withdrawals are allowed after 3 years of NPS account opening for specific purposes: higher education or marriage of children, purchase or construction of a residential house, treatment of critical illness, or disability. Maximum withdrawal is 25% of the employee own contributions, with up to 3 withdrawals across the entire tenure. Premature exit before age 60 requires 80% of corpus to be annuitised; only 20% can be withdrawn as lump sum.' },
  { q: 'Is NPS better than PPF for retirement?', a: 'NPS offers market-linked returns with historically higher long-term returns (10-13% CAGR in equity schemes vs PPF at 7.1% for FY26). NPS also provides Rs 50,000 additional tax deduction under 80CCD(1B) that PPF does not. However, 40% of NPS corpus must be annuitised (pension is taxable), while PPF maturity is 100% tax-free. NPS suits investors seeking higher growth and willing to accept market risk; PPF suits risk-averse investors wanting guaranteed, tax-free returns.' },
  { q: 'What annuity rate should I use for NPS pension calculation?', a: 'Annuity rates from Indian life insurers for NPS (Annuity for Life with Return of Purchase Price at 60 years) currently range from 6.0% to 6.75% per annum. This rate is locked in at the time of annuity purchase and depends on the insurer, age at annuity purchase, and the annuity variant chosen. At 6.5%, a Rs 40 lakh annuity corpus provides approximately Rs 21,667 per month. The monthly pension from annuity is fully taxable.' },
  { q: 'What is the NPS annuity ratio and can I change it?', a: 'The annuity ratio is the percentage of your NPS corpus you use to purchase an annuity. Per PFRDA guidelines, the minimum annuity ratio is 40% for subscribers retiring at or after age 60. For premature exit before 60, the minimum is 80%. You can choose a higher annuity ratio (up to 100%) if you want a larger monthly pension and are willing to forgo a portion of the lump sum.' },
  { q: 'How does the NPS calculator for government employees differ?', a: 'Government employees have a default contribution of 10% of their basic salary plus DA, while the government contributes 14%. The default investment scheme is the Central Government or State Government scheme, which predominantly invests in government securities and corporate bonds, generating historical returns of 8.5% to 9%.' },
  { q: 'What is the National Pension Scheme formula?', a: 'The National Pension Scheme uses a standard compound interest formula for regular SIP investments: FV = M x [((1 + r)^n - 1) / r] x (1 + r), where M is the total monthly contribution (employee + employer), r is the expected monthly rate of return, and n is the total number of months until retirement.' },
  { q: 'Can NRI investors open an NPS account?', a: 'Yes, NRI, OCI, and PIO cardholders between 18 and 70 years of age are eligible to open an NPS account. Contributions can be made from a NRO or NRE account. However, the account will be closed and all proceeds repatriated if the subscriber becomes a citizen of another country. NRI investors should consult a tax adviser since the tax treatment of NPS in their country of residence may differ.' },
  { q: 'How do I calculate NPS pension for central or state government employees?', a: 'Select "Government" as your sector and pick the Central Government or State Government scheme. The calculator applies the default 10% employee and 14% employer contribution split used across most government payrolls, along with the historical 8.5% CAGR for that scheme. Adjust the monthly contribution slider if your basic pay plus DA differs from the default.' },
  { q: 'Is there an NPS calculator for a lumpsum or one-time investment?', a: 'Yes. Set the monthly contribution slider to a low value or zero, then enter your one-time deposit amount in the Existing NPS Corpus field under More settings. The calculator compounds that lumpsum alone at your chosen return rate through to retirement, without adding further monthly contributions.' },
  { q: 'How do I calculate my NPS maturity amount?', a: 'The NPS maturity amount is the total corpus shown at your selected retirement age, before any split into lump sum and annuity. Enter your monthly contribution, current age, retirement age, and expected return rate, and the calculator displays the maturity corpus instantly at the top of the results panel.' },
  { q: 'What is NPS Tier 2, and does this calculator support it?', a: 'Tier II is a voluntary NPS savings account with no lock-in and no tax deduction, separate from the retirement-focused Tier I account. This calculator projects Tier I, since that is the account with the 80CCD tax benefits and the compounding relevant to retirement planning. Tier II withdrawals are unrestricted and do not need a maturity projection.' },
  { q: 'What is a PRAN number, and does it affect the calculation?', a: 'PRAN, or Permanent Retirement Account Number, is the unique identifier issued by the Central Recordkeeping Agency when you open an NPS account. It is used to log in and track your actual contributions and corpus on the CRA or NPS Trust portal. It has no bearing on the projection formula used by this calculator.' },
  { q: 'Can I calculate NPS with a yearly step-up in contribution?', a: 'Yes. The Annual Contribution Increment field under More settings raises your monthly contribution by a fixed percentage every year, compounding on top of the previous year’s amount. Setting it to 5% or 10% reflects a typical annual salary increment being applied to your NPS deduction.' },
  { q: 'What is Fermor?', a: 'Fermor is building the automated financial action layer for India. The goal is to close the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The actual product connects real financial accounts through the RBI-regulated Account Aggregator framework and automates actions like moving idle cash to liquid funds, paying advance tax, and filling unused 80C deductions.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function NPSCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const defaultSettings = { 
    tab: 'calculator', sector: 'non_government' as Sector, scheme: 'lc75' as Scheme,
    monthly: 5000, employer: 5000, existingCorpus: 0, currentAge: 30, retireAge: 60, defermentAge: 60,
    annualIncrement: 5, returnRate: 12.5, annuityRatio: 40, annuityRate: 6.5, desiredPension: 0 
  };
  const { settings, updateSettings } = useCalculatorSettings('nps-calculator', defaultSettings);
  const { tab, sector, scheme, monthly, employer, existingCorpus, currentAge, retireAge, defermentAge, annualIncrement, returnRate, annuityRatio, annuityRate, desiredPension } = settings;
  const setTab = (v: any) => updateSettings({ tab: typeof v === 'function' ? v(settings.tab) : v });
  const setSector = (v: any) => updateSettings({ sector: typeof v === 'function' ? v(settings.sector) : v });
  const setScheme = (v: any) => updateSettings({ scheme: typeof v === 'function' ? v(settings.scheme) : v });
  const setMonthly = (v: any) => updateSettings({ monthly: typeof v === 'function' ? v(settings.monthly) : v });
  const setEmployer = (v: any) => updateSettings({ employer: typeof v === 'function' ? v(settings.employer) : v });
  const setExistingCorpus = (v: any) => updateSettings({ existingCorpus: typeof v === 'function' ? v(settings.existingCorpus) : v });
  const setCurrentAge = (v: any) => updateSettings({ currentAge: typeof v === 'function' ? v(settings.currentAge) : v });
  const setRetireAge = (v: any) => updateSettings({ retireAge: typeof v === 'function' ? v(settings.retireAge) : v });
  const setDefermentAge = (v: any) => updateSettings({ defermentAge: typeof v === 'function' ? v(settings.defermentAge) : v });
  const setAnnualIncrement = (v: any) => updateSettings({ annualIncrement: typeof v === 'function' ? v(settings.annualIncrement) : v });
  const setReturnRate = (v: any) => updateSettings({ returnRate: typeof v === 'function' ? v(settings.returnRate) : v });
  const setAnnuityRatio = (v: any) => updateSettings({ annuityRatio: typeof v === 'function' ? v(settings.annuityRatio) : v });
  const setAnnuityRate = (v: any) => updateSettings({ annuityRate: typeof v === 'function' ? v(settings.annuityRate) : v });
  const setDesiredPension = (v: any) => updateSettings({ desiredPension: typeof v === 'function' ? v(settings.desiredPension) : v });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = useCallback((n: number) => formatCurrency(convertCurrency(n)), [formatCurrency, convertCurrency]);
  const fmtC = useCallback((n: number) => formatCurrency(convertCurrency(n), true), [formatCurrency, convertCurrency]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        updateSettings(d);
      }
    } catch { }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }
    catch { }
  }, [settings]);

  const handleSchemeChange = (newScheme: Scheme) => {
    setScheme(newScheme);
    const rate = SCHEME_RATES[newScheme];
    if (rate) setReturnRate(rate);
  };

  const result = useMemo(() => calcNPS(monthly, employer, existingCorpus, currentAge, retireAge, defermentAge, annualIncrement, returnRate),
    [monthly, employer, existingCorpus, currentAge, retireAge, defermentAge, annualIncrement, returnRate]);

  const annuityCorpus = result.totalCorpus * annuityRatio / 100;
  const lumpSum = result.totalCorpus * (1 - annuityRatio / 100);
  const lumpSumPct = Math.round((1 - annuityRatio / 100) * 100);
  const monthlyPension = Math.round((annuityCorpus * annuityRate / 100) / 12);
  const returnsGenerated = result.totalCorpus - result.totalContributed;
  
  const pensionShortfall = Math.max(0, desiredPension - monthlyPension);
  const isSurplus = monthlyPension >= desiredPension;

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 14px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            NPS Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            National Pension System calculator with scheme selection, deferment age, contribution increment, and reverse pension analysis
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div role="tablist" aria-label="Calculator view" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([['calculator', 'NPS Calculator'], ['yearly', 'Year-by-Year']] as ['calculator' | 'yearly', string][]).map(([t, label]) => (
                  <button key={t} id={`tab-${t}`} role="tab" aria-selected={tab === t} aria-controls={`panel-${t}`}
                    onClick={() => setTab(t)}
                    style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: tab === t ? 700 : 400, color: tab === t ? C.dark : C.ink3, borderBottom: tab === t ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                    {label}
                  </button>
                ))}
              </div>

              {tab === 'calculator' && (
                <div id="panel-calculator" role="tabpanel" aria-labelledby="tab-calculator">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                  <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                        {showAdvanced ? 'Advanced Settings' : 'NPS Details'}
                      </p>
                      <CurrencySelector theme="light" />
                    </div>

                    {!showAdvanced ? (
                      <>
                        <div style={{ marginBottom: 24 }}>
                          <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 8 }}>Subscriber Sector</label>
                          <select value={sector} onChange={e => setSector(e.target.value as Sector)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, fontSize: 14, color: C.ink, fontFamily: INTER, outline: 'none', cursor: 'pointer' }}>
                            <option value="government">Government</option>
                            <option value="non_government">Non-Government</option>
                            <option value="vatsalya">NPS Vatsalya</option>
                          </select>
                        </div>

                        <div style={{ marginBottom: 36 }}>
                          <label style={{ fontSize: 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 8 }}>Scheme Available</label>
                          <select value={scheme} onChange={e => handleSchemeChange(e.target.value as Scheme)}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.white, fontSize: 14, color: C.ink, fontFamily: INTER, outline: 'none', cursor: 'pointer' }}>
                            {sector === 'government' ? (
                              <>
                                <option value="central_govt">Central Government</option>
                                <option value="state_govt">State Government</option>
                                <option value="g_sec_100">100% G Sec</option>
                                <option value="lc50">Life Cycle 50 - Moderate</option>
                                <option value="lc25">Life Cycle 25 - Low</option>
                              </>
                            ) : (
                              <>
                                <option value="lc75">Life Cycle 75 - High</option>
                                <option value="lc50">Life Cycle 50 - Moderate</option>
                                <option value="lc25">Life Cycle 25 - Low</option>
                                <option value="corporate_cg">Corporate CG</option>
                                <option value="active">Active Choice</option>
                              </>
                            )}
                          </select>
                        </div>

                        <Slider id="monthly-contribution" label="Your Monthly Contribution" value={monthly} min={500} max={200000} step={500}
                          display={fmtC(monthly)} onChange={setMonthly} compact={mobile} />
                        <Slider id="current-age" label="Current Age" value={currentAge} min={0} max={70} step={1}
                          display={`${currentAge} yr`} onChange={setCurrentAge} compact={mobile} />
                        <Slider id="retirement-age" label="Retirement Age" value={retireAge} min={Math.max(currentAge + 1, 18)} max={75} step={1}
                          display={`${retireAge} yr`} onChange={v => { setRetireAge(Math.max(v, currentAge + 1)); setDefermentAge(Math.max(v, defermentAge)); }} compact={mobile} />
                        <Slider id="return-rate" label="Expected Return Rate (p.a.)" value={returnRate} min={4} max={16} step={0.5}
                          display={`${returnRate.toFixed(1)}%`} onChange={setReturnRate} compact={mobile} />

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button onClick={() => setShowAdvanced(true)}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 13px', cursor: 'pointer', fontFamily: INTER }}>
                            More settings
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Slider id="employer-contribution" label="Employer Contribution" value={employer} min={0} max={200000} step={500}
                          display={fmtC(employer)} onChange={setEmployer} compact={mobile} />
                        <Slider id="existing-corpus" label="Existing NPS Corpus" value={existingCorpus} min={0} max={10000000} step={50000}
                          display={fmtC(existingCorpus)} onChange={setExistingCorpus} compact={mobile} />
                        <Slider id="deferment-age" label="Deferment Age (Optional)" value={defermentAge} min={retireAge} max={75} step={1}
                          display={`${defermentAge} yr`} onChange={v => setDefermentAge(Math.max(v, retireAge))} compact={mobile} />
                        <Slider id="desired-pension" label="Desired Monthly Pension" value={desiredPension} min={0} max={500000} step={5000}
                          display={fmtC(desiredPension)} onChange={setDesiredPension} compact={mobile} />
                        <Slider id="annual-increment" label="Annual Contribution Increment (%)" value={annualIncrement} min={0} max={20} step={1}
                          display={`${annualIncrement}%`} onChange={setAnnualIncrement} compact={mobile} />
                        <Slider id="annuity-ratio" label="Annuity Ratio (%)" value={annuityRatio} min={40} max={100} step={1}
                          display={`${annuityRatio}%`} onChange={setAnnuityRatio} compact={mobile} />
                        <Slider id="annuity-rate" label="Expected Annuity Rate (%)" value={annuityRate} min={4} max={9} step={0.25}
                          display={`${annuityRate.toFixed(2)}%`} onChange={setAnnuityRate} compact={mobile} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <button onClick={() => setShowAdvanced(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 600, color: C.ink2, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 13px', cursor: 'pointer', fontFamily: INTER }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                            Back
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Total Corpus at {defermentAge}</div>
                        <div style={{ fontSize: 12, color: '#7A8087' }}>Monthly pension est.</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                        <div aria-live="polite" aria-label={`Total NPS corpus: ${fmtIN(result.totalCorpus)}`}
                          style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmtIN(result.totalCorpus)}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmtIN(monthlyPension)}/mo</div>
                      </div>
                    </div>

                    {desiredPension > 0 && (
                      <div style={{ width: '100%', background: isSurplus ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${isSurplus ? '#DCFCE7' : '#FEE2E2'}`, borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', marginBottom: 12 }}>
                        <p style={{ fontSize: 13, color: isSurplus ? '#166534' : '#991B1B', margin: '0 0 4px', fontWeight: 600 }}>
                          {isSurplus ? 'Pension Goal Achieved' : 'Pension Shortfall Detected'}
                        </p>
                        <p style={{ fontSize: 13, color: isSurplus ? '#15803D' : '#B91C1C', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                          {isSurplus ? `You will exceed your desired pension by ${fmtIN(monthlyPension - desiredPension)}/month.` : `You are short by ${fmtIN(pensionShortfall)}/month. Increase your monthly SIP or extend your retirement age.`}
                        </p>
                      </div>
                    )}

                    {[
                      { label: `Lump sum (${100 - annuityRatio}%)`, value: fmtC(lumpSum), note: 'Tax-free' },
                      { label: `Annuity corpus (${annuityRatio}%)`, value: fmtC(annuityCorpus) },
                      { label: 'Monthly pension estimate', value: fmtIN(monthlyPension), note: 'Taxable' },
                      { label: 'Total contributed', value: fmtC(result.totalContributed) },
                      { label: 'Returns generated', value: fmtC(Math.max(0, returnsGenerated)) },
                    ].map(({ label, value, note }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                        <div>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          {note && <span style={{ fontSize: 10, color: note === 'Tax-free' ? '#1f7a58' : C.ink, fontWeight: 600, marginLeft: 6 }}>{note}</span>}
                        </div>
                        <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                      </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                      <DonutChart lumpSum={lumpSum} annuity={annuityCorpus} lumpSumPct={lumpSumPct} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 12, order: mobile ? 2 : -1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Lump sum {100 - annuityRatio}%</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Annuity {annuityRatio}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

              {tab === 'yearly' && (
                <div id="panel-yearly" role="tabpanel" aria-labelledby="tab-yearly">
                <div style={{ padding: mobile ? '20px 18px' : '22px 44px', borderBottom: `1px solid ${C.border}` }}>
                  <h2 style={{ fontSize: mobile ? 16 : 18, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>Year-by-Year NPS Growth</h2>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0 }}>
                    {retireAge - currentAge} years of contributions, {defermentAge - retireAge} years of deferred growth at {returnRate}% p.a. Corpus at withdrawal: {fmtC(result.totalCorpus)}.
                  </p>
                </div>
                <div style={{ overflowX: 'auto', maxHeight: 520, overflowY: 'auto' }}>
                  {mobile && (
                    <div style={{ padding: '7px 18px', background: C.bg, fontSize: 11, color: C.ink3, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      Swipe right to see all columns
                    </div>
                  )}
                  <table style={{ minWidth: 480, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 20px 0', textAlign: 'left' }}>
                      Year-by-year NPS corpus at {returnRate}% p.a. with {annualIncrement}% increment on contributions starting at {fmtC(monthly + employer)}/month.
                    </caption>
                    <thead style={{ position: 'sticky', top: 0 }}>
                      <tr>
                        {['Age', 'Year', 'Opening Corpus', 'Contribution', 'Returns', 'Closing Corpus'].map(h => (
                          <th key={h} scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', background: '#f4f5f6', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearRows.map((row, i) => (
                        <tr key={row.age} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '11px 16px', fontWeight: 700, color: C.dark }}>{row.age}</td>
                          <td style={{ padding: '11px 16px', color: C.ink3 }}>{row.year}</td>
                          <td style={{ padding: '11px 16px', color: C.ink2 }}>{fmtIN(row.openingCorpus)}</td>
                          <td style={{ padding: '11px 16px', color: C.ink2 }}>{row.contribution > 0 ? fmtIN(row.contribution) : '-'}</td>
                          <td style={{ padding: '11px 16px', color: C.green, fontWeight: 600 }}>{fmtIN(row.returns)}</td>
                          <td style={{ padding: '11px 16px', fontWeight: 700, color: C.ink }}>{fmtIN(row.closingCorpus)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
              )}

            </div>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            

            <article itemScope itemType="https://schema.org/Article">

              <div style={sec}>
                <h2 id="what-is-nps" style={h2}>What Is NPS?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    NPS (National Pension System) is a voluntary, market-linked retirement savings scheme regulated by the Pension Fund Regulatory and Development Authority (PFRDA). It is available to all Indian citizens aged 18-70 and offers the most comprehensive income tax deductions of any investment product in India.
                  </p>
                </div>
                <p style={p}>
                  NPS was opened to all citizens in 2009 after being introduced for central government employees in January 2004. The corpus is invested in a mix of equity, corporate bonds, and government securities through PFRDA-registered Pension Fund Managers.
                </p>
                <p style={p}>
                  Every subscriber gets a Permanent Retirement Account Number, or PRAN, issued by the Central Recordkeeping Agency (CRA). The PRAN is the account identifier used to log in, track contributions, and check the corpus balance. It has no effect on how the corpus is calculated.
                </p>
                <p style={p}>
                  At retirement (age 60 to 75), you can withdraw up to 60% of the corpus as a tax-free lump sum. The remaining 40% must be used to purchase an annuity from an IRDAI-registered life insurer, which provides a monthly pension for life. The pension from annuity is fully taxable.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nps-corpus-formula" style={h2}>NPS Corpus Calculation: How the Formula Works</h2>
                <p style={p}>The NPS corpus at retirement is the future value of all monthly contributions compounded at the expected annual return rate, plus the future value of any existing corpus.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 14 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    FV = M x [((1 + r)^n - 1) / r] x (1 + r)<br />
                    r = Annual Rate / 12, n = months to retirement
                  </code>
                </div>
                <p style={p}>
                  Example: Rs 10,000/month at 10% for 30 years. Monthly r = 0.00833, n = 360 months. FV = Rs 2.28 crore. With a 5% annual increment on contributions, the same scenario gives approximately Rs 3.8 crore, an increase of 67%.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nps-tax-benefits" style={h2}>NPS Tax Benefits: How to Save Up to Rs 2 Lakh Per Year</h2>
                <p style={p}>NPS provides three distinct tax deductions, making it the only investment with deductions under three separate sections of the Income Tax Act.</p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>NPS tax deductions under the Income Tax Act</caption>
                    <thead><tr>{['Section', 'Deduction', 'Limit', 'Who Qualifies'].map(h => <th key={h} scope="col" style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[
                        ['80CCD(1)', 'Employee contribution', '10% of salary within Rs 1.5L 80C', 'All NPS subscribers'],
                        ['80CCD(1B)', 'Additional NPS deduction', 'Rs 50,000 per year (over and above 80C)', 'All NPS subscribers'],
                        ['80CCD(2)', 'Employer contribution', '10% of salary (14% for Central Govt), no cap', 'Salaried employees'],
                      ].map(([section, ded, limit, who], i) => (
                        <tr key={section} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{section}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{ded}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{limit}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{who}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A salaried employee on Rs 10 lakh annual salary can claim Rs 1 lakh under 80CCD(1) plus Rs 50,000 under 80CCD(1B). In the 30% bracket, that saves Rs 45,000 in taxes per year on NPS contributions alone, before counting employer contributions under 80CCD(2).
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Income Tax Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See exactly how your NPS deductions change your total tax outgo under the old and new regimes.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={sec}>
                <h2 id="nps-govt-employees" style={h2}>NPS Calculator for Government Employees</h2>
                <p style={p}>
                  Government employees have a unique contribution structure where the employer (Central or State Government) contributes 14% of Basic + DA, while the employee contributes 10%. This high matching contribution significantly boosts the retirement corpus compared to the private sector.
                </p>
                <p style={p}>
                  When using the NPS calculator for central government employees, you should select the "Central Government" scheme option. This scheme predominantly invests in government securities and high-rated corporate bonds, historically yielding around 8.5% to 9% CAGR. State government schemes follow a similar asset allocation mandate.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nps-vs-ppf" style={h2}>NPS vs PPF: What Is the Difference?</h2>
                <p style={p}>NPS and PPF are both long-term, tax-advantaged instruments but serve different risk profiles. NPS is market-linked with higher potential returns; PPF provides sovereign-guaranteed fixed returns.</p>
                <p style={p}>
                  Run the same monthly amount through the <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> to compare the guaranteed maturity value against the NPS projection above.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>NPS vs PPF at a glance</caption>
                    <thead><tr>{['Feature', 'NPS', 'PPF'].map(h => <th key={h} scope="col" style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[
                        ['Returns', 'Market-linked, ~10-13% (equity schemes)', 'Govt-guaranteed, 7.1% (FY26)'],
                        ['Lock-in', 'Till age 60 (partial withdrawal allowed)', '15 years (extendable in 5-yr blocks)'],
                        ['Tax at maturity', '60% lump sum tax-free; pension taxable', '100% tax-free at maturity'],
                        ['Exclusive deduction', 'Rs 50,000 under 80CCD(1B)', 'None beyond 80C cap'],
                        ['Compulsory annuity', 'Min 40% must buy annuity', 'None; full withdrawal allowed'],
                      ].map(([feature, nps, ppf], i) => (
                        <tr key={feature} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{feature}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{nps}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{ppf}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 id="nps-lumpsum-vs-sip" style={h2}>NPS One-Time Investment vs Monthly SIP Calculator</h2>
                <p style={p}>
                  An NPS one-time investment calculator projects the growth of a single lump sum deposit over time, whereas a monthly pension calculator accounts for recurring SIP contributions. Both methods use compounding, but recurring contributions build wealth incrementally.
                </p>
                <p style={p}>
                  To calculate a lump sum investment, set the "Your Monthly Contribution" slider to zero and enter your deposit amount in the "Existing NPS Corpus" field under advanced settings. The calculator will project the final maturity amount based purely on compounding the initial deposit without additional contributions.
                </p>
                <p style={p}>
                  For a straight SIP-only projection without NPS's annuity lock-in, the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> and the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Lumpsum Calculator</Link> show the same compounding math on a fully liquid mutual fund.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nps-return-rates" style={h2}>What Is a Good NPS Return Rate for Planning?</h2>
                <p style={p}>Based on published benchmark returns from the NPS Trust, these are the approximate 10-year CAGRs for common schemes as of June 2026.</p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>Approximate 10-year CAGR benchmarks for NPS schemes</caption>
                    <thead><tr>{['Scheme', 'Equity %', 'Approx 10Y CAGR', 'Best For'].map(h => <th key={h} scope="col" style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[
                        ['Life Cycle 75 (LC75)', '75% (till 35)', '12.5%', 'Young investors, 20+ year horizon'],
                        ['Life Cycle 50 (LC50)', '50% (till 35)', '10.5%', 'Moderate risk, balanced allocation'],
                        ['Life Cycle 25 (LC25)', '25% (till 35)', '8.5%', 'Conservative investors'],
                        ['Central/State Govt', '15%', '8.5%', 'Government employees'],
                        ['Active Choice (75% equity)', 'Up to 75%', '12.0%', 'Investors managing their own allocation'],
                      ].map(([scheme, eq, cagr, use], i) => (
                        <tr key={scheme} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{scheme}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{eq}</td>
                          <td style={{ padding: '11px 14px', color: C.green, fontWeight: 600 }}>{cagr}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 id="nps-schemes" style={h2}>NPS Schemes: Auto Choice and Active Choice</h2>
                <p style={p}>
                  NPS offers two investment approaches. Auto Choice (Lifecycle Fund) automatically shifts your allocation from equity-heavy to debt-heavy as you age. Active Choice lets you set your own allocation up to 75% equity.
                </p>
                <p style={p}>
                  Life Cycle 75 starts at 75% equity till age 35 and reduces to 15% by age 55. Life Cycle 50 starts at 50% equity and reduces to 10%. Life Cycle 25 starts at 25% equity and reduces to 5%. For most investors under 40, Life Cycle 75 or Active Choice at 75% equity has historically been the highest-returning option across PFM providers like SBI, HDFC, and ICICI.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nps-annuity" style={h2}>NPS Annuity: How Your Monthly Pension Is Calculated</h2>
                <p style={p}>
                  Monthly pension is calculated by multiplying the Annuity Corpus by the Annuity Rate, then dividing by 12. Annuity corpus is the percentage of your total NPS corpus used to buy an annuity (minimum 40% per PFRDA).
                </p>
                <p style={p}>
                  Annuity rates from IRDAI-registered insurers for NPS at age 60 range from 6.0% to 6.75% for the "Annuity for Life with Return of Purchase Price" variant. At 6.5%, a Rs 50 lakh annuity corpus gives Rs 27,083 per month. The monthly pension is fully taxable as income from other sources.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nps-withdrawal" style={h2}>NPS Withdrawal Rules: Partial and Premature Exit</h2>
                <p style={p}>
                  Partial withdrawals are allowed after 3 years for specific purposes: higher education or marriage of children, purchase or construction of a residential house, treatment of critical illness, or disability. Maximum partial withdrawal is 25% of your own contributions, capped at 3 withdrawals across the entire NPS tenure.
                </p>
                <p style={p}>
                  Premature exit before age 60 is permitted after 5 years. At premature exit, 80% of corpus must be annuitised and only 20% can be taken as lump sum. The 20% lump sum is taxable, unlike the 60% at normal retirement which is tax-free. NPS can be deferred past age 60 up to age 75 per PFRDA circular.
                </p>
                <p style={p}>
                  For a broader retirement corpus view that includes NPS alongside EPF, PPF, and personal savings, the <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Retirement Calculator</Link> models the full picture.
                </p>
              </div>

              <div style={sec}>
                <h2 id="nps-tier1-vs-tier2" style={h2}>NPS Tier 1 vs Tier 2: Which One Does This Calculator Cover?</h2>
                <p style={p}>
                  This calculator projects Tier I, the mandatory retirement account that carries the 80CCD tax deductions and the lock-in until age 60. Tier I is what people mean by "NPS" in almost every context.
                </p>
                <p style={p}>
                  Tier II is a separate, optional savings account attached to the same PRAN. It has no lock-in and no tax deduction on deposits, so withdrawals are unrestricted at any time.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 14 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>NPS Tier I vs Tier II</caption>
                    <thead><tr>{['Feature', 'Tier I', 'Tier II'].map(h => <th key={h} scope="col" style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                      {[
                        ['Purpose', 'Retirement account', 'Voluntary savings account'],
                        ['Lock-in', 'Till age 60', 'None'],
                        ['Tax deduction', '80CCD(1), (1B), (2)', 'None (for most subscribers)'],
                        ['Minimum contribution', 'Rs 500 to open, Rs 1,000/year', 'Rs 250 minimum'],
                        ['Withdrawal', 'Restricted, per PFRDA rules', 'Unrestricted, anytime'],
                      ].map(([feature, t1, t2], i) => (
                        <tr key={feature} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{feature}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{t1}</td>
                          <td style={{ padding: '11px 14px', color: C.ink2 }}>{t2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 id="how-to-use" style={h2}>How to Use This NPS Calculator</h2>
                <p style={p}>The NPS Calculator tab shows your projected corpus, lump sum, annuity, and monthly pension. The Year-by-Year tab shows the annual compounding breakdown by age.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Scheme and Sector:</strong> choose government or non-government, then select your scheme to automatically populate expected return rates.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set basic details:</strong> enter your monthly contribution, current age, and retirement age.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Use More settings for advanced inputs:</strong> enter employer contribution, existing NPS corpus, deferment age, and your desired monthly pension to see shortfall analysis.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review corpus and pension:</strong> the calculator shows total corpus at retirement, the lump sum you can withdraw, annuity corpus, and estimated monthly pension.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Check Year-by-Year tab:</strong> see how the corpus builds year by year, including during any deferment phase.
                  </li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 id="faq" style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. NPS returns are market-linked and not guaranteed. Past performance of NPS schemes does not guarantee future returns. Annuity rates change at the time of purchase and are not locked in advance. Tax treatment is based on current Income Tax Act provisions and may change with future Finance Acts. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or PFRDA-registered distributor before making NPS investment decisions.
                </p>
              </div>

            </article>
          </div>

          <style>{`.nps-sidebar::-webkit-scrollbar{width:5px}.nps-sidebar::-webkit-scrollbar-track{background:transparent}.nps-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.nps-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="nps-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 12 }}>NPS Quick Facts</div>
                {[
                  { label: 'Min entry age', value: '18 years' },
                  { label: 'Max entry age', value: '70 years' },
                  { label: 'Retirement age', value: '60-75 years' },
                  { label: 'Min annuity ratio', value: '40% (at 60+)' },
                  { label: '80CCD(1B) deduction', value: 'Rs 50,000/yr' },
                  { label: 'Lump sum tax', value: 'Tax-free (60%)' },
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
        { hd: 'Calculators', links: ['/calculators/nps-calculator|NPS', '/calculators/ppf-calculator|PPF', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/income-tax-calculator|Income Tax', '/calculators/retirement-calculator|Retirement', '/calculators/cagr-calculator|CAGR'] },
        { hd: 'More Tools', links: ['/calculators/ssy-calculator|SSY', '/calculators/gratuity-calculator|Gratuity', '/calculators/swp-calculator|SWP', '/calculators/lumpsum-calculator|Lumpsum'] },
        { hd: 'Company', links: ['/about|About', '/blogs|Blogs', '/privacy|Privacy Policy', '/terms|Terms', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

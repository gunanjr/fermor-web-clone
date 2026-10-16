'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
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
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

const STORAGE_KEY = 'fermor-section-80d-v1';

/* ── Tax Calculation ───────────────────────────────────────────── */
function calcOldRegimeTax(gross: number, totalDeductions: number): number {
  const standardDed = 50000;
  const taxable = Math.max(0, gross - standardDed - totalDeductions);
  let tax = 0;
  if (taxable > 250000) tax += Math.min(taxable - 250000, 250000) * 0.05;
  if (taxable > 500000) tax += Math.min(taxable - 500000, 500000) * 0.20;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  if (taxable <= 500000) tax = 0;
  return Math.round(tax * 1.04);
}

/* ── Slider ───────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
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
          id={inputId}
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

/* ── Toggle ───────────────────────────────────────────────────── */
function Toggle({ options, value, onChange, label }: {
  options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void; label: string;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>{label}</p>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {options.map(opt => {
          const active = value === opt.value;
          return (
            <button key={opt.value} role="radio" aria-checked={active}
              onClick={() => onChange(opt.value)}
              style={{ flex: 1, padding: '10px 16px', fontSize: 13, fontWeight: active ? 600 : 400, color: active ? C.ink : C.ink3, background: active ? C.white : 'transparent', border: 'none', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Donut Chart ──────────────────────────────────────────────── */
function DonutChart({ savedPct }: { savedPct: number }) {
  const paidPct = 100 - savedPct;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const sArc = (savedPct / 100) * circ;
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" role="img"
      aria-label={`Tax saved ${savedPct.toFixed(0)}% of total tax without 80D, tax paid ${paidPct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${sArc} ${circ - sArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Saved</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savedPct.toFixed(0)}%</text>
    </svg>
  );
}

/* ── Sidebar List ─────────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
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
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/old-tax-regime-calculator', label: 'Old Tax Regime Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/nps-tax-benefit-calculator', label: 'NPS Tax Benefit Calculator' },
  { href: '/calculators/tax-saving-calculator', label: 'Tax Saving Calculator' },
];
const MORE = [
  { href: '/calculators/hra-calculator', label: 'HRA Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/nps-calculator', label: 'NPS Calculator' },
  { href: '/calculators/epf-calculator', label: 'EPF Calculator' },
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
];

/* ── FAQ ──────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is Section 80D of the Income Tax Act?', a: 'Section 80D of the Income Tax Act, 1961 allows individuals and HUFs to claim a deduction for health insurance premiums paid for self, spouse, children, and parents. The deduction is available only under the old tax regime. The maximum deduction ranges from Rs 25,000 to Rs 1 lakh depending on whether you or your parents are senior citizens (60 years or above).' },
  { q: 'What is the maximum deduction under Section 80D?', a: 'The maximum deduction under Section 80D is Rs 1 lakh per year: Rs 50,000 for self+family (if you or spouse is 60+) plus Rs 50,000 for parents (if parents are 60+). If neither you nor your parents are senior citizens, the combined maximum is Rs 50,000 (Rs 25,000 + Rs 25,000). Preventive health checkup of up to Rs 5,000 is included within these limits.' },
  { q: 'Can I claim 80D deduction for health insurance for parents?', a: 'Yes. You can claim 80D deduction for health insurance premiums paid for your parents, whether they are dependent on you or not. If your parents are below 60 years, the limit is Rs 25,000. If they are 60 or above (senior citizens), the limit is Rs 50,000. This is in addition to the deduction for your own and your family premium.' },
  { q: 'What is the 80D deduction limit for senior citizens?', a: 'For senior citizens (individuals aged 60 or above), the Section 80D deduction limit is Rs 50,000 per year. This higher limit applies separately for your own/family coverage (if you or your spouse is 60+) and for your coverage for parents (if parents are 60+). The combined maximum for both brackets at senior citizen rates is Rs 1 lakh.' },
  { q: 'Is preventive health checkup deductible under Section 80D?', a: 'Yes. A preventive health checkup of up to Rs 5,000 per year qualifies for deduction under Section 80D. Crucially, this Rs 5,000 is part of (not in addition to) the overall limit of Rs 25,000 or Rs 50,000. So if you have paid Rs 20,000 in insurance premiums, you can claim an additional Rs 5,000 for preventive checkup to reach Rs 25,000 total.' },
  { q: 'What is Section 80D deduction for uninsured senior citizen parents?', a: 'If your parents are senior citizens (60+) and do not have health insurance, you can claim a deduction of up to Rs 50,000 for actual medical expenses incurred for them under Section 80D. This is specifically for medical expenditure when no insurance premium has been paid. Cash payments for these expenses are not allowed. The expenditure must be through digital payment methods per CBDT rules.' },
  { q: 'Can I claim 80D deduction under the new tax regime?', a: 'No. Section 80D deductions for health insurance premiums are not available under the new tax regime. If you opt for the new tax regime, which has lower slab rates and no deductions, you cannot claim any deduction under Section 80D. The deduction is only available if you file under the old tax regime.' },
  { q: 'What is the 80D deduction limit for non-senior citizen parents?', a: 'If your parents are below 60 years of age, the deduction limit for their health insurance premium under Section 80D is Rs 25,000 per year. This is separate from the Rs 25,000 limit for your own and your family (spouse and children) health insurance. Combined, you can claim up to Rs 50,000 if neither you nor your parents are senior citizens.' },
  { q: 'How do I claim Section 80D when filing my ITR?', a: 'To claim Section 80D deduction in your ITR, enter the premium amounts in the respective fields under "Deductions under Chapter VI-A" in ITR-1 or ITR-2. Keep your insurance premium receipts and policy documents ready. For preventive health checkup, the actual bills suffice. For senior citizen medical expenditure for parents, digital payment proofs are required. The employer does not always reflect 80D in Form 16, so you must claim it directly in your ITR.' },
  { q: 'Does cash payment qualify for 80D deduction?', a: 'Health insurance premiums paid in cash do not qualify for Section 80D deduction. All premium payments must be made through non-cash modes such as cheque, demand draft, credit card, debit card, net banking, or UPI. Only preventive health checkup expenses up to Rs 5,000 may be paid in cash and still be eligible for deduction.' },
  { q: 'Can I claim 80D for my spouse and children?', a: 'Yes. The Rs 25,000 (or Rs 50,000 for senior citizens) limit for self+family under Section 80D covers health insurance premiums paid for yourself, your spouse, and your dependent children. Non-dependent children are not covered. The premium can be under one family floater plan or individual plans; both qualify.' },
  { q: 'What is the difference between 80C and 80D?', a: 'Section 80C allows deductions for investments and expenses like PPF, ELSS, EPF, NSC, and tuition fees, up to Rs 1.5 lakh. Section 80D specifically covers health insurance premiums and medical expenditure for senior citizen parents, with a separate limit of Rs 25,000 to Rs 1 lakh. The 80D limit is over and above the 80C limit. Claiming 80D does not reduce your 80C capacity.' },
  { q: 'Can I claim Section 80D for my in-laws?', a: 'No, Section 80D covers your own parents but not the parents of your spouse. Your spouse can claim it for their own parents in their own return. Each taxpayer claims only for the people the section allows.' },
  { q: 'Does a top-up or super top-up health policy qualify under Section 80D?', a: 'Yes, the premium paid for a top-up or super top-up health policy qualifies under Section 80D. It counts toward the same overall limit as your base policy. Pay the premium by a non-cash mode to claim it.' },
  { q: 'Is the Section 80D limit per policy or per person?', a: 'The Section 80D limit applies per category, not per policy. One limit covers you, your spouse and children together, and a separate limit covers your parents. Multiple policies in the same category share one limit.' },
  { q: 'How is 80D deduction handled for a multi-year health insurance premium?', a: 'For a multi-year policy paid upfront, the deduction is spread across the years of cover. Each year you claim a proportionate share of the premium. The annual limit of Rs 25,000 or Rs 50,000 still applies.' },
  { q: 'Can a HUF claim Section 80D?', a: 'Yes, a Hindu Undivided Family can claim Section 80D for premium paid on any of its members. The limit is Rs 25,000, or Rs 50,000 if the insured member is a senior citizen. Payment must be made from HUF funds.' },
  { q: 'Can I claim Section 80D on a group health policy paid by my employer?', a: 'No, premium paid by your employer is not available as your Section 80D deduction. You can claim only the premium you pay from your own money. Any extra personal policy you buy remains eligible.' },
  { q: 'Which documents do I need to claim Section 80D?', a: 'Keep the premium receipt, the policy document and proof of non-cash payment. Contributions to the Central Government Health Scheme also qualify under Section 80D. Preventive checkup bills are enough for that portion.' },
  { q: 'Is there a higher 80D limit for super senior citizens above 80?', a: 'No, the Section 80D limit stays at Rs 50,000 for all senior citizens aged 60 and above. Super senior citizens with no insurance can claim medical expenses up to the same Rs 50,000. There is no separate higher slab for age 80 and above.' },
  { q: 'How much tax does Section 80D save?', a: 'The saving depends on your tax slab. A Rs 50,000 deduction saves Rs 15,600 at the 30 per cent slab and Rs 10,400 at the 20 per cent slab, both including 4 per cent cess. Use the calculator to see the exact saving for your income.' },
  { q: 'Can I claim the full premium if I buy a health policy in March?', a: 'Yes, you can claim the full premium paid within the financial year, even if you buy the policy in March. The deduction depends on payment date, not on how many months the cover ran. The limit of Rs 25,000 or Rs 50,000 still applies.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India with free calculators for tax planning, loans, investments, and retirement. A free account is available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and execute the financial decisions most people know they should make but never get around to.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Main Component ───────────────────────────────────────────── */
interface State {
  income: number;
  selfPremium: number;
  isSelfSenior: boolean;
  parentsPremium: number;
  isParentsSenior: boolean;
  parentsUninsured: boolean;
  preventive: number;
}

const DEFAULT: State = {
  income: 1200000,
  selfPremium: 20000,
  isSelfSenior: false,
  parentsPremium: 20000,
  isParentsSenior: true,
  parentsUninsured: false,
  preventive: 5000,
};

export default function Section80DClient() {
  const [state, setState] = useState<State>(DEFAULT);
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const { formatCurrency, convertCurrency } = useCurrency();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState({ ...DEFAULT, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const set = (k: keyof State, v: unknown) => setState(p => ({ ...p, [k]: v }));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const result = useMemo(() => {
    const { income, selfPremium, isSelfSenior, parentsPremium, isParentsSenior, parentsUninsured, preventive } = state;
    const selfFamilyCap = isSelfSenior ? 50000 : 25000;
    const parentsCap = isParentsSenior ? 50000 : 25000;

    const preventiveClaimable = Math.min(preventive, 5000);
    const selfFamilyDeduction = Math.min(selfPremium + preventiveClaimable, selfFamilyCap);

    let parentsDeduction = 0;
    if (parentsUninsured && isParentsSenior) {
      parentsDeduction = Math.min(parentsPremium, 50000);
    } else {
      parentsDeduction = Math.min(parentsPremium, parentsCap);
    }

    const total80D = selfFamilyDeduction + parentsDeduction;
    const taxWithout80D = calcOldRegimeTax(income, 0);
    const taxWith80D = calcOldRegimeTax(income, total80D);
    const taxSaved = Math.max(0, taxWithout80D - taxWith80D);
    const maxPossible80D = selfFamilyCap + (isParentsSenior ? 50000 : 25000);
    const utilizedPct = maxPossible80D > 0 ? Math.round((total80D / maxPossible80D) * 100) : 0;
    const savedPct = taxWithout80D > 0 ? Math.min(100, (taxSaved / taxWithout80D) * 100) : 0;

    return { selfFamilyCap, parentsCap, selfFamilyDeduction, parentsDeduction, total80D, taxWithout80D, taxWith80D, taxSaved, maxPossible80D, utilizedPct, savedPct };
  }, [state]);

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Section 80D Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Calculate your health insurance tax deduction for self, family, and parents under Section 80D of the Income Tax Act
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Section 80D Tax Deduction Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '24px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Annual Gross Income" id="s80d-income" value={state.income} min={300000} max={50000000} step={50000} fmt={fmtC} onChange={v => set('income', v)} compact={mobile} />

                      <Toggle label="Is self or spouse a senior citizen (60+)?"
                        options={[{ value: 'no', label: 'No (< 60)' }, { value: 'yes', label: 'Yes (60+)' }]}
                        value={state.isSelfSenior ? 'yes' : 'no'}
                        onChange={v => set('isSelfSenior', v === 'yes')} />

                      <Slider label={`Self + Family Premium (limit: Rs ${state.isSelfSenior ? '50,000' : '25,000'})`} id="s80d-self" value={state.selfPremium} min={0} max={state.isSelfSenior ? 50000 : 25000} step={1000} fmt={fmtC} onChange={v => set('selfPremium', v)} compact={mobile} />

                      <Toggle label="Are your parents senior citizens (60+)?"
                        options={[{ value: 'no', label: 'No (< 60)' }, { value: 'yes', label: 'Yes (60+)' }]}
                        value={state.isParentsSenior ? 'yes' : 'no'}
                        onChange={v => { set('isParentsSenior', v === 'yes'); if (v === 'no') set('parentsUninsured', false); }} />

                      <Slider
                        label={state.parentsUninsured && state.isParentsSenior ? 'Medical Expenditure for Parents (limit: Rs 50,000)' : `Parents Premium (limit: Rs ${state.isParentsSenior ? '50,000' : '25,000'})`}
                        id="s80d-parents"
                        value={state.parentsPremium}
                        min={0}
                        max={state.isParentsSenior ? 50000 : 25000}
                        step={1000}
                        fmt={fmtC}
                        onChange={v => set('parentsPremium', v)}
                        compact={mobile} />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      {state.isParentsSenior && (
                        <Toggle label="Do your parents have health insurance?"
                          options={[{ value: 'yes', label: 'Insured' }, { value: 'no', label: 'Uninsured' }]}
                          value={state.parentsUninsured ? 'no' : 'yes'}
                          onChange={v => set('parentsUninsured', v === 'no')} />
                      )}

                      <Slider label="Preventive Health Checkup (max Rs 5,000)" id="s80d-preventive" value={state.preventive} min={0} max={5000} step={500} fmt={fmtC} onChange={v => set('preventive', v)} compact={mobile} />

                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '-8px 0 20px' }}>
                        The Rs 5,000 preventive checkup amount is included within your self+family limit, not additional to it.
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
                <div style={{ padding: mobile ? '24px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 20, gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Tax Saved</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '4px 0 0', letterSpacing: '-0.02em' }} aria-live="polite">
                        {fmtC(result.taxSaved)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Total 80D Deduction</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '4px 0 0', opacity: 0.9 }} aria-live="polite">
                        {fmtC(result.total80D)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: `Self + Family (limit Rs ${fmtC(result.selfFamilyCap)})`, value: fmtC(result.selfFamilyDeduction) },
                    { label: state.parentsUninsured && state.isParentsSenior ? `Parents Med. Expenditure (limit Rs ${fmtC(50000)})` : `Parents Premium (limit Rs ${fmtC(result.parentsCap)})`, value: fmtC(result.parentsDeduction) },
                    { label: 'Tax without 80D', value: fmtC(result.taxWithout80D) },
                    { label: 'Tax with 80D', value: fmtC(result.taxWith80D) },
                    { label: 'Max possible 80D limit', value: fmtC(result.maxPossible80D) },
                    { label: '80D limit utilized', value: `${result.utilizedPct}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart savedPct={result.savedPct} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 14, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Saved {result.savedPct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Paid {(100 - result.savedPct).toFixed(0)}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Saved {result.savedPct.toFixed(0)}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Paid {(100 - result.savedPct).toFixed(0)}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: C.lime2, overflow: 'hidden' }} role="img" aria-label={`Tax saved is ${result.savedPct.toFixed(0)}% of tax without 80D`}>
                      <div style={{ height: '100%', width: `${result.savedPct}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Deduction-wise tax saving (collapsible strip) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowSchedule(v => !v)}
                  aria-expanded={showSchedule} aria-controls="deduction-wise-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Deduction-Wise Tax Saving</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Tax saved at each 80D amount</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#F4F5F6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {result.utilizedPct}% of limit used
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showSchedule && (
                  <div id="deduction-wise-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', minWidth: 420, borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: mobile ? '8px 20px 14px' : '8px 44px 16px' }}>Tax saved at each Section 80D deduction amount, using your income under the old regime</caption>
                      <thead>
                        <tr style={{ background: '#F4F5F6' }}>
                          {['80D Deduction', 'Total Tax', 'Tax Saved'].map((h, i) => (
                            <th key={h} scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: i === 0 ? 'left' : 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[25000, 50000, 75000, 100000].map((amt, i) => {
                          const tax = calcOldRegimeTax(state.income, amt);
                          const saved = Math.max(0, result.taxWithout80D - tax);
                          return (
                            <tr key={amt} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#FAFAFA' }}>
                              <td style={{ padding: mobile ? '12px 20px' : '12px 44px', fontWeight: 700, color: C.ink }}>{fmtC(amt)}</td>
                              <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', color: C.ink2 }}>{fmtC(tax)}</td>
                              <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', fontWeight: 700, color: C.dark }}>{fmtC(saved)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* Save Results */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-80d">What Is Section 80D?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Section 80D of the Income Tax Act, 1961 allows individuals and HUFs to claim a tax deduction for health insurance premiums paid for themselves, their spouse, children, and parents. It also covers medical expenditure for uninsured senior citizen parents and preventive health checkup costs.
                  </p>
                </div>
                <p style={p}>
                  The deduction is only available under the old tax regime. It is separate from, and in addition to, the Section 80C limit of Rs 1.5 lakh. Maximizing your 80D benefit requires understanding which bracket your family falls into and whether your parents qualify for the higher senior citizen limit.
                </p>
                <p style={p}>
                  The provision is administered by the Central Board of Direct Taxes (CBDT) under the Ministry of Finance. For the exact statutory text, refer to the <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a> website.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="80d-limits">Section 80D Deduction Limits: How Much Can You Claim?</h2>
                <p style={p}>
                  The Section 80D limit depends on two factors: whether you or your spouse are 60 or above, and whether your parents are 60 or above. The limits are set per bracket, not per policy or per person.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}`, borderRadius: 8 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', padding: '8px 0 0' }}>Section 80D deduction limits by senior citizen status</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        {['Situation', 'Self + Family', 'Parents', 'Total Max Deduction'].map(h => (
                          <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: C.ink, border: `1px solid ${C.border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Self below 60, Parents below 60', 'Rs 25,000', 'Rs 25,000', 'Rs 50,000'],
                        ['Self below 60, Parents 60+', 'Rs 25,000', 'Rs 50,000', 'Rs 75,000'],
                        ['Self 60+, Parents 60+', 'Rs 50,000', 'Rs 50,000', 'Rs 1,00,000'],
                        ['No parents cover', 'Rs 25,000 or Rs 50,000', 'Rs 0', 'Rs 25,000 or Rs 50,000'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          {row.map((cell, j) => (
                            <td key={j} style={{ padding: '10px 14px', color: j === 0 ? C.ink2 : C.ink, fontWeight: j > 0 ? 600 : 400, borderBottom: `1px solid ${C.border}` }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The preventive health checkup amount (up to Rs 5,000) is included within these limits, not additional. If you pay Rs 20,000 in premiums and Rs 5,000 for a checkup, total deduction is Rs 25,000, not Rs 30,000.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="who-can-claim">Who Can Claim Deduction Under Section 80D?</h2>
                <p style={p}>
                  Any individual or Hindu Undivided Family (HUF) taxpayer can claim Section 80D deduction, provided they have paid health insurance premiums during the financial year and they file under the old tax regime.
                </p>
                <p style={p}>
                  The premium must be paid for self, spouse, dependent children, or parents. Parents need not be financially dependent on you. The deduction is available regardless of dependency.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Companies, partnership firms, and LLPs cannot claim 80D deduction as they are not individuals.
                </p>
                <p style={p}>
                  The premium must be paid via non-cash modes (cheque, card, net banking, UPI). Only preventive health checkup expenses up to Rs 5,000 can be paid in cash and still qualify. The policy must be from an insurer registered with the <a href="https://www.irdai.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Insurance Regulatory and Development Authority of India (IRDAI)</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-80d-calculated">How Section 80D is Calculated: A Worked Example</h2>
                <p style={p}>
                  Consider Ramesh, 35 years old with an annual income of Rs 12 lakh. His parents are both 65 years old and have a family floater policy. Here is the calculation:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', padding: '8px 0 0' }}>Section 80D worked example: Ramesh, 35 years old, parents 65+</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        {['Component', 'Amount Paid', 'Deductible Amount'].map(h => (
                          <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: C.ink, border: `1px solid ${C.border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Self + spouse premium', 'Rs 22,000', 'Rs 22,000'],
                        ['Preventive health checkup', 'Rs 5,000', 'Rs 3,000 (fills up to Rs 25,000 limit)'],
                        ['Parents premium (both 65+)', 'Rs 55,000', 'Rs 50,000 (capped at senior limit)'],
                        ['Total 80D deduction', 'Rs 82,000', 'Rs 75,000'],
                        ['Old regime tax saving (30% slab + 4% cess)', 'Rs 75,000 x 31.2%', 'Rs 23,400'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          {row.map((cell, j) => (
                            <td key={j} style={{ padding: '10px 14px', color: j === 0 ? C.ink2 : C.ink, fontWeight: j > 0 ? 600 : 400, borderBottom: `1px solid ${C.border}` }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Ramesh can use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> to verify whether claiming these deductions under the old regime still results in lower overall tax than the new regime flat rates.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="preventive-checkup">Preventive Health Checkup Deduction Under Section 80D</h2>
                <p style={p}>
                  Preventive health checkup refers to routine diagnostic tests to detect health conditions early: full body checkups, blood panels, cardiac stress tests, cancer screenings. Under Section 80D, up to Rs 5,000 per year is allowed for preventive health checkup costs.
                </p>
                <p style={p}>
                  Three critical points: First, the Rs 5,000 is part of the main 80D limit (Rs 25,000 or Rs 50,000), not in addition to it. Second, cash payment for preventive checkup is allowed, the only component of 80D where cash qualifies.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Third, the Rs 5,000 limit applies for the entire family (self + spouse + children) combined, not per individual.
                </p>
                <p style={p}>
                  If you have paid Rs 25,000 in insurance premiums, you cannot additionally claim Rs 5,000 for a checkup. You have already hit the limit. Preventive checkup only adds value when your premium is below the 80D cap.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="senior-citizen-80d">Section 80D for Senior Citizens: Rs 50,000 Benefit Explained</h2>
                <p style={p}>
                  Senior citizens (individuals aged 60 or above) face significantly higher health insurance premiums due to age-related risk. Parliament addressed this by providing a higher 80D limit of Rs 50,000 for senior citizens, up from Rs 25,000 for those below 60.
                </p>
                <p style={p}>
                  The Rs 50,000 limit applies to both brackets separately. If you are below 60 but your parents are both 65+, your self+family bracket has a Rs 25,000 cap while your parents' bracket has a Rs 50,000 cap. This gives a combined maximum of Rs 75,000.
                </p>
                <p style={p}>
                  If you yourself are 60 or above, both brackets qualify for the Rs 50,000 limit each, giving a theoretical maximum of Rs 1 lakh in 80D deduction. The Section 80C deduction is still separate and on top of this.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="uninsured-parents">Medical Expenditure for Uninsured Senior Citizen Parents</h2>
                <p style={p}>
                  Health insurance premiums become prohibitively expensive for very elderly parents, and many insurers refuse coverage beyond age 80 or 85. Parliament provided relief for this scenario: if your parents are senior citizens (60+) and have no health insurance policy, you can claim up to Rs 50,000 for actual medical expenses incurred for them.
                </p>
                <p style={p}>
                  This is not a bonus on top of insurance, it is an alternative. You can claim either the insurance premium OR the medical expenditure, not both. The Rs 50,000 cap is the same as the senior citizen insurance limit.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Cash payments do not qualify; all medical expenditure must be through non-cash modes.
                </p>
                <p style={p}>
                  Keep all original bills, prescriptions, and digital payment proofs. CBDT has clarified that hospital invoices paid by cheque, debit card, or UPI are the acceptable modes of documentation for this deduction. The employer will not deduct this from your salary or reflect it in Form 16, so you must claim it directly in your ITR.
                </p>
              </div>

              {/* In-Content Promo Bar */}
              <div style={{ marginBottom: 44, display: 'flex', background: '#f6f7f8', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, margin: '0 0 2px', fontFamily: INTER }}>
                      Old regime or new regime: which saves you more?
                    </p>
                    <p style={{ fontSize: 13, color: C.ink3, margin: 0, fontFamily: INTER }}>
                      Compare both regimes with your actual deductions, including 80D.
                    </p>
                  </div>
                  <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12.5, fontWeight: 700, color: C.dark, background: C.lime, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', fontFamily: INTER, whiteSpace: 'nowrap' }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="new-regime-80d">Section 80D in the New Tax Regime</h2>
                <p style={p}>
                  Section 80D deductions are not available under the new tax regime introduced in Budget 2020. If you opt for the new tax regime, you forgo all deductions under Chapter VI-A including 80C, 80D, 80G, and HRA exemption.
                </p>
                <p style={p}>
                  The trade-off is lower slab rates in the new regime. For FY 2025-26, the new regime has zero tax up to Rs 12 lakh under the enhanced 87A rebate, while the old regime's zero-tax threshold is Rs 5 lakh. This makes the new regime financially superior for many taxpayers who do not have significant deductions.
                </p>
                <p style={p}>
                  However, if your combined 80C + 80D + HRA + 80G deductions are large, particularly if you have senior citizen parents with high premiums, the old regime may still save you more money. Use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Regime Calculator</Link> to quantify the exact difference for your income level and deduction profile.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="claim-itr">How to Claim Section 80D When Filing Your ITR</h2>
                <p style={p}>
                  Section 80D deduction must be claimed in your income tax return. It is not automatic and will not appear in your Form 16 unless your employer has specifically collected and verified premium proofs for TDS purposes.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                  {[
                    { num: '1', title: 'Gather documents:', text: 'Collect premium receipts, policy documents, and payment proofs for all health insurance policies covering you, your family, and your parents.' },
                    { num: '2', title: 'Open ITR form:', text: 'Use ITR-1 (Sahaj) if you have only salary income, or ITR-2 for additional income sources. Both have a dedicated Section 80D field.' },
                    { num: '3', title: 'Navigate to deductions:', text: 'In the ITR form (online or offline), find "Deductions under Chapter VI-A." Locate the 80D section and enter self+family and parents amounts separately.' },
                    { num: '4', title: 'Enter amounts correctly:', text: 'Enter the actual amount you paid, not the limit. The system will cap it automatically. For senior citizen uninsured parents, use the medical expenditure field.' },
                    { num: '5', title: 'Verify your Form 26AS:', text: 'No TDS credit appears for 80D since it is a deduction, not a credit. But verify that your insurance policy is from an IRDAI-registered insurer, as only those policies qualify.' },
                  ].map(({ num, title, text }) => (
                    <div key={num} style={{ display: 'flex', gap: 12 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{num}</div>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        <strong style={{ color: C.ink }}>{title}</strong> {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Calculator</h2>
                <p style={p}>
                  Enter your annual gross income, then add your self+family health insurance premium. Select whether you or your spouse are a senior citizen, which changes the limit from Rs 25,000 to Rs 50,000. Next, add your premium for parents and select whether they are senior citizens.
                </p>
                <p style={p}>
                  If your parents are 60+ and uninsured, toggle to medical expenditure mode. Finally, add your preventive health checkup amount.
                </p>
                <p style={p}>
                  The result panel shows your total 80D deduction broken into two buckets, the tax saved under the old regime, and how much of your available 80D limit you have utilized. The donut chart shows your tax savings as a percentage of what you would have paid without any 80D deduction.
                </p>
              </div>

              

              <div style={sec}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations are indicative only and tax laws change with each Union Budget. Section 80D deductions apply only under the old tax regime. Consult a qualified Chartered Accountant for personalised advice.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .s80d-sidebar::-webkit-scrollbar { width: 5px; }
            .s80d-sidebar::-webkit-scrollbar-track { background: transparent; }
            .s80d-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .s80d-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside className="s80d-sidebar" aria-label="Related calculators and tools"
            style={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: mobile ? 'visible' : 'auto', position: mobile ? 'static' : 'sticky', top: 24, maxHeight: mobile ? 'none' : 'calc(100vh - 100px)', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ flexShrink: 0 }}><SidebarList title="Tax Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Tools" items={MORE} /></div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/section-80c-calculator|Section 80C', '/calculators/income-tax-calculator|Income Tax', '/calculators/nps-calculator|NPS', '/calculators/hra-calculator|HRA', '/calculators/epf-calculator|EPF', '/calculators/ppf-calculator|PPF'] },
        { hd: 'Topics', links: ['/calculators/old-tax-regime-calculator|Tax Planning', '/calculators/term-insurance-calculator|Insurance', '/calculators/nps-calculator|Retirement', '/calculators/sip-calculator|Mutual Funds'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

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

/* ── Palette ─────────────────────────────────────────────── */
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

/* ── Math ─────────────────────────────────────────────────── */
function calcEMI(p: number, annualRate: number, months: number): number {
  if (months <= 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function calcOutstanding(p: number, annualRate: number, monthsPaid: number, emi: number): number {
  if (monthsPaid <= 0) return p;
  if (annualRate === 0) return Math.max(0, p - emi * monthsPaid);
  const r = annualRate / 12 / 100;
  return Math.max(0, p * Math.pow(1 + r, monthsPaid) - emi * (Math.pow(1 + r, monthsPaid) - 1) / r);
}

function calcNewTenure(newPrincipal: number, annualRate: number, originalEmi: number): number {
  if (originalEmi <= 0 || newPrincipal <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r <= 0) return Math.ceil(newPrincipal / originalEmi);
  const term = 1 - (newPrincipal * r) / originalEmi;
  if (term <= 0) return 0;
  return Math.ceil(-Math.log(term) / Math.log(1 + r));
}

function fmtMonths(n: number): string {
  if (n <= 0) return '0 months';
  const yr = Math.floor(n / 12);
  const mo = n % 12;
  if (yr === 0) return `${mo} month${mo !== 1 ? 's' : ''}`;
  if (mo === 0) return `${yr} year${yr !== 1 ? 's' : ''}`;
  return `${yr} yr ${mo} mo`;
}

/* ── Donut Chart ─────────────────────────────────────────── */
function DonutChart({ originalInterest, interestSaved }: { originalInterest: number; interestSaved: number }) {
  if (originalInterest <= 0) return null;
  const savedClamped = Math.min(interestSaved, originalInterest);
  const savedPct = Math.round((savedClamped / originalInterest) * 100);
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const savedArc = (savedClamped / originalInterest) * circ;
  return (
    <svg role="img" aria-label={`Interest split: ${savedPct}% interest saved, ${100 - savedPct}% interest still owed`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      {/* Base ring: dark = original interest remaining */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw} />
      {/* Lime arc = interest saved */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.lime} strokeWidth={sw}
        strokeDasharray={`${savedArc} ${circ - savedArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>Interest</text>
      <text x={cx} y={cy + 4} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>Saved</text>
      <text x={cx} y={cy + 26} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savedPct}%</text>
    </svg>
  );
}

/* ── Slider ───────────────────────────────────────────────── */
function Slider({
  label, id: idProp, value, min, max, step, display, onChange, compact,
}: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div style={{ marginBottom: compact ? 20 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId}
            style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        ) : (
          <span />
        )}
        {editing ? (
          <input id={inputId} autoFocus value={raw}
            aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
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

/* ── FAQ Data ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is an EMI reduction calculator?',
    a: 'An EMI reduction calculator shows how a lump-sum prepayment on your home loan changes your monthly instalment or remaining tenure. Enter your original loan details, the number of months already paid, and the prepayment amount. The calculator computes your new lower EMI (same remaining tenure) or your new shorter tenure (same original EMI), along with total interest saved under each scenario.',
  },
  {
    q: 'How does a lump-sum prepayment reduce your home loan EMI?',
    a: 'When you make a lump-sum prepayment, it reduces the outstanding principal. Your bank then recalculates your EMI using the same reducing-balance formula but with the lower principal. Because interest is charged on the outstanding balance each month, a smaller balance means a smaller interest component in each instalment, resulting in a lower EMI for the same remaining tenure.',
  },
  {
    q: 'What is the formula to calculate the new EMI after prepayment?',
    a: 'New EMI = New Principal x r x (1+r)^n / ((1+r)^n minus 1), where r = annual rate divided by 12 divided by 100 and n = remaining months (total tenure minus months paid). New Principal = Outstanding balance minus prepayment. Outstanding after k months = P x (1+r)^k minus EMI x ((1+r)^k minus 1) / r.',
  },
  {
    q: 'Should I reduce EMI or reduce tenure after prepayment?',
    a: 'Reducing tenure saves significantly more total interest than reducing EMI, because you eliminate all future months of interest accrual. Reducing EMI is better if you need immediate cash flow relief. For a Rs 50 lakh loan at 8.5% with a Rs 5 lakh prepayment, reducing tenure saves about Rs 17.56 lakh in interest while reducing EMI saves only about Rs 5.41 lakh, since you still pay 240 instalments on the lower balance.',
  },
  {
    q: 'How much does EMI reduce after a Rs 5 lakh prepayment on a Rs 50 lakh home loan?',
    a: 'For a Rs 50 lakh home loan at 8.5% for 20 years, the original EMI is approximately Rs 43,392. A Rs 5 lakh prepayment at origination brings the principal to Rs 45 lakh. Reduce EMI option: new instalment falls to approximately Rs 39,053, a saving of Rs 4,339 per month. Reduce Tenure option: same EMI of Rs 43,392 is paid for only 188 months instead of 240, saving 52 months and approximately Rs 17.56 lakh in total interest.',
  },
  {
    q: 'Can I reduce my home loan EMI without making a prepayment?',
    a: 'Yes. A balance transfer to a lender offering a lower interest rate reduces the interest component of each instalment. You can also request a tenure extension from your current bank, which spreads the remaining principal over more months and lowers the monthly payment. A drop in the RBI repo rate also automatically reduces EMIs on floating-rate loans linked to the EBLR benchmark.',
  },
  {
    q: 'What is the RBI rule on prepayment charges for home loans?',
    a: 'Per RBI circular DBOD.No.Dir.BC.28/13.03.00/2012-13, banks and housing finance companies cannot levy prepayment or foreclosure charges on floating-rate home loans. Most home loan borrowers in India can prepay any amount, at any time, at zero cost. Fixed-rate home loans may carry prepayment charges of 2 to 4 percent of the outstanding amount.',
  },
  {
    q: 'How do I calculate the outstanding home loan principal after N months?',
    a: 'Outstanding after k months = P x (1+r)^k minus EMI x ((1+r)^k minus 1) / r, where P is the original principal, r is the monthly interest rate, EMI is the original instalment, and k is the months paid. At month zero the outstanding equals the full principal; it decreases slowly early and faster in later years as more of each EMI goes toward principal.',
  },
  {
    q: 'When is the best time to make a prepayment on a home loan?',
    a: 'The best time to prepay is in the early years of the loan, when the outstanding balance is highest and each rupee of prepayment reduces the most interest. In the first few years, around 70 to 80 percent of each EMI goes toward interest. A prepayment in year 1 saves more total interest than the same amount prepaid in year 10, because it eliminates interest charges over a longer remaining period.',
  },
  {
    q: 'Is there a prepayment penalty on home loans in India?',
    a: 'No prepayment penalty applies to floating-rate home loans in India. The Reserve Bank of India banned such charges on floating-rate retail loans in 2012. Fixed-rate home loans may have prepayment charges, typically 2 to 4 percent of the outstanding balance. Confirm with your lender whether your loan is floating or fixed before making a prepayment.',
  },
  {
    q: 'What is the minimum prepayment amount for a home loan?',
    a: 'Most Indian banks accept prepayments equivalent to at least one or two months of EMI. There is no regulatory minimum, but lenders set their own thresholds. SBI, HDFC Bank, and ICICI Bank generally accept any prepayment above the minimum stated in your loan agreement. Check your sanction letter for the exact figure.',
  },
  {
    q: 'What is the difference between part payment and foreclosure of a home loan?',
    a: 'A part payment is a lump-sum amount paid toward the outstanding principal in addition to your regular EMI; the loan continues with a reduced EMI or shorter tenure. Foreclosure means paying off the entire remaining outstanding principal to close the loan account. Both are free of charge on floating-rate home loans per RBI guidelines.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform providing 500 plus free financial calculators and a financial eligibility engine that matches users with loans and investment products they qualify for. Available free at fermor.in.',
  },
];

/* ── FAQ Accordion ─────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Sidebar Calculator List ──────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
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

/* ── EMI Snapshot (sidebar facts box) ─────────────────────── */
function EMISnapshot() {
  const rows = [
    { label: 'Max home loan tenure (India)', value: '30 years' },
    { label: 'RBI prepayment charge (floating)', value: 'Nil' },
    { label: 'Standard FOIR for home loans', value: '40-50%' },
    { label: 'Repo rate (Jun 2026 MPC)', value: '5.25%' },
    { label: 'Benchmark for floating loans', value: 'EBLR / RLLR' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Home Loan Facts</span>
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

/* ── Article Table Styles ─────────────────────────────────── */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: '#16140F',
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: '1px solid #e3e6e8', whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#50565c', border: '1px solid #e3e6e8', verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#16140F', fontWeight: 500, border: '1px solid #e3e6e8', verticalAlign: 'middle', textAlign: 'right' };

/* ── Sidebar Links ────────────────────────────────────────── */
const POPULAR = [
  { href: '/calculators/mortgage-calculator',              label: 'Home Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/home-loan-prepayment-calculator',  label: 'Home Loan Prepayment Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
  { href: '/calculators/emi-calculator',                   label: 'EMI Calculator' },
];
const MORE = [
  { href: '/calculators/sbi-home-loan-calculator',         label: 'SBI Home Loan Calculator' },
  { href: '/calculators/loan-prepayment-calculator',       label: 'Loan Prepayment Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',  label: 'Debt-to-Income Ratio' },
  { href: '/calculators/personal-loan-calculator',         label: 'Personal Loan EMI Calculator' },
];

/* ── Year Presets ─────────────────────────────────────────── */
const YR_PRESETS = [5, 10, 15, 20, 25, 30];

/* ── CA CTA Component ─────────────────────────────────────── */

/* ── Main Component ───────────────────────────────────────── */
export default function EMIReductionClient() {
  const defaultSettings = {
    loanAmount: 5000000,
    rate: 8.5,
    tenureYr: 20,
    monthsPaid: 0,
    prepayment: 500000,
  };

  const { settings, updateSettings } = useCalculatorSettings('emi-reduction', defaultSettings);
  const { loanAmount, rate, tenureYr, monthsPaid, prepayment } = settings;

  const setLoanAmount  = (v: number) => updateSettings({ loanAmount: v });
  const setRate        = (v: number) => updateSettings({ rate: v });
  const setTenureYr    = (v: number) => updateSettings({ tenureYr: v });
  const setMonthsPaid  = (v: number) => updateSettings({ monthsPaid: v });
  const setPrepayment  = (v: number) => updateSettings({ prepayment: v });

  const [mobile, setMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'reduce-emi' | 'reduce-tenure'>('reduce-emi');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  /* ── Core Math ── */
  const totalMonths = tenureYr * 12;
  const r = rate / 12 / 100;

  const emi = useMemo(() => calcEMI(loanAmount, rate, totalMonths), [loanAmount, rate, totalMonths]);
  const outstanding = useMemo(() => calcOutstanding(loanAmount, rate, monthsPaid, emi), [loanAmount, rate, monthsPaid, emi]);

  const remainingMonths = Math.max(0, totalMonths - monthsPaid);
  const isPrepayTooLarge = prepayment >= outstanding;
  const newPrincipal = Math.max(0, outstanding - prepayment);

  /* Original remaining interest (without prepayment) */
  const originalRemainingInterest = useMemo(() => {
    if (remainingMonths <= 0 || emi <= 0) return 0;
    return Math.max(0, emi * remainingMonths - outstanding);
  }, [emi, remainingMonths, outstanding]);

  /* Option A: Reduce EMI, same remaining tenure */
  const newEmi = useMemo(() => {
    if (remainingMonths <= 0 || newPrincipal <= 0) return 0;
    return calcEMI(newPrincipal, rate, remainingMonths);
  }, [newPrincipal, rate, remainingMonths]);

  const optionAInterest = useMemo(() => {
    if (newEmi <= 0 || remainingMonths <= 0) return 0;
    return Math.max(0, newEmi * remainingMonths - newPrincipal);
  }, [newEmi, remainingMonths, newPrincipal]);

  const interestSavedA = Math.max(0, originalRemainingInterest - optionAInterest);
  const emiReduction = Math.max(0, emi - newEmi);

  /* Option B: Reduce Tenure, same original EMI */
  const newTenure = useMemo(() => {
    if (newPrincipal <= 0 || emi <= 0) return 0;
    return calcNewTenure(newPrincipal, rate, emi);
  }, [newPrincipal, rate, emi]);

  const optionBInterest = useMemo(() => {
    if (emi <= 0 || newTenure <= 0) return 0;
    return Math.max(0, emi * newTenure - newPrincipal);
  }, [emi, newTenure, newPrincipal]);

  const interestSavedB = Math.max(0, originalRemainingInterest - optionBInterest);
  const monthsSaved = Math.max(0, remainingMonths - newTenure);

  /* Active tab stats for donut */
  const activeInterestSaved = activeTab === 'reduce-emi' ? interestSavedA : interestSavedB;

  /* ── JSX ── */
  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      {/* Sidebar scrollbar styles */}
      <style>{`
        .emi-reduction-sidebar::-webkit-scrollbar { width: 5px; }
        .emi-reduction-sidebar::-webkit-scrollbar-track { background: transparent; }
        .emi-reduction-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .emi-reduction-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Page header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            EMI Reduction Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Enter your home loan details and a prepayment amount. See your new lower EMI or the number of months you cut off your tenure, plus total interest saved under each option.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT: Calculator + Article */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tab strip */}
              <div role="tablist" aria-label="Prepayment option"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'reduce-emi',    label: 'Reduce EMI' },
                  { id: 'reduce-tenure', label: 'Reduce Tenure' },
                ] as const).map(t => (
                  <button key={t.id} id={`tab-${t.id}`} role="tab"
                    aria-selected={activeTab === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 13 : 14, fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Panel content */}
              <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                  {/* ── INPUT PANEL ── */}
                  <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Loan Details</p>
                      <CurrencySelector theme="light" />
                    </div>

                    {!showAdvanced ? (
                      <>
                        <Slider id="loan-amount" label="Loan Amount" value={loanAmount} min={100000} max={20000000} step={100000}
                          display={fmtC(loanAmount)} onChange={setLoanAmount} compact={mobile} />
                        <Slider id="interest-rate" label="Interest Rate (% p.a.)" value={rate} min={6} max={18} step={0.05}
                          display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                        {/* Tenure with presets */}
                        <div style={{ marginBottom: mobile ? 20 : 36 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 8 : 14 }}>
                            <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Loan Tenure</label>
                          </div>
                          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                            {YR_PRESETS.map(y => (
                              <button key={y} onClick={() => setTenureYr(y)}
                                style={{ padding: '4px 10px', fontSize: 12, fontWeight: tenureYr === y ? 700 : 500, background: C.white, color: tenureYr === y ? C.ink : C.ink3, border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`, borderRadius: 6, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                                {y}Y
                              </button>
                            ))}
                          </div>
                          <Slider id="tenure-yr" label="" value={tenureYr} min={1} max={30} step={1}
                            display={`${tenureYr} yr`} onChange={setTenureYr} compact={mobile} />
                        </div>

                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          Prepayment details
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <Slider id="months-paid" label="Months Already Paid" value={monthsPaid} min={0} max={120} step={1}
                          display={`${monthsPaid} mo`} onChange={setMonthsPaid} compact={mobile} />
                        <Slider id="prepayment" label="Prepayment Amount" value={prepayment} min={100000} max={5000000} step={100000}
                          display={fmtC(prepayment)} onChange={setPrepayment} compact={mobile} />

                        {/* Derived: Outstanding */}
                        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: mobile ? 20 : 32 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 13, color: C.ink2 }}>Outstanding principal</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{fmtC(outstanding)}</span>
                          </div>
                          {isPrepayTooLarge && (
                            <p style={{ fontSize: 12, color: C.ink3, margin: '6px 0 0' }}>
                              Prepayment exceeds outstanding balance. Reduce prepayment amount.
                            </p>
                          )}
                        </div>

                        <button onClick={() => setShowAdvanced(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                          Back
                        </button>
                      </>
                    )}
                  </div>

                  {/* ── RESULT PANEL ── */}
                  <div style={{ padding: mobile ? '20px 18px' : '36px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Donut (order -1 on desktop = renders at top) */}
                    <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                      <DonutChart
                        originalInterest={originalRemainingInterest}
                        interestSaved={activeInterestSaved}
                      />
                    </div>

                    {/* Legend */}
                    <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: C.lime }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Interest Saved</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 13, color: C.ink2 }}>Original Interest</span>
                      </div>
                    </div>

                    {isPrepayTooLarge ? (
                      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>Prepayment too large</div>
                        <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
                          The prepayment amount exceeds the outstanding principal of {fmtC(outstanding)}. Reduce the prepayment slider to a value below the outstanding balance.
                        </div>
                      </div>
                    ) : activeTab === 'reduce-emi' ? (
                      <>
                        {/* Dark box: new EMI */}
                        <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: mobile ? '16px 20px' : '20px 28px', marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>New Monthly EMI</div>
                            <div style={{ fontSize: 12, color: '#7A8087' }}>Original EMI: {fmtIN(emi)}</div>
                          </div>
                          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                            <span
                              aria-live="polite"
                              aria-label={`New Monthly EMI: ${fmtIN(newEmi)}`}
                              style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                              {fmtIN(newEmi)}
                            </span>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#101214', lineHeight: 1 }}>
                              -{fmtIN(emiReduction)}/mo
                            </div>
                          </div>
                        </div>

                        {/* Stat rows */}
                        {[
                          { label: 'Outstanding balance',   value: fmtC(outstanding) },
                          { label: 'New principal',         value: fmtC(newPrincipal) },
                          { label: 'Remaining tenure',      value: fmtMonths(remainingMonths) },
                          { label: 'EMI reduction',         value: fmtIN(emiReduction) + '/mo' },
                          { label: 'Original interest',     value: fmtC(originalRemainingInterest) },
                          { label: 'New total interest',    value: fmtC(optionAInterest) },
                          { label: 'Interest saved',        value: fmtC(interestSavedA) },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                            <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                            <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Dark box: new tenure */}
                        <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: mobile ? '16px 20px' : '20px 28px', marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>New Tenure</div>
                            <div style={{ fontSize: 12, color: '#7A8087' }}>Original: {fmtMonths(remainingMonths)}</div>
                          </div>
                          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                            <span
                              aria-live="polite"
                              aria-label={`New Tenure: ${fmtMonths(newTenure)}`}
                              style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>
                              {fmtMonths(newTenure)}
                            </span>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#101214', lineHeight: 1 }}>
                              -{fmtMonths(monthsSaved)} saved
                            </div>
                          </div>
                        </div>

                        {/* Stat rows */}
                        {[
                          { label: 'Outstanding balance',   value: fmtC(outstanding) },
                          { label: 'New principal',         value: fmtC(newPrincipal) },
                          { label: 'Original EMI (unchanged)', value: fmtIN(emi) },
                          { label: 'Months saved',          value: fmtMonths(monthsSaved) },
                          { label: 'Original interest',     value: fmtC(originalRemainingInterest) },
                          { label: 'New total interest',    value: fmtC(optionBInterest) },
                          { label: 'Interest saved',        value: fmtC(interestSavedB) },
                        ].map(({ label, value }) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                            <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                            <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* END CALCULATOR CARD */}

            {/* Save Results */}
            <div style={{ marginBottom: 0 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2s: React.CSSProperties = { fontSize: mobile ? 19 : 22, fontWeight: 700, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.015em' };
                const h3s: React.CSSProperties = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 8px' };
                const ps:  React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
                const sec: React.CSSProperties = { margin: '0 0 48px' };
                return (
                  <>
                    {/* 1 */}
                    <section style={sec}>
                      <h2 id="what-is-emi-reduction" style={h2s}>What is an EMI reduction after prepayment?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          An EMI reduction after prepayment is the drop in your monthly home loan instalment that results from paying a lump sum directly toward your outstanding principal, allowing your bank to recompute the EMI on the lower balance for the same remaining tenure.
                        </p>
                      </div>
                      <p style={ps}>
                        Indian banks offer two standard options when you make a prepayment on a home loan. Option A keeps the remaining tenure fixed and lowers the monthly instalment. Option B keeps the original EMI fixed and shortens the number of months you must pay it.
                      </p>
                      <p style={ps}>
                        Both options reduce the total interest you pay over the life of the loan, but by very different amounts. The calculator above lets you model each scenario instantly with your actual loan figures.
                      </p>
                    </section>

                    {/* 2 */}
                    <section style={sec}>
                      <h2 id="how-prepayment-reduces-emi" style={h2s}>How prepayment reduces your home loan EMI</h2>
                      <p style={ps}>
                        Prepayment reduces your home loan EMI by lowering the outstanding principal that the bank uses to recompute your instalment under the same reducing-balance formula. Every rupee you pay toward principal is a rupee the bank can no longer charge interest on for the rest of the loan tenure.
                      </p>
                      <p style={ps}>
                        The bank applies your prepayment entirely to the outstanding principal, not to interest. After applying the payment, it recalculates the EMI as if you had taken a fresh loan for the new (lower) outstanding amount, at the same interest rate, for the remaining number of months.
                      </p>
                      <p style={ps}>
                        This is why a prepayment in the early years of a loan saves far more interest than the same amount paid in later years. When the outstanding balance is high, reducing it by Rs 5 lakh eliminates interest charges on that Rs 5 lakh for the full remaining tenure. When only Rs 8 lakh remains, the same Rs 5 lakh prepayment eliminates interest on less than two-thirds of a year.
                      </p>

                      {/* In-content promo bar 1 */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan Prepayment Calculator</p>
                          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Model extra monthly payments alongside lump-sum prepayments and see the combined interest saving.</p>
                        </div>
                        <Link className="fx-btn" href="/calculators/home-loan-prepayment-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                      </div>
                    </section>

                    {/* 3 */}
                    <section style={sec}>
                      <h2 id="reduce-emi-vs-tenure" style={h2s}>Reduce EMI vs reduce tenure: which is better?</h2>
                      <p style={ps}>
                        Reducing tenure rather than EMI saves significantly more total interest in the long run, because a shorter tenure means fewer months of interest accrual on the outstanding balance.
                      </p>
                      <p style={ps}>
                        When you reduce EMI, you pay a lower amount each month but for exactly the same number of remaining months. The bank keeps collecting interest on the principal for the full original remaining period, just at a lower rate per month because the balance is lower. When you reduce tenure, you pay the same EMI but stop paying it sooner. Every month you eliminate from the schedule eliminates the interest that would have accumulated that month.
                      </p>
                      <p style={ps}>
                        The right choice depends on your cash flow. If your budget is stretched and you need more breathing room every month, reducing EMI is the practical choice. If you can comfortably afford the current EMI, reducing tenure is the financially superior option in almost every scenario.
                      </p>

                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 500 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                            Comparison: Rs 50 lakh at 8.5% for 20 years, Rs 5 lakh prepayment at origination
                          </caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Factor</th>
                              <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Reduce EMI</th>
                              <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Reduce Tenure</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Original EMI', 'Rs 43,392', 'Rs 43,392'],
                              ['New EMI', 'Rs 39,053', 'Rs 43,392 (unchanged)'],
                              ['Remaining tenure', '240 months (unchanged)', '188 months'],
                              ['Months saved', 'Nil', '52 months (4 yr 4 mo)'],
                              ['New total interest', 'Rs 48.73 lakh', 'Rs 36.58 lakh'],
                              ['Interest saved', 'Rs 5.41 lakh', 'Rs 17.56 lakh'],
                              ['Best for', 'Cash flow relief', 'Maximum savings'],
                            ].map(([f, a, b]) => (
                              <tr key={f}>
                                <td style={tdL}>{f}</td>
                                <td style={tdR}>{a}</td>
                                <td style={tdR}>{b}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* In-content promo bar 2 */}
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginTop: 16, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 200 }}>
                          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan EMI Calculator</p>
                          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Calculate your base EMI, amortization schedule, and check home loan eligibility from one place.</p>
                        </div>
                        <Link className="fx-btn" href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                      </div>
                    </section>

                    {/* 4 */}
                    <section style={sec}>
                      <h2 id="emi-reduction-formula" style={h2s}>EMI reduction formula</h2>
                      <p style={ps}>
                        The new EMI after prepayment is calculated using the same reducing-balance formula applied to the lower outstanding principal and the same remaining tenure.
                      </p>

                      <h3 style={h3s}>Step 1: Calculate the original EMI</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 20, fontFamily: 'monospace', fontSize: 14, color: C.ink, lineHeight: 1.8 }}>
                        EMI = P x r x (1+r)^n / ((1+r)^n - 1)
                        <br />where r = annual_rate / 12 / 100, n = tenure in months
                      </div>

                      <h3 style={h3s}>Step 2: Calculate outstanding principal after k months</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 20, fontFamily: 'monospace', fontSize: 14, color: C.ink, lineHeight: 1.8 }}>
                        Outstanding = P x (1+r)^k - EMI x ((1+r)^k - 1) / r
                      </div>

                      <h3 style={h3s}>Step 3: Calculate new EMI after prepayment (Option A: reduce EMI)</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 20, fontFamily: 'monospace', fontSize: 14, color: C.ink, lineHeight: 1.8 }}>
                        New Principal = Outstanding - Prepayment
                        <br />Remaining months = Total months - Months paid
                        <br />New EMI = New Principal x r x (1+r)^remaining / ((1+r)^remaining - 1)
                      </div>

                      <h3 style={h3s}>Step 4: Calculate new tenure (Option B: reduce tenure)</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 20, fontFamily: 'monospace', fontSize: 14, color: C.ink, lineHeight: 1.8 }}>
                        New Tenure (months) = ceiling of -log(1 - New Principal x r / Original EMI) / log(1+r)
                      </div>

                      <p style={ps}>
                        All four steps are handled automatically by the calculator above. You do not need to run these formulas manually: enter your loan details and the calculator applies them in real time.
                      </p>
                    </section>

                    {/* 5 */}
                    <section style={sec}>
                      <h2 id="reduce-without-prepayment" style={h2s}>How to reduce your home loan EMI without prepayment</h2>
                      <p style={ps}>
                        You can reduce your home loan EMI without a prepayment through three main routes: a balance transfer to a lower-rate lender, a tenure extension from your existing lender, or a drop in the RBI repo rate on a floating-rate loan.
                      </p>

                      <h3 style={h3s}>Balance transfer</h3>
                      <p style={ps}>
                        A home loan balance transfer moves your outstanding loan to a new lender offering a lower interest rate. The new lender pays off your existing loan and opens a fresh loan at the reduced rate. This is worth considering when the rate difference is at least 0.5 percentage points and you have more than 5 years of tenure remaining. The{' '}
                        <Link href="/calculators/balance-transfer-savings-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ color: C.dark, fontWeight: 600 }}>Balance Transfer Savings Calculator</Link>{' '}
                        shows the net saving after accounting for processing fees and legal charges.
                      </p>

                      <h3 style={h3s}>Tenure extension</h3>
                      <p style={ps}>
                        You can request your existing bank to extend the remaining tenure of your loan. A longer tenure reduces the monthly instalment because the same principal is spread over more months. Most banks allow this if you are below the maximum tenure limit (usually 30 years or until age 70, whichever comes first). The downside is more total interest paid.
                      </p>

                      <h3 style={h3s}>Repo rate cuts</h3>
                      <p style={ps}>
                        For floating-rate loans linked to the external benchmark (EBLR or RLLR), an RBI repo rate cut automatically passes through to your home loan rate within the quarter. Following the 125-basis-point repo rate reduction through 2025 that brought the rate to 5.25%, most floating-rate borrowers saw their effective home loan rates fall by a similar magnitude, reducing their EMI without any action on their part.
                      </p>
                    </section>

                    {/* 6 */}
                    <section style={sec}>
                      <h2 id="prepayment-charges-rbi" style={h2s}>Prepayment charges and RBI rules</h2>
                      <p style={ps}>
                        Per RBI circular DBOD.No.Dir.BC.28/13.03.00/2012-13, banks and housing finance companies regulated by the National Housing Bank cannot charge prepayment or foreclosure fees on floating-rate home loans, making lump-sum prepayment cost-free for most home loan borrowers in India.
                      </p>
                      <p style={ps}>
                        The prohibition applies specifically to floating-rate loans. Fixed-rate home loans may still carry prepayment charges, typically 2 to 4 percent of the outstanding principal on the date of prepayment. If your loan is on a fixed rate, calculate whether the interest saving from the prepayment exceeds the prepayment charge before proceeding.
                      </p>
                      <p style={ps}>
                        HFCs (Housing Finance Companies) regulated by the Reserve Bank of India since 2019 are also bound by the same prepayment prohibition on floating-rate loans. Verify with your lender before making a large prepayment that your specific loan type is covered.
                      </p>
                    </section>

                    {/* 7 */}
                    <section style={sec}>
                      <h2 id="interest-saved" style={h2s}>How much interest does prepayment save?</h2>
                      <p style={ps}>
                        A prepayment saves interest equal to the difference between the total interest you would have paid over the remaining tenure without the prepayment and the total interest you pay after it. The exact saving depends on which option you choose: reducing EMI or reducing tenure.
                      </p>

                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ fontSize: 13, borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
                          <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, paddingTop: 8, textAlign: 'left' }}>
                            Interest saved at various prepayment amounts: Rs 50 lakh loan at 8.5% for 20 years (at origination)
                          </caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Prepayment</th>
                              <th style={{ ...thS, textAlign: 'right' as const }} scope="col">New EMI (Option A)</th>
                              <th style={{ ...thS, textAlign: 'right' as const }} scope="col">EMI saved/mo</th>
                              <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Months saved (Option B)</th>
                              <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Interest saved (Option B)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Rs 2 lakh',  'Rs 42,518', 'Rs 874', '21 mo', 'Rs 7.21 lakh'],
                              ['Rs 5 lakh',  'Rs 39,053', 'Rs 4,339', '52 mo', 'Rs 17.56 lakh'],
                              ['Rs 10 lakh', 'Rs 34,714', 'Rs 8,678', '104 mo', 'Rs 33.96 lakh'],
                              ['Rs 15 lakh', 'Rs 30,374', 'Rs 13,018', '155 mo', 'Rs 48.81 lakh'],
                              ['Rs 20 lakh', 'Rs 26,035', 'Rs 17,357', '203 mo', 'Rs 61.95 lakh'],
                            ].map(([pp, emi2, save, mo, int]) => (
                              <tr key={pp}>
                                <td style={tdL}>{pp}</td>
                                <td style={tdR}>{emi2}</td>
                                <td style={tdR}>{save}</td>
                                <td style={tdR}>{mo}</td>
                                <td style={tdR}>{int}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <p style={{ ...ps, marginTop: 12 }}>
                        The interest saved figures in the Option B column are substantially larger because reducing tenure eliminates months of future interest entirely, whereas reducing EMI merely charges less interest on the same number of remaining months. Use the{' '}
                        <Link href="/calculators/emi-reduction-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ color: C.dark, fontWeight: 600 }}>EMI reduction calculator</Link>{' '}
                        above to check the exact figures for your loan amount and rate.
                      </p>
                    </section>

                    {/* 8 */}
                    <section style={sec}>
                      <h2 id="worked-example" style={h2s}>Worked example: Rs 50 lakh loan prepayment</h2>
                      <p style={ps}>
                        For a Rs 50 lakh home loan at 8.5% per annum for 20 years with a Rs 5 lakh prepayment at origination, the original EMI is approximately Rs 43,392 per month, and the total interest without prepayment is approximately Rs 54.14 lakh.
                      </p>

                      <h3 style={h3s}>Step 1: Original loan parameters</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13, color: C.ink2, lineHeight: 2 }}>
                        P = Rs 50,00,000 | r = 8.5/12/100 = 0.007083 | n = 240 months
                        <br />EMI = Rs 43,392/month
                        <br />Total interest (no prepayment) = Rs 54.14 lakh
                      </div>

                      <h3 style={h3s}>Step 2: Outstanding balance after 0 months</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13, color: C.ink2, lineHeight: 2 }}>
                        Months paid = 0 | Outstanding = Rs 50,00,000 (full principal)
                        <br />Prepayment = Rs 5,00,000
                        <br />New principal = Rs 45,00,000
                      </div>

                      <h3 style={h3s}>Option A: Reduce EMI (same 240-month tenure)</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13, color: C.ink2, lineHeight: 2 }}>
                        New EMI = Rs 45L x 0.007083 x (1.007083)^240 / ((1.007083)^240 - 1)
                        <br /><strong style={{ color: C.dark }}>New EMI = Rs 39,053 per month</strong>
                        <br />EMI reduction = Rs 43,392 - Rs 39,053 = Rs 4,339/month
                        <br />Total interest (Option A) = Rs 48.73 lakh
                        <br /><strong style={{ color: C.dark }}>Interest saved (Option A) = Rs 5.41 lakh</strong>
                      </div>

                      <h3 style={h3s}>Option B: Reduce Tenure (same EMI Rs 43,392)</h3>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 20px', marginBottom: 16, fontFamily: 'monospace', fontSize: 13, color: C.ink2, lineHeight: 2 }}>
                        New tenure = -log(1 - 45L x 0.007083 / 43392) / log(1.007083)
                        <br /><strong style={{ color: C.dark }}>New tenure = 188 months (15 years 8 months)</strong>
                        <br />Months saved = 240 - 188 = 52 months (4 years 4 months)
                        <br />Total interest (Option B) = Rs 36.58 lakh
                        <br /><strong style={{ color: C.dark }}>Interest saved (Option B) = Rs 17.56 lakh</strong>
                      </div>

                      <p style={ps}>
                        Option B saves Rs 12.15 lakh more than Option A in this scenario. The right choice depends on your monthly cash flow: if you need the Rs 4,339 monthly saving, choose Option A. If you can maintain the current EMI, Option B is the mathematically superior choice.
                      </p>
                    </section>

                    {/* 9 */}
                    <section style={sec}>
                      <h2 id="how-to-use" style={h2s}>How to use this EMI reduction calculator</h2>
                      <p style={ps}>
                        Enter your loan amount, annual interest rate, tenure, months already paid, and prepayment amount, then switch between the Reduce EMI and Reduce Tenure tabs to compare both options side by side.
                      </p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Loan Amount:</strong> Set the original principal you borrowed (not the home price) using the slider or by clicking the displayed value to enter a precise figure.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Interest Rate:</strong> Enter the annual interest rate from your loan agreement. For floating-rate loans, use the current effective rate from your latest bank statement.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Tenure:</strong> Select the original loan tenure in years using the preset buttons (5Y to 30Y) or the slider. Use the tenure stated in your sanction letter.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Months Paid:</strong> Click "Prepayment details" and enter how many EMIs you have already paid. The calculator computes your current outstanding principal automatically.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                          <strong style={{ color: C.ink }}>Prepayment Amount:</strong> Enter the lump sum you plan to prepay. Switch between "Reduce EMI" and "Reduce Tenure" tabs to see both options and the corresponding interest saved.
                        </li>
                      </ol>
                      <p style={ps}>
                        Your inputs are saved automatically in your browser. The next time you open the calculator, it restores your last session. To check the{' '}
                        <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer"
                          style={{ color: C.dark, fontWeight: 600 }}>home loan you qualify for</Link>{' '}
                        before planning a prepayment, use the Home Loan Eligibility Calculator.
                      </p>
                    </section>

                    

                    {/* 10 */}
                    <section style={sec}>
                      <h2 id="faqs" style={h2s}>Frequently asked questions</h2>
                      <FAQ />
                    </section>

                    {/* Disclaimer */}
                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only and assume a standard reducing-balance loan structure. Actual EMIs, outstanding balances, and interest savings may differ based on your lender's specific policies, rounding conventions, and any fees or charges. Prepayment charges may apply on fixed-rate loans. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult your lender or a SEBI-registered investment adviser before making prepayment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>
          {/* END LEFT */}

          {/* RIGHT: Sidebar */}
          <aside
            className="emi-reduction-sidebar"
            style={{
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            } as React.CSSProperties}
          >
            <nav aria-label="Related Calculators">
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </nav>
            <SidebarList title="More Calculators" items={MORE} />
            <EMISnapshot />
          </aside>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/emi-calculator|EMI', '/calculators/mortgage-calculator|Home Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/fd-calculator|FD', '/calculators/income-tax-calculator|Income Tax', '/calculators/cagr-calculator|CAGR', '/calculators/gst-calculator|GST', '/calculators/car-loan-calculator|Car Loan', '/calculators/ppf-calculator|PPF', ]},
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

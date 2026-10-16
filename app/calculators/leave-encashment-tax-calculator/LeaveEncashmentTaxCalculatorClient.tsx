'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
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

/* ─── Helper: Marginal Tax Rate ─────────────────────────────── */
function getMarginalRate(annualIncome: number): number {
  if (annualIncome <= 250000) return 0;
  if (annualIncome <= 500000) return 5;
  if (annualIncome <= 1000000) return 20;
  return 30;
}

/* ─── Slider ─────────────────────────────────────────────────── */
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

/* ─── ToggleGroup Component ─────────────────────────────────── */
function ToggleGroup({ label, options, value, onChange }: {
  label: string; options: { value: string; label: string }[]; value: string; onChange: (v: any) => void;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 12px' }}>{label}</p>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {options.map(opt => (
          <button key={opt.value}
            role="radio" aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1, padding: '10px 6px', fontFamily: INTER, fontSize: 13, cursor: 'pointer',
              border: 'none', background: value === opt.value ? C.white : 'transparent',
              color: value === opt.value ? C.ink : C.ink3,
              fontWeight: value === opt.value ? 600 : 400,
              transition: 'all 0.12s',
            }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({ exemptPct }: { exemptPct: number }) {
  const taxablePct = 100 - exemptPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const eArc = (exemptPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Exempt Leave Encashment ${exemptPct.toFixed(0)}%, taxable Leave Encashment ${taxablePct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${eArc} ${circ - eArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Exempt</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{exemptPct.toFixed(0)}%</text>
    </svg>
  );
}

/* ─── Sidebar list ────────────────────────────────────────────── */
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
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/old-tax-regime-calculator',       label: 'Old Tax Regime Calculator' },
  { href: '/calculators/new-tax-regime-calculator',       label: 'New Tax Regime Calculator' },
  { href: '/calculators/gratuity-calculator',              label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/lta-calculator',                   label: 'LTA Calculator' },
  { href: '/calculators/salary-breakdown-calculator',      label: 'Salary Breakdown Calculator' },
  { href: '/calculators/ctc-calculator',                   label: 'CTC Calculator' },
  { href: '/calculators/nps-calculator',                   label: 'NPS Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is leave encashment?', a: 'Leave encashment is a lump-sum amount paid by employers to employees in exchange for their unused accumulated leaves, paid either during service, at retirement, or upon resignation. Tax treatment depends on when it is received and the sector of the employee.' },
  { q: 'What is the tax exemption limit for leave encashment at retirement?', a: 'For private sector employees, the maximum tax-free limit under Section 10(10AA) is Rs 25 lakh (increased from Rs 3 lakh in Budget 2023). For government employees, leave encashment received at retirement is 100% tax-free.' },
  { q: 'Is leave encashment received during service tax-exempt?', a: 'No. Any leave encashment received while you are still actively employed with the company is fully taxable under your regular income tax slabs for both private and government employees. Exemption applies only at retirement or resignation.' },
  { q: 'What is the leave cap limit per year under Section 10(10AA)?', a: 'Under the income tax rules, leave entitlement is capped at 30 days per completed year of service. If your employer provides 40 days of leave per year, the exemption calculation must still cap your total earned leaves at 30 days per year of service.' },
  { q: 'How is the cash equivalent of leave balance calculated?', a: 'Cash equivalent equals the capped leave balance (in days) divided by 30, multiplied by the average monthly salary of the last 10 months. For tax exemption purposes, the leave balance must be computed using the 30-day annual cap limit.' },
  { q: 'What elements are included in the average monthly salary for leave encashment?', a: 'Salary for Section 10(10AA) includes basic salary, dearness allowance (DA) if it forms part of retirement benefits, and commission based on a fixed percentage of turnover. Other allowances are excluded.' },
  { q: 'Can I claim leave encashment exemption under the new tax regime?', a: 'Yes. The leave encashment tax exemption under Section 10(10AA) is one of the few deductions retained under the new tax regime. Both regimes provide this exemption for private and government employees.' },
  { q: 'What is the maximum statutory limit for private employees in FY 2026-27?', a: 'The statutory limit is Rs 25,00,000. This limit applies to the lifetime total leave encashment exemptions claimed by a private sector employee across all employers.' },
  { q: 'Is leave encashment taxable on resignation?', a: 'Leave encashment received upon resignation is treated the same as retirement under Section 10(10AA). Private employees can claim exemption up to the least of the four limits, capped at Rs 25 lakh.' },
  { q: 'How does the calculator compute the capped leave balance?', a: 'The calculator computes total leaves earned based on the completed years of service capped at 30 days per year. It then subtracts leaves taken (deduced from your actual leave balance vs leaves allowed) to find the capped leave balance.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. The calculators are free tools that give real answers to real financial questions. A free account is available to save results and access them any time. The product is an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client Component ───────────────────────────────────── */

export default function LeaveEncashmentTaxCalculatorClient() {
  const defaultSettings = {
    receivedAmount: 500000,
    averageSalary: 75000,
    completedYears: 15,
    leaveBalance: 120,
    leavesAllowed: 30,
    employeeType: 'private' as 'private' | 'govt',
  };
  const { settings, updateSettings } = useCalculatorSettings('leave-encashment-tax', defaultSettings);
  const { receivedAmount, averageSalary, completedYears, leaveBalance, leavesAllowed, employeeType } = settings;

  const setReceivedAmount = (v: any) => updateSettings({ receivedAmount: typeof v === 'function' ? v(settings.receivedAmount) : v });
  const setAverageSalary = (v: any) => updateSettings({ averageSalary: typeof v === 'function' ? v(settings.averageSalary) : v });
  const setCompletedYears = (v: any) => updateSettings({ completedYears: typeof v === 'function' ? v(settings.completedYears) : v });
  const setLeaveBalance = (v: any) => updateSettings({ leaveBalance: typeof v === 'function' ? v(settings.leaveBalance) : v });
  const setLeavesAllowed = (v: any) => updateSettings({ leavesAllowed: typeof v === 'function' ? v(settings.leavesAllowed) : v });
  const setEmployeeType = (v: any) => updateSettings({ employeeType: typeof v === 'function' ? v(settings.employeeType) : v });

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-leave-encashment-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.receivedAmount === 'number') setReceivedAmount(d.receivedAmount);
      if (typeof d.averageSalary === 'number') setAverageSalary(d.averageSalary);
      if (typeof d.completedYears === 'number') setCompletedYears(d.completedYears);
      if (typeof d.leaveBalance === 'number') setLeaveBalance(d.leaveBalance);
      if (typeof d.leavesAllowed === 'number') setLeavesAllowed(d.leavesAllowed);
      if (d.employeeType === 'private' || d.employeeType === 'govt') setEmployeeType(d.employeeType);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-leave-encashment-v1', JSON.stringify({ receivedAmount, averageSalary, completedYears, leaveBalance, leavesAllowed, employeeType }));
    } catch { /* ignore */ }
  }, [receivedAmount, averageSalary, completedYears, leaveBalance, leavesAllowed, employeeType]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    let exemptAmount = 0;
    let cashEquivalent = 0;
    
    // Capping calculations under Section 10(10AA)
    const leavesAllowedCapped = Math.min(30, leavesAllowed);
    const leavesEarnedCapped = completedYears * leavesAllowedCapped;
    
    // Leaves taken during service
    const leavesEarnedActual = completedYears * leavesAllowed;
    const leavesTaken = Math.max(0, leavesEarnedActual - leaveBalance);
    
    // Capped leave balance
    const cappedLeaveBalance = Math.max(0, leavesEarnedCapped - leavesTaken);
    cashEquivalent = Math.round((cappedLeaveBalance / 30) * averageSalary);

    if (employeeType === 'govt') {
      exemptAmount = receivedAmount;
    } else {
      const limit1 = receivedAmount;
      const limit2 = 2500000; // Increased limit from Budget 2023
      const limit3 = 10 * averageSalary;
      const limit4 = cashEquivalent;
      exemptAmount = Math.min(limit1, limit2, limit3, limit4);
    }

    const taxableAmount = Math.max(0, receivedAmount - exemptAmount);
    const marginalRate = getMarginalRate(averageSalary * 12);
    const taxSaved = Math.round(exemptAmount * (marginalRate / 100) * 1.04);
    const exemptPct = receivedAmount > 0 ? (exemptAmount / receivedAmount) * 100 : 0;

    return { exemptAmount, taxableAmount, cashEquivalent, marginalRate, taxSaved, exemptPct, leavesTaken, cappedLeaveBalance };
  }, [receivedAmount, averageSalary, completedYears, leaveBalance, leavesAllowed, employeeType]);

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Leave Encashment Tax Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate tax exemption on leave encashment at retirement or resignation under Section 10(10AA) for private and government sector employees
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Leave Encashment Tax Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <ToggleGroup label="Employee Sector"
                    options={[
                      { value: 'private', label: 'Private Sector' },
                      { value: 'govt', label: 'Government' },
                    ]}
                    value={employeeType} onChange={setEmployeeType} />

                  <Slider label="Leave Encashment Received" id="le-received" value={receivedAmount} min={10000} max={10000000} step={10000} fmt={fmtC} onChange={setReceivedAmount} compact={mobile} />
                  <Slider label="Average Monthly Salary (Last 10 months)" id="le-salary" value={averageSalary} min={10000} max={1000000} step={2000} fmt={fmtC} onChange={setAverageSalary} compact={mobile} />
                  <Slider label="Completed Years of Service" id="le-tenure" value={completedYears} min={1} max={45} step={1} fmt={v => `${v} Years`} onChange={setCompletedYears} compact={mobile} />
                  <Slider label="Actual Leave Balance (Days)" id="le-balance" value={leaveBalance} min={0} max={1000} step={5} fmt={v => `${v} Days`} onChange={setLeaveBalance} compact={mobile} />
                  <Slider label="Leaves Allowed per Year by Employer" id="le-allowed" value={leavesAllowed} min={15} max={45} step={1} fmt={v => `${v} Days`} onChange={setLeavesAllowed} compact={mobile} />
                </div>

                {/* Outputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Tax Saved</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '2px 0 0', letterSpacing: '-0.02em' }}
                        aria-live="polite" aria-label={`You save ${fmtIN(result.taxSaved)} in tax`}>
                        {fmtIN(result.taxSaved)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Exempt Amount</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '2px 0 0', opacity: 0.9 }}>
                        {fmtIN(result.exemptAmount)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: 'Taxable leave encashment', value: fmtIN(result.taxableAmount) },
                    { label: 'Capped leave balance', value: `${result.cappedLeaveBalance} Days` },
                    { label: 'Cash equivalent of leaves', value: fmtIN(result.cashEquivalent) },
                    { label: 'Estimated marginal tax rate', value: `${result.marginalRate}% + 4% cess` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart exemptPct={result.exemptPct} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Exempt {result.exemptPct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Taxable {(100 - result.exemptPct).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Save Results Card */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-leave-encashment">What Is a Leave Encashment Tax Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A leave encashment tax calculator is an interactive tool that evaluates tax exemptions under Section 10(10AA) of the Income Tax Act. This tool helps professionals estimate the tax-free portion of their leave encashment payout.
                  </p>
                </div>
                <p style={p}>
                  Salaried individuals frequently accumulate unused leaves over their employment tenure. Upon retirement or resignation, employers pay a lump sum to compensate for these accumulated leaves. By using our online leave encashment tax calculator, you can check how much of this lump sum is tax-exempt and how much is added to your taxable income.
                </p>
                <p style={p}>
                  To see how your overall retirement and CTC structure is distributed, you can combine this calculation with our <a href="/calculators/salary-breakdown-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Salary Breakdown Calculator</a> or evaluate retirement benefits like gratuity with our <a href="/calculators/gratuity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Gratuity Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-treatment">Tax Treatment of Leave Encashment: Government vs Private Employees</h2>
                <p style={p}>
                  Section 10(10AA) provides completely different tax benefits depending on whether the employee belongs to the government sector or private sector:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Government Employees:</strong> Central and State Government employees receive a 100% tax exemption on leave encashment received at retirement or resignation. The entire amount is tax-free.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Private Sector Employees:</strong> Non-government employees are subject to strict capping criteria, and any surplus above these caps is taxable.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="leave-entirement">Capped Annual Leave Entitlement Under Section 10(10AA)</h2>
                <p style={p}>
                  A common point of confusion is the number of leaves allowed for calculation. Under income tax rules, the annual leave entitlement is strictly capped at 30 days per completed year of service.
                </p>
                <p style={p}>
                  If your company grants you 45 days of earned leave per year, the income tax department will recalculate your total earned leaves using a 30-day cap for exemption purposes. For example, over 20 years of service, your company may have credited 900 leaves. However, for tax exemption, the calculation is capped at 600 days.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="average-salary">Understanding the 10-Month Average Salary Capping</h2>
                <p style={p}>
                  The third limit under Section 10(10AA) is based on 10 months&apos; average salary. This average is calculated using the basic salary, dearness allowance (if it enters into retirement benefits), and turnover-based commissions earned in the 10 months immediately preceding retirement or resignation. All other allowances (like HRA, travel, or medical allowances) are excluded.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="statutory-limit">The Lifetime Statutory Exemption Cap of Rs 25 Lakh</h2>
                <p style={p}>
                  In Budget 2023, the government increased the statutory leave encashment exemption limit from Rs 3,00,000 to Rs 25,00,000. This change provides substantial relief to senior professionals in the private sector.
                </p>
                <p style={p}>
                  It is important to note that the Rs 25 lakh cap is a lifetime limit. If you resign from a company and claim a Rs 10 lakh exemption, your remaining statutory limit for future jobs is reduced to Rs 15 lakh.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="active-service">Taxability of Leave Encashment During Active Service</h2>
                <p style={p}>
                  The tax exemption under Section 10(10AA) applies only to payments received at retirement or resignation. If you choose to encash your leaves while actively employed with the company, the entire amount is fully taxable under your tax slab. There are no exemptions for active service encashments.
                </p>
                <p style={p}>
                  To check your tax bracket and plan your payouts, review our <a href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="resignation-vs-retirement">Leave Encashment Rules for Resignations vs Retirements</h2>
                <p style={p}>
                  Under the Income Tax Act, resignation is treated the same as retirement. The exemption benefits under Section 10(10AA) apply equally whether you retire after reaching superannuation or resign to join another employer. Private sector employees can claim exemptions using the same capping rules in both cases.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regimes">Tax Exemption Under Old and New Tax Regimes</h2>
                <p style={p}>
                  The leave encashment tax exemption is available under both the Old Tax Regime and the New Tax Regime. The government retained this retirement benefit in the new regime to support long-term savings.
                </p>
                <p style={p}>
                  If you have a taxable surplus from leave encashment, you can use our <a href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</a> to determine which tax regime minimizes your overall tax liability.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="capping-rules-table">In-Context Detailed Table of Section 10(10AA) Capping Rules</h2>
                <p style={p}>
                  For private sector employees, the exemption is limited to the lowest of these four values:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Four-point capping criteria under Section 10(10AA)</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS} scope="col">Exemption Parameter</th>
                        <th style={thS} scope="col">Calculation Base</th>
                        <th style={thS} scope="col">Capping Restrictions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Actual Payout</td>
                        <td style={tdR}>Total leave encashment amount received</td>
                        <td style={tdL}>None</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Statutory Limit</td>
                        <td style={tdR}>Rs 25,00,000 (Lifetime limit)</td>
                        <td style={tdL}>Combined cap across all employers</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Average Salary Limit</td>
                        <td style={tdR}>10 * Preceding 10 months&apos; average monthly salary</td>
                        <td style={tdL}>Restricted to Basic + Dearness Allowance (DA)</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Leave Balance Cash Equivalent</td>
                        <td style={tdR}>(Capped Leave Balance / 30) * Average monthly salary</td>
                        <td style={tdL}>Annual leave allowance capped at 30 days per year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="documents-required">Documents and Proofs Required for Section 10(10AA) Claims</h2>
                <p style={p}>
                  To claim this exemption, you must submit the following documents to your employer&apos;s finance or payroll team:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Service Certificate:</strong> Document showing completed years of service and date of resignation or retirement.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Leave Ledger Summary:</strong> Certified record from HR showing leaves earned, availed, and final balance.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Form 16 / Exemption Relief Record:</strong> Details of leave encashment exemptions claimed in previous employments to verify the lifetime limit.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="maximize-exemption">How to Maximize Your Tax-Free Leave Encashment Payout</h2>
                <p style={p}>
                  To optimize your tax savings, consider these strategies:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Accrue leaves:</strong> Build your leave balance during service, as the exemption calculation favors a larger leave balance at retirement.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Avoid mid-service encashments:</strong> Mid-service encashments are fully taxable. Waiting until retirement or resignation allows you to claim the Section 10(10AA) exemption.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Optimize CTC:</strong> Ensure your basic salary is structured appropriately, as the average monthly basic salary forms the foundation of the exemption limits.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="encashment-vs-gratuity">Difference Between Leave Encashment and Gratuity Exemptions</h2>
                <p style={p}>
                  While both are retirement benefits, their tax exemptions operate under different sections:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Leave Encashment (Section 10(10AA)):</strong> Capped at Rs 25 lakh, based on 10 months&apos; average salary and capped leave balances.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Gratuity (Section 10(10)):</strong> Capped at Rs 20 lakh, calculated as 15 days of salary for every completed year of service.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use the Leave Encashment Tax Calculator Online</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Sector:</strong> Toggle between Private Sector or Government. Government employees receive 100% tax exemption.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Provide Received Payout:</strong> Set the total leave encashment amount received.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Average monthly salary:</strong> Input the average basic + DA salary of the last 10 months.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter completed years of service:</strong> Input the completed years of service (round down to completed years).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Provide Leave balance:</strong> Input actual leave balance days and the annual leave allowance allowed by your employer. The calculator computes the capped balance and outputs your exemption and tax saved.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Exemption approvals depend on compliance with Section 10(10AA) of the Income Tax Act, 1961. Consult a qualified Chartered Accountant for personalised tax planning advice. The statutory cap of Rs 25 lakh is a lifetime combined limit across all employers. 
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="le-sidebar" aria-label="Related calculators" style={{
            display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16,
            overflowY: 'auto', position: 'sticky', top: 24,
            maxHeight: 'calc(100vh - 100px)',
          } as React.CSSProperties}>
            <style>{`
              .le-sidebar::-webkit-scrollbar { width: 5px; }
              .le-sidebar::-webkit-scrollbar-track { background: transparent; }
              .le-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .le-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <div className="le-sidebar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0,
            }}>
              <SidebarList title="Tax & Retirement" items={POPULAR} />
              <SidebarList title="Salary Tools" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

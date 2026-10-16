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
function DonutChart({ pensionPct }: { pensionPct: number }) {
  const gapPct = 100 - pensionPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (pensionPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Pension Replacement Rate ${pensionPct.toFixed(1)}%, non-pension basic portion ${gapPct.toFixed(1)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Replacement</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 25, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pensionPct.toFixed(1)}%</text>
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
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, i) => (
          <li key={i} style={{ borderBottom: i === items.length - 1 ? 'none' : `1px solid ${C.border}` }}>
            <Link href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '12px 20px', fontSize: 14, color: C.ink2, textDecoration: 'none', transition: 'all 0.12s' }}
              onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
              onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/epf-calculator',            label: 'EPF Calculator' },
  { href: '/calculators/nps-calculator',            label: 'NPS Calculator' },
  { href: '/calculators/retirement-calculator',     label: 'Retirement Calculator' },
  { href: '/calculators/gratuity-calculator',       label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/salary-breakdown-calculator', label: 'Salary Breakdown Calculator' },
  { href: '/calculators/income-tax-calculator',       label: 'Income Tax Calculator' },
  { href: '/calculators/lta-calculator',              label: 'LTA Calculator' },
  { href: '/calculators/vpf-calculator',              label: 'VPF Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const FAQS = [
  { q: 'What is the Employees&apos; Pension Scheme (EPS)?', a: 'The Employees&apos; Pension Scheme (EPS) is a social security scheme introduced by the EPFO in 1995. It provides a structured monthly pension to organized sector employees after retirement at age 58.' },
  { q: 'How is the EPS monthly pension calculated?', a: 'The statutory pension formula is: (Pensionable Salary multiplied by Pensionable Service) divided by 70. Pensionable salary is capped at Rs 15,000 per month, and pensionable service is capped at 35 years.' },
  { q: 'What is the maximum pension possible under standard EPS rules?', a: 'Under the standard capped basic salary of Rs 15,000 and the maximum pensionable service of 35 years, the maximum pension is (15,000 multiplied by 35) divided by 70, which equals Rs 7,500 per month.' },
  { q: 'Am I eligible for EPS pension if I have worked for less than 10 years?', a: 'No. A minimum of 10 completed years of eligible service is mandatory to qualify for a monthly pension. If your service is less than 10 years, you cannot claim a pension; you can only withdraw a lump-sum accumulation.' },
  { q: 'What is the 2-year service bonus in EPS?', a: 'If an employee completes 20 or more years of eligible service under the scheme, they receive a bonus of 2 additional years added to their calculated pensionable service, subject to the total pensionable service cap of 35 years.' },
  { q: 'Can I withdraw my EPS pension early?', a: 'Yes. You can opt for an early reduced pension from age 50 to 57, provided you have completed 10 years of service. However, the pension amount is reduced by 4% for every year you are short of age 58.' },
  { q: 'What happens if I defer my EPS pension after age 58?', a: 'If you defer your pension to age 59 or 60, your pension amount will increase by 4% for each deferred year. Deferring to age 60 provides an 8% increase in your monthly pension payout.' },
  { q: 'What is the higher pension option under the Supreme Court ruling?', a: 'The Supreme Court in November 2022 allowed eligible employees to opt for a pension based on their actual basic salary rather than the statutory cap of Rs 15,000. This increases the pension payout but requires transferring past employer EPF balances to the EPS fund.' },
  { q: 'Is EPS pension taxable under the Income Tax Act?', a: 'Yes. Monthly pension received under EPS is treated as salary income and is fully taxable under your applicable income tax slabs.' },
  { q: 'Does the employee contribute directly to the EPS fund?', a: 'No. Salaried employees contribute 12% of their basic salary entirely to the EPF. The employer contributes 12%, out of which 8.33% goes to the EPS (capped at Rs 1,250 per month under standard rules) and the remaining 3.67% goes to the EPF.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ─── CA CTA ─────────────────────────────────────────────────── */

/* ─── Main Client Component ───────────────────────────────────── */

export default function EPSCalculatorClient() {
  const defaultSettings = {
    basicSalary: 65000,
    yearsOfService: 25,
    retirementAge: 58,
    pensionOption: 'capped' as 'capped' | 'actual',
  };
  const { settings, updateSettings } = useCalculatorSettings('eps-calculator', defaultSettings);
  const { basicSalary, yearsOfService, retirementAge, pensionOption } = settings;

  const setBasicSalary = (v: any) => updateSettings({ basicSalary: typeof v === 'function' ? v(settings.basicSalary) : v });
  const setYearsOfService = (v: any) => updateSettings({ yearsOfService: typeof v === 'function' ? v(settings.yearsOfService) : v });
  const setRetirementAge = (v: any) => updateSettings({ retirementAge: typeof v === 'function' ? v(settings.retirementAge) : v });
  const setPensionOption = (v: any) => updateSettings({ pensionOption: typeof v === 'function' ? v(settings.pensionOption) : v });

  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-eps-calculator-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (typeof d.basicSalary === 'number') setBasicSalary(d.basicSalary);
      if (typeof d.yearsOfService === 'number') setYearsOfService(d.yearsOfService);
      if (typeof d.retirementAge === 'number') setRetirementAge(d.retirementAge);
      if (d.pensionOption === 'capped' || d.pensionOption === 'actual') setPensionOption(d.pensionOption);
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-eps-calculator-v1', JSON.stringify({ basicSalary, yearsOfService, retirementAge, pensionOption }));
    } catch { /* ignore */ }
  }, [basicSalary, yearsOfService, retirementAge, pensionOption]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const result = useMemo(() => {
    const pensionableSalary = pensionOption === 'capped' ? Math.min(15000, basicSalary) : basicSalary;
    
    // Pensionable service details: +2 years bonus if service >= 20 years
    let serviceYearsCalculated = yearsOfService;
    const isBonusEligible = yearsOfService >= 20;
    if (isBonusEligible) {
      serviceYearsCalculated += 2;
    }
    
    // Capped at 35 years under statutory rules
    const finalPensionableService = Math.min(35, serviceYearsCalculated);
    
    // Basic EPS pension formula: (pensionable salary * pensionable service) / 70
    let monthlyPension = 0;
    let qualificationStatus = 'Qualified';
    let adjustmentRateText = 'No adjustment (Age 58)';
    let adjustmentFactor = 1.0;

    if (yearsOfService < 10) {
      qualificationStatus = 'Not eligible (Min 10 years service required)';
      monthlyPension = 0;
    } else {
      monthlyPension = (pensionableSalary * finalPensionableService) / 70;
      
      // Early pension reduction: 4% per year short of 58
      if (retirementAge < 58) {
        const yearsShort = 58 - retirementAge;
        adjustmentFactor = 1 - (yearsShort * 0.04);
        adjustmentRateText = `Early pension reduction: -${yearsShort * 4}%`;
      }
      // Deferred pension increase: 4% per year deferred beyond 58
      else if (retirementAge > 58) {
        const yearsDeferred = retirementAge - 58;
        adjustmentFactor = 1 + (yearsDeferred * 0.04);
        adjustmentRateText = `Deferred pension bonus: +${yearsDeferred * 4}%`;
      }
      
      monthlyPension = Math.round(monthlyPension * adjustmentFactor);
    }

    // Illustrative lifetime pension assuming life expectancy of 80 years
    const pensionTenureYears = Math.max(0, 80 - retirementAge);
    const totalLifetimePension = monthlyPension * 12 * pensionTenureYears;
    
    // Replacement rate relative to actual basic salary
    const pensionReplacementRate = basicSalary > 0 ? (monthlyPension / basicSalary) * 100 : 0;

    return {
      pensionableSalary,
      isBonusEligible,
      finalPensionableService,
      monthlyPension,
      totalLifetimePension,
      pensionReplacementRate,
      qualificationStatus,
      adjustmentRateText,
      pensionTenureYears,
    };
  }, [basicSalary, yearsOfService, retirementAge, pensionOption]);

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
            EPS Pension Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate your monthly pension payout and lifetime corpus under the EPFO Employees&apos; Pension Scheme (EPS-95)
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="EPS Pension Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <ToggleGroup label="EPS Pension Cap Option"
                    options={[
                      { value: 'capped', label: 'Standard Cap (Rs 15,000)' },
                      { value: 'actual', label: 'Higher Option (Actual Salary)' },
                    ]}
                    value={pensionOption} onChange={setPensionOption} />

                  <Slider label="60-Month Average Basic + DA" id="eps-basic" value={basicSalary} min={5000} max={300000} step={2000} fmt={fmtC} onChange={setBasicSalary} compact={mobile} />
                  <Slider label="Years of Service" id="eps-service" value={yearsOfService} min={1} max={35} step={1} fmt={v => `${v} Years`} onChange={setYearsOfService} compact={mobile} />
                  <Slider label="Pension Commencement Age" id="eps-age" value={retirementAge} min={50} max={60} step={1} fmt={v => `${v} Years Old`} onChange={setRetirementAge} compact={mobile} />
                </div>

                {/* Outputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Monthly Pension</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '2px 0 0', letterSpacing: '-0.02em' }}
                        aria-live="polite" aria-label={`Monthly pension is ${fmtIN(result.monthlyPension)}`}>
                        {fmtIN(result.monthlyPension)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Lifetime Pension Corpus</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '2px 0 0', opacity: 0.9 }}>
                        {fmtIN(result.totalLifetimePension)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: 'Pension eligibility status', value: result.qualificationStatus },
                    { label: 'Pensionable salary used', value: fmtIN(result.pensionableSalary) },
                    { label: 'Pensionable service years', value: `${result.finalPensionableService} Years` },
                    { label: 'Service bonus of 2 years', value: result.isBonusEligible ? 'Applied (+2 Years)' : 'Not Eligible (Requires 20Y)' },
                    { label: 'Early/Deferred adjustment', value: result.adjustmentRateText },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart pensionPct={result.pensionReplacementRate} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Replacement Rate {result.pensionReplacementRate.toFixed(1)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Unreplaced basic {(100 - result.pensionReplacementRate).toFixed(1)}%</span>
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
                <h2 style={h2} id="what-is-eps">What Is the EPS Pension Calculator?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The EPS pension calculator is an online tool built to estimate monthly pension payouts under the Employees&apos; Pension Scheme of 1995. This calculator helps organize sector professionals plan their retirement by computing their pensionable salary and service.
                  </p>
                </div>
                <p style={p}>
                  When you contribute to the Employees&apos; Provident Fund (EPF), your employer automatically routes a portion of their contribution to the pension scheme. By utilizing our EPS calculator, you can estimate your monthly pension amount based on completed years of service and retirement age. This tool is essential for mapping your long-term retirement corpus alongside other retirement options like NPS or gratuity.
                </p>
                <p style={p}>
                  To see how your pension aligns with your monthly take-home salary, you can cross-reference your figures with our <a href="/calculators/salary-breakdown-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Salary Breakdown Calculator</a> or evaluate your cumulative PF savings using the <a href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPF Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="eligibility">Eligibility Criteria for Employees&apos; Pension Scheme (EPS)</h2>
                <p style={p}>
                  To qualify for a regular monthly pension under EPS-95 rules, a salaried employee must fulfill several mandatory criteria set by the EPFO:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>EPF membership:</strong> You must be an active member of the Employees&apos; Provident Fund Organisation (EPFO).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Minimum service:</strong> A minimum of 10 completed years of contributory service is mandatory. If you resign before 10 years, you can only withdraw a lump-sum amount.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Retirement age:</strong> Standard pension payouts commence at age 58. Reduced early pension can begin from age 50.
                  </li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="pension-formula">Formula for Calculating Monthly EPS Pension</h2>
                <p style={p}>
                  The monthly pension is calculated using a standard arithmetic formula defined under the Employees&apos; Pension Scheme, 1995:
                </p>
                <div style={{ background: '#f6f7f8', border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, marginBottom: 16 }}>
                  <code style={{ display: 'block', fontFamily: 'monospace', fontSize: 14.5, color: C.dark }}>
                    Monthly Pension = (Pensionable Salary × Pensionable Service) / 70
                  </code>
                </div>
                <p style={p}>
                  Where pensionable salary is the average monthly basic + DA salary of the last 60 months of service. Pensionable service is the number of contributory years. For standard members, the pensionable salary is capped at Rs 15,000 per month, which caps the maximum pension at Rs 7,500.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-cap">The Rs 15,000 Pensionable Salary Cap Explained</h2>
                <p style={p}>
                  Under the EPS amendment effective September 1, 2014, the EPFO caps the pensionable basic salary at Rs 15,000 per month. This means even if your actual basic salary is Rs 80,000 per month, your pension under standard rules will be computed as if your salary was Rs 15,000.
                </p>
                <p style={p}>
                  Consequently, the maximum monthly employer contribution to the EPS fund is limited to 8.33% of Rs 15,000, which equals Rs 1,250 per month. Any excess employer contribution goes directly into your EPF balance instead of the pension fund.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="service-bonus">What Is the 2-Year Service Bonus in EPS?</h2>
                <p style={p}>
                  To reward long-term service, the EPFO provides a bonus of 2 additional years of service to employees who complete 20 or more years of eligible service under the scheme.
                </p>
                <p style={p}>
                  For example, if you complete 23 years of service, your pensionable service will be computed as 25 years (23 years of actual service + 2 years bonus). However, the total pensionable service is capped at a maximum of 35 years under standard EPFO guidelines.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="early-pension">Early Pension Rules: Reduction Rates for Ages 50 to 57</h2>
                <p style={p}>
                  If you have completed the mandatory 10 years of service, you can opt to withdraw an early reduced pension before the standard retirement age of 58. The early pension can start from age 50.
                </p>
                <p style={p}>
                  To account for the early start, the pension amount is reduced by 4% for every year that the retirement age falls short of 58. If you retire at age 50, your pension is reduced by 32% (8 years multiplied by 4% per year). This reduction is permanent and does not increase when you reach 58.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="deferred-pension">Deferred Pension Rules: Bonus Rates for Ages 59 and 60</h2>
                <p style={p}>
                  Employees can also defer their pension commencement beyond the standard age of 58 to earn a higher monthly payout. The pension can be deferred up to age 60.
                </p>
                <p style={p}>
                  For every year you defer the pension, the monthly payout increases by 4%. If you choose to start your pension at age 60, you will receive an 8% increase in your pension amount. This bonus serves as an incentive for employees who continue to work or do not require immediate pension cash flow.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="higher-option">Higher EPS Pension Option: Supreme Court Ruling Explained</h2>
                <p style={p}>
                  Following the Supreme Court judgment of November 2022, eligible employees have the option to contribute to EPS based on their actual basic salary rather than the statutory capped limit of Rs 15,000 per month.
                </p>
                <p style={p}>
                  This option substantially increases the pensionable salary used in the formula, leading to much higher monthly pension payouts. However, to claim this, a portion of your accumulated employer EPF balance must be transferred retroactively to the EPS pension fund.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-vs-eps">Difference Between EPF and EPS Contributions</h2>
                <p style={p}>
                  While both EPF and EPS are managed by the EPFO, they serve different purposes:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Comparison between EPF and EPS fund contributions</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        <th style={thS} scope="col">Parameter</th>
                        <th style={thS} scope="col">Employees&apos; Provident Fund (EPF)</th>
                        <th style={thS} scope="col">Employees&apos; Pension Scheme (EPS)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Contribution Source</td>
                        <td style={tdR}>12% from Employee + 3.67% from Employer</td>
                        <td style={tdL}>8.33% from Employer only (capped at Rs 1,250/mo by default)</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Payout Nature</td>
                        <td style={tdR}>Lump-sum corpus + accumulated interest upon retirement or withdrawal</td>
                        <td style={tdL}>Regular monthly pension after age 58 (or reduced from 50)</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>Tax Treatment</td>
                        <td style={tdR}>Exempt-Exempt-Exempt (EEE) under Section 80C</td>
                        <td style={tdL}>Fully taxable as salary income under slab rates</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="nominee-rules">Pension Options for Nominees, Spouses, and Children</h2>
                <p style={p}>
                  The EPS-95 scheme includes family pension provisions to safeguard dependents. Upon the death of the pensioner, the pension is payable to the spouse (widow/widower) for life, equivalent to 50% of the member&apos;s pension.
                </p>
                <p style={p}>
                  Additionally, up to two children are eligible to receive a child pension equal to 25% of the spouse&apos;s pension until they reach 25 years of age. If the employee dies without a spouse or children, the pension is paid to the registered nominee.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="documents">Documents and Forms Required to Claim EPS Pension</h2>
                <p style={p}>
                  To claim your monthly pension, you must submit specific forms to the EPFO through your employer:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Form 10D:</strong> The primary application form for claiming pension after reaching age 50 or 58.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Scheme Certificate:</strong> Obtained if you change jobs before retirement to transfer your pensionable service record to the new employer.</li>
                  <li style={{ fontSize: 15, color: C.ink2 }}><strong style={{ color: C.ink }}>Form 10C:</strong> Used to claim a lump-sum EPS withdrawal if your total service is less than the mandatory 10 years.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="taxability">Taxability of EPS Pension Income under the Income Tax Act</h2>
                <p style={p}>
                  Monthly pension received under the EPS-95 scheme is treated as taxable salary income. It is subject to standard tax deductions (such as the standard deduction of Rs 75,000 under the New Tax Regime or Rs 50,000 under the Old Regime) and is taxed according to your applicable slab rates.
                </p>
                <p style={p}>
                  Unlike your EPF lump-sum withdrawal, which is completely tax-free upon retirement, your EPS pension payouts remain taxable. To calculate your estimated tax liability, use our <a href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This EPS Pension Calculator Online</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Option:</strong> Choose between standard capped (Rs 15,000 basic limit) or the actual basic salary option.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Average Basic Salary:</strong> Use the slider to set your 60-month average basic salary.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Years of Service:</strong> Set the completed years of contributory service.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Retirement Age:</strong> Select the age you want to commence pension (50 to 60) to see early or deferred adjustments.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are illustrative. Monthly pension values depend on EPFO rules, verification of records, service history, and final average salaries. The lifetime pension calculation assumes an indicative life expectancy of 80 years and does not constitute a guaranteed return projection. Consult a qualified financial advisor or a Chartered Accountant before choosing pension options. 
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside className="eps-sidebar" aria-label="Related calculators" style={{
            display: mobile ? 'none' : 'flex', flexDirection: 'column', gap: 16,
            overflowY: 'auto', position: 'sticky', top: 24,
            maxHeight: 'calc(100vh - 100px)',
          } as React.CSSProperties}>
            <style>{`
              .eps-sidebar::-webkit-scrollbar { width: 5px; }
              .eps-sidebar::-webkit-scrollbar-track { background: transparent; }
              .eps-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .eps-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>
            <div className="eps-sidebar" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
              display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0,
            }}>
              <SidebarList title="Popular Retirement Tools" items={POPULAR} />
              <SidebarList title="Tax & Income Tools" items={MORE} />
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

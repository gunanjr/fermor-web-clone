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

/* Palette */
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

/* Helpers */
const fmtIN = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(n));
const fmtC = (n: number) => {
  if (n >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
  return fmtIN(n);
};

/* SCSS Math */
interface SCSSResult {
  quarterlyInterest: number;
  annualInterest: number;
  totalInterest: number;
  maturityAmount: number;
}

function calcSCSS(principal: number, rate: number, years: number): SCSSResult {
  const annualInterest = (principal * rate) / 100;
  const quarterlyInterest = annualInterest / 4;
  const totalInterest = annualInterest * years;
  const maturityAmount = principal + totalInterest;
  return { quarterlyInterest, annualInterest, totalInterest, maturityAmount };
}

interface GrowthRow {
  year: number;
  annualInterest: number;
  cumulativeInterest: number;
  balance: number;
}

function buildSCSSGrowth(principal: number, rate: number, years: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const annualInterest = Math.round((principal * rate) / 100);
  let cumulative = 0;
  for (let y = 1; y <= years; y++) {
    cumulative += annualInterest;
    rows.push({
      year: y,
      annualInterest,
      cumulativeInterest: cumulative,
      balance: principal + cumulative,
    });
  }
  return rows;
}

/* Donut Chart */
function DonutChart({ invested, returns: ret }: { invested: number; returns: number }) {
  const total = invested + ret;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (invested / total) * circ;
  const pPct = Math.round((invested / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}
      role="img" aria-label={`Donut chart: ${pPct}% invested, ${100 - pPct}% returns`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* Slider */
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
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#AAAAAA'}
            onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmt(max)}</span>
      </div>
    </div>
  );
}

/* Toggle Button */
function ToggleBtn({ options, value, onChange }: {
  options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          style={{
            flex: 1, padding: '9px 12px', fontSize: 13, fontWeight: value === opt ? 600 : 400,
            background: value === opt ? C.white : 'transparent',
            color: value === opt ? C.ink : C.ink3,
            border: 'none', cursor: 'pointer', fontFamily: INTER,
            transition: 'all 0.15s',
          }}>
          {opt}
        </button>
      ))}
    </div>
  );
}

/* Sidebar */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s', fontFamily: INTER }}
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
  { href: '/calculators/fd-calculator',                  label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',                 label: 'PPF Calculator' },
  { href: '/calculators/nps-calculator',                 label: 'NPS Calculator' },
  { href: '/calculators/ssy-calculator',                 label: 'SSY Calculator' },
  { href: '/calculators/rd-calculator',                  label: 'RD Calculator' },
  { href: '/calculators/income-tax-calculator',          label: 'Income Tax Calculator' },
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Account Calculator' },
];
const MORE = [
  { href: '/calculators/compound-interest-calculator',   label: 'Compound Interest Calculator' },
  { href: '/calculators/sip-calculator',                 label: 'SIP Calculator' },
  { href: '/calculators/retirement-calculator',          label: 'Retirement Calculator' },
  { href: '/calculators/inflation-calculator',           label: 'Inflation Calculator' },
];

/* FAQ */
const FAQS = [
  {
    q: 'What is the SCSS interest rate in 2025?',
    a: 'The SCSS interest rate for Q1 FY 2025-26 (April to June 2025) is 8.2% per annum, as notified by the Ministry of Finance. Interest is paid quarterly into your savings account. The rate has been 8.2% since April 2023, one of the highest guaranteed returns among government-backed small savings schemes. Rates are reviewed each quarter but have remained stable.',
  },
  {
    q: 'What is the maximum investment in SCSS?',
    a: 'The maximum deposit limit in SCSS is Rs 30 lakh (Rs 30,00,000) per individual. This limit was doubled from Rs 15 lakh to Rs 30 lakh in February 2023 per the Finance Act 2023. For a joint account, the limit applies to the first holder. You can open multiple SCSS accounts, but the combined balance across all accounts must not exceed Rs 30 lakh.',
  },
  {
    q: 'Is SCSS interest taxable?',
    a: 'Yes, SCSS interest is fully taxable as per your income tax slab. If the total interest credited in a financial year exceeds Rs 50,000, the bank or post office deducts TDS at 10% (or 20% if PAN is not provided). Senior citizens can submit Form 15H to avoid TDS if their total income is below the taxable limit. There is no tax exemption on SCSS interest itself, unlike PPF.',
  },
  {
    q: 'Can I extend SCSS after 5 years?',
    a: 'Yes. SCSS has a 5-year tenure but can be extended once for an additional 3 years. You must submit a written request for extension within one year of the original maturity date. During the extension period, the interest rate applicable is the rate prevailing on the date of extension, not the rate at the time of original deposit. After the 8-year period, no further extension is available.',
  },
  {
    q: 'Who is eligible for SCSS?',
    a: 'Indian residents aged 60 years and above are eligible for SCSS. Retired civilian government employees aged 55 to 60 who have received retirement benefits can also invest, subject to investing within one month of receiving the retirement benefits. Defence personnel who have retired are eligible at age 50 and above. NRIs, HUFs, and PIOs are not eligible to open SCSS accounts.',
  },
  {
    q: 'How often is SCSS interest paid?',
    a: 'SCSS interest is paid quarterly, on the first working day of April, July, October, and January each year. If you do not withdraw the quarterly interest, it sits in your savings account but is not reinvested into SCSS (there is no compounding). The interest does not compound because SCSS is a simple interest scheme. This quarterly payout makes it a predictable income source for retirees.',
  },
  {
    q: 'Can I open SCSS in a bank or only post office?',
    a: 'SCSS is available at all post offices and 24 authorised public and private sector banks including SBI, Bank of Baroda, Bank of India, Central Bank, Indian Bank, Punjab National Bank, HDFC Bank, ICICI Bank, and Axis Bank. The scheme terms, interest rate, and government guarantee are identical across all institutions. The choice is purely one of convenience and banking relationship.',
  },
  {
    q: 'What happens on premature closure of SCSS?',
    a: 'Premature closure of SCSS is permitted with a penalty. If the account is closed after 1 year but before 2 years, 1.5% of the deposit is deducted. If closed after 2 years, 1% is deducted from the deposit. No premature closure is allowed in the first year. On death of the account holder, the nominee or legal heir can close the account without any penalty, regardless of when the account was opened.',
  },
  {
    q: 'Can NRIs invest in SCSS?',
    a: 'No. Non-Resident Indians (NRIs) are not eligible to open an SCSS account. Persons of Indian Origin (PIOs) and HUFs are also excluded. If an existing SCSS account holder subsequently becomes an NRI, the account can continue until maturity but cannot be extended further. Any new deposits after acquiring NRI status are also not permitted.',
  },
  {
    q: 'Is SCSS better than FD for senior citizens?',
    a: 'SCSS offers 8.2% with a sovereign government guarantee, while senior citizen bank FD rates typically range from 7.0% to 7.8% p.a. SCSS also qualifies for Section 80C deduction on the deposit (up to Rs 1.5 lakh), which FDs outside the 5-year tax saver category do not offer. However, SCSS has a Rs 30 lakh cap and a 5-year lock-in. For amounts beyond Rs 30 lakh, or if flexibility is needed, senior citizen FDs at major banks are a reasonable complement.',
  },
  {
    q: 'What is the minimum investment in SCSS?',
    a: 'The minimum deposit in SCSS is Rs 1,000, and further deposits must be in multiples of Rs 1,000. Only one lump-sum deposit is permitted at the time of account opening; you cannot make additional deposits into an existing SCSS account. If you want to invest more, you must open a second account (subject to the combined Rs 30 lakh ceiling). The simplicity of a single deposit makes the interest calculation straightforward.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India, offering 500+ free financial calculators with no sign-up required. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* Main Component */
export default function SCSSCalculatorClient() {
  const defaultSettings = {
    principal: 500000,
    rate: 8.2,
    tenure: '5 Years',
    accountType: 'Single',
    investorAge: 65,
  };

  const { settings, updateSettings } = useCalculatorSettings('scss', defaultSettings);
  const { principal, rate, tenure, accountType, investorAge } = settings;

  const setPrincipal = (v: number) => updateSettings({ principal: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setTenure = (v: string) => updateSettings({ tenure: v });
  const setAccountType = (v: string) => updateSettings({ accountType: v });
  const setInvestorAge = (v: number) => updateSettings({ investorAge: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const years = tenure === '8 Years (Extended)' ? 8 : 5;
  const maxDeposit = accountType === 'Joint' ? 3000000 : 3000000;

  const result = useMemo(() => calcSCSS(principal, rate, years), [principal, rate, years]);
  const growthRows = useMemo(() => buildSCSSGrowth(principal, rate, years), [principal, rate, years]);

  const { quarterlyInterest, annualInterest, totalInterest, maturityAmount } = result;
  const invested = principal;
  const returns = totalInterest;
  const invPct = maturityAmount > 0 ? Math.round((invested / maturityAmount) * 100) : 0;
  const returnsPct = 100 - invPct;
  const ageAtMaturity = investorAge + years;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em', fontFamily: INTER }}>SCSS Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800, fontFamily: INTER }}>
            Calculate Senior Citizen Savings Scheme maturity amount, quarterly interest payout, and total returns at the current 8.2% rate. Post office and bank SCSS.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT COLUMN */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* INPUT PANEL */}
                <div style={{ padding: mobile ? '16px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 32px', fontFamily: INTER }}>SCSS Details</p>}

                  {/* Investment Amount */}
                  <Slider
                    label="Investment Amount"
                    value={principal}
                    min={1000}
                    max={maxDeposit}
                    step={1000}
                    fmt={v => `Rs ${fmtC(v)}`}
                    onChange={setPrincipal}
                    compact={mobile}
                  />

                  {/* Interest Rate */}
                  <Slider
                    label="Interest Rate (p.a.)"
                    value={rate}
                    min={1}
                    max={15}
                    step={0.1}
                    fmt={v => `${v.toFixed(1)}%`}
                    onChange={setRate}
                    compact={mobile}
                  />

                  {/* Tenure Toggle */}
                  <div style={{ marginBottom: mobile ? 18 : 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 14 }}>
                      <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>Tenure</label>
                      <span style={{ fontSize: 13, color: C.ink3, fontFamily: INTER }}>{years} years</span>
                    </div>
                    <ToggleBtn
                      options={['5 Years', '8 Years (Extended)']}
                      value={tenure}
                      onChange={setTenure}
                    />
                  </div>

                  {/* Account Type Toggle */}
                  <div style={{ marginBottom: mobile ? 18 : 32 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 14 }}>
                      <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, fontFamily: INTER }}>Account Type</label>
                    </div>
                    <ToggleBtn
                      options={['Single', 'Joint']}
                      value={accountType}
                      onChange={setAccountType}
                    />
                    {accountType === 'Joint' && (
                      <div style={{ marginTop: 10, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px' }}>
                        <span style={{ fontSize: 12, color: C.ink2, fontFamily: INTER }}>Joint account: first holder must be 60+. Spouse can be second holder at any age. Combined limit remains Rs 30 lakh.</span>
                      </div>
                    )}
                  </div>

                  {/* Investor Age */}
                  <Slider
                    label="Your Age"
                    value={investorAge}
                    min={45}
                    max={90}
                    step={1}
                    fmt={v => `${v} yrs`}
                    onChange={setInvestorAge}
                    compact={mobile}
                  />

                  {/* Info box */}
                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, color: C.dark, fontWeight: 700, fontFamily: INTER }}>
                      Current SCSS rate: 8.2% p.a.
                      <span style={{ color: C.ink2, fontWeight: 400 }}> paid quarterly by India Post / authorised banks</span>
                    </div>
                  </div>
                </div>

                {/* OUTPUT PANEL */}
                <div style={{ padding: mobile ? '16px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={invested} returns={returns} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>Invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>Total interest</span>
                    </div>
                  </div>

                  {/* Primary Maturity Box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '16px 18px' : '20px 24px', marginBottom: 12 }}>
                    <div style={{ fontSize: 12, color: '#7A8087', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6, fontFamily: INTER }}>Maturity Amount</div>
                    <div style={{ fontSize: mobile ? 26 : 32, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', fontFamily: INTER }}>Rs {fmtIN(maturityAmount)}</div>
                    <div style={{ fontSize: 12, color: '#7A8087', marginTop: 4, fontFamily: INTER }}>
                      Interest income by age {ageAtMaturity}
                    </div>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Quarterly Interest Payout', value: `Rs ${fmtIN(quarterlyInterest)}` },
                    { label: 'Annual Interest Income',    value: `Rs ${fmtIN(annualInterest)}` },
                    { label: 'Total Interest Earned',     value: `Rs ${fmtC(totalInterest)}` },
                    { label: 'Total Invested',            value: `Rs ${fmtC(invested)}` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2, fontFamily: INTER }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{value}</span>
                    </div>
                  ))}

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3, fontFamily: INTER }}>Invested {invPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3, fontFamily: INTER }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${invPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-wise Interest Table */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowTable(v => !v)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 40px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink, fontFamily: INTER }}>Year-wise Interest Payout</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10, fontFamily: INTER }}>(Annual breakdown)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap', fontFamily: INTER }}>
                      {years} Yr
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showTable && (
                  <div style={{ borderTop: `1px solid ${C.border}` }}>
                    {/* Stacked Bar Chart */}
                    <div style={{ padding: mobile ? '16px 20px' : '24px 40px', borderBottom: `1px solid ${C.border}` }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, margin: '0 0 16px', fontFamily: INTER }}>Growth Breakdown (Yearly)</p>
                      <svg width="100%" height="300" viewBox="0 0 600 280" style={{ display: 'block' }} role="img" aria-label="Stacked bar chart showing invested amount and cumulative interest growth over years">
                        {/* Background */}
                        <rect width="600" height="280" fill={C.white} />

                        {/* Y-axis labels and gridlines */}
                        {[0, 25, 50, 75, 100].map((pct) => {
                          const yPos = 240 - (pct / 100) * 200;
                          const maxValue = maturityAmount;
                          const value = (pct / 100) * maxValue;
                          return (
                            <g key={pct}>
                              <line x1="50" y1={yPos} x2="580" y2={yPos} stroke={pct === 0 ? C.border : '#f0f0f0'} strokeWidth="1" />
                              <text x="40" y={yPos + 4} textAnchor="end" fontSize="11" fill={C.ink3} fontFamily={INTER}>
                                {value > 1000000 ? `${(value / 1000000).toFixed(0)}L` : `${(value / 100000).toFixed(1)}L`}
                              </text>
                            </g>
                          );
                        })}

                        {/* Bars */}
                        {growthRows.map((row, idx) => {
                          const barWidth = 35;
                          const spacing = 50;
                          const xPos = 70 + idx * spacing;
                          const totalHeight = 200;
                          const investedHeight = (principal / maturityAmount) * totalHeight;
                          const interestHeight = (row.cumulativeInterest / maturityAmount) * totalHeight;
                          const yBase = 240;

                          return (
                            <g key={row.year}>
                              {/* Invested (dark) */}
                              <rect x={xPos - barWidth / 2} y={yBase - investedHeight} width={barWidth} height={investedHeight} fill={CHART_PAIR.primary} />
                              {/* Interest (lime) */}
                              <rect x={xPos - barWidth / 2} y={yBase - investedHeight - interestHeight} width={barWidth} height={interestHeight} fill={CHART_PAIR.secondary} />
                              {/* Year label */}
                              <text x={xPos} y="265" textAnchor="middle" fontSize="12" fontWeight="600" fill={C.ink} fontFamily={INTER}>
                                Yr {row.year}
                              </text>
                            </g>
                          );
                        })}

                        {/* Axes */}
                        <line x1="50" y1="240" x2="580" y2="240" stroke={C.ink3} strokeWidth="1.5" />
                        <line x1="50" y1="40" x2="50" y2="240" stroke={C.ink3} strokeWidth="1.5" />

                        {/* Legend */}
                        <g>
                          <rect x="340" y="20" width="12" height="12" fill={C.dark} />
                          <text x="358" y="28" fontSize="12" fill={C.ink2} fontFamily={INTER}>Invested</text>

                          <rect x="470" y="20" width="12" height="12" fill={C.lime2} />
                          <text x="488" y="28" fontSize="12" fill={C.ink2} fontFamily={INTER}>Total Interest</text>
                        </g>
                      </svg>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: INTER }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Annual Interest', 'Cumulative Interest', 'Balance'].map(h => (
                            <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {growthRows.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark, fontFamily: INTER }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2, fontFamily: INTER }}>Rs {fmtIN(row.annualInterest)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink, fontWeight: 600, fontFamily: INTER }}>Rs {fmtIN(row.cumulativeInterest)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2, fontFamily: INTER }}>Rs {fmtIN(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* SAVE RESULTS */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px', fontFamily: INTER } as React.CSSProperties;
                const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px', fontFamily: INTER } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const tblStyle = { width: '100%', borderCollapse: 'collapse', fontSize: 13, margin: '16px 0 0', fontFamily: INTER } as React.CSSProperties;
                const th = { padding: '11px 16px', textAlign: 'left' as const, fontWeight: 700, color: C.ink, background: '#f4f5f6', borderBottom: `2px solid ${C.border}` };
                const td = { padding: '11px 16px', color: C.ink2, borderBottom: `1px solid ${C.border}` };
                return (
                  <>
                    {/* Section 1 */}
                    <div id="what-is-scss" style={sec}>
                      <h2 style={h2}>What Is the Senior Citizen Savings Scheme?</h2>
                      <p style={p}>
                        The Senior Citizen Savings Scheme (SCSS) is a government-backed fixed-income product for Indian residents aged 60+, delivering guaranteed returns and predictable quarterly cash. It currently yields 8.2% per annum, the highest among post office small savings schemes, and is available at India Post and 24 authorised banks including SBI, HDFC, ICICI, and Axis.
                      </p>
                      <p style={p}>
                        The appeal is straightforward: deposit a lump sum once, receive fixed quarterly interest into your bank account for 5 years, and optionally extend for 3 more years. No stock market exposure, no compounding risk, no managing multiple accounts.
                      </p>
                      <p style={p}>
                        The deposit ceiling of Rs 30 lakh per individual was doubled from Rs 15 lakh in February 2023. A retired married couple with both spouses aged 60+ can each open a separate account, stacking Rs 60 lakh at 8.2% and collecting Rs 4,92,000 in annual guaranteed interest.
                      </p>
                    </div>

                    {/* Section 2 */}
                    <div id="scss-interest-calculation" style={sec}>
                      <h2 style={h2}>How SCSS Interest Is Calculated</h2>
                      <p style={p}>
                        SCSS uses simple interest, meaning the principal never changes and interest never compounds. The Ministry of Finance notifies the rate each quarter, and at 8.2% p.a., a Rs 5 lakh deposit generates Rs 41,000 annual interest or Rs 10,250 per quarter.
                      </p>
                      <p style={p}>
                        The math is straightforward:
                      </p>
                      <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '12px 0 16px' }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 8px', padding: 0 }}>
                          Annual Interest = Principal × Rate ÷ 100
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 8px', padding: 0 }}>
                          Quarterly Payout = Annual Interest ÷ 4
                        </p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: 0, padding: 0 }}>
                          Maturity Amount = Principal + (Annual Interest × Tenure in Years)
                        </p>
                      </div>
                      <p style={p}>
                        A worked example: Rs 5 lakh at 8.2% for 5 years yields Rs 41,000 annual interest and Rs 10,250 quarterly. Total interest earned over 5 years = Rs 2,05,000, making your maturity amount Rs 7,05,000. That quarterly Rs 10,250 remains identical for all 60 quarters with no market variation.
                      </p>
                      <p style={p}>
                        For a 5-year tenure at 8.2%, total returns equal 41% of principal. If extended to 8 years, total returns reach 65.6% of principal. The extension applies the rate prevailing at renewal time, not the original rate.
                      </p>
                    </div>

                    {/* Section 3 */}
                    <div id="scss-vs-fd" style={sec}>
                      <h2 style={h2}>SCSS vs FD: Which Is Better for Senior Citizens?</h2>
                      <p style={p}>
                        SCSS beats senior citizen bank FDs on rate and carries a sovereign guarantee (vs DICGC limit of Rs 5 lakh). The main constraint is the Rs 30 lakh deposit cap. For amounts beyond this, senior citizen FDs are the natural complement.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={tblStyle}>
                          <thead>
                            <tr>
                              <th style={th}>Factor</th>
                              <th style={th}>SCSS at 8.2%</th>
                              <th style={th}>Senior FD at 7.5%</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['Guaranteed rate', 'Yes, government-backed', 'Yes, bank-backed'],
                              ['Interest payment', 'Quarterly only', 'Monthly, quarterly, or maturity'],
                              ['Compounding', 'Simple interest (no)', 'Usually simple at senior rates'],
                              ['Tax on interest', 'Fully taxable, TDS at 10%', 'Fully taxable, TDS at 10%'],
                              ['Section 80C deduction', 'Yes, on deposit', 'Only 5-year tax saver FD'],
                              ['Safety cover', 'Full sovereign guarantee', 'DICGC, max Rs 5 lakh'],
                              ['Maximum deposit', 'Rs 30 lakh per person', 'Unlimited'],
                              ['Withdrawal penalty', 'After 1 year: 1.5% penalty', 'Varies by bank and tenure'],
                              ['Lock-in period', '5 years (can extend 3)', '1 to 5 years (flexible)'],
                              ['Multiple accounts', 'Yes, up to Rs 30L total', 'Yes, unlimited'],
                            ].map(([feat, scss, fd], i) => (
                              <tr key={feat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...td, fontWeight: 600, color: C.ink }}>{feat}</td>
                                <td style={td}>{scss}</td>
                                <td style={td}>{fd}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={{ ...p, marginTop: 16 }}>
                        A real retirement allocation: Rs 30 lakh in SCSS (Rs 2,46,000 annual interest), Rs 20 lakh in a 3-year senior citizen FD (Rs 1,50,000 annual interest), and Rs 10 lakh in a 1-year FD. That combination yields Rs 3,96,000 per year in guaranteed income from safe sources with no surprises.
                      </p>
                    </div>

                    {/* Section 4 */}
                    <div id="scss-tax-treatment" style={sec}>
                      <h2 style={h2}>Tax Treatment of SCSS Interest</h2>
                      <p style={p}>
                        SCSS interest is taxable under "Income from Other Sources" at your applicable income tax slab rate. There is no special exemption, unlike PPF. The principal deposit qualifies for Section 80C deduction up to Rs 1.5 lakh per year.
                      </p>
                      <p style={p}>
                        TDS (Tax Deducted at Source) is deducted at 10% when aggregate SCSS interest exceeds Rs 50,000 in a financial year. For a Rs 10 lakh SCSS account at 8.2%, annual interest is Rs 82,000; TDS of Rs 8,200 is deducted, leaving you Rs 73,800 per year from quarterly payouts. You can claim credit for this TDS when filing your ITR.
                      </p>
                      <p style={p}>
                        If your total annual income falls below the basic exemption limit (Rs 3 lakh for age 60-80, Rs 5 lakh for age 80+), submit Form 15H at any post office in April to prevent TDS. You must resubmit this form every financial year.
                      </p>
                      <p style={p}>
                        A tax scenario: A retired couple, both 65, with Rs 30 lakh each in separate SCSS accounts earn Rs 4,92,000 combined annually. At 10% TDS, Rs 49,200 is deducted upfront, leaving Rs 4,42,800. If their combined income stays under Rs 6 lakh, they get a full TDS refund when filing ITR.
                      </p>
                    </div>

                    {/* Section 5 */}
                    <div id="scss-eligibility" style={sec}>
                      <h2 style={h2}>SCSS Eligibility and Account Rules</h2>
                      <p style={p}>
                        Indian residents aged 60 or above can open SCSS any time. Early-access categories include retired civilian government employees (aged 55-60) and retired defence personnel (age 50+). NRIs cannot open fresh accounts, though existing holders can hold until maturity if they become NRI.
                      </p>
                      <p style={p}>
                        Each account allows only one lump-sum deposit; open multiple accounts to invest more, up to Rs 30 lakh combined. A joint account requires the first holder to be 60+; the second holder (typically spouse) can be any age and automatically becomes sole owner if the first holder dies.
                      </p>
                      <p style={p}>
                        Withdrawal penalties apply before maturity: first year is blocked; 1-2 years incurs 1.5% penalty; after 2 years incurs 1% penalty. On death, nominees can withdraw the full balance without penalty at any time. Account closure must happen within 6 months of death notification.
                      </p>
                      <p style={p}>
                        Account opening requires SCSS-1 form, identity proof, address proof, age proof, and a cheque at any India Post branch or authorised bank. Interest is paid into a linked savings account at the same or different bank. Extension requests must be submitted within one year after 5-year maturity.
                      </p>
                    </div>

                    {/* Section 6 */}
                    <div id="how-to-use" style={sec}>
                      <h2 style={h2}>How to Use This SCSS Calculator</h2>
                      <p style={p}>
                        This calculator computes your exact quarterly payout, annual income, and maturity amount for any SCSS deposit. Use it to model different deposit amounts and test rate scenarios for retirement planning.
                      </p>
                      <ul style={{ paddingLeft: 20, margin: '0 0 16px' }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8, fontFamily: INTER }}>
                          <strong>Investment Amount:</strong> Your one-time lump-sum deposit, from Rs 1,000 to Rs 30 lakh. Drag the slider or click to type a custom value to see all calculations update instantly.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8, fontFamily: INTER }}>
                          <strong>Interest Rate:</strong> Pre-filled at 8.2% (current Q1 FY 2025-26 rate). Adjust to test future scenarios; check{' '}
                          <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, textDecoration: 'underline' }}>official sources</a> for the latest Ministry of Finance notifications.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8, fontFamily: INTER }}>
                          <strong>Tenure:</strong> Toggle between 5 years (standard) and 8 years (extended). Extension applies the rate prevailing at renewal time, not the original rate.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8, fontFamily: INTER }}>
                          <strong>Account Type:</strong> Single or Joint. Both have the same Rs 30 lakh individual limit; joint accounts ensure your spouse continues receiving interest if you pass away.
                        </li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, marginBottom: 8, fontFamily: INTER }}>
                          <strong>Your Age:</strong> Shows at what age your SCSS will mature. A 65-year-old opening a 5-year SCSS matures at age 70, which impacts your retirement income planning.
                        </li>
                      </ul>
                      <p style={p}>
                        The Year-wise Interest Payout table shows annual interest, cumulative interest, and running balance for each year. Expand it to see the exact timeline and print it for your income tax filing records.
                      </p>
                    </div>

                    {/* Section 7 - SCSS vs PPF */}
                    <div id="scss-vs-ppf" style={sec}>
                      <h2 style={h2}>SCSS vs PPF: Senior Citizens and Long-Term Growth</h2>
                      <p style={p}>
                        PPF locks money for 15 years with 7.1% returns, compounding annually for exponential growth. SCSS offers 8.2% simple interest with a 5-year lock and immediate quarterly cash payouts. PPF suits retirees building wealth for heirs; SCSS suits those who need monthly or quarterly income replacement now.
                      </p>
                      <p style={p}>
                        At age 60, a Rs 10 lakh PPF deposit grows to Rs 27.87 lakh by age 75 through compounding. The same Rs 10 lakh in SCSS generates Rs 8.2 lakh annually in guaranteed income but builds no principal growth. PPF interest is tax-free; SCSS interest is fully taxable under normal income tax rules.
                      </p>
                      <p style={p}>
                        The choice is purpose-based: PPF if you have surplus income and want legacy wealth; SCSS if you need predictable quarterly or monthly income to cover living expenses immediately after retirement.
                      </p>
                    </div>

                    {/* Section 8 - Investment Planning */}
                    <div id="scss-investment-planning" style={sec}>
                      <h2 style={h2}>SCSS Investment Planning for Retirees</h2>
                      <p style={p}>
                        Most retirees have a Rs 30-50 lakh corpus and need immediate cash flow. Deploying the full Rs 30 lakh in SCSS generates Rs 2,46,000 annual income at 8.2%. The remaining Rs 20 lakh split across senior citizen FDs (3-year ladder) and short-term debt funds creates liquidity and flexibility.
                      </p>
                      <p style={p}>
                        A conservative allocation for a Rs 50 lakh portfolio: Rs 30 lakh in SCSS (Rs 2,46,000/year), Rs 12 lakh in a 3-year senior FD at 7.5% (Rs 90,000/year), and Rs 8 lakh in a 1-year FD (Rs 56,000/year). Total annual income: Rs 3,92,000 with no stock market risk and predictable cash every quarter.
                      </p>
                      <p style={p}>
                        A married couple can double this: each spouse opens a separate SCSS account with Rs 30 lakh, generating Rs 4,92,000 combined annually. This strategy maximizes the guaranteed return while distributing concentration risk across two accounts.
                      </p>
                    </div>

                    {/* Section 9 - Early Withdrawal Scenarios */}
                    <div id="scss-withdrawal-scenarios" style={sec}>
                      <h2 style={h2}>Early Withdrawal and Liquidity Planning</h2>
                      <p style={p}>
                        SCSS is designed for 5-year holds; early exit incurs penalties. After 1 year but before 2 years, a 1.5% penalty applies: on a Rs 10 lakh account, you lose Rs 15,000 plus any accrued interest. After 2 years, the penalty drops to 1%, or Rs 10,000 on the same account.
                      </p>
                      <p style={p}>
                        A real scenario: age 62, Rs 20 lakh in SCSS, medical emergency at year 3. Withdrawal value: Rs 20 lakh principal minus Rs 20,000 penalty (1%) plus Rs 4,92,000 in accumulated interest = Rs 24,72,000. You recover your principal plus 3 years of interest despite the early exit.
                      </p>
                      <p style={p}>
                        For retirees expecting unexpected expenses, ladder part of your funds: Rs 15 lakh in SCSS (locked 5 years), Rs 10 lakh in a 1-year FD (quick access with no penalty), and Rs 5 lakh in a savings account for emergencies. This structure keeps most wealth earning 8%+ while maintaining liquidity.
                      </p>
                    </div>

                    {/* Section 10 - Rate Changes */}
                    <div id="scss-rate-changes" style={sec}>
                      <h2 style={h2}>How SCSS Rates Change and What It Means for You</h2>
                      <p style={p}>
                        The Ministry of Finance reviews SCSS rates every quarter (April, July, October, January) and adjusts based on inflation, bond market conditions, and small savings policy objectives. Since April 2023, the rate has been steady at 8.2%, the highest in a decade. Historical rates peaked at 8.7% in 2018 and bottomed at 4% in 2020.
                      </p>
                      <p style={p}>
                        If you open SCSS today at 8.2% for 5 years, that rate is locked for the entire period even if rates drop to 7% later. If you extend after 5 years, you receive the prevailing rate at that time (potentially 7%, 8%, or 9% depending on market conditions). Your principal always earns at the contracted rate with no reset risk mid-tenure.
                      </p>
                      <p style={p}>
                        Retirees benefit from rate certainty: you know your quarterly payout amount for 5 years. This predictability is why SCSS is preferred for retirement income over market-linked options. Check the official Ministry of Finance website before opening an account to confirm the current quarter's rate.
                      </p>
                    </div>

                    {/* Section 11 - Death and Succession */}
                    <div id="scss-death-succession" style={sec}>
                      <h2 style={h2}>Death, Succession, and Nominee Handling</h2>
                      <p style={p}>
                        If the account holder dies, the account passes immediately to the nominated heir without any delay or probate requirement. The nominee can claim the full balance (principal plus all accrued interest to date) within 6 months of death. No penalty applies regardless of how many years have elapsed since opening.
                      </p>
                      <p style={p}>
                        For a joint SCSS account where the first holder dies, the second holder automatically becomes the sole owner. The account continues functioning with the same principal and rate. Interest payouts shift to the survivor's bank account, and they can extend the scheme if desired after maturity without any re-opening process.
                      </p>
                      <p style={p}>
                        A planning note: nominate your spouse on the SCSS account and they nominate a child on their account. This creates a succession chain ensuring your wealth reaches intended heirs within 6 months of each death, avoiding frozen assets in bank processes or probate court delays.
                      </p>
                    </div>

                    {/* Section 12 - Tax Planning with SCSS */}
                    <div id="scss-tax-planning" style={sec}>
                      <h2 style={h2}>Strategic Tax Planning Using SCSS</h2>
                      <p style={p}>
                        SCSS allows Section 80C deduction of up to Rs 1.5 lakh annually on the deposit, which is unusually high for senior citizens. If you deposit Rs 1.5 lakh in one financial year, you reduce taxable income by Rs 1.5 lakh. Retirees with pension income can strategically stagger SCSS deposits across years to bracket-manage tax liability.
                      </p>
                      <p style={p}>
                        A two-income retirement scenario: both spouses draw pension of Rs 2.5 lakh each annually. Each can open an SCSS account with Rs 1.5 lakh deposit (total Rs 3 lakh) to get Section 80C deduction. Combined annual interest at 8.2% on Rs 3 lakh = Rs 24,600, reducing effective tax on their pension income while generating guaranteed returns.
                      </p>
                      <p style={p}>
                        Form 15H filing is critical: submit it every April if total income stays below exemption. Forgetting even one year triggers TDS deduction; reclaiming it via ITR refund takes 90 days. Seniors managing multiple income sources should file Form 15H simultaneously for all deposit accounts to optimize cash flow.
                      </p>
                    </div>

                    {/* Section 13 - Common Mistakes */}
                    <div id="scss-common-mistakes" style={sec}>
                      <h2 style={h2}>Common SCSS Mistakes to Avoid</h2>
                      <p style={p}>
                        Not filing Form 15H costs TDS deduction every year, cutting quarterly payouts by Rs 200-400 (depending on deposit size). Retirees often think SCSS is "tax-free" because it's a government scheme; it is not. Interest is fully taxable, and TDS applies automatically unless you proactively file Form 15H every April.
                      </p>
                      <p style={p}>
                        Opening multiple SCSS accounts without tracking combined balance risks exceeding the Rs 30 lakh cap. An excess account becomes invalid and attracts penalties. Maintain a simple spreadsheet of all SCSS accounts (bank, branch, account number, opening date, deposit amount) to ensure you stay under the limit across all institutions.
                      </p>
                      <p style={p}>
                        Forgetting to apply for extension before 1 year post-maturity means losing the scheme. After 12 months past the 5-year maturity date, no extension is allowed. The maturity amount sits in your bank account earning only 2-3% savings account interest. Set a calendar reminder 10 months before maturity to apply for extension if you want to renew.
                      </p>
                    </div>

                    {/* FAQ Section */}
                    <div id="faq" style={sec}>
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <style>{`.scss-sidebar::-webkit-scrollbar{width:5px}.scss-sidebar::-webkit-scrollbar-track{background:transparent}.scss-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.scss-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="scss-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/scss-calculator|SCSS', '/calculators/ssy-calculator|SSY', '/calculators/nps-calculator|NPS', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/income-tax-calculator|Income Tax', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/rd-calculator|RD'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/fd-calculator|Fixed Deposits', '/calculators/nps-calculator|Retirement', '/calculators/income-tax-calculator|Tax Planning'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useId, useRef } from 'react';
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
  dark: '#101214',
  lime: '#a6dbc4',
  lime2: '#2d9970',
  paleLime: '#f4f5f6',
  ink: '#16140F',
  ink2: '#50565c',
  ink3: '#7a8087',
  white: '#ffffff',
  bg: '#f6f7f8',
  border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Table Styles ──────────────────────────────────────── */
const thS = {
  padding: '9px 14px',
  fontSize: 11.5,
  fontWeight: 700,
  color: C.ink,
  background: '#f4f5f6',
  textAlign: 'left' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  border: `1px solid ${C.border}`,
  whiteSpace: 'nowrap' as const,
  verticalAlign: 'middle' as const,
};
const tdL = {
  padding: '10px 14px',
  fontSize: 13,
  color: C.ink2,
  border: `1px solid ${C.border}`,
  verticalAlign: 'middle' as const,
  textAlign: 'left' as const,
} as React.CSSProperties;
const tdR = {
  padding: '10px 14px',
  fontSize: 13,
  color: C.ink,
  fontWeight: 500,
  border: `1px solid ${C.border}`,
  verticalAlign: 'middle' as const,
  textAlign: 'right' as const,
} as React.CSSProperties;

/* ── State Rate Data ───────────────────────────────────── */
interface StateRateInfo {
  name: string;
  maleStamp: number;
  femaleStamp: number;
  jointStamp: number;
  regRate: number;
  regCap?: number;
  metroCess?: number;
}

const STATE_RATES: Record<string, StateRateInfo> = {
  maharashtra: { name: 'Maharashtra (Mumbai/Pune)', maleStamp: 5.0, femaleStamp: 4.0, jointStamp: 5.0, regRate: 1.0, regCap: 30000, metroCess: 1.0 },
  karnataka: { name: 'Karnataka (Bengaluru)', maleStamp: 5.0, femaleStamp: 5.0, jointStamp: 5.0, regRate: 2.0, metroCess: 0.6 },
  delhi: { name: 'Delhi NCR', maleStamp: 6.0, femaleStamp: 4.0, jointStamp: 5.0, regRate: 1.0 },
  tamilnadu: { name: 'Tamil Nadu (Chennai)', maleStamp: 7.0, femaleStamp: 7.0, jointStamp: 7.0, regRate: 2.0 },
  telangana: { name: 'Telangana (Hyderabad)', maleStamp: 6.0, femaleStamp: 6.0, jointStamp: 6.0, regRate: 0.5, metroCess: 1.5 },
  up: { name: 'Uttar Pradesh (Noida/Lucknow)', maleStamp: 7.0, femaleStamp: 6.0, jointStamp: 6.5, regRate: 1.0, regCap: 20000 },
  haryana: { name: 'Haryana (Gurugram/Faridabad)', maleStamp: 7.0, femaleStamp: 5.0, jointStamp: 6.0, regRate: 0.5 },
  westbengal: { name: 'West Bengal (Kolkata)', maleStamp: 6.0, femaleStamp: 6.0, jointStamp: 6.0, regRate: 1.0 },
  gujarat: { name: 'Gujarat (Ahmedabad/Surat)', maleStamp: 4.9, femaleStamp: 4.9, jointStamp: 4.9, regRate: 1.0 },
  rajasthan: { name: 'Rajasthan (Jaipur)', maleStamp: 6.0, femaleStamp: 5.0, jointStamp: 5.5, regRate: 1.0 },
  kerala: { name: 'Kerala (Kochi/Trivandrum)', maleStamp: 8.0, femaleStamp: 8.0, jointStamp: 8.0, regRate: 2.0 },
  mp: { name: 'Madhya Pradesh (Indore/Bhopal)', maleStamp: 7.5, femaleStamp: 7.5, jointStamp: 7.5, regRate: 3.0 },
};

/* ── Adsterra Banner (300×250) ─────────────────────────── */
function AdsterraBanner() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    (window as unknown as Record<string, unknown>).atOptions = {
      key: 'fc2a25af726d1df25423b6768dd402a9',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {},
    };
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://www.highperformanceformat.com/fc2a25af726d1df25423b6768dd402a9/invoke.js';
    ref.current.appendChild(s);
  }, []);
  return <div ref={ref} style={{ width: 300, height: 250, overflow: 'hidden' }} />;
}

/* ── Slider ────────────────────────────────────────────── */
function Slider({
  label,
  id: idProp,
  value,
  min,
  max,
  step,
  display,
  onChange,
  compact,
  suffix,
}: {
  label: string;
  id?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  compact?: boolean;
  suffix?: string;
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
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14.5, color: C.ink2, fontWeight: 400 }}>
            {label}
          </label>
        ) : (
          <span />
        )}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input
              id={inputId}
              autoFocus
              value={raw}
              aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)}
              onBlur={commit}
              onKeyDown={e => e.key === 'Enter' && commit()}
              style={{
                fontSize: 14,
                fontWeight: 700,
                textAlign: suffix ? 'left' : 'right',
                background: C.white,
                border: `1.5px solid ${C.dark}`,
                borderRadius: 8,
                padding: compact ? '5px 10px' : '7px 12px',
                width: 120,
                outline: 'none',
                color: C.dark,
                fontFamily: INTER,
              }}
            />
            {suffix && (
              <span
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 13,
                  color: C.ink3,
                  pointerEvents: 'none',
                  fontWeight: 700,
                }}
              >
                {suffix}
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={() => {
              setRaw(String(value));
              setEditing(true);
            }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{
              fontSize: compact ? 13 : 14.5,
              fontWeight: 700,
              color: C.dark,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: compact ? '5px 12px' : '7px 16px',
              cursor: 'pointer',
              fontFamily: INTER,
              letterSpacing: '-0.01em',
              minWidth: compact ? 80 : 100,
              textAlign: 'center',
              transition: 'border-color 0.15s',
            }}
          >
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 22, display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            inset: 'auto 0',
            height: 4,
            borderRadius: 99,
            background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: `${pct}%`,
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: C.white,
            border: `2.5px solid ${C.dark}`,
            boxShadow: '0 2px 6px rgba(16,18,20,0.2)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
        <input
          id={rangeId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>
          {min}
          {suffix || ''}
        </span>
        <span style={{ fontSize: 11, color: C.ink3 }}>
          {max}
          {suffix || ''}
        </span>
      </div>
    </div>
  );
}

/* ── Donut Chart ───────────────────────────────────────── */
function DonutChart({
  stampDutyAmount,
  registrationAmount,
  metroCessAmount,
}: {
  stampDutyAmount: number;
  registrationAmount: number;
  metroCessAmount: number;
}) {
  const total = Math.max(1, stampDutyAmount + registrationAmount + metroCessAmount);
  const stampPct = (stampDutyAmount / total) * 100;
  const regPct = (registrationAmount / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset1 = circ - (stampPct / 100) * circ;
  const strokeDashoffset2 = circ - ((stampPct + regPct) / 100) * circ;

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Tax split: ${Math.round(stampPct)}% Stamp Duty, ${Math.round(regPct)}% Registration, ${Math.round(100 - stampPct - regPct)}% Metro Cess`}
    >
      <circle cx="50" cy="50" r={r} fill="none" stroke={CHART_PAIR.secondary} strokeWidth="16" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#50565c"
        strokeWidth="16"
        strokeDasharray={circ}
        strokeDashoffset={strokeDashoffset2}
        transform="rotate(-90 50 50)"
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth="16"
        strokeDasharray={circ}
        strokeDashoffset={strokeDashoffset1}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 0.4s ease' }}
      />
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="9" fontWeight="700" fontFamily={INTER}>
        Total Taxes
      </text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(total / 100000).toFixed(2)}L
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
          <div
            style={{
              padding: '12px 18px',
              borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
              fontSize: 13,
              color: C.ink2,
              transition: 'all 0.12s',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLElement).style.background = C.paleLime;
              (e.currentTarget as HTMLElement).style.color = C.dark;
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = C.ink2;
            }}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

function StampDutySnapshot() {
  const rows = [
    { label: 'Delhi (Female/Male)', value: '4% / 6%' },
    { label: 'Maharashtra Urban', value: '5% + 1% Metro Cess' },
    { label: 'Karnataka (Bengaluru)', value: '5% + Cess + 2% Reg' },
    { label: 'Registration Caps', value: 'MH Rs 30k / UP Rs 20k' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Key State Rates
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          style={{
            padding: '11px 16px',
            borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none',
            background: C.white,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
    { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
    { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Related Reads
        </span>
      </div>
      {links.map((l, i) => (
        <Link
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '13px 16px',
            borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none',
            textDecoration: 'none',
            background: C.white,
          }}
        >
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR_TOOLS = [
  { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
  { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
  { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/rental-yield-calculator', label: 'Rental Yield Calculator' },
  { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Coverage Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is stamp duty and why is it mandatory in India?',
    a: 'Stamp duty is a statutory state tax levied under the Indian Stamp Act, 1899, required to validate property ownership transfer and ensure legal admissibility of the conveyance deed in court.',
  },
  {
    q: 'Which state has the lowest stamp duty in India?',
    a: 'Delhi offers one of the lowest rates at 4% for female buyers, while several North-Eastern states maintain base rates around 3% to 4%.',
  },
  {
    q: 'What is the stamp duty rate in Maharashtra (Mumbai/Pune)?',
    a: 'In Maharashtra, urban areas like Mumbai and Pune charge 6% (5% stamp duty plus 1% Metro Cess) for male buyers and 5% for female buyers, with registration capped at Rs 30,000.',
  },
  {
    q: 'What is the stamp duty rate in Karnataka (Bengaluru)?',
    a: 'Karnataka charges 5% stamp duty plus 10% cess and 2% surcharge (effective 5.6%) for properties above Rs 45 Lakh, alongside a 2% registration fee.',
  },
  {
    q: 'Do women buyers get a stamp duty discount in India?',
    a: 'Yes, states like Delhi (4% vs 6%), Uttar Pradesh (1% rebate up to Rs 10,000), Haryana (5% vs 7%), and Maharashtra (1% concession for sole female ownership) provide preferential tax rebates.',
  },
  {
    q: 'Is stamp duty calculated on circle rate or market value?',
    a: 'Stamp duty is legally calculated on the higher of the actual transaction agreement value or the government circle rate (ready reckoner / guideline value).',
  },
  {
    q: 'What is the tax implication if property is sold below circle rate?',
    a: 'Under Section 50C and Section 56(2)(x) of the Income Tax Act, selling below circle rate (with tolerance beyond 10%) creates deemed taxable capital gains for the seller and deemed taxable other income for the buyer.',
  },
  {
    q: 'What is e-stamping and how is it done in India?',
    a: 'E-stamping is a secure, tamper-proof electronic payment system managed by Stock Holding Corporation of India Limited (SHCIL) to generate digital stamp duty certificates.',
  },
  {
    q: 'Can stamp duty and registration fees be included in home loans?',
    a: 'No, RBI housing finance guidelines strictly prohibit commercial banks from funding stamp duty and registration fees within the sanctioned home loan principal amount.',
  },
  {
    q: 'What is metro cess on property registration?',
    a: 'Metro cess is an additional 1% surcharge levied by state governments (such as Maharashtra and Karnataka) to fund regional mass transit and metro railway infrastructure.',
  },
  {
    q: 'How does this state-wise stamp duty calculator work?',
    a: 'This calculator selects verified state rates, factors in gender rebates and urban metro cess, applies statutory registration caps, and computes total government transaction outlay.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function StateWiseStampDutyClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'standard' | 'comparison'>('standard');

  // Input states
  const [selectedState, setSelectedState] = useState<string>('maharashtra');
  const [propertyAgreementValue, setPropertyAgreementValue] = useState<number>(7500000); // 75 Lakh
  const [genderOwnership, setGenderOwnership] = useState<'male' | 'female' | 'joint'>('male');
  const [isUrbanLocation, setIsUrbanLocation] = useState<boolean>(true);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-state-stamp-duty-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.selectedState !== undefined) setSelectedState(d.selectedState);
      if (d.propertyAgreementValue !== undefined) setPropertyAgreementValue(d.propertyAgreementValue);
      if (d.genderOwnership !== undefined) setGenderOwnership(d.genderOwnership);
      if (d.isUrbanLocation !== undefined) setIsUrbanLocation(d.isUrbanLocation);
    } catch {
      /* ignore */
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(
        'fermor-state-stamp-duty-v1',
        JSON.stringify({
          selectedState,
          propertyAgreementValue,
          genderOwnership,
          isUrbanLocation,
        })
      );
    } catch {
      /* ignore */
    }
  }, [selectedState, propertyAgreementValue, genderOwnership, isUrbanLocation]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const rateData = STATE_RATES[selectedState] || STATE_RATES.maharashtra;

    let baseStampRate = rateData.maleStamp;
    if (genderOwnership === 'female') baseStampRate = rateData.femaleStamp;
    if (genderOwnership === 'joint') baseStampRate = rateData.jointStamp;

    const stampDutyAmount = Math.round(propertyAgreementValue * (baseStampRate / 100));

    // Registration fee with statutory cap if applicable
    let regAmount = Math.round(propertyAgreementValue * (rateData.regRate / 100));
    if (rateData.regCap && regAmount > rateData.regCap) {
      regAmount = rateData.regCap;
    }

    // Metro cess (if urban and applicable)
    let metroCessRate = 0;
    if (isUrbanLocation && rateData.metroCess) {
      metroCessRate = rateData.metroCess;
    }
    const metroCessAmount = Math.round(propertyAgreementValue * (metroCessRate / 100));

    const totalStatutoryTaxes = stampDutyAmount + regAmount + metroCessAmount;
    const effectiveTaxRate = (totalStatutoryTaxes / propertyAgreementValue) * 100;
    const allInclusivePropertyPrice = propertyAgreementValue + totalStatutoryTaxes;

    return {
      rateData,
      baseStampRate,
      stampDutyAmount,
      regAmount,
      metroCessRate,
      metroCessAmount,
      totalStatutoryTaxes,
      effectiveTaxRate,
      allInclusivePropertyPrice,
    };
  }, [selectedState, propertyAgreementValue, genderOwnership, isUrbanLocation]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            State-Wise Stamp Duty Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate property stamp duty, registration charges, female buyer concessions, and metro cess across 28 Indian states.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR CARD WITH TABS ── */}
            <div
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 1px 16px rgba(16,18,20,0.06)',
                marginBottom: 36,
              }}
            >
              {/* Tabs at top of card */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button
                  id="tab-standard"
                  role="tab"
                  aria-selected={activeTab === 'standard'}
                  aria-controls="panel-standard"
                  onClick={() => setActiveTab('standard')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'standard' ? 700 : 400,
                    color: activeTab === 'standard' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'standard' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  State Stamp Duty Breakdown
                </button>
                <button
                  id="tab-comparison"
                  role="tab"
                  aria-selected={activeTab === 'comparison'}
                  aria-controls="panel-comparison"
                  onClick={() => setActiveTab('comparison')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'comparison' ? 700 : 400,
                    color: activeTab === 'comparison' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'comparison' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  All-Inclusive Acquisition Outlay
                </button>
              </div>

              {/* Tab Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input Panel */}
                <div
                  style={{
                    padding: mobile ? '20px 18px' : '32px 36px',
                    borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                    borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                      Transaction Parameters
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {/* State Selector Dropdown */}
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="state-select" style={{ display: 'block', fontSize: 13.5, color: C.ink2, marginBottom: 8 }}>
                      Select State / Jurisdiction
                    </label>
                    <select
                      id="state-select"
                      value={selectedState}
                      onChange={e => setSelectedState(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: 8,
                        border: `1px solid ${C.border}`,
                        fontSize: 13.5,
                        fontFamily: INTER,
                        color: C.dark,
                        background: C.white,
                        outline: 'none',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {Object.entries(STATE_RATES).map(([key, item]) => (
                        <option key={key} value={key}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Slider
                    id="prop-agree-val"
                    label="Property Agreement Value"
                    value={propertyAgreementValue}
                    min={1000000}
                    max={50000000}
                    step={250000}
                    display={fmtC(propertyAgreementValue)}
                    onChange={setPropertyAgreementValue}
                    compact
                  />

                  {/* Buyer Gender Ownership */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 13.5, color: C.ink2 }}>Buyer Ownership</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                        {genderOwnership === 'female' ? 'Female (Rebate)' : genderOwnership === 'joint' ? 'Joint' : 'Male'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(['male', 'female', 'joint'] as const).map(g => (
                        <button
                          key={g}
                          onClick={() => setGenderOwnership(g)}
                          style={{
                            flex: 1,
                            padding: '7px 0',
                            border: 'none',
                            background: genderOwnership === g ? C.white : 'transparent',
                            color: genderOwnership === g ? C.ink : C.ink3,
                            fontWeight: genderOwnership === g ? 700 : 400,
                            cursor: 'pointer',
                            fontFamily: INTER,
                            fontSize: 12.5,
                            transition: 'all 0.15s',
                          }}
                        >
                          {g === 'female' ? 'Female' : g === 'joint' ? 'Joint' : 'Male'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Urban vs Rural Location */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 13.5, color: C.ink2 }}>Location Zone</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                        {isUrbanLocation ? 'Urban / Municipal (Cess)' : 'Gram Panchayat / Rural'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {[
                        { val: true, label: 'Urban / Municipal' },
                        { val: false, label: 'Rural / Panchayat' },
                      ].map(loc => (
                        <button
                          key={loc.label}
                          onClick={() => setIsUrbanLocation(loc.val)}
                          style={{
                            flex: 1,
                            padding: '7px 0',
                            border: 'none',
                            background: isUrbanLocation === loc.val ? C.white : 'transparent',
                            color: isUrbanLocation === loc.val ? C.ink : C.ink3,
                            fontWeight: isUrbanLocation === loc.val ? 700 : 400,
                            cursor: 'pointer',
                            fontFamily: INTER,
                            fontSize: 12.5,
                            transition: 'all 0.15s',
                          }}
                        >
                          {loc.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 14 : 18 }}>
                    <DonutChart
                      stampDutyAmount={calculations.stampDutyAmount}
                      registrationAmount={calculations.regAmount}
                      metroCessAmount={calculations.metroCessAmount}
                    />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Stamp Duty</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Registration</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Metro Cess</span>
                    </div>
                  </div>

                  {/* Primary result box */}
                  <div
                    style={{
                      width: '100%',
                      background: '#F4F5F6', border: '1px solid #E3E6E8',
                      borderRadius: 12,
                      padding: mobile ? '14px 16px' : '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#50565C' }}>
                        {activeTab === 'standard' ? 'Total Stamp Duty & Registration' : 'All-Inclusive Acquisition Outlay'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        Effective Tax Rate: {calculations.effectiveTaxRate.toFixed(2)}%
                      </div>
                    </div>
                    <span
                      aria-live="polite"
                      aria-label={`Total Taxes: ${fmtIN(calculations.totalStatutoryTaxes)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {activeTab === 'standard' ? fmtIN(calculations.totalStatutoryTaxes) : fmtC(calculations.allInclusivePropertyPrice)}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: `Stamp Duty (${calculations.baseStampRate}%)`, value: fmtIN(calculations.stampDutyAmount) },
                    {
                      label: `Registration Fee (${calculations.rateData.regRate}%${calculations.rateData.regCap ? ' Capped' : ''})`,
                      value: fmtIN(calculations.regAmount),
                    },
                    { label: `Metro / Infrastructure Cess (${calculations.metroCessRate}%)`, value: fmtIN(calculations.metroCessAmount) },
                    { label: 'Property Agreement Value', value: fmtC(propertyAgreementValue) },
                    { label: 'All-Inclusive Total Outlay', value: fmtC(calculations.allInclusivePropertyPrice) },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 0',
                        borderBottom: `1px solid ${C.border}`,
                        width: '100%',
                      }}
                    >
                      <span style={{ fontSize: 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waitlist Card */}
            <div style={{ marginBottom: 24 }}>
              <SaveResultsCard mobile={mobile} />
            </div>

            

            {/* ════════════════════ ARTICLE CONTENT ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={secS} id="what-is-stamp-duty">
                <h2 style={h2S}>What Is Stamp Duty and Registration in India?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Stamp duty is a statutory ad-valorem tax levied under the Indian Stamp Act, 1899, that legalizes property ownership transfer deeds and guarantees admissibility as legal evidence in Indian courts.
                  </p>
                </div>
                <p style={pS}>
                  Registration charges are statutory service fees collected by state revenue departments under the Registration Act, 1908, to record property conveyance deeds in official land registries and prevent fraudulent multi-party transactions.
                </p>
                <p style={pS}>
                  Plan your overall cash flow requirements for property buying using the{' '}
                  <Link href="/calculators/home-buying-total-cost-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Buying Total Cost Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="state-wise-rates">
                <h2 style={h2S}>State-Wise Stamp Duty and Registration Rates in India</h2>
                <p style={pS}>
                  Under the Seventh Schedule of the Indian Constitution, land and property taxation fall under State List purview, resulting in substantial rate divergence across jurisdictions:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Maharashtra (Mumbai &amp; Pune):</strong> 5% base stamp duty plus 1% Metro Cess in urban corporations (6% total for male buyers, 5% for female buyers). Property registration is capped at Rs 30,000.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Karnataka (Bengaluru):</strong> 5% stamp duty plus 10% statutory cess and 2% infrastructure surcharge (effective 5.6% stamp duty) on properties above Rs 45 Lakh, alongside a flat 2% uncapped registration fee.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Delhi NCR:</strong> 6% for male buyers and 4% for female buyers (5% for joint ownership), with a 1% registration fee.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Tamil Nadu (Chennai):</strong> 7% stamp duty plus 2% registration fee (combined 9% statutory levy).
                  </li>
                </ul>
              </div>

              <div style={secS} id="gender-and-urban-rebates">
                <h2 style={h2S}>Gender Concessions and Urban/Rural Surcharges</h2>
                <p style={pS}>
                  To encourage female property ownership, numerous state governments offer statutory stamp duty concessions of 1% to 2% when a residential property is registered solely in a woman&#39;s name or held jointly:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Delhi Rebate:</strong> Women save 2% on stamp duty (4% vs 6% for men), saving Rs 2,00,000 on an Rs 1 Crore flat.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Haryana Rebate:</strong> Women pay 5% in urban areas (vs 7% for men) and 3% in rural areas (vs 5% for men).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Uttar Pradesh Concession:</strong> 1% rebate on property valuation up to Rs 10,00,000 (maximum concession of Rs 10,000).
                  </li>
                </ul>
              </div>

              {/* In-Content Promo Bar */}
              <div
                style={{
                  margin: '28px 0 32px',
                  background: C.paleLime,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 4px', fontFamily: INTER }}>
                    Accumulate Down Payment Faster
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Calculate how monthly step-up SIPs and EPF withdrawals can bridge your down payment and stamp duty cash gap.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/down-payment-planner-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    background: '#E9ECEE', border: '1px solid #D3D7DA',
                    color: '#101214',
                    padding: '10px 20px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontFamily: INTER,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Open calculator
                </Link>
              </div>

              <div style={secS} id="ready-reckoner-vs-agreement">
                <h2 style={h2S}>Circle Rate vs Market Agreement Value: Section 56(2)(x) &amp; 50C</h2>
                <p style={pS}>
                  Stamp duty is legally assessed on the higher of the transaction agreement value or the state government&#39;s circle rate (ready reckoner / guideline rate).
                </p>
                <p style={pS}>
                  Under Section 50C and Section 56(2)(x) of the Income Tax Act, 1961, if the actual transaction value is lower than the circle rate by more than 10%, punitive tax consequences trigger for both parties:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Seller Tax Penalty (Section 50C):</strong> The seller&#39;s capital gains tax is recalculated using the higher circle rate as deemed full value of consideration.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Buyer Tax Penalty (Section 56(2)(x)):</strong> The difference between circle rate and purchase price is treated as deemed &#34;Income from Other Sources&#34; and taxed at the buyer&#39;s slab rate.
                  </li>
                </ul>
              </div>

              <div style={secS} id="e-stamping-and-payment">
                <h2 style={h2S}>E-Stamping and Digital Registration Process</h2>
                <p style={pS}>
                  Property registration in India has transitioned to digital e-stamping managed by Stock Holding Corporation of India Limited (SHCIL) and state revenue portals (such as IGR Maharashtra, Kaveri 2.0 Karnataka, and IGRS Telangana).
                </p>
                <p style={pS}>
                  Buyers generate a Digital Stamp Duty Certificate online via net banking, RTGS, or authorized bank branches, eliminating physical stamp paper forgery. The e-stamp certificate contains a unique 16-digit Certificate Identification Number (CIN) and verifiable QR code scanned at the Sub-Registrar Office (SRO) during biometric execution.
                </p>
              </div>

              <div style={secS} id="state-comparison-table">
                <h2 style={h2S}>28 States &amp; UTs Stamp Duty Benchmark Matrix</h2>
                <p style={pS}>
                  The table below compares stamp duty, registration fees, and female rebates across key Indian states for an Rs 80 Lakh residential property:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Comparison of stamp duty and registration outlays across Indian states on Rs 80 Lakh property.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>State / Region</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Male Duty %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Female Duty %</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Registration</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Tax (Rs 80L)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Maharashtra (Urban)</td>
                        <td style={tdR}>6.0% (incl. cess)</td>
                        <td style={tdR}>5.0%</td>
                        <td style={tdR}>Rs 30,000 (Capped)</td>
                        <td style={tdR}>Rs 5,10,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Karnataka (Bengaluru)</td>
                        <td style={tdR}>5.6% (incl. cess)</td>
                        <td style={tdR}>5.6%</td>
                        <td style={tdR}>2.0% (Uncapped)</td>
                        <td style={tdR}>Rs 6,08,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Delhi NCR</td>
                        <td style={tdR}>6.0%</td>
                        <td style={tdR}>4.0%</td>
                        <td style={tdR}>1.0%</td>
                        <td style={tdR}>Rs 5,60,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Tamil Nadu (Chennai)</td>
                        <td style={tdR}>7.0%</td>
                        <td style={tdR}>7.0%</td>
                        <td style={tdR}>2.0%</td>
                        <td style={tdR}>Rs 7,20,000</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Telangana (Hyderabad)</td>
                        <td style={tdR}>7.5% (incl. cess)</td>
                        <td style={tdR}>7.5%</td>
                        <td style={tdR}>0.5%</td>
                        <td style={tdR}>Rs 6,40,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Uttar Pradesh (Noida)</td>
                        <td style={tdR}>7.0%</td>
                        <td style={tdR}>6.0%</td>
                        <td style={tdR}>Rs 20,000 (Capped)</td>
                        <td style={tdR}>Rs 5,80,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Calculate your ongoing property maintenance expenses with the{' '}
                  <Link href="/calculators/annual-home-maintenance-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Annual Home Maintenance Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This State-Wise Stamp Duty Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Your State:</strong> Choose your property&#39;s jurisdiction from the dropdown list.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Property Value:</strong> Input agreed sale deed consideration or circle rate value.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Buyer Gender &amp; Location:</strong> Choose Male, Female, or Joint ownership and urban/rural classification.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Tax Breakdown:</strong> View exact stamp duty, registration fee, metro cess, and all-inclusive outlay.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Stamp duty rates and registration fee caps are compiled from official state revenue notifications and are subject to periodic state budget revisions. Consult an advocate or local sub-registrar office before executing property deeds.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .swsd-sidebar::-webkit-scrollbar { width: 5px; }
            .swsd-sidebar::-webkit-scrollbar-track { background: transparent; }
            .swsd-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .swsd-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="swsd-sidebar"
            style={
              {
                position: mobile ? 'static' : 'sticky',
                top: 20,
                alignSelf: 'start',
                maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
                overflowY: mobile ? 'visible' : 'auto',
                paddingRight: mobile ? 0 : 2,
                scrollbarWidth: 'thin',
                scrollbarColor: '#C4C9C4 transparent',
              } as React.CSSProperties
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><AdsterraBanner /></div>
              <div style={{ flexShrink: 0 }}><StampDutySnapshot /></div>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
                <SidebarList title="Popular Property Tools" items={POPULAR_TOOLS} />
                <SidebarList title="More Financial Calculators" items={MORE_TOOLS} />
              </nav>
              <div style={{ flexShrink: 0 }}><RelatedReads /></div>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/home-buying-total-cost-calculator|Total House Cost', '/calculators/down-payment-planner-calculator|Down Payment Planner', '/calculators/annual-home-maintenance-calculator|Home Maintenance', '/calculators/home-equity-calculator|Home Equity', '/calculators/rental-yield-calculator|Rental Yield', '/calculators/home-insurance-coverage-calculator|Home Insurance', ], },
        { hd: 'Topics', links: ['/#|Stamp Duty Rates', '/#|Property Registration', '/#|Circle Rates', '/#|Metro Cess'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

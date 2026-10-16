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
function DonutChart({ societyFee, repairReserve, sinkingReserve }: { societyFee: number; repairReserve: number; sinkingReserve: number }) {
  const total = Math.max(1, societyFee + repairReserve + sinkingReserve);
  const societyPct = (societyFee / total) * 100;
  const repairPct = (repairReserve / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset1 = circ - (societyPct / 100) * circ;
  const strokeDashoffset2 = circ - ((societyPct + repairPct) / 100) * circ;

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Maintenance budget split: ${Math.round(societyPct)}% Society Fees, ${Math.round(repairPct)}% Routine Repairs, ${Math.round(100 - societyPct - repairPct)}% Sinking Fund and Insurance`}
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
      <text x="50" y="46" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={INTER}>
        Annual Budget
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

function MaintenanceSnapshot() {
  const rows = [
    { label: 'The 1% Rule Benchmark', value: '1% of Value / Year' },
    { label: 'Basic Society Charge', value: 'Rs 3.50 / Sq Ft / Mo' },
    { label: 'Luxury Society Charge', value: 'Rs 8.50 / Sq Ft / Mo' },
    { label: 'Sinking Fund Reserve', value: '0.25% Construction/Yr' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Upkeep Benchmarks
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
    { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
    { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Coverage Calculator' },
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
  { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
  { href: '/calculators/home-insurance-coverage-calculator', label: 'Home Insurance Coverage Calculator' },
  { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
  { href: '/calculators/rental-yield-calculator', label: 'Rental Yield Calculator' },
  { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
];
const MORE_TOOLS = [
  { href: '/calculators/sip-calculator', label: 'SIP Calculator' },
  { href: '/calculators/step-up-sip-calculator', label: 'Step-Up SIP Calculator' },
  { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is the 1% rule of annual home maintenance?',
    a: 'The 1% rule states that homeowners should budget approximately 1% of their property purchase value each year for ongoing repairs, painting, routine servicing, and structural maintenance.',
  },
  {
    q: 'How much does housing society maintenance cost per sq ft in Indian cities?',
    a: 'Apartment society maintenance charges range from Rs 2.50 to Rs 4.50 per sq ft per month for basic societies, and Rs 5.00 to Rs 12.00 per sq ft per month for luxury gated societies with clubhouses and swimming pools.',
  },
  {
    q: 'What is a sinking fund in housing society maintenance bill?',
    a: 'A sinking fund is a mandatory reserve collected by cooperative housing societies (minimum 0.25% of flat construction cost per year) for major long-term repairs like building repainting, lift replacement, and structural waterproofing.',
  },
  {
    q: 'How often should an Indian home be repainted?',
    a: 'Exterior building repainting is conducted every 5 to 7 years, while interior repainting is typically done every 4 to 6 years, costing between Rs 15 to Rs 40 per sq ft of wall area.',
  },
  {
    q: 'Are society maintenance charges subject to GST in India?',
    a: 'Yes, if monthly maintenance charges collected by a RWA or housing society exceed Rs 7,500 per flat per month and the society annual turnover exceeds Rs 20 Lakh, GST is applicable at 18% on the entire maintenance bill.',
  },
  {
    q: 'Do independent houses cost more to maintain than apartments?',
    a: 'Yes, independent houses and villas require 1.5% to 2% of property value per year because structural repairs, roof waterproofing, water tank cleaning, and security are paid entirely by the individual owner.',
  },
  {
    q: 'How much emergency maintenance fund should a homeowner keep?',
    a: 'Financial planners recommend keeping an emergency home repair reserve equal to at least 1 year of total maintenance budget (typically Rs 50,000 to Rs 1.5 Lakh).',
  },
  {
    q: 'Is home insurance included in annual maintenance budget?',
    a: 'Yes, comprehensive home insurance (Bharat Griha Raksha policy) costs approx Rs 2,500 to Rs 6,000 per year for a Rs 1 Crore property covering structure and contents.',
  },
  {
    q: 'How to calculate monthly home maintenance reserve needed?',
    a: 'Monthly Maintenance Reserve = (Society Charges + Routine Repairs + Annual Insurance + Sinking Fund Reserve) / 12.',
  },
  {
    q: 'What is the square footage rule for home maintenance?',
    a: 'The square footage rule suggests saving Rs 15 to Rs 30 per square foot of built-up area annually for routine home repairs and preventative servicing in Indian residential properties.',
  },
  {
    q: 'How does building age affect home maintenance expenses?',
    a: 'Properties under 5 years old require standard maintenance (1.0x multiplier), buildings between 5 and 15 years require 1.25x upkeep due to appliance and plumbing wear, while buildings over 15 years old need 1.5x to 2.0x for major structural and pipeline retrofits.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function AnnualHomeMaintenanceClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'monthly' | 'annual'>('monthly');

  // Input states
  const [propertyValue, setPropertyValue] = useState<number>(10000000); // 1 Crore
  const [builtUpArea, setBuiltUpArea] = useState<number>(1400); // 1400 sq ft
  const [propertyType, setPropertyType] = useState<'apartment' | 'villa'>('apartment');
  const [amenityLevel, setAmenityLevel] = useState<'basic' | 'luxury'>('basic'); // Rs 3.5 vs Rs 7.5 per sq ft
  const [buildingAgeCategory, setBuildingAgeCategory] = useState<'new' | 'mid' | 'old'>('new');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-annual-home-maintenance-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.propertyValue !== undefined) setPropertyValue(d.propertyValue);
      if (d.builtUpArea !== undefined) setBuiltUpArea(d.builtUpArea);
      if (d.propertyType !== undefined) setPropertyType(d.propertyType);
      if (d.amenityLevel !== undefined) setAmenityLevel(d.amenityLevel);
      if (d.buildingAgeCategory !== undefined) setBuildingAgeCategory(d.buildingAgeCategory);
    } catch {
      /* ignore */
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(
        'fermor-annual-home-maintenance-v1',
        JSON.stringify({
          propertyValue,
          builtUpArea,
          propertyType,
          amenityLevel,
          buildingAgeCategory,
        })
      );
    } catch {
      /* ignore */
    }
  }, [propertyValue, builtUpArea, propertyType, amenityLevel, buildingAgeCategory]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const ageMultiplier = buildingAgeCategory === 'new' ? 1.0 : buildingAgeCategory === 'mid' ? 1.25 : 1.5;
    const sqFtRate = propertyType === 'apartment' ? (amenityLevel === 'basic' ? 3.5 : 7.5) : 8.0;

    // Monthly society maintenance charges = Area * sqFtRate
    const monthlySocietyFee = Math.round(builtUpArea * sqFtRate);
    const annualSocietyFee = monthlySocietyFee * 12;

    // Routine internal plumbing/electrical repairs = 0.35% of property value * ageMultiplier
    const annualRoutineRepairs = Math.round(propertyValue * 0.0035 * ageMultiplier);

    // Sinking fund for painting/structural = 0.25% of property value per year
    const annualSinkingReserve = Math.round(propertyValue * 0.0025);

    // Home insurance premium (approx Rs 3,500 for 1 Cr property)
    const annualInsurancePremium = Math.round(Math.max(2500, propertyValue * 0.00035));

    const totalAnnualMaintenance = annualSocietyFee + annualRoutineRepairs + annualSinkingReserve + annualInsurancePremium;
    const totalMonthlyReserveNeeded = Math.round(totalAnnualMaintenance / 12);

    const percentageOfPropertyValue = (totalAnnualMaintenance / propertyValue) * 100;

    return {
      sqFtRate,
      monthlySocietyFee,
      annualSocietyFee,
      annualRoutineRepairs,
      annualSinkingReserve,
      annualInsurancePremium,
      totalAnnualMaintenance,
      totalMonthlyReserveNeeded,
      percentageOfPropertyValue,
    };
  }, [propertyValue, builtUpArea, propertyType, amenityLevel, buildingAgeCategory]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Annual Home Maintenance Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate housing society maintenance fees, 1% property value upkeep reserves, sinking funds, and monthly home maintenance budget in India.
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
                  id="tab-monthly"
                  role="tab"
                  aria-selected={activeTab === 'monthly'}
                  aria-controls="panel-monthly"
                  onClick={() => setActiveTab('monthly')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'monthly' ? 700 : 400,
                    color: activeTab === 'monthly' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'monthly' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Monthly Reserve Fund Needed
                </button>
                <button
                  id="tab-annual"
                  role="tab"
                  aria-selected={activeTab === 'annual'}
                  aria-controls="panel-annual"
                  onClick={() => setActiveTab('annual')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'annual' ? 700 : 400,
                    color: activeTab === 'annual' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'annual' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Total Annual Upkeep Budget
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
                      Property Upkeep Inputs
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider
                        id="property-val"
                        label="Property Purchase Value"
                        value={propertyValue}
                        min={2000000}
                        max={50000000}
                        step={500000}
                        display={fmtC(propertyValue)}
                        onChange={setPropertyValue}
                        compact
                      />

                      <Slider
                        id="builtup-area-maint"
                        label="Built-Up Area (Sq Ft)"
                        value={builtUpArea}
                        min={500}
                        max={4000}
                        step={50}
                        display={`${builtUpArea} sq ft`}
                        onChange={setBuiltUpArea}
                        compact
                        suffix=" sq ft"
                      />

                      {/* Property Type Toggle */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>Property Type</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                            {propertyType === 'apartment' ? 'Apartment Flat' : 'Independent Villa'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['apartment', 'villa'] as const).map(t => (
                            <button
                              key={t}
                              onClick={() => setPropertyType(t)}
                              style={{
                                flex: 1,
                                padding: '7px 0',
                                border: 'none',
                                background: propertyType === t ? C.white : 'transparent',
                                color: propertyType === t ? C.ink : C.ink3,
                                fontWeight: propertyType === t ? 700 : 400,
                                cursor: 'pointer',
                                fontFamily: INTER,
                                fontSize: 12.5,
                                transition: 'all 0.15s',
                              }}
                            >
                              {t === 'apartment' ? 'Apartment' : 'Independent Villa'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button
                          onClick={() => setShowAdvanced(true)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 13,
                            color: C.dark,
                            background: 'none',
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            padding: '7px 14px',
                            cursor: 'pointer',
                            fontFamily: INTER,
                            fontWeight: 600,
                          }}
                        >
                          Amenities &amp; Age
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Amenity Level */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>Society Amenity Level</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                            {amenityLevel === 'basic' ? 'Standard Society' : 'Luxury Gated (Clubhouse)'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['basic', 'luxury'] as const).map(l => (
                            <button
                              key={l}
                              onClick={() => setAmenityLevel(l)}
                              style={{
                                flex: 1,
                                padding: '7px 0',
                                border: 'none',
                                background: amenityLevel === l ? C.white : 'transparent',
                                color: amenityLevel === l ? C.ink : C.ink3,
                                fontWeight: amenityLevel === l ? 700 : 400,
                                cursor: 'pointer',
                                fontFamily: INTER,
                                fontSize: 12.5,
                                transition: 'all 0.15s',
                              }}
                            >
                              {l === 'basic' ? 'Standard (Rs 3.5/sqft)' : 'Luxury (Rs 7.5/sqft)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Building Age Group */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontSize: 13.5, color: C.ink2 }}>Building Age</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                            {buildingAgeCategory === 'new' ? 'Under 5 Yrs (1.0x)' : buildingAgeCategory === 'mid' ? '5-15 Yrs (1.25x)' : '15+ Yrs (1.5x)'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['new', 'mid', 'old'] as const).map(a => (
                            <button
                              key={a}
                              onClick={() => setBuildingAgeCategory(a)}
                              style={{
                                flex: 1,
                                padding: '7px 0',
                                border: 'none',
                                background: buildingAgeCategory === a ? C.white : 'transparent',
                                color: buildingAgeCategory === a ? C.ink : C.ink3,
                                fontWeight: buildingAgeCategory === a ? 700 : 400,
                                cursor: 'pointer',
                                fontFamily: INTER,
                                fontSize: 12.5,
                                transition: 'all 0.15s',
                              }}
                            >
                              {a === 'new' ? '< 5 Yrs' : a === 'mid' ? '5-15 Yrs' : '15+ Yrs'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                        <button
                          onClick={() => setShowAdvanced(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            fontSize: 13,
                            color: C.dark,
                            background: 'none',
                            border: `1px solid ${C.border}`,
                            borderRadius: 8,
                            padding: '7px 14px',
                            cursor: 'pointer',
                            fontFamily: INTER,
                            fontWeight: 600,
                          }}
                        >
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                          Basic
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Output Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut Chart */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 14 : 18 }}>
                    <DonutChart
                      societyFee={calculations.annualSocietyFee}
                      repairReserve={calculations.annualRoutineRepairs}
                      sinkingReserve={calculations.annualSinkingReserve + calculations.annualInsurancePremium}
                    />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Society Bill</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Routine Repairs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Sinking Fund &amp; Ins.</span>
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
                        {activeTab === 'monthly' ? 'Recommended Monthly Reserve SIP' : 'Total Annual Maintenance Budget'}
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        {calculations.percentageOfPropertyValue.toFixed(2)}% of Property Value / Year
                      </div>
                    </div>
                    <span
                      aria-live="polite"
                      aria-label={
                        activeTab === 'monthly'
                          ? `Monthly Reserve Needed: ${fmtIN(calculations.totalMonthlyReserveNeeded)}`
                          : `Total Annual Budget: ${fmtIN(calculations.totalAnnualMaintenance)}`
                      }
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {activeTab === 'monthly' ? `${fmtIN(calculations.totalMonthlyReserveNeeded)}/mo` : `${fmtIN(calculations.totalAnnualMaintenance)}/yr`}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Monthly Society Maintenance Bill', value: fmtIN(calculations.monthlySocietyFee) },
                    { label: 'Annual Society Maintenance (12x)', value: fmtIN(calculations.annualSocietyFee) },
                    { label: 'Annual Routine Internal Repairs', value: fmtIN(calculations.annualRoutineRepairs) },
                    { label: 'Annual Sinking & Painting Reserve', value: fmtIN(calculations.annualSinkingReserve) },
                    { label: 'Annual Home Insurance Premium', value: fmtIN(calculations.annualInsurancePremium) },
                    { label: 'Recommended Emergency Fund', value: fmtC(calculations.totalAnnualMaintenance) },
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
              <div style={secS} id="what-is-home-maintenance">
                <h2 style={h2S}>What Is Home Maintenance Planning?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Home maintenance planning is the financial practice of allocating a dedicated monthly reserve fund (typically 1% of property value per year) to absorb routine servicing, statutory society charges, structural sinking reserves, and periodic building painting.
                  </p>
                </div>
                <p style={pS}>
                  Most home buyers calculate their monthly budget around loan EMIs, overlooking that real estate requires continuous capital investment to preserve its structural integrity and market valuation. Over a 10-year holding period, unfunded repairs lead to cashflow disruptions when major expenses like elevator replacement, exterior waterproofing, or diesel generator overhauls arise.
                </p>
                <p style={pS}>
                  Setting up a disciplined automated reserve through a short-term liquid fund or recurring deposit protects your family emergency corpus. Calculate your overall acquisition budget with the{' '}
                  <Link href="/calculators/home-buying-total-cost-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Buying Total Cost Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="one-percent-rule">
                <h2 style={h2S}>The 1% vs 2% Property Maintenance Rule</h2>
                <p style={pS}>
                  The 1% rule provides an accurate annual benchmark for apartments in cooperative housing societies, whereas independent houses and villas demand 1.5% to 2% of property value per year.
                </p>
                <p style={pS}>
                  In multi-storey apartments, common infrastructure costs such as security guards, common lighting, lift maintenance contracts, and perimeter security are shared across all flat owners. Conversely, an independent villa owner bears 100% of the cost for private water sumps, roof waterproofing, exterior parapet repairs, and dedicated security systems.
                </p>
                <p style={pS}>
                  Property age acts as an escalation factor. Newly constructed buildings under 5 years require standard routine servicing. Properties aged 5 to 15 years experience pipe corrosion, seal degradation, and electrical wear (1.25x multiplier), while structures older than 15 years require structural audits and masonry restoration (1.5x multiplier).
                </p>
              </div>

              <div style={secS} id="society-maintenance-methods">
                <h2 style={h2S}>Housing Society Maintenance Calculation Methods</h2>
                <p style={pS}>
                  Resident Welfare Associations (RWAs) and Cooperative Housing Societies across India utilize three primary methods to bill monthly maintenance fees to flat owners:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Per Square Foot Rate:</strong> The society charges a fixed rate per square foot of super built-up area (e.g. Rs 4.50 per sq ft per month). A 1,000 sq ft flat pays Rs 4,500, while a 2,000 sq ft unit pays Rs 9,000.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Equal Flat Fee:</strong> All flats pay an identical monthly amount regardless of unit size, common in smaller standalone apartment complexes with uniform amenities.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Hybrid Billing Model:</strong> Common operational expenses (security guards, lift maintenance, common area lighting) are divided equally, while sinking funds, water consumption, and repair reserves are billed per square foot.
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
                    Protect Your Home With Insurance
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Calculate rebuilding costs and contents sum insured under standard Bharat Griha Raksha policies.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/home-insurance-coverage-calculator"
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

              <div style={secS} id="sinking-fund-regulations">
                <h2 style={h2S}>Sinking Fund and Building Painting Reserve Norms</h2>
                <p style={pS}>
                  Under state cooperative housing laws such as the Maharashtra Cooperative Societies Act, 1960 and the Karnataka Apartment Ownership Act, societies must maintain a dedicated Sinking Fund.
                </p>
                <p style={pS}>
                  The statutory minimum sinking fund contribution is 0.25% of the construction cost of the flat (excluding land value) per annum. This fund is ring-fenced in long-term fixed deposits and can only be utilized for major structural rehabilitations, elevator replacement, and mandatory exterior painting cycles every 5 to 7 years.
                </p>
                <p style={pS}>
                  Evaluate how ongoing upkeep impacts your property rental cash flows with the{' '}
                  <Link href="/calculators/rental-yield-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Rental Yield Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="gst-on-maintenance">
                <h2 style={h2S}>GST on Housing Society Maintenance Bills</h2>
                <p style={pS}>
                  Under CBIC guidelines, housing society maintenance charges are exempt from Goods and Services Tax (GST) if the monthly bill does not exceed Rs 7,500 per member per month.
                </p>
                <p style={pS}>
                  If the monthly charge exceeds Rs 7,500 per member and the total annual turnover of the RWA exceeds Rs 20 Lakh, GST is levied at 18% on the entire maintenance amount (not just on the incremental portion above Rs 7,500). Statutory municipal taxes, property taxes, and stamp duty paid on behalf of members are excluded from the GST calculation threshold.
                </p>
              </div>

              <div style={secS} id="maintenance-breakdown-table">
                <h2 style={h2S}>Annual Home Maintenance Cost Breakdown</h2>
                <p style={pS}>
                  The table below illustrates realistic annual maintenance allocations across typical Indian residential property configurations:
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Estimated annual upkeep budget for standard Indian residential properties.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Property Configuration</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Property Value</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly Society Bill</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Annual Repair Reserve</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Total Annual Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>2 BHK Standard Apartment (1,000 sq ft)</td>
                        <td style={tdR}>Rs 65,00,000</td>
                        <td style={tdR}>Rs 3,500/mo</td>
                        <td style={tdR}>Rs 22,750</td>
                        <td style={tdR}>Rs 79,250</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>3 BHK Gated Society (1,600 sq ft)</td>
                        <td style={tdR}>Rs 1,40,00,000</td>
                        <td style={tdR}>Rs 8,000/mo</td>
                        <td style={tdR}>Rs 49,000</td>
                        <td style={tdR}>Rs 1,68,500</td>
                      </tr>
                      <tr>
                        <td style={tdL}>4 BHK Luxury Penthouse (2,800 sq ft)</td>
                        <td style={tdR}>Rs 3,00,00,000</td>
                        <td style={tdR}>Rs 21,000/mo</td>
                        <td style={tdR}>Rs 1,05,000</td>
                        <td style={tdR}>Rs 3,92,000</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Independent 3BHK Villa (2,400 sq ft)</td>
                        <td style={tdR}>Rs 2,20,00,000</td>
                        <td style={tdR}>Rs 6,000/mo</td>
                        <td style={tdR}>Rs 1,54,000</td>
                        <td style={tdR}>Rs 2,58,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Plan your home loan equity and borrowing limits using the{' '}
                  <Link href="/calculators/home-equity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Equity Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Annual Home Maintenance Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Property Purchase Value:</strong> Input your property market price or initial agreement valuation.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Built-Up Area:</strong> Input total covered area in square feet.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Property Type and Amenities:</strong> Choose Apartment or Independent Villa, and select Standard vs Luxury society amenities.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Maintenance Reserve:</strong> Examine your recommended monthly reserve SIP to automate home upkeep savings.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Home maintenance estimates are based on standard Indian real estate benchmarks (1% rule and RWA society norms). Actual society maintenance bills vary according to individual society bye-laws and managing committee resolutions.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .ahm-sidebar::-webkit-scrollbar { width: 5px; }
            .ahm-sidebar::-webkit-scrollbar-track { background: transparent; }
            .ahm-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .ahm-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="ahm-sidebar"
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
              <div style={{ flexShrink: 0 }}><MaintenanceSnapshot /></div>
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
              {
                hd: 'Calculators',
                links: [
                  '/calculators/home-buying-total-cost-calculator|Total House Cost',
                  '/calculators/down-payment-planner-calculator|Down Payment Planner',
                  '/calculators/home-equity-calculator|Home Equity',
                  '/calculators/home-insurance-coverage-calculator|Home Insurance',
                  '/calculators/rental-yield-calculator|Rental Yield',
                  '/calculators/state-wise-stamp-duty-calculator|Stamp Duty',
                ],
              },
              { hd: 'Topics', links: ['/#|Home Maintenance', '/#|1% Upkeep Rule', '/#|Society Charges', '/#|Sinking Fund'] },
              { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
            ])} />
    </div>
  );
}

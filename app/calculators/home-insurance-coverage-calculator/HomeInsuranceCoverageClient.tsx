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
function DonutChart({
  structureCover,
  contentsCover,
  valuablesCover,
}: {
  structureCover: number;
  contentsCover: number;
  valuablesCover: number;
}) {
  const total = Math.max(1, structureCover + contentsCover + valuablesCover);
  const structPct = (structureCover / total) * 100;
  const contPct = (contentsCover / total) * 100;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset1 = circ - (structPct / 100) * circ;
  const strokeDashoffset2 = circ - ((structPct + contPct) / 100) * circ;

  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Coverage split: ${Math.round(structPct)}% Building Structure, ${Math.round(contPct)}% Household Contents, ${Math.round(100 - structPct - contPct)}% Valuables & Jewellery`}
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
        Sum Insured
      </text>
      <text x="50" y="60" textAnchor="middle" fill={C.dark} fontSize="10" fontWeight="800" fontFamily={INTER}>
        Rs {(total / 100000).toFixed(1)}L
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

function InsuranceSnapshot() {
  const rows = [
    { label: 'Policy Standard', value: 'Bharat Griha Raksha' },
    { label: 'Perils Covered Inbuilt', value: '14 Perils (Fire/Flood)' },
    { label: 'Standard Premium Rate', value: 'Rs 25 - Rs 45 per Lakh' },
    { label: 'GST on General Insurance', value: '18% Standard' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
          Insurance Norms
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
    { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
    { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
    { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator' },
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
  { href: '/calculators/annual-home-maintenance-calculator', label: 'Annual Home Maintenance Calculator' },
  { href: '/calculators/home-buying-total-cost-calculator', label: 'Home Buying Total Cost Calculator' },
  { href: '/calculators/home-equity-calculator', label: 'Home Equity Calculator' },
  { href: '/calculators/term-insurance-calculator', label: 'Term Insurance Calculator' },
  { href: '/calculators/down-payment-planner-calculator', label: 'Down Payment Planner Calculator' },
  { href: '/calculators/state-wise-stamp-duty-calculator', label: 'State-Wise Stamp Duty Calculator' },
  { href: '/calculators/rental-yield-calculator', label: 'Rental Yield Calculator' },
];
const MORE_TOOLS = [
  { href: '/calculators/property-tax-estimator', label: 'Property Tax Estimator' },
  { href: '/calculators/family-floater-coverage-calculator', label: 'Health Insurance Floater Calculator' },
  { href: '/calculators/car-insurance-calculator', label: 'Car Insurance Calculator' },
  { href: '/calculators/bike-insurance-calculator', label: 'Bike Insurance Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
];

/* ── FAQS ──────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How is home insurance sum insured calculated in India?',
    a: 'Home insurance structure sum insured is calculated by multiplying total built-up area in square feet by the current local construction cost per square foot, strictly excluding the land value.',
  },
  {
    q: 'Does home insurance cover the land value of a property?',
    a: 'No, home insurance policies cover only the cost of reconstructing the building structure and replacing household contents, as plot land cannot be destroyed by fire, flood, or earthquake.',
  },
  {
    q: 'What is the average construction cost per sq ft for home insurance in India?',
    a: 'Construction cost per square foot ranges between Rs 1,800 and Rs 3,500 depending on quality of construction, city tier, and architectural finishes.',
  },
  {
    q: 'What is Bharat Griha Raksha policy?',
    a: 'Bharat Griha Raksha is a standard home insurance policy mandated by IRDAI that offers automatic coverage for home structure and contents against 14 natural and man-made perils including fire, flood, cyclone, and earthquake.',
  },
  {
    q: 'How much does home insurance cost annually in India?',
    a: 'Home insurance is highly affordable in India, typically costing between Rs 1,500 and Rs 4,500 per year for a Rs 50 lakh structure cover with Rs 10 lakh contents protection.',
  },
  {
    q: 'What is covered under household contents insurance?',
    a: 'Contents insurance covers furniture, electronic appliances, kitchen equipment, clothing, personal belongings, and optional jewellery against burglary, fire, and water damage.',
  },
  {
    q: 'Can tenants buy home insurance in India?',
    a: 'Yes, tenants can purchase a contents-only home insurance policy to safeguard their furniture, electronics, and personal valuables without insuring the building structure.',
  },
  {
    q: 'Is earthquake and flood cover included in home insurance?',
    a: 'Yes, standard Bharat Griha Raksha policies in India automatically cover natural calamities including floods, earthquakes, landslides, cyclones, and storms without extra rider fees.',
  },
  {
    q: 'What is agreed value basis in home insurance for apartments?',
    a: 'Agreed value basis is an option available for multi-story flats where the insurer agrees to pay a fixed pre-determined sum insured in case of total collapse of the apartment building.',
  },
  {
    q: 'What is the difference between individual home insurance and society master policy?',
    a: 'A housing society master policy covers common infrastructure (elevators, staircases, clubhouse, facade), while an individual policy covers the internal flat structure, fixtures, modular fittings, and personal contents.',
  },
  {
    q: 'How does this home insurance coverage calculator work?',
    a: 'This calculator computes structure reconstruction value from built-up area and rate per sq ft, adds contents sum insured, applies insurer tariff rates, and adds 18% GST to estimate annual premium.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function HomeInsuranceCoverageClient() {
  const [mobile, setMobile] = useState<boolean>(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'total' | 'structure'>('total');

  // Input states
  const [builtUpArea, setBuiltUpArea] = useState<number>(1400); // 1400 sq ft
  const [constructionCostPerSqFt, setConstructionCostPerSqFt] = useState<number>(2400); // Rs 2400/sqft
  const [contentsValue, setContentsValue] = useState<number>(1000000); // 10 Lakh
  const [valuablesValue, setValuablesValue] = useState<number>(300000); // 3 Lakh jewellery
  const [policyTenure, setPolicyTenure] = useState<number>(1); // 1 to 10 years
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Restore state
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-home-insurance-coverage-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.builtUpArea !== undefined) setBuiltUpArea(d.builtUpArea);
      if (d.constructionCostPerSqFt !== undefined) setConstructionCostPerSqFt(d.constructionCostPerSqFt);
      if (d.contentsValue !== undefined) setContentsValue(d.contentsValue);
      if (d.valuablesValue !== undefined) setValuablesValue(d.valuablesValue);
      if (d.policyTenure !== undefined) setPolicyTenure(d.policyTenure);
    } catch {
      /* ignore */
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(
        'fermor-home-insurance-coverage-v1',
        JSON.stringify({
          builtUpArea,
          constructionCostPerSqFt,
          contentsValue,
          valuablesValue,
          policyTenure,
        })
      );
    } catch {
      /* ignore */
    }
  }, [builtUpArea, constructionCostPerSqFt, contentsValue, valuablesValue, policyTenure]);

  const currencySymbol = selectedCurrency?.symbol || '₹';
  const fmtC = (val: number) => {
    if (val >= 10000000) return `${currencySymbol}${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `${currencySymbol}${(val / 100000).toFixed(2)} L`;
    return formatCurrency(val);
  };
  const fmtIN = (val: number) => formatCurrency(val);

  // Math Calculations
  const calculations = useMemo(() => {
    const structureSumInsured = builtUpArea * constructionCostPerSqFt;
    const totalContentsSumInsured = contentsValue + valuablesValue;
    const totalSumInsured = structureSumInsured + totalContentsSumInsured;

    // Bharat Griha Raksha standard annual tariff rate (approx 0.028% on structure, 0.045% on general contents, 0.08% on valuables)
    const annualStructureBasePremium = structureSumInsured * 0.00028;
    const annualContentsBasePremium = contentsValue * 0.00045;
    const annualValuablesBasePremium = valuablesValue * 0.0008;

    const annualNetBasePremium = Math.round(annualStructureBasePremium + annualContentsBasePremium + annualValuablesBasePremium);
    const gstRate = 0.18;
    const annualGstAmount = Math.round(annualNetBasePremium * gstRate);
    const totalAnnualPremium = annualNetBasePremium + annualGstAmount;

    // Multi-year tenure discount (approx 5% per year beyond 1 year)
    const tenureDiscountPct = policyTenure > 1 ? Math.min(25, (policyTenure - 1) * 5) : 0;
    const totalTenureNetPremium = Math.round(annualNetBasePremium * policyTenure * (1 - tenureDiscountPct / 100));
    const totalTenureGst = Math.round(totalTenureNetPremium * gstRate);
    const totalTenurePremium = totalTenureNetPremium + totalTenureGst;

    return {
      structureSumInsured,
      totalContentsSumInsured,
      totalSumInsured,
      annualNetBasePremium,
      annualGstAmount,
      totalAnnualPremium,
      totalTenurePremium,
    };
  }, [builtUpArea, constructionCostPerSqFt, contentsValue, valuablesValue, policyTenure]);

  const secS = { marginBottom: 32 };
  const h2S = { fontSize: mobile ? 20 : 24, fontWeight: 700, color: C.ink, marginBottom: 14, letterSpacing: '-0.02em' };
  const pS = { fontSize: 15, color: C.ink2, lineHeight: 1.75, marginBottom: 14 };

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 24 : 32, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Home Insurance Coverage Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate building reconstruction cost, household contents sum insured, and annual premium under Bharat Griha Raksha policies in India.
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
                  id="tab-total"
                  role="tab"
                  aria-selected={activeTab === 'total'}
                  aria-controls="panel-total"
                  onClick={() => setActiveTab('total')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'total' ? 700 : 400,
                    color: activeTab === 'total' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'total' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Total Structure + Contents
                </button>
                <button
                  id="tab-structure"
                  role="tab"
                  aria-selected={activeTab === 'structure'}
                  aria-controls="panel-structure"
                  onClick={() => setActiveTab('structure')}
                  style={{
                    flex: 1,
                    padding: mobile ? '13px 6px' : '15px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: mobile ? 12.5 : 13.5,
                    fontWeight: activeTab === 'structure' ? 700 : 400,
                    color: activeTab === 'structure' ? C.dark : C.ink3,
                    borderBottom: activeTab === 'structure' ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                    transition: 'all 0.15s',
                    fontFamily: INTER,
                  }}
                >
                  Structure Rebuilding Only
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
                      Home Coverage Inputs
                    </p>
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider
                        id="builtup-area-ins"
                        label="Built-Up Carpet Area (Sq Ft)"
                        value={builtUpArea}
                        min={400}
                        max={5000}
                        step={50}
                        display={`${builtUpArea} sq ft`}
                        onChange={setBuiltUpArea}
                        compact
                        suffix=" sq ft"
                      />

                      <Slider
                        id="reconstruct-rate"
                        label="Reconstruction Cost (Rs/Sq Ft)"
                        value={constructionCostPerSqFt}
                        min={1500}
                        max={4500}
                        step={100}
                        display={`Rs ${constructionCostPerSqFt}`}
                        onChange={setConstructionCostPerSqFt}
                        compact
                        suffix="/sqft"
                      />

                      <Slider
                        id="contents-val"
                        label="Household Contents Value"
                        value={contentsValue}
                        min={200000}
                        max={5000000}
                        step={50000}
                        display={fmtC(contentsValue)}
                        onChange={setContentsValue}
                        compact
                      />

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
                          Valuables &amp; Tenure
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider
                        id="valuables-val"
                        label="Jewellery &amp; Valuables Cover"
                        value={valuablesValue}
                        min={0}
                        max={2000000}
                        step={50000}
                        display={fmtC(valuablesValue)}
                        onChange={setValuablesValue}
                        compact
                      />

                      <Slider
                        id="policy-tenure"
                        label="Policy Tenure (Years)"
                        value={policyTenure}
                        min={1}
                        max={10}
                        step={1}
                        display={`${policyTenure} Yr${policyTenure > 1 ? 's' : ''}`}
                        onChange={setPolicyTenure}
                        compact
                        suffix=" Yrs"
                      />

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
                      structureCover={calculations.structureSumInsured}
                      contentsCover={contentsValue}
                      valuablesCover={valuablesValue}
                    />
                  </div>

                  {/* Donut Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 12 : 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Structure</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#50565c' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Contents</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Valuables</span>
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
                        Estimated Annual Premium (Incl. 18% GST)
                      </div>
                      <div style={{ fontSize: 11, color: '#7A8087', marginTop: 2 }}>
                        Total Sum Insured: {fmtC(calculations.totalSumInsured)}
                      </div>
                    </div>
                    <span
                      aria-live="polite"
                      aria-label={`Annual Premium: ${fmtIN(calculations.totalAnnualPremium)}`}
                      style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                    >
                      {fmtIN(calculations.totalAnnualPremium)}/yr
                    </span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Building Structure Sum Insured', value: fmtC(calculations.structureSumInsured) },
                    { label: 'Household Contents Sum Insured', value: fmtC(contentsValue) },
                    { label: 'Jewellery & Valuables Sum Insured', value: fmtC(valuablesValue) },
                    { label: 'Annual Net Base Premium', value: fmtIN(calculations.annualNetBasePremium) },
                    { label: '18% GST on Insurance', value: fmtIN(calculations.annualGstAmount) },
                    { label: `${policyTenure}-Year Total Premium`, value: fmtIN(calculations.totalTenurePremium) },
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
              <div style={secS} id="what-is-home-insurance">
                <h2 style={h2S}>What Is Home Insurance and How Is Sum Insured Determined?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Home insurance in India provides financial indemnity against structural reconstruction costs and loss of household contents caused by natural disasters, fires, explosions, and burglaries.
                  </p>
                </div>
                <p style={pS}>
                  Unlike automobile or life insurance, property insurance is calculated on the physical reconstruction cost of the building (labor, cement, steel, and architectural finishes) rather than the property market sale price.
                </p>
                <p style={pS}>
                  Budget your comprehensive annual property expenses using the{' '}
                  <Link href="/calculators/annual-home-maintenance-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Annual Home Maintenance Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="structure-vs-land-value">
                <h2 style={h2S}>Structure Reconstruction Value vs Property Market Value</h2>
                <p style={pS}>
                  A critical error made by Indian property owners is insuring their home for its entire market value (e.g. Rs 1.5 Crore) instead of its actual physical reconstruction value (e.g. Rs 35 Lakh).
                </p>
                <p style={pS}>
                  Real estate market value comprises two elements: the underlying land value (or undivided share of land) and the physical brick-and-mortar structure. Because land cannot be destroyed by fire, flood, or earthquake, insurance companies indemnify strictly the cost to rebuild the structure from ground up. Insuring the land portion leads to overpaying insurance premiums with zero additional claim recovery.
                </p>
              </div>

              <div style={secS} id="bharat-griha-raksha">
                <h2 style={h2S}>Bharat Griha Raksha: IRDAI Standard Policy &amp; 14 Inbuilt Perils</h2>
                <p style={pS}>
                  Mandated by the Insurance Regulatory and Development Authority of India (IRDAI), Bharat Griha Raksha (BGR) is the standard home insurance product offered by all general insurers across India.
                </p>
                <p style={pS}>
                  BGR automatically incorporates comprehensive protection against 14 standard perils without requiring individual add-on riders:
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Fire, Explosion &amp; Lightning:</strong> Complete coverage for accidental fires and gas cylinder explosions.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Natural Calamities (STFI):</strong> Storm, tempest, flood, inundation, cyclone, and tsunami.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Acts of God:</strong> Earthquake, subsidence, landslide, and rockslides.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Other Risks:</strong> Bursting of water tanks, impact damage by road vehicles/aircraft, and riots.
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
                    Calculate Term Life Cover
                  </p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, fontFamily: INTER }}>
                    Protect your family against outstanding home loan liabilities with pure term life insurance.
                  </p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/term-insurance-calculator"
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

              <div style={secS} id="contents-and-valuables">
                <h2 style={h2S}>Household Contents, Valuables &amp; Jewellery Cover Guidelines</h2>
                <p style={pS}>
                  Under BGR guidelines, general household contents (furniture, consumer electronics, kitchen equipment, apparel) are automatically insured up to 20% of the building structure sum insured (subject to a maximum of Rs 10 Lakh) without itemized listing.
                </p>
                <p style={pS}>
                  For higher contents values or expensive jewellery and works of art, policyholders must declare an itemized valuation schedule. Jewellery and precious stones are protected against burglary and theft under locked safe conditions.
                </p>
              </div>

              <div style={secS} id="home-vs-society-insurance">
                <h2 style={h2S}>Individual Home Insurance vs Housing Society Master Policy</h2>
                <p style={pS}>
                  Cooperative Housing Societies typically hold a Master Property Insurance policy covering the common structural envelope, staircases, lift shafts, and community clubhouse.
                </p>
                <p style={pS}>
                  However, society master policies do not cover internal flat fixtures, modular kitchen woodwork, sanitary fittings, flooring upgrades, or personal household contents. Every individual homeowner and tenant requires a personal policy to protect their internal private domain.
                </p>
              </div>

              <div style={secS} id="reconstruction-rates-table">
                <h2 style={h2S}>Reconstruction Cost Benchmarks Across Indian Tiers</h2>
                <p style={pS}>
                  The table below outlines standard construction cost benchmarks used by leading Indian property insurers (HDFC ERGO, ICICI Lombard, SBI General, Bajaj Allianz):
                </p>

                <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>
                      Reconstruction cost per square foot and estimated annual premium under Bharat Griha Raksha.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Quality Tier</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Cost Per Sq Ft</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Structure Cover (1,400 sq ft)</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Est. Annual Premium</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tdL}>Standard City Apartment</td>
                        <td style={tdR}>Rs 1,800 - Rs 2,200</td>
                        <td style={tdR}>Rs 28,00,000</td>
                        <td style={tdR}>Rs 1,250 + GST</td>
                      </tr>
                      <tr style={{ background: '#fafafa' }}>
                        <td style={tdL}>Premium Gated Community</td>
                        <td style={tdR}>Rs 2,400 - Rs 3,000</td>
                        <td style={tdR}>Rs 37,80,000</td>
                        <td style={tdR}>Rs 1,850 + GST</td>
                      </tr>
                      <tr>
                        <td style={tdL}>Luxury Villa &amp; Penthouse</td>
                        <td style={tdR}>Rs 3,200 - Rs 4,500</td>
                        <td style={tdR}>Rs 53,20,000</td>
                        <td style={tdR}>Rs 2,900 + GST</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p style={pS}>
                  Calculate your overall home acquisition costs and ancillary fees using the{' '}
                  <Link href="/calculators/home-buying-total-cost-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Buying Total Cost Calculator
                  </Link>.
                </p>
              </div>

              <div style={secS} id="claim-settlement-process">
                <h2 style={h2S}>Step-by-Step Claim Settlement Process &amp; Documentation</h2>
                <p style={pS}>
                  In the event of insured property damage, following a structured claim filing procedure ensures rapid settlement:
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Immediate Intimation:</strong> Notify the insurer within 24 to 48 hours of the incident via their portal or toll-free helpline.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Photographic Evidence:</strong> Take clear, timestamped photographs and videos of structural damage and destroyed contents before commencing cleanup.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Official Reports:</strong> In case of fire or burglary, file a police FIR and secure the Fire Brigade report.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Surveyor Assessment:</strong> An IRDAI-licensed independent surveyor inspects the premises to assess rebuilding estimates and approves final claim disbursement.
                  </li>
                </ol>
              </div>

              <div style={secS} id="how-to-use">
                <h2 style={h2S}>How to Use This Home Insurance Coverage Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Built-Up Area:</strong> Input total carpet and covered area of your home in square feet.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select Construction Rate:</strong> Choose standard local reconstruction cost per sq ft.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add Contents &amp; Valuables:</strong> Input estimated value of household appliances, furniture, and jewellery.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review Premium:</strong> View total sum insured and estimated annual premium with 18% GST.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> Premium rates are based on standard IRDAI Bharat Griha Raksha general insurance tariffs. Actual policy premiums may vary based on insurer underwriting guidelines, structural age, and local geographical risk zoning.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .hic-sidebar::-webkit-scrollbar { width: 5px; }
            .hic-sidebar::-webkit-scrollbar-track { background: transparent; }
            .hic-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .hic-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            className="hic-sidebar"
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
              <div style={{ flexShrink: 0 }}><InsuranceSnapshot /></div>
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
        { hd: 'Calculators', links: [ '/calculators/annual-home-maintenance-calculator|Home Maintenance', '/calculators/home-buying-total-cost-calculator|Total House Cost', '/calculators/home-equity-calculator|Home Equity', '/calculators/term-insurance-calculator|Term Insurance', '/calculators/rental-yield-calculator|Rental Yield', '/calculators/state-wise-stamp-duty-calculator|Stamp Duty', ], },
        { hd: 'Topics', links: ['/#|Home Insurance', '/#|Bharat Griha Raksha', '/#|Sum Insured', '/#|Contents Cover'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

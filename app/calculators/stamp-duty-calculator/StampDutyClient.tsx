'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
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

/* Types */
type PropertyType = 'residential' | 'commercial' | 'agricultural';
type BuyerGender = 'male' | 'female';
type PropertyStatus = 'ready' | 'under-construction';

/* State data */
const STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const COMPARISON_STATES = [
  'Maharashtra',
  'Delhi',
  'Karnataka',
  'Tamil Nadu',
  'Uttar Pradesh',
  'Gujarat',
  'Rajasthan',
  'Kerala',
  'West Bengal',
  'Telangana',
];

function getStampDutyPct(
  state: string,
  propType: PropertyType,
  gender: BuyerGender,
  propValue: number,
): number {
  switch (state) {
    case 'Maharashtra':
      if (propType === 'agricultural') return 6;
      if (propType === 'commercial') return 6;
      return gender === 'female' ? 5 : 6;

    case 'Delhi':
      if (propType === 'commercial') return 6;
      return gender === 'female' ? 4 : 6;

    case 'Karnataka':
      if (propType === 'commercial') return 5;
      if (propType === 'agricultural') return 5;
      if (propValue <= 4500000) return 2;
      if (propValue <= 7500000) return 3;
      return 5;

    case 'Tamil Nadu':
      return 7;

    case 'Uttar Pradesh':
      if (propType === 'commercial') return 7;
      return gender === 'female' ? 5 : 7;

    case 'Rajasthan':
      if (propType === 'commercial') return 6;
      return gender === 'female' ? 5 : 6;

    case 'Gujarat':
      return 4.9;

    case 'West Bengal':
      if (propValue <= 4000000) return 4;
      if (propValue <= 10000000) return 5;
      return 6;

    case 'Kerala':
      return 8;

    case 'Haryana':
      if (propType === 'commercial') return 7;
      return gender === 'female' ? 5 : 7;

    case 'Punjab':
      if (propType === 'commercial') return 7;
      return gender === 'female' ? 5 : 7;

    case 'Madhya Pradesh':
      return 7.5;

    case 'Telangana':
      return 5;

    case 'Andhra Pradesh':
      return 5;

    case 'Bihar':
      if (propType === 'commercial') return 6.3;
      return gender === 'female' ? 5.7 : 6.3;

    case 'Odisha':
      return 7;

    case 'Jharkhand':
      return 4;

    case 'Chhattisgarh':
      return 5;

    case 'Himachal Pradesh':
      if (propType === 'commercial') return 6;
      return gender === 'female' ? 4 : 6;

    case 'Uttarakhand':
      if (propType === 'commercial') return 5;
      return gender === 'female' ? 3.75 : 5;

    case 'Assam':
      return 8.25;

    case 'Goa':
      if (propValue <= 5000000) return 3.5;
      if (propValue <= 15000000) return 4;
      return 5;

    case 'Jammu and Kashmir':
      return 5;

    default:
      return 5;
  }
}

function getRegistrationCharges(
  state: string,
  propValue: number,
  propType: PropertyType,
): number {
  switch (state) {
    case 'Maharashtra':
      return Math.min(0.01 * propValue, 30000);

    case 'Delhi':
      if (propType === 'residential') {
        return Math.min(0.01 * propValue, 200000);
      }
      return 0.01 * propValue;

    case 'Karnataka':
      return 0.01 * propValue;

    case 'Tamil Nadu': {
      const first = 0.04 * Math.min(propValue, 30000);
      const rest = 0.01 * Math.max(0, propValue - 30000);
      return first + rest;
    }

    case 'Uttar Pradesh':
      return 0.01 * propValue;

    case 'Rajasthan':
      return 0.01 * propValue;

    case 'Gujarat':
      return 0.01 * propValue;

    case 'West Bengal':
      return 0.011 * propValue;

    case 'Kerala':
      return 0.02 * propValue;

    case 'Haryana':
      return 50000;

    case 'Punjab':
      return 0.01 * propValue;

    case 'Madhya Pradesh':
      return 0.03 * propValue;

    case 'Telangana':
      return 0.005 * propValue;

    case 'Andhra Pradesh':
      return 0.01 * propValue;

    case 'Bihar':
      return 0.02 * propValue;

    case 'Odisha':
      return 0.02 * propValue;

    case 'Jharkhand':
      return 0.03 * propValue;

    case 'Chhattisgarh':
      return 0.04 * propValue;

    case 'Himachal Pradesh':
      return 0.02 * propValue;

    case 'Uttarakhand':
      return 0.02 * propValue;

    case 'Assam':
      return 0.01 * propValue;

    case 'Goa':
      return 0.03 * propValue;

    case 'Jammu and Kashmir':
      return 0.01 * propValue;

    default:
      return 0.01 * propValue;
  }
}

function getGST(propValue: number, status: PropertyStatus): number {
  if (status !== 'under-construction') return 0;
  if (propValue <= 4500000) return 0.01 * propValue;
  return 0.05 * propValue;
}

function fmtLakhCrore(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(2).replace(/\.?0+$/, '')} Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(2).replace(/\.?0+$/, '')} L`;
  return `Rs ${Math.round(n).toLocaleString('en-IN')}`;
}

function fmtSlider(n: number): string {
  if (n >= 10000000) {
    const cr = n / 10000000;
    return cr === Math.floor(cr) ? `${cr} Cr` : `${cr.toFixed(2)} Cr`;
  }
  const l = n / 100000;
  return l === Math.floor(l) ? `${l} L` : `${l.toFixed(1)} L`;
}

/* Donut Chart (3-segment) */
function DonutChart({
  stampDuty,
  regCharges,
  gst,
}: {
  stampDuty: number;
  regCharges: number;
  gst: number;
}) {
  const total = stampDuty + regCharges + gst;
  if (total === 0) return null;

  const R = 78;
  const sw = 22;
  const cx = 100;
  const cy = 100;
  const circ = 2 * Math.PI * R;

  const sdArc  = (stampDuty  / total) * circ;
  const regArc = (regCharges / total) * circ;
  const gstArc = gst > 0 ? (gst / total) * circ : 0;

  const sdPct  = Math.round((stampDuty  / total) * 100);
  const regPct = Math.round((regCharges / total) * 100);
  const gstPct = gst > 0 ? (100 - sdPct - regPct) : 0;

  const ariaLabel = gst > 0
    ? `Property cost split: ${sdPct}% stamp duty, ${regPct}% registration, ${gstPct}% GST`
    : `Property cost split: ${sdPct}% stamp duty, ${regPct}% registration`;

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      style={{ display: 'block' }}
    >
      {/* Stamp duty segment: C.dark */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke={CHART_PAIR.primary}
        strokeWidth={sw}
        strokeDasharray={`${sdArc} ${circ - sdArc}`}
        strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      {/* Registration charges segment: C.lime2 */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke={CHART_PAIR.secondary}
        strokeWidth={sw}
        strokeDasharray={`${regArc} ${circ - regArc}`}
        strokeDashoffset={circ / 4 - sdArc}
        style={{ transition: 'stroke-dasharray 0.4s ease' }}
      />
      {/* GST segment: C.lime */}
      {gst > 0 && (
        <circle
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke={C.lime}
          strokeWidth={sw}
          strokeDasharray={`${gstArc} ${circ - gstArc}`}
          strokeDashoffset={circ / 4 - sdArc - regArc}
          style={{ transition: 'stroke-dasharray 0.4s ease' }}
        />
      )}
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>Total Cost</text>
      <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontSize: 13, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{sdPct + regPct + gstPct}%</text>
      <text x={cx} y={cy + 30} textAnchor="middle" style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>of property value</text>
    </svg>
  );
}

/* Slider */
function Slider({
  label, id: idProp, value, min, max, step, display, onChange,
}: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = idProp || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-input';
  const rangeId = idProp ? `${idProp}-range` : label.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-range';
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <label
          htmlFor={editing ? inputId : rangeId}
          style={{ fontSize: 15, color: C.ink2, fontWeight: 400, fontFamily: INTER }}
        >
          {label}
        </label>
        {editing ? (
          <input
            id={inputId}
            autoFocus
            value={raw}
            aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit}
            onKeyDown={e => e.key === 'Enter' && commit()}
            style={{
              fontSize: 14, fontWeight: 700, textAlign: 'right',
              background: C.white, border: `1.5px solid ${C.dark}`,
              borderRadius: 8, padding: '8px 14px', width: 130,
              outline: 'none', color: C.dark, fontFamily: INTER,
            }}
          />
        ) : (
          <button
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{
              fontSize: 14, fontWeight: 700, color: C.dark,
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
              fontFamily: INTER, letterSpacing: '-0.01em', minWidth: 110, textAlign: 'center',
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
          >
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99,
          background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', left: `${pct}%`, top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 20, height: 20, borderRadius: '50%',
          background: C.white, border: `2.5px solid ${C.dark}`,
          boxShadow: '0 2px 8px rgba(16,18,20,0.22)',
          pointerEvents: 'none', zIndex: 1,
        }} />
        <input
          id={rangeId}
          type="range"
          min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmtSlider(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3, fontFamily: INTER }}>{fmtSlider(max)}</span>
      </div>
    </div>
  );
}

/* Toggle group */
function ToggleGroup<T extends string>({
  label, options, value, onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{ fontSize: 15, color: C.ink2, fontWeight: 400, margin: '0 0 10px', fontFamily: INTER }}>{label}</p>
      <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1, padding: '8px 14px', border: 'none',
              background: value === opt.value ? C.white : 'transparent',
              color: value === opt.value ? C.ink : C.ink3,
              fontWeight: value === opt.value ? 600 : 400,
              cursor: 'pointer', fontFamily: INTER, fontSize: 13,
              transition: 'all 0.15s',
              borderRight: '1px solid ' + C.border,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* FAQ Accordion */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* Sidebar list */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{
              padding: '12px 18px',
              borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
              fontSize: 13, color: C.ink2, transition: 'all 0.12s', fontFamily: INTER,
            }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}
          >
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

/* Article table styles */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink,
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
const tdL: React.CSSProperties = {
  padding: '10px 14px', fontSize: 13.5, color: C.ink2,
  border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left',
};
const tdR: React.CSSProperties = {
  padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500,
  border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'right',
};

const POPULAR = [
  { href: '/calculators/mortgage-calculator',               label: 'Home Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator',  label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/sbi-home-loan-calculator',          label: 'SBI Home Loan Calculator' },
  { href: '/calculators/income-tax-calculator',             label: 'Income Tax Calculator' },
  { href: '/calculators/gst-calculator',                    label: 'GST Calculator' },
  { href: '/calculators/emi-calculator',                    label: 'EMI Calculator' },
  { href: '/calculators/capital-gains-calculator',          label: 'Capital Gains Tax Calculator' },
];

const MORE = [
  { href: '/calculators/loan-affordability-calculator',     label: 'Loan Affordability Calculator' },
  { href: '/calculators/home-down-payment-calculator',      label: 'Home Down Payment Calculator' },
  { href: '/calculators/professional-tax-calculator',       label: 'Professional Tax Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator', label: 'Balance Transfer Savings' },
  { href: '/calculators/sip-calculator',                    label: 'SIP Calculator' },
];

/* CA CTA Component */

/* Main Component */
export default function StampDutyClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);

  /* Calculator state */
  const [propValue, setPropValue]     = useState(7500000);
  const [state, setState]             = useState('Maharashtra');
  const [propType, setPropType]       = useState<PropertyType>('residential');
  const [gender, setGender]           = useState<BuyerGender>('male');
  const [propStatus, setPropStatus]   = useState<PropertyStatus>('ready');
  const [activeTab, setActiveTab]     = useState<'stamp-duty' | 'comparison'>('stamp-duty');

  /* localStorage */
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-stamp-duty-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.propValue  !== undefined) setPropValue(d.propValue);
      if (d.state      !== undefined) setState(d.state);
      if (d.propType   !== undefined) setPropType(d.propType);
      if (d.gender     !== undefined) setGender(d.gender);
      if (d.propStatus !== undefined) setPropStatus(d.propStatus);
    } catch { /* fail silently */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('fermor-stamp-duty-v1', JSON.stringify({
        propValue, state, propType, gender, propStatus,
      }));
    } catch { /* ignore */ }
  }, [propValue, state, propType, gender, propStatus]);

  /* Currency */
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmt  = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  /* Mobile */
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  /* Calculations */
  const stampDutyPct   = useMemo(() => getStampDutyPct(state, propType, gender, propValue), [state, propType, gender, propValue]);
  const stampDutyAmt   = useMemo(() => (stampDutyPct / 100) * propValue, [stampDutyPct, propValue]);
  const regCharges     = useMemo(() => getRegistrationCharges(state, propValue, propType), [state, propValue, propType]);
  const gstAmt         = useMemo(() => getGST(propValue, propStatus), [propValue, propStatus]);
  const totalUpfront   = useMemo(() => stampDutyAmt + regCharges + gstAmt, [stampDutyAmt, regCharges, gstAmt]);
  const totalPct       = useMemo(() => propValue > 0 ? ((totalUpfront / propValue) * 100).toFixed(2) : '0.00', [totalUpfront, propValue]);

  /* Comparison data */
  const comparisonData = useMemo(() => COMPARISON_STATES.map(s => {
    const sdPct = getStampDutyPct(s, propType, gender, propValue);
    const sdAmt = (sdPct / 100) * propValue;
    const reg   = getRegistrationCharges(s, propValue, propType);
    return { state: s, sdPct, sdAmt, reg, total: sdAmt + reg };
  }), [propValue, propType, gender]);

  /* Display */
  const propValueDisplay = `${selectedCurrency.symbol}${fmtSlider(propValue)}`;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .sd-sidebar::-webkit-scrollbar { width: 5px; }
        .sd-sidebar::-webkit-scrollbar-track { background: transparent; }
        .sd-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .sd-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Page header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Stamp Duty Calculator India
          </h1>
          <p
            className="article-lead"
            style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}
          >
            Calculate stamp duty and registration charges for property purchase across all Indian states. Includes state-wise rate comparison, GST on under-construction property, and women buyer concessions for 2026.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* Calculator card */}
            <div style={{
              background: C.white, border: `1px solid ${C.border}`,
              borderRadius: 18, overflow: 'hidden',
              boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36,
            }}>

              {/* Tab strip */}
              <div
                role="tablist"
                aria-label="Calculator mode"
                style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}
              >
                {([
                  { id: 'stamp-duty' as const, label: 'Stamp Duty' },
                  { id: 'comparison' as const, label: 'State Comparison' },
                ]).map(t => (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    role="tab"
                    aria-selected={activeTab === t.id}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5,
                      fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab 1: Stamp Duty */}
              {activeTab === 'stamp-duty' && (
                <div id="panel-stamp-duty" role="tabpanel" aria-labelledby="tab-stamp-duty">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                    {/* Input panel */}
                    <div style={{
                      padding: mobile ? '20px 18px' : '36px 36px',
                      borderRight: mobile ? 'none' : `1px solid ${C.border}`,
                      borderBottom: mobile ? `1px solid ${C.border}` : 'none',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
                          Property Details
                        </p>
                        <CurrencySelector theme="light" />
                      </div>

                      <Slider
                        id="prop-value"
                        label="Property Value"
                        value={propValue}
                        min={500000}
                        max={50000000}
                        step={100000}
                        display={propValueDisplay}
                        onChange={setPropValue}
                      />

                      {/* State selector */}
                      <div style={{ marginBottom: 24 }}>
                        <label
                          htmlFor="state-select"
                          style={{ fontSize: 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10, fontFamily: INTER }}
                        >
                          State
                        </label>
                        <select
                          id="state-select"
                          value={state}
                          onChange={e => setState(e.target.value)}
                          style={{
                            width: '100%', padding: '10px 14px', fontSize: 14,
                            color: C.ink, background: C.white, border: `1px solid ${C.border}`,
                            borderRadius: 8, cursor: 'pointer', fontFamily: INTER,
                            outline: 'none', appearance: 'auto',
                          }}
                        >
                          {STATES.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <ToggleGroup
                        label="Property Type"
                        options={[
                          { value: 'residential' as PropertyType, label: 'Residential' },
                          { value: 'commercial' as PropertyType, label: 'Commercial' },
                          { value: 'agricultural' as PropertyType, label: 'Agricultural' },
                        ]}
                        value={propType}
                        onChange={setPropType}
                      />

                      <ToggleGroup
                        label="Buyer"
                        options={[
                          { value: 'male' as BuyerGender, label: 'Male' },
                          { value: 'female' as BuyerGender, label: 'Female' },
                        ]}
                        value={gender}
                        onChange={setGender}
                      />

                      <ToggleGroup
                        label="Property Status"
                        options={[
                          { value: 'ready' as PropertyStatus, label: 'Ready to Move' },
                          { value: 'under-construction' as PropertyStatus, label: 'Under Construction' },
                        ]}
                        value={propStatus}
                        onChange={setPropStatus}
                      />
                    </div>

                    {/* Output panel */}
                    <div style={{
                      padding: mobile ? '20px 18px' : '36px 36px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}>

                      {/* Donut chart (desktop: top, mobile: below stats) */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <DonutChart stampDuty={stampDutyAmt} regCharges={regCharges} gst={gstAmt} />
                      </div>

                      {/* Legend */}
                      <div style={{
                        order: mobile ? 2 : -1,
                        display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: mobile ? 12 : 20,
                        justifyContent: 'center',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2, fontFamily: INTER }}>Stamp Duty</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2, fontFamily: INTER }}>Registration</span>
                        </div>
                        {gstAmt > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 11, height: 11, borderRadius: 3, background: C.lime }} aria-hidden="true" />
                            <span style={{ fontSize: 12, color: C.ink2, fontFamily: INTER }}>GST</span>
                          </div>
                        )}
                      </div>

                      {/* Primary result box */}
                      <div style={{
                        width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14,
                        padding: '24px 22px', marginBottom: 16,
                        display: 'flex', justifyContent: 'space-between', alignItems: 'stretch',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Total Upfront Cost</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>{totalPct}% of property value</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <span
                            aria-live="polite"
                            aria-label={`Total upfront cost: ${fmt(totalUpfront)}`}
                            style={{ fontSize: mobile ? 22 : 26, fontWeight: 800, color: '#1F7A58', lineHeight: 1, display: 'block' }}
                          >
                            {fmt(totalUpfront)}
                          </span>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#7A8087' }}>on {fmtC(propValue)} property</div>
                        </div>
                      </div>

                      {/* Breakdown rows */}
                      {[
                        { label: `Stamp Duty (${stampDutyPct}%)`, value: stampDutyAmt },
                        { label: 'Registration Charges', value: regCharges },
                        ...(gstAmt > 0 ? [{ label: `GST (${propValue <= 4500000 ? '1' : '5'}%)`, value: gstAmt }] : []),
                      ].map(row => (
                        <div
                          key={row.label}
                          style={{
                            width: '100%', display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', padding: '12px 0',
                            borderBottom: `1px solid ${C.border}`,
                          }}
                        >
                          <span style={{ fontSize: 13.5, color: C.ink2, fontFamily: INTER }}>{row.label}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: C.ink, fontFamily: INTER }}>{fmt(row.value)}</span>
                        </div>
                      ))}

                      {gstAmt > 0 && (
                        <div style={{
                          marginTop: 12, padding: '10px 14px',
                          background: '#f4f5f6', border: `1px solid ${C.border}`,
                          borderRadius: 8, width: '100%',
                        }}>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, lineHeight: 1.6, fontFamily: INTER }}>
                            GST applies only to under-construction properties per GST Council notification. Ready-to-move properties with Occupancy Certificate are exempt.
                          </p>
                        </div>
                      )}

                      {/* Stamp duty rate info */}
                      <div style={{
                        marginTop: 14, padding: '10px 14px',
                        background: '#f4f5f6', border: `1px solid ${C.border}`,
                        borderRadius: 8, width: '100%',
                      }}>
                        <p style={{ fontSize: 12, color: C.ink3, margin: 0, fontFamily: INTER }}>
                          {state} stamp duty rate: {stampDutyPct}%
                          {gender === 'female' ? ' (women concession applied)' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: State Comparison */}
              {activeTab === 'comparison' && (
                <div id="panel-comparison" role="tabpanel" aria-labelledby="tab-comparison">
                  <div style={{ padding: mobile ? '20px 16px' : '32px 36px' }}>
                    <p style={{ fontSize: 14, color: C.ink2, margin: '0 0 20px', fontFamily: INTER }}>
                      Stamp duty comparison across 10 major states for a {fmtC(propValue)} property
                      ({propType}, {gender} buyer).
                    </p>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                      <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse', minWidth: 520 }}>
                        <caption style={{
                          captionSide: 'bottom', fontSize: 11.5, color: C.ink3,
                          padding: '8px 0', textAlign: 'left', fontFamily: INTER,
                        }}>
                          Registration charges shown are estimates. State-specific caps may apply. Source: State Stamp Act regulations 2026.
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col" style={thS}>State</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Stamp Duty %</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Stamp Duty Amt</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Reg. Charges</th>
                            <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparisonData.map((row, i) => (
                            <tr key={row.state} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                              <td style={{ ...tdL, fontWeight: row.state === state ? 700 : 400, color: row.state === state ? C.dark : C.ink2 }}>
                                {row.state}
                                {row.state === state ? ' *' : ''}
                              </td>
                              <td style={{ ...tdR }}>{row.sdPct}%</td>
                              <td style={{ ...tdR }}>{fmt(row.sdAmt)}</td>
                              <td style={{ ...tdR }}>{fmt(row.reg)}</td>
                              <td style={{ ...tdR, fontWeight: 700 }}>{fmt(row.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p style={{ fontSize: 12, color: C.ink3, margin: '12px 0 0', fontFamily: INTER }}>
                      * Your selected state. Rates are for {propType} property, {gender} buyer, ready-to-move.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* WaitlistCard */}
            <SaveResultsCard mobile={mobile} />

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article">

              {/* H2 1: What is stamp duty */}
              <section>
                <h2 id="what-is-stamp-duty" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  What is stamp duty on property in India?
                </h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Stamp duty on property in India is a tax levied by state governments on the legal document transferring property ownership, calculated as a percentage of the property value or the government circle rate, whichever is higher.
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  It is governed by the Indian Stamp Act 1899 at the central level, but each state has enacted its own Stamp Duty Act with independent rates and exemptions. Without paying stamp duty and having the sale deed registered, the property transfer is not legally valid and the buyer cannot claim ownership rights in a court of law.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  The stamp duty amount is paid before or at the time of property registration at the Sub-Registrar office. In most states you can now pay online via e-stamping through SHCIL (Stock Holding Corporation of India Limited) or the state government's official registration portal.
                </p>
              </section>

              {/* H2 2: Rates by state */}
              <section style={{ marginTop: 36 }}>
                <h2 id="stamp-duty-rates-by-state" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Stamp duty rates by state in India (2026)
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                  Stamp duty rates in India range from 2% (Karnataka on properties up to Rs 45 lakh) to 8.25% (Assam) as of 2026. The table below shows rates for all 23 major states covered in this calculator.
                </p>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 8 }}>
                  <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse', minWidth: 560 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 0', textAlign: 'left', fontFamily: INTER }}>
                      Rates as per state Stamp Act regulations effective 2026. Tiered rates apply in Karnataka, West Bengal, and Goa.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>State</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Male</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Female</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Registration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { state: 'Maharashtra',       male: '6%',     female: '5%',    reg: '1% (max Rs 30,000)' },
                        { state: 'Delhi',             male: '6%',     female: '4%',    reg: '1% (max Rs 2,00,000)' },
                        { state: 'Karnataka',         male: '2-5%*',  female: '2-5%*', reg: '1%' },
                        { state: 'Tamil Nadu',        male: '7%',     female: '7%',    reg: '1%+' },
                        { state: 'Uttar Pradesh',     male: '7%',     female: '5%',    reg: '1%' },
                        { state: 'Rajasthan',         male: '6%',     female: '5%',    reg: '1%' },
                        { state: 'Gujarat',           male: '4.9%',   female: '4.9%',  reg: '1%' },
                        { state: 'West Bengal',       male: '4-6%*',  female: '4-6%*', reg: '1.1%' },
                        { state: 'Kerala',            male: '8%',     female: '8%',    reg: '2%' },
                        { state: 'Haryana',           male: '7%',     female: '5%',    reg: 'Rs 50,000 flat' },
                        { state: 'Punjab',            male: '7%',     female: '5%',    reg: '1%' },
                        { state: 'Madhya Pradesh',    male: '7.5%',   female: '7.5%',  reg: '3%' },
                        { state: 'Telangana',         male: '5%',     female: '5%',    reg: '0.5%' },
                        { state: 'Andhra Pradesh',    male: '5%',     female: '5%',    reg: '1%' },
                        { state: 'Bihar',             male: '6.3%',   female: '5.7%',  reg: '2%' },
                        { state: 'Odisha',            male: '7%',     female: '7%',    reg: '2%' },
                        { state: 'Jharkhand',         male: '4%',     female: '4%',    reg: '3%' },
                        { state: 'Chhattisgarh',      male: '5%',     female: '5%',    reg: '4%' },
                        { state: 'Himachal Pradesh',  male: '6%',     female: '4%',    reg: '2%' },
                        { state: 'Uttarakhand',       male: '5%',     female: '3.75%', reg: '2%' },
                        { state: 'Assam',             male: '8.25%',  female: '8.25%', reg: '1%' },
                        { state: 'Goa',               male: '3.5-5%*', female: '3.5-5%*', reg: '3%' },
                        { state: 'Jammu and Kashmir', male: '5%',     female: '5%',    reg: '1%' },
                      ].map((r, i) => (
                        <tr key={r.state} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                          <td style={tdL}>{r.state}</td>
                          <td style={tdR}>{r.male}</td>
                          <td style={tdR}>{r.female}</td>
                          <td style={tdR}>{r.reg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 12.5, color: C.ink3, margin: '6px 0 0', fontFamily: INTER }}>
                  * Tiered rates: Karnataka under Rs 45L: 2%, Rs 45L-75L: 3%, above Rs 75L: 5%. West Bengal under Rs 40L: 4%, Rs 40L-1Cr: 5%, above 1Cr: 6%. Goa under Rs 50L: 3.5%, Rs 50L-1.5Cr: 4%, above 1.5Cr: 5%.
                </p>
                <p style={{ fontSize: 12.5, color: C.ink3, margin: '4px 0 0', fontFamily: INTER }}>
                  + Tamil Nadu registration: 4% on first Rs 30,000 of property value, 1% on balance.
                </p>
              </section>

              {/* H2 3: How stamp duty is calculated */}
              <section style={{ marginTop: 36 }}>
                <h2 id="how-stamp-duty-is-calculated" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  How stamp duty is calculated on property purchase
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Stamp duty is calculated by applying the applicable percentage to the higher of the actual sale price or the government circle rate (also called guidance value or ready reckoner rate). This protects against undervaluation of property for tax avoidance.
                </p>
                <div style={{
                  background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10,
                  padding: '16px 20px', marginBottom: 16, fontFamily: 'monospace',
                }}>
                  <p style={{ margin: 0, fontSize: 14, color: C.ink }}>
                    Stamp Duty = Rate (%) x max(Sale Price, Circle Rate)
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: 14, color: C.ink }}>
                    Registration Charges = Rate (%) x Property Value (subject to state caps)
                  </p>
                  <p style={{ margin: '8px 0 0', fontSize: 14, color: C.ink }}>
                    GST (under-construction only) = 1% (if value &lt;= Rs 45L) or 5% (if value &gt; Rs 45L)
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  The total upfront transaction cost for a property buyer includes all three: stamp duty, registration charges, and GST (for under-construction units). Using the{' '}
                  <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Home Loan EMI Calculator
                  </Link>{' '}
                  together with this tool gives you the complete picture of both upfront and monthly costs before committing to a property purchase.
                </p>
              </section>

              {/* H2 4: Registration vs stamp duty */}
              <section style={{ marginTop: 36 }}>
                <h2 id="registration-vs-stamp-duty" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Registration charges vs stamp duty: what is the difference?
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Stamp duty is the tax on the legal document (the sale deed) itself, paid to the state government. Registration charges are the fee paid to the Sub-Registrar office to record the property transaction in official government records. Both are paid at the time of property registration, but they serve different purposes and go to different government accounts.
                </p>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 8 }}>
                  <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse', minWidth: 420 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 0', textAlign: 'left', fontFamily: INTER }}>
                      Comparison of stamp duty and registration charges in India.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Parameter</th>
                        <th scope="col" style={thS}>Stamp Duty</th>
                        <th scope="col" style={thS}>Registration Charges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Purpose', 'Tax on legal document', 'Fee to record transaction'],
                        ['Who receives it', 'State government', 'Sub-Registrar office'],
                        ['Typical rate', '2% to 8.25%', '0.5% to 4% (or flat amount)'],
                        ['Refundable', 'Yes, if deed cancelled before registration', 'No'],
                        ['Section 80C eligible', 'Yes (old regime only)', 'Yes (old regime only)'],
                        ['Online payment', 'e-Stamp via SHCIL or state portal', 'Paid at Sub-Registrar office'],
                      ].map(([param, sd, reg], i) => (
                        <tr key={param} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{param}</td>
                          <td style={tdL}>{sd}</td>
                          <td style={tdL}>{reg}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* H2 5: Women buyer concession */}
              <section style={{ marginTop: 36 }}>
                <h2 id="women-buyer-concession" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Women buyer stamp duty concession by state
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Several Indian states offer a reduced stamp duty rate for women buyers to encourage property ownership. The concession applies when the property is registered solely in the woman's name or jointly where the woman is the first named owner, though rules vary by state.
                </p>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 8 }}>
                  <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse', minWidth: 400 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 0', textAlign: 'left', fontFamily: INTER }}>
                      Women buyer stamp duty concessions across Indian states (2026).
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>State</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Male Rate</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Female Rate</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Saving</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { state: 'Delhi',            male: '6%',   female: '4%',    saving: '2%' },
                        { state: 'Haryana',          male: '7%',   female: '5%',    saving: '2%' },
                        { state: 'Punjab',           male: '7%',   female: '5%',    saving: '2%' },
                        { state: 'Himachal Pradesh', male: '6%',   female: '4%',    saving: '2%' },
                        { state: 'Uttarakhand',      male: '5%',   female: '3.75%', saving: '1.25%' },
                        { state: 'Uttar Pradesh',    male: '7%',   female: '5%',    saving: '2%' },
                        { state: 'Rajasthan',        male: '6%',   female: '5%',    saving: '1%' },
                        { state: 'Maharashtra',      male: '6%',   female: '5%',    saving: '1%' },
                        { state: 'Bihar',            male: '6.3%', female: '5.7%',  saving: '0.6%' },
                      ].map((r, i) => (
                        <tr key={r.state} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                          <td style={tdL}>{r.state}</td>
                          <td style={tdR}>{r.male}</td>
                          <td style={tdR}>{r.female}</td>
                          <td style={{ ...tdR, color: '#166534' }}>{r.saving}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '12px 0 0' }}>
                  On a Rs 75 lakh property in Delhi, a female buyer saves Rs 1.5 lakh in stamp duty compared to a male buyer (4% vs 6%). In UP, the saving is Rs 1.5 lakh (5% vs 7%). Check your eligibility at the local Sub-Registrar office before registration, as documentation requirements differ.
                </p>
              </section>

              {/* Promo bar: Home Loan Eligibility */}
              <div style={{
                background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10,
                padding: '18px 20px', margin: '32px 0 8px',
                display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan Eligibility Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Check how much home loan you qualify for based on your salary and existing EMIs.</p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/home-loan-eligibility-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13,
                    fontWeight: 600, padding: '9px 18px', borderRadius: 8,
                    textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                >
                  Open calculator
                </Link>
              </div>

              {/* H2 6: Under-construction and GST */}
              <section style={{ marginTop: 36 }}>
                <h2 id="under-construction-gst" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Stamp duty on under-construction property and GST
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Under-construction properties attract GST in addition to stamp duty and registration charges. Stamp duty applies at the same rate as ready-to-move property, but GST at 1% (affordable housing, value up to Rs 45 lakh) or 5% (all other properties) is added on top per the GST Council notification effective April 1, 2019.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Ready-to-move-in properties that have received their Occupancy Certificate from the local municipal authority are completely exempt from GST. The savings from choosing a ready property over an under-construction one on a Rs 75 lakh flat equal Rs 3.75 lakh in GST alone (5% of Rs 75 lakh). Factor this into your total cost comparison when choosing between a ready and an under-construction unit.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  The{' '}
                  <Link href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    GST Calculator
                  </Link>{' '}
                  can help you compute GST on any transaction, including construction-related payments to your builder before possession.
                </p>
              </section>

              {/* H2 7: Exemptions */}
              <section style={{ marginTop: 36 }}>
                <h2 id="stamp-duty-exemptions" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Stamp duty exemptions and concessions in India
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Several categories of property transactions qualify for reduced or nil stamp duty in India, though the specific rules vary significantly by state.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Family gift deeds:</strong> Transfers between direct blood relatives (parents, siblings, spouse, children) attract nominal stamp duty, often Rs 200 to Rs 1,000 as a flat charge, in Maharashtra, Karnataka, and Tamil Nadu. Rules on what constitutes a blood relative differ by state.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Affordable housing:</strong> Some states (Maharashtra, Rajasthan) have periodically waived or reduced stamp duty for properties below certain value thresholds to boost demand. Check the current status with your Sub-Registrar before assuming any waiver applies.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Women joint ownership:</strong> Beyond the standard rate concession, some states (Rajasthan, UP) waive registration charges entirely when a property is registered jointly with a woman as the primary owner.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>PMAY beneficiaries:</strong> There is no direct central-level stamp duty exemption for PMAY homebuyers, but some state governments have separately reduced stamp duty for EWS and LIG category properties under the scheme.
                  </li>
                </ol>
              </section>

              {/* H2 8: How to pay stamp duty online */}
              <section style={{ marginTop: 36 }}>
                <h2 id="how-to-pay-stamp-duty" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  How to pay stamp duty online in India
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Stamp duty can now be paid online in most major Indian states, eliminating the need to buy physical stamp paper from court.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>e-Stamping via SHCIL:</strong> Visit{' '}
                    <a href="https://www.shcilestamp.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>shcilestamp.com</a>
                    {' '}(Stock Holding Corporation of India Limited). Select your state, article type (Sale Deed), first party, second party, and property description. Pay online and print the e-stamp certificate. Accepted in Maharashtra, Delhi, Karnataka, Tamil Nadu, and most states.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>State registration portals:</strong> Maharashtra uses the Inspector General of Registration (IGR) portal at{' '}
                    <a href="https://igrmaharashtra.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>igrmaharashtra.gov.in</a>.
                    {' '}Karnataka uses Kaveri Online Services at kaveri.karnataka.gov.in. Each state has a similar portal under the Inspector General of Registration and Stamps (IGRS) department.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Franking via authorized banks:</strong> Present the sale deed at an authorized bank branch. The bank imprints a franking mark confirming stamp duty payment. Accepted by Sub-Registrar offices in most states, but is being phased out in favor of e-stamping.
                  </li>
                </ol>
              </section>

              {/* H2 9: Stamp duty on home loan */}
              <section style={{ marginTop: 36 }}>
                <h2 id="stamp-duty-home-loan" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Stamp duty on home loan: what you actually pay
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  When taking a home loan, you pay two separate stamp duties: one on the property sale deed (the major cost, calculated above) and one on the loan agreement itself. The stamp duty on the home loan agreement is typically Rs 200 to Rs 500 as a flat amount in most states and is a minor cost compared to the property sale deed stamp duty.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  The stamp duty and registration charges on the property itself cannot be included in the home loan principal. The RBI's loan-to-value (LTV) guidelines require that the LTV ratio be calculated against the property value only, excluding transaction costs. This means you need to arrange Rs 3-8 lakh in cash upfront for stamp duty and registration on a Rs 75 lakh property, on top of the 10-20% down payment.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Under Section 80C of the Income Tax Act, stamp duty and registration charges are deductible up to Rs 1.5 lakh (combined limit with other 80C investments) under the old tax regime. Use the{' '}
                  <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                    Income Tax Calculator
                  </Link>{' '}
                  to see how this deduction affects your tax liability.
                </p>
              </section>

              {/* H2 10: Worked example */}
              <section style={{ marginTop: 36 }}>
                <h2 id="worked-example" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  Worked example: Rs 75 lakh property in Maharashtra
                </h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 14px' }}>
                  Here is a complete cost breakdown for a male buyer purchasing a ready-to-move Rs 75 lakh residential property in Maharashtra.
                </p>
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', marginBottom: 16 }}>
                  <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse', minWidth: 360 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, padding: '8px 0', textAlign: 'left', fontFamily: INTER }}>
                      Stamp duty calculation for Rs 75 lakh ready property in Maharashtra (male buyer, residential).
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Cost Component</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Rate</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Property Value',       '',    'Rs 75,00,000'],
                        ['Stamp Duty (male)',     '6%',  'Rs 4,50,000'],
                        ['Registration Charges', '1% (capped)', 'Rs 30,000'],
                        ['GST',                  'Nil (ready)', 'Rs 0'],
                        ['Total Upfront Cost',   '6.4%', 'Rs 4,80,000'],
                      ].map(([comp, rate, amt], i) => (
                        <tr key={comp} style={{ background: i % 2 === 0 ? C.white : C.bg }}>
                          <td style={{ ...tdL, fontWeight: comp === 'Total Upfront Cost' ? 700 : 400, color: comp === 'Total Upfront Cost' ? C.ink : C.ink2 }}>{comp}</td>
                          <td style={tdR}>{rate}</td>
                          <td style={{ ...tdR, fontWeight: comp === 'Total Upfront Cost' ? 700 : 500, color: comp === 'Total Upfront Cost' ? C.dark : C.ink }}>{amt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  If the same buyer were female, the stamp duty would be 5% = Rs 3,75,000, saving Rs 75,000. If the property were under-construction, GST of 5% (Rs 3,75,000) would be added, bringing the total upfront cost to Rs 8,55,000 (11.4% of property value).
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                  Beyond stamp duty, a buyer in Maharashtra also pays a 1% metro cess on properties in municipal limits and a 1% local body tax in certain areas. Always confirm the applicable surcharges with your property lawyer or the local Sub-Registrar office before finalizing the transaction.
                </p>
              </section>

              {/* Promo bar: Capital Gains */}
              <div style={{
                background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10,
                padding: '18px 20px', margin: '32px 0 8px',
                display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Capital Gains Tax Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Calculate tax on profit when you eventually sell the property, including indexation benefit.</p>
                </div>
                <Link className="fx-btn"
                  href="/calculators/capital-gains-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13,
                    fontWeight: 600, padding: '9px 18px', borderRadius: 8,
                    textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                  }}
                >
                  Open calculator
                </Link>
              </div>

              {/* H2 11: How to use */}
              <section style={{ marginTop: 36 }}>
                <h2 id="how-to-use" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                  How to use this stamp duty calculator
                </h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter Property Value:</strong> Use the slider or click the value to type the exact purchase price, from Rs 5 lakh to Rs 5 crore.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select State:</strong> Choose the state where the property is located. The calculator applies the correct stamp duty rate automatically, including tiered rates for Karnataka, West Bengal, and Goa.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose Property Type and Buyer Category:</strong> Select Residential, Commercial, or Agricultural. Select Male or Female buyer to apply gender-based concessions where available.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Property Status:</strong> Toggle between Ready to Move and Under Construction. GST at 1% or 5% is added automatically for under-construction properties.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>View State Comparison:</strong> Switch to the State Comparison tab to see stamp duty, registration charges, and total cost for your property value across 10 major states side by side.
                  </li>
                </ol>
              </section>

              {/* Second CA CTA (before FAQ) */}
              <div style={{ marginTop: 32 }}>
              </div>

              {/* H2 12: FAQ */}
              <section style={{ marginTop: 20 }}>
                <h2 id="faq" style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: C.ink, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                  Frequently asked questions
                </h2>
                <FAQ items={faqItems} />
              </section>

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Stamp duty rates, registration charges, and GST rates are subject to change by state governments and the GST Council. Always verify the current applicable rates with the Sub-Registrar office or a qualified property lawyer before executing any transaction. Stamp duty is calculated on the higher of the sale price or government circle rate. This calculator does not account for local surcharges, metro cess, or other state-specific levies. This tool is for educational and planning purposes only and does not constitute legal or financial advice.
                </p>
              </div>

            </article>
          </div>

          {/* RIGHT: Sidebar */}
          <aside
            className="sd-sidebar"
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
              gap: 16,
            } as React.CSSProperties}
          >
            {/* Stamp Duty Snapshot */}
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>
                  Stamp Duty Snapshot
                </span>
              </div>
              {[
                { label: 'Lowest stamp duty (Jharkhand)', value: '4%' },
                { label: 'Highest stamp duty (Assam)', value: '8.25%' },
                { label: 'Women concession (Delhi)', value: '4% vs 6%' },
                { label: 'GST (affordable, under-const.)', value: '1%' },
                { label: 'GST (non-affordable, under-const.)', value: '5%' },
                { label: 'Registration cap (Maharashtra)', value: 'Rs 30,000' },
                { label: 'Section 80C deduction allowed', value: 'Yes (old regime)' },
              ].map((r, i, arr) => (
                <div
                  key={r.label}
                  style={{
                    padding: '11px 16px',
                    borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none',
                    background: C.white,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 12, color: C.ink2 }}>{r.label}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
                </div>
              ))}
            </div>

            <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
              </div>
              <div style={{ flexShrink: 0 }}>
                <SidebarList title="More Calculators" items={MORE} />
              </div>
            </nav>

            {/* Ad */}
            <div style={{ display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: C.ink3, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: INTER }}>Advertisement</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer */}
        <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/stamp-duty-calculator|Stamp Duty', '/calculators/mortgage-calculator|Home Loan EMI', '/calculators/gst-calculator|GST', '/calculators/income-tax-calculator|Income Tax', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/capital-gains-calculator|Capital Gains', ], },
        { hd: 'Topics', links: ['/#|Home Loans', '/#|Property Tax', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial or legal advice." />
      </div>
    </div>
  );
}

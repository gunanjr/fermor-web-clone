'use client';

import { CHART_PAIR, seriesColor } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
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

/* State data */
interface StateInfo {
  name: string;
  stampMale: number;
  stampFemale: number;
  regRate: number;
  regCap: number;
  regFlat: number;
  hasFranking: boolean;
}

const STATES: StateInfo[] = [
  { name: 'Maharashtra',    stampMale: 0.06,  stampFemale: 0.05,  regRate: 0.01,  regCap: 30000,    regFlat: 0,     hasFranking: true  },
  { name: 'Delhi',          stampMale: 0.06,  stampFemale: 0.04,  regRate: 0.01,  regCap: 200000,   regFlat: 0,     hasFranking: false },
  { name: 'Karnataka',      stampMale: 0,     stampFemale: 0,     regRate: 0.01,  regCap: 0,        regFlat: 0,     hasFranking: true  },
  { name: 'Tamil Nadu',     stampMale: 0.07,  stampFemale: 0.07,  regRate: 0,     regCap: 0,        regFlat: -1,    hasFranking: false },
  { name: 'Uttar Pradesh',  stampMale: 0.07,  stampFemale: 0.05,  regRate: 0.01,  regCap: 0,        regFlat: 0,     hasFranking: false },
  { name: 'Rajasthan',      stampMale: 0.06,  stampFemale: 0.05,  regRate: 0.01,  regCap: 0,        regFlat: 0,     hasFranking: false },
  { name: 'Gujarat',        stampMale: 0.049, stampFemale: 0.049, regRate: 0.01,  regCap: 0,        regFlat: 0,     hasFranking: true  },
  { name: 'West Bengal',    stampMale: 0,     stampFemale: 0,     regRate: 0.011, regCap: 0,        regFlat: 0,     hasFranking: false },
  { name: 'Kerala',         stampMale: 0.08,  stampFemale: 0.08,  regRate: 0.02,  regCap: 0,        regFlat: 0,     hasFranking: false },
  { name: 'Haryana',        stampMale: 0.07,  stampFemale: 0.05,  regRate: 0,     regCap: 0,        regFlat: 50000, hasFranking: false },
  { name: 'Punjab',         stampMale: 0.07,  stampFemale: 0.05,  regRate: 0.01,  regCap: 0,        regFlat: 0,     hasFranking: false },
  { name: 'Madhya Pradesh', stampMale: 0.075, stampFemale: 0.075, regRate: 0.03,  regCap: 0,        regFlat: 0,     hasFranking: false },
  { name: 'Telangana',      stampMale: 0.05,  stampFemale: 0.05,  regRate: 0.005, regCap: 0,        regFlat: 0,     hasFranking: false },
  { name: 'Andhra Pradesh', stampMale: 0.05,  stampFemale: 0.05,  regRate: 0.01,  regCap: 0,        regFlat: 0,     hasFranking: false },
];

function calcStampDuty(s: StateInfo, val: number, gender: 'male' | 'female'): number {
  if (s.name === 'Karnataka') {
    if (val <= 2_000_000) return val * 0.02;
    if (val <= 4_500_000) return val * 0.03;
    return val * 0.05;
  }
  if (s.name === 'West Bengal') {
    if (val <= 2_500_000) return val * 0.04;
    if (val <= 4_000_000) return val * 0.05;
    return val * 0.06;
  }
  const rate = gender === 'female' ? s.stampFemale : s.stampMale;
  return val * rate;
}

function calcRegistration(s: StateInfo, val: number): number {
  if (s.name === 'Tamil Nadu') {
    return 0.04 * Math.min(val, 30_000) + 0.01 * Math.max(0, val - 30_000);
  }
  if (s.regFlat === 50000) return 50_000;
  if (s.regCap > 0) return Math.min(val * s.regRate, s.regCap);
  return val * s.regRate;
}

function calcGST(status: 'ready' | 'under-construction', propType: 'residential' | 'commercial', val: number): number {
  if (status === 'ready') return 0;
  if (propType === 'commercial') return val * 0.12;
  return val <= 4_500_000 ? val * 0.01 : val * 0.05;
}

const FRANKING_STATES = ['Maharashtra', 'Karnataka', 'Gujarat'];

interface Breakdown {
  stampDuty: number;
  registration: number;
  gst: number;
  legalFees: number;
  franking: number;
  misc: number;
  totalRegCost: number;
  totalPurchaseCost: number;
  downPayment: number;
  loanAmount: number;
}

function calcBreakdown(
  val: number,
  state: StateInfo,
  propType: 'residential' | 'commercial',
  status: 'ready' | 'under-construction',
  gender: 'male' | 'female',
  includeLegal: boolean,
): Breakdown {
  const stampDuty   = calcStampDuty(state, val, gender);
  const registration = calcRegistration(state, val);
  const gst          = calcGST(status, propType, val);
  const legalFees    = includeLegal ? val * 0.005 : 0;
  const franking     = FRANKING_STATES.includes(state.name) ? 300 : 0;
  const misc         = 10_000;
  const totalRegCost = stampDuty + registration + gst + legalFees + franking + misc;
  const downPayment  = val * 0.20;
  const loanAmount   = val * 0.80;
  const totalPurchaseCost = downPayment + loanAmount + totalRegCost;
  return { stampDuty, registration, gst, legalFees, franking, misc, totalRegCost, totalPurchaseCost, downPayment, loanAmount };
}

/* DonutChart 4 segments */
interface DonutSegment { value: number; color: string; label: string; }

function DonutChart4({ segments, totalRegCost, propertyValue }: {
  segments: DonutSegment[];
  totalRegCost: number;
  propertyValue: number;
}) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const GAP = 3;
  const regPct = propertyValue > 0 ? ((totalRegCost / propertyValue) * 100).toFixed(1) : '0';

  let accumulated = 0;
  const drawnSegments = segments.map((seg, i) => {
    const arc = (seg.value / total) * circ;
    const visArc = Math.max(0, arc - GAP);
    const offset = circ / 4 - accumulated;
    accumulated += arc;
    return { ...seg, visArc, offset, index: i };
  });

  return (
    <svg
      role="img"
      aria-label={`Property registration cost breakdown: ${segments.map(s => s.label).join(', ')}`}
      width="216"
      height="216"
      viewBox="0 0 216 216"
      style={{ display: 'block' }}
    >
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.border} strokeWidth={sw} />
      {drawnSegments.map(s => (
        <circle
          key={s.index}
          cx={cx} cy={cy} r={R}
          fill="none"
          stroke={s.color}
          strokeWidth={sw}
          strokeDasharray={`${s.visArc} ${circ - s.visArc}`}
          strokeDashoffset={s.offset}
          style={{ transition: 'stroke-dasharray 0.4s ease' }}
        />
      ))}
      <text x={cx} y={cy - 10} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>of property</text>
      <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: 24, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{regPct}%</text>
    </svg>
  );
}

/* Slider */
function Slider({
  label, value, min, max, step, display, onChange, compact,
}: {
  label: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean;
}) {
  const autoId = useId();
  const inputId = `slider-input-${autoId}`;
  const rangeId = `slider-range-${autoId}`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 12 }}>
        {label ? (
          <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        ) : (
          <span />
        )}
        {editing ? (
          <input
            id={inputId}
            autoFocus
            value={raw}
            aria-label={`Enter ${label} value`}
            onChange={e => setRaw(e.target.value)}
            onBlur={commit}
            onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 140, outline: 'none', color: C.dark, fontFamily: INTER }}
          />
        ) : (
          <button
            onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 120, textAlign: 'center' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
          >
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input
          id={rangeId}
          type="range"
          min={min} max={max} step={step} value={value}
          aria-label={label}
          aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min >= 100000 ? `${min / 100000}L` : min}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max >= 10000000 ? `${max / 10000000}Cr` : max >= 100000 ? `${max / 100000}L` : max}</span>
      </div>
    </div>
  );
}

/* FAQ data */
const FAQ_ITEMS = [
  {
    q: 'What is property registration cost in India?',
    a: 'Property registration cost is the total upfront expense to legally transfer a property into your name, above and beyond the property price. It includes stamp duty (4-8% of property value), registration charges (0.5-3%), GST on under-construction properties (1-12%), legal and advocate fees (approximately 0.5%), franking charges (Rs 300 in select states), and miscellaneous municipal fees. On a Rs 1 crore property in Maharashtra, total registration costs typically reach Rs 7-9 lakh.',
  },
  {
    q: 'How is property registration cost calculated?',
    a: 'Property registration cost is calculated by adding stamp duty, registration charges, GST (only on under-construction properties), legal fees, and miscellaneous charges. Stamp duty is the largest component, typically 4-8% of property value. Registration charges are usually 0.5-3%, capped in some states. Use this calculator to get an exact breakup for your state, property value, and buyer profile.',
  },
  {
    q: 'What is the stamp duty on property registration in India?',
    a: 'Stamp duty on property registration ranges from 4% to 8% of property value, depending on the state. Maharashtra charges 6% for male buyers and 5% for female buyers. Delhi charges 6% for men and 4% for women. Karnataka uses a tiered structure: 2% up to Rs 20 lakh, 3% up to Rs 45 lakh, and 5% above Rs 45 lakh. Tamil Nadu charges a flat 7%. Telangana and Andhra Pradesh charge 5%.',
  },
  {
    q: 'What are the registration charges on a property purchase?',
    a: 'Registration charges are the fee paid to the sub-registrar office to officially record the property sale deed. Most states charge 1% of property value, but several have caps or special rules. Maharashtra caps registration at Rs 30,000. Delhi caps it at Rs 2 lakh. Haryana charges a flat Rs 50,000. Madhya Pradesh charges 3%, which is among the highest in India.',
  },
  {
    q: 'What is the land registration fee in India?',
    a: 'Land registration fee is the charge paid to the sub-registrar office to transfer ownership of land or property on government records. In most Indian states, this fee is 1% of the land or property value, collected at the time of registration. Some states like Maharashtra cap it at Rs 30,000 to reduce the financial burden on buyers.',
  },
  {
    q: 'What is a flat registration fee calculator used for?',
    a: 'A flat or apartment registration fee calculator estimates the total cost of registering a flat, including stamp duty, registration charges, and applicable GST. The key inputs are the flat\'s agreement value, the buyer\'s gender, the state where the property is located, and whether the flat is under-construction or ready to move in.',
  },
  {
    q: 'What are house registration charges in India?',
    a: 'House registration charges include stamp duty and registration fees, together typically amounting to 6-10% of property value. On a Rs 50 lakh house, you typically pay Rs 3-5 lakh in stamp duty and Rs 25,000-50,000 in registration charges. Additional costs include GST (on under-construction houses), legal fees, and franking charges, which together add another Rs 30,000-75,000.',
  },
  {
    q: 'Is GST applicable on property registration?',
    a: 'GST applies only on under-construction properties, not on ready-to-move-in or completed properties. For affordable under-construction residential housing (value up to Rs 45 lakh), GST is 1%. For non-affordable residential under-construction property (above Rs 45 lakh), GST is 5%. For commercial under-construction properties, GST is 12%. Ready-to-move-in properties registered after receiving the Occupancy Certificate carry zero GST.',
  },
  {
    q: 'Do women buyers get lower stamp duty in India?',
    a: 'Yes, most Indian states offer a 1-2% concession on stamp duty for female property buyers. Delhi reduces stamp duty from 6% to 4% for women, saving Rs 2 lakh on a Rs 1 crore property. Maharashtra reduces it from 6% to 5%. Uttar Pradesh reduces from 7% to 5%. Rajasthan, Haryana, and Punjab also offer 1-2% concessions. Karnataka, Tamil Nadu, Gujarat, and Telangana do not differentiate by gender.',
  },
  {
    q: 'What is the total cost of buying a property in India?',
    a: 'The total cost of buying a property equals the property price plus all registration and ancillary costs. On a Rs 1 crore property, add 6-8% for stamp duty and registration (Rs 6-8 lakh), 0-5% for GST on under-construction property, and Rs 30,000-75,000 for legal and miscellaneous fees. The total upfront cash requirement is typically 20% down payment plus 7-10% in registration and transaction costs.',
  },
  {
    q: 'What documents are needed for property registration in India?',
    a: 'Property registration in India requires the sale deed (executed on stamp paper), identity proof of buyer and seller (Aadhaar, PAN), address proof, property card or index-II extract, NOC from housing society or builder, encumbrance certificate showing no pending dues, and Form 60 if PAN is not available. The sub-registrar may ask for additional documents such as society maintenance receipts or completion certificate depending on the state and property type.',
  },
  {
    q: 'What are franking charges in property registration?',
    a: 'Franking charges are a nominal fee collected by authorized banks or financial institutions to physically stamp (frank) property documents as evidence of stamp duty payment. Franking costs Rs 300 and is applicable in states like Maharashtra, Karnataka, and Gujarat. It is collected before the formal registration at the sub-registrar office.',
  },
  {
    q: 'How can I reduce property registration cost legally?',
    a: 'The most effective legal ways to reduce property registration cost are: register in a female buyer\'s name to save 1-2% stamp duty in most states, buy a ready-to-move-in property to eliminate GST entirely, and choose a state with lower stamp duty rates if you have that flexibility. In some states, stamp duty on resale properties may be assessed on the lower of market value or circle rate. Splitting the purchase into a plot plus construction agreement can also reduce total stamp duty in certain states.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform providing 500+ free financial calculators across personal finance, loans, investments, and tax planning. The property registration cost calculator, home loan EMI calculator, income tax calculator, and stamp duty tools are among the most-used free tools. A free account lets you save your calculations.',
  },
];

/* FAQ Accordion */
function FAQSection() {
  return <FAQBox items={FAQ_ITEMS} />;
}

/* Sidebar list */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div
            style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
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

/* Sidebar snapshot widget */
function RegistrationSnapshot() {
  const rows = [
    { label: 'Lowest stamp duty (Gujarat)', value: '4.9%' },
    { label: 'Highest stamp duty (Kerala)', value: '8%' },
    { label: 'Registration cap (Maharashtra)', value: 'Rs 30,000' },
    { label: 'Registration cap (Delhi)', value: 'Rs 2 lakh' },
    { label: 'GST on affordable housing', value: '1%' },
    { label: 'GST on other under-construction', value: '5%' },
    { label: 'GST on ready-to-move-in', value: 'Nil' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Registration Quick Facts</span>
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

/* Related reads */
function RelatedReads() {
  const links = [
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New vs Old Regime' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map(l => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/mortgage-calculator',                 label: 'Home Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator',   label: 'Home Loan Eligibility Calculator' },
  { href: '/calculators/home-down-payment-calculator',       label: 'Home Down Payment Calculator' },
  { href: '/calculators/gst-calculator',                     label: 'GST Calculator' },
  { href: '/calculators/income-tax-calculator',              label: 'Income Tax Calculator' },
  { href: '/calculators/sip-calculator',                     label: 'SIP Calculator' },
  { href: '/calculators/capital-gains-calculator',           label: 'Capital Gains Tax Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator',                     label: 'EMI Calculator' },
  { href: '/calculators/balance-transfer-savings-calculator',label: 'Balance Transfer Savings' },
  { href: '/calculators/loan-affordability-calculator',      label: 'Loan Affordability Calculator' },
  { href: '/calculators/fd-calculator',                      label: 'FD Calculator' },
  { href: '/calculators/cagr-calculator',                    label: 'CAGR Calculator' },
];

/* CA CTA block (reusable) */

/* Article table styles */
const thS: React.CSSProperties = {
  padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: '#16140F',
  background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase',
  letterSpacing: '0.05em', border: `1px solid #e3e6e8`, whiteSpace: 'nowrap',
  verticalAlign: 'middle',
};
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#50565c', border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: '#16140F', fontWeight: 500, border: `1px solid #e3e6e8`, verticalAlign: 'middle', textAlign: 'right' };

/* Main component */
export default function PropertyRegistrationClient() {
  const [propertyValue, setPropertyValue] = useState(10_000_000);
  const [selectedStateName, setSelectedStateName] = useState('Maharashtra');
  const [propType, setPropType] = useState<'residential' | 'commercial'>('residential');
  const [propStatus, setPropStatus] = useState<'ready' | 'under-construction'>('ready');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [includeLegal, setIncludeLegal] = useState(true);
  const [activeTab, setActiveTab] = useState<'breakdown' | 'comparison'>('breakdown');
  const [mobile, setMobile] = useState(false);

  /* Restore from localStorage */
  useEffect(() => {
    try {
      const s = localStorage.getItem('fermor-property-registration-v1');
      if (!s) return;
      const d = JSON.parse(s);
      if (d.propertyValue !== undefined) setPropertyValue(d.propertyValue);
      if (d.selectedStateName !== undefined) setSelectedStateName(d.selectedStateName);
      if (d.propType !== undefined) setPropType(d.propType);
      if (d.propStatus !== undefined) setPropStatus(d.propStatus);
      if (d.gender !== undefined) setGender(d.gender);
      if (d.includeLegal !== undefined) setIncludeLegal(d.includeLegal);
    } catch { /* fail silently */ }
  }, []);

  /* Save to localStorage */
  useEffect(() => {
    try {
      localStorage.setItem('fermor-property-registration-v1', JSON.stringify({
        propertyValue, selectedStateName, propType, propStatus, gender, includeLegal,
      }));
    } catch { /* ignore */ }
  }, [propertyValue, selectedStateName, propType, propStatus, gender, includeLegal]);

  /* Mobile detection */
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk();
    window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  const selectedState = STATES.find(s => s.name === selectedStateName) || STATES[0];

  const breakdown = useMemo(
    () => calcBreakdown(propertyValue, selectedState, propType, propStatus, gender, includeLegal),
    [propertyValue, selectedState, propType, propStatus, gender, includeLegal],
  );

  /* State comparison data (8 comparison states) */
  const COMPARISON_STATES = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Rajasthan', 'Gujarat', 'West Bengal'];
  const comparisonData = useMemo(() =>
    COMPARISON_STATES.map(sn => {
      const st = STATES.find(s => s.name === sn) || STATES[0];
      return { name: sn, ...calcBreakdown(propertyValue, st, propType, propStatus, gender, includeLegal) };
    }),
    [propertyValue, propType, propStatus, gender, includeLegal],
  );

  /* Donut segments */
  const otherFees = breakdown.legalFees + breakdown.franking + breakdown.misc;
  const donutSegments: DonutSegment[] = [
    { value: breakdown.stampDuty,    color: CHART_PAIR.primary,  label: 'Stamp Duty' },
    { value: breakdown.registration, color: CHART_PAIR.secondary, label: 'Registration' },
    { value: breakdown.gst,          color: seriesColor(2),  label: 'GST' },
    { value: otherFees,              color: seriesColor(3),  label: 'Other Fees' },
  ].filter(s => s.value > 0);

  const stampDutyPct = propertyValue > 0 ? ((breakdown.stampDuty / propertyValue) * 100).toFixed(2) : '0';
  const regPct       = propertyValue > 0 ? ((breakdown.registration / propertyValue) * 100).toFixed(2) : '0';

  /* In-content promo bar */
  function PromoBar({ href, title, desc }: { href: string; title: string; desc: string }) {
    return (
      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' as const }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
        </div>
        <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
          style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
          Open calculator
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <style>{`
        .prop-reg-sidebar::-webkit-scrollbar { width: 5px; }
        .prop-reg-sidebar::-webkit-scrollbar-track { background: transparent; }
        .prop-reg-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .prop-reg-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        {/* Page header */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Property Registration Cost Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate total property registration cost including stamp duty, registration fees, GST, and legal charges across Indian states. See the full cost of buying a home.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* CALCULATOR CARD */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tab strip */}
              <div role="tablist" aria-label="Calculator view" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'breakdown',   label: 'Full Breakdown' },
                  { id: 'comparison',  label: 'State Comparison' },
                ] as const).map(t => (
                  <button
                    key={t.id}
                    id={`tab-${t.id}`}
                    role="tab"
                    aria-selected={activeTab === t.id}
                    aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '13px 8px' : '15px 24px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5, fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER, whiteSpace: 'nowrap' as const,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: Full Breakdown */}
              {activeTab === 'breakdown' && (
                <div id="panel-breakdown" role="tabpanel" aria-labelledby="tab-breakdown">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                    {/* Input panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '36px 36px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase' as const, margin: 0 }}>Property Details</p>
                        <CurrencySelector theme="light" />
                      </div>

                      <Slider
                        label="Property Value"
                        value={propertyValue}
                        min={1_000_000}
                        max={50_000_000}
                        step={100_000}
                        display={fmtC(propertyValue)}
                        onChange={setPropertyValue}
                        compact={mobile}
                      />

                      {/* State dropdown */}
                      <div style={{ marginBottom: mobile ? 18 : 28 }}>
                        <label htmlFor="state-select" style={{ display: 'block', fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, marginBottom: 10 }}>
                          State
                        </label>
                        <select
                          id="state-select"
                          value={selectedStateName}
                          onChange={e => setSelectedStateName(e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', fontSize: 14, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, outline: 'none', fontFamily: INTER, cursor: 'pointer', appearance: 'auto' }}
                        >
                          {STATES.map(s => (
                            <option key={s.name} value={s.name}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Property type toggle */}
                      <div style={{ marginBottom: mobile ? 16 : 24 }}>
                        <p style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Property Type</p>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['residential', 'commercial'] as const).map(t => (
                            <button
                              key={t}
                              onClick={() => setPropType(t)}
                              style={{ flex: 1, padding: mobile ? '7px 8px' : '8px 14px', border: 'none', borderRight: t === 'residential' ? `1px solid ${C.border}` : 'none', background: propType === t ? C.white : 'transparent', color: propType === t ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: propType === t ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' as const }}
                            >
                              {t === 'residential' ? 'Residential' : 'Commercial'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Property status toggle */}
                      <div style={{ marginBottom: mobile ? 16 : 24 }}>
                        <p style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Property Status</p>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {([
                            { key: 'ready', label: 'Ready to Move' },
                            { key: 'under-construction', label: 'Under Construction' },
                          ] as const).map(s => (
                            <button
                              key={s.key}
                              onClick={() => setPropStatus(s.key)}
                              style={{ flex: 1, padding: mobile ? '7px 6px' : '8px 12px', border: 'none', borderRight: s.key === 'ready' ? `1px solid ${C.border}` : 'none', background: propStatus === s.key ? C.white : 'transparent', color: propStatus === s.key ? C.ink : C.ink3, fontFamily: INTER, fontSize: mobile ? 11.5 : 12.5, fontWeight: propStatus === s.key ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Buyer gender toggle */}
                      <div style={{ marginBottom: mobile ? 16 : 24 }}>
                        <p style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Buyer Gender</p>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['male', 'female'] as const).map(g => (
                            <button
                              key={g}
                              onClick={() => setGender(g)}
                              style={{ flex: 1, padding: mobile ? '7px 8px' : '8px 14px', border: 'none', borderRight: g === 'male' ? `1px solid ${C.border}` : 'none', background: gender === g ? C.white : 'transparent', color: gender === g ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: gender === g ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s', textTransform: 'capitalize' as const }}
                            >
                              {g === 'male' ? 'Male' : 'Female'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Legal fees toggle */}
                      <div style={{ marginBottom: 0 }}>
                        <p style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Legal / Advocate Fees</p>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {([true, false] as const).map(v => (
                            <button
                              key={String(v)}
                              onClick={() => setIncludeLegal(v)}
                              style={{ flex: 1, padding: mobile ? '7px 8px' : '8px 14px', border: 'none', borderRight: v ? `1px solid ${C.border}` : 'none', background: includeLegal === v ? C.white : 'transparent', color: includeLegal === v ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: includeLegal === v ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}
                            >
                              {v ? 'Include' : 'Exclude'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Output panel */}
                    <div style={{ padding: mobile ? '20px 18px' : '36px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                      {/* Donut chart - order -1 on desktop */}
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 16 }}>
                        <DonutChart4
                          segments={donutSegments}
                          totalRegCost={breakdown.totalRegCost}
                          propertyValue={propertyValue}
                        />
                      </div>

                      {/* Legend - order -1 on desktop */}
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 12, marginBottom: mobile ? 12 : 16, flexWrap: 'wrap' as const, justifyContent: 'center' }}>
                        {[
                          { label: 'Stamp Duty', color: C.dark },
                          { label: 'Registration', color: C.lime2 },
                          { label: 'GST', color: seriesColor(2) },
                          { label: 'Other', color: seriesColor(3) },
                        ].map(item => (
                          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color }} aria-hidden="true" />
                            <span style={{ fontSize: 12, color: C.ink2 }}>{item.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Primary result */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 14, padding: mobile ? '16px 18px' : '20px 22px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Total Registration Cost</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Stamp duty + all fees</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <span
                            aria-live="polite"
                            aria-label={`Total registration cost: ${fmtIN(breakdown.totalRegCost)}`}
                            style={{ fontSize: mobile ? 20 : 24, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                          >
                            {fmtC(breakdown.totalRegCost)}
                          </span>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#101214', lineHeight: 1 }}>
                            {((breakdown.totalRegCost / propertyValue) * 100).toFixed(2)}% of value
                          </div>
                        </div>
                      </div>

                      {/* Itemized breakdown */}
                      {[
                        { label: `Stamp Duty (${stampDutyPct}%)`, value: fmtIN(breakdown.stampDuty), highlight: false },
                        { label: `Registration Charges (${regPct}%)`, value: fmtIN(breakdown.registration), highlight: false },
                        ...(breakdown.gst > 0 ? [{ label: `GST (${propType === 'commercial' ? '12' : propertyValue <= 4_500_000 ? '1' : '5'}%)`, value: fmtIN(breakdown.gst), highlight: false }] : []),
                        ...(includeLegal ? [{ label: 'Legal / Advocate Fees (0.5%, approx.)', value: fmtIN(breakdown.legalFees), highlight: false }] : []),
                        ...(breakdown.franking > 0 ? [{ label: 'Franking Charges', value: fmtIN(breakdown.franking), highlight: false }] : []),
                        { label: 'Miscellaneous (approx.)', value: fmtIN(breakdown.misc), highlight: false },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12 : 13, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      {/* Total cost of purchase */}
                      <div style={{ width: '100%', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', marginTop: 14 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 10 }}>Total Cost of Purchase (20% Down)</div>
                        {[
                          { label: 'Down Payment (20%)', val: fmtIN(breakdown.downPayment) },
                          { label: 'Loan Amount (80%)', val: fmtIN(breakdown.loanAmount) },
                          { label: 'Registration Costs', val: fmtIN(breakdown.totalRegCost) },
                        ].map(r => (
                          <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
                            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.ink }}>{r.val}</span>
                          </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, paddingTop: 8, marginTop: 4 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Total Outflow</span>
                          <span style={{ fontSize: 14, fontWeight: 800, color: C.dark }}>{fmtC(breakdown.totalPurchaseCost)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: State Comparison */}
              {activeTab === 'comparison' && (
                <div id="panel-comparison" role="tabpanel" aria-labelledby="tab-comparison" style={{ padding: mobile ? '20px 16px' : '32px 36px' }}>
                  <p style={{ fontSize: 13, color: C.ink2, margin: '0 0 20px', lineHeight: 1.7 }}>
                    Comparing total registration cost for {propStatus === 'ready' ? 'a ready-to-move-in' : 'an under-construction'} {propType} property worth {fmtC(propertyValue)} with a {gender === 'female' ? 'female' : 'male'} buyer.
                  </p>
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as unknown as undefined }}>
                    {mobile && <p style={{ fontSize: 11, color: C.ink3, margin: '0 0 8px' }}>Swipe to see full table</p>}
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                        All values in {selectedCurrency?.code || 'INR'}. Registration costs include stamp duty, registration charges, GST, legal fees (if selected), franking, and miscellaneous.
                      </caption>
                      <thead>
                        <tr>
                          {['State', 'Stamp Duty', 'Registration', 'GST', 'Other Fees', 'Total Reg. Cost'].map((h, i) => (
                            <th key={h} scope="col" style={{ ...thS, textAlign: i > 0 ? 'right' as const : 'left' as const }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((row, i) => (
                          <tr key={row.name} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: row.name === selectedStateName ? 700 : 400, color: row.name === selectedStateName ? C.dark : C.ink2 }}>
                              {row.name} {row.name === selectedStateName && <span style={{ fontSize: 10, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 20, padding: '1px 7px', marginLeft: 6 }}>Selected</span>}
                            </td>
                            <td style={{ ...tdR }}>{fmtIN(row.stampDuty)}</td>
                            <td style={{ ...tdR }}>{fmtIN(row.registration)}</td>
                            <td style={{ ...tdR }}>{row.gst > 0 ? fmtIN(row.gst) : 'Nil'}</td>
                            <td style={{ ...tdR }}>{fmtIN(row.legalFees + row.franking + row.misc)}</td>
                            <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(row.totalRegCost)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p style={{ fontSize: 12, color: C.ink3, margin: '12px 0 0', lineHeight: 1.65 }}>
                    Note: Rates are indicative for {new Date().getFullYear()} and subject to state government revisions. Commercial rates may differ from residential rates shown. Verify current rates with the local sub-registrar before executing documents.
                  </p>
                </div>
              )}
            </div>

            {/* WaitlistCard */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article">

              <h2 id="what-is-property-registration-cost" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                What is property registration cost in India?
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Property registration cost is the total upfront cash you need beyond the home loan and down payment to legally transfer a property into your name at the sub-registrar office. It covers six line items: stamp duty, registration charges, GST on under-construction properties, legal fees, franking charges, and miscellaneous municipal fees.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                On a Rs 1 crore property in Maharashtra, a male buyer purchasing a ready-to-move-in flat pays approximately Rs 6.3 lakh in stamp duty and registration alone. Add legal fees and miscellaneous charges and the total registration cost reaches roughly Rs 6.8 lakh.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 32px' }}>
                Most home buyers plan for the down payment (20%) and EMI but underestimate registration costs. On a Rs 75 lakh flat, registration costs in Tamil Nadu or Madhya Pradesh can exceed Rs 8 lakh, a meaningful addition to the upfront cash requirement.
              </p>

              <h2 id="how-registration-cost-is-calculated" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                How property registration cost is calculated
              </h2>
              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  Property registration cost = Stamp Duty + Registration Charges + GST (under-construction only) + Legal Fees + Franking Charges + Miscellaneous Fees.
                </p>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Stamp duty is calculated as a percentage of the property value or the state-determined ready reckoner rate, whichever is higher. Registration charges are either a fixed percentage (typically 1%), a flat fee, or a percentage capped at a maximum, depending on the state.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                GST applies only on under-construction properties. The rate is 1% for affordable housing (value up to Rs 45 lakh) and 5% for others, as determined under CGST and state GST rules. Commercial under-construction properties attract 12% GST.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 32px' }}>
                Legal fees (advocate, drafting, title search) typically run 0.5% of property value. Franking is a nominal Rs 300 charged in Maharashtra, Karnataka, and Gujarat. Miscellaneous fees (municipal NOC, society transfer charges, stamp paper cost) add approximately Rs 10,000.
              </p>

              <h2 id="stamp-duty-vs-registration-charges" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                Stamp duty vs registration charges: the difference
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Stamp duty is a state government tax on the property transaction, paid on the executed sale deed before or at the time of registration. Registration charges are the administrative fee paid to the government to officially record the transfer of ownership in the public register maintained by the sub-registrar.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 32 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Key differences between stamp duty and registration charges in India.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Feature</th>
                      <th scope="col" style={thS}>Stamp Duty</th>
                      <th scope="col" style={thS}>Registration Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Purpose', 'State government tax on transaction', 'Fee to record ownership transfer'],
                      ['Typical rate', '4-8% of property value', '0.5-3% of property value'],
                      ['Paid to', 'State government treasury', 'Sub-registrar office'],
                      ['Timing', 'Before or at registration', 'At the time of registration'],
                      ['Gender concession', 'Yes, in most states', 'No, generally uniform'],
                      ['Deductible under IT Act', 'Yes, under Section 80C (up to Rs 1.5L)', 'No'],
                    ].map(([feat, sd, rc], i) => (
                      <tr key={feat} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600 }}>{feat}</td>
                        <td style={tdL}>{sd}</td>
                        <td style={tdL}>{rc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="state-wise-property-registration-costs" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                State-wise property registration costs (2026)
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Stamp duty and registration rates vary significantly by state, from 4.9% in Gujarat to 8% in Kerala, with registration charges adding a further 0.5-3% on top. The state comparison tab in this calculator shows the exact total for all 14 states for your entered property value.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 32 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Stamp duty and registration rates by state (2026). Rates for male buyers unless noted.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>State</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Stamp Duty (Male)</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Stamp Duty (Female)</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Registration Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Maharashtra',    '6%',               '5%',               '1%, max Rs 30,000'],
                      ['Delhi',          '6%',               '4%',               '1%, max Rs 2 lakh'],
                      ['Karnataka',      '2%/3%/5% tiered',  '2%/3%/5% tiered',  '1%'],
                      ['Tamil Nadu',     '7%',               '7%',               '4% first Rs 30K + 1% above'],
                      ['Uttar Pradesh',  '7%',               '5%',               '1%'],
                      ['Rajasthan',      '6%',               '5%',               '1%'],
                      ['Gujarat',        '4.9%',             '4.9%',             '1%'],
                      ['West Bengal',    '4%/5%/6% tiered',  '4%/5%/6% tiered',  '1.1%'],
                      ['Kerala',         '8%',               '8%',               '2%'],
                      ['Haryana',        '7%',               '5%',               'Rs 50,000 flat'],
                      ['Punjab',         '7%',               '5%',               '1%'],
                      ['Madhya Pradesh', '7.5%',             '7.5%',             '3%'],
                      ['Telangana',      '5%',               '5%',               '0.5%'],
                      ['Andhra Pradesh', '5%',               '5%',               '1%'],
                    ].map(([state, sm, sf, reg], i) => (
                      <tr key={state} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600 }}>{state}</td>
                        <td style={tdR}>{sm}</td>
                        <td style={tdR}>{sf}</td>
                        <td style={tdR}>{reg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* In-content promo: Home Loan Calculator */}
              <div style={{ marginBottom: 32 }}>
                <PromoBar
                  href="/calculators/mortgage-calculator"
                  title="Home Loan EMI Calculator"
                  desc="Calculate your monthly EMI and total interest cost for any home loan amount and tenure."
                />
              </div>

              <h2 id="gst-on-under-construction-property" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                GST on under-construction property: what you pay
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                GST on under-construction property is 1% for affordable housing and 5% for non-affordable residential property, as per the GST Council\'s rate revision effective April 2019. Affordable housing is defined as residential properties with a value up to Rs 45 lakh and carpet area up to 60 square metres in metropolitan cities (90 square metres elsewhere).
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                On a Rs 80 lakh under-construction flat in Mumbai, GST at 5% adds Rs 4 lakh to your upfront cost. A Rs 40 lakh flat in a Tier 2 city attracts only 1% GST, saving Rs 1.6 lakh compared to the higher rate.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 32px' }}>
                Ready-to-move-in flats registered after obtaining the Occupancy Certificate carry zero GST. This is a significant factor when comparing under-construction vs ready-to-move-in property costs. The builder\'s quoted price typically does not include GST, so the effective cost is higher than the advertised price for under-construction projects.
              </p>

              <h2 id="legal-fees-and-other-costs" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                Legal fees and other costs when buying property
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Legal and advocate fees for property registration in India typically run 0.5% of property value, covering title search, agreement drafting, legal opinion, and presence at the sub-registrar office. On a Rs 1 crore property, expect Rs 50,000 in legal fees.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Additional transaction costs include home loan processing fees (0.25-1% of loan amount), technical and legal valuation fees (Rs 5,000-15,000), property insurance (Rs 3,000-8,000 per year), and society/builder transfer charges (Rs 25,000-1,00,000 depending on society rules).
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 32px' }}>
                Miscellaneous costs include stamp paper charges, NOC from housing society, municipality, or gram panchayat, encumbrance certificate fees, and certified copy fees from the sub-registrar. These collectively add Rs 5,000-15,000. This calculator uses Rs 10,000 as a fixed estimate for miscellaneous charges.
              </p>

              <h2 id="women-buyer-concessions" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                Women buyer concessions on registration costs
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Most Indian states offer women buyers a 1-2% concession on stamp duty, which translates to meaningful savings on high-value properties. Delhi offers the largest concession: female buyers pay 4% stamp duty versus 6% for male buyers, saving Rs 2 lakh on a Rs 1 crore property.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 32 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Stamp duty savings for female buyers vs male buyers on a Rs 1 crore property.
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>State</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Male Stamp Duty</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Female Stamp Duty</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Savings on Rs 1 Cr</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Delhi',         'Rs 6 lakh', 'Rs 4 lakh', 'Rs 2 lakh'],
                      ['Uttar Pradesh', 'Rs 7 lakh', 'Rs 5 lakh', 'Rs 2 lakh'],
                      ['Haryana',       'Rs 7 lakh', 'Rs 5 lakh', 'Rs 2 lakh'],
                      ['Punjab',        'Rs 7 lakh', 'Rs 5 lakh', 'Rs 2 lakh'],
                      ['Rajasthan',     'Rs 6 lakh', 'Rs 5 lakh', 'Rs 1 lakh'],
                      ['Maharashtra',   'Rs 6 lakh', 'Rs 5 lakh', 'Rs 1 lakh'],
                      ['Karnataka',     'Rs 5 lakh', 'Rs 5 lakh', 'Nil'],
                      ['Tamil Nadu',    'Rs 7 lakh', 'Rs 7 lakh', 'Nil'],
                    ].map(([state, male, female, saving], i) => (
                      <tr key={state} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 600 }}>{state}</td>
                        <td style={tdR}>{male}</td>
                        <td style={tdR}>{female}</td>
                        <td style={{ ...tdR, color: '#166534', fontWeight: 700 }}>{saving}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="how-to-reduce-registration-cost" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                How to reduce your property registration cost legally
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                The single most effective strategy to reduce registration cost is registering the property in a female buyer\'s name or adding a female co-owner, which unlocks concessions in most states at zero other cost.
              </p>
              <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Register in a female buyer\'s name:</strong> saves 1-2% stamp duty in Delhi, UP, Haryana, Punjab, Rajasthan, and Maharashtra.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Buy a ready-to-move-in property:</strong> eliminates GST entirely, saving 1-5% on under-construction options.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Consider the right state:</strong> Gujarat at 4.9% combined (stamp + registration) is significantly lower than Kerala at 10% (8% + 2%).
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Claim Section 80C deduction:</strong> stamp duty and registration charges paid are deductible up to Rs 1.5 lakh under Section 80C of the Income Tax Act (under old regime only).
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Choose a property within affordable housing limits:</strong> below Rs 45 lakh and eligible carpet area reduces GST from 5% to 1% on under-construction purchases.
                </li>
              </ol>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 32px' }}>
                Use the{' '}
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>
                  Income Tax Calculator
                </Link>
                {' '}to estimate your tax savings when claiming stamp duty under Section 80C, especially if you are comparing old regime and new regime.
              </p>

              <h2 id="documents-required-property-registration" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                Documents required for property registration in India
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                Property registration requires the buyer and seller to appear at the sub-registrar office with a set of original documents and attested copies. Missing any document delays registration and may require a second visit.
              </p>
              <ol style={{ margin: '0 0 32px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Sale deed on stamp paper:</strong> the primary document drafted by the advocate, executed by buyer and seller, and stamped with the applicable stamp duty amount.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Identity proof:</strong> Aadhaar card and PAN card of all buyers and sellers (original + attested copies).
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Address proof:</strong> Aadhaar, driving licence, or utility bill showing current address.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Encumbrance certificate (EC):</strong> shows the property has no mortgages or pending legal cases. Obtained from the sub-registrar office or state registration portal.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>NOC from builder or society:</strong> confirms the seller has no pending dues, and grants permission to transfer ownership.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Property card and index-II extract:</strong> government records showing prior ownership chain and property details.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Two witnesses:</strong> both witnesses must carry identity proof and be present at the sub-registrar office.
                </li>
              </ol>

              <h2 id="worked-example-1-crore-property" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                Total cost of buying a Rs 1 crore property: worked example
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                A male buyer purchasing a ready-to-move-in Rs 1 crore flat in Maharashtra needs to arrange the following upfront cash, with a 20% down payment and an 80% home loan:
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 12 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 0', textAlign: 'left' }}>
                    Total cost breakdown for a Rs 1 crore ready-to-move-in flat in Maharashtra (male buyer, 2026).
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" style={thS}>Cost Head</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Amount</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Property Value',              'Rs 1,00,00,000', '100%'],
                      ['Down Payment (20%)',           'Rs 20,00,000',   '20%'],
                      ['Home Loan (80%)',              'Rs 80,00,000',   '80%'],
                      ['Stamp Duty (6%)',              'Rs 6,00,000',    '6%'],
                      ['Registration Charges (max)',   'Rs 30,000',      '0.3%'],
                      ['GST (ready-to-move)',          'Nil',            '0%'],
                      ['Legal / Advocate Fees (0.5%)', 'Rs 50,000',     '0.5%'],
                      ['Franking Charges',             'Rs 300',         'Negligible'],
                      ['Miscellaneous',                'Rs 10,000',      '0.1%'],
                      ['Total Registration Cost',      'Rs 6,90,300',    '6.9%'],
                      ['Total Cash Required Upfront',  'Rs 26,90,300',   '26.9%'],
                    ].map(([head, amt, pct], i) => (
                      <tr key={head} style={{ background: i % 2 === 0 ? C.white : '#fafafa', fontWeight: i >= 9 ? 700 : 400 }}>
                        <td style={{ ...tdL, fontWeight: i >= 9 ? 700 : 400, color: i >= 9 ? C.dark : C.ink2 }}>{head}</td>
                        <td style={{ ...tdR, fontWeight: i >= 9 ? 700 : 500, color: i >= 9 ? C.dark : C.ink }}>{amt}</td>
                        <td style={{ ...tdR, color: C.ink3 }}>{pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.65, margin: '0 0 12px' }}>
                The buyer needs Rs 26.9 lakh in upfront cash (Rs 20 lakh down + Rs 6.9 lakh registration) to secure a Rs 1 crore property before the home loan disbursement begins. Plan for this amount to be available well before the registration date.
              </p>

              {/* In-content promo: Home Down Payment Calculator */}
              <div style={{ marginBottom: 32 }}>
                <PromoBar
                  href="/calculators/home-down-payment-calculator"
                  title="Home Down Payment Calculator"
                  desc="Plan your monthly savings to build the down payment plus registration costs for your home purchase."
                />
              </div>

              <h2 id="how-to-use-calculator" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 12px', letterSpacing: '-0.015em' }}>
                How to use this property registration cost calculator
              </h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>
                This calculator gives you the complete registration cost breakdown for any Indian state in under a minute:
              </p>
              <ol style={{ margin: '0 0 32px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Set property value:</strong> use the slider or click the value button to type your exact property price between Rs 10 lakh and Rs 5 crore.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Select your state:</strong> choose from 14 Indian states. The calculator applies that state\'s current stamp duty and registration rates automatically.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Set property and buyer details:</strong> choose residential or commercial, ready-to-move-in or under-construction, and buyer gender to get gender-specific stamp duty concessions and correct GST calculation.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Toggle legal fees:</strong> include or exclude the 0.5% legal and advocate fee depending on whether you are using a full-service property lawyer.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Switch to State Comparison tab:</strong> see how total registration cost compares across 8 major states for the same property profile, helping you understand the cost difference of buying in different cities.
                </li>
              </ol>

              

              <h2 id="faq" style={{ fontSize: mobile ? 20 : 22, fontWeight: 700, color: C.ink, margin: '0 0 16px', letterSpacing: '-0.015em' }}>
                Frequently asked questions
              </h2>
              <FAQSection />

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Stamp duty, registration charges, and GST rates are subject to change by state governments and the GST Council at any time. Actual charges may vary based on the property\'s circle rate, type, location, and applicable exemptions. Legal fees and miscellaneous charges are estimates. Verify current rates with the relevant state registration department, the official IGR (Inspector General of Registration) portal, or a licensed property advocate before executing documents. This calculator is for educational and planning purposes only and does not constitute legal or financial advice. Consult a SEBI-registered investment adviser and a licensed property advocate before making real estate purchase decisions.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <aside
            className="prop-reg-sidebar"
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
            {/* Ad placeholder */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, textAlign: 'center', minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <p style={{ fontSize: 11, color: C.ink3, margin: 0 }}>Advertisement 300x250</p>
            </div>

            <RegistrationSnapshot />

            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </nav>

            <nav aria-label="More Calculators" style={{ flexShrink: 0 }}>
              <SidebarList title="More Calculators" items={MORE} />
            </nav>

            <RelatedReads />
          </aside>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/mortgage-calculator|Home Loan EMI', '/calculators/gst-calculator|GST', '/calculators/income-tax-calculator|Income Tax', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/capital-gains-calculator|Capital Gains', '/calculators/fd-calculator|FD', ]},
        { hd: 'Topics', links: ['/#|Property', '/#|Home Loans', '/#|Tax Planning', '/#|Investments'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

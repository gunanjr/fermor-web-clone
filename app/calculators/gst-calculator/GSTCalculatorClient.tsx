'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',
  paleLime:  '#f4f5f6',
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

const SLABS = [5, 12, 18, 28];

const fmtIN = (n: number) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(n);

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
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 10 }}>
        <label style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 140, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(Math.round(value))); setEditing(true); }}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1.5px solid ${C.lime2}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 120, textAlign: 'center' }}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
      </div>
    </div>
  );
}


function DonutChart({ segments, centerLabel, centerValue }: {
  segments: { value: number; color: string }[]; centerLabel: string; centerValue: string;
}) {
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let cum = 0;
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }} role="img" aria-label={`${centerLabel}: ${centerValue}`}>
      {total > 0 && segments.map((seg, i) => {
        if (seg.value <= 0) return null;
        const len = (seg.value / total) * circ;
        const off = (((circ / 4 - cum) % circ) + circ) % circ;
        cum += len;
        return (
          <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={seg.color} strokeWidth={sw}
            strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={off}
            style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }} />
        );
      })}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{centerLabel}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{centerValue}</text>
    </svg>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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

const POPULAR = [
  { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/swp-calculator',     label: 'SWP Calculator' },
  { href: '/calculators/fd-calculator',      label: 'FD Calculator' },
  { href: '/calculators/gratuity-calculator',label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/home-loan-calculator',  label: 'Home Loan EMI Calculator' },
  { href: '/calculators/mortgage-calculator',   label: 'Mortgage Calculator' },
  { href: '/calculators/car-loan-calculator',   label: 'Car Loan EMI Calculator' },
];

const FAQS = [
  {
    q: 'What is GST and how is it calculated?',
    a: 'GST (Goods and Services Tax) is a value-added tax levied on the supply of goods and services in India. It is calculated as a percentage of the taxable value (base price). The formula is: GST Amount = Base Price × (GST Rate / 100). The total amount payable = Base Price + GST Amount. For example, at 18% GST on a base price of ₹1,000, the GST is ₹180 and the total is ₹1,180.',
  },
  {
    q: 'What are the different GST slab rates in India?',
    a: 'India has four primary GST slab rates: 5% applies to essential items such as packaged food items and footwear below ₹1,000; 12% applies to standard items like processed food, computers, and mobile phones; 18% covers most goods and services including telecom services, IT services, and restaurant bills; 28% applies to luxury and sin goods like cars, tobacco products, premium appliances, and aerated drinks. Essential items like fresh vegetables, milk, and eggs are exempt from GST.',
  },
  {
    q: 'What is the difference between CGST, SGST, and IGST?',
    a: 'CGST (Central GST) and SGST (State GST) are levied together on intra-state transactions, when goods or services are supplied within the same state. The total GST is split equally: half collected as CGST by the central government and half as SGST by the state government. IGST (Integrated GST) is levied on inter-state transactions, when goods or services cross state borders. The full GST amount is collected as IGST by the central government and later apportioned to the destination state.',
  },
  {
    q: 'What is Input Tax Credit (ITC) under GST?',
    a: 'Input Tax Credit lets a registered business reduce the GST it owes on sales by the GST it already paid on purchases used for the business, so tax is only paid on the value actually added at each stage. This is the mechanism that stops GST from cascading (tax being charged on top of tax) as goods move through the supply chain.',
  },
  {
    q: 'What is reverse charge mechanism (RCM) under GST?',
    a: 'Under reverse charge, the buyer pays GST directly to the government instead of the supplier, reversing the usual flow. This applies to specific notified categories of goods and services, such as certain imports of services and supplies from goods transport agencies, rather than to transactions generally.',
  },
  {
    q: 'What is an HSN code and why does it matter for GST?',
    a: 'HSN (Harmonised System of Nomenclature) code is a standardised numeric code used to classify goods for tax purposes, and it determines which GST slab rate applies to a given product. GST invoices are required to mention the HSN code, with the number of digits required depending on the business\'s annual turnover.',
  },
  {
    q: 'How do I calculate GST from a total amount?',
    a: 'To extract GST from a GST-inclusive total, use: Base Price = Total Amount / (1 + GST Rate / 100). Then GST Amount = Total Amount - Base Price. For example, if you paid ₹1,180 for an item at 18% GST, the base price is ₹1,180 / 1.18 = ₹1,000 and the GST component is ₹180.',
  },
  {
    q: 'How do I add GST to a base price?',
    a: 'To add GST to a base price, multiply: Total Amount = Base Price × (1 + GST Rate / 100). For a base price of ₹1,000 at 12% GST, the total is ₹1,000 × 1.12 = ₹1,120, with ₹120 being the GST amount.',
  },
  {
    q: 'What is the formula for GST calculation?',
    a: 'The standard GST formulas are: (1) GST Amount = Base Price × (GST Rate / 100). (2) GST-inclusive Total = Base Price × (1 + GST Rate / 100). (3) Base Price from inclusive amount = Total Amount / (1 + GST Rate / 100). (4) For intra-state: CGST = SGST = GST Amount / 2. For inter-state: IGST = GST Amount.',
  },
  {
    q: 'Is GST the same across all states in India?',
    a: 'Yes, GST rates are uniform across all states under India\'s unified tax system. The total tax percentage for any given product or service is the same nationwide. The only difference is how the tax is split: intra-state transactions use CGST + SGST (50-50 split), while inter-state transactions use IGST (full amount collected by the centre). The effective tax burden is identical in both cases.',
  },
  {
    q: 'Who needs GST registration in India?',
    a: 'GST registration is mandatory for businesses with aggregate turnover exceeding ₹40 lakh (₹20 lakh for special category states) in a financial year. Registration is also required for businesses engaged in inter-state supply, e-commerce operators, casual taxable persons, and those required to pay tax under reverse charge. Businesses supplying through e-commerce platforms must register regardless of turnover.',
  },
  {
    q: 'Is GST applicable on all products and services?',
    a: 'No. A few items are kept entirely outside GST and continue under the earlier tax system, most notably petrol, diesel, aviation turbine fuel, natural gas, and alcohol for human consumption, which attract state excise duty and VAT instead. Everything else falls under GST, either at one of the four slab rates or as an exempt item.',
  },
  {
    q: 'What happens if GST is paid late?',
    a: 'Late payment attracts interest at 18% per annum on the outstanding tax amount, calculated from the day after the due date until payment. A separate, smaller per-day late fee also applies for filing the return itself late, with a lower rate for a nil return, subject to a maximum cap.',
  },
  {
    q: 'Can a consumer claim Input Tax Credit on GST paid on personal purchases?',
    a: 'No. Input Tax Credit is available only to GST-registered businesses, and only for purchases used in the course of business. An individual buying goods or services for personal use pays GST as a final consumer and cannot claim any of it back.',
  },
  {
    q: 'Who decides GST rates in India?',
    a: 'The GST Council decides tax rates, exemptions, and rule changes. It is a constitutional body chaired by the Union Finance Minister, with the finance ministers of every state and union territory as members, so rate changes require agreement between the central and state governments rather than a unilateral decision.',
  },
  {
    q: 'What is GSTIN and how many digits does it have?',
    a: 'GSTIN (Goods and Services Tax Identification Number) is a 15-character alphanumeric code assigned to every GST-registered business. It is built from the two-digit state code, the business PAN, a registration count digit for that state, a default character, and a final checksum digit, so it uniquely identifies both the business and the state it is registered in.',
  },
  {
    q: 'How is GST different from the old VAT system?',
    a: 'VAT was levied separately by each state at different rates, and tax paid at one stage often could not be fully offset against tax at the next, creating a cascading tax-on-tax effect. GST replaced this with one uniform nationwide tax structure and seamless input tax credit across the entire supply chain, so businesses are only ever taxed on the value they actually add.',
  },
  {
    q: 'Do freelancers and consultants need to charge GST?',
    a: 'A freelancer or consultant providing services must register for GST once their aggregate turnover crosses ₹20 lakh in a financial year (₹10 lakh in special category states), a lower threshold than the one that applies to businesses selling goods. Once registered, GST must be charged and collected on invoices for services rendered.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

export default function GSTCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const defaultSettings = { basePrice: 10000, totalAmount: 11800, activeField: 'excl', gstRate: 18, customMode: false, customRaw: '18', txnType: 'intra' };
  const { settings, updateSettings } = useCalculatorSettings('gst-calculator', defaultSettings);
  const { basePrice, totalAmount, activeField, gstRate, customMode, customRaw, txnType } = settings;
  const setBasePrice = (v: any) => updateSettings({ basePrice: typeof v === 'function' ? v(settings.basePrice) : v });
  const setTotalAmount = (v: any) => updateSettings({ totalAmount: typeof v === 'function' ? v(settings.totalAmount) : v });
  const setActiveField = (v: any) => updateSettings({ activeField: typeof v === 'function' ? v(settings.activeField) : v });
  const setGstRate = (v: any) => updateSettings({ gstRate: typeof v === 'function' ? v(settings.gstRate) : v });
  const setCustomMode = (v: any) => updateSettings({ customMode: typeof v === 'function' ? v(settings.customMode) : v });
  const setCustomRaw = (v: any) => updateSettings({ customRaw: typeof v === 'function' ? v(settings.customRaw) : v });
  const setTxnType = (v: any) => updateSettings({ txnType: typeof v === 'function' ? v(settings.txnType) : v });
            
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const syncFromExcl = (excl: number, rate: number) => {
    setBasePrice(excl);
    setTotalAmount(excl * (1 + rate / 100));
    setActiveField('excl');
  };

  const syncFromIncl = (incl: number, rate: number) => {
    setTotalAmount(incl);
    setBasePrice(incl / (1 + rate / 100));
    setActiveField('incl');
  };

  const handleBasePriceChange = (v: number) => {
    syncFromExcl(v, gstRate);
  };

  const handleTotalAmountChange = (v: number) => {
    syncFromIncl(v, gstRate);
  };

  const handleRateChange = (r: number) => {
    setGstRate(r);
    if (activeField === 'excl') {
      setTotalAmount(basePrice * (1 + r / 100));
    } else {
      setBasePrice(totalAmount / (1 + r / 100));
    }
  };

  const handleSlabClick = (r: number) => {
    setCustomMode(false);
    handleRateChange(r);
  };

  const commitCustom = () => {
    const n = parseFloat(customRaw);
    if (!isNaN(n) && n >= 0 && n <= 100) {
      handleRateChange(n);
    }
  };

  const gstAmount = basePrice * gstRate / 100;
  const cgst = txnType === 'intra' ? gstAmount / 2 : 0;
  const sgst = txnType === 'intra' ? gstAmount / 2 : 0;
  const igst = txnType === 'inter' ? gstAmount : 0;
  const halfRate = gstRate / 2;
  const taxablePct = totalAmount > 0 ? Math.round((basePrice / totalAmount) * 100) : 0;
  const gstPct = 100 - taxablePct;

  const compRows = SLABS.map(rate => ({
    rate,
    gst: basePrice * rate / 100,
    total: basePrice * (1 + rate / 100),
  }));

  const Btn = (p: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
    <button onClick={p.onClick}
      style={{ padding: mobile ? '6px 14px' : '8px 20px', borderRadius: 8, border: `1.5px solid ${p.active ? C.dark : C.border}`, background: p.active ? C.dark : C.white, color: p.active ? C.white : C.ink, fontFamily: INTER, fontSize: mobile ? 13 : 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
      {p.children}
    </button>
  );

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 28px', letterSpacing: '-0.025em' }}>GST Calculator</h1>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Transaction Details</p>}
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: mobile ? 10 : 14 }}>GST Rate</label>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      {SLABS.map(s => (
                        <Btn key={s} active={!customMode && gstRate === s} onClick={() => handleSlabClick(s)}>{s}%</Btn>
                      ))}
                      {customMode ? (
                        <input autoFocus value={customRaw} onChange={e => setCustomRaw(e.target.value)}
                          onBlur={() => { commitCustom(); setCustomMode(false); }}
                          onKeyDown={e => { if (e.key === 'Enter') { commitCustom(); setCustomMode(false); } }}
                          style={{ width: 60, padding: mobile ? '6px 10px' : '8px 14px', borderRadius: 8, border: `1.5px solid ${C.dark}`, fontSize: 14, fontWeight: 600, fontFamily: INTER, outline: 'none', color: C.dark, textAlign: 'center', background: C.paleLime }} />
                      ) : (
                        <Btn active={customMode || !SLABS.includes(gstRate)} onClick={() => { setCustomMode(true); setCustomRaw(String(gstRate)); }}>
                          {SLABS.includes(gstRate) ? 'Custom' : `${gstRate}%`}
                        </Btn>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: mobile ? 10 : 14 }}>Transaction Type</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Btn active={txnType === 'intra'} onClick={() => setTxnType('intra')}>Intra-state (CGST+SGST)</Btn>
                      <Btn active={txnType === 'inter'} onClick={() => setTxnType('inter')}>Inter-state (IGST)</Btn>
                    </div>
                  </div>

                  <Slider label="Amount (Excluding GST)" value={basePrice} min={100} max={10000000} step={100}
                    fmt={fmtIN} onChange={handleBasePriceChange} compact={mobile} />
                  <Slider label="Amount (Including GST)" value={totalAmount} min={100} max={12800000} step={100}
                    fmt={fmtIN} onChange={handleTotalAmountChange} compact={mobile} />

                </div>

                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ marginBottom: mobile ? 16 : 22 }}>
                    <DonutChart
                      segments={[
                        { value: basePrice,  color: CHART_PAIR.secondary },
                        { value: gstAmount,  color: CHART_PAIR.primary },
                      ]}
                      centerLabel="Total Amount"
                      centerValue={fmtIN(Math.round(totalAmount))}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 16 : 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Taxable value</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>GST amount</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#101214' }}>Total Amount</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{fmtIN(Math.round(totalAmount))}</span>
                  </div>

                  {[
                    { label: 'Taxable Value', value: fmtIN(Math.round(basePrice)) },
                    { label: 'GST Rate',      value: `${gstRate}%` },
                    ...(txnType === 'intra'
                      ? [
                          { label: `CGST (${halfRate}%)`, value: fmtIN(Math.round(cgst)) },
                          { label: `SGST (${halfRate}%)`, value: fmtIN(Math.round(sgst)) },
                        ]
                      : [{ label: `IGST (${gstRate}%)`, value: fmtIN(Math.round(igst)) }]),
                    { label: 'Total GST',     value: fmtIN(Math.round(gstAmount)) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ width: '100%', marginTop: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Taxable value {taxablePct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>GST amount {gstPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: C.dark, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${taxablePct}%`, background: C.lime2, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              <div id="compare-rates" style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowCompare(v => !v)} aria-expanded={showCompare} aria-controls="compare-rates-panel"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Compare GST Rates</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(All four slabs on your base price)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      4 slabs
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showCompare ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showCompare && (
                  <div id="compare-rates-panel" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Slab Rate', 'Base Price', 'GST Amount', 'Total'].map(h => (
                            <th key={h} scope="col" style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {compRows.map((row, i) => (
                          <tr key={row.rate} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '12px 18px', fontWeight: 700, color: C.dark, whiteSpace: 'nowrap' }}>{row.rate}%</td>
                            <td style={{ padding: '12px 18px', color: C.ink2 }}>{fmtIN(Math.round(basePrice))}</td>
                            <td style={{ padding: '12px 18px', color: '#1f7a58', fontWeight: 600 }}>{fmtIN(Math.round(row.gst))}</td>
                            <td style={{ padding: '12px 18px', color: C.ink }}>{fmtIN(Math.round(row.total))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>
            <article style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
                return (
                  <>
                    <div style={sec}>
                      <h2 style={h2}>What is GST?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          GST stands for Goods and Services Tax, a comprehensive, multi-stage, destination-based tax levied on every value addition in the supply chain of goods and services in India.
                        </p>
                      </div>
                      <p style={p}>
                        Introduced on 1 July 2017 under the <a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>GST Act</a>, it replaced a web of central and state taxes including VAT, service tax, excise duty, and octroi.
                      </p>
                      <p style={p}>
                        GST is a consumption-based tax, meaning the tax revenue goes to the state where the goods or services are consumed, not where they are produced. It is designed to create a unified national market, eliminate cascading taxes (tax on tax), and simplify compliance for businesses across India.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>How this GST calculator helps you</h2>
                      <p style={p}>
                        Whether you are a business owner preparing invoices, a freelancer determining your service fees, or a consumer checking the tax on a purchase, this calculator simplifies the process in the following ways:
                      </p>
                      <div>
                        {[
                          'Instantly compute the GST amount and total price from your base price for any GST rate.',
                          'Automatically extract the base price and GST component from a GST-inclusive total amount.',
                          'View the exact CGST and SGST split for intra-state transactions, or IGST for inter-state transactions.',
                          'Compare all four GST slab rates (5%, 12%, 18%, 28%) side by side using your current base price.',
                          'Toggle between intra-state and inter-state to see how the tax breakup changes for the same transaction.',
                        ].map((t, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>GST slabs in India</h2>
                      <p style={p}>
                        India follows a four-tier GST rate structure designed to balance revenue needs with affordability for consumers. Essential goods are taxed at lower rates or exempt, while luxury and demerit goods attract the highest rate.
                      </p>
                      <h3 style={h3}>5% GST slab</h3>
                      <p style={p}>
                        This slab covers essential items of daily use. It includes packaged food items, footwear priced below ₹1,000, apparel below ₹1,000, cream milk, paneer, branded cereals, and transport services like railway and metro fares.
                      </p>
                      <h3 style={h3}>12% GST slab</h3>
                      <p style={p}>
                        The 12% slab applies to goods and services that are considered standard necessities. This includes processed food items, computers and accessories, mobile phones, umbrella, sewing machines, and business class air travel.
                      </p>
                      <h3 style={h3}>18% GST slab</h3>
                      <p style={p}>
                        The most common slab, 18% covers the majority of goods and services including IT and telecom services, restaurant bills, hotel rooms between ₹2,500 and ₹7,500, toothpaste, soap, and capital goods like industrial machinery.
                      </p>
                      <h3 style={h3}>28% GST slab</h3>
                      <p style={p}>
                        This is the highest slab reserved for luxury items and sin goods. It covers automobiles, tobacco products, aerated drinks, premium appliances, motorcycles above 350cc, and luxury hotel rooms above ₹7,500 per night. Some items in this slab also attract a separate cess.
                      </p>
                      <p style={{ ...p, margin: 0 }}>
                        Goods that are exempt from GST (meaning 0% tax) include fresh vegetables and fruits, milk, eggs, unbranded flour and rice, salt, and educational services. These items remain outside the GST net to protect basic necessities from taxation.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>CGST vs SGST vs IGST</h2>
                      <p style={p}>
                        The division of GST into CGST, SGST, and IGST depends entirely on the nature of the transaction: specifically, whether the supply of goods or services takes place within the same state or across state borders.
                      </p>
                      <h3 style={h3}>Intra-state transactions (CGST + SGST)</h3>
                      <p style={p}>
                        When a seller and buyer are located in the same state, the transaction is intra-state. The total GST is split equally: half is collected as CGST (Central GST) by the central government, and half as SGST (State GST) by the state government. For example, at 18% GST, CGST is 9% and SGST is 9%. Both the central and state governments receive an equal share of the tax revenue.
                      </p>
                      <h3 style={h3}>Inter-state transactions (IGST)</h3>
                      <p style={p}>
                        When a seller and buyer are in different states, the transaction is inter-state. The full GST is collected as IGST (Integrated GST) by the central government. The central government then apportions the revenue to the destination state where the goods or services are consumed, ensuring that the consuming state receives the tax benefit.
                      </p>
                      <p style={{ ...p, margin: 0 }}>
                        The key principle is that the total GST percentage is identical in both cases. Only the split changes. This design ensures a seamless flow of input tax credit across the supply chain, regardless of state boundaries.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>GST returns every registered business must file</h2>
                      <p style={p}>
                        A GST-registered business files periodic returns to report its sales, purchases, and tax liability, even in a month with no transactions.
                      </p>
                      <h3 style={h3}>GSTR-1</h3>
                      <p style={p}>
                        A monthly or quarterly return listing all outward supplies (sales) made during the period, filed by the 11th of the following month for monthly filers.
                      </p>
                      <h3 style={h3}>GSTR-3B</h3>
                      <p style={p}>
                        A summary return declaring total sales, purchases, input tax credit claimed, and tax paid, filed monthly by most businesses even after GSTR-1.
                      </p>
                      <h3 style={h3}>GSTR-9</h3>
                      <p style={{ ...p, margin: 0 }}>
                        An annual return consolidating the entire financial year's GSTR-1 and GSTR-3B filings, required for businesses above a specified turnover threshold.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>Composition scheme for small businesses</h2>
                      <p style={p}>
                        Small businesses below a specified turnover threshold can opt for the GST composition scheme, paying tax at a small fixed percentage of turnover instead of the regular slab rates.
                      </p>
                      <p style={{ ...p, margin: 0 }}>
                        In exchange for the lower, simplified rate, a composition dealer cannot claim input tax credit on purchases, cannot collect GST separately from customers on the invoice, and cannot make inter-state sales. This calculator is built for the regular GST scheme and does not cover composition scheme rates.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>GST for online sellers and e-commerce</h2>
                      <p style={p}>
                        Selling through an online marketplace brings two extra GST rules that a purely offline seller does not deal with.
                      </p>
                      <h3 style={h3}>Mandatory registration, regardless of turnover</h3>
                      <p style={p}>
                        A seller supplying goods or services through an e-commerce operator such as Amazon or Flipkart must register for GST even if their turnover is well below the usual ₹40 lakh or ₹20 lakh threshold. The exemption for small businesses does not apply once sales go through a marketplace platform.
                      </p>
                      <h3 style={h3}>Tax Collected at Source (TCS)</h3>
                      <p style={{ ...p, margin: 0 }}>
                        E-commerce operators are required to deduct a small percentage of the payment due to each seller as TCS and deposit it against that seller's GST liability. This shows up as a deduction in the seller's payout and is separate from the GST charged on the sale itself.
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>GST calculation formula</h2>
                      <p style={p}>
                        The mathematics of GST calculation is straightforward and consistent across all slab rates. There are two primary scenarios depending on what information you start with:
                      </p>
                      <h3 style={h3}>Adding GST to a base price</h3>
                      <p style={p}>
                        If you know the taxable value (base price) and need to find the GST-inclusive total:
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '4px 0' }}>
                        GST Amount = Base Price × (GST Rate / 100)
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '4px 0' }}>
                        Total Amount = Base Price × (1 + GST Rate / 100)
                      </p>
                      <h3 style={h3}>Extracting GST from a total amount</h3>
                      <p style={p}>
                        If you have the GST-inclusive price and need to determine the base price and GST component:
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '4px 0' }}>
                        Base Price = Total Amount / (1 + GST Rate / 100)
                      </p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '4px 0' }}>
                        GST Amount = Total Amount - Base Price
                      </p>
                      <h3 style={h3}>CGST / SGST / IGST breakdown</h3>
                      <p style={{ ...p, margin: 0 }}>
                        For intra-state: CGST = SGST = GST Amount / 2. For inter-state: IGST = GST Amount (full amount).
                      </p>
                    </div>

                    <div style={sec}>
                      <h2 style={h2}>How GST is calculated, step by step</h2>
                      <div>
                        {[
                          'Start with the base price: the taxable value before GST, excluding any tax.',
                          'Multiply the base price by the GST rate divided by 100 to get the GST amount.',
                          'Add the GST amount to the base price to get the total, GST-inclusive amount.',
                          'For intra-state sales, split the GST amount equally into CGST and SGST. For inter-state sales, the full GST amount is IGST.',
                        ].map((t, i) => (
                          <div key={i} style={bullet}>
                            <span style={{ flexShrink: 0, marginTop: 3 }}>&#8226;</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>


                    <div style={{ margin: '0 0 40px' }}>
                      <h2 style={h2}>Frequently asked questions</h2>
            <FAQ />
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          <style>{`.gst-sidebar::-webkit-scrollbar{width:5px}.gst-sidebar::-webkit-scrollbar-track{background:transparent}.gst-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.gst-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="gst-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

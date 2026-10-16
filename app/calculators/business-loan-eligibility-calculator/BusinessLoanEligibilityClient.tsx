'use client';

import { useState, useLayoutEffect, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
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
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ── Math ──────────────────────────────────────────────── */
function calcMaxLoanForEMI(maxEmi: number, rate: number, months: number) {
  if (months === 0 || maxEmi <= 0) return 0;
  if (rate === 0) return maxEmi * months;
  const m = rate / 12 / 100;
  return maxEmi * (Math.pow(1 + m, months) - 1) / (m * Math.pow(1 + m, months));
}

function calcEMI(p: number, r: number, n: number) {
  if (n === 0 || p === 0) return 0;
  if (r === 0) return p / n;
  const m = r / 12 / 100;
  return (p * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
}

const BANK_RATES = [
  { name: 'HDFC Bank', unsec: 15.00, sec: 9.50 },
  { name: 'ICICI Bank', unsec: 15.50, sec: 9.75 },
  { name: 'Axis Bank', unsec: 15.50, sec: 9.75 },
  { name: 'SBI', unsec: 14.00, sec: 8.50 },
  { name: 'Bajaj Finserv', unsec: 16.00, sec: 10.50 },
  { name: 'Tata Capital', unsec: 16.00, sec: 10.50 },
  { name: 'Kotak', unsec: 15.50, sec: 9.75 },
  { name: 'Lendingkart', unsec: 18.00, sec: null },
];

/* ── Slider ────────────────────────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact, suffix }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => { setEditing(false); const n = parseFloat(raw.replace(/[^0-9.]/g, '')); if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n))); };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}>
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── SidebarList ───────────────────────────────────────── */
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
  { href: '/calculators/personal-loan-calculator', label: 'Personal Loan EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility' },
  { href: '/calculators/emi-calculator', label: 'General EMI Calculator' },
  { href: '/calculators/gst-calculator', label: 'GST Calculator' },
];

/* ── FAQ ───────────────────────────────────────────────── */
const FAQS = [
  { q: 'How much business loan can I get?', a: 'Your eligibility depends on annual turnover and net profit. Unsecured loans are typically 10-15% of turnover max (e.g., Rs 5-7.5 Lakh on Rs 50 Lakh turnover). Secured loans with collateral can be 30-50% of turnover or based on collateral value.' },
  { q: 'How is business loan eligibility calculated?', a: 'Banks use the Turnover Method (10-15% of annual revenue for unsecured) and Profit/DSCR Method (based on net profit from ITR). Your eligible loan is the lower of both amounts, ensuring you can afford the EMI.' },
  { q: 'How much business loan can I get on 1 Crore turnover?', a: 'On Rs 1 Crore annual turnover, you can qualify for Rs 10-15 Lakh unsecured loan (with healthy profit and CIBIL 700+). For secured loans with property collateral, Rs 30-50 Lakh or more depending on collateral value.' },
  { q: 'What is the minimum turnover required?', a: 'Private banks like HDFC/ICICI require minimum Rs 40 Lakh annual turnover for unsecured loans. Smaller businesses with Rs 10-20 Lakh turnover should explore Mudra loans (up to Rs 10 Lakh).' },
  { q: 'What documents do I need for a business loan?', a: 'Required: Identity and address proof of all promoters, business registration (GST/Udyam), last 2-3 years audited ITRs with P&L and balance sheets, last 6-12 months current account bank statements, and (for term loans) a business plan.' },
  { q: 'What DSCR do banks require?', a: 'Most banks require DSCR of 1.25 or higher. This means your monthly profit must be at least 1.25x your total monthly debt obligations including the new loan EMI. DSCR = Monthly Profit / Monthly Debt Obligations.' },
  { q: 'Do MSMEs get better business loan rates?', a: 'Yes. Registered MSMEs get preferential rates under CGTMSE scheme with collateral-free loans up to Rs 5 Crore, typically 1-2% cheaper than standard unsecured loans.' },
  { q: 'Can I get a business loan with bad credit?', a: 'Banks typically want CIBIL 700-750+. Bad credit makes approval harder but not impossible. Strong business profit and GST compliance can compensate. Expect higher rates from alternative lenders like Mudra or NBFCs.' },
  { q: 'How long does business loan approval take?', a: 'Unsecured loans: 2-5 days. Secured loans (with collateral appraisal): 15-30 days. Mudra loans: 1-2 days. Speed depends on document completeness and chosen lender.' },
  { q: 'What is the maximum business loan amount I can get?', a: 'For unsecured loans, typically Rs 25-50 Lakh depending on turnover. For secured loans, there is no fixed cap. Your limit depends on collateral value, DSCR, and business age. Some businesses access Rs 1 Crore+ in secured loans.' },
];

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Article helpers ───────────────────────────────────── */
const h2S: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const pS: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' };
const secS: React.CSSProperties = { margin: '0 0 40px' };
const bulletS: React.CSSProperties = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 };
const thS: React.CSSProperties = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' };

/* ════════════════════════════════════════════════════════ */

export default function BusinessLoanEligibilityClient() {
  const defaultSettings = { 
    turnover: 10000000, 
    netProfit: 1000000, 
    existingEmi: 0, 
    rate: 15.0, 
    tenureYr: 3,
    loanType: 'Unsecured',
    isMSME: false
  };
  const { settings, updateSettings } = useCalculatorSettings('business-loan-eligibility', defaultSettings);
  const { turnover, netProfit, existingEmi, rate, tenureYr, loanType, isMSME } = settings;

  const setTurnover = (v: number) => updateSettings({ turnover: v });
  const setNetProfit = (v: number) => updateSettings({ netProfit: v });
  const setExistingEmi = (v: number) => updateSettings({ existingEmi: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setTenure = (v: number) => updateSettings({ tenureYr: v });
  const setLoanType = (v: string) => {
    updateSettings({ 
      loanType: v, 
      rate: v === 'Secured' ? 9.5 : 15.0, 
      tenureYr: v === 'Secured' ? 10 : 3 
    });
  };

  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  // Business Loan Math
  // Turnover method: Typically 10% to 15% of turnover for unsecured, higher for secured
  const turnoverMultiplier = loanType === 'Secured' ? 0.30 : 0.12; 
  const eligibleByTurnover = turnover * turnoverMultiplier;

  // Profit method (DSCR): 
  // Let's assume bank allows 60% of net profit (monthly equivalent) to go to EMIs
  const monthlyProfit = netProfit / 12;
  const maxEmiCapacity = monthlyProfit * 0.60;
  const availableEmi = Math.max(0, maxEmiCapacity - existingEmi);
  
  const tenureMo = tenureYr * 12;
  const eligibleByProfit = Math.round(calcMaxLoanForEMI(availableEmi, rate, tenureMo));
  
  // Final eligibility is usually the lower of the two methods, but we'll show both and pick the conservative one.
  // Actually, banks use a blend, but lower is safer. Let's use the profit method as primary, bounded by turnover.
  const eligibleLoan = Math.min(eligibleByTurnover, eligibleByProfit);
  const totalInterest = calcEMI(eligibleLoan, rate, tenureMo) * tenureMo - eligibleLoan;
  
  const isDeficit = availableEmi <= 0;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Business Loan Eligibility Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Check your business loan eligibility based on annual turnover, net profit, and MSME status.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.1fr 0.9fr' }}>

                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Financials</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Loan Type */}
                  <div style={{ marginBottom: mobile ? 18 : 28 }}>
                    <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Loan Type</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Unsecured', 'Secured'].map(p => (
                        <button key={p} onClick={() => setLoanType(p)}
                          style={{ flex: 1, padding: '10px 0', fontSize: 13, fontWeight: loanType === p ? 700 : 500, background: loanType === p ? C.dark : '#f4f5f6', color: loanType === p ? C.lime : C.ink, border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s' }}>
                          {p} {p === 'Secured' ? '(Collateral)' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider id="turnover" label="Annual Gross Turnover" value={turnover} min={1000000} max={500000000} step={100000}
                    display={fmtIN(turnover)} onChange={setTurnover} compact={mobile} />

                  <Slider id="net-profit" label="Annual Net Profit (ITR)" value={netProfit} min={100000} max={100000000} step={50000}
                    display={fmtIN(netProfit)} onChange={setNetProfit} compact={mobile} />

                  <Slider id="existing-emi" label="Existing Monthly EMIs" value={existingEmi} min={0} max={1000000} step={5000}
                    display={fmtIN(existingEmi)} onChange={setExistingEmi} compact={mobile} />

                  <div style={{ margin: '32px 0 24px', height: 1, background: C.border }} />

                  <Slider id="tenure" label="Loan Tenure (Years)" value={tenureYr} min={1} max={loanType === 'Secured' ? 15 : 5} step={1}
                    display={`${tenureYr} yrs`} onChange={setTenure} compact={mobile} />

                  <Slider id="rate" label="Interest Rate (% p.a.)" value={rate} min={8} max={24} step={0.25}
                    display={`${rate.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
                    <input type="checkbox" id="msme" checked={isMSME} onChange={(e) => updateSettings({ isMSME: e.target.checked })} style={{ width: 18, height: 18 }} />
                    <label htmlFor="msme" style={{ fontSize: 14, color: C.ink }}>Business is Udyam/MSME Registered</label>
                  </div>
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', background: '#fafafa', display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 20px' }}>Eligibility Summary</p>
                  
                  {isDeficit || eligibleLoan <= 0 ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, marginBottom: 24 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>Eligibility Not Met</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>
                        Based on your profit and existing EMIs, there is insufficient cash flow capacity (DSCR) to service a new loan.
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '20px 20px' : '28px 24px', marginBottom: 24 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#50565C', display: 'block', marginBottom: 6 }}>
                          Max Eligible Loan Amount
                        </span>
                        <span aria-live="polite" style={{ fontSize: mobile ? 32 : 38, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', display: 'block' }}>
                          {fmtC(eligibleLoan)}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 14, color: C.ink2 }}>EMI for this loan</span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{fmtIN(calcEMI(eligibleLoan, rate, tenureMo))}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 14, color: C.ink2 }}>Total Interest</span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{fmtC(totalInterest)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                          <span style={{ fontSize: 14, color: C.ink2 }}>% of Turnover</span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{((eligibleLoan / turnover) * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    </>
                  )}


                </div>
              </div>
            </div>

            <div style={{ marginBottom: 36 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={secS} id="what-is-eligibility">
                <h2 style={h2S}>What Is a Business Loan Eligibility Calculator?</h2>
                <p style={pS}>A Business Loan Eligibility Calculator determines the maximum loan amount you qualify for based on your annual turnover, net profit, CIBIL score, existing EMIs, and whether your business is registered as an MSME. The calculator uses two methods to cross-verify: the Turnover Method (10-15% of annual revenue for unsecured loans) and the Profit/DSCR Method (based on your net profit from ITR).</p>
                <p style={pS}>The final eligible amount is the lower of the two, ensuring you can comfortably repay the loan EMI from your business cash flow. Business loan approval depends on documented financial health. Banks verify your ITR, GST filings, bank statements, and business vintage before lending.</p>
              </div>

              <div style={secS} id="eligibility-formula">
                <h2 style={h2S}>How Banks Calculate Business Loan Eligibility</h2>
                <p style={pS}>Banks use two calculation methods and approve you for the lower amount, which ensures both methods work in the bank's favor. Method 1 bases approval on your business size (turnover). Method 2 bases it on your ability to pay (profit and existing debt obligations).</p>

                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px', color: C.ink }}>Method 1: Turnover Method</p>
                  <p style={{ fontSize: 13, margin: '0 0 8px', color: C.ink2 }}>Unsecured Loan = 10% to 15% of Annual Turnover</p>
                  <p style={{ fontSize: 13, margin: '0 0 12px', color: C.ink2 }}>Secured Loan = 30% to 50% of Annual Turnover (or collateral value, whichever is lower)</p>

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 12 }} />

                  <p style={{ fontSize: 14, fontWeight: 700, margin: '12px 0 12px 0', color: C.ink }}>Method 2: Profit/DSCR Method</p>
                  <p style={{ fontSize: 13, margin: '0 0 8px', color: C.ink2 }}>Max Monthly EMI Capacity = 60% of (Annual Net Profit ÷ 12)</p>
                  <p style={{ fontSize: 13, margin: 0, color: C.ink2 }}>Loan Amount calculated based on max EMI, interest rate, and loan tenure</p>
                </div>
              </div>

              <div style={secS} id="eligibility-by-turnover">
                <h2 style={h2S}>Unsecured Business Loan Amount by Annual Turnover</h2>
                <p style={pS}>Most banks cap unsecured business loans at 10-15% of your annual turnover (this table uses 12% as average). Your actual approved amount depends on your net profit being strong enough to support the EMI. Turnover is just the ceiling. Your profit determines the final amount.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr>
                      <th scope="col" style={thS}>Annual Turnover</th>
                      <th scope="col" style={{ ...thS, textAlign: 'right' }}>Estimated Max Unsecured Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { t: 5000000, l: 600000 },
                        { t: 10000000, l: 1200000 },
                        { t: 50000000, l: 6000000 },
                        { t: 100000000, l: 12000000 },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>Rs {(row.t / 100000).toLocaleString('en-IN')} Lakh</td>
                          <td style={{ ...tdR, textAlign: 'right', color: C.ink }}>Rs {(row.l / 100000).toLocaleString('en-IN')} Lakh</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="msme-mudra">
                <h2 style={h2S}>MSME and Government-Backed Loan Schemes</h2>
                <p style={pS}>If your business is registered as an MSME (Udyam registration), you qualify for government-backed schemes with relaxed eligibility and lower interest rates. These schemes don't require collateral and approve loans based on projected growth rather than past ITRs alone.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Mudra Loans:</strong> For micro-enterprises, with three tiers: Shishu (up to Rs 50K for startups), Kishore (up to Rs 5 Lakh for growing businesses), Tarun (up to Rs 10 Lakh for scaling businesses). Approval is fast (1-2 days) and vintage requirement is minimal.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>CGTMSE Scheme:</strong> Credit Guarantee provided by the government for loans up to Rs 5 Crore, so the bank has zero risk and approves easily. Interest rates are 1-2% lower than standard unsecured loans.</span></div>
              </div>

              <div style={secS} id="secured-vs-unsecured">
                <h2 style={h2S}>Secured vs Unsecured Business Loans: Key Differences</h2>
                <p style={pS}>Secured loans (backed by collateral like property) let you borrow 3-5x more at half the interest rate, but take 15-30 days to approve. Unsecured loans approve in 2-5 days but have strict limits (10-15% of turnover) and higher rates (14-22%).</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead><tr>
                      <th scope="col" style={thS}>Feature</th>
                      <th scope="col" style={thS}>Secured (Collateral)</th>
                      <th scope="col" style={thS}>Unsecured</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { f: 'Interest Rate', s: '8.5% - 12% p.a.', u: '14% - 22% p.a.' },
                        { f: 'Max Tenure', s: 'Up to 15 years', u: '1 to 5 years' },
                        { f: 'Loan Amount', s: 'High (up to 70% of collateral value)', u: 'Low (capped at 10-15% of turnover)' },
                        { f: 'Processing Time', s: '15 - 30 days', u: '2 - 5 days' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.f}</td><td style={tdL}>{row.s}</td><td style={tdL}>{row.u}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="how-to-improve">
                <h2 style={h2S}>How to Qualify for a Bigger Business Loan</h2>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Show higher profit:</strong> Banks use your net profit (from ITR) to calculate your EMI capacity via DSCR. A profit increase of Rs 5 Lakh per year typically unlocks Rs 10-15 Lakh more in loan eligibility.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>File GST consistently:</strong> Banks cross-verify your turnover claim against GST returns. Gaps between GST and ITR figures trigger automatic rejection. File on time, every quarter.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Offer collateral:</strong> Move from unsecured to secured by pledging property or fixed deposits. This instantly increases your eligible amount by 3-5x and cuts interest rates by 4-6 percentage points.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong>Improve CIBIL score:</strong> Scores above 750 qualify for better rates and faster approval. Clear existing defaults, reduce credit utilization, and avoid hard inquiries before applying.</li>
                </ol>
              </div>

              <div style={secS} id="how-to-apply">
                <h2 style={h2S}>How to Apply for a Business Loan: Step-by-Step</h2>
                <p style={pS}>The application process takes 2-5 days for unsecured loans and 15-30 days for secured loans, depending on whether documents are ready. Most banks allow online applications where you upload documents and get pre-approval before visiting a branch.</p>
                <ol style={{ paddingLeft: 24, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { t: 'Assess your eligibility:', d: 'Use this calculator to estimate the loan amount you qualify for based on your turnover, net profit, and MSME status. Know your approximate LTV before applying.' },
                    { t: 'Choose your lender:', d: 'SBI and HDFC Bank offer 8-10% rates and approve in 2-3 days. ICICI and Bajaj Finserv offer faster approvals (1-2 days) at higher rates (14-16%). Select based on your rate tolerance and timeline.' },
                    { t: 'Prepare documents:', d: 'Gather 2-3 years of audited ITRs, last 6-12 months of bank statements, GST returns (if applicable), business registration, and personal identity/address proof.' },
                    { t: 'Apply online or visit branch:', d: 'Online applications are faster. Upload documents on the bank\'s portal or visit a branch. The bank sends you for ITR verification and a branch inspection if needed.' },
                    { t: 'Loan committee approval:', d: 'The bank reviews your DSCR, GST compliance, and business vintage. Approval or rejection comes within 1-5 days for unsecured loans.' },
                    { t: 'Disbursal:', d: 'Approved loan amount is transferred to your business account via NEFT or RTGS within 24-48 hours.' },
                  ].map((step, i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{step.t}:</strong> {step.d}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={secS} id="documents-required">
                <h2 style={h2S}>Documents Required for Business Loan Application</h2>
                <p style={pS}>Business loans require proof of business legitimacy and financial health. The exact checklist varies by loan amount and lender, but these are mandatory across all Indian banks.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Documents required by business type and loan amount</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>For All Businesses</th>
                      <th scope="col" style={thS}>For Manufacturers & Trading</th>
                      <th scope="col" style={thS}>For Loan Above Rs 25 Lakh</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { all: 'Last 2-3 years audited ITRs with P&L and Balance Sheet', mfg: 'GST returns (last 6-12 months)', large: 'Personal guarantee deed (promoter sign)' },
                        { all: 'Last 6-12 months current/business account statements', mfg: 'Udyam registration or GST certificate', large: 'Collateral valuation report (if secured)' },
                        { all: 'Business registration (proprietorship deed, partnership deed, or Articles of Association)', mfg: 'Bank trade credit references (from suppliers)', large: 'Personal net worth statement' },
                        { all: 'Identity proof (Aadhaar, passport)', mfg: 'Inventory valuation or machinery list', large: 'CA/CMA certificate on turnover' },
                        { all: 'Address proof (utility bill or business address proof)', mfg: 'Detailed business plan (for new ventures)', large: 'Collateral documents (property deed, etc.)' },
                        { all: 'PAN and business PAN (if separate)', mfg: '', large: '' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{row.all}</td><td style={tdL}>{row.mfg}</td><td style={tdL}>{row.large}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Missing any document will delay approval by 1-2 weeks. Many rejections stem from mismatches between GST returns and ITR turnover figures. Ensure these two match before submitting.</p>
              </div>

              <div style={secS} id="eligibility-criteria">
                <h2 style={h2S}>Business Loan Eligibility Criteria: What Banks Actually Check</h2>
                <p style={pS}>Beyond your turnover and profit, banks assess five risk factors. Meeting all five is what separates approval from rejection in borderline cases.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Business vintage (minimum 3 years):</strong> Startups and businesses less than 3 years old are rejected outright by SBI, HDFC, and ICICI. New businesses need Mudra loans or NBFC lending instead.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>DSCR (Debt Service Coverage Ratio) of 1.25 or higher:</strong> Your monthly profit must be at least 1.25x your total monthly debt obligations including the new loan EMI. This is the single biggest hurdle.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>CIBIL score 650+ for promoters:</strong> While gold loans ignore credit score, business loans check both the promoter's personal CIBIL and the company's commercial credit rating. Scores below 650 trigger automatic rejection at most banks.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>GST-to-ITR reconciliation:</strong> Your GST returns must match your bank deposits and ITR turnover within 10%. Gaps trigger audit-style scrutiny and often rejection.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>MSME registration (if applicable):</strong> Udyam registration instantly qualifies you for preferential schemes under CGTMSE, lowering your effective rate by 1-2% and relaxing other criteria.</span></div>
              </div>

              <div style={secS} id="increase-eligibility">
                <h2 style={h2S}>How to Qualify for a Higher Business Loan Amount</h2>
                <p style={pS}>If your current eligibility is lower than your need, these concrete steps can unlock Rs 5-25 lakh more within 3-6 months.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Improve your DSCR (fastest impact):</strong> A DSCR increase of 0.1 (from 1.20 to 1.30) typically unlocks Rs 10-15 lakh more in eligible loan amount. Increase profit by reducing expenses or accelerating collections from customers.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Reduce existing EMIs (medium impact):</strong> Closing one existing personal or car loan reduces your monthly obligations and frees up DSCR capacity. Closing a Rs 20k/month loan = Rs 8-12 lakh more in new business loan eligibility.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Offer collateral (high impact but 30-day process):</strong> Moving from unsecured to secured (by pledging property or fixed deposits) can triple your eligible amount. Processing adds 15-30 days to approval.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>File for Udyam registration (medium-term, 30 days):</strong> If unregistered, MSME status immediately qualifies you for CGTMSE schemes that relax DSCR to 1.0 (from 1.25) and reduce your rate by 1-2%.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Bridge existing bank relationships:</strong> If you have a 2+ year deposit or current account with the bank, loan approval and amount both improve. Transfer your payroll and business banking to the same bank 3-6 months before applying.</span></div>
              </div>

              <div style={secS} id="common-rejection">
                <h2 style={h2S}>Common Business Loan Rejection Reasons</h2>
                <p style={pS}>Banks reject business loans for five preventable reasons. Fixing any one of these can turn a rejection into an approval within 30 days.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Rejection reasons and fixes</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Rejection Reason</th>
                      <th scope="col" style={thS}>Fix</th>
                      <th scope="col" style={thS}>Time to Fix</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { r: 'DSCR below 1.25', f: 'Increase profit or reduce debt obligations. Reapply after 2-3 months of improved financials.', t: '3 months' },
                        { r: 'GST-ITR mismatch (>10% gap)', f: 'File amended ITR if needed. Ensure next quarter GST filing matches bank deposits. Most common reason in service businesses.', t: '1-2 quarters' },
                        { r: 'Business less than 3 years old', f: 'Apply for Mudra loans instead (up to Rs 10 Lakh), or wait 6-12 months and reapply to banks.', t: 'Immediate (switch to Mudra)' },
                        { r: 'CIBIL score below 650', f: 'Clear outstanding defaults. Fix errors on credit report via CIBIL portal. Takes 30-90 days post-clearance.', t: '2-3 months' },
                        { r: 'No collateral, unregistered business', f: 'Register as Udyam (30 days). Alternatively offer collateral (property or FD) to qualify for secured loan.', t: '30-60 days' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.r}</td><td style={tdL}>{row.f}</td><td style={tdL}>{row.t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={secS} id="bank-guides">
                <h2 style={h2S}>Business Loan Rates and Terms by Bank</h2>
                <p style={pS}>The five largest business lenders in India offer different rates, tenures, and approval speeds. Choose based on your timeline and rate tolerance.</p>
                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>SBI Business Loan</p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>Rate: 8.00-9.95% p.a. Tenure: Up to 5 years. Processing fee: 0.50%. Approval: 2-3 days for existing customers. SBI's lowest rate makes it the choice for rate-sensitive borrowers willing to wait 2-3 days. DSCR requirement: 1.25.</p>
                </div>
                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>HDFC Bank Business Loan</p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>Rate: 9.10-12% p.a. Tenure: Up to 5 years. Processing fee: 1%. Approval: 2-4 days. HDFC competes on rate but with higher processing fees. Useful if you have an existing HDFC deposit or transaction account. DSCR requirement: 1.25.</p>
                </div>
                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>ICICI Bank Business Loan</p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>Rate: 9.50-15.50% p.a. Tenure: Up to 3 years. Processing fee: 1%. Approval: 1-2 days. ICICI's main advantage is speed, not rate. Choose ICICI if you need funds in 1-2 days and can accept a higher rate. DSCR requirement: 1.25.</p>
                </div>
                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>Axis Bank Business Loan</p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>Rate: 9.50-15.50% p.a. Tenure: Up to 3 years. Processing fee: 1%. Approval: 1-2 days. Similar to ICICI, Axis competes on speed and scheme flexibility, not rate. Mid-sized businesses benefit from Axis's willingness to lend to slightly riskier profiles. DSCR requirement: 1.25.</p>
                </div>
                <div style={{ background: '#fafafa', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 8px' }}>Bajaj Finserv Business Loan</p>
                  <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>Rate: 16.00% p.a. (unsecured), 10.50% (secured). Tenure: Up to 5 years. Processing fee: 1.50%. Approval: 24 hours (fastest). Bajaj focuses on MSME and self-employed who cannot meet bank DSCR. Collateral reduces rate significantly. DSCR requirement: 1.0 (relaxed).</p>
                </div>
              </div>

              <div style={secS} id="tax-treatment">
                <h2 style={h2S}>Tax and Legal Treatment of Business Loans</h2>
                <p style={pS}>Business loan interest is fully deductible as a business expense under Section 36 of the Income Tax Act. Secured loans have additional tax implications depending on the collateral type.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Interest deduction (all business loans):</strong> The full amount of interest paid is deductible from business income, reducing your taxable profit rupee-for-rupee. This is true for both secured and unsecured loans.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>GST on business loans:</strong> No GST is charged on the loan principal or interest. GST applies only to the processing fee at 18%, typically built into the quoted fee (not charged separately).</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>TDS on business loan interest:</strong> No TDS is deducted by the lender on business loan interest. However, if you lend money to other businesses, TDS applies under Section 194A at 10% (if amount exceeds Rs 1 lakh per annum).</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Stamp duty on loan documents:</strong> Business loan agreements attract stamp duty of 0.10-0.50% of the loan amount, varying by state. The lender usually absorbs this.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Property-backed loans (secured):</strong> If you pledge property as collateral, capital gains tax rules apply only if you sell that property later. The mere act of pledging does not trigger tax.</span></div>
              </div>

              <div style={secS} id="self-employed-startups">
                <h2 style={h2S}>Business Loans for Self-Employed and Startup Businesses</h2>
                <p style={pS}>Self-employed professionals and startup founders face tighter eligibility than established businesses, but Mudra loans and NBFC options exist as alternatives to bank rejection.</p>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Self-employed professionals (3+ years in operation):</strong> You qualify for business loans from banks if your business is at least 3 years old and you have audited ITRs or GST returns showing consistent income. DSCR of 1.25 still applies.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Startups and new businesses (less than 3 years):</strong> Banks automatically reject startups. Apply instead to Mudra loans (government scheme, up to Rs 10 Lakh), NBFC lending (Bajaj, Shriram, others at higher rates), or offer collateral to banks to break the 3-year rule.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Proprietary concerns:</strong> A sole proprietor is treated as the business for tax purposes. You need 3 years of ITRs as proprietor, not 3 years of business registration as a legal entity.</span></div>
                <div style={bulletS}><span style={{ flexShrink: 0 }}>&#8226;</span><span><strong>Partnership and LLP firms:</strong> Apply in the firm's name, not as individuals. Require ITRs for the firm (Form 4 filing for partnerships) plus personal guarantees from all partners.</span></div>
              </div>

              <div style={secS} id="loan-comparisons">
                <h2 style={h2S}>Business Loan vs Personal Loan vs Working Capital Loan</h2>
                <p style={pS}>Three loan types serve business cash needs, but they differ in collateral requirements, approval speed, and cost. Choose based on your need and risk tolerance.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>Comparison: Business Loan vs Personal Loan vs Working Capital</caption>
                    <thead><tr>
                      <th scope="col" style={thS}>Feature</th>
                      <th scope="col" style={thS}>Business Loan</th>
                      <th scope="col" style={thS}>Personal Loan</th>
                      <th scope="col" style={thS}>Working Capital Loan</th>
                    </tr></thead>
                    <tbody>
                      {[
                        { f: 'Interest rate', b: '8-15%', p: '10.5-24%', w: '9-18%' },
                        { f: 'Collateral needed', b: 'Not required (unsecured)', p: 'None', w: 'Often required (inventory/receivables)' },
                        { f: 'Business age required', b: 'Minimum 3 years', p: 'N/A', w: 'Minimum 1-2 years' },
                        { f: 'Approval time', b: '2-5 days', p: '1-3 days', w: '5-10 days' },
                        { f: 'Max amount', b: 'Rs 25-100 Lakh', p: 'Rs 10-50 Lakh', w: 'Rs 10-200 Lakh' },
                        { f: 'Best for', b: 'Fixed asset purchase, expansion', p: 'Personal use, quick needs', w: 'Working capital, inventory, receivables' },
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdR}>{row.f}</td><td style={tdL}>{row.b}</td><td style={tdL}>{row.p}</td><td style={tdL}>{row.w}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={pS}>Use this calculator for business loans only. For working capital needs, ask your bank for an overdraft or working capital limit instead, which is cheaper and faster. Personal loans are unsuitable for business use because the lender can call the loan if they learn funds went to business, not personal.</p>
              </div>

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={h2S}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.biz-loan-sidebar::-webkit-scrollbar{width:5px}.biz-loan-sidebar::-webkit-scrollbar-track{background:transparent}.biz-loan-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.biz-loan-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="biz-loan-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Bank Rates Comparison */}
              <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Indicative Rates</div>
                  <div style={{ fontSize: 11, color: C.ink3, marginTop: 3 }}>For {loanType} Business Loans</div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr style={{ background: '#f4f5f6' }}>
                    {['Lender', 'Est. Rate'].map(h => (
                      <th key={h} scope="col" style={{ padding: '9px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: C.ink3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {BANK_RATES.filter(b => loanType === 'Unsecured' ? b.unsec !== null : b.sec !== null).map((b, i) => {
                      const bankRate = loanType === 'Unsecured' ? b.unsec : b.sec;
                      return (
                        <tr key={b.name} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, color: C.ink }}>{b.name}</td>
                          <td style={{ padding: '10px 14px', fontSize: 12, color: C.ink2 }}>{bankRate}% p.a.</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div style={{ padding: '10px 14px', borderTop: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 10, color: C.ink3 }}>Rates vary heavily based on business vintage, industry risk, and credit rating.</span>
                </div>
              </div>

              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Related Calculators" items={POPULAR} />
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
              { hd: 'Calculators', links: ['/calculators/personal-loan-calculator|Personal Loan', '/calculators/home-loan-calculator|Home Loan', '/calculators/emi-calculator|EMI', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/gst-calculator|GST'] },
              { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
              { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
            ])} />
    </div>
  );
}

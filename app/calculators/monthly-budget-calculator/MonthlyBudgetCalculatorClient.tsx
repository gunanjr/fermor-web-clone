'use client';

import { CHART_PAIR, seriesColor } from '../../../src/theme/chartPalette';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087',
  white: '#ffffff', bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

function fmtN(n: number, d = 0) { return n.toLocaleString('en-IN', { maximumFractionDigits: d, minimumFractionDigits: d }); }

interface FaqItem { q: string; a: string; }

// ---- MultiDonutChart ----
function MultiDonutChart({
  segments,
  centerLabel = 'Total',
  centerValue = '',
}: {
  segments: { value: number; color: string; label: string }[];
  centerLabel?: string;
  centerValue?: string;
}) {
  const total = segments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  
  let currentOffset = circ / 4;
  const renderedArcs = segments.map(s => {
    const pct = Math.max(0, s.value) / total;
    const arcLen = pct * circ;
    const offset = currentOffset;
    currentOffset -= arcLen;
    return {
      color: s.color,
      label: s.label,
      pct: Math.round(pct * 100),
      dashArray: `${arcLen} ${circ - arcLen}`,
      dashOffset: offset,
    };
  });

  const topPct = renderedArcs.length > 0 ? renderedArcs[0].pct : 0;

  return (
    <svg role="img" aria-label={segments.map(s => `${s.label}: ${Math.round((s.value / total) * 100)}%`).join(', ')}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.border} strokeWidth={sw} />
      {renderedArcs.map((arc, i) => (
        <circle key={i} cx={cx} cy={cy} r={R} fill="none" stroke={arc.color} strokeWidth={sw}
          strokeDasharray={arc.dashArray} strokeDashoffset={arc.dashOffset}
          style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }} />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>
        {centerLabel}
      </text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 22, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>
        {centerValue || `${topPct}%`}
      </text>
    </svg>
  );
}

// ---- Slider ----
function Slider({ label, id, value, min, max, step, display, onChange }: {
  label: string; id: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <label htmlFor={`${id}-range`} style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{label}</label>
        {editing ? (
          <input id={id} type="number" value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={() => { const v = parseFloat(raw); if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v))); setEditing(false); }}
            onKeyDown={e => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
            style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 6, padding: '3px 8px', width: 110, textAlign: 'right', fontFamily: INTER }}
            autoFocus />
        ) : (
          <button aria-label={`${label}: ${display}. Click to edit.`} onClick={() => { setRaw(String(value)); setEditing(true); }}
            style={{ fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontFamily: INTER }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')} onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 18, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: 4, borderRadius: 2, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)` }} />
        <input id={`${id}-range`} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ position: 'relative', width: '100%', appearance: 'none', background: 'transparent', cursor: 'pointer', zIndex: 1 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.ink3, marginTop: 2 }}>
        <span>{min.toLocaleString('en-IN')}</span><span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

// ---- Expense row ----
function ExpenseRow({ label, value, onChange, symbol }: { label: string; value: number; onChange: (v: number) => void; symbol: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.border}` }}>
      <span style={{ fontSize: 13, color: C.ink2, flex: 1 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(0, value - 500))}
          style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.white, cursor: 'pointer', fontSize: 16, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          -
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, border: `1px solid ${C.border}`, borderRadius: 6, padding: '3px 8px', background: C.white }}>
          <span style={{ fontSize: 11, color: C.ink3, flexShrink: 0 }}>{symbol}</span>
          <input type="number" min={0} value={value} aria-label={`${label} amount`}
            onChange={e => { const v = parseFloat(e.target.value); onChange(isNaN(v) ? 0 : Math.max(0, v)); }}
            style={{ width: 72, fontSize: 13, fontWeight: 600, color: C.ink, border: 'none', outline: 'none', fontFamily: INTER, background: 'transparent', textAlign: 'right' }} />
        </div>
        <button aria-label={`Increase ${label}`} onClick={() => onChange(value + 500)}
          style={{ width: 24, height: 24, borderRadius: '50%', border: `1px solid ${C.border}`, background: C.white, cursor: 'pointer', fontSize: 16, color: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          +
        </button>
      </div>
    </div>
  );
}

const RULE_COLORS = [CHART_PAIR.primary, seriesColor(2), CHART_PAIR.secondary];
const EXPENSE_COLORS = Array.from({ length: 11 }, (_, i) => seriesColor(i));

export default function MonthlyBudgetCalculatorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setMobile(mq.matches);
    const h = () => setMobile(mq.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const [activeTab, setActiveTab] = useState<'rule' | 'custom' | 'actual'>('rule');

  // 50/30/20 tab state
  const [income, setIncome] = useState(75000);
  const [needsPct, setNeedsPct] = useState(50);
  const [wantsPct, setWantsPct] = useState(30);
  const [savingsPct, setSavingsPct] = useState(20);

  // Custom budget tab state
  const [customIncome, setCustomIncome] = useState(75000);
  const [expenses, setExpenses] = useState({
    housing: 20000, food: 10000, transport: 5000, utilities: 3000,
    healthcare: 2000, entertainment: 5000, clothing: 3000,
    education: 5000, insurance: 2000, savings: 15000, other: 5000,
  });
  const expenseKeys = Object.keys(expenses) as (keyof typeof expenses)[];
  const expenseLabels: Record<keyof typeof expenses, string> = {
    housing: 'Housing (Rent / EMI)', food: 'Food and Groceries', transport: 'Transport',
    utilities: 'Utilities (Electricity, Water, Internet)', healthcare: 'Healthcare',
    entertainment: 'Entertainment', clothing: 'Clothing', education: 'Education',
    insurance: 'Insurance Premiums', savings: 'Savings and Investments', other: 'Other',
  };

  // Budget vs Actual tab state
  const [bvaCategories] = useState(['Housing', 'Food', 'Transport', 'Entertainment', 'Savings', 'Other']);
  const [budgeted, setBudgeted] = useState([20000, 10000, 5000, 5000, 15000, 5000]);
  const [actual, setActual] = useState([21000, 12000, 4500, 7000, 15000, 6000]);

  const sym = selectedCurrency.symbol;
  const fmt = (n: number) => formatCurrency(Math.abs(n));

  // 50/30/20 derived
  const convIncome = convertCurrency(income);
  const needsAmt = convIncome * needsPct / 100;
  const wantsAmt = convIncome * wantsPct / 100;
  const savingsAmt = convIncome * savingsPct / 100;

  // Clamp sliders so total = 100
  const setNeeds = (v: number) => {
    const n = Math.min(v, 100 - wantsPct);
    setNeedsPct(n);
    setSavingsPct(100 - n - wantsPct);
  };
  const setWants = (v: number) => {
    const w = Math.min(v, 100 - needsPct);
    setWantsPct(w);
    setSavingsPct(100 - needsPct - w);
  };
  const setSavings = (v: number) => {
    const s = Math.min(v, 100 - needsPct);
    setSavingsPct(s);
    setWantsPct(100 - needsPct - s);
  };

  // Custom budget derived
  const convCustomIncome = convertCurrency(customIncome);
  const totalExpenses = expenseKeys.reduce((sum, k) => sum + convertCurrency(expenses[k]), 0);
  const surplus = convCustomIncome - totalExpenses;
  const savingsRate = convCustomIncome > 0 ? ((convertCurrency(expenses.savings) + Math.max(surplus, 0)) / convCustomIncome * 100) : 0;

  // BvA derived
  const totalBudgeted = budgeted.reduce((a, b) => a + convertCurrency(b), 0);
  const totalActual = actual.reduce((a, b) => a + convertCurrency(b), 0);
  const totalVariance = totalBudgeted - totalActual;

  const tabs = [
    { id: 'rule' as const, label: '50/30/20 Rule' },
    { id: 'custom' as const, label: 'Custom Budget' },
    { id: 'actual' as const, label: 'Budget vs Actual' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <style>{`
        .budget-sidebar::-webkit-scrollbar { width: 5px; }
        .budget-sidebar::-webkit-scrollbar-track { background: transparent; }
        .budget-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        input[type=range]::-webkit-slider-thumb { appearance: none; width: 18px; height: 18px; border-radius: 50%; background: ${C.dark}; border: 2px solid ${C.white}; box-shadow: 0 1px 4px rgba(0,0,0,0.2); cursor: pointer; }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: ${C.dark}; border: 2px solid ${C.white}; cursor: pointer; }
      `}</style>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '16px 16px' : '32px 32px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Monthly Budget Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Apply the 50/30/20 rule, build a custom budget, and compare budget vs actual spending.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 32, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <CurrencySelector />
            </div>

            {/* Calculator card */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              {/* Tabs */}
              <div role="tablist" aria-label="Budget method" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {tabs.map(t => (
                  <button key={t.id} id={`tab-${t.id}`} role="tab" aria-selected={activeTab === t.id} aria-controls={`panel-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      flex: 1, padding: mobile ? '12px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12 : 13, fontWeight: activeTab === t.id ? 700 : 400,
                      color: activeTab === t.id ? C.dark : C.ink3,
                      borderBottom: activeTab === t.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Tab: 50/30/20 */}
              {activeTab === 'rule' && (
                <div id="panel-rule" role="tabpanel" aria-labelledby="tab-rule">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    <div style={{ padding: mobile ? 20 : 28, borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <Slider label="Monthly Take-Home Income" id="income" value={income} min={10000} max={500000} step={1000}
                        display={`${sym}${fmtN(income)}`} onChange={setIncome} />
                      <div style={{ height: 1, background: C.border, margin: '20px 0' }} />
                      <Slider label={`Needs (${needsPct}%)`} id="needs-pct" value={needsPct} min={0} max={80} step={1}
                        display={`${needsPct}%`} onChange={setNeeds} />
                      <Slider label={`Wants (${wantsPct}%)`} id="wants-pct" value={wantsPct} min={0} max={60} step={1}
                        display={`${wantsPct}%`} onChange={setWants} />
                      <Slider label={`Savings (${savingsPct}%)`} id="savings-pct" value={savingsPct} min={0} max={60} step={1}
                        display={`${savingsPct}%`} onChange={setSavings} />
                      <div style={{ fontSize: 11, color: C.ink3, textAlign: 'center' }}>
                        Total: {needsPct + wantsPct + savingsPct}% (always 100%)
                      </div>
                    </div>
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <MultiDonutChart segments={[
                          { value: needsAmt, color: CHART_PAIR.primary, label: 'Needs' },
                          { value: wantsAmt, color: seriesColor(2), label: 'Wants' },
                          { value: savingsAmt, color: CHART_PAIR.secondary, label: 'Savings' },
                        ]} centerLabel="Budget Split" centerValue={`${savingsPct}% Save`} />
                      </div>
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[{ color: CHART_PAIR.primary, label: 'Needs' }, { color: seriesColor(2), label: 'Wants' }, { color: CHART_PAIR.secondary, label: 'Savings' }].map(l => (
                          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 11, height: 11, borderRadius: 3, background: l.color }} aria-hidden="true" />
                            <span style={{ fontSize: 13, color: C.ink2 }}>{l.label}</span>
                          </div>
                        ))}
                      </div>
                      {/* Dark box: savings */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 12 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Monthly Savings</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Monthly Needs</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div aria-live="polite" style={{ fontSize: 22, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>{fmt(savingsAmt)}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmt(needsAmt)}</div>
                        </div>
                      </div>
                      {[
                        { label: 'Monthly Wants', val: fmt(wantsAmt) },
                        { label: 'Savings Rate', val: `${savingsPct}%` },
                        { label: 'Annual Savings', val: fmt(savingsAmt * 12) },
                        { label: 'Monthly Income', val: fmt(convIncome) },
                      ].map(r => (
                        <div key={r.label} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13, fontFamily: INTER }}>
                          <span style={{ color: C.ink2 }}>{r.label}</span>
                          <span style={{ color: C.ink, fontWeight: 600 }}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Custom Budget */}
              {activeTab === 'custom' && (
                <div id="panel-custom" role="tabpanel" aria-labelledby="tab-custom">
                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                      <Slider label="Monthly Take-Home Income" id="custom-income" value={customIncome} min={10000} max={500000} step={1000}
                        display={`${sym}${fmtN(customIncome)}`} onChange={setCustomIncome} />
                      <div style={{ height: 1, background: C.border, margin: '16px 0 12px' }} />
                      <p style={{ fontSize: 12, color: C.ink3, marginBottom: 12 }}>Monthly Expenses</p>
                      {expenseKeys.map(k => (
                        <ExpenseRow key={k} label={expenseLabels[k]} value={expenses[k]}
                          symbol={sym} onChange={v => setExpenses(ex => ({ ...ex, [k]: v }))} />
                      ))}
                    </div>
                    <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                        <MultiDonutChart segments={expenseKeys.map((k, i) => ({
                          value: convertCurrency(expenses[k]),
                          color: EXPENSE_COLORS[i % EXPENSE_COLORS.length],
                          label: expenseLabels[k].split(' ')[0],
                        }))} centerLabel="Expenses" centerValue={fmt(totalExpenses)} />
                      </div>
                      <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 12, marginBottom: mobile ? 12 : 20, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {expenseKeys.slice(0, 6).map((k, i) => (
                          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 11, height: 11, borderRadius: 3, background: EXPENSE_COLORS[i], flexShrink: 0 }} aria-hidden="true" />
                            <span style={{ fontSize: 13, color: C.ink2 }}>{expenseLabels[k].split(' ')[0]}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{
                        width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8',
                        borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 12
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#101214' }}>
                            {surplus >= 0 ? 'Surplus' : 'Deficit'}
                          </div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Total Expenses</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <div aria-live="polite" style={{ fontSize: 22, fontWeight: 800, color: surplus >= 0 ? '#1F7A58' : '#101214', lineHeight: 1 }}>{fmt(surplus)}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmt(totalExpenses)}</div>
                        </div>
                      </div>
                      {[
                        { label: 'Monthly Income', val: fmt(convCustomIncome) },
                        { label: 'Total Expenses', val: fmt(totalExpenses) },
                        { label: `${surplus >= 0 ? 'Surplus' : 'Deficit'}`, val: fmt(surplus) },
                        { label: 'Savings Rate', val: `${savingsRate.toFixed(1)}%` },
                        { label: 'Annual Savings', val: fmt(convertCurrency(expenses.savings) * 12) },
                      ].map(r => (
                        <div key={r.label} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, fontSize: 13, fontFamily: INTER }}>
                          <span style={{ color: C.ink2 }}>{r.label}</span>
                          <span style={{ color: C.ink, fontWeight: 600 }}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Budget vs Actual */}
              {activeTab === 'actual' && (
                <div id="panel-actual" role="tabpanel" aria-labelledby="tab-actual" style={{ padding: mobile ? 20 : 28 }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '6px 0', textAlign: 'left' }}>
                        Enter budgeted and actual amounts for each category. Over-budget rows show a warning.
                      </caption>
                      <thead>
                        <tr>
                          {['Category', 'Budgeted', 'Actual', 'Variance', 'Status'].map((h, i) => (
                            <th key={h} scope="col" style={{ padding: '9px 12px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i > 0 ? 'right' : 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {bvaCategories.map((cat, i) => {
                          const b = convertCurrency(budgeted[i]);
                          const a = convertCurrency(actual[i]);
                          const variance = b - a;
                          const over = variance < 0;
                          return (
                            <tr key={cat} style={{ background: over ? C.bg : C.white }}>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, color: C.ink2, fontWeight: 500 }}>{cat}</td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                  <span style={{ fontSize: 11, color: C.ink3 }}>{sym}</span>
                                  <input type="number" min={0} value={budgeted[i]} aria-label={`Budgeted for ${cat}`}
                                    onChange={e => { const v = parseFloat(e.target.value); setBudgeted(prev => { const n = [...prev]; n[i] = isNaN(v) ? 0 : v; return n; }); }}
                                    style={{ width: 80, fontSize: 13, fontWeight: 600, color: C.ink, border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 6px', fontFamily: INTER, textAlign: 'right', background: 'transparent' }} />
                                </div>
                              </td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, textAlign: 'right' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
                                  <span style={{ fontSize: 11, color: C.ink3 }}>{sym}</span>
                                  <input type="number" min={0} value={actual[i]} aria-label={`Actual for ${cat}`}
                                    onChange={e => { const v = parseFloat(e.target.value); setActual(prev => { const n = [...prev]; n[i] = isNaN(v) ? 0 : v; return n; }); }}
                                    style={{ width: 80, fontSize: 13, fontWeight: 600, color: C.ink, border: `1px solid ${over ? C.ink3 : C.border}`, borderRadius: 4, padding: '2px 6px', fontFamily: INTER, textAlign: 'right', background: 'transparent' }} />
                                </div>
                              </td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 600, color: over ? C.ink2 : '#166534' }}>
                                {over ? '-' : '+'}{sym}{fmtN(Math.abs(variance))}
                              </td>
                              <td style={{ padding: '9px 12px', border: `1px solid ${C.border}`, textAlign: 'right' }}>
                                {over ? (
                                  <span style={{ fontSize: 11, background: C.bg, color: C.ink, borderRadius: 4, padding: '2px 8px', fontWeight: 600 }}>Over</span>
                                ) : (
                                  <span style={{ fontSize: 11, background: '#DCFCE7', color: '#166534', borderRadius: 4, padding: '2px 8px', fontWeight: 600 }}>OK</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                        <tr style={{ background: '#f4f5f6', fontWeight: 700 }}>
                          <td style={{ padding: '10px 12px', border: `1px solid ${C.border}`, color: C.ink, fontWeight: 700 }}>Total</td>
                          <td style={{ padding: '10px 12px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.ink }}>{sym}{fmtN(totalBudgeted)}</td>
                          <td style={{ padding: '10px 12px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.ink }}>{sym}{fmtN(totalActual)}</td>
                          <td style={{ padding: '10px 12px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 700, color: totalVariance < 0 ? C.ink2 : '#166534' }}>
                            {totalVariance < 0 ? '-' : '+'}{sym}{fmtN(Math.abs(totalVariance))}
                          </td>
                          <td style={{ padding: '10px 12px', border: `1px solid ${C.border}`, textAlign: 'right' }}>
                            {totalVariance < 0
                              ? <span style={{ fontSize: 11, background: C.bg, color: C.ink, borderRadius: 4, padding: '2px 8px', fontWeight: 600 }}>Over budget</span>
                              : <span style={{ fontSize: 11, background: '#DCFCE7', color: '#166534', borderRadius: 4, padding: '2px 8px', fontWeight: 600 }}>Under budget</span>
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* WaitlistCard */}
            <SaveResultsCard mobile={mobile} />

            

            {/* Article */}
            <article itemScope itemType="https://schema.org/Article">
              <h2 id="what-is-50-30-20" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>What Is the 50/30/20 Budget Rule?</h2>
              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  The 50/30/20 rule divides your take-home monthly income into three categories: 50% for needs, 30% for wants, and 20% for savings and investments. It is the most widely used personal budgeting framework in India and globally because it is simple to apply without tracking every rupee.
                </p>
              </div>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The framework was popularized by Elizabeth Warren and works well for Indian salaried employees earning between Rs 30,000 and Rs 5,00,000 per month in take-home pay. It is a starting point, not a rigid rule: your actual splits will depend on your city, rent burden, and financial goals.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                The key insight is that budgeting works only if the categories are practical. In India, the needs bucket typically includes rent or home loan EMI, grocery bills, electricity and internet, school fees, domestic help, and loan EMIs. The wants bucket includes dining out, OTT subscriptions, vacations, and lifestyle spending.
              </p>

              {/* Budget examples table */}
              <h2 id="india-budget-examples" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Monthly Budget Examples for Indian Salaries</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The following table applies the 50/30/20 rule to common Indian take-home salary levels. These are starting points; adjust for your city and lifestyle.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <caption style={{ captionSide: 'bottom', fontSize: 11, color: C.ink3, padding: '4px 0', textAlign: 'left' }}>
                    50/30/20 budget allocation by monthly take-home salary. All figures in Rs per month.
                  </caption>
                  <thead>
                    <tr>
                      {['Take-Home Salary', 'Needs (50%)', 'Wants (30%)', 'Savings (20%)', 'Annual Savings'].map((h, i) => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: i === 0 ? 'left' : 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[30000, 50000, 75000, 100000, 150000, 200000].map(sal => (
                      <tr key={sal}>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}` }}>Rs {fmtN(sal)}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>Rs {fmtN(sal * 0.5)}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, textAlign: 'right' }}>Rs {fmtN(sal * 0.3)}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 600, border: `1px solid ${C.border}`, textAlign: 'right' }}>Rs {fmtN(sal * 0.2)}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#B45309', border: `1px solid ${C.border}`, textAlign: 'right' }}>Rs {fmtN(sal * 0.2 * 12)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Promo bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See how your monthly savings grow if invested in a SIP at 12% CAGR.</p>
                </div>
                <Link className="fx-btn" href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Open calculator
                </Link>
              </div>

              <h2 id="needs-vs-wants" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Needs vs Wants: How to Classify Expenses in India</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                The most common budgeting mistake is misclassifying wants as needs. Groceries are a need; eating out is a want. EMI on your existing home loan is a need; upgrading to a bigger apartment is a want-driven decision.
              </p>
              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr>
                      {['Expense', 'Category', 'Notes'].map((h, i) => (
                        <th key={h} scope="col" style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Rent or home loan EMI', 'Need', 'Housing is a basic requirement'],
                      ['Grocery store spending', 'Need', 'Basic food is non-negotiable'],
                      ['Restaurant meals, Swiggy, Zomato', 'Want', 'Discretionary food expense'],
                      ['Electricity and water bills', 'Need', 'Essential utilities'],
                      ['OTT subscriptions (Netflix, Prime)', 'Want', 'Entertainment, not a need'],
                      ['Term insurance premium', 'Need', 'Financial protection'],
                      ['Mobile and internet bill', 'Need', 'Communication infrastructure'],
                      ['Air travel, hotel stays', 'Want', 'Unless work-mandated'],
                      ['School and college fees', 'Need', 'Essential for dependents'],
                      ['Online shopping, fashion', 'Want', 'Lifestyle spending'],
                      ['Gym membership, club fees', 'Want', 'Health is need but this specific format is a want'],
                      ['Domestic help salary', 'Need', 'If dual-income household depends on this'],
                      ['Car loan EMI on existing car', 'Need', 'Committed debt obligation'],
                    ].map((row) => (
                      <tr key={row[0]}>
                        <td style={{ padding: '10px 14px', fontSize: 13, color: C.ink2, border: `1px solid ${C.border}` }}>{row[0]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, border: `1px solid ${C.border}`, color: row[1] === 'Need' ? '#166534' : C.ink2 }}>{row[1]}</td>
                        <td style={{ padding: '10px 14px', fontSize: 13, color: C.ink3, border: `1px solid ${C.border}` }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="zero-based-budgeting" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Zero-Based Budgeting vs 50/30/20</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                Zero-based budgeting assigns every rupee of income a purpose until income minus allocations equals zero. You justify every expense from scratch each month. The 50/30/20 rule uses fixed proportions without itemizing every expense.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                Zero-based budgeting is better for aggressive debt repayment or maximizing savings, but requires monthly discipline. The 50/30/20 rule is better for people who want a simple system they will actually stick to. The Custom Budget tab in this calculator bridges both approaches: it gives you itemized control within a flexible structure.
              </p>

              <h2 id="savings-rate" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>What Is a Good Savings Rate for Indians?</h2>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                A savings rate of 20% of take-home salary is the standard target. But the right rate depends on your age and goals.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 12 }}>
                At age 25 on Rs 50,000 take-home: saving 15% (Rs 7,500) in a SIP at 12% CAGR over 35 years builds Rs 4.76 crore. At age 35 on the same salary: saving 20% (Rs 10,000) at 12% CAGR over 25 years builds Rs 1.90 crore. Starting 10 years earlier nearly triples the outcome at a lower savings rate.
              </p>
              <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, marginBottom: 24 }}>
                Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> to model your monthly savings compounding over 10, 20, and 30 years. Then use the <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Emergency Fund Calculator</Link> to determine how much of your savings should stay liquid before investing.
              </p>

              <h2 id="budget-mistakes" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>7 Common Budget Mistakes Indians Make</h2>
              <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Budgeting gross salary instead of take-home.</strong> Always use the amount credited to your bank account after EPF and TDS deductions.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Not accounting for annual expenses.</strong> Car insurance, annual maintenance contracts, school admission fees, and holiday travel are real expenses. Divide them by 12 and include a monthly allocation.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Saving what is left, not saving first.</strong> Automate SIP and PPF transfers on salary day. Whatever remains is the spending budget, not the reverse.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Underestimating wants spending.</strong> UPI makes small transactions invisible. Check your monthly bank statement and add up all discretionary purchases.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>No emergency fund buffer.</strong> Without 3 to 6 months of expenses in a liquid fund or sweep FD, any unexpected expense destroys the budget and forces high-interest borrowing.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Ignoring lifestyle inflation.</strong> Every salary hike is an opportunity to increase savings rate, not just lifestyle spending. Increase your SIP by the same percentage as your hike.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Not reviewing the budget quarterly.</strong> Income, rent, EMIs, and expenses change. A budget that worked in January may be outdated by April. Quarterly reviews take 20 minutes and are worth far more.</li>
              </ol>

              <h2 id="how-to-use" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How to Use This Budget Calculator</h2>
              <ol style={{ margin: '0 0 24px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>50/30/20 Rule tab:</strong> enter your take-home income and drag the sliders to adjust the needs, wants, and savings split. The three percentages always total 100%.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Custom Budget tab:</strong> enter income once, then adjust expense amounts for 11 categories using + and - buttons or by typing directly. See your total expenses, surplus or deficit, and savings rate.</li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Budget vs Actual tab:</strong> set a budgeted amount for each of the 6 categories, then enter what you actually spent. The table shows the variance for each category and flags over-budget items.</li>
              </ol>

              {/* FAQ */}
              <h2 id="faq-section" style={{ fontSize: 22, fontWeight: 700, color: C.ink, margin: '0 0 16px' }}>Frequently Asked Questions</h2>
              <FAQBox items={faqItems} />

              {/* Disclaimer */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> This calculator provides indicative budget allocations based on the 50/30/20 rule and is for educational and planning purposes only. It does not account for individual income tax liability, EPF or other statutory deductions, or specific financial circumstances. Amounts shown are estimates only. Consult a SEBI-registered investment adviser for personalized financial planning.
                </p>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <style>{`
            .budget-sidebar::-webkit-scrollbar { width: 5px; }
            .budget-sidebar::-webkit-scrollbar-track { background: transparent; }
            .budget-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .budget-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside className="budget-sidebar" style={{
            position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
            overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2,
            scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Popular Calculators</span>
                  </div>
                  {[
                    { slug: 'sip-calculator', title: 'SIP Calculator', desc: 'Monthly SIP growth' },
                    { slug: 'emergency-fund-calculator', title: 'Emergency Fund', desc: '3-12 months of expenses' },
                    { slug: 'goal-planning-calculator', title: 'Goal Planning', desc: 'Monthly SIP for any goal' },
                    { slug: 'savings-account-interest-calculator', title: 'Savings Interest', desc: 'Daily balance method' },
                    { slug: 'in-hand-salary-calculator', title: 'In-Hand Salary', desc: 'Take-home after deductions' },
                    { slug: 'savings-growth-calculator', title: 'Savings Growth Tracker', desc: 'Project savings over years' },
                    { slug: 'wealth-growth-calculator', title: 'Wealth Growth', desc: 'Year-by-year breakdown' },
                  ].map(c => (
                    <Link key={c.slug} href={`/calculators/${c.slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'block', padding: '10px 16px', borderBottom: `1px solid ${C.border}`, textDecoration: 'none' }}
                      onMouseOver={e => (e.currentTarget.style.background = C.bg)}
                      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>{c.title}</div>
                      <div style={{ fontSize: 11.5, color: C.ink3, fontFamily: INTER }}>{c.desc}</div>
                    </Link>
                  ))}
                </div>
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>More Calculators</span>
                  </div>
                  {[
                    { slug: 'income-tax-calculator', title: 'Income Tax', desc: 'New vs old regime' },
                    { slug: 'ppf-calculator', title: 'PPF Calculator', desc: '15-year growth' },
                    { slug: 'retirement-calculator', title: 'Retirement Planner', desc: 'Retirement corpus goal' },
                    { slug: 'net-worth-calculator', title: 'Net Worth', desc: 'Assets minus liabilities' },
                    { slug: 'fd-calculator', title: 'FD Calculator', desc: 'Fixed deposit returns' },
                  ].map(c => (
                    <Link key={c.slug} href={`/calculators/${c.slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'block', padding: '10px 16px', borderBottom: `1px solid ${C.border}`, textDecoration: 'none' }}
                      onMouseOver={e => (e.currentTarget.style.background = C.bg)}
                      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, fontFamily: INTER }}>{c.title}</div>
                      <div style={{ fontSize: 11.5, color: C.ink3, fontFamily: INTER }}>{c.desc}</div>
                    </Link>
                  ))}
                </div>
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: [ '/calculators/fd-calculator|FD Calculator', '/calculators/mortgage-calculator|Mortgage', '/calculators/sip-calculator|SIP', '/calculators/gold-loan-calculator|Gold Loan', '/calculators/income-tax-calculator|Income Tax', '/calculators/emi-calculator|EMI', ]},
        { hd: 'Topics', links: ['/#|Fixed Deposits', '/#|Home Loans', '/#|Savings', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Rates are indicative. Not financial advice." />
    </div>
  );
}

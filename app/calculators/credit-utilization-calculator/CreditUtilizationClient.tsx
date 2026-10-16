'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
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
const MAX_CARDS = 6;

/* ─── Types ─────────────────────────────────────────────────── */
interface CardRow {
  id: string;
  name: string;
  balance: number;
  limit: number;
}

const DEFAULT_CARDS: CardRow[] = [
  { id: 'c1', name: 'Everyday Card', balance: 62000, limit: 100000 },
  { id: 'c2', name: 'Travel Card',   balance: 10000, limit: 150000 },
  { id: 'c3', name: 'Shopping Card', balance: 45000, limit: 50000 },
  { id: 'c4', name: 'Fuel Card',     balance: 13000, limit: 40000 },
];

/* A common way to read utilization. Not an official bureau scale. */
function rating(pct: number) {
  if (pct > 100) return 'Over limit';
  if (pct >= 50) return 'High';
  if (pct >= 30) return 'Fair';
  if (pct >= 10) return 'Good';
  return 'Excellent';
}

/* ─── Utilization math ──────────────────────────────────────── */
// Overall utilization = total balance / total limit (never the average of per-card %).
// Pay-down to a target t%: overall = max(0, B - t% x L); every card = sum of max(0, b - t% x l).
// Limit needed for t% at the current balance = B / t%.
function computeUtilization(cards: CardRow[], targetPct: number, extraLimit: number) {
  const totalBalance = cards.reduce((s, c) => s + Math.max(0, c.balance || 0), 0);
  const totalLimit = cards.reduce((s, c) => s + Math.max(0, c.limit || 0), 0);
  const t = targetPct / 100;
  const overallPct = totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;
  const perCard = cards.map(c => {
    const pct = c.limit > 0 ? (c.balance / c.limit) * 100 : null;
    return {
      ...c,
      pct,
      available: Math.max(0, c.limit - c.balance),
      payToTarget: c.limit > 0 ? Math.max(0, c.balance - t * c.limit) : c.balance,
    };
  });
  const limitNeeded = totalBalance > 0 ? Math.ceil((totalBalance * 100) / targetPct - 1e-9) : 0;
  const highest = perCard.filter(c => c.pct !== null).sort((a, b) => (b.pct as number) - (a.pct as number))[0] ?? null;
  return {
    totalBalance,
    totalLimit,
    overallPct,
    available: Math.max(0, totalLimit - totalBalance),
    payOverall: Math.max(0, totalBalance - t * totalLimit),
    payEveryCard: perCard.reduce((s, c) => s + c.payToTarget, 0),
    limitNeeded,
    extraLimitNeeded: Math.max(0, limitNeeded - totalLimit),
    maxBalanceAtTarget: t * totalLimit,
    pctWithExtra: totalLimit + extraLimit > 0 ? (totalBalance / (totalLimit + extraLimit)) * 100 : 0,
    perCard,
    highest,
  };
}

/* ─── Slider (VPF) ───────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const rangeId = `${id}-range`;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? id : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={id} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
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
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
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

/* ─── Donut (VPF geometry: one track + one overlay arc) ──────── */
function DonutChart({ used, total }: { used: number; total: number }) {
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const usedArc = (Math.min(used, total) / total) * circ;
  const usedPct = Math.round((used / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Credit utilization: ${usedPct}% of total credit limit used`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${usedArc} ${circ - usedArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Used</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{usedPct}%</text>
    </svg>
  );
}

/* ─── Per-card utilization chart ──────────────────────────────── */
function CardChart({ cards, mobile }: {
  cards: { id: string; name: string; pct: number | null }[]; mobile: boolean;
}) {
  const rows = cards.filter(c => c.pct !== null) as { id: string; name: string; pct: number }[];
  if (rows.length === 0) return null;
  const W = mobile ? 400 : 800, H = 160, PADT = 16, PADB = 22;
  const slot = W / rows.length;
  const barW = Math.min(mobile ? 44 : 72, slot * 0.55);
  const y = (pct: number) => PADT + H - (Math.min(pct, 100) / 100) * H;
  const clip = (s: string) => s.length > (mobile ? 9 : 16) ? `${s.slice(0, mobile ? 8 : 15)}.` : s;
  return (
    <svg role="img" aria-label="Share of each card's credit limit in use"
      viewBox={`0 0 ${W} ${PADT + H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((c, i) => {
        const x = i * slot + (slot - barW) / 2;
        const usedTop = y(c.pct);
        return (
          <g key={c.id}>
            <title>{`${c.name || 'Card'}: ${c.pct.toFixed(1)}% used`}</title>
            <rect x={x} y={PADT} width={barW} height={H} fill={CHART_PAIR.secondary} rx={3} />
            <rect x={x} y={usedTop} width={barW} height={PADT + H - usedTop} fill={CHART_PAIR.primary} rx={3} />
            <text x={x + barW / 2} y={usedTop - 4} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: C.ink, fontFamily: INTER }}>
              {c.pct > 100 ? '100%+' : `${Math.round(c.pct)}%`}
            </text>
            <text x={x + barW / 2} y={PADT + H + 15} textAnchor="middle" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>
              {clip(c.name || 'Card')}
            </text>
          </g>
        );
      })}
      <line x1={0} y1={PADT + H} x2={W} y2={PADT + H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

/* ─── Quick Facts ─────────────────────────────────────────────── */
function UtilizationQuickFacts() {
  const rows = [
    { label: 'Formula',                   value: 'Balance / Limit x 100' },
    { label: 'Common guideline',          value: 'Under 30%' },
    { label: 'Strong profile',            value: 'Under 10%' },
    { label: 'Checked per card',          value: 'And overall' },
    { label: 'Bureau updates (India)',    value: '4 times a month' },
    { label: 'Cards supported',           value: `Up to ${MAX_CARDS}` },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', fontFamily: INTER, background: C.white, flexShrink: 0 }}>
      <div style={{ background: '#f4f5f6', padding: '12px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink }}>Utilization Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 18px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Table of contents ──────────────────────────────────────── */
const TOC_ITEMS = [
  { id: 'what-is-utilization',     label: 'What is credit utilization' },
  { id: 'utilization-formula',     label: 'Formula and calculation' },
  { id: 'utilization-examples',    label: 'Credit utilization examples' },
  { id: 'per-card-vs-overall',     label: 'Per card vs overall' },
  { id: 'good-utilization-ratio',  label: 'What is a good ratio' },
  { id: 'thirty-percent-rule',     label: 'The 30% rule by limit' },
  { id: 'credit-limit-needed',     label: 'Credit limit you need' },
  { id: 'utilization-cibil-score', label: 'Effect on CIBIL score' },
  { id: 'reporting-frequency',     label: 'When it is reported' },
  { id: 'lower-utilization',       label: 'How to lower it' },
  { id: 'closing-and-over-limit',  label: 'Closing cards, over-limit' },
  { id: 'utilization-vs-dti',      label: 'Utilization vs DTI' },
  { id: 'common-mistakes',         label: 'Common mistakes' },
  { id: 'utilization-limitations', label: 'Limitations' },
  { id: 'how-to-use',              label: 'How to use' },
  { id: 'faq',                     label: 'FAQs' },
];

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '0 0 44px', fontFamily: INTER, background: C.white }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 2 }}>
        {TOC_ITEMS.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} style={{ fontSize: 13, color: C.ink2, textDecoration: 'none', padding: '6px 10px', borderRadius: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: C.ink3, fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─── Sidebar list (VPF) ─────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/credit-health-score-calculator',   label: 'Credit Health Score Calculator' },
  { href: '/calculators/credit-card-interest-calculator',  label: 'Credit Card Interest Calculator' },
  { href: '/calculators/credit-card-emi-calculator',       label: 'Credit Card EMI Calculator' },
  { href: '/calculators/debt-to-income-ratio-calculator',  label: 'Debt-to-Income Ratio Calculator' },
  { href: '/calculators/debt-snowball-calculator',         label: 'Debt Snowball Calculator' },
  { href: '/calculators/debt-avalanche-calculator',        label: 'Debt Avalanche Calculator' },
  { href: '/calculators/debt-consolidation-calculator',    label: 'Debt Consolidation Calculator' },
];
const MORE = [
  { href: '/calculators/credit-card-comparison-calculator',   label: 'Credit Card Comparison Calculator' },
  { href: '/calculators/personal-loan-eligibility-calculator', label: 'Personal Loan Eligibility' },
  { href: '/calculators/loan-eligibility-calculator',         label: 'Loan Eligibility Calculator' },
  { href: '/calculators/monthly-budget-calculator',           label: 'Monthly Budget Calculator' },
  { href: '/calculators/emergency-fund-calculator',           label: 'Emergency Fund Calculator' },
];

/* ─── FAQ (single-sourced via props from page.tsx) ───────────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ─── In-content promo bar ───────────────────────────────────── */
function PromoBar({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 44, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{text}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

/* ─── Standard CA CTA (CLAUDE.md block) ──────────────────────── */

let idCounter = 0;
function nextId() { idCounter += 1; return `card-${Date.now()}-${idCounter}`; }

/* ─── Main ───────────────────────────────────────────────────── */
export default function CreditUtilizationClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const defaultSettings = { cards: DEFAULT_CARDS, targetPct: 30, extraLimit: 0 };
  const { settings, updateSettings } = useCalculatorSettings('credit-utilization', defaultSettings);
  const cards: CardRow[] = settings.cards && settings.cards.length > 0 ? settings.cards : DEFAULT_CARDS;
  const targetPct: number = settings.targetPct ?? 30;
  const extraLimit: number = settings.extraLimit ?? 0;

  const setCards = (next: CardRow[]) => updateSettings({ cards: next });
  const setTargetPct = (v: number) => updateSettings({ targetPct: v });
  const setExtraLimit = (v: number) => updateSettings({ extraLimit: v });

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const updateCard = (id: string, patch: Partial<CardRow>) => setCards(cards.map(c => c.id === id ? { ...c, ...patch } : c));
  const removeCard = (id: string) => { if (cards.length > 1) setCards(cards.filter(c => c.id !== id)); };
  const addCard = () => {
    if (cards.length >= MAX_CARDS) return;
    setCards([...cards, { id: nextId(), name: `Card ${cards.length + 1}`, balance: 0, limit: 50000 }]);
  };

  const r = useMemo(() => computeUtilization(cards, targetPct, extraLimit), [cards, targetPct, extraLimit]);

  const usedPct = r.totalLimit > 0 ? Math.round(r.overallPct) : 0;
  const availPct = Math.max(0, 100 - usedPct);
  const barUsed = Math.min(100, usedPct);
  const levels: [number, string][] = [[10, 'strong profile'], [30, 'common guideline'], [50, 'high use'], [75, 'heavy use'], [100, 'full limit']];

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: mobile ? 15 : 16, fontWeight: 700, color: C.ink, margin: '0 0 10px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const li  = { fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const olS = { margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' } as React.CSSProperties;
  const ulS = { margin: '0 0 16px', paddingLeft: 20, listStyleType: 'disc' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const thR = { ...thS, textAlign: 'right' as const };
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdN = { ...tdR, textAlign: 'right' as const };
  const tdFirst = { ...tdL, fontWeight: 600, color: C.ink };
  const capS = { captionSide: 'bottom' as const, textAlign: 'left' as const, fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' };
  const tableS = { width: '100%', borderCollapse: 'collapse' as const, border: `1px solid ${C.border}`, fontSize: 13 };
  const linkS = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const rowBg = (i: number) => ({ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' });
  const numInput = { width: '100%', fontSize: 13, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 8px', outline: 'none', fontFamily: INTER, boxSizing: 'border-box' } as React.CSSProperties;
  const schedTh = { padding: '10px 14px', textAlign: 'right' as const, fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase' as const, letterSpacing: '0.06em', whiteSpace: 'nowrap' as const };
  const schedCap = { captionSide: 'bottom' as const, textAlign: 'left' as const, fontSize: 11.5, color: C.ink3, padding: mobile ? '8px 16px 16px' : '8px 44px 20px' };
  const edge = mobile ? 16 : 44;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Credit Utilization Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Add your credit cards to calculate your credit utilization ratio, overall and card by card. See how much to pay down, or how much limit you need, to get under 30%.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Credit Utilization Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* ───── INPUT PANEL (no fill colors) ───── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Your Credit Cards'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
                        {cards.map((card, i) => {
                          const pct = card.limit > 0 ? (card.balance / card.limit) * 100 : null;
                          return (
                            <div key={card.id} style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <input
                                  value={card.name}
                                  onChange={e => updateCard(card.id, { name: e.target.value })}
                                  aria-label={`Card ${i + 1} name`}
                                  style={{ fontSize: 14, fontWeight: 700, color: C.ink, background: 'transparent', border: 'none', outline: 'none', fontFamily: INTER, padding: 0, width: '60%' }}
                                />
                                {cards.length > 1 && (
                                  <button onClick={() => removeCard(card.id)} aria-label={`Remove ${card.name || 'card'}`}
                                    style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: C.ink3, fontSize: 14, lineHeight: 1, padding: 0 }}>
                                    &times;
                                  </button>
                                )}
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                  <span style={{ fontSize: 11, color: C.ink3 }}>Outstanding balance</span>
                                  <input type="number" min={0} value={card.balance}
                                    onChange={e => updateCard(card.id, { balance: Math.max(0, parseFloat(e.target.value) || 0) })}
                                    aria-label={`${card.name || 'Card'} outstanding balance`} style={numInput} />
                                </label>
                                <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                  <span style={{ fontSize: 11, color: C.ink3 }}>Credit limit</span>
                                  <input type="number" min={0} value={card.limit}
                                    onChange={e => updateCard(card.id, { limit: Math.max(0, parseFloat(e.target.value) || 0) })}
                                    aria-label={`${card.name || 'Card'} credit limit`} style={numInput} />
                                </label>
                              </div>
                              <p style={{ fontSize: 11.5, color: C.ink3, margin: '8px 0 0' }}>
                                {pct === null ? 'Enter a credit limit to see this card’s utilization' : `${pct.toFixed(1)}% used · ${fmtC(card.balance)} of ${fmtC(card.limit)}${pct > 100 ? ' · over limit' : ''}`}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                        {cards.length < MAX_CARDS ? (
                          <button onClick={addCard}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.ink, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            Add another card
                          </button>
                        ) : <span style={{ fontSize: 12, color: C.ink3 }}>Up to {MAX_CARDS} cards</span>}
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                          More settings
                          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Target Utilization" id="util-target" value={targetPct} min={5} max={50} step={1} fmt={v => `${v}%`} onChange={setTargetPct} compact={mobile} />
                      <Slider label="Limit Increase or New Card" id="util-extra-limit" value={extraLimit} min={0} max={1000000} step={5000} fmt={fmtC} onChange={setExtraLimit} compact={mobile} />

                      <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Highest balance at {targetPct}%</span>
                          <span>{fmtIN(r.maxBalanceAtTarget)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Utilization with extra limit</span>
                          <span>{r.totalLimit + extraLimit > 0 ? `${r.pctWithExtra.toFixed(1)}%` : 'Add a limit'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 12, color: C.ink2 }}>
                          <span>Total limit needed for {targetPct}%</span>
                          <span>{fmtIN(r.limitNeeded)}</span>
                        </div>
                      </div>

                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        30% is the usual guideline and 10% is the stricter one. Add a limit you expect from an increase or a new card to see how your overall ratio would change at the same balance.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* ───── RESULTS PANEL ───── */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {r.totalLimit <= 0 ? (
                    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.ink3}`, padding: 20, borderRadius: 12, width: '100%' }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, marginBottom: 8 }}>Add a credit limit</div>
                      <div style={{ color: C.ink2, fontSize: 14, lineHeight: 1.5 }}>Utilization is balance divided by limit, so at least one card needs a credit limit above zero.</div>
                    </div>
                  ) : (
                    <>
                      {/* Primary dark result box: two metrics */}
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Overall utilization</div>
                          <div style={{ fontSize: 12, color: '#7A8087' }}>Rating</div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                          <div aria-live="polite" aria-label={`Overall credit utilization ${r.overallPct.toFixed(1)} percent, ${rating(r.overallPct)}`}
                            style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em', lineHeight: 1 }}>
                            {r.overallPct.toFixed(1)}%
                          </div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{rating(r.overallPct)}</div>
                        </div>
                      </div>

                      {[
                        { label: 'Total outstanding balance', value: fmtC(r.totalBalance) },
                        { label: 'Total credit limit', value: fmtC(r.totalLimit) },
                        { label: 'Available credit', value: fmtC(r.available) },
                        { label: `Pay down to reach ${targetPct}% overall`, value: r.payOverall > 0 ? fmtC(r.payOverall) : 'Already there' },
                        { label: `Pay down so every card is under ${targetPct}%`, value: r.payEveryCard > 0 ? fmtC(r.payEveryCard) : 'Already there' },
                        { label: `Extra limit needed for ${targetPct}%`, value: r.extraLimitNeeded > 0 ? fmtC(r.extraLimitNeeded) : 'None' },
                        ...(extraLimit > 0 ? [{ label: `With ${fmtC(extraLimit)} extra limit`, value: `${r.pctWithExtra.toFixed(1)}%` }] : []),
                        { label: 'Highest single card', value: r.highest ? `${r.highest.name || 'Card'} · ${(r.highest.pct as number).toFixed(1)}%` : 'None' },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                        </div>
                      ))}

                      {/* Donut: top of panel on desktop, below stats on mobile */}
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart used={r.totalBalance} total={r.totalLimit} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Used {usedPct}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Available {availPct}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Used {usedPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Available {availPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`${usedPct}% of total credit limit used`}>
                          <div style={{ height: '100%', width: `${barUsed}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* ── Per-card breakdown: chart + tables, inside the calculator card ── */}
              {r.totalLimit > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowBreakdown(v => !v)} aria-expanded={showBreakdown} aria-controls="util-breakdown-panel"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0, textAlign: 'left' }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Utilization by Card</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Card chart, pay-down targets and balance limits</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {cards.length} cards · {targetPct}% target
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showBreakdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showBreakdown && (
                    <div id="util-breakdown-panel" style={{ borderTop: `1px solid ${C.border}` }}>
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>

                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Used</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Available</span>
                          </div>
                        </div>
                        <CardChart cards={r.perCard} mobile={mobile} />
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: '8px 0 20px', lineHeight: 1.6 }}>
                          Each bar is one card at full height. The dark part is the share of its limit in use. A card can be over your target even when the overall ratio is not.
                        </p>
                      </div>

                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '0 0 8px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}

                      <div style={{ padding: mobile ? '0 16px 10px' : '0 44px 10px' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Per-card breakdown</span>
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 660, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={schedCap}>Balance, limit and utilization for each card, with the payment that brings it under your {targetPct}% target.</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px 14px 10px ${edge}px` }}>Card</th>
                              <th scope="col" style={schedTh}>Balance</th>
                              <th scope="col" style={schedTh}>Limit</th>
                              <th scope="col" style={schedTh}>Utilization</th>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left' }}>Rating</th>
                              <th scope="col" style={schedTh}>Available</th>
                              <th scope="col" style={{ ...schedTh, padding: `10px ${edge}px 10px 14px` }}>Pay to {targetPct}%</th>
                            </tr>
                          </thead>
                          <tbody>
                            {r.perCard.map((c, i) => (
                              <tr key={c.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <th scope="row" style={{ padding: `11px 14px 11px ${edge}px`, textAlign: 'left', fontWeight: 600, color: C.ink }}>{c.name || 'Card'}</th>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtIN(c.balance)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtIN(c.limit)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{c.pct === null ? 'No limit' : `${c.pct.toFixed(1)}%`}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{c.pct === null ? 'Not rated' : rating(c.pct)}</td>
                                <td style={{ padding: '11px 14px', textAlign: 'right', color: C.ink2 }}>{fmtIN(c.available)}</td>
                                <td style={{ padding: `11px ${edge}px 11px 14px`, textAlign: 'right', color: C.ink2 }}>{c.payToTarget > 0 ? fmtIN(c.payToTarget) : 'None'}</td>
                              </tr>
                            ))}
                            <tr style={{ borderTop: `1px solid ${C.border}`, background: '#f4f5f6' }}>
                              <th scope="row" style={{ padding: `11px 14px 11px ${edge}px`, textAlign: 'left', fontWeight: 700, color: C.ink }}>All cards</th>
                              <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtIN(r.totalBalance)}</td>
                              <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtIN(r.totalLimit)}</td>
                              <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{r.overallPct.toFixed(1)}%</td>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.ink }}>{rating(r.overallPct)}</td>
                              <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtIN(r.available)}</td>
                              <td style={{ padding: `11px ${edge}px 11px 14px`, textAlign: 'right', fontWeight: 700, color: C.ink }}>{r.payEveryCard > 0 ? fmtIN(r.payEveryCard) : 'None'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div style={{ padding: mobile ? '20px 16px 10px' : '20px 44px 10px', borderTop: `1px solid ${C.border}` }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Balance limits at each utilization level</span>
                      </div>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
                        <table style={{ minWidth: 520, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={schedCap}>The most you can owe across all cards at each level, based on your total limit of {fmtIN(r.totalLimit)}.</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              <th scope="col" style={{ ...schedTh, textAlign: 'left', padding: `10px 14px 10px ${edge}px` }}>Utilization Level</th>
                              <th scope="col" style={schedTh}>Highest Total Balance</th>
                              <th scope="col" style={{ ...schedTh, padding: `10px ${edge}px 10px 14px` }}>Your Position</th>
                            </tr>
                          </thead>
                          <tbody>
                            {levels.map(([lvl, note], i) => {
                              const cap = (lvl / 100) * r.totalLimit;
                              const gap = cap - r.totalBalance;
                              return (
                                <tr key={lvl} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <th scope="row" style={{ padding: `11px 14px 11px ${edge}px`, textAlign: 'left', fontWeight: 600, color: C.ink }}>{lvl}% <span style={{ color: C.ink3, fontWeight: 400 }}>({note})</span></th>
                                  <td style={{ padding: '11px 14px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtIN(cap)}</td>
                                  <td style={{ padding: `11px ${edge}px 11px 14px`, textAlign: 'right', color: C.ink2 }}>
                                    {Math.round(gap) === 0 ? 'Exactly at this level' : gap > 0 ? `${fmtIN(gap)} of room` : `Pay ${fmtIN(-gap)}`}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <TableOfContents />

              <div style={sec} id="what-is-utilization">
                <h2 style={h2}>What Is Credit Utilization Ratio?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Credit utilization ratio is the share of your credit card limit that you are currently using, expressed as a percentage. It is measured for each card and across all your cards together.
                  </p>
                </div>
                <p style={p}>If you owe Rs 30,000 on a card with a Rs 1,00,000 limit, your credit card utilization is 30%. People also call it credit card usage ratio, credit usage or the utilisation ratio.</p>
                <p style={p}>Lenders read it as a sign of how stretched you are. A card used close to its limit suggests you may be relying on credit to get through the month.</p>
                <p style={p}>That is why a high ratio can hold back your CIBIL score even when every bill is paid on time. It is one of the few score factors you can change within a single billing cycle.</p>
              </div>

              <div style={sec} id="utilization-formula">
                <h2 style={h2}>Credit Utilization Formula: How to Calculate It</h2>
                <p style={p}>To calculate credit utilization, divide your total outstanding balance by your total credit limit and multiply by 100. Do the same for each card on its own.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16, overflowX: 'auto' }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark, lineHeight: 1.9, whiteSpace: 'pre' }}>
                    {'Overall utilization (%) = Total balance ÷ Total credit limit × 100\n'}
                    {'Card utilization (%)    = Card balance ÷ Card limit × 100\n'}
                    {'Pay down to target      = Total balance − (Target % × Total limit)\n'}
                    {'Limit needed for target = Total balance ÷ Target %'}
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>What goes into the credit utilization ratio formula.</caption>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">What It Means</th></tr></thead>
                    <tbody>
                      {[
                        ['Outstanding balance', 'Everything you currently owe on the card, including purchases not yet billed. Your card app shows it.'],
                        ['Credit limit', 'The total limit the issuer has set on the card, not the available limit that remains.'],
                        ['Available credit', 'Credit limit minus outstanding balance. This is what the available credit calculator rows show.'],
                        ['Target %', 'The level you want to stay under, usually 30% or 10%.'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 style={h3}>Do not average the card percentages</h3>
                <p style={p}>Overall utilization is total balance over total limit. Averaging each card&apos;s percentage gives a different, wrong answer because it ignores how big each limit is.</p>
                <p style={p}>On this calculator&apos;s default cards, the true overall ratio is 38.2%. A simple average of the four card percentages would say 47.8%.</p>
              </div>

              <div style={sec} id="utilization-examples">
                <h2 style={h2}>Credit Utilization Examples</h2>
                <p style={p}>These credit utilization examples show the same formula in the situations people actually search for: one card, several cards, a limit increase and a closed card.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Every figure calculated with the formula above.</caption>
                    <thead><tr>
                      <th style={thS} scope="col">Situation</th>
                      <th style={thS} scope="col">Balance and Limit</th>
                      <th style={thR} scope="col">Utilization</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['One card', 'Rs 30,000 of Rs 1,00,000', '30.0%'],
                        ['Four cards (calculator defaults)', 'Rs 1,30,000 of Rs 3,40,000', '38.2%'],
                        ['Limit raised from Rs 1 lakh to Rs 1.5 lakh', 'Rs 40,000 of Rs 1,50,000', '26.7% (was 40.0%)'],
                        ['Two cards, then the unused one is closed', 'Rs 40,000 of Rs 1,00,000', '40.0% (was 20.0%)'],
                        ['Rs 40,000 paid before the statement date', 'Rs 20,000 of Rs 1,00,000', '20.0% (was 60.0%)'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 style={h3}>Worked example: four cards</h3>
                <p style={p}>The calculator&apos;s default cards hold Rs 1,30,000 of debt against Rs 3,40,000 of limits. Overall utilization is 1,30,000 ÷ 3,40,000 × 100 = 38.2%, which is above the 30% guideline.</p>
                <p style={p}>Reaching 30% overall means owing no more than Rs 1,02,000, so Rs 28,000 has to be paid down. Getting every single card under 30% takes Rs 63,000.</p>
                <p style={p}>The gap comes from the Shopping Card at 90% and the Everyday Card at 62%. Those two cards need Rs 62,000 of the Rs 63,000 on their own.</p>
              </div>

              <div style={sec} id="per-card-vs-overall">
                <h2 style={h2}>Per-Card vs Overall Utilization</h2>
                <p style={p}>Your credit report shows the balance and limit of every card, so a lender can see both the overall ratio and each card&apos;s ratio. Watching only the total can hide a card that is almost maxed out.</p>
                <p style={p}>Picture Rs 9,000 owed on a Rs 10,000 card and nothing owed on a Rs 2,00,000 card. Overall utilization is just 4.3%, yet one card sits at 90% of its limit.</p>
                <p style={p}>That is why this calculator shows two pay-down figures. The overall figure fixes the blended ratio. The every-card figure clears each card individually, which is the stronger position.</p>
                <p style={p}>If you pay down cards to reach a target, start with the card at the highest percentage, not the card with the largest balance. Open Utilization by Card above to see each card against your target.</p>
              </div>

              <div style={sec} id="good-utilization-ratio">
                <h2 style={h2}>What Is a Good Credit Utilization Ratio?</h2>
                <p style={p}>A good credit utilization ratio is under 30%, and under 10% is stronger still. TransUnion CIBIL&apos;s own guidance recommends a low ratio and cites staying under 30% as a level that works in your favour.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>A common way to read utilization. Bureaus do not publish official bands or cut-offs.</caption>
                    <thead><tr><th style={thS} scope="col">Utilization</th><th style={thS} scope="col">Rating Used Here</th><th style={thS} scope="col">What Lenders Tend to Read Into It</th></tr></thead>
                    <tbody>
                      {[
                        ['Under 10%', 'Excellent', 'Credit is used lightly and repaid with room to spare.'],
                        ['10% to 29.9%', 'Good', 'Comfortable use, within the widely quoted 30% guideline.'],
                        ['30% to 49.9%', 'Fair', 'Noticeable reliance on credit. Worth bringing down before a loan application.'],
                        ['50% to 100%', 'High', 'Heavy use of available credit, often read as financial strain.'],
                        ['Above 100%', 'Over limit', 'Spending beyond the sanctioned limit, which needs your explicit consent under RBI rules.'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdR}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>0% is not the goal either. A card that is never used adds little evidence of how you handle credit, so light, regular use that is paid on time works better than none.</p>
                <p style={p}>If you are applying for a home or car loan soon, aim for under 10% on every card in the months before you apply. It is one of the quickest parts of your profile to improve.</p>
              </div>

              <PromoBar title="Credit Health Score Calculator" text="Combine utilization with payment history and credit mix for an estimated CIBIL score range." href="/calculators/credit-health-score-calculator" />

              <div style={sec} id="thirty-percent-rule">
                <h2 style={h2}>The 30 Percent Credit Utilization Rule by Credit Limit</h2>
                <p style={p}>The 30 percent rule means keeping what you owe under 30% of your limit, on each card and overall. It is a guideline used by lenders and bureaus, not an RBI regulation.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Highest balance that keeps you at 10% and at 30% for common credit limits.</caption>
                    <thead><tr><th style={thS} scope="col">Credit Limit</th><th style={thR} scope="col">Balance at 10%</th><th style={thR} scope="col">Balance at 30%</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 25,000', 'Rs 2,500', 'Rs 7,500'],
                        ['Rs 50,000', 'Rs 5,000', 'Rs 15,000'],
                        ['Rs 1,00,000', 'Rs 10,000', 'Rs 30,000'],
                        ['Rs 2,00,000', 'Rs 20,000', 'Rs 60,000'],
                        ['Rs 3,00,000', 'Rs 30,000', 'Rs 90,000'],
                        ['Rs 5,00,000', 'Rs 50,000', 'Rs 1,50,000'],
                        ['Rs 10,00,000', 'Rs 1,00,000', 'Rs 3,00,000'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>With several cards, apply the same limits to your total. The Balance limits table inside the calculator does this for your own cards at 10%, 30%, 50%, 75% and 100%.</p>
              </div>

              <div style={sec} id="credit-limit-needed">
                <h2 style={h2}>Credit Card Limit Calculator: How Much Limit Do You Need?</h2>
                <p style={p}>To keep utilization under a target, your credit limit needs to be at least your usual balance divided by that target. For 30%, that is your balance ÷ 0.30.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Total credit limit needed for a given balance at the statement date.</caption>
                    <thead><tr><th style={thS} scope="col">Usual Balance</th><th style={thR} scope="col">Limit Needed for 30%</th><th style={thR} scope="col">Limit Needed for 10%</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 15,000', 'Rs 50,000', 'Rs 1,50,000'],
                        ['Rs 30,000', 'Rs 1,00,000', 'Rs 3,00,000'],
                        ['Rs 50,000', 'Rs 1,66,667', 'Rs 5,00,000'],
                        ['Rs 75,000', 'Rs 2,50,000', 'Rs 7,50,000'],
                        ['Rs 1,00,000', 'Rs 3,33,334', 'Rs 10,00,000'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdN}>{row[1]}</td>
                          <td style={tdN}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>On the default cards, holding Rs 1,30,000 at 30% needs about Rs 4,33,334 of total limit, Rs 93,334 more than today. The Extra limit needed row works this out for your cards.</p>
                <p style={p}>Use More settings to test a limit increase or a new card. Adding Rs 1,00,000 of limit to the defaults, with the same balances, brings overall utilization from 38.2% to 29.5%.</p>
                <p style={p}>A higher limit only helps if spending stays the same. If the extra room turns into extra spending, the ratio climbs straight back up.</p>
              </div>

              <div style={sec} id="utilization-cibil-score">
                <h2 style={h2}>Credit Utilization and Your CIBIL Score</h2>
                <p style={p}>Credit utilization affects your CIBIL score because a high ratio signals a rising debt burden. TransUnion CIBIL says a high utilisation ratio may pull your score down.</p>
                <p style={p}>Bureaus do not publish exact weights for each factor, so be wary of anyone quoting a precise percentage. What is clear is the direction: lower utilization supports a better score.</p>
                <p style={p}>India has four RBI-licensed credit information companies: TransUnion CIBIL, Experian, Equifax and CRIF High Mark. Each receives your card balances and limits from lenders and scores them with its own model.</p>
                <p style={p}>Utilization works alongside the rest of your profile, not in place of it. Payment history, the age of your accounts, your mix of loans and cards, and recent applications all count too.</p>
                <p style={p}>For a combined view of these factors, the <Link href="/calculators/credit-health-score-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Health Score Calculator</Link> estimates a likely score range from your inputs.</p>
              </div>

              <div style={sec} id="reporting-frequency">
                <h2 style={h2}>When Is Credit Utilization Reported to Bureaus?</h2>
                <p style={p}>Lenders in India now report credit data to bureaus several times a month, not just once. The rules have changed twice since 2024.</p>
                <ul style={ulS}>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>Before 2025:</strong> Lenders reported to bureaus once a month.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>From 1 January 2025:</strong> RBI required fortnightly reporting, as on the 15th and the last day of each month.</li>
                  <li style={{ ...li, marginBottom: 8 }}><strong style={{ color: C.ink }}>From 1 July 2026:</strong> RBI&apos;s Credit Information Reporting Amendment Directions, 2025 require a full file as on the last day of the month, plus changed accounts as on the 9th, 16th and 23rd.</li>
                </ul>
                <p style={p}>A balance change on a card counts as a changed account, so your utilization can now update on your report within days rather than weeks.</p>
                <p style={p}>The exact balance each issuer sends depends on its own systems. The practical rule holds either way: keep balances low all month, and pay large purchases before the statement is generated.</p>
                <p style={p}>That is what the &quot;paid before the statement date&quot; example above shows. The same Rs 60,000 of spending reads as 20% or 60% depending on when you pay it.</p>
              </div>

              <div style={sec} id="lower-utilization">
                <h2 style={h2}>How to Lower Your Credit Utilization</h2>
                <p style={p}>You can lower credit utilization by owing less, by having more limit, or by timing your payments better. These steps are listed from quickest to slowest.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Pay before the statement date:</strong> Clear large purchases before the bill is generated, not only by the due date, so a lower balance is on record.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Pay more than once a month:</strong> Splitting payments across the month keeps the running balance low around every reporting date.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Fix the highest card first:</strong> Bring any card above your target down before spreading money across the rest.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Spread spending across cards:</strong> Moving regular spending off a nearly full card keeps each card under 30%.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Ask for a limit increase:</strong> A higher limit at the same spending lowers the ratio, as long as spending does not rise with it.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Keep old cards open:</strong> A paid-off card still adds its limit to your total. Closing it removes that limit.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Clear revolving balances:</strong> If balances roll over every month, a payoff plan fixes the root cause rather than the timing.</li>
                </ol>
                <p style={p}>For the last step, the <Link href="/calculators/debt-snowball-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Debt Snowball Calculator</Link> builds a month-by-month plan to clear several cards, smallest balance first.</p>
                <p style={p}>Carrying a balance also costs interest at card rates of roughly 30% to 45% a year. The <Link href="/calculators/credit-card-interest-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card Interest Calculator</Link> shows what that costs on your balance.</p>
                <h3 style={h3}>What about converting a purchase to EMI?</h3>
                <p style={p}>Card EMI conversion lowers the interest rate on a purchase but usually not your utilization. Most issuers keep the converted amount blocked against your limit and release it as EMIs are paid.</p>
                <p style={p}>Check the processing fee and rate before converting with the <Link href="/calculators/credit-card-emi-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card EMI Calculator</Link>.</p>
              </div>

              <PromoBar title="Debt Snowball Calculator" text="Clear several card balances with a month-by-month payoff plan and a debt-free date." href="/calculators/debt-snowball-calculator" />

              <div style={sec} id="closing-and-over-limit">
                <h2 style={h2}>Closing a Card and Going Over the Limit</h2>
                <p style={p}>Closing a credit card raises your utilization if you owe money on other cards, because the closed card&apos;s limit leaves your total.</p>
                <p style={p}>With Rs 40,000 owed on one card and a second, unused card, both with Rs 1,00,000 limits, utilization is 20%. Close the unused card and it jumps to 40% with no change in spending.</p>
                <p style={p}>If a card has an annual fee you no longer want to pay, ask the issuer whether it can be moved to a fee-free variant before closing it outright.</p>
                <h3 style={h3}>Can utilization go above 100%?</h3>
                <p style={p}>Only with your consent. Under the RBI&apos;s <a href="https://rbidocs.rbi.org.in/rdocs/notification/PDFs/92MDCREDITDEBITCARDC423AFFB5E7945149C95CDD2F71E9158.PDF" target="_blank" rel="noopener noreferrer" style={linkS}>Credit Card and Debit Card Directions, 2022</a>, issuers must not let the sanctioned limit be breached without your explicit consent.</p>
                <p style={p}>You can switch over-limit use on or off through your issuer&apos;s app or net banking. If this calculator shows a card above 100%, it is marked Over limit and counted as fully used in the chart.</p>
              </div>

              <div style={sec} id="utilization-vs-dti">
                <h2 style={h2}>Credit Utilization vs Debt-to-Income Ratio</h2>
                <p style={p}>Credit utilization compares card balances with card limits. Debt-to-income ratio compares all your monthly debt payments with your monthly income. Lenders look at both.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={tableS}>
                    <caption style={capS}>Two different ratios that are easy to confuse.</caption>
                    <thead><tr><th style={thS} scope="col">Factor</th><th style={thS} scope="col">Credit Utilization</th><th style={thS} scope="col">Debt-to-Income Ratio</th></tr></thead>
                    <tbody>
                      {[
                        ['Measures', 'Card balance as a share of card limit', 'Monthly debt payments as a share of monthly income'],
                        ['Covers', 'Revolving credit, mainly credit cards', 'EMIs, card payments and all other debts'],
                        ['Shows up in', 'Your credit report and score', 'A lender’s own affordability check'],
                        ['Changes', 'Within a billing cycle', 'When income or EMIs change'],
                      ].map((row, i) => (
                        <tr key={row[0]} style={rowBg(i)}>
                          <td style={tdFirst}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>A low utilization ratio can sit alongside a high DTI if your EMIs are heavy. Check the other side with the <Link href="/calculators/debt-to-income-ratio-calculator" target="_blank" rel="noopener noreferrer" style={linkS}>Debt-to-Income Ratio Calculator</Link> before a loan application.</p>
              </div>

              <div style={sec} id="common-mistakes">
                <h2 style={h2}>Common Credit Utilization Mistakes</h2>
                <p style={p}>Most utilization problems come from timing and arithmetic, not from spending too much.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Using the available limit instead of the full limit:</strong> The formula needs the total credit limit. Using the remaining limit makes the ratio look far worse than it is.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Averaging card percentages:</strong> Add balances and limits first, then divide. An average ignores the size of each limit.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Watching only the total:</strong> A healthy overall ratio can hide one card at 90% of its limit.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Paying only on the due date:</strong> By then the higher statement balance may already be on record for that cycle.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Closing old cards to tidy up:</strong> Fewer cards means less total limit, which pushes the ratio up.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Spending into a new limit:</strong> A limit increase only helps if the balance stays where it was.</li>
                </ol>
              </div>

              <div style={sec} id="utilization-limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>This calculator does the utilization arithmetic exactly, but a credit score involves more than one ratio. Keep these limits in mind.</p>
                <p style={p}><strong style={{ color: C.ink }}>It does not predict a score.</strong> Bureaus combine utilization with payment history, account age, credit mix and recent enquiries, using models they do not publish.</p>
                <p style={p}><strong style={{ color: C.ink }}>The ratings are a guide.</strong> Excellent, Good, Fair and High follow widely used thresholds. They are not official bureau bands.</p>
                <p style={p}><strong style={{ color: C.ink }}>It shows one moment.</strong> The balance you enter is a snapshot. What the bureau sees depends on your balance on the reporting dates.</p>
                <p style={p}><strong style={{ color: C.ink }}>Cards only.</strong> The ratio here covers revolving credit such as credit cards. EMIs on term loans are judged by repayment record, not by a limit you can draw on again.</p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Credit Utilization Calculator</h2>
                <p style={p}>Using the credit utilization calculator takes about a minute with your card app open.</p>
                <ol style={olS}>
                  <li style={li}><strong style={{ color: C.ink }}>Add your cards:</strong> Enter a name, the outstanding balance and the credit limit for each card, up to six.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Read your overall ratio:</strong> The dark box shows total utilization and its rating, with the donut splitting used and available credit.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Check the pay-down rows:</strong> See what to pay to reach your target overall, and what it takes to get every card under it.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Set your target and limit:</strong> Open More settings to change the target from 30% and test a limit increase or new card.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Open Utilization by Card:</strong> Compare each card in the chart, then use the tables for card-level payments and balance limits.</li>
                </ol>
              </div>


              <div style={{ margin: '0 0 44px' }} id="faq">
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ items={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> This credit utilization calculator is for educational and planning purposes only. Credit scores from TransUnion CIBIL, Experian, Equifax and CRIF High Mark depend on many factors, including payment history, credit mix, length of credit history and recent enquiries. Results are indicative and are not a credit report, credit score or financial advice. Contact your card issuer or a qualified adviser for decisions about your credit.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .credit-util-sidebar::-webkit-scrollbar { width: 5px; }
            .credit-util-sidebar::-webkit-scrollbar-track { background: transparent; }
            .credit-util-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .credit-util-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="credit-util-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20, alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <UtilizationQuickFacts />
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

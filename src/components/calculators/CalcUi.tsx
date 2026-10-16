'use client';

/**
 * Shared presentation pieces for calculator pages that follow the
 * CALCULATOR_STANDARDS.md layout (VPF-style card, dark result box, donut,
 * split bar, collapsible schedule). Pure UI: no calculator maths lives here.
 */

import { useState } from 'react';
import Link from 'next/link';
import { CHART_PAIR } from '../../theme/chartPalette';
import { FAQBox } from '../common/FAQBox';

export const C = {
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
} as const;

export const INTER = 'var(--font-inter), Inter, sans-serif';

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/* ─── Slider ─────────────────────────────────────────────────── */
interface SliderProps {
  label: string;
  id: string;
  value: number;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
  onChange: (v: number) => void;
  compact?: boolean;
}

/** Slider with a click-to-type value button. Typed values are clamped to [min, max]. */
export function Slider({ label, id, value, min, max, step, fmt, onChange, compact }: SliderProps) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const span = max - min;
  const pct = span > 0 ? clamp(((value - min) / span) * 100, 0, 100) : 0;

  const commit = () => {
    setEditing(false);
    const typed = parseFloat(raw.replace(/[^0-9.-]/g, ''));
    if (Number.isFinite(typed)) onChange(clamp(typed, min, max));
  };

  return (
    <div style={{ marginBottom: compact ? 18 : 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: compact ? 10 : 12 }}>
        <label htmlFor={editing ? id : `${id}-range`} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={id} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button type="button" onClick={() => { setRaw(String(value)); setEditing(true); }}
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
        <input id={`${id}-range`} type="range" min={min} max={max} step={step} value={value}
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

/** Row of preset pills (for example 1Y to 30Y) shown directly under a slider. */
export function PresetPills({ options, current, onChange, suffix, ariaLabel }: {
  options: readonly number[]; current: number; onChange: (v: number) => void; suffix: string; ariaLabel: string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {options.map(v => {
        const active = current === v;
        return (
          <button key={v} type="button" onClick={() => onChange(v)} aria-pressed={active} aria-label={`Set to ${v}${suffix}`}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.ink : C.ink3, background: active ? C.white : 'transparent', border: active ? `1.5px solid ${C.ink}` : `1px solid ${C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {v}{suffix}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Charts ─────────────────────────────────────────────────── */
interface SplitDonutProps {
  /** Share of the ring drawn in the dark colour, 0 to 1. */
  fraction: number;
  centerLabel: string;
  centerValue: string;
  ariaLabel: string;
}

/** Donut: one lime track plus one dark overlay arc (never two independent arcs). */
export function SplitDonut({ fraction, centerLabel, centerValue, ariaLabel }: SplitDonutProps) {
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const arc = clamp(Number.isFinite(fraction) ? fraction : 0, 0, 1) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label={ariaLabel} style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${arc} ${circ - arc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{centerLabel}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{centerValue}</text>
    </svg>
  );
}

export interface Bar { label: string; dark: number; lime: number; highlight?: boolean }

/** Stacked SVG bars: dark segment at the bottom, lime segment on top. */
export function StackedBars({ bars, ariaLabel }: { bars: Bar[]; ariaLabel: string }) {
  if (bars.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const max = Math.max(...bars.map(b => Math.max(0, b.dark) + Math.max(0, b.lime)), 1e-9);
  const slot = (W - PADL) / bars.length;
  const barW = Math.max(6, Math.min(34, slot * 0.68));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label={ariaLabel} viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {bars.map((b, i) => {
        const dark = Math.max(0, b.dark);
        const lime = Math.max(0, b.lime);
        const darkH = (dark / max) * H;
        const limeH = (lime / max) * H;
        const x = PADL + i * slot + gap;
        return (
          <g key={`${b.label}-${i}`}>
            <rect x={x} y={H - darkH - limeH} width={barW} height={limeH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - darkH} width={barW} height={darkH} fill={b.highlight ? CHART_PAIR.secondary : CHART_PAIR.primary} rx={2} />
            {bars.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: bars.length > 16 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>{b.label}</text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

interface SplitLabels { dark: string; lime: string }

/** Two-item legend with colour chips, shown under the donut. */
export function Legend({ labels, order }: { labels: SplitLabels; order: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, order }}>
      {([['dark', CHART_PAIR.primary], ['lime', CHART_PAIR.secondary]] as const).map(([k, colour]) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 3, background: colour }} aria-hidden="true" />
          <span style={{ fontSize: 12, color: C.ink2 }}>{labels[k]}</span>
        </div>
      ))}
    </div>
  );
}

/** Thin horizontal split bar with a label on each side. */
export function SplitBar({ labels, fraction, ariaLabel }: { labels: SplitLabels; fraction: number; ariaLabel: string }) {
  const width = clamp(Number.isFinite(fraction) ? fraction : 0, 0, 1) * 100;
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11.5, color: C.ink3 }}>{labels.dark}</span>
        <span style={{ fontSize: 11.5, color: C.ink3 }}>{labels.lime}</span>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={ariaLabel}>
        <div style={{ height: '100%', width: `${width}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

/** Label and value row used in the result panel. */
export function StatRow({ label, value, mobile }: { label: string; value: string; mobile: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

/** Dark primary-result box with aria-live value. */
export function ResultBox({ label, value, ariaLabel, mobile }: { label: string; value: string; ariaLabel: string; mobile: boolean }) {
  return (
    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>{label}</span>
      <span aria-live="polite" aria-label={ariaLabel} style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>{value}</span>
    </div>
  );
}

/* ─── Collapsible schedule ───────────────────────────────────── */
interface ScheduleProps {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  mobile: boolean;
  children: React.ReactNode;
}

/** Collapsed-by-default section with chevron, badge pill and swipe hint on mobile. */
export function CollapsibleSchedule({ id, title, subtitle, badge, mobile, children }: ScheduleProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${C.border}` }}>
      <button type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls={id}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
        <div style={{ minWidth: 0, textAlign: 'left' }}>
          <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>{title}</span>
          {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>{subtitle}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>{badge}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      {open && (
        <div id={id} style={{ borderTop: `1px solid ${C.border}` }}>
          {children}
          {mobile && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 10px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe tables to see all columns</p>
            </div>
          )}
          <style>{'@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }'}</style>
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar, CTAs, FAQ ─────────────────────────────────────── */
export interface NavItem { href: string; label: string }

export function SidebarList({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { e.currentTarget.style.background = C.paleLime; e.currentTarget.style.color = C.dark; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

/** Sticky, independently scrolling sidebar column with the neutral scrollbar styling. */
export function StickySidebar({ className, mobile, children }: { className: string; mobile: boolean; children: React.ReactNode }) {
  const css = `.${className}::-webkit-scrollbar{width:5px}.${className}::-webkit-scrollbar-track{background:transparent}.${className}::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.${className}::-webkit-scrollbar-thumb:hover{background:#9FA59F}`;
  return (
    <>
      <style>{css}</style>
      <aside className={className} style={{
        position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start',
        maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto',
        paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
      } as React.CSSProperties}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
      </aside>
    </>
  );
}

/** Standard CA call to action. Copy is fixed by CLAUDE.md apart from the second line. */

/** In-content cross-sell bar. Use at most two per page. */
export function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '0 0 44px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );
}

export interface FaqItem { q: string; a: string }

/** FAQ accordion. Items come from page.tsx, the single source for the FAQPage schema too. */
export function FAQAccordion({ items }: { items: FaqItem[] }) {
  return <FAQBox items={items} />;
}

/* ─── Shared article table styles ────────────────────────────── */
type CSS = React.CSSProperties;
const cell: CSS = { padding: '10px 14px', fontSize: 13.5, verticalAlign: 'middle', border: `1px solid ${C.border}` };

/** One style set for every table on a page. Alignment and vertical-align are explicit on all of them. */
export const tableStyles = {
  th:  { ...cell, padding: '10px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' } as CSS,
  thR: { ...cell, padding: '10px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' } as CSS,
  tdL: { ...cell, color: C.ink2, textAlign: 'left' } as CSS,
  tdR: { ...cell, color: C.ink, fontWeight: 500, textAlign: 'right' } as CSS,
  tdC: { ...cell, color: C.ink2, textAlign: 'center' } as CSS,
  table: { width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 } as CSS,
  box: { overflowX: 'auto', maxWidth: '100%', marginBottom: 12 } as CSS,
  caption: { captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' } as CSS,
};

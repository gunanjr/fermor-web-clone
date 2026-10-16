"use client";

import type { CSSProperties, ReactNode } from "react";

export const C = {
  border: "#2d2d31",
  card: "#1f1f21",
  rowBorder: "#232327",
  rowBorder2: "#27272b",
  headBg: "#1b1b1d",
  dim: "#9b9ba3",
  dimmer: "#82828b",
  faint: "#6e6e77",
  bright: "#fafafc",
  body: "#eeeef2",
  body2: "#dcdce1",
  body3: "#b0b0b8",
  green: "#4ade80",
  amber: "#f59e0b",
  red: "#ff6666",
  blue: "#60a5fa",
  teal: "#56d2c0",
};

const mono: CSSProperties = { fontFamily: "var(--font-jetbrains-mono), ui-monospace, Menlo, monospace" };
const sora: CSSProperties = { fontFamily: "var(--font-sora), sans-serif" };

// A neutral loading placeholder -- shape and position only, never real or sample text.
// Real data replaces it in place once a fetch resolves, so nothing specific (a stale
// value, a fake sample item) ever flashes on screen while a panel is still loading.
export function Skeleton({ width = "100%", height = 12, radius = 6, style }: { width?: number | string; height?: number; radius?: number; style?: CSSProperties }) {
  return <div className="kanso-pulse" style={{ width, height, borderRadius: radius, background: C.rowBorder2, flex: "none", ...style }} />;
}

export function SectionHead({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", margin: "24px 0 12px" }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: subtitle ? 3 : 0 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12.5, color: C.dim }}>{subtitle}</div>}
      </div>
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

export function Card({ children, style, onClick }: { children: ReactNode; style?: CSSProperties; onClick?: () => void }) {
  return (
    <div onClick={onClick} style={{ border: `1px solid ${C.border}`, borderRadius: 10, background: C.card, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

export function Stat({ label, value, valueColor = C.bright, delta, deltaUp, note }: { label: string; value: string; valueColor?: string; delta?: string; deltaUp?: boolean; note?: string }) {
  return (
    <Card style={{ padding: 14 }}>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 10 }}>{label}</div>
      <div style={{ ...sora, fontSize: 21, fontWeight: 600, lineHeight: 1, color: valueColor, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {delta && <TrendPill up={!!deltaUp} value={delta} style={{ marginTop: 9 }} />}
      {note && <div style={{ fontSize: 11.5, color: C.dim, marginTop: 9 }}>{note}</div>}
    </Card>
  );
}

export function TrendPill({ up, value, style }: { up: boolean; value: string; style?: CSSProperties }) {
  const color = up ? C.green : C.red;
  const points = up ? "4 16 10 10 14 14 20 8" : "4 8 10 14 14 10 20 16";
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, fontWeight: 500, color, ...style }}>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={points} />
      </svg>
      {value}
    </div>
  );
}

export function RingGauge({ score, color, size = 54, label }: { score: number; color: string; size?: number; label?: string }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={r} fill="none" stroke={C.border} strokeWidth="2.8" />
        <circle
          cx="20" cy="20" r={r} fill="none" stroke={color} strokeWidth="2.8"
          strokeDasharray={`${dash.toFixed(1)} ${c.toFixed(1)}`} strokeLinecap="round"
          transform="rotate(-90 20 20)"
        />
        <text x="20" y="24.5" textAnchor="middle" style={sora} fontSize="12" fontWeight="600" fill={color}>{score}</text>
      </svg>
      {label && <span style={{ fontSize: 12, color: C.dim }}>{label}</span>}
    </div>
  );
}

export function BarRow({ label, value, pct, color, valueColor }: { label: string; value: string; pct: number; color: string; valueColor?: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: C.body2, marginBottom: 7 }}>
        <span>{label}</span>
        <span style={{ ...mono, fontSize: 11.5, color: valueColor ?? color }}>{value}</span>
      </div>
      <div style={{ height: 4, background: C.rowBorder2, borderRadius: 4 }}>
        <div style={{ width: `${pct}%`, height: 4, background: color, borderRadius: 4 }} />
      </div>
    </div>
  );
}

export function MeterRow({ label, value, pct, color }: { label: string; value: number; pct: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ flex: 1, fontSize: 12.5, color: C.body }}>{label}</span>
      <span style={{ ...mono, fontSize: 11.5, color, width: 26, textAlign: "right" }}>{value}</span>
      <div style={{ width: 136, height: 4, background: C.rowBorder2, borderRadius: 4 }}>
        <div style={{ width: `${pct}%`, height: 4, background: color, borderRadius: 4 }} />
      </div>
    </div>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9.5" />
    </svg>
  );
}
function WarnIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /><path d="M12 9v4M12 17h.01" />
    </svg>
  );
}
function CriticalIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}

export function SignalRow({ status, label, value, valueColor, border = true }: { status: "ok" | "warn" | "critical"; label: string; value: string; valueColor?: string; border?: boolean }) {
  const icon = status === "ok" ? <CheckIcon color={C.green} /> : status === "warn" ? <WarnIcon color={C.amber} /> : <CriticalIcon color={C.red} />;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: border ? `1px solid ${C.rowBorder}` : "none" }}>
      {icon}
      <span style={{ flex: 1, fontSize: 12.5, color: C.body }}>{label}</span>
      <span style={{ fontSize: 12.5, color: valueColor ?? (status === "ok" ? C.green : status === "warn" ? C.amber : C.red) }}>{value}</span>
    </div>
  );
}

export function KVRow({ label, value, border = true }: { label: string; value: string; border?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: border ? `1px solid ${C.rowBorder}` : "none" }}>
      <span style={{ flex: 1, fontSize: 12.5, color: C.body }}>{label}</span>
      <span style={{ ...mono, fontSize: 11.5, color: C.body3 }}>{value}</span>
    </div>
  );
}

export function TagRow({ status, tag, label, value }: { status: "ok" | "warn"; tag: string; label: string; value: string }) {
  const color = status === "ok" ? C.green : C.amber;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderBottom: `1px solid ${C.rowBorder}` }}>
      {status === "ok" ? <CheckIcon color={color} /> : <WarnIcon color={color} />}
      <span style={{ ...mono, width: 104, fontSize: 11, color: C.dim }}>{tag}</span>
      <span style={{ flex: 1, fontSize: 12, color: status === "ok" ? C.body : color }}>{value || label}</span>
    </div>
  );
}

export { mono, sora };

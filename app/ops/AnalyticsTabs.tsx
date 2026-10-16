"use client";

import { useRef, useState } from "react";
import { C, Card, SectionHead, Stat, TrendPill, BarRow, Skeleton, RingGauge, mono, sora } from "./ui";
import { GaIcon, GscIcon } from "./icons";
import { getOpsToken } from "@/lib/api";

function googleConnectUrl(service: "gsc" | "ga4"): string {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "https://api.fermor.in";
  const token = getOpsToken() ?? "";
  return `${apiBase}/api/v1/ops/integrations/google/start?service=${service}&token=${encodeURIComponent(token)}`;
}

// GSC's country dimension returns lowercase ISO 3166-1 alpha-3 codes. Flag emoji need
// alpha-2 (built from Unicode regional indicator symbols), so this only covers the
// countries this real site has actually seen real search clicks from -- anything else
// falls back to a plain globe icon rather than guessing a mapping.
const ALPHA3_TO_ALPHA2: Record<string, string> = {
  ind: "IN", usa: "US", gbr: "GB", are: "AE", kwt: "KW", sau: "SA", sgp: "SG",
  aus: "AU", can: "CA", deu: "DE", alb: "AL", arg: "AR", pak: "PK", bgd: "BD",
  npl: "NP", qat: "QA", omn: "OM", bhr: "BH",
};
function flagEmoji(alpha3: string): string | null {
  const alpha2 = ALPHA3_TO_ALPHA2[alpha3.toLowerCase()];
  if (!alpha2) return null;
  const codePoints = [...alpha2.toUpperCase()].map((c) => 0x1f1e6 + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...codePoints);
}
function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  );
}

// Small hover tooltip for a stat tile -- a native title attribute rather than a custom
// popover component, since this only needs to explain what one metric means, not carry
// rich content.
function InfoDot({ text }: { text: string }) {
  return (
    <span title={text} style={{ display: "inline-grid", placeItems: "center", width: 13, height: 13, borderRadius: "50%", border: `1px solid ${C.dimmer}`, color: C.dimmer, fontSize: 9.5, cursor: "help", flex: "none" }}>
      i
    </span>
  );
}

export type TrafficData = {
  impressions: number;
  clicks: number;
  clickRate: number;
  avgPosition: number | null;
  deltas: { impressions: number | null; clicks: number | null; clickRate: number | null; avgPosition: number | null };
  queries: { query: string; clicks: number; ctr: number }[];
  topPages: { keys?: string[]; clicks?: number; ctr?: number }[];
  countries: { code: string; name: string; clicks: number; share: number }[];
  series: { date: string; clicks: number; impressions: number; avgPosition: number | null }[];
  ga4: {
    sessions: number;
    returningVisitors: number;
    keyEvents: number;
    avgSessionSeconds: number;
    engagementRate: number;
    bounceRate: number;
  } | null;
  // The real reason GA4 has no data, when it's connected but a refresh still failed
  // (e.g. a Google Cloud API not enabled on the project) -- distinct from GA4 simply
  // never being connected, which looks identical from the UI otherwise.
  ga4Error: string | null;
  snapshotDate: string | null;
};

const WINDOWS = [7, 30, 60] as const;

function pctLabel(v: number | null): string | undefined {
  if (v === null) return undefined;
  return `${v > 0 ? "+" : ""}${v.toFixed(1)}%`;
}
function fmtSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.round(s % 60);
  return `${m}m ${sec}s`;
}

type SeriesPoint = { date: string; clicks: number; impressions: number; avgPosition: number | null };

// Shared geometry for both the small inline preview and the large expanded chart --
// scaled to whatever real min/max clicks actually exist in the series, never a fixed
// axis, since a brand-new integration's real numbers can be tiny.
function buildChartGeometry(series: SeriesPoint[], w: number, h: number, padX = 20, padY = 20) {
  const clicksList = series.map((p) => p.clicks);
  const maxClicks = Math.max(1, ...clicksList);
  const minClicks = Math.min(0, ...clicksList);
  const points = series.map((p, i) => {
    const x = series.length > 1 ? padX + (i / (series.length - 1)) * (w - padX * 2) : w / 2;
    const y = h - padY - ((p.clicks - minClicks) / (maxClicks - minClicks || 1)) * (h - padY * 2);
    return [x, y] as const;
  });
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const areaPath = points.length > 1 ? `${linePath} L${points[points.length - 1][0].toFixed(1)} ${h} L${points[0][0].toFixed(1)} ${h} Z` : "";
  return { points, linePath, areaPath };
}

function fmtChartDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

// The real, interactive chart -- used both as the small static preview (interactive
// false) and inside the expanded overlay (interactive true). Hover mechanics follow
// three lessons already learned the hard way on this codebase's other hover-driven
// charts (see fermor-web/CLAUDE.md's GDP chart section): the invisible hit-catcher
// must be drawn LAST (on top), not underneath the visible line -- drawing it first
// means the visible path/dots intercept the mouse event before it ever reaches the
// catcher; the crosshair is a single vertical line down to the axis, not a boxed-in
// full-height/full-width overlay; and the tooltip clamps its horizontal position
// based on how close the hover point is to either edge, so it can't overflow the
// container near the start or end of the series.
function TrafficChart({ series, width, height, interactive }: { series: SeriesPoint[]; width: number; height: number; interactive?: boolean }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { points, linePath, areaPath } = buildChartGeometry(series, width, height);

  if (points.length === 0) {
    return <div style={{ padding: "40px 14px", textAlign: "center", fontSize: 12.5, color: C.dim }}>Not enough data yet. Check back soon.</div>;
  }

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!interactive || !svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = width / rect.width;
    const cursorX = (e.clientX - rect.left) * scaleX;
    let nearest = 0;
    let nearestDist = Infinity;
    points.forEach(([x], i) => {
      const dist = Math.abs(x - cursorX);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    setHoverIdx(nearest);
  }

  const hovered = hoverIdx !== null ? series[hoverIdx] : null;
  const hoverX = hoverIdx !== null ? points[hoverIdx][0] : 0;
  const hoverPct = width > 0 ? hoverX / width : 0;
  const tooltipAlign: "left" | "right" | "center" = hoverPct < 0.18 ? "left" : hoverPct > 0.82 ? "right" : "center";

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: "100%", height, display: "block", cursor: interactive ? "crosshair" : undefined }}
        preserveAspectRatio="none"
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id="opsTrafficGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity=".24" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.16, 0.42, 0.68, 0.94].map((f) => <line key={f} x1="0" y1={height * f} x2={width} y2={height * f} stroke={C.rowBorder2} />)}
        {areaPath && <path d={areaPath} fill="url(#opsTrafficGrad)" />}
        <path d={linePath} fill="none" stroke="#60a5fa" strokeWidth={interactive ? 2 : 1.8} strokeDasharray={points.length > 1 ? "6 4" : undefined} strokeLinecap="round" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === points.length - 1 ? 4 : 3.2} fill={i === points.length - 1 ? "#60a5fa" : "#171412"} stroke="#60a5fa" strokeWidth={i === points.length - 1 ? 0 : 1.8} />
        ))}
        {hoverIdx !== null && (
          <>
            <line x1={hoverX} y1={0} x2={hoverX} y2={height} stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 3" opacity={0.6} />
            <circle cx={hoverX} cy={points[hoverIdx][1]} r={5.5} fill="#60a5fa" stroke="#0f0e0d" strokeWidth={2} />
          </>
        )}
        {/* Invisible hit-catcher, drawn last (on top) so it actually receives the
            mouse events -- a catcher drawn earlier gets intercepted by the visible
            path/dots painted over it. */}
        {interactive && <rect x={0} y={0} width={width} height={height} fill="transparent" />}
      </svg>
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: 6,
            left: tooltipAlign === "left" ? `${(hoverPct * 100).toFixed(1)}%` : tooltipAlign === "center" ? `${(hoverPct * 100).toFixed(1)}%` : undefined,
            right: tooltipAlign === "right" ? `${((1 - hoverPct) * 100).toFixed(1)}%` : undefined,
            transform: tooltipAlign === "left" ? "translateX(0)" : tooltipAlign === "center" ? "translateX(-50%)" : "translateX(0)",
            background: "#1f1f21",
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: "9px 12px",
            fontSize: 11.5,
            color: C.body2,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 16px rgba(0,0,0,.4)",
          }}
        >
          <div style={{ fontWeight: 600, color: C.bright, marginBottom: 4 }}>{fmtChartDate(hovered.date)}</div>
          <div>Clicks: <span style={{ ...mono, color: "#60a5fa" }}>{hovered.clicks}</span></div>
          <div>Impressions: <span style={{ ...mono, color: C.body3 }}>{hovered.impressions}</span></div>
          {hovered.avgPosition != null && <div>Avg. position: <span style={{ ...mono, color: C.body3 }}>#{hovered.avgPosition.toFixed(1)}</span></div>}
        </div>
      )}
    </div>
  );
}

// Centered, expanded view of the same real chart -- opened by clicking the small
// preview. Reuses the same day-window toggle the small card sits under, so the range
// can change without leaving the expanded view.
function TrafficChartOverlay({
  series,
  days,
  onDaysChange,
  onClose,
}: {
  series: SeriesPoint[];
  days: (typeof WINDOWS)[number];
  onDaysChange: (days: (typeof WINDOWS)[number]) => void;
  onClose: () => void;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0 }} />
      <div className="kanso-fade-in" style={{ position: "relative", width: "min(960px, 94vw)", maxHeight: "min(640px, 90vh)", background: "#18181a", border: "1px solid #34343a", borderRadius: 14, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: `1px solid ${C.rowBorder2}` }}>
          <span style={{ fontSize: 14.5, fontWeight: 500, color: C.bright }}>Traffic over time</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: "inline-flex", flexWrap: "nowrap", background: "#1f1f21", border: "1px solid #2d2d31", borderRadius: 9, padding: 3 }}>
            {WINDOWS.map((w) => (
              <span
                key={w}
                onClick={() => onDaysChange(w)}
                className={days !== w ? "kanso-row-hover" : undefined}
                style={{ height: 26, padding: "0 11px", display: "grid", placeItems: "center", whiteSpace: "nowrap", flex: "none", background: days === w ? "#0f0e0d" : "transparent", borderRadius: 6, fontSize: 12.5, fontWeight: days === w ? 500 : 400, color: days === w ? C.bright : C.dim, cursor: "pointer" }}
              >
                {w} days
              </span>
            ))}
          </div>
          <button onClick={onClose} className="kanso-danger-btn" style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "22px 24px 18px" }}>
          <TrafficChart series={series} width={880} height={360} interactive />
          <div style={{ display: "flex", justifyContent: "space-between", overflow: "hidden", padding: "10px 4px 0", ...mono, fontSize: 10.5, color: C.faint }}>
            {series.filter((_, i) => series.length <= 14 || i % Math.ceil(series.length / 14) === 0 || i === series.length - 1).map((p) => (
              <span key={p.date} style={{ whiteSpace: "nowrap" }}>{p.date.slice(5).replace("-", "/")}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, padding: "13px 2px 2px", borderTop: `1px solid ${C.rowBorder2}`, marginTop: 8, fontSize: 12, color: C.dim }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ width: 16, height: 0, borderTop: "2px dashed #60a5fa" }} />Search clicks</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Real shape, no real or sample numbers -- section headers as skeleton bars, each
// card as a skeleton block sized to its real counterpart, so nothing (a "-"
// placeholder, a "Connect"/"not connected" state that might flip a moment later) has
// a chance to flash on screen while the actual fetch is still in flight.
function TrafficTabSkeleton() {
  return (
    <>
      <Skeleton width={140} height={11} style={{ margin: "20px 0 10px" }} />
      <Card style={{ marginBottom: 20, padding: 14 }}>
        <Skeleton width="100%" height={44} style={{ marginBottom: 10 }} />
        <Skeleton width="100%" height={44} />
      </Card>
      <Skeleton width={170} height={11} style={{ margin: "20px 0 10px" }} />
      <Card style={{ padding: 16 }}>
        <Skeleton width="100%" height={64} />
      </Card>
      <Skeleton width={150} height={11} style={{ margin: "20px 0 10px" }} />
      <Card style={{ padding: 16 }}>
        <Skeleton width="100%" height={158} />
      </Card>
      <Skeleton width={190} height={11} style={{ margin: "20px 0 10px" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {[0, 1, 2].map((i) => (
          <Card key={i} style={{ padding: 14 }}>
            <Skeleton width={70} height={11} style={{ marginBottom: 10 }} />
            <Skeleton width={50} height={20} />
          </Card>
        ))}
      </div>
      <Card style={{ marginTop: 14, padding: 14 }}>
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} width="100%" height={12} style={{ marginBottom: i < 3 ? 14 : 0 }} />
        ))}
      </Card>
    </>
  );
}

export function TrafficTab({
  data,
  error,
  connections,
  days,
  onDaysChange,
  loading,
}: {
  data: TrafficData | null;
  error: string | null;
  connections: { gsc: boolean; ga4: boolean } | null;
  days: (typeof WINDOWS)[number];
  onDaysChange: (days: (typeof WINDOWS)[number]) => void;
  loading?: boolean;
}) {
  const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n));
  const [chartExpanded, setChartExpanded] = useState(false);

  const series = data?.series ?? [];

  const otherChannelsMultiplier =
    data?.ga4 && data.clicks > 0 ? Math.max(0, (data.ga4.sessions - data.clicks) / data.clicks) : null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 14, gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12.5, color: C.dim, flex: "none" }}>Showing</span>
        <div style={{ flex: 1 }} />
        {/* A single-row segmented control, same visual language as GSC's own quick-range
            picker (24 hours / 7 days / 28 days / 3 months) -- short labels and a shared
            bordered capsule instead of three independent pills, which is what was
            wrapping onto two lines in the narrow sidebar column. */}
        <div style={{ display: "inline-flex", flexWrap: "nowrap", flex: "none", background: "#1f1f21", border: "1px solid #2d2d31", borderRadius: 9, padding: 3 }}>
          {WINDOWS.map((w) => (
            <span
              key={w}
              onClick={() => onDaysChange(w)}
              className={days !== w ? "kanso-row-hover" : undefined}
              style={{ height: 26, padding: "0 11px", display: "grid", placeItems: "center", whiteSpace: "nowrap", flex: "none", background: days === w ? "#0f0e0d" : "transparent", borderRadius: 6, fontSize: 12.5, fontWeight: days === w ? 500 : 400, color: days === w ? C.bright : C.dim, cursor: "pointer" }}
            >
              {w} days
            </span>
          ))}
        </div>
      </div>

      {loading ? (
        <TrafficTabSkeleton />
      ) : (
        <>
      {error && (
        <div style={{ marginBottom: 16, padding: "10px 12px", background: "#1a1211", border: "1px solid #3a2523", borderRadius: 8, fontSize: 12, color: "#9c6b68" }}>
          {error}
        </div>
      )}
      {!data && !error && (
        <div style={{ marginBottom: 16, padding: "10px 12px", background: "#1a1a1c", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.dim }}>
          No Search Console data yet. The daily refresh hasn&apos;t run for this project.
        </div>
      )}

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "12px 14px", borderBottom: `1px solid ${C.rowBorder2}` }}>
          <span style={{ flex: 1, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.11em", textTransform: "uppercase", color: C.dim }}>Connect Google Services</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 14px" }}>
          <GscIcon />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: C.bright }}>Search Console</div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 2 }}>Search rankings</div>
          </div>
          {connections?.gsc ? (
            <span style={{ height: 30, padding: "0 15px", display: "inline-grid", placeItems: "center", fontSize: 12, fontWeight: 500, color: "#4ade80" }}>Connected</span>
          ) : (
            <a href={googleConnectUrl("gsc")} className="kanso-white-btn" style={{ height: 30, padding: "0 15px", display: "inline-grid", placeItems: "center", background: "#fafafc", border: "none", borderRadius: 8, color: "#18181a", fontSize: 12, fontWeight: 500, cursor: "pointer", textDecoration: "none" }}>Connect</a>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "13px 14px", borderTop: "1px solid #232327" }}>
          <GaIcon />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: C.bright }}>Google Analytics</div>
            <div style={{ fontSize: 11.5, color: C.dim, marginTop: 2 }}>Sessions and engagement</div>
          </div>
          {connections?.ga4 ? (
            <span style={{ height: 30, padding: "0 15px", display: "inline-grid", placeItems: "center", fontSize: 12, fontWeight: 500, color: "#4ade80" }}>Connected</span>
          ) : (
            <a href={googleConnectUrl("ga4")} className="kanso-ghost-btn" style={{ height: 30, padding: "0 15px", display: "inline-grid", placeItems: "center", background: "transparent", border: "1px solid #3d3d44", borderRadius: 8, color: C.body2, fontSize: 12, cursor: "pointer", textDecoration: "none" }}>Connect</a>
          )}
        </div>
      </Card>

      <SectionHead title="How people found you" subtitle="From a search result to a visit on your site" />
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 28px 1fr 28px 1fr", alignItems: "center" }}>
          <FunnelStep label="Saw you in Google" value={data ? fmt(data.impressions) : "-"} delta={pctLabel(data?.deltas.impressions ?? null)} up={(data?.deltas.impressions ?? 0) > 0} />
          <Arrow />
          <FunnelStep label="Clicked through" value={data ? fmt(data.clicks) : "-"} delta={pctLabel(data?.deltas.clicks ?? null)} up={(data?.deltas.clicks ?? 0) > 0} />
          <Arrow />
          <FunnelStep label="Visited your site" value={data?.ga4 ? fmt(data.ga4.sessions) : "Not connected"} small={!data?.ga4} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 30, padding: "11px 0", borderTop: `1px solid ${C.rowBorder2}`, background: C.headBg, fontSize: 12, color: C.dim }}>
          <span><span style={{ color: C.bright, fontWeight: 500 }}>{data ? `${(data.clickRate * 100).toFixed(1)}%` : "-"}</span> click rate</span>
          {otherChannelsMultiplier !== null && (
            <span><span style={{ color: C.bright, fontWeight: 500 }}>{otherChannelsMultiplier.toFixed(1)}x</span> from other channels</span>
          )}
        </div>
      </Card>

      <SectionHead title="Traffic over time" subtitle={`Search clicks -- last ${days} days`} />
      <Card
        style={{ padding: "16px 14px 10px", position: "relative", cursor: series.length > 0 ? "pointer" : undefined, overflow: "hidden" }}
        onClick={() => series.length > 0 && setChartExpanded(true)}
      >
        {series.length > 0 && (
          <span title="Expand" style={{ position: "absolute", top: 10, right: 10, width: 22, height: 22, display: "grid", placeItems: "center", borderRadius: 6, color: C.faint }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" /></svg>
          </span>
        )}
        <TrafficChart series={series} width={620} height={158} />
        {series.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", overflow: "hidden", padding: "8px 10px 6px", ...mono, fontSize: 10.5, color: C.faint }}>
              {series.filter((_, i) => series.length <= 6 || i % Math.ceil(series.length / 6) === 0 || i === series.length - 1).map((p) => (
                <span key={p.date} style={{ whiteSpace: "nowrap" }}>{p.date.slice(5).replace("-", "/")}</span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", padding: "11px 2px 2px", borderTop: `1px solid ${C.rowBorder2}`, fontSize: 12, color: C.dim }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ width: 16, height: 0, borderTop: "2px dashed #60a5fa" }} />Search clicks</span>
            </div>
          </>
        )}
      </Card>
      {chartExpanded && (
        <TrafficChartOverlay series={series} days={days} onDaysChange={onDaysChange} onClose={() => setChartExpanded(false)} />
      )}

      <SectionHead
        title="How well you're ranking"
        subtitle="Your position in Google and the queries bringing traffic"
        right={<InfoDot text="Position is Google's average rank for your pages across all real queries this period. Lower is better." />}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        <Stat
          label="Avg. position"
          value={data?.avgPosition != null ? `#${data.avgPosition.toFixed(1)}` : "-"}
          delta={pctLabel(data?.deltas.avgPosition ?? null)}
          // A lower position number is better -- a positive % change here means the
          // rank got worse, so "up" (green) is inverted relative to every other stat.
          deltaUp={(data?.deltas.avgPosition ?? 0) < 0}
        />
        <Stat label="Click rate" value={data ? `${(data.clickRate * 100).toFixed(2)}%` : "-"} delta={pctLabel(data?.deltas.clickRate ?? null)} deltaUp={(data?.deltas.clickRate ?? 0) > 0} />
        <Stat label="Total clicks" value={data ? String(data.clicks) : "-"} delta={pctLabel(data?.deltas.clicks ?? null)} deltaUp={(data?.deltas.clicks ?? 0) > 0} />
      </div>

      <Card style={{ marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "13px 14px" }}>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>Top queries</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: C.dim }}>Last {days} days</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 64px 64px", padding: "9px 14px", background: C.headBg, borderTop: `1px solid ${C.rowBorder2}`, borderBottom: `1px solid ${C.rowBorder2}`, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dimmer }}>
          <span>Query</span><span style={{ textAlign: "right" }}>Clicks</span><span style={{ textAlign: "right" }}>CTR</span>
        </div>
        {(data?.queries ?? []).length === 0 ? (
          <div style={{ padding: "14px", fontSize: 12.5, color: C.dim }}>No query data yet.</div>
        ) : (
          data!.queries.map((row, i) => (
            <div key={row.query} style={{ display: "grid", gridTemplateColumns: "1fr 64px 64px", padding: "11px 14px", borderBottom: i < data!.queries.length - 1 ? "1px solid #232327" : "none", fontSize: 12.5 }}>
              <span style={{ color: C.body }}>{row.query}</span>
              <span style={{ textAlign: "right", ...mono, fontSize: 11.5, color: C.body3 }}>{row.clicks}</span>
              <span style={{ textAlign: "right", ...mono, fontSize: 11.5, color: C.body3 }}>{(row.ctr * 100).toFixed(1)}%</span>
            </div>
          ))
        )}
      </Card>

      <Card style={{ marginTop: 14 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "13px 14px" }}>
          <span style={{ fontSize: 13.5, fontWeight: 500 }}>Top pages</span>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 12, color: C.dim }}>Last {days} days</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 64px", padding: "9px 14px", background: C.headBg, borderTop: `1px solid ${C.rowBorder2}`, borderBottom: `1px solid ${C.rowBorder2}`, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dimmer }}>
          <span>Page</span><span style={{ textAlign: "right" }}>Clicks</span>
        </div>
        {(data?.topPages ?? []).length === 0 ? (
          <div style={{ padding: "14px", fontSize: 12.5, color: C.dim }}>No page data yet.</div>
        ) : (
          data!.topPages.slice(0, 6).map((row, i, arr) => {
            const path = (row.keys?.[0] ?? "").replace(/^https?:\/\/[^/]+/, "") || "/";
            return (
              <div key={path} style={{ display: "grid", gridTemplateColumns: "1fr 64px", padding: "11px 14px", borderBottom: i < arr.length - 1 ? "1px solid #232327" : "none", fontSize: 12.5 }}>
                <span style={{ color: C.body, ...mono, fontSize: 12 }}>{path}</span>
                <span style={{ textAlign: "right", ...mono, fontSize: 11.5, color: C.body3 }}>{row.clicks ?? 0}</span>
              </div>
            );
          })
        )}
      </Card>

      <SectionHead title="Where in the world" subtitle="Top countries by search clicks" />
      <Card style={{ padding: "14px" }}>
        {(data?.countries ?? []).length === 0 ? (
          <div style={{ fontSize: 12.5, color: C.dim }}>No country data yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {data!.countries.map((c) => (
              <div key={c.code} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ flex: "none", width: 18, textAlign: "center", fontSize: 14 }}>{flagEmoji(c.code) ?? <GlobeIcon />}</span>
                <div style={{ flex: 1 }}>
                  <BarRow label={c.name} value={`${(c.share * 100).toFixed(1)}%`} pct={c.share * 100} color="#60a5fa" />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <SectionHead
        title="What they did on your site"
        subtitle={connections?.ga4 ? "Engagement and conversions from your visitors" : "Requires Google Analytics, not connected yet"}
      />
      {connections?.ga4 && data?.ga4 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
          <Stat label="Sessions" value={fmt(data.ga4.sessions)} />
          <Stat label="Returning visitors" value={fmt(data.ga4.returningVisitors)} />
          <Stat label="Key events" value={fmt(data.ga4.keyEvents)} note="conversions" />
          <Stat label="Avg. session" value={fmtSeconds(data.ga4.avgSessionSeconds)} />
          <Stat label="Engagement rate" value={`${(data.ga4.engagementRate * 100).toFixed(1)}%`} />
          <Stat label="Bounce rate" value={`${(data.ga4.bounceRate * 100).toFixed(1)}%`} />
        </div>
      ) : data?.ga4Error ? (
        <div style={{ padding: "14px", fontSize: 12.5, color: "#9c6b68", border: "1px solid #3a2523", background: "#1a1211", borderRadius: 10, lineHeight: 1.6 }}>
          <div style={{ marginBottom: data.ga4Error.match(/https?:\/\/\S+/) ? 8 : 0 }}>Google Analytics is connected, but hasn&apos;t synced real data yet.</div>
          {(() => {
            const url = data.ga4Error.match(/https?:\/\/\S+/)?.[0];
            return url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#e0857f", textDecoration: "underline" }}>Fix this in Google Cloud Console &rarr;</a>
            ) : null;
          })()}
        </div>
      ) : (
        <div style={{ padding: "14px", fontSize: 12.5, color: C.dim, border: `1px solid ${C.border}`, borderRadius: 10 }}>
          {connections?.ga4
            ? "Connected. Data will appear after the next refresh."
            : "Connect Google Analytics above to see sessions, returning visitors, and engagement here."}
        </div>
      )}

      <div style={{ marginTop: 22, fontSize: 11, color: C.faint, textAlign: "center" }}>
        {connections?.gsc ? "Search Console" : "No source connected"}{data?.ga4 ? " + Google Analytics" : ""}
      </div>
        </>
      )}
    </div>
  );
}

function FunnelStep({ label, value, delta, up, small }: { label: string; value: string; delta?: string; up?: boolean; small?: boolean }) {
  return (
    <div style={{ padding: "18px 10px", textAlign: "center" }}>
      <div style={{ fontSize: 12, color: C.dim, marginBottom: 9 }}>{label}</div>
      <div
        style={{
          ...sora,
          fontSize: small ? 14 : 24,
          fontWeight: small ? 500 : 600,
          lineHeight: 1,
          color: small ? C.dim : C.bright,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      {delta && <TrendPill up={!!up} value={delta} style={{ marginTop: 8, justifyContent: "center" }} />}
    </div>
  );
}
function Arrow() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#403a35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

// Honest empty state for a tab with no real data source wired up yet -- used instead
// of inventing PageSpeed scores, backlink counts, or server-timing numbers that this
// product has never actually measured. Naming what real integration would need to
// exist, not just saying "coming soon."
function NotBuiltTab({ title, needs }: { title: string; needs: string }) {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "#1f1f21", border: `1px solid ${C.border}`, display: "grid", placeItems: "center", margin: "0 auto 16px" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.dim} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 500, color: C.bright, marginBottom: 6 }}>{title} isn&apos;t wired to a real data source yet</div>
      <div style={{ fontSize: 12.5, color: C.dim, maxWidth: 340, margin: "0 auto", lineHeight: 1.6 }}>{needs}</div>
    </div>
  );
}

type CwvMetric = { value: string | null; verdict: "pass" | "warn" | "fail" | null };
type LighthouseStrategyResult = {
  scores: { performance: number; seo: number; accessibility: number; bestPractices: number };
  coreWebVitals: { lcp: CwvMetric; fcp: CwvMetric; tbt: CwvMetric; cls: CwvMetric; inp: string | null; ttfb: string | null };
  failingAudits: { id: string; title: string; description: string }[];
};

export type SeoHealthTabData = {
  pages: {
    url: string;
    mobile: LighthouseStrategyResult;
    desktop: LighthouseStrategyResult;
    onPage: { mobileFriendly: boolean | null; readability: "Easy" | "Standard" | "Difficult" | null };
    issues: { id: string; title: string; severity: "warning" | "error"; description?: string }[];
  }[];
} | null;

function scoreColor(score: number): string {
  return score >= 90 ? C.green : score >= 50 ? C.amber : C.red;
}

// Lighthouse audit descriptions often carry a trailing markdown link, e.g.
// "...affects load time. [Learn more](https://web.dev/...)." -- kept as real text
// (never invented), just de-markdowned so it reads as plain prose in this UI.
function stripMarkdownLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
}

function pagePath(url: string): string {
  try {
    const path = new URL(url).pathname;
    // The homepage's own path is the single character "/" -- correct, but on its own
    // line next to a mono-spaced font it reads as an orphaned stray character rather
    // than a label. "Homepage" says what the row actually is.
    return !path || path === "/" ? "Homepage" : path;
  } catch {
    return url;
  }
}

function verdictColor(verdict: "pass" | "warn" | "fail" | null): string {
  return verdict === "pass" ? C.green : verdict === "warn" ? C.amber : verdict === "fail" ? C.red : C.dimmer;
}
function verdictLabel(verdict: "pass" | "warn" | "fail" | null): string {
  return verdict === "pass" ? "Pass" : verdict === "warn" ? "Warn" : verdict === "fail" ? "Fail" : "-";
}

function StrategyGauges({ label, strategy }: { label: string; strategy: LighthouseStrategyResult }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.dimmer, marginBottom: 12 }}>{label}</div>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16, marginBottom: 8 }}>
        <RingGauge score={strategy.scores.performance} color={scoreColor(strategy.scores.performance)} label="Performance" />
        <RingGauge score={strategy.scores.accessibility} color={scoreColor(strategy.scores.accessibility)} label="Accessibility" />
        <RingGauge score={strategy.scores.bestPractices} color={scoreColor(strategy.scores.bestPractices)} label="Best Practices" />
        <RingGauge score={strategy.scores.seo} color={scoreColor(strategy.scores.seo)} label="SEO" />
      </div>
    </div>
  );
}

// Real Core Web Vitals with a Desktop/Mobile toggle -- own local state since each page
// card on this tab needs an independent toggle, which a shared component (rather than
// inlining a useState per .map() iteration, illegal for hooks) makes straightforward.
function CoreWebVitalsCard({ mobile, desktop }: { mobile: LighthouseStrategyResult; desktop: LighthouseStrategyResult }) {
  const [strategy, setStrategy] = useState<"desktop" | "mobile">("desktop");
  const active = strategy === "desktop" ? desktop : mobile;
  const metrics: { key: "lcp" | "fcp" | "tbt" | "cls"; label: string }[] = [
    { key: "lcp", label: "LCP" },
    { key: "fcp", label: "FCP" },
    { key: "tbt", label: "TBT" },
    { key: "cls", label: "CLS" },
  ];
  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: "inline-flex", width: "100%", background: "#1f1f21", border: "1px solid #2d2d31", borderRadius: 9, padding: 3, marginBottom: 14 }}>
        {(["desktop", "mobile"] as const).map((s) => (
          <span
            key={s}
            onClick={() => setStrategy(s)}
            className={strategy !== s ? "kanso-row-hover" : undefined}
            style={{ flex: 1, height: 28, display: "grid", placeItems: "center", background: strategy === s ? "#0f0e0d" : "transparent", borderRadius: 6, fontSize: 12.5, fontWeight: strategy === s ? 500 : 400, color: strategy === s ? C.bright : C.dim, cursor: "pointer", textTransform: "capitalize" }}
          >
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
        {metrics.map((m) => {
          const metric = active.coreWebVitals[m.key];
          return (
            <Card key={m.key} style={{ padding: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: verdictColor(metric.verdict), flex: "none" }} />
                <span style={{ fontSize: 12, color: C.dim }}>{m.label}</span>
              </div>
              <div style={{ ...sora, fontSize: 19, fontWeight: 600, color: verdictColor(metric.verdict), letterSpacing: "-0.02em" }}>{metric.value ?? "-"}</div>
              <div style={{ fontSize: 11.5, color: C.dim, marginTop: 6 }}>{verdictLabel(metric.verdict)}</div>
            </Card>
          );
        })}
      </div>
      <div style={{ fontSize: 11, color: C.faint, fontStyle: "italic", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
        Based on Core Web Vitals guidance; lab runs may differ from real users.
      </div>
    </Card>
  );
}

function severityColor(severity: "warning" | "error"): string {
  return severity === "error" ? C.red : C.amber;
}

// A real production incident, not a hypothetical: a project's stored SEO_HEALTH snap
// from before this data shape changed (flat scores/coreWebVitals directly on each page,
// no mobile/desktop split) crashed this whole tab with "Cannot read properties of
// undefined (reading 'coreWebVitals')" the moment anyone opened it -- the old data was
// still `pages.length > 0`, so it sailed past the empty-state check above and straight
// into code that assumed every page already had the new shape. Any snap missing the
// fields this version actually needs is treated as if no audit had been run at all
// (prompting a real re-run) rather than trusting `pages.length` alone as "this data is
// safe to render."
// Plain boolean, deliberately not a `data is X` type predicate -- a predicate would
// make TypeScript infer the false branch as "data must be null" (the negation of
// NonNullable<X|null> is always just null to the type checker), which is wrong here:
// data can be falsy in this branch for two real, different reasons (never run at all,
// or a real non-null snap in the old stale shape), and the code below needs to keep
// treating `data` as its full original type to tell those two cases apart.
function isFreshSeoData(data: SeoHealthTabData): boolean {
  return !!data && data.pages.length > 0 && data.pages.every((p) => !!p.mobile && !!p.desktop && Array.isArray(p.issues));
}

export function SeoTab({ data, snapshotDate }: { data: SeoHealthTabData; snapshotDate: string | null }) {
  if (!isFreshSeoData(data)) {
    return (
      <NotBuiltTab
        title="SEO"
        needs={
          data && data.pages.length > 0
            ? 'The last SEO Audit for this project used an older data format. Click "Run SEO Audit" above to regenerate it in the current format.'
            : 'No SEO health audit has been run yet. This runs Google’s own PageSpeed Insights (real Lighthouse scores and Core Web Vitals) against fermor.in’s real, live pages. Click “Run SEO Audit” above to generate it for real.'
        }
      />
    );
  }
  // Safe: isFreshSeoData(data) above already confirmed data is non-null with the
  // current shape -- a plain non-null assertion here (not a type predicate on the
  // function above) is what avoids the false-branch narrowing problem described there.
  data = data!;

  return (
    <div>
      <SectionHead
        title="Site speed & SEO health"
        subtitle={`Real Lighthouse scores from Google PageSpeed Insights (mobile + desktop)${snapshotDate ? ` · last audited ${new Date(snapshotDate).toLocaleDateString()}` : ""}`}
      />
      {data.pages.map((page) => (
        <div key={page.url} style={{ marginBottom: 34 }}>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, ...mono }}>{pagePath(page.url)}</div>

          <SectionHead title="PageSpeed scores" subtitle="Lighthouse scores from Google" />
          <Card style={{ padding: "18px 14px", display: "flex", flexDirection: "column", gap: 22 }}>
            <StrategyGauges label="Mobile" strategy={page.mobile} />
            <StrategyGauges label="Desktop" strategy={page.desktop} />
          </Card>

          <SectionHead title="Core Web Vitals" subtitle="Lighthouse lab metrics" />
          <CoreWebVitalsCard mobile={page.mobile} desktop={page.desktop} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 12 }}>
            <Stat label="INP (mobile)" value={page.mobile.coreWebVitals.inp ?? "-"} note="Interaction to Next Paint" />
            <Stat label="TTFB (mobile)" value={page.mobile.coreWebVitals.ttfb ?? "-"} note="Time to First Byte" />
          </div>

          <SectionHead title="SEO health" subtitle="On-page metadata and content signals" />
          <Card>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: C.headBg, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.dimmer, borderBottom: `1px solid ${C.rowBorder2}` }}>
              <span>Signal</span>
              <span>Value</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderBottom: `1px solid ${C.rowBorder}` }}>
              <span style={{ fontSize: 12.5, color: C.body2 }}>Mobile Friendly</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: page.onPage.mobileFriendly === null ? C.dimmer : page.onPage.mobileFriendly ? C.green : C.red }}>
                {page.onPage.mobileFriendly === null ? "-" : page.onPage.mobileFriendly ? "Yes" : "No"}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px" }}>
              <span style={{ fontSize: 12.5, color: C.body2 }}>Readability</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: page.onPage.readability === "Easy" ? C.green : page.onPage.readability === "Difficult" ? C.red : page.onPage.readability === "Standard" ? C.amber : C.dimmer }}>
                {page.onPage.readability ?? "-"}
              </span>
            </div>
          </Card>

          <SectionHead title="Issues" subtitle="Detected on-page problems" right={<span style={{ fontSize: 12.5, color: C.amber }}>{page.issues.length}</span>} />
          {page.issues.length === 0 ? (
            <Card style={{ padding: "16px 14px" }}>
              <div style={{ fontSize: 12.5, color: C.dim }}>No real issues found on this page.</div>
            </Card>
          ) : (
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: C.headBg, fontSize: 11.5, fontWeight: 600, color: C.dimmer, borderBottom: `1px solid ${C.rowBorder2}` }}>
                <span>Top issues</span>
                <span>{page.issues.length} total</span>
              </div>
              {page.issues.map((issue, i) => (
                <div key={issue.id} style={{ padding: "12px 14px", borderBottom: i < page.issues.length - 1 ? "1px solid #232327" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 12.5, color: C.body }}>{issue.title}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: severityColor(issue.severity), flex: "none" }}>{issue.severity === "error" ? "Error" : "Warning"}</span>
                  </div>
                  {issue.description && <div style={{ fontSize: 11.5, color: C.dimmer, lineHeight: 1.6, marginTop: 4 }}>{stripMarkdownLinks(issue.description)}</div>}
                </div>
              ))}
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}

export type LinkAuditTabData = {
  pagesInSitemap: number;
  pagesCrawled: number;
  totalInternalLinksFound: number;
  avgLinksPerPage: number;
  underLinkedCalculators: { path: string; inbound: number }[];
  mostLinkedPages: { path: string; count: number }[];
  // Optional: snaps recorded before this field was added won't have it -- render
  // those exactly like "not yet run" rather than crashing on a missing key.
  serverInfo?: { server: string | null; country: string | null; platform: string | null };
} | null;

function ServerInfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderBottom: last ? "none" : `1px solid ${C.rowBorder}` }}>
      <span style={{ fontSize: 12.5, color: C.dim }}>{label}</span>
      <span style={{ fontSize: 12.5, color: C.body, ...mono }}>{value}</span>
    </div>
  );
}

// Deliberately not backed by Ahrefs/Moz/DataForSEO (ongoing paid cost the user
// doesn't want). Real, free alternative: an internal link-health audit -- crawls
// the site's own sitemap and pages to find genuinely under-linked calculator pages.
export function LinksTab({ data, snapshotDate }: { data: LinkAuditTabData; snapshotDate: string | null }) {
  if (!data) {
    return (
      <NotBuiltTab
        title="Links"
        needs="No internal link audit has been run yet. This tracks real inbound links between fermor.in's own pages (not third-party backlinks -- no paid API is used here). Click “Run Link Audit” above to generate it for real."
      />
    );
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
        <Stat label="Pages crawled" value={String(data.pagesCrawled)} note={`of ${data.pagesInSitemap} in sitemap`} />
        <Stat label="Internal links found" value={String(data.totalInternalLinksFound)} />
        <Stat label="Avg links / page" value={String(data.avgLinksPerPage)} />
      </div>
      {snapshotDate && (
        <div style={{ fontSize: 11, color: C.faint, marginBottom: 16 }}>Last run {new Date(snapshotDate).toLocaleDateString()} &middot; based on a {data.pagesCrawled}-page sample, not a full-site crawl</div>
      )}

      <SectionHead title="Under-linked calculators" subtitle="Real calculator pages with the fewest inbound links found in the crawled sample" />
      <Card>
        {data.underLinkedCalculators.map((r, i) => (
          <div key={r.path} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: i < data.underLinkedCalculators.length - 1 ? "1px solid #232327" : "none" }}>
            <span style={{ flex: 1, fontSize: 12.5, color: C.body, ...mono }}>{r.path}</span>
            <span style={{ fontSize: 11.5, color: r.inbound === 0 ? C.red : C.amber }}>{r.inbound} inbound link{r.inbound === 1 ? "" : "s"}</span>
          </div>
        ))}
      </Card>

      <SectionHead title="Most-linked pages" subtitle="Pages this site links to most often internally" />
      <Card>
        {data.mostLinkedPages.map((r, i) => (
          <div key={r.path} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: i < data.mostLinkedPages.length - 1 ? "1px solid #232327" : "none" }}>
            <span style={{ flex: 1, fontSize: 12.5, color: C.body, ...mono }}>{r.path}</span>
            <span style={{ fontSize: 11.5, color: C.dimmer, ...mono }}>{r.count}</span>
          </div>
        ))}
      </Card>

      <SectionHead title="Backlink profile" subtitle="External sites linking to fermor.in" />
      <Card style={{ padding: "20px 18px" }}>
        <div style={{ fontSize: 12.5, color: C.body2, lineHeight: 1.6, marginBottom: 8 }}>
          Not connected. Backlink counts, referring domains, spam score, link types/attributes, and TLD distribution all require a paid backlink index (Ahrefs, Moz, SEMrush, or a pay-per-call API like DataForSEO) that crawls the wider web, not just fermor.in&apos;s own pages.
        </div>
        <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6 }}>
          The internal link audit above is the real, free alternative already running. Connecting a backlink provider is a real ongoing cost decision, not a code change &mdash; ask to have it added if this becomes worth paying for.
        </div>
      </Card>

      <SectionHead title="Server info" subtitle="Real hosting facts for fermor.in -- no third-party data API involved" />
      <Card>
        <ServerInfoRow label="Server" value={data.serverInfo?.server ?? "Unknown"} />
        <ServerInfoRow label="Country" value={data.serverInfo?.country ?? "Unknown"} />
        <ServerInfoRow label="Platform" value={data.serverInfo?.platform ?? "Unknown"} last />
      </Card>
    </div>
  );
}

export type TechnicalTabData = {
  pages: {
    path: string;
    responseTimeMs: number;
    onPageScore: number;
    server: string | null;
    status: number;
    encoding: string | null;
    pageSizeBytes: number | null;
    domSizeBytes: number;
    cacheable: boolean;
    connectionTiming: { connectMs: number | null; tlsMs: number | null; ttfbMs: number | null; downloadMs: number | null; transferBytes: number | null };
    browserTiming: { timeToInteractiveMs: number | null; domCompleteMs: number | null };
    contentRelevance: { titleRelevance: number; descriptionRelevance: number; keywordRelevance: number; contentRate: number };
    renderBlockingScripts: number;
    renderBlockingStylesheets: number;
    headings: { h1Count: number; skippedLevels: boolean; outline: string[]; countsByLevel: { level: number; count: number }[] };
    openGraph: { title: boolean; description: boolean; image: boolean; type: boolean };
    twitterCard: { card: boolean; title: boolean; image: boolean };
  }[];
} | null;

function formatBytes(bytes: number | null): string {
  if (bytes === null) return "Unknown";
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

// Real, documented thresholds for metrics with no single official Core Web Vitals
// equivalent -- TTFB's <=200ms "good" bar is Google's own published guidance; the rest
// (connection/TLS/download/TTI/DOM-complete) use reasonable, stated round-number bands
// rather than trying to reverse-engineer a competitor's own dot colors, which turned out
// not to actually track the displayed values in the reference screenshots (e.g. a 126ms
// TLS time and a 131ms download time shown in two different colors there).
function timingColor(ms: number | null, good: number, warn: number): string {
  if (ms === null) return C.dimmer;
  return ms <= good ? C.green : ms <= warn ? C.amber : C.red;
}

function TimingTile({ label, value, good, warn, unit = "ms" }: { label: string; value: number | null; good: number; warn: number; unit?: string }) {
  const color = timingColor(value, good, warn);
  return (
    <Card style={{ padding: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flex: "none" }} />
        <span style={{ fontSize: 12, color: C.dim }}>{label}</span>
      </div>
      <div style={{ ...sora, fontSize: 19, fontWeight: 600, color, letterSpacing: "-0.02em" }}>
        {value === null ? "-" : value}
        {value !== null && unit && <span style={{ fontSize: 12, fontWeight: 400, color: C.dim, marginLeft: 3 }}>{unit}</span>}
      </div>
    </Card>
  );
}

function relevanceColor(pct: number): string {
  return pct >= 70 ? C.green : pct >= 40 ? C.amber : C.red;
}

function RelevanceBar({ label, pct }: { label: string; pct: number }) {
  const color = relevanceColor(pct);
  return (
    <div style={{ padding: "14px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12.5, color: C.body2 }}>{label}</span>
        <span style={{ ...mono, fontSize: 12.5, fontWeight: 600, color }}>{pct}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: "#232327", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.max(0, Math.min(100, pct))}%`, borderRadius: 99, background: color }} />
      </div>
    </div>
  );
}

// Bar width is relative to the largest count actually present on this page (H2's 8
// occurrences filling the bar, H1's 1 occurrence a thin sliver) -- an absolute scale
// would make a page with far more headings than another impossible to compare visually.
function HeadingDistributionBar({ level, count, maxCount }: { level: number; count: number; maxCount: number }) {
  const color = level === 1 ? C.green : C.blue;
  const widthPct = maxCount > 0 ? (count / maxCount) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px" }}>
      <span style={{ ...mono, fontSize: 12.5, color: C.dim, width: 24, flex: "none" }}>H{level}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 99, background: "#232327", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${widthPct}%`, borderRadius: 99, background: color }} />
      </div>
      <span style={{ ...mono, fontSize: 12.5, color: C.dim, width: 20, textAlign: "right", flex: "none" }}>{count}</span>
    </div>
  );
}

function CheckItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
      <span
        style={{
          width: 15, height: 15, borderRadius: "50%", display: "grid", placeItems: "center", flex: "none",
          background: ok ? "rgba(74,222,128,.14)" : "rgba(255,102,102,.14)", color: ok ? C.green : C.red,
        }}
      >
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          {ok ? <polyline points="20 6 9 17 4 12" /> : <path d="M18 6 6 18M6 6l12 12" />}
        </svg>
      </span>
      <span style={{ fontSize: 12.5, color: C.body2, ...mono }}>{label}</span>
    </div>
  );
}

// Same real class of bug as SeoTab's isFreshSeoData just above -- a stored TECHNICAL
// snap from before this tab's data shape changed (no connectionTiming/browserTiming/
// contentRelevance percentages/headings.countsByLevel) would otherwise pass the
// `pages.length > 0` check and crash deep in the render on a field that simply doesn't
// exist on the old data.
// Plain boolean -- see isFreshSeoData's comment above for why this deliberately isn't
// a `data is X` type predicate.
function isFreshTechnicalData(data: TechnicalTabData): boolean {
  return (
    !!data &&
    data.pages.length > 0 &&
    data.pages.every((p) => !!p.connectionTiming && !!p.browserTiming && !!p.contentRelevance && Array.isArray(p.headings?.countsByLevel))
  );
}

export function TechnicalTab({ data, snapshotDate }: { data: TechnicalTabData; snapshotDate: string | null }) {
  if (!isFreshTechnicalData(data)) {
    return (
      <NotBuiltTab
        title="Technical"
        needs={
          data && data.pages.length > 0
            ? 'The last Technical Audit for this project used an older data format. Click "Run Technical Audit" above to regenerate it in the current format.'
            : 'No technical audit has been run yet. This crawls fermor.in’s real pages for server timing, render-blocking resources, heading structure, and Open Graph/Twitter card tags. Click “Run Technical Audit” above to generate it for real.'
        }
      />
    );
  }
  // Safe: isFreshTechnicalData(data) above already confirmed data is non-null with the
  // current shape.
  data = data!;

  return (
    <div>
      <SectionHead
        title="Technical health"
        subtitle={`Real crawl of ${data.pages.length} page${data.pages.length === 1 ? "" : "s"}${snapshotDate ? ` · last run ${new Date(snapshotDate).toLocaleDateString()}` : ""}`}
      />
      {data.pages.map((page) => (
        <div key={page.path} style={{ marginBottom: 34 }}>
          <div style={{ fontSize: 12, color: C.dim, marginBottom: 10, ...mono }}>{page.path}</div>

          <SectionHead title="On-Page Overview" subtitle="Server configuration and page characteristics" />
          <Card style={{ padding: "18px 14px", display: "flex", alignItems: "center", gap: 20, marginBottom: 12, flexWrap: "wrap" }}>
            <RingGauge score={page.onPageScore} color={scoreColor(page.onPageScore)} label="On-Page" />
            <div>
              <div style={{ fontSize: 12, color: C.dim, marginBottom: 4 }}>On-Page Score</div>
              <div style={{ ...sora, fontSize: 30, fontWeight: 600, color: scoreColor(page.onPageScore), letterSpacing: "-0.02em" }}>{page.onPageScore}</div>
            </div>
          </Card>
          <Card>
            <ServerInfoRow label="Server" value={page.server ?? "Unknown"} />
            <ServerInfoRow label="Status" value={String(page.status)} />
            <ServerInfoRow label="Encoding" value={page.encoding ?? "None"} />
            <ServerInfoRow label="Page Size" value={formatBytes(page.pageSizeBytes)} />
            <ServerInfoRow label="DOM Size" value={formatBytes(page.domSizeBytes)} />
            <ServerInfoRow label="Cacheable" value={page.cacheable ? "Yes" : "No"} last />
          </Card>

          <SectionHead title="Server Timing" subtitle="Server-side response and load times (not Lighthouse)" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 12 }}>
            <TimingTile label="Time to Interactive" value={page.browserTiming.timeToInteractiveMs} good={3800} warn={7300} />
            <TimingTile label="DOM Complete" value={page.browserTiming.domCompleteMs} good={1500} warn={3000} />
            <TimingTile label="Connection" value={page.connectionTiming.connectMs} good={100} warn={300} />
            <TimingTile label="TLS Handshake" value={page.connectionTiming.tlsMs} good={100} warn={300} />
            <TimingTile label="TTFB" value={page.connectionTiming.ttfbMs} good={200} warn={500} />
            <TimingTile label="Download" value={page.connectionTiming.downloadMs} good={200} warn={500} />
          </div>
          {(page.browserTiming.timeToInteractiveMs === null || page.browserTiming.domCompleteMs === null) && (
            <div style={{ fontSize: 11, color: C.faint, marginBottom: 12, lineHeight: 1.6 }}>
              Time to Interactive and DOM Complete need a real SEO Audit run for this same page first (they come from that audit's real Lighthouse trace) &mdash; run one to fill these in.
            </div>
          )}

          <SectionHead title="Render Blocking" subtitle="Scripts and stylesheets blocking page render" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 12 }}>
            <TimingTile label="Blocking Scripts" value={page.renderBlockingScripts} good={0} warn={2} unit="" />
            <TimingTile label="Blocking Stylesheets" value={page.renderBlockingStylesheets} good={0} warn={1} unit="" />
          </div>

          <SectionHead title="Content Relevance" subtitle="How well your metadata matches page content" />
          <Card style={{ marginBottom: 12 }}>
            <div style={{ borderBottom: `1px solid ${C.rowBorder}` }}>
              <RelevanceBar label="Title Relevance" pct={page.contentRelevance.titleRelevance} />
            </div>
            <div style={{ borderBottom: `1px solid ${C.rowBorder}` }}>
              <RelevanceBar label="Description Relevance" pct={page.contentRelevance.descriptionRelevance} />
            </div>
            <div style={{ borderBottom: `1px solid ${C.rowBorder}` }}>
              <RelevanceBar label="Keyword Relevance" pct={page.contentRelevance.keywordRelevance} />
            </div>
            <RelevanceBar label="Content Rate" pct={page.contentRelevance.contentRate} />
          </Card>

          <SectionHead title="Heading Structure" subtitle="Distribution of heading tags across the page" />
          <Card style={{ marginBottom: 12 }}>
            {page.headings.countsByLevel.length > 0 ? (
              page.headings.countsByLevel.map((h) => <HeadingDistributionBar key={h.level} level={h.level} count={h.count} maxCount={Math.max(...page.headings.countsByLevel.map((c) => c.count))} />)
            ) : (
              <div style={{ padding: "13px 14px", fontSize: 12.5, color: C.dim }}>No headings found</div>
            )}
            {(page.headings.h1Count !== 1 || page.headings.skippedLevels) && (
              <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.rowBorder}` }}>
                {page.headings.h1Count !== 1 && (
                  <div style={{ fontSize: 12, color: C.amber, marginBottom: page.headings.skippedLevels ? 4 : 0 }}>
                    {page.headings.h1Count} H1{page.headings.h1Count === 1 ? "" : "s"} on this page (should be exactly 1)
                  </div>
                )}
                {page.headings.skippedLevels && <div style={{ fontSize: 12, color: C.amber }}>Heading levels skip somewhere on this page (e.g. an H2 straight to an H4)</div>}
              </div>
            )}
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Card style={{ padding: "13px 14px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.dimmer, marginBottom: 4 }}>Open Graph tags</div>
              <CheckItem label="og:title" ok={page.openGraph.title} />
              <CheckItem label="og:description" ok={page.openGraph.description} />
              <CheckItem label="og:image" ok={page.openGraph.image} />
              <CheckItem label="og:type" ok={page.openGraph.type} />
            </Card>
            <Card style={{ padding: "13px 14px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.dimmer, marginBottom: 4 }}>Twitter card tags</div>
              <CheckItem label="twitter:card" ok={page.twitterCard.card} />
              <CheckItem label="twitter:title" ok={page.twitterCard.title} />
              <CheckItem label="twitter:image" ok={page.twitterCard.image} />
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}

export type GeoTabData = {
  geoScore: number;
  citationResults: { query: string; wouldCite: boolean; reasoning: string }[];
  recommendations: { title: string; summary: string; estimatedImpact?: string }[];
  snapshotDate: string | null;
} | null;

export function GeoTab({ data }: { data: GeoTabData }) {
  if (!data) {
    return (
      <NotBuiltTab
        title="GEO"
        needs="No GEO Agent run yet for this project. Click “Run GEO Agent” in the Agents Feed panel to generate a real, honest assessment of whether Claude would cite fermor.in today."
      />
    );
  }

  const citedCount = data.citationResults.filter((r) => r.wouldCite).length;

  return (
    <div>
      <SectionHead title="AI Visibility" subtitle="Honest assessment of whether an AI assistant would cite fermor.in today" />
      <Card style={{ padding: "20px 18px", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ ...sora, fontSize: 40, fontWeight: 600, lineHeight: 1, color: data.geoScore >= 60 ? C.green : data.geoScore >= 30 ? C.amber : C.red, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
          {data.geoScore}
        </div>
        <div>
          <div style={{ fontSize: 12.5, color: C.dim }}>GEO score out of 100</div>
          <div style={{ fontSize: 12, color: C.dimmer, marginTop: 3 }}>Cited in {citedCount} of {data.citationResults.length} test queries{data.snapshotDate ? ` · last run ${new Date(data.snapshotDate).toLocaleDateString()}` : ""}</div>
        </div>
      </Card>

      <SectionHead title="Test queries" subtitle="Would an AI assistant cite fermor.in for each of these today?" />
      <Card>
        {data.citationResults.map((r, i) => (
          <div key={r.query} style={{ padding: "12px 14px", borderBottom: i < data.citationResults.length - 1 ? "1px solid #232327" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
              <span style={{ flex: 1, fontSize: 12.5, color: C.body }}>&ldquo;{r.query}&rdquo;</span>
              <span style={{ fontSize: 11.5, color: r.wouldCite ? C.green : C.red }}>{r.wouldCite ? "Would cite" : "Would not cite"}</span>
            </div>
            <div style={{ fontSize: 11.5, color: C.dimmer, lineHeight: 1.6 }}>{r.reasoning}</div>
          </div>
        ))}
      </Card>

      <SectionHead title="Recommendations" subtitle="From the same GEO Agent run -- also visible in the Agents Feed panel" />
      <Card>
        {data.recommendations.map((r, i) => (
          <div key={r.title} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", borderBottom: i < data.recommendations.length - 1 ? "1px solid #232327" : "none" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: C.body, marginBottom: 3 }}>{r.title}</div>
              <div style={{ fontSize: 11.5, color: C.dimmer }}>{r.estimatedImpact ? `${r.estimatedImpact} · ` : ""}{r.summary}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

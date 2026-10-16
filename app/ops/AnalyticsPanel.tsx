"use client";

import { useEffect, useState } from "react";
import { C } from "./ui";
import {
  TrafficTab,
  SeoTab,
  LinksTab,
  TechnicalTab,
  GeoTab,
  type TrafficData,
  type GeoTabData,
  type LinkAuditTabData,
  type SeoHealthTabData,
  type TechnicalTabData,
} from "./AnalyticsTabs";
import { apiFetch, getOpsToken } from "@/lib/api";

const TABS = [
  { key: "traffic", label: "Traffic" },
  { key: "seo", label: "SEO" },
  { key: "links", label: "Links" },
  { key: "tech", label: "Technical" },
  { key: "geo", label: "GEO" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

type Connections = { gsc: boolean; ga4: boolean };

type TrafficWindow = 7 | 30 | 60;

export default function AnalyticsPanel() {
  const [tab, setTab] = useState<TabKey>("traffic");
  const [days, setDays] = useState<TrafficWindow>(7);
  const [traffic, setTraffic] = useState<TrafficData | null>(null);
  const [trafficError, setTrafficError] = useState<string | null>(null);
  const [connections, setConnections] = useState<Connections | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [geoData, setGeoData] = useState<GeoTabData>(null);
  const [linkData, setLinkData] = useState<LinkAuditTabData>(null);
  const [linkSnapshotDate, setLinkSnapshotDate] = useState<string | null>(null);
  const [auditingLinks, setAuditingLinks] = useState(false);
  const [seoData, setSeoData] = useState<SeoHealthTabData>(null);
  const [seoSnapshotDate, setSeoSnapshotDate] = useState<string | null>(null);
  const [auditingSeo, setAuditingSeo] = useState(false);
  const [techData, setTechData] = useState<TechnicalTabData>(null);
  const [techSnapshotDate, setTechSnapshotDate] = useState<string | null>(null);
  const [auditingTech, setAuditingTech] = useState(false);

  function loadLinkAudit(token: string) {
    apiFetch<{ linkAudit: LinkAuditTabData; snapshotDate: string | null }>("/api/v1/ops/analytics?tab=links", {}, token)
      .then((data) => {
        setLinkData(data.linkAudit);
        setLinkSnapshotDate(data.snapshotDate);
      })
      .catch(() => setLinkData(null));
  }

  function runLinkAudit() {
    const token = getOpsToken();
    if (!token || auditingLinks) return;
    setAuditingLinks(true);
    apiFetch<{ linkAudit: LinkAuditTabData }>("/api/v1/ops/audits/links/run", { method: "POST" }, token)
      .then((data) => {
        setLinkData(data.linkAudit);
        setLinkSnapshotDate(new Date().toISOString());
      })
      .finally(() => setAuditingLinks(false));
  }

  function loadSeoHealth(token: string) {
    apiFetch<{ seoHealth: SeoHealthTabData; snapshotDate: string | null }>("/api/v1/ops/analytics?tab=seo", {}, token)
      .then((data) => {
        setSeoData(data.seoHealth);
        setSeoSnapshotDate(data.snapshotDate);
      })
      .catch(() => setSeoData(null));
  }

  function runSeoAudit() {
    const token = getOpsToken();
    if (!token || auditingSeo) return;
    setAuditingSeo(true);
    apiFetch<{ seoHealth: SeoHealthTabData }>("/api/v1/ops/audits/seo/run", { method: "POST" }, token)
      .then((data) => {
        setSeoData(data.seoHealth);
        setSeoSnapshotDate(new Date().toISOString());
      })
      .finally(() => setAuditingSeo(false));
  }

  function loadTechnical(token: string) {
    apiFetch<{ technical: TechnicalTabData; snapshotDate: string | null }>("/api/v1/ops/analytics?tab=tech", {}, token)
      .then((data) => {
        setTechData(data.technical);
        setTechSnapshotDate(data.snapshotDate);
      })
      .catch(() => setTechData(null));
  }

  function runTechnicalAudit() {
    const token = getOpsToken();
    if (!token || auditingTech) return;
    setAuditingTech(true);
    apiFetch<{ technical: TechnicalTabData }>("/api/v1/ops/audits/technical/run", { method: "POST" }, token)
      .then((data) => {
        setTechData(data.technical);
        setTechSnapshotDate(new Date().toISOString());
      })
      .finally(() => setAuditingTech(false));
  }

  useEffect(() => {
    const token = getOpsToken();
    if (!token) return;
    loadLinkAudit(token);
    loadSeoHealth(token);
    loadTechnical(token);
    apiFetch<{ traffic: TrafficData; connections: Connections }>(`/api/v1/ops/analytics?tab=traffic&days=7`, {}, token)
      .then((data) => {
        setTraffic(data.traffic);
        setConnections(data.connections);
      })
      .catch((err) => setTrafficError(err instanceof Error ? err.message : "Could not load analytics."));

    // The GEO sub-tab reads the same real OpsFeedItem rows the Agents Feed panel
    // shows -- every item from one GEO run carries the same geoScore/citationResults
    // in its metadata, so the first CURRENT item has everything needed.
    type FeedItem = { title: string; summary: string; createdAt?: string; metadata: { estimatedImpact?: string; geoScore?: number; citationResults?: { query: string; wouldCite: boolean; reasoning: string }[] } | null };
    apiFetch<{ items: FeedItem[] }>("/api/v1/ops/feed", {}, token)
      .then((data) => {
        const geoItems = data.items.filter((it) => it.metadata?.geoScore != null);
        if (geoItems.length === 0) return;
        setGeoData({
          geoScore: geoItems[0].metadata!.geoScore!,
          citationResults: geoItems[0].metadata!.citationResults ?? [],
          recommendations: geoItems.map((it) => ({ title: it.title, summary: it.summary, estimatedImpact: it.metadata?.estimatedImpact })),
          snapshotDate: geoItems[0].createdAt ?? null,
        });
      })
      .catch(() => setGeoData(null));
    // Mount-only: subsequent window changes are handled by handleDaysChange, which
    // triggers a real refresh for that window rather than reading a possibly-missing snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshNow(windowOverride?: TrafficWindow) {
    const token = getOpsToken();
    if (!token || refreshing) return;
    const w = windowOverride ?? days;
    setRefreshing(true);
    setTrafficError(null);
    apiFetch<{ traffic: TrafficData; connections: Connections }>(`/api/v1/ops/analytics/refresh?days=${w}`, { method: "POST" }, token)
      .then((data) => {
        setTraffic(data.traffic);
        setConnections(data.connections);
      })
      .catch((err) => setTrafficError(err instanceof Error ? err.message : "Refresh failed."))
      .finally(() => setRefreshing(false));
  }

  function handleDaysChange(w: TrafficWindow) {
    setDays(w);
    // Pull that window's real data immediately rather than waiting for a stale/missing
    // snapshot -- switching windows is exactly when a user wants to verify real data.
    refreshNow(w);
  }

  return (
    <div style={{ flex: "1 1 0", minWidth: 380, display: "flex", flexDirection: "column", minHeight: 0, background: "#18181a", borderRight: "1px solid #27272b" }}>
      <div style={{ flex: "0 0 auto", height: 44, display: "flex", alignItems: "center", gap: 9, padding: "0 14px", borderBottom: "1px solid #27272b" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#93939c" strokeWidth="2" strokeLinecap="round"><path d="M4 20V11M10 20V4M16 20v-6M21 20H3" /></svg>
        <span style={{ fontSize: 13.5, color: "#f2f2f5" }}>Analytics</span>
        <span className="kanso-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
        <div style={{ flex: 1 }} />
        {tab === "links" && <AuditButton label="Run Link Audit" busy={auditingLinks} onClick={runLinkAudit} />}
        {tab === "seo" && <AuditButton label="Run SEO Audit" busy={auditingSeo} onClick={runSeoAudit} />}
        {tab === "tech" && <AuditButton label="Run Technical Audit" busy={auditingTech} onClick={runTechnicalAudit} />}
        <button
          onClick={() => refreshNow()}
          disabled={refreshing}
          title="Pull fresh Search Console data now"
          className="kanso-icon-btn"
          style={{ width: 24, height: 24, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: refreshing ? C.dim : "#c9c9d1", cursor: refreshing ? "default" : "pointer" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={refreshing ? { animation: "kanso-spin 0.9s linear infinite" } : undefined}>
            <path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" />
          </svg>
        </button>
      </div>

      <div style={{ flex: "0 0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", margin: "12px 15px 0", background: "#1f1f21", border: "1px solid #2d2d31", borderRadius: 10, padding: 4 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              height: 32, display: "grid", placeItems: "center", border: "none", borderRadius: 7, cursor: "pointer",
              fontFamily: "inherit", fontSize: 12.5,
              background: tab === t.key ? "#0f0e0d" : "transparent",
              color: tab === t.key ? "#fafafc" : "#9b9ba3",
              fontWeight: tab === t.key ? 500 : 400,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "18px 15px 44px" }}>
        {tab === "traffic" && (
          <TrafficTab
            data={traffic}
            error={trafficError}
            connections={connections}
            days={days}
            onDaysChange={handleDaysChange}
            loading={traffic === null && connections === null && !trafficError}
          />
        )}
        {tab === "seo" && <SeoTab data={seoData} snapshotDate={seoSnapshotDate} />}
        {tab === "links" && <LinksTab data={linkData} snapshotDate={linkSnapshotDate} />}
        {tab === "tech" && <TechnicalTab data={techData} snapshotDate={techSnapshotDate} />}
        {tab === "geo" && <GeoTab data={geoData} />}
      </div>
    </div>
  );
}

// Shared "Run X Audit" toolbar button -- Links, SEO, and Technical all trigger a real,
// on-demand audit the same way (never a recurring background cron, so spend/crawl load
// only ever happens on an explicit click), so this is one component instead of three
// copies of the same 15 lines.
function AuditButton({ label, busy, onClick }: { label: string; busy: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="kanso-ghost-btn"
      style={{ height: 24, padding: "0 10px", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #3d3d44", borderRadius: 6, color: busy ? C.dim : "#c9c9d1", fontSize: 11.5, cursor: busy ? "default" : "pointer" }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={busy ? { animation: "kanso-spin 0.9s linear infinite" } : undefined}>
        {busy ? <path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" /> : <polygon points="6 4 20 12 6 20 6 4" />}
      </svg>
      {busy ? "Running..." : label}
    </button>
  );
}

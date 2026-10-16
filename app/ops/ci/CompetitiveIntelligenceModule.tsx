"use client";

import { useEffect, useMemo, useState } from "react";
import { C, Skeleton } from "../ui";
import ChatPanel from "../ChatPanel";
import { apiFetch, getOpsToken } from "@/lib/api";
import { CompetitorDrawer } from "./CompetitorDrawer";
import { EvidenceChip } from "./EvidenceChip";
import { navTabStyle, chipStyle, badgePill, tabBtn } from "./ci-style";
import {
  type CiCategory, type CiCompetitor, type CiEvidence, type CiSignal,
  CATEGORY_LABEL, CATEGORY_COLOR, threatColor, threatLevel, monoColorFor, monoLetterFor,
} from "./ci-types";

type TabKey = "overview" | "landscape" | "competitors" | "compare" | "strategy" | "signals" | "insights" | "sources";
const SECTIONS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "landscape", label: "Landscape" },
  { key: "competitors", label: "Competitors" },
  { key: "compare", label: "Compare" },
  { key: "strategy", label: "Strategy" },
  { key: "signals", label: "Signals" },
  { key: "insights", label: "Insights & Recommendations" },
  { key: "sources", label: "Sources & Settings" },
];
const CATEGORY_OPTIONS = Object.keys(CATEGORY_LABEL) as CiCategory[];
const WATCHLIST_KEY = "kanso_ci_watchlist";

// Real, clickable suggestions -- fill the input, never auto-send (see ChatPanel's
// own chips prop). The assistant behind these questions is genuinely grounded in the
// real tracked competitor/signal data (see the backend's buildCiContext), so these
// aren't decorative prompts pointing at nothing.
const CI_CHAT_CHIPS = [
  "Explain this competitor",
  "Why is this a direct competitor?",
  "What's changed this month?",
  "Where are we losing?",
  "What should we build next?",
  "Find competitive whitespace",
];

function fmtDate(iso: string | null | undefined) {
  if (!iso) return "--";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}

const cardBase: React.CSSProperties = { border: `1px solid ${C.border}`, borderRadius: 10, background: "#1f1f21" };

export default function CompetitiveIntelligenceModule({ onClose, companyName }: { onClose: () => void; companyName?: string }) {
  const [tab, setTab] = useState<TabKey>("overview");
  const [competitors, setCompetitors] = useState<CiCompetitor[] | null>(null);
  const [signals, setSignals] = useState<CiSignal[] | null>(null);
  const [evidenceAll, setEvidenceAll] = useState<CiEvidence[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(true);

  function loadAll() {
    const token = getOpsToken();
    setLoadError(null);
    apiFetch<{ competitors: CiCompetitor[] }>("/api/v1/ops/competitive-intelligence/competitors", {}, token ?? undefined)
      .then((d) => setCompetitors(d.competitors))
      .catch((e: any) => setLoadError(e?.message ?? "Failed to load competitors."));
    apiFetch<{ signals: CiSignal[] }>("/api/v1/ops/competitive-intelligence/signals", {}, token ?? undefined)
      .then((d) => setSignals(d.signals))
      .catch(() => {});
    apiFetch<{ evidence: CiEvidence[] }>("/api/v1/ops/competitive-intelligence/evidence", {}, token ?? undefined)
      .then((d) => setEvidenceAll(d.evidence))
      .catch(() => {});
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const asOf = useMemo(() => new Date().toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }), []);

  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, background: "#18181a" }}>
      {/* secondary nav */}
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 2, padding: "0 13px", background: "#18181a", borderBottom: "1px solid #27272b", overflowX: "auto" }}>
        <button onClick={onClose} title="Back to dashboard" style={{ width: 30, height: 30, flex: "0 0 auto", display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer", marginRight: 4 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        {SECTIONS.map((s) => (
          <button key={s.key} onClick={() => setTab(s.key)} style={navTabStyle(tab === s.key)}>{s.label}</button>
        ))}
      </div>

      {/* context bar */}
      <div style={{ flex: "0 0 auto", height: 40, display: "flex", alignItems: "center", gap: 12, padding: "0 15px", background: "#151516", borderBottom: "1px solid #27272b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.dimmer }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />As of {asOf}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, height: 28, width: 280, padding: "0 10px", background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 7 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6e6e77" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search competitors, signals..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: C.bright, fontFamily: "inherit", fontSize: 12.5 }} />
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: "22px 26px 60px" }}>
          {loadError && (
            <div style={{ marginBottom: 18, padding: "10px 13px", background: "#211717", border: "1px solid #3d2b2b", borderRadius: 8, fontSize: 12.5, color: "#ff8080" }}>{loadError}</div>
          )}
          {tab === "overview" && (
            <OverviewTab competitors={competitors} signals={signals} evidenceAll={evidenceAll} asOf={asOf} companyName={companyName}
              onGoCompetitors={() => setTab("competitors")} onGoSignals={() => setTab("signals")} />
          )}
          {tab === "landscape" && <LandscapeTab competitors={competitors} onOpen={setSelectedCompetitorId} />}
          {tab === "competitors" && (
            <CompetitorsTab competitors={competitors} search={search} onOpen={setSelectedCompetitorId} onAdded={loadAll} />
          )}
          {tab === "compare" && <CompareTab competitors={competitors} />}
          {tab === "strategy" && <StrategyTab />}
          {tab === "signals" && (
            <SignalsTab signals={signals} competitors={competitors} search={search} onOpenCompetitor={setSelectedCompetitorId} />
          )}
          {tab === "insights" && <InsightsTab />}
          {tab === "sources" && (
            <SourcesSettingsTab competitors={competitors} evidenceAll={evidenceAll} onChanged={loadAll} />
          )}
        </div>

        {aiOpen ? (
          <div style={{ flex: "0 0 380px", minWidth: 340 }}>
            <ChatPanel
              title="Ask Competitive Intelligence"
              subtitle="Grounded in tracked signals & evidence"
              placeholder="Ask about a competitor, feature, or signal..."
              endpoint="/api/v1/ops/competitive-intelligence/chat"
              initial={[{ cmo: true, text: "ask me about any tracked competitor, a recent signal, or how two compare.\n\ni answer from the real tracked data, not a general search." }]}
              chips={CI_CHAT_CHIPS}
              assistantLabel="COMPETITIVE INTELLIGENCE AI"
              onCollapse={() => setAiOpen(false)}
            />
          </div>
        ) : (
          <div onClick={() => setAiOpen(true)} className="kanso-collapsed-col" style={{ flex: "0 0 40px", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 15, background: "#18181a", borderLeft: "1px solid #27272b", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#93939c" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </div>
        )}
      </div>

      <CompetitorDrawer competitorId={selectedCompetitorId} onClose={() => setSelectedCompetitorId(null)} onUpdated={loadAll} />
    </div>
  );
}

/* ─────────────────────────────── Overview ─────────────────────────────── */

function StatModule({ label, value, reason, small }: { label: string; value: string; reason: string; small?: boolean }) {
  return (
    <div style={{ ...cardBase, padding: "13px 14px" }}>
      <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", color: C.dimmer, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: small ? 14 : 16, fontWeight: 600, color: C.bright, marginBottom: 5, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={value}>{value}</div>
      <div style={{ fontSize: 11.5, color: C.dim, lineHeight: 1.5 }}>{reason}</div>
    </div>
  );
}

// A real, on-demand AI synthesis of the actual tracked competitor data (see the
// backend's buildCiContext) -- not automatic on every page load, and not fabricated
// prose standing in for research that hasn't happened. Null summary renders an
// honest "not generated yet" state with a real button, exactly like every other
// empty state in this module.
function ExecutiveSummaryCard() {
  const [summary, setSummary] = useState<string | null | undefined>(undefined);
  const [summaryAt, setSummaryAt] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getOpsToken();
    apiFetch<{ summary: string | null; summaryAt: string | null }>("/api/v1/ops/competitive-intelligence/overview-summary", {}, token ?? undefined)
      .then((d) => {
        setSummary(d.summary);
        setSummaryAt(d.summaryAt);
      })
      .catch(() => setSummary(null));
  }, []);

  function generate() {
    if (generating) return;
    setGenerating(true);
    setError(null);
    const token = getOpsToken();
    apiFetch<{ summary: string; summaryAt: string }>("/api/v1/ops/competitive-intelligence/overview-summary/generate", { method: "POST" }, token ?? undefined)
      .then((d) => {
        setSummary(d.summary);
        setSummaryAt(d.summaryAt);
      })
      .catch((e: any) => setError(e?.message ?? "Failed to generate."))
      .finally(() => setGenerating(false));
  }

  if (summary === undefined) return <Skeleton height={96} radius={10} style={{ marginBottom: 18 }} />;

  return (
    <div style={{ ...cardBase, borderLeft: "3px solid #56d2c0", padding: "18px 20px", marginBottom: 18 }}>
      {summary ? (
        <>
          <div style={{ fontSize: 15, lineHeight: 1.65, color: C.bright, fontStyle: "italic" }}>&ldquo;{summary}&rdquo;</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, fontSize: 11.5, color: C.faint }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6e6e77" strokeWidth="2" strokeLinecap="round"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2 2m-9 9-2 2m0-13 2 2m9 9 2 2" /></svg>
            Generated by AI{summaryAt && ` · ${fmtDate(summaryAt)}`} ·{" "}
            <a onClick={generate} style={{ color: "#56d2c0", cursor: generating ? "default" : "pointer" }}>{generating ? "regenerating..." : "regenerate"}</a>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ flex: 1, fontSize: 12.5, color: C.dim }}>No executive summary generated yet. This is a real AI synthesis of your tracked competitors and recent signals, not a canned line.</div>
          <button onClick={generate} disabled={generating} style={{ flex: "0 0 auto", height: 30, padding: "0 14px", background: "#fafafc", border: "none", borderRadius: 7, color: "#110f0e", fontFamily: "inherit", fontSize: 12, fontWeight: 500, cursor: generating ? "default" : "pointer", opacity: generating ? 0.6 : 1 }}>
            {generating ? "Generating..." : "Generate summary"}
          </button>
        </div>
      )}
      {error && <div style={{ marginTop: 10, fontSize: 12, color: "#ff8080" }}>{error}</div>}
    </div>
  );
}

function OverviewTab({ competitors, signals, evidenceAll, asOf, companyName, onGoCompetitors, onGoSignals }: {
  competitors: CiCompetitor[] | null; signals: CiSignal[] | null; evidenceAll: CiEvidence[] | null; asOf: string; companyName?: string;
  onGoCompetitors: () => void; onGoSignals: () => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: "0 0 4px", fontFamily: "var(--font-sora), sans-serif", fontSize: 22, fontWeight: 600, color: C.bright, letterSpacing: "-0.015em" }}>Competitive Intelligence</h1>
          <div style={{ fontSize: 13, color: C.dim }}>Executive summary{companyName ? ` for ${companyName}` : ""} · as of {asOf}</div>
        </div>
      </div>

      {competitors === null ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="ci-cardgrid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} height={70} />)}
          </div>
          <Skeleton height={220} radius={10} />
        </div>
      ) : competitors.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 20px", ...cardBase, background: "#1b1b1d" }}>
          <span style={{ width: 48, height: 48, borderRadius: "50%", background: "#232326", display: "grid", placeItems: "center", marginBottom: 16 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#82828b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" /></svg>
          </span>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.bright, marginBottom: 6 }}>No competitors tracked yet</div>
          <div style={{ fontSize: 13, color: C.dim, maxWidth: 360, lineHeight: 1.6, marginBottom: 20 }}>Add real competitors to start building an intelligence picture, or check the Company panel: this list seeds from your already-tracked competitor domains.</div>
          <button onClick={onGoCompetitors} style={{ height: 34, padding: "0 18px", background: "#fafafc", border: "none", borderRadius: 8, color: "#110f0e", fontFamily: "inherit", fontSize: 12.5, fontWeight: 500, cursor: "pointer" }}>Add your first competitor</button>
        </div>
      ) : (
        <OverviewPopulated competitors={competitors} signals={signals} evidenceAll={evidenceAll} onGoSignals={onGoSignals} />
      )}
    </div>
  );
}

function OverviewPopulated({ competitors, signals, evidenceAll, onGoSignals }: { competitors: CiCompetitor[]; signals: CiSignal[] | null; evidenceAll: CiEvidence[] | null; onGoSignals: () => void }) {
  const activeCount = competitors.filter((c) => c.status === "ACTIVE_TRACKING").length;
  const needsResearchCount = competitors.filter((c) => c.status === "NEEDS_RESEARCH").length;
  const scored = competitors.filter((c) => c.threatScore !== null && c.relevanceScore !== null);
  const highThreatCount = competitors.filter((c) => c.threatScore !== null && c.threatScore >= 70).length;
  const directCompetitors = competitors.filter((c) => c.category === "DIRECT");
  const recentSignals = (signals ?? []).filter((s) => Date.now() - new Date(s.createdAt).getTime() < 30 * 24 * 60 * 60 * 1000);

  // Real, computed from actual scores -- never picked or written by hand. Null when
  // nothing is scored yet, which the card renders as an honest "not scored" state
  // rather than crashing on an empty reduce.
  const highestThreat = scored.length > 0 ? scored.reduce((max, c) => ((c.threatScore ?? 0) > (max.threatScore ?? 0) ? c : max)) : null;

  // "Most active" = the tracked competitor with the most real Competitor Pulse
  // findings in the last 30 days -- a real proxy for the design's "Fastest-moving"
  // card, computed from actual signal counts rather than a synthesized narrative.
  const signalCountByCompetitor = new Map<string, number>();
  for (const s of recentSignals) {
    if (!s.ciCompetitor) continue;
    signalCountByCompetitor.set(s.ciCompetitor.id, (signalCountByCompetitor.get(s.ciCompetitor.id) ?? 0) + 1);
  }
  let mostActive: { name: string; count: number } | null = null;
  for (const c of competitors) {
    const count = signalCountByCompetitor.get(c.id) ?? 0;
    if (count > 0 && (!mostActive || count > mostActive.count)) mostActive = { name: c.name, count };
  }

  // Real, computed alerts -- only ever as many as genuinely apply (never padded to a
  // fixed count). Each condition is a plain check against real data, not a model call.
  const alerts: { text: string }[] = [];
  if (needsResearchCount > 0) {
    alerts.push({ text: `${needsResearchCount} of ${competitors.length} tracked competitors still need research: category, scores, and a one-liner. Open Competitors to fill them in.` });
  }
  if (highestThreat) {
    const highestThreatRecentSignal = recentSignals.find((s) => s.ciCompetitor?.id === highestThreat.id && Date.now() - new Date(s.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000);
    if (highestThreatRecentSignal) {
      alerts.push({ text: `${highestThreat.name}, your highest tracked threat (${highestThreat.threatScore}/100), had a new signal this week: "${highestThreatRecentSignal.title}".` });
    }
  }
  if (evidenceAll !== null && evidenceAll.length === 0 && competitors.length > 0) {
    alerts.push({ text: "No evidence logged yet. Every score shown here should eventually trace back to a real, cited source, not just a number." });
  }

  const stats = [
    { label: "Competitors tracked", value: String(competitors.length), reason: `${activeCount} active tracking` },
    {
      label: "Direct competitors", value: String(directCompetitors.length),
      reason: directCompetitors.length > 0 ? directCompetitors.slice(0, 4).map((c) => c.name).join(", ") : "None classified Direct yet",
    },
    {
      label: "Highest threat", value: highestThreat ? `${highestThreat.name} · ${highestThreat.threatScore}/100` : "Not scored yet",
      reason: highestThreat ? "Real, based on the entered threat score" : "Add threat scores in Competitors", small: true,
    },
    {
      label: "Most active", value: mostActive ? mostActive.name : "None yet",
      reason: mostActive ? `${mostActive.count} Competitor Pulse finding(s) in 30d` : "No signals in the last 30 days", small: true,
    },
    { label: "Needs research", value: String(needsResearchCount), reason: "Category, scores & one-liner not filled in" },
    { label: "High threat", value: String(highThreatCount), reason: scored.length > 0 ? `of ${scored.length} scored` : "No competitors scored yet" },
    { label: "Evidence logged", value: evidenceAll === null ? "--" : String(evidenceAll.length), reason: "Cited sources, all competitors" },
    { label: "Signals (30d)", value: signals === null ? "--" : String(recentSignals.length), reason: "Competitor Pulse findings, all competitors" },
  ];

  return (
    <div>
      <ExecutiveSummaryCard />

      <div className="ci-cardgrid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
        {stats.map((m) => <StatModule key={m.label} {...m} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 14, marginBottom: 20, alignItems: "stretch" }}>
        <div style={{ ...cardBase, padding: 16, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.body }}>Landscape preview</span>
          </div>
          {scored.length === 0 ? (
            <div style={{ flex: 1, display: "grid", placeItems: "center", background: "#171718", border: "1px solid #27272b", borderRadius: 8, minHeight: 150, fontSize: 12, color: C.dim, textAlign: "center", padding: 16 }}>
              Not enough scored competitors yet.<br />Add threat/relevance scores in Competitors to see them plotted here.
            </div>
          ) : (
            <div style={{ flex: 1, position: "relative", background: "#171718", border: "1px solid #27272b", borderRadius: 8, minHeight: 150 }}>
              <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "#27272b" }} />
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#27272b" }} />
              {scored.map((c) => (
                <span key={c.id} title={`${c.name} · threat ${c.threatScore} · relevance ${c.relevanceScore}`}
                  style={{ position: "absolute", left: `${c.relevanceScore}%`, top: `${100 - (c.threatScore ?? 0)}%`, width: 9, height: 9, marginLeft: -4.5, marginTop: -4.5, borderRadius: "50%", background: CATEGORY_COLOR[c.category] }} />
              ))}
            </div>
          )}
        </div>
        <div style={{ ...cardBase, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", padding: "13px 15px", borderBottom: "1px solid #27272b" }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Recent signals</span>
            <div style={{ flex: 1 }} />
            <a onClick={onGoSignals} style={{ fontSize: 12, cursor: "pointer" }}>View all &rarr;</a>
          </div>
          {signals === null ? (
            <div style={{ padding: 15 }}><Skeleton height={40} /></div>
          ) : signals.length === 0 ? (
            <div style={{ padding: 15, fontSize: 12, color: C.dim }}>No Competitor Pulse findings yet.</div>
          ) : signals.slice(0, 4).map((sg) => (
            <div key={sg.id} style={{ display: "flex", alignItems: "flex-start", gap: 11, padding: "11px 15px", borderBottom: "1px solid #232327" }}>
              <span style={{ flex: "0 0 auto", width: 26, height: 26, borderRadius: "50%", background: sg.ciCompetitor ? monoColorFor(sg.ciCompetitor.domain) : "#3d3d44", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 600, color: "#fff" }}>
                {sg.ciCompetitor ? monoLetterFor(sg.ciCompetitor.name) : "?"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: C.body, lineHeight: 1.5 }}>{sg.title}</div>
                <div style={{ fontSize: 11, color: C.faint, marginTop: 3 }}>{fmtDate(sg.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {alerts.length > 0 && (
        <>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Strategic alerts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alerts.map((a, i) => (
              <div key={i} style={{ border: "1px solid #3a2f1a", borderLeft: "3px solid #f59e0b", borderRadius: 8, background: "#221c11", padding: "11px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "0 0 auto", marginTop: 2 }}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></svg>
                <span style={{ fontSize: 12.5, color: "#f2ead9", lineHeight: 1.6 }}>{a.text}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────── Landscape ─────────────────────────────── */

const LANDSCAPE_VIEWS: { key: string; label: string }[] = [
  { key: "matrix", label: "2×2 Matrix" }, { key: "bubble", label: "Bubble Map" },
  { key: "clusters", label: "Strategic Clusters" }, { key: "perceptual", label: "Perceptual Map" },
];

function LandscapeTab({ competitors, onOpen }: { competitors: CiCompetitor[] | null; onOpen: (id: string) => void }) {
  const [view, setView] = useState("matrix");
  const scored = (competitors ?? []).filter((c) => c.threatScore !== null && c.relevanceScore !== null);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 600, color: C.bright }}>Landscape</h1>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 9, padding: 3 }}>
          {LANDSCAPE_VIEWS.map((v) => <button key={v.key} onClick={() => setView(v.key)} style={tabBtn(view === v.key)}>{v.label}</button>)}
        </div>
      </div>

      {view !== "matrix" ? (
        <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim }}>
          {LANDSCAPE_VIEWS.find((v) => v.key === view)?.label} arrives in a later pass, once deeper per-competitor research exists to plot it meaningfully.
        </div>
      ) : competitors === null ? (
        <Skeleton height={420} radius={10} />
      ) : scored.length === 0 ? (
        <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim }}>
          No competitors have both a threat and relevance score yet. Open a competitor in the Competitors tab to add real scores.
        </div>
      ) : (
        <div style={{ ...cardBase, position: "relative", height: 440, padding: 20 }}>
          <div style={{ position: "absolute", left: "50%", top: 20, bottom: 20, width: 1, background: "#27272b" }} />
          <div style={{ position: "absolute", top: "50%", left: 20, right: 20, height: 1, background: "#27272b" }} />
          <div style={{ position: "absolute", top: 8, left: 20, fontSize: 10.5, color: C.faint }}>HIGH THREAT</div>
          <div style={{ position: "absolute", bottom: 4, left: 20, fontSize: 10.5, color: C.faint }}>LOW THREAT</div>
          <div style={{ position: "absolute", bottom: 4, right: 20, fontSize: 10.5, color: C.faint }}>HIGH RELEVANCE →</div>
          {scored.map((c) => (
            <span key={c.id} onClick={() => onOpen(c.id)} title={`${c.name} · threat ${c.threatScore} · relevance ${c.relevanceScore}`}
              style={{ position: "absolute", left: `calc(20px + ${(c.relevanceScore! / 100) * 80}%)`, top: `calc(20px + ${(1 - c.threatScore! / 100) * 80}%)`, width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: "50%", background: CATEGORY_COLOR[c.category], cursor: "pointer", border: "2px solid #18181a" }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────── Competitors ─────────────────────────────── */

function CompetitorCard({ c, onOpen }: { c: CiCompetitor; onOpen: (id: string) => void }) {
  return (
    <div onClick={() => onOpen(c.id)} style={{ ...cardBase, padding: 16, cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }} className="kanso-card-hover">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ flex: "0 0 auto", width: 32, height: 32, borderRadius: 8, background: monoColorFor(c.domain), display: "grid", placeItems: "center", fontSize: 13, fontWeight: 600, color: "#fff" }}>{monoLetterFor(c.name)}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.bright, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
          <div style={{ fontSize: 11, color: C.faint }}>{c.domain}</div>
        </div>
      </div>
      <span style={{ ...badgePill(CATEGORY_COLOR[c.category]), alignSelf: "flex-start" }}>{CATEGORY_LABEL[c.category]}</span>
      <div style={{ fontSize: 12, color: C.body3, lineHeight: 1.55, minHeight: 36 }}>{c.oneLiner || "No one-liner yet."}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: threatColor(c.threatScore) }} />
        <span style={{ fontSize: 11.5, color: C.body2 }}>{threatLevel(c.threatScore)} threat</span>
        {c.threatScore !== null && <span style={{ fontSize: 11, color: C.faint }}>· {c.threatScore}/100</span>}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span style={{ height: 22, padding: "0 8px", display: "inline-flex", alignItems: "center", background: "#232326", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, color: C.dim }}>Funding: {c.funding || "Unknown"}</span>
        <span style={{ height: 22, padding: "0 8px", display: "inline-flex", alignItems: "center", background: "#232326", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 11, color: C.dim }}>Founded: {c.founded || "Unknown"}</span>
      </div>
    </div>
  );
}

function CompetitorsTab({ competitors, search, onOpen, onAdded }: { competitors: CiCompetitor[] | null; search: string; onOpen: (id: string) => void; onAdded: () => void }) {
  const [categoryFilter, setCategoryFilter] = useState<Set<CiCategory>>(new Set());
  const [threatFilter, setThreatFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  function toggleCategory(cat: CiCategory) {
    setCategoryFilter((cur) => {
      const next = new Set(cur);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  }

  const filtered = (competitors ?? []).filter((c) => {
    if (categoryFilter.size > 0 && !categoryFilter.has(c.category)) return false;
    if (threatFilter !== "all" && threatLevel(c.threatScore) !== threatFilter) return false;
    if (search.trim() && !`${c.name} ${c.domain} ${c.oneLiner ?? ""}`.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  function submitAdd() {
    if (!newName.trim() || !newDomain.trim() || adding) return;
    setAdding(true);
    setAddError(null);
    const token = getOpsToken();
    apiFetch("/api/v1/ops/competitive-intelligence/competitors", { method: "POST", body: JSON.stringify({ name: newName.trim(), domain: newDomain.trim() }) }, token ?? undefined)
      .then(() => {
        setNewName("");
        setNewDomain("");
        setAddOpen(false);
        onAdded();
      })
      .catch((e: any) => setAddError(e?.message ?? "Failed to add competitor."))
      .finally(() => setAdding(false));
  }

  return (
    <div>
      <h1 style={{ margin: "0 0 16px", fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 600, color: C.bright }}>Competitors</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {CATEGORY_OPTIONS.map((cat) => (
          <span key={cat} onClick={() => toggleCategory(cat)} style={chipStyle(categoryFilter.has(cat))}>{CATEGORY_LABEL[cat]}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <select value={threatFilter} onChange={(e) => setThreatFilter(e.target.value)} style={{ height: 30, background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 7, color: C.bright, fontFamily: "inherit", fontSize: 12, padding: "0 9px" }}>
          <option value="all">All threat levels</option><option value="High">High threat</option><option value="Medium">Medium threat</option><option value="Low">Low threat</option><option value="Not scored">Not scored</option>
        </select>
      </div>

      {competitors === null ? (
        <div className="ci-cardgrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} height={180} radius={10} />)}
        </div>
      ) : (
        <>
          {filtered.length === 0 && competitors.length > 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", ...cardBase, background: "#1b1b1d", marginBottom: 14 }}>
              <div style={{ fontSize: 14, color: C.bright, marginBottom: 8 }}>No competitors match these filters</div>
              <button onClick={() => { setCategoryFilter(new Set()); setThreatFilter("all"); }} style={{ height: 30, padding: "0 14px", background: "transparent", border: `1px solid #3d3d44`, borderRadius: 7, color: C.body2, fontFamily: "inherit", fontSize: 12.5, cursor: "pointer" }}>Clear filters</button>
            </div>
          )}
          <div className="ci-cardgrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
            {filtered.map((c) => <CompetitorCard key={c.id} c={c} onOpen={onOpen} />)}
            <div onClick={() => setAddOpen((v) => !v)} className="kanso-add-card" style={{ border: "1px dashed #3d3d44", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16, minHeight: 150, cursor: "pointer", color: C.dimmer }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
              <span style={{ fontSize: 12.5 }}>Add competitor</span>
            </div>
          </div>
          {addOpen && (
            <div style={{ marginTop: 20, ...cardBase, padding: 18, maxWidth: 460 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 14 }}>Add competitor</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" style={{ height: 34, background: "#18181a", border: `1px solid ${C.border}`, borderRadius: 7, color: C.bright, fontFamily: "inherit", fontSize: 12.5, padding: "0 10px" }} />
                <input value={newDomain} onChange={(e) => setNewDomain(e.target.value)} placeholder="Domain (e.g. example.com)" style={{ height: 34, background: "#18181a", border: `1px solid ${C.border}`, borderRadius: 7, color: C.bright, fontFamily: "inherit", fontSize: 12.5, padding: "0 10px" }} />
              </div>
              {addError && <div style={{ marginBottom: 10, fontSize: 12, color: "#ff8080" }}>{addError}</div>}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ height: 22, padding: "0 9px", display: "inline-flex", alignItems: "center", background: "#26210f", border: "1px solid #3d3410", borderRadius: 6, fontSize: 11, color: "#f0d685" }}>Draft, needs research</span>
                <div style={{ flex: 1 }} />
                <button onClick={() => setAddOpen(false)} style={{ height: 30, padding: "0 12px", background: "transparent", border: `1px solid #3d3d44`, borderRadius: 7, color: C.body2, fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>Cancel</button>
                <button onClick={submitAdd} disabled={adding || !newName.trim() || !newDomain.trim()} style={{ height: 30, padding: "0 14px", background: "#fafafc", border: "none", borderRadius: 7, color: "#110f0e", fontFamily: "inherit", fontSize: 12, fontWeight: 500, cursor: "pointer", opacity: adding || !newName.trim() || !newDomain.trim() ? 0.5 : 1 }}>{adding ? "Saving..." : "Save"}</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────── Compare ─────────────────────────────── */

const COMPARE_FIELDS: { key: keyof CiCompetitor; label: string }[] = [
  { key: "category", label: "Category" }, { key: "status", label: "Status" },
  { key: "threatScore", label: "Threat score" }, { key: "relevanceScore", label: "Relevance score" },
  { key: "funding", label: "Funding" }, { key: "founded", label: "Founded" }, { key: "oneLiner", label: "One-liner" },
];

function CompareTab({ competitors }: { competitors: CiCompetitor[] | null }) {
  const [subTab, setSubTab] = useState<"master" | "feature" | "benchmark">("master");
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 600, color: C.bright }}>Compare</h1>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 9, padding: 3 }}>
          <button onClick={() => setSubTab("master")} style={tabBtn(subTab === "master", true)}>Master Comparison</button>
          <button onClick={() => setSubTab("feature")} style={tabBtn(subTab === "feature", true)}>Feature Comparison</button>
          <button onClick={() => setSubTab("benchmark")} style={tabBtn(subTab === "benchmark", true)}>Benchmark</button>
        </div>
      </div>

      {subTab !== "master" ? (
        <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim }}>
          {subTab === "feature" ? "Feature-level comparison" : "Benchmark scoring"} needs per-feature research that hasn't been done yet -- this tab is real and clickable, just waiting on that data.
        </div>
      ) : competitors === null ? (
        <Skeleton height={300} radius={10} />
      ) : competitors.length === 0 ? (
        <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim }}>No competitors tracked yet.</div>
      ) : (
        <div style={{ ...cardBase, overflow: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5, minWidth: 600 }}>
            <thead>
              <tr style={{ background: "#1b1b1d" }}>
                <th style={{ textAlign: "left", padding: "10px 14px", color: C.dimmer, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid #27272b" }}>Field</th>
                {competitors.map((c) => (
                  <th key={c.id} style={{ textAlign: "left", padding: "10px 14px", color: C.bright, fontWeight: 600, whiteSpace: "nowrap", borderBottom: "1px solid #27272b" }}>{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_FIELDS.map((f) => (
                <tr key={f.key}>
                  <td style={{ padding: "10px 14px", color: C.dim, borderBottom: "1px solid #232327", whiteSpace: "nowrap" }}>{f.label}</td>
                  {competitors.map((c) => {
                    const raw = c[f.key];
                    const display = f.key === "category" ? CATEGORY_LABEL[c.category] : raw === null || raw === undefined || raw === "" ? "--" : String(raw);
                    return <td key={c.id} style={{ padding: "10px 14px", color: C.body2, borderBottom: "1px solid #232327", maxWidth: 240 }}>{display}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────── Strategy ─────────────────────────────── */

const STRATEGY_TABS: { key: string; label: string; blurb: string }[] = [
  { key: "swot", label: "SWOT", blurb: "Strengths/Weaknesses/Opportunities/Threats, scoped per competitor or category, once real research fills each side in." },
  { key: "pestel", label: "PESTEL", blurb: "Political, Economic, Social, Technological, Environmental, and Legal factors affecting the competitive landscape." },
  { key: "five-forces", label: "Porter's Five Forces", blurb: "Supplier power, buyer power, competitive rivalry, threat of substitution, and threat of new entry." },
  { key: "groups", label: "Strategic Groups", blurb: "Clusters of competitors pursuing similar strategies -- reuses the Landscape view once category+score research is deeper." },
  { key: "bcg", label: "BCG Growth-Share", blurb: "Kanso's own product lines plotted by growth rate vs. relative market share -- not about competitors directly." },
  { key: "edge", label: "Competitive Edge", blurb: "Table stakes, shared capabilities, differentiators, and unclaimed whitespace, derived from the Feature Comparison data once it exists." },
];

function StrategyTab() {
  const [subTab, setSubTab] = useState(STRATEGY_TABS[0].key);
  const active = STRATEGY_TABS.find((t) => t.key === subTab)!;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 600, color: C.bright }}>Strategy</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 2, background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 9, padding: 3, marginBottom: 20, width: "fit-content" }}>
        {STRATEGY_TABS.map((t) => <button key={t.key} onClick={() => setSubTab(t.key)} style={tabBtn(subTab === t.key)}>{t.label}</button>)}
      </div>
      <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim, maxWidth: 560, margin: "0 auto" }}>{active.blurb}</div>
    </div>
  );
}

/* ─────────────────────────────── Signals ─────────────────────────────── */

function SignalsTab({ signals, competitors, search, onOpenCompetitor }: { signals: CiSignal[] | null; competitors: CiCompetitor[] | null; search: string; onOpenCompetitor: (id: string) => void }) {
  const [subTab, setSubTab] = useState<"feed" | "watchlist">("feed");
  const [impactFilter, setImpactFilter] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [watched, setWatched] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WATCHLIST_KEY);
      if (stored) setWatched(new Set(JSON.parse(stored)));
    } catch {
      // Private window / blocked storage -- watchlist just starts empty, no worse than before.
    }
  }, []);

  function toggleWatch(id: string) {
    setWatched((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id); else next.add(id);
      try { localStorage.setItem(WATCHLIST_KEY, JSON.stringify(Array.from(next))); } catch { /* not persisted this time */ }
      return next;
    });
  }

  const impacts = Array.from(new Set((signals ?? []).map((s) => s.metadata?.estimatedImpact).filter(Boolean))) as string[];
  const filtered = (signals ?? []).filter((s) => {
    if (impactFilter.size > 0 && !impactFilter.has(s.metadata?.estimatedImpact ?? "")) return false;
    if (search.trim() && !`${s.title} ${s.summary}`.toLowerCase().includes(search.trim().toLowerCase())) return false;
    return true;
  });

  function impactColor(impact?: string) {
    if (impact === "High") return C.red;
    if (impact === "Medium") return C.amber;
    return C.dim;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 600, color: C.bright }}>Signals</h1>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 9, padding: 3 }}>
          <button onClick={() => setSubTab("feed")} style={tabBtn(subTab === "feed")}>Feed</button>
          <button onClick={() => setSubTab("watchlist")} style={tabBtn(subTab === "watchlist")}>Watchlist</button>
        </div>
      </div>

      {subTab === "feed" ? (
        <div>
          {impacts.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {impacts.map((imp) => (
                <span key={imp} onClick={() => setImpactFilter((cur) => { const n = new Set(cur); if (n.has(imp)) n.delete(imp); else n.add(imp); return n; })} style={chipStyle(impactFilter.has(imp))}>{imp}</span>
              ))}
            </div>
          )}
          {signals === null ? (
            <Skeleton height={300} radius={10} />
          ) : filtered.length === 0 ? (
            <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim }}>
              {signals.length === 0 ? "No Competitor Pulse findings yet -- run the agent from the Agents Feed." : "No signals match these filters."}
            </div>
          ) : (
            <div style={{ ...cardBase, overflow: "hidden" }}>
              {filtered.map((sg, i) => {
                const isOpen = expanded.has(sg.id);
                return (
                  <div key={sg.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #232327" : "none" }}>
                    <div onClick={() => setExpanded((cur) => { const n = new Set(cur); if (n.has(sg.id)) n.delete(sg.id); else n.add(sg.id); return n; })} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", cursor: "pointer" }}>
                      <span onClick={(e) => { e.stopPropagation(); sg.ciCompetitor && onOpenCompetitor(sg.ciCompetitor.id); }} style={{ flex: "0 0 auto", width: 32, height: 32, borderRadius: "50%", background: sg.ciCompetitor ? monoColorFor(sg.ciCompetitor.domain) : "#3d3d44", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600, color: "#fff", cursor: sg.ciCompetitor ? "pointer" : "default" }}>
                        {sg.ciCompetitor ? monoLetterFor(sg.ciCompetitor.name) : "?"}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, color: C.body }}>{sg.title}</div>
                      </div>
                      <span style={{ fontSize: 11.5, color: C.faint, flex: "0 0 auto" }}>{fmtDate(sg.createdAt)}</span>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: impactColor(sg.metadata?.estimatedImpact), flex: "0 0 auto" }} title={`${sg.metadata?.estimatedImpact ?? "Unknown"} impact`} />
                      <span style={{ transform: isOpen ? "rotate(180deg)" : undefined, display: "inline-flex" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b9ba3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                      </span>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "4px 15px 15px 59px", background: "#1b1b1d" }}>
                        <div style={{ fontSize: 12, color: C.dim, lineHeight: 1.6 }}>{sg.content}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div style={{ ...cardBase, overflow: "hidden" }}>
          {(competitors ?? []).length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center", fontSize: 13, color: C.dim }}>No competitors tracked yet.</div>
          ) : (
            [...(competitors ?? [])].sort((a, b) => Number(watched.has(b.id)) - Number(watched.has(a.id))).map((c, i, arr) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", borderBottom: i < arr.length - 1 ? "1px solid #232327" : "none" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill={watched.has(c.id) ? "#56d2c0" : "none"} stroke={watched.has(c.id) ? "#56d2c0" : "#82828b"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: C.body, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: C.dimmer, marginTop: 2 }}>{CATEGORY_LABEL[c.category]} · this browser only</div>
                </div>
                <span onClick={() => toggleWatch(c.id)} style={{ width: 36, height: 20, borderRadius: 999, background: watched.has(c.id) ? "#1a2e22" : "#2d2d31", border: `1px solid ${watched.has(c.id) ? "#2d4a35" : C.border}`, position: "relative", cursor: "pointer", flex: "0 0 auto" }}>
                  <span style={{ position: "absolute", top: 2, left: watched.has(c.id) ? 18 : 2, width: 14, height: 14, borderRadius: "50%", background: watched.has(c.id) ? "#4ade80" : "#6e6e77", transition: "left .15s" }} />
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────── Insights & Recommendations ─────────────────────────────── */

function InsightsTab() {
  const [subTab, setSubTab] = useState<"insights" | "recommendations">("insights");
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 600, color: C.bright }}>Insights &amp; Recommendations</h1>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 9, padding: 3 }}>
          <button onClick={() => setSubTab("insights")} style={tabBtn(subTab === "insights")}>Insights</button>
          <button onClick={() => setSubTab("recommendations")} style={tabBtn(subTab === "recommendations")}>Recommendations</button>
        </div>
      </div>
      <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim, maxWidth: 560, margin: "0 auto" }}>
        {subTab === "insights"
          ? "Synthesized insights (patterns across multiple signals and competitors, distinct from a single raw signal) need enough real signal history to synthesize from -- not built yet."
          : "Actionable recommendations (Build/Improve/Remove/Differentiate/etc.) get generated once Insights exist to base them on."}
      </div>
    </div>
  );
}

/* ─────────────────────────────── Sources & Settings ─────────────────────────────── */

function SourcesSettingsTab({ competitors, evidenceAll, onChanged }: { competitors: CiCompetitor[] | null; evidenceAll: CiEvidence[] | null; onChanged: () => void }) {
  const [subTab, setSubTab] = useState<"sources" | "settings">("sources");
  const [archivingId, setArchivingId] = useState<string | null>(null);
  const competitorById = new Map((competitors ?? []).map((c) => [c.id, c]));

  function archive(id: string) {
    setArchivingId(id);
    const token = getOpsToken();
    apiFetch(`/api/v1/ops/competitive-intelligence/competitors/${id}`, { method: "POST", body: JSON.stringify({ status: "ARCHIVED" }) }, token ?? undefined)
      .then(onChanged)
      .finally(() => setArchivingId(null));
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontFamily: "var(--font-sora), sans-serif", fontSize: 20, fontWeight: 600, color: C.bright }}>Sources &amp; Settings</h1>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 2, background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 9, padding: 3 }}>
          <button onClick={() => setSubTab("sources")} style={tabBtn(subTab === "sources")}>Sources</button>
          <button onClick={() => setSubTab("settings")} style={tabBtn(subTab === "settings")}>Settings</button>
        </div>
      </div>

      {subTab === "sources" ? (
        evidenceAll === null ? (
          <Skeleton height={300} radius={10} />
        ) : evidenceAll.length === 0 ? (
          <div style={{ ...cardBase, padding: "60px 20px", textAlign: "center", fontSize: 13, color: C.dim }}>No evidence logged yet. Add evidence from any competitor's profile.</div>
        ) : (
          <div style={{ ...cardBase, overflow: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12, minWidth: 760 }}>
              <thead>
                <tr style={{ background: "#1b1b1d" }}>
                  {["Source", "Competitor", "Type", "Retrieved", "Verified", "Confidence", "Note"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 14px", color: C.dimmer, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid #27272b", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evidenceAll.map((ev) => (
                  <tr key={ev.id}>
                    <td style={{ padding: "10px 14px", color: C.body, borderBottom: "1px solid #232327" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><EvidenceChip evidence={ev} />{ev.source}</span>
                    </td>
                    <td style={{ padding: "10px 14px", color: C.body2, borderBottom: "1px solid #232327", whiteSpace: "nowrap" }}>{ev.competitorId ? competitorById.get(ev.competitorId)?.name ?? "--" : "--"}</td>
                    <td style={{ padding: "10px 14px", color: C.dim, borderBottom: "1px solid #232327" }}>{ev.sourceType}</td>
                    <td style={{ padding: "10px 14px", color: C.dim, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, borderBottom: "1px solid #232327", whiteSpace: "nowrap" }}>{fmtDate(ev.retrievedAt)}</td>
                    <td style={{ padding: "10px 14px", color: C.dim, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, borderBottom: "1px solid #232327", whiteSpace: "nowrap" }}>{fmtDate(ev.lastVerifiedAt)}</td>
                    <td style={{ padding: "10px 14px", borderBottom: "1px solid #232327" }}>
                      <span style={{ color: ev.confidence === "HIGH" ? C.green : ev.confidence === "MEDIUM" ? C.amber : C.red }}>{ev.confidence}</span>
                    </td>
                    <td style={{ padding: "10px 14px", color: C.faint, fontSize: 11.5, borderBottom: "1px solid #232327" }}>{ev.analystNote || "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 820 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dimmer }}>Active competitor set</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11.5, color: C.faint }}>{(competitors ?? []).filter((c) => c.status !== "ARCHIVED").length} tracked</span>
            </div>
            <div style={{ ...cardBase, padding: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(competitors ?? []).filter((c) => c.status !== "ARCHIVED").map((c) => (
                <span key={c.id} style={{ height: 26, padding: "0 6px 0 10px", display: "inline-flex", alignItems: "center", gap: 6, background: "#232326", border: `1px solid ${C.border}`, borderRadius: 999, fontSize: 11.5, color: C.body2 }}>
                  {c.name}
                  <span onClick={() => archive(c.id)} title="Archive (stop active tracking)" style={{ width: 16, height: 16, display: "grid", placeItems: "center", color: archivingId === c.id ? C.faint : C.dim, cursor: "pointer" }}>×</span>
                </span>
              ))}
              {(competitors ?? []).filter((c) => c.status !== "ARCHIVED").length === 0 && <span style={{ fontSize: 12, color: C.dim, padding: "4px 6px" }}>No active competitors.</span>}
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: C.faint, lineHeight: 1.6 }}>
            Industry selection, custom comparison dimensions, scoring model choice, and roles &amp; permissions aren't configurable yet in this first pass -- the module currently runs a fixed, weighted-composite scoring model against the fields shown in Competitors and Compare.
          </div>
        </div>
      )}
    </div>
  );
}

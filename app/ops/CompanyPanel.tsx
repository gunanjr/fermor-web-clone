"use client";

import { useEffect, useState } from "react";
import { C, Skeleton } from "./ui";
import { Favicon } from "./icons";
import { apiFetch, getOpsToken } from "@/lib/api";

// Fallback color only, for a competitor whose real favicon genuinely fails to load --
// picked deterministically from the domain, not fabricated per-brand detail.
const FALLBACK_PALETTE = ["#1d4ed8", "#00b386", "#5b21b6", "#c2410c", "#b91c1c", "#0f766e", "#0891b2", "#a16207"];
function colorForDomain(domain: string): string {
  let hash = 0;
  for (let i = 0; i < domain.length; i++) hash = (hash * 31 + domain.charCodeAt(i)) >>> 0;
  return FALLBACK_PALETTE[hash % FALLBACK_PALETTE.length];
}
function extractDomain(url: string): string {
  return url.trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
}

const DOC_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#93939c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" />
  </svg>
);
const Chevron = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6e6e77" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// No document is ever paywall-locked here -- every doc is either generated (click to
// read) or not generated yet (click still works, just shows a "not generated" state and
// points at Run Onboarding). There's no tier gating in this product.
function DocRow({ label, generated, onClick }: { label: string; generated: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className="kanso-row-hover" style={{ display: "flex", alignItems: "center", gap: 11, height: 38, padding: "0 8px", borderRadius: 8, cursor: "pointer" }}>
      {DOC_ICON}
      <span style={{ flex: 1, fontSize: 13.5, color: generated ? C.body : C.dim }}>
        {label} {!generated && <span style={{ color: C.faint }}>(not generated)</span>}
      </span>
      {Chevron}
    </div>
  );
}

export type CompanyDocs = {
  name: string;
  url: string;
  description: string | null;
  competitors: string[];
  docProductInfo: string | null;
  docStrategy: string | null;
  docBrandVoice: string | null;
  docCompetitors: string | null;
  docArticlesPlan: string | null;
  docUpdatedAt: string | null;
};

export type DocKey = "product" | "strategy" | "brandVoice" | "competitorAnalysis" | "articlesPlan";

export default function CompanyPanel({ onOpenDoc, onDocsLoaded, onOpenCompetitiveIntelligence }: { onOpenDoc: (key: DocKey) => void; onDocsLoaded?: (docs: CompanyDocs) => void; onOpenCompetitiveIntelligence?: () => void }) {
  const [docs, setDocs] = useState<CompanyDocs | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingCompetitors, setEditingCompetitors] = useState(false);
  const [competitorsDraft, setCompetitorsDraft] = useState("");
  const [savingCompetitors, setSavingCompetitors] = useState(false);
  const [competitorsError, setCompetitorsError] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionDraft, setDescriptionDraft] = useState("");
  const [savingDescription, setSavingDescription] = useState(false);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  async function loadDocs() {
    const token = getOpsToken();
    if (!token) return;
    try {
      const data = await apiFetch<CompanyDocs>("/api/v1/ops/company", {}, token);
      setDocs(data);
      onDocsLoaded?.(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load company data.");
    }
  }

  useEffect(() => {
    loadDocs();
  }, []);

  async function runOnboarding() {
    const token = getOpsToken();
    if (!token) return;
    setRunning(true);
    setError(null);
    try {
      await apiFetch("/api/v1/ops/onboarding/run", { method: "POST" }, token);
      await loadDocs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Onboarding failed.");
    } finally {
      setRunning(false);
    }
  }

  function startEditingCompetitors() {
    setCompetitorsDraft((docs?.competitors ?? []).join("\n"));
    setCompetitorsError(null);
    setEditingCompetitors(true);
  }

  function saveCompetitors() {
    if (savingCompetitors) return;
    const token = getOpsToken();
    if (!token) return;
    const cleaned = competitorsDraft.split("\n").map((c) => c.trim()).filter((c) => c.length > 0);
    setSavingCompetitors(true);
    setCompetitorsError(null);
    apiFetch<{ competitors: string[] }>("/api/v1/ops/company/competitors", { method: "POST", body: JSON.stringify({ competitors: cleaned }) }, token)
      .then((data) => {
        setDocs((cur) => (cur ? { ...cur, competitors: data.competitors } : cur));
        setEditingCompetitors(false);
      })
      .catch((e: any) => setCompetitorsError(e?.message ?? "Failed to save. Try again."))
      .finally(() => setSavingCompetitors(false));
  }

  function startEditingDescription() {
    setDescriptionDraft(docs?.description ?? "");
    setDescriptionError(null);
    setEditingDescription(true);
  }

  function saveDescription() {
    if (savingDescription) return;
    const token = getOpsToken();
    if (!token) return;
    setSavingDescription(true);
    setDescriptionError(null);
    apiFetch<{ description: string | null }>("/api/v1/ops/company/description", { method: "POST", body: JSON.stringify({ description: descriptionDraft }) }, token)
      .then((data) => {
        setDocs((cur) => (cur ? { ...cur, description: data.description } : cur));
        setEditingDescription(false);
      })
      .catch((e: any) => setDescriptionError(e?.message ?? "Failed to save. Try again."))
      .finally(() => setSavingDescription(false));
  }

  // Real shape, no real or sample text -- while the actual fetch is still in flight,
  // this is what shows instead of a fallback name ("Fermor"), "not generated" doc
  // labels, or an empty competitors state that would otherwise flash briefly and then
  // get replaced by the real values a moment later.
  if (!docs && !error) {
    return (
      <div style={{ flex: "1", overflowY: "auto", padding: "18px 15px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
          <Skeleton width={20} height={20} radius={10} />
          <Skeleton width={130} height={16} />
        </div>
        <Skeleton width="100%" height={12} style={{ marginBottom: 7 }} />
        <Skeleton width="85%" height={12} style={{ marginBottom: 7 }} />
        <Skeleton width="60%" height={12} />

        <div style={{ height: 1, background: C.rowBorder2, margin: "20px 0 16px" }} />
        <Skeleton width={90} height={11} style={{ marginBottom: 12 }} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, height: 38, padding: "0 8px" }}>
            <Skeleton width={15} height={15} radius={4} />
            <Skeleton width={140 + (i % 3) * 20} height={12} />
          </div>
        ))}

        <div style={{ height: 1, background: C.rowBorder2, margin: "20px 0 16px" }} />
        <Skeleton width={100} height={11} style={{ marginBottom: 13 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Skeleton width={19} height={19} radius={10} />
              <Skeleton width={90} height={12} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const rows: { key: DocKey; label: string; content: string | null }[] = [
    { key: "product", label: "Product Information", content: docs?.docProductInfo ?? null },
    { key: "strategy", label: "Marketing Strategy", content: docs?.docStrategy ?? null },
    { key: "brandVoice", label: "Brand Voice", content: docs?.docBrandVoice ?? null },
    { key: "competitorAnalysis", label: "Competitor Analysis", content: docs?.docCompetitors ?? null },
    { key: "articlesPlan", label: "Articles Plan", content: docs?.docArticlesPlan ?? null },
  ];
  const anyGenerated = rows.some((r) => !!r.content);

  return (
    <div style={{ flex: "1", overflowY: "auto", padding: "18px 15px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
        {/* Real favicon of whatever site this Kanso instance is actually running for --
            docs.url comes straight from the real onboarding crawl, not hardcoded to
            Fermor specifically, so this stays correct if this ever points elsewhere. */}
        <Favicon domain={(docs?.url ?? "fermor.in").replace(/^https?:\/\//, "").replace(/\/$/, "")} size={20} fallbackLabel={docs?.name ?? "Fermor"} fallbackColor="#1d4ed8" />
        <span style={{ fontSize: 18, fontWeight: 500, color: C.bright, letterSpacing: "-0.015em" }}>{docs?.name ?? "Fermor"}</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={runOnboarding}
          disabled={running}
          className="kanso-white-btn"
          style={{ height: 28, padding: "0 12px", background: running ? "#2a2a2e" : "#fafafc", border: "none", borderRadius: 7, color: running ? C.faint : "#110f0e", fontSize: 12, fontWeight: 500, cursor: running ? "not-allowed" : "pointer" }}
        >
          {running ? "Running..." : anyGenerated ? "Re-run onboarding" : "Run onboarding"}
        </button>
      </div>

      {error && (
        <div style={{ marginBottom: 14, padding: "9px 11px", background: "#1a1211", border: "1px solid #3a2523", borderRadius: 8, fontSize: 12, color: "#9c6b68" }}>{error}</div>
      )}
      {!anyGenerated && !error && (
        <div style={{ marginBottom: 14, padding: "9px 11px", background: "#1a1a1c", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, color: C.dim }}>
          No company documents yet. Run onboarding once to crawl {docs?.url ?? "the site"} and generate them for real.
        </div>
      )}

      {editingDescription ? (
        <div>
          <textarea
            value={descriptionDraft}
            onChange={(e) => setDescriptionDraft(e.target.value)}
            placeholder="A short, real description of what this company/product does."
            rows={4}
            style={{ width: "100%", background: "#111112", border: `1px solid ${C.border}`, borderRadius: 8, padding: 10, color: C.body, fontSize: 13, lineHeight: 1.7, resize: "vertical", fontFamily: "inherit" }}
          />
          {descriptionError && (
            <div style={{ marginTop: 8, padding: "8px 10px", background: "#1a1211", border: "1px solid #3a2523", borderRadius: 7, fontSize: 12, color: "#9c6b68" }}>{descriptionError}</div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 9 }}>
            <button onClick={saveDescription} disabled={savingDescription} className="kanso-ghost-btn" style={{ height: 27, padding: "0 12px", background: "#1a2e22", border: "1px solid #2d4a35", borderRadius: 7, color: savingDescription ? C.dimmer : "#4ade80", fontSize: 12, cursor: savingDescription ? "default" : "pointer" }}>
              {savingDescription ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setEditingDescription(false)} disabled={savingDescription} className="kanso-ghost-btn" style={{ height: 27, padding: "0 12px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: C.body2, fontSize: 12, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div onClick={startEditingDescription} className="kanso-row-hover" style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "2px 6px", margin: "-2px -6px", borderRadius: 8, cursor: "pointer" }} title="Click to edit">
          <p style={{ flex: 1, margin: 0, fontSize: 13, lineHeight: 1.7, color: docs?.description ? C.body3 : C.dim, textWrap: "pretty" }}>
            {docs?.description || "No description yet -- click to add a real one."}
          </p>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 3, color: C.faint }}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
        </div>
      )}

      <div style={{ height: 1, background: C.rowBorder2, margin: "20px 0 16px" }} />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.dim }}>Documents</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11.5, color: C.faint }}>{rows.filter((r) => r.content).length}/{rows.length}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", margin: "0 -8px" }}>
        {rows.map((r) => (
          <DocRow key={r.key} label={r.label} generated={!!r.content} onClick={() => onOpenDoc(r.key)} />
        ))}
      </div>

      <div style={{ height: 1, background: C.rowBorder2, margin: "20px 0 16px" }} />

      <div style={{ display: "flex", alignItems: "center", marginBottom: 13 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.dim }}>Competitors</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11.5, color: C.faint, marginRight: 8 }}>{docs?.competitors?.length ?? 0} tracked</span>
        {!editingCompetitors && (
          <button onClick={startEditingCompetitors} title="Edit tracked competitors" style={{ width: 22, height: 22, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
          </button>
        )}
      </div>

      {onOpenCompetitiveIntelligence && !editingCompetitors && (
        <div
          onClick={onOpenCompetitiveIntelligence}
          className="kanso-row-hover"
          style={{ display: "flex", alignItems: "center", gap: 8, height: 32, padding: "0 8px", margin: "0 -8px 13px", borderRadius: 8, cursor: "pointer" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#56d2c0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /><path d="M11 8v3l2 2" /></svg>
          <span style={{ flex: 1, fontSize: 12.5, color: C.body2 }}>Open Competitive Intelligence</span>
          {Chevron}
        </div>
      )}

      {editingCompetitors ? (
        <div>
          <textarea
            value={competitorsDraft}
            onChange={(e) => setCompetitorsDraft(e.target.value)}
            placeholder={"One competitor URL per line, e.g.\ncleartax.in\ngroww.in"}
            rows={6}
            style={{ width: "100%", background: "#111112", border: `1px solid ${C.border}`, borderRadius: 8, padding: 10, color: C.body, fontFamily: "var(--font-jetbrains-mono), ui-monospace, Menlo, monospace", fontSize: 12, lineHeight: 1.6, resize: "vertical" }}
          />
          {competitorsError && (
            <div style={{ marginTop: 8, padding: "8px 10px", background: "#1a1211", border: "1px solid #3a2523", borderRadius: 7, fontSize: 12, color: "#9c6b68" }}>{competitorsError}</div>
          )}
          <div style={{ display: "flex", gap: 8, marginTop: 9 }}>
            <button onClick={saveCompetitors} disabled={savingCompetitors} className="kanso-ghost-btn" style={{ height: 27, padding: "0 12px", background: "#1a2e22", border: "1px solid #2d4a35", borderRadius: 7, color: savingCompetitors ? C.dimmer : "#4ade80", fontSize: 12, cursor: savingCompetitors ? "default" : "pointer" }}>
              {savingCompetitors ? "Saving..." : "Save"}
            </button>
            <button onClick={() => setEditingCompetitors(false)} disabled={savingCompetitors} className="kanso-ghost-btn" style={{ height: 27, padding: "0 12px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: C.body2, fontSize: 12, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      ) : docs?.competitors && docs.competitors.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {docs.competitors.map((url) => {
            const domain = extractDomain(url);
            return (
              <div key={url} style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <Favicon domain={domain} size={19} fallbackLabel={domain.charAt(0).toUpperCase()} fallbackColor={colorForDomain(domain)} />
                <span style={{ fontSize: 12.5, color: C.body3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{domain}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: C.dim }}>
          No competitors tracked yet -- run onboarding to detect them from the crawl, or click the pencil above to add some directly. The Competitor Pulse Agent needs at least one to check.
        </p>
      )}
    </div>
  );
}

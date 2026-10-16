"use client";

import { useEffect, useState } from "react";
import { C, Skeleton } from "../ui";
import { apiFetch, getOpsToken } from "@/lib/api";
import { EvidenceChip } from "./EvidenceChip";
import {
  type CiCategory, type CiCompetitor, type CiCompetitorStatus, type CiEvidence, type CiSignal,
  CATEGORY_LABEL, STATUS_LABEL, CATEGORY_COLOR, threatColor, threatLevel, monoColorFor, monoLetterFor,
} from "./ci-types";

const CATEGORY_OPTIONS = Object.keys(CATEGORY_LABEL) as CiCategory[];
const STATUS_OPTIONS = Object.keys(STATUS_LABEL) as CiCompetitorStatus[];

const fieldLabel: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dimmer, marginBottom: 10 };
const inputStyle: React.CSSProperties = { height: 32, background: "#18181a", border: `1px solid ${C.border}`, borderRadius: 7, color: C.bright, fontFamily: "inherit", fontSize: 12.5, padding: "0 10px", width: "100%" };

function fmtDate(iso: string | null) {
  if (!iso) return "--";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// Real dollar figures from deep research (funding, valuation, revenue) -- formats a
// real number, never a placeholder. Absence stays "Not disclosed," never a blank or a 0.
function fmtUsd(n: number | null | undefined): string {
  if (n === null || n === undefined) return "Not disclosed";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
}

const sectionLabel: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dimmer, marginBottom: 12 };

// A real deep-research section only renders when it actually has content -- a
// competitor with no positioning research yet simply skips that section rather than
// showing an empty box, so the drawer's length honestly reflects how much research
// exists for that specific competitor.
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={sectionLabel}>{title}</div>
      {children}
    </div>
  );
}

function KV({ label, value, sourceUrl }: { label: string; value: React.ReactNode; sourceUrl?: string | null }) {
  return (
    <div>
      <span style={{ color: C.dim }}>{label}</span>
      <br />
      <span style={{ color: C.body }}>{value}</span>
      {sourceUrl && (
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 6, fontSize: 10.5, color: C.teal }} title={sourceUrl}>source</a>
      )}
    </div>
  );
}

function TagList({ items }: { items: string[] | undefined | null }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map((t, i) => (
        <span key={i} style={{ height: 24, padding: "0 10px", display: "inline-flex", alignItems: "center", background: "#232326", border: `1px solid ${C.border}`, borderRadius: 999, fontSize: 11.5, color: C.body2 }}>{t}</span>
      ))}
    </div>
  );
}

const swotColor: Record<string, string> = { strengths: C.green, weaknesses: C.red, opportunities: C.blue, threats: C.amber };
const swotTitle: Record<string, string> = { strengths: "Strengths", weaknesses: "Weaknesses", opportunities: "Opportunities", threats: "Threats" };

export function CompetitorDrawer({ competitorId, onClose, onUpdated }: { competitorId: string | null; onClose: () => void; onUpdated: () => void }) {
  const [competitor, setCompetitor] = useState<CiCompetitor | null>(null);
  const [evidence, setEvidence] = useState<CiEvidence[]>([]);
  const [signals, setSignals] = useState<CiSignal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<CiCompetitor>>({});
  const [saving, setSaving] = useState(false);
  const [addingEvidence, setAddingEvidence] = useState(false);
  const [evSource, setEvSource] = useState("");
  const [evUrl, setEvUrl] = useState("");
  const [evType, setEvType] = useState("Website");
  const [evSnippet, setEvSnippet] = useState("");

  useEffect(() => {
    if (!competitorId) return;
    setLoading(true);
    setError(null);
    const token = getOpsToken();
    apiFetch<{ competitor: CiCompetitor; signals: CiSignal[] }>(`/api/v1/ops/competitive-intelligence/competitors/${competitorId}`, {}, token ?? undefined)
      .then((data) => {
        setCompetitor(data.competitor);
        setSignals(data.signals);
        setDraft(data.competitor);
      })
      .catch((e: any) => setError(e?.message ?? "Failed to load this competitor."))
      .finally(() => setLoading(false));
    apiFetch<{ evidence: CiEvidence[] }>(`/api/v1/ops/competitive-intelligence/evidence?competitorId=${competitorId}`, {}, token ?? undefined)
      .then((data) => setEvidence(data.evidence))
      .catch(() => {});
  }, [competitorId]);

  function save() {
    if (!competitor || saving) return;
    setSaving(true);
    const token = getOpsToken();
    apiFetch<{ competitor: CiCompetitor }>(
      `/api/v1/ops/competitive-intelligence/competitors/${competitor.id}`,
      { method: "POST", body: JSON.stringify(draft) },
      token ?? undefined
    )
      .then((data) => {
        setCompetitor(data.competitor);
        onUpdated();
      })
      .catch((e: any) => setError(e?.message ?? "Failed to save."))
      .finally(() => setSaving(false));
  }

  function addEvidence() {
    if (!competitor || !evSource.trim()) return;
    const token = getOpsToken();
    apiFetch<{ evidence: CiEvidence }>(
      "/api/v1/ops/competitive-intelligence/evidence",
      { method: "POST", body: JSON.stringify({ competitorId: competitor.id, source: evSource.trim(), url: evUrl.trim() || null, sourceType: evType, snippet: evSnippet.trim() || null }) },
      token ?? undefined
    )
      .then((data) => {
        setEvidence((cur) => [data.evidence, ...cur]);
        setEvSource("");
        setEvUrl("");
        setEvSnippet("");
        setAddingEvidence(false);
      })
      .catch((e: any) => setError(e?.message ?? "Failed to add evidence."));
  }

  if (!competitorId) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 50, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(680px,58vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        {loading || !competitor ? (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <Skeleton width={200} height={20} />
            <Skeleton width="100%" height={80} />
            <Skeleton width="100%" height={140} />
          </div>
        ) : (
          <>
            <div style={{ flex: "0 0 auto", height: 58, display: "flex", alignItems: "center", gap: 12, padding: "0 20px", borderBottom: "1px solid #27272b" }}>
              <span style={{ width: 34, height: 34, borderRadius: 8, background: monoColorFor(competitor.domain), display: "grid", placeItems: "center", fontSize: 14, fontWeight: 600, color: "#fff" }}>{monoLetterFor(competitor.name)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: C.bright, fontFamily: "var(--font-sora), sans-serif" }}>{competitor.name}</div>
                <div style={{ fontSize: 11.5, color: C.dim }}>{competitor.domain}</div>
              </div>
              <button onClick={onClose} style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px 60px" }}>
              {error && <div style={{ marginBottom: 16, padding: "9px 12px", background: "#211717", border: "1px solid #3d2b2b", borderRadius: 7, fontSize: 12, color: "#ff8080" }}>{error}</div>}

              <div style={fieldLabel}>Identity &amp; research</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 5 }}>Category</div>
                  <select value={draft.category} onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value as CiCategory }))} style={inputStyle}>
                    {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 5 }}>Status</div>
                  <select value={draft.status} onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as CiCompetitorStatus }))} style={inputStyle}>
                    {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 5 }}>Threat score (0-100)</div>
                  <input type="number" min={0} max={100} value={draft.threatScore ?? ""} onChange={(e) => setDraft((d) => ({ ...d, threatScore: e.target.value === "" ? null : Number(e.target.value) }))} style={inputStyle} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 5 }}>Relevance score (0-100)</div>
                  <input type="number" min={0} max={100} value={draft.relevanceScore ?? ""} onChange={(e) => setDraft((d) => ({ ...d, relevanceScore: e.target.value === "" ? null : Number(e.target.value) }))} style={inputStyle} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 5 }}>Funding</div>
                  <input value={draft.funding ?? ""} onChange={(e) => setDraft((d) => ({ ...d, funding: e.target.value }))} placeholder="e.g. $58M Series C" style={inputStyle} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.dim, marginBottom: 5 }}>Founded</div>
                  <input value={draft.founded ?? ""} onChange={(e) => setDraft((d) => ({ ...d, founded: e.target.value }))} placeholder="e.g. 2020" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, color: C.dim, marginBottom: 5 }}>One-liner</div>
                <textarea value={draft.oneLiner ?? ""} onChange={(e) => setDraft((d) => ({ ...d, oneLiner: e.target.value }))} placeholder="One sentence describing what this competitor actually does" style={{ ...inputStyle, height: 56, padding: "8px 10px", resize: "none" as const }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.dim }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: threatColor(draft.threatScore ?? null) }} />
                  {threatLevel(draft.threatScore ?? null)} threat
                </span>
                <div style={{ flex: 1 }} />
                <button onClick={save} disabled={saving} className="kanso-ghost-btn" style={{ height: 30, padding: "0 14px", background: "#1a2e22", border: "1px solid #2d4a35", borderRadius: 7, color: saving ? C.dimmer : "#4ade80", fontSize: 12, cursor: saving ? "default" : "pointer" }}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>

              <DeepResearchSections competitor={competitor} />

              <div style={{ height: 1, background: "#27272b", margin: "0 0 20px" }} />

              <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
                <span style={fieldLabel}>Evidence ({evidence.length})</span>
                <div style={{ flex: 1 }} />
                <button onClick={() => setAddingEvidence((v) => !v)} style={{ fontSize: 11.5, color: C.teal, background: "transparent", border: "none", cursor: "pointer" }}>{addingEvidence ? "Cancel" : "+ Add evidence"}</button>
              </div>
              {addingEvidence && (
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 8, background: "#1f1f21", padding: 12, marginBottom: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  <input value={evSource} onChange={(e) => setEvSource(e.target.value)} placeholder="Source (e.g. Company website, TechCrunch)" style={inputStyle} />
                  <input value={evUrl} onChange={(e) => setEvUrl(e.target.value)} placeholder="URL (optional)" style={inputStyle} />
                  <select value={evType} onChange={(e) => setEvType(e.target.value)} style={inputStyle}>
                    <option>Website</option><option>News</option><option>Funding DB</option><option>Social</option><option>Other</option>
                  </select>
                  <textarea value={evSnippet} onChange={(e) => setEvSnippet(e.target.value)} placeholder="Snippet / what this shows (optional)" style={{ ...inputStyle, height: 48, padding: "8px 10px", resize: "none" as const }} />
                  <button onClick={addEvidence} disabled={!evSource.trim()} style={{ alignSelf: "flex-end", height: 28, padding: "0 12px", background: "#fafafc", border: "none", borderRadius: 7, color: "#110f0e", fontSize: 12, fontWeight: 500, cursor: evSource.trim() ? "pointer" : "default", opacity: evSource.trim() ? 1 : 0.5 }}>Save evidence</button>
                </div>
              )}
              {evidence.length === 0 ? (
                <div style={{ fontSize: 12, color: C.dim, marginBottom: 20 }}>No evidence logged yet for this competitor.</div>
              ) : (
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, background: "#1f1f21", overflow: "hidden", marginBottom: 20 }}>
                  {evidence.map((ev, i) => (
                    <div key={ev.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px", borderBottom: i < evidence.length - 1 ? "1px solid #232327" : "none" }}>
                      <EvidenceChip evidence={ev} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, color: C.body }}>{ev.source} <span style={{ color: C.dim }}>· {ev.sourceType}</span></div>
                        {ev.snippet && <div style={{ fontSize: 11.5, color: C.body3, marginTop: 3, lineHeight: 1.5 }}>{ev.snippet}</div>}
                      </div>
                      <div style={{ fontSize: 11, color: C.faint, whiteSpace: "nowrap" }}>{fmtDate(ev.retrievedAt)}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ height: 1, background: "#27272b", margin: "0 0 20px" }} />

              <div style={fieldLabel}>Recent signals ({signals.length})</div>
              {signals.length === 0 ? (
                <div style={{ fontSize: 12, color: C.dim }}>No Competitor Pulse findings linked to this competitor yet.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {signals.map((sg) => (
                    <div key={sg.id} style={{ border: `1px solid ${C.border}`, borderRadius: 8, background: "#1f1f21", padding: "10px 13px" }}>
                      <div style={{ fontSize: 12.5, color: C.body }}>{sg.title}</div>
                      <div style={{ fontSize: 11, color: C.faint, marginTop: 4 }}>{fmtDate(sg.createdAt)}</div>
                    </div>
                  ))}
                </div>
              )}

              {!hasDeepResearch(competitor) && (
                <div style={{ marginTop: 28, fontSize: 11.5, color: C.faint, lineHeight: 1.6 }}>
                  Deeper profile sections (product, positioning, pricing, strategy) arrive once real per-company research fills them in -- see Sources &amp; Settings for the evidence backing everything shown here.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function hasDeepResearch(c: CiCompetitor): boolean {
  return !!(c.positioning || c.focus || c.business || c.product || c.marketing || c.pricingDetail || c.strategyInferred || c.swotInferred
    || (c.recentMovements && c.recentMovements.length > 0) || (c.likelyNextMoves && c.likelyNextMoves.length > 0) || c.hqLocation || c.strategicCluster);
}

// Every section here renders only when its own real data is present -- a competitor
// mid-way through research shows exactly the sections that have been filled in, not
// a full template with empty boxes. Read-only: this data comes from a real research
// pass (see the master research-prompt output), not something edited inline here.
function DeepResearchSections({ competitor: c }: { competitor: CiCompetitor }) {
  if (!hasDeepResearch(c)) return null;

  return (
    <>
      {(c.hqLocation || c.legalType || c.ownershipType || c.foundedYear || (c.founders && c.founders.length > 0)) && (
        <Section title="Identity">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12.5 }}>
            {c.hqLocation && <KV label="HQ" value={c.hqLocation} />}
            {c.foundedYear && <KV label="Founded" value={c.foundedYear} />}
            {c.legalType && <KV label="Type" value={c.legalType} />}
            {c.ownershipType && <KV label="Ownership" value={c.ownershipType} />}
          </div>
          {c.founders && c.founders.length > 0 && (
            <div style={{ marginTop: 10, fontSize: 12.5 }}><span style={{ color: C.dim }}>Founders</span> <span style={{ color: C.body }}>{c.founders.join(", ")}</span></div>
          )}
        </Section>
      )}

      {c.focus && (
        <Section title="Focus">
          <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 12.5 }}>
            <div><span style={{ color: C.dim }}>Market</span> <span style={{ color: C.body2 }}>{c.focus.primary_market}</span></div>
            <div><span style={{ color: C.dim }}>Audience</span> <span style={{ color: C.body2 }}>{c.focus.target_audience}</span></div>
            <div><span style={{ color: C.dim }}>Segment</span> <span style={{ color: C.body2 }}>{c.focus.customer_segment}</span></div>
            <div><span style={{ color: C.dim }}>Strategic focus</span> <span style={{ color: C.body2 }}>{c.focus.strategic_focus}</span></div>
          </div>
          {c.focus.use_cases?.length > 0 && <div style={{ marginTop: 8 }}><TagList items={c.focus.use_cases} /></div>}
        </Section>
      )}

      {c.business && (
        <Section title="Business">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontSize: 12.5, marginBottom: c.business.latest_round?.name ? 10 : 0 }}>
            <KV label="Total funding" value={c.totalFundingUsd !== null ? fmtUsd(c.totalFundingUsd) : fmtUsd(c.business.total_funding_usd)} sourceUrl={c.business.total_funding_source_url} />
            <KV label="Valuation" value={c.valuationUsd !== null ? fmtUsd(c.valuationUsd) : fmtUsd(c.business.valuation_usd)} sourceUrl={c.business.valuation_source_url} />
            <KV label="Revenue" value={fmtUsd(c.business.revenue_usd)} sourceUrl={c.business.revenue_source_url} />
            {c.business.users_or_customers?.count !== null && (
              <KV label="Users" value={`${c.business.users_or_customers.count.toLocaleString("en-IN")} ${c.business.users_or_customers.metric}`} sourceUrl={c.business.users_or_customers.source_url} />
            )}
            {c.business.employee_count?.count !== null && (
              <KV label="Employees" value={c.business.employee_count.count} sourceUrl={c.business.employee_count.source_url} />
            )}
            {c.business.growth_rate?.value && <KV label={c.business.growth_rate.metric || "Growth"} value={c.business.growth_rate.value} sourceUrl={c.business.growth_rate.source_url} />}
          </div>
          {c.business.latest_round?.name && (
            <div style={{ fontSize: 12, color: C.body3, marginBottom: 8 }}>
              Latest round: <span style={{ color: C.body }}>{c.business.latest_round.name}{c.business.latest_round.amount_usd ? ` -- ${fmtUsd(c.business.latest_round.amount_usd)}` : ""}{c.business.latest_round.date ? `, ${c.business.latest_round.date}` : ""}</span>
              {c.business.latest_round.lead_investors?.length > 0 && <> led by {c.business.latest_round.lead_investors.join(", ")}</>}
            </div>
          )}
          {c.business.key_investors?.length > 0 && <TagList items={c.business.key_investors} />}
        </Section>
      )}

      {c.product && (
        <Section title="Product">
          {c.product.core_products?.length > 0 && <div style={{ marginBottom: 10 }}><TagList items={c.product.core_products} /></div>}
          {c.product.ai_capabilities && <div style={{ fontSize: 12.5, color: C.body2, lineHeight: 1.6, marginBottom: 10 }}><span style={{ color: C.dim }}>AI capabilities: </span>{c.product.ai_capabilities}</div>}
          {c.product.recent_launches?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {c.product.recent_launches.map((l, i) => (
                <div key={i} style={{ fontSize: 12, color: C.body3 }}>
                  <span style={{ color: C.faint }}>{l.date}</span> -- <span style={{ color: C.body }}>{l.name}</span>: {l.description}
                  {l.source_url && <a href={l.source_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 6, color: C.teal, fontSize: 10.5 }}>source</a>}
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {c.positioning && (
        <Section title="Positioning">
          {c.positioning.real_quote && (
            <div style={{ borderLeft: "2px solid #34343a", padding: "2px 0 2px 14px", marginBottom: 12, fontSize: 13.5, fontStyle: "italic", color: C.bright, lineHeight: 1.6 }}>
              &ldquo;{c.positioning.real_quote}&rdquo;
              {c.positioning.quote_source_url && <a href={c.positioning.quote_source_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 8, color: C.teal, fontSize: 10.5, fontStyle: "normal" }}>source</a>}
            </div>
          )}
          <div style={{ fontSize: 12.5, color: C.body2, lineHeight: 1.6, marginBottom: 8 }}>{c.positioning.value_prop}</div>
          {c.positioning.differentiators?.length > 0 && <TagList items={c.positioning.differentiators} />}
        </Section>
      )}

      {c.marketing && (
        <Section title="Marketing">
          <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 12.5, marginBottom: c.marketing.social_presence?.length ? 10 : 0 }}>
            {c.marketing.content_strategy && <div><span style={{ color: C.dim }}>Content</span> <span style={{ color: C.body2 }}>{c.marketing.content_strategy}</span></div>}
            {c.marketing.seo_strength && <div><span style={{ color: C.dim }}>SEO</span> <span style={{ color: C.body2 }}>{c.marketing.seo_strength}</span></div>}
            {c.marketing.paid_marketing_signals && <div><span style={{ color: C.dim }}>Paid</span> <span style={{ color: C.body2 }}>{c.marketing.paid_marketing_signals}</span></div>}
          </div>
          {c.marketing.social_presence?.length > 0 && (
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {c.marketing.social_presence.map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: C.body3 }}>
                  <span style={{ color: C.body, fontWeight: 600 }}>{s.platform}</span>{s.followers !== null ? `: ${s.followers.toLocaleString("en-IN")}` : ""}
                  {s.source_url && <a href={s.source_url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 5, color: C.teal, fontSize: 10.5 }}>source</a>}
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {c.pricingDetail && (
        <Section title="Pricing">
          {c.pricingDetail.model && <div style={{ fontSize: 12.5, color: C.body2, marginBottom: 10 }}>{c.pricingDetail.model}</div>}
          {c.pricingDetail.plans?.length > 0 && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {c.pricingDetail.plans.map((p, i) => (
                <div key={i} style={{ flex: "1 1 140px", minWidth: 140, border: `1px solid ${C.border}`, borderRadius: 8, background: "#1f1f21", padding: 11 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.bright }}>{p.name}</div>
                  <div style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 13.5, color: C.bright, margin: "4px 0" }}>{p.price}</div>
                  <div style={{ fontSize: 11, color: C.dim }}>{p.includes}</div>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {c.strategyInferred && (
        <Section title="Strategy (inferred)">
          <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 12.5 }}>
            {c.strategyInferred.stated_direction && <div><span style={{ color: C.dim }}>Direction</span> <span style={{ color: C.body2 }}>{c.strategyInferred.stated_direction}</span></div>}
            {c.strategyInferred.growth_strategy && <div><span style={{ color: C.dim }}>Growth</span> <span style={{ color: C.body2 }}>{c.strategyInferred.growth_strategy}</span></div>}
            {c.strategyInferred.ai_strategy && <div><span style={{ color: C.dim }}>AI strategy</span> <span style={{ color: C.body2 }}>{c.strategyInferred.ai_strategy}</span></div>}
            {c.strategyInferred.expansion_plans && <div><span style={{ color: C.dim }}>Expansion</span> <span style={{ color: C.body2 }}>{c.strategyInferred.expansion_plans}</span></div>}
          </div>
        </Section>
      )}

      {c.swotInferred && (
        <Section title="SWOT (inferred)">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(["strengths", "weaknesses", "opportunities", "threats"] as const).map((key) => {
              const points = c.swotInferred?.[key] ?? [];
              if (points.length === 0) return null;
              return (
                <div key={key} style={{ border: `1px solid ${C.border}`, borderRadius: 8, background: "#1f1f21", padding: 11 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: swotColor[key], marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{swotTitle[key]}</div>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {points.map((p, i) => (
                      <li key={i} style={{ fontSize: 11.5, color: C.body2, lineHeight: 1.6, marginBottom: 4 }}>{p.point}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {c.recentMovements && c.recentMovements.length > 0 && (
        <Section title="Recent movements">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {c.recentMovements.map((m, i) => (
              <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 8, background: "#1f1f21", padding: "10px 13px" }}>
                <div style={{ fontSize: 11, color: C.faint, marginBottom: 3 }}>{m.date}</div>
                <div style={{ fontSize: 12.5, color: C.bright, fontWeight: 500 }}>{m.headline}</div>
                <div style={{ fontSize: 12, color: C.body3, marginTop: 3, lineHeight: 1.5 }}>{m.description}</div>
                {m.source_url && <a href={m.source_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10.5, color: C.teal }}>source</a>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {c.likelyNextMoves && c.likelyNextMoves.length > 0 && (
        <Section title="Likely next moves (inferred)">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {c.likelyNextMoves.map((m, i) => (
              <div key={i} style={{ border: "1px solid #2d2b1a", borderLeft: "2px solid #a78bfa", borderRadius: 8, background: "#1f1f21", padding: "10px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, color: C.bright, fontStyle: "italic", flex: 1 }}>{m.prediction}</span>
                  <span style={{ fontSize: 10, color: C.dimmer, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.confidence}</span>
                </div>
                <div style={{ fontSize: 11.5, color: C.dim, lineHeight: 1.5 }}>{m.reasoning_basis}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(c.strategicCluster || c.additionalNotes) && (
        <Section title="Analyst notes">
          {c.strategicCluster && (
            <div style={{ fontSize: 12.5, color: C.body2, lineHeight: 1.6, marginBottom: c.additionalNotes ? 10 : 0 }}>
              <span style={{ color: C.dim }}>Strategic cluster: </span><span style={{ color: C.bright, fontWeight: 500 }}>{c.strategicCluster}</span>
              {c.strategicClusterReasoning && <div style={{ marginTop: 4, color: C.body3 }}>{c.strategicClusterReasoning}</div>}
            </div>
          )}
          {c.additionalNotes && <div style={{ fontSize: 11.5, color: C.faint, lineHeight: 1.6 }}>{c.additionalNotes}</div>}
        </Section>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { C } from "../ui";
import type { CiEvidence } from "./ci-types";

const CONFIDENCE_COLOR: Record<string, string> = { HIGH: C.green, MEDIUM: C.amber, LOW: C.red };

function fmtDate(iso: string | null) {
  if (!iso) return "--";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// The one shared evidence-chip component the design handoff calls for -- an icon that
// opens a popover with Source / Confidence / Last verified, built once here and reused
// everywhere a claim needs to be traceable to a real, cited row (Competitors, Compare,
// Strategy, Sources). Backed by a real CiEvidence row, never a bare number with no
// citation.
export function EvidenceChip({ evidence }: { evidence: CiEvidence }) {
  const [open, setOpen] = useState(false);
  const confColor = CONFIDENCE_COLOR[evidence.confidence] ?? C.dim;

  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        title="View evidence"
        style={{ width: 18, height: 18, display: "grid", placeItems: "center", background: "transparent", border: `1px solid ${C.border}`, borderRadius: "50%", color: C.dim, cursor: "pointer", fontSize: 10, fontStyle: "italic", fontFamily: "Georgia, serif" }}
      >
        i
      </button>
      {open && (
        <div
          className="kanso-fade-in"
          style={{ position: "absolute", bottom: "calc(100% + 6px)", left: 0, zIndex: 20, width: 240, padding: "11px 13px", background: "#232326", border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,.4)" }}
        >
          <div style={{ fontSize: 12, color: C.bright, fontWeight: 600, marginBottom: 6 }}>{evidence.source}</div>
          {evidence.url && (
            <a href={evidence.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.teal, wordBreak: "break-all", display: "block", marginBottom: 8 }}>
              {evidence.url}
            </a>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.dim, marginBottom: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: confColor }} />
            Confidence: <span style={{ color: confColor }}>{evidence.confidence}</span>
          </div>
          <div style={{ fontSize: 11, color: C.dim }}>Last verified: {fmtDate(evidence.lastVerifiedAt)}</div>
          {evidence.snippet && <div style={{ fontSize: 11.5, color: C.body3, marginTop: 8, lineHeight: 1.5 }}>&ldquo;{evidence.snippet}&rdquo;</div>}
        </div>
      )}
    </span>
  );
}

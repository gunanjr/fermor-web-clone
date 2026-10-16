"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { C, sora } from "./ui";
import type { CompanyDocs, DocKey } from "./CompanyPanel";
import { apiFetch, getOpsToken } from "@/lib/api";

const CloseIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", margin: "0 0 16px", fontSize: 16, fontWeight: 600, color: C.bright }}>{children}</h2>;
}
function Rule() {
  return <div style={{ height: 1, background: "#27272b", margin: "0 0 22px" }} />;
}

// Maps the Markdown a generated company doc actually contains (## headings, **bold**
// labels, - bullets, [text](url) links, > quotes) to real styled elements -- reusing the
// same H2 + Rule pattern as the section title above it, instead of the flat "one <p> per
// double-newline" rendering this replaced (which showed literal ## / ** / - characters
// as plain text since nothing ever parsed them).
const DOC_MD_COMPONENTS = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <div style={{ marginTop: 28 }}>
      <H2>{children}</H2>
      <Rule />
    </div>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", margin: "20px 0 10px", fontSize: 13.5, fontWeight: 600, color: C.bright }}>{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => <p style={{ margin: "0 0 18px", fontSize: 13.5, lineHeight: 1.8, color: C.body2 }}>{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: C.bright, fontWeight: 600 }}>{children}</strong>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul style={{ margin: "0 0 18px", paddingLeft: 20 }}>{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol style={{ margin: "0 0 18px", paddingLeft: 20 }}>{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li style={{ fontSize: 13.5, lineHeight: 1.8, color: C.body2, marginBottom: 6 }}>{children}</li>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.blue, textDecoration: "underline" }}>{children}</a>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{ margin: "0 0 18px", padding: "2px 16px", borderLeft: "2px solid #27272b", fontStyle: "italic", color: C.body2, fontSize: 13.5, lineHeight: 1.8 }}>{children}</blockquote>
  ),
  // Tables (competitor comparisons, layer/status grids) need remarkGfm -- base Markdown
  // has no table syntax, so `| a | b |` would otherwise print as a literal paragraph.
  table: ({ children }: { children?: React.ReactNode }) => (
    <div style={{ margin: "0 0 18px", overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 12.5 }}>{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => <thead>{children}</thead>,
  tr: ({ children }: { children?: React.ReactNode }) => <tr style={{ borderBottom: "1px solid #27272b" }}>{children}</tr>,
  th: ({ children }: { children?: React.ReactNode }) => (
    <th style={{ textAlign: "left", padding: "8px 14px 8px 0", color: C.bright, fontWeight: 600, whiteSpace: "nowrap" }}>{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td style={{ textAlign: "left", padding: "10px 14px 10px 0", color: C.body2, verticalAlign: "top" }}>{children}</td>
  ),
};

const DOC_TITLES: Record<DocKey, string> = {
  product: "Product Information",
  strategy: "Marketing Strategy",
  brandVoice: "Brand Voice",
  competitorAnalysis: "Competitor Analysis",
  articlesPlan: "Articles Plan",
};
const DOC_FIELD: Record<DocKey, keyof CompanyDocs> = {
  product: "docProductInfo",
  strategy: "docStrategy",
  brandVoice: "docBrandVoice",
  competitorAnalysis: "docCompetitors",
  articlesPlan: "docArticlesPlan",
};

const smallBtn: React.CSSProperties = { height: 26, padding: "0 11px", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: C.body2, fontSize: 12, cursor: "pointer" };
const iconBtn: React.CSSProperties = { width: 26, height: 26, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" };

export function DocumentOverlay({ doc, docs, onClose, onDocUpdated }: { doc: DocKey | null; docs: CompanyDocs | null; onClose: () => void; onDocUpdated?: (updated: Partial<CompanyDocs>) => void }) {
  const [editing, setEditing] = useState(false);
  const [draftText, setDraftText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // A different doc (or the overlay closing) always exits edit mode -- editing one doc's
  // draft text should never leak into the next doc opened.
  useEffect(() => {
    setEditing(false);
    setSaveError(null);
    setCopied(false);
  }, [doc]);

  if (!doc) return null;
  const title = DOC_TITLES[doc];
  const field = DOC_FIELD[doc];
  const content = docs ? (docs[field] as string | null) : null;

  function startEditing() {
    setDraftText(content ?? "");
    setSaveError(null);
    setEditing(true);
  }

  function copyContent() {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadContent() {
    if (!content) return;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((text) => setDraftText(text));
    e.target.value = "";
  }

  function saveEdit() {
    if (saving) return;
    const token = getOpsToken();
    if (!token) return;
    setSaving(true);
    setSaveError(null);
    apiFetch<Partial<CompanyDocs>>("/api/v1/ops/company/docs", { method: "POST", body: JSON.stringify({ key: doc, content: draftText }) }, token)
      .then((data) => {
        onDocUpdated?.(data);
        setEditing(false);
      })
      .catch((e: any) => setSaveError(e?.message ?? "Failed to save. Try again."))
      .finally(() => setSaving(false));
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={editing ? undefined : onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(740px,58vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 0 auto", height: 54, display: "flex", alignItems: "center", gap: 11, padding: "0 16px", borderBottom: "1px solid #27272b" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#93939c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /></svg>
          <span style={{ fontSize: 15, fontWeight: 500, color: C.bright }}>{title}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 23, padding: "0 9px", background: "#232326", border: "1px solid #34343a", borderRadius: 7, fontSize: 11.5, color: C.body3 }}>
            Current<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </span>
          <div style={{ flex: 1 }} />
          {editing ? (
            <>
              <input ref={fileInputRef} type="file" accept=".md,.markdown,.txt,text/markdown,text/plain" onChange={handleUploadFile} style={{ display: "none" }} />
              <button onClick={() => fileInputRef.current?.click()} className="kanso-ghost-btn" style={smallBtn}>Upload</button>
              <button onClick={() => setEditing(false)} disabled={saving} className="kanso-ghost-btn" style={{ ...smallBtn, color: saving ? C.dimmer : C.body2 }}>Cancel</button>
              <button onClick={saveEdit} disabled={saving} className="kanso-ghost-btn" style={{ ...smallBtn, background: "#1a2e22", border: "1px solid #2d4a35", color: saving ? C.dimmer : "#4ade80" }}>{saving ? "Saving..." : "Save"}</button>
            </>
          ) : (
            <>
              <button onClick={copyContent} disabled={!content} title="Copy raw Markdown" className="kanso-icon-btn" style={{ ...iconBtn, color: copied ? "#4ade80" : content ? C.dim : C.faint, cursor: content ? "pointer" : "default" }}>
                {copied ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
                )}
              </button>
              <button onClick={startEditing} title="Edit this document" className="kanso-icon-btn" style={iconBtn}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" /></svg></button>
              <button onClick={downloadContent} disabled={!content} title="Download as .md" className="kanso-icon-btn" style={{ ...iconBtn, color: content ? C.dim : C.faint, cursor: content ? "pointer" : "default" }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 11l5 5 5-5M4 21h16" /></svg></button>
            </>
          )}
          <button onClick={editing ? () => setEditing(false) : onClose} className="kanso-danger-btn" style={iconBtn}>{CloseIcon}</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "34px 46px 60px" }}>
          <div style={{ maxWidth: editing ? "none" : 640 }}>
            <h1 style={{ margin: "0 0 8px", ...sora, fontWeight: 600, fontSize: 24, lineHeight: 1.3, color: C.bright, letterSpacing: "-0.02em" }}>{title}</h1>
            <Rule />
            {editing ? (
              <>
                <textarea
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="Paste real Markdown content here, or click Upload above to load a local .md/.txt file."
                  style={{ width: "100%", minHeight: 420, background: "#111112", border: `1px solid ${C.border}`, borderRadius: 8, padding: 14, color: C.body, fontFamily: "var(--font-jetbrains-mono), ui-monospace, Menlo, monospace", fontSize: 12.5, lineHeight: 1.7, resize: "vertical" }}
                />
                {saveError && (
                  <div style={{ marginTop: 10, padding: "10px 12px", background: "#1a1211", border: "1px solid #3a2523", borderRadius: 8, fontSize: 12.5, color: "#9c6b68" }}>{saveError}</div>
                )}
                <div style={{ marginTop: 10, fontSize: 11.5, color: C.faint }}>
                  Headings (##), bold (**text**), bullets (-), links, and tables all render on save. This replaces the document directly -- it isn't merged with the current version.
                </div>
              </>
            ) : content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={DOC_MD_COMPONENTS}>{content}</ReactMarkdown>
            ) : (
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, color: C.dim }}>
                Not generated yet. Run onboarding from the Company panel to crawl the site and generate this document for real,
                or click Edit above to paste or upload one directly.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export type SocialDraftItem = { id: string; content: string; angle?: string; reasoning?: string; suggestedFirstReply?: string; needsFactCheck?: string } | null;
type SocialIdentity = { name: string; username?: string; profileImageUrl?: string; verified?: boolean };

type PlatformConfig = {
  label: string;
  iconBg: string;
  iconLabel: string;
  identityEndpoint: string;
  postEndpoint: (id: string) => string;
  regenerateEndpoint: (id: string) => string;
  composeIntentUrl?: (text: string) => string;
  charLimit?: number;
  postedLabel: string;
};

const PLATFORM_CONFIG: Record<"twitter" | "linkedin", PlatformConfig> = {
  twitter: {
    label: "X Draft",
    iconBg: "#000",
    iconLabel: "X",
    identityEndpoint: "/api/v1/ops/integrations/twitter/identity",
    postEndpoint: (id) => `/api/v1/ops/feed/${id}/post-tweet`,
    regenerateEndpoint: (id) => `/api/v1/ops/feed/${id}/regenerate-tweet`,
    composeIntentUrl: (text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    charLimit: 280,
    postedLabel: "Posted to X.",
  },
  linkedin: {
    label: "LinkedIn Draft",
    iconBg: "#0a66c2",
    iconLabel: "in",
    identityEndpoint: "/api/v1/ops/integrations/linkedin/identity",
    postEndpoint: (id) => `/api/v1/ops/feed/${id}/post-linkedin`,
    regenerateEndpoint: (id) => `/api/v1/ops/feed/${id}/regenerate-linkedin`,
    // LinkedIn has no public compose-with-prefilled-text URL the way X does (their
    // share intent only accepts a URL to summarize, not arbitrary custom text), so
    // there's genuinely no "Preview on LinkedIn" option to offer here -- Copy + Post
    // now are the only two real actions for this platform.
    postedLabel: "Posted to LinkedIn.",
  },
};

// Two distinct, real actions -- not decoration:
// "Preview on X" (X only) opens the platform's own compose window, pre-filled, so a
// person can see it rendered in the real UI, edit it, and post it themselves with
// their own click. "Post now" calls the backend directly and posts for real with no
// intermediate step. Neither ever fires without this overlay being explicitly opened
// and a button inside it explicitly clicked. Editing is real too: whatever is in the
// text box is what gets previewed or posted, not the original generated draft.
export function SocialPostPreviewOverlay({
  platform,
  item,
  onClose,
  onPosted,
  onDone,
}: {
  platform: "twitter" | "linkedin";
  item: SocialDraftItem;
  onClose: () => void;
  onPosted: (id: string, url: string) => void;
  // Self-contained: calls the real /done endpoint itself rather than routing through
  // AgentsFeedPanel's own markDone (this overlay is rendered by a sibling component,
  // OpsWorkspace, which doesn't own that state) -- `onDone` is just a lightweight
  // "something changed, refresh your list" signal for the parent, the same real
  // pattern `onPosted` already uses for the posted-state sync.
  onDone?: () => void;
}) {
  const cfg = PLATFORM_CONFIG[platform];
  const [posting, setPosting] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [markingDone, setMarkingDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postedUrl, setPostedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [identity, setIdentity] = useState<SocialIdentity | null>(null);
  // Real loading state for the identity check -- distinct from "confirmed no account
  // connected" (identity === null after the fetch resolves), which previously looked
  // identical to "still checking" the instant the overlay opened.
  const [checkingIdentity, setCheckingIdentity] = useState(false);
  const [text, setText] = useState(item?.content ?? "");
  const [meta, setMeta] = useState<{ angle?: string; reasoning?: string; suggestedFirstReply?: string; needsFactCheck?: string }>({
    angle: item?.angle,
    reasoning: item?.reasoning,
    suggestedFirstReply: item?.suggestedFirstReply,
    needsFactCheck: item?.needsFactCheck,
  });
  const lastItemId = useRef<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Grows the textarea to fit the real post length instead of a fixed row count --
  // a 1066-character LinkedIn draft was rendering inside a 6-row box with an internal
  // scrollbar, showing only a few lines at a time. A real preview should show the whole
  // post at once, the way it would actually look pasted into LinkedIn or X.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  useEffect(() => {
    if (!item) {
      lastItemId.current = null;
      return;
    }
    if (lastItemId.current === item.id) return;
    lastItemId.current = item.id;
    setText(item.content);
    setMeta({ angle: item.angle, reasoning: item.reasoning, suggestedFirstReply: item.suggestedFirstReply, needsFactCheck: item.needsFactCheck });
    setPostedUrl(null);
    setError(null);
    const token = getOpsToken();
    if (token) {
      setCheckingIdentity(true);
      apiFetch<SocialIdentity>(cfg.identityEndpoint, {}, token)
        .then(setIdentity)
        .catch(() => setIdentity(null))
        .finally(() => setCheckingIdentity(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  if (!item) return null;

  function openComposeIntent() {
    if (!cfg.composeIntentUrl) return;
    window.open(cfg.composeIntentUrl(text), "_blank", "noopener,noreferrer");
  }

  function copyText() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function regenerate() {
    const token = getOpsToken();
    if (!token || regenerating || !item) return;
    setRegenerating(true);
    setError(null);
    apiFetch<{ content: string; metadata: { angle?: string; reasoning?: string; suggestedFirstReply?: string; needsFactCheck?: string } }>(cfg.regenerateEndpoint(item.id), { method: "POST" }, token)
      .then((data) => {
        setText(data.content);
        setMeta({ angle: data.metadata?.angle, reasoning: data.metadata?.reasoning, suggestedFirstReply: data.metadata?.suggestedFirstReply, needsFactCheck: data.metadata?.needsFactCheck });
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Regenerating failed."))
      .finally(() => setRegenerating(false));
  }

  function postNow() {
    const token = getOpsToken();
    if (!token || posting || !item) return;
    setPosting(true);
    setError(null);
    apiFetch<{ tweetUrl?: string; postUrl?: string }>(
      cfg.postEndpoint(item.id),
      { method: "POST", body: JSON.stringify({ content: text }) },
      token
    )
      .then((data) => {
        const url = data.tweetUrl ?? data.postUrl ?? "";
        setPostedUrl(url);
        onPosted(item.id, url);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Posting failed."))
      .finally(() => setPosting(false));
  }

  function markComplete() {
    const token = getOpsToken();
    if (!token || markingDone || !item) return;
    setMarkingDone(true);
    setError(null);
    apiFetch(`/api/v1/ops/feed/${item.id}/done`, { method: "POST" }, token)
      .then(() => {
        onDone?.();
        onClose();
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Marking done failed."))
      .finally(() => setMarkingDone(false));
  }

  const iconBtnStyle = { width: 30, height: 30, display: "grid" as const, placeItems: "center" as const, background: "transparent", border: "1px solid #3d3d44", borderRadius: 8, color: C.dim, cursor: "pointer" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(560px,58vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 0 auto", height: 54, display: "flex", alignItems: "center", gap: 8, padding: "0 16px", borderBottom: "1px solid #27272b" }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: cfg.iconBg, display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 700, color: "#fff" }}>{cfg.iconLabel}</span>
          <span style={{ fontSize: 15, fontWeight: 500, color: C.bright }}>{cfg.label}</span>
          <div style={{ flex: 1 }} />
          {checkingIdentity && (
            <span style={{ height: 26, padding: "0 10px", display: "inline-flex", alignItems: "center", gap: 6, background: "#182233", border: "1px solid #2a4066", borderRadius: 7, color: "#7ea6e0", fontSize: 11.5 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "kanso-spin 0.9s linear infinite" }}><path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" /></svg>
              Checking...
            </span>
          )}
          {!postedUrl && (
            <>
              <button
                onClick={markComplete}
                disabled={markingDone}
                className="kanso-ghost-btn"
                style={{ height: 30, padding: "0 13px", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #3d3d44", borderRadius: 8, color: markingDone ? C.dimmer : C.body2, fontSize: 12.5, cursor: markingDone ? "default" : "pointer" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7" /></svg>
                {markingDone ? "..." : "Mark Complete"}
              </button>
              <div style={{ width: 1, height: 20, background: "#34343a", margin: "0 2px" }} />
              <button onClick={copyText} title="Copy text" style={iconBtnStyle}>
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
                )}
              </button>
              <button onClick={regenerate} disabled={regenerating} title="Regenerate this draft" style={{ ...iconBtnStyle, color: regenerating ? C.dimmer : C.dim }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={regenerating ? { animation: "kanso-spin 0.9s linear infinite" } : undefined}>
                  <path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" />
                </svg>
              </button>
              <div style={{ width: 1, height: 20, background: "#34343a", margin: "0 2px" }} />
              {cfg.composeIntentUrl && (
                <button
                  onClick={openComposeIntent}
                  className="kanso-ghost-btn"
                  style={{ height: 30, padding: "0 13px", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #3d3d44", borderRadius: 8, color: C.body2, fontSize: 12.5, cursor: "pointer" }}
                >
                  Preview on X
                </button>
              )}
              <button
                onClick={postNow}
                disabled={posting}
                className="kanso-white-btn"
                style={{ height: 30, padding: "0 13px", background: posting ? "#3d3d44" : "#fafafc", border: "none", borderRadius: 8, color: posting ? C.dim : "#18181a", fontSize: 12.5, fontWeight: 500, cursor: posting ? "default" : "pointer" }}
              >
                {posting ? "Posting..." : "Post now"}
              </button>
            </>
          )}
          <button onClick={onClose} className="kanso-danger-btn" style={{ width: 26, height: 26, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" }}>{CloseIcon}</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 40px" }}>
          {meta.angle && (
            <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: C.dim, marginBottom: 14 }}>{meta.angle}</div>
          )}
          <div style={{ background: "#1a1a1c", border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              {identity?.profileImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={identity.profileImageUrl} alt="" width={36} height={36} style={{ borderRadius: "50%", flex: "none" }} />
              ) : (
                <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#232326", display: "grid", placeItems: "center", fontSize: 13, color: C.dim, flex: "none" }}>@</span>
              )}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: C.bright }}>{identity?.name ?? "Fermor"}</span>
                  {identity?.verified && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d9bf0" stroke="none"><path d="M12 2l2.4 1.3 2.7-.4 1.3 2.4 2.4 1.3-.4 2.7 1.3 2.4-1.3 2.4.4 2.7-2.4 1.3-1.3 2.4-2.7-.4L12 22l-2.4-1.3-2.7.4-1.3-2.4-2.4-1.3.4-2.7L2.3 12l1.3-2.4-.4-2.7 2.4-1.3 1.3-2.4 2.7.4z" /><path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                </div>
                <div style={{ fontSize: 12, color: C.dim }}>{identity?.username ? `@${identity.username}` : identity ? "Connected account" : "Draft"} &middot; not yet posted</div>
              </div>
            </div>
            {postedUrl ? (
              <div style={{ fontSize: 14.5, color: C.body, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{text}</div>
            ) : (
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={1}
                style={{ width: "100%", background: "transparent", border: "none", outline: "none", resize: "none", overflowY: "hidden", fontFamily: "inherit", fontSize: 14.5, color: C.body, lineHeight: 1.6 }}
              />
            )}
          </div>
          <div style={{ marginTop: 10, fontSize: 11.5, color: cfg.charLimit && text.length > cfg.charLimit ? "#e0857f" : C.faint }}>
            {text.length}{cfg.charLimit ? ` / ${cfg.charLimit} characters` : " characters"}
          </div>

          {meta.reasoning && (
            <div style={{ marginTop: 18, padding: "13px 15px", background: "#1a1a1c", border: `1px solid ${C.border}`, borderRadius: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.dim, marginBottom: 6 }}>Why this works</div>
              <div style={{ fontSize: 12.5, color: C.body2, lineHeight: 1.6 }}>{meta.reasoning}</div>
            </div>
          )}

          {meta.suggestedFirstReply && (
            <div style={{ marginTop: 12, padding: "13px 15px", background: "#1a1a1c", border: `1px solid ${C.border}`, borderRadius: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.dim, marginBottom: 6 }}>Suggested first reply</div>
              <div style={{ fontSize: 12.5, color: C.body2, lineHeight: 1.6 }}>{meta.suggestedFirstReply}</div>
            </div>
          )}

          {meta.needsFactCheck && (
            <div style={{ marginTop: 12, padding: "13px 15px", background: "#241c11", border: "1px solid #4a3820", borderRadius: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#e0a84f", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e0a84f", flexShrink: 0 }} />
                Verify before posting
              </div>
              <div style={{ fontSize: 12.5, color: "#c9a878", lineHeight: 1.6 }}>{meta.needsFactCheck}</div>
            </div>
          )}

          {error && (
            <div style={{ marginTop: 16, padding: "10px 12px", background: "#1a1211", border: "1px solid #3a2523", borderRadius: 8, fontSize: 12.5, color: "#9c6b68" }}>{error}</div>
          )}

          {postedUrl && (
            <div style={{ marginTop: 16, padding: "14px", background: "#12211a", border: "1px solid #2d4a35", borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#4ade80", marginBottom: 8 }}>{cfg.postedLabel}</div>
              <a href={postedUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#4ade80" }}>{postedUrl}</a>
            </div>
          )}

          {!postedUrl && (
            <div style={{ marginTop: 24, fontSize: 12, color: C.faint, lineHeight: 1.6 }}>
              Edit the text above directly if you want to change it.{" "}
              {cfg.composeIntentUrl && (
                <><strong style={{ color: C.dim }}>Preview on X</strong> opens X&apos;s own compose window with this text filled in, so you can review and post it yourself from there. </>
              )}
              <strong style={{ color: C.dim }}>Post now</strong> posts it immediately through Fermor&apos;s connected account, with no further review step.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// A real preview overlay for every agent's items, not just X/LinkedIn's compose-style
// one -- SEO, GEO, Articles, HN, Reddit, and Competitor Pulse items previously only
// expanded inline in a cramped accordion row. Deliberately a separate, simpler
// component from SocialPostPreviewOverlay rather than forcing every agent into that
// one's compose/edit/post UI, which only makes sense for a draft you're about to
// publish -- these are recommendations and findings, not posts.
export type FeedPreviewItem = {
  id: string;
  title: string;
  content: string;
  impact?: string;
  angle?: string;
  reasoning?: string;
  needsFactCheck?: string;
  permalink?: string;
  mentionsProduct?: boolean;
  // Hacker News's real submission-package fields (see hackernews-agent.ts) -- shown
  // here since this is the one place a person actually reviews a draft before acting
  // on it.
  firstComment?: string;
  timingGuidance?: string;
  commentStrategy?: { question: string; answer: string }[];
};

function PreviewH3({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", margin: "22px 0 8px", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: C.dim }}>{children}</h3>;
}

export function FeedItemPreviewOverlay({
  item,
  agentName,
  isCopyable,
  isRedditAgent,
  onClose,
  onCopy,
  copied,
  onDone,
  actingOn,
}: {
  item: FeedPreviewItem | null;
  agentName: string;
  isCopyable: boolean;
  isRedditAgent: boolean;
  onClose: () => void;
  onCopy: () => void;
  copied: boolean;
  onDone: () => void;
  actingOn: boolean;
}) {
  if (!item) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(640px,54vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 0 auto", height: 54, display: "flex", alignItems: "center", gap: 11, padding: "0 16px", borderBottom: "1px solid #27272b" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.dim }}>{agentName}</span>
          <div style={{ flex: 1 }} />
          {isCopyable && (
            <button onClick={onCopy} title="Copy" className="kanso-icon-btn" style={{ ...iconBtn, color: copied ? "#4ade80" : C.dim }}>
              {copied ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
              )}
            </button>
          )}
          {isRedditAgent && item.permalink && (
            <a href={item.permalink} target="_blank" rel="noopener noreferrer" title="View real thread" className="kanso-icon-btn" style={iconBtn}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
            </a>
          )}
          <button onClick={onDone} disabled={actingOn} title="Mark done" className="kanso-icon-btn" style={{ ...iconBtn, color: actingOn ? C.faint : C.dim }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9.5" /></svg>
          </button>
          <button onClick={onClose} className="kanso-danger-btn" style={iconBtn}>{CloseIcon}</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 34px 50px" }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6, flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, ...sora, fontWeight: 600, fontSize: 21, lineHeight: 1.35, color: C.bright, letterSpacing: "-0.015em" }}>{item.title}</h1>
              {item.impact && (
                <span style={{ flex: "none", fontSize: 11, fontWeight: 600, color: C.dim, background: "#232326", border: `1px solid ${C.border}`, borderRadius: 6, padding: "2px 8px" }}>{item.impact}</span>
              )}
            </div>
            {item.needsFactCheck && (
              <div style={{ marginBottom: 14, fontSize: 12, color: "#e0a95e" }}>Needs fact-check: {item.needsFactCheck}</div>
            )}
            {item.mentionsProduct && (
              <div style={{ marginBottom: 14, fontSize: 12, color: "#4ade80" }}>Mentions fermor.in -- check it reads naturally before posting.</div>
            )}
            <Rule />
            <div style={{ whiteSpace: "pre-wrap", fontSize: 13.5, lineHeight: 1.8, color: C.body2 }}>{item.content}</div>

            {item.reasoning && (
              <>
                <PreviewH3>Why this angle</PreviewH3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: C.body2 }}>{item.reasoning}</p>
              </>
            )}
            {item.firstComment && (
              <>
                <PreviewH3>First comment to post</PreviewH3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: C.body2, whiteSpace: "pre-wrap" }}>{item.firstComment}</p>
              </>
            )}
            {item.timingGuidance && (
              <>
                <PreviewH3>Timing</PreviewH3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: C.body2 }}>{item.timingGuidance}</p>
              </>
            )}
            {item.commentStrategy && item.commentStrategy.length > 0 && (
              <>
                <PreviewH3>Anticipated questions</PreviewH3>
                {item.commentStrategy.map((qa, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.bright, marginBottom: 3 }}>{qa.question}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.7, color: C.body2 }}>{qa.answer}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "Xw ago" style relative time from a real ISO timestamp -- computed at render time
// (not frozen at draft time), so it stays accurate the longer a draft sits in the feed.
function relativeTime(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const week = Math.floor(day / 7);
  if (week < 5) return `${week}w ago`;
  const month = Math.floor(day / 30);
  if (month < 12) return `${month}mo ago`;
  return `${Math.floor(day / 365)}y ago`;
}

export type RedditOpportunityItem = {
  id: string;
  content: string;
  threadTitle: string;
  postSelftext: string;
  subreddit: string;
  author: string | null;
  postedAt: string | null;
  permalink: string;
  mentionsProduct?: boolean;
  needsFactCheck?: string;
};

// A dedicated detail panel for Reddit specifically, not a Reddit-flavored branch of
// FeedItemPreviewOverlay above -- the real post (its own subreddit/author/age/body) and
// the suggested reply are two genuinely separate real things being reviewed together,
// which reads much more clearly as two distinct cards than as one flowing document.
// Deliberately has no upvote/comment counts: this project's Reddit data comes from
// Reddit's public RSS feed (see reddit.ts), which genuinely doesn't include those
// numbers -- getting real ones would need Reddit's OAuth API instead, a separate real
// decision, not something to fake here with an invented number.
export function RedditOpportunityOverlay({
  item,
  onClose,
  onDone,
  actingOn,
  onRegenerate,
  regenerating,
}: {
  item: RedditOpportunityItem | null;
  onClose: () => void;
  onDone: () => void;
  actingOn: boolean;
  onRegenerate: () => void;
  regenerating: boolean;
}) {
  const [commented, setCommented] = useState(false);
  useEffect(() => {
    setCommented(false);
  }, [item?.id]);

  if (!item) return null;
  const age = relativeTime(item.postedAt);

  function commentNow() {
    if (!item) return;
    navigator.clipboard.writeText(item.content).then(() => {
      setCommented(true);
      window.open(item.permalink, "_blank", "noopener,noreferrer");
    });
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(640px,54vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 0 auto", height: 54, display: "flex", alignItems: "center", gap: 11, padding: "0 16px", borderBottom: "1px solid #27272b" }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#ff4500", display: "grid", placeItems: "center", flex: "none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="10" /></svg>
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>Reddit Opportunities</span>
          <div style={{ flex: 1 }} />
          <button
            onClick={onDone}
            disabled={actingOn}
            className="kanso-white-btn"
            style={{ height: 30, padding: "0 13px", display: "inline-flex", alignItems: "center", gap: 6, background: actingOn ? "#2a2a2e" : "#fafafc", border: "none", borderRadius: 8, color: actingOn ? C.faint : "#18181a", fontSize: 12.5, fontWeight: 500, cursor: actingOn ? "default" : "pointer" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7" /></svg>
            {actingOn ? "..." : "Mark Complete"}
          </button>
          <button onClick={onClose} className="kanso-danger-btn" style={iconBtn}>{CloseIcon}</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 50px" }}>
          <div style={{ maxWidth: 620, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, background: "#1b1b1d", padding: "16px 18px" }}>
              <div style={{ fontSize: 12, color: C.dim, marginBottom: 10 }}>
                r/{item.subreddit}
                {item.author && <> &middot; Posted by u/{item.author}</>}
                {age && <> &middot; {age}</>}
              </div>
              {item.needsFactCheck && (
                <div style={{ marginBottom: 10, fontSize: 12, color: "#e0a95e" }}>Needs fact-check: {item.needsFactCheck}</div>
              )}
              {item.mentionsProduct && (
                <div style={{ marginBottom: 10, fontSize: 12, color: "#4ade80" }}>Mentions fermor.in -- check it reads naturally before posting.</div>
              )}
              <h2 style={{ margin: "0 0 8px", ...sora, fontWeight: 600, fontSize: 17, lineHeight: 1.4, color: C.bright }}>{item.threadTitle}</h2>
              {item.postSelftext && (
                <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.75, color: C.body2, whiteSpace: "pre-wrap" }}>{item.postSelftext}</p>
              )}
              <a href={item.permalink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.dim, textDecoration: "none" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14 21 3" /></svg>
                Open in Reddit
              </a>
            </div>

            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, background: "#1b1b1d", padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: C.dim }}>Suggested reply</span>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: "#4ade80", background: "#122117", border: "1px solid #1f3d2c", borderRadius: 5, padding: "1px 7px" }}>suggested</span>
              </div>
              <p style={{ margin: "0 0 14px", fontSize: 13.5, lineHeight: 1.8, color: C.body2, whiteSpace: "pre-wrap" }}>{item.content}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={commentNow}
                  className="kanso-white-btn"
                  style={{ height: 30, padding: "0 13px", display: "inline-flex", alignItems: "center", gap: 6, background: commented ? "#122117" : "#fafafc", border: commented ? "1px solid #1f3d2c" : "none", borderRadius: 8, color: commented ? "#4ade80" : "#18181a", fontSize: 12.5, fontWeight: 500, cursor: "pointer" }}
                >
                  {commented ? "Copied -- reply on Reddit to finish" : "Comment Now"}
                </button>
                <button
                  onClick={onRegenerate}
                  disabled={regenerating}
                  className="kanso-ghost-btn"
                  style={{ height: 30, padding: "0 13px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 8, color: regenerating ? C.dimmer : C.body2, fontSize: 12.5, cursor: regenerating ? "default" : "pointer" }}
                >
                  {regenerating ? "Rewriting..." : "Rewrite"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type GeoFindingItem = {
  id: string;
  title: string;
  findingType: "technical" | "citation_gap";
  severity: "Critical" | "High" | "Medium" | "Low";
  query: string | null;
  competitor: string | null;
  whatsHappening: string;
  codeableFixes: string[];
  contentFixes: string[];
  priorities: { title: string; impact: string }[];
};

function GeoTag({ children, color, bg, border }: { children: React.ReactNode; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, border: `1px solid ${border}`, borderRadius: 5, padding: "2px 8px" }}>{children}</span>
  );
}

function GeoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.bright, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

// A dedicated detail panel for GEO's structured findings (see geo-agent.ts) -- a
// citation gap (a real, currently-tracked competitor Claude judges more likely to be
// cited for a real test query) or a real technical finding (a real llms.txt/robots.txt
// check), each broken into the same "what's happening / codeable fixes / content fixes
// / this week's priorities" structure rather than one flowing document, matching the
// real reference design. A plain GEO recommendation (no structured fields) never opens
// this overlay -- see AgentsFeedPanel's own generic-row fallback for those.
export function GeoFindingOverlay({
  item,
  onClose,
  onDone,
  actingOn,
  onAskCmo,
}: {
  item: GeoFindingItem | null;
  onClose: () => void;
  onDone: () => void;
  actingOn: boolean;
  onAskCmo: (question: string) => void;
}) {
  if (!item) return null;
  const severityColors =
    item.severity === "Critical"
      ? { color: "#ff6666", bg: "#301416", border: "#5a2226" }
      : item.severity === "Medium"
      ? { color: "#e0a95e", bg: "#2a2416", border: "#4d3a1c" }
      : item.severity === "Low"
      ? { color: C.dimmer, bg: "#232326", border: C.border }
      : { color: "#f28b82", bg: "#2c1a19", border: "#4a2624" };

  function askCmo() {
    const question =
      item!.findingType === "citation_gap"
        ? `Help me prioritize this GEO citation gap: "${item!.title}". ${item!.whatsHappening}`
        : `Help me prioritize this GEO technical fix: "${item!.title}". ${item!.whatsHappening}`;
    onAskCmo(question);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(640px,54vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 0 auto", height: 54, display: "flex", alignItems: "center", gap: 11, padding: "0 16px", borderBottom: "1px solid #27272b" }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#7c3aed", display: "grid", placeItems: "center", flex: "none" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="M12 3.2l2.1 5.4 5.4 2.1-5.4 2.1L12 18.2l-2.1-5.4L4.5 10.7l5.4-2.1z" /></svg>
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>{item.findingType === "citation_gap" ? "GEO Citation Gap" : "GEO Technical Finding"}</span>
          <div style={{ flex: 1 }} />
          <button onClick={askCmo} className="kanso-ghost-btn" style={{ height: 28, padding: "0 12px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: C.body2, fontSize: 12, cursor: "pointer" }}>
            Ask CMO
          </button>
          <button
            onClick={onDone}
            disabled={actingOn}
            title="Mark done"
            className="kanso-icon-btn"
            style={{ ...iconBtn, color: actingOn ? C.faint : C.dim }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9.5" /></svg>
          </button>
          <button onClick={onClose} className="kanso-danger-btn" style={iconBtn}>{CloseIcon}</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 50px" }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <GeoTag {...severityColors}>{item.severity}</GeoTag>
              <GeoTag color={C.dim} bg="#232326" border={C.border}>{item.findingType === "citation_gap" ? "Citation Gap" : "Technical"}</GeoTag>
              {item.competitor && <GeoTag color={C.dim} bg="#232326" border={C.border}>{item.competitor}</GeoTag>}
            </div>
            {item.query && <div style={{ fontSize: 12.5, color: C.dim, marginBottom: 18 }}>Query: {item.query}</div>}

            <h2 style={{ margin: "0 0 4px", ...sora, fontWeight: 600, fontSize: 19, lineHeight: 1.4, color: C.bright }}>{item.title}</h2>

            <GeoSection title="What's happening">
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, color: C.body2 }}>{item.whatsHappening}</p>
            </GeoSection>

            {item.codeableFixes.length > 0 && (
              <GeoSection title="Codeable fixes">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {item.codeableFixes.map((f, i) => (
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.8, color: C.body2, marginBottom: 6 }}>{f}</li>
                  ))}
                </ul>
              </GeoSection>
            )}

            {item.contentFixes.length > 0 && (
              <GeoSection title="Content & distribution fixes">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {item.contentFixes.map((f, i) => (
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.8, color: C.body2, marginBottom: 6 }}>{f}</li>
                  ))}
                </ul>
              </GeoSection>
            )}

            {item.priorities.length > 0 && (
              <GeoSection title="This week's priorities">
                <ol style={{ margin: 0, paddingLeft: 18 }}>
                  {item.priorities.map((p, i) => (
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.8, color: C.body2, marginBottom: 6 }}>
                      <strong style={{ color: C.bright, fontWeight: 600 }}>{p.title}</strong> &mdash; {p.impact}
                    </li>
                  ))}
                </ol>
              </GeoSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export type SeoRecommendationItem = {
  id: string;
  title: string;
  content: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  category: "On-Page" | "Technical" | "Content" | "Performance";
  page: string;
  overview: string;
  steps: { title: string; code: string | null; explanation: string }[];
  expectedImpact: { label: string; description: string }[];
};

// Reference design shows a code block per step -- rendered here as real, selectable
// monospace text (not a syntax highlighter dependency this app doesn't otherwise have),
// matching the JetBrains Mono treatment already used throughout Kanso's own UI.
function CodeBlock({ code }: { code: string }) {
  return (
    <pre style={{ margin: "8px 0", padding: "12px 14px", background: "#0f0e0d", border: `1px solid ${C.border}`, borderRadius: 8, overflowX: "auto", fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace", fontSize: 12, lineHeight: 1.7, color: "#c9e8c0", whiteSpace: "pre" }}>
      {code}
    </pre>
  );
}

// A dedicated detail panel for SEO's structured recommendations (see seo-agent.ts) --
// a real page, an overview, step-by-step fixes (with real suggested code Claude drafts
// itself, grounded in the real product info given), and expected impact, matching a
// real reference design. Deliberately titled "SEO Recommendation" rather than the
// reference's combined "SEO & GEO Recommendations" -- this project keeps SEO and GEO as
// two separate agents with their own separate detail panels (GeoFindingOverlay above),
// so a merged title would misrepresent this app's own architecture rather than describe
// it. A plain/older SEO recommendation (no `category`) never opens this overlay -- see
// AgentsFeedPanel's own generic-row fallback for those.
export function SeoRecommendationOverlay({
  item,
  onClose,
  onDone,
  actingOn,
  onAskCmo,
}: {
  item: SeoRecommendationItem | null;
  onClose: () => void;
  onDone: () => void;
  actingOn: boolean;
  onAskCmo: (question: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => setCopied(false), [item?.id]);

  if (!item) return null;
  const sc =
    item.severity === "Critical"
      ? { color: "#ff6666", bg: "#301416", border: "#5a2226" }
      : item.severity === "Medium"
      ? { color: "#e0a95e", bg: "#2a2416", border: "#4d3a1c" }
      : item.severity === "Low"
      ? { color: C.dimmer, bg: "#232326", border: C.border }
      : { color: "#f28b82", bg: "#2c1a19", border: "#4a2624" };

  function copyOverview() {
    navigator.clipboard.writeText(item!.overview).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(640px,54vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 0 auto", height: 54, display: "flex", alignItems: "center", gap: 11, padding: "0 16px", borderBottom: "1px solid #27272b" }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#2563eb", display: "grid", placeItems: "center", flex: "none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>SEO Recommendation</span>
          <div style={{ flex: 1 }} />
          <button onClick={() => onAskCmo(`Help me prioritize this SEO fix: "${item.title}". ${item.overview}`)} className="kanso-ghost-btn" style={{ height: 28, padding: "0 12px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: C.body2, fontSize: 12, cursor: "pointer" }}>
            Fix with CMO
          </button>
          <button onClick={copyOverview} title="Copy overview" className="kanso-icon-btn" style={{ ...iconBtn, color: copied ? "#4ade80" : C.dim }}>
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
            )}
          </button>
          <button
            onClick={onDone}
            disabled={actingOn}
            title="Mark done"
            className="kanso-icon-btn"
            style={{ ...iconBtn, color: actingOn ? C.faint : C.dim }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><polyline points="8 12.5 11 15.5 16 9.5" /></svg>
          </button>
          <button onClick={onClose} className="kanso-danger-btn" style={iconBtn}>{CloseIcon}</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 50px" }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <GeoTag {...sc}>{item.severity}</GeoTag>
              <GeoTag color={C.dim} bg="#232326" border={C.border}>{item.category}</GeoTag>
              <GeoTag color={C.blue} bg="#16233a" border="#28406b">{item.page}</GeoTag>
            </div>

            <h2 style={{ margin: "0 0 18px", ...sora, fontWeight: 600, fontSize: 19, lineHeight: 1.4, color: C.bright }}>{item.title}</h2>

            <GeoSection title="Overview">
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.8, color: C.body2 }}>{item.overview}</p>
            </GeoSection>

            {item.steps.length > 0 && (
              <GeoSection title="Steps">
                {item.steps.map((s, i) => (
                  <div key={i} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.bright, marginBottom: 4 }}>{s.title}</div>
                    {s.code && <CodeBlock code={s.code} />}
                    <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.7, color: C.body2 }}>{s.explanation}</p>
                  </div>
                ))}
              </GeoSection>
            )}

            {item.expectedImpact.length > 0 && (
              <GeoSection title="Expected Impact">
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {item.expectedImpact.map((e, i) => (
                    <li key={i} style={{ fontSize: 13, lineHeight: 1.8, color: C.body2, marginBottom: 6 }}>
                      <strong style={{ color: C.bright, fontWeight: 600 }}>{e.label}</strong>: {e.description}
                    </li>
                  ))}
                </ul>
              </GeoSection>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-+|-+$)/g, "");
}

// Recursively pulls plain text out of ReactMarkdown's children (which can be a string,
// an array, or nested elements when a heading has inline formatting) -- needed so a
// heading's real `id` and the Table of Contents' own link both slugify the exact same
// text, without adding rehype-slug as a new dependency just for this.
function flattenText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (node && typeof node === "object" && "props" in (node as any)) return flattenText((node as any).props.children);
  return "";
}

type Heading = { level: 2 | 3; text: string; slug: string };

// Parsed directly from the article's own real markdown source (not asked of Claude as
// a separate written section) -- guarantees the Table of Contents can never drift out
// of sync with the headings actually in the article, the way two independently-written
// lists could.
function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of markdown.split("\n")) {
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!m) continue;
    const text = m[2].trim();
    headings.push({ level: m[1].length as 2 | 3, text, slug: slugify(text) });
  }
  return headings;
}

const ARTICLE_MD_COMPONENTS = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 id={slugify(flattenText(children))} style={{ ...sora, margin: "0 0 18px", fontSize: 23, fontWeight: 600, lineHeight: 1.35, color: C.bright, letterSpacing: "-0.015em" }}>{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 id={slugify(flattenText(children))} style={{ ...sora, margin: "30px 0 12px", fontSize: 17.5, fontWeight: 600, color: C.bright, scrollMarginTop: 16 }}>{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 id={slugify(flattenText(children))} style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", margin: "20px 0 10px", fontSize: 14.5, fontWeight: 600, color: C.bright, scrollMarginTop: 16 }}>{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => <p style={{ margin: "0 0 16px", fontSize: 13.5, lineHeight: 1.85, color: C.body2 }}>{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: C.bright, fontWeight: 600 }}>{children}</strong>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol style={{ margin: "0 0 16px", paddingLeft: 20 }}>{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li style={{ fontSize: 13.5, lineHeight: 1.8, color: C.body2, marginBottom: 6 }}>{children}</li>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.blue, textDecoration: "underline" }}>{children}</a>
  ),
  hr: () => <div style={{ height: 1, background: C.rowBorder2, margin: "26px 0" }} />,
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{ margin: "0 0 16px", padding: "2px 14px", borderLeft: "2px solid #27272b", fontStyle: "italic", color: C.body2, fontSize: 13.5, lineHeight: 1.8 }}>{children}</blockquote>
  ),
};

export type ArticleItem = { id: string; title: string; content: string; keyword?: string | null; wordCount?: number | null };

// A dedicated full-article reading view -- the generic FeedItemPreviewOverlay showed
// this content as raw preformatted text (literal "#"/"##" characters, no real
// headings/lists), which is why Articles gets its own real Markdown-rendered overlay
// here instead. The Table of Contents is real and functional (parsed from the
// article's own headings, real click-to-scroll via scrollIntoView), not decorative.
// "Publish" and inline "Edit" from the reference design were deliberately not built --
// Publish implies a real CMS/site-publishing integration this project has none of, and
// a persisted edit needs a new save endpoint that doesn't exist yet; both are real,
// separate features to build on purpose, not something to fake with a dead button.
export function ArticleOverlay({
  item,
  onClose,
  onDone,
  actingOn,
}: {
  item: ArticleItem | null;
  onClose: () => void;
  onDone: () => void;
  actingOn: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => setCopied(false), [item?.id]);

  if (!item) return null;
  const headings = extractHeadings(item.content);

  function copyMarkdown() {
    navigator.clipboard.writeText(item!.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function downloadMarkdown() {
    const blob = new Blob([item!.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(item!.title) || "article"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function navigateTo(slug: string) {
    scrollRef.current?.querySelector(`#${CSS.escape(slug)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.72)", zIndex: 40, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ flex: 1 }} />
      <div className="kanso-fade-in" style={{ width: "min(720px,58vw)", height: "100%", background: "#18181a", borderLeft: "1px solid #34343a", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: "0 0 auto", height: 54, display: "flex", alignItems: "center", gap: 11, padding: "0 16px", borderBottom: "1px solid #27272b" }}>
          <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#8b5cf6", display: "grid", placeItems: "center", flex: "none" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M6.2 3.4h8.6l4 4v13.2H6.2zM14.8 3.4v4h4M9.2 12.4h7M9.2 16.2h5" /></svg>
          </span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.bright }}>Articles</span>
          <div style={{ flex: 1 }} />
          <button
            onClick={onDone}
            disabled={actingOn}
            className="kanso-ghost-btn"
            style={{ height: 28, padding: "0 12px", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: actingOn ? C.dimmer : C.body2, fontSize: 12, cursor: actingOn ? "default" : "pointer" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7" /></svg>
            {actingOn ? "..." : "Mark Complete"}
          </button>
          <button onClick={copyMarkdown} title="Copy Markdown" className="kanso-icon-btn" style={{ ...iconBtn, color: copied ? "#4ade80" : C.dim }}>
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
            )}
          </button>
          <button onClick={downloadMarkdown} title="Download as .md" className="kanso-icon-btn" style={iconBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 11l5 5 5-5M4 21h16" /></svg>
          </button>
          <button onClick={onClose} className="kanso-danger-btn" style={iconBtn}>{CloseIcon}</button>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto" }}>
          {/* Purely decorative hero banner (a color treatment, not a real photo this
              project has no real image source for) -- matches the reference design's
              visual weight without fabricating a stock image. */}
          <div style={{ height: 200, background: "linear-gradient(135deg, #1a1a1c 0%, #0f0e0d 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 36px", textAlign: "center" }}>
            <div style={{ ...sora, fontSize: 22, fontWeight: 600, lineHeight: 1.4, color: "#fff" }}>{item.title}</div>
          </div>

          <div style={{ padding: "28px 32px 60px" }}>
            <div style={{ maxWidth: 640, margin: "0 auto" }}>
              {typeof item.wordCount === "number" && (
                <div style={{ fontSize: 11.5, color: C.faint, marginBottom: 16 }}>{item.wordCount.toLocaleString()} words{item.keyword ? ` · targets "${item.keyword}"` : ""}</div>
              )}

              {headings.length > 0 && (
                <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: C.bright, marginBottom: 10 }}>Table of Contents</div>
                  <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
                    {headings.map((h) => (
                      <li key={h.slug} style={{ marginBottom: 6, paddingLeft: h.level === 3 ? 16 : 0 }}>
                        <a
                          href={`#${h.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigateTo(h.slug);
                          }}
                          style={{ fontSize: h.level === 3 ? 12.5 : 13, color: C.blue, textDecoration: "underline", cursor: "pointer" }}
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ReactMarkdown remarkPlugins={[remarkGfm]} components={ARTICLE_MD_COMPONENTS}>
                {item.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,.78)", zIndex: 45, display: "grid", placeItems: "center", padding: 40 }}>
      <div className="kanso-rise-in" style={{ width: "min(900px,92vw)", maxHeight: "88vh", background: "#18181a", border: "1px solid #34343a", borderRadius: 14, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", borderBottom: "1px solid #27272b" }}>
          <span style={{ width: 24, height: 24, borderRadius: 7, background: "#e11d48", display: "grid", placeItems: "center" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"><polygon points="10 8 16 12 10 16" fill="#fff" /><rect x="3" y="4" width="18" height="16" rx="2" /></svg>
          </span>
          <span style={{ fontSize: 13.5, color: "#f2f2f5" }}>Fermor: <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 12.5, color: C.body3 }}>tax-regime-explainer</span></span>
          <div style={{ flex: 1 }} />
          <button className="kanso-green-btn" style={{ height: 30, padding: "0 13px", display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", border: "1px solid #1f3d2c", borderRadius: 8, color: C.green, fontSize: 12.5, cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7" /></svg>Mark Complete
          </button>
          <button className="kanso-ghost-btn" style={{ height: 30, padding: "0 13px", display: "inline-flex", alignItems: "center", gap: 7, background: "transparent", border: "1px solid #3d3d44", borderRadius: 8, color: C.body2, fontSize: 12.5, cursor: "pointer" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 11l5 5 5-5M4 21h16" /></svg>Download
          </button>
          <button onClick={onClose} className="kanso-danger-btn" style={{ width: 28, height: 28, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 7, color: C.dim, cursor: "pointer" }}>{CloseIcon}</button>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div style={{ borderRight: "1px solid #27272b", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ flex: 1, minHeight: 250, background: "#0a0a0a", border: "1px solid #27272b", borderRadius: 10, display: "grid", placeItems: "center" }}>
              <div style={{ width: "52%", aspectRatio: "9/16", background: "#1f1f21", border: "1px dashed #3d3d44", borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5f5f68" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="1.8" /><path d="m3 17 5-5 4 4 3-3 6 6" /></svg>
                <span style={{ fontSize: 11, color: C.faint, textAlign: "center", lineHeight: 1.5, padding: "0 14px" }}>Rendered vertical clip<br />drops in here</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: C.dim }}>
              <span>480p</span><span>9:16</span><span>Reels / Shorts</span>
              <div style={{ flex: 1 }} />
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.green }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />Ready</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", padding: "13px 16px", borderBottom: "1px solid #27272b" }}>
              <span style={{ fontSize: 13, color: "#f2f2f5" }}>Script</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: C.dimmer }}>1,284 chars</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "15px 16px 20px", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11.5, lineHeight: 1.85, color: C.body3 }}>
              <p style={{ margin: "0 0 13px" }}>A person in their late twenties at a small desk, phone propped against a laptop, filming themselves in vertical UGC style. Natural window light, unpolished and lived-in.</p>
              <p style={{ margin: "0 0 13px" }}>They open with: &ldquo;I paid ₹18,000 more tax than I had to last year.&rdquo; Beat. &ldquo;Because nobody told me the new regime was better for my salary.&rdquo;</p>
              <p style={{ margin: "0 0 13px" }}>Cut to a screen recording: entering a CTC figure, both regimes side by side, the difference highlighted. Eleven seconds, no signup, no ads.</p>
              <p style={{ margin: "0 0 13px" }}>Back to camera: &ldquo;It shows you the formula. Every assumption. And it doesn&apos;t sell you anything: no commission, no nudges.&rdquo;</p>
              <p style={{ margin: 0 }}>Close: &ldquo;Run your own numbers. It&apos;s free.&rdquo; Text overlay: <span style={{ color: C.teal }}>fermor.in</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { C, mono } from "./ui";
import { KansoMarkIcon } from "./icons";
import { apiFetch, getOpsToken } from "@/lib/api";

type Msg = { cmo: boolean; text: string };

// The CMO chat can return a real Markdown table (a genuine data breakdown, the exact
// columns a question asked for) or a real recommendations list -- rendering these as
// plain preformatted text would show literal pipe characters and ## marks instead of
// an actual table, exactly the same gap already fixed once for the company docs
// (Overlays.tsx). This is a smaller, chat-scoped component set rather than reusing
// that one directly -- a compact chat bubble needs lighter headings and tighter
// spacing than a full-page document.
const CHAT_MD_COMPONENTS = {
  h1: ({ children }: { children?: React.ReactNode }) => <div style={{ fontSize: 14.5, fontWeight: 600, color: C.bright, margin: "4px 0 8px" }}>{children}</div>,
  h2: ({ children }: { children?: React.ReactNode }) => <div style={{ fontSize: 13.5, fontWeight: 600, color: C.bright, margin: "14px 0 6px" }}>{children}</div>,
  h3: ({ children }: { children?: React.ReactNode }) => <div style={{ fontSize: 13, fontWeight: 600, color: C.bright, margin: "10px 0 4px" }}>{children}</div>,
  p: ({ children }: { children?: React.ReactNode }) => <p style={{ margin: "0 0 10px", fontSize: 13, lineHeight: 1.75, color: C.body2 }}>{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => <strong style={{ color: C.bright, fontWeight: 600 }}>{children}</strong>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul style={{ margin: "0 0 10px", paddingLeft: 18 }}>{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol style={{ margin: "0 0 10px", paddingLeft: 18 }}>{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li style={{ fontSize: 13, lineHeight: 1.7, color: C.body2, marginBottom: 4 }}>{children}</li>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.blue, textDecoration: "underline" }}>{children}</a>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code style={{ ...mono, fontSize: 12, background: "#232326", border: `1px solid ${C.border}`, borderRadius: 4, padding: "1px 5px", color: C.body }}>{children}</code>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote style={{ margin: "0 0 10px", padding: "2px 12px", borderLeft: "2px solid #27272b", fontStyle: "italic", color: C.body2, fontSize: 13, lineHeight: 1.7 }}>{children}</blockquote>
  ),
  hr: () => <div style={{ height: 1, background: C.rowBorder2, margin: "12px 0" }} />,
  // A real data table needs its own horizontal scroll -- this column is only ~400px
  // wide, and a wide table must scroll inside its own container rather than
  // overflowing the chat panel.
  table: ({ children }: { children?: React.ReactNode }) => (
    <div style={{ margin: "0 0 10px", overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 11.5 }}>{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => <thead>{children}</thead>,
  tr: ({ children }: { children?: React.ReactNode }) => <tr style={{ borderBottom: "1px solid #27272b" }}>{children}</tr>,
  th: ({ children }: { children?: React.ReactNode }) => (
    <th style={{ textAlign: "left", padding: "6px 10px 6px 0", color: C.bright, fontWeight: 600, whiteSpace: "nowrap" }}>{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td style={{ textAlign: "left", padding: "7px 10px 7px 0", color: C.body2, verticalAlign: "top" }}>{children}</td>
  ),
};

const INITIAL: Msg[] = [
  {
    cmo: true,
    text: "hi, i'm your cmo.\n\ni'll scan for your highest-leverage growth opportunities and keep your actions feed fresh.\n\npick any item from your actions feed or ask me what to tackle first.",
  },
];

type Props = {
  title?: string;
  subtitle?: string;
  initial?: Msg[];
  placeholder?: string;
  endpoint?: string;
  // Real suggested questions shown above the input -- clicking one only fills the
  // input box, it never auto-sends. Whether and when to actually ask it stays the
  // user's call, not something that runs on their behalf the moment they land on
  // the panel (a real, direct request, not a design nicety).
  chips?: string[];
  // Shown as the small uppercase label above each assistant reply -- "CMO" for the
  // main dashboard chat, "COMPETITIVE INTELLIGENCE AI" for the CI module's panel.
  // This used to be hardcoded to "CMO" regardless of which panel instance was
  // rendering it, which was wrong for every non-CMO reuse of this component.
  assistantLabel?: string;
  // Renders the header's collapse chevron and wires it to this callback. Left
  // undefined on the main dashboard panel, which has no collapse concept.
  onCollapse?: () => void;
  // Lets a sibling panel (e.g. a GEO finding's "Ask CMO" button) fill this chat's input
  // from outside -- same "only fills the box, never auto-sends" rule as `chips` above,
  // just triggered by a click somewhere else instead of one of this panel's own chips.
  // `nonce` exists because the exact same question could reasonably be asked twice in a
  // row (open the same finding, click Ask CMO again after editing the draft) -- a plain
  // text prop wouldn't re-trigger the effect the second time since the value wouldn't
  // have changed.
  prefill?: { text: string; nonce: number } | null;
};

// Reused, retitled, for the Competitive Intelligence module's "Ask Competitive
// Intelligence" panel (see the design handoff's own instruction to reuse this exact
// pattern rather than build a second chat component). Talks to a configurable
// `endpoint` -- CMO chat and "Ask Competitive Intelligence" each hit their own real
// backend endpoint with its own real grounding data, rather than sharing one endpoint
// with two different framings.
export default function ChatPanel({ title = "Talk to CMO", subtitle, initial, placeholder = "Ask me anything...", endpoint = "/api/v1/ops/cmo-chat", chips, assistantLabel = "CMO", onCollapse, prefill }: Props) {
  const [msgs, setMsgs] = useState<Msg[]>(initial ?? INITIAL);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [msgs, thinking]);

  useEffect(() => {
    if (!prefill) return;
    setDraft(prefill.text);
    inputRef.current?.focus();
  }, [prefill?.nonce]);

  async function send() {
    const t = draft.trim();
    if (!t) return;
    const history = msgs.map((m) => ({ role: m.cmo ? "assistant" : "user", content: m.text }));
    setMsgs((m) => [...m, { cmo: false, text: t }]);
    setDraft("");
    setThinking(true);
    try {
      const token = getOpsToken();
      const data = await apiFetch<{ reply: string }>(
        endpoint,
        { method: "POST", body: JSON.stringify({ message: t, history }) },
        token ?? undefined
      );
      setMsgs((m) => [...m, { cmo: true, text: data.reply }]);
    } catch (err) {
      setMsgs((m) => [...m, { cmo: true, text: err instanceof Error ? `(error) ${err.message}` : "(error) Could not reach the assistant right now." }]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div style={{ flex: "1 1 408px", minWidth: 340, maxWidth: 440, display: "flex", flexDirection: "column", minHeight: 0, background: "#18181a", borderLeft: "1px solid #27272b" }}>
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 15px 15px", borderBottom: "1px solid #27272b" }}>
        <span style={{ position: "relative", flex: "0 0 auto" }}>
          <span style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
            <KansoMarkIcon size={21} />
          </span>
          <span style={{ position: "absolute", top: -1, right: -1, width: 10, height: 10, borderRadius: "50%", background: C.green, border: "2px solid #18181a" }} />
        </span>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{ fontSize: 15.5, fontWeight: 700, color: "#f2f2f5", lineHeight: 1.3 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: C.dim, marginTop: 2 }}>{subtitle}</div>}
        </div>
        {onCollapse && (
          <button onClick={onCollapse} className="kanso-icon-btn" style={{ flex: "0 0 auto", width: 26, height: 26, marginTop: 3, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
          </button>
        )}
      </div>

      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "18px 15px 12px" }}>
        {/* minHeight: "100%" + justifyContent: "flex-end" belongs on this INNER,
            non-scrolling flex column, not on the scrollable element itself --
            combining display:flex/justifyContent:flex-end with overflowY:auto on
            the same element is a real, documented browser bug: once content
            overflows, the scrollable-overflow region gets computed wrong and the
            earlier messages become permanently unreachable by scrolling, not just
            hidden until you scroll up. Keeping the scroll container a plain block
            element sidesteps that entirely. */}
        <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 16 }}>
          {msgs.map((m, i) => (
            <div key={i} style={m.cmo ? { maxWidth: "100%" } : { display: "flex", justifyContent: "flex-end" }}>
              {m.cmo && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: C.dimmer, marginBottom: 8 }}>{assistantLabel}</div>}
              {m.cmo ? (
                <div style={{ fontSize: 13, lineHeight: 1.75, color: C.body2, paddingLeft: 2 }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={CHAT_MD_COMPONENTS}>{m.text}</ReactMarkdown>
                </div>
              ) : (
                <div style={{ maxWidth: "88%", padding: "11px 13px", background: "#232326", border: "1px solid #34343a", borderRadius: 14, fontSize: 13, lineHeight: 1.65, color: "#eeeef2", whiteSpace: "pre-wrap" }}>
                  {m.text}
                </div>
              )}
            </div>
          ))}
          {thinking && (
            <div style={{ display: "flex", gap: 5, paddingLeft: 2 }}>
              <span className="kanso-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: C.dimmer }} />
              <span className="kanso-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: C.dimmer, animationDelay: "0.2s" }} />
              <span className="kanso-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: C.dimmer, animationDelay: "0.4s" }} />
            </div>
          )}
        </div>
      </div>

      {chips && chips.length > 0 && (
        <div style={{ flex: "0 0 auto", padding: "6px 15px 0", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => setDraft(c)}
              className="kanso-ghost-btn"
              style={{ height: 26, padding: "0 10px", display: "inline-flex", alignItems: "center", background: "#1f1f21", border: `1px solid ${C.border}`, borderRadius: 999, fontSize: 11.5, color: C.body3, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: "0 0 auto", padding: "10px 15px 16px" }}>
        <div style={{ border: "1px solid #34343a", borderRadius: 12, background: "#1f1f21", padding: "12px 13px 9px" }}>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder={placeholder}
            style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#f2f2f5", fontFamily: "inherit", fontSize: 13, padding: "0 0 11px" }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1 }} />
            <button onClick={send} className="kanso-send-btn" style={{ width: 30, height: 30, display: "grid", placeItems: "center", background: "#2d2d31", border: "none", borderRadius: "50%", color: "#f2f2f5", cursor: "pointer" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

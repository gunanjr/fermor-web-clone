"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { C, Skeleton } from "./ui";
import { apiFetch, getOpsToken, clearOpsToken } from "@/lib/api";
import CompanyPanel, { type CompanyDocs, type DocKey } from "./CompanyPanel";
import AnalyticsPanel from "./AnalyticsPanel";
import AgentsFeedPanel from "./AgentsFeedPanel";
import ChatPanel from "./ChatPanel";
import CompetitiveIntelligenceModule from "./ci/CompetitiveIntelligenceModule";
import { DocumentOverlay, VideoOverlay, SocialPostPreviewOverlay, type SocialDraftItem } from "./Overlays";
import { KansoMarkIcon, Favicon } from "./icons";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Settings from "./Settings";

// Per-viewer, this browser only -- same convention as the Terminal's own
// clearedBefore persistence. Without this, refreshing while inside Competitive
// Intelligence silently dropped back to the normal dashboard, since ciOpen was plain
// component state with nothing remembering it across a fresh page load.
const WORKSPACE_VIEW_KEY = "kanso_workspace_view";

function loadInitialCiOpen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(WORKSPACE_VIEW_KEY) === "ci";
  } catch {
    return false;
  }
}

export default function OpsWorkspace() {
  const router = useRouter();
  // undefined = still checking, null = confirmed absent (redirecting), string = real token
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [companyOpen, setCompanyOpen] = useState(true);
  const [ciOpen, setCiOpen] = useState(loadInitialCiOpen);
  const [doc, setDoc] = useState<DocKey | null>(null);
  const [companyDocs, setCompanyDocs] = useState<CompanyDocs | null>(null);
  const [video, setVideo] = useState(false);
  const [socialDraft, setSocialDraft] = useState<{ platform: "twitter" | "linkedin"; item: SocialDraftItem } | null>(null);
  const [postedSocialIds, setPostedSocialIds] = useState<Record<string, string>>({});
  // "Ask CMO" from a GEO finding's detail panel fills the CMO chat's input from
  // outside -- see ChatPanel's own `prefill` prop comment for why a nonce is needed.
  const [cmoPrefill, setCmoPrefill] = useState<{ text: string; nonce: number } | null>(null);
  // Marking a social draft done from inside SocialPostPreviewOverlay (a sibling
  // component, not a child of AgentsFeedPanel) can't call AgentsFeedPanel's own
  // internal markDone directly -- bumping this instead re-triggers AgentsFeedPanel's
  // feed reload, the same real "something changed, refresh" signal `postedSocialIds`
  // already handles for the posted-state case.
  const [feedRefreshSignal, setFeedRefreshSignal] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  function logout() {
    clearOpsToken();
    router.replace("/ops/login");
  }

  useEffect(() => {
    try {
      localStorage.setItem(WORKSPACE_VIEW_KEY, ciOpen ? "ci" : "dashboard");
    } catch {
      // Not persisted this time (private window/blocked storage) -- the toggle still
      // works for the rest of this session, it just won't survive a refresh.
    }
  }, [ciOpen]);

  useEffect(() => {
    const existing = getOpsToken();
    if (!existing) {
      setToken(null);
      router.replace("/ops/login");
      return;
    }
    setToken(existing);
  }, [router]);

  if (!token) return null;

  return (
    <ThemeProvider>
    <div
      className="kanso-root"
      style={{
        width: "100%", height: "100vh", minHeight: 860, display: "flex", flexDirection: "column",
        background: "#18181a", color: "#f2f2f5",
        fontFamily: "var(--font-dm-sans), system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        fontSize: 13, overflow: "hidden",
      }}
    >
      <TopBar
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
        companyDocs={companyDocs}
        ciOpen={ciOpen}
        onSetCiOpen={setCiOpen}
        onOpenSettings={() => setSettingsOpen(true)}
        onLogout={logout}
      />

      {terminalOpen && <Terminal token={token} />}

      <div style={{ flex: 1, minHeight: 0, display: "flex", overflowX: "auto" }}>
        {companyOpen ? (
          <div style={{ flex: "0 0 300px", minWidth: 300, flexShrink: 0, display: "flex", flexDirection: "column", minHeight: 0, background: "#18181a", borderRight: "1px solid #27272b" }}>
            <div style={{ flex: "0 0 auto", height: 44, display: "flex", alignItems: "center", gap: 9, padding: "0 14px", borderBottom: "1px solid #27272b" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#93939c" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></svg>
              <span style={{ fontSize: 13.5, color: "#f2f2f5" }}>Company</span>
              <div style={{ flex: 1 }} />
              <button onClick={() => setCompanyOpen(false)} title="Collapse" className="kanso-icon-btn" style={{ width: 24, height: 24, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
            </div>
            <CompanyPanel onOpenDoc={(key) => setDoc(key)} onDocsLoaded={setCompanyDocs} onOpenCompetitiveIntelligence={() => setCiOpen(true)} />
          </div>
        ) : (
          <div onClick={() => setCompanyOpen(true)} className="kanso-collapsed-col" style={{ flex: "0 0 44px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 15, background: "#18181a", borderRight: "1px solid #27272b", cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#93939c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            <span style={{ writingMode: "vertical-rl", fontSize: 13.5, color: "#93939c" }}>Company</span>
          </div>
        )}

        {ciOpen ? (
          <CompetitiveIntelligenceModule onClose={() => setCiOpen(false)} companyName={companyDocs?.name} />
        ) : (
          <>
            <AnalyticsPanel />
            <AgentsFeedPanel
              onOpenStrategyDoc={() => setDoc("strategy")}
              onOpenVideo={() => setVideo(true)}
              onOpenSocialDraft={(platform, item) => setSocialDraft({ platform, item })}
              postedSocialIds={postedSocialIds}
              onAskCmo={(text) => setCmoPrefill({ text, nonce: Date.now() })}
              refreshSignal={feedRefreshSignal}
            />
            <ChatPanel prefill={cmoPrefill} />
          </>
        )}
      </div>

      <DocumentOverlay
        doc={doc}
        docs={companyDocs}
        onClose={() => setDoc(null)}
        onDocUpdated={(updated) => setCompanyDocs((prev) => (prev ? { ...prev, ...updated } : prev))}
      />
      <VideoOverlay open={video} onClose={() => setVideo(false)} />
      <SocialPostPreviewOverlay
        platform={socialDraft?.platform ?? "twitter"}
        item={socialDraft?.item ?? null}
        onClose={() => setSocialDraft(null)}
        onPosted={(id, url) => setPostedSocialIds((cur) => ({ ...cur, [id]: url }))}
        onDone={() => setFeedRefreshSignal((n) => n + 1)}
      />
      <Settings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLoggedOut={() => {
          setSettingsOpen(false);
          logout();
        }}
      />
    </div>
    </ThemeProvider>
  );
}

// The two-way switch between Kanso's normal dashboard and the Competitive
// Intelligence module -- real state (OpsWorkspace's own ciOpen), not decorative. Sits
// right next to the KANSO wordmark so it's always visible and always one click away,
// rather than buried inside the Company panel's own "Open Competitive Intelligence"
// row (which still works, but this is now the primary, discoverable way to switch).
function WorkspaceToggle({ ciOpen, onSetCiOpen }: { ciOpen: boolean; onSetCiOpen: (v: boolean) => void }) {
  const pill = (active: boolean): React.CSSProperties => ({
    height: 26, padding: "0 12px", display: "inline-flex", alignItems: "center", border: "none", borderRadius: 7,
    fontFamily: "inherit", fontSize: 12, fontWeight: 500, cursor: "pointer",
    background: active ? "#2d2d31" : "transparent", color: active ? "#f2f2f5" : "#9b9ba3",
  });
  return (
    <div style={{ display: "flex", gap: 2, background: "#1f1f21", border: "1px solid #2d2d31", borderRadius: 9, padding: 3 }}>
      <button onClick={() => onSetCiOpen(false)} style={pill(!ciOpen)}>Dashboard</button>
      <button onClick={() => onSetCiOpen(true)} style={pill(ciOpen)}>Competitive Intelligence</button>
    </div>
  );
}

function TopBar({ terminalOpen, onToggleTerminal, companyDocs, ciOpen, onSetCiOpen, onOpenSettings, onLogout }: { terminalOpen: boolean; onToggleTerminal: () => void; companyDocs: CompanyDocs | null; ciOpen: boolean; onSetCiOpen: (v: boolean) => void; onOpenSettings: () => void; onLogout: () => void }) {
  return (
    <div style={{ flex: "0 0 auto", height: 48, display: "flex", alignItems: "center", gap: 11, padding: "0 13px", background: "#18181a", borderBottom: "1px solid #27272b" }}>
      <button onClick={onToggleTerminal} title="Collapse terminal" className="kanso-icon-btn" style={{ width: 26, height: 26, display: "grid", placeItems: "center", background: "transparent", border: "none", borderRadius: 6, color: C.dim, cursor: "pointer" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: terminalOpen ? undefined : "rotate(180deg)" }}>
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <div className="kanso-chip" style={{ display: "flex", alignItems: "center", gap: 7, height: 32, padding: "0 10px 0 9px", background: "#232326", border: "1px solid #34343a", borderRadius: 8, cursor: "pointer" }}>
        {companyDocs ? (
          <>
            {/* Real favicon of whatever site this Kanso instance actually runs for --
                not hardcoded to Fermor specifically, so this stays correct if this ever
                points elsewhere. */}
            <Favicon domain={companyDocs.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} size={15} fallbackLabel={companyDocs.name} fallbackColor="#1d4ed8" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#f2f2f5" }}>{companyDocs.name}</span>
          </>
        ) : (
          // Real shape, no fallback name -- companyDocs.name flashing in as "Fermor"
          // then swapping to the real value a moment later looked like the same stale-
          // content bug already fixed elsewhere on this same page, just in a component
          // that fetch didn't cover.
          <>
            <Skeleton width={15} height={15} radius={7} />
            <Skeleton width={54} height={11} />
          </>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9b9ba3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ position: "relative", width: 24, height: 24, display: "grid", placeItems: "center" }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: "#f4f3f1", display: "grid", placeItems: "center" }}>
            <KansoMarkIcon size={15} />
          </span>
          <span style={{ position: "absolute", top: 0, right: 0, width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 0 2px #110f0e" }} />
        </div>
        <span style={{ fontFamily: "var(--font-michroma), sans-serif", fontSize: 10.5, letterSpacing: "0.2em", color: "#eeeef2" }}>KANSO</span>
        <span style={{ fontSize: 13, color: "#6e6e77" }}>·</span>
        <WorkspaceToggle ciOpen={ciOpen} onSetCiOpen={onSetCiOpen} />
        {!ciOpen && (
          <>
            <span style={{ fontSize: 13, color: "#6e6e77" }}>·</span>
            <span style={{ fontSize: 13.5, color: "#93939c" }}>Running Daily</span>
          </>
        )}
      </div>

      <div style={{ flex: 1 }} />

      <div className="kanso-chip" style={{ display: "flex", alignItems: "center", gap: 9, height: 34, padding: "0 13px 0 11px", background: "#232326", border: "1px solid #34343a", borderRadius: 999, whiteSpace: "nowrap", cursor: "pointer" }}>
        <span style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid #56d2c0" }} />
        <span style={{ fontSize: 13.5, color: "#f2f2f5", whiteSpace: "nowrap" }}>Things to do</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9b9ba3" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
      </div>

      <AccountMenu onOpenSettings={onOpenSettings} onLogout={onLogout} />
    </div>
  );
}

type MeResponse = { email: string; name: string; organizationId: string };

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0].charAt(0) + (parts[1]?.charAt(0) ?? "")).toUpperCase();
}

// Real logged-in identity, fetched from /ops/me -- there is no OpsUser table, so this
// is the only place the frontend learns who's actually signed in (see getOpsDisplayName
// in ops-auth.ts on the backend). Previously this whole block was the literal string
// "Naveen Reddy" with no data behind it at all, regardless of who logged in.
function AccountMenu({ onOpenSettings, onLogout }: { onOpenSettings: () => void; onLogout: () => void }) {
  const { theme, toggleTheme, tokens: T } = useTheme();
  const [me, setMe] = useState<MeResponse | null>(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = getOpsToken();
    if (!token) return;
    apiFetch<MeResponse>("/api/v1/ops/me", {}, token).catch(() => null).then((r) => r && setMe(r));
  }, []);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const displayName = me?.name ?? "";

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{ display: "flex", alignItems: "center", gap: 10, paddingLeft: 6, cursor: "pointer" }}
      >
        <div style={{ position: "relative" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2d2d31", display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 600, color: "#eeeef2" }}>
            {me ? initialsFor(me.name) : <Skeleton width={16} height={9} />}
          </div>
          <span style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 0 2px #110f0e" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}>
          {me ? <span style={{ fontSize: 13.5, fontWeight: 500 }}>{displayName}</span> : <Skeleton width={80} height={11} />}
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9b9ba3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : undefined }}><polyline points="6 9 12 15 18 9" /></svg>
      </div>

      {open && (
        <div
          className="kanso-fade-in"
          style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0, width: 240, background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 10, boxShadow: "0 12px 32px rgba(0,0,0,0.4)", zIndex: 50, overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.surfaceRaised, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 600, color: T.text, flex: "none" }}>
              {me ? initialsFor(me.name) : ""}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{displayName}</div>
              <div style={{ fontSize: 11.5, color: T.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{me?.email ?? ""}</div>
            </div>
            <div style={{ flex: 1 }} />
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{ width: 26, height: 26, flex: "none", borderRadius: 7, border: `1px solid ${T.border}`, background: T.surfaceRaised, color: T.text, display: "grid", placeItems: "center", cursor: "pointer" }}
            >
              {theme === "dark" ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z" /></svg>
              )}
            </button>
          </div>

          <button
            onClick={() => { setOpen(false); onOpenSettings(); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "10px 14px", background: "transparent", border: "none", color: T.text, fontSize: 12.5, cursor: "pointer", textAlign: "left" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            Settings
          </button>

          <div style={{ height: 1, background: T.border }} />

          <button
            onClick={() => { setOpen(false); onLogout(); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "10px 14px", background: "transparent", border: "none", color: T.danger, fontSize: 12.5, cursor: "pointer", textAlign: "left" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

type TerminalLog = { id: string; message: string; level: string; createdAt: string };

function markFor(level: string) {
  return level === "success" ? "✓" : level === "error" ? "×" : level === "warning" ? "!" : ">";
}
function colorFor(level: string) {
  return level === "success" ? "#4ade80" : level === "error" ? "#ff6666" : level === "warning" ? "#f59e0b" : "#dcdce1";
}

const TERMINAL_CLEARED_BEFORE_KEY = "kanso_terminal_cleared_before";

function Terminal({ token }: { token: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<TerminalLog[] | null>(null);
  // A real per-viewer "clear," not a destructive one -- hides everything at or before
  // this real timestamp on this browser only. The real log rows still exist server-side
  // (a real audit trail worth keeping), this just declutters what's actually shown here.
  const [clearedBefore, setClearedBefore] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TERMINAL_CLEARED_BEFORE_KEY);
      if (stored) setClearedBefore(Number(stored));
    } catch {
      // Private-window/blocked storage -- just show everything, no worse than before.
    }
  }, []);

  function clearLogs() {
    const now = Date.now();
    setClearedBefore(now);
    try {
      localStorage.setItem(TERMINAL_CLEARED_BEFORE_KEY, String(now));
    } catch {
      // Not persisted this time, but still clears the current view.
    }
  }

  // Plain polling, not an EventSource/SSE stream -- confirmed directly from a real
  // DevTools Network tab that the stream sat at "(pending)", 0.0 kB, forever. Vercel's
  // standard serverless functions don't incrementally flush a response body the way a
  // real long-running server does, so nothing written to that stream server-side ever
  // actually reached the browser -- not a bug in the cursor/query logic, a genuine
  // platform mismatch no amount of server-side patching could fix. A plain request on a
  // timer has no such requirement and works the same regardless of platform.
  useEffect(() => {
    let cancelled = false;
    function poll() {
      apiFetch<{ logs: TerminalLog[] }>("/api/v1/ops/terminal", {}, token)
        .then((data) => {
          if (!cancelled) setLines(data.logs);
        })
        .catch(() => {
          // A missed poll just tries again next tick -- no need to clear what's
          // already shown over one transient failure.
        });
    }
    poll();
    const interval = setInterval(poll, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [token]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const visibleLines = (lines ?? []).filter((l) => new Date(l.createdAt).getTime() > clearedBefore);

  return (
    <div style={{ flex: "0 0 auto", height: 208, background: "#0a0a0a", borderBottom: "1px solid #27272b", position: "relative", display: "flex", flexDirection: "column" }}>
      {lines !== null && lines.length > 0 && (
        <button
          onClick={clearLogs}
          title="Clear the terminal (hides older lines on this device only -- the real logs stay stored)"
          style={{ position: "absolute", top: 8, right: 10, zIndex: 1, height: 22, padding: "0 9px", display: "inline-flex", alignItems: "center", gap: 5, background: "#18181a", border: "1px solid #27272b", borderRadius: 6, color: "#6e6e77", fontSize: 10.5, cursor: "pointer" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>
          Clear
        </button>
      )}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px 12px", fontFamily: "var(--font-jetbrains-mono), ui-monospace, Menlo, monospace", fontSize: 12.5, lineHeight: 1.85 }}>
        {lines === null ? (
          // Real shape, no real message text -- distinguishes "haven't checked yet" from
          // a real, confirmed "nothing has run" state, which only shows once the first
          // poll has actually come back.
          <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 2 }}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} width={`${70 - i * 15}%`} height={11} />
            ))}
          </div>
        ) : (
          <>
            {visibleLines.length === 0 && <div style={{ color: "#6e6e77" }}>Waiting for the first agent run...</div>}
            {visibleLines.map((line) => (
              <div key={line.id} className="kanso-fade-in" style={{ display: "flex", gap: 9 }}>
                <span style={{ color: colorFor(line.level), whiteSpace: "pre" }}>{markFor(line.level)}</span>
                <span style={{ color: colorFor(line.level) }}>{line.message}</span>
              </div>
            ))}
            <div style={{ display: "flex", paddingTop: 3 }}>
              <span className="kanso-cursor" style={{ width: 8, height: 16, background: "#4ade80" }} />
            </div>
          </>
        )}
      </div>
      <div style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", width: 54, height: 4, borderRadius: 4, background: "#3d3d44", cursor: "ns-resize" }} />
    </div>
  );
}

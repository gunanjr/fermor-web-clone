"use client";

import { useEffect, useState } from "react";
import { apiFetch, getOpsToken } from "@/lib/api";
import { useTheme } from "./ThemeContext";

type MeResponse = { email: string; name: string; organizationId: string };
type Website = { id: string; name: string; url: string; isPrimary: boolean };
type AgentConnection = { status: "connected" | "not_connected" | "not_applicable" | "error"; detail: string };
type AgentSetting = { agentType: string; label: string; enabled: boolean; connection: AgentConnection };

type Section = "websites" | "agents" | "account" | "devices";

const SECTIONS: { key: Section; label: string; icon: (color: string) => React.ReactNode }[] = [
  {
    key: "websites",
    label: "Websites",
    icon: (c) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    key: "agents",
    label: "Agents",
    icon: (c) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" /><circle cx="9" cy="6" r="2" fill={c} stroke="none" />
        <line x1="4" y1="12" x2="20" y2="12" /><circle cx="15" cy="12" r="2" fill={c} stroke="none" />
        <line x1="4" y1="18" x2="20" y2="18" /><circle cx="11" cy="18" r="2" fill={c} stroke="none" />
      </svg>
    ),
  },
  {
    key: "account",
    label: "Account & Security",
    icon: (c) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3z" />
      </svg>
    ),
  },
  {
    key: "devices",
    label: "Devices",
    icon: (c) => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="2" /><line x1="11" y1="18" x2="13" y2="18" />
      </svg>
    ),
  },
];

const CONNECTION_COLOR: Record<AgentConnection["status"], string> = {
  connected: "#4ade80",
  not_connected: "#9b9ba3",
  not_applicable: "#9b9ba3",
  error: "#f59e0b",
};

export default function Settings({ open, onClose, onLoggedOut }: { open: boolean; onClose: () => void; onLoggedOut: () => void }) {
  const { theme, toggleTheme, tokens: T } = useTheme();
  const [section, setSection] = useState<Section>("websites");
  const [me, setMe] = useState<MeResponse | null>(null);
  const [websites, setWebsites] = useState<Website[] | null>(null);
  const [agents, setAgents] = useState<AgentSetting[] | null>(null);
  const [togglingAgent, setTogglingAgent] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const token = getOpsToken();
    if (!token) return;
    apiFetch<MeResponse>("/api/v1/ops/me", {}, token).catch(() => null).then((r) => r && setMe(r));
  }, [open]);

  useEffect(() => {
    if (!open || section !== "websites" || websites) return;
    const token = getOpsToken();
    if (!token) return;
    apiFetch<{ websites: Website[] }>("/api/v1/ops/websites", {}, token)
      .then((r) => setWebsites(r.websites))
      .catch(() => setWebsites([]));
  }, [open, section, websites]);

  useEffect(() => {
    if (!open || section !== "agents" || agents) return;
    const token = getOpsToken();
    if (!token) return;
    apiFetch<{ agents: AgentSetting[] }>("/api/v1/ops/agents-settings", {}, token)
      .then((r) => setAgents(r.agents))
      .catch(() => setAgents([]));
  }, [open, section, agents]);

  async function toggleAgent(agentType: string, enabled: boolean) {
    setTogglingAgent(agentType);
    try {
      const token = getOpsToken();
      await apiFetch("/api/v1/ops/agents-settings", { method: "POST", body: JSON.stringify({ agentType, enabled }) }, token ?? undefined);
      setAgents((cur) => cur && cur.map((a) => (a.agentType === agentType ? { ...a, enabled } : a)));
    } catch {
      // Real state stays whatever the server actually has -- refetch rather than
      // optimistically showing a toggle state that may not have actually saved.
      setAgents(null);
    } finally {
      setTogglingAgent(null);
    }
  }

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: T.bg, color: T.text, display: "flex", flexDirection: "column", fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: 13 }}>
      <div style={{ flex: "0 0 auto", height: 52, display: "flex", alignItems: "center", gap: 12, padding: "0 20px", borderBottom: `1px solid ${T.border}` }}>
        <button onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, background: "transparent", border: "none", borderRadius: 7, color: T.textDim, cursor: "pointer" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Settings</span>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        <div style={{ flex: "0 0 220px", borderRight: `1px solid ${T.border}`, padding: "18px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
          {SECTIONS.map((s) => {
            const active = section === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setSection(s.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", textAlign: "left",
                  background: active ? T.surfaceRaised : "transparent", color: active ? T.text : T.textDim,
                  fontSize: 13.5, fontWeight: active ? 600 : 400, cursor: "pointer",
                }}
              >
                {s.icon(active ? T.text : T.textDim)}
                {s.label}
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "28px 36px" }}>
          {section === "websites" && (
            <>
              <SectionTitle title="Websites" subtitle="Every website Kanso is currently running for." T={T} />
              {websites === null ? (
                <div style={{ color: T.textDim, fontSize: 13 }}>Loading...</div>
              ) : websites.length === 0 ? (
                <div style={{ color: T.textDim, fontSize: 13 }}>No websites found.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {websites.map((w) => (
                    <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: T.surfaceRaised, display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>
                        {w.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontWeight: 600, fontSize: 13.5 }}>{w.name}</span>
                          {w.isPrimary && (
                            <span style={{ fontSize: 10.5, fontWeight: 600, color: "#4ade80", background: "rgba(74,222,128,0.12)", padding: "2px 7px", borderRadius: 999 }}>Primary</span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: T.textDim }}>{w.url.replace(/^https?:\/\//, "")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {section === "agents" && (
            <>
              <SectionTitle title="Agents" subtitle="Turn agents on or off, and see which accounts each one is using." T={T} />
              {agents === null ? (
                <div style={{ color: T.textDim, fontSize: 13 }}>Loading...</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {agents.map((a) => (
                    <div key={a.agentType} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{a.label}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: CONNECTION_COLOR[a.connection.status], flex: "none" }} />
                          <span style={{ fontSize: 12, color: T.textDim }}>{a.connection.detail}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleAgent(a.agentType, !a.enabled)}
                        disabled={togglingAgent === a.agentType}
                        aria-pressed={a.enabled}
                        style={{
                          width: 38, height: 22, borderRadius: 999, border: "none", padding: 2, cursor: togglingAgent === a.agentType ? "default" : "pointer",
                          background: a.enabled ? "#4ade80" : T.border, display: "flex", justifyContent: a.enabled ? "flex-end" : "flex-start",
                          opacity: togglingAgent === a.agentType ? 0.6 : 1, transition: "background 0.15s",
                        }}
                      >
                        <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", display: "block" }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {section === "account" && (
            <>
              <SectionTitle title="Account & Security" subtitle="Your account identity." T={T} />
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.surfaceRaised, display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>
                    {(me?.name ?? "?").split(" ").map((p) => p.charAt(0)).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{me?.name ?? "..."}</div>
                    <div style={{ fontSize: 12, color: T.textDim }}>{me?.email ?? ""}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>Appearance</div>
                    <div style={{ fontSize: 12, color: T.textDim }}>{theme === "dark" ? "Dark mode" : "Light mode"}</div>
                  </div>
                  <ThemeToggleButton theme={theme} onToggle={toggleTheme} T={T} />
                </div>

                <button
                  onClick={onLoggedOut}
                  style={{ alignSelf: "flex-start", fontSize: 13, fontWeight: 600, color: T.danger, background: "transparent", border: `1px solid ${T.border}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer" }}
                >
                  Log out
                </button>
              </div>
            </>
          )}

          {section === "devices" && (
            <>
              <SectionTitle title="Devices" subtitle="Manage devices that have access to your account." T={T} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "60px 0", color: T.textDim }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /></svg>
                <span style={{ fontSize: 13 }}>No devices found</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ title, subtitle, T }: { title: string; subtitle: string; T: ReturnType<typeof useTheme>["tokens"] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: T.textDim, marginTop: 2 }}>{subtitle}</div>
    </div>
  );
}

function ThemeToggleButton({ theme, onToggle, T }: { theme: "light" | "dark"; onToggle: () => void; T: ReturnType<typeof useTheme>["tokens"] }) {
  return (
    <button
      onClick={onToggle}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: T.surfaceRaised, color: T.text, display: "grid", placeItems: "center", cursor: "pointer" }}
    >
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z" /></svg>
      )}
    </button>
  );
}

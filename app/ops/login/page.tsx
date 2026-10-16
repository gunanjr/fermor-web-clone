"use client";

import { Fragment, Suspense, useEffect, useRef, useState, type CSSProperties, type ReactNode, type KeyboardEvent, type ClipboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch, setOpsToken } from "@/lib/api";
import { C } from "../ui";
import { SeoAgentIcon, RedditIcon, KansoMarkIcon } from "../icons";

// Ported from the Kanso Login design (kanso-package/Kanso Login.dc.html), wired to
// the real backend instead of the design's mock setTimeout logic:
//  - no client-side domain allowlist (the design's `ALLOW` list) — the backend's
//    email allowlist is the real gate, so the client just relays its response.
//  - token stored via setOpsToken (localStorage "ops_token"), matching the existing
//    ca_token pattern, not the design's sessionStorage mock.
//  - redirectUrl has no real distinct routes to deep-link into yet (OpsWorkspace is
//    a single tabbed page), so it defaults to /ops with a generic label instead of
//    the design's per-panel PANELS map.

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirectUrl");
  const redirectTo = redirectParam ? decodeURIComponent(redirectParam) : "/ops";

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [shake, setShake] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const cooldownInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownInterval.current) clearInterval(cooldownInterval.current);
    };
  }, []);

  function startCooldown() {
    if (cooldownInterval.current) clearInterval(cooldownInterval.current);
    setCooldown(30);
    cooldownInterval.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          if (cooldownInterval.current) clearInterval(cooldownInterval.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  async function sendCode() {
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");
    setSending(true);
    try {
      await apiFetch("/api/v1/ops/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email: trimmed }),
      });
      setStep("code");
      setDigits(["", "", "", "", "", ""]);
      setCodeError("");
      startCooldown();
      setTimeout(() => refs.current[0]?.focus(), 60);
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Could not send code.");
    } finally {
      setSending(false);
    }
  }

  function setDigit(i: number, raw: string) {
    const v = raw.replace(/\D/g, "").slice(-1);
    setDigits((d) => {
      const next = [...d];
      next[i] = v;
      return next;
    });
    setCodeError("");
    if (v && i < 5) refs.current[i + 1]?.focus();
  }

  function keyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    else if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
    else if (e.key === "Enter") verify();
  }

  function onPaste(e: ClipboardEvent<HTMLInputElement>) {
    const txt = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!txt) return;
    e.preventDefault();
    const d = ["", "", "", "", "", ""];
    txt.split("").forEach((ch, i) => {
      d[i] = ch;
    });
    setDigits(d);
    setCodeError("");
    const last = Math.min(txt.length, 5);
    refs.current[last]?.focus();
  }

  async function verify() {
    const code = digits.join("");
    if (code.length < 6) {
      setCodeError("Enter all six digits.");
      setShake(true);
      setTimeout(() => setShake(false), 420);
      return;
    }
    setVerifying(true);
    setCodeError("");
    try {
      const data = await apiFetch<{ token: string }>("/api/v1/ops/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email: email.trim(), otp: code }),
      });
      setOpsToken(data.token);
      setVerifying(false);
      setVerified(true);
      setTimeout(() => router.push(redirectTo), 1400);
    } catch (err) {
      setVerifying(false);
      setCodeError(err instanceof Error ? err.message : "That code is incorrect or expired.");
      setShake(true);
      setDigits(["", "", "", "", "", ""]);
      setTimeout(() => setShake(false), 420);
      setTimeout(() => refs.current[0]?.focus(), 100);
    }
  }

  function resend() {
    setDigits(["", "", "", "", "", ""]);
    setCodeError("");
    startCooldown();
    refs.current[0]?.focus();
  }

  const filled = digits.join("").length === 6;

  const btnStyle = (enabled: boolean): CSSProperties => ({
    width: "100%",
    height: 46,
    marginTop: 22,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    border: "none",
    borderRadius: 10,
    fontFamily: "inherit",
    fontSize: 13.5,
    fontWeight: 500,
    cursor: enabled ? "pointer" : "not-allowed",
    background: enabled ? C.bright : "#2a2a2e",
    color: enabled ? "#101012" : C.faint,
  });

  const spinner = (
    <span
      style={{
        width: 14,
        height: 14,
        border: "2px solid rgba(16,16,18,.25)",
        borderTopColor: "#101012",
        borderRadius: "50%",
        display: "inline-block",
        animation: "kspin .6s linear infinite",
      }}
    />
  );

  return (
    <div
      className="kanso-root"
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "40px 24px",
        background: "#101012",
        color: "#f2f2f5",
        fontFamily: "var(--font-dm-sans), system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        fontSize: 13,
      }}
    >
      <style>{`
        @keyframes kspin { to { transform: rotate(360deg); } }
        @keyframes kshake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-5px); } 40% { transform: translateX(5px); } 60% { transform: translateX(-3px); } 80% { transform: translateX(3px); } }
      `}</style>

      <div
        className="kanso-rise-in"
        style={{
          width: "100%",
          maxWidth: 1000,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(0,0,0,.5)",
        }}
      >
        {/* left: the form */}
        <div style={{ background: C.card, padding: "38px 44px 34px", display: "flex", flexDirection: "column", minHeight: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 34 }}>
            <a
              href="https://fermor.in"
              title="Back to fermor.in"
              className="kanso-icon-btn"
              style={{
                flex: "0 0 auto",
                width: 34,
                height: 34,
                display: "grid",
                placeItems: "center",
                background: "#28282c",
                border: "1px solid #34343a",
                borderRadius: "50%",
                color: C.dim,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </a>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 9, paddingRight: 34 }}>
              <span style={{ width: 38, height: 38, borderRadius: 11, background: "#f4f3f1", display: "grid", placeItems: "center" }}>
                <KansoMarkIcon size={26} />
              </span>
              <span style={{ fontFamily: "var(--font-michroma), sans-serif", fontSize: 14, letterSpacing: "0.26em", textIndent: "0.26em", color: C.bright }}>
                KANSO
              </span>
            </div>
          </div>

          {step === "email" && (
            <div className="kanso-fade-in">
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#f2f2f5" }}>Sign in to continue</div>
              </div>

              <label htmlFor="k-email" style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: C.body2, marginBottom: 9 }}>
                Work email
              </label>
              <input
                id="k-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendCode();
                }}
                placeholder="you@fermor.in"
                autoComplete="email"
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 14px",
                  background: "#18181a",
                  border: `1px solid ${emailError ? "#5c2a2a" : "#34343a"}`,
                  borderRadius: 10,
                  color: "#f2f2f5",
                  fontFamily: "inherit",
                  fontSize: 13.5,
                  outline: "none",
                }}
              />

              {emailError && (
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 10, fontSize: 12, color: C.red }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  <span>{emailError}</span>
                </div>
              )}

              <button onClick={sendCode} disabled={sending} style={btnStyle(!sending)}>
                {sending && spinner}
                <span>{sending ? "Sending code" : "Send code"}</span>
              </button>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 9,
                  marginTop: 18,
                  padding: "11px 12px",
                  background: "#1a1a1c",
                  border: `1px solid ${C.border}`,
                  borderRadius: 9,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#82828b"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flex: "0 0 auto", marginTop: 1 }}
                >
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                <span style={{ fontSize: 12, lineHeight: 1.6, color: C.dim }}>
                  Access is limited to addresses on the team allowlist. Ask an admin if yours isn&apos;t on it yet.
                </span>
              </div>
            </div>
          )}

          {step === "code" && (
            <div className="kanso-fade-in">
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#f2f2f5", marginBottom: 7 }}>Enter your code</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: C.dim }}>
                  Sent to <span style={{ color: "#f2f2f5" }}>{email}</span>
                </div>
                <button
                  onClick={() => {
                    setStep("email");
                    setDigits(["", "", "", "", "", ""]);
                    setCodeError("");
                  }}
                  style={{
                    marginTop: 8,
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    fontFamily: "inherit",
                    fontSize: 12,
                    color: C.teal,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                    cursor: "pointer",
                  }}
                >
                  Use a different address
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  animation: shake ? "kshake .4s ease-in-out" : undefined,
                }}
              >
                {digits.map((d, i) => (
                  <Fragment key={i}>
                    {i === 3 && <span style={{ width: 9, height: 1, background: "#3d3d44", alignSelf: "center" }} />}
                    <input
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onKeyDown={(e) => keyDown(i, e)}
                      onPaste={onPaste}
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`Digit ${i + 1}`}
                      style={{
                        width: 46,
                        height: 56,
                        textAlign: "center",
                        background: "#18181a",
                        border: `1px solid ${codeError ? "#5c2a2a" : "#34343a"}`,
                        borderRadius: 10,
                        color: "#f2f2f5",
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: 21,
                        outline: "none",
                        caretColor: C.teal,
                      }}
                    />
                  </Fragment>
                ))}
              </div>

              {codeError && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 14, fontSize: 12, color: C.red }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  <span>{codeError}</span>
                </div>
              )}

              {verified && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14, fontSize: 12.5, color: C.green }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="8 12.5 11 15.5 16 9.5" />
                  </svg>
                  <span>Verified. Taking you to your dashboard...</span>
                </div>
              )}

              <button onClick={verify} disabled={!filled || verifying || verified} style={btnStyle(filled && !verifying && !verified)}>
                {verifying && spinner}
                <span>{verified ? "Verified" : verifying ? "Verifying" : "Verify and continue"}</span>
              </button>

              <div style={{ textAlign: "center", marginTop: 18, fontSize: 12, color: C.faint }}>
                {cooldown > 0 ? `You can request a new code in ${cooldown}s` : "Didn't get it? "}
                {cooldown === 0 && (
                  <button
                    onClick={resend}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      fontFamily: "inherit",
                      fontSize: 12,
                      color: C.teal,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      cursor: "pointer",
                    }}
                  >
                    Send a new code
                  </button>
                )}
              </div>
            </div>
          )}

          <div style={{ flex: 1, minHeight: 24 }} />
          <div style={{ textAlign: "center", fontSize: 11.5, lineHeight: 1.7, color: C.faint }}>
            By continuing you agree to our{" "}
            <a href="#terms" style={{ color: C.dim, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" style={{ color: C.dim, textDecoration: "underline", textUnderlineOffset: 3 }}>
              Privacy Policy
            </a>
            .
          </div>
        </div>

        {/* right: value panel */}
        <div style={{ background: "#f4f3f1", padding: "46px 42px", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: 40,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "#1b1a19",
              marginBottom: 20,
            }}
          >
            AI Growth OS
          </div>
          <p style={{ margin: "0 0 36px", fontSize: 14, lineHeight: 1.7, color: "#4d4a46", maxWidth: "34ch" }}>
            One intelligent system for growth, marketing and distribution.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4f4b45", whiteSpace: "nowrap" }}>
              7 agents included
            </span>
            <span style={{ flex: 1, height: 1, background: "#dcd9d4" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
            <AgentRow icon={<SeoAgentIcon size={19} />} label="SEO Agent" />
            <AgentRow
              icon={
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth={1.9} strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
                </svg>
              }
              label="GEO Agent"
            />
            <AgentRow icon={<RedditIcon size={19} />} label="Reddit Agent" />
            <AgentRow
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M4.5 4h4.2l4 5.5L17.6 4h2.1l-5.9 7 6.2 9h-4.2l-4.2-5.9L6 20H3.9l6.3-7.4z" fill="#0f0f0f" />
                </svg>
              }
              label="X / Twitter"
            />
            <AgentRow
              icon={
                <svg width="19" height="19" viewBox="0 0 24 24">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#0a66c2" />
                  <path
                    d="M6.2 9.6h2.5V18H6.2zM7.4 5.9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M10.3 9.6h2.4v1.1c.4-.7 1.3-1.3 2.5-1.3 1.9 0 2.7 1.1 2.7 3.1V18h-2.5v-4.4c0-1-.4-1.5-1.2-1.5-.9 0-1.4.6-1.4 1.5V18h-2.5z"
                    fill="#fff"
                  />
                </svg>
              }
              label="LinkedIn Agent"
            />
            <AgentRow
              icon={
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h9l4 4v14H6z" />
                  <path d="M15 3v4h4M9 12h7M9 16h5" />
                </svg>
              }
              label="Articles Agent"
            />
            <AgentRow
              icon={
                <svg width="19" height="19" viewBox="0 0 24 24">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#ff6600" />
                  <path d="M7.5 6.8h2.1L12 11l2.4-4.2h2.1l-3.4 5.8V18h-2.2v-5.4z" fill="#fff" />
                </svg>
              }
              label="Hacker News"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentRow({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
      <span style={{ flex: "0 0 auto", display: "flex" }}>{icon}</span>
      <span style={{ fontSize: 13.5, color: "#26251f", whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

export default function OpsLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

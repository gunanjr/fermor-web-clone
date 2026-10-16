"use client";

import { useEffect, useRef, useState } from "react";
import { C, Skeleton } from "./ui";
import { AGENTS, AGENT_ICON_PATHS } from "./data";
import { SeoAgentIcon, RedditIcon } from "./icons";
import { FeedItemPreviewOverlay, type FeedPreviewItem, RedditOpportunityOverlay, GeoFindingOverlay, SeoRecommendationOverlay, ArticleOverlay } from "./Overlays";
import { apiFetch, getOpsToken } from "@/lib/api";

const IMAGE_ICON_AGENTS = new Set(["seo", "reddit"]);

// Maps the sample-data agent keys (data.ts) to the real backend agentType enum values.
// Only agents actually built go in here -- everything else stays a labeled placeholder.
const REAL_AGENT_TYPES: Record<string, string> = { seo: "SEO", geo: "GEO", competitor: "COMPETITOR_PULSE", x: "TWITTER", articles: "ARTICLES", linkedin: "LINKEDIN", hn: "HACKER_NEWS", reddit: "REDDIT" };
const RUNNABLE_AGENTS: { key: string; label: string; endpoint: string }[] = [
  { key: "seo", label: "Run SEO Agent", endpoint: "/api/v1/ops/agents/seo/run" },
  { key: "geo", label: "Run GEO Agent", endpoint: "/api/v1/ops/agents/geo/run" },
  { key: "competitor", label: "Run Competitor Pulse", endpoint: "/api/v1/ops/agents/competitor-pulse/run" },
  { key: "x", label: "Run X Agent", endpoint: "/api/v1/ops/agents/twitter/run" },
  { key: "articles", label: "Run Articles Agent", endpoint: "/api/v1/ops/agents/articles/run" },
  { key: "linkedin", label: "Run LinkedIn Agent", endpoint: "/api/v1/ops/agents/linkedin/run" },
  { key: "hn", label: "Run HN Agent", endpoint: "/api/v1/ops/agents/hackernews/run" },
  { key: "reddit", label: "Run Reddit Agent", endpoint: "/api/v1/ops/agents/reddit/run" },
];

type RealFeedItem = {
  id: string;
  agentType: string;
  title: string;
  summary: string;
  content: string;
  // Real columns on OpsFeedItem itself (articles-agent.ts), not metadata -- present on
  // ARTICLES items specifically.
  keyword?: string | null;
  wordCount?: number | null;
  metadata: {
    estimatedImpact?: string;
    angle?: string;
    reasoning?: string;
    suggestedFirstReply?: string;
    needsFactCheck?: string;
    tweetUrl?: string;
    postUrl?: string;
    subreddit?: string;
    threadTitle?: string;
    permalink?: string;
    mentionsProduct?: boolean;
    firstComment?: string;
    timingGuidance?: string;
    commentStrategy?: { question: string; answer: string }[];
    postSelftext?: string;
    author?: string | null;
    postedAt?: string | null;
    // GEO-specific structured finding fields (see geo-agent.ts) -- absent on a plain
    // GEO recommendation, which still only carries estimatedImpact/geoScore/
    // citationResults exactly as before.
    findingType?: "technical" | "citation_gap";
    severity?: "Critical" | "High" | "Medium" | "Low";
    query?: string | null;
    competitor?: string | null;
    whatsHappening?: string;
    codeableFixes?: string[];
    contentFixes?: string[];
    priorities?: { title: string; impact: string }[];
    // SEO-specific structured recommendation fields (see seo-agent.ts) -- absent on
    // an older SEO recommendation stored before this shape existed.
    category?: "On-Page" | "Technical" | "Content" | "Performance";
    page?: string;
    overview?: string;
    steps?: { title: string; code: string | null; explanation: string }[];
    expectedImpact?: { label: string; description: string }[];
    // Real Articles-specific fields (articles-agent.ts) -- the actual GSC opportunity
    // (real impressions/position) an article's keyword was picked from.
    sourceImpressions?: number;
    sourcePosition?: number;
  } | null;
};

// A real, deterministic heuristic (not a Claude classification, no extra cost) --
// content-marketing funnel stage inferred from real keyword phrasing patterns. Clearly
// a heuristic guess, not a scraped fact: BOF (bottom of funnel) keywords tend to signal
// someone close to a decision ("vs," "review," "best," "pricing"), TOF (top of funnel)
// keywords tend to signal someone still learning ("what is," "how to," "guide,"
// "beginner"); anything else defaults to MOF (middle of funnel).
function inferFunnelStage(keyword: string | null | undefined): "TOF" | "MOF" | "BOF" {
  const k = (keyword ?? "").toLowerCase();
  if (/\b(vs|versus|review|best|pricing|cost|buy|alternative)\b/.test(k)) return "BOF";
  if (/\b(what is|how to|guide|beginner|explained|meaning)\b/.test(k)) return "TOF";
  return "MOF";
}

function severityColors(severity: string | undefined): { color: string; bg: string; border: string } {
  if (severity === "Critical") return { color: "#ff6666", bg: "#301416", border: "#5a2226" };
  if (severity === "Medium") return { color: "#e0a95e", bg: "#2a2416", border: "#4d3a1c" };
  if (severity === "Low") return { color: C.dimmer, bg: "#232326", border: C.border };
  return { color: "#f28b82", bg: "#2c1a19", border: "#4a2624" };
}

function AgentGlyph({ agentKey }: { agentKey: string }) {
  if (agentKey === "seo") return <SeoAgentIcon size={20} />;
  if (agentKey === "reddit") return <RedditIcon size={19} />;
  const ic = AGENT_ICON_PATHS[agentKey];
  if (!ic) return null;
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill={ic.fill ?? "none"} stroke={ic.stroke ?? "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={ic.path} />
    </svg>
  );
}

// Moved inside each agent's own expanded dropdown, not a shared row above the whole
// list -- a run action belongs with the specific agent it runs, not floating in a
// header that has nothing to do with any one agent in particular.
function RunAgentButton({ label, isRunning, disabled, elapsedSeconds, onClick }: { label: string; isRunning: boolean; disabled: boolean; elapsedSeconds: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={isRunning ? "Usually finishes in under a minute." : label}
      className="kanso-ghost-btn"
      style={{ height: 28, padding: "0 12px", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: disabled && !isRunning ? C.dimmer : isRunning ? C.dim : C.body2, fontSize: 12, cursor: disabled ? "default" : "pointer" }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={isRunning ? { animation: "kanso-spin 0.9s linear infinite" } : undefined}>
        {isRunning ? <path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5" /> : <polygon points="6 4 20 12 6 20 6 4" />}
      </svg>
      {isRunning ? `Running... ${elapsedSeconds}s` : label}
    </button>
  );
}

type Props = {
  onOpenStrategyDoc: () => void;
  onOpenVideo: () => void;
  onOpenSocialDraft: (platform: "twitter" | "linkedin", item: { id: string; content: string; angle?: string; reasoning?: string; suggestedFirstReply?: string; needsFactCheck?: string }) => void;
  postedSocialIds: Record<string, string>;
  // Fills the sibling CMO chat panel's input with a real question about a specific GEO
  // finding -- only fills the box, same "never auto-send" rule as every other chip in
  // this app.
  onAskCmo: (text: string) => void;
  // Bumped by the parent whenever a sibling overlay (SocialPostPreviewOverlay's own
  // "Mark Complete") changes feed data this panel doesn't otherwise know about --
  // triggers a real feed reload so the list reflects it.
  refreshSignal?: number;
};

export default function AgentsFeedPanel({ onOpenStrategyDoc, onOpenVideo, onOpenSocialDraft, postedSocialIds, onAskCmo, refreshSignal }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // Every non-social agent's items now open the same real preview overlay used for
  // social drafts, instead of expanding inline in a cramped accordion row -- bundles
  // the item with the small amount of per-agent context the overlay needs (its
  // display name, whether it's copyable, whether it's Reddit specifically for the
  // real "View Thread" link).
  const [preview, setPreview] = useState<{ item: FeedPreviewItem; agentName: string; isCopyable: boolean; isRedditAgent: boolean } | null>(null);
  // Reddit gets its own dedicated detail panel (RedditOpportunityOverlay) instead of the
  // generic FeedItemPreviewOverlay above -- its real post + suggested-reply pair reads
  // much more clearly as two separate cards than as one flowing document, and it needs
  // its own "Rewrite" (regenerate) action the generic overlay has no concept of.
  const [redditPreviewItem, setRedditPreviewItem] = useState<RealFeedItem | null>(null);
  const [regeneratingRedditId, setRegeneratingRedditId] = useState<string | null>(null);
  // GEO's structured findings (see geo-agent.ts) get their own detail panel too, same
  // reasoning as Reddit's: a "Gap Analysis" with distinct sections (What's happening /
  // Codeable fixes / Content fixes / This week's priorities) reads much more clearly as
  // its own structured layout than forced into the generic overlay's single-document flow.
  const [geoPreviewItem, setGeoPreviewItem] = useState<RealFeedItem | null>(null);
  // SEO's structured recommendations (see seo-agent.ts) get the same "Fix" detail
  // panel treatment -- a real page, an overview, step-by-step fixes with real code,
  // and expected impact, matching a real reference design.
  const [seoPreviewItem, setSeoPreviewItem] = useState<RealFeedItem | null>(null);
  // Articles get a real full-article reading view (real markdown properly rendered,
  // a real auto-generated Table of Contents from the article's own headings) instead
  // of the generic overlay's raw preformatted text, which showed literal "#"/"##"
  // characters instead of an actual formatted article.
  const [articlePreviewItem, setArticlePreviewItem] = useState<RealFeedItem | null>(null);
  const [feedItems, setFeedItems] = useState<RealFeedItem[] | null>(null);
  const [runningAgent, setRunningAgent] = useState<string | null>(null);
  // Real, visible feedback for every "Run" button, not just Reddit's bespoke messaging --
  // a run that fails silently (network error, real backend error) previously looked
  // identical to a run that succeeded and just changed nothing, and an agent that can
  // legitimately finish with zero real findings (Competitor Pulse: "nothing new" is the
  // expected common case) looked identical to "never ran at all," since the accordion
  // falls back to sample placeholder rows whenever there are no real items either way.
  const [runResultMessage, setRunResultMessage] = useState<Record<string, string>>({});
  const [actingOn, setActingOn] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [growthMode, setGrowthMode] = useState<boolean | null>(null);
  const [togglingMode, setTogglingMode] = useState(false);
  const [pasteUrl, setPasteUrl] = useState("");
  const [pasteTitle, setPasteTitle] = useState("");
  const [pasteBody, setPasteBody] = useState("");
  const [drafting, setDrafting] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [redditScanning, setRedditScanning] = useState(false);
  const [redditRunMessage, setRedditRunMessage] = useState<string | null>(null);
  const redditPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Competitor Pulse now runs as a real background job (see progress log) -- the POST
  // returns almost instantly ({ started: true }), and the actual research keeps going
  // server-side afterward. Same poll-for-real-results shape already used for Reddit's
  // async GitHub Actions scan, applied here for the same underlying reason: the result
  // isn't known yet when the request returns.
  const [competitorScanning, setCompetitorScanning] = useState(false);
  const competitorPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // A live elapsed-time counter on the Run button, not just an indefinite spinner --
  // an agent that can genuinely take up to a minute (a real multi-search research
  // loop) left no sense of progress or an expected ceiling, which is exactly what
  // makes a slow-but-working run feel frustrating or stuck.
  const [runElapsedSeconds, setRunElapsedSeconds] = useState(0);
  const runTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (redditPollRef.current) clearInterval(redditPollRef.current);
      if (competitorPollRef.current) clearInterval(competitorPollRef.current);
      if (runTimerRef.current) clearInterval(runTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const token = getOpsToken();
    if (!token) return;
    apiFetch<{ twitterGrowthMode: boolean }>("/api/v1/ops/company", {}, token)
      .then((data) => setGrowthMode(data.twitterGrowthMode))
      .catch(() => setGrowthMode(null));
  }, []);

  function toggleGrowthMode() {
    const token = getOpsToken();
    if (!token || togglingMode || growthMode === null) return;
    const next = !growthMode;
    setTogglingMode(true);
    apiFetch<{ twitterGrowthMode: boolean }>("/api/v1/ops/agents/twitter/growth-mode", { method: "POST", body: JSON.stringify({ enabled: next }) }, token)
      .then((data) => setGrowthMode(data.twitterGrowthMode))
      .finally(() => setTogglingMode(false));
  }

  function copyContent(id: string, content: string) {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 2000);
    });
  }

  function loadFeed(): Promise<RealFeedItem[] | null> {
    const token = getOpsToken();
    if (!token) return Promise.resolve(null);
    return apiFetch<{ items: RealFeedItem[] }>("/api/v1/ops/feed", {}, token)
      .then((data) => {
        setFeedItems(data.items);
        return data.items;
      })
      .catch(() => {
        setFeedItems(null);
        return null;
      });
  }

  useEffect(() => {
    loadFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSignal]);

  function countReddit(items: RealFeedItem[] | null): number {
    return (items ?? []).filter((it) => it.agentType === "REDDIT").length;
  }

  function countCompetitorPulse(items: RealFeedItem[] | null): number {
    return (items ?? []).filter((it) => it.agentType === "COMPETITOR_PULSE").length;
  }

  function runAgent(endpoint: string, key: string) {
    const token = getOpsToken();
    if (!token || runningAgent) return;
    setRunningAgent(key);
    setRunResultMessage((m) => ({ ...m, [key]: "" }));
    setOpen((s) => ({ ...s, [key]: true }));
    setRunElapsedSeconds(0);
    if (runTimerRef.current) clearInterval(runTimerRef.current);
    runTimerRef.current = setInterval(() => setRunElapsedSeconds((s) => s + 1), 1000);
    if (key === "reddit") setRedditRunMessage(null);
    const baselineRedditCount = key === "reddit" ? countReddit(feedItems) : 0;
    const baselineCompetitorCount = key === "competitor" ? countCompetitorPulse(feedItems) : 0;
    // Tracks whether this call actually entered the real background-polling branch --
    // used below so `.finally()` only skips its normal cleanup when there's a real poll
    // to hand that cleanup off to (not, say, when the initial POST itself failed).
    let enteredCompetitorPolling = false;

    apiFetch<{ githubScanTriggered?: boolean; count?: number; started?: boolean; alreadyRunning?: boolean }>(endpoint, { method: "POST" }, token)
      .then((data) => {
        if (key === "competitor" && data?.alreadyRunning) {
          // A real, server-side guard, not just this tab's own button lock -- a refresh
          // or a second tab has no idea a background run is already in flight, and would
          // otherwise happily fire off a second real, paid run on top of it.
          setRunResultMessage((m) => ({ ...m, [key]: "Already running from an earlier click -- wait for it to finish before running again." }));
          return;
        }
        if (key === "competitor" && data?.started) {
          // The response lands almost instantly now -- the real research keeps running
          // server-side afterward (see progress log: it can genuinely take longer than
          // any single request should stay open for). Poll the feed for a while so real
          // findings show up on their own once the background run actually finishes.
          // The button's own "Running... Ns" state (and the shared runningAgent lock)
          // deliberately keep going through this whole poll, not just the instant POST --
          // an instantly-resolving "Running..." gave zero sense that real work was still
          // happening, which read as the feature being quietly removed rather than made
          // faster.
          enteredCompetitorPolling = true;
          setRunResultMessage((m) => ({ ...m, [key]: "Started -- checking your competitors in the background. This can take a couple of minutes." }));
          if (competitorPollRef.current) clearInterval(competitorPollRef.current);
          setCompetitorScanning(true);
          let ticks = 0;
          // Real, found-in-production reason this needs to be this high: the backend's
          // own SAFE_BUDGET_MS (170s) plus a single in-flight Anthropic call's own
          // CLIENT_TIMEOUT_MS (60s) that can still be running when that deadline check
          // passes means a real run can legitimately take up to ~170-180s before writing
          // its findings -- confirmed directly against a real Vercel function log showing
          // a genuine 1m50s (110s) run. The previous ticks>=15 (90s) cutoff gave up before
          // that, so this panel showed a stale "no new findings" message for a run that
          // had, in fact, already found real results by the time it actually finished.
          // 35 ticks * 6s = 210s gives real margin past the ~180s worst case while still
          // finishing before vercel.json's maxDuration (280s) on the function itself.
          const MAX_COMPETITOR_POLL_TICKS = 35;
          competitorPollRef.current = setInterval(() => {
            ticks++;
            loadFeed().then((items) => {
              const gained = countCompetitorPulse(items) - baselineCompetitorCount;
              if (gained > 0) {
                setRunResultMessage((m) => ({ ...m, [key]: `Ran successfully -- ${gained} new item${gained === 1 ? "" : "s"}.` }));
                if (competitorPollRef.current) clearInterval(competitorPollRef.current);
                setCompetitorScanning(false);
                setRunningAgent(null);
                if (runTimerRef.current) clearInterval(runTimerRef.current);
                return;
              }
              // A real "nothing new" outcome and "still running" look identical from
              // item count alone -- after a generous number of ticks, say so honestly
              // rather than imply either one for certain.
              if (ticks >= MAX_COMPETITOR_POLL_TICKS) {
                if (competitorPollRef.current) clearInterval(competitorPollRef.current);
                setCompetitorScanning(false);
                setRunningAgent(null);
                if (runTimerRef.current) clearInterval(runTimerRef.current);
                setRunResultMessage((m) => ({ ...m, [key]: "Finished (or still finishing up) -- no new findings showed up yet. Check the terminal for the real outcome, or try again shortly." }));
              }
            });
          }, 6000);
          return;
        }
        if (key !== "reddit") {
          loadFeed();
          if (typeof data?.count === "number") {
            setRunResultMessage((m) => ({
              ...m,
              [key]: data.count === 0 ? "Ran successfully -- nothing new this time." : `Ran successfully -- ${data.count} new item${data.count === 1 ? "" : "s"}.`,
            }));
          }
          return;
        }
        // The GitHub Actions scan is fire-and-forget from the backend's side -- it
        // actually finishes on GitHub's own infrastructure roughly a minute later, then
        // lands in the feed via /ingest-scan. Poll for a while so new drafts show up on
        // their own instead of requiring a manual page reload, and give clear feedback
        // either way -- Reddit blocking a run (its own rate limit, not a bug here) looked
        // identical to "nothing happened" with no message at all, which was confusing.
        if (!data?.githubScanTriggered) {
          loadFeed().then((items) => {
            const gained = countReddit(items) - baselineRedditCount;
            setRedditRunMessage(
              gained > 0
                ? `${gained} new draft${gained === 1 ? "" : "s"} found.`
                : "No new threads found this run (Reddit blocked the direct scan, and the GitHub Actions scan isn't connected yet). Try again later, or paste a thread below."
            );
          });
          return;
        }

        loadFeed();
        if (redditPollRef.current) clearInterval(redditPollRef.current);
        setRedditScanning(true);
        let ticks = 0;
        redditPollRef.current = setInterval(() => {
          ticks++;
          loadFeed().then((items) => {
            const gained = countReddit(items) - baselineRedditCount;
            if (gained > 0) {
              setRedditRunMessage(`${gained} new draft${gained === 1 ? "" : "s"} found.`);
              if (redditPollRef.current) clearInterval(redditPollRef.current);
              setRedditScanning(false);
              return;
            }
            if (ticks >= 10) {
              if (redditPollRef.current) clearInterval(redditPollRef.current);
              setRedditScanning(false);
              setRedditRunMessage("No new threads found this run -- Reddit blocked or rate-limited this attempt (both the direct scan and the GitHub Actions relay). Try again later, or paste a thread below.");
            }
          });
        }, 8000);
      })
      .catch((err: any) => {
        // The real gap this closes: a failed POST (network error, a real backend error,
        // a request that got killed by Vercel's own timeout) previously resolved this
        // promise chain with no .catch() at all -- the button just stopped spinning with
        // zero explanation, indistinguishable from a real run that changed nothing.
        setRunResultMessage((m) => ({ ...m, [key]: err?.message ?? "Run failed -- try again." }));
      })
      .finally(() => {
        // A real background poll is already responsible for clearing these once it
        // actually concludes -- clearing them here too, immediately, would end the
        // "Running..." state the instant the POST round-trip finishes, seconds before
        // the real work is anywhere close to done.
        if (enteredCompetitorPolling) return;
        setRunningAgent(null);
        if (runTimerRef.current) clearInterval(runTimerRef.current);
      });
  }

  function submitPastedThread() {
    const token = getOpsToken();
    if (!token || drafting || !pasteUrl.trim() || !pasteTitle.trim()) return;
    setDrafting(true);
    setDraftError(null);
    apiFetch(
      "/api/v1/ops/agents/reddit/draft-from-thread",
      { method: "POST", body: JSON.stringify({ url: pasteUrl.trim(), title: pasteTitle.trim(), body: pasteBody.trim() }) },
      token
    )
      .then(() => {
        setPasteUrl("");
        setPasteTitle("");
        setPasteBody("");
        loadFeed();
      })
      .catch((err) => setDraftError(err instanceof Error ? err.message : "Drafting failed."))
      .finally(() => setDrafting(false));
  }

  function markDone(id: string) {
    const token = getOpsToken();
    if (!token || actingOn) return;
    setActingOn(id);
    apiFetch(`/api/v1/ops/feed/${id}/done`, { method: "POST" }, token)
      .then(() => {
        setFeedItems((cur) => (cur ? cur.filter((it) => it.id !== id) : cur));
        if (preview?.item.id === id) setPreview(null);
        if (redditPreviewItem?.id === id) setRedditPreviewItem(null);
        if (geoPreviewItem?.id === id) setGeoPreviewItem(null);
        if (seoPreviewItem?.id === id) setSeoPreviewItem(null);
        if (articlePreviewItem?.id === id) setArticlePreviewItem(null);
      })
      .finally(() => setActingOn(null));
  }

  // A real, previously-built backend endpoint (regenerateRedditDraft) that had never
  // been wired to any button -- this is a real Sonnet call (same model as the initial
  // draft), not free, same as clicking "Run Reddit Agent" again would be.
  function regenerateReddit(id: string) {
    const token = getOpsToken();
    if (!token || regeneratingRedditId) return;
    setRegeneratingRedditId(id);
    apiFetch<{ id: string; content: string; metadata: RealFeedItem["metadata"] }>(`/api/v1/ops/feed/${id}/regenerate-reddit`, { method: "POST" }, token)
      .then((updated) => {
        setFeedItems((cur) => (cur ? cur.map((it) => (it.id === id ? { ...it, content: updated.content, metadata: updated.metadata } : it)) : cur));
        setRedditPreviewItem((cur) => (cur && cur.id === id ? { ...cur, content: updated.content, metadata: updated.metadata } : cur));
      })
      .finally(() => setRegeneratingRedditId(null));
  }

  const itemsByType: Record<string, RealFeedItem[]> = {};
  for (const it of feedItems ?? []) {
    (itemsByType[it.agentType] ??= []).push(it);
  }
  const hasAnyReal = Object.keys(itemsByType).length > 0;

  return (
    <div style={{ flex: "1 1 0", minWidth: 380, display: "flex", flexDirection: "column", minHeight: 0, background: "#18181a", borderRight: "1px solid #27272b" }}>
      <div style={{ flex: "0 0 auto", minHeight: 44, display: "flex", alignItems: "center", gap: 9, padding: "8px 14px", borderBottom: "1px solid #27272b", flexWrap: "wrap" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#93939c" strokeWidth="1.9" strokeLinecap="round"><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1.5" fill="#93939c" /></svg>
        <span style={{ fontSize: 13.5, color: "#f2f2f5" }}>Agents Feed</span>
        <span className="kanso-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
        <div style={{ flex: 1 }} />
        {growthMode !== null && (
          <button
            onClick={toggleGrowthMode}
            disabled={togglingMode}
            title="Switch the X Agent between company voice and personal founder voice"
            className="kanso-ghost-btn"
            style={{ height: 26, padding: "0 10px", display: "inline-flex", alignItems: "center", gap: 6, background: growthMode ? "#1a2e22" : "transparent", border: `1px solid ${growthMode ? "#2d4a35" : "#3d3d44"}`, borderRadius: 7, color: togglingMode ? C.dimmer : growthMode ? "#4ade80" : C.body2, fontSize: 11.5, cursor: togglingMode ? "default" : "pointer" }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: growthMode ? "#4ade80" : "#5a5a63" }} />
            X: {growthMode ? "Personal" : "Company"}
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {feedItems === null ? (
          // Real row shape, no real or sample titles -- while the feed is still
          // loading, this replaces what used to be an immediate flash of the fake
          // sample items (data.ts's placeholder titles) before the real fetch resolved.
          <div style={{ padding: "12px 0" }}>
            {AGENTS.map((a) => (
              <div key={a.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderBottom: "1px solid #232327" }}>
                <Skeleton width={34} height={34} radius={17} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
                  <Skeleton width={120} height={11} />
                  <Skeleton width={170} height={11} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div style={{ margin: "12px 14px 0", padding: "8px 12px", background: "#1a1a1c", border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 11.5, color: C.dim }}>
              {hasAnyReal
                ? "Live agents are marked below. The rest are not built yet -- their rows are illustrative placeholders."
                : "Sample data -- no agents are running yet. Click a \"Run\" button above to generate real recommendations."}
            </div>
            {AGENTS.map((a) => {
          const isOpen = !!open[a.key];
          const runnableEntry = RUNNABLE_AGENTS.find((r) => r.key === a.key);
          const realType = REAL_AGENT_TYPES[a.key];
          const realItems = realType ? itemsByType[realType] : undefined;
          const isReal = !!realItems && realItems.length > 0;
          const isTwitterAgent = realType === "TWITTER";
          const isLinkedInAgent = realType === "LINKEDIN";
          const isSocialAgent = isTwitterAgent || isLinkedInAgent;
          const isRedditAgent = realType === "REDDIT";
          const isGeoAgent = realType === "GEO";
          const isSeoAgent = realType === "SEO";
          const isArticlesAgent = realType === "ARTICLES";
          // Reddit is permanently draft-only, same as Articles/HN: "Copy Reply" +
          // "View Thread" (opens the real thread), never a posting action.
          const isCopyableAgent = isArticlesAgent || realType === "HACKER_NEWS" || isRedditAgent;
          // Any real run status -- an error, an in-progress "Started...", or even a
          // real success -- must suppress the fake sample fallback, not just the error
          // case. Missed the in-progress case the first time: "Started -- checking in
          // the background" isn't an error, so the old justErrored-only check let the
          // fake sample items ("ClearTax -- new SIP calculator landing page went live")
          // keep showing directly under it, looking exactly like real output sitting
          // under a real status line. The fake fallback should only ever show when
          // there is truly no run status at all -- never run, never clicked.
          const runMsg = runResultMessage[a.key];
          const hasRunStatus = !!runMsg;
          const items = isReal
            ? realItems!.map((it) => ({ title: it.title, meta: it.summary, id: it.id, content: it.content, impact: it.metadata?.estimatedImpact, angle: it.metadata?.angle, reasoning: it.metadata?.reasoning, suggestedFirstReply: it.metadata?.suggestedFirstReply, needsFactCheck: it.metadata?.needsFactCheck, subreddit: it.metadata?.subreddit, threadTitle: it.metadata?.threadTitle, permalink: it.metadata?.permalink, mentionsProduct: it.metadata?.mentionsProduct, firstComment: it.metadata?.firstComment, timingGuidance: it.metadata?.timingGuidance, commentStrategy: it.metadata?.commentStrategy, findingType: it.metadata?.findingType, severity: it.metadata?.severity, category: it.metadata?.category, keyword: it.keyword, sourceImpressions: it.metadata?.sourceImpressions }))
            : hasRunStatus
            ? []
            : a.items.map((it) => ({ ...it, id: undefined, content: undefined, impact: undefined, angle: undefined, reasoning: undefined, suggestedFirstReply: undefined, needsFactCheck: undefined, subreddit: undefined, threadTitle: undefined, permalink: undefined, mentionsProduct: undefined }));
          const baseStatus = isReal ? `${realItems!.length} ${isRedditAgent ? "opportunit" : "recommendation"}${realItems!.length === 1 ? (isRedditAgent ? "y" : "") : (isRedditAgent ? "ies" : "s")} ready` : a.status;
          const status =
            isRedditAgent && redditScanning
              ? `${baseStatus} · scanning via GitHub Actions...`
              : a.key === "competitor" && competitorScanning
              ? `${baseStatus} · checking in the background...`
              : baseStatus;

          return (
            <div key={a.key} style={{ borderBottom: "1px solid #232327" }}>
              <div
                onClick={() => setOpen((s) => ({ ...s, [a.key]: !s[a.key] }))}
                className="kanso-row-hover"
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer" }}
              >
                <span style={{ flex: "0 0 auto", width: 34, height: 34, borderRadius: "50%", background: IMAGE_ICON_AGENTS.has(a.key) ? "#232326" : a.bg, display: "grid", placeItems: "center", overflow: "hidden" }}>
                  <AgentGlyph agentKey={a.key} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#f2f2f5" }}>{a.name}</div>
                    {isReal && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />}
                  </div>
                  <div style={{ fontSize: 12.5, color: C.dim }}>{status}</div>
                </div>
                <span style={{ display: "grid", placeItems: "center", transform: isOpen ? "rotate(180deg)" : undefined }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9b9ba3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </div>
              {isOpen && (
                <div style={{ background: "#1b1b1d", borderTop: "1px solid #232327" }}>
                  {runnableEntry && (
                    <div style={{ padding: "12px 14px 0 58px" }}>
                      <RunAgentButton
                        label={runnableEntry.label}
                        isRunning={runningAgent === a.key}
                        disabled={!!runningAgent}
                        elapsedSeconds={runElapsedSeconds}
                        onClick={() => runAgent(runnableEntry.endpoint, a.key)}
                      />
                    </div>
                  )}
                  {isRedditAgent && redditRunMessage && (
                    <div style={{ margin: "12px 14px 0 58px", padding: "9px 12px", background: redditRunMessage.startsWith("No new") ? "#241c11" : "#12211a", border: `1px solid ${redditRunMessage.startsWith("No new") ? "#4a3820" : "#2d4a35"}`, borderRadius: 8, fontSize: 12, color: redditRunMessage.startsWith("No new") ? "#c9a878" : "#4ade80" }}>
                      {redditRunMessage}
                    </div>
                  )}
                  {!isRedditAgent && runMsg && (() => {
                    const isSuccess = runMsg.startsWith("Ran successfully");
                    const isNeutral = runMsg.startsWith("Started") || runMsg.startsWith("Already running");
                    return (
                      <div
                        style={{
                          margin: "12px 14px 0 58px",
                          padding: "9px 12px",
                          background: isSuccess ? "#12211a" : isNeutral ? "#1a1a1c" : "#1a1211",
                          border: `1px solid ${isSuccess ? "#2d4a35" : isNeutral ? C.border : "#3a2523"}`,
                          borderRadius: 8,
                          fontSize: 12,
                          color: isSuccess ? "#4ade80" : isNeutral ? C.dim : "#9c6b68",
                        }}
                      >
                        {runMsg}
                      </div>
                    );
                  })()}
                  {isRedditAgent && (
                    <div style={{ padding: "14px 14px 16px 58px", borderBottom: "1px solid #232327" }}>
                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.dim, marginBottom: 8 }}>
                        Paste a thread you found
                      </div>
                      <div style={{ fontSize: 11.5, color: C.dimmer, marginBottom: 10, lineHeight: 1.5 }}>
                        Reddit blocks automated scanning from most cloud servers, so the daily auto-scan above may come up empty on a given run. This always works: open a relevant thread on Reddit yourself, copy its title and body here, and Claude drafts a reply for it.
                      </div>
                      <input
                        value={pasteUrl}
                        onChange={(e) => setPasteUrl(e.target.value)}
                        placeholder="Thread URL (reddit.com/r/.../comments/...)"
                        style={{ width: "100%", height: 32, padding: "0 10px", marginBottom: 7, background: "#141416", border: "1px solid #2d2d31", borderRadius: 7, color: C.body, fontSize: 12.5, outline: "none" }}
                      />
                      <input
                        value={pasteTitle}
                        onChange={(e) => setPasteTitle(e.target.value)}
                        placeholder="Thread title"
                        style={{ width: "100%", height: 32, padding: "0 10px", marginBottom: 7, background: "#141416", border: "1px solid #2d2d31", borderRadius: 7, color: C.body, fontSize: 12.5, outline: "none" }}
                      />
                      <textarea
                        value={pasteBody}
                        onChange={(e) => setPasteBody(e.target.value)}
                        placeholder="Thread body text (optional, but helps Claude write a better reply)"
                        rows={3}
                        style={{ width: "100%", padding: "8px 10px", marginBottom: 9, background: "#141416", border: "1px solid #2d2d31", borderRadius: 7, color: C.body, fontSize: 12.5, outline: "none", resize: "vertical", fontFamily: "inherit" }}
                      />
                      {draftError && (
                        <div style={{ marginBottom: 9, fontSize: 11.5, color: "#e0857f" }}>{draftError}</div>
                      )}
                      <button
                        onClick={submitPastedThread}
                        disabled={drafting || !pasteUrl.trim() || !pasteTitle.trim()}
                        className="kanso-white-btn"
                        style={{ height: 30, padding: "0 14px", background: drafting || !pasteUrl.trim() || !pasteTitle.trim() ? "#2a2a2e" : "#fafafc", border: "none", borderRadius: 8, color: drafting || !pasteUrl.trim() || !pasteTitle.trim() ? C.faint : "#18181a", fontSize: 12.5, fontWeight: 500, cursor: drafting || !pasteUrl.trim() || !pasteTitle.trim() ? "not-allowed" : "pointer" }}
                      >
                        {drafting ? "Drafting..." : "Draft a reply"}
                      </button>
                    </div>
                  )}
                  {items.length === 0 && (
                    <div style={{ padding: "14px 14px 14px 58px", fontSize: 12, color: C.dim }}>No items yet.</div>
                  )}
                  {items.map((it: any, i: number) =>
                    isRedditAgent && it.id ? (
                      // Compact list-row design, matching the real reference screenshot --
                      // deliberately no upvote/comment counts (this project's Reddit data
                      // comes from Reddit's public RSS feed, which genuinely doesn't
                      // include those numbers; see RedditOpportunityOverlay's own comment
                      // for the same real constraint). Clicking anywhere on the row (or
                      // the button) opens the real detail panel -- it never posts anything
                      // by itself, matching this agent's permanently draft-only policy.
                      <div
                        key={it.id}
                        onClick={() => setRedditPreviewItem(realItems!.find((r) => r.id === it.id) ?? null)}
                        className="kanso-row-hover"
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px 12px 58px", cursor: "pointer", borderBottom: i < items.length - 1 ? "1px solid #202024" : "none" }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, color: "#eeeef2", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {it.subreddit && (
                              <span style={{ flex: "none", fontSize: 11, color: "#e0a95e", background: "#2a2416", border: "1px solid #4d3a1c", borderRadius: 5, padding: "1px 7px" }}>r/{it.subreddit}</span>
                            )}
                            {it.mentionsProduct && (
                              <span style={{ flex: "none", fontSize: 10, fontWeight: 600, color: "#4ade80" }}>Mentions Fermor</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRedditPreviewItem(realItems!.find((r) => r.id === it.id) ?? null);
                          }}
                          className="kanso-white-btn"
                          style={{ flex: "none", height: 30, padding: "0 16px", background: "#fafafc", border: "none", borderRadius: 8, color: "#18181a", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                        >
                          Post
                        </button>
                      </div>
                    ) : isGeoAgent && it.id && it.findingType ? (
                      // Same compact list-row pattern as Reddit's above, for GEO's real
                      // structured findings specifically (citation gaps + real llms.txt/
                      // robots.txt checks) -- a plain GEO recommendation (no findingType)
                      // still falls through to the generic row below unchanged.
                      (() => {
                        const sc = severityColors(it.severity);
                        return (
                          <div
                            key={it.id}
                            onClick={() => setGeoPreviewItem(realItems!.find((r) => r.id === it.id) ?? null)}
                            className="kanso-row-hover"
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px 12px 58px", cursor: "pointer", borderBottom: i < items.length - 1 ? "1px solid #202024" : "none" }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, color: "#eeeef2", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {it.severity && (
                                  <span style={{ flex: "none", fontSize: 11, fontWeight: 600, color: sc.color, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 5, padding: "1px 7px" }}>{it.severity}</span>
                                )}
                                {it.meta && <span style={{ fontSize: 11.5, color: C.dimmer, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.meta}</span>}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setGeoPreviewItem(realItems!.find((r) => r.id === it.id) ?? null);
                              }}
                              className="kanso-white-btn"
                              style={{ flex: "none", height: 30, padding: "0 16px", background: "#fafafc", border: "none", borderRadius: 8, color: "#18181a", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                            >
                              Fix
                            </button>
                          </div>
                        );
                      })()
                    ) : isSeoAgent && it.id && it.category ? (
                      // Same compact list-row pattern as GEO's above, for SEO's real
                      // structured recommendations (a real page + severity + category +
                      // step-by-step fix) -- a plain/older SEO recommendation (no
                      // category) still falls through to the generic row below unchanged.
                      (() => {
                        const sc = severityColors(it.severity);
                        return (
                          <div
                            key={it.id}
                            onClick={() => setSeoPreviewItem(realItems!.find((r) => r.id === it.id) ?? null)}
                            className="kanso-row-hover"
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px 12px 58px", cursor: "pointer", borderBottom: i < items.length - 1 ? "1px solid #202024" : "none" }}
                          >
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, color: "#eeeef2", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {it.severity && (
                                  <span style={{ flex: "none", fontSize: 11, fontWeight: 600, color: sc.color, background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 5, padding: "1px 7px" }}>{it.severity}</span>
                                )}
                                {it.category && <span style={{ flex: "none", fontSize: 11, color: C.dim, background: "#232326", border: `1px solid ${C.border}`, borderRadius: 5, padding: "1px 7px" }}>{it.category}</span>}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSeoPreviewItem(realItems!.find((r) => r.id === it.id) ?? null);
                              }}
                              className="kanso-white-btn"
                              style={{ flex: "none", height: 30, padding: "0 16px", background: "#fafafc", border: "none", borderRadius: 8, color: "#18181a", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                            >
                              Fix
                            </button>
                          </div>
                        );
                      })()
                    ) : isArticlesAgent && it.id ? (
                      // Compact row matching the real reference design -- a real
                      // keyword badge (with real GSC impressions this article's
                      // keyword was actually picked from, not a fabricated "search
                      // volume" figure this project has no real source for) and a
                      // funnel-stage badge (a real, deterministic heuristic from the
                      // keyword's own phrasing, not a Claude classification -- see
                      // inferFunnelStage's own comment). Clicking opens the real,
                      // fully-rendered article view (ArticleOverlay).
                      <div
                        key={it.id}
                        onClick={() => setArticlePreviewItem(realItems!.find((r) => r.id === it.id) ?? null)}
                        className="kanso-row-hover"
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px 12px 58px", cursor: "pointer", borderBottom: i < items.length - 1 ? "1px solid #202024" : "none" }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, color: "#eeeef2", marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {it.keyword && (
                              <span style={{ flex: "none", fontSize: 11, color: C.dim, background: "#232326", border: `1px solid ${C.border}`, borderRadius: 5, padding: "1px 7px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>
                                {it.keyword}{typeof it.sourceImpressions === "number" ? ` · ${it.sourceImpressions.toLocaleString()} impr.` : ""}
                              </span>
                            )}
                            <span style={{ flex: "none", fontSize: 11, color: C.dim, background: "#232326", border: `1px solid ${C.border}`, borderRadius: 5, padding: "1px 7px" }}>{inferFunnelStage(it.keyword)}</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setArticlePreviewItem(realItems!.find((r) => r.id === it.id) ?? null);
                          }}
                          className="kanso-white-btn"
                          style={{ flex: "none", height: 30, padding: "0 16px", background: "#fafafc", border: "none", borderRadius: 8, color: "#18181a", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                        >
                          Read
                        </button>
                      </div>
                    ) : isLinkedInAgent && it.id ? (
                      // Compact row matching the real reference design -- a real
                      // headline (the model's own `hook` field, a real one-line
                      // summary of what this specific post says) and a real one-line
                      // preview (the post's own actual first line, not a character
                      // count). "View" opens the exact same real, already-working
                      // SocialPostPreviewOverlay every LinkedIn draft already used
                      // (real posting, real regenerate, real editable text) -- this
                      // row is just a cleaner way to reach it, not a new draft flow.
                      <div
                        key={it.id}
                        onClick={() => onOpenSocialDraft("linkedin", { id: it.id, content: it.content, reasoning: it.reasoning, needsFactCheck: it.needsFactCheck })}
                        className="kanso-row-hover"
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px 12px 58px", cursor: "pointer", borderBottom: i < items.length - 1 ? "1px solid #202024" : "none" }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, color: "#eeeef2", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.title}</div>
                          <div style={{ fontSize: 11.5, color: C.dimmer, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.meta}</div>
                        </div>
                        {postedSocialIds[it.id] ? (
                          <a href={postedSocialIds[it.id]} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ flex: "none", display: "inline-grid", height: 30, padding: "0 14px", placeItems: "center", background: "transparent", border: "1px solid #2d4a35", borderRadius: 8, color: "#4ade80", fontSize: 12.5, textDecoration: "none" }}>
                            Posted &rarr;
                          </a>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenSocialDraft("linkedin", { id: it.id, content: it.content, reasoning: it.reasoning, needsFactCheck: it.needsFactCheck });
                            }}
                            className="kanso-white-btn"
                            style={{ flex: "none", height: 30, padding: "0 16px", background: "#fafafc", border: "none", borderRadius: 8, color: "#18181a", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                          >
                            View
                          </button>
                        )}
                      </div>
                    ) : isTwitterAgent && it.id ? (
                      // Real tweet text shown in full inline (not truncated to a title
                      // line + separate button), matching the real reference design --
                      // a checkmark marks the draft done, "Post" opens the same real,
                      // already-working compose/post overlay every other social draft
                      // already uses (SocialPostPreviewOverlay: real posting via the
                      // connected account, real "Preview on X," real regenerate). This
                      // row is just a different way to get there, not a new posting path.
                      <div key={it.id} style={{ padding: "14px 14px 14px 58px", borderBottom: i < items.length - 1 ? "1px solid #202024" : "none" }}>
                        <div style={{ fontSize: 13, color: "#eeeef2", lineHeight: 1.6, whiteSpace: "pre-wrap", marginBottom: 12 }}>{it.content}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button
                            onClick={() => markDone(it.id)}
                            disabled={actingOn === it.id}
                            title="Mark done"
                            style={{ width: 30, height: 30, display: "grid", placeItems: "center", background: "transparent", border: "1px solid #3d3d44", borderRadius: 8, color: actingOn === it.id ? C.dimmer : C.body2, cursor: actingOn === it.id ? "default" : "pointer" }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          </button>
                          <div style={{ flex: 1 }} />
                          {postedSocialIds[it.id] ? (
                            <a href={postedSocialIds[it.id]} target="_blank" rel="noopener noreferrer" style={{ display: "inline-grid", height: 30, padding: "0 14px", placeItems: "center", background: "transparent", border: "1px solid #2d4a35", borderRadius: 8, color: "#4ade80", fontSize: 12.5, textDecoration: "none" }}>
                              Posted &rarr;
                            </a>
                          ) : (
                            <button
                              onClick={() => onOpenSocialDraft("twitter", { id: it.id, content: it.content, angle: it.angle, reasoning: it.reasoning, suggestedFirstReply: it.suggestedFirstReply, needsFactCheck: it.needsFactCheck })}
                              className="kanso-white-btn"
                              style={{ height: 30, padding: "0 16px", display: "inline-flex", alignItems: "center", gap: 6, background: "#fafafc", border: "none", borderRadius: 8, color: "#18181a", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#18181a" stroke="none"><path d="M4.6 4.2h4.1l3.9 5.4 4.8-5.4h2.1l-5.8 6.9 6.1 8.7h-4.1L11.6 14l-5.5 5.8H4l6.2-7.2z" /></svg>
                              Post
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                    <div key={it.id ?? i} style={{ borderBottom: i < items.length - 1 ? "1px solid #202024" : "none" }}>
                      <div style={{ padding: "12px 14px 12px 58px" }}>
                        <div style={{ marginBottom: 10 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                            <div style={{ fontSize: 12.5, color: "#eeeef2", lineHeight: 1.55 }}>{it.title}</div>
                            {it.needsFactCheck && (
                              <span title={`Needs fact-check: ${it.needsFactCheck}`} style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: "#e0a95e", background: "#2e2312", border: "1px solid #4d3a1c", borderRadius: 5, padding: "1px 6px" }}>
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 9v4M12 17h.01" /><circle cx="12" cy="12" r="9" /></svg>
                                Verify
                              </span>
                            )}
                            {isRedditAgent && it.mentionsProduct && (
                              <span title="This reply mentions fermor.in -- check it reads naturally before posting" style={{ flex: "none", fontSize: 10, fontWeight: 600, color: "#4ade80", background: "#122117", border: "1px solid #1f3d2c", borderRadius: 5, padding: "1px 6px" }}>
                                Mentions Fermor
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 11.5, color: C.dimmer }}>
                            {it.impact ? `${it.impact} · ` : ""}
                            {it.meta}
                          </div>
                        </div>
                        {it.id && isSocialAgent && postedSocialIds[it.id] ? (
                          <a
                            href={postedSocialIds[it.id]}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-grid", height: 27, padding: "0 12px", placeItems: "center", background: "transparent", border: "1px solid #2d4a35", borderRadius: 7, color: "#4ade80", fontSize: 12, textDecoration: "none" }}
                          >
                            Posted &rarr;
                          </a>
                        ) : (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            <button
                              onClick={() =>
                                it.id && isSocialAgent
                                  ? onOpenSocialDraft(isTwitterAgent ? "twitter" : "linkedin", { id: it.id, content: it.content, angle: it.angle, reasoning: it.reasoning, suggestedFirstReply: it.suggestedFirstReply, needsFactCheck: it.needsFactCheck })
                                  : it.id
                                  ? setPreview({
                                      item: {
                                        id: it.id,
                                        title: it.title,
                                        content: it.content ?? "",
                                        impact: it.impact,
                                        angle: it.angle,
                                        reasoning: it.reasoning,
                                        needsFactCheck: it.needsFactCheck,
                                        permalink: it.permalink,
                                        mentionsProduct: it.mentionsProduct,
                                        firstComment: it.firstComment,
                                        timingGuidance: it.timingGuidance,
                                        commentStrategy: it.commentStrategy,
                                      },
                                      agentName: a.name,
                                      isCopyable: isCopyableAgent,
                                      isRedditAgent,
                                    })
                                  : it.action === "Preview"
                                  ? onOpenVideo()
                                  : onOpenStrategyDoc()
                              }
                              className="kanso-ghost-btn"
                              style={{ flex: "0 0 auto", height: 27, padding: "0 12px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: C.body2, fontSize: 12, cursor: "pointer" }}
                            >
                              {isSocialAgent && it.id ? "Open" : it.id ? "Read" : it.action}
                            </button>
                            {it.id && isRedditAgent && it.permalink && (
                              <a
                                href={it.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="kanso-ghost-btn"
                                style={{ flex: "0 0 auto", height: 27, padding: "0 12px", display: "inline-grid", placeItems: "center", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: C.body2, fontSize: 12, textDecoration: "none" }}
                              >
                                View Thread
                              </a>
                            )}
                            {it.id && isCopyableAgent && (
                              <button
                                onClick={() => copyContent(it.id, it.content)}
                                className="kanso-ghost-btn"
                                style={{ flex: "0 0 auto", height: 27, padding: "0 12px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: copiedId === it.id ? "#4ade80" : C.body2, fontSize: 12, cursor: "pointer" }}
                              >
                                {copiedId === it.id ? "Copied" : isArticlesAgent ? "Copy Markdown" : isRedditAgent ? "Copy Reply" : "Copy"}
                              </button>
                            )}
                            {it.id && (
                              <button
                                onClick={() => markDone(it.id)}
                                disabled={actingOn === it.id}
                                className="kanso-ghost-btn"
                                style={{ flex: "0 0 auto", height: 27, padding: "0 12px", background: "transparent", border: "1px solid #3d3d44", borderRadius: 7, color: actingOn === it.id ? C.dimmer : C.body2, fontSize: 12, cursor: actingOn === it.id ? "default" : "pointer" }}
                              >
                                {actingOn === it.id ? "..." : "Done"}
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
          </>
        )}
        <div style={{ height: 40 }} />
      </div>

      <FeedItemPreviewOverlay
        item={preview?.item ?? null}
        agentName={preview?.agentName ?? ""}
        isCopyable={preview?.isCopyable ?? false}
        isRedditAgent={preview?.isRedditAgent ?? false}
        onClose={() => setPreview(null)}
        onCopy={() => preview && copyContent(preview.item.id, preview.item.content)}
        copied={!!preview && copiedId === preview.item.id}
        onDone={() => preview && markDone(preview.item.id)}
        actingOn={!!preview && actingOn === preview.item.id}
      />

      <RedditOpportunityOverlay
        item={
          redditPreviewItem
            ? {
                id: redditPreviewItem.id,
                content: redditPreviewItem.content,
                threadTitle: redditPreviewItem.metadata?.threadTitle ?? redditPreviewItem.title,
                postSelftext: redditPreviewItem.metadata?.postSelftext ?? "",
                subreddit: redditPreviewItem.metadata?.subreddit ?? "",
                author: redditPreviewItem.metadata?.author ?? null,
                postedAt: redditPreviewItem.metadata?.postedAt ?? null,
                permalink: redditPreviewItem.metadata?.permalink ?? "",
                mentionsProduct: redditPreviewItem.metadata?.mentionsProduct,
                needsFactCheck: redditPreviewItem.metadata?.needsFactCheck,
              }
            : null
        }
        onClose={() => setRedditPreviewItem(null)}
        onDone={() => redditPreviewItem && markDone(redditPreviewItem.id)}
        actingOn={!!redditPreviewItem && actingOn === redditPreviewItem.id}
        onRegenerate={() => redditPreviewItem && regenerateReddit(redditPreviewItem.id)}
        regenerating={!!redditPreviewItem && regeneratingRedditId === redditPreviewItem.id}
      />

      <GeoFindingOverlay
        item={
          geoPreviewItem && geoPreviewItem.metadata?.findingType
            ? {
                id: geoPreviewItem.id,
                title: geoPreviewItem.title,
                findingType: geoPreviewItem.metadata.findingType,
                severity: geoPreviewItem.metadata.severity ?? "Medium",
                query: geoPreviewItem.metadata.query ?? null,
                competitor: geoPreviewItem.metadata.competitor ?? null,
                whatsHappening: geoPreviewItem.metadata.whatsHappening ?? geoPreviewItem.content,
                codeableFixes: geoPreviewItem.metadata.codeableFixes ?? [],
                contentFixes: geoPreviewItem.metadata.contentFixes ?? [],
                priorities: geoPreviewItem.metadata.priorities ?? [],
              }
            : null
        }
        onClose={() => setGeoPreviewItem(null)}
        onDone={() => geoPreviewItem && markDone(geoPreviewItem.id)}
        actingOn={!!geoPreviewItem && actingOn === geoPreviewItem.id}
        onAskCmo={onAskCmo}
      />

      <SeoRecommendationOverlay
        item={
          seoPreviewItem && seoPreviewItem.metadata?.category
            ? {
                id: seoPreviewItem.id,
                title: seoPreviewItem.title,
                content: seoPreviewItem.content,
                severity: seoPreviewItem.metadata.severity ?? "Medium",
                category: seoPreviewItem.metadata.category,
                page: seoPreviewItem.metadata.page ?? "?",
                overview: seoPreviewItem.metadata.overview ?? seoPreviewItem.content,
                steps: seoPreviewItem.metadata.steps ?? [],
                expectedImpact: seoPreviewItem.metadata.expectedImpact ?? [],
              }
            : null
        }
        onClose={() => setSeoPreviewItem(null)}
        onDone={() => seoPreviewItem && markDone(seoPreviewItem.id)}
        actingOn={!!seoPreviewItem && actingOn === seoPreviewItem.id}
        onAskCmo={onAskCmo}
      />

      <ArticleOverlay
        item={
          articlePreviewItem
            ? {
                id: articlePreviewItem.id,
                title: articlePreviewItem.title,
                content: articlePreviewItem.content,
                keyword: articlePreviewItem.keyword,
                wordCount: articlePreviewItem.wordCount,
              }
            : null
        }
        onClose={() => setArticlePreviewItem(null)}
        onDone={() => articlePreviewItem && markDone(articlePreviewItem.id)}
        actingOn={!!articlePreviewItem && actingOn === articlePreviewItem.id}
      />
    </div>
  );
}

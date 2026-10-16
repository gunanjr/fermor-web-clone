"use client";

import { useState } from "react";

// These four are copied byte-exact from the Kanso design project's icons/ folder
// (public/ops-icons/) rather than hand-authored -- binary assets shouldn't be transcribed.

export function SeoAgentIcon({ size = 20 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/ops-icons/seo-agent.svg" alt="" width={size} height={size} style={{ display: "block", width: size, height: size }} />;
}

export function RedditIcon({ size = 19 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/ops-icons/reddit.png" alt="" width={size} height={size} style={{ display: "block", width: size, height: size, objectFit: "contain" }} />;
}

export function GscIcon({ size = 26 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/ops-icons/gsc.png" alt="" width={size} height={size} style={{ display: "block", width: size, height: size, objectFit: "contain" }} />;
}

export function GaIcon({ size = 26 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/ops-icons/ga.png" alt="" width={size} height={size} style={{ display: "block", width: size, height: size, objectFit: "contain" }} />;
}

export function KansoMarkIcon({ size = 26 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/ops-icons/kanso-mark.png" alt="Kanso" width={size} height={size} style={{ display: "block", width: size, height: size, objectFit: "contain" }} />;
}

// Real favicon for any real domain, fetched via Google's free public favicon service --
// no API key, no per-request cost, no rate limit that matters at this scale (the same
// zero-third-party-cost approach already used for the internal link audit). This is
// what actually shows a competitor's or any other site's real icon instead of a made-up
// colored letter, and works for any domain handed to it, not just a hardcoded list --
// the same mechanism Okara uses, so this generalizes correctly if Kanso is ever pointed
// at a different company's site or a newly-added competitor. Falls back to a colored
// initial only if the image genuinely fails to load, never a visibly broken icon.
export function Favicon({ domain, size = 20, fallbackLabel, fallbackColor = "#3d3d44" }: { domain: string; size?: number; fallbackLabel: string; fallbackColor?: string }) {
  const [failed, setFailed] = useState(false);
  const radius = size <= 22 ? 5 : 6;
  if (failed) {
    return (
      <span style={{ flex: "none", width: size, height: size, borderRadius: radius, background: fallbackColor, display: "grid", placeItems: "center", fontSize: Math.round(size * 0.5), fontWeight: 600, color: "#fff" }}>
        {fallbackLabel.slice(0, 1).toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      // A fixed, generously large request size, not scaled to this instance's display
      // size -- Google's favicon service returns a noticeably lower-quality image for a
      // small requested sz (the old `size * 2` was often only 38-40px), and upscaling
      // that to fill a high-DPI display looks visibly pixelated. Requesting a large,
      // fixed canvas and letting the browser downscale it to the real display size
      // looks crisp regardless of screen density.
      src={`https://www.google.com/s2/favicons?sz=128&domain=${encodeURIComponent(domain)}`}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{ flex: "none", display: "block", width: size, height: size, borderRadius: radius, background: "#232326" }}
    />
  );
}

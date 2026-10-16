'use client';

/**
 * One scroll listener and one rAF for every JS-driven scroll effect on the page.
 *
 * Each effect used to own a `scroll` listener and its own rAF. With five of them running, an
 * abrupt wheel flick queued five separate frames, each doing its own `getBoundingClientRect`
 * against a layout the previous one had already dirtied, and the whole thing degenerated into
 * a read/write/read/write chain that the browser had to resolve synchronously. This is the
 * same work behind a single frame: the scroll position is read once, then every subscriber is
 * called with it, in registration order.
 *
 * Subscribers are expected to do their reads first and their writes second within their own
 * callback; that ordering is theirs to keep, but at least they are no longer interleaved
 * across four separate rAFs.
 *
 * The loop is idle when nothing is scrolling: a frame is only requested when a scroll or
 * resize actually fires, and the flag stops a burst of events from queueing several.
 */

export type ScrollState = {
  /** window.scrollY at the top of this frame. */
  y: number;
  /** Signed distance from the previous delivered frame. Large means the user jumped. */
  dy: number;
  /** window.innerHeight, read once. */
  vh: number;
  /** True when this frame came from a resize rather than a scroll. */
  resized: boolean;
};

type Subscriber = (s: ScrollState) => void;

const subs = new Set<Subscriber>();
let ticking = false;
let listening = false;
let lastY = 0;
let pendingResize = false;

function frame() {
  ticking = false;
  const y = typeof window === 'undefined' ? 0 : window.scrollY;
  const state: ScrollState = {
    y,
    dy: y - lastY,
    vh: window.innerHeight || 1,
    resized: pendingResize,
  };
  lastY = y;
  pendingResize = false;
  // Copied because a subscriber is allowed to unsubscribe itself from inside its callback.
  for (const fn of Array.from(subs)) {
    try {
      fn(state);
    } catch {
      /* one broken effect must not stop the others from updating this frame */
    }
  }
}

export function requestScrollFrame() {
  if (ticking || typeof window === 'undefined') return;
  ticking = true;
  requestAnimationFrame(frame);
}

function onScroll() {
  requestScrollFrame();
}

function onResize() {
  pendingResize = true;
  requestScrollFrame();
}

/**
 * Register an effect. Returns its unsubscribe. The callback fires once immediately so a
 * freshly mounted effect lands on the correct state instead of waiting for the first scroll.
 */
export function onScrollFrame(fn: Subscriber): () => void {
  subs.add(fn);
  if (typeof window !== 'undefined' && !listening) {
    listening = true;
    lastY = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }
  requestScrollFrame();
  return () => {
    subs.delete(fn);
    if (subs.size === 0 && listening) {
      listening = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
  };
}

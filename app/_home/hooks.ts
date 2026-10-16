'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* ============================================================
   TYPES
   ============================================================ */
export type BP = { m: boolean; t: boolean; d: boolean; w: number; h: number };
export type IconProps = { size?: number };
export type IconComp = (props: IconProps) => React.ReactElement;

/* ============================================================
   HOOKS
   ============================================================ */
/**
 * Breakpoint flags plus the raw viewport size, for the homepage's inline-style layout.
 *
 * The subtlety is what counts as a change worth re-rendering for. Every consumer of this hook
 * is high in the homepage tree, so one setBp re-renders most of the page - and on a phone,
 * `resize` fires continuously *while scrolling*, because showing and hiding the URL bar changes
 * window.innerHeight by 50-100px. The previous version re-rendered on every one of those, so
 * scrolling a phone meant re-rendering the entire homepage repeatedly mid-gesture, which is
 * precisely the kind of main-thread work that reads as scroll stutter.
 *
 * Width changes always matter (they can flip a breakpoint and re-choreograph a section). Height
 * changes only matter when they are big enough to be a real viewport change - an orientation
 * flip or a desktop window resize - rather than browser chrome sliding in and out. HEIGHT_EPS
 * is set above the tallest mobile URL bar so that motion is ignored and a genuine resize is not.
 */
const HEIGHT_EPS = 140;

export function useBP(): BP {
  const [bp, setBp] = useState<BP>({ m: true, t: false, d: false, w: 375, h: 720 });
  useIsomorphicLayoutEffect(() => {
    const get = (): BP => {
      const w = window.innerWidth;
      // Height matters now that the hero composition is a vertical stack sized to the fold.
      return { m: w < 760, t: w >= 760 && w < 1080, d: w >= 1080, w, h: window.innerHeight };
    };
    setBp(get());
    let r: ReturnType<typeof requestAnimationFrame>;
    const h = () => {
      cancelAnimationFrame(r);
      r = requestAnimationFrame(() => {
        const next = get();
        setBp(prev => {
          if (prev.w === next.w && Math.abs(prev.h - next.h) < HEIGHT_EPS) return prev;
          return next;
        });
      });
    };
    window.addEventListener('resize', h);
    return () => { window.removeEventListener('resize', h); cancelAnimationFrame(r); };
  }, []);
  return bp;
}

export function useReveal(): [React.MutableRefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }); },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/**
 * Like useReveal, but it keeps watching: the flag goes true on entry and back to false once the
 * element has left completely, so an animation bound to it replays every time the element is
 * scrolled back into view rather than latching on the first pass.
 *
 * Two thresholds, not one, and that is the whole point of the hysteresis. Resetting at the same
 * ratio that triggers would run the animation backwards in front of the reader on the way out;
 * arming at 0.25 and only disarming at 0 means the reset always happens off screen. One
 * observer for the life of the component, so nothing accumulates however often it is crossed.
 */
export function useRepeatReveal(): [React.MutableRefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.intersectionRatio >= 0.25) setVisible(true);
          else if (!e.isIntersecting) setVisible(false);
        });
      },
      { threshold: [0, 0.25] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/**
 * "Hanging bar" scroll physics: one shared vertical offset for an entire element, behaving like
 * a weight hung from the page rather than fixed to it -- it lags behind the scroll motion and
 * swings to catch up, with real momentum, rather than tracking the scroll 1:1 or teleporting.
 *
 * Two earlier versions of this were tried and both had a real, specific problem, not just "felt
 * off":
 * 1. A velocity-into-spring version used the RAW frame-to-frame delta of window.scrollY as the
 *    drive signal. A plain mouse wheel (no smooth-scroll library intercepting it) advances
 *    scrollY in large discrete jumps, not smooth per-frame increments, so that raw delta itself
 *    is spiky -- feeding a spike straight into a spring produces a visible jump/snap no matter
 *    how the spring's own ease/decay is tuned, because the spring was never the jumpy part, its
 *    input was.
 * 2. A purely position-based version (offset as a function of the element's current spot in the
 *    viewport, no velocity at all) was perfectly smooth but had no "bar" quality to it -- it's
 *    a fixed curve, not something with weight that swings and settles, so it didn't feel like
 *    anything was hanging or reacting to how fast you scrolled.
 *
 * The fix: smooth the scroll signal itself before differentiating it, the same way a real
 * smooth-scroll library (Jeton's own site runs Lenis, confirmed by `class="lenis lenis-smooth"`
 * on its <html>) would -- `smoothY` chases the real `window.scrollY` with its own lerp
 * (`scrollCatchup`) every frame, so a single large wheel jump in real scrollY arrives at the
 * velocity calculation spread across several frames instead of as one spike. That smoothed
 * velocity then drives a spring (`current`, via `strength`/`ease`/`decay`) for the actual
 * on-screen offset, which is what gives the hanging-bar feel: heavier/faster scrolling swings
 * it further, and it eases back to resting once scrolling stops, rather than snapping.
 *
 * Direction: scrollY DECREASING (scrolling up, toward the top) means the page's own content
 * slides DOWN on screen (screenY = docY - scrollY, so screenY grows as scrollY shrinks) --
 * scrolling up should make the bar swing down, matching that on-screen motion rather than
 * opposing it; scrolling down makes content slide up, so the bar swings up.
 *
 * The loop runs continuously (not just triggered per scroll event) while the element is near
 * the viewport, because smoothY needs multiple frames to catch up to a real scrollY jump even
 * after the triggering scroll event has already fired -- an event-woken, event-put-to-sleep
 * loop would cut that catch-up motion short. The IntersectionObserver instead gates the whole
 * loop off while the wordmark is nowhere near the viewport, so it isn't animating unseen.
 */
export function useWordHangingBar(opts?: { strength?: number; ease?: number; decay?: number; scrollCatchup?: number }) {
  const containerRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<SVGElement | HTMLElement | null>(null);
  const strength = opts?.strength ?? 0.045;
  const ease = opts?.ease ?? 0.16;
  const decay = opts?.decay ?? 0.92;
  const scrollCatchup = opts?.scrollCatchup ?? 0.12;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    let active = false;
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { active = e.isIntersecting; }); },
      { rootMargin: '250px 0px' }
    );
    io.observe(container);

    let smoothY = window.scrollY;
    let current = 0;
    let raf: ReturnType<typeof requestAnimationFrame> | null = null;
    // Max distance smoothY is allowed to move in a single frame, in pixels. An earlier version
    // of this clamp capped the raw scrollY delta but then still wrote the true, unclamped realY
    // into its own "last position" bookkeeping every frame -- so a single huge jump in realY
    // (dragging the scrollbar, pressing End, or an overscroll/boundary-clamp bounce right where
    // this wordmark lives) got capped for exactly one frame and then snapped in on the very
    // next one anyway, since the bookkeeping variable had already silently absorbed the full
    // jump. Clamping smoothY's own per-frame step instead removes that class of bug entirely:
    // there's no second variable that can leak the true position back in early, so a huge jump
    // in realY can only ever pull smoothY at this same max rate, frame after frame, until it
    // actually catches up -- a boundary spike gets smoothed exactly like fast scrolling does,
    // not "smoothed for one frame."
    const MAX_STEP = 40;

    const step = () => {
      const realY = window.scrollY;
      const prevSmoothY = smoothY;
      const desiredStep = (realY - smoothY) * scrollCatchup;
      const clampedStep = Math.max(-MAX_STEP, Math.min(MAX_STEP, desiredStep));
      smoothY += clampedStep;
      const velocity = smoothY - prevSmoothY;

      const target = -velocity * strength * 100;
      current += (target - current) * ease;
      current *= decay;

      const el = targetRef.current;
      if (el) el.style.transform = `translateY(${current.toFixed(3)}px)`;

      const settled = Math.abs(current) < 0.05 && Math.abs(realY - smoothY) < 0.5;
      raf = active && !settled ? requestAnimationFrame(step) : null;
    };
    const wake = () => { if (raf == null) raf = requestAnimationFrame(step); };
    window.addEventListener('scroll', wake, { passive: true });
    wake();

    return () => {
      window.removeEventListener('scroll', wake);
      if (raf != null) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [strength, ease, decay, scrollCatchup]);

  return { containerRef, targetRef };
}


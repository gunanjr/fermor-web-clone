'use client';

/**
 * Homepage band 4, first half: the scroll-driven "Bring it all together" story, rebuilt from the
 * reference recording frame by frame. The reference's red/orange accent is Fermor's #75FB90 and
 * the whole thing sits on the dark band rather than on white.
 *
 * The narrative, against one continuous scroll progress:
 *
 *   headline holds large -> five financial cards fly in from five different edges, staggered,
 *   converging all the way to the centre -> they physically stack on top of one another, each
 *   still partly visible under the next -> the headline shrinks and recedes behind the stack as
 *   it forms, fully hidden by the time the stack settles -> the stack lifts and fades -> Analyze,
 *   then Plan, then Invest arrive one at a time and centre as a group -> the three hold.
 *
 * The reference's final stage (a full-bleed #75FB90 field carrying a phone with "Simple" /
 * "fast & safe") is implemented but not part of the active homepage sequence: pass
 * `showFinalStage` to opt back into it for reuse elsewhere. Left off, the timeline and its
 * runway end cleanly at the Analyze/Plan/Invest hold instead of reserving scroll distance for a
 * stage that never plays.
 *
 * Pinned by the browser: the stage is `position: sticky` and the compositor holds it against the
 * viewport for the length of the wrapper. ScrollTrigger is still avoided on purpose - the hero
 * already owns a pinned ScrollTrigger, and a second pin on the same page is the usual way to end
 * up with a fighting scroll position.
 *
 * This used to pin itself, by writing a counter-transform computed from getBoundingClientRect()
 * on every frame. That is a main-thread feedback loop: the scroll composites immediately, the
 * rAF callback reads the new position a frame later, and the correcting transform only lands on
 * the frame after that - so the "pinned" stage actually rode the scroll for a frame and was
 * yanked back on the next, continuously. Measured on a real phone swipe it moved ~14px per frame
 * and reversed direction 45 times across a handful of swipes, which is exactly the vibration
 * this section was reported to have. Sticky has no round trip, so there is nothing to correct.
 *
 * Sticky requires that no ancestor be a scroll container, which is why this wrapper and
 * [data-fp-page] use `overflow: clip` rather than `hidden` (clip is not a scrollable overflow
 * value). The long note in SectionPanels.tsx has the detail.
 *
 * The scroll position is the single source of truth: this file subscribes once to the shared
 * onScrollFrame scheduler, reads progress, and writes transform/opacity straight to the DOM
 * through refs. No second scroll listener, no wheel handler, no scrollTo, no document-height
 * change, and the section's height is fixed in CSS from first paint so nothing shifts on
 * hydration. React renders this once; the timeline never sets state, so a full scroll of the
 * band costs no rerenders.
 */

import { useEffect, useRef } from 'react';
import { onScrollFrame } from './scrollScheduler';

/* ============================================================
   TIMELINE
   Progress is 0 at the moment the stage pins and 1 at the end of the runway. Windows overlap
   where the reference overlaps: the stack starts leaving while still settling, and Add is
   already arriving as it clears. Sized for the default (no final stage) sequence; ACT_OUT,
   FIELD_RISE and FINAL_IN are only consulted when `showFinalStage` is on, and would need
   retiming against a longer runway to reintroduce that stage for reuse.
   ============================================================ */
/* Widened from 220 so the card convergence (the part readers found too fast to track) plays out
   over roughly 2.4x more scroll distance, with every window below rescaled to match rather than
   left to compress relative to a shorter runway. */
const RUNWAY_VH = 380;

const HEAD_SHRINK: [number, number] = [0.02, 0.56];
const STACK_EXIT: [number, number] = [0.56, 0.66];
/* Add, then Send, then Exchange, with a real gap between each window rather than the ~0.01
   overlap this used to have - the previous windows ([.64,.73],[.72,.81],[.80,.89]) could in
   principle have two items mid-fade in the same frame, which is exactly what "must not appear
   together" rules out. Once a window closes its item stays at full opacity (see the `t` reveal
   math below, which only ever climbs to 1 and holds), so this still ends on the same "Add, Send
   and Exchange all visible as a group" resting state described above - only the arrival order is
   now unambiguous. */
const ACT_IN: [number, number][] = [[0.64, 0.715], [0.725, 0.80], [0.81, 0.885]];
const ACT_OUT: [number, number] = [0.855, 0.915];
const FIELD_RISE: [number, number] = [0.80, 0.93];
const FINAL_IN: [number, number] = [0.875, 0.99];

/* ============================================================
   MATHS
   ============================================================ */
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (p: number, [a, b]: [number, number]) => clamp01((p - a) / (b - a));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** Reference easing: things arrive fast and settle, they do not drift in linearly. */
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const inCubic = (t: number) => t * t * t;
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* ============================================================
   CARDS
   Offsets are px against a 1440 design and are scaled by `k` at runtime, so the stack keeps its
   shape on every width instead of being re-choreographed per breakpoint. `from` is off-stage in
   the direction the card arrives from: four cards from the four corners (photo top left, send
   top right, exchange bottom left, second screen bottom right) and the contact card straight
   down from the top. `to` is no longer a spread collage: every card converges on the same
   centre point, offset only by a few px so each layer still peeks out from under the next - a
   physical pile, not five cards parked side by side. Every `rot` is [0,0]: no card tilts at any
   point, entering or settled.
   `win` starts are deliberately out of array order (send first, contact last) so the arrival
   feels shuffled rather than card-1-then-2-then-3; `z` follows finishing order, so whichever
   card lands last sits on top of the pile, the way a hand of cards actually stacks. `scale` is
   the card's resting size once stacked - lower in the pile reads very slightly smaller, which is
   the whole depth cue since nothing here can actually change render order mid-frame.
   ============================================================ */
type Card = {
  id: string;
  win: [number, number];
  from: [number, number];
  to: [number, number];
  rot: [number, number];
  z: number;
  scale: number;
};

/* Four cards from the four corners (screen-a top-left, send top-right, exchange bottom-left,
   screen-b bottom-right) and one from straight above (contact). Every `rot` is [0,0]: cards no
   longer tilt at any point, in flight or settled, so the stack reads as a neat straight-edged
   pile rather than a fanned hand of cards. */
const CARDS: Card[] = [
  { id: 'screen-a', win: [0.06, 0.38], from: [-780, -560], to: [-26, -14], rot: [0, 0], z: 2, scale: 0.925 },
  { id: 'exchange', win: [0.14, 0.46], from: [-760, 600], to: [14, -20], rot: [0, 0], z: 4, scale: 0.975 },
  { id: 'send', win: [0.03, 0.35], from: [820, -420], to: [-14, 14], rot: [0, 0], z: 1, scale: 0.90 },
  { id: 'contact', win: [0.18, 0.56], from: [-40, -700], to: [6, -6], rot: [0, 0], z: 5, scale: 1.0 },
  { id: 'screen-b', win: [0.10, 0.42], from: [760, 600], to: [22, 10], rot: [0, 0], z: 3, scale: 0.95 },
];

/* #3B55DF is sampled directly from the Investments card artwork (public/images/home-section3/
   card-investments.webp): averaged ~11.7k background pixels across the card's flat blue region,
   excluding near-white text/buttons and near-black text, giving RGB(59,85,223). Purple and green
   reuse values already in use nearby - #9e79ff is the brand purple from DeepRecaps' gradient
   panel, #75FB90 is this same section's own green (previously the "Add" tint). */
const ACTIONS = [
  { id: 'add', label: 'Analyze', tint: '#3B55DF', ink: '#FFFFFF' },
  { id: 'send', label: 'Plan', tint: '#9E79FF', ink: '#FFFFFF' },
  { id: 'exchange', label: 'Invest', tint: '#75FB90', ink: '#0C1A10' },
];

/* ============================================================
   ICONS
   ============================================================ */
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 3L3 10.5l7.5 3L14 21z" />
  </svg>
);
const SwapIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 8h13l-3-3M20 16H7l3 3" />
  </svg>
);
const ACT_ICON: Record<string, () => React.ReactElement> = { add: PlusIcon, send: SendIcon, exchange: SwapIcon };

/* ============================================================
   SECTION
   ============================================================ */
type UnifyShowcaseProps = {
  /** Opts back into the reference's closing field + phone stage, kept for reuse but off by
      default on the homepage (see the file doc comment above). */
  showFinalStage?: boolean;
};

export default function UnifyShowcase({ showFinalStage = false }: UnifyShowcaseProps = {}) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const actWrapRef = useRef<HTMLDivElement | null>(null);
  const actRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const finalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* Every one of these is fixed by CSS (vh-based heights, a font-size driven purely by vw) and
       so only actually changes on resize, not on scroll - reading them every frame was forcing a
       layout flush for no reason on every single scroll tick. `measure()` reads them once up
       front and again only when the shared scheduler reports a resize; `getBoundingClientRect()`
       on `outer` is the one read that must stay per-frame, because it is the only one reflecting
       live scroll position. */
    let outerH = 0;
    let stageH = 1;
    let runway = 1;
    let vw = 1;
    let k = 1;
    let rowH = 0;
    const measure = () => {
      outerH = outer.offsetHeight;
      stageH = stage.offsetHeight || 1;
      runway = Math.max(1, outerH - stageH);
      vw = window.innerWidth || 1;
      // Keeps the stack's shape instead of re-authoring it per breakpoint.
      k = Math.max(0.44, Math.min(1, (vw - 48) / 1290));
      rowH = actWrapRef.current ? actWrapRef.current.offsetHeight / ACTIONS.length : 0;
    };
    measure();

    let lastP = -1;

    const frame = (s: { resized: boolean }) => {
      if (s.resized) { measure(); lastP = -1; }

      /* Read only. The stage is `position: sticky` and the browser holds it against the
         viewport on the compositor; nothing here positions it.

         This used to compute a counter-translate3d every frame and write it to the stage, which
         is a main-thread feedback loop: the scroll composites immediately, this callback reads
         the new position a frame later, and the correcting transform lands a frame after that.
         The "pinned" stage therefore rode the scroll for one frame and was yanked back on the
         next, continuously. Measured on a real phone swipe it moved ~14px per frame and
         reversed direction 45 times across a handful of swipes, which is the shaking that was
         reported. Sticky has no round trip to lag behind, so there is nothing to correct.

         The section's recede-scale (dataset.fpS) is gone with it: it existed only to un-scale a
         position this no longer computes, and reading it coupled this section's geometry to
         another scroll subscriber's writes within the same frame. */
      const top = outer.getBoundingClientRect().top;
      const pinRaw = -top;
      const pin = pinRaw < 0 ? 0 : pinRaw > runway ? runway : pinRaw;

      const p = pin / runway;
      // Nothing below moves by less than this in a frame, and the band is over two screens tall.
      if (Math.abs(p - lastP) < 0.0004) return;
      lastP = p;

      const exit = stageH * 1.15;

      /* ---- headline: holds large, shrinks and dims as the stack forms, then leaves with it ---- */
      const shrink = inOut(seg(p, HEAD_SHRINK));
      const stackExit = inCubic(seg(p, STACK_EXIT));
      if (headRef.current) {
        const s2 = lerp(1, 0.22, shrink) * (1 - stackExit * 0.1);
        const y = lerp(0, -8, shrink) - stackExit * exit;
        headRef.current.style.transform = `translate3d(-50%,calc(-50% + ${y.toFixed(1)}px),0) scale(${s2.toFixed(4)})`;
        // Dims while it shrinks (the depth cue) rather than only cutting out at the very end -
        // by the time it is this small it sits entirely under the stack's footprint anyway, so
        // full coverage comes from the cards' z-index, not from opacity reaching zero early.
        headRef.current.style.opacity = (lerp(1, 0.3, shrink) * (1 - clamp01(stackExit * 1.6))).toFixed(3);
      }

      /* ---- cards: five arrivals from five directions, converging into one stack, then the
         whole pile lifts and fades together ---- */
      for (let i = 0; i < CARDS.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const c = CARDS[i];
        const t = outCubic(seg(p, c.win));
        const x = lerp(c.from[0], c.to[0], t) * k;
        const y = lerp(c.from[1], c.to[1], t) * k - stackExit * exit;
        const r = lerp(c.rot[0], c.rot[1], t);
        const s2 = lerp(0.78, c.scale, t) * (1 - stackExit * 0.14);
        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px),calc(-50% + ${y.toFixed(1)}px),0) rotate(${r.toFixed(2)}deg) scale(${s2.toFixed(4)})`;
        el.style.opacity = (clamp01(t * 6) * (1 - clamp01(stackExit * 1.5))).toFixed(3);
      }

      /* ---- actions: one at a time, and the group re-centres as it grows ---- */
      let revealed = 0;
      for (let i = 0; i < ACTIONS.length; i++) {
        const el = actRefs.current[i];
        const t = outCubic(seg(p, ACT_IN[i]));
        revealed += t;
        if (!el) continue;
        const y = (1 - t) * 64;
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0) scale(${lerp(0.84, 1, t).toFixed(4)})`;
        el.style.opacity = t.toFixed(3);
      }
      if (actWrapRef.current) {
        const centre = ((ACTIONS.length - revealed) / 2) * rowH;
        // Only makes room for the field stage when it is actually in play; left at 0 the group
        // simply holds, fully visible, for the rest of the runway instead of vanishing into
        // nothing the reference's field would otherwise have filled.
        const off = showFinalStage ? inCubic(seg(p, ACT_OUT)) : 0;
        actWrapRef.current.style.transform =
          `translate3d(-50%,calc(-50% + ${(centre - off * stageH * 0.55).toFixed(1)}px),0)`;
        actWrapRef.current.style.opacity = (1 - off).toFixed(3);
      }

      if (!showFinalStage) return;

      /* ---- the accent field: a solid block travelling up over everything ---- */
      if (fieldRef.current) {
        const rise = inOut(seg(p, FIELD_RISE));
        fieldRef.current.style.transform = `translate3d(0,${((1 - rise) * 100).toFixed(2)}%,0)`;
        fieldRef.current.style.visibility = rise <= 0 ? 'hidden' : 'visible';
      }

      /* ---- product composition, arriving with the field rather than after it ---- */
      if (finalRef.current) {
        const f = outCubic(seg(p, FINAL_IN));
        finalRef.current.style.transform = `translate3d(0,${((1 - f) * 46).toFixed(1)}px,0)`;
        finalRef.current.style.opacity = f.toFixed(3);
      }
    };

    // Reduced motion gets the finished composition, not a story that plays itself: the stack and
    // headline are gone, Add/Send/Exchange sit fully settled, and only if the field stage is
    // actually in play does IT become the resting image instead.
    if (reduce.matches) {
      if (headRef.current) headRef.current.style.opacity = '0';
      for (const el of cardRefs.current) { if (el) el.style.opacity = '0'; }
      for (const el of actRefs.current) {
        if (!el) continue;
        el.style.opacity = '1';
        el.style.transform = 'translate3d(0,0,0) scale(1)';
      }
      if (actWrapRef.current) {
        actWrapRef.current.style.opacity = '1';
        actWrapRef.current.style.transform = 'translate3d(-50%,-50%,0)';
      }
      if (showFinalStage) {
        if (fieldRef.current) { fieldRef.current.style.transform = 'translate3d(0,0,0)'; fieldRef.current.style.visibility = 'visible'; }
        if (finalRef.current) { finalRef.current.style.opacity = '1'; finalRef.current.style.transform = 'none'; }
      }
      return;
    }

    return onScrollFrame(frame);
  }, []);

  return (
    <div className="ufs-outer" ref={outerRef}>
      <style>{`
        .ufs-outer {
          position: relative;
          /* One screen unless the stage can actually stick; the runway is added back in the
             @supports blocks below. See the overflow note immediately after. */
          height: 100vh;
          /* clip, not hidden, and this is load-bearing. hidden is a scrollable overflow
             value, so it makes this element a scroll container - and a scroll container is what
             position: sticky sticks to. With hidden here the sticky stage would stick to
             this wrapper (which never scrolls) rather than to the viewport, so it would not pin
             at all; that is precisely why this section used to pin itself in JS, and why that
             pin vibrated. clip clips identically without creating a scrollport, so the browser
             can do the pinning on the compositor.
             The hidden line first is the fallback for browsers without clip (Safari < 16). */
          overflow: hidden;
          overflow: clip;
        }
        /* Pinned by the browser, not by JavaScript. Nothing writes a transform to this element. */
        .ufs-stage {
          position: sticky; top: 0;
          height: 100vh;
          overflow: hidden;
          font-family: var(--font-inter), Inter, sans-serif;
        }
        /* svh, never dvh: a dynamic unit would resize this section as mobile browser chrome
           slides in and out, changing the timeline's own geometry mid-scroll. */
        @supports (height: 100svh) {
          .ufs-outer { height: 100svh; }
          .ufs-stage { height: 100svh; }
        }
        @supports (overflow: clip) {
          .ufs-outer { height: calc(100vh + ${RUNWAY_VH}vh); }
        }
        @supports (overflow: clip) and (height: 100svh) {
          .ufs-outer { height: calc(100svh + ${RUNWAY_VH}vh); }
        }

        /* --- headline --- */
        .ufs-head {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: min(94%, 1180px);
          text-align: center; pointer-events: none;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700; color: #75FB90;
          /* Bound by the viewport's short side as well as its width: the reference frame is wide
             and short, so width alone would overflow the headline off a 16:10 window. */
          font-size: clamp(44px, min(13.5vw, 22vh), 200px);
          line-height: 0.9; letter-spacing: -0.045em;
          will-change: transform, opacity;
        }
        .ufs-head span { display: block; }

        /* --- floating cards --- */
        .ufs-card {
          position: absolute; left: 50%; top: 50%;
          opacity: 0;
          border-radius: clamp(11px, 1.15vw, 18px);
          overflow: hidden;
          box-shadow: 0 26px 60px rgba(0,0,0,.42);
          will-change: transform, opacity;
          --cw: clamp(112px, 14.2vw, 205px);
          width: var(--cw);
        }
        /* Each of the 5 finished dashboard-card renders keeps its own native aspect ratio
           (cropped tight to its card edge already, see the crop notes in git history) rather than
           being forced into a shared box - a stretched or letterboxed card would visibly distort
           the uploaded artwork. */
        .ufs-shot-goals, .ufs-shot-income, .ufs-shot-investments, .ufs-shot-expenses, .ufs-shot-assets {
          display: block; width: 100%; overflow: hidden;
        }
        .ufs-shot-goals { aspect-ratio: 734 / 485; }
        .ufs-shot-income { aspect-ratio: 774 / 481; }
        .ufs-shot-investments { aspect-ratio: 787 / 496; }
        .ufs-shot-expenses { aspect-ratio: 900 / 843; }
        .ufs-shot-assets { aspect-ratio: 700 / 1207; }
        .ufs-shot-goals img, .ufs-shot-income img, .ufs-shot-investments img,
        .ufs-shot-expenses img, .ufs-shot-assets img {
          display: block; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }

        /* --- action stack --- */
        .ufs-actions {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(6px, .9vh, 16px);
          pointer-events: none; will-change: transform, opacity;
        }
        .ufs-act {
          display: flex; align-items: center; gap: clamp(9px, 1vw, 18px);
          opacity: 0; will-change: transform, opacity;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700; letter-spacing: -.035em;
          font-size: clamp(38px, 6.6vw, 96px); line-height: 1.06;
        }
        .ufs-act-ico {
          flex: 0 0 auto;
          width: clamp(30px, 4.6vw, 68px); height: clamp(30px, 4.6vw, 68px);
          border-radius: clamp(8px, 1.2vw, 19px);
          display: inline-flex; align-items: center; justify-content: center;
          padding: clamp(6px, .95vw, 15px); box-sizing: border-box;
        }

        /* --- the accent field and the closing composition --- */
        .ufs-field {
          position: absolute; inset: 0;
          background: #75FB90;
          transform: translate3d(0,100%,0);
          visibility: hidden;
          will-change: transform;
          display: flex; align-items: center; justify-content: center;
        }
        .ufs-final {
          width: 100%; height: 100%; box-sizing: border-box;
          padding: clamp(24px, 4vh, 56px) clamp(18px, 4vw, 72px);
          display: grid; grid-template-columns: 1fr auto 1fr;
          align-items: center; justify-items: center;
          gap: clamp(10px, 2.4vw, 48px);
          opacity: 0; will-change: transform, opacity;
        }
        /* Near-black, not white: white on #75FB90 is unreadable, and the reference's white sat on
           a much darker red. The contrast relationship is what carries over, not the literal ink. */
        .ufs-side {
          margin: 0; color: #0C1A10;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700; letter-spacing: -.035em;
          font-size: clamp(24px, 3.6vw, 58px); line-height: 1.05;
          text-align: center;
        }
        .ufs-phone {
          position: relative; flex: 0 0 auto;
          height: min(62vh, 560px); aspect-ratio: 292 / 604;
          border-radius: clamp(20px, 2.4vw, 38px);
          background: #0C1A10;
          padding: clamp(5px, .62vw, 9px);
          box-shadow: 0 34px 80px rgba(8,32,18,.34);
        }
        .ufs-screen {
          position: relative; width: 100%; height: 100%;
          border-radius: clamp(15px, 1.9vw, 30px);
          overflow: hidden; background: #0C1A10;
        }
        .ufs-screen img {
          width: 100%; height: 100%; object-fit: cover; object-position: center top;
          display: block;
        }
        /* Sits the screen into the field's light rather than leaving it pasted on top. */
        .ufs-screen::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(117,251,144,.30), rgba(12,26,16,.22));
          mix-blend-mode: multiply; pointer-events: none;
        }
        .ufs-island {
          position: absolute; z-index: 2; left: 50%; top: 1.6%;
          transform: translateX(-50%);
          width: 30%; height: 3.6%;
          background: #0C1A10; border-radius: 999px;
        }

        /* --- mobile: same story, tighter composition --- */
        @media (max-width: 759px) {
          .ufs-head { font-size: clamp(40px, 15vw, 62px); letter-spacing: -.04em; }
          .ufs-card { --cw: clamp(96px, 30vw, 130px); }
          .ufs-act { font-size: clamp(32px, 12vw, 52px); gap: 10px; }
          .ufs-act-ico { width: clamp(26px, 9vw, 40px); height: clamp(26px, 9vw, 40px); border-radius: 10px; padding: 7px; }
          /* The three-column split has no room at 390px: the copy stacks above and below the
             phone and keeps the same top-to-bottom reading order. */
          .ufs-final {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            gap: clamp(8px, 2vh, 20px);
            padding: clamp(18px, 3vh, 34px) 18px;
          }
          .ufs-side { font-size: clamp(22px, 8.4vw, 34px); }
          .ufs-phone { height: min(46vh, 380px); }
        }
      `}</style>

      <div className="ufs-stage" ref={stageRef}>
        {/* Stage A: the headline is the dominant object until the cards arrive. */}
        <h2 className="ufs-head" ref={headRef}>
          <span>Bring it all</span>
          <span>together</span>
        </h2>

        {/* Stage B/C: five cards, five entry directions, one compact collage. Each is one of the
            5 finished dashboard-card renders supplied to replace the earlier screenshot/JSX-mock
            content; the wrapper divs, their ref wiring and CARDS[i] positioning are unchanged. */}
        <div className="ufs-card" ref={el => { cardRefs.current[0] = el; }} style={{ zIndex: CARDS[0].z }} aria-hidden="true">
          <span className="ufs-shot-goals"><img src="/images/home-section3/card-goals.webp" alt="" width={734} height={485} loading="lazy" decoding="async" /></span>
        </div>

        <div className="ufs-card" ref={el => { cardRefs.current[1] = el; }} style={{ zIndex: CARDS[1].z }} aria-hidden="true">
          <span className="ufs-shot-income"><img src="/images/home-section3/card-income.webp" alt="" width={774} height={481} loading="lazy" decoding="async" /></span>
        </div>

        {/* 'send' is the top-right corner slot (CARDS[2]) - now carries Expenses, since
            Investments moved to the 'contact' (straight-down) slot below. */}
        <div className="ufs-card" ref={el => { cardRefs.current[2] = el; }} style={{ zIndex: CARDS[2].z }} aria-hidden="true">
          <span className="ufs-shot-expenses"><img src="/images/home-section3/card-expenses.webp" alt="" width={900} height={843} loading="lazy" decoding="async" /></span>
        </div>

        {/* 'contact' is the TOP / straight-down slot (CARDS[3]) - now carries Investments. */}
        <div className="ufs-card" ref={el => { cardRefs.current[3] = el; }} style={{ zIndex: CARDS[3].z }} aria-hidden="true">
          <span className="ufs-shot-investments"><img src="/images/home-section3/card-investments.webp" alt="" width={787} height={496} loading="lazy" decoding="async" /></span>
        </div>

        <div className="ufs-card" ref={el => { cardRefs.current[4] = el; }} style={{ zIndex: CARDS[4].z }} aria-hidden="true">
          <span className="ufs-shot-assets"><img src="/images/home-section3/card-assets.webp" alt="" width={700} height={1207} loading="lazy" decoding="async" /></span>
        </div>

        {/* Stage D/E: Analyze, then Plan, then Invest. */}
        <div className="ufs-actions" ref={actWrapRef} aria-hidden="true">
          {ACTIONS.map((a, i) => {
            const Icon = ACT_ICON[a.id];
            return (
              <div className="ufs-act" key={a.id} ref={el => { actRefs.current[i] = el; }} style={{ color: a.tint }}>
                <span className="ufs-act-ico" style={{ background: a.tint, color: a.ink }}><Icon /></span>
                {a.label}
              </div>
            );
          })}
        </div>

        {/* Stage F/G/H/I: the accent field travels up and carries the closing composition. Kept
            in the tree for reuse, but only mounted (and only animated - see the `!showFinalStage`
            early return in frame() above) when a caller opts in. */}
        {showFinalStage && (
          <div className="ufs-field" ref={fieldRef}>
            <div className="ufs-final" ref={finalRef}>
              <p className="ufs-side">Simple</p>
              <div className="ufs-phone">
                <div className="ufs-screen">
                  <span className="ufs-island" />
                  <img src="/images/home-section3/screen-goals.webp" alt="The Fermor app tracking goals and financial health" width={720} height={1556} loading="lazy" decoding="async" />
                </div>
              </div>
              <p className="ufs-side">fast &amp; safe</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

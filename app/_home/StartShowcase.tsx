'use client';

/**
 * Homepage band 3: "so, what are you looking to invest in?" - a three-slide showcase (Stocks,
 * Mutual Funds, ETFs) that plays out while the stage is held against the viewport.
 *
 * The browser does the pinning: the stage is `position: sticky` and the compositor holds it
 * against the viewport for the length of the wrapper. JavaScript in here only ever READS the
 * scroll position, to decide which of the three slides the current progress names.
 *
 * Both of those are deliberate corrections of earlier designs that caused the two scrolling
 * complaints this section attracted.
 *
 * 1. It used to capture wheel, touchmove and key input while pinned and preventDefault() them,
 *    accumulating deltas to commit one slide per gesture. A non-passive wheel/touchmove listener
 *    on `window` degrades scrolling wherever it is attached, preventDefault on touchmove freezes
 *    native scrolling on a phone outright, and the gesture/animation locks discarded input for
 *    620ms after every slide change - so a reader who kept scrolling got no movement and no
 *    feedback. That is the "stuck"/"buffering"/"resisting" report, working as written.
 *
 * 2. It then pinned itself by writing a counter-transform every frame, computed from
 *    getBoundingClientRect(). That is a main-thread feedback loop: the scroll composites at
 *    once, the rAF callback reads the new position a frame later, and the correction lands a
 *    frame after that, so the "pinned" stage rode the scroll and was yanked back, every frame.
 *    Measured on a real phone swipe: ~13px of movement per frame and 34 direction reversals
 *    across a handful of swipes. That is the vibration report.
 *
 * Sticky has no round trip to lag behind, so there is nothing to correct and nothing to shake.
 * It needs the ancestors not to be scroll containers, which is why this wrapper and
 * [data-fp-page] both use `overflow: clip` rather than `hidden` - see the rules below and the
 * long note in SectionPanels.tsx.
 *
 * The runway is sized so each slide gets a real stretch of scroll (see --sxs-runway below),
 * rather than the 30vh that was only ever enough because input was being swallowed.
 */

import { useEffect, useRef, useState } from 'react';
import { useBP } from './hooks';
import { onScrollFrame } from './scrollScheduler';

/* ============================================================
   SLIDE CONTENT
   Copy and asset paths for all three slides live here and nowhere else.
   ============================================================ */

type SlideId = 'stocks' | 'mutualfunds' | 'etfs';

type Slide = {
  id: SlideId;
  /** Sits above `copy` as its own bold line. Casing is spelled out here rather than done with
      CSS text-transform, since "ETF" is a real uppercase acronym and "stocks" / "mutual fund"
      are deliberately lowercase, not three instances of one rule. */
  heading: string;
  copy: string;
  screen: string;
  screenAlt: string;
};

const SLIDES: Slide[] = [
  {
    id: 'stocks',
    heading: 'stocks',
    copy: 'The market moves every day. See what’s changing, understand what matters, and invest with more clarity.',
    screen: '/images/home-section3/screen-stocks-v2.webp',
    screenAlt: 'Fermor app Stocks screen showing NIFTY 50 and popular stocks',
  },
  {
    id: 'mutualfunds',
    heading: 'mutual fund',
    copy: 'Small amounts can grow into something meaningful. Build steadily, spread your investments, and let time do the heavy lifting.',
    screen: '/images/home-section3/screen-mutualfunds.webp',
    screenAlt: 'Fermor app Mutual Funds screen showing trending funds and SIP tools',
  },
  {
    id: 'etfs',
    heading: 'ETF',
    copy: 'Invest across a basket of assets. Build diversification in one place, and keep investing simple.',
    screen: '/images/home-section3/screen-etfs.webp',
    screenAlt: 'Fermor app ETFs screen showing popular ETFs and index options',
  },
];

/** Background-removed cutout, so it carries its own silhouette and needs no ground behind it. */
const HAND = '/images/home-section3/hand-phone-cutout.webp';

/** Data for the three coded left-hand cards, kept next to the slide copy for the same reason.
    The stock prices/tickers match the ones visible on the supplied Stocks phone screen, so the
    card and the phone agree on the same three companies. */
const STOCK_ROWS = [
  { name: 'HDFC Bank', ticker: 'HDFCBANK', mark: 'H', tint: '#C8262E', price: '₹1,612.50', pct: '+1.56%', positive: true, points: [30, 34, 32, 38, 36, 42, 40, 47, 44, 51, 48, 55, 58] },
  { name: 'SBI', ticker: 'SBIN', mark: 'S', tint: '#1B57A6', price: '₹785.40', pct: '+0.82%', positive: true, points: [22, 25, 23, 28, 26, 31, 29, 34, 32, 37, 35, 40, 42] },
  { name: 'Maruti Suzuki', ticker: 'MARUTI', mark: 'M', tint: '#B9873C', price: '₹11,248.30', pct: '-1.06%', positive: false, points: [46, 42, 44, 38, 40, 34, 37, 31, 33, 27, 30, 24, 21] },
] as const;

/** Rising, deliberately gentle: the point is the direction, not a real fund's real curve. */
const ETF_TREND = [16, 20, 18, 24, 21, 27, 24, 31, 27, 35, 31, 40, 46] as const;

/* ============================================================
   PHONE GEOMETRY
   Measured off hand-phone.webp (833x998) by scanning for the lit display area, then verified by
   compositing a screen into it at these exact numbers. The display sits at 296,149 and runs
   252x552 with a 32px corner radius; the dynamic island is centred, 77x23 at y=158.
   ============================================================ */
const SCREEN_BOX = {
  left: (296 / 833) * 100,
  top: (149 / 998) * 100,
  width: (252 / 833) * 100,
  height: (552 / 998) * 100,
  /** As a fraction of the phone image's rendered width, so it scales with the composition. */
  radius: 32 / 833,
};
const ISLAND = {
  width: (77 / 252) * 100,
  height: (23 / 552) * 100,
  top: ((158 - 149) / 552) * 100,
};

/* ============================================================
   SCROLL CONTROL CONSTANTS
   ============================================================ */
const LAST = SLIDES.length - 1;
/** How long a slide takes to cross-fade once the scroll has selected a new one. */
const ANIM_MS = 620;
/**
 * Dead band around a slide boundary, as a fraction of the whole runway. A reader parked exactly
 * on a boundary would otherwise have the two slides swapping back and forth under the smallest
 * scroll jitter (a trackpad resting under a finger, a phone's rubber-band settle); this holds the
 * current slide until the boundary is properly crossed. It is the only piece of state-keeping
 * left in here, and it never delays or absorbs a real scroll - it only decides which slide the
 * current position names.
 */
const SLIDE_HYSTERESIS = 0.035;

/* ============================================================
   ICONS
   ============================================================ */
type IcoProps = { s?: number; c?: string };

const Calendar = ({ s = 18, c = '#1E9E4A' }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" />
    <circle cx="8.5" cy="14.5" r="1" fill={c} stroke="none" /><circle cx="12" cy="14.5" r="1" fill={c} stroke="none" />
  </svg>
);
const Chevron = ({ s = 16, c = '#101214' }: IcoProps) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

/** Deterministic line-plus-area chart; no randomness so server and client agree. Used both as a
    small inline sparkline beside a stock row and, at `full` width, as the ETF card's headline
    chart -- the same shape, just a different scale and an optional dot at the last point. `id`
    only has to be unique among charts rendered at once, so it can stay short. */
function MiniChart({
  id, points, positive, w = 60, h = 26, strokeWidth = 1.6, full = false, endpointDot = false,
}: {
  id: string; points: readonly number[]; positive: boolean; w?: number; h?: number;
  strokeWidth?: number; full?: boolean; endpointDot?: boolean;
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const coords = points.map((v, i) => [
    (i / (points.length - 1)) * w,
    h - ((v - min) / span) * (h - 4) - 2,
  ]);
  const line = coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L');
  const [lastX, lastY] = coords[coords.length - 1];
  const areaPath = `M${coords[0][0].toFixed(1)},${h} L${line} L${lastX.toFixed(1)},${h} Z`;
  const color = positive ? '#22B455' : '#D45151';
  const gradId = `sxs-grad-${id}`;
  return (
    <svg
      width={full ? '100%' : w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      style={full ? { display: 'block' } : undefined}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} stroke="none" />
      <path d={`M${line}`} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {endpointDot && <circle cx={lastX} cy={lastY} r={3.4} fill={color} />}
    </svg>
  );
}

/* ============================================================
   LEFT-HAND CARDS  (coded, one block per slide)
   Each card is the same white rounded surface (.sxs-card), just with one card's worth of
   content instead of a stack of several -- there is exactly one investment product being shown
   per state now, so the card can afford to breathe rather than share the column.
   ============================================================ */

function StocksCard({ compact }: { compact: boolean }) {
  return (
    <div className={compact ? 'sxs-card sxs-card-invest sxs-card-c' : 'sxs-card sxs-card-invest'}>
      {STOCK_ROWS.map((r, i) => (
        <div className="sxs-stock-row" key={r.name}>
          <span className="sxs-logo" style={{ background: r.tint }}>{r.mark}</span>
          <div className="sxs-stock-name">
            <p className="sxs-card-title sxs-stock-title">{r.name}</p>
            <p className="sxs-card-sub">{r.ticker}</p>
          </div>
          <MiniChart id={`stock-${i}`} points={r.points} positive={r.positive} w={compact ? 34 : 40} h={compact ? 20 : 24} />
          <div className="sxs-stock-value">
            <b className="sxs-price">{r.price}</b>
            <span className={r.positive ? 'sxs-up' : 'sxs-down'}>{r.pct}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MutualFundsCard({ compact }: { compact: boolean }) {
  return (
    <div className={compact ? 'sxs-card sxs-card-invest sxs-card-c' : 'sxs-card sxs-card-invest'}>
      <p className="sxs-eyebrow-plain">Investment amount</p>
      <p className="sxs-mf-amount">₹ 500</p>
      <p className="sxs-mf-tag">Start small. Build big.</p>
      <div className="sxs-sip-row">
        <span className="sxs-tile"><Calendar s={16} /></span>
        <span className="sxs-sip-text">Monthly SIP on <b className="sxs-sip-day">17th</b></span>
        <span className="sxs-chev"><Chevron s={14} /></span>
      </div>
      <div className="sxs-cta-pale">
        Invest Now
        <Chevron s={13} c="#123526" />
      </div>
    </div>
  );
}

function ETFsCard({ compact }: { compact: boolean }) {
  return (
    <div className={compact ? 'sxs-card sxs-card-invest sxs-card-c' : 'sxs-card sxs-card-invest'}>
      <span className="sxs-badge">ETFs</span>
      <p className="sxs-etf-title">Invest broader</p>
      <p className="sxs-etf-sub">Get exposure to top indices, sectors and themes, all in one place.</p>
      <div className="sxs-etf-chart">
        <MiniChart id="etf" points={ETF_TREND} positive w={220} h={compact ? 54 : 66} strokeWidth={2.2} full endpointDot />
      </div>
      <div className="sxs-cta-pale">
        Explore ETFs
        <Chevron s={13} c="#123526" />
      </div>
    </div>
  );
}

function Panel({ id, compact }: { id: SlideId; compact: boolean }) {
  if (id === 'stocks') return <StocksCard compact={compact} />;
  if (id === 'mutualfunds') return <MutualFundsCard compact={compact} />;
  return <ETFsCard compact={compact} />;
}

/* ============================================================
   SECTION
   ============================================================ */
export default function StartShowcase() {
  const bp = useBP();
  const outerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const idxRef = useRef(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    const stage = stageRef.current;
    if (!outer || !stage) return;

    /* outer/stage are both sized in vh, so their offsetHeight only ever actually changes on a
       real resize - reading it every scroll frame was a forced layout measurement (offsetHeight
       flushes any pending style write first) for a number that is correct for the next hundred
       frames as-is. Cached here and only recomputed when the shared scheduler reports a resize. */
    let runway = 1;
    const measure = () => { runway = Math.max(1, outer.offsetHeight - stage.offsetHeight); };
    measure();

    const setSlide = (n: number) => {
      if (n === idxRef.current) return;
      idxRef.current = n;
      setIdx(n);
    };

    /* This callback now only READS the scroll position. It does not position the stage: the
       stage is `position: sticky` and the browser holds it in place on the compositor.

       That distinction is the whole fix for the vibration. This used to compute a counter
       translate3d every frame and write it to the stage, which is a main-thread feedback loop:
       the browser scrolls and composites immediately, the rAF callback reads the new position a
       frame later, and the correcting transform only lands on the frame after that. So the
       "pinned" stage actually rode the scroll for a frame and got yanked back on the next one,
       every frame, forever. Measured on a real phone swipe it moved an average of 13px per frame
       and reversed direction 34 times in a handful of swipes - which is exactly the shaking that
       was reported. Sticky has no main-thread round trip, so there is nothing to lag and nothing
       to correct, at any scroll speed.

       The section's recede-scale (dataset.fpS) is not consulted any more either. It was only
       needed to un-scale a position this no longer computes, and reading it coupled this
       section's geometry to another scroll subscriber's writes in the same frame. */
    const frame = (s: { resized: boolean }) => {
      if (s.resized) measure();

      const top = outer.getBoundingClientRect().top;
      let p = -top / runway;
      if (p < 0) p = 0;
      else if (p > 1) p = 1;

      /* Which slide this scroll position names. Purely a function of progress: no accumulator,
         no gesture lock, no animation lock, nothing that can swallow or defer a scroll. The only
         memory is the hysteresis band, which decides ties near a boundary and nothing else.
         Computed from the exact progress rather than stepped one at a time, so a fast flick that
         crosses two boundaries in a single frame lands on the right slide instead of crawling. */
      const exact = p * SLIDES.length;
      let target = Math.floor(exact);
      if (target < 0) target = 0;
      if (target > LAST) target = LAST;
      const cur = idxRef.current;
      if (target !== cur) {
        const boundary = Math.max(target, cur) / SLIDES.length;
        if (Math.abs(p - boundary) < SLIDE_HYSTERESIS) target = cur;
      }
      setSlide(target);
    };

    return onScrollFrame(frame);
  }, []);

  return (
    <div className="sxs-outer" ref={outerRef}>
      <style>{`
        /* The runway is the scroll distance the three slides are spread over. It used to be
           30vh, which was only ever enough because the section was swallowing wheel and touch
           input and advancing slides per gesture rather than per pixel. Now that scrolling is
           native and the slides simply answer to progress, each one needs a real stretch of
           scroll to read as a beat instead of a flicker. */
        .sxs-outer {
          --sxs-runway: 195vh;
          position: relative;
          /* One screen only unless overflow: clip is available; the runway is added back in
             the @supports block below. Without clip the stage cannot stick (see the overflow
             note just below), and a runway with nothing pinned in it would just be dead space. */
          height: 100vh;
          /* clip rather than hidden, and this is load-bearing rather than cosmetic.
             hidden is a *scrollable* overflow value: it makes this element a scroll container,
             and a scroll container is what position: sticky sticks to. With hidden here the
             sticky stage would stick to this wrapper (which never scrolls) instead of to the
             viewport, so it would not pin at all - which is exactly why this section used to
             hand-roll its pin in JS, and why that hand-rolled pin vibrated. clip clips
             identically but is not scrollable, so the stage sticks to the viewport and the
             browser does the pinning on the compositor.
             The hidden line first is the fallback for browsers without clip (Safari < 16):
             they keep today's clipping, and the @supports block below withholds the runway from
             them so they get a clean single screen rather than an unpinned dead stretch. */
          overflow: hidden;
          overflow: clip;
          /* The same purple the stage paints, and the same top corners, on the wrapper directly
             underneath it. This is the white-corner fix: the stage is composited as its own
             layer, so its rounded corner is antialiased against whatever sits behind it, and
             what sat behind it was the enclosing panel's background (SECTION_LIGHT, #F2F3F4,
             all but white). A sub-pixel seam between two independently rasterized rounded rects
             is hard to rule out; what is easy is making sure the seam has nothing near-white to
             reveal. Purple on purple cannot show a light edge at any scroll position, in either
             direction, at any device pixel ratio. */
          background: linear-gradient(115deg, #6a5df0 0%, #5750e8 20%, #4a53db 40%, #3f57cf 60%, #3459c2 80%, #2c58ba 100%);
          border-top-left-radius: var(--fp-r, 40px);
          border-top-right-radius: var(--fp-r, 40px);
        }
        /* The stage is the visible frame, and the browser pins it: position: sticky against
           the viewport, held by the compositor, for as long as the wrapper above is passing. No
           JavaScript positions this element - see the note in the effect for why the previous
           hand-rolled transform pin could not help but vibrate.
           It clips so the hand can run off the bottom edge instead of stopping in mid air, and
           carries the panel's own top radius (same reason the hero's [data-fp-top] does, see
           SectionPanels.tsx) so it does not square off the top of the band it sits in. */
        .sxs-stage {
          position: sticky; top: 0;
          height: 100vh;
          overflow: hidden;
          border-top-left-radius: var(--fp-r, 40px);
          border-top-right-radius: var(--fp-r, 40px);
          background: linear-gradient(115deg, #6a5df0 0%, #5750e8 20%, #4a53db 40%, #3f57cf 60%, #3459c2 80%, #2c58ba 100%);
        }
        /* svh, not dvh: the small-viewport unit is a fixed value that does not change as mobile
           browser chrome slides in and out, so the timeline's geometry stays put mid-scroll.
           A dynamic unit here would resize the section while the user is scrolling through it,
           which is the resize-feedback loop this section must not have. */
        @supports (height: 100svh) {
          .sxs-outer { height: 100svh; }
          .sxs-stage { height: 100svh; }
        }
        /* The runway only exists where the stage can actually stick (see the overflow note
           above), so a browser without overflow: clip gets one clean screen instead of a tall
           stretch with nothing pinned in it. */
        @supports (overflow: clip) {
          .sxs-outer { height: calc(100vh + var(--sxs-runway)); }
        }
        @supports (overflow: clip) and (height: 100svh) {
          .sxs-outer { height: calc(100svh + var(--sxs-runway)); }
        }
        .sxs-inner {
          --sxs-pb: clamp(20px, 3.4vh, 40px);
          height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column; align-items: center;
          padding: clamp(24px, 3.6vh, 46px) 28px var(--sxs-pb);
          font-family: var(--font-inter), Inter, sans-serif;
        }

        /* --- persistent heading --- */
        .sxs-head { text-align: center; flex: 0 0 auto; }
        .sxs-h2 {
          margin: 0; max-width: 46rem;
          font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700; color: #ffffff;
          font-size: clamp(24px, min(3.4vw, 4.8vh), 42px);
          line-height: 1.14; letter-spacing: -.024em;
        }
        /* The one word the heading calls out, in the section's established accent green. */
        .sxs-invest-word { color: #6EE08A; }

        /* --- three-column composition ---
           The side tracks are 1fr rather than a fixed max, so the hand can be sized off the
           viewport height without the columns ever pushing the row wider than the page. Their
           content carries its own max-width instead, which keeps the cards and the copy
           secondary to the hand and leaves real space either side of it. */
        .sxs-grid {
          flex: 1 1 auto; min-height: 0; width: 100%; max-width: 1340px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
          /* One row that fills the grid, so the hand's column has a full-height box to hang
             its foot off. The side columns still centre their own content inside it. */
          grid-template-rows: minmax(0, 1fr);
          justify-content: center;
          align-items: center; align-content: stretch;
          /* Widened with the hand. The hand is at its broadest at the wrists, level with the
             bottom of the right-hand copy, so that is where the two came closest to touching. */
          gap: clamp(14px, 3vw, 52px);
          margin-top: clamp(6px, 1.6vh, 22px);
        }
        .sxs-col { display: grid; position: relative; min-width: 0; justify-items: center; }
        .sxs-col > * { grid-area: 1 / 1; }
        .sxs-left { align-content: center; }
        .sxs-right { align-content: center; }
        .sxs-left > * { width: 100%; max-width: 17rem; }
        .sxs-right > * { width: 100%; max-width: 18rem; }

        /* Every slide is mounted; only transform and opacity move. */
        .sxs-slide {
          transition: transform ${ANIM_MS}ms cubic-bezier(.16,.84,.28,1),
                      opacity ${Math.round(ANIM_MS * 0.62)}ms ease;
          will-change: transform, opacity;
        }
        .sxs-slide[data-off="0"] { opacity: 1; }
        .sxs-slide:not([data-off="0"]) { opacity: 0; pointer-events: none; }

        /* --- phone ---
           The asset is a cutout, so it needs no ground of its own and gets none: no plate
           behind it, no feathering at its edges. Nothing here paints a background. */
        /* The width lives on the cell, not on the hand: once the hand is taken out of flow for
           the run-off-the-bottom treatment, an auto-sized middle column would otherwise measure
           it as zero and collapse, dropping the side columns straight onto the hand. */
        .sxs-phone-cell {
          --ph-w: min(clamp(268px, 50vw, 770px), 79vh);
          /* The hand is anchored by its foot, so growing it walks the phone up towards the
             heading. This drops it by the same amount it gained, which keeps the phone where it
             was under the heading and spends the extra size on the wrists instead, cropped off
             at the stage edge exactly as the reference does. */
          --ph-drop: calc(var(--ph-w) * 0.085);
          position: relative; justify-self: center;
          width: var(--ph-w);
          display: flex; align-items: center; justify-content: center;
        }
        .sxs-phone {
          width: var(--ph-w); aspect-ratio: 833 / 998;
          position: relative;
        }
        .sxs-phone-inner { position: absolute; inset: 0; }
        .sxs-hand { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        .sxs-screen {
          position: absolute;
          left: ${SCREEN_BOX.left}%; top: ${SCREEN_BOX.top}%;
          width: ${SCREEN_BOX.width}%; height: ${SCREEN_BOX.height}%;
          border-radius: calc(var(--ph-w) * ${SCREEN_BOX.radius});
          overflow: hidden; background: #ffffff;
        }
        .sxs-screen img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center top; display: block;
          transition: transform ${ANIM_MS}ms cubic-bezier(.16,.84,.28,1);
          will-change: transform;
        }
        .sxs-island {
          position: absolute;
          left: 50%; transform: translateX(-50%);
          top: ${ISLAND.top}%; width: ${ISLAND.width}%; height: ${ISLAND.height}%;
          background: #08090A; border-radius: 999px; pointer-events: none;
        }

        /* --- right-hand copy ---
           A short bold label (the product name) over the one paragraph of body copy: no pill
           badge, no separate two-line headline, since the section's own H2 already asks the
           question and the card already answers it. .sxs-copy is sized up from the old
           supporting-body treatment (12.5-15.5px) since it now carries the slide's entire
           right-hand message on its own rather than sitting under a headline. */
        .sxs-copy-heading {
          margin: 0 0 6px; font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700; color: #ffffff;
          font-size: clamp(17px, 1.5vw, 21px);
          line-height: 1.2; letter-spacing: -.01em;
        }
        .sxs-copy {
          margin: 0; color: rgba(255, 255, 255, .88);
          font-size: clamp(15px, 1.3vw, 19px);
          line-height: 1.55; max-width: 30ch;
        }
        /* Reused by the ETF card's small "ETFs" tag below; kept here since it is still the
           section's one pill-badge treatment. */
        .sxs-badge {
          display: inline-block;
          background: #E4F6E8; color: #1B9648;
          font-size: clamp(10px, .74vw, 11.5px); font-weight: 700;
          letter-spacing: .09em; text-transform: uppercase;
          padding: 6px 13px; border-radius: 999px;
        }

        /* --- coded cards ---
           One card per slide now, not a stack of several, so it can be roomier than the old
           .sxs-card padding: .sxs-card-invest is the only size modifier, layered on the same
           white surface (.sxs-card) every card on this site already uses. */
        .sxs-card {
          background: #ffffff; border: 1px solid #EDEFED; border-radius: 13px;
          padding: clamp(10px, .85vw, 14px);
          box-shadow: 0 10px 26px rgba(16,32,24,.055);
        }
        .sxs-card-invest { padding: clamp(18px, 1.5vw, 24px); }
        .sxs-tile {
          flex: 0 0 auto; width: 28px; height: 28px; border-radius: 8px;
          background: #E4F6E8; display: inline-flex; align-items: center; justify-content: center;
        }
        .sxs-card-title {
          margin: 0; font-size: clamp(12.5px, .9vw, 14px); font-weight: 600;
          color: #101214; letter-spacing: -.01em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .sxs-card-sub { margin: 1px 0 0; font-size: clamp(9.5px, .7vw, 11px); color: #8E9499; line-height: 1.34; }
        .sxs-price { color: #101214 !important; font-variant-numeric: tabular-nums; }
        .sxs-up { color: #22B455 !important; font-weight: 600; }
        .sxs-down { color: #D45151 !important; font-weight: 600; }
        .sxs-chev { flex: 0 0 auto; display: inline-flex; }

        /* Stocks: one row per company, logo left, chart and price right. Gap is a flat px value
           rather than the usual clamp(): five items share this row (logo, name, chart, price),
           and a gap that grows with viewport width was what pushed the name column narrow
           enough to ellipsis "HDFC Bank" down to "HDF..." at normal desktop widths. */
        .sxs-stock-row {
          display: flex; align-items: center; gap: 8px;
          padding: clamp(11px, .95vw, 14px) 0;
        }
        .sxs-stock-row + .sxs-stock-row { border-top: 1px solid #EDEFED; }
        .sxs-logo {
          flex: 0 0 auto; width: 30px; height: 30px; border-radius: 9px;
          color: #fff; font-size: 12px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .sxs-stock-name { flex: 1 1 auto; min-width: 0; }
        /* Wraps rather than ellipsis-truncating: with the row's other three elements at a fixed
           width, the name column is the one part of the row that can vary in the width it gets
           across breakpoints, so it is the one part that has to be able to take two lines
           instead of clipping to "HDF...". */
        .sxs-stock-title { white-space: normal; overflow: visible; text-overflow: clip; line-height: 1.25; }
        .sxs-stock-value { flex: 0 0 auto; text-align: right; display: flex; flex-direction: column; gap: 2px; }
        .sxs-stock-value b {
          font-size: clamp(11.5px, .86vw, 13.5px); font-weight: 700;
          letter-spacing: -.01em; white-space: nowrap;
        }
        .sxs-stock-value span { font-size: clamp(9.5px, .7vw, 11px); font-variant-numeric: tabular-nums; }

        /* Mutual Funds: amount, tagline, SIP selector row, CTA. */
        .sxs-eyebrow-plain {
          margin: 0; font-size: 10.5px; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase; color: #9BA0A4;
        }
        .sxs-mf-amount {
          margin: 8px 0 0; font-family: var(--font-poppins), Poppins, sans-serif;
          font-size: clamp(26px, 2.2vw, 34px); font-weight: 700; color: #101214;
          letter-spacing: -.02em; font-variant-numeric: tabular-nums;
        }
        .sxs-mf-tag { margin: 4px 0 18px; font-size: clamp(12px, .85vw, 13.5px); color: #6B7075; }
        .sxs-sip-row {
          display: flex; align-items: center; gap: 10px;
          border: 1px solid #EDEFED; border-radius: 12px;
          padding: 10px 12px;
        }
        .sxs-sip-text { flex: 1 1 auto; min-width: 0; font-size: clamp(11.5px, .85vw, 13px); color: #101214; }
        .sxs-sip-day { color: #1E9E4A; font-weight: 700; }

        /* Shared pale CTA, used by both the Mutual Funds and ETF cards. */
        .sxs-cta-pale {
          margin-top: 16px;
          display: flex; align-items: center; justify-content: space-between;
          background: #E4F6E8; color: #123526;
          border-radius: 11px; padding: 13px 16px;
          font-size: clamp(12.5px, .9vw, 14px); font-weight: 700;
        }

        /* ETFs: eyebrow, headline, supporting line, full-width chart, CTA. */
        .sxs-etf-title {
          margin: 12px 0 6px; font-family: var(--font-poppins), Poppins, sans-serif;
          font-weight: 700; color: #101214;
          font-size: clamp(19px, 1.6vw, 24px); letter-spacing: -.02em;
        }
        .sxs-etf-sub { margin: 0 0 18px; font-size: clamp(12px, .85vw, 13.5px); color: #6B7075; line-height: 1.5; }
        .sxs-etf-chart { width: 100%; }

        /* --- desktop: the hand runs off the bottom edge ---
           From 760px up the hand leaves the flow and hangs off the bottom of its column, with
           its foot pushed past the stage's padding so the wrists are cut by the stage edge
           rather than stopping in mid air. Sizing it off the viewport height is what lets it
           be the dominant object: the grid row is whatever the heading leaves behind, and the
           hand is free to be taller than that. Nothing else in the row moves. */
        @media (min-width: 760px) {
          .sxs-phone-cell { align-self: stretch; }
          .sxs-phone {
            position: absolute;
            left: 50%; bottom: calc(-1 * (var(--sxs-pb) + var(--ph-drop)));
            transform: translateX(-50%);
          }
        }

        /* --- tablet: the phone and the copy carry it; the cards would crowd both --- */
        @media (max-width: 1079px) {
          .sxs-grid {
            grid-template-columns: auto minmax(0, 1fr);
            gap: clamp(16px, 2.6vw, 34px);
          }
          .sxs-left { display: none; }
          .sxs-phone-cell { --ph-w: min(clamp(232px, 46vw, 520px), 64vh); }
          .sxs-copy { max-width: 34ch; }
        }

        /* --- mobile: one column, phone stays the anchor --- */
        @media (max-width: 759px) {
          /* A phone reads the three slides in a single column with far less on screen at once,
             so the same three beats need less scroll to land than they do on a wide desktop
             composition. Still a real stretch per slide - just proportional to the shorter
             content rather than the desktop number applied unchanged. */
          .sxs-outer { --sxs-runway: 165vh; }
          /* Top padding alone is up from a flat 24px: FloatingNav.tsx is position:fixed at
             top:6px and reappears (it only ever hides on a downward scroll past y=90, see
             HIDE_AFTER there) the instant the reader scrolls back up even slightly, which this
             section's sticky pin makes an easy gesture to make by accident. At 24px the heading
             sat directly under the pill's own ~6-54px footprint with no clearance at all; this
             clears it with real room to spare rather than pixel-matching the pill's height.
             Capped at 72px rather than pushed further: the hand below is anchored to the stage's
             bottom edge, not to this padding, so every px added here is a px taken directly off
             the gap above the hand -- measured directly (not estimated) alongside the --ph-w
             change below, since the two compete for the same room and the numbers only had to
             be right together, not each in isolation. */
          .sxs-inner { padding: clamp(60px, 10vh, 72px) 18px 20px; }
          /* Type at the top, hand at the bottom. The grid now carries the copy only, so it
             packs to the start and sits straight under the heading instead of centring itself
             in a box the hand used to share. */
          .sxs-grid {
            grid-template-columns: minmax(0, 1fr); justify-items: center;
            gap: clamp(6px, 1.4vh, 14px); margin-top: clamp(10px, 2vh, 20px);
            /* align-items, not align-content: the row is 1fr and fills the grid either way, so
               it is the item's placement inside that row that decides where the copy sits. The
               base composition centres it there, which on a phone dropped it into the hand. */
            align-items: start; align-content: start;
          }
          /* The coded investment cards are a desktop-composition element. On a phone they were a
             third stacked block under an already-tall hand, which is what made the column feel
             like a list rather than one image with a caption. Desktop and tablet are untouched. */
          .sxs-left { display: none; }
          .sxs-right > * { max-width: none; }
          /* start, not center: the column still stretches to fill the row the hand vacated, and
             centring inside it is what pushed the copy down into the hand. */
          .sxs-right { text-align: center; justify-items: center; align-content: start; }
          .sxs-copy { max-width: 32ch; margin-inline: auto; }

          /* --- the hand, dropped to the bottom edge and cropped there ---
             Out of the grid flow and anchored to the stage (the nearest positioned ancestor,
             and the element that already clips), so it can be wider than the column and hang
             past the bottom of the frame.

             That is what buys the size. The asset is 833x998 with the phone only 30% of its
             width; the rest is forearm, and the forearm is widest at the very bottom (measured:
             the opaque span is 574/833 at 68% of the height against 792/833 at 96%). Pushing the
             bottom quarter off the edge therefore does two things at once - it shortens the
             visible arm, and it takes the widest part of the asset out of the frame, which lets
             the whole image scale up without the fingers reaching the screen edges. Nothing is
             stretched: one uniform scale, the asset's own aspect ratio, and a straight crop. */
          .sxs-phone-cell {
            /* 1.10x the previous min(136vw, 540px, 70vh) -- a further ~10% zoom on top of the
               existing crop, not a second transform stacked on it. The phone sits centred and
               narrow inside the asset (see the file-level comment: its screen alone spans
               296-548 of the 833-wide image, i.e. within half a percent of the asset's own
               horizontal midpoint), so scaling the whole asset up while keeping it centred on
               the viewport keeps the phone centred and fully clear of both edges even as more
               of the wider hand/forearm on either side runs past them -- the same reasoning
               that already justified 136vw here, just carried one step further.
               Landed at the low end of the requested 10-15%, not the middle: the hand is
               anchored to the stage's bottom edge and grows upward as --ph-w grows, while the
               padding change above pushes the text block down -- the two close the gap between
               them from both sides at once. Measured directly at 360-414px: 12% already left
               under 15px of clearance on the narrowest widths tested, and every point above that
               shrinks it further. 10% keeps a real, comfortable gap (30px+) with room to spare
               rather than a coincidence dependent on this exact copy length not changing. */
            --ph-w: min(150vw, 594px, 77vh);
            /* 22% of the asset's own height sits below the stage edge. The asset is 833 wide by
               998 tall, so that is 0.22 * (998 / 833) = 0.2636 of the rendered width. The phone
               body ends at about 73.5% of the asset's height, so the cut lands well clear of it:
               the whole handset stays in frame and it is only forearm that leaves. This ratio is
               unaffected by the zoom above since it is expressed as a fraction of --ph-w, not a
               fixed pixel offset -- the crop boundary stays pinned to the same point on the
               asset regardless of how large --ph-w resolves to. */
            position: absolute; left: 50%; bottom: calc(var(--ph-w) * -0.2636);
            transform: translateX(-50%);
            width: var(--ph-w);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sxs-slide, .sxs-screen img { transition: none; }
        }
      `}</style>

      <div className="sxs-stage" ref={stageRef}>
        <div className="sxs-inner">
          <div className="sxs-head">
            <h2 className="sxs-h2">
              so, what are you looking to <span className="sxs-invest-word">invest</span> in?
            </h2>
          </div>

          <div className="sxs-grid">
            {/* left: coded cards */}
            <div className="sxs-col sxs-left">
              {SLIDES.map((sl, i) => (
                <div
                  key={sl.id}
                  className="sxs-slide"
                  data-off={i - idx}
                  aria-hidden={i !== idx}
                  style={{ transform: `translate3d(0, ${Math.max(-1, Math.min(1, i - idx)) * 38}px, 0)` }}
                >
                  <Panel id={sl.id} compact={bp.m} />
                </div>
              ))}
            </div>

            {/* centre: the hand, which never moves; only the display changes */}
            <div className="sxs-phone-cell">
              <div className="sxs-phone">
                <div className="sxs-phone-inner">
                  <img className="sxs-hand" src={HAND} alt="" width={833} height={998} loading="lazy" decoding="async" />
                  <div className="sxs-screen">
                    {SLIDES.map((sl, i) => (
                      <img
                        key={sl.id}
                        src={sl.screen}
                        alt={i === idx ? sl.screenAlt : ''}
                        aria-hidden={i !== idx}
                        loading="lazy"
                        decoding="async"
                        style={{ transform: `translate3d(0, ${(i - idx) * 100}%, 0)` }}
                      />
                    ))}
                    <span className="sxs-island" />
                  </div>
                </div>
              </div>
            </div>

            {/* right: a bold heading over the one line of copy for this slide */}
            <div className="sxs-col sxs-right">
              {SLIDES.map((sl, i) => (
                <div
                  key={sl.id}
                  className="sxs-slide"
                  data-off={i - idx}
                  aria-hidden={i !== idx}
                  style={{ transform: `translate3d(0, ${Math.max(-1, Math.min(1, i - idx)) * 38}px, 0)` }}
                >
                  <p className="sxs-copy-heading">{sl.heading}</p>
                  <p className="sxs-copy">{sl.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

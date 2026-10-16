'use client';

/**
 * Homepage news carousel.
 *
 * The ten newest Analysis articles, as a three-across deck: the active one large in the
 * middle, the one before and the one after flanking it smaller, and the pair beyond those
 * bleeding off each edge. Text only, deliberately. Fermor's articles do not have hero images
 * and inventing thumbnails for them would be dressing, so the headline is the card.
 *
 * The deck is one absolutely positioned card per article, each placed by a transform derived
 * from its signed distance to the active index. Advancing changes that one number, so every
 * card animates to the next seat at once and the deck reads as physically shifting rather
 * than as the middle card being swapped out. Nothing re-renders per frame: the browser
 * interpolates the transforms.
 *
 * Articles come from the Analysis index itself, not a copy of it.
 */

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '../blogs/articles';

/** How many articles the deck holds, and how many seats it wraps through. */
const COUNT = 10;
const ITEMS = ARTICLES.slice(0, COUNT);

const AUTOPLAY_MS = 3000;

const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const C = {
  ink: '#111111',
  ink2: '#555555',
  ink3: '#8A8F86',
  dg: '#1A3530',
  border: '#E5E5E5',
  borderSoft: '#ECEFE9',
  white: '#ffffff',
};

/* ---------------------------------------------------------------- seating */

/**
 * Where a card sits, by how many places it is from the active one.
 *
 * A seat carries a real width and height, not a scale factor. The flanking cards are meant to
 * be smaller cards, the way the reference shows them: narrower, shorter, and typeset for the
 * box they are actually in. Scaling one card down would have shrunk its headline to the point
 * of illegibility and kept the centre card's own proportions, which is the thing that makes a
 * deck read as one card photocopied at three sizes instead of a stack of different cards.
 *
 * Everything from three places out shares the outermost seat, so a card that is about to wrap
 * around the deck has somewhere to be parked that is already off-screen and already invisible.
 */
type Seat = { x: number; w: number; h: number; opacity: number; z: number; tier: 0 | 1 | 2 };

/** Sizes for one breakpoint: the centre card, and how far each ring shrinks from it. */
type Deck = { w: number; h: number; gap: number };

function seat(offset: number, d: Deck): Seat {
  const dir = Math.sign(offset);
  const w1 = Math.round(d.w * 0.49);
  const h1 = Math.round(d.h * 0.84);
  const w2 = Math.round(d.w * 0.4);
  const h2 = Math.round(d.h * 0.74);
  // Each ring is placed off the edge of the one inside it, so the gaps stay even whatever the
  // widths are.
  const x1 = d.w / 2 + d.gap + w1 / 2;
  const x2 = x1 + w1 / 2 + d.gap + w2 / 2;

  switch (Math.min(Math.abs(offset), 3)) {
    case 0:
      return { x: 0, w: d.w, h: d.h, opacity: 1, z: 30, tier: 0 };
    case 1:
      return { x: dir * x1, w: w1, h: h1, opacity: 0.66, z: 20, tier: 1 };
    case 2:
      return { x: dir * x2, w: w2, h: h2, opacity: 0.22, z: 10, tier: 2 };
    default:
      return { x: dir * (x2 + w2), w: w2, h: h2, opacity: 0, z: 0, tier: 2 };
  }
}

/** Shortest signed distance from `i` to `active` around a ring of COUNT seats. */
function offsetOf(i: number, active: number) {
  const rel = (i - active + COUNT) % COUNT;
  return rel > COUNT / 2 ? rel - COUNT : rel;
}

/* ----------------------------------------------------------------- hooks */

/** Width only: the deck's own three breakpoints, kept local so this file stands alone. */
function useWidth() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const read = () => setW(window.innerWidth);
    read();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return w;
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const read = () => setReduce(mq.matches);
    read();
    mq.addEventListener('change', read);
    return () => mq.removeEventListener('change', read);
  }, []);
  return reduce;
}

/* ------------------------------------------------------------------ card */

function Card({
  article,
  offset,
  deck,
  compact,
  leadLines,
  animate,
  onHover,
}: {
  article: (typeof ITEMS)[number];
  offset: number;
  deck: Deck;
  compact: boolean;
  leadLines: number;
  animate: boolean;
  onHover: (slug: string, over: boolean) => void;
}) {
  const s = seat(offset, deck);
  const active = offset === 0;
  const hidden = Math.abs(offset) >= 3;
  // Typography follows the seat, not the breakpoint, because a flanking card is a smaller card
  // rather than the same card seen from further away.
  const pad = s.tier === 0 ? (compact ? 22 : 30) : s.tier === 1 ? (compact ? 15 : 20) : 15;
  const titleSize = s.tier === 0 ? (compact ? 18 : 23) : s.tier === 1 ? (compact ? 14 : 16) : 13;
  // The card's own move. Everything written inside the card borrows this exact duration and
  // curve so the type travels with the card instead of catching up to it afterwards.
  const MOVE = '.72s cubic-bezier(.4,.02,.2,1)';

  return (
    <Link
      href={`/blogs/${article.slug}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className="fnc-card"
      // Only the middle card holds the countdown. A pointer resting on a flanking card, or on
      // the arrows and dots, leaves the deck running.
      onMouseEnter={active ? () => onHover(article.slug, true) : undefined}
      onMouseLeave={active ? () => onHover(article.slug, false) : undefined}
      onFocus={active ? () => onHover(article.slug, true) : undefined}
      onBlur={active ? () => onHover(article.slug, false) : undefined}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: s.w,
        height: s.h,
        zIndex: s.z,
        opacity: s.opacity,
        transform: `translate(-50%,-50%) translate3d(${s.x}px,0,0)`,
        // A card four or more seats out is invisible and off-stage, and it is the one that
        // wraps from one end of the ring to the other. Letting that jump animate would drag a
        // ghost across the deck, so only the seats anyone can see are transitioned.
        transition:
          animate && Math.abs(offset) < 4
            ? 'transform .72s cubic-bezier(.4,.02,.2,1), opacity .72s cubic-bezier(.4,.02,.2,1), width .72s cubic-bezier(.4,.02,.2,1), height .72s cubic-bezier(.4,.02,.2,1)'
            : 'none',
        pointerEvents: hidden ? 'none' : 'auto',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
      }}
    >
      <article
        className="fnc-surface"
        style={{
          height: '100%',
          boxSizing: 'border-box',
          background: C.white,
          border: `1px solid ${active ? '#DADFD6' : C.border}`,
          borderRadius: 18,
          padding: pad,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: active ? '0 18px 44px rgba(20,30,18,.09)' : '0 2px 10px rgba(20,30,18,.04)',
          transition: animate ? 'box-shadow .72s ease, border-color .72s ease, padding .72s ease' : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: s.tier === 0 ? 9 : 6,
            marginBottom: s.tier === 0 ? (compact ? 12 : 15) : 10,
            flexWrap: 'wrap',
            flexShrink: 0,
            transition: animate ? `margin-bottom ${MOVE}, gap ${MOVE}` : 'none',
          }}
        >
          <span
            style={{
              fontFamily: INTER,
              fontSize: s.tier === 0 ? 10.5 : 9.5,
              fontWeight: 700,
              letterSpacing: '.085em',
              textTransform: 'uppercase',
              color: C.dg,
              transition: animate ? `font-size ${MOVE}` : 'none',
            }}
          >
            {article.category}
          </span>
          <span style={{ color: C.border }}>·</span>
          <span style={{ fontFamily: INTER, fontSize: s.tier === 0 ? 12 : 11, color: C.ink3, transition: animate ? `font-size ${MOVE}` : 'none' }}>
            {article.date}
          </span>
          {/* The read time is the first thing to go when the card gets narrow: on a flanking
              card it would push the meta line onto a third row and crowd the headline out. */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              opacity: s.tier === 0 ? 1 : 0,
              maxWidth: s.tier === 0 ? 140 : 0,
              transition: animate ? `opacity ${MOVE}, max-width ${MOVE}` : 'none',
            }}
            aria-hidden={s.tier === 0 ? undefined : true}
          >
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 12, color: C.ink3 }}>
              {article.readTime}
            </span>
          </span>
        </div>

        <h3
          className="fnc-title"
          style={{
            fontFamily: POPPINS,
            fontSize: titleSize,
            fontWeight: 600,
            color: C.ink,
            lineHeight: 1.26,
            letterSpacing: '-.018em',
            margin: 0,
            flexShrink: 0,
            display: '-webkit-box',
            WebkitLineClamp: s.tier === 0 ? 3 : 5,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            // Type size is part of the seat, so it has to interpolate with the seat. Left as a
            // bare number it snapped the headline to its new size the instant the seat
            // changed, half a second before the card finished arriving, which is what made the
            // text look freshly written rather than carried in.
            transition: animate
              ? `font-size ${MOVE}, line-height ${MOVE}, color .2s ease`
              : 'color .2s ease',
          }}
        >
          {article.title}
        </h3>

        {/* The lead and the read cue belong to whichever card is in the middle. They fade
            rather than unmount, so the flanking cards stay one headline each and the deck
            still animates as one piece. Fade and lift run on the card's own duration and
            curve, starting the moment the seat changes, so the copy is already most of the way
            in by the time the card reaches the middle: it settles with the card rather than
            appearing on top of a card that has already stopped. */}
        <p
          style={{
            fontFamily: INTER,
            fontSize: compact ? 13.5 : 14.5,
            color: C.ink2,
            lineHeight: 1.6,
            margin: `${compact ? 10 : 14}px 0 0`,
            display: '-webkit-box',
            WebkitLineClamp: leadLines,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            opacity: active ? 1 : 0,
            transform: active ? 'translate3d(0,0,0)' : 'translate3d(0,8px,0)',
            transition: animate ? `opacity ${MOVE}, transform ${MOVE}` : 'none',
          }}
        >
          {article.lead}
        </p>

        <span
          style={{
            marginTop: 'auto',
            paddingTop: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: INTER,
            fontSize: 13.5,
            fontWeight: 600,
            color: C.dg,
            opacity: active ? 1 : 0,
            transform: active ? 'translate3d(0,0,0)' : 'translate3d(0,8px,0)',
            transition: animate ? `opacity ${MOVE}, transform ${MOVE}` : 'none',
          }}
        >
          Read the analysis
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </article>
    </Link>
  );
}

/* -------------------------------------------------------------- carousel */

export default function NewsCarousel() {
  const w = useWidth();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // Which card the pointer is resting on, by slug. Held as the slug rather than a boolean so
  // that navigating while hovering settles correctly whichever order the browser fires the
  // old card's leave and the new card's enter in: a leave only clears a hold it owns.
  const [held, setHeld] = useState<string | null>(null);

  const mobile = w < 760;
  const tablet = w >= 760 && w < 1080;

  // The centre card, and the gap each ring is set off by. On a narrow window the flanking
  // cards are deliberately allowed to run off the edge rather than being squeezed to fit: the
  // brief for mobile is a dominant active card with a hint of what is either side of it.
  const deck: Deck = mobile
    ? { w: Math.min(w - 88, 320), h: 258, gap: 8 }
    : tablet
      ? { w: 380, h: 272, gap: 10 }
      : { w: 470, h: 312, gap: 14 };

  const go = useCallback((next: number) => {
    setActive(((next % COUNT) + COUNT) % COUNT);
  }, []);

  const onHover = useCallback((slug: string, over: boolean) => {
    setHeld(cur => (over ? slug : cur === slug ? null : cur));
  }, []);

  const paused = held !== null && held === ITEMS[active].slug;

  // Autoplay: one timeout, never an interval, and it is keyed on `active`. Every advance
  // (automatic, an arrow, a dot) changes `active`, which tears the pending timeout down and
  // schedules a fresh full-length one, so manual navigation restarts the countdown instead of
  // ending it and there is never more than one timer alive. A hold on the centre card simply
  // means no timer is scheduled at all; releasing it schedules a whole new interval from zero.
  // Reduced motion opts out entirely, since an unprompted move every three seconds is exactly
  // what that setting is about.
  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => setActive(a => (a + 1) % COUNT), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduce]);

  const arrow = (dir: -1 | 1) => (
    <button
      type="button"
      onClick={() => go(active + dir)}
      aria-label={dir === -1 ? 'Previous article' : 'Next article'}
      className="fnc-arrow"
      style={{
        width: 38,
        height: 38,
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,.24)',
        background: 'transparent',
        color: '#ffffff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
        transition: 'border-color .2s ease, background .2s ease',
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === -1 ? 'rotate(180deg)' : 'none' }}
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );

  return (
    <section
      style={{
        padding: mobile ? '52px 18px 60px' : '80px 28px 92px',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .fnc-card:hover .fnc-surface { transform: translateY(-4px); border-color: #C9D2C5; box-shadow: 0 22px 50px rgba(20,30,18,.12); }
        .fnc-card .fnc-surface { transform: translateY(0); }
        .fnc-card:hover .fnc-title { color: ${C.dg}; }
        .fnc-arrow:hover { border-color: rgba(255,255,255,.55); background: rgba(255,255,255,.10); }
        .fnc-dot:hover { background: rgba(255,255,255,.55); }
        @media (prefers-reduced-motion: reduce) {
          .fnc-card:hover .fnc-surface { transform: none; }
        }
      `}</style>

      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16,
            marginBottom: mobile ? 26 : 38,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: INTER,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '.09em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,.62)',
                marginBottom: 10,
              }}
            >
              Latest analysis
            </div>
            <h2
              style={{
                fontFamily: POPPINS,
                fontSize: 'clamp(24px,3.4vw,36px)',
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 1.12,
                letterSpacing: '-.02em',
                margin: 0,
              }}
            >
              News that impacts your wallet.
            </h2>
          </div>
          <Link
            href="/blogs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: INTER,
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              flexShrink: 0,
              paddingBottom: 4,
            }}
          >
            View all news
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* The deck. The hold lives on the centre card itself, not on this container: with it
            here, clicking an arrow or a dot focused a control inside the group and left the
            deck paused for good. */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Latest analysis articles"
          style={{ position: 'relative' }}
        >
          <div
            style={{
              position: 'relative',
              height: deck.h,
              // The flanking cards are meant to run past the content column and be cut by the
              // section, not to widen the page. The section clips its own overflow.
              margin: '0 auto',
              maxWidth: 1160,
            }}
          >
            {ITEMS.map((a, i) => (
              <Card
                key={a.slug}
                article={a}
                offset={offsetOf(i, active)}
                deck={deck}
                compact={mobile || tablet}
                leadLines={mobile ? 2 : 3}
                animate={!reduce}
                onHover={onHover}
              />
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: mobile ? 14 : 20,
              marginTop: mobile ? 26 : 34,
            }}
          >
            {arrow(-1)}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }} role="tablist" aria-label="Choose article">
              {ITEMS.map((a, i) => (
                <button
                  key={a.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Article ${i + 1} of ${COUNT}`}
                  onClick={() => go(i)}
                  className={i === active ? undefined : 'fnc-dot'}
                  style={{
                    width: i === active ? 22 : 7,
                    height: 7,
                    borderRadius: 999,
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    background: i === active ? '#ffffff' : 'rgba(255,255,255,.28)',
                    transition: reduce ? 'none' : 'width .4s ease, background .25s ease',
                  }}
                />
              ))}
            </div>
            {arrow(1)}
          </div>
        </div>
      </div>
    </section>
  );
}

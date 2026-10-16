'use client';

/**
 * Scroll transitions between the homepage's five bands, built to the Kyte reference recording.
 *
 * The mechanic in the reference, measured off the frames rather than guessed at:
 *
 *   Every section is a rounded panel, inset from the viewport sides, sitting on a dark page
 *   ground that shows through the gutters and through the lens-shaped notch where one panel's
 *   rounded bottom meets the next panel's rounded top.
 *
 *   The incoming section does not animate at all. It scrolls in at exactly page speed, on top
 *   of the one before it.
 *
 *   The outgoing section is what moves: as the next panel's top edge travels from the bottom of
 *   the viewport to the top, the outgoing panel scales down about its own bottom edge, from 1
 *   to about 0.88, and sinks by a few per cent of the viewport at the same time. In the
 *   reference that shows up as its side gutters widening from ~30px to ~120px while its content
 *   drifts down against the scroll. It reads as the old scene dropping back and down into depth
 *   while the new one rides up over it.
 *
 * Scaling about `50% 100%` is what keeps this honest across the five different section heights.
 * The bottom edge is the anchor, so the outgoing panel's bottom stays at or below the incoming
 * panel's top edge and the join between them can never open into a gap; and the drift of the
 * content at the top of the viewport works out to exactly `viewportHeight * (1 - scale)`, with
 * the section's own height cancelling out. A 600px band and a 1400px band recede identically.
 *
 * The incoming panel is deliberately left alone - it rises at exactly page speed and covers the
 * one behind it because it is later in the stacking order, not because anything animates it.
 * Giving it a lift of its own would mean it arrived ahead of its own layout box, and its bottom
 * edge would lift off the panel after it; a seam of page ground at a panel join is a far worse
 * artefact than the effect would be worth, and the relative motion reads the same either way
 * since the panel it is covering is already moving the other way.
 *
 * Progress comes from one live getBoundingClientRect per section per frame, so nothing is
 * cached and nothing needs recomputing when content grows. The next panel's own scale is backed
 * out of that reading before it is used, so two overlapping windows cannot feed each other.
 *
 * Cost: one passive scroll listener, one rAF behind a dirty flag (no loop while idle), no React
 * state, no extra DOM. The geometry is static CSS below, so it is server rendered and there is
 * no shift on hydration. A section at rest carries no `transform` at all, which matters for the
 * hero: it is GSAP-pinned with `position: fixed`, and a transform on an ancestor would become
 * its containing block. The pin releases before the band ever starts receding, so the two never
 * overlap, but writing no transform at rest makes that safe rather than merely likely.
 */

import { useEffect } from 'react';
import { onScrollFrame, requestScrollFrame } from './scrollScheduler';

/** How far an exiting panel recedes. Measured off the reference at roughly 0.12. */
const RECEDE = 0.12;

/**
 * How far an exiting panel also sinks, as a fraction of the viewport height.
 *
 * Scaling alone reads as "smaller", not as "further back and lower down": the bottom edge stays
 * welded to the incoming panel's top edge, so the panel shrinks in place. Sliding it down as it
 * shrinks is what turns it into a card being pushed under the next one - the incoming panel is
 * above it in the stacking order, so the part that sinks past the boundary is covered rather
 * than exposed, and the join never opens.
 *
 * Kept small on purpose, and the size is what makes it safe. The exiting panel's own top edge
 * is at `boundary - height`, so the sink can only drag it back into view if the panel is close
 * to a viewport tall. Every receding band on this page is taller than that, and with the sink
 * under a tenth of the viewport the panel's top is provably still off screen at every point of
 * the pass: `vh * (1 - p) + SINK * vh * ease(p)` is strictly decreasing while
 * `SINK * ease'(0) < 1`, so its largest value is `vh` at p = 0, which is already the height
 * floor. Nothing here can uncover the band above.
 */
const SINK = 0.055;

/** Barely off linear, which is what the reference measures as. Just enough to soften the start. */
const ease = (p: number) => p * (2 - p) * 0.35 + p * 0.65;

export default function SectionPanels() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let panels: HTMLElement[] = [];

    /* Re-queried, not captured once. Every page that has used this component so far has a fixed
       section count for its whole lifetime, so capturing `panels` once at mount was never wrong
       for them - but the calculators page now swaps its own `main` between one section (a single
       category filtered or a search result view) and six (the full browse view) as the user
       clicks around, without this component ever unmounting. A `panels` array captured at mount
       would silently go stale the first time that happens: frame() would keep transforming
       detached or no-longer-relevant nodes, and a newly-mounted section would never receive a
       transform at all. Re-scanning on every ResizeObserver firing (a section changing count
       necessarily changes main's own height) keeps this correct for that page while being a
       no-op re-read for every page whose section count never actually changes. */
    const rescan = () => {
      const next = Array.from(
        document.querySelectorAll<HTMLElement>('main > section[data-section]')
      );
      // Clean up a panel that just dropped out of the set - it should not be left holding a
      // stale transform from before it was hidden/removed.
      panels.forEach(el => {
        if (!next.includes(el)) {
          el.style.transform = '';
          delete el.dataset.fpS;
          delete el.dataset.fpT;
        }
      });
      panels = next;
    };
    rescan();

    const frame = () => {
      // Moved from a one-time check at setup to a per-frame one: the count this reads can now
      // change while the component stays mounted (see the rescan() comment above).
      if (panels.length < 2) return;
      const vh = window.innerHeight || 1;
      const recede = reduce.matches ? 0 : RECEDE;

      // Read everything first, then write. Interleaving would force a layout per section.
      const tops: number[] = [];
      const heights: number[] = [];
      for (let i = 0; i < panels.length; i++) {
        tops.push(panels[i].getBoundingClientRect().top);
        heights.push(panels[i].offsetHeight);
      }

      // The last band has nothing after it to be pushed under, so it never recedes.
      for (let i = 0; i < panels.length - 1; i++) {
        const el = panels[i];
        const nextScale = Number(panels[i + 1].dataset.fpS || 1);
        const nextSink = Number(panels[i + 1].dataset.fpT || 0);
        /* Undo the next panel's own transform to get the real boundary position. It is anchored
           at its bottom, so its rendered top sits height * (1 - scale) below its layout top, and
           the sink moves it a further `fpT` down. Both have to come back out or two overlapping
           windows would read each other's output as input. */
        const boundary = tops[i + 1] - nextSink - heights[i + 1] * (1 - nextScale);

        let p = 1 - boundary / vh;
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        const e = ease(p);
        const s = 1 - recede * e;
        // Rounded to the pixel: the sink is a compositor translate, and quantising it keeps the
        // panel's paint from resampling on sub-pixel steps that nobody can see anyway.
        const ty = recede === 0 ? 0 : Math.round(SINK * vh * e);

        const applied = Number(el.dataset.fpS || 1);
        if (Math.abs(s - applied) < 0.0004) continue;
        el.dataset.fpS = String(s);
        el.dataset.fpT = String(ty);
        /* No transform at all at rest: an idle band must not become a containing block.

           Translate before scale. The origin is the panel's own bottom edge, so the scale is
           taken about the edge the translate has already moved - the panel sinks by exactly
           `ty` and shrinks about where it ends up, rather than shrinking about the old boundary
           and then being nudged. */
        el.style.transform = s === 1
          ? ''
          : `translate3d(0, ${ty}px, 0) scale3d(${s.toFixed(4)}, ${s.toFixed(4)}, 1)`;
      }
    };

    // The shared scheduler owns the listener and the frame; this is just the effect body.
    const unsubscribe = onScrollFrame(frame);

    // A band's height changing (an FAQ opening, a font landing, a filter swapping the section
    // count) moves every boundary after it, and might mean the set of sections itself changed -
    // rescan before the next frame runs rather than assuming the old elements are still current.
    const ro = new ResizeObserver(() => {
      rescan();
      requestScrollFrame();
    });
    const main = document.querySelector('main');
    if (main) ro.observe(main);
    reduce.addEventListener('change', requestScrollFrame);

    return () => {
      unsubscribe();
      reduce.removeEventListener('change', requestScrollFrame);
      ro.disconnect();
      panels.forEach(el => {
        el.style.transform = '';
        delete el.dataset.fpS;
        delete el.dataset.fpT;
      });
    };
  }, []);

  /* Panel geometry in plain CSS so it ships with the markup. The ground behind the panels is
     the dark token the black bands already use, so the side gutters, the notch between two
     panels, the band above the first panel and the band below the footer all read as one
     continuous page frame rather than as a colour of their own.

     The frame is closed on all four sides. The top band is padding on <main> rather than a
     margin on the first panel: a margin there would collapse straight out of <main> and leave
     a white strip above the ground instead of a dark band. The bottom band is padding on the
     page wrapper, and the footer is carried inside the same inset column as the panels, so the
     side gutters run the full height of the page instead of stopping dead at the last section's
     bottom edge.

     One boundary stays welded square: the last panel's bottom meets the footer's top, and both
     are the same white, so rounding either would cut a dark lens into a join that is not a
     transition. Every other corner of the frame is rounded, and every interior panel boundary
     keeps the treatment it already had.

     Nothing here writes a transform. The first panel is the GSAP-pinned hero's ancestor, and a
     transform on it would become the pin's containing block; padding, margin, radius and
     background cannot do that. */
  return (
    <style>{`
      :root {
        --fp-r: 40px;
        --fp-inset: 28px;
        --fp-ground: #0D0F10;
      }
      /* overflow-x: clip, not hidden, and the distinction is the reason the two pinned
         sections on this page can use position: sticky at all.

         hidden is a *scrollable* overflow value: setting it on one axis forces the other axis
         to compute to auto, which makes this wrapper a scroll container. A sticky element
         sticks to its nearest scroll container, so with hidden here every sticky descendant
         stuck to this wrapper - which never actually scrolls - instead of to the viewport, and
         therefore never stuck at all. That is why the phone-in-hand and Unify sections used to
         pin themselves in JavaScript by writing a counter-transform every frame, and that
         main-thread correction loop is what made them visibly vibrate while scrolling.

         clip clips exactly the same way but is not scrollable, so this wrapper stops being a
         scrollport and the browser can pin both sections on the compositor. Verified directly:
         with hidden a sticky probe here tracked the scroll 1:1 (never stuck); with clip it
         held at 0 across the whole stretch, and horizontal content stayed contained either way.
         The hidden declaration first is the fallback for browsers without clip. */
      [data-fp-page] {
        background: var(--fp-ground);
        padding-bottom: var(--fp-inset);
        overflow-x: hidden;
        overflow-x: clip;
      }
      main {
        background: var(--fp-ground);
        padding-top: var(--fp-inset);
      }
      main > section[data-section] {
        position: relative;
        margin-left: var(--fp-inset);
        margin-right: var(--fp-inset);
        border-radius: var(--fp-r);
        transform-origin: 50% 100%;
      }
      main > section[data-section="1"] {
        z-index: 1;
        margin-top: 0;
      }
      /* The landing band paints its own gradient edge to edge, which would square off the
         panel it sits in. It carries the panel's full radius, all four corners, so the two agree
         at the top against the frame and at the bottom against the next panel. Matched on the
         attribute, not on child position, because GSAP wraps it in a pin spacer at runtime. */
      [data-fp-top] {
        border-radius: var(--fp-r);
      }
      main > section[data-section="2"] { z-index: 2; }
      main > section[data-section="3"] { z-index: 3; }
      main > section[data-section="4"] { z-index: 4; }
      main > section[data-section="5"] { z-index: 5; }
      main > section[data-section="6"] { z-index: 6; }
      /* A section welds square to the footer when it carries this marker - not whenever its own
         data-section happens to be "5". That used to be the same thing on the homepage (five
         sections, Footer rendered without its minimal prop, whose light FAQ block needs the
         square join right below it), but data-section is also just "this section's position in
         THIS page's own stack" - a calculators page with six sections has its own section 5
         (Tools & Math) sitting in the MIDDLE of the stack, and keying this off the number 5 would
         square its bottom corners against Others (section 6) for no reason, breaking the
         corner-to-corner lens every other panel boundary gets. /resources ends on a white band
         against a black Footer rendered with the minimal prop and rounds normally against it (no
         light block in between to weld square to), which is why this was never simply
         :last-of-type either - see HomepageClient.tsx for the one place this marker is actually
         applied. */
      main > section[data-fp-weld-footer] {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
      /* The footer closes the frame: same inset as every panel, welded square to the last
         section above it, rounded off at the bottom against the ground band below. It already
         clips its own overflow, so the radius holds against its gradient. */
      main + footer {
        position: relative;
        z-index: 6;
        margin-left: var(--fp-inset);
        margin-right: var(--fp-inset);
        border-bottom-left-radius: var(--fp-r);
        border-bottom-right-radius: var(--fp-r);
      }
      /* On a phone the dark frame was eating 12px of an already narrow viewport on each side,
         which read as a black border down both edges rather than as the deliberate inset the
         desktop frame is. 4px still separates each panel from the ground (so the rounded corners
         and the lens between two panels still read as a frame), while giving the content back
         16px of width - about 4% of a 390px screen. The radius comes down with it so the corner
         stays in proportion to the smaller inset rather than looking bitten out of the panel. */
      @media (max-width: 759px) {
        :root { --fp-r: 18px; --fp-inset: 4px; }
      }
    `}</style>
  );
}

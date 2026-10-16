/**
 * Runs a state update (e.g. a "See more" expand/collapse) without letting the browser's own
 * post-layout scroll adjustments move the viewport.
 *
 * Expanding one of /blogs's grids in place (more cards appended below the existing ones, further
 * down the very same page) should never move the reader's scroll position - confirmed directly
 * that on this page it sometimes does, even though nothing here ever calls `scrollTo`,
 * `scrollIntoView`, or changes the route: after interacting with the type-filter dropdown earlier
 * on the page, a later grid expansion could land the viewport thousands of pixels away, growing
 * by exactly the same amount the document grew by (the signature of an anchor-based scroll
 * correction, not a bug in this code's own logic - `overflow-anchor: none` on the grid itself
 * was tried first and made it worse rather than better, which is why this takes the
 * measure-and-restore approach instead of trying to prevent the browser's adjustment outright).
 *
 * The fix here does not try to diagnose or prevent whatever the browser is doing: it captures the
 * scroll position before the update, lets the update and the browser's own reflow (and any
 * compensating adjustment) finish, then snaps back if anything moved. The correction is
 * `behavior: 'auto'` (instant), not smooth, specifically so that if a correction IS needed, it
 * happens in one invisible frame rather than as a visible glide back into place - a delayed but
 * instant snap reads as "nothing happened"; a delayed smooth-scroll back reads as its own jump.
 */
export function preserveScroll(update: () => void) {
  const before = window.scrollY;
  update();
  // Long enough to run after the browser's own layout/paint and any scroll-anchoring pass has
  // settled (confirmed present well within the first animation frame in testing, so two rAFs
  // were not a safe enough margin); short enough that a real correction is imperceptible as a
  // delay.
  window.setTimeout(() => {
    if (Math.abs(window.scrollY - before) > 1) {
      // `behavior: "auto"` does NOT mean instant here - per spec it defers to the element's own
      // `scroll-behavior` CSS, and this page sets `html { scroll-behavior: smooth }` globally.
      // Confirmed directly: with "auto" the correction visibly glided back over several hundred
      // ms instead of snapping, which is its own kind of jump. "instant" bypasses that.
      window.scrollTo({ top: before, behavior: "instant" });
    }
  }, 60);
}

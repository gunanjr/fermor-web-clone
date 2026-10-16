'use client';

import FloatingNav from '../../../app/_home/FloatingNav';

/**
 * The site navigation for individual calculator, blog, mutual fund, tax and GDP pages: the
 * homepage's FloatingNav in its in-page variant (see `page` in app/_home/FloatingNav.tsx).
 * Pages import this one name so the homepage component stays the single source of the bar and
 * the pages never hand-write a nav of their own. The homepage, /blogs and /calculators render
 * FloatingNav directly, without `page`, and are unaffected.
 */
export function PageNav({ signupHref }: { signupHref?: string }) {
  return <FloatingNav page signupHref={signupHref} />;
}

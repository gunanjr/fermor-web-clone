'use client';

/**
 * One category's "All" view: a stationary, paginated 3-card group that auto-advances every 3
 * seconds, replacing the old continuous marquee (MarqueeRow.tsx, removed). Nothing here animates
 * per frame - the only moving parts are a `setInterval` that swaps `groupIndex` and a CSS
 * fade/slide that plays once per swap (`.carousel-row`'s `carousel-fade-in` keyframe, defined in
 * CalculatorsClient.tsx's shared stylesheet).
 *
 * State model matches the brief literally: `groupIndex * GROUP_SIZE` is the slice start, `items
 * .slice(start, start + GROUP_SIZE)` is what's shown, and advancing past the end wraps back to 0.
 * A manual arrow click both moves `groupIndex` and bumps `resetKey`, and the auto-advance effect
 * lists `resetKey` as a dependency purely so that bump tears down and reschedules the interval -
 * that's the entire "manual nav resets the 3s timer" behaviour. Hovering (desktop only; there's no
 * hover on touch) sets `paused`, which the same effect also depends on, so entering/leaving hover
 * stops/starts the interval without touching `groupIndex` - the carousel resumes from whatever
 * group was already showing, never from the start.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import type { CalculatorMeta } from '../../src/data/calculators';
import CalculatorCard from './CalculatorCard';

interface CategoryCarouselProps {
  items: CalculatorMeta[];
  categoryKey: string;
  categoryLabel: string;
  today: string;
}

const GROUP_SIZE = 3;
const INTERVAL_MS = 3000;

export default function CategoryCarousel({ items, categoryKey, categoryLabel, today }: CategoryCarouselProps) {
  const groupCount = Math.max(1, Math.ceil(items.length / GROUP_SIZE));

  const [groupIndex, setGroupIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // A new search/category result set (different item list) starts back at the first group rather
  // than keeping a stale index that might now be out of range.
  useEffect(() => { setGroupIndex(0); }, [items]);

  useEffect(() => {
    if (reduceMotion || paused || groupCount <= 1) return;
    const id = setInterval(() => {
      setGroupIndex(i => (i + 1) % groupCount);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused, groupCount, resetKey]);

  const goTo = useCallback((dir: 1 | -1) => {
    setGroupIndex(i => (i + dir + groupCount) % groupCount);
    setResetKey(k => k + 1);
  }, [groupCount]);

  const start = groupIndex * GROUP_SIZE;
  const visible = items.slice(start, start + GROUP_SIZE);

  return (
    <div className="carousel-outer">
      <div
        className="carousel-row-wrap"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="carousel-row" key={groupIndex}>
          {visible.map((item, i) => (
            <div className="carousel-item" key={item.slug}>
              <CalculatorCard
                slug={item.slug}
                title={item.title}
                desc={item.desc}
                categoryKey={categoryKey}
                categoryLabel={categoryLabel}
                index={start + i}
                isNew={item.addedDate === today}
                large
              />
            </div>
          ))}
        </div>
      </div>

      {groupCount > 1 && (
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-arrow"
            onClick={() => goTo(-1)}
            aria-label={`Previous ${categoryLabel} calculators`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel-arrow"
            onClick={() => goTo(1)}
            aria-label={`Next ${categoryLabel} calculators`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Visually hidden - announces the visible group to screen readers without a visible counter,
          which the design doesn't call for. */}
      <div ref={liveRegionRef} aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Showing {categoryLabel} calculators {start + 1} to {start + visible.length} of {items.length}
      </div>
    </div>
  );
}

'use client';

/**
 * The one card component every calculator on /calculators renders through - there is no second,
 * simplified version and no per-calculator JSX. Everything that varies between the 158 calculators
 * (title, description, category label, slug, whether it's new) comes in as props straight from
 * src/data/calculators.ts; everything that varies mechanically (the green/purple accent, the
 * visual motif) is derived here from `index` and from calculatorVisuals.ts's classifier, never
 * hand-picked per card.
 *
 * The actual CSS for `.cc*` lives once in CalculatorsClient.tsx's shared <style> block rather
 * than inside this component, specifically so 158 instances of this component don't each inject
 * their own copy of the same rules.
 */

import Link from 'next/link';
import { CalculatorVisual, getVisualType } from './calculatorVisuals';

const GREEN = '#75FB90';
const PURPLE = '#9E79FF';

export interface CalculatorCardProps {
  slug: string;
  title: string;
  desc: string;
  categoryKey: string;
  categoryLabel: string;
  index: number;
  isNew: boolean;
  /** The feature-sized variant used in each category's marquee track. Same component, same
      markup, same accent/motif logic - `cc-lg` in CalculatorsClient.tsx's shared stylesheet only
      changes dimensions (padding, type scale, visual scale), never the design itself. */
  large?: boolean;
}

export default function CalculatorCard({ slug, title, desc, categoryKey, categoryLabel, index, isNew, large }: CalculatorCardProps) {
  /* Card 1 -> green, card 2 -> purple, and so on. `index` is the item's position within its own
     category's own list - callers doubling that list for a seamless marquee loop pass
     `i % items.length` rather than the raw doubled-track position, so the card that reappears at
     the loop seam gets the exact same colour it had the first time, which is what makes the loop
     invisible rather than a visible colour-swap at the join. */
  const accent: 'green' | 'purple' = index % 2 === 0 ? 'green' : 'purple';
  const accentColor = accent === 'green' ? GREEN : PURPLE;
  const visualType = getVisualType(slug, title, categoryKey);

  return (
    <Link
      href={`/calculators/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`cc cc-${accent}${large ? ' cc-lg' : ''}`}
    >
      <span className="cc-strip" aria-hidden="true" />
      <div className="cc-top">
        <span className="cc-cat">{categoryLabel}</span>
        {isNew && <span className="cc-new">New</span>}
      </div>
      <p className="cc-title">{title}</p>
      <p className="cc-desc">{desc}</p>
      <div className="cc-visual">
        <CalculatorVisual type={visualType} color={accentColor} />
      </div>
      <span className="cc-cta">
        Calculate
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

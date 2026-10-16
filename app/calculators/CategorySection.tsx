'use client';

/**
 * One category rendered as its own homepage-style panel: `data-section={sectionNumber}` so
 * SectionPanels.tsx's existing recede-on-scroll transition (the same one the homepage's five
 * bands and /blogs' single band already use) picks it up automatically, with no code of its own
 * for that part. The panel's background is either the same shared photo the rest of the page
 * uses (light categories) or a flat dark grey (Tax, Retirement & Fixed Income) - never a second,
 * different image.
 *
 * Two strictly different bodies, chosen by `variant`, matching the two modes the calculator page
 * itself distinguishes ("All" vs. one selected category):
 *  - "carousel": CategoryCarousel's stationary, auto-advancing 3-card group (used when this
 *    section is one of several under the "All" filter).
 *  - "grid": every item in the category, laid out 3-per-row, no auto-advance, no hidden cards -
 *    used when the user has picked this one category from the section nav. The left/right arrows
 *    still render here (the design calls for them under every section regardless of mode), but
 *    since there's nothing left to page through without hiding calculators the user explicitly
 *    asked to see, they do section-level navigation instead: jump to the previous/next category.
 */

import type { CategoryDef } from '../../src/data/calculators';
import CategoryCarousel from './CategoryCarousel';
import CalculatorCard from './CalculatorCard';

/** #1F2225 - AppPromo.tsx's own "DG" dark charcoal, already part of the site's palette (used
    there for icon strokes), reused here rather than inventing a new dark tone or falling back to
    plain black. */
export const DARK_GREY = '#1F2225';

/** The two categories that render on DARK_GREY instead of the shared photo background - a fixed
    editorial choice (Tax and Retirement are the two "serious paperwork" categories), not derived
    from anything in the calculator data itself. */
export const DARK_CATEGORY_KEYS = new Set(['tax', 'retirement']);

interface CategorySectionProps {
  cat: CategoryDef;
  sectionNumber: number;
  today: string;
  /** The hero/search/category-bar chrome, rendered above this section's own heading. Only ever
      passed for the first visible section - not a second wrapper, just this one panel also
      carrying the page's header content the way the homepage's own section 1 carries the hero. */
  leading?: React.ReactNode;
  variant: 'carousel' | 'grid';
  /** grid variant only - jump to the previous/next category in the section nav. */
  onPrevCategory?: () => void;
  onNextCategory?: () => void;
  /** Replaces the category heading and body (used for search results). The panel renders light.
      Keeping search results inside this same component, rather than a different element, means
      the first panel - and the search input inside `leading` - is never unmounted when the page
      switches between browsing and searching, so no keystroke or focus is lost. */
  children?: React.ReactNode;
}

export default function CategorySection({
  cat, sectionNumber, today, leading, variant, onPrevCategory, onNextCategory, children,
}: CategorySectionProps) {
  const dark = !children && DARK_CATEGORY_KEYS.has(cat.key);
  if (children) {
    return (
      <section data-section={sectionNumber} className="calc-cat-section calc-cat-light">
        {leading}
        {children}
      </section>
    );
  }
  return (
    <section
      data-section={sectionNumber}
      className={`calc-cat-section${dark ? ' calc-cat-dark' : ' calc-cat-light'}`}
    >
      {leading}
      <div className="calc-cat-head">
        <span className="calc-cat-bar" />
        <h2 className="calc-cat-h2">{cat.label}</h2>
      </div>

      {variant === 'carousel' ? (
        <CategoryCarousel items={cat.items} categoryKey={cat.key} categoryLabel={cat.label} today={today} />
      ) : (
        <div className="cat-grid-outer">
          <div className="cat-grid">
            {cat.items.map((item, i) => (
              <div className="cat-grid-item" key={item.slug}>
                <CalculatorCard
                  slug={item.slug}
                  title={item.title}
                  desc={item.desc}
                  categoryKey={cat.key}
                  categoryLabel={cat.label}
                  index={i}
                  isNew={item.addedDate === today}
                  large
                />
              </div>
            ))}
          </div>

          {(onPrevCategory || onNextCategory) && (
            <div className="carousel-controls">
              <button
                type="button"
                className="carousel-arrow"
                onClick={onPrevCategory}
                aria-label="Previous category"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                className="carousel-arrow"
                onClick={onNextCategory}
                aria-label="Next category"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

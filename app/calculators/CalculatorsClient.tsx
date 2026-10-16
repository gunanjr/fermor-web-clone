'use client';

/**
 * The Calculators listing page.
 *
 * Structurally this now mirrors the homepage rather than /blogs: six panels, one per category,
 * each its own `data-section` under `<main>` so SectionPanels.tsx's existing recede-on-scroll
 * transition (unchanged, no code of its own here) picks them up exactly the way it picks up the
 * homepage's five bands. FloatingNav sits OUTSIDE `<main>` (see HomepageClient.tsx's own comment
 * on why - a `transform` on an ancestor becomes the containing block for a `position: fixed`
 * descendant, and unlike /blogs' single, never-transformed section, these six sections genuinely
 * do receive a recede transform as the next one scrolls into view). The page background reuses
 * AppPromo's curtain photo (via Footer's exported CONTINUED_BG_IMAGE/CONTINUED_BG_UNITS) on every
 * light panel - the two dark panels (Tax, Retirement & Fixed Income) use a flat dark grey instead,
 * per CategorySection.tsx.
 *
 * Filtering/search state: `active`, `searchQuery`, `visibleCats`, `totalResults`. Search matching
 * uses the shared ranked, typo-tolerant searchScore() from src/utils/searchMatch.ts. What changed is what gets rendered from them - see the three render modes at the bottom of
 * this file (search results, one filtered category, or all six) - and the presentation of each
 * card, which now runs through the same CalculatorCard component in either its regular grid size
 * (search results) or its `large` marquee size (CategorySection's rows).
 */

import { useState, useEffect, useRef } from 'react';
import { CATEGORIES, getTotalCount } from '../../src/data/calculators';
import FloatingNav from '../_home/FloatingNav';
import SectionPanels from '../_home/SectionPanels';
import { Footer, CONTINUED_BG_IMAGE, CONTINUED_BG_UNITS } from '../_home/Footer';
import CalculatorCard from './CalculatorCard';
import CategorySection, { DARK_GREY } from './CategorySection';
import { searchScore } from '@/utils/searchMatch';

const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

/* The site's actual brand tokens, not a calculator-page invention: GREEN/PURPLE match
   AppPromo.tsx's TEXT_PURPLE and FloatingNav/Footer's LOGO_GREEN; INK/INK2/INK3 and the
   readable-on-white GREEN_TEXT/GREEN_BG pair match ProductCardShowcase.tsx, which is the other
   place on the site that already renders cards over this exact photo background. */
const INK = '#141414';
const INK2 = '#5B5B57';
const INK3 = '#8C8C86';
const GREEN = '#75FB90';
const GREEN_TEXT = '#1E7A46';
const GREEN_BG = 'rgba(117,251,144,.20)';
const PURPLE = '#9E79FF';
/* #9E79FF itself is ~3.2:1 against white - fine for the decorative strip/glow below, not enough
   for small text (WCAG AA wants 4.5:1 for body-sized type). Darkened the same way GREEN_TEXT
   already darkens GREEN for the identical reason; this is the "Calculate" CTA's purple-card
   colour, never the strip/glow colour. */
const PURPLE_TEXT = '#6C4FCC';

const TAB_LABELS: Record<string, string> = {
  all:        'All',
  investing:  'Investing',
  tax:        'Tax',
  loans:      'Loans',
  retirement: 'Retirement',
  tools:      'Tools',
  others:     'Others',
};

type Tab = 'all' | string;

const total = getTotalCount();

export default function CalculatorsClient() {
  const [active, setActive] = useState<Tab>('all');
  const [today, setToday] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setToday(new Date().toLocaleDateString('en-CA')); }, []);

  /* Focus the input when search opens */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const q = searchQuery.toLowerCase().trim();

  /* Filter categories and items when searching. Same ranked, typo-tolerant matching as the
     Blogs search: best matches first within each category, and the category holding the best
     match first. Ties keep the original order. */
  const baseCats = active === 'all' || q ? CATEGORIES : CATEGORIES.filter(c => c.key === active);
  const visibleCats = q
    ? baseCats
        .map(cat => {
          const scored = cat.items
            .map(item => ({ item, score: searchScore(q, item.title, `${item.desc} ${item.slug.replace(/-/g, ' ')} ${cat.label}`) }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score);
          return { cat: { ...cat, items: scored.map(({ item }) => item) }, best: scored[0]?.score ?? 0 };
        })
        .filter(({ best }) => best > 0)
        .sort((a, b) => b.best - a.best)
        .map(({ cat }) => cat)
    : baseCats;

  const totalResults = q ? visibleCats.reduce((sum, cat) => sum + cat.items.length, 0) : 0;

  const selectedCategory = active !== 'all' ? CATEGORIES.find(c => c.key === active) : undefined;

  return (
    <div data-fp-page="">
      {/* The homepage frame: dark ground, inset gutters, rounded panels, and (once there are two
          or more of them, i.e. whenever "all" is selected and no search is active) the same
          recede-as-the-next-one-arrives transition the homepage's five bands use. */}
      <SectionPanels />
      {/* Outside <main> deliberately - see this file's own doc comment above. */}
      <FloatingNav />

      <style>{`
        .calc-hero {
          max-width: 900px;
          margin: 0 auto;
          padding: 14px 24px 30px;
          text-align: center;
        }
        .calc-eyebrow {
          display: inline-block;
          font-size: 11px; font-weight: 700; letter-spacing: .11em; text-transform: uppercase;
          color: ${INK3}; margin-bottom: 14px;
        }
        .calc-h1 {
          margin: 0; font-family: ${POPPINS};
          font-size: clamp(32px, 5vw, 52px); font-weight: 700;
          letter-spacing: -.03em; line-height: 1.06; color: ${INK};
        }
        .calc-lead {
          margin: 14px auto 0; max-width: 560px;
          font-size: clamp(14.5px, 1.6vw, 16.5px); line-height: 1.6; color: ${INK2};
        }

        .calc-controls-wrap {
          display: flex; justify-content: center;
          padding: 0 20px 26px;
        }

        /* The exact glass recipe FloatingNav's own pill uses - reused, not approximated, so the
           control bar reads as part of the same floating-chrome family as the nav sitting above
           it on the identical background. */
        .calc-bar {
          pointer-events: auto;
          max-width: 100%;
          display: flex; align-items: center; gap: 2px;
          padding: 5px;
          border-radius: 999px;
          background: rgba(255,255,255,.66);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,.6);
          box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 10px 34px rgba(30,26,18,.12);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .calc-bar::-webkit-scrollbar { display: none; }

        .ptab {
          border: none; cursor: pointer;
          padding: 9px 18px; border-radius: 999px;
          font-family: ${INTER}; font-size: 13px; font-weight: 600;
          white-space: nowrap; flex-shrink: 0;
          background: transparent; color: ${INK2};
          transition: background .18s ease, color .18s ease;
        }
        .ptab:hover { background: rgba(20,20,20,.06); color: ${INK}; }
        .ptab:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 2px; }
        .ptab-on { background: ${GREEN}; color: #0E1A12; font-weight: 700; }
        .ptab-on:hover { background: ${GREEN}; color: #0E1A12; }

        .search-expand {
          display: flex; align-items: center; overflow: hidden; flex-shrink: 0;
          transition: width .3s cubic-bezier(.4,0,.2,1);
          border-radius: 999px;
        }
        .search-expand input::placeholder { color: rgba(20,20,20,.38); }
        .search-btn {
          background: none; border: none; cursor: pointer;
          padding: 8px 10px; display: flex; align-items: center; justify-content: center;
          border-radius: 999px; transition: background .15s ease;
        }
        .search-btn:hover { background: rgba(20,20,20,.06); }
        .search-btn:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 2px; }
        .search-close { background: none; border: none; cursor: pointer; padding: 6px 12px 6px 4px; display: flex; align-items: center; flex-shrink: 0; }
        .search-close:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 2px; }

        .calc-results {
          max-width: 1240px; margin: -8px auto 20px; padding: 0 28px;
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          font-size: 13px; color: ${INK3};
        }
        .calc-results-chip {
          background: ${GREEN_BG}; color: #0E1A12; font-weight: 700;
          padding: 2px 10px; border-radius: 6px; font-size: 12px;
        }
        .calc-clear {
          background: none; border: none; cursor: pointer; color: ${INK3};
          font-size: 12px; font-family: ${INTER}; text-decoration: underline; padding: 0;
        }

        /* ---- search-results view only: the plain grouped grid the whole page used to be ---- */
        .calc-body { max-width: 1240px; margin: 0 auto; padding: 0 28px 60px; }
        .cat-head { display: flex; align-items: center; gap: 9px; margin-bottom: 16px; }
        .cat-bar { display: block; width: 3px; height: 14px; border-radius: 2px; background: ${GREEN}; flex-shrink: 0; }
        .cg { display: grid; grid-template-columns: repeat(auto-fill, minmax(258px, 1fr)); gap: 14px; }
        @media (max-width: 700px) { .cg { grid-template-columns: repeat(2, 1fr); gap: 10px; } }
        @media (max-width: 440px) { .cg { grid-template-columns: 1fr; } }
        .calc-empty { text-align: center; padding: 80px 0; }

        /* ---- the six category panels ---- */
        .calc-cat-section {
          padding: 34px 0 42px;
          overflow: hidden;
        }
        .calc-cat-light {
          background-color: #F4F6F1;
          background-image: url(${CONTINUED_BG_IMAGE});
          background-size: auto ${CONTINUED_BG_UNITS * 164}vh;
          background-position: center top;
          background-repeat: repeat-y;
        }
        .calc-cat-dark { background: ${DARK_GREY}; }
        .calc-cat-head {
          max-width: 1240px; margin: 0 auto 20px; padding: 0 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .calc-cat-bar { display: block; width: 4px; height: 22px; border-radius: 2px; background: ${GREEN}; flex-shrink: 0; }
        .calc-cat-h2 {
          margin: 0; font-family: ${POPPINS};
          font-size: clamp(22px, 2.6vw, 32px); font-weight: 700;
          letter-spacing: -.02em; color: ${INK};
        }
        .calc-cat-dark .calc-cat-h2 { color: #fff; }
        .calc-cat-dark .calc-cat-bar { background: ${PURPLE}; }

        /* ---- "All" mode: the stationary, auto-paginated 3-card group ---- */
        .carousel-outer { width: 100%; position: relative; }
        .carousel-row-wrap { overflow: hidden; width: 100%; }
        .carousel-row {
          display: flex; align-items: stretch; gap: 16px;
          padding: 4px 28px;
          animation: carousel-fade-in .4s cubic-bezier(.2,.8,.28,1);
        }
        @keyframes carousel-fade-in {
          from { opacity: 0; transform: translate3d(10px, 0, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .carousel-item { flex: 1 1 0; min-width: 0; height: 272px; }
        @media (max-width: 900px) {
          .carousel-item { height: 258px; }
        }
        @media (max-width: 540px) {
          .carousel-row { gap: 12px; padding: 4px 18px; overflow-x: auto; }
          .carousel-item { flex: 0 0 78vw; height: 246px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .carousel-row { animation: none; }
        }

        /* ---- arrows, shared by the "All" carousel and the selected-category grid ---- */
        .carousel-controls {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          margin: 18px 28px 0;
        }
        .carousel-arrow {
          width: 38px; height: 38px; border-radius: 999px; padding: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.66);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          backdrop-filter: blur(16px) saturate(150%);
          border: 1px solid rgba(255,255,255,.6);
          box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 6px 16px rgba(30,26,18,.10);
          color: ${INK}; cursor: pointer;
          transition: background .18s ease, color .18s ease, transform .18s ease, box-shadow .18s ease;
        }
        .carousel-arrow:hover { background: ${GREEN}; color: #0E1A12; transform: translateY(-1px); }
        .carousel-arrow:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 2px; }
        .calc-cat-dark .carousel-arrow {
          background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.16);
          color: #fff; box-shadow: none;
        }
        .calc-cat-dark .carousel-arrow:hover { background: ${PURPLE}; color: #fff; }
        @media (prefers-reduced-motion: reduce) {
          .carousel-arrow { transition: none; }
          .carousel-arrow:hover { transform: none; }
        }

        /* ---- individual category selected: every item, 3 per row, no carousel ---- */
        .cat-grid-outer { width: 100%; }
        .cat-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          padding: 4px 28px;
        }
        .cat-grid-item { height: 272px; }
        @media (max-width: 900px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .cat-grid-item { height: 258px; }
        }
        @media (max-width: 540px) {
          .cat-grid { grid-template-columns: 1fr; gap: 12px; padding: 4px 18px; }
          .cat-grid-item { height: 246px; }
        }

        /* ---- the feature-sized card used inside the marquee - same design as .cc, bigger ---- */
        .cc-lg {
          padding: 22px 24px 22px 26px;
          border-radius: 20px;
        }
        .cc-lg .cc-cat { font-size: 10.5px; }
        .cc-lg .cc-title { font-size: 18px; margin-top: 9px; }
        .cc-lg .cc-desc {
          font-size: 13.5px; margin-top: 8px;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .cc-lg .cc-visual { height: 34px; margin-top: 14px; transform: scale(1.25); transform-origin: left bottom; }
        .cc-lg .cc-cta { font-size: 14px; margin-top: 14px; padding-top: 12px; }
        .cc-lg .cc-strip { top: 22px; bottom: 22px; width: 4px; }

        /* Silver glassmorphism, same recipe as the grid card below - a translucent, cool-neutral
           surface with a soft diagonal reflection layered over the shared photo background, not a
           flat white or grey rectangle. */
        .cc {
          position: relative;
          overflow: hidden;
          display: flex; flex-direction: column;
          height: 100%; box-sizing: border-box;
          background:
            linear-gradient(122deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 66%, rgba(255,255,255,.22) 100%),
            linear-gradient(158deg, rgba(234,238,242,.72) 0%, rgba(212,218,225,.56) 52%, rgba(195,202,211,.48) 100%);
          -webkit-backdrop-filter: blur(22px) saturate(130%);
          backdrop-filter: blur(22px) saturate(130%);
          border: 1px solid rgba(255,255,255,.62);
          border-radius: 18px;
          padding: 16px 19px 18px 21px;
          box-shadow:
            0 1px 0 rgba(255,255,255,.9) inset,
            0 -1px 0 rgba(150,159,171,.32) inset,
            0 3px 8px rgba(28,32,38,.07),
            0 14px 28px rgba(28,32,38,.10);
          transition: transform .22s cubic-bezier(.2,.8,.28,1), box-shadow .22s ease, border-color .22s ease, background .22s ease;
          text-decoration: none;
        }
        .cc:hover, .cc:focus-visible {
          transform: translateY(-4px);
          background:
            linear-gradient(122deg, rgba(255,255,255,.64) 0%, rgba(255,255,255,0) 36%, rgba(255,255,255,0) 64%, rgba(255,255,255,.28) 100%),
            linear-gradient(158deg, rgba(242,245,247,.80) 0%, rgba(222,228,234,.64) 52%, rgba(206,213,221,.56) 100%);
          box-shadow:
            0 1px 0 rgba(255,255,255,1) inset,
            0 -1px 0 rgba(150,159,171,.4) inset,
            0 4px 10px rgba(28,32,38,.09),
            0 24px 44px rgba(28,32,38,.17);
          border-color: rgba(255,255,255,.9);
        }
        .cc:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 2px; }

        .cc-strip {
          position: absolute; left: 0; top: 18px; bottom: 18px; width: 3px;
          border-radius: 0 3px 3px 0;
          transition: opacity .22s ease, box-shadow .22s ease;
        }
        .cc-green .cc-strip { background: ${GREEN}; opacity: .28; }
        .cc-purple .cc-strip { background: ${PURPLE}; opacity: .28; }
        .cc-green:hover .cc-strip, .cc-green:focus-visible .cc-strip {
          opacity: 1; box-shadow: 0 0 16px 1px rgba(117,251,144,.55);
        }
        .cc-purple:hover .cc-strip, .cc-purple:focus-visible .cc-strip {
          opacity: 1; box-shadow: 0 0 16px 1px rgba(158,121,255,.55);
        }

        .cc-top { position: relative; display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
        .cc-cat {
          font-size: 9.5px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase;
          color: ${INK3};
        }
        .cc-title { position: relative; font-size: 14px; font-weight: 700; color: ${INK}; margin: 7px 0 0; line-height: 1.32; }
        .cc-desc { position: relative; font-size: 12.5px; color: ${INK3}; margin: 6px 0 0; line-height: 1.55; flex: 1; }
        .cc-new {
          font-size: 9.5px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
          color: #fff; background: ${PURPLE}; padding: 2px 7px; border-radius: 999px;
          flex-shrink: 0; margin-top: 1px;
        }
        .cc-visual {
          position: relative; height: 26px; margin-top: 10px;
          display: flex; align-items: flex-end;
          opacity: .8;
          transition: opacity .22s ease, transform .22s cubic-bezier(.2,.8,.28,1), filter .22s ease;
        }
        .cc:hover .cc-visual, .cc:focus-visible .cc-visual { opacity: 1; }
        .cc-green:hover .cc-visual, .cc-green:focus-visible .cc-visual {
          filter: drop-shadow(0 0 6px rgba(117,251,144,.55));
        }
        .cc-purple:hover .cc-visual, .cc-purple:focus-visible .cc-visual {
          filter: drop-shadow(0 0 6px rgba(158,121,255,.55));
        }
        .cc-cta {
          position: relative; margin-top: 10px; padding-top: 10px;
          border-top: 1px solid rgba(20,20,20,.07);
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12.5px; font-weight: 700;
          transition: text-shadow .22s ease;
        }
        .cc-green .cc-cta { color: ${GREEN_TEXT}; }
        .cc-purple .cc-cta { color: ${PURPLE_TEXT}; }
        .cc-green:hover .cc-cta, .cc-green:focus-visible .cc-cta {
          text-shadow: 0 0 12px rgba(117,251,144,.5);
        }
        .cc-purple:hover .cc-cta, .cc-purple:focus-visible .cc-cta {
          text-shadow: 0 0 12px rgba(158,121,255,.5);
        }
        .cc-cta svg { transition: transform .22s cubic-bezier(.2,.8,.28,1); }
        .cc:hover .cc-cta svg, .cc:focus-visible .cc-cta svg { transform: translateX(3px); }

        @media (prefers-reduced-motion: reduce) {
          .cc, .cc-strip, .cc-visual, .cc-cta, .cc-cta svg, .ptab, .search-btn { transition: none; }
          .cc:hover, .cc:focus-visible { transform: none; }
        }
      `}</style>

      {(() => {
        const heroAndControls = (
          <>
            <div className="calc-hero">
              <span className="calc-eyebrow">{total} free calculators</span>
              <h1 className="calc-h1">Calculators</h1>
              <p className="calc-lead">
                Find the right financial calculator for loans, tax, investing, and retirement.
                Search by name or browse by category below.
              </p>
            </div>

            <div className="calc-controls-wrap">
              <div className="calc-bar" role="group" aria-label="Search and filter calculators">
                {(['all', ...CATEGORIES.map(c => c.key)] as Tab[]).map(key => {
                  const on = active === key && !q;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`ptab ${on ? 'ptab-on' : ''}`}
                      aria-pressed={on}
                      onClick={() => { setActive(key); setSearchQuery(''); setSearchOpen(false); }}
                      style={{ display: searchOpen ? 'none' : undefined }}
                    >
                      {TAB_LABELS[key] || key}
                    </button>
                  );
                })}

                <div className="search-expand" style={{
                  width: searchOpen ? 280 : 38,
                  background: searchOpen ? 'rgba(20,20,20,.05)' : 'transparent',
                }}>
                  {searchOpen ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK3}
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        style={{ marginLeft: 14, flexShrink: 0 }} aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setActive('all'); }}
                        onKeyDown={e => { if (e.key === 'Escape') { setSearchQuery(''); setSearchOpen(false); } }}
                        placeholder="Search calculators..."
                        aria-label="Search calculators"
                        style={{
                          flex: 1, background: 'transparent', border: 'none', outline: 'none',
                          color: INK, fontSize: 13, fontWeight: 500, fontFamily: INTER,
                          padding: '9px 8px 9px 10px', minWidth: 0,
                        }}
                      />
                      <button
                        className="search-close"
                        onClick={() => { setSearchQuery(''); setSearchOpen(false); }}
                        aria-label="Close search"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK3}
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <button
                      className="search-btn"
                      onClick={() => setSearchOpen(true)}
                      aria-label="Search calculators"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK2}
                        strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {q && (
              <div className="calc-results">
                <span>{totalResults} calculator{totalResults !== 1 ? 's' : ''} found for</span>
                <span className="calc-results-chip">&ldquo;{searchQuery}&rdquo;</span>
                <button className="calc-clear" onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
                  Clear
                </button>
              </div>
            )}
          </>
        );

        /* All three modes render the first panel as the same CategorySection with the same key
           ("first"), so React keeps it - and the search input inside heroAndControls - mounted
           when the page switches between browsing and searching. A different element or key here
           would remount the input and drop keystrokes and focus. */

        /* ---- mode 1: a search is active - plain grouped grid of matches, no marquee ---- */
        if (q) {
          return (
            <main>
              <CategorySection
                key="first"
                cat={CATEGORIES[0]}
                sectionNumber={1}
                today={today}
                leading={heroAndControls}
                variant="grid"
              >
                <div className="calc-body">
                  {visibleCats.length === 0 ? (
                    <div className="calc-empty">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,20,.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }} aria-hidden="true">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <p style={{ fontSize: 15, color: INK2, margin: '0 0 6px', fontWeight: 600 }}>No calculators found</p>
                      <p style={{ fontSize: 13, color: INK3, margin: 0 }}>Try a different search term</p>
                    </div>
                  ) : (
                    visibleCats.map((cat, catIdx) => (
                      <section key={cat.key} id={cat.key} style={{ marginBottom: catIdx < visibleCats.length - 1 ? 44 : 0 }}>
                        <div className="cat-head">
                          <span className="cat-bar" />
                          <h2 style={{ fontSize: 11, fontWeight: 700, color: INK3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0, fontFamily: INTER }}>
                            {cat.label}
                          </h2>
                        </div>
                        <div className="cg">
                          {cat.items.map((item, i) => (
                            <CalculatorCard
                              key={item.slug}
                              slug={item.slug}
                              title={item.title}
                              desc={item.desc}
                              categoryKey={cat.key}
                              categoryLabel={cat.label}
                              index={i}
                              isNew={item.addedDate === today}
                            />
                          ))}
                        </div>
                      </section>
                    ))
                  )}
                </div>
              </CategorySection>
            </main>
          );
        }

        /* ---- mode 2: one category selected - every calculator in that category, 3 per row ---- */
        if (selectedCategory) {
          const catIdx = CATEGORIES.findIndex(c => c.key === selectedCategory.key);
          const prevCat = CATEGORIES[(catIdx - 1 + CATEGORIES.length) % CATEGORIES.length];
          const nextCat = CATEGORIES[(catIdx + 1) % CATEGORIES.length];
          return (
            <main>
              <CategorySection
                key="first"
                cat={selectedCategory}
                sectionNumber={1}
                today={today}
                leading={heroAndControls}
                variant="grid"
                onPrevCategory={() => setActive(prevCat.key)}
                onNextCategory={() => setActive(nextCat.key)}
              />
            </main>
          );
        }

        /* ---- mode 3: "All" - all six category panels, each its own 3-card auto-carousel ---- */
        return (
          <main>
            {CATEGORIES.map((cat, i) => (
              <CategorySection
                key={i === 0 ? 'first' : cat.key}
                cat={cat}
                sectionNumber={i + 1}
                today={today}
                leading={i === 0 ? heroAndControls : undefined}
                variant="carousel"
              />
            ))}
          </main>
        );
      })()}

      <Footer minimal />
    </div>
  );
}

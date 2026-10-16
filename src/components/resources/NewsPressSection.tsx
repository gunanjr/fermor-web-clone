'use client';

/**
 * Section 2 of /blogs: Category 2, "Markets & Current Affairs" -- the black band.
 *
 * Previously this rendered two placeholder sub-sections ("Fermor in the news" and "Case
 * Studies") with generic, non-real Fermor-press content. Both are gone: this is now one
 * section showing the 8 real, migrated articles that are genuinely time-sensitive news
 * (stock market moves, an IPO filing, a World Cup final, a GDP ranking, an RBI rule change)
 * rather than an evergreen how-to guide. The visual system is unchanged from what shipped on
 * /resources: Section 1's card on the dark band, same proportions, same 20px radius, same 1px
 * hairline border, same padding, same three-part vertical rhythm (label block, centred serif
 * headline, footer meta) and the same 3-up grid. The one accent is still #75FB90.
 *
 * Only 6 cards show initially ("See more" reveals the rest, in place - see INITIAL_COUNT and
 * the `expanded` state below). This is a client component now (it wasn't before) purely
 * because that toggle needs to live somewhere; nothing about the markup or styling below is
 * new for that reason.
 */

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_2_CARDS, CATEGORY_2_NAME, type BlogCategoryCard } from "../../../app/blogs/blogCategories";
import { preserveScroll } from "../../../app/blogs/preserveScroll";

const INITIAL_COUNT = 6;

function Card({ item, revealing }: { item: BlogCategoryCard; revealing?: boolean }) {
  return (
    <Link href={item.href} className={`fs2-card${revealing ? " fs2-card-revealing" : ""}`}>
      <div>
        <span className="fs2-card-type">{item.kind}</span>
      </div>

      <div className="fs2-card-content">
        <h3>{item.title}</h3>
      </div>

      <time>{item.date}</time>

      <span className="fs2-card-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function NewsPressSection() {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? CATEGORY_2_CARDS : CATEGORY_2_CARDS.slice(0, INITIAL_COUNT);
  const revealedCount = displayed.length - Math.min(INITIAL_COUNT, CATEGORY_2_CARDS.length);

  return (
    <div className="fs2-root">
      <style>{`
        .fs2-root {
          padding: 96px 24px 104px;
          word-spacing: 0.035em;
          color: #F2F3F4;
          font-family: var(--font-inter), Inter, sans-serif;
        }
        .fs2-inner { max-width: 1500px; margin: 0 auto; }
        .fs2-block + .fs2-block { margin-top: 104px; }
        .fs2-heading { text-align: center; }
        .fs2-eyebrow {
          margin: 0 0 14px;
          color: #F7F9F8;
          font-size: 12px;
          font-weight: 750;
          letter-spacing: .02em;
        }
        .fs2-heading h2 {
          margin: 0;
          max-width: 760px;
          margin-inline: auto;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(31px, 3.1vw, 48px);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -0.055em;
          color: #F7F9F8;
        }
        .fs2-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin: 66px auto 0;
          /* See ResourcesPageClient.tsx's .resource-grid comment: without this, the browser's
             scroll-anchoring heuristic can "correct" the scroll position when See more grows
             this grid, producing exactly the jump the interaction must not have. */
          overflow-anchor: none;
        }
        .fs2-grid.is-two { max-width: 1000px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .fs2-card {
          position: relative;
          display: flex;
          min-height: 450px;
          flex-direction: column;
          padding: 35px 38px 30px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.10);
          border-radius: 20px;
          background: rgba(255,255,255,.035);
          color: #F2F3F4;
          text-decoration: none;
          transition: transform 240ms ease, border-color 240ms ease, background 240ms ease, box-shadow 240ms ease;
        }
        .fs2-card:hover {
          transform: translateY(-3px);
          border-color: rgba(117,251,144,.45);
          background: rgba(255,255,255,.055);
          box-shadow: 0 16px 34px rgba(0,0,0,.35);
        }
        .fs2-card-type { color: #F7F9F8; font-size: 12px; font-weight: 750; }
        .fs2-card-source {
          display: block;
          margin-top: 6px;
          color: rgba(255,255,255,.45);
          font-size: 10px;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: .04em;
        }
        .fs2-card-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 10px;
          text-align: center;
        }
        .fs2-card h3 {
          max-width: 410px;
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 2.25vw, 40px);
          font-weight: 400;
          line-height: 1.02;
          letter-spacing: -0.055em;
          color: #F7F9F8;
        }
        .fs2-card time { color: rgba(255,255,255,.45); font-size: 12px; }
        .fs2-card-arrow {
          position: absolute;
          right: 24px;
          bottom: 23px;
          display: inline-flex;
          width: 30px;
          height: 30px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.16);
          color: rgba(255,255,255,.6);
          transition: color 240ms ease, border-color 240ms ease, transform 240ms ease;
        }
        .fs2-card:hover .fs2-card-arrow {
          color: #75FB90;
          border-color: rgba(117,251,144,.5);
          transform: translateX(2px);
        }
        @keyframes fs2-card-reveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        .fs2-card-revealing {
          animation: fs2-card-reveal 0.5s cubic-bezier(0.2, 0.8, 0.28, 1) both;
        }
        .fs2-more { margin-top: 44px; text-align: center; }
        .fs2-more button {
          appearance: none;
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          padding: 0 20px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.18);
          background: transparent;
          color: rgba(255,255,255,.85);
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
        }
        .fs2-more button:hover {
          border-color: rgba(117,251,144,.5);
          color: #75FB90;
          background: rgba(117,251,144,.08);
        }
        @media (max-width: 1080px) {
          .fs2-grid, .fs2-grid.is-two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
          .fs2-root { padding: 64px 18px 72px; }
          .fs2-block + .fs2-block { margin-top: 68px; }
          .fs2-grid, .fs2-grid.is-two { grid-template-columns: 1fr; margin-top: 40px; }
          .fs2-card { min-height: 340px; padding: 26px 24px 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fs2-card, .fs2-card-arrow, .fs2-more button { transition: none; }
          .fs2-card-revealing { animation: none; }
        }
      `}</style>

      <div className="fs2-inner">
        <section className="fs2-block">
          <div className="fs2-heading">
            <p className="fs2-eyebrow">{CATEGORY_2_NAME}</p>
            <h2>What moved the markets, and what it means for you</h2>
          </div>
          <div className="fs2-grid">
            {displayed.map((item, index) => (
              <Card key={item.slug} item={item} revealing={index >= displayed.length - revealedCount} />
            ))}
          </div>
          {CATEGORY_2_CARDS.length > INITIAL_COUNT && (
            <div className="fs2-more">
              <button type="button" onClick={() => preserveScroll(() => setExpanded((v) => !v))}>
                {expanded ? "See less" : "See more"}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

'use client';

/**
 * Section 3 of /blogs: Category 3, "Government & Utility Services" -- the white band.
 *
 * Previously this rendered two placeholder sub-sections ("Webinars" and "E-books") with
 * generic, non-real Fermor content. Both are gone: this is now one section showing the 12
 * real, migrated articles about dealing with a government or utility portal end to end (EPFO,
 * GST, gas-connection booking, ration card, voter ID, state pension schemes). The visual
 * system is unchanged from what shipped on /resources: Section 1's card on white, the same
 * 450px card with a 20px radius and a #dce5e1 hairline, the same padding and the same label /
 * centred serif headline / footer-meta rhythm, in the same 3-up grid. The lime accent is
 * #75FB90; the eyebrow and card-type label stay on the same muted ink the Section 1 cards use
 * (--resources-muted), since that accent is barely legible on white.
 *
 * Only 6 cards show initially ("See more" reveals the remaining 6, in place - see
 * INITIAL_COUNT and the `expanded` state below). This is a client component now (it wasn't
 * before) purely because that toggle needs to live somewhere; nothing about the markup or
 * styling below is new for that reason.
 */

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORY_3_CARDS, CATEGORY_3_NAME, type BlogCategoryCard } from '../../../app/blogs/blogCategories';
import { preserveScroll } from '../../../app/blogs/preserveScroll';

const INITIAL_COUNT = 6;

function Card({ item, revealing }: { item: BlogCategoryCard; revealing?: boolean }) {
  return (
    <Link href={item.href} className={`fs3-card${revealing ? " fs3-card-revealing" : ""}`}>
      <div>
        <span className="fs3-card-type">{item.kind}</span>
      </div>
      <div className="fs3-card-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <time>{item.date}</time>
      <span className="fs3-card-arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export default function WebinarsReportsSection() {
  const [expanded, setExpanded] = useState(false);
  const displayed = expanded ? CATEGORY_3_CARDS : CATEGORY_3_CARDS.slice(0, INITIAL_COUNT);
  const revealedCount = displayed.length - Math.min(INITIAL_COUNT, CATEGORY_3_CARDS.length);

  return (
    <div className="fs3-root">
      <style>{`
        .fs3-root {
          padding: 96px 24px 104px;
          word-spacing: 0.035em;
          color: #0a0b0a;
          font-family: var(--font-inter), Inter, sans-serif;
        }
        .fs3-inner { max-width: 1500px; margin: 0 auto; }
        .fs3-block + .fs3-block { margin-top: 104px; }
        .fs3-heading { text-align: center; }
        .fs3-eyebrow {
          margin: 0 0 14px;
          color: #27413a;
          font-size: 12px;
          font-weight: 750;
          letter-spacing: .02em;
        }
        .fs3-heading h2 {
          margin: 0 auto;
          max-width: 760px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(31px, 3.1vw, 48px);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -0.055em;
        }
        .fs3-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin: 66px auto 0;
          /* See ResourcesPageClient.tsx's .resource-grid comment: without this, the browser's
             scroll-anchoring heuristic can "correct" the scroll position when See more grows
             this grid, producing exactly the jump the interaction must not have. */
          overflow-anchor: none;
        }
        .fs3-card {
          position: relative;
          display: flex;
          min-height: 450px;
          flex-direction: column;
          padding: 35px 38px 30px;
          overflow: hidden;
          border: 1px solid #dce5e1;
          border-radius: 20px;
          background: #f7f9f8;
          color: #0a0b0a;
          text-decoration: none;
          transition: transform 240ms ease, border-color 240ms ease, box-shadow 240ms ease;
        }
        .fs3-card:hover {
          transform: translateY(-3px);
          border-color: #c3d3cd;
          box-shadow: 0 16px 34px rgba(22, 55, 45, 0.07);
        }
        .fs3-card-type { color: #27413a; font-size: 12px; font-weight: 750; }
        .fs3-card-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 10px;
          text-align: center;
        }
        .fs3-card h3 {
          max-width: 410px;
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(26px, 2vw, 36px);
          font-weight: 400;
          line-height: 1.04;
          letter-spacing: -0.055em;
        }
        .fs3-card p {
          max-width: 380px;
          margin: 20px 0 0;
          color: #3d504a;
          font-size: 14px;
          line-height: 1.5;
        }
        .fs3-card time { color: #5d6c66; font-size: 12px; }
        .fs3-card-arrow {
          position: absolute;
          right: 24px;
          bottom: 23px;
          display: inline-flex;
          width: 30px;
          height: 30px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid #dce5e1;
          color: #63716c;
          transition: color 240ms ease, border-color 240ms ease, transform 240ms ease;
        }
        .fs3-card:hover .fs3-card-arrow {
          color: #0a0b0a;
          border-color: #c3d3cd;
          transform: translateX(2px);
        }
        @keyframes fs3-card-reveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
        .fs3-card-revealing {
          animation: fs3-card-reveal 0.5s cubic-bezier(0.2, 0.8, 0.28, 1) both;
        }
        .fs3-more { margin-top: 44px; text-align: center; }
        .fs3-more button {
          appearance: none;
          display: inline-flex;
          align-items: center;
          min-height: 42px;
          padding: 0 20px;
          border-radius: 999px;
          border: 1px solid #dce5e1;
          background: #ffffff;
          color: #0a0b0a;
          font-family: inherit;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 200ms ease, background 200ms ease;
        }
        .fs3-more button:hover { border-color: #c3d3cd; background: #f2f6f4; }
        @media (max-width: 1080px) {
          .fs3-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
          .fs3-root { padding: 64px 18px 72px; }
          .fs3-block + .fs3-block { margin-top: 68px; }
          .fs3-grid { grid-template-columns: 1fr; margin-top: 40px; }
          .fs3-card { min-height: 340px; padding: 26px 24px 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fs3-card, .fs3-card-arrow, .fs3-more button { transition: none; }
          .fs3-card-revealing { animation: none; }
        }
      `}</style>

      <div className="fs3-inner">
        <section className="fs3-block">
          <div className="fs3-heading">
            <p className="fs3-eyebrow">{CATEGORY_3_NAME}</p>
            <h2>Government and utility services, explained end to end</h2>
          </div>
          <div className="fs3-grid">
            {displayed.map((item, index) => (
              <Card key={item.slug} item={item} revealing={index >= displayed.length - revealedCount} />
            ))}
          </div>
          {CATEGORY_3_CARDS.length > INITIAL_COUNT && (
            <div className="fs3-more">
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

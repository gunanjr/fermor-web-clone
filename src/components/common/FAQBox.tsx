/**
 * FAQBox: the one FAQ presentation for every individual page (articles, calculators, mutual funds).
 *
 * The visual design is the boxed accordion the article pages have always used (FaqAccordion in
 * app/blogs/<slug>/page.tsx): one white box with a hairline border and 10px radius, rows divided by
 * hairlines, a 14.5px semibold question with a chevron that turns when the row opens, and a 14.5px
 * neutral-grey answer. Those values are copied from the article, which stays the reference: change
 * them here only together with the articles.
 *
 * It is a server-renderable component built on native <details>, so every answer is in the HTML
 * whether or not the row is open (no hydration cost, keyboard and screen-reader behaviour come from
 * the browser). It renders presentation only: the FAQPage JSON-LD stays with each page, built from
 * the same items, so this component never emits structured data and cannot duplicate it.
 */

import type { ReactNode } from 'react';

export type FAQItem = { q: string; a: ReactNode };

const INTER = 'var(--font-inter), Inter, sans-serif';
const BORDER = '#E5E5E5';
const INK = '#111111';
const BODY = '#555555';
const MUTED = '#888888';

const CSS = `
  .fqbox details summary { list-style: none; }
  .fqbox details summary::-webkit-details-marker { display: none; }
  .fqbox details summary::marker { display: none; content: ''; }
  .fqbox .fqbox-chevron { transition: transform 0.2s ease; }
  .fqbox details[open] .fqbox-chevron { transform: rotate(180deg); }
  .fqbox details[open] summary { color: #101214; }
  .fqbox summary:focus-visible { outline: 2px solid #1F7A58; outline-offset: -2px; }
  @media (prefers-reduced-motion: reduce) { .fqbox .fqbox-chevron { transition: none; } }
`;

export function FAQBox({ items, marginTop = 20 }: { items: readonly FAQItem[]; marginTop?: number }) {
  return (
    <div className="fqbox" style={{ marginTop, border: `1px solid ${BORDER}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <style>{CSS}</style>
      {items.map((item, i) => (
        <details key={`${i}-${item.q}`} style={{ borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
          <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: INK, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none', lineHeight: 1.4 }}>
            <span style={{ paddingRight: 12 }}>{item.q}</span>
            <svg className="fqbox-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <div style={{ padding: '0 18px 16px', background: '#fff', fontSize: 14.5, color: BODY, lineHeight: 1.75, fontFamily: INTER }}>
            {typeof item.a === 'string' ? <p style={{ margin: 0 }}>{item.a}</p> : item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

export default FAQBox;

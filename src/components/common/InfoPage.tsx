/**
 * InfoPage: the shell for About, Contact, Privacy Policy and Terms of Use.
 *
 * These four pages used to carry their own dark hero, white cards on a green-tinted ground, SubNav
 * and the dark Footer. They now sit on the same design as the individual calculator and article
 * pages: PageNav on top, a breadcrumb strip, a plain white header with an eyebrow, H1 and lead, a
 * readable single column, and SiteFooter. Colours come from PAGE_THEME; nothing here is a filled
 * dark surface, and the only coloured text is the green-ink link hover.
 *
 * It is a server component. PageNav and SiteFooter are client components imported as usual, so
 * the page itself keeps its static metadata and renders no client JavaScript of its own.
 *
 * Legal wording is passed in as `sections` and rendered verbatim: this shell only decides how it
 * looks (line length, spacing, an "On this page" index for long documents), never what it says.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { PageNav } from './PageNav';
import { SiteFooter } from './SiteFooter';
import { DISCOVERY_COLUMNS } from './footerLinks';
import { PAGE_THEME } from '../../theme/pageTheme';

const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';
const T = PAGE_THEME;

export type InfoSection = { id: string; title: string; body: ReactNode };

const CSS = `
  .ip { background: #fff; color: ${T.ink}; font-family: ${INTER}; }
  .ip *, .ip *::before, .ip *::after { box-sizing: border-box; }
  .ip a:focus-visible, .ip summary:focus-visible { outline: 2px solid ${T.focus}; outline-offset: 2px; border-radius: 4px; }
  .ip-wrap { max-width: 1160px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
  .ip-crumbs { background: ${T.surfaceSoft}; border-bottom: 1px solid ${T.border}; }
  .ip-crumbs ol { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; list-style: none; margin: 0; padding: 10px 0; font-size: 12.5px; color: ${T.ink3}; }
  .ip-crumbs a { color: ${T.ink3}; text-decoration: none; }
  .ip-crumbs a:hover { color: ${T.ink}; text-decoration: underline; }
  .ip-head { border-bottom: 1px solid ${T.border}; }
  .ip-head .ip-wrap { padding-top: 40px; padding-bottom: 32px; }
  .ip-eyebrow { margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: ${T.ink3}; }
  .ip-h1 { margin: 0 0 14px; font-family: ${POPPINS}; font-size: clamp(26px, 3.6vw, 38px); font-weight: 700; line-height: 1.2; letter-spacing: -.02em; color: ${T.ink}; max-width: 820px; }
  .ip-lead { margin: 0; max-width: 680px; font-size: 16.5px; line-height: 1.7; color: ${T.ink2}; }
  .ip-meta { margin: 16px 0 0; font-size: 13px; color: ${T.ink3}; }
  .ip-body { padding-top: 36px; padding-bottom: 80px; display: grid; gap: 56px; grid-template-columns: minmax(0, 1fr); }
  .ip-body.ip-has-toc { grid-template-columns: minmax(0, 1fr) 260px; align-items: start; }
  .ip-main { min-width: 0; max-width: 740px; }
  .ip-section { padding: 28px 0; border-top: 1px solid ${T.border}; scroll-margin-top: 96px; }
  .ip-section:first-child { border-top: 0; padding-top: 0; }
  .ip-h2 { margin: 0 0 12px; font-family: ${POPPINS}; font-size: 20px; font-weight: 700; line-height: 1.3; letter-spacing: -.01em; color: ${T.ink}; }
  .ip-prose p { margin: 0 0 12px; font-size: 15.5px; line-height: 1.8; color: ${T.ink2}; }
  .ip-prose p:last-child { margin-bottom: 0; }
  .ip-prose strong { color: ${T.ink}; font-weight: 700; }
  .ip-prose a { color: ${T.ink}; text-decoration: underline; text-decoration-color: #B9BEC3; text-underline-offset: 3px; overflow-wrap: anywhere; }
  .ip-prose a:hover { color: ${T.greenText}; text-decoration-color: ${T.greenText}; }
  .ip-list { list-style: none; margin: 0 0 12px; padding: 0; display: grid; gap: 10px; }
  .ip-list li { position: relative; padding-left: 20px; font-size: 15.5px; line-height: 1.7; color: ${T.ink2}; }
  .ip-list li::before { content: ''; position: absolute; left: 4px; top: .72em; width: 5px; height: 5px; border-radius: 50%; background: ${T.ink3}; }
  .ip-note { margin: 4px 0 12px; padding: 14px 18px; border: 1px solid ${T.border}; border-left: 3px solid ${T.ink}; background: ${T.surfaceSoft}; border-radius: 8px; }
  .ip-note p { color: ${T.ink}; }
  .ip-btn { display: inline-flex; align-items: center; max-width: 100%; min-height: 44px; padding: 11px 20px; border-radius: 10px; border: 1px solid ${T.border}; background: ${T.surfaceAlt}; color: ${T.ink}; font-size: 15px; font-weight: 600; text-decoration: none; overflow-wrap: anywhere; transition: background .15s ease, border-color .15s ease; }
  .ip-btn:hover { background: #E9ECEE; border-color: #CDD2D6; }
  .ip-btn:active { background: #E0E3E6; }
  .ip-panel { padding: 20px 22px; border: 1px solid ${T.border}; background: ${T.surfaceAlt}; border-radius: 12px; }
  .ip-panel p { margin: 0 0 14px; font-size: 15px; line-height: 1.7; color: ${T.ink2}; }
  .ip-links { list-style: none; margin: 0; padding: 0; border: 1px solid ${T.border}; border-radius: 12px; overflow: hidden; }
  .ip-links li + li { border-top: 1px solid ${T.border}; }
  .ip-links a { display: block; padding: 14px 18px; text-decoration: none; color: ${T.ink}; font-size: 15px; font-weight: 600; background: #fff; }
  .ip-links a span { display: block; margin-top: 2px; font-size: 13.5px; font-weight: 400; color: ${T.ink2}; }
  .ip-links a:hover { background: ${T.surfaceSoft}; }
  .ip-toc { position: sticky; top: 96px; border: 1px solid ${T.border}; border-radius: 12px; overflow: hidden; background: #fff; }
  .ip-toc-h { margin: 0; padding: 10px 16px; background: ${T.surfaceSoft}; border-bottom: 1px solid ${T.border}; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: ${T.ink3}; }
  .ip-toc ol { list-style: none; margin: 0; padding: 8px; display: grid; gap: 2px; }
  .ip-toc a { display: flex; gap: 10px; padding: 7px 10px; border-radius: 6px; font-size: 13.5px; line-height: 1.4; color: ${T.ink2}; text-decoration: none; }
  .ip-toc a:hover { background: ${T.surfaceAlt}; color: ${T.ink}; }
  .ip-toc a span { color: ${T.ink3}; font-weight: 600; flex-shrink: 0; }
  @media (max-width: 959px) {
    .ip-body.ip-has-toc { grid-template-columns: minmax(0, 1fr); gap: 28px; }
    .ip-aside { order: -1; }
    .ip-toc { position: static; }
    .ip-main { max-width: none; }
  }
  @media (max-width: 599px) {
    .ip-wrap { padding-left: 16px; padding-right: 16px; }
    .ip-head .ip-wrap { padding-top: 28px; padding-bottom: 24px; }
    .ip-body { padding-top: 24px; padding-bottom: 56px; }
    .ip-lead { font-size: 15.5px; }
    .ip-btn { width: 100%; justify-content: center; }
  }
  @media (prefers-reduced-motion: reduce) { .ip-btn { transition: none; } }
`;

export function InfoPage({
  path, crumb, eyebrow, title, lead, meta, sections, showIndex = false,
}: {
  path: string;
  crumb: string;
  eyebrow: string;
  title: string;
  lead: ReactNode;
  meta?: string;
  sections: InfoSection[];
  showIndex?: boolean;
}) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: crumb, item: `https://fermor.in${path}` },
    ],
  };
  return (
    <div className="ip">
      <style>{CSS}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageNav />

      <div className="ip-crumbs">
        <div className="ip-wrap">
          <nav aria-label="Breadcrumb">
            <ol>
              <li><Link href="/" target="_blank" rel="noopener noreferrer">Home</Link></li>
              <li aria-hidden="true" style={{ color: T.border }}>›</li>
              <li aria-current="page" style={{ color: T.ink2, fontWeight: 500 }}>{crumb}</li>
            </ol>
          </nav>
        </div>
      </div>

      <header className="ip-head">
        <div className="ip-wrap">
          <p className="ip-eyebrow">{eyebrow}</p>
          <h1 className="ip-h1">{title}</h1>
          <p className="ip-lead">{lead}</p>
          {meta && <p className="ip-meta">{meta}</p>}
        </div>
      </header>

      <div className={`ip-wrap ip-body${showIndex ? ' ip-has-toc' : ''}`}>
        <main className="ip-main">
          {sections.map(s => (
            <section key={s.id} id={s.id} className="ip-section" aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`} className="ip-h2">{s.title}</h2>
              <div className="ip-prose">{s.body}</div>
            </section>
          ))}
        </main>
        {showIndex && (
          <aside className="ip-aside" aria-label="On this page">
            <nav className="ip-toc" aria-label="On this page">
              <p className="ip-toc-h">On this page</p>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}><a href={`#${s.id}`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</a></li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

'use client';

/**
 * SiteFooter: the light, Groww-inspired footer for individual calculator, blog, mutual fund, tax
 * and GDP pages. The homepage, /blogs and /calculators keep the dark `Footer` in
 * app/_home/Footer.tsx; nothing here changes what that component renders.
 *
 * Layout follows the reference footer (brand and contact on the left, grouped link columns on the
 * right, a tabbed link section under a hairline, then a muted legal row). Content does not: the
 * link columns are whatever the page family passes in (src/components/common/footerLinks.ts), the
 * tab data comes from the site's own inventories (footerTabs.ts), and the brand block shows only
 * contact details Fermor actually has (no address, no app-store badge: neither exists yet). Every
 * page gets the shared Mutual Funds / Explore / Company categories on top of its own columns
 * (withSharedColumns), the brand line comes from FOOTER_DESCRIPTION and the social icons from
 * SOCIAL_LINKS, so each is changed in one place.
 *
 * Responsiveness: the grid collapses with CSS media queries, so the server and first client render
 * match. The only thing held in state is the mobile accordion, switched on after mount, so the
 * server HTML is the fully expanded list.
 *
 * The brand block carries only the logo, description, copyright and social icons. Contact Us sits
 * in the Company column and Sitemap is the last item of the Explore column (both come from
 * footerLinks.ts), so neither is repeated on the left.
 */

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DISCOVERY_COLUMNS, FOOTER_DESCRIPTION, FOOTER_LEGAL, withSharedColumns, type FooterColumn } from './footerLinks';
import { SOCIAL_LINKS } from './socialLinks';
import { PAGE_THEME } from '../../theme/pageTheme';
import { FOOTER_TABS } from './footerTabs';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const INK = PAGE_THEME.ink;
const LINK = '#3F4448';
const MUTED = '#5B6065';
const RULE = '#DADDE0';
const GROUND = '#F0F1F2';
const GREEN_INK = PAGE_THEME.focus;
const MINT = PAGE_THEME.markGreen; // #75FB90, the homepage logo mint: hover colour and underline for every footer link
const INTER = 'var(--font-inter), Inter, sans-serif';

const isPlainAnchor = (href: string) => /^https?:/.test(href) || href.endsWith('.xml');

/** Real pages go through next/link; an XML endpoint or another domain gets a plain anchor so it is
    never prefetched or client-routed. Every footer link opens in a new tab. */
function FLink({ href, className = 'sf-link', children }: { href: string; className?: string; children: React.ReactNode }) {
  if (isPlainAnchor(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }
  return <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</Link>;
}

/** Longest list that stays in one column before it flows into a second one, as in the reference
    footer's three-wide Products group. */
const MAX_ROWS = 10;

function LinkColumn({ col, mobile, open, onToggle }: { col: FooterColumn; mobile: boolean; open: boolean; onToggle: () => void }) {
  const id = `sf-col-${col.h.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const rows = mobile ? col.items.length : Math.min(col.items.length, MAX_ROWS);
  const list = (
    <ul className="sf-list" style={{ ['--sf-rows' as string]: rows }}>
      {col.items.map(it => (
        <li key={it.l + it.href}>
          <FLink href={it.href}>{it.l}</FLink>
        </li>
      ))}
    </ul>
  );
  if (!mobile) {
    return (
      <div className="sf-col">
        <h3 className="sf-h">{col.h}</h3>
        {list}
      </div>
    );
  }
  return (
    <div className="sf-col sf-col-m">
      <h3 className="sf-h sf-h-m">
        <button type="button" className="sf-acc-btn" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          {col.h}
          <span aria-hidden="true" className="sf-plus" data-open={open ? 'true' : 'false'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </span>
        </button>
      </h3>
      <div id={id} role="region" aria-label={col.h} hidden={!open}>
        {list}
      </div>
    </div>
  );
}

/** Tabs follow the ARIA tabs pattern: roving tabindex, Left/Right/Home/End move and select. Only
    the active panel is in the DOM, which keeps the added link count per page to one panel. */
function FooterTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const move = (to: number) => {
    const next = (to + FOOTER_TABS.length) % FOOTER_TABS.length;
    setActive(next);
    refs.current[next]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); move(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); move(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); move(0); }
    else if (e.key === 'End') { e.preventDefault(); move(FOOTER_TABS.length - 1); }
  };
  const tab = FOOTER_TABS[active];
  return (
    <section className="sf-tabs" aria-label="Browse Fermor">
      <div className="sf-tablist" role="tablist" aria-label="Browse Fermor">
        {FOOTER_TABS.map((t, i) => (
          <button
            key={t.id}
            ref={el => { refs.current[i] = el; }}
            type="button"
            role="tab"
            id={`sf-tab-${t.id}`}
            aria-selected={i === active}
            aria-controls="sf-tabpanel"
            tabIndex={i === active ? 0 : -1}
            className="sf-tab"
            onClick={() => setActive(i)}
            onKeyDown={e => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div id="sf-tabpanel" role="tabpanel" aria-labelledby={`sf-tab-${tab.id}`} className="sf-panel">
        {tab.items.map(it => (
          <FLink key={it.href} href={it.href} className="sf-plink"><span>{it.l}</span></FLink>
        ))}
        <FLink href={tab.all.href} className="sf-plink sf-plink-all"><span>{tab.all.l}</span></FLink>
      </div>
    </section>
  );
}

const CSS = `
  .sf { background: ${GROUND}; border-top: 1px solid ${RULE}; color: ${INK}; font-family: ${INTER}; }
  .sf *, .sf *::before, .sf *::after { box-sizing: border-box; }
  .sf a { text-decoration: none; }
  .sf a:focus-visible, .sf button:focus-visible { outline: 2px solid ${GREEN_INK}; outline-offset: 2px; border-radius: 4px; }
  .sf-wrap { max-width: 1240px; margin: 0 auto; padding: 56px 28px 0; }
  .sf-top { display: grid; grid-template-columns: minmax(0, 300px) minmax(0, 1fr); gap: 56px; align-items: start; }
  .sf-brand { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
  .sf-logo { display: inline-flex; align-items: center; gap: 10px; color: ${INK}; }
  .sf-logo span { font-size: 26px; font-weight: 800; letter-spacing: -.025em; }
  .sf-co { margin: 0; font-size: 14px; line-height: 1.6; color: ${MUTED}; max-width: 280px; }
  .sf-co + .sf-copy { margin-top: -6px; }
  .sf-copy { margin: 0; font-size: 13px; line-height: 1.5; color: #7A8087; }
  .sf-social { display: flex; flex-wrap: wrap; gap: 2px; margin: 2px 0 0 -10px; padding: 0; list-style: none; }
  .sf-social a { display: inline-flex; width: 44px; height: 44px; align-items: center; justify-content: center; color: ${MUTED}; border-radius: 50%; }
  .sf-social a:hover { color: ${MINT}; background: rgba(16,18,20,.06); }
  .sf-social svg { fill: currentColor; }
  .sf-cols { display: flex; flex-wrap: wrap; gap: 36px 48px; justify-content: flex-start; }
  .sf-col { min-width: 0; }
  .sf-h { margin: 0 0 18px; font-size: 13px; font-weight: 700; letter-spacing: .09em; text-transform: uppercase; color: ${INK}; }
  .sf-list { list-style: none; margin: 0; padding: 0; display: grid; grid-auto-flow: column;
    grid-template-rows: repeat(var(--sf-rows, 10), auto); gap: 12px 40px; }
  .sf-link { display: inline-block; font-size: 15px; line-height: 1.35; color: ${LINK}; transition: color .16s ease; }
  .sf-link:hover, .sf-plink:hover span { color: ${MINT}; text-decoration: underline; text-decoration-color: ${MINT}; text-decoration-thickness: 2px; text-underline-offset: 4px; }
  .sf-tabs { margin-top: 48px; }
  .sf-tablist { display: flex; gap: 4px; border-bottom: 1px solid ${RULE}; overflow-x: auto; scrollbar-width: none; }
  .sf-tablist::-webkit-scrollbar { display: none; }
  .sf-tab { appearance: none; background: none; border: 0; border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer;
    font: inherit; font-size: 14px; font-weight: 600; color: ${MUTED}; padding: 14px 18px; min-height: 48px; white-space: nowrap;
    transition: color .16s ease, border-color .16s ease; }
  .sf-tab:hover { color: ${INK}; }
  .sf-tab[aria-selected="true"] { color: ${INK}; border-bottom-color: ${INK}; }
  .sf-panel { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px 28px; padding: 22px 0 8px; }
  .sf-plink { display: block; padding: 9px 0; min-height: 44px; font-size: 14.5px; line-height: 1.4; color: ${MUTED}; transition: color .16s ease; }
  .sf-plink span { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .sf-plink:hover { color: ${MINT}; }
  .sf-plink-all { font-weight: 600; color: ${GREEN_INK}; }
  .sf-plink-all:hover { color: ${MINT}; }
  .sf-legal { margin-top: 28px; padding: 24px 0 40px; border-top: 1px solid ${RULE}; }
  .sf-legal p { margin: 0 0 8px; max-width: 980px; font-size: 12.5px; line-height: 1.7; color: ${MUTED}; }
  .sf-legal p:last-child { margin-bottom: 0; }
  .sf-acc-btn { display: flex; width: 100%; align-items: center; justify-content: space-between; min-height: 52px; padding: 0;
    appearance: none; background: none; border: 0; cursor: pointer; font: inherit; font-size: 13px; font-weight: 700;
    letter-spacing: .09em; text-transform: uppercase; color: ${INK}; text-align: left; -webkit-tap-highlight-color: transparent; }
  .sf-plus { display: flex; transition: transform .2s ease; color: ${MUTED}; }
  .sf-plus[data-open="true"] { transform: rotate(45deg); }
  @media (max-width: 1099px) {
    .sf-top { grid-template-columns: minmax(0, 1fr); gap: 36px; }
    .sf-cols { justify-content: flex-start; }
    .sf-panel { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (max-width: 759px) {
    .sf-wrap { padding: 40px 20px 0; }
    .sf-top { gap: 28px; }
    .sf-cols { display: block; }
    .sf-col-m { border-top: 1px solid ${RULE}; }
    .sf-col-m:last-child { border-bottom: 1px solid ${RULE}; }
    .sf-h-m { margin: 0; }
    .sf-col-m .sf-list { grid-auto-flow: row; grid-template-rows: none; gap: 0; padding-bottom: 12px; }
    .sf-col-m .sf-link { display: block; padding: 11px 0; min-height: 44px; }
    .sf-panel { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 20px; }
    .sf-tab { padding: 12px 14px; }
  }
  @media (max-width: 359px) {
    .sf-panel { grid-template-columns: minmax(0, 1fr); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sf-link, .sf-tab, .sf-plink, .sf-plus { transition: none; }
  }
`;

export function SiteFooter({ columns, legalNote }: { columns?: FooterColumn[]; legalNote?: string }) {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia('(max-width: 759px)');
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const cols = withSharedColumns(columns ?? DISCOVERY_COLUMNS);
  const year = new Date().getFullYear();

  return (
    <footer className="sf">
      <style>{CSS}</style>
      <div className="sf-wrap">
        <div className="sf-top">
          <div className="sf-brand">
            <Link href="/" target="_blank" rel="noopener noreferrer" className="sf-logo" aria-label="Fermor home">
              <img src="/fermor-mark-2026.svg" alt="" width={44} height={34} style={{ height: 30, width: 'auto', display: 'block' }} />
              <span>Fermor</span>
            </Link>
            <p className="sf-co">{FOOTER_DESCRIPTION}</p>
            <p className="sf-copy">&copy; {year} Fermor. All rights reserved.</p>
            <ul className="sf-social" aria-label="Fermor on social media">
              {SOCIAL_LINKS.map(sc => (
                <li key={sc.id}>
                  <a href={sc.href} target="_blank" rel="noopener noreferrer" aria-label={sc.label}>
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d={sc.d} /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="sf-cols" aria-label="Footer">
            {cols.map(col => (
              <LinkColumn
                key={col.h}
                col={col}
                mobile={mobile}
                open={!!open[col.h]}
                onToggle={() => setOpen(prev => ({ ...prev, [col.h]: !prev[col.h] }))}
              />
            ))}
          </nav>
        </div>

        <FooterTabs />

        <div className="sf-legal">
          {FOOTER_LEGAL.map((para, i) => <p key={i}>{para}</p>)}
          {legalNote && <p>{legalNote}</p>}
        </div>
      </div>
    </footer>
  );
}

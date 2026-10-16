'use client';

/**
 * The homepage's floating navigation.
 *
 * It is a pill, not a header: `position: fixed`, inset from the viewport on every side by the
 * same `--fp-inset` the SectionPanels frame uses, so it hangs inside the dark frame rather than
 * spanning it. Nothing about it is in flow, so it reserves no height and the landing content
 * below is untouched by it existing.
 *
 * Two things it deliberately does not do:
 *
 *   It is a sibling of <main>, never an ancestor of it. The hero is GSAP-pinned with
 *   `position: fixed`, and a transformed ancestor would become that pin's containing block. The
 *   hide/show transform lives on this element alone, so it cannot reach the phone.
 *
 *   It never unmounts. Hiding is a transform plus `visibility`, so the scroll listener's own
 *   state changes can never move the page under a running scroll animation.
 *
 * Responsiveness is CSS, not a measured breakpoint held in state: both layouts are in the
 * markup and a media query picks one. A width read during render would differ between the
 * server pass and the first client pass, which is a hydration mismatch.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { onScrollFrame } from './scrollScheduler';
import { useAuth } from '../../src/context/AuthContext';

/* Market, Portfolio, ACT and Ask have no routes on the site yet. They are rendered as real,
   focusable anchors so the menu is navigable and announced correctly, with navigation
   suppressed until each one has somewhere to go. Swap the href in when the page exists. */
const PRODUCTS = ['Market', 'Portfolio', 'ACT', 'Ask'] as const;

/** Resources' two real destinations. Blogs is the migrated /news + /resources content;
    Calculators reuses the existing /calculators page untouched. */
const RESOURCES = [
  { label: 'Blogs', href: '/blogs' },
  { label: 'Calculators', href: '/calculators' },
] as const;

/** Extra Resources entries for the in-page variant (`page`). The family navs it replaces on
    calculator, blog, mutual fund, tax and GDP pages each carried one of these, so they stay
    reachable from the one shared bar. The homepage and the two listing pages do not pass `page`
    and keep the two-entry menu. */
const PAGE_RESOURCES = [
  { label: 'Mutual Funds', href: '/mutual-funds' },
  { label: 'Browse by AMC', href: '/mutual-funds/amc' },
  { label: 'Credit Cards', href: '/credit-cards' },
] as const;

/** Both dropdowns close this long after the pointer leaves the trigger-or-menu pair, so a
    diagonal or slightly-off cursor path crossing the gap between button and menu doesn't
    accidentally dismiss it. Re-entering either element cancels the pending close. */
const HOVER_CLOSE_DELAY = 220;

/** Scroll past this before a downward gesture is allowed to hide the bar. */
const HIDE_AFTER = 90;
/** Ignore anything smaller: trackpad noise and rubber-band should not flip the bar. */
const DEAD_ZONE = 6;

/** Only the in-page variant carries this, so the homepage and listing bars render exactly as before. */
const SPACER_CSS = `
        .fnav-spacer { height: 72px; }
        @media (max-width: 859px) { .fnav-spacer { height: 68px; } }
        /* Individual pages are on the neutral palette (src/theme/pageTheme.ts): light-grey CTA with charcoal text, green-ink
           focus ring, neutral menu hover. The homepage bar keeps its mint. */
        .fnav-page .fnav-cta { background: #E9ECEE; color: #101214; border-color: #D3D7DA; }
        .fnav-page .fnav-cta:hover { background: #DDE1E4; border-color: #C3C9CE; box-shadow: none; }
        .fnav-page .fnav-menu a:hover { background: rgba(16,18,20,.06); }
        .fnav-page .fnav-item:focus-visible, .fnav-page .fnav-cta:focus-visible, .fnav-page .fnav-login:focus-visible,
        .fnav-page .fnav-brand:focus-visible, .fnav-page .fnav-burger:focus-visible, .fnav-page .fnav-menu a:focus-visible {
          outline-color: #1F7A58; }`;

/** Signed-in state for the in-page variant only: the legacy CalculatorNav showed an account chip
    once a user was signed in, and the homepage bar has no such state. A separate component keeps
    the auth hook out of the homepage render path entirely. */
function PageAccount({ onNavigate, signupHref, nt }: { onNavigate?: () => void; signupHref: string; nt: Record<string, string> }) {
  const { user } = useAuth();
  if (user) {
    return <Link href="/account" className="fnav-login" onClick={onNavigate} {...nt}>Account</Link>;
  }
  return (
    <>
      <Link href={signupHref} className="fnav-cta" onClick={onNavigate} {...nt}>Get Started</Link>
      <Link href="/sign-in" className="fnav-login" onClick={onNavigate} {...nt}>Login</Link>
    </>
  );
}

/** `page` is the in-page variant used on individual calculator, blog, mutual fund, tax and GDP
    pages: same bar, plus an in-flow spacer (the pill is `position: fixed`, so it reserves no
    height), links that open in a new tab, the extra Resources entries, the
    signed-in account chip. `signupHref` overrides the Get Started target (the scheme page points
    it at its own save-fund anchor). Without `page` the output is unchanged. */
export default function FloatingNav({ page = false, signupHref = '/signup' }: { page?: boolean; signupHref?: string } = {}) {
  const [hidden, setHidden] = useState(false);
  const [products, setProducts] = useState(false);
  const [resources, setResources] = useState(false);
  const [sheet, setSheet] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const productsBtn = useRef<HTMLButtonElement>(null);
  const resourcesDropRef = useRef<HTMLDivElement>(null);
  const resourcesBtn = useRef<HTMLButtonElement>(null);
  const productsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Hover open/close for both dropdowns. A short delay on close (not on open) means a cursor
     drifting from the trigger button down into the menu - crossing the visual gap between them,
     which is not part of either element's own box - doesn't read as "left" before it arrives;
     re-entering either the button or the menu within the window cancels the pending close. Click
     still toggles (see the button's onClick below) so keyboard users get the exact same menu via
     Tab + Enter/Space, since hover events never fire for them. */
  const openProducts = () => {
    if (productsCloseTimer.current) { clearTimeout(productsCloseTimer.current); productsCloseTimer.current = null; }
    setProducts(true);
  };
  const scheduleCloseProducts = () => {
    if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
    productsCloseTimer.current = setTimeout(() => setProducts(false), HOVER_CLOSE_DELAY);
  };
  const openResources = () => {
    if (resourcesCloseTimer.current) { clearTimeout(resourcesCloseTimer.current); resourcesCloseTimer.current = null; }
    setResources(true);
  };
  const scheduleCloseResources = () => {
    if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
    resourcesCloseTimer.current = setTimeout(() => setResources(false), HOVER_CLOSE_DELAY);
  };
  useEffect(() => () => {
    if (productsCloseTimer.current) clearTimeout(productsCloseTimer.current);
    if (resourcesCloseTimer.current) clearTimeout(resourcesCloseTimer.current);
  }, []);

  /* Direction, not position: the bar leaves on a downward gesture and comes back on an upward
     one, and is always present in the first screenful regardless of direction. */
  useEffect(() => {
    let last = window.scrollY;
    // On the shared scheduler: no listener and no rAF of its own, and setHidden is only
    // called when the value actually flips, so a fast scroll costs at most one rerender per
    // direction change rather than one per frame.
    return onScrollFrame(({ y }) => {
      const dy = y - last;
      if (Math.abs(dy) < DEAD_ZONE) return; // leave `last` alone so small moves accumulate
      last = y;
      if (y < HIDE_AFTER) setHidden(false);
      else if (dy > 0) {
        setHidden(true);
        setProducts(false);
        setResources(false);
        setSheet(false);
      } else setHidden(false);
    });
  }, []);

  /* Outside click and Escape. Escape returns focus to the trigger, which is what makes the
     menu usable without a pointer. */
  useEffect(() => {
    if (!products && !resources && !sheet) return;
    const onDown = (e: MouseEvent) => {
      if (products && dropRef.current && !dropRef.current.contains(e.target as Node)) setProducts(false);
      if (resources && resourcesDropRef.current && !resourcesDropRef.current.contains(e.target as Node)) setResources(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (products) {
        setProducts(false);
        productsBtn.current?.focus();
      }
      if (resources) {
        setResources(false);
        resourcesBtn.current?.focus();
      }
      setSheet(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [products, resources, sheet]);

  const stop = (e: React.MouseEvent) => e.preventDefault();
  const nt: Record<string, string> = page ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const resourceLinks = page ? [...RESOURCES, ...PAGE_RESOURCES] : RESOURCES;

  return (
    <>
    {page && <div aria-hidden="true" className="fnav-spacer" />}
    <div className={page ? 'fnav-wrap fnav-page' : 'fnav-wrap'} data-hidden={hidden ? 'true' : 'false'}>
      <style>{`${page ? SPACER_CSS : ''}
        .fnav-wrap {
          position: fixed;
          top: 6px;
          left: calc(var(--fp-inset, 28px) + 14px);
          right: calc(var(--fp-inset, 28px) + 14px);
          z-index: 120;
          display: flex;
          justify-content: center;
          pointer-events: none;
          transition: transform .42s cubic-bezier(.4,.02,.2,1), opacity .3s ease;
          will-change: transform;
        }
        .fnav-wrap[data-hidden="true"] {
          transform: translate3d(0, calc(-100% - var(--fp-inset, 28px) - 24px), 0);
          opacity: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .fnav-wrap { transition: opacity .2s ease; }
          .fnav-wrap[data-hidden="true"] { transform: none; }
        }
        .fnav {
          pointer-events: auto;
          width: 100%;
          max-width: 1120px;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 9px 10px 9px 18px;
          border-radius: 999px;
          background: rgba(255,255,255,.58);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,.55);
          box-shadow: 0 1px 0 rgba(255,255,255,.7) inset, 0 10px 34px rgba(16,18,20,.13);
          font-family: var(--font-inter), Inter, sans-serif;
        }
        .fnav-brand {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; flex-shrink: 0; padding: 4px 2px;
        }
        .fnav-brand span {
          font-size: 19px; font-weight: 800; letter-spacing: -.02em; color: #101214;
        }
        .fnav-center { display: flex; align-items: center; gap: 2px; flex: 1; justify-content: center; }
        .fnav-item {
          appearance: none; background: none; border: 0;
          display: inline-flex; align-items: center; gap: 5px;
          font: inherit; font-size: 14.5px; font-weight: 500; color: #2B2E31;
          padding: 10px 14px; min-height: 40px; border-radius: 999px;
          cursor: pointer; text-decoration: none; white-space: nowrap;
          transition: background .18s ease, color .18s ease;
        }
        .fnav-item:hover { background: rgba(16,18,20,.06); color: #101214; }
        .fnav-item[aria-expanded="true"] { background: rgba(16,18,20,.08); color: #101214; }
        .fnav-item:focus-visible { outline: 2px solid #75FB90; outline-offset: 2px; }
        .fnav-chev { transition: transform .22s ease; }
        .fnav-item[aria-expanded="true"] .fnav-chev { transform: rotate(180deg); }
        .fnav-drop { position: relative; }
        .fnav-menu {
          position: absolute; top: calc(100% + 10px); left: 50%;
          min-width: 208px; padding: 7px;
          border-radius: 16px;
          background: rgba(255,255,255,.82);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255,255,255,.6);
          box-shadow: 0 18px 44px rgba(16,18,20,.18);
          display: grid; gap: 2px;
          opacity: 0; visibility: hidden;
          transform: translate(-50%, -6px) scale(.97);
          transform-origin: top center;
          transition: opacity .2s ease, transform .24s cubic-bezier(.2,.82,.2,1), visibility .24s;
        }
        .fnav-menu[data-open="true"] {
          opacity: 1; visibility: visible;
          transform: translate(-50%, 0) scale(1);
        }
        .fnav-menu a {
          display: block; padding: 10px 13px; min-height: 40px;
          border-radius: 11px; text-decoration: none;
          font-size: 14px; font-weight: 600; color: #101214;
          transition: background .16s ease;
        }
        .fnav-menu a:hover { background: rgba(117,251,144,.28); }
        .fnav-menu a:focus-visible { outline: 2px solid #75FB90; outline-offset: -2px; }
        .fnav-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .fnav-cta {
          font-size: 14px; font-weight: 700; color: #101214;
          background: #75FB90; border: 1px solid rgba(16,18,20,.08);
          padding: 10px 18px; min-height: 40px; display: inline-flex; align-items: center;
          border-radius: 999px; text-decoration: none; white-space: nowrap;
          transition: transform .16s ease, box-shadow .16s ease;
        }
        .fnav-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(117,251,144,.45); }
        .fnav-login {
          font-size: 14px; font-weight: 600; color: #101214;
          border: 1px solid rgba(16,18,20,.16);
          padding: 10px 18px; min-height: 40px; display: inline-flex; align-items: center;
          border-radius: 999px; text-decoration: none; white-space: nowrap;
          transition: background .16s ease, border-color .16s ease;
        }
        .fnav-login:hover { background: rgba(16,18,20,.06); border-color: rgba(16,18,20,.3); }
        .fnav-cta:focus-visible, .fnav-login:focus-visible, .fnav-brand:focus-visible {
          outline: 2px solid #75FB90; outline-offset: 2px;
        }
        .fnav-burger {
          display: none; appearance: none; background: none;
          border: 1px solid rgba(16,18,20,.16); border-radius: 999px;
          width: 42px; height: 42px; align-items: center; justify-content: center;
          cursor: pointer; color: #101214; flex-shrink: 0; margin-left: auto;
        }
        .fnav-burger:focus-visible { outline: 2px solid #75FB90; outline-offset: 2px; }
        .fnav-sheet {
          pointer-events: auto;
          position: absolute; top: calc(100% + 10px); left: 0; right: 0;
          padding: 8px;
          border-radius: 20px;
          background: rgba(255,255,255,.86);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid rgba(255,255,255,.6);
          box-shadow: 0 18px 44px rgba(16,18,20,.18);
          display: none;
          opacity: 0; visibility: hidden; transform: translateY(-6px);
          transition: opacity .2s ease, transform .24s cubic-bezier(.2,.82,.2,1), visibility .24s;
        }
        .fnav-sheet[data-open="true"] { opacity: 1; visibility: visible; transform: translateY(0); }
        .fnav-sheet a, .fnav-sheet .fnav-sheet-h {
          display: block; padding: 12px 14px; min-height: 44px;
          border-radius: 12px; text-decoration: none;
          font-size: 15px; font-weight: 600; color: #101214;
        }
        .fnav-sheet .fnav-sheet-h {
          font-size: 11px; font-weight: 700; letter-spacing: .11em; text-transform: uppercase;
          color: #7C8186; min-height: 0; padding: 12px 14px 4px;
        }
        .fnav-sheet .fnav-sheet-sub { padding-left: 26px; font-weight: 500; }
        .fnav-sheet a:hover { background: rgba(16,18,20,.06); }
        .fnav-sheet-actions { display: flex; gap: 8px; padding: 10px 6px 6px; }
        .fnav-sheet-actions > * { flex: 1; justify-content: center; }
        @media (max-width: 859px) {
          .fnav-wrap {
            top: 5px;
            left: calc(var(--fp-inset, 12px) + 8px);
            right: calc(var(--fp-inset, 12px) + 8px);
          }
          .fnav { padding: 8px 8px 8px 14px; border-radius: 22px; }
          .fnav-center, .fnav-right { display: none; }
          .fnav-burger { display: inline-flex; }
          .fnav-sheet { display: block; }
        }
      `}</style>

      <nav className="fnav" aria-label="Main">
        <Link href="/" className="fnav-brand" {...nt}>
          <img src="/fermor-mark-2026.svg" alt="" width={29} height={22} style={{ height: 22, width: 'auto', display: 'block' }} />
          <span>Fermor</span>
        </Link>

        <div className="fnav-center">
          <div
            className="fnav-drop"
            ref={dropRef}
            onMouseEnter={openProducts}
            onMouseLeave={scheduleCloseProducts}
          >
            <button
              ref={productsBtn}
              type="button"
              className="fnav-item"
              aria-expanded={products}
              aria-haspopup="true"
              aria-controls="fnav-products-menu"
              onClick={() => setProducts(o => !o)}
            >
              Products
              <svg className="fnav-chev" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div id="fnav-products-menu" className="fnav-menu" data-open={products ? 'true' : 'false'} role="menu" aria-label="Products">
              {PRODUCTS.map(p => (
                <a key={p} href="#" role="menuitem" onClick={e => { stop(e); setProducts(false); }}>{p}</a>
              ))}
            </div>
          </div>
          <div
            className="fnav-drop"
            ref={resourcesDropRef}
            onMouseEnter={openResources}
            onMouseLeave={scheduleCloseResources}
          >
            <button
              ref={resourcesBtn}
              type="button"
              className="fnav-item"
              aria-expanded={resources}
              aria-haspopup="true"
              aria-controls="fnav-resources-menu"
              onClick={() => setResources(o => !o)}
            >
              Resources
              <svg className="fnav-chev" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div id="fnav-resources-menu" className="fnav-menu" data-open={resources ? 'true' : 'false'} role="menu" aria-label="Resources">
              {resourceLinks.map(r => (
                <Link key={r.label} href={r.href} role="menuitem" onClick={() => setResources(false)} {...nt}>{r.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="fnav-right">
          {page ? (
            <PageAccount signupHref={signupHref} nt={nt} />
          ) : (
            <>
              <Link href="/signup" className="fnav-cta">Get Started</Link>
              <Link href="/sign-in" className="fnav-login">Login</Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="fnav-burger"
          aria-label="Menu"
          aria-expanded={sheet}
          aria-controls="fnav-sheet"
          onClick={() => { setSheet(o => !o); setProducts(false); setResources(false); }}
        >
          {sheet
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>}
        </button>
      </nav>

      <div id="fnav-sheet" className="fnav-sheet" data-open={sheet ? 'true' : 'false'}>
        <div className="fnav-sheet-h">Products</div>
        {PRODUCTS.map(p => (
          <a key={p} href="#" className="fnav-sheet-sub" onClick={e => { stop(e); setSheet(false); }}>{p}</a>
        ))}
        <div className="fnav-sheet-h">Resources</div>
        {resourceLinks.map(r => (
          <Link key={r.label} href={r.href} className="fnav-sheet-sub" onClick={() => setSheet(false)} {...nt}>{r.label}</Link>
        ))}
        <div className="fnav-sheet-actions">
          {page ? (
            <PageAccount signupHref={signupHref} nt={nt} onNavigate={() => setSheet(false)} />
          ) : (
            <>
              <Link href="/signup" className="fnav-cta" onClick={() => setSheet(false)}>Get Started</Link>
              <Link href="/sign-in" className="fnav-login" onClick={() => setSheet(false)}>Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}

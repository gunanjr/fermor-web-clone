'use client';

/**
 * The site footer, split out of HomepageClient so /resources can render it without pulling
 * that module's graph (AppPromo, and through it three.js) into its bundle. The markup and the
 * styles are the homepage footer's, moved verbatim, not a second copy written to match.
 *
 * `minimal` is the only thing added: /resources wants the black panel (brand, links,
 * disclaimer) without the homepage-only FAQ and the large wordmark above it. On the homepage
 * the prop is left off and nothing about the rendered footer changes.
 */

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useBP, useReveal, useWordHangingBar } from './hooks';
import { FERMOR_GLYPHS, FERMOR_GLYPH_TOTAL_ADVANCE } from './fermorWordmarkGlyphs';
import { GENERAL_COLUMNS, FOOTER_LEGAL, type FooterColumn } from '../../src/components/common/footerLinks';

/** A taller, mirror-tiled version of the exact image AppPromo's curtain reveals (see
    app/_home/AppPromo.tsx's CURTAIN_BG_IMAGE, '/images/app-promo/curtain-reveal-bg.png').
    Not a different photo, not a resample to a flat colour: the source PNG is only 914px tall,
    and at the scale the curtain displays it (background-size: cover on a 164vh-tall box - see
    AppPromo.tsx), the curtain's own reveal already uses up 160 of those 164vh by the time it
    finishes (see fileLastMod... i.e. the "local curtain-image y = 100vh - END" maths below).
    That leaves only ~4vh of genuinely matching pixels to continue into - nowhere near enough to
    cover the FAQ band, whatever its height ends up being once the accordion, the product
    showcase and the wordmark are all accounted for.

    This file solves that by tiling the same source image downward via alternating vertical
    flips (original, flipped, original, flipped - built by scripts left in git history, not
    checked in here since the output is the artefact that matters) rather than a plain repeat.
    A plain repeat would show a hard seam wherever the image's own top row meets its own bottom
    row, since nothing guarantees those match; a mirror-flip repeat is seamless by construction,
    because the two rows meeting at every join are the literal same row of source pixels (the
    last row of a normal copy is the first row of the flipped copy that follows it, and vice
    versa) - visually confirmed against this specific image, whose content is a soft, low-detail
    light blur with no hard edges or repeating structure for the mirroring to expose. Four units
    stacked (3656px total) gives 4x the vertical reach at the exact same per-pixel scale the
    curtain itself uses, comfortably covering the FAQ band with the original crop never running
    dry.

    Exported (not module-private) because the Calculators listing page reuses this exact asset
    for its own page background - same photo, same per-pixel scale convention - rather than
    duplicating the path or building a second tiled asset. That page isn't continuing a curtain
    reveal, so it doesn't reuse the "-160vh" offset below, only the file and the unit scale. */
export const CONTINUED_BG_IMAGE = '/images/app-promo/curtain-reveal-bg-tall.webp';
/** How many 914px source units the tall asset stacks (see the doc comment above) - the boundary
    math below is expressed as a multiple of AppPromo's own 164vh-per-unit scale so the two stay
    exactly derived from one number rather than two independently-typed constants. */
export const CONTINUED_BG_UNITS = 4;


/* ============================================================
   SECTION: FAQ
   ============================================================ */
/* Placeholder copy. These five are stand-ins for the real questions and are written to be
   replaced wholesale, so nothing here claims a return, a rate or a guarantee. */
const FAQS: { q: string; a: string }[] = [
  {
    q: 'What does Fermor actually do?',
    a: 'Fermor runs the math behind everyday money decisions. Calculators for loans, savings and tax, plus plain analysis of what the numbers mean, so you can compare options before you commit to one.',
  },
  {
    q: 'How should I use the calculators?',
    a: 'Start with the numbers you already know, then move one input at a time and watch what it does to the result. Seeing how sensitive an outcome is to a single change is usually more useful than any one figure.',
  },
  {
    q: 'Do the tools give financial advice?',
    a: 'No. Fermor is educational and is not a SEBI-registered adviser. The tools show you the arithmetic and the trade-offs; the decision, and any advice you want on it, stays with you and your adviser.',
  },
  {
    q: 'What happens to the numbers I enter?',
    a: 'Calculations run in your browser. Your inputs stay on your device unless you choose to save a result to an account, and you can clear a saved calculation whenever you want.',
  },
  {
    q: 'How do I get started?',
    a: 'Pick the calculator closest to the decision in front of you and run it once with real numbers. Everything on Fermor is free to use, and you only need an account if you want your results kept between visits.',
  },
];

function FAQItem({ q, a, open, onToggle, idx, seen }: {
  q: string; a: string; open: boolean; onToggle: () => void; idx: number; seen: boolean;
}) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState(0);
  // Measured rather than max-height guessed: a wrong guess either clips a long answer or eases
  // through empty space on a short one, and the height has to survive a resize or a late font.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setH(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const id = `home-faq-${idx}`;
  return (
    <div className={`ffq-item${seen ? ' is-in' : ''}${open ? ' is-open' : ''}`} style={{ transitionDelay: `${idx * 70}ms` }}>
      <button
        type="button"
        className="ffq-q"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="ffq-q-text">{q}</span>
        <span className="ffq-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 4v16M4 12h16" />
          </svg>
        </span>
      </button>
      <div className="ffq-a" id={id} role="region" aria-hidden={!open} style={{ height: open ? h : 0 }}>
        <div ref={bodyRef} className="ffq-a-body">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

/** Two columns on desktop (intro left, accordion right), stacked below 900px. Only one answer is
    open at a time: a single index in state, so opening one row closes whichever was open, and
    clicking the open row closes it and leaves none. */
function HomeFAQ() {
  const [ref, seen] = useReveal();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section ref={ref as any} aria-labelledby="home-faq-title" style={{ width: '100%' }}>
      <style>{`
        .ffq-grid { display: grid; grid-template-columns: minmax(0,.8fr) minmax(0,1.35fr);
          gap: 72px; align-items: start; }
        .ffq-badge { display: inline-flex; align-items: center; justify-content: center;
          width: 46px; height: 46px; border-radius: 13px; background: #fff; color: #101214;
          border: 1px solid #E1E3E5; box-shadow: 0 1px 2px rgba(16,18,20,.04); }
        /* The Fermor mark is mint (#75FB90), unreadable on white, so the badge takes the brand
           dark ground the favicon uses. Same 46px tile and radius as before. */
        .ffq-badge { background: var(--brand-ground, #0D0F10); border-color: var(--brand-ground, #0D0F10); }
        .ffq-badge img { display: block; width: 26px; height: auto; }
        .ffq-eyebrow { margin: 20px 0 10px; font-family: var(--font-inter), Inter, sans-serif;
          font-size: 15px; font-weight: 500; color: #5B6065; }
        .ffq-title { margin: 0; font-family: var(--font-poppins), Poppins, sans-serif;
          font-size: clamp(34px,4.4vw,56px); font-weight: 600; line-height: 1.06;
          letter-spacing: -.03em; color: #101214; }
        .ffq-item { border-bottom: 1px solid rgba(16,18,20,.12); opacity: 0; transform: translateY(14px);
          transition: opacity .5s ease, transform .5s cubic-bezier(.2,.8,.28,1); }
        .ffq-item.is-in { opacity: 1; transform: none; }
        .ffq-item:first-child { border-top: 1px solid rgba(16,18,20,.12); }
        .ffq-q { display: flex; align-items: center; justify-content: space-between; gap: 24px;
          width: 100%; padding: 28px 2px; background: none; border: none; cursor: pointer;
          text-align: left; -webkit-tap-highlight-color: transparent;
          font-family: var(--font-inter), Inter, sans-serif; }
        .ffq-q:focus-visible { outline: 2px solid #101214; outline-offset: 2px; border-radius: 6px; }
        .ffq-q-text { font-size: 19px; font-weight: 500; color: #101214; line-height: 1.35;
          letter-spacing: -.01em; }
        .ffq-icon { display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          width: 28px; height: 28px; color: #5B6065;
          transition: transform .38s cubic-bezier(.4,.02,.2,1), color .24s ease; }
        .ffq-q:hover .ffq-icon { color: #101214; }
        .ffq-item.is-open .ffq-icon { transform: rotate(135deg); color: #101214; }
        .ffq-a { overflow: hidden; height: 0;
          transition: height .4s cubic-bezier(.4,.02,.2,1); }
        .ffq-a-body { padding: 0 52px 28px 2px; }
        .ffq-a-body p { margin: 0; font-family: var(--font-inter), Inter, sans-serif;
          font-size: 16px; line-height: 1.7; color: #5B6065; max-width: 640px;
          opacity: 0; transform: translateY(-6px);
          transition: opacity .3s ease, transform .4s cubic-bezier(.4,.02,.2,1); }
        .ffq-item.is-open .ffq-a-body p { opacity: 1; transform: none; transition-delay: .08s; }
        @media (max-width: 1079px) {
          .ffq-grid { gap: 48px; }
        }
        @media (max-width: 899px) {
          .ffq-grid { grid-template-columns: minmax(0,1fr); gap: 36px; }
        }
        @media (max-width: 759px) {
          .ffq-q { padding: 22px 2px; gap: 16px; }
          .ffq-q-text { font-size: 17px; }
          .ffq-a-body { padding: 0 8px 22px 2px; }
          .ffq-a-body p { font-size: 15px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ffq-item, .ffq-icon, .ffq-a, .ffq-a-body p { transition: none; }
          .ffq-item { opacity: 1; transform: none; }
          .ffq-a-body p { opacity: 1; transform: none; }
        }
      `}</style>
      <div className="ffq-grid">
        <div>
          <span className="ffq-badge" aria-hidden="true">
            <img src="/fermor-mark-2026.svg" alt="" width={26} height={20} />
          </span>
          <div className="ffq-eyebrow">Got questions?</div>
          <h2 id="home-faq-title" className="ffq-title">Frequently Asked Questions</h2>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              idx={i}
              seen={seen}
              open={open === i}
              onToggle={() => setOpen(o => (o === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION: FOOTER
   ============================================================ */
/* ------------------------------------------------------------------ social
   Inline glyphs rather than an icon package: the footer needs four marks and the site carries
   no icon dependency to reuse. Only the X account is a real Fermor account (it is the one
   profile the Organization schema in app/layout.tsx claims); the rest are placeholders and are
   left as such rather than pointed at invented handles. */
const SOCIALS: { l: string; n: string; href: string; d: string }[] = [
  {
    l: 'Fermor on LinkedIn',
    n: 'LinkedIn',
    href: '#',
    d: 'M6.94 8.5V20H3.3V8.5h3.64Zm.24-3.45c0 1.05-.79 1.9-2.06 1.9h-.02C3.87 6.95 3.1 6.1 3.1 5.05c0-1.07.81-1.9 2.04-1.9 1.23 0 1.99.83 2.04 1.9ZM20.9 20h-3.64v-6.15c0-1.55-.55-2.6-1.94-2.6-1.06 0-1.69.71-1.97 1.4-.1.24-.13.58-.13.93V20H9.58s.05-10.42 0-11.5h3.64v1.63c.48-.75 1.35-1.82 3.29-1.82 2.4 0 4.2 1.57 4.2 4.94V20Z',
  },
  {
    l: 'Fermor on X',
    n: 'X (Twitter)',
    href: 'https://twitter.com/fermor_in',
    d: 'M17.53 3h3.02l-6.6 7.54L21.7 21h-5.9l-4.62-6.04L5.9 21H2.88l7.06-8.07L2.3 3h6.05l4.18 5.52L17.53 3Zm-1.06 16.17h1.68L7.6 4.74H5.8l10.67 14.43Z',
  },
  {
    l: 'Fermor on Instagram',
    n: 'Instagram',
    href: '#',
    d: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 1.98c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.64 3.64 0 0 0-.88-1.35 3.64 3.64 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a4.49 4.49 0 1 1 0 8.98 4.49 4.49 0 0 1 0-8.98Zm0 7.4a2.91 2.91 0 1 0 0-5.82 2.91 2.91 0 0 0 0 5.82Zm5.72-7.6a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0Z',
  },
  {
    l: 'Fermor on YouTube',
    n: 'YouTube',
    href: '#',
    d: 'M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 0 0-1.76 1.77C2 8.77 2 12.06 2 12.06s0 3.29.42 4.87a2.5 2.5 0 0 0 1.76 1.77C5.75 19.12 12 19.12 12 19.12s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77c.42-1.58.42-4.87.42-4.87s0-3.29-.42-4.87ZM10 15.06V9.06l5.2 3-5.2 3Z',
  },
];

/* Fermor compliance text: a single paragraph matching Jeton's design blueprint exactly.
   Jeton's own footer runs one block of text here too, no separate copyright line above it.
   Real company info + SEBI disclaimer, in green instead of Jeton's red. */
/* The compliance paragraph lives in footerLinks.ts so SiteFooter shows the same text. */

/* Store badges and social icons each used to be written out inline once for desktop's grid
   placement; mobile's accordion layout and tablet's stacked layout both need the exact same two
   elements in a plain flex row instead, so they're pulled out here rather than copy-pasted a
   second and third time. */
function StoreBadges() {
  return (
    <>
      <a href="#" className="fft-store-badge" aria-label="Get it on Google Play (coming soon)">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 2.3c-.4.2-.6.6-.6 1.1v17.2c0 .5.2.9.6 1.1l9.6-9.7L3.6 2.3Zm11 9.5 2.6-2.6-9.9-5.6 7.3 8.2Zm1.1 1.1 2.9 3-9.7 5.5 6.8-8.5Zm3.9-.9c.5-.3.8-.8.8-1.4s-.3-1.1-.8-1.4l-2.6-1.5-2.9 3 2.9 3 2.6-1.5Z" fill="currentColor" /></svg>
        <span><em>GET IT ON</em>Google Play</span>
      </a>
      <a href="#" className="fft-store-badge" aria-label="Download on the App Store (coming soon)">
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.05 12.5c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.03-1.6-.17-3.13.94-3.94.94-.82 0-2.06-.92-3.39-.9-1.74.03-3.36 1.02-4.25 2.58-1.82 3.15-.46 7.8 1.29 10.35.86 1.24 1.88 2.64 3.22 2.59 1.3-.05 1.79-.83 3.36-.83 1.56 0 2 .83 3.37.8 1.4-.02 2.28-1.26 3.13-2.51.99-1.44 1.4-2.83 1.42-2.9-.03-.01-2.72-1.04-2.75-4.18h.08Zm-2.58-7.69c.71-.86 1.19-2.06 1.06-3.26-1.02.04-2.26.68-3 1.53-.66.75-1.24 1.98-1.08 3.15 1.14.09 2.31-.58 3.02-1.42Z" fill="currentColor" /></svg>
        <span><em>Download on the</em>App Store</span>
      </a>
    </>
  );
}

function SocialIcons() {
  return (
    <>
      {SOCIALS.map(sc => (
        <a key={sc.l} href={sc.href} target="_blank" rel="noopener noreferrer" aria-label={sc.l} className="fft-social-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d={sc.d} /></svg>
        </a>
      ))}
    </>
  );
}

/** One footer link, shared by the desktop/tablet grid and the mobile accordion. Real pages go
    through next/link; an XML endpoint like /sitemap.xml is not an app page, so it gets a plain
    anchor and is never prefetched or client-routed. Both open in a new tab. */
function FooterLink({ href, children, style }: { href: string; children: React.ReactNode; style: React.CSSProperties }) {
  if (href.endsWith('.xml')) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="fft-link" style={style}>{children}</a>;
  }
  return <Link href={href} target="_blank" rel="noopener noreferrer" className="fft-link" style={style}>{children}</Link>;
}

/** One collapsible mobile footer section (heading + "+"/"x" toggle + its links), matching
    Jeton's own mobile footer: every section starts closed, and the "+" rotates 45deg into an
    "x" on open. Height is measured (not a guessed max-height) so it works whether a section has
    2 items (Legal) or 9 (Calculators) without clipping the longer ones or leaving dead space
    under the shorter ones -- same technique HomeFAQ's FAQItem already uses above in this file. */
function FooterAccordionSection({ col, open, onToggle }: {
  col: { h: string; items: { l: string; href: string }[] };
  open: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setH(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const id = `footer-acc-${col.h.toLowerCase()}`;
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,.14)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
          padding: '18px 2px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 15, fontWeight: 700,
          color: '#fff', WebkitTapHighlightColor: 'transparent',
        }}
      >
        {col.h}
        <span aria-hidden="true" style={{
          display: 'flex', width: 22, height: 22, flexShrink: 0, alignItems: 'center', justifyContent: 'center',
          color: '#75FB90', transform: open ? 'rotate(45deg)' : 'none',
          transition: 'transform .28s cubic-bezier(.4,.02,.2,1)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      <div id={id} role="region" style={{ height: open ? h : 0, overflow: 'hidden', transition: 'height .32s cubic-bezier(.4,.02,.2,1)' }}>
        <div ref={bodyRef} style={{ display: 'flex', flexDirection: 'column', gap: 15, paddingBottom: 20 }}>
          {col.items.map(it => (
            <FooterLink key={it.l} href={it.href} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>
              {it.l}
            </FooterLink>
          ))}
        </div>
      </div>
    </div>
  );
}

/* The big wordmark at the bottom of the black panel, as an SVG of per-letter paths (see
   fermorWordmarkGlyphs.ts). Two behaviours, one component each so each owns its hook:
   - HangingWordmark: the original scroll-linked "hanging bar" motion (useWordHangingBar writes
     its transform every animation frame). The calculator and blog pages still use this.
   - RevealWordmark: a one-shot CSS reveal (useReveal latches once, then it is static layout and
     never reacts to scrolling again). The unified footer uses this, because the footer is now
     on thousands of pages and a per-frame scroll listener on each is not worth the motion. */
function WordmarkSvg({ svgRef, className }: { svgRef?: React.RefObject<SVGSVGElement>; className?: string }) {
  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`-50 -740 ${FERMOR_GLYPH_TOTAL_ADVANCE + 100} 784`}
      width="100%"
      style={{ display: 'block' }}
      role="img"
      aria-label="Fermor"
      preserveAspectRatio="none"
    >
      {FERMOR_GLYPHS.map((g, i) => (
        <g key={i} transform={`translate(${g.x}, 0)`}>
          <path d={g.d} fill="#fff" />
        </g>
      ))}
    </svg>
  );
}
function wordmarkBox(m: boolean): React.CSSProperties {
  return { margin: `${m ? 100 : 160}px 0 ${m ? 24 : 44}px`, paddingLeft: m ? 8 : 16, paddingRight: m ? 8 : 16 };
}
function HangingWordmark({ m }: { m: boolean }) {
  const { containerRef, targetRef } = useWordHangingBar();
  return (
    <div ref={containerRef as unknown as React.RefObject<HTMLDivElement>} style={wordmarkBox(m)}>
      <WordmarkSvg svgRef={targetRef as unknown as React.RefObject<SVGSVGElement>} />
    </div>
  );
}
function RevealWordmark({ m }: { m: boolean }) {
  const [ref, seen] = useReveal();
  return (
    <div ref={ref as unknown as React.RefObject<HTMLDivElement>} style={wordmarkBox(m)}>
      <WordmarkSvg className={`fft-word${seen ? ' is-in' : ''}`} />
    </div>
  );
}

const WORD_REVEAL_CSS = `
        /* One-shot wordmark reveal: rises and fades in once, then stays at transform: none. */
        .fft-word { opacity: 0; transform: translate3d(0, 56px, 0);
          transition: opacity .7s ease, transform .9s cubic-bezier(.2,.8,.28,1); }
        .fft-word.is-in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .fft-word { opacity: 1; transform: none; transition: none; }
        }
`;

/** `minimal` drops the FAQ and the wordmark and keeps only the black panel. */
export function Footer({ minimal = false, columns, unified = false, legalNote }: { minimal?: boolean; columns?: FooterColumn[]; unified?: boolean; legalNote?: string }) {
  const bp = useBP();
  const [openMobile, setOpenMobile] = useState<Record<string, boolean>>({});
  /* The visual shell is shared by every page; the link groups are contextual, so each page family
     passes its own `columns` (see src/components/common/footerLinks.ts) and the default is the
     general set. Desktop places the columns on a grid sized to however many there are, and the
     mobile accordion maps over the same array. A /sitemap.xml item inside a column is dropped:
     the Sitemap link is rendered once below, outside the accordion, so it is visible at every
     width and can never appear twice.

     `unified` is the opt-in for the current Fermor footer (Sitemap row, one-shot wordmark reveal,
     WebP background). Without it this component renders exactly what it rendered before, which is
     what the calculator and blog pages still use. */
  const baseCols = columns ?? GENERAL_COLUMNS;
  const cols: FooterColumn[] = unified ? baseCols.map(c => ({ ...c, items: c.items.filter(it => it.href !== '/sitemap.xml') })) : baseCols;
  return (
    <footer style={{ background: 'transparent', overflow: 'hidden' }}>
      {/* Hover lives in CSS rather than in a pair of mouse handlers, because the interaction is
          a transition and an inline handler can only swap a value. The rule shifts the link a
          hair right and draws its underline in from the left as it goes, which is enough to
          feel answered without turning a plain list into a menu of buttons. */}
      <style>{`${unified ? WORD_REVEAL_CSS : ''}
        .fft-link { position: relative; display: inline-block; color: #fff; text-decoration: none;
          transition: color .22s ease, transform .22s ease; }
        .fft-link::after { content: ''; position: absolute; left: 0; bottom: -2px; height: 1px; width: 100%;
          background: currentColor; opacity: .4; transform: scaleX(0); transform-origin: left;
          transition: transform .28s cubic-bezier(.4,.02,.2,1); }
        .fft-link:hover { color: #fff; transform: translateX(2px); }
        .fft-link:hover::after { transform: scaleX(1); }
        /* Social rows. The dark state is a fill that wipes in from the left rather than a
           background swap, so the button answers with a direction instead of a flash, and the
           mark and the arrow move a little against it. :active carries the same states as
           :hover so a tap gets the whole interaction on a touch screen, where there is no
           hover to rely on. The palette is inverted for the black ground: the wipe is the
           accent and the content flips to ink on top of it. */
        .fft-social { position: relative; display: flex; align-items: center; gap: 13px;
          width: 100%; padding: 13px 16px; border-radius: 13px; background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.14); text-decoration: none; overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          transition: border-color .24s ease, transform .24s cubic-bezier(.4,.02,.2,1),
            box-shadow .24s ease; }
        .fft-social-fill { position: absolute; inset: 0; background: #75FB90; transform: scaleX(0);
          transform-origin: left; transition: transform .38s cubic-bezier(.4,.02,.2,1); }
        .fft-social-mark { position: relative; display: flex; width: 34px; height: 34px;
          flex-shrink: 0; align-items: center; justify-content: center; border-radius: 10px;
          background: rgba(255,255,255,.08); transition: background .24s ease, transform .32s cubic-bezier(.4,.02,.2,1); }
        .fft-social-mark svg { fill: rgba(255,255,255,.62); transition: fill .24s ease; }
        .fft-social-label { position: relative; flex: 1; font-family: var(--font-inter), Inter, sans-serif;
          font-size: 14.5px; font-weight: 600; color: rgba(255,255,255,.78); transition: color .24s ease, transform .32s cubic-bezier(.4,.02,.2,1); }
        .fft-social-arrow { position: relative; display: flex; color: rgba(255,255,255,.5); opacity: 0;
          transform: translateX(-6px);
          transition: opacity .24s ease, transform .32s cubic-bezier(.4,.02,.2,1), color .24s ease; }
        .fft-social:hover, .fft-social:focus-visible, .fft-social:active {
          border-color: #75FB90; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.5); }
        .fft-social:hover .fft-social-fill, .fft-social:focus-visible .fft-social-fill,
        .fft-social:active .fft-social-fill { transform: scaleX(1); }
        .fft-social:hover .fft-social-mark, .fft-social:focus-visible .fft-social-mark,
        .fft-social:active .fft-social-mark { background: rgba(16,18,20,.16); transform: translateX(2px); }
        .fft-social:hover .fft-social-mark svg, .fft-social:focus-visible .fft-social-mark svg,
        .fft-social:active .fft-social-mark svg { fill: #101214; }
        .fft-social:hover .fft-social-label, .fft-social:focus-visible .fft-social-label,
        .fft-social:active .fft-social-label { color: #101214; transform: translateX(3px); }
        .fft-social:hover .fft-social-arrow, .fft-social:focus-visible .fft-social-arrow,
        .fft-social:active .fft-social-arrow { opacity: 1; transform: translateX(0); color: #101214; }
        /* Small circular icon links for the bottom-right social row, replacing the full-width
           named rows above -- same size, filled-brand-color-circle treatment, and position Jeton
           uses for its Instagram/Facebook/X icons (solid red-orange circles, white glyphs, no
           hover-only reveal) at the very bottom of its own footer, just before the language
           selector / "Made by Büro" row. Fermor's mint green fill stands in for Jeton's red,
           matching the wordmark. */
        .fft-social-icon { display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 50%; background: #fff;
          color: #101214; flex-shrink: 0;
          transition: background .22s ease, transform .22s ease; }
        .fft-social-icon svg { fill: currentColor; }
        .fft-social-icon:hover, .fft-social-icon:focus-visible { background: #fff; transform: translateY(-2px); }
        /* App store badges. Jeton's own badges are an outlined pill, icon on the left, two
           lines of text stacked (small "GET IT ON" caption over the bold store name) --
           matched here in Fermor's palette (mint border/text on transparent instead of
           Jeton's red). href="#" until the app actually ships; see the comment above where
           these render. */
        .fft-store-badge { display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px; border: 1px solid rgba(255,255,255,.5); border-radius: 8px;
          color: #fff; text-decoration: none;
          transition: border-color .22s ease, background .22s ease; }
        .fft-store-badge:hover, .fft-store-badge:focus-visible { border-color: #fff; background: rgba(255,255,255,.08); }
        .fft-store-badge svg { flex-shrink: 0; }
        .fft-store-badge span { display: flex; flex-direction: column; line-height: 1.2;
          font-family: var(--font-inter), Inter, sans-serif; font-weight: 700; font-size: 13px; }
        .fft-store-badge span em { font-style: normal; font-weight: 500; font-size: 8.5px;
          letter-spacing: .04em; color: rgba(255,255,255,.7); }
        /* Compliance text. Jeton's reference style: bold, prominent, normal case, sans-serif, brand color.
           Fermor's mint green (#75FB90) replaces Jeton's red, matching the wordmark. */
        .fft-legal { font-family: var(--font-inter), Inter, sans-serif;
          font-size: 9.5px; line-height: 1.85; letter-spacing: 0;
          text-transform: none; color: #fff; }
        .fft-legal p { margin: 0 0 16px; }
        .fft-legal p:first-child { color: #fff; font-weight: 700; }
        .fft-legal p:last-child { margin-bottom: 0; }
        @media (max-width: 759px) {
          .fft-legal { font-size: 7.5px; line-height: 1.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fft-link, .fft-link::after, .fft-social, .fft-social-fill, .fft-social-mark,
          .fft-social-label, .fft-social-arrow { transition: none; }
          .fft-link:hover, .fft-social:hover, .fft-social:active { transform: none; }
          .fft-social:hover .fft-social-mark, .fft-social:active .fft-social-mark,
          .fft-social:hover .fft-social-label, .fft-social:active .fft-social-label,
          .fft-social:hover .fft-social-arrow, .fft-social:active .fft-social-arrow { transform: none; }
        }

        /* Continues AppPromo's curtain image at the exact pixel it ends on - one background
           declaration, one file, no second layer and no fade to paper over a join.

           Root cause of the seam this replaces: AppPromo's curtain is a 164vh-tall element,
           background-size: cover. At the moment its reveal finishes (e=1), it sits translated to
           -60vh (desktop) / -43.4vh (mobile - AppPromo.tsx's END / END_M), and that translate is
           exactly tuned so the section's own bottom edge reaches the bottom of the viewport at
           that same instant. So the image data this footer needs to continue from is a known,
           fixed coordinate in the SAME image, not a guess: local curtain-image y = 100vh - END,
           which is 160vh on desktop and 143.4vh on mobile - unchanged from the previous version
           of this comment, because the coordinate math was never the broken part.

           What was broken: the source photo is only 914px tall, and background-size: auto 164vh
           reproduces the curtain's own "cover" scale exactly for this box (both boxes are inset
           by the identical --fp-inset on each side - see the main-plus-footer rule in
           SectionPanels.tsx - so they resolve to the same width, and height is the constraining
           dimension for both at every real viewport aspect ratio). At that scale the curtain's
           own reveal already spends 160 of the image's 164vh by the time it finishes, leaving
           only ~4vh of real, matching pixels before the crop runs out - nowhere near enough to
           cover the FAQ band on a real device, so the previous version faded to an independently
           -scaled second copy after 480px, which is exactly the kind of seam-hiding overlay this
           rewrite removes. CONTINUED_BG_IMAGE now points at a taller, mirror-tiled build of the
           identical source photo (CONTINUED_BG_UNITS repeats of it, see the constant's doc
           comment above) at the SAME per-pixel scale, so "background-position: center -160vh"
           still lands on the exact same pixels it always did, and there is simply far more real
           image below that point to scroll into - CONTINUED_BG_UNITS * 164vh of it - before the
           crop could ever run out again. */
        .faq-continuity-bg {
          position: relative;
          background-image: url(${CONTINUED_BG_IMAGE});
          background-size: auto ${CONTINUED_BG_UNITS * 164}vh;
          background-position: center -160vh;
          background-repeat: no-repeat;
        }
        @media (max-width: 759px) {
          .faq-continuity-bg {
            background-position: center -143.4vh;
          }
        }
      `}</style>

      {/* FAQ band. Homepage only: /resources renders the same footer with `minimal`, which drops
          this whole light block and leaves the black panel below it.

          The background is AppPromo's own curtain image, continued at the exact coordinate the
          curtain's reveal ends on (see .faq-continuity-bg above) rather than a flat colour that
          merely looks similar or an independently-positioned crop that happens to be close. Only
          the bottom rounds off, against the black panel below, in the same radius token every
          other panel boundary uses - the top stays square, welded to Section 5 exactly as the
          flat colour used to be. */}
      {!minimal && (
      <div className="faq-continuity-bg" style={{
        paddingTop: bp.m ? 56 : 88,
        paddingBottom: bp.m ? 56 : 88,
        borderBottomLeftRadius: 'var(--fp-r, 40px)',
        borderBottomRightRadius: 'var(--fp-r, 40px)',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: bp.m ? '0 22px' : '0 28px' }}>
          <HomeFAQ />
        </div>
      </div>
      )}

      {/* The black footer proper, a panel of its own: rounded top corners meeting the light
          block's rounded bottom, with the page ground showing through the notch between them.
          <footer> itself no longer paints, so that notch is not filled in. Its bottom corners
          are still rounded by the SectionPanels rule, which clips this child. */}
      {/* Bottom padding: 48/36, not the 140/84 this briefly was. That larger figure was sized to
          give the store-badges row room above the wordmark, but it was being applied AFTER the
          compliance text too (this padding wraps everything, wordmark and legal text included),
          so it was leaving a large dead gap between the compliance paragraph -- the actual last
          line of content -- and the panel's real bottom edge. The badges-row spacing lives on
          that row's own marginTop instead (see below); this padding only needs to close the
          panel out tightly under the compliance text now. */}
      <div style={{ backgroundColor: '#000000', backgroundImage: unified ? "url('/images/footer/purple-gradient-bg.webp')" : "url('/images/footer/purple-gradient-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderTopLeftRadius: 'var(--fp-r, 40px)', borderTopRightRadius: 'var(--fp-r, 40px)', paddingBottom: bp.m ? 36 : 48, paddingTop: minimal ? (bp.m ? 8 : 16) : 0 }}>

      {/* Link columns sit in their own centered container (max 1040px) instead of running to the
          panel edges. Desktop uses four content-width tracks with space-between, so the first
          column starts on the container's left edge, the last ends on its right edge, and the
          gaps between all four are identical -- balanced about the page centre however long each
          list is, with no dead strip on one side. The store badges and social icons share one row
          underneath, badges on the left edge and icons on the right edge of that same container.
          The wordmark and legal text below stay full-bleed. */}
      <div style={{ padding: bp.m ? '76px 8px 0' : '150px 16px 0' }}>
        {!bp.m && (
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: bp.t ? '1fr 1fr' : `repeat(${cols.length}, auto)`,
              justifyContent: bp.t ? 'stretch' : 'space-between',
              gap: bp.t ? 40 : 34,
              alignItems: 'start',
            }}>
              {cols.map((col, ci) => (
                <div key={col.h}>
                  <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 18, letterSpacing: '.11em', textTransform: 'uppercase' }}>{col.h}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '11px 26px', justifyItems: 'start' }}>
                    {col.items.map(it => (
                      <FooterLink key={it.l} href={it.href} style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>
                        {it.l}
                      </FooterLink>
                    ))}
                    {/* Sitemap (unified footer only): the last item of the last column, so it sits with the
                        other links where a visitor looks. The mobile layout below renders its own row instead
                        of this, so exactly one Sitemap link exists at any width. */}
                    {unified && ci === cols.length - 1 && (
                      <FooterLink href="/sitemap.xml" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>
                        Sitemap
                      </FooterLink>
                    )}
                  </div>
                  {bp.t && ci === cols.length - 1 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 26 }}>
                      <SocialIcons />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* App store badges (left) and social icons (right). Neither app exists yet, so the
                badges point at '#' like the placeholder SOCIALS above; only the href needs to
                change once the store listings are live. */}
            {!bp.t && (
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginTop: 64 }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <StoreBadges />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <SocialIcons />
                </div>
              </div>
            )}
          </div>
        )}

        {/* True mobile only: accordion sections instead of the grid used above (that grid is
            not rendered on mobile -- see the `!bp.m &&` just above -- since a
            single-column stack has no multi-column row to align against in the first place).
            Matches Jeton's own mobile footer: every section starts closed with a "+", store
            badges and social icons come after all the sections rather than nested inside one of
            them, in that same relative order Jeton uses (sections, then badges, then socials,
            then the wordmark + compliance text that already follow outside this block). */}
        {bp.m && (
          <div style={{ marginTop: 8 }}>
            {cols.map(col => (
              <FooterAccordionSection
                key={col.h}
                col={col}
                open={!!openMobile[col.h]}
                onToggle={() => setOpenMobile(prev => ({ ...prev, [col.h]: !prev[col.h] }))}
              />
            ))}
            {/* Sitemap (unified footer only): a heading-style row, always visible, never inside an accordion. */}
            {unified && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,.14)' }}>
                <FooterLink href="/sitemap.xml" style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '18px 2px', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 15, fontWeight: 700 }}>
                  Sitemap
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#75FB90" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </FooterLink>
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: unified ? 8 : 30, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,.14)' }}>
              <StoreBadges />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
              <SocialIcons />
            </div>
          </div>
        )}
        </div>

        {/* Big wordmark, full-bleed across the whole black panel rather than boxed into the
            1240px content column above. Jeton's own "Jeton" wordmark runs edge-to-edge on the
            page, not constrained to a centered content column, so this sits outside that
            maxWidth:1240 wrapper (closed just above). Rendered as SVG text with textLength --
            see the comment on the svg below for why (a vw-relative CSS fontSize was tried in
            between and reverted: it needs the vw ratio hand-tuned against the real rendered
            container width, and the first guess landed visibly short of edge-to-edge instead of
            matching it). This is a second, separate wordmark from the light-ground one earlier
            in the file (in the FAQ block) -- that one stays put; this one exists because Jeton's
            black panel has its own logo moment right at the bottom, immediately before the legal
            text. */}
        {/* Top margin bumped from 100/64 to 160/100 -- with the badges/social row now sitting
            directly above this (instead of the old plain link columns), the wordmark was
            landing right on top of it with barely a beat between two very different visual
            weights (small bordered buttons vs. a ~290-unit wordmark). More air here reads as
            an intentional section break instead of a cramped stack. */}
        {unified ? <RevealWordmark m={bp.m} /> : <HangingWordmark m={bp.m} />}

        {/* Disclaimer. Full-bleed like the wordmark just above it, not boxed into the 1240px
            content column: Jeton's own compliance paragraph runs at the same wide measure as
            its "Jeton" logo, wrapping across nearly the full viewport rather than a narrower
            centered column, so this matches that instead of reverting to the 1240px wrapper the
            link columns above still use. It carries no separate copyright line, which is why the
            old copyright row that used to sit here is gone: two different copyright lines on one
            page would contradict each other. No border above it either: Jeton runs its
            compliance text straight on from the wordmark with no divider line. */}
        <div className="fft-legal" style={{ marginTop: bp.m ? 40 : 56, paddingLeft: bp.m ? 8 : 16, paddingRight: bp.m ? 8 : 16 }}>
          {FOOTER_LEGAL.map((para, i) => <p key={i}>{para}</p>)}
          {/* Optional extra line for a page whose old footer carried its own (e.g. a calculator's
              "Results are indicative" line). Nothing renders unless a page passes it. */}
          {legalNote && <p>{legalNote}</p>}
        </div>
      </div>

    </footer>
  );
}
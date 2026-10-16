'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useBP, useReveal, useRepeatReveal, type BP, type IconProps, type IconComp } from './hooks';
import { Footer } from './Footer';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import NewsCarousel from './NewsCarousel';
import AppPromo from './AppPromo';
import AskAnything from './AskAnything';
import DeepRecaps from './DeepRecaps';
/* FermorDashboardSection (the four 'Show your potential' cards) is kept in the tree but not
   rendered - StartShowcase (the hand + phone / IPO-Stocks-Goals showcase) replaced it and is
   back in band 3 below. See unused-components-fi.md. */
import StartShowcase from './StartShowcase';
/* SharedMoneySection (the "Manage money together" circle) is intentionally still exported from
   ForecastSection and left untouched there, but is no longer rendered: band 4 now opens with the
   Unify showcase. The circle and its ripple hook stay in the codebase for reuse. */
import { ForecastSection } from './ForecastSection';
import UnifyShowcase from './UnifyShowcase';
import SectionPanels from './SectionPanels';
import FloatingNav from './FloatingNav';

const HeroGlobe = dynamic(() => import('./HeroGlobe'), { ssr: false });

/* The browser's own scroll restoration ('auto', the default) tries to put a returning visitor
   back where they left off on a back/forward navigation, by restoring window.scrollY before this
   page's own scroll-driven pins (the hero's GSAP ScrollTrigger, the hand-and-phone and Unify
   sections' hand-rolled pins) have measured anything. Those pins then compute their geometry
   against a scroll position the browser just moved them to rather than the one the page loaded
   at, which is what a "the page jumped on load" report usually turns out to be on a page this
   scroll-heavy. Every pin here already restores its own resting composition from a plain
   scroll-progress read (see each section's own comments), so there is nothing worth restoring
   at the browser level in the first place; manual is the standard fix for exactly this class of
   page. Set once at module scope, as early as this client bundle runs, rather than inside an
   effect that would not fire until after React has already committed the first paint. */
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/* ============================================================
   COLOUR CONSTANTS
   Light grey, grey, charcoal, black, and one accent. DG is the charcoal the duotone icons and
   the phone health card are drawn in; LM and LM2 are both the single accent, kept as two names
   only so the call sites that distinguish a resting from a settled state still read.
   ============================================================ */
const DG = '#1F2225';
const LM = '#75FB90';
const LM2 = '#75FB90';

/* The two band grounds the homepage alternates between. The light one is a very light neutral
   grey rather than white, so the panels read as surfaces sitting on the dark frame instead of
   as holes in it. The dark one is deliberately a shade lighter than the frame ground
   (--fp-ground, #0D0F10): at the same value the rounded corners, the side gutters and the
   recede animation were all invisible, because there was nothing for them to be seen against. */
const SECTION_LIGHT = '#F2F3F4';
const SECTION_DARK = '#1A1C1E';

/* ============================================================
   ATOM COMPONENTS
   ============================================================ */
function BtnDark({ children, onClick, lg, style, asSpan }: {
  children: React.ReactNode; onClick?: () => void; lg?: boolean; style?: React.CSSProperties; asSpan?: boolean;
}) {
  const s = { background: '#101214', color: '#fff', border: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: lg ? 17 : 15, fontWeight: 600, padding: lg ? '15px 32px' : '11px 22px', borderRadius: 12, cursor: 'pointer', transition: 'transform .15s,box-shadow .15s', letterSpacing: '-.01em', display: 'inline-block', whiteSpace: 'nowrap', ...style };
  const ev = { onMouseOver: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 26px rgba(20,20,15,.22)'; }, onMouseOut: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; } };
  return asSpan ? <span style={s} {...ev}>{children}</span> : <button onClick={onClick} style={s} {...ev}>{children}</button>;
}

function BtnLime({ children, onClick, lg, style, asSpan }: {
  children: React.ReactNode; onClick?: () => void; lg?: boolean; style?: React.CSSProperties; asSpan?: boolean;
}) {
  const s = { background: 'var(--lime)', color: '#101214', border: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: lg ? 17 : 15, fontWeight: 700, padding: lg ? '15px 32px' : '11px 22px', borderRadius: 12, cursor: 'pointer', transition: 'transform .15s,box-shadow .15s', letterSpacing: '-.01em', display: 'inline-block', ...style };
  const ev = { onMouseOver: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 26px rgba(117,251,144,.45)'; }, onMouseOut: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; } };
  return asSpan ? <span style={s} {...ev}>{children}</span> : <button onClick={onClick} style={s} {...ev}>{children}</button>;
}

function BtnGhost({ children, onClick, lg, style, asSpan }: {
  children: React.ReactNode; onClick?: () => void; lg?: boolean; style?: React.CSSProperties; asSpan?: boolean;
}) {
  const s = { background: 'transparent', color: '#101214', border: '1.5px solid #101214', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: lg ? 17 : 15, fontWeight: 600, padding: lg ? '13.5px 30px' : '9.5px 20px', borderRadius: 12, cursor: 'pointer', transition: 'background .15s,color .15s', letterSpacing: '-.01em', display: 'inline-block', whiteSpace: 'nowrap', ...style };
  const ev = { onMouseOver: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = '#101214'; (e.currentTarget as HTMLElement).style.color = '#fff'; }, onMouseOut: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#101214'; } };
  return asSpan ? <span style={s} {...ev}>{children}</span> : <button onClick={onClick} style={s} {...ev}>{children}</button>;
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: light ? 'var(--lime)' : '#5B6065', marginBottom: 18 }}>
      <span style={{ width: 22, height: 2, background: 'currentColor', borderRadius: 2 }} />
      {children}
    </div>
  );
}

function ArrowR({ c = 'currentColor', s = 18 }: { c?: string; s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function Check({ c = '#75FB90', s = 18 }: { c?: string; s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}

/* ============================================================
   DUOTONE ICON SET  (charcoal stroke + accent fill at low opacity)
   ============================================================ */
function mk(paths: React.ReactNode): IconComp {
  return function Icon({ size = 30 }: IconProps) {
    return <svg width={size} height={size} viewBox="0 0 40 40" fill="none">{paths}</svg>;
  };
}

const I: Record<string, IconComp> = {};
I.insurance = mk(<><path d="M20 5l12 4v9c0 8-5.4 12.6-12 15-6.6-2.4-12-7-12-15V9z" fill={LM} fillOpacity=".35" stroke={DG} strokeWidth="2.4" strokeLinejoin="round" /><path d="M14 20l4 4 8-9" stroke={DG} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></>);
I.loans = mk(<><rect x="6" y="11" width="28" height="19" rx="3" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" /><circle cx="20" cy="20.5" r="5" stroke={DG} strokeWidth="2.4" /><path d="M20 17.5v6M18 19h3.2a1.6 1.6 0 010 3.2H18.6" stroke={DG} strokeWidth="1.8" strokeLinecap="round" fill="none" /></>);
I.creditcard = mk(<><rect x="5" y="9" width="30" height="22" rx="3.5" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" /><path d="M5 16h30" stroke={DG} strokeWidth="2.4" /><rect x="10" y="22" width="9" height="3.4" rx="1.7" fill={DG} /></>);
I.bank = mk(<><path d="M6 17l14-9 14 9" fill={LM} fillOpacity=".35" stroke={DG} strokeWidth="2.4" strokeLinejoin="round" /><path d="M10 17v11M16 17v11M24 17v11M30 17v11" stroke={DG} strokeWidth="2.4" strokeLinecap="round" /><path d="M6 31h28" stroke={DG} strokeWidth="2.6" strokeLinecap="round" /></>);
I.investing = mk(<><path d="M7 27l8-8 6 4 11-13" fill="none" stroke={DG} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M26 10h6v6" stroke={DG} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 27l8-8 6 4 11-13V31H7z" fill={LM} fillOpacity=".28" /></>);
I.taxes = mk(<><rect x="9" y="5" width="22" height="30" rx="3" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" /><circle cx="16" cy="14" r="2.2" stroke={DG} strokeWidth="2" /><circle cx="24" cy="24" r="2.2" stroke={DG} strokeWidth="2" /><path d="M15 25L25 13" stroke={DG} strokeWidth="2.4" strokeLinecap="round" /></>);
I.creditscore = mk(<><path d="M6 26a14 14 0 0128 0" fill={LM} fillOpacity=".28" stroke={DG} strokeWidth="2.4" strokeLinecap="round" /><path d="M20 26l7-7" stroke={DG} strokeWidth="2.6" strokeLinecap="round" /><circle cx="20" cy="26" r="2.8" fill={DG} /></>);
I.schemes = mk(<><circle cx="20" cy="14" r="6" fill={LM} fillOpacity=".35" stroke={DG} strokeWidth="2.4" /><path d="M20 20l3.2 6-3.2-2-3.2 2z" fill={DG} /><path d="M9 33c1.5-5 6-7 11-7s9.5 2 11 7" fill={LM} fillOpacity=".25" stroke={DG} strokeWidth="2.2" strokeLinecap="round" /></>);
I.career = mk(<><rect x="6" y="13" width="28" height="18" rx="3" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" /><path d="M15 13v-3a3 3 0 013-3h4a3 3 0 013 3v3" stroke={DG} strokeWidth="2.4" /><path d="M6 21h28" stroke={DG} strokeWidth="2.2" /></>);
I.sme = mk(<><path d="M8 16l2-6h20l2 6" fill={LM} fillOpacity=".35" stroke={DG} strokeWidth="2.2" strokeLinejoin="round" /><rect x="8" y="16" width="24" height="15" rx="2" fill={LM} fillOpacity=".18" stroke={DG} strokeWidth="2.4" /><rect x="16" y="22" width="8" height="9" fill={DG} /></>);
I.retirement = mk(<><circle cx="20" cy="16" r="7" fill={LM} fillOpacity=".35" stroke={DG} strokeWidth="2.4" /><path d="M20 7v3M29 16h3M8 16h3M26 10l2-2M14 10l-2-2" stroke={DG} strokeWidth="2" strokeLinecap="round" /><path d="M7 33h26" stroke={DG} strokeWidth="2.6" strokeLinecap="round" /></>);
I.realestate = mk(<><path d="M7 18l13-10 13 10" fill="none" stroke={DG} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /><rect x="11" y="18" width="18" height="14" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" /><rect x="17" y="24" width="6" height="8" fill={DG} /></>);
I.fintech = mk(<><rect x="11" y="5" width="18" height="30" rx="4" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" /><circle cx="20" cy="29" r="1.8" fill={DG} /><path d="M16 13h8M16 17h5" stroke={DG} strokeWidth="2" strokeLinecap="round" /></>);
I.tools = mk(<><circle cx="20" cy="20" r="13" fill={LM} fillOpacity=".25" stroke={DG} strokeWidth="2.4" /><circle cx="20" cy="20" r="4" fill={DG} /><path d="M20 7v4M20 29v4M7 20h4M29 20h4" stroke={DG} strokeWidth="2.4" strokeLinecap="round" /></>);
I.salary = mk(<><circle cx="20" cy="20" r="13" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" /><path d="M16 14h8M16 18h8M18 14c3 0 3 5-.5 5h-1.5l6 6" stroke={DG} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>);
I.shield = mk(<><path d="M20 5l12 4v9c0 8-5.4 12.6-12 15-6.6-2.4-12-7-12-15V9z" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2.4" strokeLinejoin="round" /></>);
I.gdp = mk(<><path d="M7 33h26" stroke={DG} strokeWidth="2.2" strokeLinecap="round" /><rect x="9" y="24" width="5" height="9" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2" /><rect x="17.5" y="17" width="5" height="16" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2" /><rect x="26" y="9" width="5" height="24" fill={LM} fillOpacity=".3" stroke={DG} strokeWidth="2" /><path d="M9 14l7-6 6 4 8-7" fill="none" stroke={DG} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></>);

/* ============================================================
   DATA
   ============================================================ */
interface Plan { id: string; l: string; ic: IconComp; href: string; }
const PLANS: Plan[] = [
  { id: 'insurance', l: 'Insurance', ic: I.insurance, href: '/calculators' },
  { id: 'loans', l: 'Loans', ic: I.loans, href: '/calculators/emi-calculator' },
  { id: 'creditcard', l: 'Credit Cards', ic: I.creditcard, href: '/credit-cards' },
  { id: 'bank', l: 'Banking', ic: I.bank, href: '/calculators/fd-calculator' },
  { id: 'investing', l: 'Investing', ic: I.investing, href: '/calculators/sip-calculator' },
  { id: 'mutualfunds', l: 'Mutual Fund NAV', ic: I.investing, href: '/mutual-funds' },
  { id: 'taxes', l: 'Taxes', ic: I.taxes, href: '/tax' },
  { id: 'citytax', l: 'Tax Guides by City', ic: I.taxes, href: '/tax/by-city' },
  { id: 'creditscore', l: 'Credit Score & Health', ic: I.creditscore, href: '/calculators' },
  { id: 'schemes', l: 'Schemes & Benefits', ic: I.schemes, href: '/calculators' },
  { id: 'career', l: 'Career & Salary', ic: I.career, href: '/calculators/in-hand-salary-calculator' },
  { id: 'sme', l: 'SME Finance', ic: I.sme, href: '/calculators' },
  { id: 'retirement', l: 'Retirement', ic: I.retirement, href: '/calculators/swp-calculator' },
  { id: 'ppf', l: 'PPF Savings', ic: I.schemes, href: '/calculators/ppf-calculator' },
  { id: 'nps', l: 'NPS Pension', ic: I.shield, href: '/calculators/nps-calculator' },
  { id: 'realestate', l: 'Real Estate', ic: I.realestate, href: '/calculators/home-loan-calculator' },
  { id: 'fintech', l: 'Fintech & Products', ic: I.fintech, href: '/calculators' },
  { id: 'tools', l: 'Tools & more', ic: I.tools, href: '/calculators' },
  { id: 'gdphub', l: 'GDP by Country', ic: I.gdp, href: '/gdp' },
  { id: 'gdpranking', l: 'World GDP Ranking', ic: I.gdp, href: '/blogs/world-gdp-ranking-2026' },
];

interface Product { id: string; tag: string; title: string; ic: IconComp; blurb: string; screen: string; href: string; }
const PRODUCTS: Product[] = [
  { id: 'invest', tag: 'Investing', title: 'Fermor Invest', ic: I.investing, href: '/calculators/sip-calculator', blurb: 'Understand SIPs, mutual funds and stocks before you commit a single rupee. Compare categories, project returns, and start with what you already have.', screen: 'invest' },
  { id: 'bank', tag: 'Banking', title: 'Fermor Banking', ic: I.bank, href: '/calculators/fd-calculator', blurb: 'See real savings and FD rates side by side, sweep-in accounts explained, and find where your idle cash actually works hardest for you.', screen: 'bank' },
  { id: 'tax', tag: 'Tax & Salary', title: 'Fermor Tax', ic: I.taxes, href: '/tax', blurb: 'Turn your CTC into real take-home, compare the old and new regimes, and know exactly what you owe and what you can save under 80C.', screen: 'tax' },
  { id: 'retire', tag: 'Retirement', title: 'Fermor Retire', ic: I.retirement, href: '/calculators/ppf-calculator', blurb: 'Plan your NPS, PPF and EPF in one view. See how today\'s contributions compound into the retirement corpus you\'ll actually need.', screen: 'retire' },
];

/* ============================================================
   PHONE SHELL + DASHBOARD
   ============================================================ */
/* The lit part of the phone. Shared by the CSS phone shell and by the 3D phone, which
   snapshots this exact subtree into its screen texture, so the two can never drift apart. */
function PhoneScreenSurface({ children, w, radius, notch = true }: { children: React.ReactNode; w: number; radius: number; notch?: boolean }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#F2F3F4', borderRadius: radius, overflow: 'hidden', position: 'relative' }}>
      {notch && <div style={{ position: 'absolute', top: w * 0.03, left: '50%', transform: 'translateX(-50%)', width: w * 0.30, height: w * 0.052, background: '#101214', borderRadius: 20, zIndex: 5 }} />}
      {children}
    </div>
  );
}

function Phone({ children, w = 300, style }: { children: React.ReactNode; w?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ width: w, aspectRatio: '300/620', background: '#101214', borderRadius: w * 0.13, padding: w * 0.027, boxShadow: '0 40px 90px rgba(16,18,20,.28),0 8px 26px rgba(16,18,20,.16)', position: 'relative', ...style }}>
      <PhoneScreenSurface w={w} radius={w * 0.105}>{children}</PhoneScreenSurface>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 16px 4px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#101214' }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="10" viewBox="0 0 18 12" fill="#101214"><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="4" width="3" height="8" rx="1" /><rect x="10" y="1.5" width="3" height="10.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".35" /></svg>
        <svg width="15" height="11" viewBox="0 0 16 12" fill="none" stroke="#101214" strokeWidth="1.4"><path d="M1 4.5C3 2.5 13 2.5 15 4.5M3 7C5 5.4 11 5.4 13 7M5.5 9.3c1.4-1 3.6-1 5 0" /></svg>
        <svg width="22" height="11" viewBox="0 0 26 12" fill="none"><rect x="1" y="1" width="21" height="10" rx="2.5" stroke="#101214" strokeWidth="1.2" /><rect x="3" y="3" width="15" height="6" rx="1" fill="#101214" /><rect x="23" y="4" width="2" height="4" rx="1" fill="#101214" /></svg>
      </div>
    </div>
  );
}

/* The globe's cut.
   The lower part of the sphere dissolves into the page rather than being sliced off, so the
   edge reads as a deliberate horizon instead of a crop accident. The one stop that moves is
   --globe-cut: where the falloff finishes, as a percentage of the canvas. At rest it is a big
   arc filling the fold, and this is its resting/only state: the hero no longer pins and shrinks
   it on scroll (that timeline lived in FermorPhone3D and was specific to revealing the 3D phone;
   see unused-components-fi.md). The three softer stops are derived from the one moving stop, so
   the falloff shape holds constant. */
const GLOBE_CUT =
  'linear-gradient(to bottom, #000 0%, #000 calc(var(--globe-cut, 54%) - 34%), rgba(0,0,0,.72) calc(var(--globe-cut, 54%) - 18%), rgba(0,0,0,.3) calc(var(--globe-cut, 54%) - 7%), rgba(0,0,0,0) var(--globe-cut, 54%))';

/* Hit-testing stops at the cut too, so the invisible lower part of the canvas cannot swallow
   hovers or drags meant for the copy underneath it. --globe-clip is the inset from the bottom;
   the timeline opens it to 0 alongside --globe-cut so the revealed full sphere is not
   re-cropped by the clip. */
const GLOBE_CLIP = 'inset(0 0 var(--globe-clip, 48%) 0)';

/* ------------------------------------------------------------------ hero waitlist
   One control, not a field sitting next to a button: the pill is the bordered surface and
   the input inside it is chromeless, so the lime action reads as part of the same object.
   Posts to /api/waitlist, the same route the calculator sign-up cards use. The placeholder
   colour lives in globals.css (.hero-waitlist-input::placeholder) because a pseudo-element
   cannot be reached from an inline style. */
function HeroWaitlist({ mobile }: { mobile: boolean }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const busy = state === 'sending' || state === 'done';

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const value = email.trim();
    if (!value.includes('@') || !value.includes('.')) { setState('error'); return; }
    setState('sending');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'homepage-hero' }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  const msg =
    state === 'done' ? "You are on the list. We will be in touch." :
    state === 'error' ? 'That did not go through. Check the address and try again.' : '';

  return (
    <form onSubmit={submit} noValidate style={{ maxWidth: 520, margin: '0 auto', width: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: '#fff', border: '1px solid #E1E3E5', borderRadius: 999,
        padding: mobile ? 5 : 6, boxShadow: '0 6px 22px rgba(16,18,20,.07)',
      }}>
        <input
          className="hero-waitlist-input"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-label="Email address"
          placeholder="example@gmail.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
          disabled={state === 'done'}
          style={{
            flex: 1, minWidth: 0, width: '100%',
            border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: mobile ? 14.5 : 16, color: '#101214',
            padding: mobile ? '10px 12px' : '12px 18px',
          }}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            flexShrink: 0, background: state === 'done' ? LM2 : LM, color: '#101214',
            border: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: mobile ? 13.5 : 15, fontWeight: 700, letterSpacing: '-.01em',
            padding: mobile ? '10px 16px' : '12px 26px', borderRadius: 999,
            cursor: busy ? 'default' : 'pointer', whiteSpace: 'nowrap',
            transition: 'transform .15s, box-shadow .15s, background .2s',
          }}
          onMouseOver={e => { if (busy) return; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(117,251,144,.45)'; }}
          onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          {state === 'sending' ? 'Adding...' : state === 'done' ? 'Added' : 'Waiting list'}
        </button>
      </div>
      <div
        aria-live="polite"
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13,
          color: '#5B6065', lineHeight: 1.5,
          height: msg ? 'auto' : 0, marginTop: msg ? 12 : 0, overflow: 'hidden',
        }}
      >
        {msg}
      </div>
    </form>
  );
}

/* ============================================================
   SECTION: HERO
   ============================================================ */
function Hero() {
  const bp = useBP();
  /* The hero is one vertical stack: globe on top, copy on the globe's cut edge, the video
     flowing in normal document order right after it. Every offset below is derived from one
     number, the globe's diameter, so the globe and copy keep their relationship at any width
     instead of needing per-breakpoint nudges; the video's own sizing is independent (see
     HeroVideo).

     The globe is deliberately wider than the content column and, on desktop, wider than the
     1320px container. It is absolutely positioned inside a section that clips, so growing it
     moves nothing else and cannot widen the document.

     It is bounded by height as well as width, so sizing off width alone does not make the hero
     taller than the fold on short laptops and push the top of the sphere out of frame. */
  // The globe is a big planetary arc: wider than the viewport so its curve runs off both edges,
  // and tall enough that its masked falloff clears the bottom of the fold, so the arc fills the
  // whole hero instead of fading into a grey band partway down. It sits a little below the nav
  // rather than tucked under it. This is its resting and only state now: the hero no longer
  // pins and shrinks it on scroll (that lived in FermorPhone3D, removed from the homepage; see
  // unused-components-fi.md).
  const globeSize = Math.round(Math.min(bp.w * (bp.d ? 1.5 : bp.t ? 1.75 : 2.6), 2600));
  const globeTop = Math.round(bp.h * (bp.m ? 0.05 : 0.09));
  // Where the falloff finishes, as a % of the canvas: derived so the visible arc reaches just
  // past the bottom of the fold on any screen.
  const globeCutPct = Math.max(38, Math.min(88, Math.round(((bp.h - globeTop + globeSize * 0.06) / globeSize) * 100)));
  // The clip shows a touch more than the mask so it can never crop a visible pixel.
  const globeClipPct = Math.max(0, 100 - globeCutPct - 4);
  /* The copy sits well down into the globe, the whole block landing inside the sphere rather
     than straddling its crown. The offset is capped against the viewport height so a short
     window doesn't push it uncomfortably low into the globe. Measured at 1366x768 the band
     under the copy had closed to 57px against the fold; the cap only engages on short screens,
     and at 900px and above it lands within a few pixels of where it always did. */
  const copyTop = Math.round(
    Math.min(bp.m ? 168 : bp.t ? 210 : 248, Math.max(bp.m ? 110 : 150, bp.h * (bp.m ? 0.2 : 0.27)))
  );
  // The hero video's own file is a fixed 16:9 frame (see HeroVideo below), so its box is sized
  // by width, not by the old phone's 300x620 portrait ratio. Capped per breakpoint so it never
  // outgrows the 1320px content column on desktop/tablet -- 25% larger than the first version
  // (860/740) landed on. Mobile uses a different scheme entirely (see mobileCrop on HeroVideo
  // below); this number is only a belt-and-braces ceiling there, never the binding constraint.
  const heroVideoMaxW = bp.d ? 1075 : bp.t ? 925 : 480;

  /* heroMinH is a floor, not a fixed height: it keeps the hero at least one screen tall so the
     globe/copy composition above (tuned assuming a fold-height canvas) never gets clipped short.
     It deliberately does NOT come from bp.h (window.innerHeight): on a mobile browser that value
     genuinely changes as the address bar collapses and expands while the page is scrolled, and
     bp.h tracks it live (see useBP in hooks.ts). Feeding a live-changing number into minHeight
     produced the intermittent extra band of hero background below the video: scroll down, the
     chrome collapses, innerHeight grows, minHeight grows with it -- then scroll back up, the
     chrome expands and innerHeight shrinks again, but a CSS min-height can only ever stretch a
     box, never un-stretch content that has already been laid out, so the taller measurement
     stuck around as dead space at the bottom of the section. CSS's 100svh is defined to report
     the SMALLEST the viewport can ever be (chrome fully expanded) and, by that definition,
     cannot change as chrome shows or hides on scroll -- only on an actual resize or orientation
     change. svhProbeRef is a hidden element sized to it purely so its pixel height can be read
     into a plain number here; ResizeObserver on that probe only ever fires for those genuine
     changes, never for scroll. */
  const svhProbeRef = useRef<HTMLDivElement | null>(null);
  const [stableVH, setStableVH] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = svhProbeRef.current;
    if (!el) return;
    const measure = () => setStableVH(Math.round(el.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const heroMinH = stableVH ?? Math.round(bp.h);

  // A small, deliberate gap under the waitlist box -- not a fold-chasing offset. Still measured
  // off the copy block's real rendered height (robust to webfont-swap reflow and per-breakpoint
  // line wrapping) rather than a bare constant, but only a small fraction of the room left above
  // the fold feeds into it, so in the ordinary case this resolves to videoMinGap outright; it
  // only grows past that on an unusually tall viewport, where a flat constant would look stingy.
  const videoMinGap = bp.m ? 20 : 32;
  const copyRef = useRef<HTMLDivElement | null>(null);
  const [videoGap, setVideoGap] = useState(videoMinGap);
  useLayoutEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    const measure = () => {
      const copyBottom = el.offsetTop + el.offsetHeight;
      const foldRoom = Math.max(0, heroMinH - copyBottom);
      setVideoGap(Math.max(videoMinGap, Math.round(foldRoom * 0.08)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroMinH, videoMinGap]);

  return (
    <section data-fp-top="" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(170deg,#E9EAEC 0%,#EFF0F1 46%,#F2F3F4 100%)' }}>
      {/* Invisible, contributes no layout of its own: exists purely so its own rendered height
          -- which the browser pins to 100svh, immune to a mobile address bar collapsing or
          expanding on scroll -- can be read back as a stable pixel number above. See heroMinH. */}
      <div ref={svhProbeRef} aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: 0, height: '100svh', visibility: 'hidden', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-12%', right: '-6%', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,18,20,.05),transparent 65%)', pointerEvents: 'none' }} />
      {/* The top offset is padding, not margin, deliberately: a top margin on the copy collapses
          straight through this container and drags it (and with it the absolutely positioned
          globe, whose containing block this is) down the page. */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: `${Math.round(copyTop)}px ${bp.m ? 18 : bp.t ? 24 : 28}px ${bp.m ? 32 : 48}px`, minHeight: heroMinH, position: 'relative' }}>
        {/* Copy -- sits over the globe, in front of it. */}
        <div ref={copyRef} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Soft scrim: the globe runs full strength behind the headline, so a faint
              page-coloured bloom sits between the two to keep the type readable without reading
              as a panel. */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '46%', width: bp.m ? 520 : 940, height: bp.m ? 420 : 520, transform: 'translate(-50%,-50%)', background: 'radial-gradient(ellipse at center, rgba(239,240,241,0.92) 0%, rgba(239,240,241,0.6) 42%, rgba(239,240,241,0) 72%)', pointerEvents: 'none', zIndex: -1 }} />
          <h1 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(33px,5.4vw,62px)', fontWeight: 600, color: '#101214', lineHeight: 1.07, letterSpacing: '-.025em', marginBottom: bp.m ? 12 : 16 }}>
            {/* nowrap on the first line only, and only where there is room for it: at the
                mobile end of the clamp the line is within about 20px of the viewport, so forcing
                it would overflow on the narrowest phones instead of wrapping. */}
            <span style={{ whiteSpace: bp.m ? undefined : 'nowrap' }}>Build your wealth</span>
            <br />with{' '}
            {/* The brand word carries the brand colour; no underline stroke beneath it. */}
            <span style={{ whiteSpace: 'nowrap', color: LM }}>
              Fermor
            </span>
          </h1>
          {/* Sits directly under the heading and above the input: a step down in size and
              weight from the h1, in the same dark grey the rest of the hero's secondary copy
              uses, so the hierarchy reads heading, then this, then the field. */}
          <p style={{
            margin: `0 0 ${bp.m ? 24 : 30}px`,
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: bp.m ? 15 : 18,
            fontWeight: 400,
            color: '#5B6065',
            letterSpacing: '-.005em',
          }}>
            Invest, track and plan in one place.
          </p>
          <HeroWaitlist mobile={bp.m} />
        </div>

        {/* Globe -- the dominant element, a big arc filling the hero and running off both sides.
            Absolutely positioned, so its size never feeds back into the document width; the
            section's overflow clip is what contains it.
            Pointer events are live only over the globe itself, so it stays draggable without
            swallowing clicks anywhere else in the hero. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: globeTop,
            left: '50%',
            marginLeft: -globeSize / 2,
            width: globeSize,
            height: globeSize,
            zIndex: 0,
            pointerEvents: 'none',
            ['--globe-cut' as string]: `${globeCutPct}%`,
            ['--globe-clip' as string]: `${globeClipPct}%`,
          } as React.CSSProperties}
        >
          <div
            style={{
              pointerEvents: 'auto',
              width: '100%',
              WebkitMaskImage: GLOBE_CUT,
              maskImage: GLOBE_CUT,
              WebkitClipPath: GLOBE_CLIP,
              clipPath: GLOBE_CLIP,
            }}
          >
            <HeroGlobe
              maxSize={globeSize}
              samples={bp.d ? 170000 : bp.t ? 110000 : 65000}
              particles={bp.d ? 240 : bp.t ? 170 : 110}
            />
          </div>
        </div>

        {/* Hero video -- the phone itself (FermorPhone3D) was retained in the codebase but taken
            out of the homepage; see unused-components-fi.md. This sits in normal flow below the
            waitlist box rather than overlapping the copy the way the old phone did, so it needs
            no absolute positioning here; HeroVideo below handles its own scroll-activated
            playback. */}
        <HeroVideo maxWidth={heroVideoMaxW} gapTop={videoGap} mobileCrop={bp.m} />
      </div>
    </section>
  );
}

/* ============================================================
   HERO VIDEO
   The video replacing the 3D phone. Its source file is a plain opaque 3840x2160 clip -- a pure
   white background with the phone rendered in the middle -- not a real alpha-channel video, so
   there is nothing for object-fit alone to key out. mixBlendMode: 'multiply' is what removes the
   background: multiplying white against anything leaves the destination unchanged, so the white
   frame disappears into the hero's own near-white ground. This only works because the hero sits
   on a light background; it would need a different treatment (or a real alpha-channel source)
   over a dark section.

   Multiply erases the white AROUND the phone, but the phone's own screen is also a
   mostly-white UI, so the same multiply washes it out too -- against anything but a pure white
   backdrop the screen reads as dim/tinted rather than a solid display. Fixed with a second copy
   of the same video, cropped to just the screen and composited with normal (not multiplied)
   blending on top of the first: one layer supplies the blended body, the other patches in an
   undimmed screen. Both layers actually play (see the sync effect below for why a paused,
   seek-driven screen layer was tried first and made things worse), watched for drift and
   corrected if it ever exceeds a real threshold, so they read as one playback rather than two
   clocks that can wander apart.
   ============================================================ */

/* Screen bounds, measured directly off the source file rather than guessed: sampled pixel
   luma along the phone's own center row/column on a settled frame (t=5s -- the tumble finishes
   by ~t=2.2s and the phone holds this exact pose, unchanged, for the rest of the 10s loop) to
   find the bezel/screen edges and the corner radius. Expressed as % of the video's own
   3840x2160 frame (inset() percentages resolve against the element's own box), so this clips
   correctly at any rendered size without further tuning. */
const SCREEN_CLIP = 'inset(12.04% 39.19% 10.88% 39.14% round 14.9% / 7.45%)';

/* The screen mask above is only valid for that settled pose: for the first ~2.2s of every loop
   the phone is still mid-tumble, at an angle the fixed rectangle knows nothing about, and
   compositing it there paints a plain white rectangle floating over the (correctly blended)
   base layer instead of a phone screen. The screen layer is hidden until playback clears this
   point and hidden again the instant a loop restarts it, rather than trying to track the
   screen's real, moving position during the tumble -- during that window the base layer alone
   is on screen, which is exactly how the video looked before this fix (dimmed, not broken). */
const SCREEN_SETTLE_T = 2.3;

/* Mobile-only zoom window: the phone's own bezel bounding box (also measured, not guessed),
   expanded by a small even margin on every side, in the same 3840x2160 pixel space. On a narrow
   phone viewport the un-cropped 16:9 frame leaves the phone itself under a quarter of the
   rendered width (the other ~78% is blended-away white margin) -- too small to read as a hero
   visual. Zooming to just this box, rather than the whole frame, is what makes the phone the
   dominant thing in the box on mobile; desktop/tablet have the width to show the full frame
   honestly and do. Margin trimmed from 60 to 30px (a further, deliberately slight zoom, not a
   redo of the crop) still clears the phone's own drop shadow at every measured sample point. */
const MOBILE_CROP = { left: 1440, top: 206, width: 954, height: 1780 };
const MOBILE_ZOOM = {
  // The full 3840x2160 frame's size and position expressed as % of the crop box, i.e. how much
  // bigger than the crop box the whole frame is, and how far up/left its origin sits outside
  // it. Rendering the video at this size/offset inside an overflow:hidden box shaped like the
  // crop box shows exactly that window -- a uniform zoom, so nothing stretches, and the crop
  // only ever removes margin that mixBlendMode was already erasing, never the phone itself.
  widthPct: (3840 / MOBILE_CROP.width) * 100,
  heightPct: (2160 / MOBILE_CROP.height) * 100,
  leftPct: -(MOBILE_CROP.left / MOBILE_CROP.width) * 100,
  topPct: -(MOBILE_CROP.top / MOBILE_CROP.height) * 100,
};

function HeroVideo({ maxWidth, gapTop, mobileCrop }: { maxWidth: number; gapTop: number; mobileCrop: boolean }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const baseRef = useRef<HTMLVideoElement | null>(null);
  const screenRef = useRef<HTMLVideoElement | null>(null);

  /* Both paused on load; IntersectionObserver starts them the first time the video is
     meaningfully on screen and then gets out of the way. The observer disconnects itself right
     after that first play(), which is what stops a scroll-out/scroll-back-in from ever
     restarting or re-triggering it -- there is nothing left listening to fire a second time, so
     playback just keeps looping from wherever it happens to be, exactly as a normal
     autoplaying loop would once it has started.

     Observes the wrapper, not a video element itself: in mobileCrop mode the video is rendered
     far oversized and offset (see MOBILE_ZOOM) so that only a cropped window of it shows
     through the wrapper's own overflow:hidden, which means a video's own bounding rect sits
     mostly or entirely outside the viewport even while the wrapper -- what the user actually
     sees -- is fully on screen. IntersectionObserver measures the target's own geometry, not
     how an ancestor's overflow clips it, so observing a video there never reports as
     intersecting; the wrapper is what the "has this scrolled into view" question actually needs
     to be asked of, in both modes. */
  useEffect(() => {
    const target = wrapperRef.current;
    const base = baseRef.current;
    const screen = screenRef.current;
    if (!target || !base || !screen || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          io.disconnect();
          base.play().catch(() => {
            /* browser declined autoplay (e.g. still no user gesture on this page); the video
               simply stays paused on its opening frame rather than throwing */
          });
          screen.play().catch(() => {});
        }
      },
      { threshold: 0.35 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  /* Both layers actually play -- letting the screen layer decode forward on its own, the same
     way the base layer does, is what keeps fast-changing screen content (a shimmer sweep, a
     ticking figure) crisp. The first version paused the screen layer and re-seeked it to the
     base layer's currentTime every animation frame instead, which sounds tighter but is not:
     video.currentTime on a paused element is a seek, seeking has real decode latency, and
     re-issuing one every ~16ms rarely lets the previous one finish, so the screen layer stayed
     a frame or two behind on exactly the fast-moving content -- visible as briefly doubled
     digits. Two playing videos can still drift apart over a long session, so this still watches
     for that and only corrects it -- with a real seek, same as before -- once actual drift
     exceeds DRIFT_TOLERANCE, which is loose enough that a correction is rare rather than
     constant. Either layer stalling (e.g. a buffering hiccup) is also caught here and resumed.

     The same loop also toggles the screen layer's own opacity against SCREEN_SETTLE_T (see
     above): visible once the phone has settled into the pose the screen mask was measured
     against, hidden through the tumble and hidden again the instant a loop wraps back past it. */
  useEffect(() => {
    const DRIFT_TOLERANCE = 0.15;
    let raf = 0;
    let visible = false;
    const sync = () => {
      const base = baseRef.current;
      const screen = screenRef.current;
      if (base && screen) {
        if (!base.paused && Math.abs(screen.currentTime - base.currentTime) > DRIFT_TOLERANCE) {
          screen.currentTime = base.currentTime;
        }
        if (!base.paused && screen.paused) {
          screen.play().catch(() => {});
        }
        const shouldBeVisible = base.currentTime >= SCREEN_SETTLE_T;
        if (shouldBeVisible !== visible) {
          visible = shouldBeVisible;
          screen.style.opacity = visible ? '1' : '0';
        }
      }
      raf = requestAnimationFrame(sync);
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Mobile breaks out of the hero's own side padding to claim close to the full viewport width
     (with a small, deliberate margin, not edge-to-edge) -- the padded content column caps it at
     ~350px otherwise, which the zoomed crop above cannot make "substantially larger" on its own.

     This is measured, not computed from a CSS trick: the homepage wraps every section in a
     `--fp-inset` gutter (see SectionPanels.tsx, part of the five-band "rounded panel" system,
     28px on desktop/tablet and 4px on mobile) on top of the hero's own content padding, so the
     plain `calc(-50vw + 50%)` full-bleed pattern -- which only cancels out correctly when the
     parent chain has zero padding -- landed short and, worse, mis-signed once both insets
     stacked, pushing the video off-screen entirely. Measuring the wrapper's own actual position
     sidesteps needing to know either inset number (or being broken again if either ever
     changes): read where it naturally sits, then move its left edge to MOBILE_SIDE_MARGIN from
     the true viewport edge and size it to match on the right. */
  const [mobileBleed, setMobileBleed] = useState<{ width: number; marginLeft: number } | null>(null);
  useLayoutEffect(() => {
    if (!mobileCrop) { setMobileBleed(null); return; }
    const el = wrapperRef.current;
    if (!el) return;
    const MOBILE_SIDE_MARGIN = 10;
    const measure = () => {
      // Read the natural (unbled) position from the parent rather than this element itself, so
      // the previous bleed's own margin can never feed back into the next measurement.
      const parent = el.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const parentPadLeft = parseFloat(getComputedStyle(parent).paddingLeft) || 0;
      const naturalLeft = parentRect.left + parentPadLeft;
      const viewportW = document.documentElement.clientWidth;
      const width = Math.min(viewportW - MOBILE_SIDE_MARGIN * 2, Math.min(maxWidth, 560));
      setMobileBleed({ width: Math.round(width), marginLeft: Math.round(MOBILE_SIDE_MARGIN - naturalLeft) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [mobileCrop, maxWidth]);

  const commonProps = {
    src: '/videos/fermor-phone-hero.mp4',
    muted: true,
    playsInline: true,
    controls: false as const,
    preload: 'auto' as const,
  };
  // maxWidth: 'none' on every branch, deliberately: Tailwind's Preflight (`@tailwind base`)
  // ships a plain-element reset, `img, video { max-width: 100%; height: auto }`. A stylesheet
  // rule loses to an inline style for any property the inline style actually sets -- which is
  // why the explicit inline `height` below was never affected -- but max-width is a property
  // neither branch used to set at all, so Preflight's 100% cap silently won for it regardless of
  // what `width` requested. In mobileCrop mode that clamped a video meant to render at ~379% of
  // its box back down to 100%, which (combined with the left/top offsets computed for the wider
  // size) landed the visible window on a stretch of plain background instead of the phone --
  // indistinguishable from "nothing rendered" in a screenshot, confirmed by dumping the video's
  // own computed style directly rather than trusting getBoundingClientRect() on its ancestors.
  const baseVideoStyle: React.CSSProperties = mobileCrop
    ? { position: 'absolute', left: `${MOBILE_ZOOM.leftPct}%`, top: `${MOBILE_ZOOM.topPct}%`, width: `${MOBILE_ZOOM.widthPct}%`, height: `${MOBILE_ZOOM.heightPct}%`, maxWidth: 'none', display: 'block', mixBlendMode: 'multiply' }
    : { width: '100%', height: '100%', maxWidth: 'none', objectFit: 'contain', display: 'block', mixBlendMode: 'multiply' };
  // Starts hidden (opacity 0, matching currentTime 0, which is well before SCREEN_SETTLE_T) --
  // the sync loop above takes over from here, so this is only ever the pre-hydration/first-paint
  // state. transition softens each reveal/hide into a brief crossfade rather than a hard pop.
  const screenVideoStyle: React.CSSProperties = mobileCrop
    ? { position: 'absolute', left: `${MOBILE_ZOOM.leftPct}%`, top: `${MOBILE_ZOOM.topPct}%`, width: `${MOBILE_ZOOM.widthPct}%`, height: `${MOBILE_ZOOM.heightPct}%`, maxWidth: 'none', display: 'block', clipPath: SCREEN_CLIP, opacity: 0, transition: 'opacity .15s ease' }
    : { position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', objectFit: 'contain', display: 'block', clipPath: SCREEN_CLIP, opacity: 0, transition: 'opacity .15s ease' };

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      style={{
        // Before the measurement above has run (first paint / no-JS), this renders in its
        // natural, unbled position -- centred in the padded content column like the
        // desktop/tablet case -- rather than something arbitrary; useLayoutEffect corrects it
        // to the full-bleed size before the browser ever paints that frame.
        width: mobileCrop && mobileBleed ? mobileBleed.width : '100%',
        maxWidth: mobileCrop ? Math.min(maxWidth, 560) : maxWidth,
        marginLeft: mobileCrop && mobileBleed ? mobileBleed.marginLeft : 'auto',
        marginRight: mobileCrop ? 0 : 'auto',
        aspectRatio: mobileCrop ? `${MOBILE_CROP.width} / ${MOBILE_CROP.height}` : '16 / 9',
        marginTop: gapTop,
        position: 'relative',
        overflow: mobileCrop ? 'hidden' : 'visible',
        pointerEvents: 'none',
      }}
    >
      <video ref={baseRef} {...commonProps} loop style={baseVideoStyle} />
      <video ref={screenRef} {...commonProps} loop style={screenVideoStyle} />
    </div>
  );
}

/* ============================================================
   SECTION: PLANNING GRID
   ============================================================ */
function PlanningGrid() {
  const bp = useBP();
  const [ref, seen] = useReveal();
  const cols = bp.m ? 2 : bp.t ? 4 : 7;
  return (
    <section ref={ref as any} id="planning" style={{ padding: bp.m ? '64px 18px' : '104px 28px', background: '#fff' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 44px' }}>
          <Eyebrow>Start anywhere</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(28px,4.4vw,46px)', fontWeight: 600, color: '#101214', lineHeight: 1.08, letterSpacing: '-.025em' }}>What are you planning?</h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 15 : 17, color: '#5B6065', marginTop: 14, lineHeight: 1.55 }}>Pick a goal and Fermor runs the math, compares your options, and shows you the clear next step.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: bp.m ? 12 : 16 }}>
          {PLANS.map((c, i) => (
            <Link key={c.id} href={c.href} id={'plan-' + c.id}
              style={{ position: 'relative', background: '#fff', border: '1px solid #E4E6E8', borderRadius: 16, padding: bp.m ? '18px 12px' : '22px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textDecoration: 'none', cursor: 'pointer', transition: 'opacity .2s, transform .2s, border-color .2s, box-shadow .2s', opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(16px)', transitionDelay: `${(i % cols) * 40 + Math.floor(i / cols) * 60}ms` }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#75FB90'; e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 34px rgba(16,18,20,.09)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#E4E6E8'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B9BDC1" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: 12, right: 12 }}><path d="M7 17L17 7M9 7h8v8" /></svg>
              <div style={{ width: bp.m ? 52 : 60, height: bp.m ? 52 : 60, borderRadius: 16, background: 'linear-gradient(150deg,#F3F9E6,#E9F4D2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}><c.ic size={bp.m ? 30 : 34} /></div>
              <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 12.5 : 13.5, fontWeight: 600, color: '#101214', textAlign: 'center', lineHeight: 1.25 }}>{c.l}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FEATURE ROW (reusable)
   ============================================================ */
function FeatureRow({ eyebrow, title, body, bullets, media, reverse, bg = '#fff', cta, ctaHref = '/calculators' }: {
  eyebrow: string; title: string; body: string; bullets?: string[];
  media: React.ReactNode; reverse?: boolean; bg?: string; cta?: string; ctaHref?: string;
}) {
  const bp = useBP();
  const [ref, seen] = useReveal();
  return (
    <section ref={ref as any} style={{ padding: bp.m ? '56px 18px' : '96px 28px', background: bg }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: bp.d ? '1fr 1fr' : '1fr', gap: bp.m ? 40 : 80, alignItems: 'center' }}>
        <div style={{ order: bp.d && reverse ? 2 : 1, opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(20px)', transition: 'opacity .6s ease, transform .6s ease' }}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(27px,4vw,42px)', fontWeight: 600, color: '#101214', lineHeight: 1.1, letterSpacing: '-.025em', marginBottom: 18 }}>{title}</h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 16 : 18, color: '#5B6065', lineHeight: 1.62, marginBottom: bullets ? 22 : 28, maxWidth: 480 }}>{body}</p>
          {bullets && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 30 }}>
              {bullets.map(b => (
                <div key={b} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                  <div style={{ marginTop: 1 }}><Check s={19} /></div>
                  <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 14.5 : 15.5, color: '#2A2A24', fontWeight: 500, lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          )}
          <Link href={ctaHref} style={{ textDecoration: 'none' }}><BtnDark lg asSpan>{cta ?? 'Learn more'}</BtnDark></Link>
        </div>
        <div style={{ order: bp.d && reverse ? 1 : 2, opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(20px)', transition: 'opacity .6s ease .12s, transform .6s ease .12s' }}>{media}</div>
      </div>
    </section>
  );
}

/* ---------- Stage-of-life media ---------- */
function StageMedia() {
  const bp = useBP();
  const stages = [
    { ic: I.career, l: 'Just started earning', s: 'Build the basics', c: '#fff' },
    { ic: I.realestate, l: 'Buying a home', s: 'Plan the down payment', c: '#E9EAEC' },
    { ic: I.schemes, l: 'Growing a family', s: 'Protect what matters', c: '#fff' },
    { ic: I.retirement, l: 'Near retirement', s: 'Make it last', c: '#E9EAEC' },
  ];
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '-8%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(117,251,144,.22),transparent 68%)' }} />
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: bp.m ? 12 : 16 }}>
        {stages.map((st, i) => (
          <div key={st.l} style={{ background: st.c, border: '1px solid #E7EDE0', borderRadius: 18, padding: bp.m ? '18px 16px' : '24px 22px', boxShadow: '0 8px 26px rgba(16,18,20,.06)', transform: i % 2 ? 'translateY(18px)' : 'none' }}>
            <div style={{ width: 48, height: 48, borderRadius: 13, background: '#fff', border: '1px solid #E9EAEC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><st.ic size={28} /></div>
            <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 15 : 17, fontWeight: 600, color: '#101214', marginBottom: 4 }}>{st.l}</div>
            <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, color: '#7C8186' }}>{st.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- All-in-one media ---------- */
function AllInOneMedia() {
  const bp = useBP();
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: '-6% 6%', borderRadius: 36, background: 'radial-gradient(circle at 50% 30%,rgba(117,251,144,.25),transparent 62%)' }} />
      <div style={{ position: 'relative', width: '100%', maxWidth: 430 }}>
        <div style={{ background: 'linear-gradient(160deg,#1F2225,#244B3E)', borderRadius: 26, padding: bp.m ? '26px 24px' : '34px 30px', boxShadow: '0 30px 70px rgba(20,40,28,.28)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,.65)', fontWeight: 500 }}>Your Fermor net worth</span>
            <img src="/fermor-mark-2026.svg" alt="" width={24} height={18} style={{ height: 18, width: 'auto' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 38 : 48, fontWeight: 700, color: '#fff', letterSpacing: '-.02em' }}>₹42,64,200</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(117,251,144,.16)', padding: '5px 12px', borderRadius: 20, marginTop: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: LM }}>↑ ₹1,84,000</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>this month</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 26 }}>
            {[['Investments', '₹24.1L'], ['Banking', '₹6.8L'], ['Retirement', '₹9.2L'], ['Other assets', '₹2.6L']].map(([l, v]) => (
              <div key={l} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 13, padding: '13px 14px' }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)', fontWeight: 500, marginBottom: 5 }}>{l}</div>
                <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 17 : 19, fontWeight: 600, color: '#fff' }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 4, background: 'rgba(255,255,255,.12)', overflow: 'hidden' }}>
              <div style={{ width: '68%', height: '100%', background: LM }} />
            </div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,.7)', fontWeight: 600, whiteSpace: 'nowrap' }}>68% to ₹62L goal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION: PRODUCT SHOWCASE
   ============================================================ */
function PShot({ p }: { p: Product }) {
  const screens: Record<string, React.ReactNode> = {
    invest: (
      <>
        <div style={{ background: 'linear-gradient(160deg,#1F2225,#5B6065)', padding: '30px 16px 22px' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', fontWeight: 600 }}>Invest portfolio</div>
          <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: '4px 0' }}>₹6,84,210</div>
          <div style={{ fontSize: 11, color: LM, fontWeight: 700 }}>↑ ₹54,200 (8.6%) all time</div>
          <svg viewBox="0 0 260 50" preserveAspectRatio="none" style={{ width: '100%', height: 42, marginTop: 8 }}><path d="M0 40L40 36 80 38 120 26 160 28 200 16 260 8" fill="none" stroke={LM} strokeWidth="2.4" strokeLinecap="round" /></svg>
        </div>
        <div style={{ padding: '14px 16px' }}>
          {[['Equity funds', '62%'], ['Gold & SGB', '14%'], ['Debt funds', '24%']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #E4E6E8', fontSize: 11.5 }}>
              <span style={{ color: '#5B6065', fontWeight: 500 }}>{l}</span><b style={{ color: '#101214' }}>{v}</b>
            </div>
          ))}
        </div>
      </>
    ),
    bank: (
      <div style={{ padding: '30px 16px 0' }}>
        <div style={{ fontSize: 10, color: '#8A8F94', fontWeight: 600 }}>Best savings rate found</div>
        <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 26, fontWeight: 700, color: '#101214', margin: '4px 0' }}>7.0% <span style={{ fontSize: 13, color: '#8A8F94', fontWeight: 600 }}>p.a.</span></div>
        <div style={{ display: 'inline-block', fontSize: 9.5, fontWeight: 700, color: '#5B6065', background: '#E9EAEC', padding: '3px 9px', borderRadius: 20, marginBottom: 14 }}>Digital-first bank</div>
        {[['Sweep-in FD linked', '6.5–7.5%', DG], ['Small finance bank FD', '8.0–9.0%', LM2], ['PSU savings', '2.7–3.0%', '#B9BDC1']].map(([l, r, c]) => (
          <div key={l} style={{ background: '#fff', border: '1px solid #E4E6E8', borderRadius: 12, padding: '11px 13px', marginBottom: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#101214' }}>{l}</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: c, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{r}</div>
          </div>
        ))}
      </div>
    ),
    tax: (
      <div style={{ padding: '30px 16px 0' }}>
        <div style={{ fontSize: 10, color: '#8A8F94', fontWeight: 600 }}>Monthly take-home</div>
        <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 26, fontWeight: 700, color: '#101214', margin: '4px 0' }}>₹83,200</div>
        <div style={{ fontSize: 11, color: '#5B6065', marginBottom: 14 }}>on ₹15L CTC · New regime</div>
        <div style={{ background: DG, borderRadius: 13, padding: '13px 14px', marginBottom: 10 }}>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,.6)' }}>You save vs old regime</div>
          <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: LM }}>₹18,400 / yr</div>
        </div>
        {[['Gross', '₹15,00,000'], ['Total tax', '₹1,40,000'], ['80C used', '₹1,50,000'], ['In-hand / yr', '₹9,98,400']].map(([l, v], i) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 3 ? '1px solid #E4E6E8' : 'none', fontSize: 11.5 }}>
            <span style={{ color: '#5B6065', fontWeight: 500 }}>{l}</span><b style={{ color: '#101214' }}>{v}</b>
          </div>
        ))}
      </div>
    ),
    retire: (
      <div style={{ padding: '30px 16px 0' }}>
        <div style={{ fontSize: 10, color: '#8A8F94', fontWeight: 600 }}>Projected corpus at 60</div>
        <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 26, fontWeight: 700, color: '#101214', margin: '4px 0' }}>₹4.82 Cr</div>
        <div style={{ display: 'inline-block', fontSize: 9.5, fontWeight: 700, color: '#5B6065', background: '#E9EAEC', padding: '3px 9px', borderRadius: 20, marginBottom: 16 }}>On track 🎯</div>
        <svg viewBox="0 0 260 90" style={{ width: '100%', height: 84 }}>
          <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={LM2} stopOpacity=".5" /><stop offset="1" stopColor={LM2} stopOpacity="0" /></linearGradient></defs>
          <path d="M0 80C60 76 120 60 180 34S250 8 260 6" fill="none" stroke={DG} strokeWidth="2.6" />
          <path d="M0 80C60 76 120 60 180 34S250 8 260 6V90H0Z" fill="url(#rg)" />
        </svg>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[['NPS', '₹2.1Cr'], ['PPF', '₹1.4Cr'], ['EPF', '₹1.3Cr']].map(([l, v]) => (
            <div key={l} style={{ flex: 1, background: '#fff', border: '1px solid #E4E6E8', borderRadius: 11, padding: '9px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 9, color: '#8A8F94', fontWeight: 600 }}>{l}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#101214', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  };
  return <div style={{ position: 'absolute', inset: 0, background: '#F2F3F4', fontFamily: 'var(--font-inter), Inter, sans-serif' }}><StatusBar />{screens[p.screen]}</div>;
}

function ProductShowcase() {
  const bp = useBP();
  const [idx, setIdx] = useState(0);
  const p = PRODUCTS[idx];
  const go = (d: number) => setIdx(i => (i + d + PRODUCTS.length) % PRODUCTS.length);
  return (
    <section id="products" style={{ padding: bp.m ? '64px 18px' : '104px 28px', background: '#F2F3F4', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 44px' }}>
          <Eyebrow>One platform</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(28px,4.4vw,46px)', fontWeight: 600, color: '#101214', lineHeight: 1.08, letterSpacing: '-.025em' }}>Every money decision, covered.</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: bp.m ? 8 : 12, flexWrap: 'wrap', marginBottom: bp.m ? 40 : 54 }}>
          {PRODUCTS.map((pr, i) => (
            <button key={pr.id} onClick={() => setIdx(i)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: bp.m ? '9px 14px' : '11px 20px', borderRadius: 30, border: '1.5px solid', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 13 : 14.5, fontWeight: 600, transition: 'all .2s', borderColor: idx === i ? '#101214' : '#E0E6D7', background: idx === i ? '#101214' : '#fff', color: idx === i ? '#fff' : '#5B6065' }}>
              <span style={{ display: 'flex' }}><pr.ic size={19} /></span>{pr.tag}
            </button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: bp.d ? '1fr 1fr' : '1fr', gap: bp.m ? 40 : 70, alignItems: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', order: bp.d ? 1 : 2, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-4% 12%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(117,251,144,.28),transparent 66%)' }} />
            <div style={{ position: 'relative' }} key={p.id}>
              <div aria-hidden="true" style={{ animation: 'scalePop .4s ease' }}><Phone w={bp.m ? 250 : 290}><PShot p={p} /></Phone></div>
            </div>
          </div>
          <div style={{ order: bp.d ? 2 : 1, textAlign: bp.d ? 'left' : 'center' }} key={'t' + p.id}>
            <div style={{ animation: 'fadeUp .45s ease' }}>
              <div style={{ display: 'inline-flex', width: 60, height: 60, borderRadius: 16, background: '#fff', border: '1px solid #E9EAEC', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}><p.ic size={34} /></div>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 28 : 36, fontWeight: 600, color: '#101214', letterSpacing: '-.02em', marginBottom: 16 }}>{p.title}</h3>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 16 : 18, color: '#5B6065', lineHeight: 1.62, maxWidth: 460, margin: bp.d ? '0 0 28px' : '0 auto 26px' }}>{p.blurb}</p>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', justifyContent: bp.d ? 'flex-start' : 'center' }}>
                <Link href={p.href} style={{ textDecoration: 'none' }}><BtnDark lg>Open calculator</BtnDark></Link>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => go(-1)} aria-label="prev" style={{ width: 46, height: 46, borderRadius: '50%', border: '1.5px solid #101214', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101214" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
                  </button>
                  <button onClick={() => go(1)} aria-label="next" style={{ width: 46, height: 46, borderRadius: '50%', border: '1.5px solid #101214', background: '#101214', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowR c="#fff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PLAN WISELY media: allocation donut
   ============================================================ */
function DonutMedia() {
  const bp = useBP();
  const segs = [
    { l: 'Equity', v: 42, c: DG },
    { l: 'Debt', v: 24, c: '#75FB90' },
    { l: 'Gold', v: 14, c: LM },
    { l: 'Cash', v: 12, c: '#5B6065' },
    { l: 'Intl', v: 8, c: '#9CA3AF' },
  ];
  const R = 120;
  const CIRC = 2 * Math.PI * R;
  let acc = 0;
  const computed = segs.map(s => { const len = (s.v / 100) * CIRC; const offset = acc; acc += len; return { ...s, len, offset }; });

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: '2%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(117,251,144,.16),transparent 66%)' }} />
      <div style={{ position: 'relative', background: '#fff', border: '1px solid #E4E6E8', borderRadius: 26, padding: bp.m ? '28px 22px' : '40px 36px', boxShadow: '0 20px 50px rgba(16,18,20,.08)', width: '100%', maxWidth: 430 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, color: '#8A8F94', fontWeight: 600 }}>Recommended mix</div>
            <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 20, fontWeight: 600, color: '#101214' }}>Balanced · Age 32</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#5B6065', background: '#E9EAEC', padding: '5px 11px', borderRadius: 20 }}>Diversified</span>
        </div>
        <div style={{ display: 'flex', gap: bp.m ? 16 : 28, alignItems: 'center', flexWrap: bp.m ? 'wrap' : 'nowrap', justifyContent: 'center' }}>
          <svg width="200" height="200" viewBox="0 0 300 300" style={{ flexShrink: 0, transform: 'rotate(-90deg)' }}>
            {computed.map(s => (
              <circle key={s.l} cx="150" cy="150" r={R} fill="none" stroke={s.c} strokeWidth="44"
                strokeDasharray={`${s.len} ${CIRC - s.len}`} strokeDashoffset={-s.offset} />
            ))}
            <circle cx="150" cy="150" r="96" fill="#fff" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {segs.map(s => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 12, height: 12, borderRadius: 4, background: s.c }} />
                <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13.5, color: '#5B6065', fontWeight: 500, minWidth: 54 }}>{s.l}</span>
                <b style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 14, color: '#101214' }}>{s.v}%</b>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: '1px solid #E4E6E8', display: 'flex', justifyContent: 'space-between' }}>
          {[['Expected return', '11.8% p.a.'], ['Risk level', 'Moderate'], ['Time horizon', '10+ yrs']].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: '#8A8F94', fontWeight: 600 }}>{k}</div>
              <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 17, fontWeight: 700, color: '#101214' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION: COLLAGE
   ============================================================ */
function Collage() {
  const bp = useBP();
  const [ref, seen] = useReveal();
  const cards = [
    { l: 'Investing', s: 'SIPs · funds · stocks', ic: I.investing, bg: DG, fg: '#fff', sub: 'rgba(255,255,255,.6)' },
    { l: 'Banking', s: 'Savings · FD · RD rates', ic: I.bank, bg: LM, fg: '#101214', sub: '#2B2E31' },
    { l: 'Tax & Salary', s: 'Regimes · CTC · 80C', ic: I.taxes, bg: '#fff', fg: '#101214', sub: '#7C8186' },
    { l: 'Retirement', s: 'NPS · PPF · EPF', ic: I.retirement, bg: '#5B6065', fg: '#fff', sub: 'rgba(255,255,255,.65)' },
    { l: 'Insurance', s: 'Term · health cover', ic: I.insurance, bg: '#fff', fg: '#101214', sub: '#7C8186' },
    { l: 'Learning', s: 'Guides · explainers', ic: I.fintech, bg: '#E9EAEC', fg: '#101214', sub: '#2B2E31' },
  ];
  return (
    <section ref={ref as any} style={{ padding: bp.m ? '64px 18px' : '104px 28px', background: '#fff' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow>All-in-one</Eyebrow>
        <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(28px,4.4vw,46px)', fontWeight: 600, color: '#101214', lineHeight: 1.08, letterSpacing: '-.025em', maxWidth: 680, margin: '0 auto' }}>Every money tool, in one place.</h2>
        <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 15 : 17, color: '#5B6065', marginTop: 14, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55 }}>Investing, banking, taxes, retirement and more: one platform that keeps everything about your money easy, clear and always in your control.</p>
        <div style={{ display: 'grid', gridTemplateColumns: bp.m ? '1fr 1fr' : bp.t ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: bp.m ? 14 : 22, marginTop: bp.m ? 40 : 56 }}>
          {cards.map((c, i) => (
            <div key={c.l} style={{ background: c.bg, border: c.bg === '#fff' ? '1px solid #E4E6E8' : 'none', borderRadius: 22, padding: bp.m ? '24px 20px' : '30px 26px', textAlign: 'left', boxShadow: '0 10px 30px rgba(16,18,20,.07)', opacity: seen ? 1 : 0, transform: seen ? 'none' : 'translateY(22px)', transition: `all .5s ease ${i * 70}ms` }}>
              <div style={{ width: 54, height: 54, borderRadius: 15, background: c.bg === '#fff' || c.bg === '#E9EAEC' ? '#E9EAEC' : 'rgba(255,255,255,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: bp.m ? 40 : 64 }}>
                <c.ic size={30} />
              </div>
              <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 19 : 22, fontWeight: 600, color: c.fg, marginBottom: 5 }}>{c.l}</div>
              <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13.5, color: c.sub, fontWeight: 500 }}>{c.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION: TRUST BAND
   ============================================================ */
function Trust() {
  const bp = useBP();
  const stats: [string, string][] = [['12+', 'money categories covered'], ['25+', 'free calculators & tools'], ['100%', 'independent, no commission'], ['🇮🇳', 'built for India, in ₹']];
  return (
    <section style={{ padding: bp.m ? '54px 18px' : '80px 28px', background: 'linear-gradient(120deg,#E9EAEC,#F2F3F4)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: bp.m ? '1fr 1fr' : 'repeat(4,1fr)', gap: bp.m ? 26 : 20 }}>
        {stats.map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 34 : 46, fontWeight: 700, color: '#101214', letterSpacing: '-.02em' }}>{v}</div>
            <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 13 : 14.5, color: '#5B6065', fontWeight: 500, marginTop: 6, lineHeight: 1.4 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION: CTA
   ============================================================ */
function CTA() {
  const bp = useBP();
  return (
    <section style={{ padding: bp.m ? '18px 18px' : '40px 28px', background: '#fff' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', background: 'linear-gradient(150deg,#1F2225 0%,#234A39 70%,#5B6065 130%)', borderRadius: bp.m ? 26 : 34, padding: bp.m ? '48px 26px' : '80px 70px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(117,251,144,.20),transparent 64%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 640 }}>
          <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(28px,4.4vw,48px)', fontWeight: 600, color: '#fff', lineHeight: 1.1, letterSpacing: '-.025em', marginBottom: 18 }}>Start making smarter money decisions today.</h2>
          <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 16 : 18, color: 'rgba(255,255,255,.78)', lineHeight: 1.6, marginBottom: 34, maxWidth: 520 }}>Join the Fermor community and get clarity on every rupee, free to start, no commission, no jargon.</p>
          <div style={{ display: 'flex', gap: 13, flexWrap: 'wrap' }}>
            <Link href="/calculators" style={{ textDecoration: 'none' }}><BtnLime lg asSpan>Explore free calculators</BtnLime></Link>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <span style={{ background: 'rgba(255,255,255,.1)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 17, fontWeight: 600, padding: '15px 30px', borderRadius: 12, cursor: 'pointer', display: 'inline-block' }}
                onMouseOver={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.18)'}
                onMouseOut={(e: React.MouseEvent<HTMLElement>) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.1)'}>Learn about Fermor</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================================================
   SECTION: NEWS TEASER
   ============================================================ */
function NewsTeaser() {
  const bp = useBP();
  return (
    <section style={{ padding: bp.m ? '52px 18px' : '80px 28px', background: '#fff', borderTop: '1px solid #E4E6E8' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: bp.m ? 26 : 36, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '.09em', textTransform: 'uppercase', color: '#5B6065', marginBottom: 10 }}>Blogs</div>
            <h2 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: 'clamp(24px,3.4vw,36px)', fontWeight: 600, color: '#101214', lineHeight: 1.12, letterSpacing: '-.02em' }}>
              When it matters to your portfolio.
            </h2>
          </div>
          <Link href="/blogs" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14, fontWeight: 500, color: '#1F2225', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, paddingBottom: 4 }}>
            All blogs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        <Link href="/blogs/itr-filing-last-date" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #E1E3E5', borderRadius: 16, background: '#fff', padding: bp.m ? '22px 20px' : '28px 32px', display: 'grid', gridTemplateColumns: bp.d ? '1fr auto' : '1fr', gap: bp.m ? 18 : 28, alignItems: 'center' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = '#CCCCCC'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,.06)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = '#E1E3E5'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: '#5B6065', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Income Tax</span>
                <span style={{ color: '#E1E3E5' }}>·</span>
                <span style={{ fontSize: 12.5, color: '#5B6065', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Updated Jul 27, 2026</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', fontSize: bp.m ? 17 : 21, fontWeight: 600, color: '#101214', lineHeight: 1.25, letterSpacing: '-.015em', marginBottom: 10, maxWidth: 660 }}>
                ITR Filing Last Date FY 2025-26: July 31, August 31 & October 31 Deadlines
              </h3>
              <p style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: bp.m ? 13.5 : 15, color: '#555555', lineHeight: 1.65, maxWidth: 580 }}>
                July 31 for ITR-1/ITR-2, August 31 for non-audit business income, October 31 for audit cases. No extension has been announced. Live countdown, penalty table, full extension history.
              </p>
            </div>
            {bp.d && (
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13.5, fontWeight: 500, color: '#1F2225' }}>
                Read
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </div>
            )}
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   ROOT EXPORT
   ============================================================ */
export default function HomepageClient() {
  /* The page wrapper's horizontal clip lives in SectionPanels' stylesheet, not in this style
     object. It has to be declared twice (overflow-x: hidden, then overflow-x: clip) so browsers
     without clip keep the old behaviour, and a React style object cannot express one property
     twice. It matters a great deal that this wrapper is not a scroll container: see the rule. */
  return (
    <div data-fp-page="" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', color: '#101214' }}>
      {/* Rounded-panel scroll transitions between the five bands below. Geometry only; every
          section keeps its own content and its own animations. */}
      <SectionPanels />
      {/* Fixed, so it reserves no height and the landing below starts exactly where it did.
          Kept outside <main> so it can never become an ancestor of the pinned hero. */}
      <FloatingNav />
      <main>
      {/* The homepage is five bands, alternating light and dark. Each band owns its background
          and nothing else: the parts inside keep their own padding and their own height, so a
          band is exactly as tall as what it holds. No band is pinned to the viewport and there
          is no scroll snapping anywhere. The parts themselves render their own backgrounds as
          transparent and inherit the band's, so the boundary is in one place per band. */}

      {/* 1 -- the landing. Globe, copy and the phone through its whole rise, flip and fall. */}
      <section data-section="1" style={{ background: SECTION_LIGHT }}>
        <Hero />
      </section>

      {/* 2 -- ask anything, through to the two panels that finish it. */}
      <section data-section="2" style={{ background: SECTION_DARK }}>
        <AskAnything />
        <DeepRecaps />
      </section>

      {/* 3 -- how do you want to start: three scroll-driven slides, then the forecast. */}
      <section data-section="3" style={{ background: SECTION_LIGHT }}>
        <StartShowcase />
        <ForecastSection />
      </section>

      {/* 4 -- the unify story, and the analysis deck under it. */}
      <section data-section="4" style={{ background: SECTION_DARK }}>
        <UnifyShowcase />
        <NewsCarousel />
      </section>

      {/* 5 -- the closing app promo. Welds square to the non-minimal Footer's light FAQ block
          right below it - see SectionPanels.tsx's data-fp-weld-footer rule. */}
      <section data-section="5" data-fp-weld-footer="" style={{ background: SECTION_LIGHT }}>
        <AppPromo />
      </section>
      </main>
      <Footer unified />
    </div>
  );
}

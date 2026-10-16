'use client';

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ============================================================
   TYPES
   ============================================================ */
type BP = { m: boolean; t: boolean; d: boolean; w: number };
type IconProps = { size?: number };
type IconComp = (props: IconProps) => React.ReactElement;

/* ============================================================
   HOOKS
   ============================================================ */
function useBP(): BP {
  const [bp, setBp] = useState<BP>({ m: true, t: false, d: false, w: 375 });
  useIsomorphicLayoutEffect(() => {
    const get = (): BP => {
      const w = window.innerWidth;
      return { m: w < 760, t: w >= 760 && w < 1080, d: w >= 1080, w };
    };
    setBp(get());
    let r: ReturnType<typeof requestAnimationFrame>;
    const h = () => { cancelAnimationFrame(r); r = requestAnimationFrame(() => setBp(get())); };
    window.addEventListener('resize', h);
    return () => { window.removeEventListener('resize', h); cancelAnimationFrame(r); };
  }, []);
  return bp;
}

function useReveal(): [React.MutableRefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }); },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/* ============================================================
   COLOUR CONSTANTS  (team Figma palette - do not change)
   ============================================================ */
const DG = '#101214';
const LM = '#75FB90';
const LM2 = '#A9DB4B';

/* ============================================================
   ATOM COMPONENTS
   ============================================================ */
function BtnDark({ children, onClick, lg, style, asSpan }: {
  children: React.ReactNode; onClick?: () => void; lg?: boolean; style?: React.CSSProperties; asSpan?: boolean;
}) {
  const s = { background: '#16140F', color: '#fff', border: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: lg ? 17 : 15, fontWeight: 600, padding: lg ? '15px 32px' : '11px 22px', borderRadius: 12, cursor: 'pointer', transition: 'transform .15s,box-shadow .15s', letterSpacing: '-.01em', display: 'inline-block', whiteSpace: 'nowrap', ...style };
  const ev = { onMouseOver: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 26px rgba(20,20,15,.22)'; }, onMouseOut: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; } };
  return asSpan ? <span style={s} {...ev}>{children}</span> : <button onClick={onClick} style={s} {...ev}>{children}</button>;
}

function BtnLime({ children, onClick, lg, style, asSpan }: {
  children: React.ReactNode; onClick?: () => void; lg?: boolean; style?: React.CSSProperties; asSpan?: boolean;
}) {
  const s = { background: 'var(--lime)', color: '#16140F', border: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: lg ? 17 : 15, fontWeight: 700, padding: lg ? '15px 32px' : '11px 22px', borderRadius: 12, cursor: 'pointer', transition: 'transform .15s,box-shadow .15s', letterSpacing: '-.01em', display: 'inline-block', ...style };
  const ev = { onMouseOver: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 26px rgba(149,204,66,.45)'; }, onMouseOut: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; } };
  return asSpan ? <span style={s} {...ev}>{children}</span> : <button onClick={onClick} style={s} {...ev}>{children}</button>;
}

function BtnGhost({ children, onClick, lg, style, asSpan }: {
  children: React.ReactNode; onClick?: () => void; lg?: boolean; style?: React.CSSProperties; asSpan?: boolean;
}) {
  const s = { background: 'transparent', color: '#16140F', border: '1.5px solid #16140F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: lg ? 17 : 15, fontWeight: 600, padding: lg ? '13.5px 30px' : '9.5px 20px', borderRadius: 12, cursor: 'pointer', transition: 'background .15s,color .15s', letterSpacing: '-.01em', display: 'inline-block', whiteSpace: 'nowrap', ...style };
  const ev = { onMouseOver: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = '#16140F'; (e.currentTarget as HTMLElement).style.color = '#fff'; }, onMouseOut: (e: React.MouseEvent<HTMLElement>) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#16140F'; } };
  return asSpan ? <span style={s} {...ev}>{children}</span> : <button onClick={onClick} style={s} {...ev}>{children}</button>;
}

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: light ? 'var(--lime)' : '#2E6B1E', marginBottom: 18 }}>
      <span style={{ width: 22, height: 2, background: 'currentColor', borderRadius: 2 }} />
      {children}
    </div>
  );
}

function ArrowR({ c = 'currentColor', s = 18 }: { c?: string; s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function Check({ c = '#139D49', s = 18 }: { c?: string; s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>;
}

/* ============================================================
   DUOTONE ICON SET  (deep-green stroke + lime fill)
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
  { id: 'taxes', l: 'Taxes', ic: I.taxes, href: '/calculators' },
  { id: 'creditscore', l: 'Credit Score & Health', ic: I.creditscore, href: '/calculators' },
  { id: 'schemes', l: 'Schemes & Benefits', ic: I.schemes, href: '/calculators' },
  { id: 'career', l: 'Career & Salary', ic: I.career, href: '/calculators' },
  { id: 'sme', l: 'SME Finance', ic: I.sme, href: '/calculators' },
  { id: 'retirement', l: 'Retirement', ic: I.retirement, href: '/calculators/swp-calculator' },
  { id: 'ppf', l: 'PPF Savings', ic: I.schemes, href: '/calculators/ppf-calculator' },
  { id: 'nps', l: 'NPS Pension', ic: I.shield, href: '/calculators/nps-calculator' },
  { id: 'realestate', l: 'Real Estate', ic: I.realestate, href: '/calculators/home-loan-calculator' },
  { id: 'fintech', l: 'Fintech & Products', ic: I.fintech, href: '/calculators' },
  { id: 'tools', l: 'Tools & more', ic: I.tools, href: '/calculators' },
];

interface Product { id: string; tag: string; title: string; ic: IconComp; blurb: string; screen: string; href: string; }
const PRODUCTS: Product[] = [
  { id: 'invest', tag: 'Investing', title: 'Fermor Invest', ic: I.investing, href: '/calculators/sip-calculator', blurb: 'Understand SIPs, mutual funds and stocks before you commit a single rupee. Compare categories, project returns, and start with what you already have.', screen: 'invest' },
  { id: 'bank', tag: 'Banking', title: 'Fermor Banking', ic: I.bank, href: '/calculators/fd-calculator', blurb: 'See real savings and FD rates side by side, sweep-in accounts explained, and find where your idle cash actually works hardest for you.', screen: 'bank' },
  { id: 'tax', tag: 'Tax & Salary', title: 'Fermor Tax', ic: I.taxes, href: '/calculators', blurb: 'Turn your CTC into real take-home, compare the old and new regimes, and know exactly what you owe, and what you can save under 80C.', screen: 'tax' },
  { id: 'retire', tag: 'Retirement', title: 'Fermor Retire', ic: I.retirement, href: '/calculators/ppf-calculator', blurb: 'Plan your NPS, PPF and EPF in one view. See how today\'s contributions compound into the retirement corpus you\'ll actually need.', screen: 'retire' },
];

/* ============================================================
   PHONE SHELL + DASHBOARD
   ============================================================ */
function Phone({ children, w = 300, style }: { children: React.ReactNode; w?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ width: w, aspectRatio: '300/620', background: '#16140F', borderRadius: w * 0.13, padding: w * 0.027, boxShadow: '0 40px 90px rgba(20,30,18,.28),0 8px 26px rgba(20,30,18,.16)', position: 'relative', ...style }}>
      <div style={{ width: '100%', height: '100%', background: '#F4F8F5', borderRadius: w * 0.105, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: w * 0.03, left: '50%', transform: 'translateX(-50%)', width: w * 0.30, height: w * 0.052, background: '#16140F', borderRadius: 20, zIndex: 5 }} />
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 16px 4px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#16140F' }}>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="15" height="10" viewBox="0 0 18 12" fill="#16140F"><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="4" width="3" height="8" rx="1" /><rect x="10" y="1.5" width="3" height="10.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity=".35" /></svg>
        <svg width="15" height="11" viewBox="0 0 16 12" fill="none" stroke="#16140F" strokeWidth="1.4"><path d="M1 4.5C3 2.5 13 2.5 15 4.5M3 7C5 5.4 11 5.4 13 7M5.5 9.3c1.4-1 3.6-1 5 0" /></svg>
        <svg width="22" height="11" viewBox="0 0 26 12" fill="none"><rect x="1" y="1" width="21" height="10" rx="2.5" stroke="#16140F" strokeWidth="1.2" /><rect x="3" y="3" width="15" height="6" rx="1" fill="#16140F" /><rect x="23" y="4" width="2" height="4" rx="1" fill="#16140F" /></svg>
      </div>
    </div>
  );
}

function Jar({ ic, name, amt, pct, col }: { ic: React.ReactNode; name: string; amt: string; pct: number; col: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0' }}>
      <div style={{ width: 30, height: 30, borderRadius: 9, background: '#EDFBBC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ic}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: '#16140F' }}>{name}</span>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: '#16140F' }}>{amt}</span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: '#E7EDE6', overflow: 'hidden' }}>
          <div style={{ width: pct + '%', height: '100%', background: col, borderRadius: 3 }} />
        </div>
        <div style={{ fontSize: 8.5, color: '#8A8F86', marginTop: 3 }}>{pct}% of goal</div>
      </div>
    </div>
  );
}

function DashScreen() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: 'var(--font-inter), Inter, sans-serif', background: '#F4F8F5' }}>
      <StatusBar />
      <div style={{ padding: '6px 14px 0' }}>
        <div style={{ fontSize: 9, color: '#8A8F86', fontWeight: 600 }}>Good morning,</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#16140F', marginBottom: 9 }}>Arjun 👋</div>
        {/* health score */}
        <div style={{ background: DG, borderRadius: 14, padding: '12px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
          <div>
            <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,.6)', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>Financial Health</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 3 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>82</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 600 }}>/100</span>
            </div>
            <div style={{ fontSize: 8.5, color: LM, fontWeight: 700, marginTop: 1 }}>↑ 6 this month</div>
          </div>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: `conic-gradient(${LM} 0% 82%, rgba(255,255,255,.12) 82% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: DG, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: LM }}>A+</div>
          </div>
        </div>
        {/* cash flow */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '11px 13px', marginBottom: 9, boxShadow: '0 2px 10px rgba(20,30,18,.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
            <span style={{ fontSize: 9.5, color: '#8A8F86', fontWeight: 600 }}>Net monthly cash flow</span>
            <span style={{ fontSize: 8, fontWeight: 700, color: '#2E6B1E', background: '#EDFBBC', padding: '2px 7px', borderRadius: 20 }}>Healthy</span>
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#16140F', fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>+₹18,420</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
            <span style={{ fontSize: 9, color: '#8A8F86' }}>Income <b style={{ color: '#16140F' }}>₹46,000</b></span>
            <span style={{ fontSize: 9, color: '#8A8F86' }}>Spend <b style={{ color: '#16140F' }}>₹35,420</b></span>
          </div>
        </div>
        {/* wealth jars */}
        <div style={{ background: '#fff', borderRadius: 14, padding: '10px 13px', marginBottom: 9, boxShadow: '0 2px 10px rgba(20,30,18,.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
            <span style={{ fontSize: 9.5, fontWeight: 700, color: '#16140F' }}>Wealth jars</span>
            <span style={{ fontSize: 8.5, fontWeight: 600, color: '#2E6B1E' }}>See all</span>
          </div>
          <Jar ic={<I.shield size={16} />} name="Emergency Fund" amt="₹2.0L" pct={41} col={DG} />
          <Jar ic={<I.investing size={16} />} name="Travel" amt="₹8,500" pct={24} col={LM2} />
          <Jar ic={<I.realestate size={16} />} name="Home Down Payment" amt="₹5.4L" pct={34} col="#2E6B1E" />
        </div>
        {/* insight */}
        <div style={{ background: '#EDFBBC', borderRadius: 14, padding: '10px 13px', display: 'flex', gap: 9, alignItems: 'center', border: '1px solid #DCEFA4' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: '#2E6B1E', marginBottom: 2 }}>💡 INSIGHT</div>
            <div style={{ fontSize: 9, color: '#16140F', lineHeight: 1.4 }}>Food spending up 14% this month. Potential saving <b>₹8,500</b>.</div>
          </div>
          <svg width="40" height="26" viewBox="0 0 40 26" fill="none"><path d="M2 20L10 14L18 17L26 8L38 3" stroke="#2E6B1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
      {/* bottom nav */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #EBF0E9', display: 'flex', justifyContent: 'space-around', padding: '7px 0 11px' }}>
        {([['Home', I.tools], ['Tools', I.taxes], ['Stats', I.investing], ['Learn', I.fintech], ['You', I.career]] as [string, IconComp][]).map(([l, Ic], i) => (
          <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, opacity: i === 0 ? 1 : 0.4 }}>
            <Ic size={16} /><span style={{ fontSize: 7.5, fontWeight: 600, color: '#16140F' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION: NAV
   ============================================================ */
export function MainNavbar() {
  const bp = useBP();
  // The full inline menu (five dropdowns, Credit Cards, All Calculators, Blogs, search, Sign in,
  // Get started) needs about 1300px. It used to switch on at bp.d (1080px) and overflowed the page
  // by ~220px right at that width, so it now has its own threshold and narrower widths use the
  // menu button and drawer. The Mutual Funds link added ~115px (measured: the bar overflowed by
  // 95px at 1320, 72px at 1366 and 35px at 1440, and fit at 1536), hence 1480.
  const desk = bp.w >= 1480;
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState<string | null>(null);
  const [sec, setSec] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navBottom, setNavBottom] = useState(64);
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profileDrop, setProfileDrop] = useState(false);

  useEffect(() => {
    const update = () => { if (navRef.current) setNavBottom(navRef.current.getBoundingClientRect().bottom); };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => { if (desk) { setOpen(false); setSec(null); } }, [desk]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const menus: Record<string, Plan[]> = {
    Investments: PLANS.filter(p => ['investing', 'creditscore', 'fintech', 'realestate'].includes(p.id)),
    'Tax & Salary': PLANS.filter(p => ['taxes', 'career', 'schemes'].includes(p.id)),
    Loans: PLANS.filter(p => ['loans', 'sme'].includes(p.id)),
    Banking: PLANS.filter(p => ['bank', 'tools'].includes(p.id)),
    Insurance: PLANS.filter(p => ['insurance', 'retirement'].includes(p.id)),
  };

  return (
    <>
    <nav ref={navRef} style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid #ECEFE9' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: bp.m ? '0 18px' : '0 28px', height: 64, display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginRight: desk ? 30 : 0, flexShrink: 0 }}>
          <img src="/fermor-mark-2026.svg" alt="Fermor" width={32} height={24} style={{ height: 24, width: 'auto', display: 'block' }} />
          <span style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 21, fontWeight: 800, color: '#16140F', letterSpacing: '-.02em' }}>Fermor</span>
        </Link>

        {/* Desktop menu */}
        {desk && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            {Object.keys(menus).map(k => (
              <div key={k} style={{ position: 'relative' }} onMouseEnter={() => setDrop(k)} onMouseLeave={() => setDrop(null)}>
                <button style={{ background: 'none', border: 'none', color: drop === k ? '#16140F' : '#43433F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14.5, fontWeight: 500, cursor: 'pointer', padding: '8px 13px', display: 'flex', alignItems: 'center', gap: 5, borderRadius: 8, whiteSpace: 'nowrap' }}>
                  {k}
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" style={{ transform: drop === k ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
                    <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {drop === k && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ECEFE9', borderRadius: 16, padding: 10, minWidth: 300, boxShadow: '0 24px 60px rgba(20,30,18,.14)', display: 'grid', gap: 2, zIndex: 300 }}>
                    {menus[k].map(c => (
                      <Link key={c.id} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 11px', borderRadius: 11, textDecoration: 'none', color: 'inherit' }}
                        onMouseOver={e => (e.currentTarget.style.background = '#F4F8F5')}
                        onMouseOut={e => (e.currentTarget.style.background = 'none')}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: '#EDFBBC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><c.ic size={20} /></div>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: '#16140F' }}>{c.l}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/credit-cards" style={{ color: '#43433F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14.5, fontWeight: 500, padding: '8px 13px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Credit Cards</Link>
            <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" style={{ color: '#43433F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14.5, fontWeight: 500, padding: '8px 13px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Mutual Funds</Link>
            <Link href="/calculators" style={{ color: '#43433F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14.5, fontWeight: 500, padding: '8px 13px', textDecoration: 'none', whiteSpace: 'nowrap' }}>All Calculators</Link>
            <Link href="/blogs" style={{ color: '#43433F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 14.5, fontWeight: 500, padding: '8px 13px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Blogs</Link>
          </div>
        )}

        {!desk && <div style={{ flex: 1 }} />}

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: bp.m ? 8 : 11 }}>
          {desk && (
            <Link href="/calculators" aria-label="Search calculators" style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: 7, color: '#43433F', textDecoration: 'none' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7.5" /><path d="m21 21-4-4" /></svg>
            </Link>
          )}
          {!bp.m && (user ? (
            <div style={{ position: 'relative' }}>
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setProfileDrop(!profileDrop); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#F4F8F5', borderRadius: 20 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#75FB90', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16140F', fontWeight: 700, fontSize: 12 }}>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#16140F' }}>Profile</span>
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ transform: profileDrop ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
                    <path d="M2 4L5 7L8 4" stroke="#16140F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>

              {profileDrop && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: '#fff', border: '1px solid #ECEFE9', borderRadius: 16, padding: 16, minWidth: 240, boxShadow: '0 24px 60px rgba(20,30,18,.14)', zIndex: 300 }}>
                  <div style={{ paddingBottom: 12, borderBottom: '1px solid #ECEFE9', marginBottom: 12 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#16140F', marginBottom: 4 }}>{user.name}</div>
                    <div style={{ fontSize: 13, color: '#5A5A52' }}>{user.email}</div>
                  </div>
                  <Link href="/account" style={{ display: 'block', padding: '10px 12px', borderRadius: 8, textDecoration: 'none', color: '#16140F', fontSize: 14, fontWeight: 600, transition: 'background .15s' }}
                    onMouseOver={e => e.currentTarget.style.background = '#F4F8F5'}
                    onMouseOut={e => e.currentTarget.style.background = 'none'}
                    onClick={(e) => {
                      // Don't prevent default, just let it navigate naturally.
                      // The dropdown will close when the page changes or we can let it be.
                      // Wait, we can just hide it after a small delay to ensure navigation starts.
                      setTimeout(() => setProfileDrop(false), 50);
                    }}
                  >
                    Go to Profile
                  </Link>
                  <button
                    onClick={() => { logout(); setProfileDrop(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 12px', borderRadius: 8, border: 'none', background: 'none', color: '#DC2626', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background .15s' }}
                    onMouseOver={e => e.currentTarget.style.background = '#FEF2F2'}
                    onMouseOut={e => e.currentTarget.style.background = 'none'}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/sign-in" style={{ background: 'transparent', color: '#16140F', border: '1.5px solid #16140F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 15, fontWeight: 600, padding: '9.5px 20px', borderRadius: 12, textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
              onMouseOver={e => { e.currentTarget.style.background = '#16140F'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#16140F'; }}
            >Sign in</Link>
          ))}
          {!bp.m && !user && <Link href="/signup" style={{ background: '#16140F', color: '#fff', border: '1.5px solid #16140F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 15, fontWeight: 600, padding: '9.5px 20px', borderRadius: 12, textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap', transition: 'all 0.15s' }}
            onMouseOver={e => { e.currentTarget.style.background = '#2E6B1E'; e.currentTarget.style.borderColor = '#2E6B1E'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#16140F'; e.currentTarget.style.borderColor = '#16140F'; }}
          >Get started</Link>}
          {!desk && (
            <button onClick={() => setOpen(o => !o)} aria-label="Menu" style={{ background: 'none', border: '1px solid #E3E8DF', borderRadius: 9, padding: '8px 9px', cursor: 'pointer', display: 'flex', color: '#16140F' }}>
              {open
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>}
            </button>
          )}
        </div>
      </div>

    </nav>
    {/* Mobile drawer - must be outside <nav> so backdropFilter doesn't clip it */}
    {!desk && open && (
      <>
        {/* dim scrim - tap to close */}
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.32)', zIndex: 199 }} />
        {/* sheet - anchored exactly to nav bottom, not hardcoded */}
        <div style={{ position: 'fixed', top: navBottom, left: 0, right: 0, maxHeight: `calc(100vh - ${navBottom}px - 16px)`, background: '#fff', overflowY: 'auto', padding: '14px 20px 36px', animation: 'fadeUp .22s ease', zIndex: 200, boxShadow: '0 16px 48px rgba(20,30,18,.22)', borderRadius: '0 0 20px 20px' }}>
          <Link href="/credit-cards" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 2px', textDecoration: 'none', borderBottom: '1px solid #EEF1EB', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#16140F' }}>
            Credit Cards
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 2px', textDecoration: 'none', borderBottom: '1px solid #EEF1EB', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#16140F' }}>
            Mutual Funds
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          <Link href="/calculators" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 2px', textDecoration: 'none', borderBottom: '1px solid #EEF1EB', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#16140F' }}>
            All Calculators
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          {Object.keys(menus).map(k => (
            <div key={k} style={{ borderBottom: '1px solid #EEF1EB' }}>
              <button onClick={() => setSec(s => s === k ? null : k)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '15px 2px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#16140F' }}>
                {k}
                <svg width="13" height="13" viewBox="0 0 10 10" fill="none" style={{ transform: sec === k ? 'rotate(180deg)' : 'none', transition: '.2s' }}>
                  <path d="M2 4L5 7L8 4" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {sec === k && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, paddingBottom: 14 }}>
                  {menus[k].map(c => (
                    <Link key={c.id} href={c.href} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: 10, borderRadius: 11, background: '#F4F8F5', textDecoration: 'none' }}>
                      <div style={{ width: 30, height: 30, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><c.ic size={18} /></div>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: '#16140F', lineHeight: 1.2 }}>{c.l}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/blogs" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 2px', textDecoration: 'none', borderBottom: '1px solid #EEF1EB', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#16140F' }}>
            Blogs
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
          {user ? (
            <Link href="/account" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 2px', textDecoration: 'none', borderBottom: '1px solid #EEF1EB', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 16, fontWeight: 600, color: '#16140F' }}>
              Profile
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <Link href="/sign-in" onClick={() => setOpen(false)} style={{ flex: 1, textAlign: 'center', background: 'transparent', color: '#16140F', border: '1.5px solid #16140F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 15, fontWeight: 600, padding: '9.5px 20px', borderRadius: 12, textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>Sign in</Link>
              <Link href="/signup" onClick={() => setOpen(false)} style={{ flex: 1, textAlign: 'center', background: '#16140F', color: '#fff', border: '1.5px solid #16140F', fontFamily: 'var(--font-inter), Inter, sans-serif', fontSize: 15, fontWeight: 600, padding: '9.5px 20px', borderRadius: 12, textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>Get started</Link>
            </div>
          )}
        </div>
      </>
      )}
      
    </>
  );
}

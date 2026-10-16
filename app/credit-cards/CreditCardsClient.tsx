'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MainNavbar } from '../../src/components/common/MainNavbar';
import { CREDIT_CARDS, CardCategory } from '../../src/data/creditCards';
import { CreditCardTile } from '../../src/components/credit-cards/CreditCardTile';
import { CreditCardFilters } from '../../src/components/credit-cards/CreditCardFilters';
import { CreditCardCompare } from '../../src/components/credit-cards/CreditCardCompare';
import { CreditCardSEOContent } from '../../src/components/credit-cards/CreditCardSEOContent';
import { Footer } from '../_home/Footer';
import { PRODUCT_COLUMNS } from '../../src/components/common/footerLinks';

const C = {
  dark:      '#101214',
  lime:      '#75FB90',
  lime2:     '#95CC42',
  paleLime:  '#EDFBBC',
  ink:       '#16140F',
  ink2:      '#5A5A52',
  ink3:      '#8A8F86',
  white:     '#ffffff',
  bg:        '#F4F8F5',
  border:    '#E2EBE0',
  applyBg:   '#1A7340',
};

const INTER = 'var(--font-inter), Inter, sans-serif';

export default function CreditCardsClient({ faqs }: { faqs: {q: string, a: string}[] }) {
  const [activeCategory, setActiveCategory] = useState<CardCategory>('All Cards');
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);
  const [mobile, setMobile] = useState(false);
  const [showMoreHero, setShowMoreHero] = useState(false);

  useEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const displayedCards = CREDIT_CARDS.filter(c => c.categories.includes(activeCategory));

  const handleCompareToggle = (slug: string) => {
    setComparedSlugs(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= 3) {
        alert('You can only compare up to 3 cards at a time.');
        return prev;
      }
      return [...prev, slug];
    });
  };

  const comparedCardsData = CREDIT_CARDS.filter(c => comparedSlugs.includes(c.slug));

  const RELATED_CALCS = [
    { href: '/calculators/emi-calculator', label: 'EMI Calculator', desc: 'Calculate your monthly credit card EMI' },
    { href: '/calculators/inflation-calculator', label: 'Inflation Calculator', desc: 'See how your purchasing power changes' },
    { href: '/calculators/elss-calculator', label: 'ELSS Calculator', desc: 'Tax savings on investments' },
    { href: '/calculators/sip-calculator', label: 'SIP Calculator', desc: 'Grow wealth while spending smart' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh', position: 'relative' }}>
      <MainNavbar />
      <CreditCardFilters activeCategory={activeCategory} onSelect={setActiveCategory} />

      {/* HERO SECTION */}
      <div style={{ background: C.applyBg, padding: mobile ? '32px 20px 48px' : '48px 28px 64px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          
          {/* Breadcrumbs & Disclosure */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              <span>›</span>
              <span>CREDIT CARDS</span>
              <span>›</span>
              <span>BEST CREDIT CARDS OF JUNE 2026</span>
            </div>
            {!mobile && <span>Advertiser disclosure</span>}
          </div>

          <h1 style={{ fontSize: mobile ? 36 : 52, fontWeight: 900, color: C.white, margin: '0 0 24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Best Credit Cards of June 2026
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E2EBE0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.dark, fontWeight: 700, fontSize: 12, border: `2px solid ${C.applyBg}`, zIndex: 3 }}>F</div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.lime, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.dark, fontWeight: 700, fontSize: 12, border: `2px solid ${C.applyBg}`, marginLeft: -10, zIndex: 2 }}>E</div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.dark, fontWeight: 700, fontSize: 12, border: `2px solid ${C.applyBg}`, marginLeft: -10, zIndex: 1 }}>T</div>
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
              <div>Written by <strong>Fermor Editorial Team</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span>Last updated on June 16, 2026</span>
                <span style={{ opacity: 0.5 }}>|</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 700 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zM9.38 16.01L5.41 12l1.46-1.45 2.51 2.51 6.67-6.67 1.46 1.45-8.13 8.17z"/></svg>
                  FACT CHECKED
                </span>
                <span style={{ opacity: 0.5 }}>|</span>
                <span style={{ fontWeight: 700 }}>EDITORIAL INTEGRITY</span>
              </div>
            </div>
          </div>

          <div style={{ fontSize: mobile ? 16 : 18, color: 'rgba(255,255,255,0.95)', lineHeight: 1.6, maxWidth: 900 }}>
            <p style={{ margin: '0 0 16px' }}>
              <strong>The best credit card is one that's best aligned with your specific needs.</strong> Fermor's credit card experts have reviewed and rated dozens of options for the best credit cards of 2026 — from generous rewards and lifetime-free entry cards to premium travel benefits, so you can find the best fit for your needs.
            </p>
            
            {showMoreHero && (
              <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: '32px 0 16px' }}>How to identify your 'best credit card'</h3>
                <p style={{ margin: '0 0 16px' }}>
                  Ask any credit card expert what the best card is, and you'll undoubtedly hear: "There is no single best credit card. There's just the best credit card for you." While that's true, it's also a cliché and not terribly helpful. So skip that approach and instead ask yourself a question: What do you hope to get from a credit card?
                </p>
                <p style={{ margin: '0 0 16px' }}>
                  Credit cards fall into three major categories: Rewards cards give you cash back, points or miles on your purchases, as well as perks. Travel cards give you flight/hotel benefits and lounge access. Entry-level or Lifetime Free cards have more forgiving application criteria so you can work toward better cards down the road. Some cards fit into more than one category, but there are always tradeoffs.
                </p>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: '32px 0 16px' }}>How Fermor picked these credit cards</h3>
                <p style={{ margin: '0 0 16px' }}>
                  For this page, we chose credit cards with the broadest appeal, meaning they'll provide significant value to just about anyone looking for a card in their target category. That's not to say every card on this page is a perfect fit for everyone. Rather, if you're looking for, say, a cash back card, you really can't go wrong with the cash back options on this page.
                </p>
                <div style={{ background: 'rgba(0,0,0,0.1)', padding: 24, borderRadius: 12, borderLeft: `4px solid ${C.lime}`, marginTop: 24 }}>
                  <h4 style={{ fontSize: 16, fontWeight: 800, color: C.lime, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Expert tip: Knowing what a card can and can't do</h4>
                  <p style={{ margin: 0, fontSize: 15 }}>
                    <strong>Fermor Editorial Team:</strong> "Don't expect a credit card to change your life. Instead, look for a card that will complement your life. For example, a travel credit card can make your journeys more affordable and comfortable — but if you don't already travel, a credit card isn't going to magically turn you into a globetrotter. A cash back card can put hundreds of dollars a year in your pocket — but if you aren't comfortable using credit cards for everyday spending (and paying them in full every month), the rewards you earn won't amount to much."
                  </p>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setShowMoreHero(!showMoreHero)}
              style={{ background: 'none', border: 'none', color: C.lime, fontWeight: 800, fontSize: 16, padding: 0, cursor: 'pointer', marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4 }}
            >
              {showMoreHero ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: mobile ? '32px 16px 80px' : '48px 28px 80px' }}>
        
        {/* CARD LISTINGS */}
        <div style={{ marginBottom: 64 }}>
          {displayedCards.map(card => (
            <CreditCardTile 
              key={card.slug} 
              card={card} 
              isCompared={comparedSlugs.includes(card.slug)}
              onCompareToggle={handleCompareToggle} 
            />
          ))}
          {displayedCards.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', background: C.white, borderRadius: 16, border: `1px solid ${C.border}` }}>
              <h3 style={{ margin: 0, color: C.ink, fontSize: 18 }}>No cards found for this category.</h3>
            </div>
          )}
        </div>

        {/* EDUCATIONAL & SEO CONTENT */}
        <CreditCardSEOContent faqs={faqs} />

        {/* RELATED CALCULATORS */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: C.ink, margin: '0 0 24px' }}>Useful Calculators</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {RELATED_CALCS.map(calc => (
              <Link key={calc.href} href={calc.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, transition: 'all 0.2s', height: '100%' }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = C.lime2; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.04)'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 8 }}>{calc.label}</div>
                  <div style={{ fontSize: 13, color: C.ink2, lineHeight: 1.5 }}>{calc.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer minimal unified columns={PRODUCT_COLUMNS} />

      <CreditCardCompare 
        selectedCards={comparedCardsData} 
        onRemove={handleCompareToggle} 
        onClear={() => setComparedSlugs([])} 
      />
    </div>
  );
}

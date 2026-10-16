'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const C = {
  dark:      '#1A3530',
  lime:      '#C8F135',
  lime2:     '#95CC42',
  paleLime:  '#EEF6E1',
  ink:       '#16140F',
  ink2:      '#5A5A52',
  white:     '#ffffff',
  bg:        '#F4F8F5',
  border:    '#E2EBE0',
  green:     '#1A7340',
};

const INTER = 'var(--font-inter), Inter, sans-serif';

interface Props {
  faqs: { q: string, a: string }[];
}

export function CreditCardSEOContent({ faqs }: Props) {
  const [activeSection, setActiveSection] = useState('news');
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set());
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('.seo-section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const toggleFaq = (i: number) => {
    setOpenFaq(prev => {
      const n = new Set(prev);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  };

  const navItems = [
    { id: 'news', label: "What's news this week in credit cards" },
    { id: 'picks', label: "More about our picks" },
    { id: 'guide', label: "A beginner's guide to credit cards" },
    { id: 'types', label: "Different types of credit cards" },
    { id: 'choose', label: "Choosing the best credit card for you in 2026" },
    { id: 'faqs', label: "Frequently asked questions" },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: mobile ? '32px 16px' : '48px 28px', display: 'flex', gap: 64, fontFamily: INTER }}>
      
      {/* Sticky Sidebar Navigation */}
      {!mobile && (
        <aside style={{ width: 280, flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>ON THIS PAGE</h3>
            <div style={{ height: 2, background: C.green, width: '100%', marginBottom: 16 }}></div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {navItems.map(item => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  style={{ 
                    textDecoration: 'none', 
                    fontSize: 14, 
                    fontWeight: activeSection === item.id ? 700 : 500, 
                    color: activeSection === item.id ? C.ink : '#4B5563', 
                    padding: '8px 12px', 
                    background: activeSection === item.id ? '#F3F4F6' : 'transparent',
                    borderLeft: activeSection === item.id ? `3px solid ${C.green}` : '3px solid transparent',
                    transition: 'all 0.2s',
                    lineHeight: 1.5
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div style={{ flex: 1, minWidth: 0 }}>
        
        {/* Section 1: News */}
        <section id="news" className="seo-section" style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.paleLime, padding: '16px 24px', borderTop: `3px solid ${C.green}`, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: 0 }}>What's news this week in credit cards</h2>
            <a href="#top" style={{ fontSize: 12, fontWeight: 700, color: C.green, textDecoration: 'none', letterSpacing: '0.05em' }}>BACK TO TOP ↑</a>
          </div>
          
          <div style={{ borderLeft: `3px solid #E5E7EB`, paddingLeft: 24, marginBottom: 32 }}>
            <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, margin: '0 0 16px' }}>
              <strong>June 15, 2026:</strong> The landscape of Indian credit cards is shifting rapidly. This week, SBI Card announced significant revisions to their flagship Cashback SBI Card, slightly tightening the monthly cashback limits but introducing new milestones for annual fee waivers. Meanwhile, HDFC Bank has rolled out aggressive targeted upgrades for their Millennia cardholders, offering pre-approved upgrades to the Regalia Gold variant with first-year fee waivers.
            </p>
            <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, margin: 0 }}>
              If you've been eyeing a premium travel card, Axis Bank's latest devaluation of the Atlas card's partner transfer ratios means you should reconsider your redemption strategy. As always, the best approach is to secure cards with strong baseline rewards rather than chasing short-lived promotional categories.
            </p>
          </div>
        </section>

        {/* Section 2: More about our picks */}
        <section id="picks" className="seo-section" style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.paleLime, padding: '16px 24px', borderTop: `3px solid ${C.green}`, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: 0 }}>More about our picks</h2>
            <a href="#top" style={{ fontSize: 12, fontWeight: 700, color: C.green, textDecoration: 'none', letterSpacing: '0.05em' }}>BACK TO TOP ↑</a>
          </div>

          {/* Pick 1 */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: '0 0 16px', paddingBottom: 8, borderBottom: `2px solid ${C.green}` }}>SBI Cashback Credit Card</h3>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Our pick for: Flat-rate online cash back</p>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
              There's a reason the SBI Cashback Card has consistently dominated our Best-Of lists. It offers a completely uncapped 5% cash back on almost all online spends, making it the undisputed king for general e-commerce. You don't have to worry about specific merchant partnerships or limited-time categories—if you're buying it online, you're likely getting 5% back. The simplicity comes with a small trade-off: it lacks premium travel perks. However, for sheer monetary value, it's unparalleled. <a href="#" style={{ color: C.green, textDecoration: 'none' }}>Read our full review of the SBI Cashback Card.</a>
            </p>
            <p style={{ fontSize: 14, color: '#4B5563', margin: 0 }}>
              » For higher rewards specifically on Amazon: <a href="#" style={{ color: C.green, textDecoration: 'none' }}>Amazon Pay ICICI Credit Card</a>.
            </p>
          </div>

          {/* Pick 2 */}
          <div style={{ marginBottom: 48 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: '0 0 16px', paddingBottom: 8, borderBottom: `2px solid ${C.green}` }}>HDFC Regalia Gold</h3>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Our pick for: Premium travel and lifestyle</p>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
              The HDFC Regalia Gold stands out for its well-rounded travel benefits and milestone rewards. It provides extensive domestic and international lounge access, complimentary Club Vistara Silver Tier membership, and excellent reward multipliers on Marks & Spencer, Reliance Digital, and Nykaa. If you spend upwards of ₹4 Lakhs annually, the milestone benefits completely offset the annual fee, making it highly lucrative for upper-middle-class households and frequent domestic flyers. <a href="#" style={{ color: C.green, textDecoration: 'none' }}>Read our full review of the HDFC Regalia Gold.</a>
            </p>
            <p style={{ fontSize: 14, color: '#4B5563', margin: 0 }}>
              » For a more exclusive, invite-only travel experience: <a href="#" style={{ color: C.green, textDecoration: 'none' }}>HDFC Infinia Metal Edition</a>.
            </p>
          </div>

          {/* Pick 3 */}
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.ink, margin: '0 0 16px', paddingBottom: 8, borderBottom: `2px solid ${C.green}` }}>IDFC FIRST Millennia</h3>
            <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 16 }}>Our pick for: Lifetime free for beginners</p>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
              The IDFC FIRST Millennia requires a little less financial commitment than other premium cards because it is unconditionally lifetime free. You never have to worry about spending milestones to waive annual fees. The rewards structure is heavily biased toward online spending (up to 10X points) and the points never expire. Additionally, IDFC offers low dynamic interest rates starting from 9% p.a., making it a relatively safer option for younger professionals who are just learning to manage credit. <a href="#" style={{ color: C.green, textDecoration: 'none' }}>Read our full review of the IDFC FIRST Millennia.</a>
            </p>
            <p style={{ fontSize: 14, color: '#4B5563', margin: 0 }}>
              » For another great lifetime free option: <a href="#" style={{ color: C.green, textDecoration: 'none' }}>OneCard Metal</a>.
            </p>
          </div>
        </section>

        {/* Section 3: Guide */}
        <section id="guide" className="seo-section" style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.paleLime, padding: '16px 24px', borderTop: `3px solid ${C.green}`, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: 0 }}>A beginner's guide to credit cards</h2>
            <a href="#top" style={{ fontSize: 12, fontWeight: 700, color: C.green, textDecoration: 'none', letterSpacing: '0.05em' }}>BACK TO TOP ↑</a>
          </div>

          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 32 }}>
            The idea behind credit cards is simple: When you use a credit card, you are borrowing money to pay for something. Later on, you must repay what you borrowed. If you take time to pay it back (rather than pay it in full when your credit card statement comes), you'll be charged interest. The whole credit card industry rests on this basic premise.
          </p>

          <h3 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 24px', paddingBottom: 8, borderBottom: `2px solid ${C.green}` }}>How credit cards work</h3>
          <p style={{ fontSize: 15, color: '#4B5563', marginBottom: 24 }}>A basic credit card transaction works like this:</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 48 }}>
            {[
              { step: '1. You use your card.', desc: 'You use your card at the cash register or enter your details online.' },
              { step: '2. Purchase is authorized.', desc: 'The payment gateway contacts your bank to ensure you have enough credit limit.' },
              { step: '3. Merchant gets paid.', desc: 'Your bank sends money to the merchant, minus a small processing fee.' },
              { step: '4. You pay the bank.', desc: 'The transaction shows up on your monthly statement, and you repay the bank.' }
            ].map((item, i) => (
              <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: C.paleLime, padding: '16px', fontSize: 14, fontWeight: 800, color: C.ink }}>{item.step}</div>
                <div style={{ padding: '20px 16px', fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: '0 0 24px', paddingBottom: 8, borderBottom: `2px solid ${C.green}` }}>How credit card rewards work</h3>
          <p style={{ fontSize: 15, color: '#4B5563', marginBottom: 32 }}>
            Many of the best credit cards in India give you rewards for your spending. Rewards programs come in two basic flavors (cash back and points/miles), with two basic structures (flat rate and bonus rewards).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.paleLime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                </div>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 8, textAlign: 'center' }}>Cash back</h4>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6, textAlign: 'center' }}>You earn direct statement credits. The easiest and most transparent way to save.</p>
            </div>
            <div>
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.paleLime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.lime2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                </div>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 8, textAlign: 'center' }}>Points or miles</h4>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6, textAlign: 'center' }}>Redeem for flights, hotels, or merchandise. Potentially higher value but requires strategy.</p>
            </div>
            <div>
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.paleLime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.dark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>
                </div>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 8, textAlign: 'center' }}>Flat rate</h4>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6, textAlign: 'center' }}>Earn the exact same percentage back on every purchase, no tracking required.</p>
            </div>
            <div>
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.paleLime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                </div>
              </div>
              <h4 style={{ fontSize: 16, fontWeight: 800, color: C.ink, marginBottom: 8, textAlign: 'center' }}>Bonus rewards</h4>
              <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6, textAlign: 'center' }}>Earn higher rates on specific categories like dining, fuel, or Amazon purchases.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Different Types */}
        <section id="types" className="seo-section" style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.paleLime, padding: '16px 24px', borderTop: `3px solid ${C.green}`, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: 0 }}>Different types of credit cards</h2>
            <a href="#top" style={{ fontSize: 12, fontWeight: 700, color: C.green, textDecoration: 'none', letterSpacing: '0.05em' }}>BACK TO TOP ↑</a>
          </div>
          
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 32 }}>
            Credit card companies in India offer different kinds of cards to meet different consumer needs. Some people put a lot of money on their cards every month and pay them off immediately; those people benefit from a rewards card. Others tend to carry a balance from month to month; they're better served with a low-interest card. Still others are working to build credit and need a secured card.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[{ title: 'Travel Credit Cards', desc: 'Designed for frequent flyers, these cards reward you with airline miles, hotel points, and complimentary airport lounge access globally. Many waive foreign transaction fees.' },
              { title: 'Cashback Credit Cards', desc: 'The most straightforward option. Every purchase gives you a percentage back directly into your statement, reducing your monthly bill.' },
              { title: 'Co-Branded Credit Cards', desc: 'Partnered with brands like Amazon, Flipkart, or Swiggy to give you massive 5% to 10% returns when shopping specifically with those brands.' },
              { title: 'Secured Credit Cards', desc: 'If you have a poor CIBIL score or no credit history, these cards are issued against a Fixed Deposit (FD) and help you build credit safely.' }
            ].map((type, i) => (
              <div key={i} style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: 24, background: C.white }}>
                <h4 style={{ fontSize: 18, fontWeight: 800, color: C.ink, marginBottom: 8 }}>{type.title}</h4>
                <p style={{ margin: 0, fontSize: 15, color: '#4B5563', lineHeight: 1.6 }}>{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Choosing */}
        <section id="choose" className="seo-section" style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.paleLime, padding: '16px 24px', borderTop: `3px solid ${C.green}`, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: 0 }}>Choosing the best credit card for you in 2026</h2>
            <a href="#top" style={{ fontSize: 12, fontWeight: 700, color: C.green, textDecoration: 'none', letterSpacing: '0.05em' }}>BACK TO TOP ↑</a>
          </div>

          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 24 }}>
            Finding the best credit card isn't about finding the one with the highest limit; it's about matching the card to your financial habits. Ask yourself these three questions:
          </p>
          <ul style={{ paddingLeft: 24, fontSize: 15, color: '#4B5563', lineHeight: 1.8, margin: '0 0 32px' }}>
            <li><strong>How is my credit score?</strong> A score above 750 opens doors to premium cards. If you're below 700, focus on entry-level or secured cards first.</li>
            <li><strong>Where do I spend most of my money?</strong> Look at your bank statement. If 40% of your expenses are on food delivery, look for a dining-focused card.</li>
            <li><strong>Am I willing to pay an annual fee?</strong> A ₹2,999 fee is worth it if the card gives you ₹15,000 in flight benefits. If you want simplicity, stick to lifetime free cards.</li>
          </ul>
        </section>

        {/* Section 6: FAQs */}
        <section id="faqs" className="seo-section" style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.paleLime, padding: '16px 24px', borderTop: `3px solid ${C.green}`, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: C.ink, margin: 0 }}>Frequently asked questions</h2>
            <a href="#top" style={{ fontSize: 12, fontWeight: 700, color: C.green, textDecoration: 'none', letterSpacing: '0.05em' }}>BACK TO TOP ↑</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((f, i) => {
              const o = openFaq.has(i);
              return (
                <div key={i} style={{ border: `1px solid ${o ? C.lime2 : C.border}`, borderRadius: 10, background: C.white, overflow: 'hidden' }}>
                  <button onClick={() => toggleFaq(i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 14, fontFamily: INTER }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.5 }}>{f.q}</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={o ? C.dark : '#9CA3AF'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: o ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {o && <div style={{ padding: '0 20px 16px', fontSize: 14, color: C.ink2, lineHeight: 1.85 }}>{f.a}</div>}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

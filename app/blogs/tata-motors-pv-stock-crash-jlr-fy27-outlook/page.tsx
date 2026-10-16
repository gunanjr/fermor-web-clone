import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'TMPV Share Price Falls 10%: What JLR\'s FY27 Guidance Means for Investors',
  description:
    'Tata Motors PV (TMPV) share price fell 9.8% on June 17, 2026, the worst Nifty 50 performer of the session. This analysis covers JLR\'s FY27 investor day numbers, the unresolved US tariff exposure, BMW\'s concurrent profit warning, and what TMPV holders should consider.',
  alternates: { canonical: 'https://fermor.in/blogs/tata-motors-pv-stock-crash-jlr-fy27-outlook' },
  openGraph: {
    title: 'TMPV Share Price Falls 10%: What JLR\'s FY27 Guidance Means for Investors',
    description: 'TMPV closed near ₹355 on June 17, 2026, down 9.8%. A breakdown of JLR\'s investor day targets, US tariff risk, and the sector-wide luxury auto sell-off.',
    type: 'article',
    publishedTime: '2026-06-17T16:35:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['TMPV', 'Tata Motors', 'JLR', 'Nifty 50', 'Stock Analysis', 'Indian Markets'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TMPV Share Price Falls 10%: JLR FY27 Outlook Analysis',
    description: 'JLR guided for 4% EBIT margins and break-even cash flow in FY27. The market sold off anyway. Here is why.',
  },
  keywords: [
    'TMPV share price', 'Tata Motors PV stock', 'JLR FY27 outlook', 'TMPV share price today',
    'Jaguar Land Rover investor day', 'TMPV Nifty 50', 'Tata Motors passenger vehicles stock',
    'JLR tariffs US', 'TMPV stock analysis', 'tata motors pv share price',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'TMPV Share Price Falls 10%: What JLR\'s FY27 Guidance Means for Investors',
  description: 'Tata Motors PV fell 9.8% on June 17, 2026 after JLR released its FY27 investor day targets. Analysis of the EBIT margin guidance, US tariff exposure, BMW\'s concurrent warning, and implications for retail investors.',
  datePublished: '2026-06-17T16:35:00+05:30',
  dateModified: '2026-06-17T16:35:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/tata-motors-pv-stock-crash-jlr-fy27-outlook' },
  articleSection: 'Stock Analysis',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Organization', name: 'Tata Motors Passenger Vehicles Ltd', tickerSymbol: 'TMPV', sameAs: 'https://www.tatamotors.com' },
    { '@type': 'Organization', name: 'Jaguar Land Rover', alternateName: 'JLR' },
  ],
  mentions: [
    { '@type': 'Organization', name: 'BMW AG' },
    { '@type': 'Organization', name: 'Stellantis' },
  ],
  keywords: 'TMPV share price, TMPV stock, Tata Motors PV, JLR FY27 outlook, Jaguar Land Rover, Nifty 50',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'TMPV Share Price Falls 10%: JLR FY27 Outlook', item: 'https://fermor.in/blogs/tata-motors-pv-stock-crash-jlr-fy27-outlook' },
  ],
};

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  red:    '#B91C1C',
  green:  '#166534',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

function Breadcrumb() {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'Stock Analysis' }].map((crumb, i, arr) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < arr.length - 1 && crumb.href ? (
              <Link href={crumb.href} style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < arr.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `3px solid #CCCCCC`, background: '#FAFAFA', padding: '15px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15.5, color: C.ink2, lineHeight: 1.65, fontStyle: 'italic' }}>
      {children}
    </div>
  );
}

function KeyNumbers() {
  const items = [
    { label: 'TMPV closing price', value: '~₹355', note: 'Jun 17, 2026' },
    { label: 'Session fall', value: '−9.8%', note: 'single day', red: true },
    { label: '1-year return', value: '−12.5%', note: 'vs Nifty −3.3%', red: true },
    { label: 'Market cap', value: '₹1.46L Cr', note: '' },
    { label: 'JLR FY27 EBIT target', value: '4%', note: 'vs ~0% in FY26' },
    { label: 'JLR cash flow target', value: 'Break-even', note: 'vs −£2.3B FY26' },
    { label: 'JLR revenue share', value: '~80%', note: 'of TMPV total revenue' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>Key Numbers</span>
      </div>
      {items.map((item, i) => (
        <div key={item.label} style={{ padding: '12px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, background: '#fff' }}>
          <div>
            <div style={{ fontSize: 12.5, color: C.ink3 }}>{item.label}</div>
            {item.note && <div style={{ fontSize: 11, color: C.ink3, marginTop: 2 }}>{item.note}</div>}
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: item.red ? C.red : C.dark, fontFamily: POPPINS, flexShrink: 0 }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Capital Gains Calculator', desc: 'Tax on any stock profit or loss', href: '/calculators/capital-gains-calculator' },
    { label: 'CAGR Calculator', desc: 'Annualised return on any holding', href: '/calculators/cagr-calculator' },
    { label: 'Investment Comparison', desc: 'Stocks vs SIP vs FD over any period', href: '/calculators/investment-comparison-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 18px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 11.5, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute investment advice. Stock prices and market conditions change rapidly. Past performance does not guarantee future returns. Always consult a SEBI-registered financial advisor before making investment decisions.
      </p>
    </div>
  );
}

function RelatedTools() {
  const cards = [
    { title: 'Capital Gains Calculator', href: '/calculators/capital-gains-calculator', desc: 'Calculate STCG and LTCG tax on your stock trades with the correct post-FY24 tax slabs.' },
    { title: 'CAGR Calculator', href: '/calculators/cagr-calculator', desc: 'Enter your buy price, sell price and holding period to get the annualised return on any investment.' },
    { title: 'Investment Comparison', href: '/calculators/investment-comparison-calculator', desc: 'Compare how the same money grows across equity, systematic investing, and fixed deposits.' },
  ];
  return (
    <section style={{ padding: '44px 0 52px', borderTop: `1px solid ${C.border}` }}>
      <h2 style={{ fontFamily: POPPINS, fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 20, letterSpacing: '-.01em' }}>
        Run the numbers yourself
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {cards.map(card => (
          <Link key={card.href} href={card.href} style={{ display: 'block', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', textDecoration: 'none' }}>
            <div style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, lineHeight: 1.4, marginBottom: 8 }}>{card.title}</div>
            <div style={{ fontFamily: INTER, fontSize: 13, color: C.ink3, lineHeight: 1.55 }}>{card.desc}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.ink3, fontFamily: INTER }}>Stock Analysis</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 600, color: C.dark, lineHeight: 1.13, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 820 }}>
            TMPV Share Price Falls Nearly 10%: What JLR&apos;s FY27 Guidance Means for Investors
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Tata Motors Passenger Vehicles hit ₹355 on Wednesday, down 9.8% in a single session. JLR held its investor day. The numbers looked reasonable on paper. The market wasn&apos;t buying it.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
            <time dateTime="2026-06-17T16:35:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jun 17, 2026 · 4:35 PM IST</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>5 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { symbol: 'TMPV', change: '−9.8%', down: true },
              { symbol: 'NIFTY 50', change: '+0.40%', down: false },
              { symbol: 'BMW AG', change: '−11.5%', down: true },
            ].map(t => (
              <span key={t.symbol} style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 10px', background: '#fff' }}>
                <span style={{ color: C.ink2 }}>{t.symbol} </span>
                <span style={{ color: t.down ? C.red : C.green }}>{t.change}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article style={{ fontFamily: INTER, minWidth: 0 }}>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              TMPV has become predictable in one uncomfortable way: whenever JLR publishes something, the stock reacts hard. Wednesday was no exception. Jaguar Land Rover released its FY27 investor day targets, guided for 13% revenue growth and 4% EBIT margins, and TMPV fell 9.8% anyway.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The JLR guidance was not bad on paper. EBIT margins moving from near zero in FY26 to 4% in FY27 is real progress. Operating cash flow going from negative £2.3 billion to break-even is a significant shift. JLR also reaffirmed its £18 billion investment commitment through FY29 and a $2.3 billion cost reduction target across two years.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              So why did the stock fall this hard? The market is not pricing FY27 guidance. It is pricing FY26&apos;s reality and the structural problem that nobody has fully resolved.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              The US tariff problem has no quick fix
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The Defender and Range Rover, JLR&apos;s two strongest-selling products in the US, are assembled in the UK and exported to America. That arrangement worked for years. Trump-era tariffs have made it expensive. JLR has no US manufacturing base, so unlike BMW or Mercedes it cannot sidestep the tariff cost by building closer to the buyer.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              At investor day, JLR described North America as its most important market and set an ambition to grow the US operation to the scale of its entire current global business. JLR also announced a joint vehicle development program with Stellantis, the Dutch group that owns Dodge, Jeep and Ram, targeted at the American market. Partnering with a company that already has US assembly capacity is a reasonable path to eventually reducing tariff exposure without financing a greenfield plant from scratch.
            </p>

            <Callout>
              &quot;JLR is targeting double-digit revenue growth over the medium term and will accelerate its growth agenda with increased focus on North America, its biggest market.&quot;
            </Callout>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The Stellantis program addresses a medium-term problem. Tariffs are a cost the company is absorbing today. Investors are pricing the risk they can see right now, not the ambition being described for two years out.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              A difficult year, and then the sector sold off too
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              FY26 was difficult for JLR beyond tariffs. A cyberattack hit operations. A supplier fire disrupted production schedules. Luxury auto demand has been softening in China, where JLR and most European peers have been feeling pressure. All of this while JLR is simultaneously relaunching the Jaguar brand from the ground up. The GT-Type 01, a new four-door luxury car, is due for reveal later this year.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Wednesday added a sector-level problem. Hours after the JLR investor day, BMW AG released a profit warning guiding its carmaking margin to as low as 1% in 2026, citing soft Chinese demand and supply chain disruptions tied to the US-Israel conflict. BMW shares dropped 11.5%. A warning of that scale from the second-largest luxury automaker does not stay contained to one stock. It marks down the entire segment.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              TMPV came into the session already under pressure. The BMW announcement added to it.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              For investors holding TMPV
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              TMPV is down 12.5% over the past twelve months against a 3.3% fall in the Nifty 50. The stock closed near ₹355, with a market cap of roughly ₹1.46 lakh crore. Anyone who bought above ₹395 at any point this year is sitting on a loss.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The original case for TMPV was a multi-year hold: JLR&apos;s operational recovery, Tata&apos;s growing share of India&apos;s EV market, and premium brand leverage. None of those fundamentals have broken. What has shifted is the timeline. FY28 and FY29 are when the margin improvement should become more convincing, assuming cost discipline holds, tariff conditions improve, and the new Jaguar lineup generates commercial traction.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Investors holding TMPV as a small position inside a diversified portfolio probably do not need to act on this. Those who built a larger position around the JLR recovery thesis have a clearer question: has the thesis broken, or just been delayed? The answer depends on how you read JLR&apos;s cost execution over the next two quarters.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Three things to watch
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              First is quarterly EBIT margin: watch whether JLR actually trends toward the 4% FY27 target or whether Q1 guidance comes in below that. Second is the Stellantis program timeline. Any concrete US manufacturing commitment would change the tariff exposure picture materially. Third is the GT-Type 01. The Jaguar rebrand is expensive, and the market reception to that car will say a lot about whether the spend is working.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              If you are weighing whether to average down or book the loss, run the post-tax numbers before deciding. Fermor&apos;s{' '}
              <Link href="/calculators/capital-gains-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Capital Gains Calculator
              </Link>
              {' '}covers STCG and LTCG on equities for the current tax slabs. If you are also rethinking direct equity versus systematic investing, the{' '}
              <Link href="/calculators/investment-comparison-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Investment Comparison tool
              </Link>
              {' '}lets you put both approaches side by side over any time horizon.
            </p>

            <RelatedTools />
            <Disclaimer />
          </article>

          <aside
            className="tata-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><KeyNumbers /></div>
            <div style={{ flexShrink: 0 }}><FermorTools /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: C.border, margin: '24px 0 0' }} />
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .tata-sidebar::-webkit-scrollbar { width: 5px; }
        .tata-sidebar::-webkit-scrollbar-track { background: transparent; }
        .tata-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .tata-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

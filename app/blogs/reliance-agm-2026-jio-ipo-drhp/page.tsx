import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'Reliance AGM 2026: Jio IPO DRHP Filed With SEBI, Rs 30,000 Cr Profit, AI Backbone',
  description:
    "Jio Platforms filed its IPO draft (DRHP) with SEBI at Reliance Industries' 49th AGM today. Fresh issue of 27 crore shares. Jio FY26 profit Rs 30,000+ crore (+15.1%). Reliance Intelligence: India's AI backbone in Jamnagar. Retail hits 20,000 stores. RIL dividend Rs 6/share.",
  alternates: { canonical: 'https://fermor.in/blogs/reliance-agm-2026-jio-ipo-drhp' },
  openGraph: {
    title: 'Reliance AGM 2026: Jio Files IPO Draft With SEBI',
    description: "Jio DRHP filed with SEBI. India's largest IPO formally in motion. Jio FY26 PAT Rs 30,000+ crore. Reliance Intelligence AI backbone in Jamnagar. RIL revenue Rs 11.75 lakh crore (+10%). Retail at 20,000 stores.",
    type: 'article',
    publishedTime: '2026-06-19T15:45:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Reliance AGM 2026', 'Jio IPO', 'RIL', 'Mukesh Ambani', 'Jio DRHP', 'Reliance Industries'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reliance AGM 2026: Jio IPO DRHP Filed With SEBI',
    description: "India's most awaited IPO is formally in motion. Jio filed its DRHP with SEBI at today's Reliance AGM. Full breakdown of every announcement.",
  },
  keywords: [
    'reliance agm 2026', 'jio ipo', 'reliance agm', 'ril agm 2026', 'jio ipo drhp',
    'jio ipo date', 'mukesh ambani agm 2026', 'reliance agm 2026 announcements',
    'reliance share price', 'jio platforms ipo', 'reliance intelligence ai',
    'ril agm live', 'reliance agm 2026 key announcements', 'jio ipo sebi filing',
    'jio ipo latest news', 'jio listing date 2026', 'reliance jio ipo', 'reliance ipo',
    'jio ipo price', 'jio ipo price band', 'jio ipo valuation', 'jio ipo expected price',
    'jio ipo 2026', 'jio platforms', 'jio drhp', 'drhp', 'reliance jio',
    'reliance agm jio ipo', 'reliance agm mukesh ambani', 'jio ipo shareholder quota',
    'upcoming ipo 2026', 'jio ipo size', 'myjio', 'jio call agent', 'reliance intelligence',
    'ril share price', 'reliance agm live', 'jio platforms ipo date', 'reliance industries agm',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Reliance AGM 2026: Jio Platforms Files IPO DRHP With SEBI, Rs 30,000 Crore Profit, India AI Backbone Announced',
  description: "Reliance Industries 49th AGM: Jio Platforms DRHP filed with SEBI (27 crore fresh issue), Jio FY26 PAT crosses Rs 30,000 crore (+15.1%), Reliance Intelligence launches India sovereign AI in Jamnagar, Retail hits 20,000 stores, Rs 6/share dividend declared for FY26.",
  datePublished: '2026-06-19T15:45:00+05:30',
  dateModified: '2026-06-19T15:45:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/reliance-agm-2026-jio-ipo-drhp' },
  articleSection: 'IPO',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Organization', name: 'Reliance Industries Limited', tickerSymbol: 'RELIANCE', sameAs: 'https://www.ril.com' },
    { '@type': 'Organization', name: 'Jio Platforms Limited' },
  ],
  mentions: [
    { '@type': 'Person', name: 'Mukesh Ambani' },
    { '@type': 'Organization', name: 'Securities and Exchange Board of India', alternateName: 'SEBI' },
  ],
  keywords: 'reliance agm 2026, jio ipo, jio drhp sebi, reliance industries agm, mukesh ambani announcements, jio ipo date',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Reliance AGM 2026: Jio IPO DRHP and Key Announcements', item: 'https://fermor.in/blogs/reliance-agm-2026-jio-ipo-drhp' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Jio IPO date?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jio Platforms filed its DRHP (Draft Red Herring Prospectus) with SEBI on June 19, 2026. SEBI typically takes 30 to 75 days to issue observations. After SEBI approval, the company files the final prospectus and sets the price band. The earliest the Jio IPO can open for subscription is September to October 2026, subject to SEBI approval and market conditions.' },
    },
    {
      '@type': 'Question',
      name: 'What was announced at Reliance AGM 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Reliance Industries 49th AGM (June 19, 2026) announced: (1) Jio Platforms filed its DRHP with SEBI for an IPO involving a fresh issue of 27 crore shares. (2) Jio FY26 profit after tax crossed Rs 30,000 crore, up 15.1% year-on-year. (3) Reliance Intelligence, India\'s sovereign AI compute backbone, to be built in Jamnagar with 120 MW capacity. (4) Jio Call Agent ("Hey Jio") voice assistant. (5) Reliance Retail crossed 20,000 stores. (6) RIL FY26 dividend: Rs 6 per share. (7) JioStar GenAI Media Studio and LEO satellite push announced.' },
    },
    {
      '@type': 'Question',
      name: 'What is Reliance Intelligence?',
      acceptedAnswer: { '@type': 'Answer', text: 'Reliance Intelligence is a sovereign AI supercomputing infrastructure being built by Reliance Industries in Jamnagar, Gujarat. The first phase is 120 megawatts of AI compute capacity, powered by Reliance\'s own solar energy from Kutch, to be commissioned by end of 2026. It is designed to serve as India\'s domestic AI backbone, independent of foreign cloud providers.' },
    },
    {
      '@type': 'Question',
      name: 'Should I apply for the Jio IPO?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Jio IPO has not opened yet. As of June 2026, the DRHP has been filed with SEBI. The price band and subscription dates will only be announced after SEBI approves the prospectus. When the IPO does open, evaluate it based on the final RHP financials, the price band relative to Jio\'s earnings and subscriber base, and how it compares to Bharti Airtel as the primary listed peer. Consult a SEBI-registered financial advisor before applying.' },
    },
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
  green:  '#166534',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

function Breadcrumb() {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'IPO' }].map((crumb, i, arr) => (
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
    <div style={{ borderLeft: `3px solid #CCCCCC`, background: '#FAFAFA', padding: '15px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function KeyAnnouncements() {
  const items = [
    { label: 'Jio IPO DRHP', value: 'Filed with SEBI', note: 'June 19, 2026 (today)', green: true },
    { label: 'Fresh issue size', value: '27 crore shares', note: 'Rs 10 face value, pure fresh issue' },
    { label: 'Jio FY26 PAT', value: 'Rs 30,000+ crore', note: '+15.1% year-on-year', green: true },
    { label: 'RIL FY26 revenue', value: 'Rs 11,75,919 crore', note: '+10% year-on-year', green: true },
    { label: 'Reliance Retail stores', value: '20,000+', note: 'Largest in India by store count' },
    { label: 'AI compute capacity', value: '120 MW', note: 'Jamnagar, solar-powered, Dec 2026' },
    { label: 'RIL share (Jun 19)', value: 'Rs 1,315.80', note: 'Approximately -1% on day' },
    { label: 'FY26 dividend', value: 'Rs 6/share', note: 'Record date June 5, 2026' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>AGM 2026: Key Numbers</span>
      </div>
      {items.map((item, i) => (
        <div key={item.label} style={{ padding: '12px 18px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, background: '#fff' }}>
          <div>
            <div style={{ fontSize: 12.5, color: C.ink3 }}>{item.label}</div>
            {item.note && <div style={{ fontSize: 11, color: C.ink3, marginTop: 2 }}>{item.note}</div>}
          </div>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: item.green ? C.green : C.dark, fontFamily: POPPINS, flexShrink: 0, textAlign: 'right' }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Capital Gains Calculator', desc: 'Tax on selling RIL shares at any price', href: '/calculators/capital-gains-calculator' },
    { label: 'CAGR Calculator', desc: 'Annualised return from your RIL entry price', href: '/calculators/cagr-calculator' },
    { label: 'SIP Calculator', desc: 'Build a Reliance position systematically', href: '/calculators/sip-calculator' },
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

function RelatedTools() {
  const cards = [
    { title: 'Capital Gains Calculator', href: '/calculators/capital-gains-calculator', desc: 'Calculate STCG and LTCG tax on selling RIL shares at any price, under the latest tax rules.' },
    { title: 'CAGR Calculator', href: '/calculators/cagr-calculator', desc: 'Enter your RIL buy price and current price to see the actual annualised return from your holding.' },
    { title: 'Investment Comparison', href: '/calculators/investment-comparison-calculator', desc: 'Compare what the same amount grows to in equity, SIP, or fixed deposits over your time horizon.' },
  ];
  return (
    <section style={{ padding: '44px 0 52px', borderTop: `1px solid ${C.border}` }}>
      <h2 style={{ fontFamily: POPPINS, fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 20, letterSpacing: '-.01em' }}>Run the numbers yourself</h2>
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

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute investment advice. SEBI review of the Jio DRHP is ongoing; IPO dates, pricing, and structure may change before the final prospectus is issued. Jio Platforms financials are sourced from AGM announcements and public disclosures. Consult a SEBI-registered financial advisor before making investment decisions.
      </p>
    </div>
  );
}

export default function RILAGMArticlePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.ink3, fontFamily: INTER }}>IPO · Stock Analysis</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 600, color: C.dark, lineHeight: 1.13, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 820 }}>
            Reliance AGM 2026: Jio Files IPO Draft With SEBI. Here Is Everything Mukesh Ambani Announced.
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Jio Platforms filed its DRHP with SEBI at the 49th Reliance AGM today. The Jio IPO process is now formally open. Jio FY26 profit crossed Rs 30,000 crore, Reliance Intelligence was announced as India&apos;s sovereign AI backbone, and Retail crossed 20,000 stores.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
            <time dateTime="2026-06-19T15:45:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jun 19, 2026 · 3:45 PM IST</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>6 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { symbol: 'RELIANCE', change: 'AGM today', down: false },
              { symbol: 'JIO IPO', change: 'DRHP filed', down: false },
            ].map(t => (
              <span key={t.symbol} style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, border: `1px solid ${C.border}`, borderRadius: 6, padding: '4px 10px', background: '#fff' }}>
                <span style={{ color: C.ink2 }}>{t.symbol} </span>
                <span style={{ color: C.green }}>{t.change}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article style={{ fontFamily: INTER, minWidth: 0 }}>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Every Reliance Industries AGM carries national weight. The 2026 edition broke through the usual speculation with something concrete: Jio Platforms has filed its Draft Red Herring Prospectus with SEBI. The document is with the regulator. The most awaited Jio IPO in India&apos;s market history is now formally in the SEBI review queue.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Beyond the Jio IPO headline, the AGM delivered three other significant announcements. Jio&apos;s profit after tax for FY26 crossed Rs 30,000 crore with 15.1 percent year-on-year growth. Reliance Intelligence, a sovereign AI compute infrastructure initiative built in Jamnagar, was unveiled. Reliance Retail crossed 20,000 stores across India. The RIL share price closed around Rs 1,315.80 on the day, down approximately 1 percent, reflecting the broader market weakness rather than any negative reaction to the AGM.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What the Jio IPO DRHP Filing With SEBI Actually Means
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The DRHP, or Draft Red Herring Prospectus, is the regulatory document that formally starts the IPO process in India. Once filed with SEBI, it begins a review period during which SEBI examines the company&apos;s financials, business model, risk factors, and use of proceeds, then issues observations. SEBI typically takes 30 to 75 days for this review. After the company incorporates SEBI&apos;s observations, it files the final Red Herring Prospectus, announces the price band, and opens the subscription window for investors. The earliest the Jio IPO can open for subscription is September to October 2026, and that depends on SEBI moving quickly and the company completing formalities without delays.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The Jio DRHP proposes a fresh issue of up to 27 crore equity shares at a face value of Rs 10 per share. This is a pure fresh issue with no Offer for Sale component. Reliance Industries is not selling its existing stake in Jio. The IPO proceeds go directly to Jio Platforms, likely for 5G densification, AI infrastructure buildout, and balance sheet strengthening. Akash, Isha, and Anant Ambani are being positioned as the operational leaders of the IPO, placing the next generation of the Ambani family as the public face of Jio&apos;s standalone listing. If Jio prices at valuations consistent with its subscriber base and profit trajectory, this would rank as India&apos;s largest IPO in history.
            </p>

            <Callout>
              A fresh issue with no OFS means existing Reliance shareholders are not exiting. Reliance Industries will remain Jio&apos;s majority shareholder after the listing. What the IPO delivers is price discovery. The market will finally price Jio as a standalone entity, making visible the value that currently sits inside RIL&apos;s stock price without a clear breakdown.
            </Callout>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Jio FY26 Financials: Rs 30,000 Crore Profit and 490 Million Subscribers
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Jio Platforms reported profit after tax of over Rs 30,000 crore for FY2025-26, a 15.1 percent increase over the previous year. This is the earnings figure that will anchor the IPO valuation conversation. When SEBI approves the DRHP and the price band is announced, investors will be comparing this profit number against Jio&apos;s subscriber base, revenue growth, and the listed peer benchmark.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Jio has over 490 million telecom subscribers, the largest base of any telecom company in India. The revenue model covers wireless broadband across 4G and 5G, JioFiber home broadband, the JioMart commerce platform, and digital media services through JioTV, JioCinema, and JioSaavn. The combination of scale, profit growth, and revenue diversification makes Jio materially different from a pure-play telco.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The benchmark investors will use to price the Jio IPO is Bharti Airtel. Airtel is India&apos;s second-largest telecom company by subscribers and the most directly comparable listed entity. Jio&apos;s higher subscriber count and growing digital revenue will be the arguments for a valuation premium. The final RHP disclosures will give retail investors the detailed financial comparison needed to make that judgment.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Reliance Intelligence: India&apos;s Sovereign AI Backbone
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The Reliance Intelligence announcement may be the most strategically significant part of the AGM beyond the Jio IPO. Ambani announced that Reliance is building India&apos;s sovereign AI supercomputing backbone in Jamnagar, powered entirely by clean energy from Reliance&apos;s own solar generation in Kutch. The first 120 megawatts of AI compute capacity will be commissioned by the end of 2026.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Akash Ambani demonstrated the first consumer product from this infrastructure: Jio Call Agent, a native voice assistant activated by saying &quot;Hey Jio.&quot; It handles real-time conference call transcriptions for 8 to 10 simultaneous speakers, generates call summaries, tracks action items, and schedules follow-up meetings. The compute infrastructure sits in Jamnagar. The consumer interface runs on Jio&apos;s network. No other Indian telecom company can replicate this vertical integration at the same stage.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Two further initiatives were disclosed at the AGM. JioStar GenAI Media Studio, a generative AI production platform for JioStar&apos;s media workflows, targets the Rs 1.5 lakh crore Indian media industry. Jio also announced it is developing ground station infrastructure and evaluating a sovereign Low-Earth Orbit satellite constellation to deliver high-speed internet to areas beyond the reach of 5G tower coverage.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Reliance Retail at 20,000 Stores and the FY26 Dividend
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Reliance Retail crossing 20,000 stores makes it India&apos;s largest retailer by store count. The retail business spans grocery through Smart Bazaar and Fresh, fashion through Trends and Ajio, electronics through Reliance Digital, and wholesale formats. Combined with the JioMart digital platform, Reliance holds a scale in both physical and digital retail that no other Indian company currently matches.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              For FY2025-26, Reliance Industries declared a final dividend of Rs 6 per share. The record date was June 5, 2026. The dividend was to be paid within seven days of the AGM via electronic mode. If you held RIL shares before June 5, the credit should be arriving shortly.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What the Reliance AGM Means for RIL Investors
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The Jio DRHP filing is the most material value unlock event for RIL shareholders in years. Jio&apos;s value has been embedded inside RIL&apos;s stock price without a public market reference point. Once Jio lists separately, investors will be able to see what Jio is independently worth. That visibility tends to drive a re-rating of the parent company as the sum-of-parts valuation becomes clearer to the market.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The practical near-term question for RIL holders is about timing. SEBI review takes 30 to 75 days. The actual subscription window is months away. Between now and the IPO opening, RIL stock will trade on market sentiment and on whatever SEBI filings and financial disclosures reveal between now and then.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              For investors who have held RIL for several years, the post-tax position matters when thinking about whether to act on today&apos;s move. Fermor&apos;s{' '}
              <Link href="/calculators/capital-gains-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Capital Gains Calculator
              </Link>
              {' '}will show the LTCG or STCG liability on selling at any price. The{' '}
              <Link href="/calculators/cagr-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                CAGR Calculator
              </Link>
              {' '}shows your actual annualised return from your entry price, which is useful context before making a decision based on a single day&apos;s news.
            </p>

            <RelatedTools />
            <Disclaimer />
          </article>

          <aside
            className="reliance-sidebar"
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
            <div style={{ flexShrink: 0 }}><KeyAnnouncements /></div>
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
        .reliance-sidebar::-webkit-scrollbar { width: 5px; }
        .reliance-sidebar::-webkit-scrollbar-track { background: transparent; }
        .reliance-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .reliance-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

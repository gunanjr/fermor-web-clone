import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'India vs Japan T20I 2026: India Win 200th T20I by 2 Runs',
  description: 'India beat Japan by 2 runs in a rain-hit 5-over T20I at Sano on September 22, 2026, the first-ever international between the two sides and India\'s 200th T20I win. Full scorecard, squads, and why India toured Japan.',
  alternates: { canonical: 'https://fermor.in/blogs/india-vs-japan-t20i-2026' },
  openGraph: {
    title: 'India vs Japan T20I 2026: India Win 200th T20I by 2 Runs - Fermor',
    description: 'Shreyas Iyer\'s 16 off 12 held up as India beat Japan by 2 runs in a rain-reduced 5-over T20I at Sano, sealing India\'s 200th T20I win in the first-ever meeting between the two sides.',
    type: 'article',
    publishedTime: '2026-09-22T21:33:59+05:30',
    modifiedTime: '2026-09-22T21:33:59+05:30',
    authors: ['Fermor Analysis'],
    tags: ['India vs Japan', 'T20I', 'Cricket', 'Shreyas Iyer', 'Asian Games 2026'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India vs Japan T20I 2026 - Fermor',
    description: 'India beat Japan by 2 runs in a rain-reduced 5-over T20I at Sano, India\'s 200th T20I win in the first-ever meeting between the two sides.',
  },
  keywords: [
    'india vs japan', 'india vs japan cricket', 'india vs japan t20i', 'ind vs jpn', 'ind vs jpn live score',
    'india japan cricket match result', 'india japan t20 score', 'shreyas iyer japan', 'india 200 t20i wins',
    'india 200th t20i win', 'sano international cricket ground', 'india japan cricket history',
    'japan cricket team', 'india cricket schedule', 'india national cricket team', 'cricket live score',
    'cricket score', 'cricket match today', 'team india', 't20 world cup champions', 'asia games 2026 cricket',
    'india tour of japan 2026', 'india japan t20 highlights', 'india vs japan scorecard', 'cricbuzz india japan',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'India vs Japan T20I 2026: India Win 200th T20I by 2 Runs',
  description: 'India beat Japan by 2 runs in a rain-reduced 5-over T20I at Sano International Cricket Ground on September 22, 2026, the first-ever international between the two sides.',
  datePublished: '2026-09-22T21:33:59+05:30',
  dateModified: '2026-09-22T21:33:59+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/india-vs-japan-t20i-2026' },
  articleSection: 'Sports',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'India vs Japan T20I 2026', description: 'The first-ever international cricket match between India and Japan, played at Sano International Cricket Ground on September 22, 2026' },
  ],
  keywords: 'india vs japan, india vs japan t20i, ind vs jpn, shreyas iyer, india 200 t20i wins, sano international cricket ground',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'India vs Japan T20I 2026', item: 'https://fermor.in/blogs/india-vs-japan-t20i-2026' },
  ],
};

const faqItems = [
  { q: 'Who won the India vs Japan T20I?', a: 'India won by 2 runs. Chasing 33 in a rain-reduced 5-over match, Japan finished on 30 for 3, two runs short of India\'s 32 for 4, at Sano International Cricket Ground on September 22, 2026.' },
  { q: 'What was the final score in India vs Japan?', a: 'India scored 32 for 4 in their 5 overs, and Japan replied with 30 for 3 in their 5 overs. It was a five-over-a-side match, reduced from the full 20 overs because of a wet outfield.' },
  { q: 'Why was the India vs Japan match reduced to 5 overs?', a: 'Typhoon Dujuan had affected the Tochigi region through the week, leaving the outfield at Sano too wet for a full 20-over game. Umpires Chris Brown and Chris Thurgate cut the match to 5 overs a side after inspecting conditions.' },
  { q: 'Where was the India vs Japan T20I played?', a: 'At Sano International Cricket Ground in Sano, Tochigi Prefecture, Japan. Opened in 2016, it is Japan\'s first purpose-built cricket facility, and the match was sponsored as the Suzuki Cup.' },
  { q: 'Who was the player of the match in India vs Japan?', a: 'Shreyas Iyer, India\'s captain for the tour, was named Player of the Match for his 16 off 12 balls, the top score of the game on a slow, turning pitch where boundaries were hard to find.' },
  { q: 'Is this the first time India and Japan have played cricket against each other?', a: 'Yes. This was the first-ever international cricket match between India and Japan at any level, men\'s or women\'s, T20I or otherwise.' },
  { q: 'Why did India tour Japan for a cricket match?', a: 'The tour was organised under the "Sport 75" initiative marking 75 years of India-Japan diplomatic relations, and doubled as preparation for both teams ahead of the men\'s cricket tournament at the 2026 Asian Games.' },
  { q: 'What record did India set in the Japan match?', a: 'India became the first team in the history of the format to reach 200 T20I wins. Their first win came against South Africa in Johannesburg in 2006; the stretch from win 151 to 200 took only 66 matches, their fastest 50-win block yet.' },
  { q: 'Who captained India and Japan in this match?', a: 'Shreyas Iyer captained India, with Tilak Varma as vice-captain. Kendel Kadowaki-Fleming captained Japan and top-scored for his side with 12 runs.' },
  { q: 'How close did Japan come to beating India?', a: 'Very close. Japan needed 4 runs off the final ball to win. A swivel shot across the line deflected off the batter\'s pad to fine leg instead of the boundary, and India held on by 2 runs.' },
  { q: 'What is Japan\'s cricket team ICC status and world ranking?', a: 'Japan has been an ICC associate member since June 2005, after starting as an affiliate member in 1989. As of this match, Japan is ranked 41st in the ICC Men\'s T20I team rankings, and played their first-ever T20I in October 2022, against Indonesia.' },
  { q: 'Will India and Japan play cricket again?', a: 'Both nations are set to compete in the men\'s cricket tournament at the 2026 Asian Games. Japan enters at the group stage, while India, as reigning Asian Games champions and the reigning ICC Men\'s T20 World Cup holders, enters directly at the quarterfinal stage, so a rematch is possible but not guaranteed.' },
  { q: 'Who else played for India against Japan?', a: 'India\'s squad for the tour included Jasprit Bumrah, Sanju Samson, Ishan Kishan, Shivam Dube, Axar Patel, Washington Sundar, Arshdeep Singh, Ravi Bishnoi, and Vaibhav Sooryavanshi, alongside captain Shreyas Iyer and vice-captain Tilak Varma. Washington Sundar took 2 for 13, the best bowling figures on either side.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculators and clarity platform for India. The calculators are free to use and a free account lets you save your results.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/india-vs-japan-t20i-2026',
  name: 'India vs Japan T20I 2026: India Win 200th T20I by 2 Runs',
  url: 'https://fermor.in/blogs/india-vs-japan-t20i-2026',
  inLanguage: 'en-IN',
  datePublished: '2026-09-22T21:33:59+05:30',
  dateModified: '2026-09-22T21:33:59+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Cricket fans in India following the India tour of Japan',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#match-summary', name: 'How the Match Unfolded' },
    { '@type': 'WebPageElement', cssSelector: '#scorecard', name: 'Full Scorecard' },
    { '@type': 'WebPageElement', cssSelector: '#why-japan', name: 'Why India Toured Japan' },
    { '@type': 'WebPageElement', cssSelector: '#200-wins', name: 'India\'s 200th T20I Win' },
    { '@type': 'WebPageElement', cssSelector: '#japan-cricket', name: 'Japan Cricket: How Close They Came' },
    { '@type': 'WebPageElement', cssSelector: '#squads', name: "India's Touring Squad and Japan's Playing XI" },
    { '@type': 'WebPageElement', cssSelector: '#asian-games', name: 'What This Means for the Asian Games' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
};

const C = {
  dark: '#111111', dg: '#101214', ink: '#333333', ink2: '#555555', ink3: '#888888',
  border: '#E5E5E5', bg: '#F7F7F7', green: '#166534', paleDg: '#f1f3f4',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' } as React.CSSProperties;
const pStyle = { fontSize: 15.5, color: C.ink, lineHeight: 1.8, marginBottom: 20, fontFamily: INTER } as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'India vs Japan T20I 2026' }];
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < crumbs.length - 1 && crumb.href ? (
              <Link href={crumb.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function TableWrap({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '20px 0', fontFamily: INTER }}>
      {label && (
        <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function KVTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <TableWrap label="Match: Key Facts">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function InningsTable({ label, batting, bowling }: {
  label: string;
  batting: [string, string, string][];
  bowling: [string, string, string][];
}) {
  return (
    <TableWrap label={label}>
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 420 }}>
          <div style={{ display: 'flex', gap: 12, padding: '9px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Batter</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Runs (Balls)</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Dismissal</span>
          </div>
          {batting.map(([name, runs, dismissal], i) => (
            <div key={name} style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: i < batting.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'center' }}>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{name}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13.5, color: C.ink2, fontFamily: INTER, textAlign: 'right' as const }}>{runs}</span>
              <span style={{ flex: '0 0 90px', fontSize: 12, color: C.ink3, fontFamily: INTER, textAlign: 'right' as const }}>{dismissal}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ overflowX: 'auto' as const, borderTop: `1px solid ${C.border}` }}>
        <div style={{ minWidth: 420 }}>
          <div style={{ display: 'flex', gap: 12, padding: '9px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Bowler</span>
            <span style={{ flex: '0 0 70px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Overs</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Figures</span>
          </div>
          {bowling.map(([name, overs, figures], i) => (
            <div key={name} style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: i < bowling.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'center' }}>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{name}</span>
              <span style={{ flex: '0 0 70px', fontSize: 13.5, color: C.ink2, fontFamily: INTER, textAlign: 'right' as const }}>{overs}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{figures}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function KeyFacts() {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Final Score</span>
      </div>
      <div style={{ padding: '18px 16px', background: '#fff', textAlign: 'center' as const }}>
        <div style={{ fontSize: 13, color: C.ink3, marginBottom: 8 }}>5 Overs a Side</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: C.dark, fontFamily: POPPINS, marginBottom: 4 }}>India 32/4 beat Japan 30/3</div>
        <div style={{ fontSize: 12.5, color: C.ink3 }}>India won by 2 runs</div>
      </div>
    </div>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/spain-vs-argentina-fifa-world-cup-2026-final', label: 'FIFA World Cup 2026 Final: Spain Beat Argentina 1-0' },
    { href: '/blogs/sensex-nifty-market-crash-it-stocks-june-2026', label: 'Sensex, Nifty and IT Stocks: What Happened in June 2026' },
    { href: '/blogs', label: 'More Blogs from Fermor' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> Match facts, dates and figures on this page are compiled from BCCI, ICC and public tournament records. Fermor is a personal finance platform; this article is a factual sports recap and does not constitute financial advice.
      </p>
    </div>
  );
}

export default function IndiaVsJapanT20I2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Sports</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 840 }}>
            India vs Japan T20I 2026: India Win 200th T20I by 2 Runs
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Shreyas Iyer&apos;s 16 off 12 held up as India beat Japan by 2 runs in a rain-reduced 5-over T20I at Sano, the first-ever international cricket match between the two nations and India&apos;s 200th T20I win.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-09-22T21:33:59+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Sep 22, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>9 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              India beat Japan by 2 runs in the first-ever international cricket match between the two nations, at Sano International Cricket Ground on September 22, 2026. A wet outfield from Typhoon Dujuan cut the match to 5 overs a side.
            </p>
            <p style={pStyle}>
              India posted 32 for 4 batting first, and Japan fell 2 runs short on 30 for 3, needing 4 off the final ball. The result also gave India their 200th T20I win, the first team in the format&apos;s history to reach that mark.
            </p>

            <KVTable rows={[
              { label: 'Final Score', value: 'India 32/4 beat Japan 30/3' },
              { label: 'Result', value: 'India won by 2 runs' },
              { label: 'Format', value: '5 overs a side (reduced from 20)' },
              { label: 'Venue', value: 'Sano International Cricket Ground, Tochigi' },
              { label: 'Date', value: 'September 22, 2026' },
              { label: 'Toss', value: 'India won, chose to bat' },
              { label: 'Player of the Match', value: 'Shreyas Iyer (16 off 12)' },
              { label: 'India Captain', value: 'Shreyas Iyer' },
              { label: 'Japan Captain', value: 'Kendel Kadowaki-Fleming' },
              { label: 'Milestone', value: "India's 200th T20I win, a first" },
            ]} />

            <h2 id="match-summary" style={hStyle}>How the Match Unfolded</h2>
            <p style={pStyle}>
              Typhoon Dujuan had soaked the Tochigi region through the week, and umpires Chris Brown and Chris Thurgate cut the match to 5 overs a side after inspecting a still-wet outfield. Shreyas Iyer won the toss and chose to bat.
            </p>
            <p style={pStyle}>
              Japan opened with spinners on a slow, turning pitch and struck immediately: Abhishek Sharma was out on the first ball he faced. Sanju Samson made 9 and Ishan Kishan 3 as India struggled for boundaries, with all 5 overs of the innings bowled by spin.
            </p>
            <p style={pStyle}>
              Shreyas Iyer top-scored with 16 off 12 balls to lift India to 32 for 4. The innings produced only two boundaries in total, a measure of how difficult the surface had become.
            </p>
            <p style={pStyle}>
              Chasing 33, Japan gave India a real scare. Kendel Kadowaki-Fleming top-scored with 12, and Japan needed 4 runs off the final ball to complete what commentators called one of the great upsets in cricket.
            </p>
            <p style={pStyle}>
              A swivel shot across the line deflected off the batter&apos;s pad to fine leg instead of the boundary, and India held on to win by 2 runs.
            </p>

            <h2 id="scorecard" style={hStyle}>Full Scorecard: India vs Japan, Only T20I</h2>
            <InningsTable
              label="India Innings: 32/4 (5 overs)"
              batting={[
                ['Sanju Samson (wk)', '9 (7)', 'c Ito b Takahashi'],
                ['Abhishek Sharma', '0 (1)', 'c Slater b Hara-Hinze'],
                ['Ishan Kishan', '3 (6)', 'c Taniyama b Ito'],
                ['Shreyas Iyer (c)', '16 (12)', 'c Taniyama b Hara-Hinze'],
                ['Tilak Varma', '1 (3)', 'not out'],
                ['Shivam Dube', '0 (1)', 'not out'],
              ]}
              bowling={[
                ['Charlie Hara-Hinze', '2', '2/17'],
                ['Ibrahim Takahashi', '2', '1/13'],
                ['Benjamin Ito', '1', '1/2'],
              ]}
            />
            <InningsTable
              label="Japan Innings: 30/3 (5 overs)"
              batting={[
                ['Kendel Kadowaki-Fleming (c)', '12 (12)', 'c Thakur b Sundar'],
                ['Lachlan Yamamoto-Lake', '1 (4)', 'run out'],
                ['Ibrahim Takahashi', '4 (3)', 'c Bishnoi b Sundar'],
                ['Benjamin Ito', '9 (8)', 'not out'],
                ['Alex Patmore (wk)', '2 (3)', 'not out'],
              ]}
              bowling={[
                ['Washington Sundar', '2', '2/13'],
                ['Axar Patel', '2', '0/7'],
                ['Ravi Bishnoi', '1', '0/10'],
              ]}
            />
            <p style={{ fontSize: 12, color: C.ink3, fontFamily: INTER, marginTop: -4, marginBottom: 20 }}>
              All 10 overs of the match were bowled by spinners on a slow, low pitch. Extras (3 for India, 2 for Japan) account for the gap between individual scores and each team&apos;s total.
            </p>

            <h2 id="why-japan" style={hStyle}>Why India Toured Japan</h2>
            <p style={pStyle}>
              The tour was organised under &quot;Sport 75,&quot; an initiative marking 75 years of diplomatic relations between India and Japan.
            </p>
            <p style={pStyle}>
              BCCI Secretary Devajit Saikia called it a chance to take Indian cricket &quot;to new territory&quot; and introduce the sport to a wider audience in Japan and East Asia.
            </p>
            <p style={pStyle}>
              It also served as preparation for both teams ahead of the men&apos;s cricket tournament at the 2026 Asian Games. Japan Cricket Association CEO Naoki Miyaji called hosting the reigning T20 World Cup champions &quot;a landmark moment for our association.&quot;
            </p>

            <h2 id="200-wins" style={hStyle}>India&apos;s 200th T20I Win: A Record Nobody Else Has</h2>
            <p style={pStyle}>
              The win over Japan was India&apos;s 200th in T20 Internationals, making India the first team in the format&apos;s history to reach the mark. The milestones along the way show how sharply India&apos;s pace has picked up.
            </p>
            <TableWrap label="India's Path to 200 T20I Wins">
              {[
                ['1st win', 'vs South Africa, Johannesburg, 2006 (6 wickets)'],
                ['50th win', 'vs Sri Lanka, Colombo, 2017 (7 wickets)'],
                ['100th win', 'vs West Indies, Kolkata, 2022 (8 runs)'],
                ['150th win', 'vs Australia, Gros Islet, 2024 (24 runs)'],
                ['200th win', 'vs Japan, Sano, 2026 (2 runs)'],
              ].map(([label, value], i, arr) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
                  <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{value}</span>
                </div>
              ))}
            </TableWrap>
            <p style={pStyle}>
              Wins 151 to 200 took only 66 matches, India&apos;s fastest 50-win stretch yet. India enters the 2026 Asian Games as the reigning ICC Men&apos;s T20 World Cup champions and as the defending Asian Games gold medallists in men&apos;s cricket.
            </p>

            <h2 id="japan-cricket" style={hStyle}>Japan Cricket: How Close a 41st-Ranked Team Came</h2>
            <p style={pStyle}>
              Japan has been an ICC associate member since June 2005, after starting as an affiliate member in 1989, and is currently ranked 41st in the ICC Men&apos;s T20I team rankings. The side played its first-ever T20I only in October 2022, against Indonesia.
            </p>
            <BulletList items={[
              'Japan won the 2005 ICC EAP Cricket Cup and the 2018 Twenty20 East Asia Cup.',
              'The team finished runners-up in the 2023 T20 World Cup East Asia-Pacific Regional Final.',
              'Japan made its first appearance at the Asian Games in 2022.',
              'Sano International Cricket Ground, opened in 2016, is Japan\'s first purpose-built cricket venue and the home of the Japan Cricket League and the Japan Cup.',
            ]} />
            <p style={pStyle}>
              Against a side ranked 41 places below them and playing against a reigning World Cup-winning nation for the first time, Japan came within one deflected shot of a result that would have ranked among the biggest upsets the sport has seen.
            </p>

            <h2 id="squads" style={hStyle}>India&apos;s Touring Squad and Japan&apos;s Playing XI</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 8 }}>
              <TableWrap label="India Squad">
                {['Shreyas Iyer (c)', 'Tilak Varma (vc)', 'Abhishek Sharma', 'Sanju Samson (wk)', 'Ishan Kishan (wk)', 'Shivam Dube', 'Axar Patel', 'Washington Sundar', 'Ravi Bishnoi', 'Jasprit Bumrah', 'Arshdeep Singh', 'Vaibhav Sooryavanshi', 'Yash Thakur', 'Vipraj Nigam'].map((name, i, arr) => (
                  <div key={name} style={{ padding: '9px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                    <span style={{ fontSize: 13.5, color: C.ink, fontFamily: INTER }}>{name}</span>
                  </div>
                ))}
              </TableWrap>
              <TableWrap label="Japan: Players Who Featured">
                {['Kendel Kadowaki-Fleming (c)', 'Alex Patmore (wk)', 'Lachlan Yamamoto-Lake', 'Ibrahim Takahashi', 'Benjamin Ito', 'Charlie Hara-Hinze', 'Shoma Slater', 'Makoto Taniyama'].map((name, i, arr) => (
                  <div key={name} style={{ padding: '9px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                    <span style={{ fontSize: 13.5, color: C.ink, fontFamily: INTER }}>{name}</span>
                  </div>
                ))}
              </TableWrap>
            </div>
            <p style={{ ...pStyle, fontSize: 13, color: C.ink3 }}>
              Vipraj Nigam replaced Varun Chakravarthy in India&apos;s squad after Chakravarthy was ruled out with a side strain on September 16, 2026. Japan named a wider squad for the tour; the eight names above are the players confirmed on the field from the scorecard.
            </p>

            <h2 id="asian-games" style={hStyle}>What This Means for the 2026 Asian Games</h2>
            <p style={pStyle}>
              Both nations are set to compete in the men&apos;s cricket tournament at the 2026 Asian Games. Japan enters at the group stage, while India, as reigning gold medallists from four years ago, enters directly at the quarterfinal stage as one of the tournament&apos;s top-seeded teams.
            </p>
            <p style={pStyle}>
              A direct India-Japan rematch at the Asian Games depends on the draw and both teams&apos; results in their own stages, so it is possible but not guaranteed.
            </p>
            <p style={pStyle}>
              For Japan, simply taking a reigning World Cup-winning side to the final ball is the kind of experience the JCA said it was hoping for.
            </p>

            <Callout>
              Only four boundaries were struck in the entire match, and every one of the 10 overs bowled came from a spinner, an unusually slow contest for a T20I between a Full Member and an ICC associate side.
            </Callout>

            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '36px 0 8px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>A 2-run margin decided this match. See what a small, steady monthly amount could grow to over 10 or 20 years.</p>
              </div>
              <Link className="fx-btn" href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
            </div>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} open={i === 0} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none' as const, lineHeight: 1.4 }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <Disclaimer />
          </article>

          <aside className="ind-jpn-sidebar" style={{
            position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto',
            paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 20,
            scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
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
        .ind-jpn-sidebar::-webkit-scrollbar { width: 5px; }
        .ind-jpn-sidebar::-webkit-scrollbar-track { background: transparent; }
        .ind-jpn-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .ind-jpn-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}

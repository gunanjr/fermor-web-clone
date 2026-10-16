import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 Final Result: Spain Beat Argentina 1-0 to Win Second Title',
  description: 'Spain won the FIFA World Cup 2026 final 1-0 after extra time against defending champions Argentina at MetLife Stadium, New Jersey, on July 19, 2026. Ferran Torres scored the winner in the 106th minute. Full score, stats, kickoff time in India, route to the final, and what happened at halftime.',
  alternates: { canonical: 'https://fermor.in/blogs/spain-vs-argentina-fifa-world-cup-2026-final' },
  openGraph: {
    title: 'FIFA World Cup 2026 Final: Spain Beat Argentina 1-0 (AET)',
    description: 'Ferran Torres scored in the 106th minute as Spain won their second World Cup title, beating defending champions Argentina 1-0 after extra time at MetLife Stadium.',
    type: 'article',
    publishedTime: '2026-07-20T04:02:37+05:30',
    authors: ['Fermor Analysis'],
    tags: ['FIFA World Cup 2026', 'Spain', 'Argentina', 'Football', 'World Cup Final'],
    images: [{ url: 'https://fermor.in/blogs/fifa-2026-final/torres-celebration.jpg', width: 1100, height: 733, alt: 'Ferran Torres celebrates his winning goal in the 2026 FIFA World Cup final' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIFA World Cup 2026 Final: Spain Beat Argentina 1-0 (AET)',
    description: 'Ferran Torres scored in the 106th minute as Spain won their second World Cup title over defending champions Argentina.',
    images: ['https://fermor.in/blogs/fifa-2026-final/torres-celebration.jpg'],
  },
  keywords: [
    'fifa world cup 2026 final result', 'who won fifa world cup 2026', 'spain vs argentina world cup 2026',
    'fifa world cup 2026 final score', 'spain vs argentina final result', 'fifa world cup final time in india',
    'argentina vs spain final', 'fifa world cup 2026 winner', 'spain vs argentina live score',
    'fifa world cup 2026 final highlights', 'spain won world cup', 'fifa world cup 2026 final stats',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'FIFA World Cup 2026 Final Result: Spain Beat Argentina 1-0 to Win Second Title',
  description: 'Spain won the FIFA World Cup 2026 final 1-0 after extra time against defending champions Argentina at MetLife Stadium, New Jersey, on July 19, 2026.',
  datePublished: '2026-07-20T04:02:37+05:30',
  dateModified: '2026-07-20T04:02:37+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/spain-vs-argentina-fifa-world-cup-2026-final' },
  articleSection: 'Sports',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: '2026 FIFA World Cup Final', description: 'Spain vs Argentina, played at MetLife Stadium, East Rutherford, New Jersey, on July 19, 2026' },
  ],
  keywords: 'fifa world cup 2026 final result, who won fifa world cup 2026, spain vs argentina world cup final, fifa world cup 2026 final score, fifa world cup final time in india',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'FIFA World Cup 2026 Final', item: 'https://fermor.in/blogs/spain-vs-argentina-fifa-world-cup-2026-final' },
  ],
};

const faqItems = [
  { q: 'Who won the FIFA World Cup 2026?', a: 'Spain won the FIFA World Cup 2026, beating defending champions Argentina 1-0 after extra time in the final at MetLife Stadium, East Rutherford, New Jersey, on July 19, 2026. It is Spain\'s second World Cup title, after their first win in 2010.' },
  { q: 'What was the FIFA World Cup 2026 final score?', a: 'Spain beat Argentina 1-0 after extra time. The match was goalless after 90 minutes and the first period of extra time; Ferran Torres scored the only goal of the game in the 106th minute.' },
  { q: 'Who scored the winning goal in the FIFA World Cup 2026 final?', a: 'Ferran Torres scored the winning goal for Spain in the 106th minute of extra time, the only goal of the match.' },
  { q: 'Where was the FIFA World Cup 2026 final played?', a: 'The final was played at MetLife Stadium in East Rutherford, New Jersey, temporarily rebranded New York/New Jersey Stadium for the tournament. The 82,500-seat stadium is the regular home of the NFL\'s New York Giants and New York Jets, and previously hosted Super Bowl XLVIII in 2014.' },
  { q: 'What time was the FIFA World Cup 2026 final in India?', a: 'Kickoff was 3:00 PM Eastern Daylight Time on July 19, which is 12:30 AM IST on July 20, 2026. The closing ceremony began 90 minutes earlier, at 1:30 PM EDT.' },
  { q: 'Did Argentina lose the World Cup final 2026?', a: "Yes. Argentina, the defending champions from 2022, lost the 2026 final 1-0 after extra time to Spain. It was Argentina's fourth defeat in a World Cup final, after 1930, 1990, and 2014." },
  { q: 'How many World Cups has Spain won?', a: 'Spain has now won the FIFA World Cup twice: in 2010, defeating the Netherlands in the final in Johannesburg, and in 2026, defeating Argentina at MetLife Stadium.' },
  { q: 'How many World Cups has Argentina won?', a: "Argentina has won the FIFA World Cup three times: 1978, 1986, and 2022. They were the defending champions going into the 2026 final and finished as runners-up, their fourth final defeat after 1930, 1990, and 2014." },
  { q: 'Who was the referee for the FIFA World Cup 2026 final?', a: "Slavko Vinčić of Slovenia refereed the final, with fellow Slovenians Tomaž Klančnik and Andraž Kovačič as assistant referees. Jordan's Adham Makhadmeh was the fourth official." },
  { q: 'Did the FIFA World Cup 2026 final go to penalties?', a: 'No. The match was decided in extra time. Ferran Torres scored in the 106th minute, and Spain held the 1-0 scoreline through the rest of extra time, so the match did not reach a penalty shootout.' },
  { q: 'Was there a red card in the FIFA World Cup 2026 final?', a: "Yes. Argentina's Enzo Fernández was sent off in the third minute of second-half stoppage time (90+3'), before extra time began, leaving Argentina to play a man short for the additional 30 minutes." },
  { q: 'How many saves did Emiliano Martínez make in the final?', a: "Argentina goalkeeper Emiliano Martínez made 11 saves in the 2026 final, the most by any goalkeeper in a World Cup final on record." },
  { q: 'What happened at halftime of the FIFA World Cup 2026 final?', a: 'The 2026 final featured the first-ever halftime show at a World Cup final, styled after the NFL Super Bowl. It was headlined by Madonna, Shakira, Justin Bieber, and BTS, curated by Coldplay\'s Chris Martin with Global Citizen as co-producer, aiming to raise $100 million for the FIFA Global Citizen Education Fund. The show ran 18 minutes, exceeding football\'s 15-minute halftime limit, and drew criticism from commentators as overly commercialized.' },
  { q: 'Who performed at the FIFA World Cup 2026 closing ceremony?', a: 'The pre-match closing ceremony was headlined by Post Malone, with performances from Laura Pausini, Nicole Scherzinger, Robbie Williams, and IShowSpeed, plus an appearance from Tom Cruise. Jennifer Hudson sang the US national anthem.' },
  { q: 'Which dignitaries attended the FIFA World Cup 2026 final?', a: "US President Donald Trump attended and presented the trophy along with 30 championship rings to Spain. Spain's King Felipe VI, Queen Letizia, and Prime Minister Pedro Sánchez were present, as were Mexican President Claudia Sheinbaum and Canadian Prime Minister Mark Carney. Argentine President Javier Milei did not attend, citing personal superstition." },
  { q: 'How did Spain reach the FIFA World Cup 2026 final?', a: 'Spain topped Group H (draw with Cape Verde, wins over Saudi Arabia and Uruguay), then beat Austria 3-0 in the round of 32, Portugal 1-0 in the round of 16 on a stoppage-time goal, Belgium 2-1 in the quarterfinal, and France 2-0 in the semifinal.' },
  { q: 'How did Argentina reach the FIFA World Cup 2026 final?', a: 'Argentina topped Group J behind Lionel Messi, who scored a hat-trick against Algeria, then beat Cape Verde 3-2 after extra time in the round of 32, Egypt 3-2 in the round of 16, Switzerland 3-1 after extra time in the quarterfinal (a match reduced to ten men after Breel Embolo\'s red card), and England 2-1 in the semifinal.' },
  { q: 'How many teams played in the FIFA World Cup 2026?', a: 'The 2026 World Cup expanded to 48 teams for the first time, up from 32. It was jointly hosted across 16 cities in the United States, Mexico, and Canada, the first World Cup hosted by three nations.' },
  { q: 'Did the FIFA World Cup 2026 set an attendance record?', a: 'Yes. Total tournament attendance passed 3,605,357 by June 25, 2026, breaking the record set at the 1994 World Cup, also hosted in the United States.' },
  { q: 'Had Spain and Argentina met before at a World Cup?', a: "Yes, once. Argentina beat Spain 2-1 in the group stage of the 1966 World Cup. The two sides had played 14 times overall since 1952 before the 2026 final, with 6 wins each and 2 draws." },
  { q: 'What was Spain\'s unbeaten run before the 2026 final?', a: 'Spain went into the final on a 37-match run without defeat in regulation time, level with Italy for the longest such streak in men\'s international football history. Spain also entered as reigning UEFA European Champions, having won Euro 2024.' },
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
  '@id': 'https://fermor.in/blogs/spain-vs-argentina-fifa-world-cup-2026-final',
  name: 'FIFA World Cup 2026 Final Result: Spain Beat Argentina 1-0',
  url: 'https://fermor.in/blogs/spain-vs-argentina-fifa-world-cup-2026-final',
  inLanguage: 'en-IN',
  datePublished: '2026-07-20T04:02:37+05:30',
  dateModified: '2026-07-20T04:02:37+05:30',
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
    audienceType: 'Football fans in India following the FIFA World Cup 2026',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#match-summary', name: 'Match Summary' },
    { '@type': 'WebPageElement', cssSelector: '#stats', name: 'Full-Time Stats' },
    { '@type': 'WebPageElement', cssSelector: '#route-to-final', name: 'Route to the Final' },
    { '@type': 'WebPageElement', cssSelector: '#knockouts', name: 'Semifinals and Third-Place Playoff' },
    { '@type': 'WebPageElement', cssSelector: '#ceremony', name: 'Closing Ceremony and Halftime Show' },
    { '@type': 'WebPageElement', cssSelector: '#records', name: 'Records and Milestones' },
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
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'FIFA World Cup 2026 Final' }];
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
    <TableWrap label="Final: Key Facts">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function StatsTable() {
  const rows: [string, string, string][] = [
    ['Possession', '68%', '32%'],
    ['Shots', '20', '3'],
    ['Shots on Target', '11', '0'],
    ['Passes', '803', '445'],
    ['Pass Accuracy', '90%', '78%'],
    ['Corners', '9', '4'],
    ['Offsides', '4', '1'],
    ['Fouls', '21', '24'],
    ['Yellow Cards', '0', '5'],
    ['Red Cards', '0', '1'],
  ];
  return (
    <TableWrap label="Full-Time Statistics">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 420 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.dg, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Spain</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'center' as const }}>Statistic</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Argentina</span>
          </div>
          {rows.map(([label, sp, ar], i) => (
            <div key={label} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'center' }}>
              <span style={{ flex: '0 0 90px', fontSize: 14, fontWeight: 700, color: C.dark, fontFamily: INTER }}>{sp}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: C.ink2, fontFamily: INTER, textAlign: 'center' as const }}>{label}</span>
              <span style={{ flex: '0 0 90px', fontSize: 14, fontWeight: 700, color: C.ink2, fontFamily: INTER, textAlign: 'right' as const }}>{ar}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function ResultRow({ round, home, away, note }: { round: string; home: string; away: string; note?: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: `1px solid ${C.border}`, background: '#fff', alignItems: 'center', flexWrap: 'wrap' as const }}>
      <span style={{ flex: '0 0 150px', fontSize: 12, color: C.ink3, fontFamily: INTER }}>{round}</span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{home}</span>
      <span style={{ flex: 1, fontSize: 14, color: C.ink2, fontFamily: INTER }}>{away}</span>
      {note && <span style={{ flexBasis: '100%', fontSize: 12, color: C.ink3, fontFamily: INTER }}>{note}</span>}
    </div>
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

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure style={{ margin: '28px 0' }}>
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 10, border: `1px solid ${C.border}` }} />
      <figcaption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, marginTop: 8, textAlign: 'center' as const }}>{caption}</figcaption>
    </figure>
  );
}

function KeyFacts() {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Final Scoreline</span>
      </div>
      <div style={{ padding: '18px 16px', background: '#fff', textAlign: 'center' as const }}>
        <div style={{ fontSize: 13, color: C.ink3, marginBottom: 8 }}>Full-Time (After Extra Time)</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: C.dark, fontFamily: POPPINS, marginBottom: 4 }}>Spain 1-0 Argentina</div>
        <div style={{ fontSize: 12.5, color: C.ink3 }}>Ferran Torres 106&apos;</div>
      </div>
    </div>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/world-gdp-ranking-2026', label: 'World GDP Ranking 2026: Full Country List' },
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
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> Match facts, dates and figures on this page are compiled from FIFA and public tournament records. Fermor is a personal finance platform; this article is a factual sports recap and does not constitute financial advice.
      </p>
    </div>
  );
}

export default function FifaWorldCup2026FinalPage() {
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
            FIFA World Cup 2026 Final Result: Spain Beat Argentina 1-0 to Win Second Title
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Ferran Torres scored in the 106th minute as Spain beat defending champions Argentina 1-0 after extra time at MetLife Stadium, New Jersey, to win their second World Cup title.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-07-20T04:02:37+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jul 20, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>8 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Spain won the FIFA World Cup 2026, beating defending champions Argentina 1-0 after extra time in the final at MetLife Stadium in East Rutherford, New Jersey, on July 19, 2026 (early morning of July 20 in India).
            </p>
            <p style={pStyle}>
              The match was goalless through 90 minutes and the first half of extra time. Ferran Torres broke the deadlock in the 106th minute, and Spain held on with ten men against Argentina to seal their second World Cup title, their first since 2010.
            </p>

            <Figure
              src="/blogs/fifa-2026-final/torres-celebration.jpg"
              alt="Ferran Torres celebrates his 106th-minute winning goal for Spain in the 2026 FIFA World Cup final"
              caption="Ferran Torres leads the celebration after his extra-time winner sealed Spain's second World Cup title."
            />

            <KVTable rows={[
              { label: 'Final Score', value: 'Spain 1-0 Argentina (AET)' },
              { label: 'Winning Goal', value: 'Ferran Torres, 106\'' },
              { label: 'Venue', value: 'MetLife Stadium, East Rutherford, NJ' },
              { label: 'Date', value: 'July 19, 2026' },
              { label: 'Kickoff (India)', value: '12:30 AM IST, July 20' },
              { label: 'Referee', value: 'Slavko Vinčić (Slovenia)' },
              { label: 'Red Card', value: 'Enzo Fernández (Argentina), 90+3\'' },
              { label: 'Spain Titles', value: '2 (2010, 2026)' },
              { label: 'Argentina Titles', value: '3 (1978, 1986, 2022)' },
            ]} />

            <h2 id="match-summary" style={hStyle}>How the Final Unfolded</h2>
            <p style={pStyle}>
              Spain controlled the game from the opening whistle. Lamine Yamal had two early chances in the 4th and 16th minutes, both saved by Argentina goalkeeper Emiliano Martínez, who finished the match with 11 saves, the most by any goalkeeper in a World Cup final on record.
            </p>
            <p style={pStyle}>
              Spain dominated possession throughout, with Mikel Oyarzabal testing Martínez again in the 39th minute and Marc Cucurella curling an effort just wide before halftime. Argentina lost defender Lisandro Martínez to injury in the 44th minute, replaced by Nicolás Otamendi.
            </p>
            <p style={pStyle}>
              The match stayed scoreless into stoppage time, where Argentina&apos;s Enzo Fernández was sent off in the 90+3rd minute, leaving Argentina to play the entirety of extra time a man down. Spain made the advantage count: Ferran Torres struck in the 106th minute for what proved to be the winning goal.
            </p>

            <StatsTable />

            <Figure
              src="/blogs/fifa-2026-final/spain-celebration-2.jpg"
              alt="Spain players celebrate winning the 2026 FIFA World Cup final against Argentina"
              caption="Spain's squad celebrates on the pitch at MetLife Stadium after the final whistle."
            />

            <h2 id="route-to-final" style={hStyle}>Route to the Final</h2>
            <p style={pStyle}>
              Spain topped Group H with a draw against debutants Cape Verde and wins over Saudi Arabia and Uruguay, then advanced past Austria (3-0), Portugal (1-0, stoppage-time winner), Belgium (2-1) and France (2-0 in the semifinal) without conceding a knockout-stage defeat.
            </p>
            <p style={pStyle}>
              Argentina, led by Lionel Messi, won Group J behind a hat-trick against Algeria, then survived two extra-time knockout matches: Cape Verde (3-2) in the round of 32 and Switzerland (3-1, after Swiss defender Breel Embolo was sent off) in the quarterfinal, before beating Egypt (3-2) and England (2-1) to reach a second consecutive final.
            </p>

            <h2 id="knockouts" style={hStyle}>Semifinals and Third-Place Playoff</h2>
            <TableWrap label="Knockout Results">
              <ResultRow round="Semifinal, Jul 15" home="France 0" away="Spain 2" />
              <ResultRow round="Semifinal, Jul 16" home="England 1" away="Argentina 2" note="Argentina won on a stoppage-time header" />
              <ResultRow round="Third-Place Playoff" home="France 4" away="England 6" />
              <ResultRow round="Final, Jul 19" home="Spain 1" away="Argentina 0" note="After extra time" />
            </TableWrap>

            <h2 id="ceremony" style={hStyle}>Closing Ceremony and the First World Cup Final Halftime Show</h2>
            <p style={pStyle}>
              The pre-match closing ceremony began at 1:30 PM Eastern time, 90 minutes before kickoff, headlined by Post Malone with performances from Laura Pausini, Nicole Scherzinger, Robbie Williams and IShowSpeed, and an appearance from Tom Cruise. Jennifer Hudson sang the US national anthem.
            </p>
            <p style={pStyle}>
              For the first time in World Cup history, the final featured a Super Bowl-style halftime show, curated by Coldplay&apos;s Chris Martin with Global Citizen as co-producer, aiming to raise $100 million for the FIFA Global Citizen Education Fund. Madonna, Shakira, Justin Bieber and BTS headlined, with the show running 18 minutes, longer than football&apos;s codified 15-minute halftime limit, drawing criticism from commentators over the extended break and commercialization.
            </p>
            <Callout>
              US President Donald Trump presented the trophy and 30 championship rings to Spain. Spain&apos;s King Felipe VI, Queen Letizia and Prime Minister Pedro Sánchez attended, along with Mexican President Claudia Sheinbaum and Canadian Prime Minister Mark Carney. Argentine President Javier Milei did not attend, citing personal superstition.
            </Callout>

            <h2 id="records" style={hStyle}>Records and Milestones from the 2026 Final</h2>
            <Figure
              src="/blogs/fifa-2026-final/spain-wins-graphic.jpg"
              alt="Spain wins the 2026 FIFA World Cup"
              caption="Spain lifted their second World Cup title, level with Netherlands, France, Uruguay and England on two titles each."
            />
            <BulletList items={[
              'Spain won their second World Cup, level with Netherlands, France, Uruguay and England on two titles each.',
              'Spain entered the final on a 37-match unbeaten run in regulation time, tied with Italy for the longest in men\'s international football history, and arrived as reigning European champions from Euro 2024.',
              'Emiliano Martínez\'s 11 saves are the most by a goalkeeper in a World Cup final on record.',
              'It was the first World Cup final between two reigning continental champions and the top two teams in the FIFA World Ranking at the same time.',
              'The 2026 tournament expanded to 48 teams for the first time and was jointly hosted across the United States, Mexico and Canada, the first World Cup shared by three host nations.',
              'Total tournament attendance passed 3,605,357 by June 25, 2026, a new World Cup record, surpassing the mark set at the 1994 tournament, also held in the United States.',
            ]} />

            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '36px 0 8px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See what a fixed monthly amount, however small, could grow to over 10 or 20 years.</p>
              </div>
              <Link className="fx-btn" href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
            </div>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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

          <aside className="fifa-sidebar" style={{
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
        .fifa-sidebar::-webkit-scrollbar { width: 5px; }
        .fifa-sidebar::-webkit-scrollbar-track { background: transparent; }
        .fifa-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .fifa-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

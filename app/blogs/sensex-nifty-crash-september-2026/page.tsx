import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down',
  description: 'Sensex closed at 72,529.07 and Nifty at 22,716.20 on September 29, 2026, the second straight losing session after Nifty logged its seventh consecutive weekly fall, matching the 2020 Covid-crash streak. Full breakdown of why the market is down: Brent crude above $107, US bond yields at multi-year highs, RBI rate hike odds for the October MPC meeting, the rupee at a two-month low, and which stocks hit 52-week lows.',
  alternates: {
    canonical: 'https://fermor.in/blogs/sensex-nifty-crash-september-2026',
    languages: {
      'en-IN': 'https://fermor.in/blogs/sensex-nifty-crash-september-2026',
      'x-default': 'https://fermor.in/blogs/sensex-nifty-crash-september-2026',
    },
  },
  openGraph: {
    title: 'Sensex Nifty Crash September 2026: Why the Market Is Down',
    description: 'Sensex 72,529.07, Nifty 22,716.20 on Sept 29, 2026. Seven straight weekly losses, matching the 2020 Covid streak. Oil above $107, US yields at multi-year highs, RBI rate hike odds, rupee at a two-month low. Full breakdown.',
    type: 'article',
    publishedTime: '2026-09-29T19:23:03+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Sensex', 'Nifty', 'Stock Market', 'RBI', 'Crude Oil', 'FII'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sensex Nifty Crash September 2026: Full Breakdown',
    description: 'Sensex 72,529, Nifty 22,716 on Sept 29. Seven straight weekly losses. Why the market is falling and what analysts say next.',
  },
  keywords: [
    'sensex nifty stock market', 'sensex today', 'sensex today live', 'nifty today', 'nifty 50',
    'why market is down today', 'bse sensex', 'sensex index', 'nifty share price', 'nse india',
    'gift nifty live', 'sgx nifty', 'bank nifty', 'dow jones live', 'nasdaq today', 's&p 500 today',
    'top gainers today', 'stock market today', 'share market today', 'nifty 50 today', 'sensex now',
    'nifty live', 'stock market news today', 'nifty prediction for tomorrow', 'market close today',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down',
  description: 'Sensex closed at 72,529.07 and Nifty at 22,716.20 on September 29, 2026, extending losses into a second straight session and a seventh consecutive weekly fall, matching the 2020 Covid-crash losing streak. Full breakdown of the causes: crude oil above $107 a barrel, a surge in US bond yields to multi-year highs, RBI rate hike expectations for the October 5-7 MPC meeting, a weakening rupee, and sustained FII selling.',
  datePublished: '2026-09-29T19:23:03+05:30',
  dateModified: '2026-09-29T19:23:03+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/sensex-nifty-crash-september-2026' },
  articleSection: 'Markets & Current Affairs',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'Sensex Nifty Crash September 2026', description: 'A seven-week decline in Indian equity benchmarks driven by rising crude oil prices, surging US bond yields, RBI rate hike expectations, and sustained foreign investor selling' },
    { '@type': 'Organization', name: 'Reserve Bank of India', description: 'India\'s central bank, whose Monetary Policy Committee meets October 5-7, 2026' },
  ],
  keywords: 'sensex nifty stock market, why market is down today, sensex today, nifty today, bse sensex, nifty 50, bank nifty, gift nifty, sgx nifty, stock market crash',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Sensex Nifty Crash September 2026', item: 'https://fermor.in/blogs/sensex-nifty-crash-september-2026' },
  ],
};

const faqItems = [
  { q: 'Why is the stock market down today?', a: 'The Indian stock market is down primarily because of four compounding factors: crude oil prices above $107 a barrel on continued Middle East tension, US bond yields at multi-year highs (the 10-year near 5%, the 30-year at 5.48%, its highest since 2004), rising expectations that the RBI will hike interest rates at its October 5-7 policy meeting, and sustained foreign institutional investor (FII) selling that has pulled roughly Rs 25,682 crore out of Indian equities in September alone.' },
  { q: 'What is the Sensex today?', a: 'The Sensex closed at 72,529.07 on September 29, 2026, down 242.65 points, its second straight losing session. The day before, on September 28, the Sensex had fallen more sharply, down 1.52% to close at 72,771.72.' },
  { q: 'What is the Nifty 50 today?', a: 'The Nifty 50 closed at 22,716.20 on September 29, 2026, down 64.05 points. On September 28, it fell 1.56% to close at 22,780.25, its lowest level in five months, since early April 2026.' },
  { q: 'How many weeks has the market been falling?', a: 'The Nifty 50 has now declined for seven consecutive weeks, a losing streak that matches its longest stretch since the Covid-19 crash of 2020. Over these seven weeks the index has fallen 5.8%, or about 1,430 points.' },
  { q: 'How much has the Nifty fallen from its record high?', a: 'The Nifty 50 has fallen around 12% from its record peak of 26,300, reached in September 2024. What analysts initially described as a consolidation phase has turned into an extended, multi-week decline.' },
  { q: 'Why are crude oil prices affecting the Indian stock market?', a: 'India imports close to 90% of the crude oil it consumes, so a sustained rise in oil prices directly widens the trade deficit, pressures the rupee, and raises costs for fuel-intensive sectors like aviation, paints, and tyres. Brent crude has climbed above $107 a barrel, and continuing tension in West Asia over the US-Iran standoff is keeping prices elevated.' },
  { q: 'Why do rising US bond yields hurt Indian stocks?', a: 'When US Treasury yields rise to multi-year highs, dollar-denominated bonds become a more attractive, safer return for global investors than emerging-market equities like India\'s. That pulls foreign capital out of Indian stocks and into US debt, adding to the selling pressure already coming from oil-driven inflation concerns.' },
  { q: 'Is the RBI expected to raise interest rates in October 2026?', a: 'Roughly 60% of economists polled by Reuters (35 of 61) expect the RBI\'s Monetary Policy Committee to raise the repo rate by 25 basis points to 5.50% at its October 5-7, 2026 meeting, which would be the first hike since February 2023. The case for a hike has strengthened as retail inflation accelerated to 4.82% in August, above the RBI\'s 4% target for a third straight month, alongside the oil price spike.' },
  { q: 'How much have foreign investors sold in Indian stocks in 2026?', a: 'Foreign portfolio investors (FPIs) have sold approximately Rs 2.45 lakh crore (around $30 billion) worth of Indian equities so far in 2026, already well above the Rs 1.66 lakh crore they withdrew during the whole of 2024. FIIs were net sellers in 15 of the 19 trading sessions in September alone.' },
  { q: 'Are domestic investors buying while foreign investors sell?', a: 'Yes. Domestic institutional investors (DIIs) have invested about $177 billion into Indian equities over the past two years, compared to roughly $56 billion pulled out by foreign investors over the same period. This domestic buying has cushioned, though not fully offset, the impact of sustained foreign selling.' },
  { q: 'Which stocks hit 52-week lows in this market fall?', a: 'Seven Nifty 50 companies touched 52-week lows in the latest session: Reliance Industries, Jio Financial, Maruti Suzuki, Tata Consumer Products, Tata Motors Passenger Vehicles, Hindustan Unilever, and Wipro. Fuel-cost-sensitive stocks like IndiGo, Asian Paints, and tyre makers also came under specific pressure from rising crude prices.' },
  { q: 'What is happening to the Indian rupee?', a: 'The rupee weakened past 96 per US dollar, touching a two-month low, as rising oil prices raised concerns about India\'s import bill as a net energy importer. A weaker rupee also makes returns less attractive for foreign investors converting their Indian gains back into dollars, adding another reason for FII outflows.' },
  { q: 'Are global markets falling too, or is this specific to India?', a: 'Global markets are under similar pressure, not just India. US markets fell sharply, with the Nasdaq down over 0.9% and the S&P 500 down around 0.8% in the prior session. Asian markets were also weak: Japan\'s Nikkei fell more than 1%, and Hong Kong\'s Hang Seng and South Korea\'s Kospi each declined by close to 1%.' },
  { q: 'Is this a good time to buy Indian stocks?', a: 'Analysts are split. Some, including Motilal Oswal Financial Services, argue the correction has made valuations more attractive, with large-cap stocks now around 29% cheaper and mid-caps around 27% cheaper than their 2024 peaks, alongside continued strong corporate earnings growth. Others caution that further correction is likely while oil stays elevated and US yields remain high. This is market commentary, not personalised investment advice; any decision should account for your own goals and risk tolerance.' },
  { q: 'What could turn the market around?', a: 'Fund manager Sonam Srivastava of Wright Research has said that if crude prices ease and the rupee holds near current levels, foreign portfolio investor flows could turn positive again by the December quarter. A resolution or de-escalation of the US-Iran standoff, a pause in the US bond-yield rise, or a smaller-than-expected RBI rate hike could each ease the pressure driving this decline.' },
  { q: 'Does the Nifty F&O monthly expiry affect today\'s volatility?', a: 'Yes, partly. The latest trading session coincided with the monthly expiry of Nifty futures and options contracts, which is generally associated with increased intraday volatility on its own, separate from the underlying macro pressures from oil and bond yields.' },
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
  '@id': 'https://fermor.in/blogs/sensex-nifty-crash-september-2026',
  name: 'Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down',
  url: 'https://fermor.in/blogs/sensex-nifty-crash-september-2026',
  inLanguage: 'en-IN',
  datePublished: '2026-09-29T19:23:03+05:30',
  dateModified: '2026-09-29T19:23:03+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Foreign Institutional Investor (FII)',
      alternateName: 'Foreign Portfolio Investor (FPI)',
      description: 'An overseas entity that invests in Indian financial markets. Sustained FII/FPI selling of Indian equities is one of the main drivers of the September 2026 market decline.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Stock Market Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Monetary Policy Committee',
      alternateName: 'MPC',
      description: 'The Reserve Bank of India\'s six-member rate-setting committee, whose October 5-7, 2026 meeting is widely expected to result in a repo rate hike.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Stock Market Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Retail and institutional stock market investors in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#todays-numbers', name: 'Today\'s Numbers' },
    { '@type': 'WebPageElement', cssSelector: '#seven-weeks', name: 'Seven Straight Weekly Losses' },
    { '@type': 'WebPageElement', cssSelector: '#why-falling', name: 'Why the Market Is Falling' },
    { '@type': 'WebPageElement', cssSelector: '#oil-prices', name: 'Crude Oil and West Asia Tension' },
    { '@type': 'WebPageElement', cssSelector: '#bond-yields', name: 'US Bond Yields at Multi-Year Highs' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-mpc', name: 'RBI Rate Hike Expectations' },
    { '@type': 'WebPageElement', cssSelector: '#rupee', name: 'The Rupee at a Two-Month Low' },
    { '@type': 'WebPageElement', cssSelector: '#fii-dii', name: 'FII Selling vs DII Buying' },
    { '@type': 'WebPageElement', cssSelector: '#stocks-hit', name: 'Which Stocks Are Hit Hardest' },
    { '@type': 'WebPageElement', cssSelector: '#global-markets', name: 'Global Markets' },
    { '@type': 'WebPageElement', cssSelector: '#what-analysts-say', name: 'What Analysts Say Next' },
    { '@type': 'WebPageElement', cssSelector: '#what-to-do', name: 'What Investors Are Weighing' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors to act on those decisions.',
  knowsAbout: [
    'Indian Stock Market', 'Reserve Bank of India Monetary Policy', 'Foreign Portfolio Investment India',
    'Crude Oil Markets', 'Global Bond Markets', 'Personal Finance India', 'SEBI Regulations', 'AMFI Guidelines',
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
  red:    '#B3261E',
  amber:  '#A15C00',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = {
  fontFamily: POPPINS,
  fontSize: 20,
  fontWeight: 600,
  color: C.dg,
  marginTop: 40,
  marginBottom: 14,
  letterSpacing: '-.015em',
} as React.CSSProperties;

const pStyle = {
  fontSize: 15.5,
  color: C.ink,
  lineHeight: 1.8,
  marginBottom: 20,
  fontFamily: INTER,
} as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Sensex Nifty Crash September 2026' },
  ];
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

function TodaysNumbers() {
  const rows = [
    { label: 'Sensex (Sept 29 close)', value: '72,529.07', change: '-242.65 pts', down: true },
    { label: 'Nifty 50 (Sept 29 close)', value: '22,716.20', change: '-64.05 pts', down: true },
    { label: 'Sensex (Sept 28 close)', value: '72,771.72', change: '-1.52%', down: true },
    { label: 'Nifty 50 (Sept 28 close)', value: '22,780.25', change: '-1.56%', down: true },
    { label: 'Nifty MidCap 100', value: '', change: '-0.99%', down: true },
    { label: 'Nifty SmallCap 100', value: '', change: '-0.81%', down: true },
    { label: 'Weekly losing streak', value: '7 weeks', change: '', down: true },
    { label: 'Fall from Sept 2024 record peak', value: '~12%', change: '', down: true },
  ];
  return (
    <TableWrap label="Today's Numbers at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {r.value && <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.value}</span>}
            {r.change && <span style={{ fontSize: 12, fontWeight: 600, color: r.down ? C.red : C.green, fontFamily: INTER }}>{r.change}</span>}
          </span>
        </div>
      ))}
    </TableWrap>
  );
}

function WhyFallingTable() {
  const items = [
    { t: 'Crude oil above $107/barrel', d: 'Continued US-Iran tension and Strait of Hormuz disruption risk keep Brent elevated; India imports ~90% of its crude, so this widens the trade deficit and stokes inflation.' },
    { t: 'US bond yields at multi-year highs', d: 'The 10-year US Treasury yield is near 5% (highest since 2007) and the 30-year at 5.48% (highest since 2004), pulling global capital toward safer dollar assets and away from emerging markets.' },
    { t: 'RBI rate hike expectations', d: 'Around 60% of economists expect a 25 bps repo rate hike to 5.50% at the October 5-7 MPC meeting, the first hike since February 2023, as inflation ran at 4.82% in August, above the RBI\'s 4% target.' },
    { t: 'Sustained FII selling', d: 'Foreign investors have sold about Rs 2.45 lakh crore of Indian equities in 2026 so far, more than the entire withdrawal in 2024, and were net sellers in 15 of 19 September sessions.' },
    { t: 'Weak rupee', d: 'The rupee has slipped past 96 per US dollar, a two-month low, driven by the same oil-import pressure and reinforcing why foreign investors are pulling back.' },
    { t: 'Global risk-off mood', d: 'US and Asian markets fell in the same sessions (Nasdaq, S&P 500, Nikkei, Hang Seng, Kospi all lower), showing this isn\'t an India-only story.' },
  ];
  return (
    <TableWrap label="Why the Market Is Falling: The Six Drivers">
      {items.map((it, i) => (
        <div key={it.t} style={{ padding: '13px 16px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{it.t}</div>
          <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.6 }}>{it.d}</div>
        </div>
      ))}
    </TableWrap>
  );
}

function GlobalMarketsTable() {
  const rows = [
    { market: 'Nasdaq (US)', move: '-0.9%' },
    { market: 'S&P 500 (US)', move: '-0.8%' },
    { market: 'Nikkei 225 (Japan)', move: '-1%+' },
    { market: 'Hang Seng (Hong Kong)', move: '~-1%' },
    { market: 'Kospi (South Korea)', move: '~-1%' },
    { market: 'Brent crude', move: '$107-108+/barrel' },
    { market: 'WTI crude', move: '$94+/barrel' },
    { market: 'US 10-year Treasury yield', move: '~5%, highest since 2007' },
    { market: 'US 30-year Treasury yield', move: '5.48%, highest since 2004' },
  ];
  return (
    <TableWrap label="Global Markets Snapshot">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 460 }}>
          {rows.map((r, i) => (
            <div key={r.market} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
              <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.market}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER, flexShrink: 0 }}>{r.move}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function StocksHitList() {
  const stocks = ['Reliance Industries', 'Jio Financial', 'Maruti Suzuki', 'Tata Consumer Products', 'Tata Motors Passenger Vehicles', 'Hindustan Unilever', 'Wipro'];
  const pressured = ['IndiGo', 'Asian Paints', 'Tyre makers (fuel/petroleum input costs)', 'Bajaj Finance (~-2%)'];
  return (
    <TableWrap label="Stocks Under the Most Pressure">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 480, display: 'flex' }}>
          <div style={{ flex: 1, borderRight: `1px solid ${C.border}` }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Hit 52-week lows</span>
            </div>
            {stocks.map((s, i) => (
              <div key={s} style={{ padding: '10px 16px', borderBottom: i < stocks.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{s}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Fuel-cost pressured</span>
            </div>
            {pressured.map((s, i) => (
              <div key={s} style={{ padding: '10px 16px', borderBottom: i < pressured.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'SIP Calculator', desc: 'See how rupee-cost averaging through a dip changes your long-term returns', href: '/calculators/sip-calculator' },
    { label: 'Lumpsum Calculator', desc: 'Model a one-time investment at today\'s lower valuations', href: '/calculators/lumpsum-calculator' },
    { label: 'ELSS Calculator', desc: 'Check tax-saving equity fund returns alongside market moves', href: '/calculators/elss-calculator' },
    { label: 'Investment Comparison Calculator', desc: 'Compare equity, FD and other options side by side', href: '/calculators/investment-comparison-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/sensex-nifty-market-crash-it-stocks-june-2026', label: 'Why the Indian Stock Market Was Down: IT Stocks Crash, June 2026' },
    { href: '/blogs/tata-motors-pv-stock-crash-jlr-fy27-outlook', label: 'Tata Motors PV Stock Crash: JLR FY27 Outlook' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Articles</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function KeyDates() {
  const dates = [
    { label: 'Nifty 5-month low', date: 'Sep 28, 2026' },
    { label: '7th straight weekly loss', date: 'Week of Sep 28' },
    { label: 'Today\'s close', date: 'Sep 29, 2026', urgent: true },
    { label: 'RBI MPC meeting', date: 'Oct 5-7, 2026' },
    { label: 'Sept 2024 record peak', date: '26,300 (Nifty)' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Key Dates</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS, textAlign: 'right' as const, flexShrink: 0 }}>{item.date}</span>
        </div>
      ))}
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

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> Market levels, yields, and flows change by the minute; the figures here reflect the sessions and sources cited at the time of publication and may no longer be current. Views attributed to named analysts and brokerages are their own opinions, not Fermor's, and nothing here is personalised investment advice. Verify current levels on NSE, BSE, or your own broker before acting on any number in this article.
      </p>
    </div>
  );
}

export default function SensexNiftyCrashSeptember2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Markets & Current Affairs</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 860 }}>
            Sensex Nifty Crash September 2026: Seven Straight Weekly Losses, and Why the Market Is Down
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 720, marginBottom: 22 }}>
            The Sensex closed at 72,529.07 and the Nifty 50 at 22,716.20 on September 29, 2026, extending India's equity slide into a seventh straight losing week, a streak last seen during the 2020 Covid crash. Here is exactly why the market is falling, and what happens next.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-09-29T19:23:03+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Sep 29, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Indian equity benchmarks fell for a second straight session on September 29, 2026, with the Sensex closing at 72,529.07 (down 242.65 points) and the Nifty 50 at 22,716.20 (down 64.05 points). The bigger story is the seven-week stretch behind it: the Nifty has now declined for seven consecutive weeks, matching its longest losing streak since the 2020 Covid crash, and is down 5.8%, or about 1,430 points, over that period.
            </p>
            <p style={pStyle}>
              The immediate triggers are crude oil above $107 a barrel, US bond yields at multi-year highs, growing expectations of an RBI rate hike at its October policy meeting, and sustained foreign investor selling. None of this is happening only in India: US and Asian markets have been falling in the same sessions.
            </p>

            <h2 id="todays-numbers" style={hStyle}>Today's numbers</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Sensex 72,529.07 (-242.65 points), Nifty 50 22,716.20 (-64.05 points) at the September 29, 2026 close, the second consecutive losing session after Monday's sharper 1.5%-plus fall.
              </p>
            </div>
            <p style={pStyle}>
              Monday, September 28, was the harder session of the two: the Sensex fell 1.52% to 72,771.72 and the Nifty fell 1.56% to 22,780.25, its lowest close in five months, since early April 2026. Tuesday's decline was smaller in percentage terms, but it kept the index in the red for a second straight day, and the broader market showed similar weakness, with the Nifty MidCap 100 down 0.99% and the Nifty SmallCap 100 down 0.81%.
            </p>
            <TodaysNumbers />

            <h2 id="seven-weeks" style={hStyle}>Seven straight weekly losses, matching the 2020 Covid streak</h2>
            <p style={pStyle}>
              What makes this decline notable isn't any single day's fall, it's the duration. The Nifty has now closed lower for seven consecutive weeks, a losing streak that matches its longest run since the Covid-19 market crash of March 2020. Across those seven weeks the index has shed 5.8%, or roughly 1,430 points, and it now sits around 12% below its record peak of 26,300, which it reached in September 2024.
            </p>
            <p style={pStyle}>
              What analysts initially called a healthy consolidation after two years of strong post-pandemic gains has stretched into a genuinely extended correction. Markets are "under renewed selling pressure... with the rise in Brent crude remaining a major concern," according to Sachin Gupta, vice-president of research at Choice Broking, who also points to "elevated global bond yields" making dollar-denominated investments more attractive relative to emerging-market equities.
            </p>

            <h2 id="why-falling" style={hStyle}>Why the market is falling: the six drivers</h2>
            <p style={pStyle}>
              No single factor explains this decline on its own. It's the combination of rising input costs (oil), a genuine alternative for global capital (US yields), a domestic policy risk (an RBI hike), and a currency and flows story that all reinforce each other at the same time.
            </p>
            <WhyFallingTable />

            <h2 id="oil-prices" style={hStyle}>Crude oil and the West Asia standoff</h2>
            <p style={pStyle}>
              Brent crude futures have climbed above $107 a barrel, with WTI crude past $94, as hopes for a quick resolution to the US-Iran standoff continue to fade. The conflict, now in its seventh month, has kept oil markets on edge; the US president has denied reports of offering Iran sanctions relief in exchange for nuclear concessions, even as officials from both countries held separate talks with mediators. Continued disruption risk around the Strait of Hormuz, a critical corridor for global oil shipments, is a major reason prices have stayed elevated rather than easing.
            </p>
            <p style={pStyle}>
              For India specifically, this matters more than for most economies. India imports close to 90% of the crude oil it consumes, so a sustained rise in prices directly widens the trade deficit, adds to the import bill, and feeds into inflation, well beyond just petrol and diesel. Higher fuel costs raise the price of transporting food and goods, push up airline fares, and increase input costs for anything made from petroleum derivatives, plastics, chemicals, paints, tyres, and packaging among them. Companies either absorb that cost, cutting into profit margins, or pass it on to consumers, stoking the inflation the RBI is already watching closely.
            </p>

            <h2 id="bond-yields" style={hStyle}>US bond yields at multi-year highs</h2>
            <p style={pStyle}>
              The yield on the 10-year US Treasury note has climbed toward 5%, its highest level since 2007, just before the global financial crisis, and the 30-year Treasury bond has touched 5.48%, its highest since 2004. Rising yields make dollar-denominated government debt a genuinely more attractive, lower-risk return for global investors than putting money into emerging-market equities like India's.
            </p>
            <p style={pStyle}>
              That shift matters directly for Indian markets: when the safer alternative starts paying more, global capital has a real incentive to move out of riskier assets and into US Treasuries, adding to the outflow pressure that oil-driven inflation concerns were already creating.
            </p>

            <h2 id="rbi-mpc" style={hStyle}>RBI rate hike expectations for the October MPC meeting</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Around 60% of economists polled by Reuters (35 of 61) expect the RBI's Monetary Policy Committee to raise the repo rate by 25 basis points to 5.50% at its October 5-7, 2026 meeting, which would be the first rate hike since February 2023.
              </p>
            </div>
            <p style={pStyle}>
              The case for a hike has strengthened alongside the oil price spike: retail inflation accelerated to 4.82% in August 2026, above the RBI's 4% medium-term target for a third consecutive month, driven largely by sharply higher energy and food costs. Rising inflation, the crude oil spike, and rate tightening among other global central banks have together tilted the balance toward a hike at this specific meeting. Economists broadly expect the tightening cycle to be shallow rather than aggressive, a combined 50 to 75 basis points across the October and December meetings, with a slim majority (29 of 53 in the same poll) expecting a further 25 basis point hike in December too.
            </p>

            <h2 id="rupee" style={hStyle}>The rupee at a two-month low</h2>
            <p style={pStyle}>
              The Indian rupee has weakened past 96 per US dollar, its weakest level in two months, as the continued rise in oil prices heightened concerns about the impact on a net energy-importing economy. A weaker currency compounds the pressure on foreign investors in two ways: it raises the real cost of India's oil imports, and it eats into the dollar-converted returns of any foreign investor holding Indian assets, giving them one more reason to reduce exposure rather than add to it.
            </p>

            <h2 id="fii-dii" style={hStyle}>Foreign selling vs domestic buying</h2>
            <p style={pStyle}>
              Foreign portfolio investors (FPIs) remained net sellers of Indian equities through the latest sessions, offloading shares worth more than Rs 5,353 crore in a single day according to provisional NSE data, and roughly Rs 25,682 crore over the course of September alone. FIIs were net sellers in 15 of the 19 trading sessions so far this month. For the full year, FPIs have sold approximately Rs 2.45 lakh crore, around $30 billion, worth of Indian equities, already well above the Rs 1.66 lakh crore they withdrew during the whole of 2024.
            </p>
            <p style={pStyle}>
              Domestic institutional investors (DIIs) have been the market's real counterweight through this stretch. They have poured roughly $177 billion into Indian equities over the past two years, against about $56 billion pulled out by foreign investors over the same period, a genuine cushion that has kept this correction from being sharper than it already is. When overseas investors have been net sellers, Indian institutions have consistently been net buyers on the other side of those trades.
            </p>
            <Callout>
              VK Vijayakumar, Chief Investment Strategist at Geojit Investments, notes that the shift in FPI flows from positive to negative, after real inflows in July and August, became visible at the start of this month, and the selling trend has continued since.
            </Callout>

            <h2 id="stocks-hit" style={hStyle}>Which stocks are hit hardest</h2>
            <p style={pStyle}>
              Seven Nifty 50 companies touched fresh 52-week lows in the latest session: Reliance Industries, Jio Financial, Maruti Suzuki, Tata Consumer Products, Tata Motors Passenger Vehicles, Hindustan Unilever, and Wipro. Separately, companies more directly exposed to fuel and crude-linked input costs came under their own specific pressure: IndiGo, as investors priced in higher aviation turbine fuel costs, and Asian Paints along with tyre manufacturers, given their reliance on petroleum-based raw materials. Bajaj Finance was among the session's biggest individual losers on the Sensex, down around 2%.
            </p>
            <StocksHitList />

            <h2 id="global-markets" style={hStyle}>This isn't an India-only story</h2>
            <p style={pStyle}>
              Dalal Street's weakness is tracking a genuinely global risk-off mood, not a domestic problem in isolation. US markets closed sharply lower in the prior session, with the tech-heavy Nasdaq down more than 0.9% and the S&P 500 down around 0.8%. Asian markets moved together with India: Japan's Nikkei dropped more than 1%, and Hong Kong's Hang Seng and South Korea's Kospi each declined by close to 1%.
            </p>
            <GlobalMarketsTable />

            <h2 id="what-analysts-say" style={hStyle}>What analysts say happens next</h2>
            <p style={pStyle}>
              Views on where this goes from here are genuinely split, not uniformly bearish. Motilal Oswal Financial Services argues that the correction since the 2024 peak has made valuations meaningfully more attractive, with large-cap stocks now around 29% cheaper and mid-caps around 27% cheaper than their peaks, and points to continued strong corporate earnings growth, including a robust 7.6% first-quarter GDP print, as reasons the "risk-reward" picture has improved for Indian equities even as the near-term picture stays difficult.
            </p>
            <p style={pStyle}>
              Others are more cautious in the near term. Raamdeo Agrawal, chairman of Motilal Oswal Financial Services, has separately said that "if the currency remains weak, FIIs will not have the confidence to come back," tying any real recovery in foreign flows directly to rupee stability. Sonam Srivastava, founder and fund manager of Wright Research, offered a specific conditional path forward: "If crude prices ease and the rupee holds near current levels, I would expect FPI flows to turn positive again by the December quarter."
            </p>
            <BulletList items={[
              'Bull case: valuations look more attractive after the correction, and domestic earnings growth has stayed resilient through the fall',
              'Bear case: while oil stays above $100 a barrel and US yields remain elevated, the same pressure that caused seven weeks of declines has no clear reason to reverse yet',
              'Swing factor: an easing in crude prices, a pause in US yields, or a smaller-than-expected RBI hike could each turn sentiment, according to multiple analysts cited here',
            ]} />

            <h2 id="what-to-do" style={hStyle}>What investors are weighing</h2>
            <p style={pStyle}>
              A seven-week decline like this is exactly the kind of period where a <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 500 }}>SIP</Link> genuinely does its job: buying a fixed rupee amount regularly through both the ups and the downs lowers your average purchase cost compared to only ever investing when the market feels comfortable. If you have a lump sum you were already planning to deploy, a <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 500 }}>lumpsum calculator</Link> can help you see what today's lower entry point could mean for a long enough holding period, though the same swing factors above (oil, yields, the RBI decision) could just as easily mean more downside before any recovery.
            </p>
            <p style={pStyle}>
              None of this is personalised investment advice, and market commentary from named analysts in this article reflects their own views, not a recommendation from Fermor. Any decision to buy, hold, or sell should account for your own financial goals, time horizon, and risk tolerance, not a single article read the day of a market fall.
            </p>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion">
              {faqItems.map((item, i) => (
                <details key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                  <summary style={{
                    padding: '14px 18px',
                    cursor: 'pointer',
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: C.dark,
                    fontFamily: INTER,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fff',
                    userSelect: 'none' as const,
                    lineHeight: 1.4,
                  }}>
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

          <aside
            className="sensexcrash-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            <div style={{ flexShrink: 0 }}><KeyDates /></div>
            <div style={{ flexShrink: 0 }}><TodaysNumbers /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
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
        .sensexcrash-sidebar::-webkit-scrollbar { width: 5px; }
        .sensexcrash-sidebar::-webkit-scrollbar-track { background: transparent; }
        .sensexcrash-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .sensexcrash-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

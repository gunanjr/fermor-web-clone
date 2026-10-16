import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'Sensex Nifty Stock Market Today: BSE Sensex 76,803, Nifty 50 24,013 After IT Crash, June 20, 2026',
  description:
    'BSE Sensex closed at 76,802.90 (down 607 pts) and Nifty 50 at 24,013.10 on June 19. Nifty IT fell 3.65% to 27,426, intraday low 26,634. Infosys down 8%, TCS down 6%. Why the Indian stock market fell today, explained.',
  alternates: { canonical: 'https://fermor.in/blogs/sensex-nifty-market-crash-it-stocks-june-2026' },
  openGraph: {
    title: 'Sensex Nifty Stock Market: Why IT Stocks Crashed and Rs 2 Lakh Crore Was Wiped Out',
    description: 'Nifty IT hit a 3-year low at 26,634 on June 19. Infosys fell 8%, TCS 6%, Tech Mahindra 6.17%. Accenture guidance cut triggered the sell-off. What happened and what it means.',
    type: 'article',
    publishedTime: '2026-06-20T14:16:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Sensex', 'Nifty', 'BSE Sensex', 'Indian Stock Market', 'Nifty IT', 'IT Stocks India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why the Indian Stock Market Is Down: IT Stocks Crash, Rs 2 Lakh Crore Gone',
    description: 'Nifty IT at 26,634, a 3-year low. Infosys down 8%, TCS down 6%. Here is why the market fell and what to watch.',
  },
  keywords: [
    'sensex nifty stock market', 'sensex today', 'nifty sensex today', 'bse sensex', 'indian stock market',
    'why market is down today', 'why it stocks are falling today', 'nifty it', 'gift nifty today live',
    'stock market today', 'it stocks india', 'why it stocks are down today', 'why it sector down today',
    'infosys share price', 'tcs share price', 'nifty it today', 'accenture shares',
    'stock market india', 'nifty it index', 'sensex nifty', 'nifty 50 today', 'nifty today',
    'why infosys share is falling today', 'it stocks', 'bse sensex today', 'nse nifty today',
    'sensex nifty today', 'reliance share price', 'wipro share price', 'hcl tech share price',
    'tech mahindra share price', 'tcs share', 'infosys adr', 'wipro adr', 'infy share price',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Sensex Nifty Stock Market Today: BSE Sensex 76,803, Nifty 50 24,013 After IT Stocks Crash, June 20, 2026',
  description: 'BSE Sensex closed at 76,802.90 (-607 pts, -0.78%) and Nifty 50 at 24,013.10 (-154.90 pts, -0.64%) on June 19. Nifty IT fell 3.65% to 27,426.85, intraday low 26,634. Infosys down 7.5-8%, TCS down 6%, Tech Mahindra down 6.17%. Accenture guidance cut triggered the sell-off.',
  datePublished: '2026-06-20T14:16:00+05:30',
  dateModified: '2026-06-20T14:16:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/sensex-nifty-market-crash-it-stocks-june-2026' },
  articleSection: 'Stock Market',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'BSE Sensex' },
    { '@type': 'Thing', name: 'Nifty 50' },
    { '@type': 'Thing', name: 'Nifty IT Index' },
    { '@type': 'Organization', name: 'Infosys Limited', tickerSymbol: 'INFY' },
    { '@type': 'Organization', name: 'Tata Consultancy Services', tickerSymbol: 'TCS' },
    { '@type': 'Organization', name: 'Accenture PLC', tickerSymbol: 'ACN' },
  ],
  keywords: 'sensex nifty stock market, why market is down today, bse sensex, indian stock market, nifty it, why it stocks are falling today, sensex today, nifty sensex today',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Sensex Nifty: Why IT Stocks Crashed, June 20, 2026', item: 'https://fermor.in/blogs/sensex-nifty-market-crash-it-stocks-june-2026' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/sensex-nifty-market-crash-it-stocks-june-2026',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is the Indian stock market down today?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Indian stock market fell on June 19-20, 2026 primarily because IT stocks crashed. Accenture, the global IT bellwether, fell 17.97% on the NYSE on June 18 after cutting its FY26 revenue guidance. The next morning, Indian IT stocks opened sharply lower. BSE Sensex closed at 76,802.90 on June 19 (down 607 points, -0.78%). Nifty 50 closed at 24,013.10 (down 154.90 points, -0.64%). Nifty IT closed at 27,426.85 (down 3.65%), touching an intraday low of 26,634. Since IT accounts for roughly 14-16% of the Nifty 50 index, this sector sell-off dragged the broader Sensex and Nifty down.' },
    },
    {
      '@type': 'Question',
      name: 'Why is Nifty IT falling today?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nifty IT is falling because Accenture cut its FY26 revenue guidance to 3-4% from 3-5% on June 18, and its stock fell 17.97% on the NYSE. Accenture and Indian IT companies like Infosys, TCS, and Wipro serve the same global enterprise clients. When Accenture signals slower demand from those clients, investors assume Indian IT companies will face the same headwind in Q1 FY27 results. The Nifty IT index closed at 27,426.85 on June 19 (down 3.65%), after hitting an intraday low of 26,634, a level not seen since June 2023.' },
    },
    {
      '@type': 'Question',
      name: 'Why is Infosys share price falling today?',
      acceptedAnswer: { '@type': 'Answer', text: 'Infosys fell 7.5 to 8% on June 19, 2026. The trigger was Accenture\'s Q3 FY26 results, released on June 18. Accenture\'s new bookings fell 3% in local currency, indicating global enterprises are committing to less IT work. Infosys and Accenture serve the same BFSI and North American enterprise client base. Investors treated Accenture\'s soft bookings as a leading signal for Infosys\'s own Q1 FY27 results due in mid-July.' },
    },
    {
      '@type': 'Question',
      name: 'What is Gift Nifty today?',
      acceptedAnswer: { '@type': 'Answer', text: 'Gift Nifty (formerly SGX Nifty) is the Nifty 50 futures contract traded on the NSE International Exchange in GIFT City, Gujarat. It trades before Indian markets open and is widely used to gauge where Nifty 50 will open. On mornings following large US market moves, Gift Nifty reflects overnight global sentiment. On June 19-20, Gift Nifty pointed lower, consistent with the Accenture-led IT sector sell-off that had played out in US markets overnight. For real-time levels, check NSE India or your broker terminal.' },
    },
    {
      '@type': 'Question',
      name: 'Which IT stocks fell the most on June 19?',
      acceptedAnswer: { '@type': 'Answer', text: 'On June 19, 2026, the sharpest falls among Indian IT stocks were: Infosys down 7.5 to 8% (steepest fall this year), Tech Mahindra down 6.17%, TCS down 6%. On the US exchange the previous night, Cognizant fell 10.49%. The Nifty IT index as a whole fell over 6% to 26,634, touching a 3-year low. The sell-off was sector-wide, not company-specific.' },
    },
    {
      '@type': 'Question',
      name: 'What happened to BSE Sensex today?',
      acceptedAnswer: { '@type': 'Answer', text: 'BSE Sensex closed at 76,802.90 on June 19, 2026, down 607.07 points or 0.78%, pulled lower by the IT sector sell-off. Nifty 50 closed at 24,013.10, down 154.90 points or 0.64%. The IT sector accounts for roughly 14-16% of both indices. The Nifty IT index itself fell 3.65% to 27,426.85. For the current Sensex level on June 20, check BSE India at bseindia.com or your broker terminal, as index levels update continuously through the trading day.' },
    },
    {
      '@type': 'Question',
      name: 'Will the Indian stock market recover after this crash?',
      acceptedAnswer: { '@type': 'Answer', text: 'Whether the market recovers depends on two events in mid-July: Infosys and TCS reporting Q1 FY27 results. If their deal wins and guidance are stronger than Accenture\'s bookings implied, IT stocks rebound and the broader market stabilises. If they confirm the demand weakness Accenture signalled, more downside is possible. The current sell-off is partially a reflexive reaction to Accenture\'s guidance, and partially justified by the bookings signal. The real picture becomes clear when Indian IT companies report.' },
    },
    {
      '@type': 'Question',
      name: 'What is the Nifty IT index level today?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nifty IT closed at 27,426.85 on June 19, 2026, down 1,039.60 points or 3.65% from the previous close of 28,466.45. During intraday trade, Nifty IT touched a low of approximately 26,634, its lowest level since June 2023. On June 20, the index is expected to remain under pressure as the sell-off continues. For the live current level, visit NSE India at nseindia.com or your broker terminal.' },
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
  red:    '#B91C1C',
  green:  '#166534',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

function Breadcrumb() {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'Stock Market' }].map((crumb, i, arr) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < arr.length - 1 && crumb.href ? (
              <Link target="_blank" rel="noopener noreferrer" href={crumb.href} style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
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
    <div style={{ borderLeft: `3px solid #CCCCCC`, background: '#FAFAFA', padding: '15px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15.5, color: C.ink2, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function KeyNumbers() {
  const items = [
    { label: 'BSE Sensex (Jun 19 close)', value: '76,803', note: 'down 607 pts, or 0.78%', red: true },
    { label: 'Nifty 50 (Jun 19 close)', value: '24,013', note: 'down 154.90 pts, or 0.64%', red: true },
    { label: 'Nifty IT (Jun 19 close)', value: '27,427', note: 'down 3.65%, intraday low: 26,634', red: true },
    { label: 'Infosys (intraday, Jun 19)', value: 'down 7.5 to 8%', note: 'sharpest fall this year', red: true },
    { label: 'TCS (intraday, Jun 19)', value: 'down 6%', note: '', red: true },
    { label: 'Tech Mahindra (intraday)', value: 'down 6.17%', note: 'Jun 19, 2026', red: true },
    { label: 'IT sector market cap', value: 'Rs 2 lakh crore', note: 'wiped across two sessions', red: true },
    { label: 'Accenture (trigger)', value: '$127.98', note: 'down 17.97% on Jun 18, NYSE', red: true },
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
          <div style={{ fontSize: 13.5, fontWeight: 700, color: item.red ? C.red : C.dark, fontFamily: POPPINS, flexShrink: 0, textAlign: 'right' }}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'CAGR Calculator', desc: 'Actual annualised return from your entry price', href: '/calculators/cagr-calculator' },
    { label: 'Capital Gains Calculator', desc: 'STCG and LTCG tax on selling IT stocks', href: '/calculators/capital-gains-calculator' },
    { label: 'Investment Comparison', desc: 'Equity vs SIP vs FD side by side', href: '/calculators/investment-comparison-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 18px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link target="_blank" rel="noopener noreferrer" key={tool.href} href={tool.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 18px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
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

function RelatedReads() {
  const cards = [
    { title: 'Accenture Share Price Crashes 18%: Why Nifty IT Hit a 3-Year Low', href: '/blogs/accenture-shares-india-it-sector-q3-fy26', desc: 'Deep dive into Accenture\'s Q3 FY26 results, the bookings decline, and what it means for Infosys, TCS, and Wipro investors.' },
    { title: 'Reliance AGM 2026: Jio Files IPO Draft With SEBI', href: '/blogs/reliance-agm-2026-jio-ipo-drhp', desc: 'Jio Platforms DRHP filed with SEBI. Jio FY26 profit Rs 30,000+ crore. Reliance Intelligence AI backbone announced. RIL dividend Rs 6/share.' },
  ];
  return (
    <section style={{ padding: '32px 0 8px', borderTop: `1px solid ${C.border}`, marginTop: 12 }}>
      <h3 style={{ fontFamily: POPPINS, fontSize: 15, fontWeight: 600, color: C.dark, marginBottom: 16, letterSpacing: '-.01em' }}>From June 19, 2026</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {cards.map(card => (
          <Link target="_blank" rel="noopener noreferrer" key={card.href} href={card.href} style={{ display: 'block', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 18px', textDecoration: 'none' }}>
            <div style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, lineHeight: 1.4, marginBottom: 6 }}>{card.title}</div>
            <div style={{ fontFamily: INTER, fontSize: 13, color: C.ink3, lineHeight: 1.55 }}>{card.desc}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RelatedTools() {
  const cards = [
    { title: 'CAGR Calculator', href: '/calculators/cagr-calculator', desc: 'Enter your buy price and today\'s price to calculate the actual annualised return from any stock or mutual fund holding.' },
    { title: 'Capital Gains Calculator', href: '/calculators/capital-gains-calculator', desc: 'Calculate STCG and LTCG tax on selling Infosys, TCS, Wipro, or any equity at the current tax rules.' },
    { title: 'Investment Comparison', href: '/calculators/investment-comparison-calculator', desc: 'Compare what the same amount grows to in equities, a systematic SIP, or a fixed deposit over your time horizon.' },
  ];
  return (
    <section style={{ padding: '44px 0 52px', borderTop: `1px solid ${C.border}` }}>
      <h2 style={{ fontFamily: POPPINS, fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 20, letterSpacing: '-.01em' }}>Run the numbers yourself</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {cards.map(card => (
          <Link target="_blank" rel="noopener noreferrer" key={card.href} href={card.href} style={{ display: 'block', background: '#fff', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', textDecoration: 'none' }}>
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
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute investment advice. Stock and index prices change continuously during trading hours. Figures in this article reflect closing prices on June 19, 2026. Always consult a SEBI-registered financial advisor before making investment decisions.
      </p>
    </div>
  );
}

export default function SensexNiftyJune2026Page() {
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
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.ink3, fontFamily: INTER }}>Stock Market</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 600, color: C.dark, lineHeight: 1.13, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 820 }}>
            Why the Indian Stock Market Is Down Today. BSE Sensex at 76,803, Nifty 50 at 24,013 After IT Stocks Wipe Rs 2 Lakh Crore.
          </h1>
          <p className="article-lead" style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            BSE Sensex closed at 76,802.90 and Nifty 50 at 24,013.10 on June 19, pulled lower by an IT sector sell-off. Nifty IT fell 3.65 percent to 27,427, touching an intraday low of 26,634. Infosys dropped 7.5 to 8 percent intraday. The trigger was a single earnings report from a US company on June 18.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
            <time dateTime="2026-06-20T14:16:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jun 20, 2026 · 2:16 PM IST</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>5 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { symbol: 'BSE Sensex', change: '76,803, down 607 pts', down: true },
              { symbol: 'Nifty 50', change: '24,013, down 154.90 pts', down: true },
              { symbol: 'Nifty IT', change: '27,427, down 3.65%', down: true },
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
              Accenture cut its revenue forecast on June 18. The stock fell 17.97 percent on the NYSE. By the time Indian markets opened on June 19, the damage had already spread to Indian IT ADRs overnight.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              BSE Sensex closed at 76,802.90 on June 19, down 607 points. Nifty 50 closed at 24,013.10, down 154.90 points. The sell-off is carrying into June 20.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What Happened on June 19
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              IT stocks crashed across the board. The Nifty IT index opened sharply lower and touched 26,634 in early trade, a level not seen since June 2023. It recovered through the session and closed at 27,426.85, down 1,039 points or 3.65 percent from the previous day.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Infosys fell 7.5 to 8 percent intraday, the steepest single-day fall for the stock this year. TCS fell 6 percent. Tech Mahindra fell 6.17 percent. The sell-off was not limited to one or two names. Every major IT company was down.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              IT carries roughly 14 to 16 percent weight in the Nifty 50. That is enough to drag the headline index down even on a day when other sectors hold steady, which is exactly what happened.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Why One US Report Moved Every Indian IT Stock
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Accenture and Indian IT companies like Infosys, TCS, and Wipro serve the same global enterprise clients. When Accenture reports weaker demand from those clients, investors treat it as an advance signal for the Indian IT sector.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Accenture&apos;s Q3 FY26 revenue grew 6 percent. That was not the issue. The problem was bookings: new client contracts fell 3 percent in local currency. Bookings represent committed future work. A fall means enterprises are signing less over the next 12 to 24 months.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Accenture reports before Indian IT companies do. Investors do not wait for Infosys and TCS to confirm the same picture in mid-July. They sell first, on the Accenture data alone.
            </p>

            <Callout>
              Accenture employs over 3 lakh people in India, its largest delivery base globally. The guidance cut affects not just stock prices but hiring pace, salary cycles, and bench utilisation across the sector. That is why every IT company fell, not just one.
            </Callout>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Nifty IT Intraday Low of 26,634: Context
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The Nifty IT index peaked above 40,000 in late 2021, during peak enterprise IT spending post-pandemic. Since then, it has lost roughly a third of its value. There was partial recovery in 2024 and early 2025, driven by AI-related optimism. That optimism is now being tested by actual demand data from Accenture.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              AI projects are growing, but they have not yet replaced the volume of work lost in legacy maintenance and routine outsourcing. That gap is what Accenture&apos;s bookings number is reflecting.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The intraday recovery from 26,634 to 27,427 shows some buying at lower levels. But the index closed 3.65 percent below the previous day. Until Infosys and TCS report Q1 FY27 results in mid-July, there is no new data to change the direction.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What Gift Nifty Shows Today
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Gift Nifty is the Nifty 50 futures contract traded at GIFT City, Gujarat, before Indian markets open at 9:15 AM IST. It reflects overnight moves in US and Asian markets and is widely used to read where the NSE will open.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              After the June 18 Accenture crash in the US session and the June 19 Indian market fall, Gift Nifty is indicating continued pressure on June 20. For live levels, check NSE IFSC at nseindia.com or your broker&apos;s premarket screen.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What Happened to Reliance and Other Sectors
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Reliance Industries held its 49th AGM on June 19. Jio Platforms filed its IPO DRHP with SEBI that day, and Jio FY26 profit was reported at Rs 30,000 crore. The RIL share closed around Rs 1,315.80, down approximately 1 percent.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              That 1 percent drop was not about the AGM. It was the broader market weakness pulling it down. Strong fundamental news from India&apos;s largest company was not enough to move against the IT-driven tide. The full{' '}
              <Link target="_blank" rel="noopener noreferrer" href="/blogs/reliance-agm-2026-jio-ipo-drhp" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Reliance AGM 2026 and Jio IPO breakdown
              </Link>
              {' '}covers every announcement in detail.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Should You Sell, Hold, or Buy the Dip
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              That question cannot be answered until mid-July. If Infosys and TCS report Q1 FY27 results that are better than what Accenture&apos;s bookings implied, the sell-off was an overreaction and stocks recover. If they confirm the same demand weakness, there is more downside. Selling today, before Indian companies have reported, is acting on US data alone.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              If you are holding IT stocks at a loss and considering an exit, calculate the tax first. The{' '}
              <Link target="_blank" rel="noopener noreferrer" href="/calculators/capital-gains-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Capital Gains Calculator
              </Link>
              {' '}shows the STCG or LTCG liability at any exit price. The{' '}
              <Link target="_blank" rel="noopener noreferrer" href="/calculators/cagr-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                CAGR Calculator
              </Link>
              {' '}shows your actual annualised return from your entry price, which is often more useful than the absolute loss number in your broker app.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              If you are also wondering whether to stay in equity or move to a fixed deposit while markets settle, the{' '}
              <Link target="_blank" rel="noopener noreferrer" href="/calculators/investment-comparison-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Investment Comparison Calculator
              </Link>
              {' '}lets you run equity, SIP, and FD side by side over your specific time horizon.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              For a deeper read on what the Accenture numbers specifically mean for Infosys, TCS, and Wipro, the{' '}
              <Link target="_blank" rel="noopener noreferrer" href="/blogs/accenture-shares-india-it-sector-q3-fy26" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Accenture Q3 FY26 analysis
              </Link>
              {' '}breaks down the bookings data, guidance range, and what to watch in mid-July results.
            </p>

            <RelatedTools />
            <Disclaimer />
          </article>

          <aside
            className="sensex-sidebar"
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
            <div style={{ flexShrink: 0 }}><RelatedReads /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link target="_blank" rel="noopener noreferrer" href="/blogs" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
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
        .sensex-sidebar::-webkit-scrollbar { width: 5px; }
        .sensex-sidebar::-webkit-scrollbar-track { background: transparent; }
        .sensex-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .sensex-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

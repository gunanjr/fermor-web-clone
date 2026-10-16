import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'Accenture Share Price Falls 18%: Why Nifty IT Crashed to a 3-Year Low Today',
  description:
    'Accenture share price fell 17.97% to $127.98 on June 18 after cutting FY26 guidance. Nifty IT crashed over 6% to 26,634. Infosys fell 8%, TCS 6%, Tech Mahindra 6.17%. What happened and what to do.',
  alternates: { canonical: 'https://fermor.in/blogs/accenture-shares-india-it-sector-q3-fy26' },
  openGraph: {
    title: 'Accenture Share Price Falls 18%: Why Nifty IT Hit a 3-Year Low Today',
    description: 'Accenture cut FY26 guidance to 3-4%. Its stock crashed 18% on NYSE. The next morning, Nifty IT was at a 3-year low. Here is what happened and what Indian IT investors should know.',
    type: 'article',
    publishedTime: '2026-06-19T09:30:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Accenture', 'ACN', 'Nifty IT', 'Indian IT Sector', 'Infosys', 'TCS', 'IT Stocks India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accenture Share Price Falls 18%: Nifty IT Hits 3-Year Low',
    description: 'Accenture cut FY26 guidance. Stock crashed 18% on NYSE. Infosys down 8%, TCS down 6%. Why Indian IT sold off and what to watch next.',
  },
  keywords: [
    'accenture share price', 'accenture shares', 'accenture stock price', 'price of accenture stock',
    'share value of accenture', 'why it stocks are falling today', 'why infosys share is falling today',
    'nifty it today', 'accenture q3 2026 results', 'nifty it index', 'why it sector down today',
    'infosys share price', 'tcs share price', 'it stocks india', 'accenture news', 'accenture stocks',
    'sensex nifty stock market', 'bse sensex', 'why market is down today', 'stock market today',
    'why it stocks are down today', 'nifty sensex today', 'sensex today', 'stock market',
    'infosys adr', 'infosys adr share price', 'wipro adr', 'infy share price', 'tcs share',
    'gift nifty today live', 'it stocks', 'nifty it', 'indian stock market', 'reliance share price',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Accenture Share Price Falls 18%: Why Nifty IT Crashed to a 3-Year Low Today',
  description: 'Accenture (ACN) fell 17.97% on NYSE after cutting FY26 revenue guidance to 3-4%. Nifty IT dropped over 6% to 26,634 the next morning. Infosys fell 7.5-8%, TCS fell 6%. Analysis of what happened and implications for Indian IT investors.',
  datePublished: '2026-06-19T09:30:00+05:30',
  dateModified: '2026-06-19T09:30:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/accenture-shares-india-it-sector-q3-fy26' },
  articleSection: 'IT Sector',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Organization', name: 'Accenture PLC', tickerSymbol: 'ACN' },
    { '@type': 'Organization', name: 'Infosys Limited', tickerSymbol: 'INFY' },
    { '@type': 'Organization', name: 'Tata Consultancy Services', tickerSymbol: 'TCS' },
  ],
  keywords: 'accenture share price, accenture shares, why it stocks are falling today, nifty it, infosys share price falling',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Accenture Share Price Falls 18%: Nifty IT 3-Year Low', item: 'https://fermor.in/blogs/accenture-shares-india-it-sector-q3-fy26' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is Nifty IT falling today?',
      acceptedAnswer: { '@type': 'Answer', text: 'Accenture cut its FY26 revenue guidance to 3-4% from 3-5% on June 18, and its stock crashed 17.97% on NYSE. This signalled slowing enterprise IT demand to investors. Nifty IT reacted by falling over 6% to 26,634 on June 19, a three-year low.' },
    },
    {
      '@type': 'Question',
      name: 'Why is Infosys share price falling today?',
      acceptedAnswer: { '@type': 'Answer', text: "Accenture's Q3 FY26 new bookings fell 3% in local currency, indicating enterprise clients are pulling back on IT spending. Accenture and Infosys serve the same global client base, so a decline in Accenture's bookings is treated as a leading indicator for Indian IT companies' upcoming results." },
    },
    {
      '@type': 'Question',
      name: 'What is Accenture share price today?',
      acceptedAnswer: { '@type': 'Answer', text: 'Accenture (NYSE: ACN) closed at $127.98 on June 18, 2026, down $28.03 or 17.97%, following its Q3 FY26 earnings release and guidance cut. The stock hit a 52-week low of $125.60 intraday.' },
    },
    {
      '@type': 'Question',
      name: 'What did Accenture report for Q3 FY2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Accenture reported Q3 FY26 revenue of $18.72 billion (+6% in USD), EPS of $3.80 (+9%), and new bookings of $19.3 billion (-3% in local currency). Full-year guidance was narrowed to 3-4% local currency growth from 3-5%.' },
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
        {[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blogs' }, { label: 'IT Sector' }].map((crumb, i, arr) => (
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
    <div style={{ borderLeft: `3px solid #CCCCCC`, background: '#FAFAFA', padding: '15px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15.5, color: C.ink2, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function KeyNumbers() {
  const items = [
    { label: 'ACN close (Jun 18, NYSE)', value: '$127.98', note: 'down $28.03, or 17.97%', red: true },
    { label: 'ACN 52-week high', value: '$307.77', note: 'new 52-wk low: $125.60 today', red: true },
    { label: 'Nifty IT (Jun 19)', value: '26,634', note: 'down 5.55 to 6.5%, 3-year low', red: true },
    { label: 'Infosys', value: 'down 7.5 to 8%', note: 'sharpest fall this year', red: true },
    { label: 'TCS', value: 'down 6%', note: '', red: true },
    { label: 'Q3 FY26 revenue', value: '$18.72B', note: '+6% in USD, +3% local currency' },
    { label: 'New bookings', value: '$19.3B', note: 'down 3% local currency', red: true },
    { label: 'FY26 guidance (local currency)', value: '3 to 4%', note: 'cut from 3 to 5%', red: true },
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
    { label: 'CAGR Calculator', desc: 'Actual annualised return on your IT stocks', href: '/calculators/cagr-calculator' },
    { label: 'Capital Gains Calculator', desc: 'Tax on selling Infosys, TCS, or Wipro', href: '/calculators/capital-gains-calculator' },
    { label: 'Investment Comparison', desc: 'IT stocks vs SIP vs FD side by side', href: '/calculators/investment-comparison-calculator' },
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
    { title: 'CAGR Calculator', href: '/calculators/cagr-calculator', desc: 'Enter your buy price and today\'s price to calculate the actual annualised return from any IT stock holding.' },
    { title: 'Capital Gains Calculator', href: '/calculators/capital-gains-calculator', desc: 'Calculate STCG and LTCG tax on selling Infosys, TCS, or Wipro shares at the current tax slabs.' },
    { title: 'Investment Comparison', href: '/calculators/investment-comparison-calculator', desc: 'Compare what the same money grows to in equities versus a systematic SIP or fixed deposit.' },
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
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute investment advice. Stock prices change rapidly. Past performance does not guarantee future returns. Always consult a SEBI-registered financial advisor before making investment decisions. Accenture is listed on the NYSE; the analysis covers its impact on Indian-listed IT companies.
      </p>
    </div>
  );
}

export default function AccentureQ3ArticlePage() {
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
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.ink3, fontFamily: INTER }}>IT Sector</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(26px, 3.8vw, 40px)', fontWeight: 600, color: C.dark, lineHeight: 1.13, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 820 }}>
            Accenture Share Price Crashes 18% on NYSE. Here Is Why Nifty IT Hit a 3-Year Low Today.
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Accenture cut its full-year revenue guidance on June 18. The stock fell 17.97 percent. The next morning on Indian exchanges, the Nifty IT index crashed over 6 percent to 26,634, a three-year low. Infosys fell 8 percent. TCS fell 6 percent.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
            <time dateTime="2026-06-19T09:30:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jun 19, 2026 · 9:30 AM IST</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>6 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { symbol: 'ACN (NYSE)', change: 'down 17.97%', down: true },
              { symbol: 'Nifty IT', change: 'down 6%, 3-yr low', down: true },
              { symbol: 'Infosys', change: 'down 7.5 to 8%', down: true },
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
              Accenture share price fell 17.97 percent on June 18, closing at $127.98 on the NYSE. It was the stock&apos;s sharpest single-day fall in years, hitting an intraday low of $125.60, which is also a fresh 52-week low. The 52-week high was $307.77. By the time Indian exchanges opened on June 19, Indian IT ADRs had already fallen up to 10 percent overnight. The Nifty IT index crashed 5.55 to 6.5 percent to 26,634, touching both a 3-year low and a 52-week low simultaneously.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              The Number That Drove the Accenture Share Price Crash
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Accenture&apos;s Q3 FY26 revenue was $18.72 billion, up 6 percent. EPS came in at $3.80, up 9 percent. Both numbers were fine. The stock did not fall 18 percent because of those. It fell because of two other disclosures.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              First, new bookings came in at $19.3 billion, down 3 percent in local currency. Bookings represent signed contracts, work that will be executed over the next 12 to 24 months. A fall in bookings means clients are committing to less new work. Second, management narrowed full-year guidance to 3 to 4 percent local currency revenue growth, cutting the upper end from 5 percent. When Accenture, which serves every major global corporation, tells you it does not believe the upside case is achievable, the market takes that seriously.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              Why Accenture Results Move Infosys, TCS, and Wipro Share Prices
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Accenture&apos;s clients are the same Fortune 500 banks, insurance companies, retailers, and healthcare systems that outsource work to Infosys, TCS, Wipro, and HCL Tech. When those clients sign fewer new contracts with Accenture, they are doing the same with Indian IT vendors. Accenture reports before Indian IT companies, so its results act as a leading indicator for what Infosys and TCS will show when they report Q1 FY27 results in mid-July.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Accenture also employs over 3 lakh people in India, its largest delivery base globally. A cautious outlook from Accenture slows hiring across the sector and affects salary increments and promotions at every Indian IT firm, not just Accenture&apos;s own India workforce.
            </p>

            <Callout>
              The Nifty IT index is at 26,634, its lowest level since June 2023. Infosys fell 7.5 to 8 percent, TCS 6 percent, Tech Mahindra 6.17 percent. On the US exchange, Cognizant fell 10.49 percent. This is sector-wide, not company-specific.
            </Callout>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What the Full Q3 Numbers Show
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The quarterly results themselves were not bad. Revenue of $18.72 billion grew 6 percent in USD. Operating margin held at 17 percent. Diluted EPS rose 9 percent to $3.80. Free cash flow was $3.6 billion. The company returned $2.2 billion to shareholders through buybacks and dividends. On earnings per share for the full year, guidance was maintained at $13.38 to $13.50, implying 10 to 11 percent growth over FY25.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The issue is bookings and the guidance cut. Q4 revenue guidance of $17.75 to $18.4 billion implies local currency growth of 1 to 5 percent, a wide range that reflects genuine uncertainty. Accenture is also spending heavily on acquisitions, approximately $4.2 billion in cybersecurity alone this quarter, which suggests it is trying to buy its way into higher-growth segments rather than waiting for organic demand to recover.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              AI Is Creating New Demand But Also Compressing Old Revenue
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Accenture is winning AI-related work. Generative AI implementations, data platform builds, and AI security are growing. But AI is simultaneously reducing the hours required for legacy application maintenance, manual testing, and routine outsourcing tasks. Indian IT companies that are heavily concentrated in those legacy categories are seeing revenue compression even as their AI practices grow.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Infosys and Wipro have more exposure to BFSI and North American discretionary IT spending, which makes them more sensitive to this shift. TCS has a broader base including domestic India revenue and manufacturing clients, which provides some cushion. HCL Tech earns revenue from software licensing, another source of protection from pure services headwinds.
            </p>

            <h2 style={{ fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dark, marginTop: 36, marginBottom: 14, letterSpacing: '-.015em' }}>
              What Investors Holding Nifty IT Stocks Should Know
            </h2>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              Indian IT stocks tend to move harder than Accenture on the day of its results. Accenture is a consulting-heavy company with a different revenue mix from Indian outsourcing firms. Today&apos;s 6 percent crash in Nifty IT is partly justified by the bookings signal, and partly a reflexive sell-off that overshoots.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              The real test comes in mid-July, when Infosys and TCS report Q1 FY27 results. If their deal wins and revenue guidance confirm the softness that Accenture&apos;s bookings data implies, the sell-off is justified. If Indian IT companies show stronger demand than Accenture signalled, the stocks recover. Selling today based on Accenture alone, without waiting for Indian IT&apos;s own numbers, is a short-term decision dressed as analysis.
            </p>

            <p style={{ fontSize: 16.5, color: C.ink, lineHeight: 1.8, marginBottom: 22 }}>
              If you are considering selling IT positions today, calculate the actual after-tax position first. Fermor&apos;s{' '}
              <Link href="/calculators/capital-gains-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                Capital Gains Calculator
              </Link>
              {' '}shows the STCG or LTCG on any sale. The{' '}
              <Link href="/calculators/cagr-calculator" style={{ color: C.dg, fontWeight: 500, textDecoration: 'underline' }}>
                CAGR Calculator
              </Link>
              {' '}gives you the actual annualised return from your entry price to today, which is often a more honest picture than the percentage in your broker app.
            </p>

            <RelatedTools />
            <Disclaimer />
          </article>

          <aside
            className="accenture-sidebar"
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
        .accenture-sidebar::-webkit-scrollbar { width: 5px; }
        .accenture-sidebar::-webkit-scrollbar-track { background: transparent; }
        .accenture-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .accenture-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

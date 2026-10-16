import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../src/components/common/SiteFooter';
import { PageNav } from '../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../src/components/common/footerLinks';
import { GDP_DATA_FULL } from '../blogs/world-gdp-ranking-2026/gdpData';
import { slugifyCountry } from './_template/slugify';
import { GDPHubTableClient } from './_template/GDPHubTableClient';

export const metadata: Metadata = {
  title: 'GDP by Country 2026: Every Nation\'s GDP, Growth & History',
  description: 'GDP by country 2026: nominal GDP, growth rate, and GDP per capita for all 218 IMF-tracked countries. Searchable, sortable, filterable by region. Full 1980-2031 history per country.',
  keywords: [
    'gdp by country', 'gdp by country 2026', 'gdp by country list', 'list of countries by gdp',
    'gdp ranking by country', 'country gdp list', 'gdp of all countries', 'world gdp by country',
    'gdp per capita by country', 'gdp growth rate by country', 'nominal gdp by country',
  ],
  alternates: { canonical: 'https://fermor.in/gdp' },
  openGraph: {
    title: 'GDP by Country 2026: Every Nation\'s GDP, Growth & History - Fermor',
    description: 'Nominal GDP, growth rate, and GDP per capita for all 218 IMF-tracked countries. Searchable and sortable.',
    type: 'website',
    url: 'https://fermor.in/gdp',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDP by Country 2026: Every Nation\'s GDP, Growth & History - Fermor',
    description: 'Nominal GDP, growth rate, and GDP per capita for all 218 IMF-tracked countries.',
  },
};

const C = {
  dark: '#111111',
  dg: '#101214',
  ink: '#333333',
  ink2: '#555555',
  ink3: '#888888',
  border: '#E5E5E5',
  bg: '#F7F7F7',
  paleDg: '#f1f3f4',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';
const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.85, marginBottom: 20 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 40, marginBottom: 16, letterSpacing: '-0.01em' };

function getBuiltSlugs(): string[] {
  const gdpDir = path.join(process.cwd(), 'app/gdp');
  try {
    return fs.readdirSync(gdpDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('_'))
      .map(d => d.name);
  } catch {
    return [];
  }
}

const faqItems = [
  { q: 'How many countries does this GDP database cover?', a: 'This page covers all 218 countries and territories tracked by the IMF World Economic Outlook, from the United States ($32.38 trillion) down to Tuvalu ($65 million).' },
  { q: 'What is the source of this GDP data?', a: 'All figures come from the IMF World Economic Outlook, April 2026 edition. Historical data goes back to 1980; projections extend to 2031.' },
  { q: 'How often is this GDP data updated?', a: 'The IMF publishes two full World Economic Outlook editions a year (April and October) covering all 218 economies, plus lighter Update editions in January and July that revise growth projections for major economies only.' },
  { q: 'What is the difference between GDP and GDP per capita?', a: 'GDP is a country\'s total economic output. GDP per capita divides that total by population, showing average output per person. A country can rank high on total GDP but low on GDP per capita if it has a very large population.' },
  { q: 'Which country has the highest GDP?', a: 'The United States has the highest nominal GDP in the world at $32.38 trillion (2026), followed by China at $20.85 trillion.' },
  { q: 'Can I search for a specific country\'s GDP?', a: 'Yes. Use the search box above the table to filter by country name, or use the region buttons (Asia, Africa, Europe, Americas, Oceania) to browse by continent. Click any column header to sort.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'GDP by Country', item: 'https://fermor.in/gdp' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/gdp',
  name: 'GDP by Country 2026: Every Nation\'s GDP, Growth & History - Fermor',
  url: 'https://fermor.in/gdp',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'GDP by Country',
    description: 'Nominal Gross Domestic Product for every country tracked by the IMF World Economic Outlook, searchable and sortable by growth rate and per capita income.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'World GDP Data', url: 'https://fermor.in/blogs/world-gdp-ranking-2026' },
  }],
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '.article-lead', isAccessibleForFree: true },
    { '@type': 'WebPageElement', cssSelector: '#gdp-table', name: 'GDP by Country Table' },
    { '@type': 'WebPageElement', cssSelector: '#how-sourced', name: 'How This Data Is Sourced' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'FAQ' },
  ],
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors.',
  knowsAbout: ['World GDP Rankings', 'Macroeconomics', 'India GDP', 'Personal Finance India'],
};

export default function GDPHubPage() {
  const builtSlugs = getBuiltSlugs();
  const slugOf: Record<string, string> = {};
  for (const r of GDP_DATA_FULL) slugOf[r.country] = slugifyCountry(r.country);
  const top = GDP_DATA_FULL[0];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />

      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>GDP by Country</li>
            </ol>
          </nav>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.4vw, 36px)', fontWeight: 700, color: C.dark, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 12 }}>
            GDP by Country
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div className="gdp-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>
          <article itemScope itemType="https://schema.org/WebPage" style={{ fontFamily: INTER, minWidth: 0 }}>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 20 }}>
              <p className="article-lead" itemProp="description" style={{ fontSize: 16, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                {top.country} has the highest nominal GDP in the world at {top.gdpShort} (2026), out of 218 countries and territories tracked by the IMF World Economic Outlook.
              </p>
            </div>
            <p style={pStyle}>
              Search or sort the table below by GDP, growth rate, or GDP per capita, or filter by region. Click any country name with a live page to see its full 1980-2031 history, PPP comparison, and growth chart.
            </p>

            <div id="gdp-table">
              <GDPHubTableClient builtSlugs={builtSlugs} slugOf={slugOf} />
            </div>

            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginTop: 24, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See what a monthly investment could grow to over the long run.</p>
              </div>
              <Link className="fx-btn" href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            <h2 id="how-sourced" style={hStyle}>How This Data Is Sourced</h2>
            <p style={pStyle}>
              Every figure on this page comes from the IMF World Economic Outlook, April 2026 edition, the same dataset cited in the <Link href="/blogs/world-gdp-ranking-2026" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>full GDP ranking analysis</Link>. Historical data runs from 1980 through 2026; IMF projections extend to 2031.
            </p>
            <p style={pStyle}>
              Individual country pages are generated from one shared dataset and template rather than written by hand, so every page uses the same verified figures. {builtSlugs.length} of {GDP_DATA_FULL.length} countries have a detailed page live so far, with more being added.
            </p>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none', lineHeight: 1.4 }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
              <p style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
                <strong>See also:</strong>{' '}
                <Link href="/blogs/world-gdp-ranking-2026" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>Full World GDP Ranking Analysis</Link>
                {' · '}
                <Link href="/blogs/world-gdp-ranking-2026#what-is-gdp" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>What is GDP?</Link>
              </p>
            </div>
          </article>

          <aside
            className="gdp-hub-sidebar"
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
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Quick Facts</span>
              </div>
              {[
                { label: 'Countries Covered', value: `${GDP_DATA_FULL.length}` },
                { label: 'Largest Economy', value: top.country },
                { label: 'Largest Economy GDP', value: top.gdpShort },
                { label: 'Data Source', value: 'IMF WEO Apr 2026' },
                { label: 'Pages Live', value: `${builtSlugs.length} of ${GDP_DATA_FULL.length}` },
              ].map((f, i, arr) => (
                <div key={f.label} style={{ padding: '11px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12.5, color: C.ink2 }}>{f.label}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: C.dg, fontFamily: POPPINS, flexShrink: 0, textAlign: 'right' }}>{f.value}</span>
                </div>
              ))}
            </div>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor Calculators</span>
              </div>
              {[
                { label: 'SIP Calculator', desc: 'Project long-term investment growth', href: '/calculators/sip-calculator' },
                { label: 'Income Tax Calculator', desc: 'Compare old and new regime for FY 2025-26', href: '/calculators/income-tax-calculator' },
              ].map((tool, i, arr) => (
                <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ))}
            </div>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Articles</span>
              </div>
              <Link href="/blogs/world-gdp-ranking-2026" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', textDecoration: 'none', background: '#fff' }}>
                <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>World GDP Ranking 2026: India at 6th</span>
              </Link>
            </div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .gdp-hub-sidebar::-webkit-scrollbar { width: 5px; }
        .gdp-hub-sidebar::-webkit-scrollbar-track { background: transparent; }
        .gdp-hub-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .gdp-hub-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) { .gdp-hub-grid { grid-template-columns: 1fr !important; } }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}

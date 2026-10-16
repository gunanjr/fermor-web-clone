import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { WorldGDPTableClient } from './WorldGDPTableClient';
import { GDP_DATA_FULL } from './gdpData';
import { slugifyCountry } from '../../gdp/_template/slugify';

function getBuiltGDPSlugs(): string[] {
  const gdpDir = path.join(process.cwd(), 'app/gdp');
  try {
    return fs.readdirSync(gdpDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('_'))
      .map(d => d.name);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: 'World GDP Ranking 2026: All 218 Countries, India at 6th',
  description: 'World GDP ranking 2026: searchable, sortable table of all 218 countries by nominal GDP, growth, and per capita. India ranks 6th at $4.15 trillion nominal, 3rd by PPP. GDP full form, richest country rankings, India GDP in rupees, and when India overtakes Germany.',
  alternates: { canonical: 'https://fermor.in/blogs/world-gdp-ranking-2026' },
  openGraph: {
    title: 'World GDP Ranking 2026: All 218 Countries by Nominal GDP',
    description: 'India at 6th globally with $4.15 trillion. Full sortable 218-country table, PPP comparison, India GDP in rupees, and when India overtakes Germany.',
    type: 'article',
    publishedTime: '2026-06-29T00:43:07+05:30',
    authors: ['Fermor Analysis'],
    tags: ['World GDP', 'India GDP', 'GDP Rankings', 'World Economy', 'India Economy 2026'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World GDP Ranking 2026: All 218 Countries',
    description: 'India at 6th with $4.15 trillion. Full 218-country rankings, PPP data, India GDP in rupees, and when India overtakes Germany (2031).',
  },
  keywords: [
    'world gdp ranking 2026', 'world economy ranking 2025', 'top 10 gdp countries 2025', 'india gdp 2025',
    'india gdp 2026', 'largest economy in the world 2026', 'gdp ranking by country 2026',
    'world gdp ranking by country', 'top 10 economies in the world 2025', 'india gdp rank',
    'india gdp rank 2025', 'india gdp in rupees', 'india economy ranking 2025',
    'india gdp per capita 2026', 'when will india become 3rd largest economy', 'india overtake germany',
    'india gdp ppp 2026', 'nominal gdp ranking 2026', 'world largest economy', 'india economy size',
    'gdp full form', 'gdp meaning', 'what is gdp', 'gdp of india', 'gdp of india 2025',
    'india gdp in trillion', 'richest country in the world', 'top 10 richest country in the world',
    'biggest economies in the world', 'largest economies in the world', 'gdp by country', 'gdp by country 2025',
    'gdp list of countries 2025', 'all country gdp list 2025', 'highest gdp country', 'highest gdp in the world',
    'top 5 gdp countries', 'top gdp countries', 'gdp list', 'world gdp',
  ],
};

const GDP_DATA = [
  { rank: 1, country: 'United States', gdpT: 32.38, growth: 2.32, perCap: 94430, isIndia: false },
  { rank: 2, country: 'China', gdpT: 20.85, growth: 4.41, perCap: 14874, isIndia: false },
  { rank: 3, country: 'Germany', gdpT: 5.45, growth: 0.79, perCap: 65303, isIndia: false },
  { rank: 4, country: 'Japan', gdpT: 4.38, growth: 0.72, perCap: 35703, isIndia: false },
  { rank: 5, country: 'United Kingdom', gdpT: 4.26, growth: 0.80, perCap: 61056, isIndia: false },
  { rank: 6, country: 'India', gdpT: 4.15, growth: 6.48, perCap: 2813, isIndia: true },
  { rank: 7, country: 'France', gdpT: 3.60, growth: 0.86, perCap: 52083, isIndia: false },
  { rank: 8, country: 'Italy', gdpT: 2.74, growth: 0.52, perCap: 46505, isIndia: false },
  { rank: 9, country: 'Russia', gdpT: 2.66, growth: 1.09, perCap: 18525, isIndia: false },
  { rank: 10, country: 'Brazil', gdpT: 2.64, growth: 1.91, perCap: 12313, isIndia: false },
  { rank: 11, country: 'Canada', gdpT: 2.51, growth: 1.50, perCap: 60305, isIndia: false },
  { rank: 12, country: 'Australia', gdpT: 2.12, growth: 2.01, perCap: 75648, isIndia: false },
  { rank: 13, country: 'Mexico', gdpT: 2.12, growth: 1.64, perCap: 15779, isIndia: false },
  { rank: 14, country: 'Spain', gdpT: 2.09, growth: 2.09, perCap: 41563, isIndia: false },
  { rank: 15, country: 'South Korea', gdpT: 1.93, growth: 1.86, perCap: 37412, isIndia: false },
  { rank: 16, country: 'Turkey', gdpT: 1.64, growth: 3.37, perCap: 19018, isIndia: false },
  { rank: 17, country: 'Indonesia', gdpT: 1.54, growth: 4.95, perCap: 5362, isIndia: false },
  { rank: 18, country: 'Netherlands', gdpT: 1.45, growth: 1.23, perCap: 79918, isIndia: false },
  { rank: 19, country: 'Saudi Arabia', gdpT: 1.39, growth: 3.12, perCap: 37811, isIndia: false },
  { rank: 20, country: 'Switzerland', gdpT: 1.15, growth: 1.34, perCap: 126177, isIndia: false },
  { rank: 21, country: 'Poland', gdpT: 1.13, growth: 3.32, perCap: 31336, isIndia: false },
  { rank: 22, country: 'Taiwan', gdpT: 0.98, growth: 5.18, perCap: 42103, isIndia: false },
  { rank: 23, country: 'Ireland', gdpT: 0.78, growth: 2.52, perCap: 140186, isIndia: false },
  { rank: 24, country: 'Belgium', gdpT: 0.78, growth: 0.66, perCap: 65112, isIndia: false },
  { rank: 25, country: 'Sweden', gdpT: 0.76, growth: 1.96, perCap: 70676, isIndia: false },
  { rank: 26, country: 'Israel', gdpT: 0.72, growth: 3.53, perCap: 69804, isIndia: false },
  { rank: 27, country: 'Argentina', gdpT: 0.69, growth: 3.50, perCap: 14357, isIndia: false },
  { rank: 28, country: 'Singapore', gdpT: 0.66, growth: 3.51, perCap: 107758, isIndia: false },
  { rank: 29, country: 'Austria', gdpT: 0.62, growth: 0.68, perCap: 67761, isIndia: false },
  { rank: 30, country: 'UAE', gdpT: 0.62, growth: 3.14, perCap: 54214, isIndia: false },
];

const PPP_DATA = [
  { rank: 1, country: 'China', gdpT: 43.50 },
  { rank: 2, country: 'United States', gdpT: 32.38 },
  { rank: 3, country: 'India', gdpT: 18.90 },
  { rank: 4, country: 'Russia', gdpT: 7.53 },
  { rank: 5, country: 'Japan', gdpT: 7.26 },
  { rank: 6, country: 'Germany', gdpT: 6.41 },
  { rank: 7, country: 'Brazil', gdpT: 5.23 },
  { rank: 8, country: 'Indonesia', gdpT: 5.10 },
  { rank: 9, country: 'France', gdpT: 4.73 },
  { rank: 10, country: 'United Kingdom', gdpT: 4.72 },
];

const INDIA_GROWTH = [
  { year: '2017', growth: 6.8, gdpT: 2.65 },
  { year: '2018', growth: 6.5, gdpT: 2.70 },
  { year: '2019', growth: 3.9, gdpT: 2.87 },
  { year: '2020', growth: -5.8, gdpT: 2.67 },
  { year: '2021', growth: 9.7, gdpT: 3.18 },
  { year: '2022', growth: 7.0, gdpT: 3.39 },
  { year: '2023', growth: 8.2, gdpT: 3.73 },
  { year: '2024', growth: 7.3, gdpT: 3.94 },
  { year: '2025', growth: 6.5, gdpT: 3.94 },
  { year: '2026 (est.)', growth: 6.48, gdpT: 4.15 },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'World GDP Ranking 2026: Top 30 Countries, India at 6th, and When India Overtakes Germany',
  description: 'Complete world GDP ranking 2026 by nominal GDP and PPP, with analysis of India\'s $4.15 trillion economy, growth projections, India GDP in rupees, sector breakdown, and investment implications.',
  datePublished: '2026-06-29T00:43:07+05:30',
  dateModified: '2026-07-06T15:34:50+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/world-gdp-ranking-2026' },
  articleSection: 'Economics',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'World GDP Ranking 2026', description: 'Rankings of world economies by Gross Domestic Product in 2026' },
    { '@type': 'Thing', name: 'India GDP 2026', description: 'India\'s Gross Domestic Product in 2026 in nominal and PPP terms' },
  ],
  keywords: 'world gdp ranking 2026, india gdp 2026, top 10 gdp countries, india economy ranking, india overtake germany',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'World GDP Ranking 2026', item: 'https://fermor.in/blogs/world-gdp-ranking-2026' },
  ],
};

const faqItems = [
  { q: 'What does GDP stand for?', a: 'GDP stands for Gross Domestic Product: the total monetary value of all finished goods and services produced within a country\'s borders in one year. It is the standard measure economists and governments use to compare the size of national economies.' },
  { q: 'What is GDP in simple terms?', a: 'GDP is a country\'s total economic output in a year, added up across every business, farm, and government service inside its borders. A higher GDP generally means a larger economy, though it says nothing about how that output is distributed among the population.' },
  { q: 'Which country has the highest GDP in the world?', a: 'The United States has the highest nominal GDP in the world in 2026 at $32.38 trillion, followed by China at $20.85 trillion. By PPP GDP, China is actually the largest at $43.5 trillion, ahead of the US at $32.38 trillion.' },
  { q: 'Which is the richest country in the world?', a: '"Richest" depends on the measure. By total nominal GDP, the United States leads at $32.38 trillion. By GDP per capita, small high-income economies lead instead: Ireland ($140,186), Switzerland ($126,177), and Singapore ($107,758) all rank far above the US per person.' },
  { q: 'What is the world GDP ranking in 2026?', a: 'In 2026, the world GDP ranking by nominal GDP is: 1. United States ($32.38 trillion), 2. China ($20.85 trillion), 3. Germany ($5.45 trillion), 4. Japan ($4.38 trillion), 5. United Kingdom ($4.26 trillion), 6. India ($4.15 trillion), 7. France ($3.60 trillion). India is the fastest-growing major economy at 6.48% growth, making it likely to overtake Japan and the UK by 2027.' },
  { q: 'What is the GDP of India?', a: 'India\'s GDP in 2026 is $4.15 trillion in nominal terms, ranking 6th in the world. In rupees, this is approximately Rs 396.2 lakh crore. By PPP, India\'s GDP is $18.9 trillion, ranking 3rd globally.' },
  { q: 'What is India\'s GDP in trillion dollars?', a: 'India\'s nominal GDP is $4.15 trillion in 2026. By Purchasing Power Parity (PPP), which adjusts for price differences across countries, India\'s GDP is $18.9 trillion, the 3rd largest in the world.' },
  { q: 'What is India\'s GDP rank in 2026?', a: 'India is the 6th largest economy in the world in 2026 by nominal GDP ($4.15 trillion). By PPP (Purchasing Power Parity), India ranks 3rd in the world at $18.9 trillion, behind only China ($43.5 trillion) and the United States ($32.38 trillion).' },
  { q: 'What is India\'s GDP in rupees in 2026?', a: 'India\'s GDP in 2026 is approximately Rs 396.2 lakh crore (at an exchange rate of about Rs 95.40 per US dollar (live rate, verified via Exchangerates API)). This translates to roughly $4.15 trillion in US dollar terms. India\'s GDP per capita is $2,813, or approximately Rs 2.68 lakh per person per year.' },
  { q: 'What is the 3rd largest economy in the world?', a: 'By nominal GDP, Germany is the 3rd largest economy at $5.45 trillion. By PPP GDP, India is already the 3rd largest at $18.9 trillion, behind only China and the United States.' },
  { q: 'What is the 4th largest economy in the world?', a: 'Japan is the 4th largest economy in the world by nominal GDP in 2026, at $4.38 trillion. India (6th at $4.15 trillion, growing at 6.48%) is projected to overtake Japan by 2027.' },
  { q: 'What is the 5th largest economy in the world?', a: 'The United Kingdom is the 5th largest economy in the world by nominal GDP in 2026, at $4.26 trillion. India, currently 6th at $4.15 trillion, is projected to overtake the UK by 2027 given its much higher growth rate.' },
  { q: 'When will India become the 3rd largest economy in the world?', a: 'India is projected to overtake Japan and the United Kingdom by 2027 (based on 2026 growth rates: India at 6.48% vs Japan at 0.72% and UK at 0.80%). India is expected to overtake Germany (currently 3rd at $5.45 trillion) by approximately 2031, assuming growth rates remain similar. This would make India the 3rd largest economy by nominal GDP.' },
  { q: 'What is the difference between nominal GDP and PPP GDP?', a: 'Nominal GDP measures economic output at current market exchange rates in US dollars. PPP (Purchasing Power Parity) GDP adjusts for price differences across countries, so that a haircut in India counts as much as a haircut in the US even though the price is far lower. India ranks 6th in nominal GDP but 3rd in PPP GDP because Indian goods and services are significantly cheaper than in developed economies.' },
  { q: 'What is the fastest growing economy in the world in 2026?', a: 'Among the top 30 economies, India is the fastest growing in 2026 at 6.48% GDP growth rate. Taiwan follows at 5.18%, Indonesia at 4.95%, China at 4.41%, and Turkey at 3.37%. India is the only major economy (top 10 by nominal GDP) growing above 5%.' },
  { q: 'What is the US GDP in 2026?', a: 'The US GDP in 2026 is $32.38 trillion, making it the largest economy in the world by nominal GDP. The US GDP per capita is $94,430. The US is growing at 2.32% in 2026.' },
  { q: 'What is China\'s GDP rank in 2026?', a: 'China is the 2nd largest economy in the world by nominal GDP in 2026 at $20.85 trillion, growing at 4.41%. By PPP, China is the largest economy at $43.5 trillion, more than the United States at $32.38 trillion.' },
  { q: 'What is India\'s GDP per capita in 2026?', a: 'India\'s GDP per capita in 2026 is $2,813 (approximately Rs 2.68 lakh per person per year). This places India among the lower-middle-income countries despite being the 6th largest economy overall, because India\'s 1.48 billion population distributes the total economic output across a very large base.' },
  { q: 'How has India\'s economy grown over the last 10 years?', a: 'India\'s economy has grown from approximately $2.65 trillion in 2017 to $4.15 trillion in 2026, a 57% increase in dollar terms. Growth rate by year: 2017 (6.8%), 2018 (6.5%), 2019 (3.9%), 2020 (-5.8% due to COVID), 2021 (9.7% recovery), 2022 (7.0%), 2023 (8.2%), 2024 (7.3%), 2025 (6.5%), 2026 (6.48% estimate).' },
  { q: 'What sector contributes most to India\'s GDP?', a: 'Services is the largest contributor to India\'s GDP at approximately 54% ($2.24 trillion), followed by Industry at 27% ($1.12 trillion), and Agriculture at 18% ($0.75 trillion). Within services, IT and software exports, financial services, retail, and real estate are the largest sub-sectors.' },
  { q: 'What is India\'s GDP growth rate for FY 2026-27?', a: 'The RBI projects India\'s GDP growth at 6.60% for FY 2026-27 (financial year April 2026 to March 2027). The IMF estimates 6.48% for calendar year 2026. India is the fastest-growing major economy in the world for this period.' },
  { q: 'What is the total world GDP in 2026?', a: 'The total world GDP in 2026 is approximately $110-115 trillion in nominal terms. The United States accounts for about 25-26% of total world GDP, China accounts for about 18%, and India accounts for about 3.6%. The top 10 economies together account for roughly 65% of global GDP.' },
  { q: 'Which Indian states have the largest GDP?', a: 'The largest state economies in India by GSDP (Gross State Domestic Product) for FY 2024-25 are: Maharashtra (approximately $490 billion), Tamil Nadu ($330 billion), Karnataka ($320 billion), Uttar Pradesh ($295 billion), and Gujarat ($285 billion). Maharashtra alone accounts for about 14% of India\'s total GDP.' },
  { q: 'How does India\'s GDP growth affect Indian stock markets?', a: 'India\'s strong GDP growth of 6.5%+ has historically translated to 12-15% corporate earnings growth and Nifty 50 returns averaging 13-15% per year over 20 years. When GDP growth is strong, RBI tends to keep rates higher for longer, which affects home loan EMIs and bond yields. A growing economy also increases demand for credit, insurance, and financial products.' },
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How India\'s Real GDP Growth Rate Is Calculated',
  description: 'The methodology used by India\'s Central Statistics Office to calculate and publish quarterly and annual real GDP growth rates',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Collect national accounts data', text: 'The National Statistical Office (NSO) collects data on output from all sectors: agriculture (crop production, livestock, forestry), industry (mining, manufacturing, electricity, construction), and services (trade, transport, finance, real estate, government).' },
    { '@type': 'HowToStep', position: 2, name: 'Calculate Gross Value Added (GVA) at each sector', text: 'GVA for each sector is the total output value minus intermediate consumption (inputs used in production). Summing GVA across all sectors gives total GVA for the economy.' },
    { '@type': 'HowToStep', position: 3, name: 'Add indirect taxes and subtract subsidies', text: 'GDP = GVA + taxes on products - subsidies on products. The taxes-minus-subsidies adjustment converts GVA at basic prices to GDP at market prices.' },
    { '@type': 'HowToStep', position: 4, name: 'Adjust for inflation using GDP deflator', text: 'To remove price changes and get real GDP growth, the current-price GDP is divided by the GDP deflator (a price index), giving GDP at constant prices (base year: 2011-12).' },
    { '@type': 'HowToStep', position: 5, name: 'Compare with prior year', text: 'Real GDP growth rate = (Real GDP this year - Real GDP last year) / Real GDP last year x 100. NSO releases advance estimates in January and final estimates in the following year.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/world-gdp-ranking-2026',
  name: 'World GDP Ranking 2026: Top 30 Countries, India at 6th, and Investment Implications',
  url: 'https://fermor.in/blogs/world-gdp-ranking-2026',
  inLanguage: 'en-IN',
  datePublished: '2026-06-29T00:43:07+05:30',
  dateModified: '2026-07-06T15:34:50+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    { '@type': 'DefinedTerm', name: 'Nominal GDP', description: 'Gross Domestic Product measured at current market prices in US dollars without adjusting for purchasing power differences.', inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Economics Terms', url: 'https://fermor.in/blogs' } },
    { '@type': 'DefinedTerm', name: 'Purchasing Power Parity (PPP)', description: 'A measure that adjusts GDP for price level differences across countries to enable more accurate living standard comparisons.', inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Economics Terms', url: 'https://fermor.in/blogs' } },
  ],
  audience: { '@type': 'Audience', audienceType: 'Indian investors, students, and professionals interested in macroeconomics', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '.article-lead', isAccessibleForFree: true },
    { '@type': 'WebPageElement', cssSelector: '#what-is-gdp', name: 'What Is GDP: Full Form and Meaning' },
    { '@type': 'WebPageElement', cssSelector: '#top30-table', name: 'Top 30 World GDP Rankings 2026' },
    { '@type': 'WebPageElement', cssSelector: '#full-ranking', name: 'Full GDP Ranking: 218 Countries and Territories' },
    { '@type': 'WebPageElement', cssSelector: '#india-context', name: 'India at 6th: What the Number Means' },
    { '@type': 'WebPageElement', cssSelector: '#india-inr', name: 'India GDP in Rupees' },
    { '@type': 'WebPageElement', cssSelector: '#ppp', name: 'PPP vs Nominal Rankings' },
    { '@type': 'WebPageElement', cssSelector: '#india-history', name: 'India GDP Growth History' },
    { '@type': 'WebPageElement', cssSelector: '#overtake', name: 'When India Overtakes Germany' },
    { '@type': 'WebPageElement', cssSelector: '#per-capita', name: 'India GDP Per Capita' },
    { '@type': 'WebPageElement', cssSelector: '#fastest-growing', name: 'Fastest Growing Economies' },
    { '@type': 'WebPageElement', cssSelector: '#sectors', name: 'India GDP by Sector' },
    { '@type': 'WebPageElement', cssSelector: '#states', name: "India's Largest State Economies" },
    { '@type': 'WebPageElement', cssSelector: '#investors', name: 'What GDP Growth Means for Indian Investors' },
    { '@type': 'WebPageElement', cssSelector: '#how-gdp', name: 'How GDP Is Calculated' },
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
  knowsAbout: ['India GDP', 'World Economy Rankings', 'Macroeconomics India', 'Personal Finance India', 'Indian Stock Markets', 'SIP Investment India'],
};

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  paleDg: '#f1f3f4',
  green:  '#166534',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' } as React.CSSProperties;
const pStyle = { fontSize: 15.5, color: C.ink, lineHeight: 1.8, marginBottom: 20, fontFamily: INTER } as React.CSSProperties;

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

function GDPRankingTable({ slugByRank }: { slugByRank: Record<number, string> }) {
  return (
    <TableWrap label="World GDP Ranking 2026: Top 30 Economies by Nominal GDP (IMF/World Bank Estimates)">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 540 }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 40px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Rank</span>
            <span style={{ flex: 2, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Country</span>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>GDP (USD trillion)</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Growth %</span>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>GDP Per Capita</span>
          </div>
          {GDP_DATA.map((row) => (
            <div key={row.rank} style={{ display: 'flex', gap: 10, padding: '11px 16px', borderBottom: row.rank < 30 ? `1px solid ${C.border}` : 'none', background: row.isIndia ? '#f1f3f4' : '#fff', alignItems: 'center' }}>
              <span style={{ flex: '0 0 40px', fontSize: 13, fontWeight: row.isIndia ? 700 : 400, color: row.isIndia ? C.dg : C.ink3, fontFamily: INTER }}>{row.rank}</span>
              <span style={{ flex: 2, fontSize: 13.5, fontWeight: row.isIndia ? 700 : 400, color: row.isIndia ? C.dg : C.ink }}>
                {slugByRank[row.rank] ? (
                  <Link href={`/gdp/${slugByRank[row.rank]}`} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600, textDecoration: 'none' }}>{row.country}</Link>
                ) : row.country}
                {row.isIndia ? ' *' : ''}
              </span>
              <span style={{ flex: '0 0 120px', fontSize: 13.5, fontWeight: row.isIndia ? 700 : 500, color: row.isIndia ? C.dg : C.ink, textAlign: 'right' as const, fontFamily: POPPINS }}>${row.gdpT.toFixed(2)}T</span>
              <span style={{ flex: '0 0 90px', fontSize: 13, color: row.growth > 5 ? C.green : row.growth > 0 ? C.ink2 : '#9B1C1C', fontWeight: row.growth > 5 ? 700 : 400, textAlign: 'right' as const, fontFamily: INTER }}>{row.growth > 0 ? '+' : ''}{row.growth}%</span>
              <span style={{ flex: '0 0 110px', fontSize: 13, color: C.ink2, textAlign: 'right' as const, fontFamily: INTER }}>${row.perCap.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ padding: '8px 16px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 11.5, color: C.ink3, fontFamily: INTER }}>* India is highlighted. Growth rates are IMF 2026 estimates. Source: IMF World Economic Outlook, World Bank.</span>
          </div>
        </div>
      </div>
    </TableWrap>
  );
}

function PPPTable() {
  return (
    <TableWrap label="Top 10 Economies by PPP GDP 2026 (International Dollars)">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 380 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 50px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Rank</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Country</span>
            <span style={{ flex: '0 0 160px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>GDP PPP (trillion)</span>
          </div>
          {PPP_DATA.map((row) => {
            const isIndia = row.country === 'India';
            return (
              <div key={row.rank} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: row.rank < 10 ? `1px solid ${C.border}` : 'none', background: isIndia ? '#f1f3f4' : '#fff', alignItems: 'center' }}>
                <span style={{ flex: '0 0 50px', fontSize: 13, fontWeight: isIndia ? 700 : 400, color: isIndia ? C.dg : C.ink3 }}>{row.rank}</span>
                <span style={{ flex: 1, fontSize: 13.5, fontWeight: isIndia ? 700 : 400, color: isIndia ? C.dg : C.ink }}>{row.country}</span>
                <span style={{ flex: '0 0 160px', fontSize: 13.5, fontWeight: isIndia ? 700 : 500, color: isIndia ? C.dg : C.ink, textAlign: 'right' as const, fontFamily: POPPINS }}>${row.gdpT.toFixed(2)}T</span>
              </div>
            );
          })}
        </div>
      </div>
    </TableWrap>
  );
}

function GrowthHistoryTable() {
  return (
    <TableWrap label="India GDP Growth Rate: Last 10 Years">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 380 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Year</span>
            <span style={{ flex: '0 0 140px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>GDP (USD trillion)</span>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Growth %</span>
          </div>
          {INDIA_GROWTH.map((row, i) => (
            <div key={row.year} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: i < INDIA_GROWTH.length - 1 ? `1px solid ${C.border}` : 'none', background: i === INDIA_GROWTH.length - 1 ? '#f1f3f4' : '#fff', alignItems: 'center' }}>
              <span style={{ flex: 1, fontSize: 13.5, color: C.ink, fontWeight: i === INDIA_GROWTH.length - 1 ? 700 : 400, fontFamily: INTER }}>{row.year}</span>
              <span style={{ flex: '0 0 140px', fontSize: 13.5, color: C.ink2, fontFamily: POPPINS, textAlign: 'right' as const }}>${row.gdpT.toFixed(2)}T</span>
              <span style={{ flex: '0 0 110px', fontSize: 13.5, fontWeight: 600, color: row.growth < 0 ? '#9B1C1C' : row.growth > 8 ? C.green : C.ink, textAlign: 'right' as const, fontFamily: INTER }}>{row.growth > 0 ? '+' : ''}{row.growth}%</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function OvertakeTable() {
  const rows = [
    { target: 'United Kingdom (5th)', gdpNow: '$4.26T', growthRate: '0.80%', indiaOvertakes: '2027', confidence: 'Very high' },
    { target: 'Japan (4th)', gdpNow: '$4.38T', growthRate: '0.72%', indiaOvertakes: '2027', confidence: 'Very high' },
    { target: 'Germany (3rd)', gdpNow: '$5.45T', growthRate: '0.79%', indiaOvertakes: '2031', confidence: 'High' },
    { target: 'China (2nd)', gdpNow: '$20.85T', growthRate: '4.41%', indiaOvertakes: '2060+', confidence: 'Low certainty' },
    { target: 'United States (1st)', gdpNow: '$32.38T', growthRate: '2.32%', indiaOvertakes: '2075+', confidence: 'Very low certainty' },
  ];
  return (
    <TableWrap label="When Will India Overtake Major Economies? (Nominal GDP Projection at Current Growth Rates)">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 500 }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            {['Economy', "Current GDP", 'Growth Rate', 'India Overtakes', 'Confidence'].map(h => (
              <span key={h} style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>{h}</span>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={r.target} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: i < 2 ? '#f1f3f4' : '#fff', alignItems: 'center' }}>
              <span style={{ flex: 1, fontSize: 13, color: C.ink, fontWeight: i < 2 ? 600 : 400, fontFamily: INTER }}>{r.target}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.gdpNow}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.growthRate}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: i < 2 ? 700 : 500, color: i < 2 ? C.green : i === 2 ? C.dg : C.ink3, fontFamily: INTER }}>{r.indiaOvertakes}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>{r.confidence}</span>
            </div>
          ))}
          <div style={{ padding: '8px 16px', background: C.bg, borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 11.5, color: C.ink3, fontFamily: INTER }}>Projections assume 2026 growth rates continue. Nominal GDP comparisons are sensitive to USD/INR exchange rates and global economic conditions.</span>
          </div>
        </div>
      </div>
    </TableWrap>
  );
}

function FastestGrowingTable() {
  const rows = [
    { rank: 1, country: 'India', rate: 6.48, context: '6th largest economy; fastest among top 10' },
    { rank: 2, country: 'Taiwan', rate: 5.18, context: 'Semiconductor and electronics-driven' },
    { rank: 3, country: 'Indonesia', rate: 4.95, context: 'Largest Southeast Asian economy' },
    { rank: 4, country: 'China', rate: 4.41, context: '2nd largest economy' },
    { rank: 5, country: 'Israel', rate: 3.53, context: 'Tech sector recovery post-conflict' },
    { rank: 6, country: 'Singapore', rate: 3.51, context: 'Financial and logistics hub' },
    { rank: 7, country: 'Argentina', rate: 3.50, context: 'Recovery from 2024 austerity program' },
    { rank: 8, country: 'Poland', rate: 3.32, context: 'EU funds and defense spending-driven' },
    { rank: 9, country: 'UAE', rate: 3.14, context: 'Non-oil diversification and tourism' },
    { rank: 10, country: 'Saudi Arabia', rate: 3.12, context: 'Vision 2030 investment push' },
  ];
  return (
    <TableWrap label="Fastest Growing Major Economies 2026 (Among Top 30 by GDP)">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 440 }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 40px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Rank</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Country</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const, textAlign: 'right' as const }}>Growth</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Context</span>
          </div>
          {rows.map((row) => (
            <div key={row.rank} style={{ display: 'flex', gap: 10, padding: '11px 16px', borderBottom: row.rank < 10 ? `1px solid ${C.border}` : 'none', background: row.country === 'India' ? '#f1f3f4' : '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 40px', fontSize: 13, color: row.country === 'India' ? C.dg : C.ink3, fontWeight: row.country === 'India' ? 700 : 400, fontFamily: INTER, paddingTop: 1 }}>{row.rank}</span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: row.country === 'India' ? 700 : 400, color: row.country === 'India' ? C.dg : C.ink }}>{row.country}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13.5, fontWeight: 700, color: row.country === 'India' ? C.green : C.ink2, textAlign: 'right' as const, fontFamily: POPPINS }}>+{row.rate}%</span>
              <span style={{ flex: 1, fontSize: 12.5, color: C.ink3, lineHeight: 1.45 }}>{row.context}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '24px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function Breadcrumb() {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0, padding: 0, listStyle: 'none' }}>
          <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>Home</Link></li>
          <li style={{ color: C.border }}>›</li>
          <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>Blogs</Link></li>
          <li style={{ color: C.border }}>›</li>
          <li aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER, fontWeight: 500 }}>World GDP Ranking 2026</li>
        </ol>
      </div>
    </div>
  );
}

function KeyFacts() {
  const facts = [
    { label: "India's GDP (2026)", value: '$4.15 Trillion' },
    { label: 'Global Rank (Nominal)', value: '6th' },
    { label: 'Global Rank (PPP)', value: '3rd' },
    { label: 'Growth Rate 2026', value: '6.48%' },
    { label: 'GDP per Capita', value: '$2,813' },
    { label: 'India GDP in INR', value: 'Rs 396.2 lakh crore' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>India GDP Snapshot 2026</span>
      </div>
      {facts.map((f, i) => (
        <div key={f.label} style={{ padding: '11px 16px', borderBottom: i < facts.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{f.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.dg, fontFamily: POPPINS, flexShrink: 0 }}>{f.value}</span>
        </div>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'SIP Calculator', desc: 'Project your monthly SIP growth at 12-15% CAGR', href: '/calculators/sip-calculator' },
    { label: 'Income Tax Calculator', desc: 'Compare old and new regime for FY 2025-26', href: '/calculators/income-tax-calculator' },
    { label: 'Home Loan EMI Calculator', desc: 'See how GDP-linked rate changes affect your EMI', href: '/calculators/mortgage-calculator' },
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

function RelatedReads() {
  const links = [
    { label: 'ITR Filing Last Date FY 2025-26: All Deadlines', href: '/blogs/itr-filing-last-date' },
    { label: 'Income Tax Slabs FY 2025-26: New and Old Regime', href: '/blogs/income-tax-slabs-fy-2025-26' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dg, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> GDP figures are 2026 estimates from IMF World Economic Outlook and World Bank. Projections for when India overtakes Germany assume constant 2026 growth rates and are sensitive to currency fluctuations, global economic cycles, and policy changes. This article is for informational purposes only. Consult a financial advisor before making investment decisions based on macroeconomic data.
      </p>
    </div>
  );
}

export default function WorldGDPRankingPage() {
  const builtSlugs = getBuiltGDPSlugs();
  const builtSet = new Set(builtSlugs);
  // Keyed by rank, not country name string, since the local top-30 GDP_DATA array above uses a
  // few different labels than GDP_DATA_FULL (e.g. "UAE" vs "United Arab Emirates"). Rank is the
  // one field guaranteed consistent across both.
  const slugByRank: Record<number, string> = {};
  for (const r of GDP_DATA_FULL) {
    const slug = slugifyCountry(r.country);
    if (builtSet.has(slug)) slugByRank[r.rank] = slug;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: '#f1f3f4', padding: '3px 10px', borderRadius: 4 }}>Macroeconomics</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 860 }}>
            World GDP Ranking 2026: India at 6th with $4.15 Trillion, 3rd by PPP, and Projected to Overtake Germany by 2031
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 720, marginBottom: 22 }}>
            Full world GDP ranking by nominal GDP and PPP for 2026. The United States leads at $32.38 trillion. India ranks 6th at $4.15 trillion with the highest growth rate among the top 10 economies at 6.48%. India is projected to overtake Japan and the UK by 2027 and Germany by 2031.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>
              Updated <time dateTime="2026-07-06T15:34:50+05:30">Jul 6, 2026</time>
            </span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>15 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties}
          className="article-grid"
        >
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              In 2026, <strong style={{ fontWeight: 700, color: C.dark }}>India is the 6th largest economy in the world by nominal GDP at $4.15 trillion</strong>, growing at 6.48%, the fastest among the top 10 economies. By Purchasing Power Parity (PPP), India ranks 3rd at $18.9 trillion, behind only China and the United States. At current growth rates, India is on track to overtake Japan (4th, $4.38T) and the United Kingdom (5th, $4.26T) by 2027, and Germany (currently 3rd at $5.45T) by approximately 2031. In rupee terms, India&apos;s $4.15 trillion translates to approximately Rs 396.2 lakh crore.
            </p>

            <h2 id="what-is-gdp" style={hStyle}>What Is GDP? Full Form and Meaning</h2>
            <p style={pStyle}>
              GDP stands for Gross Domestic Product: the total monetary value of all finished goods and services produced within a country&apos;s borders in a given year. It is the single most-used number for comparing the size of national economies.
            </p>
            <p style={pStyle}>
              &quot;Nominal GDP&quot; converts that output to a common currency (usually US dollars) at current market exchange rates, with no adjustment for inflation or cost-of-living differences. It is the number used for the country-by-country rankings on this page.
            </p>
            <p style={pStyle}>
              A country&apos;s &quot;GDP growth rate&quot; refers to real GDP growth: the change in output after removing the effect of price inflation. It reflects an actual increase in goods and services produced, not just higher prices.
            </p>

            <h2 id="top30-table" style={hStyle}>World GDP Ranking 2026: Top 30 Countries</h2>
            <p style={pStyle}>
              The table below ranks all 30 largest economies in the world by 2026 nominal GDP in US dollars. Growth rates are 2026 IMF estimates. Per capita GDP is calculated by dividing total GDP by population.
            </p>
            <GDPRankingTable slugByRank={slugByRank} />

            <h2 id="full-ranking" style={hStyle}>Full GDP Ranking 2026: All 218 Countries and Territories</h2>
            <p style={pStyle}>
              The United States is the richest country in the world by total nominal GDP at $32.38 trillion, followed by China and Germany. Search or sort the full IMF/World Bank dataset below by GDP, growth rate, or GDP per capita, and filter by region.
            </p>
            <WorldGDPTableClient builtSlugs={builtSlugs} />
            <p style={pStyle}>
              &quot;Richest country&quot; is commonly used two different ways: by total GDP (the US leads) or by GDP per capita.
            </p>
            <p style={pStyle}>
              Small, wealthy economies like Luxembourg, Ireland, and Switzerland lead the per capita measure instead, since their total output is divided across a much smaller population.
            </p>
            <p style={pStyle}>
              Both are correct; they just answer different questions.
            </p>

            <h2 id="india-context" style={hStyle}>India at 6th: What $4.15 Trillion Actually Means</h2>
            <p style={pStyle}>
              India reached $4 trillion in GDP for the first time in 2024, joining an exclusive group: only China, the United States, Germany, Japan, and the United Kingdom had crossed this threshold before India. Reaching $4 trillion took India 13 years from $2 trillion (2011).
            </p>
            <p style={pStyle}>
              The next milestone, $5 trillion, is projected within 4 to 5 years at current growth rates.
            </p>
            <p style={pStyle}>
              What makes India&apos;s ranking exceptional is the growth rate differential. Germany at $5.45 trillion is growing at 0.79% per year, adding about $43 billion annually. India at $4.15 trillion is growing at 6.48%, adding approximately $269 billion annually.
            </p>
            <p style={pStyle}>
              India closes the $1.3 trillion gap with Germany at roughly $226 billion per year, which is why Germany is projected to fall behind India within 5 years.
            </p>
            <Callout>
              India is the only economy in the top 10 growing above 4%. The US grows at 2.32%. China at 4.41%. Every other top-10 economy grows below 2%. India&apos;s position in global GDP rankings will change significantly over the next decade purely from this growth differential.
            </Callout>

            <h2 id="india-inr" style={hStyle}>India&apos;s GDP in Rupees: Rs 347 Lakh Crore</h2>
            <p style={pStyle}>
              Converting India&apos;s $4.15 trillion GDP to rupees at approximately Rs 95.40 per US dollar (live rate, verified via Exchangerates API) gives approximately <strong style={{ fontWeight: 700, color: C.dark }}>Rs 396.2 lakh crore</strong> (Rs 396.2 trillion). To put this in perspective:
            </p>
            <BulletList items={[
              <>Rs 396.2 lakh crore is India&apos;s total annual economic output. The Union Budget for FY 2026-27 is approximately Rs 50 lakh crore, which is about 12.6% of GDP.</>,
              <>India&apos;s GDP per capita in rupees is approximately Rs 2.68 lakh per person per year (Rs 22,365 per month). This is the statistical average; actual incomes vary enormously across urban and rural India.</>,
              <>Nominal GDP in dollar terms is sensitive to the USD/INR exchange rate. A 5% rupee depreciation (from Rs 95.40 to Rs 100.2) would reduce India&apos;s nominal GDP from $4.15T to approximately $3.95T in dollar terms, even with no change in real output.</>,
              <>This is why economists use PPP GDP for comparing living standards: PPP strips out exchange rate effects and shows India at $18.9 trillion (3rd in the world), much better reflecting the actual size of the Indian economy in terms of what it produces and consumes.</>,
            ]} />

            <h2 id="ppp" style={hStyle}>PPP Rankings 2026: India at 3rd, China Leads with $43.5 Trillion</h2>
            <p style={pStyle}>
              Purchasing Power Parity (PPP) adjusts for price differences across countries. A Rs 100 meal in Delhi provides the same utility as a $15 meal in New York.
            </p>
            <p style={pStyle}>
              PPP GDP counts both equivalently, which is why India&apos;s PPP GDP ($18.9 trillion) is 4.5x its nominal GDP ($4.15 trillion): Indian goods and services are significantly cheaper relative to international prices.
            </p>
            <PPPTable />
            <p style={pStyle}>
              On PPP, China is already the world&apos;s largest economy at $43.5 trillion, more than the US at $32.38 trillion. India at $18.9 trillion PPP is already larger than Japan ($7.26T), Germany ($6.41T), Brazil ($5.23T), and Indonesia ($5.10T) combined.
            </p>
            <p style={pStyle}>
              This is the metric that better captures India&apos;s actual economic weight and domestic market size.
            </p>
            <p style={pStyle}>
              For international comparisons of living standards, PPP per capita is used. India&apos;s PPP per capita is approximately $12,800 (vs $2,813 nominal), which places it in the lower-middle-income band globally but is more reflective of actual purchasing power within India.
            </p>

            <h2 id="india-history" style={hStyle}>India&apos;s GDP Growth: 10 Years of Data</h2>
            <p style={pStyle}>
              India&apos;s economy has grown from $2.65 trillion in 2017 to $4.15 trillion in 2026, a 57% increase in dollar terms over 9 years. Adjusting for rupee depreciation, real GDP in rupee terms grew considerably faster.
            </p>
            <GrowthHistoryTable />
            <p style={pStyle}>
              The -5.8% contraction in 2020 (COVID-19) was the only negative growth year in three decades. The 9.7% recovery in 2021 was the fastest growth in 13 years.
            </p>
            <p style={pStyle}>
              India&apos;s growth has consistently outpaced global average growth (around 3%) and all major developed economies. The RBI projects 6.60% growth for FY 2026-27.
            </p>

            <h2 id="overtake" style={hStyle}>When Will India Overtake Germany, Japan, and the UK?</h2>
            <p style={pStyle}>
              The overtake timeline is a simple compounding calculation: if India grows at 6.48% and Germany at 0.79%, India closes roughly $226 billion of the $1.3 trillion gap each year.
            </p>
            <p style={pStyle}>
              Japan and the UK are already within $250 billion of India&apos;s current GDP at similar low growth rates, making 2027 a realistic overtake year for both.
            </p>
            <OvertakeTable />
            <p style={pStyle}>
              These projections carry significant caveats. Nominal GDP rankings are sensitive to exchange rates: a sharp rupee depreciation (like the 10-15% moves seen in 2012 and 2022) can delay India&apos;s overtake even if real growth is strong.
            </p>
            <p style={pStyle}>
              Conversely, rupee appreciation accelerates the nominal ranking shift.
            </p>
            <p style={pStyle}>
              The more reliable measure of India&apos;s ascent is PPP GDP, where India already surpassed Germany and Japan years ago.
            </p>

            <h2 id="per-capita" style={hStyle}>India&apos;s GDP Per Capita: $2,813 and the Path to Middle-Income Status</h2>
            <p style={pStyle}>
              India&apos;s GDP per capita of $2,813 in 2026 is among the lowest in the top 30 economies, ranked behind all except Indonesia ($5,362) and Brazil ($12,313) in relative terms.
            </p>
            <p style={pStyle}>
              This reflects India&apos;s 1.48 billion population: even a $4 trillion GDP divided by 1.48 billion people gives a per capita figure more typical of lower-middle-income countries.
            </p>
            <p style={pStyle}>
              The World Bank&apos;s upper-middle-income threshold is approximately $4,500 per capita in GNI terms. India reached the lower-middle-income threshold (approximately $1,100) around 2008.
            </p>
            <p style={pStyle}>
              At the current growth rate of 6.48% in nominal terms, India&apos;s GDP per capita should cross $4,000 by 2028-2029 and potentially reach $5,000 by 2031, crossing into upper-middle-income status, assuming exchange rate stability.
            </p>
            <Callout>
              Compare: Singapore&apos;s GDP per capita is $107,758 and Ireland&apos;s is $140,186. Both have populations under 7 million. India&apos;s low per capita despite a large total GDP is entirely a population denominator effect: with 22x Singapore&apos;s GDP but 270x the population, the per capita outcome is structurally low.
            </Callout>

            <h2 id="fastest-growing" style={hStyle}>Fastest-Growing Major Economies in 2026</h2>
            <p style={pStyle}>
              Among the 30 largest economies in the world, India leads growth in 2026. The table below ranks the top 10 by 2026 growth rate, showing India as the only large developed or developing economy above 6%.
            </p>
            <FastestGrowingTable />

            <h2 id="sectors" style={hStyle}>India&apos;s Economy by Sector: Where the $4.15 Trillion Comes From</h2>
            <p style={pStyle}>
              India&apos;s GDP is generated across three broad sectors, with services dominating and agriculture still employing the largest share of the workforce despite a declining contribution to GDP:
            </p>
            <BulletList items={[
              <>Services (54%, approximately $2.24 trillion): The largest and fastest-growing sector. Includes IT and software exports ($250+ billion, making India the world&apos;s largest IT services exporter), business process outsourcing, banking and financial services, retail, telecom, real estate, transport, and hospitality.</>,
              <>Industry (27%, approximately $1.12 trillion): Manufacturing, mining, electricity, and construction. India&apos;s manufacturing share of GDP remains lower than China (28%) or Germany (20%) despite being a large industrial economy. PLI (Production Linked Incentive) schemes in electronics, semiconductors, and pharmaceuticals aim to raise this to 25% of GDP by 2030.</>,
              <>Agriculture (18%, approximately $0.75 trillion): India is the world&apos;s largest producer of milk, spices, jute, and pulses, and the second-largest producer of rice and wheat. Despite 18% of GDP, agriculture employs approximately 42% of the workforce, reflecting lower productivity per worker than services or industry. The sector&apos;s share of GDP has declined from 30% in 2000 as other sectors have grown faster.</>,
            ]} />

            <h2 id="states" style={hStyle}>India&apos;s Largest State Economies</h2>
            <p style={pStyle}>
              India&apos;s states themselves are significant economies. Maharashtra, the largest, would rank among the top 50 economies in the world if it were independent:
            </p>
            <BulletList items={[
              <>Maharashtra: approximately Rs 40 lakh crore GSDP ($480 billion). Home to Mumbai, India&apos;s financial capital. Financial services, entertainment (Bollywood), chemicals, and pharmaceuticals are key sectors. Accounts for roughly 14% of India&apos;s total GDP.</>,
              <>Tamil Nadu: approximately Rs 27 lakh crore ($325 billion). Automotive manufacturing (Ford, Hyundai, BMW supply chains), textiles, electronics, and IT services (Chennai is India&apos;s second-largest IT hub after Bengaluru).</>,
              <>Karnataka: approximately Rs 26 lakh crore ($315 billion). Bengaluru drives this: India&apos;s Silicon Valley, home to Infosys, Wipro, and 500+ multinational R&amp;D centres. IT and software exports exceed $40 billion from Karnataka alone.</>,
              <>Uttar Pradesh: approximately Rs 24 lakh crore ($290 billion). The most populous state (240 million people). Agriculture, textiles, chemicals, and the Purvanchal industrial corridor are key growth drivers.</>,
              <>Gujarat: approximately Rs 23 lakh crore ($280 billion). The most industrialized state: petrochemicals, pharmaceuticals, diamonds, and ports. Accounts for 25% of India&apos;s total exports and hosts the largest port network in India.</>,
            ]} />

            <h2 id="investors" style={hStyle}>What India&apos;s GDP Growth Means for Indian Investors</h2>
            <p style={pStyle}>
              This is where macro data becomes personally actionable.
            </p>
            <p style={pStyle}>
              India&apos;s 6-7% real GDP growth does not stay in government statistics: it flows through into corporate earnings, stock market returns, credit demand, interest rates, and ultimately your household wealth. Here is what each growth lever means for you:
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              <strong style={{ fontWeight: 700, color: C.dark }}>Equity markets follow nominal GDP growth with a multiplier.</strong> India&apos;s nominal GDP (real growth + inflation) grows at roughly 10-11% per year. Corporate earnings typically grow at 12-15% as operating leverage magnifies revenue growth.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              The Nifty 50 has delivered approximately 14% annualized returns over 20 years. This structural alignment between GDP growth and equity returns is why long-term SIPs in Indian index funds make sense for most Indian investors.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              A monthly SIP of Rs 10,000 at 12% CAGR (conservative: below the 20-year Nifty average) for 15 years grows to approximately Rs 50 lakh. At 15% CAGR (near the 20-year average), the same SIP grows to approximately Rs 80 lakh.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              Model your exact number with the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>SIP Calculator</Link>. For a lump sum instead of a monthly amount, such as a bonus or maturity payout, the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Lumpsum Calculator</Link> models the same growth math.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              <strong style={{ fontWeight: 700, color: C.dark }}>GDP growth and interest rates.</strong> When India&apos;s economy grows strongly and inflation stays above 4%, the RBI tends to keep the repo rate higher (currently around 6%). Higher rates mean higher home loan, personal loan, and car loan rates.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              If you are planning a home purchase, GDP growth being strong is a signal that rates will not fall quickly in the near term. Use the <Link href="/calculators/mortgage-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Home Loan EMI Calculator</Link> to stress-test your EMI at 7.5%, 8%, and 8.5% rates.
            </p>
            <p style={pStyle}>
              <strong style={{ fontWeight: 700, color: C.dark }}>Sector allocation follows GDP composition.</strong> If services (54% of India&apos;s GDP) outpace industry (27%), IT stocks and financial services stocks tend to outperform industrials and infrastructure.
            </p>
            <p style={pStyle}>
              When India enters a capital expenditure cycle (higher government infrastructure spending, more private capacity addition), industrials, cement, and capital goods companies benefit disproportionately.
            </p>
            <p style={pStyle}>
              GDP data tells you which sectors are in a structural upcycle.
            </p>

            {/* In-Content Promo Bar */}
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SIP Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See what a monthly SIP could grow to at India&apos;s long-run equity return rate.</p>
              </div>
              <Link className="fx-btn" href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            <h2 id="how-gdp" style={hStyle}>How Nominal GDP Is Calculated</h2>
            <p style={pStyle}>
              GDP (Gross Domestic Product) is the total monetary value of all goods and services produced within a country&apos;s borders in a given year. Three equivalent methods calculate the same number:
            </p>
            <BulletList items={[
              <><strong style={{ fontWeight: 700 }}>Expenditure method (most commonly cited):</strong> GDP = Private Consumption (C) + Gross Investment (I) + Government Spending (G) + Net Exports (Exports minus Imports). In India&apos;s case, private consumption accounts for about 56% of GDP, government spending about 10%, and investment (capital formation) about 34%.</>,
              <><strong style={{ fontWeight: 700 }}>Income method:</strong> Sum of all factor incomes in the economy: wages paid to workers + profits earned by companies + rent earned by landlords + interest income. This equals GDP because every rupee of output is someone else&apos;s income.</>,
              <><strong style={{ fontWeight: 700 }}>Production method (value-added):</strong> Sum of value added at each stage of production. A steel company buys iron ore (Rs 50) and sells steel (Rs 200): the value added is Rs 150, counted as GDP. This avoids double-counting raw material inputs already counted in earlier stages.</>,
            ]} />
            <p style={pStyle}>
              Nominal GDP uses current market prices. Real GDP removes inflation by dividing nominal GDP by a price index (GDP deflator), allowing meaningful year-over-year comparisons.
            </p>
            <p style={pStyle}>
              When economists report &quot;GDP growth,&quot; they mean real GDP growth. When they report &quot;GDP size&quot; in dollars, they mean nominal GDP converted at current exchange rates.
            </p>

            

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

          <aside
            className="gdp-sidebar"
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
            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
            <nav style={{ flexShrink: 0 }} aria-label="Related Calculators">
              <div style={{ flexShrink: 0 }}><FermorTools /></div>
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedReads /></div>
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
        .gdp-sidebar::-webkit-scrollbar { width: 5px; }
        .gdp-sidebar::-webkit-scrollbar-track { background: transparent; }
        .gdp-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .gdp-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) { .article-grid { grid-template-columns: 1fr !important; } }
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

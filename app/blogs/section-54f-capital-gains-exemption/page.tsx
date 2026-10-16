import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const NOW = '2026-10-12T16:12:00+05:30';

export const metadata: Metadata = {
  title: 'Section 54F: Capital Gains Exemption on House Purchase Explained',
  description: 'Section 54F exempts long-term capital gains on any asset except a house when you buy or build a home. Conditions, formula, Rs 10 crore cap, CGAS and examples.',
  alternates: { canonical: 'https://fermor.in/blogs/section-54f-capital-gains-exemption' },
  openGraph: {
    title: 'Section 54F: Capital Gains Exemption on House Purchase Explained | Fermor',
    description: 'How to save long-term capital gains tax by reinvesting in a residential house: conditions, time limits, the proportion formula and the Capital Gains Account Scheme.',
    type: 'article',
    publishedTime: NOW,
    modifiedTime: NOW,
    authors: ['Fermor Analysis'],
    tags: ['Section 54F', 'Capital Gains', 'Income Tax Exemption'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 54F Capital Gains Exemption | Fermor',
    description: 'Sold shares, land or gold and bought a house? Here is how Section 54F cuts your long-term capital gains tax.',
  },
  keywords: [
    'section 54f', 'section 54f of income tax act', '54f income tax act', 'income tax act section 54f',
    'sec 54f of income tax act', 'sec 54f', '54f section', 'income tax section 54f', 'under section 54f',
    'section 54f of it act', 'investment under section 54f', '54f investment in house property',
    'section 54 and 54f', 'section 54 54ec 54f', 'section 54 and 54f of income tax act',
    'capital gains account scheme', 'capital gain account scheme time limit', 'capital gain account scheme interest rate',
    'capital gains account scheme banks', 'cgas', 'long term capital gain on property',
    'long term capital gain tax on property', 'ltcg on property', 'ltcg tax on property',
    'long term capital gain exemption on property', 'exemption on long term capital gain on sale of property',
    'tax on sale of property india', 'invest capital gains in property', 'buy new house to save tax',
    'section 54ec', 'section 86 income tax act 2025',
  ],
};

const faqItems = [
  { q: 'What is Section 54F of the Income Tax Act?', a: 'Section 54F exempts the long-term capital gain on the sale of any asset other than a residential house when you reinvest the sale proceeds in a residential house in India. The exemption is proportionate to the amount reinvested.' },
  { q: 'Who can claim exemption under Section 54F?', a: 'Individuals and Hindu Undivided Families can claim it, and non-residents are eligible too. Companies, firms and other entities cannot.' },
  { q: 'Which assets qualify for Section 54F?', a: 'Any long-term capital asset except a residential house qualifies, including listed and unlisted shares, land, commercial property, gold and jewellery. A gain that is short-term, such as on debt mutual funds bought after 1 April 2023, does not qualify.' },
  { q: 'What is the time limit for Section 54F?', a: 'You must buy the new house within 1 year before or 2 years after the date of transfer, or construct it within 3 years after the transfer. The clock runs from the date you sold the original asset.' },
  { q: 'What is the formula for Section 54F exemption?', a: 'Exemption equals the long-term capital gain multiplied by the cost of the new house and divided by the net sale consideration. The cost of the new house counted in the formula is capped at Rs 10 crore.' },
  { q: 'What is the maximum exemption under Section 54F?', a: 'The cost of the new house counted for the exemption is capped at Rs 10 crore, which applies from FY 2023-24. That cap applies to the investment, so the exemption itself is the gain multiplied by Rs 10 crore over the net consideration.' },
  { q: 'Do I have to reinvest the whole sale amount?', a: 'You must reinvest the whole net sale consideration to get the whole gain exempt. If you reinvest only part, only the matching proportion of the gain is exempt and the rest is taxed.' },
  { q: 'Can I claim Section 54F if I own a house already?', a: 'Yes, if you own no more than one residential house other than the new one on the date of transfer. If you own two or more such houses on that date, the exemption is not available.' },
  { q: 'Can I claim Section 54F on the sale of a house?', a: 'No. Section 54F applies when you sell an asset other than a residential house, and a house sale falls under Section 54. This includes a rented house, because it is still a residential house property.' },
  { q: 'Can I claim Section 54F on the sale of shares?', a: 'Yes, as long as the gain is long-term. Listed shares must be held for more than 12 months, and unlisted shares for more than 24 months.' },
  { q: 'What is the Capital Gains Account Scheme?', a: 'The Capital Gains Accounts Scheme, 1988 lets you park unspent sale proceeds in a designated bank account until you buy or build the house. The deposit must be made on or before the due date for filing your return under Section 139(1).' },
  { q: 'What happens if I do not use the CGAS money in time?', a: 'The unused amount is taxed as long-term capital gain in the year in which the 3-year period from the date of transfer ends. Plan the purchase or construction so the deposit is used well before that date.' },
  { q: 'Which banks accept Capital Gains Account Scheme deposits?', a: 'Public sector banks such as SBI, Canara Bank and Bank of Baroda accept CGAS deposits, as do private and small finance banks that the government has notified. Regional rural banks are not covered, so confirm the branch handles the scheme before you go.' },
  { q: 'What interest does a CGAS account earn?', a: 'Interest follows the bank, with a savings-style rate on Account A and a term deposit rate on Account B. The interest is taxable as income from other sources.' },
  { q: 'Can I claim Section 54F for more than one house?', a: 'No. Section 54F covers one residential house in India, and there is no option to claim for two houses as there is under Section 54. Owning several floors of the same building can still count as one house, as the Delhi High Court held in the Lata Goel case.' },
  { q: 'Can I buy a house abroad and claim Section 54F?', a: 'No. The new residential house must be situated in India.' },
  { q: 'What if I sell the new house within 3 years?', a: 'The exemption is withdrawn. The gain you earlier claimed as exempt becomes long-term capital gain in the year you sell the new house.' },
  { q: 'Is Section 54F available under the new tax regime?', a: 'Yes. The exemption is a capital gains provision and not a Chapter VI-A deduction, so it works under both the old and the new regime.' },
  { q: 'What is the difference between Section 54, 54F and 54EC?', a: 'Section 54 exempts gains on selling a residential house, Section 54F exempts gains on selling any other asset, and Section 54EC exempts gains on land or buildings invested in specified bonds. Section 54EC has a Rs 50 lakh limit and a 5-year lock-in.' },
  { q: 'Which section replaces Section 54F in the Income-tax Act 2025?', a: 'Section 86 of the Income-tax Act, 2025 carries this exemption, and Section 82 carries Section 54. The 2025 Act applies from 1 April 2026, so sales up to 31 March 2026 are still reported under Section 54F.' },
  { q: 'Is there a 1031 exchange in India?', a: 'No. India has no equivalent of the US 1031 exchange. The closest Indian routes are Section 54 for selling a house and Section 54F for selling any other asset.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Section 54F of Income Tax Act: Capital Gains Exemption on Purchase of a Residential House',
  url: 'https://fermor.in/blogs/section-54f-capital-gains-exemption',
  datePublished: NOW,
  dateModified: NOW,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/section-54f-capital-gains-exemption' },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Section 54F', description: 'The capital gains exemption for individuals and HUFs who sell a long-term asset other than a residential house and reinvest in a residential house in India' },
    { '@type': 'Thing', name: 'Capital Gains Accounts Scheme', description: 'The 1988 scheme that lets taxpayers deposit unspent capital gains in a designated bank account to preserve the exemption' },
  ],
  keywords: 'section 54f, 54f income tax act, capital gains account scheme, ltcg on property, section 54 and 54f, section 54ec, section 86',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 54F Capital Gains Exemption', item: 'https://fermor.in/blogs/section-54f-capital-gains-exemption' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Claim the Section 54F Exemption',
  description: 'Steps to claim the Section 54F capital gains exemption when you sell an asset and buy or build a residential house.',
  totalTime: 'PT20M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm the asset is long-term and not a house', text: 'Check the holding period and that the asset sold is not a residential house.' },
    { '@type': 'HowToStep', position: 2, name: 'Calculate the long-term capital gain', text: 'Subtract the cost and the transfer expenses from the sale price.' },
    { '@type': 'HowToStep', position: 3, name: 'Work out the net sale consideration', text: 'Take the sale price and deduct expenses wholly and exclusively connected with the transfer.' },
    { '@type': 'HowToStep', position: 4, name: 'Buy or build within the time limit', text: 'Buy the house 1 year before or 2 years after the sale, or build it within 3 years.' },
    { '@type': 'HowToStep', position: 5, name: 'Deposit unspent money in CGAS', text: 'If the house is not ready by the return due date, deposit the balance in a Capital Gains Account on or before that date.' },
    { '@type': 'HowToStep', position: 6, name: 'Report the exemption in the ITR', text: 'Show the gain and the Section 54F exemption in the capital gains schedule of the return.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/section-54f-capital-gains-exemption',
  name: 'Section 54F: Capital Gains Exemption on House Purchase Explained | Fermor',
  url: 'https://fermor.in/blogs/section-54f-capital-gains-exemption',
  inLanguage: 'en-IN',
  datePublished: NOW,
  dateModified: NOW,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Capital gain',
    description: 'The profit from selling a capital asset such as shares, land or gold. In India, a gain on an asset held beyond the prescribed period is a long-term capital gain, which Section 54F can exempt when the proceeds are reinvested in a residential house.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    sameAs: 'https://en.wikipedia.org/wiki/Capital_gain',
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers who sold shares, land, gold or other assets and plan to buy or build a house',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#overview', name: 'What Is Section 54F' },
    { '@type': 'WebPageElement', cssSelector: '#who-can-claim', name: 'Who Can Claim Section 54F' },
    { '@type': 'WebPageElement', cssSelector: '#conditions', name: 'Conditions to Claim' },
    { '@type': 'WebPageElement', cssSelector: '#time-limits', name: 'Time Limits' },
    { '@type': 'WebPageElement', cssSelector: '#formula', name: 'How to Calculate the Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#examples', name: 'Section 54F Examples' },
    { '@type': 'WebPageElement', cssSelector: '#cap', name: 'Rs 10 Crore Cap' },
    { '@type': 'WebPageElement', cssSelector: '#cgas', name: 'Capital Gains Account Scheme' },
    { '@type': 'WebPageElement', cssSelector: '#vs-54-54ec', name: 'Section 54 vs 54F vs 54EC' },
    { '@type': 'WebPageElement', cssSelector: '#withdrawn', name: 'When the Exemption Is Withdrawn' },
    { '@type': 'WebPageElement', cssSelector: '#ltcg-rates', name: 'LTCG Tax Rates and Holding Periods' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-claim', name: 'How to Claim 54F' },
    { '@type': 'WebPageElement', cssSelector: '#case-law', name: 'Case Law' },
    { '@type': 'WebPageElement', cssSelector: '#new-act', name: 'Section 86 of the Income-tax Act 2025' },
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
  knowsAbout: ['Section 54F', 'Capital Gains Tax India', 'Long Term Capital Gains', 'Capital Gains Account Scheme', 'Personal Finance India'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const linkStyle: React.CSSProperties = { color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 };

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

function Step({ n, title, children }: { n: number; title?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{n}</div>
      <div style={{ paddingTop: 3, fontFamily: INTER }}>
        {title && <p style={{ fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{title}</p>}
        <p style={{ fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{children}</p>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 6, captionSide: 'top', paddingBottom: 6 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalcCTA({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{label}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{note}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );
}

const TOC_ITEMS = [
  { id: 'overview', label: 'What Is Section 54F' },
  { id: 'who-can-claim', label: 'Who Can Claim' },
  { id: 'conditions', label: 'Conditions to Claim' },
  { id: 'time-limits', label: 'Time Limits' },
  { id: 'formula', label: 'Exemption Formula' },
  { id: 'examples', label: 'Worked Examples' },
  { id: 'cap', label: 'Rs 10 Crore Cap' },
  { id: 'cgas', label: 'Capital Gains Account Scheme' },
  { id: 'vs-54-54ec', label: 'Section 54 vs 54F vs 54EC' },
  { id: 'withdrawn', label: 'When It Is Withdrawn' },
  { id: 'ltcg-rates', label: 'LTCG Rates, Holding Periods' },
  { id: 'how-to-claim', label: 'How to Claim' },
  { id: 'case-law', label: 'Case Law' },
  { id: 'new-act', label: 'Section 86, Act 2025' },
  { id: 'faq', label: 'Frequently Asked Questions' },
];

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '4px 0 28px', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {TOC_ITEMS.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} className="toc-link" style={{ fontSize: 13, color: C.ink2, textDecoration: 'none', padding: '6px 10px', borderRadius: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: C.ink3, fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function FaqAccordion({ items }: { items: typeof faqItems }) {
  return (
    <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <details key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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
  );
}



function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This page reflects the Income Tax Act, 1961 for sales up to 31 March 2026 and the Income-tax Act, 2025 from 1 April 2026, and the figures are illustrations. Capital gains rules change with each Finance Act, so confirm the current position on the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Department website</a> or with a Chartered Accountant before you invest. This is general information and not tax advice.
      </p>
    </div>
  );
}

export default function Section54FPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* Nav */}
      <PageNav />

      {/* Breadcrumb */}
      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Section 54F Capital Gains Exemption</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Income Tax
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime={NOW} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 12, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            Section 54F of Income Tax Act: Capital Gains Exemption on Purchase of a Residential House
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 54F exempts the long-term capital gain on any asset except a residential house when you put the sale money into a house in India. The exemption is proportionate, so reinvesting the full net sale price exempts the full gain.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: who can claim, the conditions and time limits, the formula with worked examples, the Rs 10 crore cap, the Capital Gains Account Scheme and how it differs from Sections 54 and 54EC.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="overview" style={hStyle}>What Is Section 54F of the Income Tax Act?</h2>
            <p style={pStyle}>
              Section 54F is the provision of the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Act, 1961</a> that exempts long-term capital gains when you sell an asset other than a house and buy or build a house. Shares, land, commercial property and gold all qualify, provided the gain is long-term.
            </p>
            <DataTable
              caption="Section 54F at a Glance"
              headers={['Particulars', 'Details']}
              rows={[
                ['Who can claim', 'Individuals and HUFs, including non-residents'],
                ['Asset sold', 'Any long-term capital asset except a residential house'],
                ['Reinvestment', 'One residential house in India, bought or constructed'],
                ['Exemption', 'Gain x cost of new house / net sale consideration'],
                ['Cap on new house cost', 'Rs 10 crore'],
                ['Tax regime', 'Available under both old and new regimes'],
                ['Section in the 2025 Act', 'Section 86, from 1 April 2026'],
              ]}
            />
            <CalcCTA href="/calculators/capital-gains-calculator" label="Calculate your capital gain first" note="Enter the sale price, cost and holding period to get the gain that Section 54F can exempt." />

            {/* SECTION 2 */}
            <h2 id="who-can-claim" style={hStyle}>Who Can Claim Exemption Under Section 54F?</h2>
            <p style={pStyle}>
              Individuals and Hindu Undivided Families can claim Section 54F, and non-residents are eligible as well. Companies, firms and LLPs cannot.
            </p>
            <p style={pStyle}>
              The sale must be of an asset other than a residential house. If you sold a house, including a rented one, the claim moves to Section 54.
            </p>

            {/* SECTION 3 */}
            <h2 id="conditions" style={hStyle}>Conditions to Claim Section 54F</h2>
            <p style={pStyle}>
              You must reinvest the net sale consideration in one residential house in India and own no more than one other house on the date of sale. These conditions apply together.
            </p>
            <BulletList items={[
              <><strong>Long-term asset:</strong> the asset sold must be long-term and must not be a residential house.</>,
              <><strong>New house in India:</strong> the house you buy or build must be a residential house situated in India.</>,
              <><strong>Ownership test:</strong> on the date of transfer you must own no more than one residential house other than the new one.</>,
              <><strong>No second purchase:</strong> you must not buy another residential house within 2 years after the sale, or construct one within 3 years.</>,
              <><strong>Net consideration:</strong> this is the sale price minus expenses wholly and exclusively connected with the transfer, such as brokerage and legal fees.</>,
            ]} />

            {/* SECTION 4 */}
            <h2 id="time-limits" style={hStyle}>Section 54F Time Limits for Buying or Building</h2>
            <p style={pStyle}>
              You can buy the house 1 year before the sale or up to 2 years after it, and you get 3 years after the sale to construct one. The clock starts on the date you transfer the original asset.
            </p>
            <DataTable
              caption="Time Limits Under Section 54F"
              headers={['Route', 'Time Limit', 'Measured From']}
              rows={[
                ['Purchase before the sale', '1 year before', 'Date of transfer'],
                ['Purchase after the sale', '2 years after', 'Date of transfer'],
                ['Construction', '3 years after', 'Date of transfer'],
                ['Deposit in CGAS if unspent', 'On or before the Section 139(1) due date', 'Return filing due date'],
              ]}
            />

            {/* SECTION 5 */}
            <h2 id="formula" style={hStyle}>How to Calculate the Section 54F Exemption</h2>
            <p style={pStyle}>
              The exemption is the long-term capital gain multiplied by the cost of the new house and divided by the net sale consideration. Reinvest all of the net consideration and the whole gain is exempt.
            </p>
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 18px', marginBottom: 20, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13.5, color: C.dark, overflowX: 'auto' }}>
              Exemption = LTCG x Cost of new house (max Rs 10 crore) / Net sale consideration
            </div>
            <p style={pStyle}>
              Only the proportion of the sale money that goes into the house is exempt, which is the main difference from Section 54.
            </p>

            {/* SECTION 6 */}
            <h2 id="examples" style={hStyle}>Section 54F Examples With Calculations</h2>
            <p style={pStyle}>
              These examples show the proportion at work for land, listed shares and a full reinvestment. Figures are illustrations and exclude surcharge and cess unless stated.
            </p>
            <DataTable
              caption="Example 1: Land sold for Rs 5 crore, Rs 3 crore reinvested in a house"
              headers={['Particulars', 'Amount (Rs)']}
              rows={[
                ['Sale price of land (bought June 2020 for Rs 50 lakh, sold August 2025)', '5,00,00,000'],
                ['Cost of acquisition', '50,00,000'],
                ['Long-term capital gain (no indexation)', '4,50,00,000'],
                ['Reinvested in new house', '3,00,00,000'],
                ['Exemption: 4,50,00,000 x 3,00,00,000 / 5,00,00,000', '2,70,00,000'],
                ['Taxable long-term capital gain', '1,80,00,000'],
                ['Tax at 12.5% on taxable gain', '22,50,000'],
                ['Tax at 12.5% with no Section 54F claim', '56,25,000'],
                ['Tax saved by Section 54F', '33,75,000'],
              ]}
            />
            <p style={pStyle}>
              A resident individual or HUF who bought land before 23 July 2024 can instead choose 20% with indexation. On this example that gives a taxable gain of Rs 1,75,01,661 and a tax of Rs 35,00,332, which is higher, so the 12.5% route wins.
            </p>
            <DataTable
              caption="Example 2: Listed shares sold for Rs 1.2 crore, Rs 60 lakh reinvested"
              headers={['Particulars', 'Amount (Rs)']}
              rows={[
                ['Sale price of shares (held over 12 months)', '1,20,00,000'],
                ['Cost of acquisition', '20,00,000'],
                ['Long-term capital gain', '1,00,00,000'],
                ['Reinvested in new house', '60,00,000'],
                ['Exemption: 1,00,00,000 x 60,00,000 / 1,20,00,000', '50,00,000'],
                ['Taxable long-term capital gain', '50,00,000'],
              ]}
            />
            <DataTable
              caption="Example 3: Full net consideration reinvested"
              headers={['Particulars', 'Amount (Rs)']}
              rows={[
                ['Net sale consideration', '5,00,00,000'],
                ['Reinvested in new house', '5,00,00,000'],
                ['Long-term capital gain', '4,50,00,000'],
                ['Exemption: 4,50,00,000 x 5,00,00,000 / 5,00,00,000', '4,50,00,000'],
                ['Taxable long-term capital gain', 'Nil'],
              ]}
            />

            {/* SECTION 7 */}
            <h2 id="cap" style={hStyle}>Section 54F Rs 10 Crore Cap</h2>
            <p style={pStyle}>
              The cost of the new house counted for Section 54F is capped at Rs 10 crore, which applies from FY 2023-24 (AY 2024-25). Spending more than that on the house earns no extra exemption.
            </p>
            <DataTable
              caption="Example: Cost of new house above Rs 10 crore"
              headers={['Particulars', 'Amount (Rs)']}
              rows={[
                ['Net sale consideration', '20,00,00,000'],
                ['Long-term capital gain', '15,00,00,000'],
                ['Actual cost of new house', '14,00,00,000'],
                ['Cost counted for exemption (capped)', '10,00,00,000'],
                ['Exemption: 15,00,00,000 x 10,00,00,000 / 20,00,00,000', '7,50,00,000'],
                ['Taxable long-term capital gain', '7,50,00,000'],
              ]}
            />

            {/* SECTION 8 */}
            <h2 id="cgas" style={hStyle}>Capital Gains Account Scheme (CGAS) and Section 54F</h2>
            <p style={pStyle}>
              The Capital Gains Account Scheme lets you deposit unspent sale proceeds in a designated bank account so the Section 54F exemption survives while you buy or build. The deposit must be made on or before the due date for filing your return under Section 139(1).
            </p>
            <DataTable
              caption="Capital Gains Account Scheme: Key Rules"
              headers={['Point', 'Rule']}
              rows={[
                ['Governing scheme', 'Capital Gains Accounts Scheme, 1988'],
                ['Deposit deadline', 'On or before the due date under Section 139(1)'],
                ['Account types', 'Account A (savings style) and Account B (term deposit style)'],
                ['Where to open', 'Public sector banks and private or small finance banks notified under the scheme'],
                ['Forms', 'Form A to open the account, Form C to withdraw'],
                ['Interest', 'Set by the bank, taxable as income from other sources'],
                ['Unused money', 'Taxed as long-term capital gain in the year the 3-year period ends'],
              ]}
            />
            <p style={pStyle}>
              Public sector banks such as SBI, Canara Bank and Bank of Baroda handle these accounts, and some notified private banks do as well. Confirm that your branch accepts the deposit before you travel, because not every branch processes it.
            </p>
            <p style={pStyle}>
              Withdraw only to pay for the house, and keep the bills. Money drawn out and not used for the house within the allowed period is taxable.
            </p>

            {/* SECTION 9 */}
            <h2 id="vs-54-54ec" style={hStyle}>Difference Between Section 54, 54F and 54EC</h2>
            <p style={pStyle}>
              Section 54 applies when you sell a house, Section 54F when you sell any other asset, and Section 54EC when you sell land or a building and invest in specified bonds. Choose by the asset you sold.
            </p>
            <DataTable
              caption="Section 54 vs Section 54F vs Section 54EC"
              headers={['Basis', 'Section 54', 'Section 54F', 'Section 54EC']}
              rows={[
                ['Asset sold', 'Residential house', 'Any long-term asset except a residential house', 'Land or building'],
                ['Reinvest in', 'Residential house', 'Residential house in India', 'Specified bonds'],
                ['Exemption', 'Gain, up to the amount invested', 'Gain in proportion to the amount reinvested', 'Gain invested in bonds'],
                ['Limit', 'Rs 10 crore on cost of new house', 'Rs 10 crore on cost of new house', 'Rs 50 lakh per financial year'],
                ['Time to reinvest', '1 year before, 2 years after, 3 to build', '1 year before, 2 years after, 3 to build', '6 months from the sale'],
                ['Lock-in', '3 years on the new house', '3 years on the new house', '5 years on the bonds'],
                ['Two houses', 'One-time option in limited cases', 'Not allowed', 'Not applicable'],
              ]}
            />
            <p style={pStyle}>
              The <Link href="/blogs/section-10-income-tax-act-exemptions" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 10 exemptions guide</Link> covers the income exemptions that sit outside capital gains.
            </p>

            {/* SECTION 10 */}
            <h2 id="withdrawn" style={hStyle}>When the Section 54F Exemption Is Withdrawn</h2>
            <p style={pStyle}>
              The exemption is withdrawn if you sell the new house within 3 years or buy or build a second house inside the restricted window. The exempted gain then becomes taxable in the year of the breach.
            </p>
            <BulletList items={[
              'You sell the new house within 3 years of buying or completing it.',
              'You buy another residential house within 2 years after selling the original asset.',
              'You construct another residential house within 3 years after selling the original asset.',
              'You leave money in CGAS unused past the allowed period.',
            ]} />

            {/* SECTION 11 */}
            <h2 id="ltcg-rates" style={hStyle}>LTCG Tax Rates and Holding Periods for Section 54F Assets</h2>
            <p style={pStyle}>
              Long-term gains on most assets are taxed at 12.5% for sales on or after 23 July 2024, and the holding period depends on the asset. A gain must be long-term before Section 54F can apply.
            </p>
            <DataTable
              caption="Holding Period and LTCG Rate by Asset (sales on or after 23 July 2024)"
              headers={['Asset', 'Long-term if held more than', 'LTCG Rate']}
              rows={[
                ['Listed equity shares and equity funds', '12 months', '12.5% above Rs 1.25 lakh a year'],
                ['Land and buildings', '24 months', '12.5%, no indexation'],
                ['Unlisted shares', '24 months', '12.5%'],
                ['Gold and jewellery', '24 months', '12.5%'],
                ['Debt mutual funds bought after 1 April 2023', 'Never long-term', 'Slab rate, so not eligible'],
              ]}
            />
            <p style={pStyle}>
              The <Link href="/blogs/cost-inflation-index-fy-2026-27" target="_blank" rel="noopener noreferrer" style={linkStyle}>cost inflation index guide</Link> explains the indexation option available for land and buildings bought before 23 July 2024. Surcharge on long-term gains is capped at 15%, and 4% cess applies on top.
            </p>

            {/* SECTION 12 */}
            <h2 id="how-to-claim" style={hStyle}>How to Claim the Section 54F Exemption</h2>
            <p style={pStyle}>
              You claim Section 54F in the capital gains schedule of your income tax return for the year of sale. Keep the sale deed, the purchase or construction documents and any CGAS statements.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Confirm the asset and holding period">Check that the asset is not a house and that the gain is long-term.</Step>
              <Step n={2} title="Compute the gain and net consideration">Deduct cost and transfer expenses from the sale price to get the gain.</Step>
              <Step n={3} title="Buy or build within the limit">Complete the purchase within 1 year before or 2 years after, or the construction within 3 years.</Step>
              <Step n={4} title="Deposit any balance in CGAS">If the house is not ready by the return due date, deposit the unspent money before that date.</Step>
              <Step n={5} title="Report it in the ITR">Show the gain and the exemption in the capital gains schedule when you <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>file on the e-Filing portal</a>.</Step>
            </div>
            <p style={pStyle}>
              The <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={linkStyle}>ITR filing last date</Link> page lists the deadline that also fixes your CGAS deposit date.
            </p>


            {/* SECTION 13 */}
            <h2 id="case-law" style={hStyle}>Section 54F Case Law on Owning Multiple Floors</h2>
            <p style={pStyle}>
              The Delhi High Court has held that owning several floors of one building does not mean owning several houses for Section 54F. The ruling is PCIT v. Lata Goel, decided in 2025.
            </p>
            <p style={pStyle}>
              The Assessing Officer had treated a basement and a second floor as two houses and denied the exemption. The Court disagreed, relying on earlier decisions including CIT v. Gita Duggal, and treated the floors as one residential house.
            </p>

            {/* SECTION 14 */}
            <h2 id="new-act" style={hStyle}>Section 86 of the Income-tax Act, 2025</h2>
            <p style={pStyle}>
              The Income-tax Act, 2025 carries the Section 54F exemption in Section 86, and it applies from 1 April 2026. Sales up to 31 March 2026 are still reported under Section 54F of the 1961 Act.
            </p>
            <DataTable
              caption="Old and New Section Numbers"
              headers={['Topic', 'Income Tax Act 1961', 'Income-tax Act 2025']}
              rows={[
                ['Gain on any asset other than a house, reinvested in a house', 'Section 54F', 'Section 86'],
                ['Gain on a house, reinvested in a house', 'Section 54', 'Section 82'],
              ]}
            />

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Section 54F</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="s54f-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}>
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20, flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Quick Reference</div>
              {([
                ['Asset sold', 'Any except a house'],
                ['Gain type', 'Long-term only'],
                ['Buy new house', '1 yr before, 2 yrs after'],
                ['Construct', 'Within 3 years'],
                ['Cap on house cost', 'Rs 10 crore'],
                ['CGAS deposit by', 'Section 139(1) due date'],
                ['Section in 2025 Act', 'Section 86'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20, flexShrink: 0 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                {([
                  ['/calculators/capital-gains-calculator', 'Capital Gains Calculator'],
                  ['/calculators/income-tax-calculator', 'Income Tax Calculator'],
                  ['/calculators/property-appreciation-calculator', 'Property Appreciation Calculator'],
                ] as [string, string][]).map(([href, label], i) => (
                  <Link key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: i < 2 ? 8 : 0 }}>
                    <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>{label}</span>
                    <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                  </Link>
                ))}
              </div>
            </nav>

            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px', flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/cost-inflation-index-fy-2026-27', 'Cost Inflation Index FY 2026-27'],
                ['/blogs/section-80d-health-insurance-deduction', 'Section 80D Health Insurance Deduction'],
                ['/blogs/section-10-income-tax-act-exemptions', 'Section 10 Income Tax Act Exemptions'],
                ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime: Which Should You Choose'],
              ] as [string, string][]).map(([href, title], i, arr) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <Link href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: C.dark, textDecoration: 'none', lineHeight: 1.5 }}>
                    {title}
                  </Link>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />

      <style>{`
        .s54f-sidebar::-webkit-scrollbar { width: 5px; }
        .s54f-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s54f-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s54f-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        .toc-link:hover { background: #f4f5f6; color: #101214; }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
        @media (max-width: 900px) {
          article { grid-column: 1 / -1; }
          aside { display: none; }
        }
      `}</style>
    </>
  );
}

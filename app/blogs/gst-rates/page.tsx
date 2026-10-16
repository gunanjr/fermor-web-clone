import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

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

export const metadata: Metadata = {
  title: 'GST Rates in India: Complete List of Tax Slabs, GST 2.0',
  description: 'GST rates in India under GST 2.0: 0%, 5%, 18% and 40% slabs effective September 22, 2025, plus 3%/0.25% niche rates on gold and diamonds. Full rate cut and hike tables, item-wise lists by category, HSN code lookup, health insurance GST rules, and how to calculate GST.',
  alternates: { canonical: 'https://fermor.in/blogs/gst-rates' },
  openGraph: {
    title: 'GST Rates in India: Complete List of Tax Slabs Under GST 2.0 - Fermor',
    description: 'The new 5%/18%/40% GST 2.0 slab structure, effective September 22, 2025: full rate cut and hike tables, item-wise category lists, HSN codes, and health insurance GST rules.',
    type: 'article',
    publishedTime: '2026-07-28T00:32:29+05:30',
    modifiedTime: '2026-07-28T00:32:29+05:30',
    authors: ['Fermor Analysis'],
    tags: ['GST', 'GST 2.0', 'Tax Rates', 'India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST Rates in India - Fermor',
    description: '0%, 5%, 18%, 40%. The complete GST 2.0 rate list, effective September 22, 2025.',
  },
  keywords: [
    'gst rate', 'gst rates', 'gst rate list', 'gst new rate', 'gst new rate list', 'gst slab',
    'gst new slab', 'goods and services tax', 'gstin', 'gst hsn code', 'gst rate and hsn code',
    'hsn code for gst rate', 'gst rate with hsn code', 'gst on mobile phones', 'gst on health insurance',
    'medical insurance gst', 'car gst rate', 'cement gst rate', 'gold gst', 'gst in gold',
    'calculating gst', 'gst cal', 'whatis gst', 'gst payable', 'gst hsn code and rate',
  ],
};

const faqItems = [
  { q: 'What are the current GST rates in India?', a: 'Under GST 2.0, effective September 22, 2025, the primary GST rates are 0%, 5%, 18% and 40%. A small number of items outside this structure carry 3% (gold and jewellery), 0.25% (rough diamonds and precious stones), and 1.5% (specified job work on diamonds), while pan masala and tobacco products remain at 28% until compensation cess loan obligations are cleared.' },
  { q: 'What changed in GST 2.0?', a: 'The 56th GST Council meeting (September 3 to 4, 2025) collapsed the old four-slab structure of 5%, 12%, 18% and 28% into a simplified two-slab system of 5% and 18%, and introduced a new 40% de-merit rate for sin goods and luxury items. CBIC notified the changes on September 17, 2025, effective from September 22, 2025.' },
  { q: 'What is the GST rate on health insurance?', a: 'GST on individual health insurance is nil (0%), effective September 22, 2025, covering individual policies and family floater plans, including those for senior citizens. Group health insurance provided through an employer is not covered by this exemption and continues to be taxed at 18%.' },
  { q: 'What is the GST rate on life insurance?', a: 'GST on individual life insurance is nil (0%) since September 22, 2025, covering term insurance, ULIPs, and endowment policies bought by individuals, along with their reinsurance. Group life insurance policies are excluded from this exemption and remain taxable at 18%.' },
  { q: 'What is the GST rate on mobile phones?', a: 'Mobile phones are taxed at 18% GST under HSN code 8517 12 19. This rate applies to the phone itself; accessories like chargers and cases are taxed separately, typically also at 18%, depending on their own HSN classification.' },
  { q: 'What is the GST rate on gold and gold jewellery?', a: 'Gold, gold jewellery, and gold in any semi-manufactured form attract 3% GST (1.5% CGST plus 1.5% SGST for intra-state sales, or 3% IGST for inter-state sales) under HSN Chapter 71. Making charges on jewellery are billed separately and taxed at 5%.' },
  { q: 'What is the GST rate on cars?', a: 'Small petrol, LPG, and CNG cars up to 1200cc and 4000mm, and small diesel cars up to 1500cc and 4000mm, are taxed at 18% under GST 2.0, down from 28% earlier. Cars exceeding these thresholds, along with larger hybrids, are taxed at 40%.' },
  { q: 'What is the GST rate on cement?', a: 'Cement is taxed at 18% GST. This is unchanged from before GST 2.0; cement was already in the 18% category and was not one of the items shifted by the September 2025 reforms.' },
  { q: 'How many GST slabs are there in India?', a: 'There are four primary GST rate slabs: 0%, 5%, 18%, and 40%. A small set of items, gold, diamonds, specified job work, and pan masala or tobacco pending cess clearance, are taxed separately at 3%, 0.25%, 1.5%, or 28%.' },
  { q: 'What is the highest GST rate in India?', a: 'The highest standard GST rate is 40%, applied to sin goods (pan masala inhalation products, aerated and caffeinated beverages) and luxury items (cars above the small-car threshold, yachts, personal aircraft, and betting or gambling services). Pan masala and tobacco leaf products themselves remain at 28% until their compensation cess loans are repaid.' },
  { q: 'How do I find the GST rate for a specific HSN code?', a: 'Search the item or its HSN code directly on the government GST rate finder at cbic-gst.gov.in, or cross-reference the HSN chapter list against Notification 09/2025-CTR, which is the current legal source for GST rate schedules by chapter.' },
  { q: 'How is GST calculated?', a: 'GST amount equals the taxable value of the supply multiplied by the applicable GST rate. On a taxable value of Rs 10,000 at 18% GST, the GST amount is Rs 1,800, for a total invoice value of Rs 11,800; for an intra-state sale this splits into Rs 900 CGST and Rs 900 SGST, while an inter-state sale charges the full Rs 1,800 as IGST.' },
  { q: 'What is the GST composition scheme rate?', a: 'Composition scheme rates are lower than standard GST and vary by business type: 1% for manufacturers and traders (split 0.5% CGST and 0.5% SGST), 5% for restaurants not serving alcohol, and 6% for other eligible service providers. Composition dealers cannot charge GST separately on invoices or claim input tax credit.' },
  { q: 'What is TDS and TCS under GST?', a: 'TDS under Section 51 is deducted at 2% by government bodies and specified buyers on contracts above Rs 2.5 lakh. TCS under Section 52 is collected at 0.5% by e-commerce operators on the net value of sales made through their platform, both split equally between CGST and SGST for intra-state transactions.' },
  { q: 'Are tobacco and pan masala still taxed at 28%?', a: 'Yes. Unlike most other goods, tobacco and pan masala were left out of the September 22, 2025 rate changes and continue at 28% (plus applicable compensation cess) until the compensation cess loan and interest obligations are fully discharged. The 40% rate for these items will apply from a separately notified later date.' },
  { q: 'What are the three types of GST?', a: 'CGST (Central GST) and SGST (State GST) apply equally to intra-state transactions, each charging half the total GST rate. IGST (Integrated GST) applies to inter-state transactions and imports, charging the full rate in one line, and is later apportioned between the centre and the destination state.' },
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
  headline: 'GST Rates in India: Complete List of Tax Slabs Under GST 2.0, Effective September 22, 2025',
  url: 'https://fermor.in/blogs/gst-rates',
  datePublished: '2026-07-28T00:32:29+05:30',
  dateModified: '2026-07-28T00:32:29+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/gst-rates' },
  articleSection: 'GST',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'GST Rates India', description: 'The tax percentages applied to goods and services under India\'s Goods and Services Tax regime' },
    { '@type': 'Thing', name: 'GST 2.0', description: 'The rate rationalisation approved at the 56th GST Council meeting, simplifying GST slabs to 5%, 18% and 40%, effective September 22, 2025' },
  ],
  keywords: 'gst rate, gst rates, gst rate list, gst new rate, gst slab, gst 2.0, gst on health insurance, gst hsn code',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'GST Rates in India', item: 'https://fermor.in/blogs/gst-rates' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate GST on an Invoice',
  description: 'Step-by-step process to calculate the GST amount and total invoice value for a taxable supply.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Identify the taxable value', text: 'Determine the taxable value of the supply before GST, i.e. the agreed price of the goods or services.' },
    { '@type': 'HowToStep', position: 2, name: 'Find the applicable GST rate', text: 'Look up the correct rate (0%, 5%, 18%, 40%, or a niche rate) for that item or service by its HSN or SAC code.' },
    { '@type': 'HowToStep', position: 3, name: 'Calculate the GST amount', text: 'Multiply the taxable value by the GST rate. On Rs 10,000 at 18%, GST equals Rs 1,800.' },
    { '@type': 'HowToStep', position: 4, name: 'Split into CGST/SGST or IGST', text: 'For an intra-state sale, split the GST amount equally into CGST and SGST. For an inter-state sale, charge the full amount as IGST.' },
    { '@type': 'HowToStep', position: 5, name: 'Add to the taxable value', text: 'Add the GST amount to the taxable value to get the total invoice value payable by the buyer.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/gst-rates',
  name: 'GST Rates in India: Complete List of Tax Slabs Under GST 2.0 - Fermor',
  url: 'https://fermor.in/blogs/gst-rates',
  inLanguage: 'en-IN',
  datePublished: '2026-07-28T00:32:29+05:30',
  dateModified: '2026-07-28T00:32:29+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'GST Rate',
    description: 'The percentage of tax applied to the taxable value of a supply of goods or services under India\'s Goods and Services Tax law.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian GST Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian businesses, GST-registered taxpayers, consumers, and finance professionals',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#current-slabs', name: 'Current GST Tax Slabs' },
    { '@type': 'WebPageElement', cssSelector: '#gst-2-reform', name: 'GST 2.0 Reform' },
    { '@type': 'WebPageElement', cssSelector: '#rate-cuts', name: 'GST Rate Cuts' },
    { '@type': 'WebPageElement', cssSelector: '#rate-hikes', name: 'GST Rate Hikes' },
    { '@type': 'WebPageElement', cssSelector: '#rate-structure', name: 'CGST SGST IGST and Composition Scheme' },
    { '@type': 'WebPageElement', cssSelector: '#nil-rate-items', name: '0% GST Items' },
    { '@type': 'WebPageElement', cssSelector: '#five-percent-items', name: '5% GST Items' },
    { '@type': 'WebPageElement', cssSelector: '#eighteen-percent-items', name: '18% GST Items' },
    { '@type': 'WebPageElement', cssSelector: '#forty-percent-items', name: '40% GST Items' },
    { '@type': 'WebPageElement', cssSelector: '#niche-rates', name: 'Special GST Rates' },
    { '@type': 'WebPageElement', cssSelector: '#health-insurance', name: 'GST on Health and Life Insurance' },
    { '@type': 'WebPageElement', cssSelector: '#mobile-phones', name: 'GST on Mobile Phones' },
    { '@type': 'WebPageElement', cssSelector: '#hsn-code', name: 'GST Rate by HSN Code' },
    { '@type': 'WebPageElement', cssSelector: '#notifications', name: 'GST 2.0 Notifications' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-calculate', name: 'How to Calculate GST' },
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
  knowsAbout: ['GST India', 'GST 2.0', 'Indirect Tax India', 'HSN Codes', 'Personal Finance India', 'Income Tax India'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 24, marginBottom: 10 };
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

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function DataTable({ caption, headers, rows, highlightLast = false }: {
  caption: string; headers: string[]; rows: (string | React.ReactNode)[][]; highlightLast?: boolean;
}) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 6, captionSide: 'top', paddingBottom: 6 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const isLast = highlightLast && ri === rows.length - 1;
            return (
              <tr key={ri} style={isLast ? { background: C.paleDg, fontWeight: 700 } : {}}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none', fontWeight: isLast ? 700 : undefined }}>{cell}</td>
                ))}
              </tr>
            );
          })}
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '24px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

const TOC_ITEMS = [
  { id: 'current-slabs', label: 'Current GST Tax Slabs' },
  { id: 'gst-2-reform', label: 'GST 2.0: What Changed' },
  { id: 'rate-cuts', label: 'GST Rate Cuts' },
  { id: 'rate-hikes', label: 'GST Rate Hikes' },
  { id: 'rate-structure', label: 'CGST, SGST, IGST, Composition Scheme' },
  { id: 'nil-rate-items', label: '0% GST Items' },
  { id: 'five-percent-items', label: '5% GST Items' },
  { id: 'eighteen-percent-items', label: '18% GST Items' },
  { id: 'forty-percent-items', label: '40% GST Items' },
  { id: 'niche-rates', label: 'Special Rates: Gold, Diamonds' },
  { id: 'health-insurance', label: 'GST on Health and Life Insurance' },
  { id: 'mobile-phones', label: 'GST on Mobile Phones' },
  { id: 'hsn-code', label: 'GST Rate by HSN Code' },
  { id: 'notifications', label: 'GST 2.0 Notifications' },
  { id: 'how-to-calculate', label: 'How to Calculate GST' },
  { id: 'faq', label: 'Frequently Asked Questions' },
];

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '4px 0 28px', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> GST rates are set by the GST Council and are subject to change through future notifications. Always verify the current rate for a specific item against its HSN code on the official GST portal (<a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>gst.gov.in</a>) before filing returns or pricing invoices. Fermor is not a tax advisory firm.
      </p>
    </div>
  );
}

export default function GSTRatesPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>GST Rates in India</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              GST
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime="2026-07-28T00:32:29+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jul 28, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>19 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            GST Rates in India: Complete List of Tax Slabs Under GST 2.0
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              India has four main GST rates since GST 2.0 took effect on September 22, 2025: 0%, 5%, 18% and 40%. Gold and jewellery are taxed separately at 3%, rough diamonds at 0.25%, and pan masala and tobacco stay at 28% until compensation cess loans are cleared.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: the full rate cut and hike list from the 56th GST Council meeting, item-wise rates by category, HSN code lookup, the health insurance exemption, and how to calculate GST on an invoice.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="current-slabs" style={hStyle}>GST Rates in India: Current Tax Slabs</h2>
            <p style={pStyle}>
              Four rates cover almost every good and service in India. A small number of items are taxed outside these, at niche rates the GST Council sets separately.
            </p>
            <DataTable
              caption="Current GST Rate Slabs, Effective September 22, 2025"
              headers={['Rate', 'Applies To']}
              rows={[
                ['0% (Nil)', 'Essential food items, healthcare essentials, individual health and life insurance, education materials'],
                ['5%', 'Daily essentials, packaged food, agricultural equipment, medical devices, apparel up to Rs 2,500'],
                ['18%', 'Standard rate: most manufactured goods, electronics, small cars, professional services'],
                ['40%', 'Sin goods (aerated drinks, gambling) and luxury items (large cars, yachts, personal aircraft)'],
                ['3%', 'Gold, silver, platinum, and jewellery (HSN Chapter 71)'],
                ['0.25%', 'Rough and semi-processed diamonds and precious stones'],
                ['28%', 'Pan masala and tobacco products, pending a later-notified move to 40%'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="gst-2-reform" style={hStyle}>GST 2.0: What Changed on September 22, 2025</h2>
            <p style={pStyle}>
              The 56th GST Council meeting, held September 3 to 4, 2025, approved the biggest GST restructuring since the tax launched in 2017. CBIC notified the changes on September 17, and the new rates took effect from September 22, 2025.
            </p>
            <p style={pStyle}>
              The reform collapsed the old five-rate system (0%, 5%, 12%, 18%, 28%) into two main slabs, 5% and 18%, and added a new 40% de-merit rate for sin goods and luxury items. The 12% and 28% slabs were eliminated for almost every item that used to sit in them.
            </p>
            <BulletList items={[
              'Daily essentials and agricultural equipment moved down from 12%/18% to 5%.',
              'Individual health and life insurance moved from 18% to nil.',
              '33 life-saving drugs and specified critical medicines moved from 12% to nil.',
              'Small cars, two-wheelers up to 350cc, ACs, and TVs above 32 inches moved from 28% to 18%.',
              'Sin goods and luxury items (pan masala, aerated drinks, large cars, yachts) moved from 28% to 40%.',
              'Coal, lignite, and peat moved up from 5% to 18%.',
            ]} />

            {/* SECTION 3 */}
            <h2 id="rate-cuts" style={hStyle}>GST Rate Cuts: Items That Got Cheaper</h2>
            <p style={pStyle}>
              These are the major category-wise rate reductions from the 56th GST Council meeting, all effective September 22, 2025.
            </p>
            <DataTable
              caption="GST Rate Cuts by Category"
              headers={['Category', 'Items', 'Old Rate', 'New Rate']}
              rows={[
                ['Daily Essentials', 'Hair oil, shampoo, toothpaste, toilet soap, toothbrushes, shaving cream', '18%', '5%'],
                ['Daily Essentials', 'Butter, ghee, cheese and dairy spreads', '12%', '5%'],
                ['Daily Essentials', 'Pre-packaged namkeens, bhujia and mixtures', '12%', '5%'],
                ['Daily Essentials', 'Utensils; feeding bottles, napkins and clinical diapers; sewing machines and parts', '12%', '5%'],
                ['Agriculture', 'Tractor tyres and parts', '18%', '5%'],
                ['Agriculture', 'Tractors; bio-pesticides and micro-nutrients; drip irrigation and sprinklers', '12%', '5%'],
                ['Agriculture', 'Soil preparation, cultivation and harvesting machinery', '12%', '5%'],
                ['Healthcare', 'Individual health and life insurance', '18%', 'Nil'],
                ['Healthcare', 'Thermometer; medical grade oxygen; diagnostic kits and reagents; glucometer and test strips; corrective spectacles', '12-18%', '5%'],
                ['Healthcare', '33 listed drugs and medicines', '12%', 'Nil'],
                ['Healthcare', 'Faricimab, Pertuzumab, Ocrelizumab, Brentuximab Vedotin and similar specified drugs', '12%', '5%'],
                ['Automobiles', 'Small petrol/CNG/LPG cars (up to 1200cc, 4000mm); small diesel cars (up to 1500cc, 4000mm)', '28%', '18%'],
                ['Automobiles', 'Three-wheelers; motorcycles up to 350cc; goods transport vehicles', '28%', '18%'],
                ['Education', 'Maps, charts, globes, pencils, sharpeners, crayons, exercise books, erasers', '5-12%', 'Nil'],
                ['Electronics', 'Air conditioners; TVs above 32 inches; monitors, projectors, dishwashers', '28%', '18%'],
              ]}
            />

            {/* SECTION 4 */}
            <h2 id="rate-hikes" style={hStyle}>GST Rate Hikes: Sin Goods and Luxury Items</h2>
            <p style={pStyle}>
              A smaller set of categories moved up, mostly sin goods and luxury items now taxed at the new 40% de-merit rate.
            </p>
            <DataTable
              caption="GST Rate Hikes by Category"
              headers={['Category', 'Items', 'Old Rate', 'New Rate']}
              rows={[
                ['Mining', 'Coal, lignite, peat', '5%', '18%'],
                ['Sin Goods', 'Aerated waters; caffeinated and carbonated beverages; other non-alcoholic beverages', '18-28%', '40%'],
                ['Sin Goods', 'Motor cars and hybrids beyond small-car thresholds; motorcycles above 350cc', '28%', '40%'],
                ['Sin Goods', 'Personal aircraft; yachts and pleasure vessels; revolvers and pistols', '28%', '40%'],
                ['Sin Goods', 'Casino, race club and IPL-style event admission; bookmaker licensing; betting, gambling, lottery', '28% + ITC', '40% + ITC'],
                ['Paper', 'Dissolving-grade chemical wood pulp; papers and paperboards other than exercise-book paper', '12%', '18%'],
                ['Textiles', 'Apparel and made-ups above Rs 2,500 per piece; quilted cotton products above Rs 2,500', '12%', '18%'],
              ]}
            />
            <Callout>
              Tobacco and pan masala are the one exception: they stay at 28% (plus compensation cess) rather than moving to 40% on September 22, 2025. The move to 40% is deferred to a separately notified date, after outstanding compensation cess loan and interest obligations are fully repaid.
            </Callout>

            {/* SECTION 5 */}
            <h2 id="rate-structure" style={hStyle}>Types of GST Rates: CGST, SGST, IGST and Composition Scheme</h2>
            <p style={pStyle}>
              The rate you see on a price list is the combined GST rate. How it splits depends on whether the transaction crosses a state line.
            </p>
            <DataTable
              caption="How GST Splits by Transaction Type"
              headers={['Transaction Type', 'Tax Charged', 'Example on 18% GST']}
              rows={[
                ['Intra-state (within one state)', 'CGST + SGST, split equally', '9% CGST + 9% SGST'],
                ['Inter-state (across states) or import', 'IGST, charged in full', '18% IGST'],
              ]}
            />
            <p style={pStyle}>
              Small businesses under the composition scheme pay a flat, lower rate on turnover instead of the standard rate, and cannot charge GST separately on invoices or claim input tax credit.
            </p>
            <DataTable
              caption="GST Composition Scheme Rates"
              headers={['Business Type', 'Rate on Turnover']}
              rows={[
                ['Manufacturers and traders', '1% (0.5% CGST + 0.5% SGST)'],
                ['Restaurants (not serving alcohol)', '5% (2.5% CGST + 2.5% SGST)'],
                ['Other eligible service providers', '6% (3% CGST + 3% SGST)'],
              ]}
            />
            <p style={pStyle}>
              GST also has its own TDS and TCS rules, separate from income tax. TDS under Section 51 is 2%, deducted by government bodies on contracts above Rs 2.5 lakh; TCS under Section 52 is 0.5%, collected by e-commerce operators on sales through their platform.
            </p>

            {/* SECTION 6 */}
            <h2 id="nil-rate-items" style={hStyle}>0% GST Items: Nil-Rated and Exempt Supplies</h2>
            <p style={pStyle}>
              Nil-rated items pay no GST at any stage. This covers most fresh, unprocessed food, and a range of healthcare and education essentials.
            </p>
            <DataTable
              caption="0% GST Items by Category"
              headers={['Category', 'Examples']}
              rows={[
                ['Fresh produce', 'Fresh vegetables, fruits, nuts, ginger and turmeric; tender coconut water; prasadam'],
                ['Dairy and eggs', 'Fresh, pasteurised and UHT milk; curd; lassi; buttermilk; paneer; eggs; non-packaged honey'],
                ['Grains and staples', 'Non-packaged cereals, flours, pulses; bread, roti, chapathi, paratha, khakhra'],
                ['Healthcare', 'Medicines on the Annexure I list; blood components; contraceptives; hearing aids; sanitary napkins'],
                ['Insurance', 'Individual health insurance; individual life insurance (term, ULIP, endowment); reinsurance of both'],
                ['Education', 'Printed books; newspapers; maps, globes; exercise books; children\'s picture books'],
                ['Handcrafted items', 'Earthen pots, clay lamps and idols; glass bangles; agricultural hand tools; khadi products'],
                ['Miscellaneous', 'Indian national flag; salt; electrical energy; firewood and charcoal; passenger baggage'],
              ]}
            />

            {/* SECTION 7 */}
            <h2 id="five-percent-items" style={hStyle}>5% GST Items: The Merit Rate</h2>
            <p style={pStyle}>
              The 5% slab covers processed food, daily essentials, agricultural machinery, and healthcare equipment, most of it moved here from 12% or 18% under GST 2.0.
            </p>
            <DataTable
              caption="5% GST Items by Category"
              headers={['Category', 'Examples']}
              rows={[
                ['Processed food', 'Dried fruits and spices; jams and preserves; ice cream; namkeens and bhujia; packaged honey'],
                ['Dairy and fats', 'Butter, ghee, cheese, dairy spreads; condensed milk; yoghurt; edible oils'],
                ['Daily essentials', 'Hair oil, shampoo, toothpaste, toilet soap, shaving cream, toothbrushes'],
                ['Apparel', 'Knitted or non-knitted clothing, footwear, and made-up textile sets up to Rs 2,500 per piece'],
                ['Healthcare', 'Insulin and vaccines; diagnostic kits; thermometers; glucometers; stents and dialysis units'],
                ['Agriculture', 'Tractors and tractor parts; drip irrigation systems; sprinklers; soil and harvesting machinery'],
                ['Fuels', 'Bio-gas; kerosene under PDS; domestic LPG; EV chargers'],
                ['Sugar', 'Sugar, jaggery, khandsari, molasses, sugar confectionery, cocoa and chocolate products'],
              ]}
            />

            {/* SECTION 8 */}
            <h2 id="eighteen-percent-items" style={hStyle}>18% GST Items: The Standard Rate</h2>
            <p style={pStyle}>
              18% is the default rate. Most manufactured goods, electronics, machinery, and professional services are taxed at 18% unless a lower or higher slab specifically applies.
            </p>
            <DataTable
              caption="18% GST Items by Category"
              headers={['Category', 'Examples']}
              rows={[
                ['Electronics', 'Mobile phones, TVs, cameras, air conditioners, refrigerators, monitors, speakers, circuits'],
                ['Automobiles', 'Small cars, motorcycles up to 350cc, three-wheelers, goods vehicles, auto parts'],
                ['Construction', 'Cement; iron and steel products; tiles and ceramics; paints and varnishes'],
                ['Metals and hardware', 'Locks, hand tools, cutlery, nails, screws, kitchenware, metal furniture fittings'],
                ['Personal care', 'Perfumes, cosmetics, deodorants (outside the specified 5% daily-essentials list)'],
                ['Machinery', 'Industrial engines, pumps, compressors, textile and food-processing machinery'],
                ['Services', 'Most professional, business, transport, courier, and manufacturing job-work services'],
                ['Apparel above threshold', 'Clothing and made-ups priced above Rs 2,500 per piece'],
              ]}
            />

            {/* SECTION 9 */}
            <h2 id="forty-percent-items" style={hStyle}>40% GST Items: Sin Goods and Luxury</h2>
            <p style={pStyle}>
              40% is reserved for goods and services the government treats as non-essential or socially discouraged, plus genuine luxury items.
            </p>
            <DataTable
              caption="40% GST Items by Category"
              headers={['Category', 'Examples']}
              rows={[
                ['Beverages', 'Sugared aerated water; caffeinated drinks; carbonated fruit drinks and juices'],
                ['Gambling', 'Betting, casinos, horse racing, lottery, online money gaming'],
                ['Firearms', 'Revolvers and pistols'],
                ['Large vehicles', 'Cars above the small-car threshold; motorcycles above 350cc; larger hybrids'],
                ['Luxury transport', 'Yachts and pleasure vessels; personal-use aircraft'],
              ]}
            />

            <CalcCTA
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator"
              note="GST is one part of your total tax picture. Check your income tax liability for FY 2025-26 under both regimes."
            />

            {/* SECTION 10 */}
            <h2 id="niche-rates" style={hStyle}>Special GST Rates: Gold, Diamonds and Pan Masala</h2>
            <p style={pStyle}>
              A few items are taxed outside the four main slabs entirely, at rates the GST Council has kept separate since 2017.
            </p>
            <DataTable
              caption="Niche GST Rates"
              headers={['Category', 'Items', 'Rate']}
              rows={[
                ['Precious metals', 'Gold, silver, platinum, precious metal-clad base metals', '3%'],
                ['Jewellery', 'Jewellery and parts, goldsmiths\' and silversmiths\' wares, imitation jewellery, coins', '3%'],
                ['Precious stones', 'Rough and sawn diamonds; other precious and semi-precious stones (unstrung)', '0.25%'],
                ['Job work', 'Job work on diamonds', '1.5%'],
                ['Pan masala and tobacco', 'Pan masala, cigarettes, biris, manufactured tobacco', '28% (pending move to 40%)'],
              ]}
            />

            {/* SECTION 11 */}
            <h2 id="health-insurance" style={hStyle}>GST on Health and Life Insurance: Individual vs Group</h2>
            <p style={pStyle}>
              GST on individual health and life insurance dropped from 18% to nil, effective September 22, 2025. This covers every individual policy type: term life, ULIPs, endowment plans, and health policies including family floater and senior citizen plans, plus their reinsurance.
            </p>
            <p style={pStyle}>
              The exemption does not cover group insurance. A group health or life policy bought through an employer still carries 18% GST, since the Council&apos;s relief applies only to individual policyholders, not employer-sponsored group schemes.
            </p>
            <DataTable
              caption="GST on Insurance: Individual vs Group"
              headers={['Policy Type', 'GST Rate']}
              rows={[
                ['Individual health insurance (including family floater, senior citizen)', 'Nil'],
                ['Individual life insurance (term, ULIP, endowment)', 'Nil'],
                ['Group health insurance (employer-sponsored)', '18%'],
                ['Group life insurance (employer-sponsored)', '18%'],
              ]}
            />

            {/* SECTION 12 */}
            <h2 id="mobile-phones" style={hStyle}>GST on Mobile Phones</h2>
            <p style={pStyle}>
              Mobile phones are taxed at 18% GST under HSN code 8517 12 19. GST 2.0 did not change this: phones were already at 18% before September 2025, and the rate did not move.
            </p>
            <p style={pStyle}>
              Accessories bought separately, chargers, cases, and screen protectors, are taxed under their own HSN codes, most commonly also at 18%, but check the specific code rather than assuming it matches the phone&apos;s rate.
            </p>

            {/* SECTION 13 */}
            <h2 id="hsn-code" style={hStyle}>GST Rate by HSN Code: How to Find the Right Rate</h2>
            <p style={pStyle}>
              Every good and service under GST is classified by an HSN (Harmonised System of Nomenclature) or SAC (Services Accounting Code) code, and the rate is legally tied to that code, not to the product&apos;s common name.
            </p>
            <p style={pStyle}>
              Search the official GST rate finder at <a href="https://cbic-gst.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>cbic-gst.gov.in</a> by item name or HSN code for the current rate. The 99 HSN chapters group goods from live animals (Chapter 1) through services (Chapter 99), and Notification 09/2025-CTR is the current legal schedule mapping chapters to rates.
            </p>
            <h3 style={h3Style}>Commonly Searched HSN Chapters</h3>
            <DataTable
              caption="Selected HSN Chapters"
              headers={['Chapter', 'Covers']}
              rows={[
                ['Chapter 30', 'Drugs and pharmaceuticals'],
                ['Chapter 71', 'Pearls, diamonds, gold, platinum, jewellery'],
                ['Chapter 84', 'Industrial and household machinery'],
                ['Chapter 85', 'Electrical parts, electronics, mobile phones'],
                ['Chapter 87', 'Tractors and motor vehicles'],
                ['Chapter 94', 'Furniture, bedding, lighting'],
                ['Chapter 99', 'Services (mapped to SAC codes)'],
              ]}
            />

            {/* SECTION 14 */}
            <h2 id="notifications" style={hStyle}>Notifications That Implemented GST 2.0</h2>
            <p style={pStyle}>
              CBIC issued a series of notifications on September 17, 2025 to give legal effect to the Council&apos;s decisions. These are the ones that matter for rate lookups and compliance.
            </p>
            <DataTable
              caption="Key GST 2.0 Notifications, Dated September 17, 2025"
              headers={['Notification', 'What It Does']}
              rows={[
                ['09/2025-CTR', 'Supersedes 01/2017-CTR; sets the new rate schedules (5%, 18%, 40%, plus niche rates)'],
                ['10/2025-CTR', 'Supersedes 02/2017-CTR; expands the exemption list for agriculture, food, health and education'],
                ['11/2025-CTR', 'Raises the rate on petroleum and coal bed methane operations from 12% to 18%'],
                ['12/2025-CTR', 'Updates the rate reference for used motor vehicles to the new schedules'],
                ['13/2025-CTR', 'Sets 5% GST on handicrafts (woodcraft, embroidery, pottery, glassware) and 3% on silver filigree work'],
                ['15/2025-CTR', 'Revises service rates: several services move to 18%, others (tailoring, job work) move to 5%'],
                ['16/2025-CTR', 'Inserts the individual health and life insurance exemption'],
              ]}
            />

            {/* SECTION 15 */}
            <h2 id="how-to-calculate" style={hStyle}>How to Calculate GST: Formula and Example</h2>
            <p style={pStyle}>
              GST amount equals the taxable value multiplied by the applicable rate. The formula is the same regardless of which slab applies.
            </p>
            <DataTable
              caption="GST Calculation: Rs 10,000 Taxable Value at 18%"
              headers={['Step', 'Amount']}
              rows={[
                ['Taxable value', 'Rs 10,000'],
                ['GST rate', '18%'],
                ['GST amount (10,000 x 18%)', 'Rs 1,800'],
                ['Total invoice value', 'Rs 11,800'],
                ['If intra-state: CGST 9% + SGST 9%', 'Rs 900 + Rs 900'],
                ['If inter-state: IGST 18%', 'Rs 1,800'],
              ]}
              highlightLast={false}
            />
            <p style={pStyle}>
              To back-calculate GST already included in a price, divide the total by (1 + rate) to get the taxable value, then subtract that from the total to get the GST amount. On a Rs 11,800 GST-inclusive price at 18%, the taxable value is Rs 10,000 and the GST component is Rs 1,800.
            </p>

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: GST Rates in India</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="gst-rates-sidebar"
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
            {/* Ad banner */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, marginBottom: 20, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            {/* Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>GST 2.0 Quick Reference</div>
              {([
                ['Effective date', 'Sep 22, 2025'],
                ['Main slabs', '0%, 5%, 18%, 40%'],
                ['Gold and jewellery', '3%'],
                ['Rough diamonds', '0.25%'],
                ['Individual health/life insurance', 'Nil'],
                ['Group insurance', '18%'],
                ['Mobile phones', '18%'],
                ['Cement', '18%'],
                ['Pan masala, tobacco', '28% (pending 40%)'],
                ['Composition: traders', '1%'],
                ['TDS under GST', '2%'],
                ['TCS under GST', '0.5%'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Calculator CTA */}
            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/monthly-budget-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Monthly Budget Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/gst-number-search', 'GST Number Search: Verify Any GSTIN Online'],
                ['/blogs/tds-rate-chart', 'TDS Rate Chart FY 2026-27: Every Section and Rate'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date: Every Deadline You Need to Know'],
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

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .gst-rates-sidebar::-webkit-scrollbar { width: 5px; }
        .gst-rates-sidebar::-webkit-scrollbar-track { background: transparent; }
        .gst-rates-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .gst-rates-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

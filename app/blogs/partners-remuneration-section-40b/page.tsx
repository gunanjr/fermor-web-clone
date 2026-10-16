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

const SLUG = 'partners-remuneration-section-40b';
const URL = `https://fermor.in/blogs/${SLUG}`;
const PUBLISHED = '2026-10-12T10:59:09+05:30';
const INCOME_TAX_DEPT = 'https://www.incometax.gov.in';
const INDIA_CODE = 'https://www.indiacode.nic.in';

export const metadata: Metadata = {
  title: "Partner's Remuneration: Section 40(b) Limit & Tax (FY 2026-27)",
  description: "Partner's remuneration under Section 40(b): the Rs 3 lakh or 90% limit on the first Rs 6 lakh of book profit, 60% after that, 12% interest cap, worked examples, and 10% TDS under Section 194T.",
  keywords: "partner remuneration, partners remuneration, section 40b, section 40(b) of income tax act, remuneration to partners, partner remuneration limit, partner remuneration calculation, interest on partners capital, book profit, section 194t, tds on partner remuneration, partnership firm tax planning, remuneration tax, working partner, sleeping partner, llp partner remuneration",
  alternates: { canonical: URL },
  openGraph: {
    title: "Partner's Remuneration and Section 40(b): Limit, Book Profit and Tax | Fermor",
    description: "How much remuneration and interest a partnership firm can deduct for its partners, with the book profit formula, worked examples and Section 194T TDS.",
    type: 'article',
    url: URL,
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Partner's Remuneration and Section 40(b): Limit, Book Profit and Tax | Fermor",
    description: 'Section 40(b) limits, book profit formula, worked examples and TDS on partner payments.',
  },
};

const faqItems = [
  { q: `What is partner's remuneration?`, a: `Partner's remuneration is the salary, bonus or commission a partnership firm pays to a working partner for managing the business, as allowed by the partnership deed. It is separate from interest on capital and from the partner's share of profit.` },
  { q: `What is the maximum partner remuneration allowed under Section 40(b)?`, a: `The firm can deduct total remuneration to all working partners of Rs 3,00,000 or 90% of book profit, whichever is higher, on the first Rs 6,00,000 of book profit (or on a book loss), plus 60% of book profit above Rs 6,00,000. Anything above this ceiling is added back to the firm's income.` },
  { q: `Is the Section 40(b) limit per partner or for the whole firm?`, a: `The limit applies to the combined remuneration of all working partners, not to each partner separately. A firm with three working partners shares one ceiling between them in whatever ratio the deed specifies.` },
  { q: `What is book profit under Section 40(b)?`, a: `Book profit is the firm's business profit computed under the PGBP rules before any partner remuneration is deducted. In practice you take the profit shown in the profit and loss account, add back remuneration and interest paid to partners that were debited there, and then subtract the interest allowed under Section 40(b).` },
  { q: `What is the maximum interest on a partner's capital that a firm can deduct?`, a: `Simple interest of up to 12% per annum on the partner's capital is deductible, provided the partnership deed authorises it. Any interest paid above 12%, and any compound interest, is disallowed in the firm's hands.` },
  { q: `Can a sleeping partner receive remuneration?`, a: `No. Only a working partner, meaning an individual actively engaged in conducting the firm's business, can receive a deductible salary. A sleeping partner earns interest on capital, if the deed provides for it, and a share of profit.` },
  { q: `Can a company or an LLP be a working partner?`, a: `No. A non-individual partner such as a company cannot be a working partner, so remuneration paid to it is not deductible under Section 40(b).` },
  { q: `Does the partnership deed need to mention the remuneration?`, a: `Yes. The deed must either state the amount or lay down the method of computing it, and the remuneration must relate to a period after the deed was made or amended. A clause allowing salary to working partners up to the maximum permitted under the Income Tax Act is the usual way to satisfy this.` },
  { q: `Is partner remuneration taxable in the partner's hands?`, a: `Yes, to the extent it is allowed as a deduction to the firm, it is taxable for the partner as business or professional income. The portion disallowed in the firm's hands is not taxed again in the partner's hands.` },
  { q: `Is a partner's share of profit taxable?`, a: `No. The share of profit received by a partner from the firm is exempt under Section 10(2A) of the Income Tax Act, because the firm has already paid tax on it.` },
  { q: `Is TDS deducted on partner remuneration?`, a: `Yes, from 1 April 2025. Section 194T requires a partnership firm or LLP to deduct TDS at 10% on salary, remuneration, commission, bonus and interest paid or credited to a partner once the total for the financial year exceeds Rs 20,000. Older guides that say no TDS applies to partner payments predate this change.` },
  { q: `Does TDS under Section 194T apply to the partner's share of profit?`, a: `No. The share of profit is exempt in the partner's hands and is not a payment covered by Section 194T. The section covers only salary, remuneration, commission, bonus and interest.` },
  { q: `When must TDS on partner remuneration be deducted?`, a: `TDS must be deducted at the earlier of crediting the amount to the partner's account, including the capital account, or actually paying it. A book entry is enough to trigger the deduction even if no cash moves.` },
  { q: `Is Section 40(b) applicable to an LLP?`, a: `Yes. For income tax purposes an LLP is taxed like a partnership firm, so the same remuneration and interest limits apply to its working partners. Some guides wrongly say Section 40(b) does not apply to LLPs.` },
  { q: `Can a firm on presumptive taxation claim partner remuneration?`, a: `No separate deduction is allowed. A firm that pays tax on a presumptive basis under Section 44AD or 44ADA has its income computed as a fixed percentage of turnover or receipts, so remuneration and interest to partners are not claimed on top of that.` },
  { q: `What happens if remuneration exceeds the Section 40(b) limit?`, a: `The excess is disallowed and added to the firm's taxable income. The firm can still legally pay it to the partner under the Partnership Act, but it gets no tax deduction for it.` },
  { q: `Is it mandatory to pay interest on a partner's capital?`, a: `No. The deed decides whether interest is paid at all. If it is paid within 12% simple interest and as authorised by the deed, it is deductible for the firm.` },
  { q: `Can a partner claim a deduction for interest received on capital in the personal return?`, a: `No. The deduction belongs to the firm. In the partner's own return, the allowed interest is reported as business income.` },
  { q: `What is the tax rate for a partnership firm?`, a: `A partnership firm or LLP is taxed at a flat 30% on its income after the Section 40(b) adjustments, plus 4% health and education cess, with a surcharge of 12% where income exceeds Rs 1 crore. There are no slab rates or rebates for firms.` },
  { q: `How can a partnership firm plan tax on partner remuneration?`, a: `Draft the deed so that working partners are paid up to the full permitted limit, keep interest on capital at or below 12% simple, and have the firm's book profit computed correctly before fixing the remuneration. Paying exactly to the ceiling gives the firm the maximum deduction without any disallowance.` },
  { q: `What is Fermor?`, a: `Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, loans, and investments. It combines free calculators with guides on tax provisions that affect businesses, professionals, and salaried taxpayers.` },
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

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: `Partner's Remuneration: Section 40(b) Limit, Book Profit and Tax`,
  url: URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  about: [
    { '@type': 'Thing', name: 'Section 40(b) of the Income Tax Act' },
    { '@type': 'Thing', name: `Partner's remuneration` },
    { '@type': 'Thing', name: 'Section 194T TDS on payments to partners' },
  ],
  description: `Complete guide to partner's remuneration under Section 40(b): who is a working partner, the Rs 3 lakh or 90% limit on the first Rs 6 lakh of book profit and 60% above it, the 12% simple interest cap on capital, the book profit formula, worked examples with disallowance, how remuneration and profit share are taxed in the partner's hands, and the 10% TDS under Section 194T.`,
  articleSection: 'Income Tax',
  keywords: metadata.keywords as string,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: `Partner's Remuneration`, item: URL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: `How to Calculate the Maximum Partner Remuneration Under Section 40(b)`,
  description: `Step-by-step method to compute book profit and the maximum deductible remuneration for the working partners of a firm.`,
  totalTime: 'PT5M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Start with the profit in the P&L account', text: 'Take the net profit after all expenses, including any partner remuneration and interest debited.' },
    { '@type': 'HowToStep', position: 2, name: 'Add back partner remuneration and interest', text: 'Add the remuneration and the interest on capital that were debited to the profit and loss account.' },
    { '@type': 'HowToStep', position: 3, name: 'Subtract interest allowed under Section 40(b)', text: 'Deduct interest on capital up to 12% simple interest, if the deed authorises it. The result is book profit.' },
    { '@type': 'HowToStep', position: 4, name: 'Apply the limit on the first Rs 6 lakh', text: 'Take the higher of Rs 3,00,000 or 90% of book profit, applied to the first Rs 6,00,000 of book profit or to a book loss.' },
    { '@type': 'HowToStep', position: 5, name: 'Add 60% of the balance', text: 'Add 60% of any book profit above Rs 6,00,000 to get the maximum deductible remuneration for all working partners together.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL,
  name: `Partner's Remuneration and Section 40(b): Limit, Book Profit and Tax | Fermor`,
  url: URL,
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: `Partner's remuneration`,
      alternateName: 'Section 40(b) remuneration',
      description: `Salary, bonus or commission paid by a partnership firm to a working partner, deductible for the firm only up to the ceiling set by Section 40(b) of the Income Tax Act, 1961 and only if authorised by the partnership deed.`,
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Partners, partnership firms, LLPs, chartered accountants and tax professionals in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-remuneration', name: `What Is Partner's Remuneration` },
    { '@type': 'WebPageElement', cssSelector: '#working-partner', name: 'Working Partner vs Sleeping Partner' },
    { '@type': 'WebPageElement', cssSelector: '#section-40b-limit', name: 'Section 40(b) Limit' },
    { '@type': 'WebPageElement', cssSelector: '#book-profit', name: 'Book Profit Formula' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#conditions', name: 'Conditions for Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#interest-on-capital', name: 'Interest on Capital' },
    { '@type': 'WebPageElement', cssSelector: '#partner-taxation', name: 'Taxation in the Partner Hands' },
    { '@type': 'WebPageElement', cssSelector: '#tds-194t', name: 'TDS Under Section 194T' },
    { '@type': 'WebPageElement', cssSelector: '#llp-presumptive', name: 'LLPs and Presumptive Taxation' },
    { '@type': 'WebPageElement', cssSelector: '#tax-planning', name: 'Tax Planning' },
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
  knowsAbout: ['Section 40(b)', `Partner's Remuneration`, 'Section 194T', 'Partnership Firm Taxation', 'TDS', 'Income Tax'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const linkStyle: React.CSSProperties = { color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 };

const TOC_ITEMS = [
  { id: 'what-is-remuneration', label: 'What Is Remuneration' },
  { id: 'working-partner', label: 'Working vs Sleeping Partner' },
  { id: 'section-40b-limit', label: 'Section 40(b) Limit' },
  { id: 'book-profit', label: 'Book Profit Formula' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'conditions', label: 'Conditions for Deduction' },
  { id: 'interest-on-capital', label: 'Interest on Capital' },
  { id: 'partner-taxation', label: 'Tax in the Partner Hands' },
  { id: 'tds-194t', label: 'TDS Under Section 194T' },
  { id: 'llp-presumptive', label: 'LLPs and Presumptive Tax' },
  { id: 'tax-planning', label: 'Tax Planning' },
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

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <div style={{ marginBottom: 20 }}>
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

function InfoTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
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

function PromoBar({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
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


function FaqAccordion({ items }: { items: typeof faqItems }) {
  return (
    <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <details key={i} open={i === 0} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article explains Section 40(b) and Section 194T of the Income Tax Act for general informational purposes and is not tax advice. Deduction limits depend on your firm&apos;s partnership deed and computed book profit; consult a chartered accountant before fixing partner remuneration or filing. The Income Tax Act, 2025 replaces the 1961 Act from 1 April 2026 and renumbers its sections, so confirm the current section reference for your assessment year. Figures reflect the law as of the date above.
      </p>
    </div>
  );
}

export default function PartnersRemunerationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />

      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Partner&apos;s Remuneration</li>
            </ol>
          </nav>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Income Tax
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime={PUBLISHED} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 12, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Partner&apos;s Remuneration: Section 40(b) Limit, Book Profit and Tax
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              A partnership firm can deduct remuneration to its working partners up to Rs 3,00,000 or 90% of book profit on the first Rs 6,00,000 of book profit, plus 60% of book profit above that, under Section 40(b).
            </p>
            <p style={pStyle}>
              Interest on partner capital is deductible up to 12% simple interest. Both payments must be authorised by the partnership deed.
            </p>
            <p style={pStyle}>
              From 1 April 2025, the firm must also deduct 10% TDS on these payments under Section 194T once a partner crosses Rs 20,000 in a year, a rule many older guides still miss.
            </p>

            <TableOfContents />

            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official and calculator links for partner remuneration and firm taxation"
                headers={['Resource', 'Link']}
                rows={[
                  ['Income Tax Department (e-filing portal)', <Link key="l1" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={linkStyle}>incometax.gov.in</Link>],
                  ['Income Tax Act text (India Code)', <Link key="l2" href={INDIA_CODE} target="_blank" rel="noopener noreferrer" style={linkStyle}>indiacode.nic.in</Link>],
                  ['Work out TDS on partner payments', <Link key="l3" href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS Calculator</Link>],
                  ['Compute a partner\'s own tax on the income received', <Link key="l4" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Calculator</Link>],
                ]}
              />
            </div>

            <h2 id="what-is-remuneration" style={hStyle}>What Is Partner&apos;s Remuneration?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Partner&apos;s remuneration is the salary, bonus or commission a partnership firm pays to a working partner for managing the business, as permitted by the partnership deed.
              </p>
            </div>
            <p style={pStyle}>
              A partner can receive three kinds of return from the firm. Remuneration for work, interest on capital invested, and a share of profit.
            </p>
            <InfoTable
              caption="The three ways a partner is paid and how each is treated"
              headers={['Payment', 'Firm', 'Partner']}
              rows={[
                ['Remuneration (salary, bonus, commission)', 'Deductible up to the Section 40(b) limit', 'Taxable as business income, to the extent allowed to the firm'],
                ['Interest on capital', 'Deductible up to 12% simple interest', 'Taxable as business income, to the extent allowed to the firm'],
                ['Share of profit', 'Not deductible (paid out of taxed profit)', 'Exempt under Section 10(2A)'],
              ]}
            />

            <h2 id="working-partner" style={hStyle}>Working Partner vs Sleeping Partner: Who Can Be Paid Remuneration?</h2>
            <p style={pStyle}>
              Only a working partner can receive deductible remuneration, meaning an individual who is actively engaged in conducting the affairs of the firm&apos;s business.
            </p>
            <BulletList items={[
              <span key="w1"><strong>Working partner:</strong> invests in the firm and manages operations, partly or fully. Eligible for remuneration, interest and profit share.</span>,
              <span key="w2"><strong>Sleeping partner:</strong> contributes capital only and takes no part in management. Eligible for interest on capital, if the deed allows it, and profit share, but not a salary.</span>,
              <span key="w3"><strong>Non-individual partner:</strong> a company or another firm cannot be a working partner, so remuneration paid to it is not deductible.</span>,
            ]} />

            <h2 id="section-40b-limit" style={hStyle}>What Is the Maximum Remuneration Allowed Under Section 40(b)?</h2>
            <p style={pStyle}>
              The firm can deduct total remuneration to all working partners of Rs 3,00,000 or 90% of book profit, whichever is higher, on the first Rs 6,00,000 of book profit, and 60% of book profit beyond that.
            </p>
            <InfoTable
              caption="Section 40(b) remuneration ceiling (FY 2025-26 and FY 2026-27)"
              headers={['Book profit slice', 'Maximum remuneration']}
              rows={[
                ['First Rs 6,00,000 of book profit, or a book loss', 'Rs 3,00,000 or 90% of book profit, whichever is higher'],
                ['Balance of book profit above Rs 6,00,000', '60% of that balance'],
              ]}
            />
            <p style={pStyle}>
              The ceiling applies to the combined remuneration of all working partners, not to each partner. A firm with three working partners shares one limit between them in the ratio stated in the deed.
            </p>
            <p style={pStyle}>
              Anything paid above the ceiling is added back to the firm&apos;s income. The firm can still pay it to the partner, since the Partnership Act places no cap, but it gets no tax deduction for it.
            </p>

            <h2 id="book-profit" style={hStyle}>How to Calculate Book Profit for Section 40(b)</h2>
            <p style={pStyle}>
              Book profit is the firm&apos;s business profit before any partner remuneration is deducted, worked out in four steps from the profit and loss account.
            </p>
            <InfoTable
              caption="Book profit computation"
              headers={['Step', 'Item']}
              rows={[
                ['1', 'Net profit as per profit and loss account'],
                ['2', 'Add: remuneration to partners, if debited in the P&L account'],
                ['3', 'Add: interest paid to partners, if debited in the P&L account'],
                ['4', 'Less: interest allowed under Section 40(b) (up to 12% simple interest)'],
                ['=', 'Book profit'],
              ]}
            />
            <p style={pStyle}>
              In plain terms, book profit is the profit under the head Profits and Gains of Business or Profession, before the partners are paid for their work.
            </p>

            <PromoBar
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator"
              note="See how the remuneration you receive as a partner is taxed in your own return, under both regimes."
            />

            <h2 id="worked-examples" style={hStyle}>Partner Remuneration Calculation: Worked Examples</h2>
            <p style={pStyle}>
              The same formula gives very different ceilings at different profit levels, as the table below shows for firms of different sizes.
            </p>
            <InfoTable
              caption="Maximum deductible remuneration at different book profit levels"
              headers={['Book profit / (loss)', 'Calculation', 'Maximum remuneration']}
              rows={[
                ['Rs (2,00,000) loss', 'Higher of Rs 3,00,000 or 90% of nil', 'Rs 3,00,000'],
                ['Rs 2,00,000', 'Higher of Rs 3,00,000 or Rs 1,80,000', 'Rs 3,00,000'],
                ['Rs 6,00,000', 'Higher of Rs 3,00,000 or Rs 5,40,000', 'Rs 5,40,000'],
                ['Rs 7,00,000', 'Rs 5,40,000 + 60% of Rs 1,00,000', 'Rs 6,00,000'],
                ['Rs 9,00,000', 'Rs 5,40,000 + 60% of Rs 3,00,000', 'Rs 7,20,000'],
                ['Rs 20,00,000', 'Rs 5,40,000 + 60% of Rs 14,00,000', 'Rs 13,80,000'],
              ]}
            />
            <p style={pStyle}>
              Now a full example with a disallowance. A firm has two working partners and Rs 10,00,000 of total capital. Its deed allows interest on capital, and it pays 18% interest and Rs 12,00,000 of remuneration. After debiting both, the firm shows a profit of Rs 4,00,000.
            </p>
            <InfoTable
              caption="Full Section 40(b) computation with disallowance"
              headers={['Item', 'Amount']}
              rows={[
                ['Profit per P&L account', 'Rs 4,00,000'],
                ['Add: remuneration debited', 'Rs 12,00,000'],
                ['Add: interest debited (18% of Rs 10,00,000)', 'Rs 1,80,000'],
                ['Less: interest allowed (12% of Rs 10,00,000)', 'Rs (1,20,000)'],
                ['Book profit', 'Rs 16,60,000'],
                ['Maximum remuneration: Rs 5,40,000 + 60% of Rs 10,60,000', 'Rs 11,76,000'],
                ['Remuneration disallowed (Rs 12,00,000 less Rs 11,76,000)', 'Rs 24,000'],
                ['Interest disallowed (Rs 1,80,000 less Rs 1,20,000)', 'Rs 60,000'],
                ['Firm\'s taxable income (Rs 4,00,000 + Rs 24,000 + Rs 60,000)', 'Rs 4,84,000'],
                ['Tax at 30% plus 4% cess', 'Rs 1,51,008'],
              ]}
            />
            <p style={pStyle}>
              The disallowed Rs 84,000 stays out of the partners&apos; taxable income. Only the allowed Rs 11,76,000 of remuneration and Rs 1,20,000 of interest is taxed in their hands.
            </p>

            <h2 id="conditions" style={hStyle}>Conditions for Claiming the Remuneration Deduction</h2>
            <p style={pStyle}>
              A firm can claim the deduction only when all five conditions below are met.
            </p>
            <BulletList items={[
              <span key="c1"><strong>Working partners only:</strong> remuneration goes to individual working partners, not sleeping or non-individual partners.</span>,
              <span key="c2"><strong>Authorised by the deed:</strong> the deed must state the amount or the method of computing it. A clause allowing salary up to the maximum permitted under the Act is commonly used.</span>,
              <span key="c3"><strong>Prospective only:</strong> the remuneration must relate to a period starting on or after the date of the deed or its amendment, never earlier.</span>,
              <span key="c4"><strong>Within the limit:</strong> the total stays inside the Section 40(b) ceiling.</span>,
              <span key="c5"><strong>Current deed:</strong> if the deed is renewed or amended, the new terms govern the period they cover.</span>,
            ]} />

            <h2 id="interest-on-capital" style={hStyle}>Interest on Partner&apos;s Capital: Conditions and the 12% Cap</h2>
            <p style={pStyle}>
              A firm can deduct simple interest on partner capital up to 12% per annum, provided the partnership deed authorises it.
            </p>
            <BulletList items={[
              'The deed must approve the interest, and the period must start from the date of the deed.',
              'Interest above 12% a year is disallowed, and so is compound interest.',
              'Paying interest is never compulsory. Whether any is paid is a commercial decision under the deed.',
            ]} />
            <p style={pStyle}>
              One exception covers a person who is a partner in a representative capacity, acting for someone else. Interest the firm pays that person in a personal capacity is outside these limits and is allowed in full.
            </p>

            <h2 id="partner-taxation" style={hStyle}>How Remuneration and Profit Share Are Taxed in the Partner&apos;s Hands</h2>
            <p style={pStyle}>
              Remuneration and interest that the firm is allowed to deduct are taxable for the partner as business income, while any amount disallowed to the firm is not taxed again in the partner&apos;s hands.
            </p>
            <p style={pStyle}>
              The partner&apos;s share of profit is exempt under Section 10(2A) whether the partner is working or sleeping. The partner can still offset expenses against the allowed remuneration, and can use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Calculator</Link> to see the tax on the business income across both regimes.
            </p>

            <h2 id="tds-194t" style={hStyle}>TDS on Partner Remuneration: Section 194T</h2>
            <p style={pStyle}>
              Yes, a partnership firm or LLP must deduct 10% TDS on salary, remuneration, commission, bonus and interest paid or credited to a partner once the total for the financial year exceeds Rs 20,000.
            </p>
            <InfoTable
              caption="Section 194T at a glance"
              headers={['Point', 'Rule']}
              rows={[
                ['Effective from', '1 April 2025'],
                ['Payments covered', 'Salary, remuneration, commission, bonus and interest to a partner'],
                ['Rate', '10% (20% if the partner has not furnished a PAN, under Section 206AA)'],
                ['Threshold', 'Total of Rs 20,000 or less in the financial year: no TDS'],
                ['When to deduct', 'At the earlier of credit to the partner\'s account, including the capital account, or payment'],
                ['Not covered', 'Share of profit and capital withdrawals'],
              ]}
            />
            <p style={pStyle}>
              A firm that credits Rs 8,00,000 of remuneration and Rs 1,20,000 of capital interest to a partner in the year must deduct Rs 80,000 and Rs 12,000 respectively. The partner then claims the credit from Form 26AS when filing the return.
            </p>
            <p style={pStyle}>
              The rate and threshold are the same under the new Act: Section 194T moves into Section 393 from FY 2026-27, as the <Link href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS rate chart</Link> shows alongside every other TDS section. The general rules on deposit and return due dates are in the <Link href="/blogs/tds-tax-deducted-at-source" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS guide</Link>, and the <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS Calculator</Link> checks the amount on any payment.
            </p>

            <h2 id="llp-presumptive" style={hStyle}>Does Section 40(b) Apply to LLPs and Presumptive Taxation?</h2>
            <p style={pStyle}>
              Section 40(b) applies to LLPs, because an LLP is taxed as a partnership firm, but it does not give a separate deduction to a firm that pays tax on a presumptive basis.
            </p>
            <BulletList items={[
              <span key="l1"><strong>LLPs:</strong> the same remuneration and interest limits apply. Guides that say the section does not apply to LLPs are wrong.</span>,
              <span key="l2"><strong>Sections 44AD and 44ADA:</strong> a firm taxed on presumptive income does not claim partner remuneration and interest on top of the fixed percentage.</span>,
              <span key="l3"><strong>Directors, not partners:</strong> remuneration to a company director is a different matter, covered by Section 194J at 10% with no threshold in the <Link href="/blogs/section-194j-tds-professional-fees" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 194J guide</Link>.</span>,
            ]} />

            <h2 id="tax-planning" style={hStyle}>Tax Planning for a Partnership Firm: Getting the Most from Remuneration</h2>
            <p style={pStyle}>
              The best tax planning is to pay working partners up to the full Section 40(b) ceiling while keeping interest within 12% simple, since every rupee inside the limit cuts the firm&apos;s taxable income at 30%.
            </p>
            <BulletList items={[
              'Write the deed so that working partners can draw the maximum permitted salary, and amend it before the year starts, not after.',
              'Fix remuneration only after estimating book profit, so the amount does not exceed the ceiling and trigger a disallowance.',
              'Keep interest on capital at or below 12% simple, and avoid compounding.',
              'Deduct and deposit TDS under Section 194T on time, and file the quarterly statements by the due dates.',
              <span key="p5">Reconcile the partner credits against Form 26AS before the <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={linkStyle}>ITR due date</Link>.</span>,
            ]} />
            <p style={pStyle}>
              The firm itself pays a flat 30% plus cess, with no slab benefit. Partners on lower slabs may choose how much to draw as salary versus how much to leave as profit share, an area where a chartered accountant adds real value.
            </p>


            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Partner&apos;s Remuneration</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          <aside
            className="s40b-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20, flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Quick Reference</div>
              {([
                ['First Rs 6L of profit', 'Rs 3L or 90%'],
                ['Balance profit', '60%'],
                ['Interest on capital', '12% simple'],
                ['Salary goes to', 'Working partners'],
                ['Share of profit', 'Exempt'],
                ['TDS, Section 194T', '10% above Rs 20K'],
                ['No PAN TDS rate', '20%'],
                ['Firm tax rate', '30% + cess'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20, flexShrink: 0 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Tax Calculators</div>
                <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>TDS Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/tds-rate-chart', 'TDS Rate Chart FY 2026-27'],
                ['/blogs/section-194j-tds-professional-fees', 'Section 194J TDS on Professional Fees'],
                ['/blogs/tds-tax-deducted-at-source', 'TDS: Meaning, Due Dates and Returns'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date'],
              ] as [string, string][]).map(([href, title], i, arr) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: i < arr.length - 1 ? 12 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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
        .s40b-sidebar::-webkit-scrollbar { width: 5px; }
        .s40b-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s40b-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s40b-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

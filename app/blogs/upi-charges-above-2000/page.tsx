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
  title: 'UPI Charges Above Rs 2,000: New MDR Rule Explained',
  description: 'UPI charges above Rs 2,000 explained: a 0.4% MDR applies to select merchant payments from October 15, 2026, capped at Rs 300. Sending money and small shop payments stay free.',
  alternates: { canonical: 'https://fermor.in/blogs/upi-charges-above-2000' },
  openGraph: {
    title: 'UPI Charges Above Rs 2,000: New MDR Rule Explained - Fermor',
    description: 'From October 15, 2026, a 0.4% Merchant Discount Rate applies to select UPI merchant payments above Rs 2,000, capped at Rs 300. P2P transfers and small-merchant payments stay free.',
    type: 'article',
    publishedTime: '2026-09-22T19:55:58+05:30',
    modifiedTime: '2026-09-22T19:55:58+05:30',
    authors: ['Fermor Analysis'],
    tags: ['UPI', 'MDR', 'NPCI', 'RBI', 'Digital Payments India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPI Charges Above Rs 2,000 - Fermor',
    description: '0.4% MDR on select UPI merchant payments above Rs 2,000, effective October 15, 2026. What stays free, and who actually pays.',
  },
  keywords: [
    'upi charges', 'upi payment charges', 'charges on upi', 'upi mdr', 'upi mdr rules',
    'upi 2000 rule', 'upi merchant charges', 'upi charges above 2000', 'new upi rules 2026',
    'upi charges above rs 2000', 'credit card upi charges', 'upi credit card charges',
    'upi payment charges above 2000', 'upi transaction charges', 'npci upi mdr', 'rbi upi charges',
    'upi charges for merchants', 'is upi free', 'upi free or not', 'upi charges 2026', 'upi mdr rate',
    'p2m upi charges', 'merchant discount rate upi', 'upi charges october 2026',
    'upi mdr finance ministry clarification', 'upi payment gateway charges', 'upi charges news',
  ],
};

const faqItems = [
  { q: 'Will I be charged for sending money to a friend on UPI?', a: 'No. Person-to-person UPI transfers stay completely free irrespective of the amount, whether you send Rs 500 or Rs 5 lakh. The Merchant Discount Rate introduced from October 15, 2026 applies only to specified merchant (P2M) payments, never to person-to-person transfers.' },
  { q: 'What is the new UPI 2,000 rule?', a: 'Rs 2,000 is the threshold above which a Merchant Discount Rate of 0.4% applies to specified merchant UPI payments, effective October 15, 2026. It is not a limit on how much you can pay through UPI; you can still send or pay any amount, and the MDR itself is paid by the merchant, not the customer.' },
  { q: 'Will shopkeepers charge customers extra for UPI payments above Rs 2,000?', a: 'No. NPCI and the Finance Ministry have both stated that customers will not pay the MDR, and acquiring banks have been advised to ensure merchants do not pass this cost on to customers through a separate charge added at checkout.' },
  { q: 'Do small shopkeepers and street vendors have to pay MDR?', a: 'No. Small merchants covered under the Person-to-Person-Merchant (P2PM) framework, typically those receiving UPI QR payments of up to Rs 1 lakh a month, continue to pay zero MDR even on individual payments above Rs 2,000. A merchant is moved to the regular MDR-applicable category only after crossing this monthly threshold for three consecutive months.' },
  { q: 'How much MDR does a merchant pay on a Rs 10,000 UPI payment?', a: 'At 0.4%, the MDR on a Rs 10,000 eligible merchant payment is Rs 40. The customer still pays exactly Rs 10,000; the Rs 40 is deducted from what the merchant receives and split among the acquiring bank, the issuing bank, the UPI app, and the payment service provider.' },
  { q: 'Is there a cap on how much MDR a merchant pays per transaction?', a: 'Yes. MDR is capped at Rs 300 per transaction for payments of Rs 75,000 or more. Without the cap, 0.4% of Rs 1 lakh would be Rs 400, but the merchant pays only Rs 300 on any eligible transaction at or above Rs 75,000.' },
  { q: 'Is there a monthly limit on free UPI transactions for individuals?', a: 'No. Individuals have no monthly cap or quota on free UPI usage under this framework. NPCI and member banks separately enforce daily transaction limits (typically Rs 1 lakh to Rs 5 lakh depending on the use case) for security and risk management, but reaching that daily limit is unrelated to any charge.' },
  { q: 'What is the UPI charge on railway tickets, fuel, telecom or insurance payments?', a: 'These sectors, along with agricultural inputs, credit card bill payments, and specified tax payments, attract a flat Rs 5 per transaction above Rs 2,000 instead of the standard 0.4% MDR. This concessional flat fee reflects the thin margins in these categories.' },
  { q: 'What is the UPI MDR on mutual fund and stock market payments?', a: 'Payments to eligible capital market participants, stockbrokers, mutual fund transactions, and depository payments carry an MDR of 0.02%, capped at Rs 300 per transaction. This lower rate is meant to avoid discouraging retail participation in markets through higher transaction costs.' },
  { q: 'Who actually pays UPI MDR: the customer or the merchant?', a: 'The merchant pays it. Per NPCI\'s Operating Circular 237/2026-27, the 0.4% is split among four parties: the acquiring bank gets 0.12%, the issuing bank 0.16%, the UPI app 0.08%, and the payment service provider 0.04%. None of this is billed to the customer.' },
  { q: 'Does UPI MDR apply to credit card or RuPay credit card payments made through UPI?', a: 'Credit card bill payments made through UPI carry the flat Rs 5 concessional rate above Rs 2,000, the same as railways and telecom. A RuPay credit card linked to UPI and used to pay a merchant directly is governed by that card network\'s own merchant fee structure, separate from this MDR framework.' },
  { q: 'When does the new UPI MDR rule take effect?', a: 'October 15, 2026. NPCI notified the framework through Operating Circular 237/2026-27 on September 15, 2026, and the Ministry of Finance issued a clarification the same day confirming customers will not bear the cost.' },
  { q: 'What percentage of UPI transactions will actually be affected by MDR?', a: 'Around 4%. The Finance Ministry\'s clarification states that roughly 96% of merchant UPI transactions are either below Rs 2,000 or already covered by the zero-MDR small-merchant exemption, leaving only a small slice of high-value merchant payments subject to the new charge.' },
  { q: 'Was UPI completely free before this rule?', a: 'Yes, for every transaction type, since January 1, 2020, when the government mandated a zero-MDR regime across UPI to drive adoption. This is the first time since then that any UPI transaction category carries an MDR, and it still excludes P2P transfers and the bulk of merchant payments entirely.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculators and clarity platform for India, built to help people understand what a financial rule change like this actually costs them, and to connect them with the right product or professional once they know. The calculators are free to use; a free account lets you save your results.' },
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
  headline: 'UPI Charges Above Rs 2,000: New MDR Rule Explained',
  url: 'https://fermor.in/blogs/upi-charges-above-2000',
  datePublished: '2026-09-22T19:55:58+05:30',
  dateModified: '2026-09-22T19:55:58+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/upi-charges-above-2000' },
  articleSection: 'Regulation',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Organization', name: 'National Payments Corporation of India', sameAs: 'https://www.npci.org.in' },
    { '@type': 'Thing', name: 'Merchant Discount Rate', description: 'A fee charged to a merchant for processing a digital payment, set by NPCI under the new UPI framework effective October 15, 2026' },
  ],
  keywords: 'upi charges, upi mdr, upi 2000 rule, npci upi mdr, upi merchant charges, rbi upi charges',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'UPI Charges Above Rs 2,000', item: 'https://fermor.in/blogs/upi-charges-above-2000' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Check If a UPI Payment Will Attract MDR',
  description: 'Step-by-step process to work out whether the new Merchant Discount Rate framework applies to a given UPI payment.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check who is receiving the money', text: 'If the recipient is an individual (a person-to-person transfer), no MDR applies at any amount. If the recipient is a merchant or business, move to the next step.' },
    { '@type': 'HowToStep', position: 2, name: 'Check the payment amount', text: 'If the merchant payment is Rs 2,000 or less, no MDR applies. If it is above Rs 2,000, move to the next step.' },
    { '@type': 'HowToStep', position: 3, name: 'Check the merchant category', text: 'A small merchant under the P2PM framework (receiving up to Rs 1 lakh a month via UPI QR) pays zero MDR. Railways, fuel, telecom, insurance, agricultural inputs, credit card dues and tax payments pay a flat Rs 5. Capital market payments pay 0.02%, capped at Rs 300. Everything else pays 0.4%, capped at Rs 300 from Rs 75,000 upward.' },
    { '@type': 'HowToStep', position: 4, name: 'Confirm the customer pays nothing extra', text: 'Whatever the MDR works out to, it is deducted from the merchant\'s payout, never added to the amount the customer pays.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/upi-charges-above-2000',
  name: 'UPI Charges Above Rs 2,000: New MDR Rule Explained - Fermor',
  url: 'https://fermor.in/blogs/upi-charges-above-2000',
  inLanguage: 'en-IN',
  datePublished: '2026-09-22T19:55:58+05:30',
  dateModified: '2026-09-22T19:55:58+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Merchant Discount Rate',
    alternateName: 'MDR',
    description: 'The fee a merchant pays to the payment ecosystem for processing a digital transaction, expressed as a percentage of the transaction value.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Digital Payments Terms', url: 'https://fermor.in/blogs' },
    sameAs: ['https://en.wikipedia.org/wiki/Interchange_fee', 'https://www.wikidata.org/wiki/Q1145956'],
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'UPI users, merchants, small businesses, and finance professionals in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-the-rule', name: 'What Is the New UPI Charge Above Rs 2,000' },
    { '@type': 'WebPageElement', cssSelector: '#why-mdr', name: 'Why NPCI Introduced MDR' },
    { '@type': 'WebPageElement', cssSelector: '#rate-chart', name: 'UPI MDR Rate Chart' },
    { '@type': 'WebPageElement', cssSelector: '#p2p-transfers', name: 'Person-to-Person Transfers' },
    { '@type': 'WebPageElement', cssSelector: '#p2m-examples', name: 'Paying a Shop Above Rs 2,000' },
    { '@type': 'WebPageElement', cssSelector: '#small-merchants', name: 'Small Merchant Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#sector-exceptions', name: 'Flat Rs 5 Sectors' },
    { '@type': 'WebPageElement', cssSelector: '#capital-markets', name: 'Mutual Fund and Stock Market Payments' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-upi', name: 'Credit Card UPI Charges' },
    { '@type': 'WebPageElement', cssSelector: '#daily-limits', name: 'Daily and Monthly UPI Limits' },
    { '@type': 'WebPageElement', cssSelector: '#merchant-impact', name: 'Impact on Merchants' },
    { '@type': 'WebPageElement', cssSelector: '#who-pays', name: 'Who Pays the MDR' },
    { '@type': 'WebPageElement', cssSelector: '#official-notifications', name: 'Official Notifications' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-check', name: 'How to Check If MDR Applies' },
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
  knowsAbout: ['UPI India', 'Merchant Discount Rate', 'NPCI', 'Digital Payments India', 'RBI Regulations', 'Personal Finance India'],
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

function DataTable({ caption, headers, rows, highlightLast = false, rightAlignFrom }: {
  caption: string; headers: string[]; rows: (string | React.ReactNode)[][]; highlightLast?: boolean; rightAlignFrom?: number;
}) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 6, captionSide: 'top', paddingBottom: 6 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none', textAlign: rightAlignFrom !== undefined && i >= rightAlignFrom ? 'right' : 'left' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const isLast = highlightLast && ri === rows.length - 1;
            return (
              <tr key={ri} style={isLast ? { background: C.paleDg, fontWeight: 700 } : {}}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none', fontWeight: isLast ? 700 : undefined, textAlign: rightAlignFrom !== undefined && ci >= rightAlignFrom ? 'right' : 'left' }}>{cell}</td>
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
  { id: 'what-is-the-rule', label: 'What Is the New UPI Charge?' },
  { id: 'why-mdr', label: 'Why NPCI Introduced MDR' },
  { id: 'rate-chart', label: 'UPI MDR Rate Chart' },
  { id: 'p2p-transfers', label: 'Sending Money: Still Free' },
  { id: 'p2m-examples', label: 'Paying a Shop Above Rs 2,000' },
  { id: 'small-merchants', label: 'Small Merchant Exemption' },
  { id: 'sector-exceptions', label: 'Railways, Fuel, Telecom: Flat Rs 5' },
  { id: 'capital-markets', label: 'Mutual Fund and Stock Payments' },
  { id: 'credit-card-upi', label: 'Credit Card UPI Charges' },
  { id: 'daily-limits', label: 'Daily and Monthly Limits' },
  { id: 'merchant-impact', label: 'Impact on Merchants' },
  { id: 'who-pays', label: 'Who Actually Pays the MDR' },
  { id: 'official-notifications', label: 'Official Notifications' },
  { id: 'how-to-check', label: 'How to Check If MDR Applies' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> The Merchant Discount Rate framework is set by NPCI and endorsed by RBI, and is subject to change through future circulars. Always verify the current rate applicable to a specific transaction category against the official NPCI circular (<a href="https://www.npci.org.in/circulars/upi" target="_blank" rel="noopener noreferrer" style={linkStyle}>npci.org.in</a>) before relying on it for business pricing decisions. Fermor is not a payments advisory firm.
      </p>
    </div>
  );
}

export default function UPIChargesAbove2000Page() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>UPI Charges Above Rs 2,000</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Regulation
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime="2026-09-22T19:55:58+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Sep 22, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            UPI Charges Above Rs 2,000: New MDR Rule Explained
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              From October 15, 2026, a Merchant Discount Rate of 0.4% applies to select Person-to-Merchant UPI payments above Rs 2,000. Customers do not pay this charge; it is deducted from what the merchant receives, and is capped at Rs 300 per transaction.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Sending money to another person stays free at any amount, and so does paying a merchant up to Rs 2,000. Below: exactly who pays what, which categories are exempt, and how the numbers work out on a real bill.
            </p>

            <TableOfContents />

            {/* 1 */}
            <h2 id="what-is-the-rule" style={hStyle}>What Is the New UPI Charge Above Rs 2,000?</h2>
            <p style={pStyle}>
              It is not a charge on you as a customer. Rs 2,000 is the threshold above which the National Payments Corporation of India applies a Merchant Discount Rate to specified merchant UPI payments, and that fee is paid by the merchant, not deducted from the amount you send.
            </p>
            <p style={pStyle}>
              The change comes from NPCI&apos;s Operating Circular 237/2026-27, dated September 15, 2026, and takes effect from October 15, 2026. The Reserve Bank of India has backed the framework.
            </p>
            <p style={pStyle}>
              The Ministry of Finance issued a same-day clarification confirming that ordinary UPI users will not bear any part of this cost.
            </p>

            {/* 2 */}
            <h2 id="why-mdr" style={hStyle}>Why NPCI Introduced MDR on UPI Payments</h2>
            <p style={pStyle}>
              UPI has run on a zero-MDR regime since January 1, 2020, funded almost entirely by government incentive payments to banks rather than by transaction fees. That volume has since grown to a scale where the incentive model alone strains against the cost of running the network.
            </p>
            <p style={pStyle}>
              NPCI processed 24.51 billion transactions worth roughly Rs 29.82 lakh crore in August 2026 alone, per NPCI&apos;s own published data. Running that volume needs continuous investment in server capacity, fraud detection, and customer support.
            </p>
            <p style={pStyle}>
              A targeted MDR on high-value merchant payments is the funding mechanism NPCI chose, instead of raising costs across every transaction type.
            </p>

            {/* 3 */}
            <h2 id="rate-chart" style={hStyle}>UPI MDR Rate Chart: Charges by Transaction Type</h2>
            <p style={pStyle}>
              The rate that applies depends entirely on who is receiving the money and which merchant category they belong to, not on the amount alone.
            </p>
            <DataTable
              caption="UPI MDR Rate Chart, Effective October 15, 2026"
              headers={['Transaction Type', 'MDR Rate']}
              rows={[
                ['Person-to-person transfer, any amount', 'Nil'],
                ['Merchant payment up to Rs 2,000', 'Nil'],
                ['Small merchant under P2PM (up to Rs 1 lakh/month)', 'Nil'],
                ['Eligible merchant payment above Rs 2,000', '0.4%, capped at Rs 300'],
                ['Railways, telecom, insurance, fuel, agricultural inputs, credit card dues, tax payments above Rs 2,000', 'Flat Rs 5'],
                ['Capital market transactions (stockbrokers, mutual funds, depositories)', '0.02%, capped at Rs 300'],
                ['UPI AutoPay and recurring mandates', 'Nil under this framework'],
              ]}
            />

            {/* 4 */}
            <h2 id="p2p-transfers" style={hStyle}>Sending Money to Friends and Family: Still Free</h2>
            <p style={pStyle}>
              Person-to-person UPI transfers remain free at any amount. Whether you send Rs 500 to split a dinner bill or Rs 5 lakh to a family member, no MDR applies, and none of this framework touches that transaction type.
            </p>
            <p style={pStyle}>
              The government has stated that P2P transfers account for around 70% of the total value moved through UPI, and that entire category is excluded from the MDR framework by design, not by exemption.
            </p>

            {/* 5 */}
            <h2 id="p2m-examples" style={hStyle}>Paying a Shop Above Rs 2,000: What You Actually Pay</h2>
            <p style={pStyle}>
              The customer pays exactly the sticker price, every time. The MDR is calculated on the merchant&apos;s side and comes out of what the merchant receives, not what leaves your account.
            </p>
            <DataTable
              caption="MDR on a Sample Eligible Merchant Payment"
              headers={['Amount Paid by Customer', 'MDR Paid by Merchant (0.4%)']}
              rows={[
                ['Rs 2,000', 'Rs 0'],
                ['Rs 3,000', 'Rs 12'],
                ['Rs 10,000', 'Rs 40'],
                ['Rs 50,000', 'Rs 200'],
                ['Rs 75,000', 'Rs 300 (cap reached)'],
                ['Rs 1,00,000', 'Rs 300 (capped, not Rs 400)'],
              ]}
              highlightLast
              rightAlignFrom={1}
            />
            <p style={pStyle}>
              At exactly Rs 75,000, 0.4% works out to Rs 300, which is also where the cap kicks in. Every eligible payment above that amount still costs the merchant Rs 300 flat, never more.
            </p>

            {/* 6 */}
            <h2 id="small-merchants" style={hStyle}>Are Small Merchants and Street Vendors Exempt?</h2>
            <p style={pStyle}>
              Yes. Merchants covered under the Person-to-Person-Merchant (P2PM) framework, broadly small vendors and neighbourhood shops receiving UPI QR payments of up to Rs 1 lakh a month, continue to pay zero MDR, even when a single payment from a customer exceeds Rs 2,000.
            </p>
            <p style={pStyle}>
              One high-value payment does not automatically move a merchant into the MDR-liable category. Banks and payment service providers track monthly UPI receipts, and a merchant is reclassified out of P2PM only after crossing Rs 1 lakh a month for three consecutive months.
            </p>
            <CalcCTA
              href="/calculators/business-loan-eligibility-calculator"
              label="Business Loan Eligibility Calculator"
              note="Check how much working capital your business can raise if MDR or a growing customer base changes your monthly cash flow."
            />

            {/* 7 */}
            <h2 id="sector-exceptions" style={hStyle}>Railways, Fuel, Telecom, Insurance and Tax Payments: Flat Rs 5</h2>
            <p style={pStyle}>
              A specific set of thin-margin, high-frequency sectors pay a flat Rs 5 per transaction above Rs 2,000 instead of the standard 0.4%. This concessional rate covers railways, telecom, insurance, fuel, agricultural inputs, credit card bill payments, and specified tax payments.
            </p>
            <BulletList items={[
              'A Rs 5,000 railway ticket booked through UPI costs the merchant Rs 5 in MDR, not Rs 20.',
              'A Rs 3,000 fuel payment at a UPI-enabled pump costs the merchant Rs 5, not Rs 12.',
              'A Rs 15,000 credit card bill paid via UPI costs the biller Rs 5, not Rs 60.',
              'The flat fee does not scale with the transaction amount within this category, unlike the 0.4% rate elsewhere.',
            ]} />

            {/* 8 */}
            <h2 id="capital-markets" style={hStyle}>UPI Charges for Mutual Funds and Stock Market Payments</h2>
            <p style={pStyle}>
              Payments to stockbrokers, mutual fund transactions, and depository-linked payments carry a lower MDR of 0.02%, capped at Rs 300 per transaction. This is roughly a twentieth of the standard 0.4% rate.
            </p>
            <p style={pStyle}>
              The lower rate exists specifically to avoid discouraging retail participation in markets. A Rs 50,000 mutual fund SIP top-up through UPI would carry an MDR of Rs 10 under this rate, compared to Rs 200 under the standard rate.
            </p>
            <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Use the CAGR Calculator
            </Link>
            <span style={{ ...pStyle, display: 'inline' }}> to check how a Rs 10 to Rs 300 transaction fee actually compares to the long-run return on the investment itself, before treating it as a meaningful cost.</span>

            {/* 9 */}
            <h2 id="credit-card-upi" style={hStyle}>UPI Charges on Credit Cards and RuPay Credit Card Payments</h2>
            <p style={pStyle}>
              Credit card bill payments made through UPI, for example paying off an HDFC or ICICI credit card statement using a UPI app, carry the flat Rs 5 concessional rate above Rs 2,000, the same treatment as railways and telecom.
            </p>
            <p style={pStyle}>
              This is different from a RuPay credit card linked to UPI and swiped or scanned directly at a merchant to make a purchase. That transaction uses the RuPay network&apos;s own interchange and merchant fee structure, which predates this MDR framework and is not covered by it.
            </p>

            {/* 10 */}
            <h2 id="daily-limits" style={hStyle}>Is There a Daily or Monthly Limit on Free UPI Payments?</h2>
            <p style={pStyle}>
              No. There is no monthly quota, volume cap, or tiered limit on free UPI usage for individuals under this framework. The Rs 2,000 figure is an MDR threshold for merchant payments, not a usage limit of any kind.
            </p>
            <p style={pStyle}>
              Separately, NPCI and member banks enforce daily transaction limits, typically ranging from Rs 1 lakh to Rs 5 lakh depending on the bank and use case, purely for security and fraud control.
            </p>
            <p style={pStyle}>
              Hitting that daily limit means you cannot transact further until it resets. It does not mean you owe a fee.
            </p>
            <CalcCTA
              href="/calculators/monthly-budget-calculator"
              label="Monthly Budget Calculator"
              note="Track where your UPI spending actually goes each month, separate from any MDR your merchants may be absorbing."
            />

            {/* 11 */}
            <h2 id="merchant-impact" style={hStyle}>What Changes for Merchants From October 15, 2026</h2>
            <p style={pStyle}>
              A merchant accepting UPI payments above Rs 2,000, and not covered by the P2PM small-merchant exemption, starts absorbing a 0.4% cost on each such payment from October 15, 2026, capped at Rs 300.
            </p>
            <p style={pStyle}>
              Banks have been explicitly advised not to let merchants pass this on to customers as a separate line-item charge.
            </p>
            <p style={pStyle}>
              A merchant&apos;s actual response, adjusting margins, watching monthly UPI receipts to stay under the P2PM threshold, or simply absorbing the cost, is a business decision each merchant has to make on their own numbers.
            </p>
            <Link href="/calculators/cashback-earnings-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Run the Cashback Earnings Calculator
            </Link>
            <span style={{ ...pStyle, display: 'inline' }}> to see whether a card-based payment channel&apos;s rewards still beat UPI once you account for what each side of a transaction actually costs.</span>

            {/* 12 */}
            <h2 id="who-pays" style={hStyle}>Who Actually Pays the MDR: Customer or Merchant?</h2>
            <p style={pStyle}>
              The merchant pays it, in full, every time. Per NPCI&apos;s Operating Circular 237/2026-27, the 0.4% is not a single fee kept by one company; it is split across four participants in the payment chain.
            </p>
            <DataTable
              caption="How the 0.4% MDR Is Split"
              headers={['Recipient', 'Share']}
              rows={[
                ['Acquiring bank', '0.12%'],
                ['Issuing bank', '0.16%'],
                ['UPI app', '0.08%'],
                ['Payment service provider', '0.04%'],
                ['Total', '0.40%'],
              ]}
              highlightLast
              rightAlignFrom={1}
            />
            <Callout>
              A portion of total MDR collections is set aside for a dedicated fund promoting UPI adoption among small businesses, per the Finance Ministry&apos;s clarification, so a slice of this fee flows back into expanding low-cost UPI acceptance rather than only covering existing infrastructure.
            </Callout>

            {/* 13 */}
            <h2 id="official-notifications" style={hStyle}>NPCI Circular and RBI Backing: Official Notifications</h2>
            <p style={pStyle}>
              NPCI notified the full MDR framework through Operating Circular 237/2026-27 on September 15, 2026, endorsed by the UPI and Services Steering Committee, and it is published at <a href="https://www.npci.org.in/circulars/upi" target="_blank" rel="noopener noreferrer" style={linkStyle}>npci.org.in</a>.
            </p>
            <p style={pStyle}>
              The Reserve Bank of India has backed the framework as consistent with its broader digital payments oversight.
            </p>
            <p style={pStyle}>
              The Ministry of Finance issued its own clarification the same day, stating that customers will not be charged MDR and that roughly 96% of merchant UPI transactions remain unaffected because they are either below Rs 2,000 or already covered by the small-merchant exemption.
            </p>

            {/* 14 */}
            <h2 id="how-to-check" style={hStyle}>How to Check If a UPI Payment Will Attract MDR</h2>
            <p style={pStyle}>
              Four checks, in order, tell you whether a given UPI payment carries any MDR at all, and if so, how much.
            </p>
            <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Check who is receiving the money:</strong> a person-to-person transfer never carries MDR, at any amount.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Check the amount:</strong> a merchant payment of Rs 2,000 or less never carries MDR either.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Check the merchant category:</strong> a small P2PM merchant pays nil, specified sectors pay a flat Rs 5, capital market payments pay 0.02%, and everything else pays 0.4%, all capped at Rs 300.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Confirm the customer side is unaffected:</strong> whatever the MDR works out to, it comes out of the merchant&apos;s payout, never added to what the customer pays.
              </li>
            </ol>

            <CalcCTA
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator"
              note="UPI receipts feed straight into a business's taxable turnover. Check your income tax liability for FY 2026-27 under both regimes."
            />

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: UPI Charges Above Rs 2,000</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="upi-mdr-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>UPI MDR Quick Reference</div>
              {([
                ['Effective date', 'Oct 15, 2026'],
                ['P2P transfers', 'Nil, any amount'],
                ['Merchant payment up to Rs 2,000', 'Nil'],
                ['Standard merchant MDR', '0.4%'],
                ['MDR cap per transaction', 'Rs 300'],
                ['Small merchant (P2PM) limit', 'Rs 1 lakh/month'],
                ['Railways, fuel, telecom, insurance', 'Flat Rs 5'],
                ['Capital market MDR', '0.02%'],
                ['Who pays', 'Merchant, not customer'],
                ['Aug 2026 UPI volume', '24.51 billion txns'],
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
                <Link href="/calculators/business-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Business Loan Eligibility</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/cashback-earnings-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Cashback Earnings Calculator</span>
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
                ['/blogs/rbi-financial-product-mis-selling-rules', 'RBI Financial Product Mis-Selling Rules: What Banks Must Now Do'],
                ['/blogs/gst-rates', 'GST Rates in India: Complete List of Tax Slabs'],
                ['/blogs/epfo-8-25-percent-interest-rate-fy26', 'EPFO 8.25% Interest Rate Retained for FY26'],
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
        .upi-mdr-sidebar::-webkit-scrollbar { width: 5px; }
        .upi-mdr-sidebar::-webkit-scrollbar-track { background: transparent; }
        .upi-mdr-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .upi-mdr-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

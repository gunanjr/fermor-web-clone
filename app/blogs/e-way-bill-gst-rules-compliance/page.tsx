import { PageNav } from '../../../src/components/common/PageNav';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import type { Metadata } from 'next';
import Link from 'next/link';

const SLUG = 'e-way-bill-gst-rules-compliance';
const PAGE_URL = `https://fermor.in/blogs/${SLUG}`;
const PUBLISHED = '2026-10-13T18:35:25+05:30';
const MODIFIED = '2026-10-13T19:09:44+05:30';
const TITLE = 'E-Way Bill Rules, Limit, Validity and Generation';
const DESCRIPTION =
  'Understand the e-way bill limit, GST applicability, state thresholds, validity, documents, generation steps, exemptions and penalties for goods transport.';

const C = {
  dark: '#111111',
  green: '#101214',
  ink: '#333333',
  ink2: '#555555',
  ink3: '#888888',
  border: '#E5E5E5',
  bg: '#F7F7F7',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${TITLE} - Fermor`,
    description: DESCRIPTION,
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ['Fermor Analysis'],
    tags: ['E-Way Bill', 'GST Compliance', 'Goods Transport', 'GSTN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} - Fermor`,
    description: DESCRIPTION,
  },
  keywords: [
    'e-way bill',
    'e way bill',
    'e way bill generation',
    'e way bill generate',
    'generate e way bill',
    'bulk e way bill generation',
    'e way bill system',
    'gst e way bill',
    'e way bill generate online',
    'how to generate e way bill online',
    'e way bill portal',
    'generate e way bill online',
    'create e way bill',
    'e way bill format',
    'eway bill',
    'eway bill generate',
    'eway bill generation',
    'eway bill portal gst',
    'eway bill portal login',
    'e-way bill rules',
    'e-way bill limit',
    'e-way bill applicability',
    'e-way bill generation',
    'how to generate e-way bill',
    'e-way bill validity',
    'e-way bill validity distance',
    'e-way bill documents required',
    'e-way bill for interstate movement',
    'intrastate e-way bill limit',
    'state wise e-way bill limit',
    'e-way bill threshold',
    'e-way bill gst',
    'GST EWB-01',
    'e-way bill Part A and Part B',
    'e-way bill exemption',
    'e-way bill penalty',
    'consolidated e-way bill',
    'e-way bill for unregistered person',
    'e-way bill 180 days rule',
  ],
};

const faqItems = [
  {
    q: 'What is an e-way bill?',
    a: 'An e-way bill is an electronic document generated for the movement of goods under GST. It records consignment and transport details and carries a unique E-Way Bill Number.',
  },
  {
    q: 'What is the e-way bill limit in India?',
    a: 'The general threshold is a consignment value exceeding Rs 50,000. State or Union Territory rules can set different thresholds for movement within the state.',
  },
  {
    q: 'Is an e-way bill required for every movement of goods?',
    a: 'An e-way bill is generally required when goods are moved for supply, for reasons other than supply, or due to an inward supply from an unregistered person, subject to the threshold and exemptions in the rules.',
  },
  {
    q: 'Who has to generate an e-way bill?',
    a: 'The registered supplier or recipient is responsible in the circumstances set out in Rule 138. If they have not generated it, the transporter may have to generate it using the information supplied.',
  },
  {
    q: 'Can an unregistered person generate an e-way bill?',
    a: 'An unregistered supplier can be involved in an e-way bill movement, but when supplying a registered recipient the recipient is responsible for the compliance treated as if they were the supplier. Transporters may enrol to generate bills for clients.',
  },
  {
    q: 'How long is an e-way bill valid?',
    a: 'For regular cargo, validity is generally one day for up to 200 kilometres and one additional day for every further 200 kilometres or part. Over Dimensional Cargo uses a 20-kilometre distance unit.',
  },
  {
    q: 'When does e-way bill validity begin?',
    a: 'Validity starts when Part B transport details are entered for the first time, such as the vehicle number or transport document details.',
  },
  {
    q: 'Can I generate an e-way bill for an old invoice?',
    a: 'The GSTN advisory effective from 1 January 2025 limits e-way bill generation to documents dated within 180 days of generation. Check the current advisory before processing older documents.',
  },
  {
    q: 'Can one e-way bill cover multiple invoices?',
    a: 'A single e-way bill is generally tied to one document. A transporter may generate a Consolidated E-Way Bill to group multiple e-way bills for goods carried in one vehicle.',
  },
  {
    q: 'Is an e-way bill required for services?',
    a: 'The e-way bill rules concern the movement of goods, not a service supply by itself. A goods movement connected with a service transaction may still need separate assessment under the rules.',
  },
  {
    q: 'Can Part B be left blank for a short distance?',
    a: 'Part B is generally not required when the transporter-to-consignor or transporter-to-recipient distance is under 50 kilometres within the same state, subject to the specific conditions in Rule 138.',
  },
  {
    q: 'What is the penalty for not carrying a valid e-way bill?',
    a: 'The consequences depend on the breach and the applicable GST provisions. Detention and release penalties are not a single flat amount for every e-way bill error, so check the relevant law and facts before calculating a liability.',
  },
  {
    q: 'Can an e-way bill be cancelled or extended?',
    a: 'The portal provides cancellation and validity-extension processes subject to statutory time limits, conditions and authorised users. Check the live GSTN instructions for the transaction before taking action.',
  },
  {
    q: 'Can I generate an e-way bill by SMS or mobile?',
    a: 'GSTN provides mobile and SMS facilities for eligible registered users after the required registration on the e-way bill system. Check the current portal instructions for supported commands and access.',
  },
  {
    q: 'Can I generate e-way bills in bulk?',
    a: 'Eligible businesses can use the portal’s bulk upload or approved system integration options to generate multiple e-way bills. Prepare the data in the format currently specified by GSTN before uploading.',
  },
  {
    q: 'Where do I log in to the e-way bill portal?',
    a: 'Start at the official GST portal and follow its current e-way bill service link. Use the registered taxpayer or transporter credentials and follow the authentication steps shown by GSTN.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an India-focused financial platform with practical guides and free-to-use calculators. A free account is available to save calculation results. Fermor helps people understand financial decisions and connect with relevant financial products.',
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: `${TITLE} - Fermor`,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  articleSection: 'Government & Utility Services',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'E-Way Bill', description: 'An electronic compliance document for the movement of goods under GST in India.' },
    { '@type': 'Thing', name: 'Goods and Services Tax', description: 'India’s indirect tax system for the supply of goods and services.' },
  ],
  keywords: 'e-way bill, e-way bill limit, e-way bill rules, e-way bill validity, e-way bill generation, GST compliance',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'E-Way Bill Rules', item: PAGE_URL },
  ],
};

const sections = [
  { id: 'overview', name: 'What Is an E-Way Bill?' },
  { id: 'applicability', name: 'When Is an E-Way Bill Required?' },
  { id: 'threshold', name: 'E-Way Bill Limit and State Thresholds' },
  { id: 'responsibility', name: 'Who Generates an E-Way Bill?' },
  { id: 'documents', name: 'Documents and Details Required' },
  { id: 'generation', name: 'How to Generate an E-Way Bill Online' },
  { id: 'validity', name: 'E-Way Bill Validity and Distance' },
  { id: 'exemptions', name: 'When an E-Way Bill Is Not Required' },
  { id: 'recent-changes', name: 'Recent GSTN E-Way Bill Updates' },
  { id: 'penalty', name: 'Penalties and Common Errors' },
  { id: 'faq', name: 'Frequently Asked Questions' },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: `${TITLE} - Fermor`,
  url: PAGE_URL,
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    ...sections.map(({ id, name }) => ({ '@type': 'WebPageElement', cssSelector: `#${id}`, name })),
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor helps people make financial decisions with practical tools and product information.',
  knowsAbout: ['GST Compliance', 'E-Way Bill Rules', 'Goods Transport', 'GSTN'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, margin: '0 0 16px' };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 21, fontWeight: 700, color: C.green, lineHeight: 1.3, margin: '36px 0 14px' };
const linkStyle: React.CSSProperties = { color: C.green, fontWeight: 600, textDecoration: 'none' };

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p style={pStyle}>{children}</p>;
}

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%', margin: '20px 0 24px' }}>
      <table style={{ width: '100%', minWidth: 620, borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontFamily: INTER, fontSize: 13, color: C.ink }}>
        <caption style={{ textAlign: 'left', padding: '0 0 10px', color: C.ink2, fontSize: 13 }}>{caption}</caption>
        <thead>
          <tr>{headers.map((header, index) => <th key={header} scope="col" style={{ padding: '11px 12px', textAlign: 'left', fontWeight: 700, color: C.ink, borderBottom: `2px solid ${C.border}`, borderRight: index < headers.length - 1 ? `1px solid ${C.border}` : 'none', background: '#f1f3f4' }}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={cellIndex} style={{ padding: '11px 12px', verticalAlign: 'top', borderBottom: `1px solid ${C.border}`, borderRight: cellIndex < row.length - 1 ? `1px solid ${C.border}` : 'none', background: index % 2 ? '#FAFAFA' : '#fff' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqAccordion() {
  return (
    <div className="eway-faq" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', marginTop: 18 }}>
      {faqItems.map((item, index) => (
        <details key={item.q} style={{ borderBottom: index < faqItems.length - 1 ? `1px solid ${C.border}` : 'none' }}>
          <summary style={{ cursor: 'pointer', padding: '15px 18px', fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.dark, lineHeight: 1.4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none' }}>
            <span style={{ paddingRight: 12 }}>{item.q}</span>
            <svg className="chevron" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: 'transform 160ms ease' }}><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <div style={{ padding: '0 18px 16px', background: '#fff' }}>
            <p style={{ ...pStyle, margin: 0, color: C.ink2 }}>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '4px 0 28px', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>On this page</span>
      </div>
      <div className="eway-toc-links" style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 2 }}>
        {sections.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} target="_blank" rel="noopener noreferrer" className="eway-toc-link" style={{ fontSize: 13, color: C.ink2, textDecoration: 'none', padding: '7px 10px', borderRadius: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: C.ink3, fontWeight: 600, flexShrink: 0 }}>{String(index + 1).padStart(2, '0')}</span>
            {item.name}
          </a>
        ))}
      </div>
    </nav>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>;
}

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 18, marginTop: 30 }}>
      <p style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This guide is general information, not GST or legal advice. Thresholds, exemptions and portal workflows can change through legislation, notifications and GSTN advisories. Confirm the current rule and state notification on the{' '}
        <ExternalLink href="https://www.gst.gov.in/">GST portal</ExternalLink> or the{' '}
        <ExternalLink href="https://cbic-gst.gov.in/">CBIC website</ExternalLink> before moving goods.
      </p>
    </div>
  );
}

export default function EWayBillGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />

      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <nav aria-label="Breadcrumb" style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px', fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
          <Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link>
          <span aria-hidden="true"> › </span>
          <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link>
          <span aria-hidden="true"> › </span>
          <span aria-current="page" style={{ color: C.ink2 }}>E-Way Bill Rules</span>
        </nav>
      </div>

      <header style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '34px 24px 28px' }}>
          <span style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: '.08em', textTransform: 'uppercase' }}>Government &amp; Utility Services</span>
          <h1 style={{ maxWidth: 900, margin: '12px 0 14px', fontFamily: POPPINS, fontSize: 'clamp(24px, 3.2vw, 34px)', lineHeight: 1.2, color: C.green }}>
            E-Way Bill Under GST: Rules, Limit, Validity and How to Generate
          </h1>
          <p style={{ maxWidth: 820, margin: '0 0 16px', fontFamily: INTER, fontSize: 16.5, lineHeight: 1.7, color: C.ink2 }}>
            An e-way bill records the movement of goods under GST. Learn when the Rs 50,000 threshold applies, who must generate the bill, how validity works and which state rules to check.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontFamily: INTER, fontSize: 13, color: C.ink3 }}>
            <time dateTime={MODIFIED}>Updated Oct 13, 2026</time><span aria-hidden="true">·</span><span>11 min read</span><span aria-hidden="true">·</span><span>Fermor Analysis</span>
          </div>
        </div>
      </header>

      <div className="eway-grid" style={{ maxWidth: 1160, margin: '0 auto', padding: '34px 24px 72px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 290px', gap: 40, alignItems: 'start' }}>
        <article itemScope itemType="https://schema.org/Article" style={{ minWidth: 0, fontFamily: INTER }}>
          <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
            An e-way bill is a GST document for transporting goods. Under Section 68 of the CGST Act and Rule 138 of the CGST Rules, it is generally required before movement when the consignment value exceeds Rs 50,000, subject to state rules and listed exceptions.
          </p>
          <Paragraph>
            The bill records consignment and transport information and produces a unique E-Way Bill Number. The exact obligation depends on the movement, parties, value, route, goods and current state or Union Territory notification.
          </Paragraph>
          <TableOfContents />

          <h2 id="overview" style={hStyle}>What Is an E-Way Bill?</h2>
          <Paragraph>
            An e-way bill is an electronic record of goods movement under GST, prescribed by Rule 138 of the{' '}
            <ExternalLink href="https://cbic-gst.gov.in/">Central Goods and Services Tax Rules, 2017</ExternalLink>. The rules are made under Section 68 of the CGST Act, which authorises the government to require documents for movement of goods.
          </Paragraph>
          <Paragraph>
            The e-way bill is generated in Form GST EWB-01. Once submitted, the system assigns an EBN that the supplier, recipient and transporter can use to identify the movement.
          </Paragraph>
          <DataTable caption="Core e-way bill details" headers={['Item', 'What it records']} rows={[
            ['Part A', 'Invoice or challan, goods, recipient, delivery place, value and reason for movement'],
            ['Part B', 'Vehicle or transport document details, depending on the mode'],
            ['EBN', 'Unique number generated after the required details are submitted'],
            ['Legal basis', 'Section 68 of the CGST Act and Rule 138 of the CGST Rules'],
          ]} />
          <Paragraph>
            A GST-inclusive invoice may affect the consignment value used for the threshold. The <Link href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST Calculator</Link> can help separate tax from a gross price when checking your invoice records; confirm the statutory value from the actual document and current rules.
          </Paragraph>

          <h2 id="applicability" style={hStyle}>When Is an E-Way Bill Required?</h2>
          <Paragraph>
            An e-way bill is generally required when a consignment value exceeds Rs 50,000 and goods move in relation to a supply, for a reason other than supply, or because of an inward supply from an unregistered person.
          </Paragraph>
          <Paragraph>
            The obligation can apply to a sale, stock transfer, return, job-work movement or other movement covered by the rules. It is not limited to a conventional sale where ownership changes hands.
          </Paragraph>
          <Paragraph>
            Some movements have special rules even below the general threshold. For example, inter-state movement of goods by a principal to a job worker and specified inter-state handicraft movements are subject to separate requirements. Check the relevant rule and notification for the goods and route.
          </Paragraph>
          <DataTable caption="Common e-way bill applicability checks" headers={['Check', 'General position']} rows={[
            ['Consignment value above Rs 50,000', 'Generally requires an e-way bill, subject to exemptions and local rules'],
            ['Movement within one state', 'State or Union Territory threshold may differ'],
            ['Inter-state job-work movement', 'May require an e-way bill regardless of value'],
            ['Movement not connected to a sale', 'Can still be covered by the rules'],
            ['Transport by a non-motorised conveyance', 'Listed among the rule-based exceptions'],
          ]} />

          <h2 id="threshold" style={hStyle}>E-Way Bill Limit and State Thresholds</h2>
          <Paragraph>
            The standard inter-state e-way bill threshold is Rs 50,000, while intrastate thresholds and exemptions can vary by state or Union Territory. A national threshold table can become stale when local notifications change.
          </Paragraph>
          <Paragraph>
            Before dispatch, check the latest state-specific notification through the official GST portal or CBIC. Do not assume that a higher intrastate limit in one state applies in another, or that an exemption for particular goods covers every movement.
          </Paragraph>
          <Paragraph>
            The consignment value is generally taken from the invoice, bill of supply or delivery challan and includes the applicable tax components as prescribed. Where taxable and exempt goods are listed together, the rule provides a specific treatment for the exempt value.
          </Paragraph>
          <Paragraph>
            Use the <Link href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST Calculator</Link> to reconcile a tax-inclusive amount against the GST rate on the invoice. The calculator does not decide whether an e-way bill is legally required; that depends on the full movement and current notification.
          </Paragraph>

          <h2 id="responsibility" style={hStyle}>Who Generates an E-Way Bill?</h2>
          <Paragraph>
            The registered supplier or recipient generates the e-way bill when the rule makes them responsible. A transporter may have to generate it when the supplier or recipient has not done so and the goods are handed over for transport.
          </Paragraph>
          <DataTable caption="Responsibility for generating an e-way bill" headers={['Party', 'Typical responsibility']} rows={[
            ['Registered supplier', 'Enters the required consignment information before the movement begins'],
            ['Registered recipient', 'May be responsible where the recipient arranges the conveyance or receives goods from an unregistered supplier'],
            ['Transporter', 'Generates or updates transport details when required by the rules'],
            ['Unregistered transporter', 'Enrols on the system to receive a Transporter ID for e-way bill work'],
          ]} />
          <Paragraph>
            When an unregistered supplier sends goods to a registered recipient, the registered recipient is treated as the supplier for the applicable compliance. The parties should agree who will complete Part A and Part B before dispatch.
          </Paragraph>

          <h2 id="documents" style={hStyle}>Documents and Details Required for an E-Way Bill</h2>
          <Paragraph>
            Keep the invoice, bill of supply or delivery challan for the consignment and the transport details needed for the chosen mode. The portal may require different identifiers for road, rail, air or ship movement.
          </Paragraph>
          <ul style={{ margin: '0 0 20px', paddingLeft: 22, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li style={pStyle}><strong>Part A:</strong> recipient GSTIN or unregistered-person details, delivery PIN code, document number and date, goods value, HSN details and reason for movement.</li>
            <li style={pStyle}><strong>Road transport:</strong> vehicle registration number or transporter ID, as applicable.</li>
            <li style={pStyle}><strong>Rail, air or ship:</strong> transporter ID and the transport document number and date.</li>
            <li style={pStyle}><strong>Account access:</strong> active GST registration or transporter enrolment and the authentication required by the portal.</li>
          </ul>
          <Paragraph>
            Confirm invoice dates before generation. GSTN announced a 180-day document-age restriction effective 1 January 2025; use the current <ExternalLink href="https://www.gst.gov.in/newsandupdates/read/561">GSTN advisory</ExternalLink> when processing older invoices.
          </Paragraph>

          <h2 id="generation" style={hStyle}>How to Generate an E-Way Bill Online</h2>
          <Paragraph>
            Generate the e-way bill through the GSTN e-way bill system before goods begin moving, then make sure the person in charge can produce the EBN and supporting document during transit. Start from the{' '}
            <ExternalLink href="https://www.gst.gov.in/">official GST portal</ExternalLink> and follow the current e-way bill service link.
          </Paragraph>
          <ol style={{ margin: '0 0 20px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 11 }}>
            <li style={{ ...pStyle, margin: 0 }}><strong>Sign in:</strong> access the GSTN e-way bill service with the registered taxpayer or transporter credentials and complete the portal&apos;s authentication.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Start a new bill:</strong> open the generation form and choose the movement type and reason.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Enter Part A:</strong> provide the document, recipient, delivery, goods and value details exactly as recorded on the invoice or challan.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Enter Part B:</strong> add the vehicle number or transport document details required for the mode and route.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Review and submit:</strong> check the entries, generate the EBN and share the number with the transporter and recipient.</li>
          </ol>
          <Paragraph>
            GSTN advisories have addressed ship-to GSTIN data and a voluntary e-way bill closure facility. Rollout dates and API requirements can change, so check the specific{' '}
            <ExternalLink href="https://www.gst.gov.in/newsandupdates/read/668">GSTN advisory</ExternalLink> and the current{' '}
            <ExternalLink href="https://www.gst.gov.in/newsandupdates/">GSTN News and Updates page</ExternalLink> before changing an ERP or API workflow.
          </Paragraph>
          <Paragraph>
            Other generation channels described by GSTN include SMS for registered mobile numbers, mobile access, bulk upload and API integration. Availability and required formats depend on the taxpayer profile and current system specifications; check the official GST portal before relying on a channel.
          </Paragraph>

          <h2 id="validity" style={hStyle}>E-Way Bill Validity and Distance</h2>
          <Paragraph>
            Rule 138(10) generally gives regular cargo one day of validity for up to 200 kilometres, with one extra day for every further 200 kilometres or part. For Over Dimensional Cargo, the corresponding unit is 20 kilometres.
          </Paragraph>
          <DataTable caption="General distance units used to calculate e-way bill validity" headers={['Cargo type', 'Validity distance unit']} rows={[
            ['Regular cargo', 'One day for up to 200 km, then one additional day per further 200 km or part'],
            ['Over Dimensional Cargo', 'One day for up to 20 km, then one additional day per further 20 km or part'],
          ]} />
          <Paragraph>
            Validity begins with the first Part B entry. Entered distance, cargo classification, transshipment and the time of generation all matter, so use the validity displayed by the portal rather than relying only on a manual estimate.
          </Paragraph>
          <Paragraph>
            Rule 138 also sets out when transport details can be added or updated, when Part B may not be required for a short movement within the same state, and when an extension may be requested. Follow the current portal instructions for extensions; an expired bill does not authorise movement.
          </Paragraph>

          <h2 id="exemptions" style={hStyle}>When an E-Way Bill Is Not Required</h2>
          <Paragraph>
            Rule 138(14) lists movements and goods that are exempt from e-way bill generation. The exact exception must fit the facts; a broad label such as “exempt goods” is not enough to determine that a particular consignment is outside the rule.
          </Paragraph>
          <ul style={{ margin: '0 0 20px', paddingLeft: 22, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li style={pStyle}>Goods moved by a non-motorised conveyance.</li>
            <li style={pStyle}>Specified customs-supervised movements and transit cargo covered by the rule.</li>
            <li style={pStyle}>Movement of empty cargo containers in the circumstances listed in the rules.</li>
            <li style={pStyle}>Goods or transactions specifically exempted under the CGST Rules or applicable state provisions.</li>
          </ul>
          <Paragraph>
            Check the current list in the CGST Rules and any state notification before relying on an exemption. When in doubt, document why the exception applies and confirm with a GST professional.
          </Paragraph>

          <h2 id="recent-changes" style={hStyle}>Recent GSTN E-Way Bill Updates</h2>
          <Paragraph>
            GSTN has issued system advisories covering ship-to GSTIN details in bill-to/ship-to movements and a voluntary closure facility after delivery, including the{' '}
            <ExternalLink href="https://www.gst.gov.in/newsandupdates/read/668">GSTN advisory on system changes</ExternalLink>. These changes can affect portal users and API integrations differently.
          </Paragraph>
          <Paragraph>
            Do not rely on an old target date copied from a guide or software manual. Check the latest GSTN advisory, test API changes in the notified environment, and update internal dispatch steps only after confirming the current production status.
          </Paragraph>

          <h2 id="penalty" style={hStyle}>Penalties and Common E-Way Bill Errors</h2>
          <Paragraph>
            An e-way bill breach can lead to detention of goods and conveyance, tax or penalty demands, and additional consequences depending on the specific contravention. The amount is not a universal Rs 10,000-or-tax formula for every error.
          </Paragraph>
          <Paragraph>
            Check the applicable provision, including{' '}
            <ExternalLink href="https://cbic-gst.gov.in/">Section 129 of the CGST Act</ExternalLink> for detention and release of goods in transit, against the facts and current amendments. Do not apply a penalty figure from an old summary to a live case without checking the law.
          </Paragraph>
          <DataTable caption="Checks to complete before dispatch" headers={['Check', 'Avoid']} rows={[
            ['Document identity', 'Generating a bill against the wrong invoice or challan'],
            ['Value and destination', 'Using a value or delivery PIN code that does not match the document'],
            ['Transport details', 'Leaving vehicle or transport document information incomplete when required'],
            ['Validity and route', 'Starting or continuing movement after the bill has expired'],
            ['State-specific rule', 'Applying another state’s threshold or goods exemption'],
          ]} />
          <Paragraph>
            For an invoice containing mixed GST rates, the <Link href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST Calculator</Link> can help verify the arithmetic. Legal applicability still depends on the consignment document and Rule 138.
          </Paragraph>
          <Paragraph>
            See the existing <Link href="/blogs/gst-rates" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST rates guide</Link> for tax-rate context and the <Link href="/blogs/gst-number-search" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST number search guide</Link> for GSTIN verification.
          </Paragraph>

          <h2 id="faq" style={hStyle}>Frequently Asked Questions About E-Way Bills</h2>
          <FaqAccordion />
          <Disclaimer />
        </article>

        <aside className="eway-sidebar" style={{ position: 'sticky', top: 82, alignSelf: 'start' }}>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 16, background: '#fff' }}>
            <h2 style={{ margin: '0 0 12px', fontFamily: INTER, fontSize: 12, letterSpacing: '.07em', textTransform: 'uppercase', color: C.green }}>Rules at a glance</h2>
            {[
              ['General threshold', 'Over Rs 50,000'],
              ['Inter-state threshold', 'Generally Rs 50,000'],
              ['Intrastate threshold', 'Varies by state'],
              ['Regular cargo', '200 km per day'],
              ['ODC', '20 km per day'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '9px 0', borderBottom: `1px solid ${C.border}`, fontFamily: INTER, fontSize: 12.5 }}>
                <span style={{ color: C.ink2 }}>{label}</span><strong style={{ color: C.ink, textAlign: 'right' }}>{value}</strong>
              </div>
            ))}
          </div>
          <nav aria-label="Related Calculators">
            <div style={{ borderRadius: 10, padding: 18, background: C.green }}>
              <h2 style={{ margin: '0 0 12px', fontFamily: INTER, fontSize: 12, letterSpacing: '.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>Fermor Calculators</h2>
              {([
                ['/calculators/gst-calculator', 'GST Calculator'],
                ['/calculators/tds-calculator', 'TDS Calculator'],
                ['/calculators/income-tax-calculator', 'Income Tax Calculator'],
                ['/calculators/advance-tax-calculator', 'Advance Tax Calculator'],
              ] as [string, string][]).map(([href, label]) => (
                <Link key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#fff' }}>{label}</span>
                  <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>›</span>
                </Link>
              ))}
            </div>
          </nav>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginTop: 16, background: '#fff' }}>
            <h2 style={{ margin: '0 0 10px', fontFamily: INTER, fontSize: 12, letterSpacing: '.07em', textTransform: 'uppercase', color: C.green }}>Related articles</h2>
            {[
              ['/blogs/gst-rates', 'GST Rates in India'],
              ['/blogs/gst-number-search', 'GST Number Search and Verification'],
              ['/blogs/gstr-9-annual-return', 'GSTR-9 Annual Return Guide'],
            ].map(([href, label], index, articles) => (
              <div key={href} style={{ paddingBottom: index < articles.length - 1 ? 10 : 0, marginBottom: index < articles.length - 1 ? 10 : 0, borderBottom: index < articles.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <Link href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: C.ink, fontFamily: INTER, fontSize: 13, lineHeight: 1.5, textDecoration: 'none' }}>{label}</Link>
              </div>
            ))}
          </div>
        </aside>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
      <style>{`
        @media (max-width: 900px) {
          .eway-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .eway-sidebar { display: none; }
        }
        .eway-faq details summary { list-style: none; }
        .eway-faq details summary::-webkit-details-marker { display: none; }
        .eway-faq details[open] .chevron { transform: rotate(180deg); }
        .eway-toc-link:hover { background: #EFEFEF; color: #101214; }
      `}</style>
    </>
  );
}

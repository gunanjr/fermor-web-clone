import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { GSTSearchWidget } from './GSTSearchWidget';

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  green:  '#166534',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

export const metadata: Metadata = {
  title: 'GST Number Search by Name: Verify GSTIN & Check Status',
  description: 'Search a GST number by name, company, or PAN. The official portal has no name field, so this explains what actually works, plus live GSTIN verification, format decode, and state code table for FY 2025-26.',
  alternates: { canonical: 'https://fermor.in/blogs/gst-number-search' },
  openGraph: {
    title: 'GST Number Search by Name: Verify GSTIN Online - Fermor',
    description: 'How to find a GSTIN when you only have a business name, verify any GSTIN live, decode state code and PAN, and check active/cancelled status.',
    type: 'article',
    url: 'https://fermor.in/blogs/gst-number-search',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST Number Search by Name: Verify Any GSTIN Online - Fermor',
    description: 'Search GST number by name, company, or PAN. Decode GSTIN format, check live registration status, state codes for all 38 states.',
  },
};

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'GST Number Search by Name: How to Find a GSTIN, Verify It Online, and Decode the Format',
  url: 'https://fermor.in/blogs/gst-number-search',
  datePublished: '2026-06-28T22:00:00+05:30',
  dateModified: '2026-10-06T18:44:34+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete guide to GST number search by name, GSTIN, or PAN: why the official portal has no name field, what actually works to find a GSTIN from a business name, decoding the 15-character GSTIN format, state code table for all 38 states, registration thresholds, active vs cancelled status, and how to report fake GSTINs.',
  articleSection: 'GST',
  keywords: 'gst number search by name, search gst number by name, gst number search by company name, gst number search by name and pan, gst number search, gstin search, verify gst number, gstin format, search taxpayer gst, gst portal search',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const faqItems: { q: string; a: string }[] = [
  { q: 'Can I search a GST number by name or company name?', a: 'No, not directly. The official GST portal has only two search fields, GSTIN/UIN and PAN, with no field to type a business name. To find a GSTIN when you only have a name, get the number from an invoice, the business\'s own website, or by asking the business directly, then verify it using the search tool on this page or at services.gst.gov.in/services/searchtp.' },
  { q: 'How do I search a GST number by business name when I do not have the GSTIN?', a: 'First get the GSTIN itself, since no government tool searches by name alone. Check a tax invoice from the business (GSTIN display is mandatory on every invoice), the business\'s website footer or contact page, or a purchase order or delivery challan already exchanged with them. Once you have the 15-character GSTIN, enter it into the search tool at the top of this page to confirm the legal name matches.' },
  { q: 'How do I search a GST number online?', a: 'Enter the 15-digit GSTIN into the search tool on this page and click Search for instant results, including legal name, trade name, registration date, taxpayer type, and active/cancelled status. Alternatively, go to services.gst.gov.in/services/searchtp, select "Search by GSTIN/UIN", enter the GSTIN, and complete the CAPTCHA.' },
  { q: 'What is a GST number (GSTIN)?', a: 'A GSTIN (Goods and Services Tax Identification Number) is a unique 15-character alphanumeric code assigned to every GST-registered business in India. The format is a 2-digit state code, a 10-character PAN, a 1-digit entity number, the fixed letter Z, and a 1-character check code. It is issued by GSTN (GST Network) under the Central Board of Indirect Taxes and Customs (CBIC).' },
  { q: 'What is the format of a GST number (GSTIN)?', a: 'A GSTIN is exactly 15 characters. Positions 1-2 are the state code (01 to 38), positions 3-12 are the PAN of the business, position 13 is the entity number, position 14 is always the letter Z, and position 15 is a check digit. Example: 27AAPFU0939F1ZV is a Maharashtra-registered taxpayer.' },
  { q: 'What do the first two digits of a GSTIN represent?', a: 'The first two digits of a GSTIN are the state code. Each Indian state and Union Territory has a unique 2-digit code: 07 is Delhi, 27 is Maharashtra, 29 is Karnataka, 33 is Tamil Nadu, 36 is Telangana, 19 is West Bengal, 09 is Uttar Pradesh, 24 is Gujarat, 32 is Kerala. The full list of all 38 state codes is in the state code table on this page.' },
  { q: 'Can I search a GST number by PAN?', a: 'Yes. On the GST portal at services.gst.gov.in/services/searchtp, select "Search by PAN" and enter the 10-character PAN number. The portal returns every GSTIN registered under that PAN, including registrations in different states, which is useful when a business has multiple state registrations.' },
  { q: 'Can I search a GST number by name and PAN together?', a: 'Not as a combined filter. PAN search and name search are different tools, and the portal does not let you add a name filter on top of a PAN search. If you have both, use the PAN to run the actual search, then use the name only to cross-check that the legal name returned matches the business you expect.' },
  { q: 'How do I find the business name registered against a GST number?', a: 'Enter the GSTIN into the search tool on this page or at services.gst.gov.in/services/searchtp. Every GSTIN search already returns the legal name and trade name registered against it, so no separate reverse lookup tool is needed.' },
  { q: 'Can I search a GST number by proprietor, partner, or firm name?', a: 'No, not directly. A sole proprietorship\'s GSTIN is registered under the business\'s trade name linked to the proprietor\'s PAN, and a partnership or LLP\'s GSTIN is registered under the firm\'s legal name linked to the firm\'s PAN. Neither the proprietor\'s personal name nor an individual partner\'s name is a searchable field on the GST portal. Search using the firm\'s PAN, or ask the business for its GSTIN directly.' },
  { q: 'Is there a reliable website that searches GST number by name?', a: 'No government tool performs a live name-to-GSTIN search. Third-party sites advertising "search GST by name" are querying their own stored database of GSTINs looked up by earlier users, not a live government name index, so their coverage is incomplete and can be outdated. Verify anything they return against services.gst.gov.in/services/searchtp before relying on it.' },
  { q: 'How do I verify if a GST registration is active or cancelled?', a: 'Search the GSTIN on the official GST portal or the search tool on this page. The result shows a status field: "Active" means the registration is currently valid, "Cancelled" means it was surrendered or revoked, and "Suspended" means it is temporarily restricted. Any invoice issued with a cancelled GSTIN is invalid for an ITC claim.' },
  { q: 'Who needs to register for GST in India?', a: 'GST registration is mandatory for businesses with annual turnover above ₹40 lakh (goods) or ₹20 lakh (services) in normal states, above ₹20 lakh (goods) or ₹10 lakh (services) in special category states, all e-commerce operators and sellers on e-commerce platforms, inter-state suppliers regardless of turnover, and those required to pay GST under reverse charge.' },
  { q: 'What is the GST registration threshold for FY 2025-26?', a: 'For FY 2025-26: aggregate turnover above ₹40 lakh for goods suppliers in normal states, ₹20 lakh for goods suppliers in special category states, ₹20 lakh for service providers in normal states, and ₹10 lakh for service providers in special category states. E-commerce operators and sellers have no threshold at all.' },
  { q: 'How many characters is a GST number?', a: 'A GSTIN is exactly 15 characters, mixing letters and digits. Any number that is shorter or longer is not a valid GSTIN. If a supplier gives you a number with fewer or more than 15 characters, it has either been stated incorrectly or is not a GSTIN at all.' },
  { q: 'What does the letter Z in position 14 of a GSTIN mean?', a: 'The 14th character of every GSTIN is always the letter Z. It does not vary between GSTINs and carries no business-specific meaning. GSTN includes it as part of the check-digit algorithm that verifies GSTIN integrity, and any GSTIN where position 14 is not Z is invalid.' },
  { q: 'Is GST number search free?', a: 'Yes. GST number search, both on the official GST portal and the search tool on this page, is completely free with no login or registration required. The search returns the legal name, trade name, registration date, state, taxpayer type, and status at no cost.' },
  { q: 'How many GSTINs can a single PAN have?', a: 'A single PAN can have one GSTIN per state. A business operating in 5 states registers separately in each and gets 5 GSTINs, all sharing the same embedded PAN. The entity number in position 13 of the GSTIN increments if a business registers more than one vertical within the same state.' },
  { q: 'How do I report a fake or fraudulent GSTIN?', a: 'First verify on the GST portal that the GSTIN does not exist or belongs to a different business. Then file a complaint on the GST portal under Grievances, or contact your jurisdictional GST officer, or report to CBIC at cbic-gst.gov.in. Fraudulent invoices with fake GSTINs attract penalties under Section 122 of the CGST Act.' },
  { q: 'What is the difference between GSTIN, GSTN, and GST?', a: 'GST is the Goods and Services Tax, the unified indirect tax system in India. GSTN (GST Network) is the technology company that manages the GST IT infrastructure. GSTIN (GST Identification Number) is the unique 15-character registration number assigned to each taxpayer. When people say "GST number," they mean GSTIN.' },
  { q: 'What happens if I accept an invoice with a cancelled or fake GSTIN?', a: 'You cannot claim Input Tax Credit on that invoice under Section 16 of the CGST Act. The tax authority can reverse the ITC, charge interest at 18% per annum from the date of claim, and impose a penalty equal to the tax amount under Section 122. Always verify a supplier\'s GSTIN status before accepting invoices, especially from a new vendor.' },
  { q: 'What happens if a GSTIN on an invoice does not match the business name?', a: 'If the GSTIN search returns a different legal name than what is printed on the invoice, the invoice is likely fraudulent. Do not pay it or claim ITC on it. Report the discrepancy to your state GST authority or through the GST portal grievance system; a genuine trade name vs legal name mismatch can usually be clarified directly with the supplier.' },
  { q: 'What is the Composition Scheme under GST?', a: 'The Composition Scheme lets small taxpayers pay GST at a fixed flat rate on turnover instead of the normal multi-slab rates. Eligibility is annual turnover up to ₹1.5 crore for manufacturers and traders and ₹75 lakh for certain service providers. Composition dealers cannot collect GST from customers or claim ITC.' },
  { q: 'What documents are needed for GST registration?', a: 'Core documents are the PAN of the business, Aadhaar of the authorized signatory, proof of place of business such as a rent agreement, bank account details, and a photograph of the signatory. Companies additionally need an incorporation certificate and MOA/AOA, and partnerships need a partnership deed.' },
  { q: 'How long does GST registration take?', a: 'GST registration is processed within 7 working days if all documents are in order and no query is raised. If an officer raises a query, the applicant gets 7 days to respond, after which the officer has another 7 working days to approve or reject. Total time with a query is typically 15 to 20 working days.' },
  { q: 'Can e-commerce sellers avoid GST registration?', a: 'No. Every seller on an e-commerce platform must register for GST regardless of turnover, under Section 24 of the CGST Act, and the usual threshold exemption does not apply to them. E-commerce operators, the platform companies themselves, are also mandatorily registered.' },
  { q: 'What is the UIN in GST?', a: 'UIN (Unique Identification Number) is issued to entities that are not liable to pay GST but need a GST identity to claim refunds on tax paid on their purchases, such as UN bodies, embassies, and similar organizations. UIN lookups can be done on the GST portal alongside ordinary GSTIN searches.' },
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'GST Number Search', item: 'https://fermor.in/blogs/gst-number-search' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Search and Verify a GST Number Online',
  description: 'Step-by-step guide to verify any GSTIN on the official GST portal.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Open the GST Portal', text: 'Go to services.gst.gov.in/services/searchtp, the official Search Taxpayer page on the GST portal.' },
    { '@type': 'HowToStep', position: 2, name: 'Select Search Type', text: 'Choose "Search by GSTIN/UIN" to search by GST number, or "Search by PAN" to find all GSTINs linked to a PAN.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter the GSTIN', text: 'Type the 15-character GSTIN exactly as it appears on the invoice. GSTIN is case-insensitive but must be exactly 15 characters.' },
    { '@type': 'HowToStep', position: 4, name: 'Complete the CAPTCHA', text: 'Enter the characters shown in the image. This is required to prevent automated queries on the GST portal.' },
    { '@type': 'HowToStep', position: 5, name: 'Click Search', text: 'Click the Search button. Results load in 2-5 seconds.' },
    { '@type': 'HowToStep', position: 6, name: 'Review the Results', text: 'The portal shows legal name, trade name, principal place of business state, registration date, taxpayer type, and current status (Active or Cancelled/Surrendered).' },
    { '@type': 'HowToStep', position: 7, name: 'Verify Against Invoice', text: 'Match the legal name and state shown in the results against the supplier details on the invoice. A mismatch means the invoice may be fraudulent.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/gst-number-search',
  name: 'GST Number Search by Name: Verify GSTIN Online, Decode Format, Check Registration Status - Fermor',
  url: 'https://fermor.in/blogs/gst-number-search',
  inLanguage: 'en-IN',
  datePublished: '2026-06-28T22:00:00+05:30',
  dateModified: '2026-10-06T18:44:34+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'GSTIN',
    alternateName: 'GST Identification Number',
    description: 'A 15-character alphanumeric code uniquely identifying every GST-registered business in India. Format: 2-digit state code + 10-char PAN + entity number + Z + check digit.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian GST Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian business owners, accountants, GST taxpayers, and vendors verifying supplier registrations',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#search-by-name', name: 'Search GST Number by Name' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-gstin', name: 'What is GSTIN' },
    { '@type': 'WebPageElement', cssSelector: '#gstin-format', name: 'GSTIN Format' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-search', name: 'How to Search GST Number' },
    { '@type': 'WebPageElement', cssSelector: '#gstin-decoder', name: 'GSTIN Decoder Widget' },
    { '@type': 'WebPageElement', cssSelector: '#state-codes', name: 'GST State Code Table' },
    { '@type': 'WebPageElement', cssSelector: '#search-results', name: 'What GST Search Shows' },
    { '@type': 'WebPageElement', cssSelector: '#search-by-pan', name: 'Search by PAN' },
    { '@type': 'WebPageElement', cssSelector: '#active-cancelled', name: 'Active vs Cancelled GSTIN' },
    { '@type': 'WebPageElement', cssSelector: '#registration-threshold', name: 'GST Registration Threshold' },
    { '@type': 'WebPageElement', cssSelector: '#taxpayer-types', name: 'Types of GST Taxpayers' },
    { '@type': 'WebPageElement', cssSelector: '#why-verify', name: 'Why Verify GST Number' },
    { '@type': 'WebPageElement', cssSelector: '#fake-gstin', name: 'How to Report Fake GSTIN' },
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
  knowsAbout: ['GST India', 'GSTIN Verification', 'Income Tax India', 'Personal Finance India', 'GST Registration', 'CBIC India'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 24, marginBottom: 10 };

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

function GSTTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
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
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only. GST rules are subject to change. Always verify the latest provisions on the official GST portal (gst.gov.in) or through CBIC notifications. Fermor is not a tax advisory firm and this is not professional tax or legal advice.
      </p>
    </div>
  );
}

const STATE_CODE_TABLE = [
  ['01', 'Jammu and Kashmir'],
  ['02', 'Himachal Pradesh'],
  ['03', 'Punjab'],
  ['04', 'Chandigarh'],
  ['05', 'Uttarakhand'],
  ['06', 'Haryana'],
  ['07', 'Delhi'],
  ['08', 'Rajasthan'],
  ['09', 'Uttar Pradesh'],
  ['10', 'Bihar'],
  ['11', 'Sikkim'],
  ['12', 'Arunachal Pradesh'],
  ['13', 'Nagaland'],
  ['14', 'Manipur'],
  ['15', 'Mizoram'],
  ['16', 'Tripura'],
  ['17', 'Meghalaya'],
  ['18', 'Assam'],
  ['19', 'West Bengal'],
  ['20', 'Jharkhand'],
  ['21', 'Odisha'],
  ['22', 'Chhattisgarh'],
  ['23', 'Madhya Pradesh'],
  ['24', 'Gujarat'],
  ['26', 'Dadra and Nagar Haveli and Daman and Diu'],
  ['27', 'Maharashtra'],
  ['28', 'Andhra Pradesh'],
  ['29', 'Karnataka'],
  ['30', 'Goa'],
  ['31', 'Lakshadweep'],
  ['32', 'Kerala'],
  ['33', 'Tamil Nadu'],
  ['34', 'Puducherry'],
  ['35', 'Andaman and Nicobar Islands'],
  ['36', 'Telangana'],
  ['37', 'Andhra Pradesh (Amaravati)'],
  ['38', 'Ladakh'],
  ['97', 'Other Territory'],
  ['99', 'Centre Jurisdiction'],
];

export default function GSTNumberSearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>GST Number Search</li>
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
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>
              Updated <time dateTime="2026-10-06T18:44:34+05:30">Oct 6, 2026</time>
            </span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>14 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            GST Number Search by Name: How to Find a GSTIN, Verify It Online, and Decode the Format
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            {/* Search Widget: the first thing in the article, above the fold */}
            <h2 id="gstin-decoder" style={hStyle}>Search a GST Number: Instant Format Check and Live Registration Details</h2>
            <p style={pStyle}>
              Type any 15-character GSTIN below. Fermor checks the format and check digit instantly, then pulls live registration details, including legal name, status, registration date, and jurisdiction, directly from the government GSTIN database.
            </p>
            <GSTSearchWidget />

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              A GST number search verifies whether a GSTIN is genuine, active, and registered to the business on the invoice. This guide also explains the exact search steps, decodes the 15-character GSTIN format, and lists the state codes for all 38 states and Union Territories.
            </p>

            {/* SECTION: search by name */}
            <h2 id="search-by-name" style={hStyle}>How to Search a GST Number by Company or Business Name</h2>
            <p style={pStyle}>
              The official GST portal does not let you search a GSTIN by typing a business name. The Search Taxpayer tool at services.gst.gov.in/services/searchtp has exactly two input modes: &quot;Search by GSTIN/UIN&quot; and &quot;Search by PAN&quot;. There is no third option for a trade name or legal name.
            </p>
            <p style={pStyle}>
              If a business name is all you have, the practical path is to get the GSTIN first, then run it through a GSTIN-based search to confirm the name matches.
            </p>
            <BulletList items={[
              <span key={1}><strong>Ask the business directly.</strong> Every GST-registered supplier must print its GSTIN on every tax invoice, so a current invoice or quotation already has it.</span>,
              <span key={2}><strong>Check the business&apos;s own website.</strong> Many Indian businesses display their GSTIN in the website footer or on the Contact/About page, since it is often required for e-commerce listings.</span>,
              <span key={3}><strong>Check an existing GST document.</strong> A purchase order, delivery challan, or e-way bill already exchanged with the business will carry the GSTIN.</span>,
              <span key={4}><strong>Verify once you have it.</strong> Enter the GSTIN into the search tool at the top of this page, or at services.gst.gov.in/services/searchtp, and confirm the legal name returned matches the business you expect.</span>,
            ]} />
            <p style={pStyle}>
              Searching by company name is slightly different from searching by a proprietor, partner, or owner&apos;s personal name; the portal does not support either. A business&apos;s GSTIN is always linked to its own registered PAN, not to an individual&apos;s name, even for a sole proprietorship.
            </p>
            <p style={pStyle}>
              Be cautious of third-party websites that advertise a direct &quot;search by name&quot; feature. Since no government name index exists for them to query, these tools are typically searching their own cache of GSTINs that earlier users already looked up by number, not a live, complete database. Treat any name-based result from such a tool as a starting point to verify, not a final answer.
            </p>

            {/* SECTION 1 */}
            <h2 id="what-is-gstin" style={hStyle}>What is a GSTIN (GST Identification Number)?</h2>
            <p style={pStyle}>
              A GSTIN is the unique 15-character alphanumeric identifier assigned by the government to every GST-registered business in India. It encodes the state of registration, the taxpayer&apos;s PAN, and a serial entity number. Under GST law, every registered taxpayer must display their GSTIN on all tax invoices, on their principal place of business, and on any document that triggers GST liability.
            </p>
            <p style={pStyle}>
              The GSTIN is issued by GSTN (GST Network), a non-government, private limited company set up by the Central Government to manage the GST IT infrastructure. The legal framework is the CGST Act, 2017, administered by CBIC (Central Board of Indirect Taxes and Customs) at cbic-gst.gov.in.
            </p>

            {/* SECTION 2 */}
            <h2 id="gstin-format" style={hStyle}>GSTIN Format: What Each of the 15 Characters Means</h2>
            <p style={pStyle}>
              Every valid GSTIN is exactly 15 characters. The format encodes the state, the taxpayer&apos;s PAN, and a serial registration number in a specific order. There is no variation in structure.
            </p>

            {/* Format visual: 15 individual character boxes */}
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px 16px', marginBottom: 20, overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: 3, minWidth: 500, marginBottom: 10 }}>
                {/* State Code: pos 1-2 */}
                {['2','7'].map((c, i) => (
                  <div key={`s${i}`} style={{ width: 36, height: 42, background: '#EFF6FF', border: '2px solid #3B82F6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace, monospace', fontWeight: 800, fontSize: 17, color: '#1D4ED8', flexShrink: 0 }}>{c}</div>
                ))}
                <div style={{ width: 4 }} />
                {/* PAN: pos 3-12 */}
                {['A','A','P','F','U','0','9','3','9','F'].map((c, i) => (
                  <div key={`p${i}`} style={{ width: 36, height: 42, background: '#F5F3FF', border: '2px solid #8B5CF6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace, monospace', fontWeight: 800, fontSize: 17, color: '#7C3AED', flexShrink: 0 }}>{c}</div>
                ))}
                <div style={{ width: 4 }} />
                {/* Entity: pos 13 */}
                <div style={{ width: 36, height: 42, background: '#F0FDF4', border: '2px solid #22C55E', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace, monospace', fontWeight: 800, fontSize: 17, color: '#15803D', flexShrink: 0 }}>1</div>
                {/* Z: pos 14 */}
                <div style={{ width: 36, height: 42, background: '#FFFBEB', border: '2px solid #F59E0B', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace, monospace', fontWeight: 800, fontSize: 17, color: '#B45309', flexShrink: 0 }}>Z</div>
                {/* Check: pos 15 */}
                <div style={{ width: 36, height: 42, background: '#FFF1F2', border: '2px solid #F43F5E', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace, monospace', fontWeight: 800, fontSize: 17, color: '#9F1239', flexShrink: 0 }}>V</div>
              </div>
              {/* Segment labels */}
              <div style={{ display: 'flex', gap: 3, minWidth: 500, alignItems: 'flex-start' }}>
                <div style={{ width: 75, fontFamily: INTER, fontSize: 10.5, fontWeight: 700, color: '#1D4ED8', textAlign: 'center' }}>State Code</div>
                <div style={{ width: 4 }} />
                <div style={{ width: 394, fontFamily: INTER, fontSize: 10.5, fontWeight: 700, color: '#7C3AED', textAlign: 'center' }}>PAN Number (positions 3-12)</div>
                <div style={{ width: 4 }} />
                <div style={{ width: 36, fontFamily: INTER, fontSize: 10.5, fontWeight: 700, color: '#15803D', textAlign: 'center' }}>Entity</div>
                <div style={{ width: 36, fontFamily: INTER, fontSize: 10.5, fontWeight: 700, color: '#B45309', textAlign: 'center' }}>Z</div>
                <div style={{ width: 36, fontFamily: INTER, fontSize: 10.5, fontWeight: 700, color: '#9F1239', textAlign: 'center' }}>Check</div>
              </div>
              <p style={{ fontFamily: INTER, fontSize: 11.5, color: C.ink3, margin: '10px 0 0', lineHeight: 1.5 }}>
                Example: <span style={{ fontFamily: 'monospace, monospace', fontWeight: 700, color: C.dark }}>27AAPFU0939F1ZV</span>. Maharashtra-registered business (code 27), PAN AAPFU0939F, 1st registration, Z, check digit V.
              </p>
            </div>

            <GSTTable
              caption="GSTIN Format: Breakdown of All 15 Characters"
              headers={['Position', 'Characters', 'Meaning', 'Format']}
              rows={[
                ['1-2', 'State Code', 'The state or UT where the business is registered', '01 to 38, 97, 99'],
                ['3-12', 'PAN', 'Permanent Account Number of the business owner or entity', '5 letters + 4 digits + 1 letter (AAAAA9999A)'],
                ['13', 'Entity Number', 'Serial number for the registration within the state (first registration = 1)', '1-9, then A-Z for 10th+ registration'],
                ['14', 'Z (fixed)', 'Fixed, non-variable character; always the letter Z in every GSTIN', 'Always Z'],
                ['15', 'Check Digit', 'Computed check character to detect typographic errors', '0-9 or A-Z'],
              ]}
            />

            <h3 style={h3Style}>What the 5th Character of the PAN (Position 7 in GSTIN) Reveals</h3>
            <p style={pStyle}>
              The fifth character of the PAN embedded in the GSTIN (character position 7 overall) identifies the entity type. This is part of the PAN structure defined by the Income Tax Department, not a GST-specific field.
            </p>
            <GSTTable
              caption="Entity Type from PAN 5th Character (GSTIN Position 7)"
              headers={['5th PAN Character', 'Entity Type']}
              rows={[
                ['P', 'Individual'],
                ['C', 'Company (Private or Public Limited)'],
                ['H', 'HUF (Hindu Undivided Family)'],
                ['F', 'Firm or LLP'],
                ['A', 'AOP (Association of Persons)'],
                ['T', 'Trust'],
                ['B', 'BOI (Body of Individuals)'],
                ['L', 'Local Authority'],
                ['J', 'Artificial Juridical Person'],
                ['G', 'Government'],
              ]}
            />

            {/* SECTION 3 */}
            <h2 id="how-to-search" style={hStyle}>How to Search a GST Number Online: Step by Step</h2>
            <p style={pStyle}>
              The official GST portal provides free GSTIN search without login. The process takes under 2 minutes.
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Open the GST Search Page', text: 'Go to services.gst.gov.in/services/searchtp on the official GST portal. This is the Search Taxpayer section under the Services menu.' },
                { title: 'Select Search Type', text: 'Choose "Search by GSTIN/UIN" to search by the 15-digit GST number. Or choose "Search by PAN" to find all GSTINs linked to a PAN number across all states.' },
                { title: 'Enter the GSTIN', text: 'Type the 15-character GSTIN exactly as shown on the invoice. GSTIN is case-insensitive: uppercase and lowercase are treated equally.' },
                { title: 'Complete the CAPTCHA', text: 'Enter the text shown in the image verification. This is required to prevent automated bulk searches on the portal.' },
                { title: 'Click Search', text: 'Click the blue Search button. Results typically load within 2-5 seconds.' },
                { title: 'Review the Results', text: 'The portal shows: legal name, trade name (if any), principal state, registration date, taxpayer type, and current status (Active, Cancelled, or Suspended).' },
                { title: 'Cross-Check with the Invoice', text: 'Match the legal name and state shown against the supplier name on the invoice. A mismatch is a red flag for a fraudulent or misused GSTIN.' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                  <div style={{ paddingTop: 3 }}>
                    <p style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{step.title}</p>
                    <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SECTION 5: State Code Table */}
            <h2 id="state-codes" style={hStyle}>GST State Codes for All 38 States and Union Territories</h2>
            <p style={pStyle}>
              The first two digits of any GSTIN identify the state of registration. All 38 Indian states and Union Territories have unique 2-digit codes assigned by the Central Government. If you see a GSTIN starting with a code not in this list, it is invalid.
            </p>
            <div style={{ overflowX: 'auto', marginBottom: 20 }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}` }}>
                <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 6, captionSide: 'top', paddingBottom: 6 }}>GST State Code Table: All 38 Codes</caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ ...thStyle, width: 80 }}>State Code</th>
                    <th scope="col" style={{ ...thStyle, borderRight: 'none' }}>State / Union Territory</th>
                    <th scope="col" style={{ ...thStyle, width: 80 }}>State Code</th>
                    <th scope="col" style={{ ...thStyle, borderRight: 'none' }}>State / Union Territory</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.ceil(STATE_CODE_TABLE.length / 2) }, (_, i) => {
                    const left = STATE_CODE_TABLE[i * 2];
                    const right = STATE_CODE_TABLE[i * 2 + 1];
                    return (
                      <tr key={i}>
                        <td style={{ ...(i % 2 === 1 ? tdAltStyle : tdStyle), fontWeight: 700, color: C.dg, width: 80 }}>{left?.[0]}</td>
                        <td style={{ ...(i % 2 === 1 ? tdAltStyle : tdStyle), borderRight: `1px solid ${C.border}` }}>{left?.[1]}</td>
                        <td style={{ ...(i % 2 === 1 ? tdAltStyle : tdStyle), fontWeight: 700, color: C.dg, width: 80 }}>{right?.[0] || ''}</td>
                        <td style={{ ...(i % 2 === 1 ? tdAltStyle : tdStyle), borderRight: 'none' }}>{right?.[1] || ''}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={pStyle}>
              Note: Code 25 (Daman and Diu) was merged into code 26 after the Dadra and Nagar Haveli and Daman and Diu merger in January 2020. Existing GSTINs starting with 25 issued before the merger remain valid.
            </p>
            <p style={pStyle}>
              Note: Code 28 was the original code for undivided Andhra Pradesh. After Telangana was carved out in 2014, Telangana was assigned code 36 and Andhra Pradesh was reassigned code 37. Older GSTINs starting with 28 can still be valid, but all current registrations for businesses in Andhra Pradesh use 37.
            </p>

            {/* SECTION 6 */}
            <h2 id="search-results" style={hStyle}>What a GST Number Search Shows: Every Data Field Explained</h2>
            <p style={pStyle}>
              A successful GSTIN search on the GST portal returns a results card with eight fields. Understanding each field helps you assess whether a supplier is legitimate.
            </p>
            <GSTTable
              caption="GSTIN Search Result Fields: Official GST Portal"
              headers={['Field', 'What It Means', 'What to Check']}
              rows={[
                ['Legal Name of Business', 'The exact name registered with the tax authority, matching the PAN', 'Must match the supplier name on the invoice'],
                ['Trade Name', 'The commercial brand name if different from the legal name', 'Common for sole proprietors and retailers; OK if different from legal name'],
                ['State Jurisdiction', 'The state where the business is registered for GST', 'Must match the state in the first two digits of the GSTIN'],
                ['Central Jurisdiction', 'The specific ward or range of the tax officer', 'Less critical for buyers; relevant for compliance filings'],
                ['Date of Registration', 'When the GSTIN was issued', 'If the date is very recent for a long-established supplier, it warrants scrutiny'],
                ['Constitution of Business', 'The legal structure: Proprietorship, Partnership, LLP, Private Ltd., etc.', 'Should match the type of business you expect'],
                ['Taxpayer Type', 'Whether the taxpayer is Regular, Composition, NRTP (Non-Resident), etc.', 'Regular taxpayers charge GST on invoices; Composition dealers cannot collect GST from you'],
                ['GSTIN / UIN Status', 'Active, Cancelled, or Suspended', 'Active = valid. Cancelled or Suspended = do not accept invoices or claim ITC'],
              ]}
            />

            {/* SECTION 7 */}
            <h2 id="search-by-pan" style={hStyle}>How to Search GST Number by PAN</h2>
            <p style={pStyle}>
              Searching by PAN returns all GSTINs registered under a single taxpayer across all states. This is the right approach when you know the company&apos;s PAN but not their specific state GSTIN.
            </p>
            <BulletList items={[
              'Go to services.gst.gov.in/services/searchtp and select "Search by PAN".',
              'Enter the 10-character PAN number (e.g., AAPFU0939F). PAN is case-insensitive.',
              'Complete the CAPTCHA and click Search.',
              'The results show all GSTINs linked to the PAN, including their states and registration status.',
              'A company with operations in 10 states will have 10 GSTINs, all sharing the same embedded PAN.',
              'Use this when verifying large companies or when a supplier quotes a GSTIN from a different state than where they invoiced you.',
            ]} />
            <p style={pStyle}>
              You cannot search by business name or trade name on the official GST portal. If you only have the name, the supplier must provide their GSTIN directly (which they are legally required to do on every invoice).
            </p>

            {/* SECTION 8 */}
            <h2 id="active-cancelled" style={hStyle}>Active vs Cancelled GSTIN: What Each Status Means for Your Business</h2>
            <p style={pStyle}>
              A GSTIN can have three statuses on the portal. The status determines whether any invoice from the supplier is legally valid for Input Tax Credit.
            </p>
            <GSTTable
              caption="GSTIN Status: What Each Status Means"
              headers={['Status', 'Meaning', 'Can You Claim ITC?', 'Action to Take']}
              rows={[
                ['Active', 'Registration is valid and current', 'Yes, on valid tax invoices', 'Proceed normally'],
                ['Cancelled', 'Registration was voluntarily surrendered or revoked by the tax authority', 'No: ITC will be reversed with interest', 'Do not accept invoices; ask supplier to re-register or clarify'],
                ['Suspended', 'Temporarily restricted pending an investigation or non-compliance notice', 'Risky: ITC may be reversed', 'Delay payment; ask supplier to resolve their compliance issue first'],
              ]}
            />
            <p style={pStyle}>
              Under Section 16(2) of the CGST Act, ITC is eligible only when the supplier has paid the tax to the government. If their GSTIN is cancelled, they cannot legally collect or remit GST. Any ITC claimed on invoices from a cancelled taxpayer can be reversed by the tax officer with 18% interest from the date of claim.
            </p>

            {/* SECTION 9 */}
            <h2 id="registration-threshold" style={hStyle}>GST Registration Threshold: Who Must Register and Who Can Opt In</h2>
            <p style={pStyle}>
              GST registration is mandatory once aggregate turnover crosses the threshold. &quot;Aggregate turnover&quot; includes all taxable, exempt, and zero-rated supplies across all business verticals and states under the same PAN.
            </p>
            <GSTTable
              caption="GST Registration Threshold for FY 2025-26"
              headers={['Category', 'Type of Supply', 'Normal States Threshold', 'Special Category States Threshold']}
              rows={[
                ['Supplier of Goods', 'All supplies', '₹40 lakh', '₹20 lakh'],
                ['Supplier of Services', 'All supplies', '₹20 lakh', '₹10 lakh'],
                ['E-commerce sellers', 'Goods or services sold through platforms', 'No threshold', 'No threshold'],
                ['E-commerce operators', 'Platform companies like Amazon, Flipkart', 'No threshold', 'No threshold'],
                ['Inter-state suppliers', 'Supply to a different state', 'No threshold', 'No threshold'],
                ['Casual Taxable Person', 'Occasional business in a state where not regularly based', 'No threshold', 'No threshold'],
                ['Reverse Charge recipients', 'Businesses receiving services under RCM', 'No threshold', 'No threshold'],
              ]}
            />
            <p style={pStyle}>
              The 11 constitutionally recognised special category states are Arunachal Pradesh, Assam, Himachal Pradesh, Jammu and Kashmir, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura, and Uttarakhand. Only four of them, Manipur, Mizoram, Nagaland, and Tripura, still use the lower ₹20 lakh (goods) and ₹10 lakh (services) threshold; the rest opted for the standard ₹40 lakh/₹20 lakh limit when it was raised in 2019.
            </p>
            <p style={pStyle}>
              Puducherry is not a special category state, but it also did not adopt the ₹40 lakh goods threshold, so registration there is still required above ₹20 lakh in goods turnover.
            </p>
            <p style={pStyle}>
              Businesses below the threshold can voluntarily register for GST. Voluntary registration allows them to collect GST from customers and claim Input Tax Credit on purchases, which is often beneficial for B2B businesses.
            </p>

            {/* SECTION 10 */}
            <h2 id="taxpayer-types" style={hStyle}>Types of GST Taxpayers and What Each Means for Invoicing</h2>
            <p style={pStyle}>
              The &quot;Taxpayer Type&quot; field on the GSTN portal tells you how the supplier is registered, which directly affects what they can charge and what you can claim.
            </p>
            <GSTTable
              caption="GST Taxpayer Types and Invoice Rules"
              headers={['Taxpayer Type', 'Who It Is', 'Can Charge GST on Invoice?', 'Can You Claim ITC?']}
              rows={[
                ['Regular', 'Standard GST registrant filing monthly/quarterly returns', 'Yes', 'Yes, on valid invoices'],
                ['Composition', 'Small taxpayer on the simplified Composition Scheme', 'No: cannot charge GST', 'No: Composition dealers cannot pass ITC'],
                ['NRTP (Non-Resident Taxable Person)', 'Foreign businesses supplying in India temporarily', 'Yes', 'Yes, limited'],
                ['OIDAR', 'Online Information and Database Access or Retrieval services (foreign suppliers)', 'Yes', 'Not applicable for most Indian recipients'],
                ['UIN (Unique Identification Number)', 'UN bodies, embassies, and diplomatic missions', 'Exempt: they claim refunds', 'Not applicable'],
                ['SEZ Unit / Developer', 'Businesses operating in Special Economic Zones', 'Zero-rated supply', 'Yes, with specific documentation'],
              ]}
            />
            <p style={pStyle}>
              When a supplier&apos;s portal shows &quot;Composition&quot;, they are not allowed to charge GST on their invoices. If they do charge GST, the invoice is non-compliant and the ITC is not claimable. The <Link href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>GST Calculator</Link> helps compute tax on invoices from Regular taxpayers.
            </p>

            {/* SECTION 11 */}
            <h2 id="why-verify" style={hStyle}>Why Verifying a GST Number Before Every Transaction Matters</h2>
            <p style={pStyle}>
              Verifying a supplier&apos;s GSTIN before paying an invoice is not optional for businesses that claim Input Tax Credit. It is a compliance requirement under the CGST Act.
            </p>
            <BulletList items={[
              <span key={1}><strong>ITC risk:</strong> ITC claimed on invoices from cancelled or fake GSTINs is reversed under Section 16(2), with interest at 18% per annum from the date of claim.</span>,
              <span key={2}><strong>Penalty exposure:</strong> Deliberately accepting invoices from non-existent GSTINs attracts a penalty equal to the tax amount under Section 122 of the CGST Act.</span>,
              <span key={3}><strong>Scrutiny flag:</strong> The GSTN&apos;s Invoice Management System (IMS) requires you to Accept, Reject, or mark Pending every inbound invoice before it counts toward your GSTR-2B. Invoices from a supplier who has not filed their own returns show up as mismatches here, and accepting one anyway is a scrutiny flag.</span>,
              <span key={4}><strong>Vendor fraud prevention:</strong> Ghost vendors with fraudulent GSTINs are a common source of procurement fraud. A 30-second portal check prevents this entirely.</span>,
              <span key={5}><strong>Due diligence for new vendors:</strong> For any new supplier, verify their GSTIN before onboarding them in your vendor master. Make it part of the procurement checklist.</span>,
            ]} />

            {/* SECTION 12 */}
            <h2 id="fake-gstin" style={hStyle}>How to Report a Fake or Fraudulent GSTIN</h2>
            <p style={pStyle}>
              A fake GSTIN is one that does not exist on the GST portal or belongs to a different business than the one issuing the invoice. Both cases are criminal offences under the CGST Act.
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Verify on the GST Portal First', text: 'Confirm the GSTIN does not exist or returns a different business name at services.gst.gov.in/services/searchtp.' },
                { title: 'Do Not Pay or Claim ITC', text: 'Immediately stop the payment process and do not file the invoice in your GST returns.' },
                { title: 'File a Grievance on the GST Portal', text: 'Log in to the GST portal, go to Services > Grievance and complaint filing. Submit a fraud complaint with the fake GSTIN and the fraudulent invoice copy.' },
                { title: 'Report to Your Jurisdictional GST Officer', text: 'Contact your ward or range GST officer. Complaints can be made in writing or through the CBIC portal at cbic-gst.gov.in.' },
                { title: 'File an FIR if Substantial Fraud', text: 'For significant invoice fraud, file a First Information Report (FIR) at the local police station. GST fraud above ₹5 crore is a cognizable and non-bailable offence under Section 132 of the CGST Act.' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                  <div style={{ paddingTop: 3 }}>
                    <p style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{step.title}</p>
                    <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* GST Calculator CTA */}
            <div style={{ background: C.paleDg, border: `1px solid #c9ced2`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dg, margin: '0 0 3px' }}>GST Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Calculate GST on any amount at 5%, 12%, 18%, or 28%. Compute net price, GST amount, and total invoice value instantly.</p>
              </div>
              <Link className="fx-btn" href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            

            {/* SECTION 13: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: GST Number Search</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="gst-sidebar"
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
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>GSTIN Quick Facts</div>
              {([
                ['Total Characters', '15 (always)'],
                ['Position 1-2', 'State code (01-38)'],
                ['Position 3-12', 'PAN number'],
                ['Position 13', 'Entity number (1-9, A-Z)'],
                ['Position 14', 'Always "Z"'],
                ['Position 15', 'Check digit (0-9, A-Z)'],
                ['Search Portal', 'services.gst.gov.in'],
                ['Login Required', 'No: search is free'],
                ['ITC Risk (Cancelled)', 'Full reversal + 18% interest'],
                ['Mandatory Invoice Field', 'Yes, under GST Act'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Calculator CTAs */}
            <nav aria-label="Related Calculators">
            <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor GST Calculators</div>
              <Link href="/calculators/gst-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>GST Calculator</span>
                <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
              </Link>
              <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
              </Link>
              <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Old vs New Regime</span>
                <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
              </Link>
            </div>
            </nav>

            {/* Registration Threshold */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Registration Thresholds</div>
              {([
                ['Goods (normal states)', '₹40 lakh'],
                ['Services (normal states)', '₹20 lakh'],
                ['Goods (special states)', '₹20 lakh'],
                ['Services (special states)', '₹10 lakh'],
                ['E-commerce sellers', 'No threshold'],
                ['Inter-state suppliers', 'No threshold'],
                ['Composition (goods)', 'Up to ₹1.5 crore'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: i < 6 ? `1px solid ${C.border}` : 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/gst-rates', 'GST Rates in India: Complete List Under GST 2.0'],
                ['/blogs/pan-card-number-search', 'How to Know Your PAN Card Number: 7 Official Ways to Find It'],
                ['/blogs/pan-card-download', 'PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date FY 2025-26: Every Deadline You Need to Know'],
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
        .gst-sidebar::-webkit-scrollbar { width: 5px; }
        .gst-sidebar::-webkit-scrollbar-track { background: transparent; }
        .gst-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .gst-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

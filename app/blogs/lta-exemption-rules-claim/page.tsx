import { PageNav } from '../../../src/components/common/PageNav';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import type { Metadata } from 'next';
import Link from 'next/link';

const SLUG = 'lta-exemption-rules-claim';
const PAGE_URL = `https://fermor.in/blogs/${SLUG}`;
const PUBLISHED = '2026-10-13T18:35:25+05:30';
const MODIFIED = '2026-10-13T19:18:29+05:30';
const TITLE = 'LTA Exemption: Rules, Limit, Eligibility and How to Claim';
const DESCRIPTION =
  'Learn the LTA exemption limit, eligible travel fares, block-year rules, old-regime eligibility, documents and how to claim Leave Travel Allowance in India.';

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
    tags: ['Leave Travel Allowance', 'LTA Exemption', 'Income Tax', 'Salary Allowances'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} - Fermor`,
    description: DESCRIPTION,
  },
  keywords: [
    'leave travel allowance',
    'travel allowance',
    'lta exemption',
    'lta limit',
    'lta allowance meaning',
    'leave travel allowance calculation',
    'leave travel allowance calculator online',
    'leave travel allowance policy',
    'leave travel concession',
    'leave travel reimbursement',
    'lta claim',
    'lta claim rules',
    'lta in income tax return',
    'lta in salary',
    'lta reimbursement',
    'lta tax exemption',
    'lta tax exemption limit',
    'lta tax exemption rules',
    'section 10(5) exemption',
    'lta block year',
    'lta carry forward rules',
    'lta exemption under old tax regime',
    'how to claim lta in itr',
  ],
};

const faqItems = [
  {
    q: 'What is Leave Travel Allowance (LTA)?',
    a: 'Leave Travel Allowance is a salary benefit an employer may provide for an employee’s domestic travel. Eligible travel fare can be exempt from tax subject to the applicable law and proof requirements.',
  },
  {
    q: 'How is the LTA exemption amount calculated?',
    a: 'The exempt amount is limited to the lowest of the LTA provided by the employer, eligible travel fare actually paid, and the fare ceiling prescribed for the journey under the applicable rules.',
  },
  {
    q: 'How many LTA trips can I claim in a block?',
    a: 'Under the Section 10(5) rules, exemption is generally available for two journeys in a block of four calendar years. The current block is 2026 to 2029.',
  },
  {
    q: 'Can I claim LTA for travel outside India?',
    a: 'No. Section 10(5) exemption is for travel within India. An international trip does not qualify for this exemption.',
  },
  {
    q: 'Are hotels, meals and sightseeing included in LTA?',
    a: 'No. The exemption covers eligible travel fare, not accommodation, meals, local transport or sightseeing costs.',
  },
  {
    q: 'Can I claim LTA under the new tax regime?',
    a: 'Section 10(5) LTA exemption is not available under the new tax regime under the 1961 Act. For tax years governed by the Income-tax Act, 2025, check the corresponding current provisions before filing.',
  },
  {
    q: 'Which family members can be included in an LTA claim?',
    a: 'The rules cover the employee and eligible family members, including a spouse and children, with conditions for dependent parents, brothers and sisters. The child limit and its exceptions depend on the applicable rule.',
  },
  {
    q: 'Can an unclaimed LTA journey be carried forward?',
    a: 'Yes. One unavailed journey from a four-year block can generally be carried into the first calendar year of the next block, subject to the rules for that block.',
  },
  {
    q: 'What documents should I keep for an LTA claim?',
    a: 'Keep tickets, boarding passes, payment records and the employer’s claim form or declaration. Your employer may set the submission deadline and ask for specific supporting documents.',
  },
  {
    q: 'Can I claim LTA in my income tax return if it is missing from Form 16?',
    a: 'A missing Form 16 entry does not by itself decide whether an exemption is available. Report a claim only if you meet the legal conditions and can substantiate the eligible travel fare.',
  },
  {
    q: 'Does the employee have to travel for the family’s tickets to qualify?',
    a: 'The employee must undertake the journey for the family’s travel costs to be considered under the LTA exemption rules.',
  },
  {
    q: 'What if my employer does not provide LTA?',
    a: 'You cannot claim an LTA salary exemption for an allowance that was not provided by your employer. The exemption is limited by the LTA amount included in your salary.',
  },
  {
    q: 'Is there a fixed rupee limit for LTA exemption?',
    a: 'There is no single rupee ceiling that applies to every employee. The exempt amount depends on the LTA received, eligible fare actually spent and the fare limit set by the applicable travel mode and route rules.',
  },
  {
    q: 'Is the full LTA allowance tax exempt?',
    a: 'No. Only the amount that meets the exemption conditions is exempt. Any allowance above the eligible fare or prescribed fare ceiling remains part of taxable salary.',
  },
  {
    q: 'Can I claim LTA if I did not travel?',
    a: 'No. LTA exemption is tied to an eligible journey actually undertaken. An allowance paid without qualifying travel is generally taxable salary.',
  },
  {
    q: 'Can I claim LTA for a private car journey?',
    a: 'A private car bill is not automatically the fare eligible for exemption. Rule 2B sets fare ceilings by the available transport mode and route, including an equivalent rail-fare basis where no recognised public transport is available.',
  },
  {
    q: 'Can a self-employed person claim LTA exemption?',
    a: 'The Section 10(5) exemption concerns leave travel concession or assistance provided by an employer to an employee. A self-employed person cannot claim an employer-paid LTA exemption for personal travel.',
  },
  {
    q: 'What happens to LTA I do not use?',
    a: 'The unused allowance does not become tax exempt by itself. A qualifying unavailed journey may be carried forward under the block rules, but unused salary allowance outside an eligible claim is taxable.',
  },
  {
    q: 'Can I claim LTA for air or train tickets?',
    a: 'Air or rail fare may qualify for the journey within India, subject to the applicable fare ceiling and shortest-route rule. Keep the ticket and payment evidence, and check the class and route limit for your case.',
  },
  {
    q: 'Which proof should I submit for an LTA claim?',
    a: 'Follow your employer’s LTA process and keep the journey tickets, fare receipts, payment records, travel dates and proof of the route. The employer may ask for a declaration or other supporting documents.',
  },
  {
    q: 'Does LTA cover both onward and return tickets?',
    a: 'The fare for the eligible journey may include the travel legs needed to reach the destination and return, subject to the applicable route ceiling. Keep tickets for each leg and claim only the qualifying fare actually paid.',
  },
  {
    q: 'Is LTA exemption available every financial year?',
    a: 'No. Under the Section 10(5) framework, the exemption is generally limited to two journeys in a four-calendar-year block. The block is counted by calendar years, not financial years.',
  },
  {
    q: 'How does the shortest-route rule affect an LTA claim?',
    a: 'Rule 2B uses the shortest route between the place of origin and destination to determine the prescribed fare ceiling. A longer route taken for personal convenience does not automatically raise that ceiling.',
  },
  {
    q: 'Can I claim LTA for a business-class flight?',
    a: 'The air-fare ceiling under Rule 2B is linked to the economy-class fare by the shortest route. A higher-priced ticket does not increase the exemption ceiling, so keep the itinerary and check the applicable fare limit.',
  },
  {
    q: 'Can my spouse’s ticket be included in my LTA claim?',
    a: 'A spouse is included in the family definition for LTA, subject to the employee undertaking the qualifying journey and the other conditions being met. Keep the spouse’s ticket and fare proof with the claim records.',
  },
  {
    q: 'Can I claim LTA after I have completed the trip?',
    a: 'The claim is generally submitted through the employer’s process after the journey, using the proof and declaration the employer requires. There is no single nationwide payroll deadline, so confirm the submission window with HR.',
  },
  {
    q: 'Can the same ticket fare be reimbursed under two LTA claims?',
    a: 'No. The exemption is based on eligible travel fare actually incurred, so the same expense should not be claimed twice or claimed again after reimbursement. Disclose any other reimbursement to payroll and claim only the fare you ultimately bore.',
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
  articleSection: 'Tax & Compliance Guides',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'Leave Travel Allowance', description: 'An employer-provided salary allowance for eligible travel within India.' },
    { '@type': 'Thing', name: 'Income tax exemption', description: 'Tax treatment of qualifying domestic travel fare under the applicable income tax rules.' },
  ],
  keywords: 'leave travel allowance, LTA exemption, LTA limit, leave travel allowance calculation, LTA claim rules, LTA in income tax return',
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
    { '@type': 'ListItem', position: 3, name: 'LTA Exemption', item: PAGE_URL },
  ],
};

const sections = [
  { id: 'meaning', name: 'What Is Leave Travel Allowance?' },
  { id: 'eligibility', name: 'Who Can Claim LTA Exemption?' },
  { id: 'limit', name: 'LTA Exemption Limit and Fare Rules' },
  { id: 'eligible-fare', name: 'Which Travel Costs Count as LTA Fare?' },
  { id: 'block-year', name: 'LTA Block Year and Carry Forward' },
  { id: 'examples', name: 'LTA Calculation Examples' },
  { id: 'documents', name: 'Documents for an LTA Claim' },
  { id: 'claim', name: 'How to Claim LTA in Form 16 or ITR' },
  { id: 'new-regime', name: 'LTA Under the New Tax Regime' },
  { id: 'mistakes', name: 'LTA Claim Mistakes to Avoid' },
  { id: 'taxable-allowance', name: 'When Is LTA Taxable?' },
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
  knowsAbout: ['Leave Travel Allowance', 'LTA Exemption', 'Income Tax India', 'Salary Allowances'],
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
      <table style={{ width: '100%', minWidth: 580, borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontFamily: INTER, fontSize: 13, color: C.ink }}>
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
    <div className="lta-faq" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', marginTop: 18 }}>
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
      <div className="lta-toc-links" style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 2 }}>
        {sections.map((item, index) => (
          <a key={item.id} href={`#${item.id}`} target="_blank" rel="noopener noreferrer" className="lta-toc-link" style={{ fontSize: 13, color: C.ink2, textDecoration: 'none', padding: '7px 10px', borderRadius: 6, display: 'flex', gap: 8 }}>
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This guide explains the Section 10(5) framework for income governed by the Income-tax Act, 1961. The Income-tax Act, 2025 applies from 1 April 2026. Rules and employer documentation requirements can differ by tax year, so verify the current position on the{' '}
        <ExternalLink href="https://www.incometax.gov.in/iec/foportal/">Income Tax Department portal</ExternalLink> or with a qualified tax professional before filing.
      </p>
    </div>
  );
}

export default function LtaExemptionPage() {
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
          <span aria-current="page" style={{ color: C.ink2 }}>LTA Exemption</span>
        </nav>
      </div>

      <header style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '34px 24px 28px' }}>
          <span style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: '.08em', textTransform: 'uppercase' }}>Tax &amp; Compliance Guides</span>
          <h1 style={{ maxWidth: 900, margin: '12px 0 14px', fontFamily: POPPINS, fontSize: 'clamp(24px, 3.2vw, 34px)', lineHeight: 1.2, color: C.green }}>
            LTA Exemption: Rules, Limit, Eligibility and How to Claim
          </h1>
          <p style={{ maxWidth: 820, margin: '0 0 16px', fontFamily: INTER, fontSize: 16.5, lineHeight: 1.7, color: C.ink2 }}>
            Leave Travel Allowance can reduce taxable salary when an employee takes an eligible trip within India. The exemption is for qualifying fare, not the entire holiday bill.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontFamily: INTER, fontSize: 13, color: C.ink3 }}>
            <time dateTime={MODIFIED}>Updated Oct 13, 2026</time><span aria-hidden="true">·</span><span>13 min read</span><span aria-hidden="true">·</span><span>Fermor Analysis</span>
          </div>
        </div>
      </header>

      <div className="lta-grid" style={{ maxWidth: 1160, margin: '0 auto', padding: '34px 24px 72px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 290px', gap: 40, alignItems: 'start' }}>
        <article itemScope itemType="https://schema.org/Article" style={{ minWidth: 0, fontFamily: INTER }}>
          <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
            LTA exemption is limited to eligible travel fare for journeys within India. Under Section 10(5) of the Income-tax Act, 1961, the exempt amount is capped by the allowance received, actual eligible fare and the fare limit under the rules.
          </p>
          <Paragraph>
            The familiar Section 10(5) numbering applies to income earned up to 31 March 2026. The Income-tax Act, 2025 took effect on 1 April 2026, so claims for later tax years must be checked against the new Act and current rules.
          </Paragraph>
          <TableOfContents />

          <h2 id="meaning" style={hStyle}>What Is Leave Travel Allowance?</h2>
          <Paragraph>
            Leave Travel Allowance, also called Leave Travel Concession, is a travel benefit an employer may include in an employee&apos;s salary. The tax exemption is governed by Section 10(5) and Rule 2B of the{' '}
            <ExternalLink href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx">Income-tax Act and Rules</ExternalLink> for the relevant period.
          </Paragraph>
          <Paragraph>
            LTA is not a blanket holiday deduction. Only eligible travel fare for a qualifying journey within India can be considered. Hotel stays, meals, local sightseeing and other incidental costs do not become exempt just because the trip was paid from an LTA benefit.
          </Paragraph>
          <DataTable caption="LTA exemption at a glance under the Section 10(5) framework" headers={['Rule point', 'What it means']} rows={[
            ['Travel location', 'Journey must be within India'],
            ['Eligible cost', 'Qualifying travel fare, not the full holiday spend'],
            ['Journey count', 'Generally two journeys in a four-calendar-year block'],
            ['Exemption cap', 'Lowest of employer LTA, eligible actual fare and prescribed fare ceiling'],
            ['Proof', 'Keep travel records and meet the employer’s submission process'],
          ]} />

          <h2 id="eligibility" style={hStyle}>Who Can Claim LTA Exemption?</h2>
          <Paragraph>
            An employee can claim LTA only when the employer provides it as part of salary and the conditions for an eligible domestic journey are met. The employee must travel, and eligible family members may travel with them under the family rules.
          </Paragraph>
          <Paragraph>
            Family treatment includes the spouse and children, and may include dependent parents, brothers or sisters as set out in the applicable rules. The child limit has a specific exception for certain multiple births; check the rule for the tax year rather than assuming every family member or ticket is covered.
          </Paragraph>
          <Paragraph>
            If LTA is not part of your pay, there is no LTA amount to exempt. Check the salary structure and the employer&apos;s policy before buying tickets on the assumption that every journey qualifies.
          </Paragraph>

          <h2 id="limit" style={hStyle}>LTA Exemption Limit and Fare Rules</h2>
          <Paragraph>
            The LTA exemption is the lowest of the allowance the employer paid, the actual eligible fare, and the fare ceiling calculated under Rule 2B for the mode and route. The route is measured by the shortest route to the destination.
          </Paragraph>
          <DataTable caption="How the eligible fare ceiling is determined under Rule 2B" headers={['Journey mode', 'Fare basis']} rows={[
            ['Air', 'Economy-class fare by the shortest route, subject to the applicable rule'],
            ['Rail-connected origin and destination', 'AC first-class rail fare by the shortest route'],
            ['No rail connection, recognised public transport available', 'First-class or deluxe-class fare by the shortest route'],
            ['No recognised public transport available', 'Equivalent AC first-class rail fare for the shortest route'],
          ]} />
          <Paragraph>
            For example, if an employer provides Rs 60,000 of LTA, the eligible tickets cost Rs 48,000 and the prescribed fare ceiling is Rs 52,000, the maximum exemption is Rs 48,000. The remaining Rs 12,000 of the allowance is not exempt under this claim.
          </Paragraph>
          <Paragraph>
            These limits are a ceiling, not a flat payout. If the ticket costs less than the fare ceiling, the claim cannot exceed the ticket fare; if the fare is higher, the prescribed ceiling controls. Compare the actual origin, destination and route rather than using the full fare for a different itinerary.
          </Paragraph>
          <Paragraph>
            Enter your allowance and eligible fare in the <Link href="/calculators/lta-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>LTA Calculator</Link> to estimate the exempt portion. Compare the overall effect of your regime choice in the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>old vs new tax regime calculator</Link>.
          </Paragraph>

          <h2 id="eligible-fare" style={hStyle}>Which Travel Costs Count as LTA Fare?</h2>
          <Paragraph>
            LTA covers qualifying fare for the journey to a place in India, not every cost attached to the holiday. Separate travel tickets from accommodation and activities when you calculate a claim.
          </Paragraph>
          <DataTable caption="Travel costs commonly considered in an LTA claim" headers={['Expense', 'How to treat it']} rows={[
            ['Air, rail or eligible public transport fare', 'May qualify up to the Rule 2B ceiling for the route'],
            ['Hotel or homestay', 'Not eligible travel fare'],
            ['Meals and sightseeing', 'Not eligible travel fare'],
            ['Local taxi or transfers', 'Not automatically part of the eligible journey fare'],
            ['Travel outside India', 'Does not qualify under the domestic journey exemption'],
          ]} />
          <Paragraph>
            A multi-stop holiday does not make every ticket or transfer eligible. Keep the itinerary and fare records together so payroll can identify the journey between the place of origin and the destination used for the claim.
          </Paragraph>
          <Paragraph>
            The employee must undertake the qualifying journey. Eligible family travel is considered under the applicable definition of family and travel conditions; do not include a relative’s ticket unless the conditions for that person are met.
          </Paragraph>

          <h2 id="block-year" style={hStyle}>LTA Block Year and Carry Forward</h2>
          <Paragraph>
            LTA exemption is generally available for two journeys in a block of four calendar years, which is different from the financial year. The current block is 2026 to 2029; the previous block ran from 2022 to 2025.
          </Paragraph>
          <Paragraph>
            If one journey remains unclaimed at the end of a block, one journey may generally be carried forward and used in the first calendar year of the next block. A carried-forward journey not used in that first year cannot be moved into a later year.
          </Paragraph>
          <Paragraph>
            The block-year rule counts qualifying journeys, not a fixed number of claims in each financial year. Check the travel dates and earlier claims with payroll, especially when both spouses receive LTA from their employers.
          </Paragraph>

          <h2 id="examples" style={hStyle}>LTA Calculation Examples</h2>
          <Paragraph>
            These examples show the lower-of-three calculation. They do not replace the route and fare check for a real itinerary.
          </Paragraph>
          <DataTable caption="Illustrative LTA exemption calculations" headers={['Example', 'Allowance', 'Eligible fare', 'Fare ceiling', 'Maximum exempt']} rows={[
            ['Domestic trip below the caps', 'Rs 60,000', 'Rs 48,000', 'Rs 52,000', 'Rs 48,000'],
            ['Allowance is the lowest amount', 'Rs 35,000', 'Rs 45,000', 'Rs 50,000', 'Rs 35,000'],
            ['Fare ceiling is the lowest amount', 'Rs 70,000', 'Rs 62,000', 'Rs 54,000', 'Rs 54,000'],
          ]} />
          <Paragraph>
            An overseas holiday does not qualify under Section 10(5), even if the employer calls the payment LTA. Likewise, a hotel invoice cannot be added to the eligible fare to increase the exemption.
          </Paragraph>

          <h2 id="documents" style={hStyle}>Documents for an LTA Claim</h2>
          <Paragraph>
            Keep records that show who travelled, when the journey took place, the route and the fare paid. Your employer sets the submission process and may ask for supporting documents before applying the exemption in payroll.
          </Paragraph>
          <DataTable caption="LTA claim records to keep" headers={['Record', 'What it helps establish']} rows={[
            ['Journey ticket or e-ticket', 'Passenger, travel date, origin, destination and mode'],
            ['Fare receipt and payment record', 'Amount actually paid for eligible travel'],
            ['Travel itinerary', 'Route taken and connection between journey legs'],
            ['Employer declaration or claim form', 'Claim details submitted under the employer’s policy'],
            ['Payroll or Form 16 records', 'Allowance paid and exemption reported by the employer'],
          ]} />
          <Paragraph>
            Keep the original digital ticket and proof of payment even if your employer accepts a declaration instead of collecting every receipt. If a ticket is cancelled or refunded, update the claim so it reflects the final fare borne by the traveller.
          </Paragraph>

          <h2 id="claim" style={hStyle}>How to Claim LTA in Form 16 or ITR</h2>
          <Paragraph>
            Submit your claim through the employer&apos;s LTA process first, then check that the salary exemption is reflected correctly in Form 16. Keep the evidence needed to support the amount you report in your income tax return.
          </Paragraph>
          <ol style={{ margin: '0 0 20px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 11 }}>
            <li style={{ ...pStyle, margin: 0 }}><strong>Check eligibility:</strong> confirm the applicable tax regime, available LTA balance, block-year journey count and domestic itinerary.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Keep proof:</strong> retain tickets, boarding passes, payment evidence and any other records requested by payroll.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Submit to your employer:</strong> follow the employer&apos;s deadline and declaration process. The deadline is set by the employer, not by a single nationwide LTA claim date.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Review Form 16:</strong> check the exempt allowance and taxable salary figures before preparing your return.</li>
            <li style={{ ...pStyle, margin: 0 }}><strong>Report accurately:</strong> if you are claiming a qualifying amount not reflected in Form 16, retain evidence and enter it only in the correct return field for the relevant tax year.</li>
          </ol>
          <Paragraph>
            The <ExternalLink href="https://www.incometax.gov.in/iec/foportal/">Income Tax Department e-Filing portal</ExternalLink> hosts the current return forms and filing guidance. The <ExternalLink href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx">Income Tax Department legislation pages</ExternalLink> provide the statute and rules; employer documentation procedures can still differ.
          </Paragraph>

          <h2 id="new-regime" style={hStyle}>LTA Under the New Tax Regime</h2>
          <Paragraph>
            Under <ExternalLink href="https://incometaxindia.gov.in/Pages/acts/income-tax-act.aspx">Section 115BAC of the Income-tax Act, 1961</ExternalLink>, the Section 10(5) LTA exemption is not available when a taxpayer uses the new tax regime. It is an old-regime exemption for income governed by the 1961 Act.
          </Paragraph>
          <Paragraph>
            The Income-tax Act, 2025 came into force on 1 April 2026 and reorganised the exemption provisions. For income from that date onward, do not rely on old Section 10 numbering alone; check the corresponding provision and regime conditions for the tax year you are filing.
          </Paragraph>
          <Paragraph>
            If you are weighing the two regimes for a year governed by the 1961 Act, the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>regime comparison calculator</Link> can help compare your tax using the figures you enter.
          </Paragraph>

          <h2 id="taxable-allowance" style={hStyle}>When Is LTA Taxable?</h2>
          <Paragraph>
            LTA is taxable to the extent that it is paid but does not meet the exemption conditions. No journey, an overseas journey, ineligible expenses or fare above the permitted ceiling can leave some or all of the allowance taxable.
          </Paragraph>
          <Paragraph>
            For example, if the employer pays Rs 60,000 as LTA but the eligible fare and route ceiling produce an exemption of Rs 48,000, the remaining Rs 12,000 is not exempt under the claim. The amount actually treated as taxable should match the applicable payroll and return rules for that tax year.
          </Paragraph>
          <Paragraph>
            Check the allowance and exemption reported in your salary records before filing. If the Form 16 figures do not match the employer’s final computation, ask payroll for a correction or confirm the correct reporting treatment with a tax professional.
          </Paragraph>

          <h2 id="mistakes" style={hStyle}>LTA Claim Mistakes to Avoid</h2>
          <ul style={{ margin: '0 0 20px', paddingLeft: 22, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li style={pStyle}><strong>Counting the entire holiday bill:</strong> hotels, meals and sightseeing are outside the eligible travel fare.</li>
            <li style={pStyle}><strong>Using an overseas itinerary:</strong> the Section 10(5) exemption is restricted to travel within India.</li>
            <li style={pStyle}><strong>Ignoring the fare ceiling:</strong> actual ticket cost alone does not determine the exempt amount.</li>
            <li style={pStyle}><strong>Missing the block-year condition:</strong> one carry-forward journey generally must be used in the first year of the next block.</li>
            <li style={pStyle}><strong>Making a claim without records:</strong> retain evidence that supports the route, fare and payment.</li>
            <li style={pStyle}><strong>Using old section numbers for a new tax year:</strong> check whether the Income-tax Act, 2025 applies to the income being reported.</li>
          </ul>
          <Paragraph>
            The broader guide to <Link href="/blogs/section-10-income-tax-act-exemptions" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 10 exemptions and allowances</Link> explains how LTA fits alongside HRA and other salary exemptions.
          </Paragraph>

          <h2 id="faq" style={hStyle}>Frequently Asked Questions About LTA</h2>
          <FaqAccordion />
          <Disclaimer />
        </article>

        <aside className="lta-sidebar" style={{ position: 'sticky', top: 82, alignSelf: 'start' }}>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginBottom: 16, background: '#fff' }}>
            <h2 style={{ margin: '0 0 12px', fontFamily: INTER, fontSize: 12, letterSpacing: '.07em', textTransform: 'uppercase', color: C.green }}>Key LTA rules</h2>
            {[
              ['Eligible travel', 'Within India'],
              ['Exemption basis', 'Lowest of 3 amounts'],
              ['Current block', '2026 to 2029'],
              ['Journeys per block', 'Generally 2'],
              ['New regime', 'Section 10(5) not allowed'],
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
                ['/calculators/lta-calculator', 'LTA Calculator'],
                ['/calculators/hra-calculator', 'HRA Calculator'],
                ['/calculators/income-tax-calculator', 'Income Tax Calculator'],
                ['/calculators/old-vs-new-tax-regime-calculator', 'Old vs New Tax Regime Calculator'],
              ] as [string, string][]).map(([href, label], index, calculators) => (
                <Link key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, textDecoration: 'none', marginBottom: index < calculators.length - 1 ? 8 : 0 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#fff' }}>{label}</span>
                  <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>›</span>
                </Link>
              ))}
            </div>
          </nav>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 18, marginTop: 16, background: '#fff' }}>
            <h2 style={{ margin: '0 0 10px', fontFamily: INTER, fontSize: 12, letterSpacing: '.07em', textTransform: 'uppercase', color: C.green }}>Related articles</h2>
            {[
              ['/blogs/section-10-income-tax-act-exemptions', 'Section 10 Exemptions and Allowances'],
              ['/blogs/form-16', 'Form 16: Salary and TDS Guide'],
              ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime'],
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
          .lta-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .lta-sidebar { display: none; }
        }
        .lta-faq details summary { list-style: none; }
        .lta-faq details summary::-webkit-details-marker { display: none; }
        .lta-faq details[open] .chevron { transform: rotate(180deg); }
        .lta-toc-link:hover { background: #EFEFEF; color: #101214; }
      `}</style>
    </>
  );
}

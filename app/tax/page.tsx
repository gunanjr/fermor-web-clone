import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../src/components/common/SiteFooter';
import { PageNav } from '../../src/components/common/PageNav';
import { TAX_COLUMNS } from '../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'Income Tax by Salary Level: All Guides FY 2025-26',
  description: 'Income tax calculations for every salary from Rs 3 lakh to Rs 1 crore. New regime vs old regime, Section 87A rebate, monthly in-hand salary. FY 2025-26.',
  keywords: ['income tax india 2025-26', 'income tax by salary', 'tax on salary india', 'new regime tax slabs', 'section 87a rebate', 'in hand salary calculator india', 'income tax guide india'],
  alternates: { canonical: 'https://fermor.in/tax' },
  openGraph: {
    title: 'Income Tax by Salary Level: All Guides FY 2025-26 - Fermor',
    description: 'Pre-computed income tax for every salary from Rs 3 lakh to Rs 1 crore. New regime, old regime, monthly in-hand. FY 2025-26.',
    type: 'website',
    url: 'https://fermor.in/tax',
    siteName: 'Fermor',
  },
};

const C = {
  dark: '#101214', lime: '#a6dbc4', ink: '#16140F', ink2: '#50565c',
  ink3: '#7a8087', white: '#ffffff', bg: '#f6f7f8', border: '#e3e6e8',
  paleLime: '#f4f5f6',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

function fmtRs(n: number): string {
  if (n === 0) return 'Rs 0';
  const s = Math.round(n).toString();
  if (s.length <= 3) return 'Rs ' + s;
  let result = s.slice(-3);
  let rest = s.slice(0, -3);
  while (rest.length > 2) { result = rest.slice(-2) + ',' + result; rest = rest.slice(0, -2); }
  return 'Rs ' + rest + ',' + result;
}

const CITIES = [
  { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka',   pt: 2500, hra: 40, metro: false },
  { name: 'Mumbai',    slug: 'mumbai',    state: 'Maharashtra', pt: 2500, hra: 50, metro: true  },
  { name: 'Delhi',     slug: 'delhi',     state: 'Delhi',       pt: 0,    hra: 50, metro: true  },
  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana',   pt: 2400, hra: 40, metro: false },
  { name: 'Pune',      slug: 'pune',      state: 'Maharashtra', pt: 2500, hra: 40, metro: false },
  { name: 'Chennai',   slug: 'chennai',   state: 'Tamil Nadu',  pt: 2500, hra: 50, metro: true  },
];

const ENTRIES = [
  { lakh: 3,   slug: 'income-tax-on-3-lakh-salary',   newTax: 0,        oldTax: 0,         inHand: 23300  },
  { lakh: 4,   slug: 'income-tax-on-4-lakh-salary',   newTax: 0,        oldTax: 0,         inHand: 31133  },
  { lakh: 5,   slug: 'income-tax-on-5-lakh-salary',   newTax: 0,        oldTax: 0,         inHand: 38967  },
  { lakh: 6,   slug: 'income-tax-on-6-lakh-salary',   newTax: 0,        oldTax: 23400,     inHand: 46800  },
  { lakh: 7,   slug: 'income-tax-on-7-lakh-salary',   newTax: 0,        oldTax: 44200,     inHand: 54633  },
  { lakh: 8,   slug: 'income-tax-on-8-lakh-salary',   newTax: 0,        oldTax: 65000,     inHand: 62467  },
  { lakh: 9,   slug: 'income-tax-on-9-lakh-salary',   newTax: 0,        oldTax: 85800,     inHand: 70300  },
  { lakh: 10,  slug: 'income-tax-on-10-lakh-salary',  newTax: 0,        oldTax: 106600,    inHand: 78133  },
  { lakh: 11,  slug: 'income-tax-on-11-lakh-salary',  newTax: 0,        oldTax: 132600,    inHand: 85967  },
  { lakh: 12,  slug: 'income-tax-on-12-lakh-salary',  newTax: 0,        oldTax: 163800,    inHand: 93800  },
  { lakh: 13,  slug: 'income-tax-on-13-lakh-salary',  newTax: 66300,    oldTax: 195000,    inHand: 96108  },
  { lakh: 14,  slug: 'income-tax-on-14-lakh-salary',  newTax: 81900,    oldTax: 226200,    inHand: 102642 },
  { lakh: 15,  slug: 'income-tax-on-15-lakh-salary',  newTax: 97500,    oldTax: 257400,    inHand: 109175 },
  { lakh: 18,  slug: 'income-tax-on-18-lakh-salary',  newTax: 150800,   oldTax: 351000,    inHand: 128233 },
  { lakh: 20,  slug: 'income-tax-on-20-lakh-salary',  newTax: 192400,   oldTax: 413400,    inHand: 140434 },
  { lakh: 25,  slug: 'income-tax-on-25-lakh-salary',  newTax: 319800,   oldTax: 569400,    inHand: 168983 },
  { lakh: 30,  slug: 'income-tax-on-30-lakh-salary',  newTax: 475800,   oldTax: 725400,    inHand: 195150 },
  { lakh: 35,  slug: 'income-tax-on-35-lakh-salary',  newTax: 631800,   oldTax: 881400,    inHand: 221317 },
  { lakh: 40,  slug: 'income-tax-on-40-lakh-salary',  newTax: 787800,   oldTax: 1037400,   inHand: 247483 },
  { lakh: 50,  slug: 'income-tax-on-50-lakh-salary',  newTax: 1099800,  oldTax: 1349400,   inHand: 299817 },
  { lakh: 60,  slug: 'income-tax-on-60-lakh-salary',  newTax: 1552980,  oldTax: 1827540,   inHand: 340385 },
  { lakh: 75,  slug: 'income-tax-on-75-lakh-salary',  newTax: 2067780,  oldTax: 2342340,   inHand: 414985 },
  { lakh: 100, slug: 'income-tax-on-100-lakh-salary', newTax: 2925780,  oldTax: 3200340,   inHand: 539318 },
];

const zeroTax = ENTRIES.filter(e => e.newTax === 0);
const nonZero = ENTRIES.filter(e => e.newTax > 0);

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the zero-tax salary limit in FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'The zero-tax gross salary limit under the new regime in FY 2025-26 is Rs 12,75,000. After the standard deduction of Rs 75,000, taxable income is exactly Rs 12,00,000, which is the Section 87A rebate ceiling. Any gross salary above Rs 12,75,000 results in a non-zero tax liability under the new regime.' },
    },
    {
      '@type': 'Question',
      name: 'Is income tax zero for a 10 lakh salary?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. For a Rs 10 lakh salary under the new regime in FY 2025-26, taxable income after the standard deduction is Rs 9,25,000. Tax at slab rates is Rs 32,500, which is fully covered by the Section 87A rebate (ceiling Rs 12,00,000). Monthly in-hand salary is approximately Rs 78,133.' },
    },
    {
      '@type': 'Question',
      name: 'Which is better — old or new tax regime in FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'For salaries up to Rs 12 lakh gross, the new regime is strictly better because the Section 87A rebate makes tax zero. Above Rs 12.75 lakh, the new regime produces lower tax unless very high Chapter VI-A deductions (above Rs 3.75 lakh) are claimed. For most salaried employees, the new regime is better at every income level.' },
    },
    {
      '@type': 'Question',
      name: 'At what salary does surcharge start in India?',
      acceptedAnswer: { '@type': 'Answer', text: 'Surcharge starts when taxable income (after standard deduction) exceeds Rs 50 lakh. For a gross salary, this means surcharge applies from approximately Rs 50,75,000 CTC. The surcharge rate is 10% of the base tax for income between Rs 50 lakh and Rs 1 crore.' },
    },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Income Tax by Salary Level: All Guides FY 2025-26',
  description: 'Complete income tax guides for every salary from Rs 3 lakh to Rs 1 crore in FY 2025-26.',
  url: 'https://fermor.in/tax',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
};

function SalaryCard({ lakh, slug, newTax, oldTax, inHand }: typeof ENTRIES[0]) {
  const isZero = newTax === 0;
  return (
    <Link
      href={`/tax/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 12,
        padding: '16px 18px', transition: 'box-shadow 0.15s',
        cursor: 'pointer',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: INTER }}>
            Rs {lakh} lakh
          </span>
          {isZero ? (
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1f7a58', background: '#f4f5f6', border: '1px solid #a6dbc4', borderRadius: 99, padding: '2px 9px', whiteSpace: 'nowrap' }}>
              ZERO TAX
            </span>
          ) : (
            <span style={{ fontSize: 11, fontWeight: 600, color: C.ink3, background: C.bg, borderRadius: 99, padding: '2px 8px', whiteSpace: 'nowrap' }}>
              New: {fmtRs(newTax)}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>Old regime</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: oldTax === 0 ? '#1f7a58' : C.ink2, fontFamily: INTER }}>{oldTax === 0 ? 'Zero' : fmtRs(oldTax)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>Monthly in-hand</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.ink2, fontFamily: INTER }}>{fmtRs(inHand)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TaxIndexPage() {
  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 20px 60px' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

        {/* Header */}
        <header style={{ marginBottom: 36 }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0, fontSize: 12.5, color: C.ink3 }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.ink3 }}>/</li>
              <li style={{ color: C.ink }}><span aria-current="page">Tax Guides</span></li>
            </ol>
          </nav>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.ink, margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em', fontFamily: INTER }}>
            Income Tax on Salary: FY 2025-26
          </h1>
          <p style={{ fontSize: 15, color: C.ink2, margin: '0 0 16px', lineHeight: 1.7, maxWidth: 680 }}>
            Pre-computed income tax breakdowns for every salary level from Rs 3 lakh to Rs 1 crore. New regime slabs, old regime comparison, Section 87A rebate, and monthly in-hand salary. All figures verified against FY 2025-26 tax rules.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.paleLime, border: '1px solid #a6dbc4', borderRadius: 8, padding: '8px 14px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1f7a58" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1f7a58', fontFamily: INTER }}>
              Salaries up to Rs 12,75,000 are zero-tax under the new regime in FY 2025-26
            </span>
          </div>
        </header>

        {/* Zero Tax section */}
        <section aria-labelledby="zero-tax-heading" style={{ marginBottom: 44 }}>
          <h2 id="zero-tax-heading" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 6px', fontFamily: INTER }}>
            Zero Tax — New Regime (Gross up to Rs 12,75,000)
          </h2>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 16px', fontFamily: INTER }}>
            Section 87A rebate covers full tax liability. No TDS deducted. Old regime tax may still apply.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {zeroTax.map(e => <SalaryCard key={e.lakh} {...e} />)}
          </div>
        </section>

        {/* Divider */}
        <div style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '0 0 36px' }} />

        {/* Non-zero Tax section */}
        <section aria-labelledby="taxable-heading" style={{ marginBottom: 48 }}>
          <h2 id="taxable-heading" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 6px', fontFamily: INTER }}>
            New Regime Tax Applies (Gross above Rs 12,75,000)
          </h2>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 16px', fontFamily: INTER }}>
            Section 87A does not apply above this threshold. New regime still saves vs old regime in most cases.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {nonZero.map(e => <SalaryCard key={e.lakh} {...e} />)}
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, padding: '24px 28px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: C.ink, margin: '0 0 14px', fontFamily: INTER }}>
            How These Numbers Are Calculated
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              ['Standard deduction', 'Rs 75,000 subtracted from gross salary under both regimes.'],
              ['New regime slabs', '0% up to Rs 4L, 5% (4-8L), 10% (8-12L), 15% (12-16L), 20% (16-20L), 25% (20-24L), 30% above Rs 24L.'],
              ['Section 87A rebate', 'New regime: full rebate if taxable income is at or below Rs 12,00,000 (covers up to Rs 60,000 tax).'],
              ['4% health and education cess', 'Applied on net tax after surcharge and before rebate. Zero if tax is zero.'],
              ['In-hand assumption', '50% basic pay. Employee PF at 12% of basic. Professional tax Rs 200/month. No other deductions.'],
              ['Surcharge', '10% on tax when taxable income exceeds Rs 50 lakh. Applies only to 60L, 75L, and 100L entries on this page.'],
            ].map(([title, text]) => (
              <div key={title as string}>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, margin: '0 0 4px', fontFamily: INTER }}>{title}</p>
                <p style={{ fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.65, fontFamily: INTER }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 16px', fontFamily: INTER }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {[
              ['What is the zero-tax salary limit in FY 2025-26?', 'The zero-tax gross salary limit under the new regime in FY 2025-26 is Rs 12,75,000. After the standard deduction of Rs 75,000, taxable income is exactly Rs 12,00,000, which equals the Section 87A rebate ceiling. Any gross salary above Rs 12,75,000 produces a non-zero tax liability under the new regime.'],
              ['Is income tax zero for a 10 lakh salary?', 'Yes. For a Rs 10 lakh salary under the new regime, taxable income after the standard deduction is Rs 9,25,000. Tax at slab rates is Rs 32,500, fully covered by the Section 87A rebate. Monthly in-hand is approximately Rs 78,133.'],
              ['Which is better — old or new tax regime in FY 2025-26?', 'The new regime is better at every salary level shown on this page. Under the old regime, you would need Chapter VI-A deductions above Rs 3.75 lakh (80C + NPS + 80D + HRA combined) to match or beat the new regime at salaries above Rs 15 lakh. For most salaried employees, the new regime wins.'],
              ['At what salary does surcharge apply?', 'Surcharge applies when taxable income (gross minus standard deduction) exceeds Rs 50 lakh. For gross salary, that means approximately Rs 50,75,000 CTC. On this page, only the 60L, 75L, and 100L entries include surcharge (at 10%).'],
            ].map(([q, a], i, arr) => (
              <div key={q as string} style={{ padding: '18px 22px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <p style={{ fontSize: 14.5, fontWeight: 700, color: C.ink, margin: '0 0 8px', fontFamily: INTER }}>{q}</p>
                <p style={{ fontSize: 14, color: C.ink2, margin: 0, lineHeight: 1.75, fontFamily: INTER }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* City tax guides */}
        <section aria-labelledby="city-guides-heading" style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
            <h2 id="city-guides-heading" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: 0, fontFamily: INTER }}>
              Browse by City
            </h2>
            <Link href="/tax/by-city" style={{ fontSize: 13, fontWeight: 600, color: C.dark, textDecoration: 'underline', fontFamily: INTER }}>
              Full city comparison →
            </Link>
          </div>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 16px', fontFamily: INTER }}>
            Professional tax and HRA rules differ by city. Each city page shows all 19 salary levels with exact in-hand figures.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {CITIES.map(city => (
              <Link key={city.slug} href={`/tax/${city.slug}`} style={{ textDecoration: 'none', display: 'block', background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 18px', transition: 'box-shadow 0.15s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 2px', fontFamily: INTER }}>{city.name}</p>
                    <p style={{ fontSize: 12, color: C.ink3, margin: 0, fontFamily: INTER }}>{city.state}</p>
                  </div>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: city.pt === 0 ? '#1f7a58' : C.ink2, background: city.pt === 0 ? '#f4f5f6' : C.bg, border: `1px solid ${city.pt === 0 ? '#a6dbc4' : C.border}`, borderRadius: 99, padding: '3px 9px', whiteSpace: 'nowrap', fontFamily: INTER }}>
                    PT: {city.pt === 0 ? 'Nil' : `Rs ${city.pt.toLocaleString('en-IN')}/yr`}
                  </span>
                </div>
                <p style={{ fontSize: 12.5, color: C.ink3, margin: '0 0 8px', fontFamily: INTER }}>HRA {city.hra}% · {city.metro ? 'Metro' : 'Non-metro'}</p>
                <p style={{ fontSize: 13, fontWeight: 600, color: C.dark, margin: 0, fontFamily: INTER }}>View all 19 salary guides →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0, maxWidth: 800 }}>
          <strong>Disclaimer:</strong> All figures are indicative for FY 2025-26 based on standard salary structure assumptions (50% basic, no Chapter VI-A deductions for new regime, standard deduction Rs 75,000). Actual tax depends on exact salary components, declared deductions, and any non-salary income. Not financial or tax advice. Consult a qualified CA before filing.
        </p>
      </div>
      <SiteFooter columns={TAX_COLUMNS} />
    </div>
  );
}

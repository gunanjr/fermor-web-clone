import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { TAX_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'Income Tax by City India FY 2025-26',
  description: 'Compare income tax and monthly in-hand salary across Bangalore, Mumbai, Delhi, Hyderabad, Pune, and Chennai. Professional tax and HRA differences explained for FY 2025-26.',
  keywords: [
    'income tax by city india', 'professional tax bangalore mumbai delhi', 'in hand salary by city india',
    'income tax hyderabad pune chennai', 'professional tax comparison india cities', 'HRA exemption metro non-metro',
    'income tax FY 2025-26 india city', 'salary after tax bangalore vs delhi', 'professional tax india 2025',
    'income tax city comparison india', 'bangalore mumbai delhi income tax difference', 'PT deduction india cities',
  ],
  alternates: { canonical: 'https://fermor.in/tax/by-city' },
  openGraph: {
    title: 'Income Tax by City India FY 2025-26 - Fermor',
    description: 'Professional tax and HRA differ across India\'s IT cities. See exact monthly in-hand salary for Bangalore, Mumbai, Delhi, Hyderabad, Pune, and Chennai.',
    type: 'article',
    url: 'https://fermor.in/tax/by-city',
    siteName: 'Fermor',
    publishedTime: '2026-06-23',
    images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax by City India FY 2025-26' }],
  },
  twitter: { card: 'summary_large_image', title: 'Income Tax by City India FY 2025-26 - Fermor', description: 'Compare professional tax and in-hand salary across Bangalore, Mumbai, Delhi, Hyderabad, Pune, Chennai.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const C = { dark: '#101214', lime: '#a6dbc4', ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff', bg: '#f6f7f8', border: '#e3e6e8', paleLime: '#f4f5f6' };
const INTER = 'var(--font-inter), Inter, sans-serif';

const CITIES = [
  { name: 'Bangalore', slug: 'bangalore', state: 'Karnataka',   pt: 2500, ptMonthly: 208, hra: 40, metro: false, ptNote: 'Rs 200 x 11 + Rs 300 in Feb', employers: ['Infosys', 'Google', 'Amazon', 'Wipro'] },
  { name: 'Mumbai',    slug: 'mumbai',    state: 'Maharashtra', pt: 2500, ptMonthly: 208, hra: 50, metro: true,  ptNote: 'Rs 200 x 11 + Rs 300 in Feb', employers: ['TCS', 'Reliance', 'Goldman Sachs', 'HDFC Bank'] },
  { name: 'Delhi',     slug: 'delhi',     state: 'Delhi',       pt: 0,    ptMonthly: 0,   hra: 50, metro: true,  ptNote: 'No professional tax in Delhi NCT', employers: ['HCL', 'Paytm', 'KPMG', 'Tech Mahindra'] },
  { name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana',   pt: 2400, ptMonthly: 200, hra: 40, metro: false, ptNote: 'Flat Rs 200/month (12 months)',   employers: ['Microsoft', 'Apple', 'Meta', 'Cognizant'] },
  { name: 'Pune',      slug: 'pune',      state: 'Maharashtra', pt: 2500, ptMonthly: 208, hra: 40, metro: false, ptNote: 'Rs 200 x 11 + Rs 300 in Feb', employers: ['TCS', 'Capgemini', 'Persistent', 'Infosys'] },
  { name: 'Chennai',   slug: 'chennai',   state: 'Tamil Nadu',  pt: 2500, ptMonthly: 208, hra: 50, metro: true,  ptNote: 'Approx Rs 208/month (TN schedule)', employers: ['HCL', 'Cognizant', 'Zoho', 'TCS'] },
];

function computeInHand10L(ptPerYear: number): number {
  const g = Math.round(1000000 / 12);
  const pf = Math.round(g * 0.06);
  return g - pf - Math.round(ptPerYear / 12);
}

function fmtRs(n: number): string {
  const s = Math.round(n).toString();
  if (s.length <= 3) return 'Rs ' + s;
  let result = s.slice(-3); let rest = s.slice(0, -3);
  while (rest.length > 2) { result = rest.slice(-2) + ',' + result; rest = rest.slice(0, -2); }
  return 'Rs ' + rest + ',' + result;
}

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' },
    { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Income Tax by City India FY 2025-26 - Fermor',
  description: 'Compare professional tax, HRA exemption, and monthly in-hand salary across Bangalore, Mumbai, Delhi, Hyderabad, Pune, and Chennai for FY 2025-26.',
  url: 'https://fermor.in/tax/by-city',
  inLanguage: 'en-IN', datePublished: '2026-06-23', dateModified: '2026-06-23',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
  audience: { '@type': 'Audience', audienceType: 'Indian salaried employees, job seekers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#pt-comparison', name: 'Professional Tax Comparison Table' },
    { '@type': 'WebPageElement', cssSelector: '#city-cards', name: 'City Tax Guide Cards' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Which city has the highest in-hand salary in India?', acceptedAnswer: { '@type': 'Answer', text: 'Delhi has the highest in-hand salary at any given gross salary because Delhi (NCT) has no professional tax (Rs 0/year). Bangalore, Mumbai, Pune, and Chennai charge Rs 2,500/year PT, while Hyderabad charges Rs 2,400/year. At Rs 10 lakh salary, a Delhi employee takes home Rs 78,333/month vs Rs 78,125 in Bangalore.' } },
    { '@type': 'Question', name: 'What is professional tax and which cities charge it?', acceptedAnswer: { '@type': 'Answer', text: 'Professional tax is a state-level tax on salaried employees. Bangalore (Karnataka) and Mumbai/Pune (Maharashtra) charge Rs 2,500/year. Chennai (Tamil Nadu) charges Rs 2,500/year. Hyderabad (Telangana) charges Rs 2,400/year (flat Rs 200/month). Delhi (NCT) charges Rs 0: it is the only major IT hub with no professional tax.' } },
    { '@type': 'Question', name: 'Is HRA exemption 40% or 50% in Indian cities?', acceptedAnswer: { '@type': 'Answer', text: 'The 50% HRA exemption rate (metro) applies in Mumbai, Delhi, Chennai, and Kolkata. The 40% rate (non-metro) applies in Bangalore, Hyderabad, and Pune. This matters only under the old tax regime. Under the new regime, HRA exemption is not available.' } },
    { '@type': 'Question', name: 'Does professional tax reduce taxable income?', acceptedAnswer: { '@type': 'Answer', text: 'Under the old tax regime, professional tax paid is deductible from gross salary under Section 16(iii). Under the new tax regime (FY 2025-26), professional tax is not deductible: it simply reduces your take-home without any tax benefit.' } },
  ],
};

export default function ByCityPage() {
  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 20px 80px' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', listStyle: 'none', padding: 0, margin: 0, fontSize: 12.5, color: C.ink3 }}>
            <li><Link href="/" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
            <li>/</li>
            <li><Link href="/tax" style={{ color: C.ink3, textDecoration: 'none' }}>Tax Guides</Link></li>
            <li>/</li>
            <li style={{ color: C.ink }}><span aria-current="page">City Tax Guides</span></li>
          </ol>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 36 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.ink, margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Income Tax by City in India FY 2025-26
          </h1>
          <p style={{ fontSize: 15, color: C.ink2, margin: '0 0 16px', lineHeight: 1.7, maxWidth: 720 }}>
            Your monthly in-hand salary differs based on where you work. Professional tax varies by state, and HRA exemption rates differ between metro and non-metro cities. Select your city below for the exact breakdown.
          </p>
          <Link href="/tax" style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, textDecoration: 'underline' }}>
            Browse by salary level instead (all cities combined)
          </Link>
        </header>

        {/* PT quick-reference table */}
        <section aria-labelledby="pt-comparison" style={{ marginBottom: 44 }}>
          <h2 id="pt-comparison" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>
            Professional Tax and HRA by City
          </h2>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 14px' }}>
            These two factors determine the difference in take-home salary between cities at the same gross CTC.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: C.white, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.border}` }}>
              <caption style={{ display: 'none' }}>Professional tax and HRA exemption rates for major Indian cities FY 2025-26</caption>
              <thead>
                <tr style={{ background: C.bg }}>
                  {['City', 'State', 'Professional Tax', 'Monthly PT', 'HRA Rate', 'In-Hand at 10L'].map(h => (
                    <th key={h} scope="col" style={{ padding: '11px 16px', fontSize: 12.5, fontWeight: 700, color: C.ink, textAlign: 'left', borderBottom: `1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CITIES
                  .map(c => ({ ...c, ih: computeInHand10L(c.pt) }))
                  .sort((a, b) => b.ih - a.ih)
                  .map((c, i) => (
                    <tr key={c.slug} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                      <td style={{ padding: '10px 16px', fontSize: 13.5, fontWeight: 700 }}>
                        <Link href={`/tax/${c.slug}`} style={{ color: C.dark, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                          {c.name} <span style={{ fontSize: 11, color: C.ink3 }}>→</span>
                        </Link>
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: 13, color: C.ink2 }}>{c.state}</td>
                      <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: c.pt === 0 ? '#1f7a58' : C.ink2 }}>
                        {c.pt === 0 ? 'Nil' : `Rs ${c.pt.toLocaleString('en-IN')}/yr`}
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: 13, color: C.ink2 }}>
                        {c.ptMonthly === 0 ? 'Nil' : `Rs ${c.ptMonthly}`}
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: 13, color: C.ink2 }}>
                        {c.hra}% ({c.metro ? 'Metro' : 'Non-metro'})
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: 13.5, fontWeight: 700, color: C.ink }}>{fmtRs(c.ih)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: C.ink3, marginTop: 8 }}>In-hand at Rs 10 lakh salary, new regime (zero tax), after PF + PT. Sorted by highest take-home.</p>
        </section>

        {/* City cards */}
        <section aria-labelledby="city-cards" style={{ marginBottom: 48 }}>
          <h2 id="city-cards" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>
            Browse Tax Guides by City
          </h2>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 18px' }}>
            Each city page shows all 19 salary levels with exact in-hand figures for that city.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: 16 }}>
            {CITIES.map(city => (
              <div key={city.slug} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden' }}>
                {/* Card header */}
                <div style={{ padding: '18px 20px 14px', borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: C.ink, margin: '0 0 2px' }}>{city.name}</h3>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>{city.state}</p>
                    </div>
                    <Link href={`/tax/${city.slug}`} style={{ fontSize: 13, fontWeight: 700, color: C.dark, background: C.lime, padding: '6px 12px', borderRadius: 7, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      All salaries →
                    </Link>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: city.pt === 0 ? '#1f7a58' : C.ink2, background: city.pt === 0 ? '#f4f5f6' : C.bg, border: `1px solid ${city.pt === 0 ? '#a6dbc4' : C.border}`, borderRadius: 99, padding: '3px 9px' }}>
                      PT: {city.pt === 0 ? 'Nil' : `Rs ${city.pt.toLocaleString('en-IN')}/yr`}
                    </span>
                    <span style={{ fontSize: 11.5, color: C.ink3, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 99, padding: '3px 9px' }}>
                      HRA {city.hra}% · {city.metro ? 'Metro' : 'Non-metro'}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: C.ink3, margin: '8px 0 0', lineHeight: 1.5 }}>{city.ptNote}</p>
                </div>

                <div style={{ padding: '14px 20px' }}>
                  <p style={{ fontSize: 12, color: C.ink3, margin: 0 }}>
                    Top employers: {city.employers.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" style={{ marginBottom: 44 }}>
          <h2 id="faq" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 14px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {[
              ['Which city has the highest in-hand salary in India?', 'Delhi has the highest in-hand salary at any given gross salary because Delhi (NCT) has no professional tax (Rs 0/year). Bangalore, Mumbai, Pune, and Chennai charge Rs 2,500/year, while Hyderabad charges Rs 2,400/year. At Rs 10 lakh salary (new regime, zero tax), Delhi monthly in-hand is Rs 78,333 versus Rs 78,125 in Bangalore.'],
              ['What is professional tax and which cities charge it in 2025-26?', 'Professional tax is a state-level tax on salaried employees. Karnataka (Bangalore) and Maharashtra (Mumbai, Pune) levy Rs 2,500/year (Rs 200 x 11 months + Rs 300 in February). Tamil Nadu (Chennai) levies Rs 2,500/year (approx Rs 208/month). Telangana (Hyderabad) levies Rs 2,400/year (flat Rs 200/month). Delhi NCT has no professional tax.'],
              ['Does HRA differ between Bangalore and Mumbai?', 'Yes. Mumbai and Chennai are metro cities under the IT Act, so HRA exemption is 50% of basic salary. Bangalore, Hyderabad, and Pune are non-metro, so the limit is 40% of basic salary. This matters only under the old tax regime: HRA exemption is not available under the new regime.'],
              ['Does professional tax reduce taxable income?', 'Under the old tax regime, PT paid is deductible under Section 16(iii). Under the new tax regime (FY 2025-26), PT is not deductible. It is deducted from your gross salary by your employer and reduces take-home, but provides no additional tax benefit under the new regime.'],
            ].map(([q, a], i, arr) => (
              <details key={q as string} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <summary style={{ padding: '17px 22px', fontSize: 14.5, fontWeight: 700, color: C.ink, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div style={{ padding: '0 22px 18px', fontSize: 14, color: C.ink2, lineHeight: 1.75 }}>{a}</div>
              </details>
            ))}
          </div>
        </section>

        <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, maxWidth: 800 }}>
          <strong>Disclaimer:</strong> All figures are indicative for FY 2025-26. Standard assumptions: 50% basic, PF at 12% of basic, standard deduction Rs 75,000, no additional Chapter VI-A deductions. Actual take-home depends on exact salary structure. Not tax advice.
        </p>
      </div>
      <SiteFooter columns={TAX_COLUMNS} />
    </div>
  );
}

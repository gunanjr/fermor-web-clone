import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { TAX_COLUMNS } from '../../../src/components/common/footerLinks';

const C = {
  dark: '#101214', lime: '#a6dbc4', ink: '#16140F', ink2: '#50565c',
  ink3: '#7a8087', white: '#ffffff', bg: '#f6f7f8', border: '#e3e6e8',
  paleLime: '#f4f5f6', lime2: '#A8D428',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

export interface CityConfig {
  name: string;
  slug: string;
  state: string;
  profTaxPerYear: number;
  profTaxNote: string;
  isMetroHRA: boolean;
  hraExemptionPct: number;
  topEmployers: string[];
  costOfLivingNote: string;
}

const SALARY_LEVELS = [
  { lakh: 3,  newTax: 0,        oldTax: 0        },
  { lakh: 4,  newTax: 0,        oldTax: 0        },
  { lakh: 5,  newTax: 0,        oldTax: 0        },
  { lakh: 6,  newTax: 0,        oldTax: 23400    },
  { lakh: 7,  newTax: 0,        oldTax: 44200    },
  { lakh: 8,  newTax: 0,        oldTax: 65000    },
  { lakh: 9,  newTax: 0,        oldTax: 85800    },
  { lakh: 10, newTax: 0,        oldTax: 106600   },
  { lakh: 11, newTax: 0,        oldTax: 132600   },
  { lakh: 13, newTax: 66300,    oldTax: 195000   },
  { lakh: 14, newTax: 81900,    oldTax: 226200   },
  { lakh: 15, newTax: 97500,    oldTax: 257400   },
  { lakh: 18, newTax: 150800,   oldTax: 351000   },
  { lakh: 20, newTax: 192400,   oldTax: 413400   },
  { lakh: 25, newTax: 319800,   oldTax: 569400   },
  { lakh: 30, newTax: 475800,   oldTax: 725400   },
  { lakh: 35, newTax: 631800,   oldTax: 881400   },
  { lakh: 40, newTax: 787800,   oldTax: 1037400  },
  { lakh: 50, newTax: 1099800,  oldTax: 1349400  },
];

const ALL_CITIES: CityConfig[] = [
  { name: 'Bangalore',     slug: 'bangalore',     state: 'Karnataka',       profTaxPerYear: 2500, profTaxNote: 'Rs 200 x 11 months + Rs 300 in Feb',    isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['Infosys','Wipro','Google','Amazon','Flipkart','Accenture'],            costOfLivingNote: "India's highest-paying IT market with above-average living costs" },
  { name: 'Mumbai',        slug: 'mumbai',        state: 'Maharashtra',     profTaxPerYear: 2500, profTaxNote: 'Rs 200 x 11 months + Rs 300 in Feb',    isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['TCS','Reliance','HDFC Bank','Goldman Sachs','JP Morgan','Deloitte'],   costOfLivingNote: 'Highest cost of living in India, especially housing and commute' },
  { name: 'Delhi',         slug: 'delhi',         state: 'Delhi',           profTaxPerYear: 0,    profTaxNote: 'No professional tax in Delhi NCT',       isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['HCL','Tech Mahindra','Paytm','OYO','KPMG','PwC'],                    costOfLivingNote: 'No professional tax; highest take-home among all metro cities' },
  { name: 'Hyderabad',     slug: 'hyderabad',     state: 'Telangana',       profTaxPerYear: 2400, profTaxNote: 'Flat Rs 200/month, 12 months',           isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['Microsoft','Infosys','Cognizant','Apple','Meta','Amazon'],            costOfLivingNote: 'Lower cost of living than Bangalore with comparable IT salaries' },
  { name: 'Pune',          slug: 'pune',          state: 'Maharashtra',     profTaxPerYear: 2500, profTaxNote: 'Rs 200 x 11 months + Rs 300 in Feb',    isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['TCS','Infosys','Capgemini','Cognizant','Bajaj Auto','Persistent'],    costOfLivingNote: 'More affordable than Mumbai with strong IT and manufacturing sectors' },
  { name: 'Chennai',       slug: 'chennai',       state: 'Tamil Nadu',      profTaxPerYear: 2500, profTaxNote: 'Approx Rs 208/month (Tamil Nadu PT)',    isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['HCL','Cognizant','TCS','Zoho','Ford India','Hyundai'],               costOfLivingNote: 'Metro HRA benefit with below-average cost of living vs Mumbai' },
  { name: 'Kolkata',       slug: 'kolkata',       state: 'West Bengal',     profTaxPerYear: 2500, profTaxNote: 'Rs 200 x 11 months + Rs 300 in Feb',    isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['TCS','Wipro','Cognizant','ITC','Infosys','Coal India'],              costOfLivingNote: 'Most affordable major metro with robust IT and BFSI job market' },
  { name: 'Ahmedabad',     slug: 'ahmedabad',     state: 'Gujarat',         profTaxPerYear: 2400, profTaxNote: 'Flat Rs 200/month (Gujarat PT)',         isMetroHRA: true,  hraExemptionPct: 50, topEmployers: ['Adani Group','Zydus','Torrent Pharma','Sun Pharma','ISRO','L&T'],     costOfLivingNote: 'Metro HRA since 2026; below-average cost of living; strong pharma sector' },
  { name: 'Noida',         slug: 'noida',         state: 'Uttar Pradesh',   profTaxPerYear: 0,    profTaxNote: 'No professional tax in UP',              isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['HCL','Samsung','Adobe','Sapient','Infoedge','NIIT'],                  costOfLivingNote: 'No PT; strong IT sector, lower cost of living than Gurgaon' },
  { name: 'Gurgaon',       slug: 'gurgaon',       state: 'Haryana',         profTaxPerYear: 0,    profTaxNote: 'No professional tax in Haryana',         isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['Maruti Suzuki','DLF','Deloitte','EY','Google','Microsoft'],           costOfLivingNote: 'No PT; highest-paying IT and consulting market in NCR' },
  { name: 'Kochi',         slug: 'kochi',         state: 'Kerala',          profTaxPerYear: 2500, profTaxNote: 'Rs 1,250 half-yearly (Kerala PT)',       isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['Infosys','TCS','UST Global','IBS Group','Wipro','Cognizant'],         costOfLivingNote: 'Strong IT services and shipping sector; below-average rent' },
  { name: 'Jaipur',        slug: 'jaipur',        state: 'Rajasthan',       profTaxPerYear: 0,    profTaxNote: 'No professional tax in Rajasthan',       isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['Infosys','Wipro','HCL','Concentrix','Genpact','EXL'],                costOfLivingNote: 'No PT; rapidly growing IT sector with below-average housing costs' },
  { name: 'Lucknow',       slug: 'lucknow',       state: 'Uttar Pradesh',   profTaxPerYear: 0,    profTaxNote: 'No professional tax in UP',              isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['HCL','TCS','Wipro','Infosys','NTPC','Indian Railways'],              costOfLivingNote: 'No PT; fast-growing IT corridor with strong PSU sector' },
  { name: 'Chandigarh',    slug: 'chandigarh',    state: 'Chandigarh (UT)', profTaxPerYear: 0,    profTaxNote: 'No professional tax (Union Territory)', isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['Infosys','Quark','Impetus','Nagarro','Dell','HCL'],                   costOfLivingNote: 'Zero PT with planned city infrastructure and moderate living costs' },
  { name: 'Nagpur',        slug: 'nagpur',        state: 'Maharashtra',     profTaxPerYear: 2500, profTaxNote: 'Rs 200 x 11 months + Rs 300 in Feb',    isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['Infosys','TCS','Wipro','HCL','NMDC','Coal India'],                   costOfLivingNote: 'Central India logistics hub; lower cost of living than Mumbai or Pune' },
  { name: 'Coimbatore',    slug: 'coimbatore',    state: 'Tamil Nadu',      profTaxPerYear: 2500, profTaxNote: 'Rs 1,250 half-yearly (Tamil Nadu PT)',   isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['Robert Bosch','Pricol','LMW','Wipro','Cognizant','TCS'],             costOfLivingNote: 'Manufacturing hub with fast-growing IT; living costs below Chennai' },
  { name: 'Surat',         slug: 'surat',         state: 'Gujarat',         profTaxPerYear: 2400, profTaxNote: 'Flat Rs 200/month (Gujarat PT)',         isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['Reliance','Adani','Garden Silk Mills','ONGC','TCS','HCL'],           costOfLivingNote: 'Diamond and textile capital; one of the lowest costs of living' },
  { name: 'Visakhapatnam', slug: 'visakhapatnam', state: 'Andhra Pradesh',  profTaxPerYear: 2500, profTaxNote: 'Rs 200 x 11 months + Rs 300 in March',  isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['HCL','Wipro','Infosys','HPCL','RINL Steel','NTPC'],                  costOfLivingNote: 'Coastal IT and port city; among the lowest living costs in AP' },
  { name: 'Indore',        slug: 'indore',        state: 'Madhya Pradesh',  profTaxPerYear: 2500, profTaxNote: 'Approx Rs 208/month (MP PT schedule)',   isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['TCS','Infosys','Wipro','Impetus','KPIT','HCL'],                       costOfLivingNote: "India's Cleanest City; lower real estate costs than Pune or Bangalore" },
  { name: 'Bhopal',        slug: 'bhopal',        state: 'Madhya Pradesh',  profTaxPerYear: 2500, profTaxNote: 'Approx Rs 208/month (MP PT schedule)',   isMetroHRA: false, hraExemptionPct: 40, topEmployers: ['HCL','Wipro','Infosys','BHEL','NTPC','Gas Authority of India'],      costOfLivingNote: 'State capital with large PSU base; among the lowest living costs in India' },
];

function computeInHand(lakh: number, ptPerYear: number, newTax: number): number {
  const g = Math.round((lakh * 100000) / 12);
  const pf = Math.round(g * 0.06);
  const pt = Math.round(ptPerYear / 12);
  const tds = Math.round(newTax / 12);
  return g - pf - pt - tds;
}

function fmtRs(n: number): string {
  if (n === 0) return 'Rs 0';
  const s = Math.round(Math.abs(n)).toString();
  if (s.length <= 3) return 'Rs ' + s;
  let result = s.slice(-3);
  let rest = s.slice(0, -3);
  while (rest.length > 2) { result = rest.slice(-2) + ',' + result; rest = rest.slice(0, -2); }
  return 'Rs ' + rest + ',' + result;
}

function SalaryCard({ lakh, newTax, oldTax, city }: { lakh: number; newTax: number; oldTax: number; city: CityConfig }) {
  const ih = computeInHand(lakh, city.profTaxPerYear, newTax);
  const isZero = newTax === 0;
  return (
      <div style={{
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 12,
        padding: '16px 18px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: INTER }}>Rs {lakh} lakh</span>
          {isZero
            ? <span style={{ fontSize: 11, fontWeight: 700, color: '#1f7a58', background: '#f4f5f6', border: '1px solid #a6dbc4', borderRadius: 99, padding: '2px 9px' }}>ZERO TAX</span>
            : <span style={{ fontSize: 11, fontWeight: 600, color: C.ink3, background: C.bg, borderRadius: 99, padding: '2px 8px' }}>New: {fmtRs(newTax)}</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>Old regime</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: oldTax === 0 ? '#1f7a58' : C.ink2, fontFamily: INTER }}>{oldTax === 0 ? 'Zero' : fmtRs(oldTax)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>Monthly in-hand</span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: C.ink2, fontFamily: INTER }}>{fmtRs(ih)}</span>
          </div>
        </div>
      </div>
  );
}

export default function CityIndexPage({ city, schemas }: { city: CityConfig; schemas: object[] }) {
  const zeroTax = SALARY_LEVELS.filter(e => e.newTax === 0);
  const taxable = SALARY_LEVELS.filter(e => e.newTax > 0);
  const otherCities = ALL_CITIES.filter(c => c.slug !== city.slug);
  const pt10L = computeInHand(10, city.profTaxPerYear, 0);
  const delhi10L = computeInHand(10, 0, 0);
  const ptSaving = delhi10L - pt10L;

  const faqs = [
    {
      q: `How much professional tax in ${city.name} FY 2025-26?`,
      a: city.profTaxPerYear === 0
        ? `Delhi (National Capital Territory) does not levy professional tax. Salaried employees in Delhi pay Rs 0 PT per year, which makes Delhi the highest take-home city at any given gross salary compared to Bangalore, Mumbai, Chennai, Hyderabad, and Pune.`
        : `Professional tax in ${city.name} (${city.state}) is Rs ${city.profTaxPerYear.toLocaleString('en-IN')}/year for salaried employees above the income threshold. ${city.profTaxNote}. This works out to Rs ${Math.round(city.profTaxPerYear / 12)}/month deducted from your monthly pay.`,
    },
    {
      q: `What is monthly in-hand for Rs 10 lakh salary in ${city.name}?`,
      a: `For Rs 10 lakh CTC in ${city.name}, monthly in-hand under the new regime is Rs ${fmtRs(pt10L)}. Deductions: employee PF Rs 5,000/month (12% of basic), professional tax Rs ${Math.round(city.profTaxPerYear / 12)}/month, and zero TDS (tax is nil after Section 87A rebate). Income tax on Rs 10 lakh salary in ${city.name} is zero under the new regime in FY 2025-26.`,
    },
    {
      q: `Is HRA exemption 40% or 50% in ${city.name}?`,
      a: city.isMetroHRA
        ? `${city.name} is classified as a metro city under Section 10(13A) of the Income Tax Act. The HRA exemption rate is 50% of basic salary (not 40%). This applies to Mumbai, Delhi, Chennai, and Kolkata only. Old regime filers paying significant rent get a larger HRA deduction in ${city.name} than in non-metro cities like Bangalore, Hyderabad, or Pune.`
        : `${city.name} is classified as a non-metro city under the Income Tax Act. The HRA exemption rate is capped at 40% of basic salary (not 50% as in Mumbai, Delhi, or Chennai). Old regime filers in ${city.name} get a smaller HRA deduction than metro cities, which narrows the old regime advantage for rent-payers.`,
    },
    {
      q: `How does ${city.name} in-hand compare with Delhi at the same salary?`,
      a: city.profTaxPerYear === 0
        ? `Delhi employees have zero professional tax, which is the highest take-home among all major cities. At Rs 10 lakh salary, Delhi monthly in-hand is Rs ${fmtRs(delhi10L)}, the highest compared to all other cities.`
        : `Delhi has no professional tax (Rs 0/year), while ${city.name} charges Rs ${city.profTaxPerYear.toLocaleString('en-IN')}/year (Rs ${Math.round(city.profTaxPerYear / 12)}/month). At Rs 10 lakh salary, a ${city.name} employee takes home Rs ${ptSaving}/month less than a Delhi employee at the same gross salary: a difference of Rs ${(ptSaving * 12).toLocaleString('en-IN')}/year due to professional tax alone.`,
    },
    {
      q: `Which salary levels are zero-tax in ${city.name} in FY 2025-26?`,
      a: `Under the new tax regime, all salaries up to Rs 12,75,000/year (Rs 12.75 lakh) are zero-tax in ${city.name}, and in every Indian city. The Section 87A rebate covers the full tax liability for taxable income up to Rs 12 lakh (gross salary Rs 12,75,000 after Rs 75,000 standard deduction). This includes Rs 3L, Rs 4L, Rs 5L, Rs 6L, Rs 7L, Rs 8L, Rs 9L, Rs 10L, Rs 11L salaries shown on this page.`,
    },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 20px 80px' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', listStyle: 'none', padding: 0, margin: 0, fontSize: 12.5, color: C.ink3 }}>
            <li><Link href="/" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
            <li style={{ color: C.ink3 }}>/</li>
            <li><Link href="/tax" style={{ color: C.ink3, textDecoration: 'none' }}>Tax Guides</Link></li>
            <li style={{ color: C.ink3 }}>/</li>
            <li><Link href="/tax/by-city" style={{ color: C.ink3, textDecoration: 'none' }}>City Tax Guides</Link></li>
            <li style={{ color: C.ink3 }}>/</li>
            <li style={{ color: C.ink }}><span aria-current="page">{city.name}</span></li>
          </ol>
        </nav>

        {/* Header */}
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.ink, margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Income Tax in {city.name} ({city.state}) FY 2025-26
          </h1>
          <p style={{ fontSize: 15, color: C.ink2, margin: '0 0 20px', lineHeight: 1.7, maxWidth: 700 }}>
            {city.profTaxPerYear > 0
              ? `Professional tax of Rs ${city.profTaxPerYear.toLocaleString('en-IN')}/year applies in ${city.name} (${city.profTaxNote}). HRA exemption: ${city.hraExemptionPct}% of basic salary (${city.isMetroHRA ? 'metro city' : 'non-metro city'} under IT Act). All in-hand figures below account for PT, PF, and TDS.`
              : `Delhi has no professional tax: salaried employees pay Rs 0 PT per year, making it the highest take-home city at any gross salary. HRA exemption: 50% of basic salary (metro city). All in-hand figures below account for PF and TDS only.`}
          </p>

          {/* City stat chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: city.profTaxPerYear === 0 ? '#f4f5f6' : C.white, border: `1px solid ${city.profTaxPerYear === 0 ? '#a6dbc4' : C.border}`, borderRadius: 8, padding: '7px 13px' }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: city.profTaxPerYear === 0 ? '#1f7a58' : C.ink, fontFamily: INTER }}>
                PT: {city.profTaxPerYear === 0 ? 'Nil' : `Rs ${city.profTaxPerYear.toLocaleString('en-IN')}/yr`}
              </span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 13px' }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>HRA: {city.hraExemptionPct}% {city.isMetroHRA ? '(Metro)' : '(Non-metro)'}</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 13px' }}>
              <span style={{ fontSize: 12.5, color: C.ink2 }}>Top employers: {city.topEmployers.slice(0, 3).join(', ')}</span>
            </div>
          </div>
        </header>

        {/* Zero-tax salary grid */}
        <section aria-labelledby="zero-tax-h" style={{ marginBottom: 40 }}>
          <h2 id="zero-tax-h" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>
            Zero Tax Salaries in {city.name}
          </h2>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 14px' }}>
            Section 87A rebate covers full tax up to Rs 12,75,000 gross. Professional tax of Rs {Math.round(city.profTaxPerYear / 12)}/month still deducted.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))', gap: 10 }}>
            {zeroTax.map(e => <SalaryCard key={e.lakh} {...e} city={city} />)}
          </div>
        </section>

        <div style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '0 0 32px' }} />

        {/* Taxable salary grid */}
        <section aria-labelledby="taxable-h" style={{ marginBottom: 44 }}>
          <h2 id="taxable-h" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>
            New Regime Tax Applies in {city.name}
          </h2>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 14px' }}>
            Gross above Rs 12,75,000. Section 87A rebate does not apply. New regime still saves vs old regime at most salary levels.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))', gap: 10 }}>
            {taxable.map(e => <SalaryCard key={e.lakh} {...e} city={city} />)}
          </div>
        </section>

        {/* PT explanation box */}
        <section style={{ background: C.white, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.lime}`, borderRadius: 12, padding: '22px 24px', marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: C.ink, margin: '0 0 10px' }}>
            Professional Tax in {city.name}: How It Works
          </h2>
          <p style={{ fontSize: 14, color: C.ink2, margin: '0 0 12px', lineHeight: 1.75 }}>
            {city.profTaxNote}. Your employer deducts PT monthly from gross pay before crediting your salary.
          </p>
          <p style={{ fontSize: 13.5, color: C.ink2, margin: 0, lineHeight: 1.7 }}>
            The monthly deduction is Rs {Math.round(city.profTaxPerYear / 12)}
            {city.profTaxPerYear === 2500 ? ' for 11 months and Rs 300 in February' : city.profTaxPerYear === 2400 ? ' flat every month (no February variation)' : ''}.
            {city.profTaxPerYear > 0 && ` This Rs ${city.profTaxPerYear.toLocaleString('en-IN')}/year is not deductible under the new tax regime.`}
          </p>
        </section>

        {/* City comparison table */}
        <section aria-labelledby="city-compare-h" style={{ marginBottom: 44 }}>
          <h2 id="city-compare-h" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>
            How {city.name} In-Hand Compares to Other Cities
          </h2>
          <p style={{ fontSize: 13.5, color: C.ink3, margin: '0 0 14px' }}>
            At Rs 10 lakh salary. Only professional tax differs: income tax and PF are the same across all cities.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: C.white, borderRadius: 10, overflow: 'hidden', border: `1px solid ${C.border}` }}>
              <caption style={{ display: 'none' }}>Monthly in-hand salary at Rs 10 lakh CTC across major Indian cities, FY 2025-26</caption>
              <thead>
                <tr style={{ background: '#f6f7f8' }}>
                  {['City', 'State', 'PT/year', 'PT/month', 'Monthly in-hand'].map(h => (
                    <th key={h} scope="col" style={{ padding: '11px 16px', fontSize: 12.5, fontWeight: 700, color: C.ink, textAlign: 'left', borderBottom: `1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_CITIES
                  .map(c => ({ ...c, ih: computeInHand(10, c.profTaxPerYear, 0) }))
                  .sort((a, b) => b.ih - a.ih)
                  .map((c, i) => (
                    <tr key={c.slug} style={{ background: c.slug === city.slug ? C.paleLime : i % 2 === 0 ? C.white : '#fafafa' }}>
                      <td style={{ padding: '10px 16px', fontSize: 13.5, fontWeight: c.slug === city.slug ? 700 : 500, color: C.ink }}>
                        <Link href={`/tax/${c.slug}`} style={{ color: C.ink, textDecoration: 'none' }}>
                          {c.name}{c.slug === city.slug ? ' (this city)' : ''}
                        </Link>
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: 13, color: C.ink2 }}>{c.state}</td>
                      <td style={{ padding: '10px 16px', fontSize: 13, color: c.profTaxPerYear === 0 ? '#1f7a58' : C.ink2, fontWeight: c.profTaxPerYear === 0 ? 700 : 400 }}>
                        {c.profTaxPerYear === 0 ? 'Nil' : `Rs ${c.profTaxPerYear.toLocaleString('en-IN')}`}
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: 13, color: C.ink2 }}>
                        {c.profTaxPerYear === 0 ? 'Nil' : `Rs ${Math.round(c.profTaxPerYear / 12)}`}
                      </td>
                      <td style={{ padding: '10px 16px', fontSize: 13.5, fontWeight: 700, color: C.ink }}>{fmtRs(c.ih)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Other cities */}
        <section aria-labelledby="other-cities-h" style={{ marginBottom: 44 }}>
          <h2 id="other-cities-h" style={{ fontSize: 17, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>
            Browse Other City Tax Guides
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {otherCities.map(c => (
              <Link key={c.slug} href={`/tax/${c.slug}`} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px' }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{c.name}</p>
                <p style={{ fontSize: 12, color: C.ink3, margin: '0 0 6px' }}>{c.state} · PT: {c.profTaxPerYear === 0 ? 'Nil' : `Rs ${c.profTaxPerYear.toLocaleString('en-IN')}/yr`}</p>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: C.dark }}>View all {c.name} salary guides →</p>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/tax/by-city" style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, textDecoration: 'underline' }}>
              Compare all cities on one page
            </Link>
            <span style={{ fontSize: 13, color: C.ink3, marginLeft: 16 }}>or</span>
            <Link href="/tax" style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, textDecoration: 'underline', marginLeft: 16 }}>
              Browse by salary level (all cities)
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-h" style={{ marginBottom: 44 }}>
          <h2 id="faq-h" style={{ fontSize: 18, fontWeight: 700, color: C.ink, margin: '0 0 14px' }}>
            Frequently Asked Questions: {city.name} Income Tax
          </h2>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
            {faqs.map((faq, i) => (
              <details key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <summary style={{ padding: '17px 22px', fontSize: 14.5, fontWeight: 700, color: C.ink, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div style={{ padding: '0 22px 18px', fontSize: 14, color: C.ink2, lineHeight: 1.75 }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, maxWidth: 800 }}>
          <strong>Disclaimer:</strong> All figures are indicative for FY 2025-26. Standard assumptions: 50% basic salary, employee PF at 12% of basic, no additional Chapter VI-A deductions under new regime, standard deduction Rs 75,000. Actual tax and in-hand depend on exact salary structure and declared deductions. Not financial or tax advice.
        </p>
      </div>
      <SiteFooter columns={TAX_COLUMNS} />
    </div>
  );
}

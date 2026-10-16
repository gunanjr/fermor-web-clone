import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Chandigarh', slug: 'chandigarh', state: 'Chandigarh (UT)',
  profTaxPerYear: 0,
  profTaxNote: 'Chandigarh as a Union Territory does not levy any professional tax. Salaried employees in Chandigarh pay zero professional tax on their monthly salary.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['Infosys', 'Quark', 'Impetus', 'Nagarro', 'Dell', 'HCL'],
  costOfLivingNote: "Zero professional tax UT with planned city infrastructure and moderate cost of living versus metro cities",
};

export const metadata: Metadata = {
  title: 'Income Tax in Chandigarh FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Chandigarh FY 2025-26. Professional tax Rs 0/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax chandigarh 2025-26', 'professional tax chandigarh', 'salary in hand chandigarh', 'income tax Chandigarh (UT)', 'chandigarh IT salary tax', 'HRA exemption chandigarh', 'income tax on salary chandigarh FY 2025-26', 'chandigarh salary breakdown', 'take home salary chandigarh'],
  alternates: { canonical: 'https://fermor.in/tax/chandigarh' },
  openGraph: { title: 'Income Tax in Chandigarh FY 2025-26 - Fermor', description: 'Professional tax Rs 0/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Chandigarh.', type: 'article', url: 'https://fermor.in/tax/chandigarh', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Chandigarh FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Chandigarh FY 2025-26 - Fermor', description: 'PT Rs 0/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Chandigarh.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Chandigarh', item: 'https://fermor.in/tax/chandigarh' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Chandigarh FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/chandigarh', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Chandigarh salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Chandigarh' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Chandigarh (UT)', 'HRA Exemption', 'Chandigarh IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

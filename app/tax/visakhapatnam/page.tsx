import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Visakhapatnam', slug: 'visakhapatnam', state: 'Andhra Pradesh',
  profTaxPerYear: 2500,
  profTaxNote: 'Andhra Pradesh levies Rs 2,500/year professional tax (the full constitutional maximum). For salary above Rs 20,000/month employers deduct Rs 200 for 11 months and Rs 300 in March under the AP Tax on Professions Act.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['HCL', 'Wipro', 'Infosys', 'HPCL', 'RINL Steel', 'NTPC'],
  costOfLivingNote: "Coastal IT and port city with one of the lowest costs of living among major Andhra Pradesh business hubs",
};

export const metadata: Metadata = {
  title: 'Income Tax in Visakhapatnam FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Visakhapatnam FY 2025-26. Professional tax Rs 2500/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax visakhapatnam 2025-26', 'professional tax visakhapatnam', 'salary in hand visakhapatnam', 'income tax Andhra Pradesh', 'visakhapatnam IT salary tax', 'HRA exemption visakhapatnam', 'income tax on salary visakhapatnam FY 2025-26', 'visakhapatnam salary breakdown', 'take home salary visakhapatnam'],
  alternates: { canonical: 'https://fermor.in/tax/visakhapatnam' },
  openGraph: { title: 'Income Tax in Visakhapatnam FY 2025-26 - Fermor', description: 'Professional tax Rs 2500/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Visakhapatnam.', type: 'article', url: 'https://fermor.in/tax/visakhapatnam', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Visakhapatnam FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Visakhapatnam FY 2025-26 - Fermor', description: 'PT Rs 2500/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Visakhapatnam.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Visakhapatnam', item: 'https://fermor.in/tax/visakhapatnam' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Visakhapatnam FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/visakhapatnam', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Visakhapatnam salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Visakhapatnam' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Andhra Pradesh', 'HRA Exemption', 'Visakhapatnam IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

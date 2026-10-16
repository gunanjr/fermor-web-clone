import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Bhopal', slug: 'bhopal', state: 'Madhya Pradesh',
  profTaxPerYear: 2500,
  profTaxNote: 'Madhya Pradesh levies Rs 2,500/year professional tax. Bhopal as the state capital follows the same MP PT schedule. Employers deduct approximately Rs 208/month across the year.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['HCL', 'Wipro', 'Infosys', 'BHEL', 'NTPC', 'Gas Authority of India'],
  costOfLivingNote: "State capital with large government and PSU employer base; cost of living among the lowest of any major Indian city",
};

export const metadata: Metadata = {
  title: 'Income Tax in Bhopal FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Bhopal FY 2025-26. Professional tax Rs 2500/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax bhopal 2025-26', 'professional tax bhopal', 'salary in hand bhopal', 'income tax Madhya Pradesh', 'bhopal IT salary tax', 'HRA exemption bhopal', 'income tax on salary bhopal FY 2025-26', 'bhopal salary breakdown', 'take home salary bhopal'],
  alternates: { canonical: 'https://fermor.in/tax/bhopal' },
  openGraph: { title: 'Income Tax in Bhopal FY 2025-26 - Fermor', description: 'Professional tax Rs 2500/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Bhopal.', type: 'article', url: 'https://fermor.in/tax/bhopal', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Bhopal FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Bhopal FY 2025-26 - Fermor', description: 'PT Rs 2500/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Bhopal.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Bhopal', item: 'https://fermor.in/tax/bhopal' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Bhopal FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/bhopal', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Bhopal salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Bhopal' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Madhya Pradesh', 'HRA Exemption', 'Bhopal IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

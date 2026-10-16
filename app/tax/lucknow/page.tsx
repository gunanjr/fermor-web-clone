import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Lucknow', slug: 'lucknow', state: 'Uttar Pradesh',
  profTaxPerYear: 0,
  profTaxNote: 'Uttar Pradesh does not levy professional tax. Salaried employees in Lucknow like those in Noida pay zero professional tax on their monthly salary.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['HCL', 'TCS', 'Wipro', 'Infosys', 'NTPC', 'Indian Railways'],
  costOfLivingNote: "No professional tax state; fast-growing Lucknow IT corridor with strong government and PSU sector",
};

export const metadata: Metadata = {
  title: 'Income Tax in Lucknow FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Lucknow FY 2025-26. Professional tax Rs 0/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax lucknow 2025-26', 'professional tax lucknow', 'salary in hand lucknow', 'income tax Uttar Pradesh', 'lucknow IT salary tax', 'HRA exemption lucknow', 'income tax on salary lucknow FY 2025-26', 'lucknow salary breakdown', 'take home salary lucknow'],
  alternates: { canonical: 'https://fermor.in/tax/lucknow' },
  openGraph: { title: 'Income Tax in Lucknow FY 2025-26 - Fermor', description: 'Professional tax Rs 0/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Lucknow.', type: 'article', url: 'https://fermor.in/tax/lucknow', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Lucknow FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Lucknow FY 2025-26 - Fermor', description: 'PT Rs 0/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Lucknow.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Lucknow', item: 'https://fermor.in/tax/lucknow' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Lucknow FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/lucknow', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Lucknow salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Lucknow' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Uttar Pradesh', 'HRA Exemption', 'Lucknow IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

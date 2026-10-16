import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Kolkata', slug: 'kolkata', state: 'West Bengal',
  profTaxPerYear: 2500,
  profTaxNote: 'Rs 2,500/year. For salary above Rs 25,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February under the West Bengal State Tax on Professions Act.',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['TCS', 'Wipro', 'Cognizant', 'ITC', 'Infosys', 'Coal India'],
  costOfLivingNote: "Most affordable major metro in India with a robust IT and BFSI job market",
};

export const metadata: Metadata = {
  title: 'Income Tax in Kolkata FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Kolkata FY 2025-26. Professional tax Rs 2500/yr. HRA 50% (metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax kolkata 2025-26', 'professional tax kolkata', 'salary in hand kolkata', 'income tax West Bengal', 'kolkata IT salary tax', 'HRA exemption kolkata', 'income tax on salary kolkata FY 2025-26', 'kolkata salary breakdown', 'take home salary kolkata'],
  alternates: { canonical: 'https://fermor.in/tax/kolkata' },
  openGraph: { title: 'Income Tax in Kolkata FY 2025-26 - Fermor', description: 'Professional tax Rs 2500/yr. HRA 50%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Kolkata.', type: 'article', url: 'https://fermor.in/tax/kolkata', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Kolkata FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Kolkata FY 2025-26 - Fermor', description: 'PT Rs 2500/yr. HRA 50%. Monthly in-hand for 3L to 50L salary in Kolkata.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Kolkata', item: 'https://fermor.in/tax/kolkata' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Kolkata FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/kolkata', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Kolkata salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Kolkata' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax West Bengal', 'HRA Exemption', 'Kolkata IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

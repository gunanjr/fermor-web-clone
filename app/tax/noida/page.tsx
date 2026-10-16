import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Noida', slug: 'noida', state: 'Uttar Pradesh',
  profTaxPerYear: 0,
  profTaxNote: 'Uttar Pradesh does not levy professional tax. Noida employees pay zero professional tax resulting in higher monthly take-home than Bangalore or Mumbai earners at the same gross salary.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['HCL', 'Samsung', 'Adobe', 'Sapient', 'Infoedge', 'NIIT'],
  costOfLivingNote: "No professional tax state; cost of living lower than Gurgaon with strong IT sector proximity to Delhi",
};

export const metadata: Metadata = {
  title: 'Income Tax in Noida FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Noida FY 2025-26. Professional tax Rs 0/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax noida 2025-26', 'professional tax noida', 'salary in hand noida', 'income tax Uttar Pradesh', 'noida IT salary tax', 'HRA exemption noida', 'income tax on salary noida FY 2025-26', 'noida salary breakdown', 'take home salary noida'],
  alternates: { canonical: 'https://fermor.in/tax/noida' },
  openGraph: { title: 'Income Tax in Noida FY 2025-26 - Fermor', description: 'Professional tax Rs 0/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Noida.', type: 'article', url: 'https://fermor.in/tax/noida', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Noida FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Noida FY 2025-26 - Fermor', description: 'PT Rs 0/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Noida.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Noida', item: 'https://fermor.in/tax/noida' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Noida FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/noida', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Noida salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Noida' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Uttar Pradesh', 'HRA Exemption', 'Noida IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

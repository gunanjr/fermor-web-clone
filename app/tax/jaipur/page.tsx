import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Jaipur', slug: 'jaipur', state: 'Rajasthan',
  profTaxPerYear: 0,
  profTaxNote: 'Rajasthan does not levy professional tax on salaried employees. Jaipur earners pay zero professional tax adding Rs 200-208/month to take-home compared to Bangalore or Mumbai employees at the same gross salary.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['Infosys', 'Wipro', 'HCL', 'Concentrix', 'Genpact', 'EXL'],
  costOfLivingNote: "No professional tax state with rapidly growing IT services sector and below-average housing costs",
};

export const metadata: Metadata = {
  title: 'Income Tax in Jaipur FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Jaipur FY 2025-26. Professional tax Rs 0/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax jaipur 2025-26', 'professional tax jaipur', 'salary in hand jaipur', 'income tax Rajasthan', 'jaipur IT salary tax', 'HRA exemption jaipur', 'income tax on salary jaipur FY 2025-26', 'jaipur salary breakdown', 'take home salary jaipur'],
  alternates: { canonical: 'https://fermor.in/tax/jaipur' },
  openGraph: { title: 'Income Tax in Jaipur FY 2025-26 - Fermor', description: 'Professional tax Rs 0/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Jaipur.', type: 'article', url: 'https://fermor.in/tax/jaipur', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Jaipur FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Jaipur FY 2025-26 - Fermor', description: 'PT Rs 0/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Jaipur.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Jaipur', item: 'https://fermor.in/tax/jaipur' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Jaipur FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/jaipur', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Jaipur salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Jaipur' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Rajasthan', 'HRA Exemption', 'Jaipur IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

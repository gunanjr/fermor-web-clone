import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Indore', slug: 'indore', state: 'Madhya Pradesh',
  profTaxPerYear: 2500,
  profTaxNote: 'Madhya Pradesh levies Rs 2,500/year professional tax. Employers deduct approximately Rs 208/month for 11 months and a slightly adjusted amount in the 12th month under the Madhya Pradesh Vritti Kar Adhiniyam.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['TCS', 'Infosys', 'Wipro', 'Impetus', 'KPIT', 'HCL'],
  costOfLivingNote: "India's Cleanest City with a growing IT corridor; significantly lower real estate and living costs than Pune or Bangalore",
};

export const metadata: Metadata = {
  title: 'Income Tax in Indore FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Indore FY 2025-26. Professional tax Rs 2500/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax indore 2025-26', 'professional tax indore', 'salary in hand indore', 'income tax Madhya Pradesh', 'indore IT salary tax', 'HRA exemption indore', 'income tax on salary indore FY 2025-26', 'indore salary breakdown', 'take home salary indore'],
  alternates: { canonical: 'https://fermor.in/tax/indore' },
  openGraph: { title: 'Income Tax in Indore FY 2025-26 - Fermor', description: 'Professional tax Rs 2500/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Indore.', type: 'article', url: 'https://fermor.in/tax/indore', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Indore FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Indore FY 2025-26 - Fermor', description: 'PT Rs 2500/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Indore.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Indore', item: 'https://fermor.in/tax/indore' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Indore FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/indore', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Indore salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Indore' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Madhya Pradesh', 'HRA Exemption', 'Indore IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

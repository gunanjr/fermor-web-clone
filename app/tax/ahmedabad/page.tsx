import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Ahmedabad', slug: 'ahmedabad', state: 'Gujarat',
  profTaxPerYear: 2400,
  profTaxNote: 'Gujarat levies Rs 2,400/year professional tax. Employers deduct a flat Rs 200 per month under the Gujarat Panchayats Municipal Corporations and State Tax on Professions Act 1976.',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['Adani Group', 'Zydus', 'Torrent Pharma', 'Sun Pharma', 'ISRO', 'L&T'],
  costOfLivingNote: "Metro HRA classification under 2026 rules with below-average cost of living; strong pharma and logistics sector",
};

export const metadata: Metadata = {
  title: 'Income Tax in Ahmedabad FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Ahmedabad FY 2025-26. Professional tax Rs 2400/yr. HRA 50% (metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax ahmedabad 2025-26', 'professional tax ahmedabad', 'salary in hand ahmedabad', 'income tax Gujarat', 'ahmedabad IT salary tax', 'HRA exemption ahmedabad', 'income tax on salary ahmedabad FY 2025-26', 'ahmedabad salary breakdown', 'take home salary ahmedabad'],
  alternates: { canonical: 'https://fermor.in/tax/ahmedabad' },
  openGraph: { title: 'Income Tax in Ahmedabad FY 2025-26 - Fermor', description: 'Professional tax Rs 2400/yr. HRA 50%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Ahmedabad.', type: 'article', url: 'https://fermor.in/tax/ahmedabad', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Ahmedabad FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Ahmedabad FY 2025-26 - Fermor', description: 'PT Rs 2400/yr. HRA 50%. Monthly in-hand for 3L to 50L salary in Ahmedabad.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Ahmedabad', item: 'https://fermor.in/tax/ahmedabad' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Ahmedabad FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/ahmedabad', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Ahmedabad salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Ahmedabad' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Gujarat', 'HRA Exemption', 'Ahmedabad IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

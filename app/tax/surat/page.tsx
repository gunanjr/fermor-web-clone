import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Surat', slug: 'surat', state: 'Gujarat',
  profTaxPerYear: 2400,
  profTaxNote: 'Gujarat levies Rs 2,400/year professional tax. Employers deduct a flat Rs 200 per month under the Gujarat professional tax law. Surat follows the same Gujarat state PT schedule as Ahmedabad.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['Reliance', 'Adani', 'Garden Silk Mills', 'ONGC', 'TCS', 'HCL'],
  costOfLivingNote: "Diamond and textile trading capital with one of the lowest costs of living among major business cities",
};

export const metadata: Metadata = {
  title: 'Income Tax in Surat FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Surat FY 2025-26. Professional tax Rs 2400/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax surat 2025-26', 'professional tax surat', 'salary in hand surat', 'income tax Gujarat', 'surat IT salary tax', 'HRA exemption surat', 'income tax on salary surat FY 2025-26', 'surat salary breakdown', 'take home salary surat'],
  alternates: { canonical: 'https://fermor.in/tax/surat' },
  openGraph: { title: 'Income Tax in Surat FY 2025-26 - Fermor', description: 'Professional tax Rs 2400/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Surat.', type: 'article', url: 'https://fermor.in/tax/surat', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Surat FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Surat FY 2025-26 - Fermor', description: 'PT Rs 2400/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Surat.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Surat', item: 'https://fermor.in/tax/surat' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Surat FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/surat', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Surat salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Surat' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Gujarat', 'HRA Exemption', 'Surat IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

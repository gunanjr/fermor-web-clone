import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Gurgaon', slug: 'gurgaon', state: 'Haryana',
  profTaxPerYear: 0,
  profTaxNote: 'Haryana does not levy professional tax. Salaried employees in Gurgaon pay zero professional tax keeping monthly take-home higher than comparable earners in Bangalore or Pune.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['Maruti Suzuki', 'DLF', 'Deloitte', 'EY', 'Google', 'Microsoft'],
  costOfLivingNote: "No professional tax with premium residential areas; one of the highest-paying IT and consulting markets in NCR",
};

export const metadata: Metadata = {
  title: 'Income Tax in Gurgaon FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Gurgaon FY 2025-26. Professional tax Rs 0/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax gurgaon 2025-26', 'professional tax gurgaon', 'salary in hand gurgaon', 'income tax Haryana', 'gurgaon IT salary tax', 'HRA exemption gurgaon', 'income tax on salary gurgaon FY 2025-26', 'gurgaon salary breakdown', 'take home salary gurgaon'],
  alternates: { canonical: 'https://fermor.in/tax/gurgaon' },
  openGraph: { title: 'Income Tax in Gurgaon FY 2025-26 - Fermor', description: 'Professional tax Rs 0/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Gurgaon.', type: 'article', url: 'https://fermor.in/tax/gurgaon', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Gurgaon FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Gurgaon FY 2025-26 - Fermor', description: 'PT Rs 0/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Gurgaon.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Gurgaon', item: 'https://fermor.in/tax/gurgaon' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Gurgaon FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/gurgaon', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Gurgaon salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Gurgaon' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Haryana', 'HRA Exemption', 'Gurgaon IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

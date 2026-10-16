import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Kochi', slug: 'kochi', state: 'Kerala',
  profTaxPerYear: 2500,
  profTaxNote: 'Kerala levies professional tax up to Rs 2,500/year. For salary above Rs 20,000/month the maximum annual deduction is Rs 2,500 collected as Rs 1,250 half-yearly under the Kerala Municipality Act.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['Infosys', 'TCS', 'UST Global', 'IBS Group', 'Wipro', 'Cognizant'],
  costOfLivingNote: "Strong IT services and shipping sector; below-average rent and living costs versus comparable IT cities",
};

export const metadata: Metadata = {
  title: 'Income Tax in Kochi FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Kochi FY 2025-26. Professional tax Rs 2500/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax kochi 2025-26', 'professional tax kochi', 'salary in hand kochi', 'income tax Kerala', 'kochi IT salary tax', 'HRA exemption kochi', 'income tax on salary kochi FY 2025-26', 'kochi salary breakdown', 'take home salary kochi'],
  alternates: { canonical: 'https://fermor.in/tax/kochi' },
  openGraph: { title: 'Income Tax in Kochi FY 2025-26 - Fermor', description: 'Professional tax Rs 2500/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Kochi.', type: 'article', url: 'https://fermor.in/tax/kochi', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Kochi FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Kochi FY 2025-26 - Fermor', description: 'PT Rs 2500/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Kochi.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Kochi', item: 'https://fermor.in/tax/kochi' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Kochi FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/kochi', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Kochi salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Kochi' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Kerala', 'HRA Exemption', 'Kochi IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

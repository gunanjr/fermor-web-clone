import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Hyderabad', slug: 'hyderabad', state: 'Telangana',
  profTaxPerYear: 2400,
  profTaxNote: 'Telangana levies Rs 2400/year. For salary above Rs 20000/month employers deduct a flat Rs 200 every month (12 months no February variation)',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['Microsoft','Infosys','Cognizant','Apple','Meta','Amazon' ],
  costOfLivingNote: 'Lower cost of living than Bangalore with comparable IT salaries',
};

export const metadata: Metadata = {
  title: 'Income Tax in Hyderabad FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Hyderabad FY 2025-26. Professional tax Rs 2,400/yr. HRA 50% (metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax hyderabad 2025-26', 'professional tax hyderabad', 'salary in hand hyderabad', 'income tax Telangana', 'hyderabad IT salary tax', 'HRA exemption hyderabad', 'income tax on salary hyderabad FY 2025-26', 'hyderabad salary breakdown', 'take home salary hyderabad'],
  alternates: { canonical: 'https://fermor.in/tax/hyderabad' },
  openGraph: { title: 'Income Tax in Hyderabad FY 2025-26 - Fermor', description: 'Professional tax Rs 2,400/yr. HRA 50% (metro). Monthly in-hand for every salary from Rs 3L to Rs 50L in Hyderabad.', type: 'article', url: 'https://fermor.in/tax/hyderabad', siteName: 'Fermor', publishedTime: '2026-06-23', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Hyderabad FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Hyderabad FY 2025-26 - Fermor', description: 'PT Rs 2,400/yr. HRA 50% (metro). Monthly in-hand for 3L to 50L salary in Hyderabad.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Hyderabad', item: 'https://fermor.in/tax/hyderabad' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Hyderabad FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/hyderabad', inLanguage: 'en-IN', datePublished: '2026-06-23', dateModified: '2026-06-23', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Hyderabad salaried employees IT professionals', geographicArea: { '@type': 'City', name: 'Hyderabad' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Telangana', 'HRA Exemption', 'Hyderabad IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Chennai', slug: 'chennai', state: 'Tamil Nadu',
  profTaxPerYear: 2500,
  profTaxNote: 'Tamil Nadu levies Rs 2500/year. For salary above Rs 21000/month employees pay approx Rs 208/month under the Tamil Nadu PT schedule',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['HCL','Cognizant','TCS','Zoho','Ford India','Hyundai' ],
  costOfLivingNote: 'Metro HRA benefit with below-average cost of living vs Mumbai and Delhi',
};

export const metadata: Metadata = {
  title: 'Income Tax in Chennai FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Chennai FY 2025-26. Professional tax 2500/yr. HRA 50% (Metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax chennai 2025-26', 'professional tax chennai', 'salary in hand chennai', 'income tax Tamil Nadu', 'chennai IT salary tax', 'HRA exemption chennai', 'income tax on salary chennai FY 2025-26', 'chennai salary breakdown', 'take home salary chennai'],
  alternates: { canonical: 'https://fermor.in/tax/chennai' },
  openGraph: { title: 'Income Tax in Chennai FY 2025-26 - Fermor', description: 'Professional tax 2500/yr. HRA 50% (Metro). Monthly in-hand for every salary from Rs 3L to Rs 50L in Chennai.', type: 'article', url: 'https://fermor.in/tax/chennai', siteName: 'Fermor', publishedTime: '2026-06-23', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Chennai FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Chennai FY 2025-26 - Fermor', description: 'PT 2500/yr. HRA 50% (Metro). Monthly in-hand for 3L to 50L salary in Chennai.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Chennai', item: 'https://fermor.in/tax/chennai' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Chennai FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/chennai', inLanguage: 'en-IN', datePublished: '2026-06-23', dateModified: '2026-06-23', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Chennai salaried employees IT professionals', geographicArea: { '@type': 'City', name: 'Chennai' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Tamil Nadu', 'HRA Exemption', 'Chennai IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

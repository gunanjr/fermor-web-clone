import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Nagpur', slug: 'nagpur', state: 'Maharashtra',
  profTaxPerYear: 2500,
  profTaxNote: 'Maharashtra levies Rs 2,500/year professional tax. For salary above Rs 10,000/month employers deduct Rs 200 for 11 months and Rs 300 in February. Nagpur follows the same Maharashtra PT schedule as Mumbai and Pune.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['Infosys', 'TCS', 'Wipro', 'HCL', 'NMDC', 'Coal India'],
  costOfLivingNote: "Central India logistics hub with significantly lower cost of living than Mumbai or Pune",
};

export const metadata: Metadata = {
  title: 'Income Tax in Nagpur FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Nagpur FY 2025-26. Professional tax Rs 2500/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax nagpur 2025-26', 'professional tax nagpur', 'salary in hand nagpur', 'income tax Maharashtra', 'nagpur IT salary tax', 'HRA exemption nagpur', 'income tax on salary nagpur FY 2025-26', 'nagpur salary breakdown', 'take home salary nagpur'],
  alternates: { canonical: 'https://fermor.in/tax/nagpur' },
  openGraph: { title: 'Income Tax in Nagpur FY 2025-26 - Fermor', description: 'Professional tax Rs 2500/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Nagpur.', type: 'article', url: 'https://fermor.in/tax/nagpur', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Nagpur FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Nagpur FY 2025-26 - Fermor', description: 'PT Rs 2500/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Nagpur.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Nagpur', item: 'https://fermor.in/tax/nagpur' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Nagpur FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/nagpur', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Nagpur salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Nagpur' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Maharashtra', 'HRA Exemption', 'Nagpur IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

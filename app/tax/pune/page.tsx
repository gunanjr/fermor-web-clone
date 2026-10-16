import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Pune', slug: 'pune', state: 'Maharashtra',
  profTaxPerYear: 2500,
  profTaxNote: 'Maharashtra levies Rs 2500/year. For salary above Rs 10000/month employers deduct Rs 200 for 11 months and Rs 300 in February',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['TCS','Infosys','Capgemini','Cognizant','Bajaj Auto','Persistent' ],
  costOfLivingNote: 'More affordable than Mumbai with strong IT and manufacturing sectors',
};

export const metadata: Metadata = {
  title: 'Income Tax in Pune FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Pune FY 2025-26. Professional tax Rs 2,500/yr. HRA 50% (metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax pune 2025-26', 'professional tax pune', 'salary in hand pune', 'income tax Maharashtra', 'pune IT salary tax', 'HRA exemption pune', 'income tax on salary pune FY 2025-26', 'pune salary breakdown', 'take home salary pune'],
  alternates: { canonical: 'https://fermor.in/tax/pune' },
  openGraph: { title: 'Income Tax in Pune FY 2025-26 - Fermor', description: 'Professional tax Rs 2,500/yr. HRA 50% (metro). Monthly in-hand for every salary from Rs 3L to Rs 50L in Pune.', type: 'article', url: 'https://fermor.in/tax/pune', siteName: 'Fermor', publishedTime: '2026-06-23', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Pune FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Pune FY 2025-26 - Fermor', description: 'PT Rs 2,500/yr. HRA 50% (metro). Monthly in-hand for 3L to 50L salary in Pune.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Pune', item: 'https://fermor.in/tax/pune' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Pune FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/pune', inLanguage: 'en-IN', datePublished: '2026-06-23', dateModified: '2026-06-23', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Pune salaried employees IT professionals', geographicArea: { '@type': 'City', name: 'Pune' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Maharashtra', 'HRA Exemption', 'Pune IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Mumbai', slug: 'mumbai', state: 'Maharashtra',
  profTaxPerYear: 2500,
  profTaxNote: 'Maharashtra levies Rs 2500/year. For salary above Rs 10000/month, employers deduct Rs 200 for 11 months and Rs 300 in February',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['TCS','Reliance','HDFC Bank','Goldman Sachs','JP Morgan','Deloitte' ],
  costOfLivingNote: 'Highest cost of living in India especially housing and commute',
};

export const metadata: Metadata = {
  title: 'Income Tax in Mumbai FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Mumbai FY 2025-26. Professional tax 2500/yr. HRA 50% (Metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax mumbai 2025-26', 'professional tax mumbai', 'salary in hand mumbai', 'income tax Maharashtra', 'mumbai IT salary tax', 'HRA exemption mumbai', 'income tax on salary mumbai FY 2025-26', 'mumbai salary breakdown', 'take home salary mumbai'],
  alternates: { canonical: 'https://fermor.in/tax/mumbai' },
  openGraph: { title: 'Income Tax in Mumbai FY 2025-26 - Fermor', description: 'Professional tax 2500/yr. HRA 50% (Metro). Monthly in-hand for every salary from Rs 3L to Rs 50L in Mumbai.', type: 'article', url: 'https://fermor.in/tax/mumbai', siteName: 'Fermor', publishedTime: '2026-06-23', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Mumbai FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Mumbai FY 2025-26 - Fermor', description: 'PT 2500/yr. HRA 50% (Metro). Monthly in-hand for 3L to 50L salary in Mumbai.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Mumbai', item: 'https://fermor.in/tax/mumbai' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Mumbai FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/mumbai', inLanguage: 'en-IN', datePublished: '2026-06-23', dateModified: '2026-06-23', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Mumbai salaried employees IT professionals', geographicArea: { '@type': 'City', name: 'Mumbai' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Maharashtra', 'HRA Exemption', 'Mumbai IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

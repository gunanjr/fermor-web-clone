import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Bangalore', slug: 'bangalore', state: 'Karnataka',
  profTaxPerYear: 2500,
  profTaxNote: 'Karnataka levies Rs 2,500/year. For salary above Rs 25,000/month, employers deduct Rs 200 for 11 months and Rs 300 in February, totalling Rs 2,500 annually',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['Infosys', 'Wipro', 'Google', 'Amazon', 'Flipkart', 'Accenture'],
  costOfLivingNote: "India's highest-paying IT market with above-average living costs",
};

export const metadata: Metadata = {
  title: 'Income Tax in Bangalore FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Bangalore FY 2025-26. Professional tax Rs 2,500/year (Rs 200x11 + Rs 300 in Feb). HRA 50% (metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax bangalore 2025-26', 'professional tax bangalore', 'salary in hand bangalore', 'income tax karnataka', 'bangalore IT salary tax', 'PT bangalore Rs 2500', 'HRA exemption bangalore metro 50 percent', 'income tax on salary bangalore FY 2025-26', 'bangalore salary breakdown', 'take home salary bangalore'],
  alternates: { canonical: 'https://fermor.in/tax/bangalore' },
  openGraph: { title: 'Income Tax in Bangalore FY 2025-26 - Fermor', description: 'Professional tax Rs 2,500/year. HRA 50% (metro). Monthly in-hand for every salary from Rs 3L to Rs 50L in Bangalore.', type: 'article', url: 'https://fermor.in/tax/bangalore', siteName: 'Fermor', publishedTime: '2026-06-23', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Bangalore FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Bangalore FY 2025-26 - Fermor', description: 'PT Rs 2,500/yr. HRA 50% (metro). Monthly in-hand for 3L to 50L salary in Bangalore.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Bangalore', item: 'https://fermor.in/tax/bangalore' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Bangalore FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/bangalore', inLanguage: 'en-IN', datePublished: '2026-06-23', dateModified: '2026-06-23', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Bangalore salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Bangalore' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Karnataka', 'HRA Exemption', 'Bangalore IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

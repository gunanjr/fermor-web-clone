import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Coimbatore', slug: 'coimbatore', state: 'Tamil Nadu',
  profTaxPerYear: 2500,
  profTaxNote: 'Tamil Nadu levies Rs 2,500/year professional tax. Salaried employees earning above Rs 21,000/month pay Rs 1,250 half-yearly. Coimbatore follows the same Tamil Nadu state schedule as Chennai.',
  isMetroHRA: false, hraExemptionPct: 40,
  topEmployers: ['Robert Bosch', 'Pricol', 'LMW', 'Wipro', 'Cognizant', 'TCS'],
  costOfLivingNote: "Manufacturing and textile hub with fast-growing IT sector; cost of living substantially below Chennai",
};

export const metadata: Metadata = {
  title: 'Income Tax in Coimbatore FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Coimbatore FY 2025-26. Professional tax Rs 2500/yr. HRA 40% (non-metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax coimbatore 2025-26', 'professional tax coimbatore', 'salary in hand coimbatore', 'income tax Tamil Nadu', 'coimbatore IT salary tax', 'HRA exemption coimbatore', 'income tax on salary coimbatore FY 2025-26', 'coimbatore salary breakdown', 'take home salary coimbatore'],
  alternates: { canonical: 'https://fermor.in/tax/coimbatore' },
  openGraph: { title: 'Income Tax in Coimbatore FY 2025-26 - Fermor', description: 'Professional tax Rs 2500/yr. HRA 40%. Monthly in-hand for every salary from Rs 3L to Rs 50L in Coimbatore.', type: 'article', url: 'https://fermor.in/tax/coimbatore', siteName: 'Fermor', publishedTime: '2026-06-24', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Coimbatore FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Coimbatore FY 2025-26 - Fermor', description: 'PT Rs 2500/yr. HRA 40%. Monthly in-hand for 3L to 50L salary in Coimbatore.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Coimbatore', item: 'https://fermor.in/tax/coimbatore' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Coimbatore FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/coimbatore', inLanguage: 'en-IN', datePublished: '2026-06-24', dateModified: '2026-06-24', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Coimbatore salaried employees, IT professionals', geographicArea: { '@type': 'City', name: 'Coimbatore' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Tamil Nadu', 'HRA Exemption', 'Coimbatore IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

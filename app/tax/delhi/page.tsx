import type { Metadata } from 'next';
import { PageNav } from '../../../src/components/common/PageNav';
import CityIndexPage, { type CityConfig } from '../_template/CityIndexPage';

const CITY: CityConfig = {
  name: 'Delhi', slug: 'delhi', state: 'Delhi',
  profTaxPerYear: 0,
  profTaxNote: 'Delhi (NCT) does not levy professional tax unlike Karnataka Maharashtra Telangana or Tamil Nadu',
  isMetroHRA: true, hraExemptionPct: 50,
  topEmployers: ['HCL','Tech Mahindra','Paytm','OYO','KPMG','PwC' ],
  costOfLivingNote: 'No professional tax - highest take-home among all metro cities',
};

export const metadata: Metadata = {
  title: 'Income Tax in Delhi FY 2025-26: All Salary Levels',
  description: 'Income tax for every salary level in Delhi FY 2025-26. Professional tax Nil. HRA 50% (Metro). Monthly in-hand for 3L to 50L salary.',
  keywords: ['income tax delhi 2025-26', 'professional tax delhi', 'salary in hand delhi', 'income tax Delhi', 'delhi IT salary tax', 'HRA exemption delhi', 'income tax on salary delhi FY 2025-26', 'delhi salary breakdown', 'take home salary delhi'],
  alternates: { canonical: 'https://fermor.in/tax/delhi' },
  openGraph: { title: 'Income Tax in Delhi FY 2025-26 - Fermor', description: 'Professional tax Nil. HRA 50% (Metro). Monthly in-hand for every salary from Rs 3L to Rs 50L in Delhi.', type: 'article', url: 'https://fermor.in/tax/delhi', siteName: 'Fermor', publishedTime: '2026-06-23', images: [{ url: 'https://fermor.in/og-tax.png', width: 1200, height: 630, alt: 'Income Tax in Delhi FY 2025-26' }] },
  twitter: { card: 'summary_large_image', title: 'Income Tax in Delhi FY 2025-26 - Fermor', description: 'PT Nil. HRA 50% (Metro). Monthly in-hand for 3L to 50L salary in Delhi.', images: ['https://fermor.in/og-tax.png'], site: '@fermor_in' },
};

const schemas = [
  { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' }, { '@type': 'ListItem', position: 2, name: 'Tax Guides', item: 'https://fermor.in/tax' }, { '@type': 'ListItem', position: 3, name: 'City Tax Guides', item: 'https://fermor.in/tax/by-city' }, { '@type': 'ListItem', position: 4, name: 'Delhi', item: 'https://fermor.in/tax/delhi' }] },
  { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Income Tax in Delhi FY 2025-26: All Salary Levels - Fermor', url: 'https://fermor.in/tax/delhi', inLanguage: 'en-IN', datePublished: '2026-06-23', dateModified: '2026-06-23', isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' }, author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' }, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] }, audience: { '@type': 'Audience', audienceType: 'Delhi salaried employees IT professionals', geographicArea: { '@type': 'City', name: 'Delhi' } } },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' }, knowsAbout: ['Income Tax India', 'Professional Tax Delhi', 'HRA Exemption', 'Delhi IT Salaries'] },
];

export default function Page() {
  return (<><PageNav /><CityIndexPage city={CITY} schemas={schemas} /></>);
}

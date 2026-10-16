import type { Metadata } from 'next';
import { CATEGORIES, getTotalCount } from '../../src/data/calculators';
import CalculatorsClient from './CalculatorsClient';

const total = getTotalCount();

export const metadata: Metadata = {
  title: 'Financial Calculators: SIP, EMI, FD, XIRR, CAGR, Tax and More',
  description: `Free financial calculators: SIP, EMI, FD, XIRR, CAGR, Mutual Fund, PPF, NPS, Income Tax, GST and more. ${total} calculators, free to use, runs in your browser.`,
  alternates: { canonical: 'https://fermor.in/calculators' },
  openGraph: {
    title: 'Financial Calculators - Fermor',
    description: 'Browse all free financial calculators by category. Free to use, browser-based.',
    type: 'website',
  },
};

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Financial Calculators - Fermor',
  url: 'https://fermor.in/calculators',
  numberOfItems: total,
  itemListElement: CATEGORIES.flatMap(c => c.items).map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.title,
    description: item.desc,
    url: `https://fermor.in/calculators/${item.slug}`,
  })),
};

export default function CalculatorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <CalculatorsClient />
    </>
  );
}
